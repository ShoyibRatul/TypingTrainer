/**
 * Universal Lesson Pack Extractor & In-Memory Unpacker
 * Powered by fflate with strict streaming security checks.
 */

import { unzipSync } from 'fflate';
import {
  LoadedPack,
  PackManifest,
  KeyboardLayout,
  CourseDefinition,
  LessonDefinition,
  PackValidationResult,
  PackPreview,
} from './types';
import {
  MAX_COMPRESSED_BYTES,
  MAX_UNCOMPRESSED_BYTES,
  MAX_FILE_ENTRIES,
  MAX_COMPRESSION_RATIO,
  validateEntryPath,
  sanitizePackText,
} from './security';

const textDecoder = new TextDecoder('utf-8');

/**
 * Extracts and validates a .ttpack or .zip buffer.
 */
export function extractAndValidatePack(buffer: Uint8Array): {
  pack?: LoadedPack;
  result: PackValidationResult;
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Compressed size guard
  if (buffer.length > MAX_COMPRESSED_BYTES) {
    errors.push(
      `Pack archive exceeds maximum compressed size of ${MAX_COMPRESSED_BYTES / (1024 * 1024)} MB (size: ${(buffer.length / (1024 * 1024)).toFixed(1)} MB)`
    );
    return { result: { valid: false, errors, warnings } };
  }

  let unzipped: Record<string, Uint8Array>;
  try {
    unzipped = unzipSync(buffer);
  } catch (err: any) {
    errors.push(`Failed to decompress ZIP archive: ${err.message || 'Invalid or corrupted ZIP'}`);
    return { result: { valid: false, errors, warnings } };
  }

  const entries = Object.keys(unzipped);

  // 2. Entry count limit
  if (entries.length > MAX_FILE_ENTRIES) {
    errors.push(`Archive contains ${entries.length} entries, exceeding maximum limit of ${MAX_FILE_ENTRIES}`);
    return { result: { valid: false, errors, warnings } };
  }

  // 3. Zip-Slip, whitelist, and uncompressed size calculation
  let totalUncompressedBytes = 0;
  const normalizedFiles = new Map<string, Uint8Array>();
  const seenLowerPaths = new Set<string>();

  for (const rawPath of entries) {
    const fileBytes = unzipped[rawPath];
    totalUncompressedBytes += fileBytes.length;

    // Skip directory entries themselves
    if (rawPath.endsWith('/') || rawPath.endsWith('\\')) {
      continue;
    }

    const pathCheck = validateEntryPath(rawPath);
    if (!pathCheck.safe) {
      errors.push(`Security violation in pack entry: ${pathCheck.error}`);
      return { result: { valid: false, errors, warnings } };
    }

    const normPath = pathCheck.normalizedPath;
    const lower = normPath.toLowerCase();
    if (seenLowerPaths.has(lower)) {
      errors.push(`Case-collision detected for path: ${normPath}`);
      return { result: { valid: false, errors, warnings } };
    }
    seenLowerPaths.add(lower);
    normalizedFiles.set(normPath, fileBytes);
  }

  // 4. Uncompressed size and zip-bomb ratio checks
  if (totalUncompressedBytes > MAX_UNCOMPRESSED_BYTES) {
    errors.push(
      `Uncompressed pack size (${(totalUncompressedBytes / (1024 * 1024)).toFixed(1)} MB) exceeds maximum allowed limit of ${MAX_UNCOMPRESSED_BYTES / (1024 * 1024)} MB`
    );
    return { result: { valid: false, errors, warnings } };
  }

  const compressionRatio = totalUncompressedBytes / Math.max(buffer.length, 1);
  if (compressionRatio > MAX_COMPRESSION_RATIO) {
    errors.push(
      `Decompression ratio (${compressionRatio.toFixed(1)}:1) exceeds maximum safe limit of ${MAX_COMPRESSION_RATIO}:1 (potential zip bomb)`
    );
    return { result: { valid: false, errors, warnings } };
  }

  // 5. Verify Required Files: manifest.json and LICENSE
  const manifestBytes = normalizedFiles.get('manifest.json');
  if (!manifestBytes) {
    errors.push("Missing required 'manifest.json' at root of pack");
    return { result: { valid: false, errors, warnings } };
  }

  let licenseText = '';
  // Check for LICENSE or LICENSE.md or LICENSE.txt
  for (const candidate of ['LICENSE', 'LICENSE.md', 'LICENSE.txt']) {
    const bytes = normalizedFiles.get(candidate);
    if (bytes) {
      licenseText = sanitizePackText(textDecoder.decode(bytes));
      break;
    }
  }

  if (!licenseText) {
    errors.push("Missing required 'LICENSE' file at root of pack");
    return { result: { valid: false, errors, warnings } };
  }

  // 6. Parse and validate manifest.json
  let manifest: PackManifest;
  try {
    const rawManifestStr = textDecoder.decode(manifestBytes);
    manifest = JSON.parse(rawManifestStr);
  } catch (err: any) {
    errors.push(`Invalid JSON syntax in manifest.json: ${err.message}`);
    return { result: { valid: false, errors, warnings } };
  }

  // Basic structural manifest validation
  if (manifest.schemaVersion !== 1) {
    errors.push(`Unsupported schemaVersion in manifest: expected 1, got ${manifest.schemaVersion}`);
  }
  if (!manifest.id || typeof manifest.id !== 'string' || !manifest.id.includes('.')) {
    errors.push(`Invalid manifest id: must be a reverse-DNS identifier (e.g. org.typingtrainer.en-us)`);
  }
  if (!manifest.name || typeof manifest.name !== 'object' || Object.keys(manifest.name).length === 0) {
    errors.push('Manifest missing localized name dictionary');
  }
  if (!manifest.version || typeof manifest.version !== 'string') {
    errors.push('Manifest missing version string');
  }
  if (!manifest.language || typeof manifest.language !== 'string') {
    errors.push('Manifest missing language BCP-47 tag');
  }
  if (!manifest.script || typeof manifest.script !== 'string') {
    errors.push('Manifest missing ISO 15924 script code');
  }
  if (!manifest.direction || !['ltr', 'rtl'].includes(manifest.direction)) {
    errors.push("Manifest direction must be either 'ltr' or 'rtl'");
  }
  if (!Array.isArray(manifest.authors) || manifest.authors.length === 0) {
    errors.push('Manifest missing authors array');
  }
  if (!manifest.license || typeof manifest.license !== 'string') {
    errors.push('Manifest missing license declaration');
  }
  if (!manifest.defaults || !manifest.defaults.layout || !manifest.defaults.course) {
    errors.push('Manifest missing defaults.layout or defaults.course');
  }
  if (!manifest.contents || !Array.isArray(manifest.contents.layouts) || !Array.isArray(manifest.contents.courses)) {
    errors.push('Manifest missing contents.layouts or contents.courses arrays');
  }

  if (errors.length > 0) {
    return { result: { valid: false, errors, warnings, manifest } };
  }

  // 7. Parse and validate declared layouts
  const layouts = new Map<string, KeyboardLayout>();
  for (const layoutPath of manifest.contents.layouts) {
    const layoutBytes = normalizedFiles.get(layoutPath);
    if (!layoutBytes) {
      errors.push(`Layout referenced in manifest not found: ${layoutPath}`);
      continue;
    }
    try {
      const layout: KeyboardLayout = JSON.parse(textDecoder.decode(layoutBytes));
      if (!layout.id || !layout.keys) {
        errors.push(`Layout file '${layoutPath}' is missing id or keys definition`);
      } else {
        layouts.set(layout.id, layout);
      }
    } catch (err: any) {
      errors.push(`Failed to parse layout JSON in ${layoutPath}: ${err.message}`);
    }
  }

  // 8. Parse and validate declared courses and their lessons
  const courses = new Map<string, CourseDefinition>();
  const lessons = new Map<string, LessonDefinition>();

  for (const coursePath of manifest.contents.courses) {
    const courseBytes = normalizedFiles.get(coursePath);
    if (!courseBytes) {
      errors.push(`Course referenced in manifest not found: ${coursePath}`);
      continue;
    }
    try {
      const course: CourseDefinition = JSON.parse(textDecoder.decode(courseBytes));
      if (!course.id || !Array.isArray(course.levels)) {
        errors.push(`Course file '${coursePath}' missing id or levels`);
        continue;
      }
      courses.set(course.id, course);

      // Resolve lessons inside this course relative to course directory
      const courseDir = coursePath.includes('/') ? coursePath.substring(0, coursePath.lastIndexOf('/')) : '';

      for (const level of course.levels) {
        if (!Array.isArray(level.lessons)) continue;
        for (const relLessonPath of level.lessons) {
          const fullLessonPath = courseDir ? `${courseDir}/${relLessonPath}` : relLessonPath;
          const lessonBytes = normalizedFiles.get(fullLessonPath);
          if (!lessonBytes) {
            errors.push(`Lesson referenced in course '${course.id}' not found: ${fullLessonPath}`);
            continue;
          }
          try {
            const lesson: LessonDefinition = JSON.parse(textDecoder.decode(lessonBytes));
            if (!lesson.id || !Array.isArray(lesson.steps)) {
              errors.push(`Lesson file '${fullLessonPath}' missing id or steps`);
            } else {
              lessons.set(lesson.id, lesson);
              lessons.set(fullLessonPath, lesson);
            }
          } catch (err: any) {
            errors.push(`Failed to parse lesson JSON in ${fullLessonPath}: ${err.message}`);
          }
        }
      }
    } catch (err: any) {
      errors.push(`Failed to parse course JSON in ${coursePath}: ${err.message}`);
    }
  }

  // Validate default layout and course exist
  if (!layouts.has(manifest.defaults.layout)) {
    warnings.push(`Default layout '${manifest.defaults.layout}' was not loaded from pack layouts`);
  }
  if (!courses.has(manifest.defaults.course)) {
    warnings.push(`Default course '${manifest.defaults.course}' was not loaded from pack courses`);
  }

  const valid = errors.length === 0;

  // Build Preview
  const preview: PackPreview = {
    id: manifest.id,
    name: manifest.name['en'] || Object.values(manifest.name)[0] || manifest.id,
    version: manifest.version,
    language: manifest.language,
    author: manifest.authors[0]?.name || 'Unknown Author',
    license: manifest.license,
    courseCount: courses.size,
    lessonCount: lessons.size / 2, // Divided because we stored both id and full path
    layoutCount: layouts.size,
    sizeBytes: buffer.length,
    verified: Boolean(manifest.checksums && Object.keys(manifest.checksums).length > 0),
  };

  const pack: LoadedPack | undefined = valid
    ? {
        manifest,
        licenseText,
        layouts,
        courses,
        lessons,
        rawFiles: normalizedFiles,
      }
    : undefined;

  return {
    pack,
    result: {
      valid,
      errors,
      warnings,
      manifest,
      preview,
    },
  };
}
