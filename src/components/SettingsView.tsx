import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { hashPin } from '../utils/crypto';
import { Settings, Volume2, Shield, Eye, Download, Check, Lock } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { activeProfile, updatePreferences } = useProfile();

  const [newPin, setNewPin] = useState('');
  const [pinSaved, setPinSaved] = useState(false);

  if (!activeProfile) return null;

  const prefs = activeProfile.preferences;

  const handleSavePin = async (e: React.FormEvent) => {
    e.preventDefault();
    const pinHash = newPin.trim().length > 0 ? await hashPin(newPin.trim()) : undefined;
    // update profile with pinHash
    activeProfile.pinHash = pinHash;
    setPinSaved(true);
    setNewPin('');
    setTimeout(() => setPinSaved(false), 2500);
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
    <div className="w-full max-w-3xl mx-auto py-6 px-4 space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-2">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-400" /> Workspace Settings
        </h2>
        <p className="text-xs text-slate-400">
          Personalize audio feedback, display elements, and security for {activeProfile.name}
        </p>
      </div>

      {/* Audio Preferences */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-cyan-400" />
          <h3 className="font-bold text-slate-100">Tactile Audio Feedback</h3>
        </div>

        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Switch Sound Profile</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'cherry-blue', label: 'Cherry MX Blue', desc: 'Crisp & Clicky' },
                { id: 'cherry-brown', label: 'Cherry MX Brown', desc: 'Gentle Clack' },
                { id: 'thock', label: 'Topre Thock', desc: 'Deep Resonance' },
                { id: 'typewriter', label: 'Typewriter', desc: 'Snappy Metal' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => updatePreferences({ soundProfile: opt.id as any })}
                  className={`p-3 rounded-2xl border text-left transition ${
                    prefs.soundProfile === opt.id
                      ? 'bg-indigo-600/20 border-indigo-500 text-indigo-200'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-xs block text-slate-100">{opt.label}</span>
                  <span className="text-[10px] text-slate-400">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300 mb-1">
              <span>Keystroke Volume</span>
              <span className="font-mono text-indigo-400">{Math.round(prefs.soundVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={prefs.soundVolume}
              onChange={(e) => updatePreferences({ soundVolume: parseFloat(e.target.value) })}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Visual Toggles */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-indigo-400" />
          <h3 className="font-bold text-slate-100">Visual Aids</h3>
        </div>

        <div className="space-y-3 pt-1">
          <label className="flex items-center justify-between p-3 bg-slate-950 rounded-2xl border border-slate-800 cursor-pointer">
            <div>
              <span className="font-semibold text-xs text-slate-200 block">Show Virtual Vector Keyboard</span>
              <span className="text-[11px] text-slate-400">Highlights target keys and finger mappings during lessons</span>
            </div>
            <input
              type="checkbox"
              checked={prefs.showKeyboard}
              onChange={(e) => updatePreferences({ showKeyboard: e.target.checked })}
              className="w-4 h-4 accent-indigo-600 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 bg-slate-950 rounded-2xl border border-slate-800 cursor-pointer">
            <div>
              <span className="font-semibold text-xs text-slate-200 block">Show Ergonomic Hand Guide</span>
              <span className="text-[11px] text-slate-400">Shows which finger should be moved in real-time</span>
            </div>
            <input
              type="checkbox"
              checked={prefs.showHands}
              onChange={(e) => updatePreferences({ showHands: e.target.checked })}
              className="w-4 h-4 accent-indigo-600 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Profile PIN Security */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-slate-100">Profile Security (PIN Lock)</h3>
        </div>
        <p className="text-xs text-slate-400">
          Prevent other users from viewing or altering your learning progress on shared computers.
        </p>

        <form onSubmit={handleSavePin} className="flex gap-2">
          <input
            type="password"
            maxLength={16}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder={activeProfile.pinHash ? "Change PIN (leave blank to remove)" : "Set new PIN / password"}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-2xl px-4 py-2.5 text-xs text-slate-100 focus:border-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-2xl transition shadow-md flex items-center gap-1.5"
          >
            {pinSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Lock className="w-4 h-4" />}
            <span>{pinSaved ? 'Updated!' : 'Save PIN'}</span>
          </button>
        </form>
      </div>

      {/* Backup and Data Export */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <h3 className="font-bold text-xs text-slate-200">Export Learning Records</h3>
          <p className="text-[11px] text-slate-400">Download your stats, test certificates, and latency logs</p>
        </div>
        <button
          onClick={handleExportData}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-2xl transition border border-slate-700"
        >
          <Download className="w-4 h-4" /> Export JSON
        </button>
      </div>
    </div>
  );
};
