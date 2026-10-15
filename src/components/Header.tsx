import React from 'react';
import { useLedger } from '../context/LedgerContext';

export const Header: React.FC = () => {
  const {
    currentWaypoint,
    soundEnabled,
    setSoundEnabled,
    setShowAboutModal,
    setShowBorderModal,
    setShowWelcomeModal,
    activeAlert,
    activeTab,
    setActiveTab,
    playAttuneSound,
  } = useLedger();

  const navItems = [
    {
      id: 'map' as const,
      label: 'Living Map',
      icon: 'map',
    },
    {
      id: 'tongue' as const,
      label: 'Tongue Shifter',
      icon: 'translate',
    },
    {
      id: 'warden' as const,
      label: "Warden's Bell",
      icon: 'notifications_active',
      badge: activeAlert.urgency === 'CRITICAL' ? 'SURGE' : undefined,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full bg-[#06040a]/95 backdrop-blur-md border-b border-violet-500/25 shadow-[0_4px_25px_rgba(192,132,252,0.18)] transition-colors duration-300">
      <div className="w-full px-3 sm:px-5 md:px-7 h-16 flex items-center justify-between gap-2">
        {/* LEFT-MOST CORNER: Wayfarer Logo and Name */}
        <div className="flex items-center gap-3 flex-1 justify-start min-w-0">
          {/* Celestial Neon Violet Compass Logo - Always Spinning */}
          <div className="relative flex-shrink-0 group cursor-pointer" onClick={() => setActiveTab('map')}>
            <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-violet-600 via-purple-500 to-fuchsia-400 shadow-[0_0_15px_rgba(192,132,252,0.45)] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0a0514] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-violet-300 animate-[spin_8s_linear_infinite] inline-block">
                  explore
                </span>
              </div>
            </div>
            {/* Subtle pulsator beacon */}
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-violet-400 animate-ping opacity-75" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-violet-400" />
          </div>

          {/* Only "The Wayfarer's Ledger" */}
          <h1 className="font-serif font-bold text-base sm:text-lg text-white tracking-tight leading-none whitespace-nowrap">
            The Wayfarer's Ledger
          </h1>
        </div>

        {/* CENTER: Four Application Navigation Buttons */}
        <div className="hidden md:flex items-center justify-center gap-1.5 lg:gap-2 flex-shrink-0">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full font-sans transition-all duration-200 cursor-pointer text-xs border ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-950 via-purple-900 to-indigo-950 text-white shadow-[0_0_16px_rgba(192,132,252,0.4)] border-violet-400 font-semibold'
                    : 'bg-[#0e071a] text-gray-400 hover:text-white hover:bg-[#180e2b] border-violet-500/20'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[17px] ${
                    isActive ? 'text-violet-300' : 'text-gray-500 group-hover:text-gray-200'
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-serif tracking-tight">{item.label}</span>
                {item.badge && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[8px] font-label font-bold bg-rose-600 text-white animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* RIGHT-MOST CORNER: Border, About Orrin, Sound */}
        <div className="flex items-center gap-2 flex-1 justify-end flex-shrink-0">
          {/* Border Gate Button */}
          <button
            onClick={() => setShowBorderModal(true)}
            className={`font-label text-xs px-3.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5 cursor-pointer ${
              currentWaypoint.isBorder
                ? 'bg-violet-950/90 text-violet-200 border-violet-400 font-bold shadow-[0_0_15px_rgba(192,132,252,0.4)] animate-pulse'
                : 'bg-[#0e071a] text-gray-300 hover:text-white border-violet-500/25 hover:border-violet-400'
            }`}
            title="Inspect Border Gate & Checkpoint Docket"
          >
            <span className="material-symbols-outlined text-[15px] text-violet-300">
              swap_horiz
            </span>
            <span className="hidden sm:inline">Border</span>
          </button>

          {/* About Orrin Button */}
          <button
            onClick={() => setShowAboutModal(true)}
            className="px-3.5 py-1.5 rounded-full bg-[#0e071a] hover:bg-[#180e2b] border border-violet-500/30 text-gray-300 hover:text-white font-label text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
            title="Read Codex Lore & Orrin Rules"
          >
            <span className="material-symbols-outlined text-[15px] text-violet-300">
              menu_book
            </span>
            <span className="hidden sm:inline">About Orrin</span>
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              if (next) {
                setTimeout(() => playAttuneSound(), 50);
              }
            }}
            onDoubleClick={() => setShowWelcomeModal(true)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-violet-200 bg-[#0e071a] border border-violet-500/25 hover:border-violet-400 transition-colors cursor-pointer"
            title={soundEnabled ? 'Toggle Sound (Double-click to reopen Welcome Screen)' : 'Enable Audio'}
            aria-label="Toggle Sound"
          >
            <span className="material-symbols-outlined text-[17px]">
              {soundEnabled ? 'volume_up' : 'volume_off'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile-only responsive row for 4 application buttons */}
      <div className="md:hidden flex items-center justify-center gap-1 px-2 py-1.5 border-t border-violet-500/20 bg-[#08040e]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-sans text-[11px] border cursor-pointer ${
                isActive
                  ? 'bg-violet-950 text-white border-violet-400 font-semibold shadow-sm'
                  : 'bg-[#10071c] text-gray-400 border-violet-500/15'
              }`}
            >
              <span className={`material-symbols-outlined text-[14px] ${isActive ? 'text-violet-300' : 'text-gray-500'}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

