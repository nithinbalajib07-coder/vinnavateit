import React from 'react';
import { DomainId } from '../types/world';

/**
 * Rich High-Density Elemental Sparkle Backgrounds for Tongue Shifter:
 * Each element features distinct sparkle shapes, motion patterns, and colors
 * crafted specifically to go hand-in-hand with its natural phenomenon:
 *
 * 1. Tidereach (Water):
 *    - Shapes: Fluid water-droplets, concentric ripple rings, aquatic caustic 4-point stars, bioluminescent bubbles
 *    - Colors: Electric aqua, ocean cyan, turquoise, seafoam, pearlescent foam
 *    - Motion: Bubbling upward float, gentle wave-ripple expansion, and liquid refraction
 *
 * 2. Skydrift (Air):
 *    - Shapes: Aerodynamic 8-point compass wind-roses, glider cross-whisps, buoyant diamond kites, wind dust
 *    - Colors: Sky blue, frost white, ethereal azure, wind-lavender
 *    - Motion: Wind-swept diagonal drift, compass rotation, and high-altitude shimmer
 *
 * 3. Stonemarch (Earth):
 *    - Shapes: Hexagonal geode crystal prisms, chiseled diamond keystones, crystalline cross-glints, pyrite ore specks
 *    - Colors: Emerald, jade, mint, bedrock amber-gold, raw pyrite yellow
 *    - Motion: Steady crystalline pulse, gem facet reflections, grounding stone resonance
 *
 * 4. Emberhold (Fire):
 *    - Shapes: Dancing flame-tongue starbursts, crucible diamond embers, thermal flare halos, volcanic cinders
 *    - Colors: Radiant flame orange, molten amber, hot crucible gold, white-hot core, deep ruby crimson
 *    - Motion: Energetic thermal ascent, flickering heat scintillations, crackling ember leaps
 */

// --- WATER SPARKLE SHAPES ---
// Droplet / Liquid Tear Sparkle
const WaterDropletSparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  color = '#22d3ee',
  className = '',
}) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 24 30" fill="none" className={`overflow-visible flex-shrink-0 ${className}`}>
    <path
      d="M 12 2 C 12 2 4 14 4 20 C 4 24.4 7.6 28 12 28 C 16.4 28 20 24.4 20 20 C 20 14 12 2 12 2 Z"
      fill={color}
      fillOpacity="0.75"
    />
    <ellipse cx="9" cy="18" rx="2.5" ry="4" fill="#ffffff" fillOpacity="0.8" transform="rotate(-20 9 18)" />
    <circle cx="15" cy="22" r="1.2" fill="#ffffff" fillOpacity="0.9" />
  </svg>
);

// Concentric Liquid Ripple Sparkle
const AquaticRippleSparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 28,
  color = '#00f0ff',
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`overflow-visible flex-shrink-0 ${className}`}>
    <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.45" />
    <circle cx="16" cy="16" r="8" stroke={color} strokeWidth="1.2" opacity="0.75" />
    <path d="M 16 3 Q 16 16 3 16 Q 16 16 16 29 Q 16 16 29 16 Q 16 16 16 3 Z" fill={color} fillOpacity="0.9" />
    <circle cx="16" cy="16" r="2.5" fill="#ffffff" />
  </svg>
);

// Fluid 4-Point Caustic Wave Star
const CausticWaveSparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  color = '#67e8f9',
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`overflow-visible flex-shrink-0 ${className}`}>
    <path
      d="M 12 1 C 12 8 8 12 1 12 C 8 12 12 16 12 23 C 12 16 16 12 23 12 C 16 12 12 8 12 1 Z"
      fill={color}
      fillOpacity="0.85"
    />
    <circle cx="12" cy="12" r="2" fill="#ffffff" />
  </svg>
);

// --- AIR SPARKLE SHAPES ---
// 8-Point Aerodynamic Compass Wind-Rose
const WindCompassSparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 26,
  color = '#38bdf8',
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`overflow-visible flex-shrink-0 ${className}`}>
    {/* 4 Long Primary Direction Beams */}
    <path d="M 16 0 L 18 14 L 32 16 L 18 18 L 16 32 L 14 18 L 0 16 L 14 14 Z" fill={color} fillOpacity="0.9" />
    {/* 4 Diagonal Glider Points */}
    <path d="M 16 5 L 17.5 14.5 L 27 16 L 17.5 17.5 L 16 27 L 14.5 17.5 L 5 16 L 14.5 14.5 Z" fill="#ffffff" fillOpacity="0.75" transform="rotate(45 16 16)" />
    <circle cx="16" cy="16" r="2.2" fill="#ffffff" />
  </svg>
);

