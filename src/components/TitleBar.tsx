import React, { useState } from 'react';
import { Search, Sparkles, Download, X } from 'lucide-react';
import { useUpdater } from '../hooks/useUpdater';

interface TitleBarProps {
  onOpenCommandPalette?: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({ onOpenCommandPalette }) => {
  // Check if running in Tauri desktop environment
  const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
  // Detect macOS to keep native traffic lights only
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  const { status, updateInfo, progress, isPortable, installUpdate } = useUpdater();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleMinimize = async () => {
    if (isTauri) {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      getCurrentWindow().minimize();
    }
  };

  const handleMaximize = async () => {
    if (isTauri) {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      getCurrentWindow().toggleMaximize();
    }
  };

  const handleClose = async () => {
    if (isTauri) {
      const { getCurrentWindow } = await import('@tauri-apps/api/window');
      getCurrentWindow().close();
    }
  };

  const hasUpdate = status === 'available' || status === 'downloading' || status === 'ready';

  return (
    <>
      <div
        data-tauri-drag-region
        onDoubleClick={handleMaximize}
        className={`h-8 w-full bg-surface border-b border-border select-none flex items-center justify-between text-txt-muted text-xs z-50 sticky top-0 ${
          isMac ? 'pl-20 pr-3' : 'pl-3 pr-0'
        }`}
      >
        {/* Brand Section */}
        <div className="flex items-center gap-2 pointer-events-none" data-tauri-drag-region>
          <img src="/app-logo.png" alt="Logo" className="w-4 h-4 object-contain" />
          <span className="font-semibold text-xs text-txt tracking-tight">Typing Trainer</span>
          <span className="text-xs text-txt-muted font-normal">• English QWERTY</span>
        </div>

        {/* Center: Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm border border-border bg-surface-2 hover:border-accent text-xs text-txt-muted hover:text-txt transition-colors cursor-pointer"
          title="Open Command Palette (Ctrl+K)"
        >
          <Search className="w-3 h-3 text-accent" />
          <span>Search lessons & commands...</span>
          <span className="font-mono text-[9px] px-1 rounded-sm bg-surface border border-border">Ctrl+K</span>
        </button>

        {/* Right Section: Update Indicator & Window Controls */}
        <div className="flex items-center h-full">
          {/* Top-Right Background Update Indicator Badge */}
          {hasUpdate && (
            <button
              onClick={() => setIsUpdateModalOpen(true)}
              className="mr-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent text-on-accent font-semibold text-[10px] animate-pulse cursor-pointer shadow-sm"
              title={`Update available: v${updateInfo?.version || ''}`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Update v{updateInfo?.version}</span>
            </button>
          )}

          {/* Windows / Linux Desktop Native-Style Controls (46x32px hit areas) */}
          {isTauri && !isMac ? (
            <div className="flex items-center h-full">
              <button
                onClick={handleMinimize}
                className="w-[46px] h-8 flex items-center justify-center hover:bg-surface-2 text-txt-muted hover:text-txt transition-colors"
                title="Minimize"
              >
                <svg width="10" height="1" viewBox="0 0 10 1"><line x1="0" y1="0.5" x2="10" y2="0.5" stroke="currentColor" strokeWidth="1"/></svg>
              </button>
              <button
                onClick={handleMaximize}
                className="w-[46px] h-8 flex items-center justify-center hover:bg-surface-2 text-txt-muted hover:text-txt transition-colors"
                title="Maximize"
              >
                <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1"/></svg>
              </button>
              <button
                onClick={handleClose}
                className="w-[46px] h-8 flex items-center justify-center hover:bg-danger text-txt-muted hover:text-white transition-colors"
                title="Close"
              >
                <svg width="10" height="10" viewBox="0 0 10 10">
                  <line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" strokeWidth="1.1"/>
                  <line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1.1"/>
                </svg>
              </button>
            </div>
          ) : (
            <div className="w-4" />
          )}
        </div>
      </div>

      {/* Update Dialog Popover */}
      {isUpdateModalOpen && updateInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn text-txt">
          <div className="w-full max-w-sm bg-surface border border-border rounded-card p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <h3 className="font-bold text-sm text-txt">New Version Available</h3>
              </div>
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="p-1 rounded text-txt-muted hover:text-txt hover:bg-surface-2"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono bg-surface-2 p-2 rounded border border-border">
                <span className="text-txt-muted">Target Version:</span>
                <span className="font-bold text-accent">v{updateInfo.version}</span>
              </div>
              <p className="text-xs text-txt-muted leading-relaxed line-clamp-4">
                {updateInfo.body || 'Includes performance optimizations, new TypingMaster drills, and bug fixes.'}
              </p>
            </div>

            {status === 'downloading' && (
              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] text-txt-muted">
                  <span>Downloading update...</span>
                  <span className="font-mono">{progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-2 rounded-full overflow-hidden">
                  <div className="h-full bg-accent transition-all duration-200" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="flex-1 py-2 text-xs font-medium rounded-sm border border-border hover:bg-surface-2 text-txt-muted hover:text-txt transition-colors cursor-pointer"
              >
                Remind Later
              </button>
              <button
                onClick={installUpdate}
                disabled={status === 'downloading'}
                className="flex-1 py-2 text-xs font-semibold rounded-sm bg-accent hover:bg-accent-hover text-on-accent flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isPortable ? 'Get Portable ZIP' : 'Download & Restart'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
