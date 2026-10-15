import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DomainId, WardenAlert, Waypoint } from '../types/world';
import { OPEN_WORLD_WAYPOINTS, SHELTER_REROUTE_WAYPOINT, snapToClosestVioletPath } from '../data/route';
import { ACTIVE_SURGE_ALERT, ALL_CLEAR_STATE, DOMAIN_SURGE_PRESETS } from '../data/wardenSurges';

interface LedgerContextType {
  currentDomain: DomainId;
  currentWaypoint: Waypoint;
  currentWaypointIndex: number;
  route: Waypoint[];
  isRerouted: boolean;
  showBorderModal: boolean;
  showAboutModal: boolean;
  showWelcomeModal: boolean;
  currentStrength: number;
  fadingSignal: boolean;
  activeAlert: WardenAlert;
  countdownSeconds: number;
  soundEnabled: boolean;
  activeTab: 'map' | 'tongue' | 'warden' | 'border';
  navigatorCoords: { x: number; y: number };
  isFreeNavigating: boolean;
  setActiveTab: (tab: 'map' | 'tongue' | 'warden' | 'border') => void;
  setShowBorderModal: (show: boolean) => void;
  setShowAboutModal: (show: boolean) => void;
  setShowWelcomeModal: (show: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setDomain: (domain: DomainId) => void;
  nextLeg: () => void;
  prevLeg: () => void;
  jumpToWaypoint: (index: number) => void;
  setNavigatorPosition: (x: number, y: number, autoSnap?: boolean) => void;
  rerouteToShelter: () => void;
  resetRoute: () => void;
  toggleSurgeAlert: () => void;
  setSurgePreset: (presetKey: string) => void;
  attuneLedger: (targetDomain: DomainId) => void;
  playBellSound: () => void;
  playAttuneSound: () => void;
  playClickSound: () => void;
  playExplosionSound: () => void;
  playVolcanoSound: () => void;
  playWaterfallSound: () => void;
  playWindSound: () => void;
  playBirdSound: () => void;
  stopActiveSound: () => void;
}

const LedgerContext = createContext<LedgerContextType | undefined>(undefined);

let sharedAudioCtx: AudioContext | null = null;

export function getSharedAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!sharedAudioCtx || sharedAudioCtx.state === 'closed') {
      sharedAudioCtx = new AudioContextClass();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch (e) {
    console.warn('AudioContext creation error', e);
    return null;
  }
}

export function playSafeSound(playFn: (ctx: AudioContext, now: number) => void) {
  if (typeof window === 'undefined') return;
  const ctx = getSharedAudioContext();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  try {
    const now = ctx.currentTime + 0.01;
    playFn(ctx, now);
  } catch (e) {
    console.warn('Procedural audio execution error', e);
  }
}

if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    const ctx = getSharedAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  };
  ['click', 'touchstart', 'keydown', 'pointerdown'].forEach((evt) => {
    window.addEventListener(evt, unlockAudio, { passive: true });
  });
}

// Audio buffers for decoded high-fidelity sound effects
let volcanoAudioBuffer: AudioBuffer | null = null;
let windAudioBuffer: AudioBuffer | null = null;
let birdAudioBuffer: AudioBuffer | null = null;

// HTMLAudioElement fallbacks
let volcanoAudioEl: HTMLAudioElement | null = null;
let windAudioEl: HTMLAudioElement | null = null;
let birdAudioEl: HTMLAudioElement | null = null;

// Exclusivity tracking: only ONE audio effect may play at any time
let activeSourceNode: AudioBufferSourceNode | null = null;
let activeGainNode: GainNode | null = null;
let activeAudioElement: HTMLAudioElement | null = null;
let activeAudioTimer: ReturnType<typeof setTimeout> | null = null;

