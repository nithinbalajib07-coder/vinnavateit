import React from 'react';
import { DomainId } from '../types/world';

export const CurrentSigil: React.FC<{
  domain: DomainId;
  size?: number;
  className?: string;
}> = ({ domain, size = 24, className = '' }) => {
  switch (domain) {
    case 'tidereach':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Interlocking tidal swell waves & abyssal pearl */}
          <path d="M3 13c3-4 6-4 9 0s6 4 9 0" />
          <path d="M3 17c3-4 6-4 9 0s6 4 9 0" opacity="0.6" />
          <path d="M6 9c2-2 4-2 6 0" opacity="0.4" />
          <circle cx="12" cy="7" r="2" fill="currentColor" />
        </svg>
      );
    case 'skydrift':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* High atmospheric aloft draft and floating feather crest */}
          <path d="M4 15c2-2 5-3.5 8-3.5 4.5 0 7.5 3 9 5.5" />
          <path d="M6 10.5c2.5-2 6-3 9-3 3 0 5 1 6.5 2.5" opacity="0.6" />
          <circle cx="12" cy="4.5" r="2" fill="currentColor" />
          <line x1="12" y1="11.5" x2="12" y2="20" strokeDasharray="2 2" />
        </svg>
      );
    case 'stonemarch':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className={className}
        >
          {/* Stepped mountain keystone & carved chisel foundation */}
          <path d="M3 20h18" strokeWidth="2.4" />
          <path d="M6 20v-5h12v5" />
          <path d="M9 15v-5h6v5" />
          <rect x="10.5" y="5" width="3" height="5" fill="currentColor" />
          <line x1="12" y1="2" x2="12" y2="5" />
        </svg>
      );
    case 'emberhold':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          {/* Caldera crucible flame and thermal diamond */}
          <path d="M12 2c1.5 3 4 5 4 8 0 3-2 5-4 5s-4-2-4-5c0-3 2.5-5 4-8z" />
          <path d="M12 15c-3 0-6 2-6 5h12c0-3-3-5-6-5z" />
          <circle cx="12" cy="10" r="1.5" fill="currentColor" />
          <path d="M8 8l-2-2m10 2l2-2" opacity="0.7" />
        </svg>
      );
  }
};

export const WardenSigil: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* The All-Seeing Attunement Eye & Bell Clapper */}
    <path d="M12 3v3" />
    <path d="M5.5 8.5L7.5 10" />
    <path d="M18.5 8.5L16.5 10" />
    <path d="M3 13c3-5 6-7 9-7s6 2 9 7c-3 5-6 7-9 7s-6-2-9-7z" />
    <circle cx="12" cy="13" r="3" fill="currentColor" fillOpacity="0.2" />
    <circle cx="12" cy="13" r="1.2" fill="currentColor" />
    <path d="M9 21h6" strokeWidth="2" />
  </svg>
);

export const RopeKnotDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-full flex items-center justify-center my-3 select-none ${className}`}>
    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[var(--border-color)] to-[var(--border-highlight)]"></div>
    <div className="px-3 flex items-center gap-1.5 text-[var(--accent-secondary)] opacity-85">
      {/* Handcrafted Braided Courier Reef Knot SVG */}
      <svg width="44" height="18" viewBox="0 0 44 18" fill="none" stroke="currentColor" strokeWidth="1.4">
        {/* Left braided loop */}
        <path d="M2 9 C 8 4, 14 4, 18 9 S 22 14, 28 9" strokeLinecap="round" />
        {/* Right interlocking loop */}
        <path d="M16 9 C 20 14, 26 14, 30 9 S 36 4, 42 9" strokeLinecap="round" />
        {/* Center binding lashings */}
        <line x1="20" y1="5" x2="20" y2="13" strokeWidth="1.2" strokeDasharray="1 1" />
        <line x1="24" y1="5" x2="24" y2="13" strokeWidth="1.2" strokeDasharray="1 1" />
        <circle cx="22" cy="9" r="1.5" fill="currentColor" />
      </svg>
    </div>
    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[var(--border-color)] to-[var(--border-highlight)]"></div>
  </div>
);

export const WaxSealBadge: React.FC<{
  intact?: boolean;
  label?: string;
  size?: number;
  className?: string;
}> = ({ intact = true, label = 'SEALED', size = 32, className = '' }) => (
  <div
    className={`inline-flex items-center gap-1.5 font-label text-xs uppercase px-3 py-1 rounded-full shadow-md border ${
      intact
        ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
        : 'bg-red-950/80 text-red-300 border-red-500/50'
    } ${className}`}
  >
    <svg width={size / 2} height={size / 2} viewBox="0 0 20 20" fill="currentColor">
      {intact ? (
        <path
          fillRule="evenodd"
          d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 6.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      ) : (
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      )}
    </svg>
    <span className="font-semibold tracking-wider text-[11px]">{label}</span>
  </div>
);

export const CompassRose: React.FC<{ size?: number; className?: string }> = ({
  size = 36,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    className={className}
  >
    <circle cx="18" cy="18" r="16" strokeDasharray="1 2" opacity="0.6" />
    <circle cx="18" cy="18" r="12" opacity="0.3" />
    {/* North Point (Air - Skydrift) */}
    <path d="M18 4 L21 15 L18 18 L15 15 Z" fill="currentColor" fillOpacity="0.8" />
    {/* South Point (Water - Tidereach) */}
    <path d="M18 32 L15 21 L18 18 L21 21 Z" fill="currentColor" fillOpacity="0.4" />
    {/* East Point (Earth - Stonemarch) */}
    <path d="M32 18 L21 21 L18 18 L21 15 Z" fill="currentColor" fillOpacity="0.6" />
    {/* West Point (Heat - Emberhold) */}
    <path d="M4 18 L15 15 L18 18 L15 21 Z" fill="currentColor" fillOpacity="0.6" />
    <circle cx="18" cy="18" r="2" fill="currentColor" />
  </svg>
);

export const SpinningVortexSpiral: React.FC<{
  size?: number;
  className?: string;
  speed?: string;
}> = ({ size = 28, className = '', speed = 'animate-[spin_4s_linear_infinite]' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    className={`overflow-visible inline-block flex-shrink-0 ${speed} ${className}`}
  >
    {/* Two interlocking Archimedean spiral vortex arms */}
    <path
      d="M 50,50 
         m 0,-5 
         a 5,5 0 0,1 5,5 
         a 10,10 0 0,1 -10,10 
         a 16,16 0 0,1 -16,-16 
         a 23,23 0 0,1 23,-23 
         a 31,31 0 0,1 31,31 
         a 40,40 0 0,1 -40,40"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      opacity="0.95"
    />
    <path
      d="M 50,50 
         m 0,5 
         a 5,5 0 0,1 -5,-5 
         a 10,10 0 0,1 10,-10 
         a 16,16 0 0,1 16,16 
         a 23,23 0 0,1 -23,23 
         a 31,31 0 0,1 -31,-31 
         a 40,40 0 0,1 40,-40"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      opacity="0.65"
    />
    <circle cx="50" cy="50" r="4.5" fill="currentColor" />
    <circle cx="50" cy="50" r="2" fill="#ffffff" />
  </svg>
);
