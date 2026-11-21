import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, Timer, Gamepad2, BarChart2, Settings, Package, Users, Moon, Sun, Monitor, Command } from 'lucide-react';
import { ActiveTab } from '../types';
import { applyTheme } from '../utils/theme';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: ActiveTab) => void;
  onOpenProfiles: () => void;
  onOpenImportPack: () => void;
}

interface PaletteAction {
  id: string;
  label: string;
  description: string;
  category: 'Navigation' | 'Actions' | 'Appearance';
  icon: React.ElementType;
  perform: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenProfiles,
  onOpenImportPack,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions: PaletteAction[] = [
    {
      id: 'nav-lessons',
      label: 'Lessons & Drills',
      description: 'Practice structured typing lessons',
      category: 'Navigation',
      icon: BookOpen,
      perform: () => {
        onNavigate('curriculum');
        onClose();
      },
    },
    {
      id: 'nav-packs',
      label: 'Lesson Packs & Curriculums',
      description: 'Manage languages, keyboard layouts, and custom packs',
      category: 'Navigation',
      icon: Package,
      perform: () => {
        onNavigate('packs');
        onClose();
      },
    },
    {
      id: 'nav-test',
      label: 'Speed Test',
      description: '1, 2, or 5 minute typing assessment',
      category: 'Navigation',
      icon: Timer,
      perform: () => {
        onNavigate('test');
        onClose();
      },
    },
    {
      id: 'nav-arcade',
      label: 'Arcade Mini-Games',
      description: 'Word Fall Arena typing arcade',
      category: 'Navigation',
      icon: Gamepad2,
      perform: () => {
        onNavigate('arcade');
        onClose();
      },
    },
    {
      id: 'nav-analytics',
      label: 'Analytics & Heatmap',
      description: 'Inspect latency, accuracy, and weak keys',
      category: 'Navigation',
      icon: BarChart2,
      perform: () => {
        onNavigate('analytics');
        onClose();
      },
    },
    {
      id: 'nav-settings',
      label: 'Settings & Security',
      description: 'Audio, switch profiles, PIN lock',
      category: 'Navigation',
      icon: Settings,
      perform: () => {
        onNavigate('settings');
        onClose();
      },
    },
    {
      id: 'act-import',
      label: 'Import .ttpack',
      description: 'Install a new language or course pack',
      category: 'Actions',
      icon: Package,
      perform: () => {
        onClose();
        onOpenImportPack();
      },
    },
    {
      id: 'act-profiles',
      label: 'Switch User Profile',
      description: 'Manage students and user profiles',
      category: 'Actions',
      icon: Users,
      perform: () => {
        onClose();
        onOpenProfiles();
      },
    },
    {
      id: 'theme-system',
      label: 'Theme: System Default',
      description: 'Match operating system appearance',
      category: 'Appearance',
      icon: Monitor,
      perform: () => {
        applyTheme('system');
        onClose();
      },
    },
    {
      id: 'theme-dark',
      label: 'Theme: Dark Mode',
      description: 'Calm dark neutral palette',
      category: 'Appearance',
      icon: Moon,
      perform: () => {
        applyTheme('dark');
        onClose();
      },
    },
    {
      id: 'theme-light',
      label: 'Theme: Light Mode',
      description: 'Clean light neutral palette',
      category: 'Appearance',
      icon: Sun,
      perform: () => {
        applyTheme('light');
        onClose();
      },
    },
  ];

  const filtered = actions.filter(
    (a) =>
      a.label.toLowerCase().includes(query.toLowerCase()) ||
      a.description.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].perform();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-surface border border-border rounded-card w-full max-w-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-surface">
          <Search className="w-4 h-4 text-accent flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to screen..."
            className="flex-1 bg-transparent text-sm text-txt outline-none placeholder:text-txt-muted"
          />
          <div className="flex items-center gap-1 text-[10px] text-txt-muted px-1.5 py-0.5 rounded border border-border bg-surface-2 font-mono">
            ESC
          </div>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-txt-muted">
              No matching commands found.
            </div>
          ) : (
            filtered.map((action, idx) => {
              const Icon = action.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={action.id}
                  onClick={action.perform}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-btn text-left transition-colors ${
                    isSelected
                      ? 'bg-accent text-white'
                      : 'hover:bg-surface-2 text-txt'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-white' : 'text-accent'}`} />
                    <div className="truncate">
                      <span className="text-xs font-semibold block leading-none truncate">{action.label}</span>
                      <span className={`text-[11px] block mt-0.5 truncate ${isSelected ? 'text-white/80' : 'text-txt-muted'}`}>
                        {action.description}
                      </span>
                    </div>
                  </div>
                  <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ml-2 flex-shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-surface-2 text-txt-muted'
                  }`}>
                    {action.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2 border-t border-border bg-surface-2/40 flex items-center justify-between text-[11px] text-txt-muted">
          <div className="flex items-center gap-3">
            <span><strong className="font-mono text-txt">&uarr;&darr;</strong> Navigate</span>
            <span><strong className="font-mono text-txt">&crarr;</strong> Select</span>
            <span><strong className="font-mono text-txt">ESC</strong> Close</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <Command className="w-3 h-3" />+K
          </div>
        </div>
      </div>
    </div>
  );
};
