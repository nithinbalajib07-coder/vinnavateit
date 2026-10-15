import React, { useState } from 'react';
import { useLedger } from '../context/LedgerContext';
import { DOMAINS } from '../data/domains';
import { DomainId } from '../types/world';
import confetti from 'canvas-confetti';

interface BorderCrossingProps {
  onClose?: () => void;
}

export const BorderCrossing: React.FC<BorderCrossingProps> = ({ onClose }) => {
  const {
    attuneLedger,
    setShowBorderModal,
    currentWaypoint,
  } = useLedger();

  const departingDomain: DomainId = currentWaypoint.id === 'wp-crag-anchor' || currentWaypoint.id === 'wp-border-chasm-bridge' ? 'skydrift' : 'tidereach';
  const incomingDomain: DomainId = currentWaypoint.id === 'wp-crag-anchor' || currentWaypoint.id === 'wp-border-chasm-bridge' ? 'stonemarch' : 'skydrift';

  const [attuning, setAttuning] = useState(false);
  const [attuneProgress, setAttuneProgress] = useState(41);
  const [statusMessage, setStatusMessage] = useState(
    `Align compass needle & activate ${DOMAINS[incomingDomain].name} wards`
  );

  const handleAttune = () => {
    setAttuning(true);
    setStatusMessage(`Harmonics locking to ${DOMAINS[incomingDomain].name} frequency...`);
    setAttuneProgress(88);

    setTimeout(() => {
      setAttuneProgress(100);
      setStatusMessage(`Harmonics locked: ${DOMAINS[incomingDomain].name} codex active!`);

      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#00f0ff', '#38bdf8', '#c084fc', '#f59e0b'],
        });
      } catch (e) {
        console.log(e);
      }

      setTimeout(() => {
        attuneLedger(incomingDomain);
        if (onClose) onClose();
      }, 700);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0a0514] rounded-3xl shadow-2xl border border-violet-500/35 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Modal Bar Capsule */}
        <div className="h-16 px-5 sm:px-6 bg-[#0e071a] border-b border-violet-500/25 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[22px] text-amber-400">
              door_front
            </span>
            <span className="font-serif font-bold text-base sm:text-lg text-white">
              Territorial Demarcation Waypoint
            </span>
          </div>
          <button
            onClick={() => {
              setShowBorderModal(false);
              if (onClose) onClose();
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          {/* Gate Banner Capsule Card */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0e071a] p-5 border border-violet-500/25 shadow-md">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="font-label text-xs text-amber-300 uppercase tracking-widest font-bold">
                  Active Boundary Crossing
                </span>
              </div>
              <span className="font-label text-[11px] text-violet-300 bg-violet-950/80 px-3 py-1 rounded-full border border-violet-500/40">
                {currentWaypoint.borderGateName || 'Waypoint #409-C'}
              </span>
            </div>

            <div className="mt-3">
              <p className="font-label text-xs text-gray-400 uppercase">
                Territorial Demarcation
              </p>
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-white mt-0.5">
                {currentWaypoint.name}
              </h2>
            </div>

            {/* Dual Sigil Seals: Departing to Incoming */}
            <div className="mt-4 pt-3 flex items-center justify-between border-t border-dashed border-violet-500/25">
              {/* Departing Domain */}
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-full bg-[#0a0514] flex items-center justify-center text-cyan-400 shadow-md relative border border-violet-500/30">
                  <svg className="w-5 h-5 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M3 12c3-4 6-4 9 0s6 4 9 0" strokeLinecap="round" />
                    <path d="M3 16c3-4 6-4 9 0s6 4 9 0" opacity="0.6" strokeLinecap="round" />
                    <circle cx="12" cy="7" fill="currentColor" r="1.5" />
                  </svg>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-black/60 flex items-center justify-center border border-white/20">
                    <span className="material-symbols-outlined text-[10px] text-gray-400">
                      arrow_downward
                    </span>
                  </div>
                </div>
                <div>
                  <span className="font-label text-xs text-white uppercase block font-bold">
                    {DOMAINS[departingDomain].name}
                  </span>
                  <span className="font-serif text-xs text-gray-400 italic">Departing Domain</span>
                </div>
              </div>

              {/* Meridian Divider */}
              <div className="flex flex-col items-center px-2">
                <span className="material-symbols-outlined text-amber-400 text-[18px]">swap_horiz</span>
                <span className="font-label text-[10px] text-gray-400 tracking-tighter">
                  1.84 km chasm
                </span>
              </div>

              {/* Incoming Domain */}
              <div className="flex items-center space-x-2.5 text-right">
                <div>
                  <span className="font-label text-xs text-white uppercase block font-bold">
                    {DOMAINS[incomingDomain].name}
                  </span>
                  <span className="font-serif text-xs text-amber-400 italic">Incoming Domain</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-purple-700 to-violet-800 text-white flex items-center justify-center shadow-md relative">
                  <svg className="w-5 h-5 text-amber-200" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M4 14.5c2-2 5-3.5 8-3.5 4.5 0 7.5 3 9 5.5" strokeLinecap="round" />
                    <path d="M6 10c2.5-2 6-3 9-3 3 0 5 1 6.5 2.5" opacity="0.6" strokeLinecap="round" />
                    <circle cx="12" cy="4" fill="currentColor" r="1.5" />
                  </svg>
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-black flex items-center justify-center">
                    <span className="material-symbols-outlined text-[10px]">arrow_upward</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Atmospheric Vignette Capsule Card */}
          <div className="relative w-full h-28 rounded-2xl overflow-hidden shadow-md border border-violet-500/25 bg-gradient-to-r from-violet-950 via-purple-950 to-indigo-950 flex items-center justify-center p-4 text-center">
            <div>
              <p className="font-serif italic text-sm text-violet-100 font-medium">
                "Suspended across deep elemental vapor canyons transitioning into open territory."
              </p>
              <div className="mt-1.5 flex items-center justify-center gap-2 font-label text-[11px] text-gray-400">
                <span className="material-symbols-outlined text-[15px] text-amber-400">air</span>
                <span>Chasm Depth: 420 Brachia | Wind Velocity: 28 Knots WNW</span>
              </div>
            </div>
          </div>

          {/* Dual-Theming Split Transition Area */}
          <div className="relative rounded-3xl overflow-hidden shadow-md border border-violet-500/25 bg-[#0e071a]">
            {/* Top: Departing Harmonic */}
            <div className="relative p-3.5 bg-[#0a0514]">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-cyan-400 text-[18px]">water_drop</span>
                  <span className="font-label text-xs uppercase tracking-wider text-white font-semibold">
                    {DOMAINS[departingDomain].name} Current Harmonic
                  </span>
                </div>
                <span className="font-label text-[10px] text-red-300 bg-red-950/80 border border-red-500/40 px-2.5 py-0.5 rounded-full font-bold">
                  14% [Fading to Null]
                </span>
              </div>
              <div className="mt-2 relative h-2 w-full bg-black/60 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '14%' }}></div>
              </div>
            </div>

            {/* Center Bridge Anomaly Ribbon */}
            <div className="relative z-10 px-4 py-2.5 bg-[#06030c] text-white flex items-center gap-3 border-y border-violet-500/25">
              <div className="w-7 h-7 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 animate-spin">
                <span className="material-symbols-outlined text-[16px] text-amber-300">sync</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label text-[11px] uppercase tracking-wide text-amber-300 font-bold">
                  Ledger Resonance Dampened
                </p>
                <p className="font-serif text-xs truncate text-gray-300">
                  Re-tuning parchment wards to {DOMAINS[incomingDomain].name} elemental frequency...
                </p>
              </div>
              <span className="material-symbols-outlined text-[18px] text-violet-400">sensors</span>
            </div>

            {/* Bottom: Incoming Harmonic Ascending */}
            <div className="relative p-3.5 bg-[#0e071a]">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="material-symbols-outlined text-amber-400 text-[18px]">cyclone</span>
                  <span className="font-label text-xs uppercase tracking-wider text-white font-semibold">
                    {DOMAINS[incomingDomain].name} Current Resonance
                  </span>
                </div>
                <span className="font-label text-[10px] text-violet-300 font-bold bg-violet-950/80 px-2.5 py-0.5 rounded-full border border-violet-500/40">
                  {attuneProgress}% [{attuneProgress >= 100 ? 'Synchronized' : 'Ascending'}]
                </span>
              </div>
              <div className="mt-2 relative h-2 w-full bg-black/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 via-purple-600 to-violet-500 transition-all duration-700 ease-out rounded-full"
                  style={{ width: `${attuneProgress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Checkpoint Protocol Manifest Capsule Card */}
          <div className="rounded-3xl bg-[#0e071a] p-5 border border-violet-500/25 shadow-md relative">
            <div className="flex items-center justify-between pb-2.5 border-b border-violet-500/20">
              <div>
                <span className="font-label text-[10px] text-amber-400 uppercase font-bold">
                  Border Inspection Docket
                </span>
                <h3 className="font-serif font-bold text-base text-white">
                  Courier Checkpoint Protocol
                </h3>
              </div>
              <span className="font-label text-xs bg-violet-950/80 px-3 py-1 rounded-full border border-violet-500/35 text-violet-300 font-semibold">
                Ilan Dross #409
              </span>
            </div>

            <div className="mt-3.5 space-y-2">
              <div className="flex items-start space-x-2.5 p-2.5 rounded-2xl bg-[#0a0514] border border-violet-500/20">
                <span className="material-symbols-outlined text-[17px] text-amber-400 mt-0.5">verified_user</span>
                <div className="min-w-0 flex-1">
                  <p className="font-label text-xs text-white font-bold">Cargo Seal Verification</p>
                  <p className="font-serif text-[11px] text-gray-300">
                    3 Waxed Satchels intact & untampered. Red beeswax seals unbroken.
                  </p>
                </div>
                <span className="font-label text-[10px] text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/40 font-bold">
                  Verified
                </span>
              </div>

              <div className="flex items-start space-x-2.5 p-2.5 rounded-2xl bg-[#0a0514] border border-violet-500/20">
                <span className="material-symbols-outlined text-[17px] text-amber-400 mt-0.5">balance</span>
                <div className="min-w-0 flex-1">
                  <p className="font-label text-xs text-white font-bold">Weight Tax Assessment</p>
                  <p className="font-serif text-[11px] text-gray-300">
                    Combined burden: 14.2 kg. Buoyancy safety tether required.
                  </p>
                </div>
                <span className="font-label text-[10px] text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/40 font-bold">
                  Tether Req.
                </span>
              </div>
            </div>
          </div>

          {/* Primary Attunement Trigger Capsule Button */}
          <div className="pt-2">
            <button
              onClick={handleAttune}
              disabled={attuning}
              className={`w-full group overflow-hidden rounded-full bg-gradient-to-r from-violet-700 via-purple-600 to-indigo-700 text-white p-4 shadow-xl transition-all active:scale-[0.99] flex items-center justify-between cursor-pointer ${
                attuning ? 'opacity-90' : 'hover:opacity-95'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                </div>
                <div className="text-left">
                  <span className="font-label text-xs uppercase tracking-wider block font-bold text-white">
                    Attune Ledger to {DOMAINS[incomingDomain].name}
                  </span>
                  <span className="font-serif text-xs text-violet-200">
                    {statusMessage}
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-white text-[24px] group-hover:translate-x-1 transition-transform pr-2">
                east
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
