import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Keyboard, User, Sparkles } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { packRegistry } from '../engine/packs/registry';
import { soundEngine } from '../utils/audio';

export const StatusBar: React.FC = () => {
  const { activeProfile } = useProfile();
  const [packInfo, setPackInfo] = useState(() => {
    const p = packRegistry.getActivePack();
    const name = p.manifest.name['en'] || Object.values(p.manifest.name)[0] || 'English';
    const layout = packRegistry.getLayout();
    return { name, layoutName: layout.name['en'] || Object.values(layout.name)[0] || 'QWERTY' };
  });

  const [isMuted, setIsMuted] = useState(soundEngine.isMuted());

  useEffect(() => {
    const update = () => {
      const p = packRegistry.getActivePack();
      const name = p.manifest.name['en'] || Object.values(p.manifest.name)[0] || 'English';
      const layout = packRegistry.getLayout();
      setPackInfo({ name, layoutName: layout.name['en'] || Object.values(layout.name)[0] || 'QWERTY' });
    };
    return packRegistry.subscribe(update);
  }, []);

  const toggleMute = () => {
    const next = !isMuted;
    soundEngine.setMuted(next);
    setIsMuted(next);
  };

  return (
    <footer className="h-6 w-full bg-surface border-t border-border flex items-center justify-between px-3 text-[11px] text-txt-muted select-none flex-shrink-0 z-20">
      {/* Left: Profile & Course Info */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5 hover:text-txt transition-colors">
          <User className="w-3 h-3 text-accent" />
          <span>{activeProfile?.name || 'Default User'}</span>
        </span>
        <span className="text-border">|</span>
        <span className="flex items-center gap-1.5 hover:text-txt transition-colors">
          <Keyboard className="w-3 h-3 text-accent" />
          <span>{packInfo.name} ({packInfo.layoutName})</span>
        </span>
      </div>

      {/* Right: Sound Toggle & Version */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleMute}
          className="flex items-center gap-1 hover:text-txt transition-colors cursor-pointer"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3 h-3 text-danger" />
              <span>Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3 h-3 text-accent" />
              <span>Sound On</span>
            </>
          )}
        </button>
        <span className="text-border">|</span>
        <span className="flex items-center gap-1 text-txt-muted">
          <Sparkles className="w-3 h-3 text-accent" />
          <span>v1.0.1</span>
        </span>
      </div>
    </footer>
  );
};
