import React from 'react';
import { Home, BookOpen, Timer, Gamepad2, BarChart2, Package, Settings, Lock, User } from 'lucide-react';
import { ActiveTab } from '../types';
import { useProfile } from '../context/ProfileContext';

interface RailProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenProfiles: () => void;
}

export const Rail: React.FC<RailProps> = ({
  activeTab,
  onTabChange,
  onOpenProfiles,
}) => {
  const { activeProfile, lockProfile } = useProfile();

  const navItems: { id: ActiveTab; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'curriculum', label: 'Lessons', icon: BookOpen },
    { id: 'test', label: 'Speed Test', icon: Timer },
    { id: 'arcade', label: 'Arcade', icon: Gamepad2 },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'packs', label: 'Packs', icon: Package },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-14 bg-rail border-r border-border flex flex-col justify-between items-center py-3 select-none flex-shrink-0 z-20">
      {/* Top / Nav Items */}
      <div className="flex flex-col items-center gap-2 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <div key={item.id} className="relative w-full flex items-center justify-center">
              {isActive && (
                <div className="absolute left-0 w-1 h-5 rounded-r-full bg-accent" />
              )}
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-10 h-10 rounded-sm flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-surface-2 text-accent shadow-sm'
                    : 'text-txt-muted hover:text-txt hover:bg-surface-2'
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom / Profile & Lock */}
      <div className="flex flex-col items-center gap-2 w-full pt-3 border-t border-border">
        {activeProfile?.pinHash && (
          <button
            onClick={lockProfile}
            title="Lock Profile"
            className="w-10 h-10 rounded-sm flex items-center justify-center text-txt-muted hover:text-warning hover:bg-surface-2 transition-colors"
          >
            <Lock className="w-4 h-4 stroke-[1.5]" />
          </button>
        )}
        <button
          onClick={onOpenProfiles}
          title={`Profile: ${activeProfile?.name || 'User'} (Click to switch)`}
          className="w-9 h-9 rounded-full bg-surface-2 border border-border flex items-center justify-center text-xs font-semibold text-accent hover:border-accent transition-colors"
        >
          {activeProfile?.name ? (
            activeProfile.name.slice(0, 2).toUpperCase()
          ) : (
            <User className="w-4 h-4 stroke-[1.5]" />
          )}
        </button>
      </div>
    </aside>
  );
};
