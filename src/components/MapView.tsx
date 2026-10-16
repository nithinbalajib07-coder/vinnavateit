import React, { useState, useRef } from 'react';
import { useLedger } from '../context/LedgerContext';
import { DOMAINS } from '../data/domains';
import { Waypoint, DomainId } from '../types/world';
import { VIOLET_PATHS, checkHazardZoneAlert, snapToClosestVioletPath } from '../data/route';
import {
  BurningFireScene,
  GrowingPlantsScene,
  BeachWavesScene,
  WindblownGrasslandScene,
} from './ElementalSidePanelScenes';

interface ThemeConfig {
  elementKey: 'water' | 'air' | 'earth' | 'fire';
  name: string;
  themeTitle: string;
  subTitle: string;
  element: string;
  displayPrefix: string;
  titleGradient: string;
  bg: string;
  cardBg: string;
  border: string;
  glow: string;
  accent: string;
  accentBg: string;
  badgeBorder: string;
  iconColor: string;
  meterGradient: string;
  metricLabel: string;
  metricValue: string;
  ambience: string;
  iconName: string;
  ambientType: 'underwater' | 'air' | 'earth' | 'fire';
}

const DOMAIN_THEMES: Record<DomainId, ThemeConfig> = {
  tidereach: {
    elementKey: 'water',
    name: 'Tidereach',
    themeTitle: 'Underwater & Abyssal Realm',
    subTitle: 'Sunken Marble Shoals & Canal Delta',
    element: 'Underwater & Tidal Currents',
    displayPrefix: '~ ~ ~',
    titleGradient: 'from-white via-cyan-100 to-cyan-400',
    bg: 'bg-gradient-to-b from-[#02121e] via-[#052236] to-[#010c14]',
    cardBg: 'bg-[#061e31]/90 backdrop-blur-md',
    border: 'border-cyan-400/40',
    glow: 'shadow-[0_0_35px_rgba(0,240,255,0.22)]',
    accent: 'text-cyan-300',
    accentBg: 'bg-cyan-950/80',
    badgeBorder: 'border-cyan-400/50',
    iconColor: 'text-cyan-400',
    meterGradient: 'from-teal-400 via-cyan-400 to-blue-500',
    metricLabel: 'Tidal Harmonic Swell & Depth',
    metricValue: '140 Fathoms · 32.4 ψ',
    ambience: 'Water-droplets resonate through submerged marble canals. The wake of skiffs rocks quietly against mossy reeds.',
    iconName: 'water_drop',
    ambientType: 'underwater',
  },
  skydrift: {
    elementKey: 'air',
    name: 'Cloud Weavers Region',
    themeTitle: 'Air & Aerodynamic Realm',
    subTitle: 'Floating Limestone Towers & Sway-Bridges',
    element: 'Air & Updraft Currents',
    displayPrefix: '· — ·',
    titleGradient: 'from-white via-sky-100 to-sky-300',
    bg: 'bg-gradient-to-b from-[#06132a] via-[#0d224b] to-[#040b1a]',
    cardBg: 'bg-[#0c2041]/90 backdrop-blur-md',
    border: 'border-sky-400/40',
    glow: 'shadow-[0_0_35px_rgba(56,189,248,0.22)]',
    accent: 'text-sky-300',
    accentBg: 'bg-sky-950/80',
    badgeBorder: 'border-sky-400/50',
    iconColor: 'text-sky-400',
    meterGradient: 'from-sky-300 via-cyan-400 to-indigo-400',
    metricLabel: 'Atmospheric Updraft Velocity',
    metricValue: '41.0 ψ · 28 Knots WNW',
    ambience: 'High-altitude crosswinds whistle through braided suspension tethers. Clouds drift beneath swaying limestone walkways.',
    iconName: 'air',
    ambientType: 'air',
  },
  stonemarch: {
    elementKey: 'earth',
    name: 'Stonemarch',
    themeTitle: 'Earth & Nature Realm',
    subTitle: 'Monolithic Bastions & Bedrock Deepvaults',
    element: 'Earth & Nature · Granite Currents',
    displayPrefix: '❖ ❖ ❖',
    titleGradient: 'from-white via-emerald-100 to-emerald-400',
    bg: 'bg-gradient-to-b from-[#06150b] via-[#0b2616] to-[#040e08]',
    cardBg: 'bg-[#092013]/90 backdrop-blur-md',
    border: 'border-emerald-400/40',
    glow: 'shadow-[0_0_35px_rgba(16,185,129,0.22)]',
    accent: 'text-emerald-300',
    accentBg: 'bg-emerald-950/80',
    badgeBorder: 'border-emerald-400/50',
    iconColor: 'text-emerald-400',
    meterGradient: 'from-lime-400 via-emerald-400 to-amber-500',
    metricLabel: 'Bedrock Tectonic Acoustic Frequency',
    metricValue: '18.6 ψ · Keystone Fixed',
    ambience: 'Subterranean geothermal heat hums through bedrock walls. Ancient chiseled tallies stand immutable.',
    iconName: 'landscape',
    ambientType: 'earth',
  },
  emberhold: {
    elementKey: 'fire',
    name: 'Emberhold',
    themeTitle: 'Fire & Molten Crucible Realm',
    subTitle: 'Smoldering Calderas & Forge Slagways',
    element: 'Fire & Thermal Magma Currents',
    displayPrefix: '▲ ▲ ▲',
    titleGradient: 'from-white via-amber-200 to-orange-500',
    bg: 'bg-gradient-to-b from-[#1b0606] via-[#2d0b0b] to-[#120404]',
    cardBg: 'bg-[#220a0a]/90 backdrop-blur-md',
    border: 'border-orange-500/40',
    glow: 'shadow-[0_0_35px_rgba(249,115,22,0.25)]',
    accent: 'text-orange-400',
    accentBg: 'bg-orange-950/80',
    badgeBorder: 'border-orange-500/50',
    iconColor: 'text-orange-400',
    meterGradient: 'from-amber-400 via-orange-500 to-red-600',
    metricLabel: 'Crucible Thermal Radiance',
    metricValue: '68.2 ψ · 940°C Slagflow',
    ambience: 'Incandescent molten veins surge through basalt troughs. Scalding sulfur sparks crackle in the forge air.',
    iconName: 'local_fire_department',
    ambientType: 'fire',
  },
};

