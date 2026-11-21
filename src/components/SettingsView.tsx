import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { hashPin } from '../utils/crypto';
import { Settings, Volume2, Shield, Eye, Download, Check, Lock } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

export const SettingsView: React.FC = () => {
  const { activeProfile, updatePreferences } = useProfile();

  const [newPin, setNewPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);

  if (!activeProfile) return null;

  const prefs = activeProfile.preferences;

  const handleSavePin = async (e: React.FormEvent) => {
    e.preventDefault();
    const pinHash = newPin.trim().length > 0 ? await hashPin(newPin.trim()) : undefined;
    activeProfile.pinHash = pinHash;
    setPinSaved(true);
    setNewPin('');
    setTimeout(() => setPinSaved(false), 2000);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeProfile, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `typing-trainer-${activeProfile.name.toLowerCase()}-backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">
      <div className="bg-surface border border-border rounded-card p-5 shadow-sm space-y-1">
        <h2 className="text-lg font-bold text-txt flex items-center gap-2">
          <Settings className="w-4 h-4 text-accent" /> Settings
        </h2>
        <p className="text-xs text-txt-muted">
          Audio, visual feedback, and security for {activeProfile.name}
        </p>
      </div>

      {/* Audio Preferences */}
      <div className="bg-surface border border-border rounded-card p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-accent" />
          <h3 className="font-bold text-sm text-txt">Mechanical Switch Sound</h3>
        </div>

        <div className="space-y-4 pt-1">
          <div>
            <label className="block text-xs font-medium text-txt mb-2">Switch Profile</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'cherry-blue', label: 'Cherry MX Blue', desc: 'Crisp Clicky' },
                { id: 'cherry-brown', label: 'Cherry MX Brown', desc: 'Tactile Clack' },
                { id: 'thock', label: 'Topre Thock', desc: 'Deep Resonance' },
                { id: 'typewriter', label: 'Typewriter', desc: 'Snappy Metal' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => updatePreferences({ soundProfile: opt.id as any })}
                  className={`p-2.5 rounded-btn border text-left transition-colors ${
                    prefs.soundProfile === opt.id
                      ? 'bg-accent-soft border-accent text-accent'
                      : 'bg-surface-2 border-border text-txt-muted hover:border-txt-muted'
                  }`}
                >
                  <span className="font-bold text-xs block text-txt">{opt.label}</span>
                  <span className="text-[10px] text-txt-muted">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-medium text-txt mb-1">
              <span>Keystroke Volume</span>
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
      </div>

      {/* Visual Toggles */}
      <div className="bg-surface border border-border rounded-card p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-accent" />
          <h3 className="font-bold text-sm text-txt">Visual Aids</h3>
        </div>

        <div className="space-y-2 pt-1">
          <label className="flex items-center justify-between p-3 bg-surface-2 rounded-btn border border-border cursor-pointer">
            <div>
              <span className="font-semibold text-xs text-txt block">Virtual Vector Keyboard</span>
              <span className="text-[11px] text-txt-muted">Highlights target keys and finger mappings during lessons</span>
            </div>
            <input
              type="checkbox"
              checked={prefs.showKeyboard}
              onChange={(e) => updatePreferences({ showKeyboard: e.target.checked })}
              className="w-4 h-4 accent-accent cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-surface-2 rounded-btn border border-border cursor-pointer">
            <div>
              <span className="font-semibold text-xs text-txt block">Ergonomic Hand Guide</span>
              <span className="text-[11px] text-txt-muted">Shows active finger movements in real-time</span>
            </div>
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
      <div className="bg-surface border border-border rounded-card p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-warning" />
          <h3 className="font-bold text-sm text-txt">Profile PIN Lock</h3>
        </div>
        <p className="text-xs text-txt-muted">
          Protect your training history on shared computers with a secret PIN.
        </p>

        <form onSubmit={handleSavePin} className="flex gap-2">
          <Input
            type="password"
            maxLength={16}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder={activeProfile.pinHash ? "Change PIN (blank to remove)" : "Set new PIN / password"}
            className="flex-1"
          />
          <Button type="submit" variant="primary">
            {pinSaved ? <Check className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{pinSaved ? 'Saved' : 'Save PIN'}</span>
          </Button>
        </form>
      </div>

      {/* Backup and Data Export */}
      <div className="bg-surface border border-border rounded-card p-4 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="font-bold text-xs text-txt">Export Learning Records</h3>
          <p className="text-[11px] text-txt-muted">Download your stats and test history as JSON</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleExportData}>
          <Download className="w-3.5 h-3.5" /> Export JSON
        </Button>
      </div>
    </div>
  );
};
