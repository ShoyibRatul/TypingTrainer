/**
 * Universal Lesson Pack Type Definitions
 * Conforms to Typing Trainer Schemas (schemas/*.schema.json)
 */

export interface PackAuthor {
  name: string;
  email?: string;
  url?: string;
}

export interface PackManifest {
  schemaVersion: number;
  id: string; // reverse-DNS e.g. org.typingtrainer.en-us
  name: Record<string, string>; // BCP-47 -> name
  version: string; // SemVer 2.0
  description: Record<string, string>;
  language: string; // BCP-47 tag e.g. "en"
  region?: string;
  script: string; // ISO 15924 e.g. "Latn"
  direction: 'ltr' | 'rtl';
  authors: PackAuthor[];
  license: string;
  minAppVersion: string;
  dependencies?: Array<{ id: string; version: string }>;
  defaults: {
    layout: string;
    course: string;
  };
  unitOfLength?: {
    type: 'codepoint' | 'grapheme' | 'word';
    charsPerWord?: number;
  };
  contents: {
    layouts: string[];
    courses: string[];
    wordlists?: string[];
    texts?: string[];
    placement?: string;
  };
  checksums?: Record<string, string>;
}

export type FingerAssignment =
  | 'left-pinky'
  | 'left-ring'
  | 'left-middle'
  | 'left-index'
  | 'right-index'
  | 'right-middle'
  | 'right-ring'
  | 'right-pinky'
  | 'thumb';

export interface KeyDefinition {
  base: string;
  shift?: string;
  altgr?: string;
  shiftAltgr?: string;
  finger: FingerAssignment;
  label?: string;
  display?: string;
  hand?: 'left' | 'right';
}

export interface KeyboardLayout {
  schemaVersion: number;
  id: string;
  name: Record<string, string>;
  type?: 'physical' | 'virtual' | 'custom';
  geometry: 'ansi' | 'iso' | 'jis' | 'abnt' | 'ks' | 'numpad';
  direction: 'ltr' | 'rtl';
  inputMethod: 'direct' | 'transliteration' | 'composition' | 'ime';
  keys: Record<string, KeyDefinition>;
}

export interface LessonStep {
  type: 'keys' | 'words' | 'sentence' | 'paragraph' | 'dictation' | 'game';
  target?: string;
  repeat?: number;
  blind?: boolean;
  timeLimitSeconds?: number;
  minAccuracyPercent?: number;
  minWpm?: number;
  reading?: string;
}

export interface LessonDefinition {
  schemaVersion: number;
  id: string;
  title: Record<string, string>;
  objective: Record<string, string>;
  newKeys?: string[];
  tips?: Array<Record<string, string>>;
  steps: LessonStep[];
  pass: {
    minAccuracyPercent: number;
    minWpm: number;
    maxMistakes?: number;
  };
}

export interface CourseLevel {
  id: string;
  title: Record<string, string>;
  lessons: string[]; // relative paths to lesson JSON files
}

export interface CourseDefinition {
  schemaVersion: number;
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  layout: string;
  levels: CourseLevel[];
}

export interface LoadedPack {
  manifest: PackManifest;
  licenseText: string;
  layouts: Map<string, KeyboardLayout>;
  courses: Map<string, CourseDefinition>;
  lessons: Map<string, LessonDefinition>; // relative path or id -> LessonDefinition
  rawFiles?: Map<string, Uint8Array>;
  isBuiltin?: boolean;
}

export interface PackValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  manifest?: PackManifest;
  preview?: PackPreview;
}

export interface PackPreview {
  id: string;
  name: string;
  version: string;
  language: string;
  author: string;
  license: string;
  courseCount: number;
  lessonCount: number;
  layoutCount: number;
  sizeBytes: number;
  verified: boolean;
}
