import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { Lock, KeyRound, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/95 backdrop-blur-md animate-fadeIn text-txt">
      <div className="w-full max-w-xs bg-surface border border-border rounded-card p-6 text-center shadow-lg space-y-5">
        <div className="relative inline-block">
          <span className="text-5xl inline-block p-3 bg-surface-2 rounded-card border border-border shadow-inner">
            {activeProfile.avatar}
          </span>
          <span className="absolute -bottom-1 -right-1 p-1.5 bg-accent rounded-full text-white shadow-sm">
            <Lock className="w-3.5 h-3.5" />
          </span>
        </div>

        <div>
          <h2 className="text-lg font-bold">{activeProfile.name}</h2>
          <p className="text-xs text-txt-muted mt-0.5">Workspace is locked</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Input
              type="password"
              autoFocus
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="Enter PIN"
              className={`text-center tracking-widest text-base font-mono ${
                error ? 'border-danger ring-1 ring-danger' : ''
              }`}
            />
            <KeyRound className="absolute left-3 top-3 w-4 h-4 text-txt-muted" />
          </div>

          {error && (
            <p className="text-xs text-danger font-medium">Incorrect PIN. Try again.</p>
          )}

          <Button type="submit" variant="primary" className="w-full">
            <span>Unlock Workspace</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </form>
      </div>
    </div>
  );
};