export function stopActiveSound(fadeMs: number = 25) {
  if (activeAudioTimer) {
    clearTimeout(activeAudioTimer);
    activeAudioTimer = null;
  }

  // 1. Immediately pause and reset any playing HTMLAudioElement
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
    } catch (_) {}
    activeAudioElement = null;
  }

  // 2. Rapidly fade out and disconnect Web Audio Source to eliminate pops/clicks
  if (activeGainNode && activeSourceNode) {
    const ctx = getSharedAudioContext();
    const src = activeSourceNode;
    const gain = activeGainNode;
    activeSourceNode = null;
    activeGainNode = null;

    if (ctx && ctx.state !== 'closed') {
      try {
        const now = ctx.currentTime;
        const rampSec = Math.max(0.012, fadeMs / 1000);
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0.0001, now + rampSec);
        setTimeout(() => {
          try {
            src.stop();
            src.disconnect();
          } catch (_) {}
        }, fadeMs + 10);
      } catch (_) {
        try {
          src.stop();
          src.disconnect();
        } catch (_) {}
      }
    } else {
      try {
        src.stop();
        src.disconnect();
      } catch (_) {}
    }
  }
}

// Helper to decode and trim an audio asset to target duration with smooth cosine fade-out
function decodeAndTrimAudio(
  ctx: AudioContext,
  url: string,
  targetDuration: number,
  onDecoded: (buffer: AudioBuffer) => void
) {
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.arrayBuffer();
    })
    .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
    .then((decoded) => {
      const targetLength = Math.min(decoded.length, Math.floor(decoded.sampleRate * targetDuration));
      const trimmed = ctx.createBuffer(
        decoded.numberOfChannels,
        targetLength,
        decoded.sampleRate
      );

      for (let ch = 0; ch < decoded.numberOfChannels; ch++) {
        const srcData = decoded.getChannelData(ch);
        const destData = trimmed.getChannelData(ch);
        destData.set(srcData.subarray(0, targetLength));

        // Smooth cosine fade-out over final 0.35s
        const fadeSamples = Math.floor(decoded.sampleRate * 0.35);
        const fadeStart = targetLength - fadeSamples;
        for (let i = 0; i < fadeSamples; i++) {
          const factor = 0.5 * (1 + Math.cos((i / fadeSamples) * Math.PI));
          destData[fadeStart + i] *= factor;
        }
      }
      onDecoded(trimmed);
    })
    .catch((err) => {
      console.warn(`Could not pre-decode audio from ${url}:`, err);
    });
}

// Preloads all audio assets for zero-latency instant playback
export function preloadAllCodexAudio() {
  if (typeof window === 'undefined') return;

  // Initialize HTMLAudioElement fallbacks
  try {
    if (!volcanoAudioEl) {
      volcanoAudioEl = new Audio('/volcano_eruption.mp4');
      volcanoAudioEl.preload = 'auto';
    }
    if (!windAudioEl) {
      windAudioEl = new Audio('/wind_blowing.wav');
      windAudioEl.preload = 'auto';
    }
    if (!birdAudioEl) {
      birdAudioEl = new Audio('/forest_bird_chirp.wav');
      birdAudioEl.preload = 'auto';
    }
  } catch (e) {
    console.warn('AudioElement preload init error', e);
  }

  const ctx = getSharedAudioContext();
  if (!ctx) return;

  if (!volcanoAudioBuffer) {
    decodeAndTrimAudio(ctx, '/volcano_eruption.mp4', 2.8, (buf) => {
      volcanoAudioBuffer = buf;
    });
  }
  if (!windAudioBuffer) {
    decodeAndTrimAudio(ctx, '/wind_blowing.wav', 2.8, (buf) => {
      windAudioBuffer = buf;
    });
  }
  if (!birdAudioBuffer) {
    decodeAndTrimAudio(ctx, '/forest_bird_chirp.wav', 2.8, (buf) => {
      birdAudioBuffer = buf;
    });
  }
}

// Export for backward compatibility
export const preloadVolcanoVideoAudio = preloadAllCodexAudio;

