import React from 'react';
import { useLedger } from '../context/LedgerContext';

export const Navigation: React.FC = () => {
  const { activeTab, setActiveTab, activeAlert, currentWaypoint, setShowBorderModal } = useLedger();

  const navItems = [
    {
      id: 'map' as const,
      label: 'Living Map',
      icon: 'map',
      subtitle: 'Open World',
    },
    {
      id: 'tongue' as const,
      label: 'Tongue Shifter',
      icon: 'translate',
      subtitle: 'Domain Scripts',
    },
    {
      id: 'warden' as const,
      label: "Warden's Bell",
      icon: 'notifications_active',
      subtitle: 'Surge Warning',
      badge: activeAlert.urgency === 'CRITICAL' ? 'SURGE' : undefined,
    },
  ];

  return (
    <nav className="w-full bg-[#070e17] border-b border-cyan-500/20 px-3 sm:px-6 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
        {/* Capsule Tab Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-full font-sans transition-all duration-200 text-left cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-950 to-indigo-950 text-white shadow-lg border-cyan-400 font-semibold'
                    : 'bg-[#0a1522] text-gray-400 hover:text-white hover:bg-[#102033] border-cyan-500/10'
                }`}
              >
                {/* Icon */}
                <span
                  className={`material-symbols-outlined text-[18px] transition-colors ${
                    isActive ? 'text-cyan-300' : 'text-gray-500 group-hover:text-gray-200'
                  }`}
                >
                  {item.icon}
                </span>

                {/* Text Labels */}
                <div className="flex flex-col">
                  <span className="font-serif text-xs sm:text-sm tracking-tight leading-tight">
                    {item.label}
                  </span>
                  <span className="hidden md:inline-block font-label text-[9px] text-gray-400 font-normal leading-none mt-0.5">
                    {item.subtitle}
                  </span>
                </div>

                {/* Surge Alert Badge Capsule */}
                {item.badge && (
                  <span className="ml-1 px-2 py-0.5 rounded-full text-[8.5px] font-label font-bold bg-red-600 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right side: Border gate shortcut capsule button */}
        <div className="flex items-center gap-2 pl-2">
          <button
            onClick={() => setShowBorderModal(true)}
            className={`font-label text-xs px-3.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
              currentWaypoint.isBorder
                ? 'bg-amber-950/80 text-amber-200 border-amber-400 font-bold shadow-md animate-pulse'
                : 'bg-[#0a1522] text-gray-300 hover:text-white border-cyan-500/20 hover:border-cyan-400'
            }`}
          >
            <span className="material-symbols-outlined text-[15px] text-amber-400">
              swap_horiz
            </span>
            <span className="hidden sm:inline">Border Gate</span>
            <span className="font-mono text-[9px] bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
              {currentWaypoint.isBorder ? 'Demarcation' : 'Docket'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};
