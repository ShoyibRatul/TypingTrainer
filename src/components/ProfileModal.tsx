import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { UserProfile } from '../types';
import { Lock, Unlock, Plus, Trash2, KeyRound, Check, X } from 'lucide-react';

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

  // Form state for creating user
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl p-6 shadow-2xl relative text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {mode === 'list' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl font-bold">User Profiles</h3>
                <p className="text-xs text-slate-400">Switch user or manage accounts</p>
              </div>
              <button
                onClick={() => setMode('create')}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition shadow-md"
              >
                <Plus className="w-4 h-4" /> Add User
              </button>
            </div>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {profiles.map(p => {
                const isActive = p.id === activeProfile?.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProfile(p)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition cursor-pointer ${
                      isActive
                        ? 'bg-indigo-950/40 border-indigo-500/80 ring-1 ring-indigo-500/40'
                        : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl p-1 bg-slate-800 rounded-lg shadow-sm">{p.avatar}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-slate-100">{p.name}</span>
                          {isActive && (
                            <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full font-medium">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                          <span>{p.stats.completedLessons.length} lessons completed</span>
                          <span>•</span>
                          <span>{p.stats.testHistory.length} tests</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {p.pinHash ? (
                        <span title="PIN Protected Profile" className="p-1.5 text-amber-400 bg-amber-400/10 rounded-lg">
                          <Lock className="w-4 h-4" />
                        </span>
                      ) : (
                        <span title="Open Profile" className="p-1.5 text-slate-500">
                          <Unlock className="w-4 h-4" />
                        </span>
                      )}

                      {profiles.length > 1 && !isActive && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm(`Are you sure you want to delete profile "${p.name}"?`)) {
                              deleteProfile(p.id);
                            }
                          }}
                          className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
                          title="Delete profile"
                        >
                          <Trash2 className="w-4 h-4" />
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
              <span className="text-4xl inline-block p-2 bg-slate-800 rounded-2xl mb-2 shadow-md">
                {selectedTarget.avatar}
              </span>
              <h3 className="text-lg font-bold">Unlock {selectedTarget.name}</h3>
              <p className="text-xs text-slate-400">This profile is secured with a PIN or password</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Enter PIN / Password</label>
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  value={inputPin}
                  onChange={(e) => {
                    setInputPin(e.target.value);
                    setPinError('');
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 text-center tracking-widest text-lg focus:border-indigo-500 focus:outline-none"
                  placeholder="••••"
                />
                <KeyRound className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              </div>
              {pinError && <p className="text-xs text-rose-400 mt-1.5 text-center">{pinError}</p>}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMode('list')}
                className="flex-1 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-md"
              >
                Unlock
              </button>
            </div>
          </form>
        )}

        {mode === 'create' && (
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-bold">Create New Profile</h3>
              <p className="text-xs text-slate-400">Add a new user with their own learning history</p>
            </div>

            {/* Avatar picker */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Choose Avatar</label>
              <div className="grid grid-cols-6 gap-2">
                {AVATAR_OPTIONS.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setNewAvatar(emoji)}
                    className={`text-2xl p-2 rounded-xl transition text-center ${
                      newAvatar === emoji
                        ? 'bg-indigo-600/30 border border-indigo-500 scale-105'
                        : 'bg-slate-800 hover:bg-slate-700 border border-transparent'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name</label>
              <input
                type="text"
                required
                maxLength={24}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 text-sm focus:border-indigo-500 focus:outline-none"
                placeholder="e.g. Alice, Bob, Junior..."
              />
            </div>

            {/* Optional PIN Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">Lock PIN (Optional)</label>
                <span className="text-[10px] text-slate-500">Leave blank if no PIN desired</span>
              </div>
              <input
                type="password"
                maxLength={16}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-slate-100 text-sm focus:border-indigo-500 focus:outline-none"
                placeholder="Optional PIN / Password"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMode('list')}
                className="flex-1 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Create Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