// Universal exclusive audio player: stops any playing track immediately before starting the new track
function playExclusiveTrack(
  getBuffer: () => AudioBuffer | null,
  getAudioEl: () => HTMLAudioElement | null,
  url: string,
  durationSec: number = 2.8,
  volume: number = 1.0,
  fallbackProcedural?: () => void
) {
  // 1. Instantly stop any previous audio
  stopActiveSound(25);

  const ctx = getSharedAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }

  const buffer = getBuffer();

  // 2. Play using decoded Web Audio buffer for true 0-latency and exact envelope control
  if (ctx && buffer) {
    try {
      const now = ctx.currentTime;
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume, now);

      source.connect(gain);
      gain.connect(ctx.destination);

      activeSourceNode = source;
      activeGainNode = gain;

      source.onended = () => {
        if (activeSourceNode === source) {
          activeSourceNode = null;
          activeGainNode = null;
        }
      };

      source.start(now);
      source.stop(now + durationSec + 0.05);
      return;
    } catch (e) {
      console.warn('Web Audio buffer playback error, using element fallback', e);
    }
  }

  // 3. Fallback to HTMLAudioElement
  if (typeof window !== 'undefined') {
    try {
      let el = getAudioEl();
      if (!el) {
        el = new Audio(url);
        el.preload = 'auto';
      }
      const sound = (el.cloneNode(true) as HTMLAudioElement) || el;
      sound.currentTime = 0;
      sound.volume = volume;
      activeAudioElement = sound;

      const playPromise = sound.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            activeAudioTimer = setTimeout(() => {
              if (activeAudioElement === sound) {
                sound.pause();
                sound.currentTime = 0;
                activeAudioElement = null;
              }
            }, durationSec * 1000);
          })
          .catch((err) => {
            console.warn('HTMLAudioElement playback blocked/failed', err);
            if (fallbackProcedural) fallbackProcedural();
          });
        return;
      }
      return;
    } catch (e) {
      console.warn('HTMLAudioElement playback error', e);
    }
  }

  // 4. Procedural fallback if available
  if (fallbackProcedural) {
    fallbackProcedural();
  }
}

// Procedural caldera explosion synthesis (reliable fallback)
function playProceduralCalderaExplosion() {
  playSafeSound((ctx, now) => {
    const dur = 1.2;
    const bufferSize = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.85;
    }

    const blastOffsets = [0, 0.35, 0.78];
    const blastIntensities = [1.0, 0.85, 0.72];

    blastOffsets.forEach((offset, idx) => {
      const t = now + offset;
      const intensity = blastIntensities[idx];

      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320 - idx * 25, t);
      osc.frequency.exponentialRampToValueAtTime(75, t + 0.35);

      oscGain.gain.setValueAtTime(0.01, t);
      oscGain.gain.linearRampToValueAtTime(0.75 * intensity, t + 0.02);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(160, t);
      subOsc.frequency.exponentialRampToValueAtTime(65, t + 0.5);

      subGain.gain.setValueAtTime(0.01, t);
      subGain.gain.linearRampToValueAtTime(0.6 * intensity, t + 0.03);
      subGain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400 - idx * 150, t);
      filter.frequency.exponentialRampToValueAtTime(280, t + 0.7);
      filter.Q.value = 2.4;

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.01, t);
      noiseGain.gain.linearRampToValueAtTime(0.9 * intensity, t + 0.03);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.85);
      subOsc.start(t);
      subOsc.stop(t + 0.95);
      noise.start(t);
      noise.stop(t + dur);
    });
  });
}

