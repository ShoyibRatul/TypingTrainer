import { useState, useEffect, useCallback } from 'react';

export interface UpdateInfo {
  version: string;
  body?: string;
  date?: string;
}

export type UpdateStatus = 'idle' | 'checking' | 'available' | 'downloading' | 'ready' | 'error';

export function useUpdater() {
  const [status, setStatus] = useState<UpdateStatus>('idle');
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isPortable, setIsPortable] = useState<boolean>(false);

  const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

  // Check if running in portable mode
  useEffect(() => {
    if (!isTauri) return;
    import('@tauri-apps/api/core').then(({ invoke }) => {
      invoke<boolean>('is_portable_mode')
        .then((val) => setIsPortable(!!val))
        .catch(() => setIsPortable(false));
    });
  }, [isTauri]);

  const checkForUpdates = useCallback(async (manual: boolean = false) => {
    if (!isTauri) {
      if (manual) {
        setErrorMessage('Updates are only available in desktop application builds.');
        setStatus('error');
      }
      return;
    }

    try {
      setStatus('checking');
      setErrorMessage('');

      const { check } = await import('@tauri-apps/plugin-updater');
      const update = await check();

      if (update && update.available) {
        setUpdateInfo({
          version: update.version,
          body: update.body || 'New features, exercises, and performance improvements.',
          date: update.date,
        });
        setStatus('available');
      } else {
        setStatus('idle');
        setUpdateInfo(null);
      }
    } catch (err: any) {
      if (manual) {
        setStatus('error');
        setErrorMessage(err?.message || 'Failed to check for updates. Please check your internet connection.');
      } else {
        // Silently ignore background check failures (offline, rate limited, etc.)
        setStatus('idle');
      }
    }
  }, [isTauri]);

  // Non-blocking background check 4 seconds after launch
  useEffect(() => {
    if (!isTauri) return;
    const timer = setTimeout(() => {
      checkForUpdates(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isTauri, checkForUpdates]);

  const installUpdate = useCallback(async () => {
    if (!isTauri) return;

    // If running in portable mode, direct user to GitHub releases page
    if (isPortable) {
      const { open } = await import('@tauri-apps/plugin-shell');
      await open('https://github.com/ShoyibRatul/TypingTrainer/releases/latest');
      return;
    }

    try {
      setStatus('downloading');
      setProgress(0);

      const { check } = await import('@tauri-apps/plugin-updater');
      const update = await check();

      if (!update) {
        setStatus('idle');
        return;
      }

      let downloaded = 0;
      let contentLength = 0;

      await update.downloadAndInstall((event) => {
        switch (event.event) {
          case 'Started':
            contentLength = event.data.contentLength || 0;
            break;
          case 'Progress':
            downloaded += event.data.chunkLength;
            if (contentLength > 0) {
              setProgress(Math.round((downloaded / contentLength) * 100));
            }
            break;
          case 'Finished':
            setStatus('ready');
            break;
        }
      });

      // Relaunch the application after installation
      const { relaunch } = await import('@tauri-apps/plugin-process');
      await relaunch();
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.message || 'Error occurred while downloading or installing update.');
    }
  }, [isTauri, isPortable]);

  return {
    status,
    updateInfo,
    progress,
    errorMessage,
    isPortable,
    checkForUpdates,
    installUpdate,
  };
}
