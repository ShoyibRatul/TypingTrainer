export type ThemeMode = 'system' | 'light' | 'dark';

export function applyTheme(mode: ThemeMode = 'system') {
  const root = document.documentElement;

  if (mode === 'system') {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (systemDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  } else if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
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
