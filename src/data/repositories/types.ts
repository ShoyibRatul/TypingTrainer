import { UserProfile, UserStats, TypingResult } from '../../types';

export interface IProfileRepository {
  getAll(): Promise<UserProfile[]>;
  getById(id: string): Promise<UserProfile | null>;
  save(profile: UserProfile): Promise<void>;
  delete(id: string): Promise<void>;
}

export interface IProgressRepository {
  recordLesson(profileId: string, lessonId: string, result: TypingResult): Promise<void>;
  recordTest(profileId: string, testTitle: string, durationSeconds: number, result: TypingResult): Promise<void>;
}

export interface IStatsRepository {
  recordTelemetry(profileId: string, keyErrors: Record<string, number>, keyLatencies: Record<string, number>): Promise<void>;
  getStats(profileId: string): Promise<UserStats | null>;
}
