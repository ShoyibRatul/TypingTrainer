import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { BookOpen, Timer, Gamepad2, BarChart2, Settings, Lock, Sun, Moon, Monitor, Users, Keyboard } from 'lucide-react';
import { ActiveTab } from '../types';
import { applyTheme, ThemeMode } from '../utils/theme';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenProfiles: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  onOpenProfiles,
}) => {
  const { activeProfile, lockProfile } = useProfile();
  const [themeMode, setThemeMode] = React.useState<ThemeMode>('system');

  const cycleTheme = () => {
    const next: ThemeMode = themeMode === 'system' ? 'dark' : themeMode === 'dark' ? 'light' : 'system';
    setThemeMode(next);
    applyTheme(next);
  };

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'curriculum', label: 'Lessons', icon: BookOpen },
    { id: 'test', label: 'Speed Test', icon: Timer },
    { id: 'arcade', label: 'Arcade', icon: Gamepad2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-border flex flex-col justify-between select-none h-full min-h-[calc(100vh-2rem)]">
      {/* Top: Active Course Badge */}
      <div>
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2.5 px-3 py-2 bg-surface-2 rounded-btn border border-border">
            <Keyboard className="w-4 h-4 text-accent" />
            <div>
              <span className="font-semibold text-xs text-txt block leading-none">English</span>
              <span className="text-[10px] text-txt-muted block mt-0.5">US QWERTY Standard</span>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-btn text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-accent text-white font-semibold shadow-sm'
                    : 'text-txt-muted hover:text-txt hover:bg-surface-2'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom: Profile & Theme Controller */}
      <div className="p-3 border-t border-border space-y-2">
        {/* Theme Switcher */}
        <div className="flex items-center justify-between px-3 py-1.5 text-xs text-txt-muted bg-surface-2 rounded-btn border border-border">
          <span className="text-[11px]">Theme</span>
          <button
            onClick={cycleTheme}
            className="flex items-center gap-1.5 hover:text-txt transition-colors text-[11px] font-medium"
            title="Cycle Theme (System, Dark, Light)"
          >
            {themeMode === 'system' && <Monitor className="w-3.5 h-3.5 text-accent" />}
            {themeMode === 'dark' && <Moon className="w-3.5 h-3.5 text-accent" />}
            {themeMode === 'light' && <Sun className="w-3.5 h-3.5 text-accent" />}
            <span className="capitalize">{themeMode}</span>
          </button>
        </div>

        {/* Active Profile Pill */}
        <div className="flex items-center justify-between p-2 bg-surface-2 rounded-btn border border-border">
          <button
            onClick={onOpenProfiles}
            className="flex items-center gap-2.5 flex-1 min-w-0 text-left hover:opacity-80 transition-opacity"
            title="Switch User Profile"
          >
            <span className="text-xl p-1 bg-surface rounded-md shadow-sm border border-border">
              {activeProfile?.avatar || '👤'}
            </span>
            <div className="truncate">
              <span className="text-xs font-semibold text-txt block truncate">
                {activeProfile?.name || 'User'}
              </span>
              <span className="text-[10px] text-txt-muted flex items-center gap-1">
                <Users className="w-2.5 h-2.5" /> Profiles
              </span>
            </div>
          </button>

          {activeProfile?.pinHash && (
            <button
              onClick={lockProfile}
              title="Lock profile"
              className="p-1.5 text-txt-muted hover:text-warning hover:bg-surface rounded-md transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
