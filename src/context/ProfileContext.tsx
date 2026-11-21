import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserStats, TypingResult } from '../types';
import { hashPin, verifyPin } from '../utils/crypto';
import { profileRepository } from '../data/repositories/profileRepository';

interface ProfileContextType {
  profiles: UserProfile[];
  activeProfile: UserProfile | null;
  isLocked: boolean;
  createProfile: (name: string, avatar: string, pin?: string) => Promise<UserProfile>;
  switchProfile: (profileId: string, pin?: string) => Promise<{ success: boolean; error?: string }>;
  unlockActiveProfile: (pin: string) => Promise<boolean>;
  lockProfile: () => void;
  deleteProfile: (profileId: string) => void;
  updatePreferences: (prefs: Partial<UserProfile['preferences']>) => void;
  recordLessonCompletion: (lessonId: string, result: TypingResult) => void;
  recordTestResult: (title: string, durationSeconds: number, result: TypingResult) => void;
  recordKeyTelemetry: (keyErrors: Record<string, number>, keyLatencies: Record<string, number>) => void;
  recordArcadeScore: (score: number) => void;
}

const ACTIVE_ID_KEY = 'typing_trainer_active_id';

const createDefaultStats = (): UserStats => ({
  totalKeystrokes: 0,
  totalTimeSeconds: 0,
  completedLessons: [],
  lessonScores: {},
  testHistory: [],
  keyErrors: {},
  keyLatencies: {},
});

const DEFAULT_PROFILE: UserProfile = {
  id: 'user-default-1',
  name: 'Learner One',
  avatar: '🚀',
  createdAt: Date.now(),
  lastActiveAt: Date.now(),
  preferences: {
    theme: 'dark',
    soundProfile: 'cherry-blue',
    soundVolume: 0.6,
    wpmGoal: 50,
    showHands: true,
    showKeyboard: true,
  },
  stats: createDefaultStats(),
};

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string>('');
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Initialize from repository
  useEffect(() => {
    profileRepository.getAll().then((list) => {
      let activeList = list;
      if (activeList.length === 0) {
        activeList = [DEFAULT_PROFILE];
        profileRepository.save(DEFAULT_PROFILE);
      }
      setProfiles(activeList);

      const savedId = localStorage.getItem(ACTIVE_ID_KEY) || activeList[0]?.id;
      setActiveProfileId(savedId);
      setIsLoaded(true);
    });
  }, []);

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0] || null;

  const createProfile = async (name: string, avatar: string, pin?: string): Promise<UserProfile> => {
    const pinHash = pin && pin.trim().length > 0 ? await hashPin(pin.trim()) : undefined;
    const newProfile: UserProfile = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim() || 'New Typist',
      avatar: avatar || '⚡',
      pinHash,
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
      preferences: {
        theme: 'dark',
        soundProfile: 'cherry-blue',
        soundVolume: 0.6,
        wpmGoal: 50,
        showHands: true,
        showKeyboard: true,
      },
      stats: createDefaultStats(),
    };

    await profileRepository.save(newProfile);
    setProfiles((prev) => [...prev, newProfile]);
    setActiveProfileId(newProfile.id);
    localStorage.setItem(ACTIVE_ID_KEY, newProfile.id);
    setIsLocked(false);
    return newProfile;
  };

  const switchProfile = async (profileId: string, pin?: string): Promise<{ success: boolean; error?: string }> => {
    const target = profiles.find((p) => p.id === profileId);
    if (!target) return { success: false, error: 'User profile not found.' };

    if (target.pinHash) {
      if (!pin) {
        return { success: false, error: 'PIN_REQUIRED' };
      }
      const verifyRes = await verifyPin(pin, target.pinHash);
      if (!verifyRes.valid) {
        return { success: false, error: 'Invalid PIN. Please try again.' };
      }
      // Migrate legacy hash if needed
      if (verifyRes.shouldMigrate && verifyRes.newHash) {
        target.pinHash = verifyRes.newHash;
        await profileRepository.save(target);
      }
    }

    setActiveProfileId(profileId);
    localStorage.setItem(ACTIVE_ID_KEY, profileId);
    setIsLocked(false);
    return { success: true };
  };

  const unlockActiveProfile = async (pin: string): Promise<boolean> => {
    if (!activeProfile || !activeProfile.pinHash) {
      setIsLocked(false);
      return true;
    }
    const verifyRes = await verifyPin(pin, activeProfile.pinHash);
    if (verifyRes.valid) {
      if (verifyRes.shouldMigrate && verifyRes.newHash) {
        activeProfile.pinHash = verifyRes.newHash;
        await profileRepository.save(activeProfile);
      }
      setIsLocked(false);
      return true;
    }
    return false;
  };

  const lockProfile = () => {
    if (activeProfile?.pinHash) {
      setIsLocked(true);
    }
  };

  const deleteProfile = async (profileId: string) => {
    if (profiles.length <= 1) return;
    await profileRepository.delete(profileId);
    const remaining = profiles.filter((p) => p.id !== profileId);
    setProfiles(remaining);
    if (activeProfileId === profileId) {
      setActiveProfileId(remaining[0].id);
      localStorage.setItem(ACTIVE_ID_KEY, remaining[0].id);
      setIsLocked(false);
    }
  };

  const updatePreferences = async (prefs: Partial<UserProfile['preferences']>) => {
    if (!activeProfile) return;
    const updated = {
      ...activeProfile,
      lastActiveAt: Date.now(),
      preferences: { ...activeProfile.preferences, ...prefs },
    };
    await profileRepository.save(updated);
    setProfiles((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const recordLessonCompletion = async (lessonId: string, result: TypingResult) => {
    if (!activeProfile) return;
    await profileRepository.recordLesson(activeProfile.id, lessonId, result);
    const updated = await profileRepository.getById(activeProfile.id);
    if (updated) {
      setProfiles((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    }
  };

  const recordTestResult = async (title: string, durationSeconds: number, result: TypingResult) => {
    if (!activeProfile) return;
    await profileRepository.recordTest(activeProfile.id, title, durationSeconds, result);
    const updated = await profileRepository.getById(activeProfile.id);
    if (updated) {
      setProfiles((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    }
  };

  const recordKeyTelemetry = async (errors: Record<string, number>, latencies: Record<string, number>) => {
    if (!activeProfile) return;
    await profileRepository.recordTelemetry(activeProfile.id, errors, latencies);
    const updated = await profileRepository.getById(activeProfile.id);
    if (updated) {
      setProfiles((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    }
  };

  const recordArcadeScore = async (score: number) => {
    if (!activeProfile) return;
    if (score <= (activeProfile.stats.arcadeHighScore || 0)) return;
    const updated: UserProfile = {
      ...activeProfile,
      lastActiveAt: Date.now(),
      stats: {
        ...activeProfile.stats,
        arcadeHighScore: score,
      },
    };
    await profileRepository.save(updated);
    setProfiles((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  if (!isLoaded) return null;

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        activeProfile,
        isLocked,
        createProfile,
        switchProfile,
        unlockActiveProfile,
        lockProfile,
        deleteProfile,
        updatePreferences,
        recordLessonCompletion,
        recordTestResult,
        recordKeyTelemetry,
        recordArcadeScore,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within ProfileProvider');
  return context;
};
