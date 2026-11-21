import { describe, it, expect } from 'vitest';
import { zipSync, strToU8 } from 'fflate';
import { extractAndValidatePack } from '../src/engine/packs/extractor';
import { validateEntryPath, sanitizePackText, containsBidiOverrides } from '../src/engine/packs/security';
import { packRegistry } from '../src/engine/packs/registry';
import { getBuiltinEnglishPack } from '../src/engine/packs/builtinEnglish';
import fs from 'fs';
import path from 'path';

describe('Pack Security & Path Validation', () => {
  it('allows safe relative paths with whitelisted extensions', () => {
    expect(validateEntryPath('manifest.json').safe).toBe(true);
    expect(validateEntryPath('LICENSE').safe).toBe(true);
    expect(validateEntryPath('layouts/en-qwerty.json').safe).toBe(true);
    expect(validateEntryPath('courses/fundamentals/course.json').safe).toBe(true);
    expect(validateEntryPath('courses/fundamentals/lessons/001.json').safe).toBe(true);
    expect(validateEntryPath('fonts/inter.woff2').safe).toBe(true);
    expect(validateEntryPath('images/preview.png').safe).toBe(true);
  });

  it('rejects zip-slip path traversal sequences', () => {
    expect(validateEntryPath('../malicious.json').safe).toBe(false);
    expect(validateEntryPath('courses/../../escape.json').safe).toBe(false);
    expect(validateEntryPath('..\\windows_traversal.json').safe).toBe(false);
  });

  it('rejects absolute paths', () => {
    expect(validateEntryPath('/etc/passwd').safe).toBe(false);
    expect(validateEntryPath('C:/Windows/System32/evil.exe').safe).toBe(false);
  });

  it('rejects forbidden file extensions', () => {
    expect(validateEntryPath('exploit.exe').safe).toBe(false);
    expect(validateEntryPath('scripts/hack.js').safe).toBe(false);
    expect(validateEntryPath('payload.bat').safe).toBe(false);
    expect(validateEntryPath('index.html').safe).toBe(false);
    expect(validateEntryPath('module.mjs').safe).toBe(false);
  });

  it('rejects Windows reserved device names', () => {
    expect(validateEntryPath('CON.json').safe).toBe(false);
    expect(validateEntryPath('layouts/AUX.json').safe).toBe(false);
    expect(validateEntryPath('NUL').safe).toBe(false);
    expect(validateEntryPath('COM1.txt').safe).toBe(false);
  });
});

describe('Pack Text Sanitization', () => {
  it('detects and strips bidi override characters', () => {
    const maliciousBidi = 'Hello \u202Ereversed\u202C text';
    expect(containsBidiOverrides(maliciousBidi)).toBe(true);
    const cleaned = sanitizePackText(maliciousBidi);
    expect(cleaned).toBe('Hello reversed text');
    expect(containsBidiOverrides(cleaned)).toBe(false);
  });

  it('strips dangerous non-printable control characters while preserving whitespace', () => {
    const raw = 'Valid line\x00\x07 with null and bell\nPreserved line\twith tab';
    const cleaned = sanitizePackText(raw);
    expect(cleaned).toBe('Valid line with null and bell\nPreserved line\twith tab');
  });
});

