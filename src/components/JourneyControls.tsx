import React from 'react';
import { useLedger } from '../context/LedgerContext';
import { DOMAINS } from '../data/domains';

export const JourneyControls: React.FC = () => {
  const {
    currentWaypointIndex,
    currentWaypoint,
    route,
    nextLeg,
    prevLeg,
    jumpToWaypoint,
    isRerouted,
    setShowBorderModal,
    navigatorCoords,
  } = useLedger();

  const domain = DOMAINS[currentWaypoint.domainId];

  return (
    <aside aria-label="Open World Navigator Controller" className="w-full bg-[#06040a] border-t border-violet-500/25 px-3 sm:px-6 py-2.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Navigator Coordinates & Current Landmark Capsule */}
        <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
          <div className="flex items-center gap-2.5 bg-[#0e071a] px-3.5 py-1.5 rounded-full border border-violet-500/35">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse"></span>
            <span className="font-mono text-xs font-bold text-violet-200">
              X:{navigatorCoords.x} Y:{navigatorCoords.y}
            </span>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-label text-[9.5px] uppercase font-bold tracking-widest text-violet-300">
                Landmark #{currentWaypointIndex + 1} of {route.length}
              </span>
              {currentWaypoint.isBorder && (
                <span className="font-label text-[8.5px] uppercase font-bold bg-amber-950 text-amber-300 border border-amber-500/50 px-2 py-0.2 rounded-full">
                  Border Gate
                </span>
              )}
              {isRerouted && currentWaypoint.id === 'wp-shelter-12' && (
                <span className="font-label text-[8.5px] uppercase font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/50 px-2 py-0.2 rounded-full">
                  Shelter Active
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs truncate">
              <span className="font-serif font-bold text-sm text-white truncate">
                {currentWaypoint.name}
              </span>
              <span className="text-gray-600">·</span>
              <span className="font-serif italic text-xs text-violet-300">
                {domain.name} ({currentWaypoint.currentStrength}% ψ)
              </span>
            </div>
          </div>
        </div>

        {/* Center: Open World Waypoint Quick-Jump Dots */}
        <div className="hidden md:flex items-center gap-2 bg-[#0e071a] px-3.5 py-1.5 rounded-full border border-violet-500/25">
          {route.map((wp, idx) => {
            const isCurrent = idx === currentWaypointIndex;

            return (
              <button
                key={wp.id}
                onClick={() => jumpToWaypoint(idx)}
                className="group relative flex items-center justify-center p-0.5 cursor-pointer"
                title={`${idx + 1}. ${wp.name}`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'bg-violet-400 scale-135 ring-2 ring-violet-300 ring-offset-1 ring-offset-black shadow-[0_0_8px_#c084fc]'
                      : 'bg-gray-600 hover:bg-violet-300'
                  } ${wp.isBorder ? 'border border-amber-400' : ''}`}
                ></div>
              </button>
            );
          })}
        </div>

        {/* Right: Quick Teleport Stepper Capsule Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={prevLeg}
            className="px-3.5 py-1.5 rounded-full font-label text-xs font-semibold border border-violet-500/30 bg-[#0e071a] text-gray-300 hover:text-white hover:bg-[#180e2b] flex items-center gap-1 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">west</span>
            <span>Prev Landmark</span>
          </button>

          {currentWaypoint.isBorder && (
            <button
              onClick={() => setShowBorderModal(true)}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white font-label text-xs font-bold flex items-center gap-1 shadow-md hover:opacity-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">swap_horiz</span>
              <span>Attune</span>
            </button>
          )}

          <button
            onClick={nextLeg}
            className="px-4 py-1.5 rounded-full font-label text-xs font-bold border border-violet-400 bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:opacity-95 flex items-center gap-1 transition-all shadow-[0_0_12px_rgba(192,132,252,0.35)] cursor-pointer"
          >
            <span>Next Landmark</span>
            <span className="material-symbols-outlined text-[15px]">east</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