export const MapView: React.FC = () => {
  const {
    currentWaypoint,
    currentWaypointIndex,
    jumpToWaypoint,
    route,
    isRerouted,
    rerouteToShelter,
    setShowBorderModal,
    navigatorCoords,
    setNavigatorPosition,
    playBellSound,
    playVolcanoSound,
    playWaterfallSound,
    playWindSound,
    playBirdSound,
    stopActiveSound,
  } = useLedger();

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showCurrentsLayer, setShowCurrentsLayer] = useState<boolean>(true);
  const [showHazardsLayer, setShowHazardsLayer] = useState<boolean>(true);
  const [hoveredWp, setHoveredWp] = useState<Waypoint | null>(null);
  const [hoveredCoordsWp, setHoveredCoordsWp] = useState<Waypoint | null>(null);
  const [activeWarning, setActiveWarning] = useState<{
    type: 'CRITICAL' | 'WARNING';
    title: string;
    message: string;
  } | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const lastWarningSoundRef = useRef<number>(0);
  type SoundZone = 'volcano' | 'skydrift' | 'forest' | 'water' | 'none';
  const currentSoundZoneRef = useRef<SoundZone>('none');
  const lastSoundTriggerTimeRef = useRef<number>(0);
  const activeCoordsWpRef = useRef<Waypoint | null>(null);

  // The active place is the currently hovered waypoint (node focus),
  // OR the nearest waypoint to the cursor hover coordinates,
  // OR the current traveling waypoint
  const activePlace = hoveredWp || hoveredCoordsWp || currentWaypoint;
  const activeDomain = activePlace.domainId;
  const theme = DOMAIN_THEMES[activeDomain] || DOMAIN_THEMES.tidereach;
  const domainInfo = DOMAINS[activeDomain];

  // Waypoint click handler with situational sound effects (strictly exclusive)
  const handleWaypointClick = (wp: Waypoint, idx: number) => {
    jumpToWaypoint(idx);
    stopActiveSound();

    let targetZone: SoundZone = 'none';
    if (wp.id === 'wp-ashfall-volcano' || wp.id === 'wp-cinder-crag' || wp.id === 'wp-sulfur-vents') {
      targetZone = 'volcano';
      playVolcanoSound();
    } else if (
      wp.id === 'wp-shadowmere-trail' ||
      wp.id === 'wp-shadowmere-rest' ||
      wp.id === 'wp-sunken-foundry'
    ) {
      targetZone = 'forest';
      playBirdSound();
    } else if (wp.domainId === 'tidereach') {
      targetZone = 'water';
      playWaterfallSound();
    } else if (wp.domainId === 'skydrift') {
      targetZone = 'skydrift';
      playWindSound();
    }
    currentSoundZoneRef.current = targetZone;
    lastSoundTriggerTimeRef.current = Date.now();
  };

  // Handle cursor hover and movement across map
  const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Convert screen coordinates to SVG viewBox (1024 x 690)
    const scaleX = 1024 / rect.width;
    const scaleY = 690 / rect.height;
    const svgX = clientX * scaleX;
    const svgY = clientY * scaleY;

    // 1. Find closest waypoint to cursor position within interactive range with hysteresis
    let candidateWp: Waypoint | null = null;
    let candidateMinDist = Infinity;
    for (const wp of route) {
      const dist = Math.hypot(wp.x - svgX, wp.y - svgY);
      if (dist < candidateMinDist) {
        candidateMinDist = dist;
        candidateWp = wp;
      }
    }

    if (candidateWp && candidateMinDist < 70) {
      const currentActiveDist = activeCoordsWpRef.current
        ? Math.hypot(activeCoordsWpRef.current.x - svgX, activeCoordsWpRef.current.y - svgY)
        : Infinity;
      // Require the candidate to be at least 14px closer before switching to prevent fluttering
      if (!activeCoordsWpRef.current || (candidateWp.id !== activeCoordsWpRef.current.id && candidateMinDist < currentActiveDist - 14)) {
        activeCoordsWpRef.current = candidateWp;
        setHoveredCoordsWp(candidateWp);
      }
    } else if (activeCoordsWpRef.current) {
      const currentActiveDist = Math.hypot(activeCoordsWpRef.current.x - svgX, activeCoordsWpRef.current.y - svgY);
      if (currentActiveDist > 80) {
        activeCoordsWpRef.current = null;
        setHoveredCoordsWp(null);
      }
    }

    // 2. Smooth, non-vibrating cursor tracking with continuous magnetic smoothstep blending:
    // When distance <= 12px: locked cleanly on path
    // When distance >= 28px: smooth free cursor
    // Between 12px and 28px: cubic smoothstep blend eliminates any abrupt step jumps or vibration
    const snapped = snapToClosestVioletPath(svgX, svgY, 28);
    let targetX = svgX;
    let targetY = svgY;
    if (snapped.dist <= 12) {
      targetX = snapped.x;
      targetY = snapped.y;
    } else if (snapped.dist < 28) {
      const t = (28 - snapped.dist) / 16;
      const blend = t * t * (3 - 2 * t);
      targetX = svgX + (snapped.x - svgX) * blend;
      targetY = svgY + (snapped.y - svgY) * blend;
    }
    setNavigatorPosition(targetX, targetY, false);

    const checkX = svgX;
    const checkY = svgY;
    const now = Date.now();

    // 3. Situational Sound Effects with Exact Single-Audio Exclusivity:
    // Only ONE audio plays at any time; moving to a next place stops the previous audio immediately!
    const distToVolcano = Math.hypot(checkX - 895, checkY - 175);
    const distToCinderCrag = Math.hypot(checkX - 145, checkY - 140);
    const isVolcanoArea =
      distToVolcano < 150 ||
      distToCinderCrag < 130 ||
      (checkX >= 760 && checkX <= 1010 && checkY >= 60 && checkY <= 280) ||
      (checkX >= 50 && checkX <= 280 && checkY >= 70 && checkY <= 260);

    const distToPort = Math.hypot(checkX - 194, checkY - 515);
    const distToRoadway = Math.hypot(checkX - 340, checkY - 448);
    const isWaterArea =
      distToPort < 110 ||
      distToRoadway < 95 ||
      (checkX <= 380 && checkY >= 430 && checkY <= 650);

    const distToCloudWeavers = Math.hypot(checkX - 520, checkY - 240);
    const distToGaleShear = Math.hypot(checkX - 640, checkY - 195);
    const distToMistChasm = Math.hypot(checkX - 448, checkY - 340);
    const isSkydriftArchipelago =
      (checkX >= 340 && checkX <= 750 && checkY >= 50 && checkY <= 345) ||
      distToCloudWeavers < 160 ||
      distToGaleShear < 160 ||
      distToMistChasm < 130;

    const distToForestTrail = Math.hypot(checkX - 540, checkY - 490);
    const distToWillowGrove = Math.hypot(checkX - 470, checkY - 480);
    const distToSunkenFoundry = Math.hypot(checkX - 818, checkY - 468);
    const isShadowmereForest =
      (checkX >= 390 && checkX <= 670 && checkY >= 420 && checkY <= 590) ||
      distToForestTrail < 140 ||
      distToWillowGrove < 140 ||
      distToSunkenFoundry < 120;

    let detectedZone: SoundZone = 'none';
    if (isVolcanoArea) {
      detectedZone = 'volcano';
    } else if (isSkydriftArchipelago) {
      detectedZone = 'skydrift';
    } else if (isShadowmereForest) {
      detectedZone = 'forest';
    } else if (isWaterArea) {
      detectedZone = 'water';
    }

    const prevZone = currentSoundZoneRef.current;
    if (detectedZone !== prevZone) {
      // Transitioning to a new place or leaving to neutral ground: stop previous audio immediately!
      stopActiveSound();
      currentSoundZoneRef.current = detectedZone;
      lastSoundTriggerTimeRef.current = now;

      if (detectedZone === 'volcano') {
        playVolcanoSound();
      } else if (detectedZone === 'skydrift') {
        playWindSound();
      } else if (detectedZone === 'forest') {
        playBirdSound();
      } else if (detectedZone === 'water') {
        playWaterfallSound();
      }
    } else if (detectedZone !== 'none') {
      // Lingering in the same place: loop sound smoothly after completion (~5.1s for water, ~2.9s for others)
      const loopInterval = detectedZone === 'water' ? 5100 : 2900;
      if (now - lastSoundTriggerTimeRef.current > loopInterval) {
        lastSoundTriggerTimeRef.current = now;
        if (detectedZone === 'volcano') {
          playVolcanoSound();
        } else if (detectedZone === 'skydrift') {
          playWindSound();
        } else if (detectedZone === 'forest') {
          playBirdSound();
        } else if (detectedZone === 'water') {
          playWaterfallSound();
        }
      }
    }

    // 4. POP-UP APPEARS ONLY WHEN MOVING THROUGH DANGEROUS ZONES!
    const hazard = checkHazardZoneAlert(snapped.x, snapped.y) || checkHazardZoneAlert(svgX, svgY);
    if (hazard) {
      setActiveWarning(hazard);
      if (hazard.type === 'CRITICAL' && now - lastWarningSoundRef.current > 4000) {
        playBellSound();
        lastWarningSoundRef.current = now;
      }
    } else {
      setActiveWarning(null);
    }
  };

  const handleSvgMouseLeave = () => {
    setHoveredWp(null);
    setHoveredCoordsWp(null);
    activeCoordsWpRef.current = null;
    setActiveWarning(null);
    currentSoundZoneRef.current = 'none';
    stopActiveSound();
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-4rem)] bg-[#05020a] relative overflow-hidden select-none p-2 sm:p-4 gap-3 lg:gap-4">
      {/* 1. Main Map Canvas Area (Framed explorer view, does NOT occupy entire screen) */}
      <div className="flex-1 min-w-0 relative flex flex-col rounded-[2.5rem] bg-[#080410] border border-violet-500/30 shadow-[0_12px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(192,132,252,0.12)] overflow-hidden min-h-[460px] lg:min-h-0">
        {/* Top Controls Capsule Overlay */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Map Title Capsule with Dynamic Elemental Indicator */}
          <div
            className={`ts-themed pointer-events-auto bg-[#0d071a]/95 backdrop-blur-md px-4 py-2 rounded-full border ${theme.border} shadow-xl flex items-center gap-2.5 text-white transition-all duration-300`}
            data-ts-element={theme.elementKey}
          >
            <div className="flex items-center gap-2">
              <span className={`material-symbols-outlined text-[17px] ${theme.iconColor}`}>
                {theme.iconName}
              </span>
              <span className="font-serif font-bold text-sm text-white">
                Orrin
              </span>
              <span className="text-white/30">·</span>
              <span className={`font-label text-[10.5px] uppercase font-bold ${theme.accent}`}>
                {theme.themeTitle}
              </span>
              <span className="font-mono text-[10px] text-white bg-black/70 px-2 py-0.5 rounded-full border border-white/20">
                X:{navigatorCoords.x} · Y:{navigatorCoords.y}
              </span>
            </div>
          </div>

          {/* DYNAMIC WARNING ALERT POPUP: ONLY APPEARS WHEN MOVING THROUGH DANGEROUS ZONES */}
          {activeWarning && (
            <div
              className={`pointer-events-auto px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-3 border backdrop-blur-md transition-all ${
                activeWarning.type === 'CRITICAL'
                  ? 'bg-red-950/95 text-red-100 border-red-500 shadow-[0_0_35px_rgba(244,63,94,0.55)]'
                  : 'bg-amber-950/95 text-amber-100 border-amber-400 shadow-[0_0_28px_rgba(245,158,11,0.45)]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] ${
                  activeWarning.type === 'CRITICAL' ? 'text-red-400 animate-pulse' : 'text-amber-400'
                }`}
              >
                warning
              </span>
              <div className="text-xs">
                <span className="font-label font-bold uppercase tracking-wider text-[10px] block text-red-200">
                  {activeWarning.title}
                </span>
                <span className="font-serif text-[11px] text-gray-200">
                  {activeWarning.message}
                </span>
              </div>
            </div>
          )}

          {/* Map Layer Controls Capsule */}
          <div className="pointer-events-auto flex items-center gap-1.5 bg-[#0d071a]/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-violet-500/35 shadow-xl text-xs">
            <button
              onClick={() => setShowHazardsLayer(!showHazardsLayer)}
              className={`px-3 py-1 rounded-full font-label text-[11px] font-semibold transition-all cursor-pointer ${
                showHazardsLayer
                  ? 'bg-amber-950/80 text-amber-200 border border-amber-400 font-bold'
                  : 'text-gray-400 hover:text-white border border-transparent'
              }`}
            >
              Hazards
            </button>
            <div className="w-[1px] h-4 bg-violet-500/30 mx-1"></div>
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2.0))}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-violet-300 border border-violet-500/30 cursor-pointer"
              title="Zoom In"
            >
              <span className="material-symbols-outlined text-[15px]">add</span>
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-white/10 text-violet-300 border border-violet-500/30 cursor-pointer"
              title="Zoom Out"
            >
              <span className="material-symbols-outlined text-[15px]">remove</span>
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="px-2.5 py-1 text-[10px] font-label font-bold text-gray-300 hover:text-white cursor-pointer rounded-full"
            >
              Reset
            </button>
          </div>
        </div>

        {/* SVG Map Canvas Container */}
        <div className="flex-1 w-full h-full relative overflow-hidden flex items-center justify-center">
          <div
            className="w-full h-full transition-transform duration-300 ease-out origin-center flex items-center justify-center"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 1024 690"
              className="w-full h-full object-contain cursor-crosshair"
              preserveAspectRatio="xMidYMid meet"
              onMouseMove={handleSvgMouseMove}
              onMouseLeave={handleSvgMouseLeave}
            >
              <defs>
                <filter id="neon-cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="neon-violet-glow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="neon-gold-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                {/* Wisp Orb Navigator Gradients & Glow */}
                <radialGradient id="wisp-core-gradient" cx="40%" cy="36%" r="68%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="22%" stopColor="#fffbeb" />
                  <stop offset="52%" stopColor="#fde047" />
                  <stop offset="82%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#b45309" />
                </radialGradient>
                <radialGradient id="wisp-aura-gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fde047" stopOpacity="0.6" />
                  <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                </radialGradient>
                <filter id="wisp-soft-glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. Base Map Illustrated Canvas */}
              <image
                href="/orrin_map.jpg"
                x="0"
                y="0"
                width="1024"
                height="690"
                preserveAspectRatio="xMidYMid slice"
              />

              {/* 2. Neon Violet Path Hover Hit Areas */}
              <g>
                {VIOLET_PATHS.map((pathPts, pIdx) => {
                  const dStr = pathPts.reduce(
                    (acc, pt, i) => (i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`),
                    ''
                  );
                  return (
                    <path
                      key={pIdx}
                      d={dStr}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="45"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="cursor-pointer"
                    />
                  );
                })}
              </g>

              {/* 3. Hazard Overlays (Dangerous Zones) */}
              {showHazardsLayer && (
                <g className="pointer-events-none">
                  {/* Gale-Shear Pass Vortex */}
                  <circle
                    cx="640"
                    cy="195"
                    r="48"
                    fill="rgba(244, 63, 94, 0.12)"
                    stroke="#f43f5e"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    filter="url(#neon-violet-glow)"
                  />
                  {/* Sulfur Vents Hazard */}
                  <circle
                    cx="240"
                    cy="260"
                    r="40"
                    fill="rgba(245, 158, 11, 0.12)"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    filter="url(#neon-gold-glow)"
                  />
                  {/* Ashfall Volcano Hazard */}
                  <circle
                    cx="895"
                    cy="175"
                    r="55"
                    fill="rgba(239, 68, 68, 0.14)"
                    stroke="#ef4444"
                    strokeWidth="2.5"
                    strokeDasharray="5 3"
                    filter="url(#neon-violet-glow)"
                  />
                </g>
              )}

              {/* 4. Active Shelter Reroute Bypass */}
              {isRerouted && (
                <g className="pointer-events-none">
                  <path
                    d="M 520 240 Q 560 270 605 295 Q 675 320 740 330"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeDasharray="6 3"
                    strokeLinecap="round"
                    filter="url(#neon-cyan-glow)"
                  />
                  <circle cx="605" cy="295" r="7" fill="#10b981" stroke="#ffffff" strokeWidth="1.8" />
                  <text
                    x="605"
                    y="318"
                    fontFamily="Be Vietnam Pro"
                    fontSize="9.5"
                    fontWeight="bold"
                    fill="#34d399"
                    textAnchor="middle"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.9))"
                  >
                    ✓ Shelter 12 Active
                  </text>
                </g>
              )}

              {/* 5. Waypoint Nodes & Custom Gateway Arch Pointers (No SVG popups - all data on sidepane) */}
              {route.map((wp, idx) => {
                const isCurrent = idx === currentWaypointIndex;
                const isInspected = activePlace.id === wp.id;

                // Border Gate: Gateway Arch / Diamond Portal Sigil (Not a circle!)
                if (wp.isBorder) {
                  return (
                    <g
                      key={wp.id}
                      transform={`translate(${wp.x}, ${wp.y})`}
                      className="cursor-pointer group"
                      onClick={() => handleWaypointClick(wp, idx)}
                      onMouseEnter={() => setHoveredWp(wp)}
                      onMouseLeave={() => setHoveredWp(null)}
                    >
                      <polygon
                        points="0,-16 14,0 0,16 -14,0"
                        fill={isCurrent ? '#f59e0b' : '#07101b'}
                        stroke="#f59e0b"
                        strokeWidth={isInspected ? '3.5' : '2.5'}
                        filter="url(#neon-gold-glow)"
                        className={`transition-transform duration-200 ${
                          isInspected ? 'scale-125' : 'group-hover:scale-120'
                        }`}
                      />
                      <path
                        d="M -5 6 L -5 -4 Q 0 -9 5 -4 L 5 6 Z"
                        fill={isCurrent ? '#ffffff' : '#f59e0b'}
                      />
                    </g>
                  );
                }

                // Standard Landmark Node (NO popup tooltip - pure visual feedback)
                return (
                  <g
                    key={wp.id}
                    transform={`translate(${wp.x}, ${wp.y})`}
                    className="cursor-pointer group"
                    onClick={() => handleWaypointClick(wp, idx)}
                    onMouseEnter={() => setHoveredWp(wp)}
                    onMouseLeave={() => setHoveredWp(null)}
                  >
                    <circle
                      cx="0"
                      cy="0"
                      r={isInspected ? 8.5 : 6.5}
                      fill={isCurrent ? '#c084fc' : '#07101b'}
                      stroke="#c084fc"
                      strokeWidth={isInspected ? 2.8 : 2}
                      filter={isInspected || isCurrent ? 'url(#neon-violet-glow)' : undefined}
                      className="transition-all duration-200"
                    />
                    <circle cx="0" cy="0" r={isInspected ? 3.5 : 2.5} fill={isCurrent ? '#ffffff' : '#c084fc'} />
                  </g>
                );
              })}

              {/* 6. Dynamic Wayfarer Wisp Orb Navigator Cursor */}
              <g
                transform={`translate(${navigatorCoords.x}, ${navigatorCoords.y})`}
                className="pointer-events-none"
              >
                {/* Breathing Ethereal Aura */}
                <circle cx="0" cy="0" r="22" fill="url(#wisp-aura-gradient)">
                  <animate attributeName="r" values="18;25;18" dur="3s" repeatCount="indefinite" />
                </circle>

                {/* Expanding Soft Ripple */}
                <circle cx="0" cy="0" r="8" fill="none" stroke="#fcd34d" strokeWidth="0.8">
                  <animate attributeName="r" values="8;30" dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0" dur="2.6s" repeatCount="indefinite" />
                </circle>

                {/* Tilted Orbit A: faint track + sparkle riding along it */}
                <g transform="rotate(-28)">
                  <ellipse cx="0" cy="0" rx="16" ry="5.5" fill="none" stroke="#fef3c7" strokeWidth="0.5" opacity="0.4" />
                  <path d="M 0 -3 Q 0.5 -0.5 3 0 Q 0.5 0.5 0 3 Q -0.5 0.5 -3 0 Q -0.5 -0.5 0 -3 Z" fill="#ffffff" filter="url(#wisp-soft-glow)">
                    <animateMotion dur="2.8s" repeatCount="indefinite" path="M 16 0 A 16 5.5 0 1 1 -16 0 A 16 5.5 0 1 1 16 0" />
                    <animate attributeName="opacity" values="1;0.35;1" dur="2.8s" repeatCount="indefinite" />
                  </path>
                </g>

                {/* Tilted Orbit B: counter-rotating golden mote */}
                <g transform="rotate(38)">
                  <ellipse cx="0" cy="0" rx="13" ry="4.5" fill="none" stroke="#fde68a" strokeWidth="0.5" opacity="0.25" />
                  <circle cx="0" cy="0" r="1.6" fill="#f59e0b" filter="url(#wisp-soft-glow)">
                    <animateMotion dur="2.1s" repeatCount="indefinite" path="M -13 0 A 13 4.5 0 1 0 13 0 A 13 4.5 0 1 0 -13 0" />
                  </circle>
                </g>

                {/* Slow Outer Drifting Twinkles */}
                <g>
                  <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="9s" repeatCount="indefinite" />
                  <path d="M 20 -2 Q 20.4 -0.4 22 0 Q 20.4 0.4 20 2 Q 19.6 0.4 18 0 Q 19.6 -0.4 20 -2 Z" fill="#fef3c7">
                    <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" />
                  </path>
                  <circle cx="-14" cy="15" r="0.9" fill="#ffffff">
                    <animate attributeName="opacity" values="1;0.1;1" dur="2.3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="-6" cy="-21" r="0.8" fill="#fcd34d">
                    <animate attributeName="opacity" values="0.2;1;0.2" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Luminous Wisp Core */}
                <circle cx="0" cy="0" r="7" fill="url(#wisp-core-gradient)" filter="url(#wisp-soft-glow)">
                  <animate attributeName="r" values="6.6;7.6;6.6" dur="3s" repeatCount="indefinite" />
                </circle>

                {/* Specular Highlight */}
                <circle cx="-2" cy="-2.2" r="2" fill="#ffffff" opacity="0.9" />
              </g>
            </svg>
          </div>

          {/* Elemental Resonant Violet Path Navigation Hint Pill */}
          <div
            className={`ts-themed absolute bottom-4 left-4 z-20 bg-[#0d071a]/95 backdrop-blur-md px-4 py-2 rounded-full border ${theme.border} text-white text-xs flex items-center gap-2.5 shadow-lg transition-all duration-300`}
            data-ts-element={theme.elementKey}
          >
            <span className={`w-2 h-2 rounded-full ${theme.accent} bg-current animate-pulse`}></span>
            <span className="font-label text-[10.5px] text-white font-bold uppercase tracking-wider">
              Violet Path Tracking
            </span>
            <span className="text-white/40">·</span>
            <span className="font-serif text-gray-200 text-[11px]">
              Glide cursor over violet paths · <span className={theme.accent}>{theme.name}</span> active
            </span>
          </div>
        </div>
      </div>

      {/* 2. DEDICATED DYNAMIC THEMED SIDE PANE (Adapts to hovered place: Fire, Underwater, Earth & Nature, Air) */}
      <div
        className={`ts-themed w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 rounded-[2.5rem] ${theme.bg} border ${theme.border} ${theme.glow} p-5 sm:p-6 flex flex-col gap-4 overflow-y-auto max-h-[520px] lg:max-h-none shadow-2xl transition-[background-color,border-color,box-shadow] duration-300 ease-in-out relative`}
        data-ts-element={theme.elementKey}
      >
        {/* Ambient Element Background Accents */}
        {theme.ambientType === 'fire' && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]">
            <div className="absolute top-12 right-6 w-2 h-2 rounded-full bg-orange-400 animate-ember-1 shadow-[0_0_8px_#f97316]" />
            <div className="absolute top-36 right-16 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ember-2 shadow-[0_0_6px_#f59e0b]" />
            <div className="absolute top-64 right-10 w-2.5 h-2.5 rounded-full bg-rose-500 animate-ember-3 shadow-[0_0_10px_#f43f5e]" />
          </div>
        )}

        {theme.ambientType === 'underwater' && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]">
            <div className="absolute top-12 right-6 w-3 h-3 rounded-full border border-cyan-400/40 bg-cyan-400/10 animate-bubble-1" />
            <div className="absolute top-36 right-14 w-2 h-2 rounded-full border border-teal-300/40 bg-teal-300/15 animate-bubble-2" />
            <div className="absolute top-64 right-8 w-4 h-4 rounded-full border border-cyan-300/30 bg-cyan-300/10 animate-bubble-3" />
          </div>
        )}

        {theme.ambientType === 'earth' && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]">
            <span className="material-symbols-outlined absolute top-8 right-6 text-emerald-400/20 text-4xl animate-earth-pulse">
              forest
            </span>
            <span
              className="material-symbols-outlined absolute top-52 right-8 text-amber-500/20 text-2xl animate-earth-pulse"
              style={{ animationDelay: '1.5s' }}
            >
              spa
            </span>
          </div>
        )}

        {theme.ambientType === 'air' && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2.5rem]">
            <span className="material-symbols-outlined absolute top-10 right-4 text-sky-400/20 text-4xl animate-cloud-drift">
              cloud
            </span>
            <span
              className="material-symbols-outlined absolute top-48 right-12 text-indigo-400/20 text-3xl animate-cloud-drift"
              style={{ animationDelay: '2s' }}
            >
              air
            </span>
          </div>
        )}

        {/* Dynamic Realm Demarcation Header Capsule */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-black/60 border border-white/20 flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className={`material-symbols-outlined text-[18px] ${theme.iconColor}`}>
                {theme.iconName}
              </span>
            </div>
            <span className="font-label text-[10.5px] uppercase font-bold tracking-widest text-white drop-shadow-sm">
              {theme.themeTitle}
            </span>
          </div>
          <span
            className={`font-mono text-[10px] font-bold text-white ${theme.accentBg} px-3.5 py-1 rounded-full border ${theme.badgeBorder} shadow-sm flex items-center gap-1.5`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${theme.accent} bg-current animate-pulse`} />
            <span>{theme.name}</span>
          </span>
        </div>

        {/* Location & Landmark Title */}
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2">
            <span className="font-label text-[10.5px] uppercase font-bold text-white tracking-wider flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${theme.accent} bg-current`}></span>
              {activePlace.placeType || 'Landmark Location'}
            </span>
            <span className="font-mono text-[10px] text-white bg-black/60 px-2.5 py-0.5 rounded-full border border-white/20 shadow-sm flex items-center gap-1">
              <span className={theme.accent}>✦</span>
              <span className="font-bold">{activePlace.distanceFromStartKm} km</span>
            </span>
          </div>

          <h3 className="ts-display ts-quote-glow font-serif font-extrabold text-2xl sm:text-3xl text-white mt-1.5 leading-snug break-words">
            {activePlace.name}
          </h3>

          <p className={`font-serif italic text-xs ${theme.accent} mt-1 flex items-center gap-1.5`}>
            <span className="text-white/60 font-mono text-[10px]">{theme.displayPrefix}</span>
            <span>{theme.subTitle}</span>
          </p>
        </div>

        {/* Dynamic Animated Elemental Scene: Fire burning, Plants growing, Beach waves, Grassland wind */}
        <div className="relative z-10 w-full">
          {theme.ambientType === 'fire' && <BurningFireScene />}
          {theme.ambientType === 'earth' && <GrowingPlantsScene />}
          {theme.ambientType === 'underwater' && <BeachWavesScene />}
          {theme.ambientType === 'air' && <WindblownGrasslandScene />}
        </div>

        {/* Safety & Hazard Assessment Pill Card */}
        <div className="relative z-10">
          {activePlace.dangerStatus?.level === 'CRITICAL' ? (
            <div className="p-3.5 rounded-2xl bg-red-950/80 border border-red-500/60 shadow-lg flex items-start gap-2.5">
              <span className="material-symbols-outlined text-red-400 text-[20px] animate-pulse">
                warning
              </span>
              <div>
                <span className="font-label text-[10.5px] uppercase font-bold text-white block tracking-wider">
                  {activePlace.dangerStatus.label}
                </span>
                <p className="font-serif text-xs text-red-100 mt-0.5">
                  {activePlace.dangerStatus.details || 'Dangerous conditions detected! Maintain safety protocols.'}
                </p>
              </div>
            </div>
          ) : activePlace.dangerStatus?.level === 'WARNING' ? (
            <div className="p-3.5 rounded-2xl bg-orange-950/80 border border-orange-500/60 shadow-lg flex items-start gap-2.5">
              <span className="material-symbols-outlined text-orange-400 text-[20px]">
                warning
              </span>
              <div>
                <span className="font-label text-[10.5px] uppercase font-bold text-white block tracking-wider">
                  {activePlace.dangerStatus.label}
                </span>
                <p className="font-serif text-xs text-orange-100 mt-0.5">
                  {activePlace.dangerStatus.details || 'Atmospheric hazard active in this quadrant.'}
                </p>
              </div>
            </div>
          ) : activePlace.isBorder ? (
            <div className="p-3 rounded-2xl bg-amber-950/70 border border-amber-500/50 shadow-md flex items-center gap-2.5">
              <span className="material-symbols-outlined text-amber-400 text-[18px]">
                door_front
              </span>
              <span className="font-label text-[10.5px] uppercase font-bold text-white">
                Border Demarcation Gate · <span className="text-amber-300 font-semibold">Toll & Seal Verification</span>
              </span>
            </div>
          ) : (
            <div className="p-2.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">
                check_circle
              </span>
              <span className="font-label text-[10.5px] uppercase font-bold text-white">
                {activePlace.dangerStatus?.label || 'Safe Haven · Resonant Signal Active'}
              </span>
            </div>
          )}
        </div>

        {/* Dynamic Atmospheric / Elemental Metric Capsule Card */}
        <div
          className={`relative z-10 p-4 rounded-3xl ${theme.cardBg} border ${theme.border} ${theme.glow} space-y-2.5 shadow-sm`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="font-label text-[10.5px] uppercase font-bold text-white tracking-wider flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${theme.accent} bg-current`}></span>
              {activePlace.environmentalMetric?.label || theme.metricLabel}
            </span>
            <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-full bg-black/60 border border-white/20 text-white flex items-center gap-1 shadow-sm">
              <span className={theme.accent}>●</span>
              <span>{activePlace.environmentalMetric?.value || theme.metricValue}</span>
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden border border-white/10">
            <div
              className={`h-full bg-gradient-to-r ${theme.meterGradient} rounded-full transition-all duration-500 shadow-sm`}
              style={{
                width: `${activePlace.environmentalMetric?.percent || activePlace.currentStrength}%`,
              }}
            ></div>
          </div>
          <p className={`font-serif text-[11.5px] ${theme.accent} italic pt-1 leading-relaxed`}>
            <span className="text-white not-italic font-medium">Sensory Reading: </span>
            "{activePlace.sensoryQuote || theme.ambience}"
          </p>
        </div>

        {/* Territorial Description & Lore */}
        <div className="relative z-10 space-y-1.5">
          <span className="font-label text-[10.5px] uppercase font-bold text-white block tracking-wider flex items-center gap-1.5">
            <span className={`w-1.5 h-1.5 rounded-full ${theme.accent} bg-current`}></span>
            Territorial Description & World Lore
          </span>
          <p className="font-serif text-sm text-white/90 leading-relaxed font-normal">
            {activePlace.description}
          </p>
        </div>

        {/* Local Customs & Etiquette Notice */}
        <div className={`relative z-10 p-4 rounded-3xl ${theme.cardBg} border ${theme.border} space-y-2 shadow-sm`}>
          <div className="flex items-center gap-1.5">
            <span className={`material-symbols-outlined text-[17px] ${theme.iconColor}`}>
              gavel
            </span>
            <span className="font-label text-[10.5px] uppercase font-bold text-white tracking-wider">
              Local Customs & Taboos
            </span>
          </div>
          <p className="font-serif text-xs text-gray-200 leading-relaxed">
            {domainInfo.culture}
          </p>
          <p className={`font-serif text-[11px] ${theme.accent} italic pt-1 border-t border-white/10`}>
            <span className="text-white not-italic font-medium">Speaking Cadence: </span>
            {domainInfo.speakingStyle}
          </p>
        </div>

        {/* Relative Commerce & Scarcity Capsule */}
        <div className="relative z-10 grid grid-cols-2 gap-2.5">
          <div className={`p-3 rounded-2xl ${theme.cardBg} border ${theme.border} shadow-sm`}>
            <span className={`font-label text-[9.5px] uppercase font-bold ${theme.accent} block tracking-wider`}>
              Abundant Export
            </span>
            <p className="font-sans text-xs text-white mt-1 truncate font-bold">
              {domainInfo.produces[0]}
            </p>
          </div>
          <div className={`p-3 rounded-2xl ${theme.cardBg} border ${theme.border} shadow-sm`}>
            <span className="font-label text-[9.5px] uppercase font-bold text-amber-300 block tracking-wider">
              Severe Scarcity
            </span>
            <p className="font-sans text-xs text-white mt-1 truncate font-bold">
              {domainInfo.lacks[0]}
            </p>
          </div>
        </div>

        {/* Border Gate Inspection Capsule if on Border */}
        {activePlace.isBorder && (
          <div className="relative z-10 mt-1 p-4 rounded-3xl bg-amber-950/70 border border-amber-500/60 shadow-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-label text-[10.5px] uppercase font-bold text-white flex items-center gap-1.5 tracking-wider">
                <span className="material-symbols-outlined text-[16px] text-amber-400">door_front</span>
                Territorial Boundary
              </span>
              <span className="font-mono text-[9.5px] text-white bg-black/60 px-2.5 py-0.5 rounded-full border border-amber-500/40 font-bold">
                <span className="text-amber-300">● </span>Seal Inspection
              </span>
            </div>
            <p className="font-serif text-xs text-gray-200 leading-relaxed">
              Crossing into <span className="text-white font-bold">{activePlace.borderTo?.toUpperCase() || 'INCOMING DOMAIN'}</span>.
              Tidal coin is null beyond this post.
            </p>
            <button
              onClick={() => setShowBorderModal(true)}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-label text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">receipt_long</span>
              Inspect Checkpoint Docket
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
