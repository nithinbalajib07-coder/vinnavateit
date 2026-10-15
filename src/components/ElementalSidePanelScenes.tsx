import React from 'react';

/**
 * 1. Burning Fire Scene for Fire-Related Places (Emberhold)
 * Features an active burning fire with multi-layered animated flame tongues,
 * glowing hearth embers, heat haze, and rising incandescent sparks.
 */
export const BurningFireScene: React.FC = () => {
  return (
    <div className="relative w-full h-32 sm:h-36 rounded-3xl overflow-hidden bg-gradient-to-t from-[#1b0505] via-[#2f0c0c] to-[#120404] border border-orange-500/50 shadow-[0_0_25px_rgba(249,115,22,0.3)] flex flex-col justify-end p-3 select-none">
      {/* Top Banner Tag */}
      <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between z-20 pointer-events-none">
        <span className="font-label text-[9.5px] uppercase font-bold text-orange-300 flex items-center gap-1.5 bg-black/60 px-2.5 py-0.5 rounded-full border border-orange-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span>
          Active Crucible Hearth · Burning Fire
        </span>
        <span className="font-mono text-[9px] text-amber-300 bg-orange-950/80 px-2 py-0.5 rounded-full border border-orange-500/40">
          940°C Slagflow
        </span>
      </div>

      {/* Fiery Ambient Heat Glow Background */}
      <div className="absolute inset-0 bg-radial from-orange-500/20 via-red-600/10 to-transparent pointer-events-none animate-pulse" />

      {/* Floating Fiery Ember Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-6 left-1/4 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ember-1 shadow-[0_0_6px_#f59e0b]" />
        <div className="absolute bottom-8 left-1/2 w-2 h-2 rounded-full bg-orange-400 animate-ember-2 shadow-[0_0_8px_#f97316]" />
        <div className="absolute bottom-5 left-3/4 w-1.5 h-1.5 rounded-full bg-rose-500 animate-ember-3 shadow-[0_0_8px_#f43f5e]" />
        <div className="absolute bottom-10 left-1/3 w-1 h-1 rounded-full bg-yellow-300 animate-ember-1 shadow-[0_0_4px_#fde047]" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-7 left-2/3 w-2 h-2 rounded-full bg-orange-500 animate-ember-2 shadow-[0_0_6px_#ea580c]" style={{ animationDelay: '0.7s' }} />
      </div>

      {/* Burning Flames SVG Stage */}
      <div className="relative w-full h-24 flex items-end justify-center z-10">
        <svg viewBox="0 0 320 120" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYBottom meet">
          <defs>
            <linearGradient id="fire-outer-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#7f1d1d" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#dc2626" />
              <stop offset="80%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="fire-mid-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#c2410c" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="85%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <linearGradient id="fire-core-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="60%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
            <filter id="flame-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Hearth Coal & Basalt Logs at base */}
          <ellipse cx="160" cy="115" rx="100" ry="8" fill="#140606" opacity="0.95" />
          <path d="M 80 115 Q 160 110 240 115 Q 160 120 80 115 Z" fill="#2d0c0c" stroke="#f97316" strokeWidth="0.8" opacity="0.8" />

          {/* Outer Layer: Deep Crimson & Orange Roaring Flame Tongues */}
          <g filter="url(#flame-glow-filter)" className="origin-bottom" style={{ animation: 'flame-dance-1 1.8s infinite ease-in-out' }}>
            <path
              d="M 100 115 Q 115 75 130 50 Q 145 25 155 10 Q 165 30 180 55 Q 195 80 220 115 Q 160 108 100 115 Z"
              fill="url(#fire-outer-grad)"
              opacity="0.85"
            />
            <path
              d="M 125 115 Q 140 70 150 40 Q 160 15 170 35 Q 185 65 205 115 Z"
              fill="url(#fire-outer-grad)"
              opacity="0.8"
            />
          </g>

          {/* Middle Layer: Radiant Yellow-Orange Leaping Flame Tongues */}
          <g filter="url(#flame-glow-filter)" className="origin-bottom" style={{ animation: 'flame-dance-2 1.4s infinite ease-in-out' }}>
            <path
              d="M 115 115 Q 130 80 145 55 Q 158 28 162 18 Q 168 35 178 60 Q 190 85 205 115 Z"
              fill="url(#fire-mid-grad)"
            />
            <path
              d="M 135 115 Q 148 78 158 50 Q 168 70 185 115 Z"
              fill="url(#fire-mid-grad)"
              opacity="0.95"
            />
          </g>

          {/* Core Layer: Incandescent Blazing Yellow-White Core */}
          <g className="origin-bottom" style={{ animation: 'flame-core-pulse 0.9s infinite ease-in-out' }}>
            <path
              d="M 138 115 Q 148 90 158 68 Q 162 48 165 42 Q 168 52 172 72 Q 178 92 182 115 Z"
              fill="url(#fire-core-grad)"
            />
          </g>

          {/* Embers along the bottom logs */}
          <circle cx="120" cy="113" r="2.5" fill="#fef08a" opacity="0.9" />
          <circle cx="145" cy="115" r="2" fill="#f97316" />
          <circle cx="162" cy="114" r="3" fill="#ffffff" />
          <circle cx="178" cy="113" r="2.2" fill="#facc15" />
          <circle cx="198" cy="114" r="2.4" fill="#ea580c" />
        </svg>
      </div>
    </div>
  );
};

