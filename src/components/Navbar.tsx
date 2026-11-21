import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { BookOpen, Timer, Gamepad2, BarChart3, Settings, Lock, Volume2, VolumeX, Users } from 'lucide-react';

export type ActiveTab = 'curriculum' | 'test' | 'arcade' | 'analytics' | 'settings';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenProfiles: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, onOpenProfiles }) => {
  const { activeProfile, lockProfile, updatePreferences } = useProfile();

  const handleToggleSound = () => {
    if (!activeProfile) return;
    const current = activeProfile.preferences.soundProfile;
    const next = current === 'cherry-blue' ? 'thock' : current === 'thock' ? 'cherry-brown' : current === 'cherry-brown' ? 'off' : 'cherry-blue';
    updatePreferences({ soundProfile: next });
  };

  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 select-none">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/20">
            TT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-slate-100">Typing Trainer</span>
              <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.2 rounded font-semibold">
                FOSS
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">Open Source Touch Typing Suite</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => onTabChange('curriculum')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'curriculum'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lessons</span>
          </button>

          <button
            onClick={() => onTabChange('test')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'test'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>Speed Test</span>
          </button>

          <button
            onClick={() => onTabChange('arcade')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'arcade'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Arcade</span>
          </button>

          <button
            onClick={() => onTabChange('analytics')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => onTabChange('settings')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              activeTab === 'settings'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </nav>

        {/* Right Controls: Sound Switcher + User Profile Button */}
        <div className="flex items-center gap-2">
          {/* Audio Profile Button */}
          <button
            onClick={handleToggleSound}
            title={`Switch Sound: currently ${activeProfile?.preferences.soundProfile}`}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition"
          >
            {activeProfile?.preferences.soundProfile === 'off' ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
            )}
            <span className="capitalize text-[11px] hidden md:inline">
              {activeProfile?.preferences.soundProfile.replace('-', ' ')}
            </span>
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center bg-slate-800/80 border border-slate-700/60 rounded-xl p-1 gap-1">
            <button
              onClick={onOpenProfiles}
              className="flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-200 hover:bg-slate-700/50 transition"
            >
              <span className="text-base leading-none">{activeProfile?.avatar || '👤'}</span>
              <span className="max-w-[80px] truncate">{activeProfile?.name || 'User'}</span>
              <Users className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
            </button>

            {activeProfile?.pinHash && (
              <button
                onClick={lockProfile}
                title="Lock profile workspace"
                className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-700/50 rounded-lg transition"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
