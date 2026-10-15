import React from 'react';
import { useLedger } from '../context/LedgerContext';
import { DOMAINS } from '../data/domains';
import { DomainId } from '../types/world';
import { CurrentSigil, RopeKnotDivider } from './OrrinIcons';

export const AboutWorldModal: React.FC = () => {
  const { showAboutModal, setShowAboutModal } = useLedger();

  if (!showAboutModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#0c1826] rounded-3xl shadow-2xl border border-cyan-500/30 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Capsule Bar */}
        <div className="h-16 px-5 sm:px-6 bg-[#08111c] border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[24px] text-amber-400">
              menu_book
            </span>
            <div>
              <h2 className="font-serif font-bold text-base sm:text-lg text-white leading-tight">
                About the Open World of Orrin
              </h2>
              <p className="font-label text-[10px] uppercase tracking-wider text-cyan-400">
                Living Elemental Codex & Open World Rules
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAboutModal(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto font-serif">
          {/* Open-World Persona Card */}
          <div className="p-5 rounded-3xl bg-[#08111c] border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#0c1826] border-2 border-amber-400 flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
              📜
            </div>
            <div>
              <span className="font-label text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Open World Courier Codex
              </span>
              <h3 className="font-bold text-lg text-white">
                Ilan Dross, 19 · Free Courier Exploration
              </h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Rather than a single linear journey, Orrin is an open continent of intertwined elemental highways.
                Couriers navigate freely across <strong>Tidereach</strong>, <strong>Skydrift</strong>, <strong>Stonemarch</strong>,
                <strong> Emberhold</strong>, and the wild southern <strong>Shadowmere Forest</strong> by following the violet leylines
                inscribed into their ledger parchment.
              </p>
            </div>
          </div>

          {/* Rule 1: Living Currents */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-label text-[11px] font-bold text-cyan-300 bg-cyan-950/80 px-3 py-0.5 rounded-full border border-cyan-500/40">
                Rule 1
              </span>
              <h4 className="font-bold text-base text-white">
                Living Elemental Currents & Free Path Tracking
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Each territorial domain pulses with an elemental Current (Water, Air, Earth, Heat).
              Moving your cursor along the violet courier paths glides the navigator across the world, seamlessly
              synchronizing the ledger's harmonic frequencies with the surrounding domain in real-time.
            </p>
          </div>

          {/* Rule 2: Moneyless Scarcity Economy */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-label text-[11px] font-bold text-amber-300 bg-amber-950/80 px-3 py-0.5 rounded-full border border-amber-500/40">
                Rule 2
              </span>
              <h4 className="font-bold text-base text-white">
                No Shared Currency · Value Dictated by Scarcity
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              No coin has universal worth in Orrin. Each realm values what its native Current cannot produce:
              volcanic <em>Emberhold</em> pays fortunes for ice; damp canal-bound <em>Tidereach</em> trades for smoke-free lamp oil;
              subterranean <em>Stonemarch</em> craves sweetwater; and floating <em>Skydrift</em> is starved of
              ballast anchoring stones and suspension rope.
            </p>
          </div>

          {/* Rule 3: Invented Languages & Scripts */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-label text-[11px] font-bold text-indigo-300 bg-indigo-950/80 px-3 py-0.5 rounded-full border border-indigo-500/40">
                Rule 3
              </span>
              <h4 className="font-bold text-base text-white">
                Dialects of the Current & Inscribed Script Systems
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Each Domain speaks an invented language with its own written script (wave-script, aero-glyphs, cuneiform, pyre-runes).
              The <strong>Tongue Shifter</strong> displays procedural SVG runes and warns travelers against cultural insults.
            </p>
          </div>

          {/* Rule 4: Surges & The Warden's Bell */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="font-label text-[11px] font-bold text-red-300 bg-red-950/80 px-3 py-0.5 rounded-full border border-red-500/40">
                Rule 4
              </span>
              <h4 className="font-bold text-base text-white">
                Current Surges & Early Warning Warden Cadres
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              When living Currents experience turbulence, catastrophic surges erupt (violent gale shears, tidal bores, seismic fractures, caldera blowouts).
              Attuned Wardens broadcast emergency signals so couriers can immediately bypass hazard zones via fortified shelters.
            </p>
          </div>

          <RopeKnotDivider />

          {/* Domain Breakdown Capsules */}
          <div>
            <h4 className="font-bold text-sm text-white mb-2.5">
              The Four Domains at a Glance
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {(['tidereach', 'skydrift', 'stonemarch', 'emberhold'] as DomainId[]).map((dId) => {
                const d = DOMAINS[dId];
                return (
                  <div
                    key={dId}
                    className="p-3.5 rounded-2xl bg-[#08111c] border border-cyan-500/20 flex flex-col gap-1.5"
                  >
                    <div className="flex items-center gap-1.5 font-sans font-bold text-white">
                      <CurrentSigil domain={dId} size={15} />
                      <span>{d.name}</span>
                      <span className="text-[10px] text-gray-400 font-normal">
                        ({d.element} · {d.harmonicFreq.split(' ')[0]})
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 italic">
                      {d.culture.split('.')[0]}.
                    </p>
                    <div className="text-[10px] font-sans flex justify-between mt-1 pt-1 border-t border-cyan-500/10 text-gray-400">
                      <span>Lacks: {d.lacks[0]}</span>
                      <span>Produces: {d.produces[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#08111c] border-t border-cyan-500/20 flex items-center justify-between">
          <span className="font-label text-xs text-gray-400">
            Design Challenge: "Build Your Own Universe"
          </span>
          <button
            onClick={() => setShowAboutModal(false)}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-label text-xs font-bold hover:opacity-95 transition-opacity cursor-pointer shadow-md"
          >
            Return to Open World
          </button>
        </div>
      </div>
    </div>
  );
};
