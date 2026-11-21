export type ActiveTab = 'home' | 'curriculum' | 'test' | 'arcade' | 'analytics' | 'settings' | 'packs';

export type Finger = 
  | 1 // Left Pinky
  | 2 // Left Ring
  | 3 // Left Middle
  | 4 // Left Index
  | 5 // Right Index
  | 6 // Right Middle
  | 7 // Right Ring
  | 8 // Right Pinky
  | 9; // Thumbs

export interface KeyModel {
  code: string;
  labels: [string, string?]; // [primary, shifted]
  finger: Finger;
  row: number;
  col: number;
  width?: number; // 1.0 = standard 1u, 1.5, 2.0, 2.25, 6.25 (space), etc.
  hasBump?: boolean; // tactile bumps on F and J
}

export interface KeyboardLayoutModel {
  id: string;
  name: string;
  standard: 'ANSI' | 'ISO';
  homeRow: string[];
  keys: KeyModel[];
}

export interface UserStats {
  totalKeystrokes: number;
  totalTimeSeconds: number;
  completedLessons: string[]; // lesson IDs
  lessonScores: Record<string, { wpm: number; accuracy: number; stars: number; timestamp: number }>;
  testHistory: {
    id: string;
    date: number;
    wpm: number;
    rawWpm: number;
    accuracy: number;
    durationSeconds: number;
    testTitle: string;
  }[];
  keyErrors: Record<string, number>; // char -> count
  keyLatencies: Record<string, { totalMs: number; count: number }>; // char -> avg latency
  arcadeHighScore?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string; // emoji or icon
  pinHash?: string; // SHA-256 hashed PIN/password if protected
  createdAt: number;
  lastActiveAt: number;
  preferences: {
    theme: 'dark' | 'light' | 'nord' | 'catppuccin' | 'cyberpunk';
    soundProfile: 'cherry-blue' | 'cherry-brown' | 'thock' | 'typewriter' | 'off';
    soundVolume: number; // 0 to 1
    wpmGoal: number;
    showHands: boolean;
    showKeyboard: boolean;
  };
  stats: UserStats;
}

export type ExerciseType = 'introduction' | 'finger-drill' | 'word-flow' | 'sentence' | 'speed-sprint';

export interface Exercise {
  id: string;
  title: string;
  type: ExerciseType;
  instructions: string;
  targetKeys: string[];
  targetFingers: Finger[];
  content: string; // The exercise text to type
  minAccuracy?: number;
  timeLimitSeconds?: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  targetKeys: string[];
  exercises: Exercise[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Mastery';
  iconName: string;
  lessons: Lesson[];
}

export interface TypingResult {
  wpm: number;
  rawWpm: number;
  cpm: number;
  accuracy: number;
  elapsedSeconds: number;
  errors: number;
  backspaceCount: number;
  stars: number;
}
