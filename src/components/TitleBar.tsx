import React from 'react';
import { Minus, Square, X, Search } from 'lucide-react';

interface TitleBarProps {
  onOpenCommandPalette?: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({ onOpenCommandPalette }) => {
  // Check if running in Tauri desktop environment
  const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

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
      className="h-8 w-full bg-surface-2/90 border-b border-border select-none flex items-center justify-between px-3 text-txt-muted text-xs z-50 sticky top-0"
    >
      <div className="flex items-center gap-2 pointer-events-none" data-tauri-drag-region>
        <div className="w-2.5 h-2.5 rounded-full bg-accent"></div>
        <span className="font-semibold text-[11px] text-txt tracking-tight">Typing Trainer</span>
        <span className="text-[10px] text-txt-muted font-normal">• English QWERTY</span>
      </div>

      {/* Center: Command Palette Trigger */}
      <button
        onClick={onOpenCommandPalette}
        className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded border border-border/80 bg-surface/70 hover:bg-surface text-[10px] text-txt-muted hover:text-txt transition-colors cursor-pointer"
        title="Open Command Palette (Ctrl+K)"
      >
        <Search className="w-2.5 h-2.5 text-accent" />
        <span>Search commands...</span>
        <span className="font-mono text-[9px] px-1 rounded bg-surface-2 border border-border">Ctrl+K</span>
      </button>

      {isTauri && (
        <div className="flex items-center gap-1">
          <button
            onClick={handleMinimize}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-surface hover:text-txt transition-colors"
            title="Minimize"
          >
            <Minus className="w-3 h-3" />
          </button>
          <button
            onClick={handleMaximize}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-surface hover:text-txt transition-colors"
            title="Maximize"
          >
            <Square className="w-2.5 h-2.5" />
          </button>
          <button
            onClick={handleClose}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-danger hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