function createProceduralAudio() {
  if (typeof window === 'undefined') {
    return {
      bell: () => {},
      attune: () => {},
      click: () => {},
      bomb: () => {},
      volcano: () => {},
      waterfall: () => {},
      wind: () => {},
      birds: () => {},
    };
  }

  return {
    // Brass sanctuary warning bell chime with rich harmonic ring
    bell: () => {
      playSafeSound((ctx, now) => {
        const harmonics = [
          { f: 520, g: 0.5, dur: 2.4 },
          { f: 1040, g: 0.28, dur: 2.0 },
          { f: 1560, g: 0.16, dur: 1.6 },
          { f: 2080, g: 0.08, dur: 1.2 },
        ];

        harmonics.forEach(({ f, g, dur }) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now);
          osc.frequency.exponentialRampToValueAtTime(f * 0.98, now + dur);

          gain.gain.setValueAtTime(g, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(now);
          osc.stop(now + dur + 0.05);
        });
      });
    },
    // Ascending crystalline attunement chord arpeggio
    attune: () => {
      playSafeSound((ctx, now) => {
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((f, i) => {
          const t = now + i * 0.07;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, t);
          osc.frequency.exponentialRampToValueAtTime(f * 1.02, t + 0.3);

          gain.gain.setValueAtTime(0.001, t);
          gain.gain.linearRampToValueAtTime(0.28, t + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(t);
          osc.stop(t + 0.85);
        });
      });
    },
    // Snappy mechanical click for button presses and navigation
    click: () => {
      playSafeSound((ctx, now) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(240, now + 0.06);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.07);
      });
    },
    // Authentic volcanic explosion audio directly from gemini_generated_video_b28265e7.mp4 trimmed to 2.8s
    volcano: () => {
      playExclusiveTrack(
        () => volcanoAudioBuffer,
        () => volcanoAudioEl,
        '/volcano_eruption.mp4',
        2.8,
        1.0,
        playProceduralCalderaExplosion
      );
    },
    bomb: () => {
      audio.volcano();
    },
    // Roaring waterfall cascade (pure rushing white water cascade with zero bubble/droplet pops)
    waterfall: () => {
      stopActiveSound(25);
      playSafeSound((ctx, now) => {
        const dur = 2.8;
        const bufferSize = Math.floor(ctx.sampleRate * dur);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.7;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        // Master gain for exclusive audio tracking and stopping
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(1.0, now);

        // 1. Deep rushing hydraulic body
        const lowFilter = ctx.createBiquadFilter();
        lowFilter.type = 'lowpass';
        lowFilter.frequency.setValueAtTime(420, now);
        lowFilter.Q.value = 1.2;

        const lowGain = ctx.createGain();
        lowGain.gain.setValueAtTime(0.01, now);
        lowGain.gain.linearRampToValueAtTime(0.55, now + 0.25);
        lowGain.gain.setValueAtTime(0.5, now + dur - 0.4);
        lowGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

        // 2. Continuous splashing spray & froth cascade
        const sprayFilter = ctx.createBiquadFilter();
        sprayFilter.type = 'bandpass';
        sprayFilter.frequency.setValueAtTime(740, now);
        sprayFilter.Q.value = 0.85;

        const sprayGain = ctx.createGain();
        sprayGain.gain.setValueAtTime(0.01, now);
        sprayGain.gain.linearRampToValueAtTime(0.48, now + 0.2);
        sprayGain.gain.setValueAtTime(0.45, now + dur - 0.35);
        sprayGain.gain.exponentialRampToValueAtTime(0.001, now + dur);

        noise.connect(lowFilter);
        lowFilter.connect(lowGain);
        lowGain.connect(masterGain);

        noise.connect(sprayFilter);
        sprayFilter.connect(sprayGain);
        sprayGain.connect(masterGain);

        masterGain.connect(ctx.destination);

        activeSourceNode = noise;
        activeGainNode = masterGain;

        noise.onended = () => {
          if (activeSourceNode === noise) {
            activeSourceNode = null;
            activeGainNode = null;
          }
        };

        noise.start(now);
        noise.stop(now + dur);
      });
    },
    // Howling mountain wind blowing sound directly from "wind_blowing.wav"
    wind: () => {
      playExclusiveTrack(
        () => windAudioBuffer,
        () => windAudioEl,
        '/wind_blowing.wav',
        2.8,
        1.0
      );
    },
    // Birds chirping sound directly from "forest_bird_chirp.wav"
    birds: () => {
      playExclusiveTrack(
        () => birdAudioBuffer,
        () => birdAudioEl,
        '/forest_bird_chirp.wav',
        2.8,
        1.0
      );
    },
  };
}

const audio = createProceduralAudio();

