import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { ArrowRight, Sparkles, Check, Shield } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface OnboardingWizardProps {
  onComplete: () => void;
  isAddUserMode?: boolean;
}

const AVATARS = ['🚀', '🦊', '⚡', '💻', '🎮', '🦄', '🎯', '🐱', '🐼', '🦉', '🔥', '👑'];
const GOALS = [
  { wpm: 35, label: '35 WPM', desc: 'Comfortable casual typing' },
  { wpm: 50, label: '50 WPM', desc: 'Productive office & study fluency' },
  { wpm: 75, label: '75 WPM', desc: 'Fast professional typist' },
  { wpm: 100, label: '100+ WPM', desc: 'Speed demon mastery' },
];

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete, isAddUserMode = false }) => {
  const { createProfile, updatePreferences } = useProfile();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('🚀');
  const [pin, setPin] = useState('');
  const [hasPin, setHasPin] = useState(false);
  const [goalWpm, setGoalWpm] = useState(50);
  const [layout, setLayout] = useState('en-us-qwerty');
  const [error, setError] = useState('');

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name or nickname');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleFinish = async () => {
    try {
      await createProfile(name.trim(), avatar, hasPin && pin.trim().length > 0 ? pin.trim() : undefined);
      updatePreferences({
        wpmGoal: goalWpm,
      });
      onComplete();
    } catch (err: any) {
      setError(err?.message || 'Failed to create profile');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/95 backdrop-blur-md animate-fadeIn text-txt select-none">
      <div className="w-full max-w-lg bg-surface border border-border rounded-card p-8 shadow-2xl space-y-6">
        {/* Brand / Step Indicator */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-accent flex items-center justify-center text-xs font-bold text-on-accent">
              T
            </div>
            <div>
              <h2 className="text-sm font-bold text-txt">Typing Trainer Setup</h2>
              <p className="text-[11px] text-txt-muted">
                {isAddUserMode ? 'Add New User Profile' : 'Welcome to Touch Typing Master Track'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-accent">
            <span>Step {step} of 3</span>
          </div>
        </div>

        {/* Step 1: Name, Avatar & Optional PIN */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-5 animate-fadeIn">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-txt">Create Your Typing Profile</h3>
              <p className="text-xs text-txt-muted">
                Personalized training records, key telemetry, and speed tracking are saved for you.
              </p>
            </div>

            {/* Avatar Picker */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-txt-muted block text-center">Choose an Avatar</label>
              <div className="flex flex-wrap justify-center gap-2">
                {AVATARS.map((emoji) => (
                  <button
                    type="button"
                    key={emoji}
                    onClick={() => setAvatar(emoji)}
                    className={`w-10 h-10 rounded-md text-xl flex items-center justify-center transition-all cursor-pointer ${
                      avatar === emoji
                        ? 'bg-accent/20 border-2 border-accent scale-110 shadow-sm'
                        : 'bg-surface-2 border border-border hover:border-txt-muted/50'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-txt block">Full Name or Handle</label>
              <Input
                type="text"
                autoFocus
                required
                maxLength={30}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="e.g. Alex, Sarah, Student 1"
                className="w-full text-sm"
              />
              {error && <p className="text-xs text-danger font-medium">{error}</p>}
            </div>

            {/* Optional PIN Lock */}
            <div className="p-3 bg-surface-2 rounded-sm border border-border space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-xs font-semibold text-txt">Protect profile with secret PIN</span>
                </div>
                <input
                  type="checkbox"
                  checked={hasPin}
                  onChange={(e) => setHasPin(e.target.checked)}
                  className="w-4 h-4 accent-accent cursor-pointer"
                />
              </label>
              {hasPin && (
                <div className="pt-2 animate-fadeIn">
                  <Input
                    type="password"
                    maxLength={16}
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter 4-16 digit PIN or password"
                    className="text-xs font-mono"
                  />
                  <span className="text-[10px] text-txt-muted mt-1 block">
                    You'll be prompted for this PIN when switching profiles.
                  </span>
                </div>
              )}
            </div>

            <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-2">
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        )}

        {/* Step 2: Target Goals & Keyboard Layout */}
        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-txt">Set Your Typing Goal</h3>
              <p className="text-xs text-txt-muted">Select your target velocity and physical keyboard layout.</p>
            </div>

            {/* Target Speed Cards */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-txt-muted block">Target Typing Speed Goal</label>
              <div className="grid grid-cols-2 gap-2.5">
                {GOALS.map((g) => (
                  <button
                    type="button"
                    key={g.wpm}
                    onClick={() => setGoalWpm(g.wpm)}
                    className={`p-3 rounded-sm border text-left transition-all cursor-pointer ${
                      goalWpm === g.wpm
                        ? 'bg-accent/15 border-2 border-accent text-txt shadow-sm'
                        : 'bg-surface-2 border-border text-txt-muted hover:text-txt hover:border-txt-muted/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-txt">{g.label}</span>
                      {goalWpm === g.wpm && <Check className="w-4 h-4 text-accent" />}
                    </div>
                    <span className="text-[11px] text-txt-muted block mt-0.5">{g.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-txt-muted block">Physical Keyboard Layout</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'en-us-qwerty', name: 'English QWERTY (Standard)' },
                  { id: 'en-dvorak', name: 'Dvorak Simplified' },
                  { id: 'en-colemak', name: 'Colemak' },
                  { id: 'en-colemak-dh', name: 'Colemak-DH' },
                ].map((l) => (
                  <button
                    type="button"
                    key={l.id}
                    onClick={() => setLayout(l.id)}
                    className={`p-2.5 rounded-sm border text-left text-xs font-medium transition-colors cursor-pointer ${
                      layout === l.id
                        ? 'bg-surface border-accent text-accent font-semibold'
                        : 'bg-surface-2 border-border text-txt-muted hover:text-txt'
                    }`}
                  >
                    {l.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button type="button" variant="primary" onClick={() => setStep(3)} className="flex-1">
                Next Step
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Launch & Experience Level */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn text-center">
            <div className="w-14 h-14 rounded-full bg-accent-soft text-accent mx-auto flex items-center justify-center">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-txt">Ready to Begin, {name}!</h3>
              <p className="text-xs text-txt-muted max-w-sm mx-auto">
                Your profile is configured with a {goalWpm} WPM goal on English QWERTY. You can customize audio switches, themes, and goals anytime in Settings.
              </p>
            </div>

            <div className="p-4 rounded-sm bg-surface-2 border border-border text-left space-y-2 text-xs">
              <div className="flex justify-between text-txt-muted">
                <span>Profile:</span>
                <span className="font-semibold text-txt flex items-center gap-1.5">
                  <span>{avatar}</span> {name}
                </span>
              </div>
              <div className="flex justify-between text-txt-muted">
                <span>Target Speed:</span>
                <span className="font-semibold text-txt">{goalWpm} WPM</span>
              </div>
              <div className="flex justify-between text-txt-muted">
                <span>Security PIN:</span>
                <span className="font-semibold text-txt">{hasPin ? 'Protected' : 'None (Open)'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button type="button" variant="primary" onClick={handleFinish} className="flex-1 shadow-sm">
                <span>Start Training</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
