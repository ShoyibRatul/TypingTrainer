import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { UserProfile } from '../types';
import { Lock, Unlock, Plus, Trash2, KeyRound, Check, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVATAR_OPTIONS = ['🚀', '🦊', '⚡', '💻', '🎮', '🦄', '🎯', '🐱', '🐼', '🦉', '🔥', '👑'];

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { profiles, activeProfile, createProfile, switchProfile, deleteProfile } = useProfile();

  const [mode, setMode] = useState<'list' | 'create' | 'pin-prompt'>('list');
  const [selectedTarget, setSelectedTarget] = useState<UserProfile | null>(null);
  const [inputPin, setInputPin] = useState('');
  const [pinError, setPinError] = useState('');

  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('🚀');
  const [newPin, setNewPin] = useState('');

  if (!isOpen) return null;

  const handleSelectProfile = async (profile: UserProfile) => {
    if (profile.id === activeProfile?.id) {
      onClose();
      return;
    }

    if (profile.pinHash) {
      setSelectedTarget(profile);
      setInputPin('');
      setPinError('');
      setMode('pin-prompt');
    } else {
      await switchProfile(profile.id);
      onClose();
    }
  };

  const handleVerifyPinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTarget) return;

    const res = await switchProfile(selectedTarget.id, inputPin);
    if (res.success) {
      onClose();
      setMode('list');
    } else {
      setPinError(res.error || 'Incorrect PIN code');
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    await createProfile(newName, newAvatar, newPin);
    setNewName('');
    setNewPin('');
    setMode('list');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface border border-border w-full max-w-sm rounded-card p-6 shadow-lg relative text-txt">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-txt-muted hover:text-txt rounded-btn hover:bg-surface-2 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {mode === 'list' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">User Profiles</h3>
                <p className="text-xs text-txt-muted">Switch or add profiles</p>
              </div>
              <Button size="sm" variant="primary" onClick={() => setMode('create')}>
                <Plus className="w-3.5 h-3.5" /> Add
              </Button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {profiles.map(p => {
                const isActive = p.id === activeProfile?.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProfile(p)}
                    className={`flex items-center justify-between p-3 rounded-btn border transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-accent-soft border-accent ring-1 ring-accent'
                        : 'bg-surface-2 border-border hover:border-txt-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-1 bg-surface rounded-md shadow-sm border border-border">{p.avatar}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-xs text-txt">{p.name}</span>
                          {isActive && (
                            <span className="text-[9px] bg-accent text-white px-1.5 py-0.2 rounded-full font-semibold">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-txt-muted mt-0.5">
                          <span>{p.stats.completedLessons.length} lessons</span>
                          <span>•</span>
                          <span>{p.stats.testHistory.length} tests</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {p.pinHash ? (
                        <span title="PIN Protected Profile" className="p-1 text-warning">
                          <Lock className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span title="Open Profile" className="p-1 text-txt-muted">
                          <Unlock className="w-3.5 h-3.5" />
                        </span>
                      )}

                      {profiles.length > 1 && !isActive && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Delete profile "${p.name}"?`)) {
                              deleteProfile(p.id);
                            }
                          }}
                          className="p-1 text-txt-muted hover:text-danger rounded transition-colors"
                          title="Delete profile"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {mode === 'pin-prompt' && selectedTarget && (
          <form onSubmit={handleVerifyPinSubmit} className="space-y-4">
            <div className="text-center">
              <span className="text-4xl inline-block p-2 bg-surface-2 rounded-card mb-2 border border-border">
                {selectedTarget.avatar}
              </span>
              <h3 className="text-base font-bold text-txt">Unlock {selectedTarget.name}</h3>
              <p className="text-xs text-txt-muted">This profile is protected with a PIN</p>
            </div>

            <div>
              <div className="relative">
                <Input
                  type="password"
                  autoFocus
                  value={inputPin}
                  onChange={(e) => {
                    setInputPin(e.target.value);
                    setPinError('');
                  }}
                  className="text-center tracking-widest text-base py-2.5"
                  placeholder="••••"
                />
                <KeyRound className="absolute left-3 top-3 w-4 h-4 text-txt-muted" />
              </div>
              {pinError && <p className="text-xs text-danger mt-1 text-center font-medium">{pinError}</p>}
            </div>

            <div className="flex gap-2 pt-1">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setMode('list')}>
                Back
              </Button>
              <Button type="submit" variant="primary" className="flex-1">
                Unlock
              </Button>
            </div>
          </form>
        )}

        {mode === 'create' && (
          <form onSubmit={handleCreateSubmit} className="space-y-3.5">
            <div>
              <h3 className="text-base font-bold text-txt">Create New Profile</h3>
              <p className="text-xs text-txt-muted">Add a new user with their own learning records</p>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-txt mb-1.5">Choose Avatar</label>
              <div className="grid grid-cols-6 gap-1.5">
                {AVATAR_OPTIONS.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setNewAvatar(emoji)}
                    className={`text-xl p-1.5 rounded-btn transition-colors text-center border ${
                      newAvatar === emoji
                        ? 'bg-accent-soft border-accent scale-105'
                        : 'bg-surface-2 border-border hover:border-txt-muted'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-txt mb-1">Display Name</label>
              <Input
                type="text"
                required
                maxLength={24}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Alice, Bob, David..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-semibold text-txt">Lock PIN (Optional)</label>
                <span className="text-[10px] text-txt-muted">Leave blank for open profile</span>
              </div>
              <Input
                type="password"
                maxLength={16}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Optional PIN"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <Button type="button" variant="outline" className="flex-1" onClick={() => setMode('list')}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="flex-1">
                <Check className="w-3.5 h-3.5" /> Create
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