describe('Pack Extractor & Malicious Pack Rejection', () => {
  const validManifest = {
    schemaVersion: 1,
    id: 'org.typingtrainer.testpack',
    name: { en: 'Test Pack' },
    version: '1.0.0',
    description: { en: 'A test pack' },
    language: 'en',
    script: 'Latn',
    direction: 'ltr',
    authors: [{ name: 'Test Author' }],
    license: 'CC0-1.0',
    minAppVersion: '1.0.0',
    defaults: { layout: 'test-layout', course: 'test-course' },
    contents: {
      layouts: ['layouts/test-layout.json'],
      courses: ['courses/test-course.json'],
    },
  };

  const validLayout = {
    schemaVersion: 1,
    id: 'test-layout',
    name: { en: 'Test Layout' },
    geometry: 'ansi',
    direction: 'ltr',
    inputMethod: 'direct',
    keys: {
      KeyA: { base: 'a', finger: 'left-pinky' },
      KeyB: { base: 'b', finger: 'left-index' },
    },
  };

  const validCourse = {
    schemaVersion: 1,
    id: 'test-course',
    title: { en: 'Test Course' },
    description: { en: 'Course description' },
    layout: 'test-layout',
    levels: [
      {
        id: 'lvl1',
        title: { en: 'Level 1' },
        lessons: ['lesson1.json'],
      },
    ],
  };

  const validLesson = {
    schemaVersion: 1,
    id: 'lesson1',
    title: { en: 'Lesson 1' },
    objective: { en: 'Practice AB' },
    steps: [{ type: 'keys', target: 'ab ab' }],
    pass: { minAccuracyPercent: 90, minWpm: 10 },
  };

  it('successfully extracts and validates a well-formed pack', () => {
    const zipData = zipSync({
      'manifest.json': strToU8(JSON.stringify(validManifest)),
      'LICENSE': strToU8('Public Domain License'),
      'layouts/test-layout.json': strToU8(JSON.stringify(validLayout)),
      'courses/test-course.json': strToU8(JSON.stringify(validCourse)),
      'courses/lesson1.json': strToU8(JSON.stringify(validLesson)),
    });

    const { pack, result } = extractAndValidatePack(zipData);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(pack).toBeDefined();
    expect(pack?.manifest.id).toBe('org.typingtrainer.testpack');
    expect(pack?.layouts.has('test-layout')).toBe(true);
    expect(pack?.courses.has('test-course')).toBe(true);
  });

  it('rejects pack with missing manifest.json', () => {
    const zipData = zipSync({
      'LICENSE': strToU8('Some license'),
      'layouts/test-layout.json': strToU8(JSON.stringify(validLayout)),
    });

    const { pack, result } = extractAndValidatePack(zipData);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('manifest.json'))).toBe(true);
    expect(pack).toBeUndefined();
  });

  it('rejects pack with missing LICENSE file', () => {
    const zipData = zipSync({
      'manifest.json': strToU8(JSON.stringify(validManifest)),
      'layouts/test-layout.json': strToU8(JSON.stringify(validLayout)),
    });

    const { pack, result } = extractAndValidatePack(zipData);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('LICENSE'))).toBe(true);
    expect(pack).toBeUndefined();
  });

  it('rejects pack with zip-slip entry traversal', () => {
    const zipData = zipSync({
      'manifest.json': strToU8(JSON.stringify(validManifest)),
      'LICENSE': strToU8('License'),
      '../../escape.json': strToU8('{"bad": true}'),
    });

    const { pack, result } = extractAndValidatePack(zipData);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('Path traversal'))).toBe(true);
    expect(pack).toBeUndefined();
  });

  it('rejects pack containing executable payload (.exe or .js)', () => {
    const zipData = zipSync({
      'manifest.json': strToU8(JSON.stringify(validManifest)),
      'LICENSE': strToU8('License'),
      'malware.exe': strToU8('badbinary'),
    });

    const { pack, result } = extractAndValidatePack(zipData);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('.exe'))).toBe(true);
    expect(pack).toBeUndefined();
  });

  it('rejects pack with invalid manifest schema (e.g. wrong schemaVersion or invalid id)', () => {
    const invalidManifest = {
      ...validManifest,
      schemaVersion: 99,
      id: 'invalid-no-dots',
    };

    const zipData = zipSync({
      'manifest.json': strToU8(JSON.stringify(invalidManifest)),
      'LICENSE': strToU8('License'),
      'layouts/test-layout.json': strToU8(JSON.stringify(validLayout)),
      'courses/test-course.json': strToU8(JSON.stringify(validCourse)),
      'courses/lesson1.json': strToU8(JSON.stringify(validLesson)),
    });

    const { pack, result } = extractAndValidatePack(zipData);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('schemaVersion'))).toBe(true);
    expect(pack).toBeUndefined();
  });
});

describe('Pack Registry & Built-in English Pack', () => {
  it('initializes with built-in English pack active', () => {
    const active = packRegistry.getActivePack();
    expect(active).toBeDefined();
    expect(active.manifest.id).toBe('org.typingtrainer.en-us');
    expect(active.isBuiltin).toBe(true);
    expect(active.manifest.language).toBe('en');
  });

  it('resolves default layout and course from built-in English pack', () => {
    const layout = packRegistry.getLayout();
    expect(layout).toBeDefined();
    expect(layout.id).toBe('en-us-qwerty');
    expect(layout.keys['KeyF'].base).toBe('f');
    expect(layout.keys['KeyJ'].base).toBe('j');

    const course = packRegistry.getCourse();
    expect(course).toBeDefined();
    expect(course?.id).toBe('fundamentals');
    expect(course?.levels.length).toBe(6);

    const lesson = packRegistry.getLesson('fund-01-fj');
    expect(lesson).toBeDefined();
    expect(lesson?.newKeys).toContain('KeyF');
    expect(lesson?.newKeys).toContain('KeyJ');
  });

  it('supports alternative English layouts (Dvorak, Colemak, Colemak-DH)', () => {
    const active = packRegistry.getActivePack();
    expect(active.layouts.has('en-dvorak')).toBe(true);
    expect(active.layouts.has('en-colemak')).toBe(true);
    expect(active.layouts.has('en-colemak-dh')).toBe(true);

    const dvorak = packRegistry.getLayout('en-dvorak');
    expect(dvorak.keys['KeyU'].base).toBe('g'); // Dvorak maps U position to g
  });

  it('provides specialized Programmer and Numpad courses', () => {
    const active = packRegistry.getActivePack();
    expect(active.courses.has('programmer')).toBe(true);
    expect(active.courses.has('numpad')).toBe(true);

    const progLesson = packRegistry.getLesson('prog-01-delimiters');
    expect(progLesson).toBeDefined();
    expect(progLesson?.title.en).toContain('Braces');

    const numpadLesson = packRegistry.getLesson('numpad-01-home');
    expect(numpadLesson).toBeDefined();
    expect(numpadLesson?.title.en).toContain('4, 5, 6');
  });

  it('prevents uninstallation of built-in English pack', () => {
    const result = packRegistry.uninstallPack('org.typingtrainer.en-us');
    expect(result).toBe(false);
    expect(packRegistry.getActivePack().manifest.id).toBe('org.typingtrainer.en-us');
  });
});
