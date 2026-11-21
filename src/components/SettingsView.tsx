import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { hashPin } from '../utils/crypto';
import { Settings, Volume2, Shield, Eye, Download, Check, Lock, Info, Palette, Play } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { THEMES, ThemeMode, applyTheme, getSavedTheme } from '../utils/theme';
import { soundEngine, SOUND_SETS, SoundSetId } from '../utils/audio';

export const SettingsView: React.FC = () => {
  const { activeProfile, updatePreferences } = useProfile();

  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => getSavedTheme());
  const [activeSoundSet, setActiveSoundSet] = useState<SoundSetId>(() => soundEngine.getSoundSet());
  const [newPin, setNewPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);

  if (!activeProfile) return null;

  const prefs = activeProfile.preferences;

  const handleSelectTheme = (mode: ThemeMode) => {
    setCurrentTheme(mode);
    applyTheme(mode);
  };

  const handleSelectSoundSet = (setId: SoundSetId) => {
    setActiveSoundSet(setId);
    soundEngine.setSoundSet(setId);
    soundEngine.playKeystroke(undefined, 0.5, 'a');
  };

  const handlePreviewSound = () => {
    soundEngine.playKeystroke(undefined, 0.5, 'a');
    setTimeout(() => soundEngine.playKeystroke(undefined, 0.5, 'b'), 120);
    setTimeout(() => soundEngine.playKeystroke(undefined, 0.5, 'c'), 240);
    setTimeout(() => soundEngine.playKeystroke(undefined, 0.5, ' '), 360);
  };

  const handleSavePin = async (e: React.FormEvent) => {
    e.preventDefault();
    const pinHash = newPin.trim().length > 0 ? await hashPin(newPin.trim()) : undefined;
    activeProfile.pinHash = pinHash;
    setPinSaved(true);
    setNewPin('');
    setTimeout(() => setPinSaved(false), 2000);
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(activeProfile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `typing-trainer-${activeProfile.name.toLowerCase()}-backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-8 overflow-y-auto pr-1">
      {/* Top Header */}
      <div className="bg-surface border border-border rounded-md p-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-txt flex items-center gap-2">
            <Settings className="w-5 h-5 text-accent" /> Preferences & System
          </h2>
          <p className="text-xs text-txt-muted mt-0.5">
            Personalize themes, switch acoustics, and data security for {activeProfile.name}
          </p>
        </div>
      </div>

      {/* Theme Gallery Section (Discord/Notion style live cards) */}
      <div className="bg-surface border border-border rounded-md p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-accent" />
            <h3 className="font-bold text-sm text-txt">Appearance & Theme Gallery</h3>
          </div>
          <span className="text-[11px] text-txt-muted font-mono">Instant Apply</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {THEMES.map((theme) => {
            const isSelected = currentTheme === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => handleSelectTheme(theme.id)}
                className={`p-3 rounded-md border text-left transition-all cursor-pointer flex flex-col justify-between h-24 ${
                  isSelected
                    ? 'border-2 border-accent shadow-float'
                    : 'border-border hover:border-txt-muted/50'
                }`}
                style={{ backgroundColor: theme.bg }}
              >
                <div className="flex justify-between items-center w-full">
                  <span
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.accent }}
                  />
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-accent text-on-accent text-[9px] font-bold flex items-center justify-center">
                      ✓
                    </span>
                  )}
                </div>

                <div>
                  <span
                    className="font-bold text-xs block leading-tight"
                    style={{ color: theme.text }}
                  >
                    {theme.name}
                  </span>
                  <span className="text-[10px] opacity-70 block capitalize" style={{ color: theme.text }}>
                    {theme.type}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Audio Engine & Acoustic Switch Sound Sets */}
      <div className="bg-surface border border-border rounded-md p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-accent" />
            <h3 className="font-bold text-sm text-txt">Mechanical Switch Sound Engine</h3>
          </div>
          <button
            onClick={handlePreviewSound}
            className="px-2.5 py-1 rounded-sm bg-surface-2 hover:bg-surface-2/80 text-xs font-medium text-txt border border-border flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Play className="w-3 h-3 text-accent fill-current" />
            <span>Test Sound</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {Object.values(SOUND_SETS).map((setDef) => {
            const isSelected = activeSoundSet === setDef.id;
            return (
              <button
                key={setDef.id}
                onClick={() => handleSelectSoundSet(setDef.id)}
                className={`p-3 rounded-sm border text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-accent-soft border-accent text-accent font-semibold'
                    : 'bg-surface-2 border-border text-txt-muted hover:border-txt-muted/50 hover:text-txt'
                }`}
              >
                <span className="font-bold text-xs block text-txt">{setDef.name}</span>
                <span className="text-[10px] text-txt-muted mt-0.5 block">
                  {setDef.id === 'silent' ? 'Mute all sounds' : `${setDef.bodyFreq}Hz resonance`}
                </span>
              </button>
            );
          })}
        </div>

        <div className="pt-2">
          <div className="flex justify-between items-center text-xs font-medium text-txt mb-1.5">
            <span>Volume Level</span>
            <span className="font-mono text-accent">{Math.round(prefs.soundVolume * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={prefs.soundVolume}
            onChange={(e) => updatePreferences({ soundVolume: parseFloat(e.target.value) })}
            className="w-full accent-accent cursor-pointer"
          />
        </div>
      </div>

      {/* Visual Toggles & Density (38-40px Discord Rows) */}
      <div className="bg-surface border border-border rounded-md p-5 space-y-3">
        <div className="flex items-center gap-2 pb-1">
          <Eye className="w-4 h-4 text-accent" />
          <h3 className="font-bold text-sm text-txt">Visual Aids & Layout Density</h3>
        </div>

        <div className="space-y-2">
          <label className="flex items-center justify-between px-4 h-10 bg-surface-2 rounded-sm border border-border cursor-pointer hover:border-txt-muted/40 transition-colors">
            <span className="font-semibold text-xs text-txt">Virtual Vector Keyboard</span>
            <input
              type="checkbox"
              checked={prefs.showKeyboard}
              onChange={(e) => updatePreferences({ showKeyboard: e.target.checked })}
              className="w-4 h-4 accent-accent cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between px-4 h-10 bg-surface-2 rounded-sm border border-border cursor-pointer hover:border-txt-muted/40 transition-colors">
            <span className="font-semibold text-xs text-txt">Ergonomic Hand Guide Display</span>
            <input
              type="checkbox"
              checked={prefs.showHands}
              onChange={(e) => updatePreferences({ showHands: e.target.checked })}
              className="w-4 h-4 accent-accent cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Profile PIN Security */}
      <div className="bg-surface border border-border rounded-md p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-warning" />
          <h3 className="font-bold text-sm text-txt">Profile PIN Lock</h3>
        </div>
        <p className="text-xs text-txt-muted">
          Protect your training profile on shared systems with a secret PIN.
        </p>

        <form onSubmit={handleSavePin} className="flex gap-2 pt-1">
          <Input
            type="password"
            maxLength={16}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder={activeProfile.pinHash ? 'Change PIN (blank to remove)' : 'Set new PIN / password'}
            className="flex-1"
          />
          <Button type="submit" variant="primary">
            {pinSaved ? <Check className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{pinSaved ? 'Saved' : 'Save PIN'}</span>
          </Button>
        </form>
      </div>

      {/* Backup and Data Export */}
      <div className="bg-surface border border-border rounded-md p-4 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-xs text-txt">Export Training Records</h3>
          <p className="text-[11px] text-txt-muted">Download your stats, lessons and test history as JSON</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExportData}>
          <Download className="w-3.5 h-3.5" /> Export JSON
        </Button>
      </div>

      {/* About & License */}
      <div className="bg-surface border border-border rounded-md p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-accent" />
          <h3 className="font-bold text-sm text-txt">About Typing Trainer</h3>
        </div>
        <div className="space-y-1.5 text-xs text-txt-muted">
          <p>
            <span className="font-semibold text-txt">Typing Trainer</span> &bull; Version 1.0.2
          </p>
          <p>
            Copyright &copy; 2026 Shoyib Ratul (
            <a
              href="https://github.com/ShoyibRatul/TypingTrainer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline"
            >
              github.com/ShoyibRatul/TypingTrainer
            </a>
            )
          </p>
          <p>
            Licensed under the <span className="text-txt font-medium">PolyForm Noncommercial License 1.0.0</span>.
            Free for personal study, education, and non-commercial use.
          </p>
          <p>
            Commercial licensing inquiries:{' '}
            <a href="mailto:hello@shoyibratul.com" className="text-accent underline">
              hello@shoyibratul.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
