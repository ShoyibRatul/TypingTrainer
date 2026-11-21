import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { UserProfile } from '../types';
import { Plus, Play, Lock, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface UserSelectScreenProps {
  onSelectUser: () => void;
  onAddNewUser: () => void;
}

export const UserSelectScreen: React.FC<UserSelectScreenProps> = ({ onSelectUser, onAddNewUser }) => {
  const { profiles, switchProfile, deleteProfile } = useProfile();

  const [selectedProfileId, setSelectedProfileId] = useState<string>(() => {
    try {
      const last = localStorage.getItem('typing_trainer_active_id');
      return last || (profiles[0]?.id ?? '');
    } catch {
      return profiles[0]?.id ?? '';
    }
  });

  const [isPinPromptOpen, setIsPinPromptOpen] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [targetForPin, setTargetForPin] = useState<UserProfile | null>(null);

  const selectedProfile = profiles.find((p) => p.id === selectedProfileId) || profiles[0];

  const handleChooseProfile = async (profile: UserProfile) => {
    setSelectedProfileId(profile.id);
    if (profile.pinHash) {
      setTargetForPin(profile);
      setPinInput('');
      setPinError('');
      setIsPinPromptOpen(true);
    } else {
      await switchProfile(profile.id);
      onSelectUser();
    }
  };

  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetForPin) return;

    const res = await switchProfile(targetForPin.id, pinInput);
    if (res.success) {
      setIsPinPromptOpen(false);
      onSelectUser();
    } else {
      setPinError(res.error || 'Incorrect PIN. Try again.');
      setPinInput('');
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string, name: string) => {
    e.stopPropagation();
    if (profiles.length <= 1) {
      alert('Cannot delete the only existing profile.');
      return;
    }
    if (confirm(`Are you sure you want to delete profile "${name}"? All progress and history will be removed.`)) {
      deleteProfile(id);
      if (selectedProfileId === id) {
        const remaining = profiles.filter((p) => p.id !== id);
        if (remaining.length > 0) {
          setSelectedProfileId(remaining[0].id);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/95 backdrop-blur-md animate-fadeIn text-txt select-none">
      <div className="w-full max-w-xl bg-surface border border-border rounded-card p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-sm font-bold text-on-accent">
              T
            </div>
            <div>
              <h2 className="text-base font-bold text-txt">Who is typing today?</h2>
              <p className="text-xs text-txt-muted">Select your user profile to load personal stats and progress</p>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={onAddNewUser} className="flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" />
            <span>New User</span>
          </Button>
        </div>

        {/* Profile Grid Cards (Typing Master Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
          {profiles.map((p) => {
            const isSelected = p.id === selectedProfileId;
            const completedCount = p.stats?.completedLessons?.length || 0;

            return (
              <div
                key={p.id}
                onClick={() => handleChooseProfile(p)}
                className={`p-4 rounded-md border text-left transition-all cursor-pointer flex items-center justify-between group ${
                  isSelected
                    ? 'bg-surface-2 border-2 border-accent shadow-float'
                    : 'bg-surface border-border hover:border-txt-muted/50 hover:bg-surface-2/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-3xl flex-shrink-0">{p.avatar || '🚀'}</span>
                  <div className="truncate">
                    <h3 className="font-bold text-sm text-txt truncate flex items-center gap-1.5">
                      <span>{p.name}</span>
                      {p.pinHash && <span title="PIN protected"><Lock className="w-3 h-3 text-warning flex-shrink-0" /></span>}
                    </h3>
                    <span className="text-[11px] text-txt-muted block mt-0.5 truncate">
                      {completedCount} lessons completed &bull; Goal: {p.preferences?.wpmGoal || 50} WPM
                    </span>
                  </div>
                </div>

                {profiles.length > 1 && (
                  <button
                    onClick={(e) => handleDelete(e, p.id, p.name)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded text-txt-muted hover:text-danger hover:bg-danger-soft transition-all ml-2"
                    title="Delete profile"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Launch CTA */}
        <div className="pt-2 flex items-center justify-between border-t border-border">
          <span className="text-xs text-txt-muted">
            Press <strong className="text-txt font-mono">Enter</strong> or click to continue as{' '}
            <strong className="text-accent">{selectedProfile?.name}</strong>
          </span>

          <Button
            variant="primary"
            onClick={() => selectedProfile && handleChooseProfile(selectedProfile)}
            className="flex items-center gap-2"
          >
            <span>Start Practice</span>
            <Play className="w-3.5 h-3.5 fill-current" />
          </Button>
        </div>
      </div>

      {/* PIN Verification Modal */}
      {isPinPromptOpen && targetForPin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-xs bg-surface border border-border rounded-card p-6 text-center space-y-4 shadow-2xl">
            <div className="text-4xl">{targetForPin.avatar}</div>
            <div>
              <h3 className="text-base font-bold text-txt">{targetForPin.name}</h3>
              <p className="text-xs text-txt-muted mt-0.5">Enter PIN to access profile</p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <Input
                type="password"
                autoFocus
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError('');
                }}
                placeholder="Enter PIN"
                className="text-center font-mono tracking-widest text-sm"
              />
              {pinError && <p className="text-xs text-danger font-medium">{pinError}</p>}

              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsPinPromptOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Unlock
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