/**
 * 2. Growing Plants Scene for Earth & Nature-Related Places (Stonemarch)
 * Features animated plant stems growing upwards, leaves unfurling and swaying,
 * ferns sprouting from bedrock moss, and glowing nature spores floating.
 */
export const GrowingPlantsScene: React.FC = () => {
  return (
    <div className="relative w-full h-32 sm:h-36 rounded-3xl overflow-hidden bg-gradient-to-t from-[#06150b] via-[#0c2918] to-[#040e08] border border-emerald-400/50 shadow-[0_0_25px_rgba(16,185,129,0.3)] flex flex-col justify-end p-3 select-none">
      {/* Top Banner Tag */}
      <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between z-20 pointer-events-none">
        <span className="font-label text-[9.5px] uppercase font-bold text-emerald-300 flex items-center gap-1.5 bg-black/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Bedrock Flora · Plants Growing & Blooming
        </span>
        <span className="font-mono text-[9px] text-emerald-200 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-400/40">
          18.6 ψ Resonance
        </span>
      </div>

      {/* Forest Canopy Ambient Light Glow */}
      <div className="absolute inset-0 bg-radial from-emerald-500/20 via-green-600/10 to-transparent pointer-events-none" />

      {/* Floating Forest Spores & Pollen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-6 left-1/4 w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_6px_#34d399]" style={{ animation: 'spore-float-up 4s infinite ease-out' }} />
        <div className="absolute bottom-8 left-1/2 w-2 h-2 rounded-full bg-lime-300 shadow-[0_0_8px_#a3e635]" style={{ animation: 'spore-float-up 3.2s infinite ease-out 1s' }} />
        <div className="absolute bottom-5 left-3/4 w-1.5 h-1.5 rounded-full bg-teal-300 shadow-[0_0_6px_#2dd4bf]" style={{ animation: 'spore-float-up 4.5s infinite ease-out 2s' }} />
      </div>

      {/* Growing Plants SVG Stage */}
      <div className="relative w-full h-24 flex items-end justify-center z-10">
        <svg viewBox="0 0 320 120" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYBottom meet">
          <defs>
            <linearGradient id="stem-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="60%" stopColor="#059669" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <linearGradient id="leaf-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#047857" />
              <stop offset="70%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#6ee7b7" />
            </linearGradient>
            <linearGradient id="flower-grad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
          </defs>

          {/* Bedrock & Moss Ground Mound */}
          <path d="M 0 120 Q 80 110 160 112 Q 240 108 320 120 Z" fill="#061c10" stroke="#10b981" strokeWidth="1" />
          <ellipse cx="160" cy="116" rx="90" ry="5" fill="#0d331e" />

          {/* Plant 1 (Left Fern Sprout - Growing & Swaying) */}
          <g className="origin-bottom" style={{ animation: 'plant-stem-grow 4s infinite ease-in-out' }}>
            <path d="M 85 116 Q 80 90 70 70 Q 62 55 58 45" fill="none" stroke="url(#stem-grad)" strokeWidth="2.4" strokeLinecap="round" />
            {/* Unfurling Leaves */}
            <path d="M 72 74 Q 55 70 50 75 Q 60 82 72 76" fill="url(#leaf-grad)" style={{ animation: 'leaf-sway-left 3s infinite ease-in-out' }} />
            <path d="M 66 60 Q 50 54 44 58 Q 54 68 66 62" fill="url(#leaf-grad)" style={{ animation: 'leaf-sway-left 2.5s infinite ease-in-out 0.5s' }} />
            <path d="M 58 45 Q 46 36 42 42 Q 50 50 58 47" fill="url(#leaf-grad)" />
          </g>

          {/* Plant 2 (Center Majestic Vine & Sprouting Blooming Flower) */}
          <g className="origin-bottom" style={{ animation: 'plant-stem-grow 3.6s infinite ease-in-out 0.3s' }}>
            <path d="M 160 115 Q 162 85 158 60 Q 155 40 160 22" fill="none" stroke="url(#stem-grad)" strokeWidth="3" strokeLinecap="round" />
            {/* Left side leaves */}
            <path d="M 160 90 Q 140 85 132 92 Q 145 100 160 92" fill="url(#leaf-grad)" style={{ animation: 'leaf-sway-left 3.2s infinite ease-in-out' }} />
            <path d="M 158 65 Q 136 58 128 66 Q 142 75 158 67" fill="url(#leaf-grad)" style={{ animation: 'leaf-sway-left 2.8s infinite ease-in-out 0.8s' }} />
            <path d="M 156 42 Q 138 34 132 40 Q 144 48 156 44" fill="url(#leaf-grad)" />
            {/* Right side leaves */}
            <path d="M 161 78 Q 182 74 190 80 Q 178 88 161 80" fill="url(#leaf-grad)" style={{ animation: 'leaf-sway-right 3s infinite ease-in-out 0.4s' }} />
            <path d="M 159 52 Q 180 46 188 52 Q 176 60 159 54" fill="url(#leaf-grad)" style={{ animation: 'leaf-sway-right 2.6s infinite ease-in-out 1.1s' }} />
            {/* Blooming Golden Flora Bud at Top */}
            <circle cx="160" cy="22" r="5" fill="url(#flower-grad)" filter="drop-shadow(0 0 6px rgba(245,158,11,0.8))" />
            <circle cx="160" cy="22" r="2.2" fill="#ffffff" />
          </g>

          {/* Plant 3 (Right Bamboo/Fern Sprout) */}
          <g className="origin-bottom" style={{ animation: 'plant-stem-grow 4.2s infinite ease-in-out 0.7s' }}>
            <path d="M 235 116 Q 240 92 250 72 Q 258 56 262 42" fill="none" stroke="url(#stem-grad)" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 248 76 Q 265 70 272 76 Q 260 84 248 78" fill="url(#leaf-grad)" style={{ animation: 'leaf-sway-right 3.2s infinite ease-in-out' }} />
            <path d="M 254 62 Q 272 54 278 60 Q 266 70 254 64" fill="url(#leaf-grad)" style={{ animation: 'leaf-sway-right 2.7s infinite ease-in-out 0.6s' }} />
            <path d="M 262 42 Q 275 34 280 40 Q 270 48 262 44" fill="url(#leaf-grad)" />
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 3. Waves in a Beach Scene for Water-Related Places (Tidereach)
 * Features rolling ocean waves washing up onto a sandy shoreline,
 * translucent crested water swells, foaming white bubbles, and water ripples.
 */
export const BeachWavesScene: React.FC = () => {
  return (
    <div className="relative w-full h-32 sm:h-36 rounded-3xl overflow-hidden bg-gradient-to-t from-[#010e17] via-[#041f32] to-[#011422] border border-cyan-400/50 shadow-[0_0_25px_rgba(0,240,255,0.3)] flex flex-col justify-end p-3 select-none">
      {/* Top Banner Tag */}
      <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between z-20 pointer-events-none">
        <span className="font-label text-[9.5px] uppercase font-bold text-cyan-300 flex items-center gap-1.5 bg-black/60 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
          Abyssal Shoreline · Rigorous Waves & Crashing Surf
        </span>
        <span className="font-mono text-[9px] text-cyan-200 bg-cyan-950/80 px-2 py-0.5 rounded-full border border-cyan-400/40">
          Tidal Swell 42.8 ψ · Heavy Surf
        </span>
      </div>

      {/* Ocean Ambient Bioluminescent Glow */}
      <div className="absolute inset-0 bg-radial from-cyan-400/25 via-teal-600/15 to-transparent pointer-events-none" />

      {/* Dynamic Flying Sea Spray & Froth Droplets */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="absolute bottom-10 left-[18%] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" style={{ animation: 'sea-spray-burst 1.7s infinite ease-out 0.1s' }} />
        <div className="absolute bottom-12 left-[36%] w-2.5 h-2.5 rounded-full bg-cyan-200 shadow-[0_0_8px_#a5f3fc]" style={{ animation: 'sea-spray-burst 1.9s infinite ease-out 0.4s' }} />
        <div className="absolute bottom-11 left-[62%] w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff]" style={{ animation: 'sea-spray-burst 1.6s infinite ease-out 0.7s' }} />
        <div className="absolute bottom-14 left-[80%] w-2.5 h-2.5 rounded-full bg-teal-200 shadow-[0_0_8px_#99f6e4]" style={{ animation: 'sea-spray-burst 1.8s infinite ease-out 0.2s' }} />
        <div className="absolute bottom-16 left-[50%] w-1.5 h-1.5 rounded-full bg-white" style={{ animation: 'sea-spray-burst 2.1s infinite ease-out 0.9s' }} />
      </div>

      {/* Beach Shoreline & Vigorous Waves SVG Stage */}
      <div className="relative w-full h-24 flex items-end justify-center z-10">
        <svg viewBox="0 0 320 120" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="beach-sand-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4a371e" />
              <stop offset="60%" stopColor="#312211" />
              <stop offset="100%" stopColor="#1a1208" />
            </linearGradient>
            <linearGradient id="deep-surge-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0369a1" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#075985" />
            </linearGradient>
            <linearGradient id="mid-wave-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0c4a6e" />
            </linearGradient>
            <linearGradient id="crashing-wave-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.85" />
            </linearGradient>
            <filter id="foam-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="2.5" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Golden Wet Beach Sand Shoreline at bottom */}
          <path d="M 0 86 Q 80 89 160 85 Q 240 89 320 86 L 320 120 L 0 120 Z" fill="url(#beach-sand-grad)" />
          <path d="M 0 86 Q 80 89 160 85 Q 240 89 320 86" stroke="#855d31" strokeWidth="2.5" fill="none" opacity="0.65" />

          {/* Wave Tier 1: Deep Horizon Swell (Rigorous background surge) */}
          <g style={{ animation: 'beach-wave-roll-3 2.6s infinite ease-in-out' }}>
            <path
              d="M 0 58 Q 45 46 95 56 Q 155 64 215 52 Q 265 44 320 54 L 320 120 L 0 120 Z"
              fill="url(#deep-surge-grad)"
              opacity="0.8"
            />
            <path
              d="M 0 58 Q 45 46 95 56 Q 155 64 215 52 Q 265 44 320 54"
              fill="none"
              stroke="#bae6fd"
              strokeWidth="2"
              strokeDasharray="14 8"
              opacity="0.75"
            />
          </g>

          {/* Wave Tier 2: Heavy Middle Ocean Breaker surging upwards */}
          <g style={{ animation: 'beach-wave-roll-2 2.1s infinite ease-in-out 0.25s' }}>
            <path
              d="M 0 68 Q 55 52 110 66 Q 170 76 230 62 Q 280 50 320 64 L 320 120 L 0 120 Z"
              fill="url(#mid-wave-grad)"
            />
            <path
              d="M 0 68 Q 55 52 110 66 Q 170 76 230 62 Q 280 50 320 64"
              fill="none"
              stroke="#e0f2fe"
              strokeWidth="2.8"
              opacity="0.85"
            />
            {/* Mid-wave whitecap spray spots */}
            <circle cx="55" cy="53" r="3" fill="#ffffff" opacity="0.8" />
            <circle cx="168" cy="74" r="3.5" fill="#ffffff" opacity="0.85" />
            <circle cx="282" cy="51" r="3" fill="#ffffff" opacity="0.8" />
          </g>

          {/* Wave Tier 3: Powerful Front Crashing Wave Washing High onto Shore */}
          <g style={{ animation: 'beach-wave-roll-1 1.7s infinite ease-in-out 0.4s' }}>
            <path
              d="M 0 78 Q 50 60 115 76 Q 175 88 235 72 Q 285 58 320 74 L 320 120 L 0 120 Z"
              fill="url(#crashing-wave-grad)"
            />
            {/* Blazing White Crashing Froth & Foam Crest */}
            <path
              d="M 0 78 Q 50 60 115 76 Q 175 88 235 72 Q 285 58 320 74"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4.2"
              strokeLinecap="round"
              filter="url(#foam-glow)"
              style={{ animation: 'beach-foam-fade 1.7s infinite ease-in-out 0.4s' }}
            />
            {/* Frothy rolling foam bubbles & whitewater */}
            <ellipse cx="50" cy="62" rx="10" ry="3.5" fill="#ffffff" opacity="0.95" />
            <ellipse cx="115" cy="76" rx="12" ry="4" fill="#ffffff" opacity="0.95" />
            <ellipse cx="178" cy="87" rx="14" ry="4.5" fill="#ffffff" opacity="0.9" />
            <ellipse cx="238" cy="73" rx="11" ry="3.8" fill="#ffffff" opacity="0.95" />
            <ellipse cx="290" cy="60" rx="9" ry="3" fill="#ffffff" opacity="0.9" />
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 4. Wind Blowing in a Grassland Scene for Air-Themed Places (Cloud Weavers / Skydrift)
 * Features rolling meadow hills, multiple blades of wild grassland swaying in
 * sweeping wind gusts, aerodynamic wind streamlines, and drifting dandelion seeds.
 */
export const WindblownGrasslandScene: React.FC = () => {
  return (
    <div className="relative w-full h-32 sm:h-36 rounded-3xl overflow-hidden bg-gradient-to-t from-[#061225] via-[#0d2248] to-[#040b1a] border border-sky-400/50 shadow-[0_0_25px_rgba(56,189,248,0.3)] flex flex-col justify-end p-3 select-none">
      {/* Top Banner Tag */}
      <div className="absolute top-2.5 left-3.5 right-3.5 flex items-center justify-between z-20 pointer-events-none">
        <span className="font-label text-[9.5px] uppercase font-bold text-sky-300 flex items-center gap-1.5 bg-black/60 px-2.5 py-0.5 rounded-full border border-sky-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
          Aloft Plateau · Wind Blowing in Grassland
        </span>
        <span className="font-mono text-[9px] text-sky-200 bg-sky-950/80 px-2 py-0.5 rounded-full border border-sky-400/40">
          28 Knots WNW
        </span>
      </div>

      {/* Aerodynamic Wind Gust Breeze Streamlines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Streamline 1 */}
        <div
          className="absolute top-9 left-0 w-32 h-[2px] bg-gradient-to-r from-transparent via-sky-300/60 to-transparent rounded-full"
          style={{ animation: 'wind-gust-glide 3.2s infinite linear' }}
        />
        {/* Streamline 2 */}
        <div
          className="absolute top-14 left-0 w-44 h-[2px] bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent rounded-full"
          style={{ animation: 'wind-gust-glide 2.6s infinite linear 1s' }}
        />
        {/* Streamline 3 */}
        <div
          className="absolute top-20 left-0 w-36 h-[1.8px] bg-gradient-to-r from-transparent via-sky-400/45 to-transparent rounded-full"
          style={{ animation: 'wind-gust-glide 3.8s infinite linear 1.8s' }}
        />

        {/* Floating Dandelion / Grassland Seeds drifting across wind */}
        <div
          className="absolute bottom-12 left-6 text-white text-[12px] opacity-75"
          style={{ animation: 'dandelion-seed-drift 4s infinite ease-out' }}
        >
          ✦
        </div>
        <div
          className="absolute bottom-16 left-1/3 text-sky-200 text-[10px] opacity-65"
          style={{ animation: 'dandelion-seed-drift 4.6s infinite ease-out 1.5s' }}
        >
          ✦
        </div>
        <div
          className="absolute bottom-10 left-2/3 text-cyan-200 text-[11px] opacity-70"
          style={{ animation: 'dandelion-seed-drift 3.6s infinite ease-out 2.3s' }}
        >
          ✦
        </div>
      </div>

      {/* Rolling Hills & Swaying Grassland SVG Stage */}
      <div className="relative w-full h-24 flex items-end justify-center z-10">
        <svg viewBox="0 0 320 120" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="meadow-back-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a2b" />
              <stop offset="100%" stopColor="#0c1d15" />
            </linearGradient>
            <linearGradient id="meadow-front-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2e5a40" />
              <stop offset="60%" stopColor="#1e3e2c" />
              <stop offset="100%" stopColor="#0a1710" />
            </linearGradient>
          </defs>

          {/* Distant Rolling Meadow Hill */}
          <path d="M 0 85 Q 90 70 180 82 Q 260 92 320 80 L 320 120 L 0 120 Z" fill="url(#meadow-back-grad)" />

          {/* Foreground Meadow Ridge */}
          <path d="M 0 98 Q 75 90 150 96 Q 235 102 320 92 L 320 120 L 0 120 Z" fill="url(#meadow-front-grad)" />

          {/* Individual Grass Blades Swaying in Wind Gusts */}
          {/* Cluster 1 (Left) */}
          <g className="origin-bottom" style={{ transformOrigin: '40px 115px', animation: 'grass-blade-sway-1 1.8s infinite ease-in-out' }}>
            <path d="M 38 115 Q 40 88 52 72 Q 44 94 42 115 Z" fill="#4ade80" />
            <path d="M 44 115 Q 48 92 64 78 Q 52 98 48 115 Z" fill="#86efac" />
            <path d="M 48 115 Q 52 96 70 85 Q 56 102 52 115 Z" fill="#22c55e" />
          </g>

          {/* Cluster 2 (Center-Left) */}
          <g className="origin-bottom" style={{ transformOrigin: '110px 115px', animation: 'grass-blade-sway-2 2.1s infinite ease-in-out 0.2s' }}>
            <path d="M 106 115 Q 109 85 125 68 Q 115 92 110 115 Z" fill="#86efac" />
            <path d="M 112 115 Q 118 90 138 75 Q 124 96 118 115 Z" fill="#4ade80" />
            <path d="M 118 115 Q 122 95 146 82 Q 130 102 124 115 Z" fill="#16a34a" />
          </g>

          {/* Cluster 3 (Center) */}
          <g className="origin-bottom" style={{ transformOrigin: '175px 115px', animation: 'grass-blade-sway-3 1.9s infinite ease-in-out 0.5s' }}>
            <path d="M 170 115 Q 174 84 194 66 Q 182 92 176 115 Z" fill="#4ade80" />
            <path d="M 178 115 Q 184 88 206 72 Q 192 96 184 115 Z" fill="#a7f3d0" />
            <path d="M 184 115 Q 188 94 216 80 Q 200 102 192 115 Z" fill="#22c55e" />
          </g>

          {/* Cluster 4 (Center-Right) */}
          <g className="origin-bottom" style={{ transformOrigin: '240px 115px', animation: 'grass-blade-sway-1 2.2s infinite ease-in-out 0.3s' }}>
            <path d="M 235 115 Q 238 86 256 70 Q 246 94 240 115 Z" fill="#86efac" />
            <path d="M 242 115 Q 248 90 270 76 Q 256 98 248 115 Z" fill="#4ade80" />
            <path d="M 248 115 Q 252 95 280 84 Q 262 102 254 115 Z" fill="#15803d" />
          </g>

          {/* Cluster 5 (Right) */}
          <g className="origin-bottom" style={{ transformOrigin: '290px 115px', animation: 'grass-blade-sway-2 1.7s infinite ease-in-out 0.7s' }}>
            <path d="M 286 115 Q 290 88 308 74 Q 298 96 292 115 Z" fill="#4ade80" />
            <path d="M 292 115 Q 298 92 318 80 Q 306 100 298 115 Z" fill="#86efac" />
          </g>
        </svg>
      </div>
    </div>
  );
};
