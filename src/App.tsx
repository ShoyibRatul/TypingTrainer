import React, { useState } from 'react';
import { ProfileProvider, useProfile } from './context/ProfileContext';
import { Navbar, ActiveTab } from './components/Navbar';
import { LessonView } from './components/LessonView';
import { SpeedTestView } from './components/SpeedTestView';
import { ArcadeView } from './components/ArcadeView';
import { AnalyticsView } from './components/AnalyticsView';
import { SettingsView } from './components/SettingsView';
import { ProfileModal } from './components/ProfileModal';
import { LockScreen } from './components/LockScreen';

const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('curriculum');
  const [isProfilesOpen, setIsProfilesOpen] = useState<boolean>(false);
  const { isLocked } = useProfile();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Lock screen overlay when profile is locked with PIN */}
      {isLocked && <LockScreen />}

      {/* Main Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenProfiles={() => setIsProfilesOpen(true)}
      />

      {/* Active Tab Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'curriculum' && <LessonView />}
        {activeTab === 'test' && <SpeedTestView />}
        {activeTab === 'arcade' && <ArcadeView />}
        {activeTab === 'analytics' && <AnalyticsView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            <strong className="text-slate-400">Typing Trainer</strong> • Free & Open Source Touch Typing Suite
          </span>
          <span className="text-[11px] text-slate-600">
            Engineered for Windows, macOS, Linux & Web • 100% Privacy Preserving
          </span>
        </div>
      </footer>

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
