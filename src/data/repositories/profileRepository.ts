import { UserProfile, UserStats, TypingResult } from '../../types';
import { IProfileRepository, IProgressRepository, IStatsRepository } from './types';

const STORAGE_PROFILES_KEY = 'tt_profiles_v2';
const SCHEMA_VERSION_KEY = 'tt_schema_version';
const CURRENT_SCHEMA_VERSION = 3;

export class LocalProfileRepository implements IProfileRepository, IProgressRepository, IStatsRepository {
  constructor() {
    this.runMigrations();
  }

  private runMigrations() {
    try {
      const currentVer = parseInt(localStorage.getItem(SCHEMA_VERSION_KEY) || '1', 10);
      if (currentVer < CURRENT_SCHEMA_VERSION) {
        // Migrate v1 legacy storage to v2 if present
        const oldProfiles = localStorage.getItem('typing_trainer_users_v1');
        if (oldProfiles && !localStorage.getItem(STORAGE_PROFILES_KEY)) {
          localStorage.setItem(STORAGE_PROFILES_KEY, oldProfiles);
        }
        localStorage.setItem(SCHEMA_VERSION_KEY, CURRENT_SCHEMA_VERSION.toString());
      }
    } catch {
      // Ignore in non-browser env
    }
  }

  private migrateProfileData(raw: any): UserProfile {
    return {
      id: raw.id,
      name: raw.name || 'Learner',
      avatar: raw.avatar || '🚀',
      pinHash: raw.pinHash,
      createdAt: raw.createdAt || Date.now(),
      lastActiveAt: raw.lastActiveAt || Date.now(),
      preferences: {
        theme: raw.preferences?.theme || 'dark',
        soundProfile: raw.preferences?.soundProfile || 'cherry-blue',
        soundVolume: typeof raw.preferences?.soundVolume === 'number' ? raw.preferences.soundVolume : 0.6,
        wpmGoal: raw.preferences?.wpmGoal || 50,
        showHands: raw.preferences?.showHands !== false,
        showKeyboard: raw.preferences?.showKeyboard !== false,
      },
      stats: {
        totalKeystrokes: raw.stats?.totalKeystrokes || 0,
        totalTimeSeconds: raw.stats?.totalTimeSeconds || 0,
        completedLessons: raw.stats?.completedLessons || [],
        lessonScores: raw.stats?.lessonScores || {},
        testHistory: raw.stats?.testHistory || [],
        keyErrors: raw.stats?.keyErrors || {},
        keyLatencies: raw.stats?.keyLatencies || {},
      },
    };
  }

  async getAll(): Promise<UserProfile[]> {
    try {
      const data = localStorage.getItem(STORAGE_PROFILES_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          return parsed.map((p) => this.migrateProfileData(p));
        }
      }
    } catch (e) {
      console.error('Failed to read profiles:', e);
    }
    return [];
  }

  async getById(id: string): Promise<UserProfile | null> {
    const profiles = await this.getAll();
    return profiles.find((p) => p.id === id) || null;
  }

  async save(profile: UserProfile): Promise<void> {
    const profiles = await this.getAll();
    const index = profiles.findIndex((p) => p.id === profile.id);
    if (index >= 0) {
      profiles[index] = profile;
    } else {
      profiles.push(profile);
    }
    localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
  }

  async delete(id: string): Promise<void> {
    const profiles = await this.getAll();
    const filtered = profiles.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(filtered));
  }

  async recordLesson(profileId: string, lessonId: string, result: TypingResult): Promise<void> {
    const profile = await this.getById(profileId);
    if (!profile) return;

    profile.lastActiveAt = Date.now();
    profile.stats.totalTimeSeconds += result.elapsedSeconds;
    profile.stats.totalKeystrokes += Math.round(result.cpm * (result.elapsedSeconds / 60));

    if (!profile.stats.completedLessons.includes(lessonId)) {
      profile.stats.completedLessons.push(lessonId);
    }

    profile.stats.lessonScores[lessonId] = {
      wpm: result.wpm,
      accuracy: result.accuracy,
      stars: result.stars,
      timestamp: Date.now(),
    };

    await this.save(profile);
  }

  async recordTest(profileId: string, testTitle: string, durationSeconds: number, result: TypingResult): Promise<void> {
    const profile = await this.getById(profileId);
    if (!profile) return;

    profile.lastActiveAt = Date.now();
    profile.stats.totalTimeSeconds += durationSeconds;
    profile.stats.totalKeystrokes += Math.round(result.cpm * (durationSeconds / 60));

    profile.stats.testHistory.unshift({
      id: `test-${Date.now()}`,
      date: Date.now(),
      wpm: result.wpm,
      rawWpm: result.rawWpm,
      accuracy: result.accuracy,
      durationSeconds,
      testTitle,
    });

    if (profile.stats.testHistory.length > 50) {
      profile.stats.testHistory = profile.stats.testHistory.slice(0, 50);
    }

    await this.save(profile);
  }

  async recordTelemetry(profileId: string, keyErrors: Record<string, number>, keyLatencies: Record<string, number>): Promise<void> {
    const profile = await this.getById(profileId);
    if (!profile) return;

    Object.entries(keyErrors).forEach(([key, count]) => {
      profile.stats.keyErrors[key] = (profile.stats.keyErrors[key] || 0) + count;
    });

    Object.entries(keyLatencies).forEach(([key, latency]) => {
      const current = profile.stats.keyLatencies[key] || { totalMs: 0, count: 0 };
      profile.stats.keyLatencies[key] = {
        totalMs: current.totalMs + latency,
        count: current.count + 1,
      };
    });

    await this.save(profile);
  }

  async getStats(profileId: string): Promise<UserStats | null> {
    const profile = await this.getById(profileId);
    return profile ? profile.stats : null;
  }
}

export const profileRepository = new LocalProfileRepository();
