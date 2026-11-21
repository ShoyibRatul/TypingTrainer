import React, { useState, useEffect } from 'react';
import { ProfileProvider, useProfile } from './context/ProfileContext';
import { ActiveTab } from './types';
import { TitleBar } from './components/TitleBar';
import { Sidebar } from './components/Sidebar';
import { LessonView } from './components/LessonView';
import { SpeedTestView } from './components/SpeedTestView';
import { ArcadeView } from './components/ArcadeView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { ProfileModal } from './components/ProfileModal';
import { LockScreen } from './components/LockScreen';
import { applyTheme, initThemeWatcher } from './utils/theme';

const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('curriculum');
  const [isProfilesOpen, setIsProfilesOpen] = useState<boolean>(false);
  const { isLocked } = useProfile();

  useEffect(() => {
    // Apply initial system/profile theme
    applyTheme('system');
    const cleanup = initThemeWatcher(() => 'system');
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-bg text-txt flex flex-col font-sans selection:bg-accent selection:text-white antialiased">
      {/* Title Bar (Draggable region in native window) */}
      <TitleBar />

      {/* Lock screen overlay when profile is locked with PIN */}
      {isLocked && <LockScreen />}

      {/* Main Workspace with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenProfiles={() => setIsProfilesOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-6 bg-bg">
          {activeTab === 'curriculum' && <LessonView />}
          {activeTab === 'test' && <SpeedTestView />}
          {activeTab === 'arcade' && <ArcadeView />}
          {activeTab === 'analytics' && <AnalyticsView />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* User Profiles Management Modal */}
      <ProfileModal
        isOpen={isProfilesOpen}
        onClose={() => setIsProfilesOpen(false)}
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
