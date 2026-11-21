import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Lock, KeyRound, ArrowRight } from 'lucide-react';

export const LockScreen: React.FC = () => {
  const { activeProfile, isLocked, unlockActiveProfile } = useProfile();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isLocked || !activeProfile) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await unlockActiveProfile(pin);
    if (!success) {
      setError(true);
      setPin('');
    } else {
      setError(false);
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-lg animate-fadeIn text-slate-100">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl space-y-6">
        <div className="relative inline-block">
          <span className="text-6xl inline-block p-4 bg-slate-800/80 rounded-3xl shadow-inner">
            {activeProfile.avatar}
          </span>
          <span className="absolute -bottom-2 -right-2 p-2 bg-indigo-600 rounded-xl text-white shadow-lg">
            <Lock className="w-4 h-4" />
          </span>
        </div>

        <div>
          <h2 className="text-2xl font-bold">{activeProfile.name}</h2>
          <p className="text-xs text-slate-400 mt-1">This workspace is locked with a PIN</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Enter PIN"
              className={`w-full bg-slate-950 border rounded-2xl px-4 py-3 text-center tracking-widest text-lg font-mono text-slate-100 focus:outline-none transition ${
                error ? 'border-rose-500 animate-shake ring-2 ring-rose-500/30' : 'border-slate-700 focus:border-indigo-500'
              }`}
            />
            <KeyRound className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
          </div>

          {error && (
            <p className="text-xs text-rose-400 font-medium">Incorrect PIN. Please try again.</p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl transition shadow-lg flex items-center justify-center gap-2"
          >
            <span>Unlock Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
