/**
 * Built-in English (US QWERTY) Reference Pack
 * Conforms 100% to Typing Trainer Universal Pack Specification.
 */

import { LoadedPack, PackManifest, KeyboardLayout, CourseDefinition, LessonDefinition } from './types';

export const BUILTIN_ENGLISH_MANIFEST: PackManifest = {
  schemaVersion: 1,
  id: 'org.typingtrainer.en-us',
  name: {
    en: 'English (US QWERTY)',
  },
  version: '1.0.0',
  description: {
    en: 'Official core English touch-typing curriculum with standard ANSI QWERTY layout.',
  },
  language: 'en',
  region: 'US',
  script: 'Latn',
  direction: 'ltr',
  authors: [
    {
      name: 'Shoyib Ratul',
      email: 'hello@shoyibratul.com',
      url: 'https://github.com/ShoyibRatul/TypingTrainer',
    },
  ],
  license: 'PolyForm-Noncommercial-1.0.0',
  minAppVersion: '1.0.0',
  defaults: {
    layout: 'en-us-qwerty',
    course: 'english-fundamentals',
  },
  unitOfLength: {
    type: 'word',
    charsPerWord: 5,
  },
  contents: {
    layouts: ['layouts/en-us-qwerty.json'],
    courses: ['courses/fundamentals/course.json'],
  },
};

export const BUILTIN_ENGLISH_LAYOUT: KeyboardLayout = {
  schemaVersion: 1,
  id: 'en-us-qwerty',
  name: { en: 'US QWERTY' },
  geometry: 'ansi',
  direction: 'ltr',
  inputMethod: 'direct',
  keys: {
    // Number Row
    Backquote: { base: '`', shift: '~', finger: 'left-pinky' },
    Digit1: { base: '1', shift: '!', finger: 'left-pinky' },
    Digit2: { base: '2', shift: '@', finger: 'left-ring' },
    Digit3: { base: '3', shift: '#', finger: 'left-middle' },
    Digit4: { base: '4', shift: '$', finger: 'left-index' },
    Digit5: { base: '5', shift: '%', finger: 'left-index' },
    Digit6: { base: '6', shift: '^', finger: 'right-index' },
    Digit7: { base: '7', shift: '&', finger: 'right-index' },
    Digit8: { base: '8', shift: '*', finger: 'right-middle' },
    Digit9: { base: '9', shift: '(', finger: 'right-ring' },
    Digit0: { base: '0', shift: ')', finger: 'right-pinky' },
    Minus: { base: '-', shift: '_', finger: 'right-pinky' },
    Equal: { base: '=', shift: '+', finger: 'right-pinky' },

    // Top Row
    KeyQ: { base: 'q', shift: 'Q', finger: 'left-pinky' },
    KeyW: { base: 'w', shift: 'W', finger: 'left-ring' },
    KeyE: { base: 'e', shift: 'E', finger: 'left-middle' },
    KeyR: { base: 'r', shift: 'R', finger: 'left-index' },
    KeyT: { base: 't', shift: 'T', finger: 'left-index' },
    KeyY: { base: 'y', shift: 'Y', finger: 'right-index' },
    KeyU: { base: 'u', shift: 'U', finger: 'right-index' },
    KeyI: { base: 'i', shift: 'I', finger: 'right-middle' },
    KeyO: { base: 'o', shift: 'O', finger: 'right-ring' },
    KeyP: { base: 'p', shift: 'P', finger: 'right-pinky' },
    BracketLeft: { base: '[', shift: '{', finger: 'right-pinky' },
    BracketRight: { base: ']', shift: '}', finger: 'right-pinky' },
    Backslash: { base: '\\', shift: '|', finger: 'right-pinky' },

    // Home Row
    KeyA: { base: 'a', shift: 'A', finger: 'left-pinky' },
    KeyS: { base: 's', shift: 'S', finger: 'left-ring' },
    KeyD: { base: 'd', shift: 'D', finger: 'left-middle' },
    KeyF: { base: 'f', shift: 'F', finger: 'left-index', label: 'F' },
    KeyG: { base: 'g', shift: 'G', finger: 'left-index' },
    KeyH: { base: 'h', shift: 'H', finger: 'right-index' },
    KeyJ: { base: 'j', shift: 'J', finger: 'right-index', label: 'J' },
    KeyK: { base: 'k', shift: 'K', finger: 'right-middle' },
    KeyL: { base: 'l', shift: 'L', finger: 'right-ring' },
    Semicolon: { base: ';', shift: ':', finger: 'right-pinky' },
    Quote: { base: "'", shift: '"', finger: 'right-pinky' },

    // Bottom Row
    KeyZ: { base: 'z', shift: 'Z', finger: 'left-pinky' },
    KeyX: { base: 'x', shift: 'X', finger: 'left-ring' },
    KeyC: { base: 'c', shift: 'C', finger: 'left-middle' },
    KeyV: { base: 'v', shift: 'V', finger: 'left-index' },
    KeyB: { base: 'b', shift: 'B', finger: 'left-index' },
    KeyN: { base: 'n', shift: 'N', finger: 'right-index' },
    KeyM: { base: 'm', shift: 'M', finger: 'right-index' },
    Comma: { base: ',', shift: '<', finger: 'right-middle' },
    Period: { base: '.', shift: '>', finger: 'right-ring' },
    Slash: { base: '/', shift: '?', finger: 'right-pinky' },

    // Thumb
    Space: { base: ' ', shift: ' ', finger: 'thumb' },
  },
};