export const LedgerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentWaypointIndex, setCurrentWaypointIndex] = useState<number>(0);
  const [currentDomain, setCurrentDomain] = useState<DomainId>('tidereach');
  const [isRerouted, setIsRerouted] = useState<boolean>(false);
  const [showBorderModal, setShowBorderModal] = useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'map' | 'tongue' | 'warden' | 'border'>('map');
  const [activeAlert, setActiveAlert] = useState<WardenAlert>(ACTIVE_SURGE_ALERT);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(ACTIVE_SURGE_ALERT.countdownSeconds);

  // Open-World Navigator Coordinate State
  const [navigatorCoords, setNavigatorCoords] = useState<{ x: number; y: number }>({
    x: OPEN_WORLD_WAYPOINTS[0].x,
    y: OPEN_WORLD_WAYPOINTS[0].y,
  });
  const [isFreeNavigating, setIsFreeNavigating] = useState<boolean>(true);

  const currentWaypoint = OPEN_WORLD_WAYPOINTS[currentWaypointIndex] || OPEN_WORLD_WAYPOINTS[0];

  const route = React.useMemo(() => {
    if (!isRerouted) return OPEN_WORLD_WAYPOINTS;
    return OPEN_WORLD_WAYPOINTS.map((wp) => (wp.id === 'wp-gale-shear' ? SHELTER_REROUTE_WAYPOINT : wp));
  }, [isRerouted]);

  const currentStrength = currentWaypoint.currentStrength;
  const fadingSignal = currentStrength < 35 || currentWaypoint.isBorder;

  useEffect(() => {
    document.documentElement.setAttribute('data-domain', currentDomain);
  }, [currentDomain]);

  useEffect(() => {
    const handleGesture = () => {
      const ctx = getSharedAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
    };
    window.addEventListener('click', handleGesture, { passive: true });
    window.addEventListener('keydown', handleGesture, { passive: true });
    window.addEventListener('touchstart', handleGesture, { passive: true });
    window.addEventListener('pointerdown', handleGesture, { passive: true });
    return () => {
      window.removeEventListener('click', handleGesture);
      window.removeEventListener('keydown', handleGesture);
      window.removeEventListener('touchstart', handleGesture);
      window.removeEventListener('pointerdown', handleGesture);
    };
  }, []);

  useEffect(() => {
    if (activeAlert.urgency === 'ALL_CLEAR' || countdownSeconds <= 0) return;
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeAlert, countdownSeconds]);

  const playBellSound = () => {
    if (soundEnabled) audio.bell();
  };

  const playAttuneSound = () => {
    if (soundEnabled) audio.attune();
  };

  const playClickSound = () => {
    if (soundEnabled) audio.click();
  };

  const playVolcanoSound = () => {
    if (soundEnabled) audio.volcano();
  };
  const playExplosionSound = playVolcanoSound;

  const playWaterfallSound = () => {
    if (soundEnabled) audio.waterfall();
  };

  const playWindSound = () => {
    if (soundEnabled) audio.wind();
  };

  const playBirdSound = () => {
    if (soundEnabled) audio.birds();
  };

  // Set navigator position anywhere by hovering or cursor moving on path with hysteresis
  const setNavigatorPosition = (cursorX: number, cursorY: number, autoSnap: boolean = false) => {
    setIsFreeNavigating(true);
    let finalX = Math.round(cursorX);
    let finalY = Math.round(cursorY);

    if (autoSnap) {
      const snapped = snapToClosestVioletPath(cursorX, cursorY, 24);
      if (snapped.isNearPath) {
        finalX = Math.round(snapped.x);
        finalY = Math.round(snapped.y);
      }
    }

    setNavigatorCoords({ x: finalX, y: finalY });

    // Only switch waypoint/domain if within direct proximity (<42px) with hysteresis to prevent rapid flickering
    let candidateIdx = -1;
    let candidateMinDist = Infinity;
    OPEN_WORLD_WAYPOINTS.forEach((wp, idx) => {
      const d = Math.hypot(wp.x - finalX, wp.y - finalY);
      if (d < candidateMinDist && d < 42) {
        candidateMinDist = d;
        candidateIdx = idx;
      }
    });

    if (candidateIdx !== -1 && candidateIdx !== currentWaypointIndex) {
      const currentWp = OPEN_WORLD_WAYPOINTS[currentWaypointIndex];
      const currentDist = currentWp ? Math.hypot(currentWp.x - finalX, currentWp.y - finalY) : Infinity;
      // Require the new waypoint to be at least 14px closer before switching to eliminate jitter
      if (candidateMinDist < currentDist - 14) {
        setCurrentWaypointIndex(candidateIdx);
        const newDomain = OPEN_WORLD_WAYPOINTS[candidateIdx].domainId;
        if (newDomain && newDomain !== currentDomain) {
          setCurrentDomain(newDomain);
        }
      }
    }
  };

  const jumpToWaypoint = (index: number) => {
    if (index >= 0 && index < OPEN_WORLD_WAYPOINTS.length) {
      stopActiveSound();
      playClickSound();
      const targetWp = OPEN_WORLD_WAYPOINTS[index];
      setCurrentWaypointIndex(index);
      setNavigatorCoords({ x: targetWp.x, y: targetWp.y });
      setCurrentDomain(targetWp.domainId);

      // Play situational sound on waypoint jump
      if (targetWp.id === 'wp-ashfall-volcano' || targetWp.id === 'wp-cinder-crag' || targetWp.id === 'wp-sulfur-vents') {
        playVolcanoSound();
      } else if (
        targetWp.id === 'wp-shadowmere-trail' ||
        targetWp.id === 'wp-shadowmere-rest' ||
        targetWp.id === 'wp-sunken-foundry'
      ) {
        playBirdSound();
      } else if (targetWp.domainId === 'tidereach') {
        playWaterfallSound();
      } else if (targetWp.domainId === 'skydrift') {
        playWindSound();
      }
    }
  };

  const nextLeg = () => {
    if (currentWaypointIndex < OPEN_WORLD_WAYPOINTS.length - 1) {
      jumpToWaypoint(currentWaypointIndex + 1);
    } else {
      jumpToWaypoint(0);
    }
  };

  const prevLeg = () => {
    if (currentWaypointIndex > 0) {
      jumpToWaypoint(currentWaypointIndex - 1);
    } else {
      jumpToWaypoint(OPEN_WORLD_WAYPOINTS.length - 1);
    }
  };

  const setDomain = (domain: DomainId) => {
    playClickSound();
    setCurrentDomain(domain);
  };

  const attuneLedger = (targetDomain: DomainId) => {
    playAttuneSound();
    setCurrentDomain(targetDomain);
    setTimeout(() => {
      setShowBorderModal(false);
    }, 800);
  };

  const rerouteToShelter = () => {
    playBellSound();
    setIsRerouted(true);
    setNavigatorCoords({ x: SHELTER_REROUTE_WAYPOINT.x, y: SHELTER_REROUTE_WAYPOINT.y });
  };

  const resetRoute = () => {
    playClickSound();
    setIsRerouted(false);
  };

  const toggleSurgeAlert = () => {
    playClickSound();
    if (activeAlert.urgency === 'ALL_CLEAR') {
      setActiveAlert(ACTIVE_SURGE_ALERT);
      setCountdownSeconds(ACTIVE_SURGE_ALERT.countdownSeconds);
      playBellSound();
    } else {
      setActiveAlert(ALL_CLEAR_STATE);
      setCountdownSeconds(0);
    }
  };

  const setSurgePreset = (presetKey: string) => {
    playClickSound();
    const preset = DOMAIN_SURGE_PRESETS[presetKey];
    if (preset) {
      setActiveAlert(preset);
      setCountdownSeconds(preset.countdownSeconds);
      if (preset.urgency === 'CRITICAL' || preset.urgency === 'WARNING') {
        playBellSound();
      }
    }
  };

  return (
    <LedgerContext.Provider
      value={{
        currentDomain,
        currentWaypoint,
        currentWaypointIndex,
        route,
        isRerouted,
        showBorderModal,
        showAboutModal,
        showWelcomeModal,
        currentStrength,
        fadingSignal,
        activeAlert,
        countdownSeconds,
        soundEnabled,
        activeTab,
        navigatorCoords,
        isFreeNavigating,
        setActiveTab: (tab) => {
          if (tab !== 'map') stopActiveSound();
          setActiveTab(tab);
        },
        setShowBorderModal,
        setShowAboutModal,
        setShowWelcomeModal,
        setSoundEnabled,
        setDomain,
        nextLeg,
        prevLeg,
        jumpToWaypoint,
        setNavigatorPosition,
        rerouteToShelter,
        resetRoute,
        toggleSurgeAlert,
        setSurgePreset,
        attuneLedger,
        playBellSound,
        playAttuneSound,
        playClickSound,
        playExplosionSound,
        playVolcanoSound,
        playWaterfallSound,
        playWindSound,
        playBirdSound,
        stopActiveSound,
      }}
    >
      {children}
    </LedgerContext.Provider>
  );
};

export const useLedger = (): LedgerContextType => {
  const context = useContext(LedgerContext);
  if (!context) {
    throw new Error('useLedger must be used within a LedgerProvider');
  }
  return context;
};