// Glider / Weather-Vane Whisp Cross
const AeroGliderSparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 22,
  color = '#bae6fd',
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`overflow-visible flex-shrink-0 ${className}`}>
    <line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="1" y1="12" x2="23" y2="12" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="6" r="2.2" fill={color} />
    <circle cx="12" cy="18" r="2.2" fill={color} />
    <circle cx="6" cy="12" r="2.2" fill={color} />
    <circle cx="18" cy="12" r="2.2" fill={color} />
    <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
  </svg>
);

// Diamond Updraft Kite Sparkle
const DiamondKiteSparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 18,
  color = '#7dd3fc',
  className = '',
}) => (
  <svg width={size} height={size * 1.3} viewBox="0 0 20 26" fill="none" className={`overflow-visible flex-shrink-0 ${className}`}>
    <polygon points="10,1 19,10 10,25 1,10" fill={color} fillOpacity="0.8" />
    <polygon points="10,4 16,10 10,20 4,10" fill="#ffffff" fillOpacity="0.75" />
    <line x1="10" y1="1" x2="10" y2="25" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
    <line x1="1" y1="10" x2="19" y2="10" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
  </svg>
);

// --- EARTH SPARKLE SHAPES ---
// Hexagonal Geode Crystal Prism
const GeodeFacetSparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 24,
  color = '#10b981',
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" className={`overflow-visible flex-shrink-0 ${className}`}>
    <polygon points="14,2 24,7 24,21 14,26 4,21 4,7" fill={color} fillOpacity="0.8" stroke="#a7f3d0" strokeWidth="1.2" />
    <polygon points="14,6 20,9.5 20,18.5 14,22 8,18.5 8,9.5" fill="#a7f3d0" fillOpacity="0.5" />
    <line x1="14" y1="2" x2="14" y2="26" stroke="#ffffff" strokeWidth="0.9" opacity="0.75" />
    <line x1="4" y1="7" x2="24" y2="21" stroke="#ffffff" strokeWidth="0.7" opacity="0.6" />
    <circle cx="14" cy="14" r="2.8" fill="#ffffff" />
  </svg>
);

// Chiseled Bedrock Keystone Diamond
const KeystoneDiamondSparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  color = '#34d399',
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`overflow-visible flex-shrink-0 ${className}`}>
    <polygon points="12,1 23,12 12,23 1,12" fill={color} fillOpacity="0.9" />
    <polygon points="12,5 19,12 12,19 5,12" fill="#ffffff" fillOpacity="0.75" />
    <circle cx="12" cy="12" r="2.2" fill="#ffffff" />
  </svg>
);

// Lithic Grounded 4-Point Star
const LithicCrossSparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 22,
  color = '#fbbf24',
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`overflow-visible flex-shrink-0 ${className}`}>
    <path d="M 12 2 L 15 9 L 22 12 L 15 15 L 12 22 L 9 15 L 2 12 L 9 9 Z" fill={color} fillOpacity="0.9" />
    <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
  </svg>
);

// --- FIRE SPARKLE SHAPES ---
// Dancing Flame-Tongue Starburst
const FlameTongueSparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 24,
  color = '#f97316',
  className = '',
}) => (
  <svg width={size} height={size * 1.25} viewBox="0 0 24 30" fill="none" className={`overflow-visible flex-shrink-0 ${className}`}>
    {/* Dynamic Flame Point Curves */}
    <path
      d="M 12 1 Q 14 10 22 12 Q 15 17 17 29 Q 12 22 7 29 Q 9 17 2 12 Q 10 10 12 1 Z"
      fill={color}
      fillOpacity="0.9"
    />
    <path
      d="M 12 6 Q 13 11 18 13 Q 13 16 14 23 Q 12 19 10 23 Q 11 16 6 13 Q 11 11 12 6 Z"
      fill="#fef08a"
    />
    <circle cx="12" cy="14" r="2.2" fill="#ffffff" />
  </svg>
);

// Incandescent Crucible Diamond Ember
const CrucibleDiamondEmber: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  color = '#f59e0b',
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`overflow-visible flex-shrink-0 ${className}`}>
    <polygon points="12,1 23,12 12,23 1,12" fill={color} fillOpacity="0.88" />
    <polygon points="12,4 18,12 12,20 6,12" fill="#fef08a" fillOpacity="0.85" />
    <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
  </svg>
);

