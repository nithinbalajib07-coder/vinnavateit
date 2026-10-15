import React from 'react';
import { LedgerProvider, useLedger } from './context/LedgerContext';
import { Header } from './components/Header';
import { MapView } from './components/MapView';
import { TongueShifter } from './components/TongueShifter';
import { WardensBell } from './components/WardensBell';
import { BorderCrossing } from './components/BorderCrossing';
import { JourneyControls } from './components/JourneyControls';
import { AboutWorldModal } from './components/AboutWorldModal';
import { WelcomeOrrinModal } from './components/WelcomeOrrinModal';

const LedgerAppContent: React.FC = () => {
  const {
    activeTab,
    showBorderModal,
    currentDomain,
    showWelcomeModal,
    setShowWelcomeModal,
    playAttuneSound,
  } = useLedger();

  return (
    <div
      className="min-h-screen pt-16 flex flex-col bg-[#06040a] text-[#f5f3ff] transition-colors duration-300 relative select-text"
      data-domain={currentDomain}
    >
      {/* Dark Cosmos Ambient Texture */}
      <div className="fixed inset-0 pointer-events-none dark-parchment-texture z-0 opacity-75" />

      {/* Unified Top Bar Header */}
      <Header />

      {/* Main Tab Content View */}
      <main className="flex-1 flex flex-col relative z-10">
        {activeTab === 'map' && <MapView />}
        {activeTab === 'tongue' && <TongueShifter />}
        {activeTab === 'warden' && <WardensBell />}
        {activeTab === 'border' && (
          <div className="flex-1 p-4 flex items-center justify-center">
            <BorderCrossing />
          </div>
        )}
      </main>

      {/* Bottom Docked Courier Stepper Controls: Appears ONLY on Living Map */}
      {activeTab === 'map' && (
        <div className="sticky bottom-0 z-30 w-full">
          <JourneyControls />
        </div>
      )}

      {/* Overlays / Modals */}
      {showBorderModal && <BorderCrossing />}
      <AboutWorldModal />
      <WelcomeOrrinModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        playEnterChime={playAttuneSound}
      />
    </div>
  );
};

export default function App() {
  return (
    <LedgerProvider>
      <LedgerAppContent />
    </LedgerProvider>
  );
}
