import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserStats, TypingResult } from '../types';
import { hashPin, verifyPin } from '../utils/crypto';

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
}

const STORAGE_KEY = 'typing_trainer_users_v1';
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

const DEFAULT_PROFILES: UserProfile[] = [
  {
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
  }
];

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_PROFILES;
  });

  const [activeProfileId, setActiveProfileId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem(ACTIVE_ID_KEY);
      if (savedId) return savedId;
    } catch {
      // ignore
    }
    return profiles[0]?.id || 'user-default-1';
  });

  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Sync profiles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
      if (activeProfileId) {
        localStorage.setItem(ACTIVE_ID_KEY, activeProfileId);
      }
    } catch (err) {
      console.error('Failed to save profiles to localStorage:', err);
    }
  }, [profiles, activeProfileId]);

  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0] || null;

  // Create a new user profile
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

    setProfiles(prev => [...prev, newProfile]);
    setActiveProfileId(newProfile.id);
    setIsLocked(false);
    return newProfile;
  };

  // Switch between user profiles (with optional PIN validation if locked)
  const switchProfile = async (profileId: string, pin?: string): Promise<{ success: boolean; error?: string }> => {
    const target = profiles.find(p => p.id === profileId);
    if (!target) return { success: false, error: 'User profile not found.' };

    if (target.pinHash) {
      if (!pin) {
        return { success: false, error: 'PIN_REQUIRED' };
      }
      const valid = await verifyPin(pin, target.pinHash);
      if (!valid) {
        return { success: false, error: 'Invalid PIN. Please try again.' };
      }
    }

    setActiveProfileId(profileId);
    setIsLocked(false);
    return { success: true };
  };

  const unlockActiveProfile = async (pin: string): Promise<boolean> => {
    if (!activeProfile || !activeProfile.pinHash) {
      setIsLocked(false);
      return true;
    }
    const valid = await verifyPin(pin, activeProfile.pinHash);
    if (valid) {
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

  const deleteProfile = (profileId: string) => {
    if (profiles.length <= 1) return; // Prevent deleting the last profile
    const remaining = profiles.filter(p => p.id !== profileId);
    setProfiles(remaining);
    if (activeProfileId === profileId) {
      setActiveProfileId(remaining[0].id);
      setIsLocked(false);
    }
  };

  const updatePreferences = (prefs: Partial<UserProfile['preferences']>) => {
    if (!activeProfile) return;
    setProfiles(prev => prev.map(p => {
      if (p.id === activeProfile.id) {
        return {
          ...p,
          lastActiveAt: Date.now(),
          preferences: { ...p.preferences, ...prefs }
        };
      }
      return p;
    }));
  };

  const recordLessonCompletion = (lessonId: string, result: TypingResult) => {
    if (!activeProfile) return;
    setProfiles(prev => prev.map(p => {
      if (p.id === activeProfile.id) {
        const stats = { ...p.stats };
        stats.totalKeystrokes += result.cpm * (result.elapsedSeconds / 60);
        stats.totalTimeSeconds += result.elapsedSeconds;
        if (!stats.completedLessons.includes(lessonId)) {
          stats.completedLessons = [...stats.completedLessons, lessonId];
        }
        stats.lessonScores[lessonId] = {
          wpm: result.wpm,
          accuracy: result.accuracy,
          stars: result.stars,
          timestamp: Date.now(),
        };
        return { ...p, lastActiveAt: Date.now(), stats };
      }
      return p;
    }));
  };

  const recordTestResult = (title: string, durationSeconds: number, result: TypingResult) => {
    if (!activeProfile) return;
    setProfiles(prev => prev.map(p => {
      if (p.id === activeProfile.id) {
        const stats = { ...p.stats };
        stats.totalKeystrokes += result.cpm * (result.elapsedSeconds / 60);
        stats.totalTimeSeconds += result.elapsedSeconds;
        stats.testHistory = [
          {
            id: `test-${Date.now()}`,
            date: Date.now(),
            wpm: result.wpm,
            rawWpm: result.rawWpm,
            accuracy: result.accuracy,
            durationSeconds,
            testTitle: title,
          },
          ...stats.testHistory.slice(0, 49) // Keep last 50 tests
        ];
        return { ...p, lastActiveAt: Date.now(), stats };
      }
      return p;
    }));
  };

  const recordKeyTelemetry = (errors: Record<string, number>, latencies: Record<string, number>) => {
    if (!activeProfile) return;
    setProfiles(prev => prev.map(p => {
      if (p.id === activeProfile.id) {
        const stats = { ...p.stats };
        const keyErrors = { ...stats.keyErrors };
        Object.entries(errors).forEach(([k, count]) => {
          keyErrors[k] = (keyErrors[k] || 0) + count;
        });

        const keyLatencies = { ...stats.keyLatencies };
        Object.entries(latencies).forEach(([k, ms]) => {
          const current = keyLatencies[k] || { totalMs: 0, count: 0 };
          keyLatencies[k] = {
            totalMs: current.totalMs + ms,
            count: current.count + 1,
          };
        });

        stats.keyErrors = keyErrors;
        stats.keyLatencies = keyLatencies;
        return { ...p, stats };
      }
      return p;
    }));
  };

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