// Thermal Flare Starburst with Radiant Center
const ThermalFlareSparkle: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 28,
  color = '#ea580c',
  className = '',
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`overflow-visible flex-shrink-0 ${className}`}>
    <circle cx="16" cy="16" r="12" fill={color} fillOpacity="0.25" filter="blur(2px)" />
    <path d="M 16 2 L 18 13 L 29 16 L 18 19 L 16 30 L 14 19 L 3 16 L 14 13 Z" fill={color} />
    <path d="M 16 6 L 17 14 L 25 16 L 17 18 L 16 26 L 15 18 L 7 16 L 15 14 Z" fill="#facc15" transform="rotate(45 16 16)" />
    <circle cx="16" cy="16" r="3" fill="#ffffff" />
  </svg>
);

export const TongueShifterElementalBackground: React.FC<{ domainId: DomainId }> = ({ domainId }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* =========================================================================
          1. TIDEREACH (WATER): RICH HIGH-DENSITY AQUATIC & CAUSTIC SPARKLES (~35)
          ========================================================================= */}
      {domainId === 'tidereach' && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#02101c] via-[#041c30] to-[#020b14] transition-colors duration-700">
          {/* Bioluminescent Oceanic Ambient Glows */}
          <div className="absolute top-1/4 left-1/3 w-[34rem] h-[34rem] rounded-full bg-cyan-500/12 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[36rem] h-[36rem] rounded-full bg-teal-500/10 blur-[130px] pointer-events-none" />

          {/* Water Droplet Liquid Sparkles */}
          <div className="absolute top-[8%] left-[12%] animate-sparkle-drift-up"><WaterDropletSparkle size={18} color="#22d3ee" /></div>
          <div className="absolute top-[28%] left-[24%] animate-sparkle-drift-up" style={{ animationDelay: '-1.2s' }}><WaterDropletSparkle size={22} color="#00f0ff" /></div>
          <div className="absolute top-[55%] left-[8%] animate-sparkle-drift-up" style={{ animationDelay: '-2.4s' }}><WaterDropletSparkle size={16} color="#67e8f9" /></div>
          <div className="absolute bottom-[24%] left-[32%] animate-sparkle-drift-up" style={{ animationDelay: '-0.7s' }}><WaterDropletSparkle size={24} color="#a5f3fc" /></div>
          <div className="absolute bottom-[10%] left-[16%] animate-sparkle-drift-up" style={{ animationDelay: '-1.9s' }}><WaterDropletSparkle size={19} color="#00f0ff" /></div>
          <div className="absolute top-[16%] right-[22%] animate-sparkle-drift-up" style={{ animationDelay: '-1.5s' }}><WaterDropletSparkle size={20} color="#22d3ee" /></div>
          <div className="absolute top-[48%] right-[14%] animate-sparkle-drift-up" style={{ animationDelay: '-0.4s' }}><WaterDropletSparkle size={22} color="#67e8f9" /></div>
          <div className="absolute bottom-[28%] right-[20%] animate-sparkle-drift-up" style={{ animationDelay: '-2.1s' }}><WaterDropletSparkle size={17} color="#00f0ff" /></div>

          {/* Concentric Ripple Halo Sparkles (Expanding Water Droplet Waves) */}
          <div className="absolute top-[12%] left-[38%] animate-sparkle-halo"><AquaticRippleSparkle size={34} color="#00f0ff" /></div>
          <div className="absolute top-[38%] left-[55%] animate-sparkle-halo" style={{ animationDelay: '-1.4s' }}><AquaticRippleSparkle size={28} color="#22d3ee" /></div>
          <div className="absolute top-[68%] left-[22%] animate-sparkle-halo" style={{ animationDelay: '-2.6s' }}><AquaticRippleSparkle size={30} color="#67e8f9" /></div>
          <div className="absolute bottom-[16%] right-[34%] animate-sparkle-halo" style={{ animationDelay: '-0.9s' }}><AquaticRippleSparkle size={32} color="#00f0ff" /></div>
          <div className="absolute top-[22%] right-[10%] animate-sparkle-halo" style={{ animationDelay: '-1.8s' }}><AquaticRippleSparkle size={26} color="#38bdf8" /></div>

          {/* Fluid Caustic Wave 4-Point Stars */}
          <div className="absolute top-[20%] left-[48%] animate-sparkle-fast"><CausticWaveSparkle size={24} color="#00f0ff" /></div>
          <div className="absolute top-[42%] left-[15%] animate-sparkle-mid" style={{ animationDelay: '-0.8s' }}><CausticWaveSparkle size={18} color="#22d3ee" /></div>
          <div className="absolute top-[75%] left-[44%] animate-sparkle-slow" style={{ animationDelay: '-1.6s' }}><CausticWaveSparkle size={22} color="#67e8f9" /></div>
          <div className="absolute top-[32%] right-[32%] animate-sparkle-fast" style={{ animationDelay: '-1.1s' }}><CausticWaveSparkle size={20} color="#a5f3fc" /></div>
          <div className="absolute bottom-[36%] right-[8%] animate-sparkle-mid" style={{ animationDelay: '-2.0s' }}><CausticWaveSparkle size={17} color="#22d3ee" /></div>
          <div className="absolute bottom-[12%] right-[15%] animate-sparkle-fast" style={{ animationDelay: '-0.5s' }}><CausticWaveSparkle size={21} color="#00f0ff" /></div>
          <div className="absolute top-[62%] right-[25%] animate-sparkle-slow" style={{ animationDelay: '-2.3s' }}><CausticWaveSparkle size={19} color="#38bdf8" /></div>

          {/* Bioluminescent Stardust / Foam Flecks */}
          <div className="absolute top-[15%] left-[28%] w-2 h-2 rounded-full bg-cyan-200 animate-sparkle-fast shadow-[0_0_8px_#22d3ee]" />
          <div className="absolute top-[30%] left-[42%] w-1.5 h-1.5 rounded-full bg-cyan-100 animate-sparkle-mid shadow-[0_0_6px_#00f0ff]" style={{ animationDelay: '-0.6s' }} />
          <div className="absolute top-[50%] left-[30%] w-2.5 h-2.5 rounded-full bg-teal-200 animate-sparkle-slow shadow-[0_0_10px_#2dd4bf]" style={{ animationDelay: '-1.7s' }} />
          <div className="absolute top-[70%] left-[12%] w-1.5 h-1.5 rounded-full bg-cyan-300 animate-sparkle-fast shadow-[0_0_8px_#06b6d4]" style={{ animationDelay: '-1.1s' }} />
          <div className="absolute bottom-[18%] left-[40%] w-2 h-2 rounded-full bg-sky-200 animate-sparkle-mid shadow-[0_0_8px_#38bdf8]" style={{ animationDelay: '-2.5s' }} />
          <div className="absolute top-[10%] right-[38%] w-2 h-2 rounded-full bg-cyan-100 animate-sparkle-fast shadow-[0_0_10px_#00f0ff]" style={{ animationDelay: '-0.4s' }} />
          <div className="absolute top-[25%] right-[18%] w-1.5 h-1.5 rounded-full bg-teal-100 animate-sparkle-mid shadow-[0_0_6px_#67e8f9]" style={{ animationDelay: '-1.3s' }} />
          <div className="absolute top-[45%] right-[42%] w-2.5 h-2.5 rounded-full bg-cyan-200 animate-sparkle-slow shadow-[0_0_12px_#22d3ee]" style={{ animationDelay: '-2.2s' }} />
          <div className="absolute bottom-[32%] right-[28%] w-1.5 h-1.5 rounded-full bg-sky-100 animate-sparkle-fast shadow-[0_0_8px_#00f0ff]" style={{ animationDelay: '-0.8s' }} />
          <div className="absolute bottom-[14%] right-[45%] w-2 h-2 rounded-full bg-cyan-300 animate-sparkle-mid shadow-[0_0_10px_#67e8f9]" style={{ animationDelay: '-1.6s' }} />
        </div>
      )}

      {/* =========================================================================
          2. SKYDRIFT (AIR): RICH HIGH-DENSITY WIND & COMPASS SPARKLES (~35)
          ========================================================================= */}
      {domainId === 'skydrift' && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#041224] via-[#081d38] to-[#030d1a] transition-colors duration-700">
          {/* Ethereal Sky & High-Altitude Ambient Glows */}
          <div className="absolute top-1/3 left-1/4 w-[36rem] h-[36rem] rounded-full bg-sky-500/12 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/3 w-[32rem] h-[32rem] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

          {/* 8-Point Compass Wind-Rose Stars */}
          <div className="absolute top-[10%] right-[20%] animate-sparkle-slow"><WindCompassSparkle size={32} color="#38bdf8" /></div>
          <div className="absolute top-[35%] left-[16%] animate-sparkle-slow" style={{ animationDelay: '-1.8s' }}><WindCompassSparkle size={28} color="#ffffff" /></div>
          <div className="absolute top-[60%] right-[32%] animate-sparkle-slow" style={{ animationDelay: '-0.9s' }}><WindCompassSparkle size={26} color="#7dd3fc" /></div>
          <div className="absolute bottom-[22%] right-[16%] animate-sparkle-slow" style={{ animationDelay: '-2.5s' }}><WindCompassSparkle size={30} color="#bae6fd" /></div>
          <div className="absolute bottom-[15%] left-[28%] animate-sparkle-slow" style={{ animationDelay: '-1.2s' }}><WindCompassSparkle size={28} color="#ffffff" /></div>
          <div className="absolute top-[22%] left-[45%] animate-sparkle-slow" style={{ animationDelay: '-0.4s' }}><WindCompassSparkle size={24} color="#38bdf8" /></div>

          {/* Glider / Weather-Vane Cross-Whisps */}
          <div className="absolute top-[18%] left-[22%] animate-sparkle-crystal"><AeroGliderSparkle size={24} color="#ffffff" /></div>
          <div className="absolute top-[48%] left-[38%] animate-sparkle-crystal" style={{ animationDelay: '-1.4s' }}><AeroGliderSparkle size={20} color="#7dd3fc" /></div>
          <div className="absolute top-[28%] right-[12%] animate-sparkle-crystal" style={{ animationDelay: '-2.1s' }}><AeroGliderSparkle size={22} color="#bae6fd" /></div>
          <div className="absolute bottom-[35%] left-[12%] animate-sparkle-crystal" style={{ animationDelay: '-0.7s' }}><AeroGliderSparkle size={26} color="#ffffff" /></div>
          <div className="absolute bottom-[18%] right-[25%] animate-sparkle-crystal" style={{ animationDelay: '-1.9s' }}><AeroGliderSparkle size={20} color="#38bdf8" /></div>

          {/* Diamond Updraft Kite Sparkles (Drifting along Wind Vectors) */}
          <div className="absolute bottom-[18%] left-[8%] animate-sparkle-drift-wind"><DiamondKiteSparkle size={20} color="#38bdf8" /></div>
          <div className="absolute bottom-[28%] left-[32%] animate-sparkle-drift-wind" style={{ animationDelay: '-1.5s' }}><DiamondKiteSparkle size={17} color="#ffffff" /></div>
          <div className="absolute bottom-[14%] left-[54%] animate-sparkle-drift-wind" style={{ animationDelay: '-0.8s' }}><DiamondKiteSparkle size={22} color="#7dd3fc" /></div>
          <div className="absolute bottom-[38%] left-[70%] animate-sparkle-drift-wind" style={{ animationDelay: '-2.2s' }}><DiamondKiteSparkle size={18} color="#bae6fd" /></div>
          <div className="absolute top-[38%] right-[26%] animate-sparkle-drift-wind" style={{ animationDelay: '-1.1s' }}><DiamondKiteSparkle size={19} color="#e0f2fe" /></div>

          {/* Airborne Frost Stardust Specks */}
          <div className="absolute top-[8%] left-[34%] w-2 h-2 rounded-full bg-white animate-sparkle-fast shadow-[0_0_10px_#ffffff]" />
          <div className="absolute top-[15%] left-[10%] w-1.5 h-1.5 rounded-full bg-sky-200 animate-sparkle-mid shadow-[0_0_8px_#38bdf8]" style={{ animationDelay: '-0.7s' }} />
          <div className="absolute top-[25%] right-[38%] w-2 h-2 rounded-full bg-white animate-sparkle-fast shadow-[0_0_10px_#ffffff]" style={{ animationDelay: '-1.3s' }} />
          <div className="absolute top-[42%] left-[25%] w-1.5 h-1.5 rounded-full bg-sky-100 animate-sparkle-mid shadow-[0_0_8px_#7dd3fc]" style={{ animationDelay: '-2.0s' }} />
          <div className="absolute top-[55%] left-[5%] w-2 h-2 rounded-full bg-white animate-sparkle-fast shadow-[0_0_8px_#ffffff]" style={{ animationDelay: '-0.5s' }} />
          <div className="absolute top-[68%] right-[18%] w-2.5 h-2.5 rounded-full bg-sky-200 animate-sparkle-slow shadow-[0_0_12px_#38bdf8]" style={{ animationDelay: '-1.6s' }} />
          <div className="absolute bottom-[28%] left-[45%] w-1.5 h-1.5 rounded-full bg-white animate-sparkle-fast shadow-[0_0_8px_#ffffff]" style={{ animationDelay: '-1.0s' }} />
          <div className="absolute bottom-[10%] left-[20%] w-2 h-2 rounded-full bg-sky-300 animate-sparkle-mid shadow-[0_0_10px_#7dd3fc]" style={{ animationDelay: '-2.4s' }} />
          <div className="absolute bottom-[12%] right-[42%] w-1.5 h-1.5 rounded-full bg-white animate-sparkle-fast shadow-[0_0_8px_#ffffff]" style={{ animationDelay: '-0.3s' }} />
          <div className="absolute top-[50%] right-[8%] w-2 h-2 rounded-full bg-sky-100 animate-sparkle-mid shadow-[0_0_8px_#bae6fd]" style={{ animationDelay: '-1.7s' }} />
        </div>
      )}

      {/* =========================================================================
          3. STONEMARCH (EARTH): RICH HIGH-DENSITY GEODE & EMERALD SPARKLES (~35)
          ========================================================================= */}
      {domainId === 'stonemarch' && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#02140a] via-[#052112] to-[#010c06] transition-colors duration-700">
          {/* Subterranean Geode Ambient Glows */}
          <div className="absolute top-1/4 right-1/4 w-[34rem] h-[34rem] rounded-full bg-emerald-500/12 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[32rem] h-[32rem] rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />

          {/* Hexagonal Geode Crystal Prism Sparkles */}
          <div className="absolute top-[12%] left-[15%] animate-sparkle-crystal"><GeodeFacetSparkle size={26} color="#10b981" /></div>
          <div className="absolute top-[32%] left-[42%] animate-sparkle-crystal" style={{ animationDelay: '-1.2s' }}><GeodeFacetSparkle size={22} color="#34d399" /></div>
          <div className="absolute top-[20%] right-[18%] animate-sparkle-crystal" style={{ animationDelay: '-0.7s' }}><GeodeFacetSparkle size={24} color="#10b981" /></div>
          <div className="absolute bottom-[25%] left-[18%] animate-sparkle-crystal" style={{ animationDelay: '-1.9s' }}><GeodeFacetSparkle size={28} color="#059669" /></div>
          <div className="absolute bottom-[32%] right-[24%] animate-sparkle-crystal" style={{ animationDelay: '-1.4s' }}><GeodeFacetSparkle size={20} color="#6ee7b7" /></div>
          <div className="absolute top-[58%] right-[12%] animate-sparkle-crystal" style={{ animationDelay: '-2.5s' }}><GeodeFacetSparkle size={25} color="#10b981" /></div>

          {/* Chiseled Keystone Diamond Sparkles */}
          <div className="absolute top-[18%] left-[32%] animate-sparkle-fast"><KeystoneDiamondSparkle size={22} color="#34d399" /></div>
          <div className="absolute top-[45%] left-[12%] animate-sparkle-mid" style={{ animationDelay: '-0.9s' }}><KeystoneDiamondSparkle size={18} color="#10b981" /></div>
          <div className="absolute top-[25%] right-[35%] animate-sparkle-fast" style={{ animationDelay: '-1.6s' }}><KeystoneDiamondSparkle size={24} color="#6ee7b7" /></div>
          <div className="absolute bottom-[40%] left-[35%] animate-sparkle-slow" style={{ animationDelay: '-2.1s' }}><KeystoneDiamondSparkle size={20} color="#a7f3d0" /></div>
          <div className="absolute bottom-[16%] right-[15%] animate-sparkle-fast" style={{ animationDelay: '-0.5s' }}><KeystoneDiamondSparkle size={22} color="#34d399" /></div>

          {/* Bedrock Lithic Cross Stars & Golden Pyrite Highlights */}
          <div className="absolute top-[10%] right-[32%] animate-sparkle-halo"><LithicCrossSparkle size={26} color="#fbbf24" /></div>
          <div className="absolute top-[68%] left-[25%] animate-sparkle-halo" style={{ animationDelay: '-1.5s' }}><LithicCrossSparkle size={22} color="#f59e0b" /></div>
          <div className="absolute bottom-[22%] right-[38%] animate-sparkle-halo" style={{ animationDelay: '-2.3s' }}><LithicCrossSparkle size={24} color="#fbbf24" /></div>
          <div className="absolute top-[52%] left-[50%] animate-sparkle-mid" style={{ animationDelay: '-1.1s' }}><LithicCrossSparkle size={18} color="#f59e0b" /></div>
          <div className="absolute bottom-[10%] left-[55%] animate-sparkle-fast" style={{ animationDelay: '-1.8s' }}><LithicCrossSparkle size={20} color="#fbbf24" /></div>

          {/* Golden Mineral Spores & Emerald Crystalline Dust */}
          <div className="absolute top-[15%] left-[22%] w-2 h-2 rounded-full bg-emerald-300 animate-sparkle-fast shadow-[0_0_8px_#10b981]" />
          <div className="absolute top-[28%] left-[8%] w-1.5 h-1.5 rounded-full bg-amber-300 animate-sparkle-mid shadow-[0_0_8px_#f59e0b]" style={{ animationDelay: '-0.6s' }} />
          <div className="absolute top-[40%] left-[28%] w-2.5 h-2.5 rounded-full bg-emerald-200 animate-sparkle-slow shadow-[0_0_12px_#34d399]" style={{ animationDelay: '-1.4s' }} />
          <div className="absolute top-[62%] left-[16%] w-1.5 h-1.5 rounded-full bg-emerald-400 animate-sparkle-fast shadow-[0_0_8px_#10b981]" style={{ animationDelay: '-2.0s' }} />
          <div className="absolute bottom-[18%] left-[42%] w-2 h-2 rounded-full bg-amber-200 animate-sparkle-mid shadow-[0_0_10px_#fbbf24]" style={{ animationDelay: '-0.8s' }} />
          <div className="absolute top-[12%] right-[24%] w-2 h-2 rounded-full bg-emerald-200 animate-sparkle-fast shadow-[0_0_10px_#10b981]" style={{ animationDelay: '-0.4s' }} />
          <div className="absolute top-[36%] right-[10%] w-1.5 h-1.5 rounded-full bg-amber-300 animate-sparkle-mid shadow-[0_0_8px_#f59e0b]" style={{ animationDelay: '-1.7s' }} />
          <div className="absolute top-[48%] right-[28%] w-2 h-2 rounded-full bg-emerald-300 animate-sparkle-slow shadow-[0_0_10px_#6ee7b7]" style={{ animationDelay: '-1.1s' }} />
          <div className="absolute bottom-[28%] right-[8%] w-2.5 h-2.5 rounded-full bg-amber-100 animate-sparkle-fast shadow-[0_0_12px_#fbbf24]" style={{ animationDelay: '-2.4s' }} />
          <div className="absolute bottom-[12%] right-[32%] w-1.5 h-1.5 rounded-full bg-emerald-300 animate-sparkle-mid shadow-[0_0_8px_#34d399]" style={{ animationDelay: '-1.3s' }} />
        </div>
      )}

      {/* =========================================================================
          4. EMBERHOLD (FIRE): RICH HIGH-DENSITY FLAME & CRUCIBLE SPARKLES (~35)
          ========================================================================= */}
      {domainId === 'emberhold' && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c0604] via-[#2c0b06] to-[#0f0302] transition-colors duration-700">
          {/* Thermal Crucible Ambient Glows */}
          <div className="absolute top-1/3 left-1/3 w-[36rem] h-[36rem] rounded-full bg-orange-600/16 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[34rem] h-[34rem] rounded-full bg-amber-500/14 blur-[120px] pointer-events-none" />

          {/* Dancing Flame-Tongue Starbursts */}
          <div className="absolute top-[12%] left-[18%] animate-sparkle-fast"><FlameTongueSparkle size={26} color="#f97316" /></div>
          <div className="absolute top-[32%] left-[45%] animate-sparkle-mid" style={{ animationDelay: '-0.9s' }}><FlameTongueSparkle size={22} color="#facc15" /></div>
          <div className="absolute top-[22%] right-[22%] animate-sparkle-fast" style={{ animationDelay: '-1.6s' }}><FlameTongueSparkle size={28} color="#ea580c" /></div>
          <div className="absolute bottom-[28%] left-[22%] animate-sparkle-fast" style={{ animationDelay: '-0.5s' }}><FlameTongueSparkle size={24} color="#f97316" /></div>
          <div className="absolute bottom-[35%] right-[18%] animate-sparkle-mid" style={{ animationDelay: '-1.8s' }}><FlameTongueSparkle size={26} color="#f59e0b" /></div>
          <div className="absolute top-[65%] left-[35%] animate-sparkle-fast" style={{ animationDelay: '-2.2s' }}><FlameTongueSparkle size={20} color="#facc15" /></div>

          {/* Ascending Crucible Diamond Embers (Rising Thermal Sparks) */}
          <div className="absolute bottom-[10%] left-[14%] animate-sparkle-drift-up"><CrucibleDiamondEmber size={18} color="#f97316" /></div>
          <div className="absolute bottom-[18%] left-[34%] animate-sparkle-drift-up" style={{ animationDelay: '-1.2s' }}><CrucibleDiamondEmber size={22} color="#facc15" /></div>
          <div className="absolute bottom-[12%] left-[62%] animate-sparkle-drift-up" style={{ animationDelay: '-0.6s' }}><CrucibleDiamondEmber size={16} color="#fb923c" /></div>
          <div className="absolute bottom-[24%] left-[80%] animate-sparkle-drift-up" style={{ animationDelay: '-1.9s' }}><CrucibleDiamondEmber size={20} color="#f59e0b" /></div>
          <div className="absolute bottom-[8%] right-[35%] animate-sparkle-drift-up" style={{ animationDelay: '-2.4s' }}><CrucibleDiamondEmber size={24} color="#f97316" /></div>
          <div className="absolute bottom-[30%] left-[50%] animate-sparkle-drift-up" style={{ animationDelay: '-0.8s' }}><CrucibleDiamondEmber size={19} color="#fef08a" /></div>

          {/* Thermal Flare Halos */}
          <div className="absolute top-[16%] right-[38%] animate-sparkle-halo"><ThermalFlareSparkle size={32} color="#f97316" /></div>
          <div className="absolute top-[52%] left-[14%] animate-sparkle-halo" style={{ animationDelay: '-1.4s' }}><ThermalFlareSparkle size={28} color="#facc15" /></div>
          <div className="absolute bottom-[20%] right-[30%] animate-sparkle-halo" style={{ animationDelay: '-2.1s' }}><ThermalFlareSparkle size={30} color="#ea580c" /></div>
          <div className="absolute top-[40%] right-[10%] animate-sparkle-halo" style={{ animationDelay: '-0.7s' }}><ThermalFlareSparkle size={26} color="#f59e0b" /></div>

          {/* Volcanic Molten Spark Particles */}
          <div className="absolute top-[10%] left-[28%] w-2 h-2 rounded-full bg-amber-300 animate-sparkle-fast shadow-[0_0_10px_#f59e0b]" />
          <div className="absolute top-[26%] left-[10%] w-1.5 h-1.5 rounded-full bg-orange-400 animate-sparkle-mid shadow-[0_0_8px_#f97316]" style={{ animationDelay: '-0.8s' }} />
          <div className="absolute top-[42%] left-[26%] w-2.5 h-2.5 rounded-full bg-yellow-200 animate-sparkle-slow shadow-[0_0_12px_#facc15]" style={{ animationDelay: '-1.5s' }} />
          <div className="absolute top-[60%] left-[8%] w-1.5 h-1.5 rounded-full bg-orange-300 animate-sparkle-fast shadow-[0_0_8px_#ea580c]" style={{ animationDelay: '-1.1s' }} />
          <div className="absolute bottom-[22%] left-[44%] w-2 h-2 rounded-full bg-amber-200 animate-sparkle-mid shadow-[0_0_10px_#f59e0b]" style={{ animationDelay: '-2.3s' }} />
          <div className="absolute top-[8%] right-[16%] w-2 h-2 rounded-full bg-yellow-300 animate-sparkle-fast shadow-[0_0_10px_#fef08a]" style={{ animationDelay: '-0.4s' }} />
          <div className="absolute top-[30%] right-[32%] w-1.5 h-1.5 rounded-full bg-orange-200 animate-sparkle-mid shadow-[0_0_8px_#f97316]" style={{ animationDelay: '-1.3s' }} />
          <div className="absolute top-[48%] right-[22%] w-2 h-2 rounded-full bg-yellow-100 animate-sparkle-slow shadow-[0_0_12px_#facc15]" style={{ animationDelay: '-2.0s' }} />
          <div className="absolute bottom-[32%] right-[12%] w-2.5 h-2.5 rounded-full bg-orange-400 animate-sparkle-fast shadow-[0_0_10px_#ea580c]" style={{ animationDelay: '-0.9s' }} />
          <div className="absolute bottom-[14%] right-[22%] w-1.5 h-1.5 rounded-full bg-amber-300 animate-sparkle-mid shadow-[0_0_8px_#f59e0b]" style={{ animationDelay: '-1.7s' }} />
        </div>
      )}
    </div>
  );
};
