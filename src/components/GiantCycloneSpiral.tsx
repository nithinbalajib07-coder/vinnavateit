import React from 'react';

/**
 * Giant Cyclone-Shaped Animated Spiral Spanning Across Entire Screen
 * for The Warden's Bell Dispatch.
 * Features massive multi-arm logarithmic hurricane vortex bands,
 * high-velocity cyclonic streamlines, and a glowing central storm eye.
 */

export const GiantCycloneSpiral: React.FC<{
  isUrgent?: boolean;
}> = ({ isUrgent = true }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-0 select-none">
      {/* Ambient Radial Cyclone Atmosphere Glow */}
      <div
        className={`absolute w-[900px] h-[900px] sm:w-[1400px] sm:h-[1400px] rounded-full blur-[140px] transition-all duration-1000 ${
          isUrgent
            ? 'bg-gradient-to-tr from-rose-950/40 via-red-900/30 to-amber-950/20 opacity-90'
            : 'bg-gradient-to-tr from-violet-950/20 via-purple-950/15 to-transparent opacity-40'
        }`}
      />

      {/* Primary Giant Cyclone Spiral Spanning Entire Screen */}
      <div
        className={`w-[1100px] h-[1100px] sm:w-[1600px] sm:h-[1600px] flex-shrink-0 transition-opacity duration-1000 ${
          isUrgent
            ? 'opacity-65 animate-[spin_12s_linear_infinite]'
            : 'opacity-25 animate-[spin_26s_linear_infinite]'
        }`}
      >
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full overflow-visible"
          fill="none"
        >
          <defs>
            {/* Crimson-Rose Cyclone Gradient */}
            <radialGradient id="cycloneEyeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="12%" stopColor="#f43f5e" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#e11d48" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#881337" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="cycloneArm1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fda4af" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#f43f5e" stopOpacity="0.75" />
              <stop offset="70%" stopColor="#be123c" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#881337" stopOpacity="0.05" />
            </linearGradient>

            <linearGradient id="cycloneArm2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fecdd3" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#fb7185" stopOpacity="0.65" />
              <stop offset="65%" stopColor="#9f1239" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#4c0519" stopOpacity="0.05" />
            </linearGradient>

            <linearGradient id="cycloneArm3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.7" />
              <stop offset="40%" stopColor="#f43f5e" stopOpacity="0.55" />
              <stop offset="80%" stopColor="#be123c" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>

            <filter id="cycloneGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Central Eye of the Storm Vortex Core */}
          <circle cx="500" cy="500" r="160" fill="url(#cycloneEyeGlow)" />
          <circle
            cx="500"
            cy="500"
            r="38"
            fill="#ffffff"
            className="animate-pulse"
            opacity="0.85"
            filter="url(#cycloneGlowFilter)"
          />
          <circle cx="500" cy="500" r="18" fill="#ffe4e6" />

          {/* Major Cyclone Vortex Arm 1 (Sweeping Northwest -> South -> East -> North) */}
          <path
            d="M 500,500 
               C 530,470 570,480 590,520 
               C 620,580 570,660 500,680 
               C 390,710 290,610 290,490 
               C 290,330 430,200 580,200 
               C 760,200 920,350 910,540 
               C 900,760 700,950 470,950 
               C 210,950 20,730 20,460 
               C 20,170 270,-20 570,-20"
            stroke="url(#cycloneArm1)"
            strokeWidth="14"
            strokeLinecap="round"
            filter="url(#cycloneGlowFilter)"
          />

          {/* Major Cyclone Vortex Arm 2 (Sweeping Southeast -> North -> West -> South) */}
          <path
            d="M 500,500 
               C 470,530 430,520 410,480 
               C 380,420 430,340 500,320 
               C 610,290 710,390 710,510 
               C 710,670 570,800 420,800 
               C 240,800 80,650 90,460 
               C 100,240 300,50 530,50 
               C 790,50 980,270 980,540 
               C 980,830 730,1020 430,1020"
            stroke="url(#cycloneArm2)"
            strokeWidth="12"
            strokeLinecap="round"
            filter="url(#cycloneGlowFilter)"
          />

          {/* Major Cyclone Vortex Arm 3 (Fast Inner Spiral Gale Arc) */}
          <path
            d="M 500,500 
               C 520,530 490,570 450,560 
               C 390,550 360,470 390,410 
               C 430,330 530,310 600,350 
               C 700,400 730,530 680,630 
               C 610,760 440,810 320,740 
               C 170,660 120,470 170,310 
               C 230,120 440,30 630,70 
               C 850,120 990,320 960,560"
            stroke="url(#cycloneArm3)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Streamline Wind Streaks & Atmospheric Bands */}
          <path
            d="M 500,500 
               C 550,440 620,470 640,540 
               C 660,630 580,720 480,730 
               C 350,740 240,620 250,470 
               C 260,300 410,160 590,170 
               C 800,180 960,350 940,570"
            stroke="#f43f5e"
            strokeWidth="3.5"
            strokeDasharray="18 12 6 12"
            strokeLinecap="round"
            opacity="0.7"
          />
          <path
            d="M 500,500 
               C 450,560 380,530 360,460 
               C 340,370 420,280 520,270 
               C 650,260 760,380 750,530 
               C 740,700 590,840 410,830 
               C 200,820 40,650 60,430"
            stroke="#fda4af"
            strokeWidth="2.8"
            strokeDasharray="24 16 8 16"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Outer High-Altitude Jet-Stream Spiral Rings */}
          <circle cx="500" cy="500" r="280" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="8 14" opacity="0.4" />
          <circle cx="500" cy="500" r="390" stroke="#fb7185" strokeWidth="1" strokeDasharray="12 20" opacity="0.3" />
          <circle cx="500" cy="500" r="480" stroke="#fda4af" strokeWidth="0.8" strokeDasharray="16 28" opacity="0.25" />
        </svg>
      </div>

      {/* Secondary Counter-Rotating Outer Cyclone Cloud Wisp Ring */}
      <div
        className={`w-[1300px] h-[1300px] sm:w-[1900px] sm:h-[1900px] flex-shrink-0 absolute transition-opacity duration-1000 ${
          isUrgent
            ? 'opacity-35 animate-[spin_24s_linear_infinite_reverse]'
            : 'opacity-15 animate-[spin_45s_linear_infinite_reverse]'
        }`}
      >
        <svg viewBox="0 0 1000 1000" className="w-full h-full overflow-visible" fill="none">
          <path
            d="M 500,500 
               C 600,400 750,500 750,650 
               C 750,850 500,950 300,850 
               C 100,750 50,500 150,300 
               C 250,100 550,20 800,120"
            stroke="#be123c"
            strokeWidth="6"
            strokeDasharray="30 20"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path
            d="M 500,500 
               C 400,600 250,500 250,350 
               C 250,150 500,50 700,150 
               C 900,250 950,500 850,700 
               C 750,900 450,980 200,880"
            stroke="#e11d48"
            strokeWidth="4"
            strokeDasharray="40 25"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
};
