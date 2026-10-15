import React from 'react';
import { useLedger } from '../context/LedgerContext';
import { DOMAINS } from '../data/domains';
import { DOMAIN_SURGE_PRESETS } from '../data/wardenSurges';
import { WardenSigil, RopeKnotDivider, SpinningVortexSpiral } from './OrrinIcons';
import { GiantCycloneSpiral } from './GiantCycloneSpiral';

export const WardensBell: React.FC = () => {
  const {
    activeAlert,
    countdownSeconds,
    isRerouted,
    rerouteToShelter,
    resetRoute,
    toggleSurgeAlert,
    setSurgePreset,
    playBellSound,
    setActiveTab,
  } = useLedger();

  const domain = DOMAINS[activeAlert.domainId];

  const minutes = Math.floor(countdownSeconds / 60);
  const seconds = countdownSeconds % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const isUrgent = activeAlert.urgency === 'CRITICAL' || activeAlert.urgency === 'WARNING';

  return (
    <div className="flex-1 flex flex-col p-3 sm:p-6 max-w-7xl mx-auto w-full gap-6 relative">
      {/* Cyclone-Shaped Giant Animated Spiral Spanning Across Entire Screen */}
      <GiantCycloneSpiral isUrgent={isUrgent} />

      {/* Top Banner Capsule */}
      <div className="bg-[#0c0812]/92 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-red-500/50 shadow-[0_4px_25px_rgba(244,63,94,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-red-500/15 text-red-300 border border-red-500/40 flex items-center justify-center flex-shrink-0 relative overflow-hidden shadow-sm">
            <SpinningVortexSpiral size={32} speed="animate-[spin_6s_linear_infinite]" className="text-red-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-serif font-bold text-lg sm:text-xl text-white">
                The Warden’s Bell Dispatch
              </h2>
              <span
                className={`font-label text-[10px] uppercase font-bold px-3 py-1 rounded-full border ${
                  isUrgent
                    ? 'bg-red-950/80 text-red-200 border-red-500/60 animate-pulse'
                    : 'bg-white/10 text-slate-300 border-red-500/40'
                }`}
              >
                {activeAlert.urgency}
              </span>
            </div>
            <p className="font-serif text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
              Living elemental Currents occasionally surge into violent gales, quakes, or floods. Attuned Wardens
              broadcast resonant alerts along physical meridian cables before disaster strikes.
            </p>
          </div>
        </div>

        {/* Chime Simulator & Alert Toggle Capsules */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={playBellSound}
            className="px-4 py-2 rounded-full bg-black/50 hover:bg-white/10 border border-red-500/50 text-amber-300 font-label text-xs font-semibold flex items-center gap-2 transition-all shadow-md cursor-pointer"
            title="Ring Brass Warning Bell"
          >
            <span className="material-symbols-outlined text-[17px] text-amber-400">notifications</span>
            <span>Chime Bell</span>
          </button>
          <button
            onClick={toggleSurgeAlert}
            className={`px-4 py-2 rounded-full font-label text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer border ${
              isUrgent
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-teal-500 text-white border-emerald-400/80 shadow-[0_0_18px_rgba(16,185,129,0.55)] active:scale-95'
                : 'bg-gradient-to-r from-red-950 via-rose-900 to-amber-950 hover:from-red-900 hover:to-rose-800 text-red-200 border-red-500/70 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
            }`}
          >
            <span className={`material-symbols-outlined text-[17px] ${isUrgent ? 'text-emerald-200 animate-pulse' : 'text-red-400'}`}>
              {isUrgent ? 'check_circle' : 'warning'}
            </span>
            <span className="tracking-wide">{isUrgent ? 'Simulate All-Clear' : 'Trigger Surge Demo'}</span>
          </button>
        </div>
      </div>

      {/* Main Alert Card Capsule in Cohesive Crimson & Obsidian Theme with Dynamically Spinning Spiral */}
      <div
        className={`rounded-3xl border-2 p-5 sm:p-7 shadow-2xl transition-all duration-500 relative overflow-hidden ${
          isUrgent
            ? 'bg-[#15070a] border-red-500/60 text-red-100 shadow-[0_0_30px_rgba(244,63,94,0.2)]'
            : 'bg-[#0c0812] border-red-500/50 text-white shadow-[0_4px_25px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Ambient Large Dynamically Spinning Spiral Watermark in Background */}
        <div className="absolute -top-16 -right-16 pointer-events-none opacity-20">
          <SpinningVortexSpiral size={240} speed="animate-[spin_18s_linear_infinite]" className="text-red-500" />
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-red-500/30 pb-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-13 h-13 rounded-full flex items-center justify-center border shadow-md ${
                isUrgent
                  ? 'bg-red-500/20 text-red-400 border-red-500/60 shadow-[0_0_18px_rgba(244,63,94,0.4)]'
                  : 'bg-white/10 text-slate-300 border-red-500/40'
              }`}
            >
              {isUrgent ? (
                <SpinningVortexSpiral size={36} speed="animate-[spin_3s_linear_infinite]" className="text-red-400" />
              ) : (
                <span className="material-symbols-outlined text-[30px]">verified_user</span>
              )}
            </div>
            <div>
              <span className="font-label text-[10px] uppercase tracking-wider font-bold text-amber-400 block">
                {domain.name} Sector Dispatch
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  {activeAlert.surgeType} Surge Advisory
                </h3>
                {isUrgent && (
                  <SpinningVortexSpiral size={22} speed="animate-[spin_4s_linear_infinite]" className="text-red-400" />
                )}
              </div>
            </div>
          </div>

          {/* Real-time Countdown Timer Capsule */}
          {isUrgent && (
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 border border-red-500/60 shadow-md">
              <div className="flex flex-col text-right">
                <span className="font-label text-[8.5px] uppercase font-bold text-red-400">
                  Estimated Rupture In
                </span>
                <span className="font-mono font-bold text-2xl text-red-400 tracking-tight">
                  {timeFormatted}
                </span>
              </div>
              <span className="material-symbols-outlined text-[28px] text-red-500 animate-pulse">
                timer
              </span>
            </div>
          )}
        </div>

        {/* Dispatcher Profile & Core Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-5">
          {/* Dispatch Message (8 cols) */}
          <div className="lg:col-span-8 space-y-3">
            <div className="p-3.5 rounded-2xl bg-black/45 border border-red-500/50">
              <span className="font-label text-[10px] uppercase font-bold text-amber-400 block mb-1">
                Warden Sentry Dispatch Transcript
              </span>
              <p className="font-serif text-sm sm:text-base leading-relaxed text-gray-200">
                "{activeAlert.message}"
              </p>
            </div>

            {/* Affected Zone Capsule */}
            <div className="p-3.5 rounded-2xl bg-black/45 border border-red-500/50 flex items-start gap-2.5 text-xs">
              <span className="material-symbols-outlined text-[18px] text-amber-400 mt-0.5">place</span>
              <div>
                <span className="font-label text-[10px] uppercase font-bold text-amber-400 block">
                  Threatened Route Sector
                </span>
                <span className="font-serif font-semibold text-white">
                  {activeAlert.affectedRegion}
                </span>
              </div>
            </div>

            {/* Recommended Action Capsule */}
            <div className="p-3.5 rounded-2xl bg-black/45 border border-red-500/50 flex items-start gap-2.5 text-xs">
              <span className="material-symbols-outlined text-[18px] text-amber-400 mt-0.5">directions</span>
              <div>
                <span className="font-label text-[10px] uppercase font-bold text-amber-400 block">
                  Mandated Courier Protocol
                </span>
                <span className="font-serif text-gray-300">
                  {activeAlert.recommendedAction}
                </span>
              </div>
            </div>
          </div>

          {/* Warden Dossier & Seismograph (4 cols) */}
          <div className="lg:col-span-4 p-4 rounded-2xl bg-black/45 border border-red-500/50 shadow-md flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[18px] text-amber-400">badge</span>
                <span className="font-label text-xs uppercase font-bold text-amber-400">
                  Attuned Sentry
                </span>
              </div>
              <h4 className="font-serif font-bold text-base text-white">
                {activeAlert.wardenName}
              </h4>
              <p className="font-label text-[11px] text-gray-300">
                {activeAlert.wardenRank}
              </p>
              <p className="font-serif italic text-xs text-amber-400/80 mt-0.5">
                {activeAlert.station}
              </p>
            </div>

            {/* Seismograph / Barometer Trace Chart with Unified Crimson Gradient */}
            <div className="pt-2 border-t border-red-500/30">
              <div className="flex items-center justify-between text-[10px] font-label font-bold text-gray-400 mb-1.5">
                <span>Current Turbulence Trace</span>
                <span className="font-mono text-red-400">
                  Peak: {Math.max(...activeAlert.barometricTrace)} ψ
                </span>
              </div>
              <div className="h-10 w-full flex items-end gap-1 bg-black/50 p-1.5 rounded-xl border border-red-500/40">
                {activeAlert.barometricTrace.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 rounded-full transition-all duration-500"
                    style={{
                      height: `${val}%`,
                      backgroundColor: val > 80 ? '#f43f5e' : val > 50 ? '#e11d48' : '#9f1239',
                      opacity: 0.45 + (val / 100) * 0.55,
                    }}
                    title={`${val} ψ harmonic spike`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Safe Haven Capsule (Removed Reroute Button) */}
        {isUrgent && (
          <div className="pt-3 border-t border-red-500/30 flex items-center justify-between gap-3">
            <div className="p-3 rounded-2xl bg-black/45 border border-red-500/50 w-full flex items-center justify-between">
              <div className="text-xs">
                <span className="font-label font-bold uppercase text-[10px] text-amber-400 block">
                  Emergency Safe Haven
                </span>
                <span className="font-serif font-semibold text-white text-sm">
                  {activeAlert.shelterName}
                </span>
              </div>
              {isRerouted && (
                <span className="font-label text-xs font-bold text-red-200 bg-red-950/80 px-3 py-1.5 rounded-full border border-red-500/50 flex items-center gap-1.5 shadow-md">
                  <span className="material-symbols-outlined text-[15px] text-red-400">check</span>
                  Route Diverted to Shelter
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <RopeKnotDivider />

      {/* Multi-Domain Surge Simulation Scenarios Capsules */}
      <div className="bg-[#0c0812]/92 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-red-500/50 shadow-[0_4px_25px_rgba(244,63,94,0.12)] space-y-3 relative z-10">
        <div>
          <h3 className="font-serif font-bold text-base text-white">
            Simulate Other Domain Surges (Testing Console)
          </h3>
          <p className="font-serif text-xs text-gray-400 mt-0.5">
            Test how different elemental catastrophes trigger the early warning network across Orrin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => setSurgePreset('skydriftGale')}
            className="p-3.5 rounded-2xl bg-black/45 hover:bg-white/5 border border-red-500/40 text-left transition-all cursor-pointer hover:border-red-400/80 shadow-sm"
          >
            <span className="font-label text-[10px] uppercase font-bold text-amber-400 block">Skydrift</span>
            <span className="font-serif font-bold text-sm text-white block mt-0.5">
              Gale-Shear Vortex
            </span>
            <span className="text-[11px] text-gray-400 italic">
              74 knot crosswinds
            </span>
          </button>

          <button
            onClick={() => setSurgePreset('tidereachBore')}
            className="p-3.5 rounded-2xl bg-black/45 hover:bg-white/5 border border-red-500/40 text-left transition-all cursor-pointer hover:border-red-400/80 shadow-sm"
          >
            <span className="font-label text-[10px] uppercase font-bold text-amber-400 block">Tidereach</span>
            <span className="font-serif font-bold text-sm text-white block mt-0.5">
              Abyssal Spring Bore
            </span>
            <span className="text-[11px] text-gray-400 italic">
              Submerged canal pontoons
            </span>
          </button>

          <button
            onClick={() => setSurgePreset('stonemarchQuake')}
            className="p-3.5 rounded-2xl bg-black/45 hover:bg-white/5 border border-red-500/40 text-left transition-all cursor-pointer hover:border-red-400/80 shadow-sm"
          >
            <span className="font-label text-[10px] uppercase font-bold text-amber-400 block">Stonemarch</span>
            <span className="font-serif font-bold text-sm text-white block mt-0.5">
              Bedrock Lithic Quake
            </span>
            <span className="text-[11px] text-gray-400 italic">
              Descent tube cave-in
            </span>
          </button>

          <button
            onClick={() => setSurgePreset('emberholdEruption')}
            className="p-3.5 rounded-2xl bg-black/45 hover:bg-white/5 border border-red-500/40 text-left transition-all cursor-pointer hover:border-red-400/80 shadow-sm"
          >
            <span className="font-label text-[10px] uppercase font-bold text-amber-400 block">Emberhold</span>
            <span className="font-serif font-bold text-sm text-white block mt-0.5">
              Magma Rift Blowout
            </span>
            <span className="text-[11px] text-gray-400 italic">
              114 ψ crucible overflow
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
