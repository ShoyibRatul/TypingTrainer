import React, { useState, useEffect } from 'react';
import { ProfileProvider, useProfile } from './context/ProfileContext';
import { ActiveTab } from './types';
import { TitleBar } from './components/TitleBar';
import { Rail } from './components/Rail';
import { StatusBar } from './components/StatusBar';
import { HomeView } from './components/HomeView';
import { LessonView } from './components/LessonView';
import { SpeedTestView } from './components/SpeedTestView';
import { ArcadeView } from './components/ArcadeView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { PacksView } from './components/PacksView';
import { ProfileModal } from './components/ProfileModal';
import { LockScreen } from './components/LockScreen';
import { CommandPalette } from './components/CommandPalette';
import { PackImportModal } from './components/PackImportModal';
import { applyTheme, initThemeWatcher, getSavedTheme } from './utils/theme';

const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isProfilesOpen, setIsProfilesOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isImportPackOpen, setIsImportPackOpen] = useState<boolean>(false);
  const { isLocked } = useProfile();

  useEffect(() => {
    // Apply saved theme or system default
    const saved = getSavedTheme();
    applyTheme(saved);
    const cleanup = initThemeWatcher(() => getSavedTheme());
    return cleanup;
  }, []);

  // Global Keyboard Shortcuts (Ctrl+K, F11, block browser refresh)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Command Palette (Cmd/Ctrl + K)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }

      // F11 Fullscreen Toggle
      if (e.key === 'F11') {
        e.preventDefault();
        if (typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window) {
          import('@tauri-apps/api/window').then(({ getCurrentWindow }) => {
            getCurrentWindow().isFullscreen().then((isFull) => {
              getCurrentWindow().setFullscreen(!isFull);
            });
          }).catch(() => {});
        } else {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        }
      }

      // Block standard browser refresh/save/print shortcuts in production app
      if (
        (e.key === 'F5') ||
        ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'r' || e.key.toLowerCase() === 's' || e.key.toLowerCase() === 'p'))
      ) {
        // If in Tauri desktop app, prevent browser default behavior
        if (typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-bg text-txt flex flex-col font-sans select-none antialiased">
      {/* 1. Custom Single Title Bar */}
      <TitleBar onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Lock screen overlay when profile is locked with PIN */}
      {isLocked && <LockScreen />}

      {/* 2. Middle Region: Rail (56px) + Dynamic Workspace */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        <Rail
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenProfiles={() => setIsProfilesOpen(true)}
        />

        {/* Main Workspace (Full-bleed without web footer) */}
        <main className="flex-1 overflow-hidden p-5 bg-bg flex flex-col min-w-0">
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'home' && (
              <HomeView
                onNavigate={setActiveTab}
                onContinueLesson={() => setActiveTab('curriculum')}
              />
            )}
            {activeTab === 'curriculum' && <LessonView />}
            {activeTab === 'packs' && <PacksView />}
            {activeTab === 'test' && <SpeedTestView />}
            {activeTab === 'arcade' && <ArcadeView />}
            {activeTab === 'analytics' && <AnalyticsView />}
            {activeTab === 'settings' && <SettingsView />}
          </div>
        </main>
      </div>

      {/* 3. Status Bar (24px at bottom) */}
      <StatusBar />

      {/* Modals & Dialogs */}
      <ProfileModal
        isOpen={isProfilesOpen}
        onClose={() => setIsProfilesOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={setActiveTab}
        onOpenProfiles={() => setIsProfilesOpen(true)}
        onOpenImportPack={() => setIsImportPackOpen(true)}
      />

      <PackImportModal
        isOpen={isImportPackOpen}
        onClose={() => setIsImportPackOpen(false)}
        onPackInstalled={() => setActiveTab('packs')}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ProfileProvider>
      <MainLayout />
    </ProfileProvider>
  );
};

export default App;
