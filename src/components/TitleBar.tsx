import React from 'react';
import { Search } from 'lucide-react';

interface TitleBarProps {
  onOpenCommandPalette?: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({ onOpenCommandPalette }) => {
  // Check if running in Tauri desktop environment
  const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
  // Detect macOS to keep native traffic lights only
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

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

  return (
    <div
      data-tauri-drag-region
      onDoubleClick={handleMaximize}
      className={`h-8 w-full bg-surface border-b border-border select-none flex items-center justify-between text-txt-muted text-xs z-50 sticky top-0 ${
        isMac ? 'pl-20 pr-3' : 'pl-3 pr-0'
      }`}
    >
      {/* Brand Section */}
      <div className="flex items-center gap-2 pointer-events-none" data-tauri-drag-region>
        <div className="w-3.5 h-3.5 rounded bg-accent flex items-center justify-center text-[10px] font-bold text-on-accent">
          T
        </div>
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
  );
};
