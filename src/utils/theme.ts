export type BuiltinTheme = 'midnight' | 'emerald' | 'graphite' | 'paper' | 'mint' | 'terminal';
export type ThemeMode = BuiltinTheme | 'system' | 'dark' | 'light';

export interface ThemeMeta {
  id: BuiltinTheme;
  name: string;
  type: 'dark' | 'light';
  bg: string;
  surface: string;
  accent: string;
  text: string;
}

export const THEMES: ThemeMeta[] = [
  { id: 'midnight', name: 'Midnight', type: 'dark', bg: '#000000', surface: '#111113', accent: '#22C55E', text: '#F4F4F5' },
  { id: 'emerald', name: 'Emerald', type: 'dark', bg: '#070D0A', surface: '#101C16', accent: '#34D399', text: '#ECFDF5' },
  { id: 'graphite', name: 'Graphite', type: 'dark', bg: '#313338', surface: '#383A40', accent: '#23A55A', text: '#F2F3F5' },
  { id: 'paper', name: 'Paper', type: 'light', bg: '#FFFFFF', surface: '#FFFFFF', accent: '#16A34A', text: '#060607' },
  { id: 'mint', name: 'Mint', type: 'light', bg: '#F4FBF7', surface: '#FFFFFF', accent: '#15803D', text: '#0B1F14' },
  { id: 'terminal', name: 'Terminal', type: 'dark', bg: '#000000', surface: '#0A0A0A', accent: '#00FF66', text: '#00FF66' },
];

export function applyTheme(mode: ThemeMode = 'system') {
  const root = document.documentElement;
  let effectiveTheme: BuiltinTheme = 'midnight';

  if (mode === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    effectiveTheme = isDark ? 'midnight' : 'paper';
  } else if (mode === 'dark') {
    effectiveTheme = 'midnight';
  } else if (mode === 'light') {
    effectiveTheme = 'paper';
  } else {
    effectiveTheme = mode;
  }

  root.setAttribute('data-theme', effectiveTheme);

  // Set backward-compatible .dark class for any legacy styles
  const isDark = effectiveTheme === 'midnight' || effectiveTheme === 'emerald' || effectiveTheme === 'graphite' || effectiveTheme === 'terminal';
  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  try {
    localStorage.setItem('typing_trainer_theme', mode);
  } catch {
    // LocalStorage might fail in restricted environments
  }
}

export function getSavedTheme(): ThemeMode {
  try {
    const saved = localStorage.getItem('typing_trainer_theme');
    if (saved && (saved === 'system' || THEMES.some(t => t.id === saved))) {
      return saved as ThemeMode;
    }
  } catch {
    // fallback to default
  }
  return 'midnight';
}

// Watch system theme change live if on 'system' mode
export function initThemeWatcher(getMode: () => ThemeMode) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const listener = () => {
    if (getMode() === 'system') {
      applyTheme('system');
    }
  };
  mediaQuery.addEventListener('change', listener);
  return () => mediaQuery.removeEventListener('change', listener);
}