export const BUILTIN_ENGLISH_COURSE: CourseDefinition = {
  schemaVersion: 1,
  id: 'english-fundamentals',
  title: { en: 'English QWERTY Mastery' },
  description: { en: 'From Home Row anchor keys to punctuation, numbers, and full fluency.' },
  layout: 'en-us-qwerty',
  levels: [
    {
      id: 'level-1-home-row',
      title: { en: 'Stage 1: Home Row Foundation' },
      lessons: ['lesson-1-anchor', 'lesson-2-home-keys', 'lesson-3-home-words'],
    },
    {
      id: 'level-2-vowels',
      title: { en: 'Stage 2: Top Row & Vowels' },
      lessons: ['lesson-4-e-i', 'lesson-5-r-u', 'lesson-6-top-words'],
    },
    {
      id: 'level-3-bottom-row',
      title: { en: 'Stage 3: Bottom Row Expansion' },
      lessons: ['lesson-7-c-m', 'lesson-8-v-n', 'lesson-9-all-letters'],
    },
  ],
};

export const BUILTIN_ENGLISH_LESSONS: Record<string, LessonDefinition> = {
  'lesson-1-anchor': {
    schemaVersion: 1,
    id: 'lesson-1-anchor',
    title: { en: 'Anchor Keys: F and J' },
    objective: { en: 'Feel the tactile bumps on F and J to establish your home row anchor position.' },
    newKeys: ['KeyF', 'KeyJ'],
    tips: [
      { en: 'Rest your left index finger on F and right index finger on J.' },
      { en: 'Never look down at the keyboard; trust your finger tactile sensations.' },
    ],
    steps: [
      { type: 'keys', target: 'ff jj ff jj fj fj jf jf ff jj' },
      { type: 'keys', target: 'fff jjj fff jjj fjf jfj' },
      { type: 'words', target: 'fjf jfj ff jj fj jf' },
    ],
    pass: { minAccuracyPercent: 90, minWpm: 12 },
  },
  'lesson-2-home-keys': {
    schemaVersion: 1,
    id: 'lesson-2-home-keys',
    title: { en: 'Home Row: D, K, S, L' },
    objective: { en: 'Expand fingers to Middle (D, K) and Ring (S, L) fingers.' },
    newKeys: ['KeyD', 'KeyK', 'KeyS', 'KeyL'],
    tips: [{ en: 'Keep your wrists elevated slightly off the desk.' }],
    steps: [
      { type: 'keys', target: 'dd kk ss ll dk sl kd ls' },
      { type: 'words', target: 'ask dad fall flask salad' },
      { type: 'sentence', target: 'a sad dad asks a lad' },
    ],
    pass: { minAccuracyPercent: 92, minWpm: 15 },
  },
  'lesson-3-home-words': {
    schemaVersion: 1,
    id: 'lesson-3-home-words',
    title: { en: 'Home Row: Complete Row & Words' },
    objective: { en: 'Integrate Pinky keys A and Semicolon (;), plus Center Reaches G and H.' },
    newKeys: ['KeyA', 'Semicolon', 'KeyG', 'KeyH'],
    tips: [{ en: 'G is an index reach to the right; H is an index reach to the left.' }],
    steps: [
      { type: 'keys', target: 'aa ;; gg hh asdf jkl; gh hg' },
      { type: 'words', target: 'glad flash shall flags half dash' },
      { type: 'sentence', target: 'half a flag falls as a glad dad laughs' },
    ],
    pass: { minAccuracyPercent: 94, minWpm: 18 },
  },
  'lesson-4-e-i': {
    schemaVersion: 1,
    id: 'lesson-4-e-i',
    title: { en: 'Top Row: High Frequency Vowels E and I' },
    objective: { en: 'Reach upward with Left Middle finger to E and Right Middle finger to I.' },
    newKeys: ['KeyE', 'KeyI'],
    tips: [{ en: 'Return your middle fingers promptly to D and K after each reach.' }],
    steps: [
      { type: 'keys', target: 'de de ded ki ki kik ee ii' },
      { type: 'words', target: 'desk silk life feed field side' },
      { type: 'sentence', target: 'he feels life like a hike' },
    ],
    pass: { minAccuracyPercent: 92, minWpm: 20 },
  },
  'lesson-5-r-u': {
    schemaVersion: 1,
    id: 'lesson-5-r-u',
    title: { en: 'Top Row: R and U Reaches' },
    objective: { en: 'Reach Left Index finger to R and Right Index finger to U.' },
    newKeys: ['KeyR', 'KeyU'],
    tips: [{ en: 'F reaches up-left to R; J reaches up-right to U.' }],
    steps: [
      { type: 'keys', target: 'fr fr fr ju ju ju rr uu' },
      { type: 'words', target: 'surf rush rust fruit ruler dark' },
      { type: 'sentence', target: 'user runs under dark rush' },
    ],
    pass: { minAccuracyPercent: 92, minWpm: 22 },
  },
  'lesson-6-top-words': {
    schemaVersion: 1,
    id: 'lesson-6-top-words',
    title: { en: 'Top Row: Fluency & Words' },
    objective: { en: 'Combine all top and home row keys into full vocabulary.' },
    newKeys: ['KeyT', 'KeyY', 'KeyO', 'KeyP'],
    tips: [{ en: 'Keep a steady, rhythmic cadence without stopping.' }],
    steps: [
      { type: 'words', target: 'type party reply port report pretty' },
      { type: 'sentence', target: 'true purity requires steady effort every day' },
      { type: 'paragraph', target: 'the great spirit writes pure poetry for eager readers' },
    ],
    pass: { minAccuracyPercent: 94, minWpm: 25 },
  },
  'lesson-7-c-m': {
    schemaVersion: 1,
    id: 'lesson-7-c-m',
    title: { en: 'Bottom Row: C and M Drops' },
    objective: { en: 'Curl Left Middle finger down to C; curl Right Index finger down to M.' },
    newKeys: ['KeyC', 'KeyM'],
    tips: [{ en: 'Avoid moving your whole hand; curl the fingers downward.' }],
    steps: [
      { type: 'keys', target: 'dc dc dcd jm jm jmj cc mm' },
      { type: 'words', target: 'music claim calm cream match came' },
      { type: 'sentence', target: 'calm music creates much magic' },
    ],
    pass: { minAccuracyPercent: 92, minWpm: 25 },
  },
  'lesson-8-v-n': {
    schemaVersion: 1,
    id: 'lesson-8-v-n',
    title: { en: 'Bottom Row: V and N Reaches' },
    objective: { en: 'Curl Left Index down to V and Right Index down to N.' },
    newKeys: ['KeyV', 'KeyN'],
    tips: [{ en: 'F reaches down-right to V; J reaches down-left to N.' }],
    steps: [
      { type: 'keys', target: 'fv fv fvf jn jn jnj vv nn' },
      { type: 'words', target: 'voice novel never river view raven' },
      { type: 'sentence', target: 'never leave a novel raven unseen' },
    ],
    pass: { minAccuracyPercent: 94, minWpm: 28 },
  },
  'lesson-9-all-letters': {
    schemaVersion: 1,
    id: 'lesson-9-all-letters',
    title: { en: 'Full Alphabet Master Run' },
    objective: { en: 'Execute drills containing all 26 letters of the English alphabet.' },
    newKeys: ['KeyZ', 'KeyX', 'KeyB'],
    tips: [{ en: 'Focus on zero mistakes; speed naturally flows from accuracy.' }],
    steps: [
      { type: 'sentence', target: 'the quick brown fox jumps over the lazy dog' },
      { type: 'sentence', target: 'pack my box with five dozen liquor jugs' },
      { type: 'paragraph', target: 'sphinx of black quartz judge my vow as we discover all keys cleanly.' },
    ],
    pass: { minAccuracyPercent: 95, minWpm: 30 },
  },
};

/**
 * Creates the initialized LoadedPack for the built-in English pack.
 */
export function getBuiltinEnglishPack(): LoadedPack {
  const layouts = new Map<string, KeyboardLayout>();
  layouts.set(BUILTIN_ENGLISH_LAYOUT.id, BUILTIN_ENGLISH_LAYOUT);

  const courses = new Map<string, CourseDefinition>();
  courses.set(BUILTIN_ENGLISH_COURSE.id, BUILTIN_ENGLISH_COURSE);

  const lessons = new Map<string, LessonDefinition>();
  for (const [id, lesson] of Object.entries(BUILTIN_ENGLISH_LESSONS)) {
    lessons.set(id, lesson);
  }

  return {
    manifest: BUILTIN_ENGLISH_MANIFEST,
    licenseText: 'Free for non-commercial and educational use under PolyForm Noncommercial License 1.0.0',
    layouts,
    courses,
    lessons,
    isBuiltin: true,
  };
}
