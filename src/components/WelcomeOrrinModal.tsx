import React from 'react';
import { getSharedAudioContext, preloadAllCodexAudio } from '../context/LedgerContext';

interface WelcomeOrrinModalProps {
  isOpen: boolean;
  onClose: () => void;
  playEnterChime?: () => void;
}

export const WelcomeOrrinModal: React.FC<WelcomeOrrinModalProps> = ({
  isOpen,
  onClose,
  playEnterChime,
}) => {
  if (!isOpen) return null;

  const handleEnter = () => {
    // Resume Web Audio context immediately on user click
    const ctx = getSharedAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    preloadAllCodexAudio();

    if (playEnterChime) {
      playEnterChime();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in select-none">
      {/* Ambient Neon Violet Background Radial Glow */}
      <div className="absolute w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] rounded-full bg-gradient-to-tr from-violet-950/40 via-fuchsia-950/30 to-transparent blur-[140px] pointer-events-none" />

      {/* Main Welcome Modal Card (Black & Neon Violet Theme) */}
      <div className="relative z-10 w-full max-w-xl rounded-[2.5rem] bg-[#070310]/95 border-2 border-violet-500/60 shadow-[0_0_65px_rgba(192,132,252,0.35),0_15px_45px_rgba(0,0,0,0.9)] p-7 sm:p-10 flex flex-col items-center text-center overflow-hidden">
        {/* Subtle Neon Violet Corner Ornaments */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-violet-500/25 to-transparent rounded-br-[2.5rem] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-fuchsia-500/25 to-transparent rounded-tl-[2.5rem] pointer-events-none" />

        {/* Animated Rotating Celestial Compass Sigil */}
        <div className="relative mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-violet-950/60 border-2 border-violet-400 shadow-[0_0_35px_rgba(192,132,252,0.55)] flex items-center justify-center relative overflow-hidden">
            <svg
              className="w-12 h-12 sm:w-14 sm:h-14 text-violet-300 animate-[spin_16s_linear_infinite]"
              viewBox="0 0 48 48"
              fill="none"
            >
              {/* 8-point compass star */}
              <path
                d="M 24 2 L 27 19 L 44 22 L 27 25 L 24 42 L 21 25 L 4 22 L 21 19 Z"
                fill="#c084fc"
                fillOpacity="0.85"
              />
              <path
                d="M 24 8 L 26 19 L 37 21 L 26 23 L 24 34 L 22 23 L 11 21 L 22 19 Z"
                fill="#ffffff"
                transform="rotate(45 24 24)"
                fillOpacity="0.75"
              />
              <circle cx="24" cy="24" r="3.5" fill="#ffffff" />
            </svg>
          </div>
          {/* Pulsing Outer Neon Violet Aura */}
          <div className="absolute inset-0 rounded-full border border-violet-400/40 animate-ping opacity-30 pointer-events-none" />
        </div>

        {/* Big Text: WELCOME TO ORRIN */}
        <h1 className="font-serif font-black text-3xl sm:text-5xl tracking-wide sm:tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-violet-100 to-violet-300 drop-shadow-[0_0_25px_rgba(192,132,252,0.7)] uppercase mb-3">
          WELCOME TO ORRIN
        </h1>

        {/* Visual Neon Violet Divider */}
        <div className="flex items-center gap-2 my-2 w-36">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-violet-400" />
          <div className="w-2 h-2 rotate-45 bg-violet-400 shadow-[0_0_8px_#c084fc]" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-violet-400" />
        </div>

        {/* Styled Audio Experience Capsule */}
        <div className="my-5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#0d051f]/90 via-[#18082e]/90 to-[#0d051f]/90 border border-violet-400/50 shadow-[0_0_30px_rgba(192,132,252,0.3),inset_0_1px_15px_rgba(192,132,252,0.15)] flex items-center gap-3.5 backdrop-blur-md">
          {/* Neon Soundwave Pulsing Visualizer */}
          <div className="flex items-end gap-1 h-5 px-0.5">
            <span className="w-1 bg-gradient-to-t from-violet-600 to-violet-300 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-3 shadow-[0_0_8px_#c084fc]" />
            <span className="w-1 bg-gradient-to-t from-fuchsia-600 to-fuchsia-300 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_0.15s] h-5 shadow-[0_0_10px_#e879f9]" />
            <span className="w-1 bg-gradient-to-t from-purple-600 to-purple-300 rounded-full animate-[pulse_0.7s_ease-in-out_infinite_0.3s] h-2.5 shadow-[0_0_8px_#a855f7]" />
            <span className="w-1 bg-gradient-to-t from-violet-600 to-cyan-300 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_0.1s] h-4.5 shadow-[0_0_9px_#38bdf8]" />
            <span className="w-1 bg-gradient-to-t from-fuchsia-600 to-pink-300 rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.25s] h-3.5 shadow-[0_0_8px_#f472b6]" />
          </div>

          {/* Styled Entry Text */}
          <p className="font-sans text-xs sm:text-sm font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-violet-100 via-white to-fuchsia-200 drop-shadow-[0_0_12px_rgba(192,132,252,0.5)]">
            enable audio in your laptop for better ui experience
          </p>

          {/* Glowing Animated Headphone Icon */}
          <div className="w-7 h-7 rounded-full bg-violet-950/80 border border-violet-400/60 flex items-center justify-center shadow-[0_0_12px_rgba(192,132,252,0.5)]">
            <span className="material-symbols-outlined text-[16px] text-violet-200 animate-pulse">
              headphones
            </span>
          </div>
        </div>

        {/* Context description */}
        <p className="font-serif text-xs sm:text-sm text-gray-300/90 max-w-md leading-relaxed my-2">
          Experience live elemental acoustics across Orrin: roaring waterfalls in Tidereach,
          whistling winds in Skydrift, songbirds in Shadowmere, and thunderous caldera eruptions in Emberhold.
        </p>

        {/* Interactive "Enter Codex" Button */}
        <button
          onClick={handleEnter}
          className="mt-6 px-9 py-3.5 rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-label font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(192,132,252,0.6)] hover:shadow-[0_0_40px_rgba(192,132,252,0.85)] hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 border border-violet-300/50"
        >
          <span className="material-symbols-outlined text-[20px]">play_arrow</span>
          <span>Enter Codex</span>
        </button>
      </div>
    </div>
  );
};
