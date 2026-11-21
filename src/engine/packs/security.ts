/**
 * Universal Lesson Pack Security & Limits Validator
 * Enforces Zip-Slip protection, whitelist, zip-bomb guards, and text sanitization.
 */

export const MAX_COMPRESSED_BYTES = 50 * 1024 * 1024; // 50 MB
export const MAX_UNCOMPRESSED_BYTES = 200 * 1024 * 1024; // 200 MB
export const MAX_FILE_ENTRIES = 5000;
export const MAX_COMPRESSION_RATIO = 100; // 100:1 ratio limit

export const ALLOWED_EXTENSIONS = new Set([
  '.json',
  '.txt',
  '.md',
  '.woff2',
  '.ttf',
  '.otf',
  '.png',
  '.webp',
  '.svg',
  'license',
]);

const WINDOWS_RESERVED_NAMES = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\..*)?$/i;

// Bidi control and override codepoints (U+202A-U+202E, U+2066-U+2069)
const BIDI_OVERRIDE_REGEX = /[\u202A-\u202E\u2066-\u2069]/g;

// Control characters except newline, carriage return, tab
const DANGEROUS_CONTROL_CHARS_REGEX = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g;

export interface PathSecurityCheckResult {
  safe: boolean;
  normalizedPath: string;
  error?: string;
}

/**
 * Validates a file entry path inside a pack archive for Zip-Slip and forbidden patterns.
 */
export function validateEntryPath(rawPath: string): PathSecurityCheckResult {
  if (!rawPath || rawPath.trim().length === 0) {
    return { safe: false, normalizedPath: '', error: 'Empty path' };
  }

  // Replace backslashes with forward slashes
  const path = rawPath.replace(/\\/g, '/');

  // Reject absolute paths
  if (path.startsWith('/') || /^[a-zA-Z]:/.test(path)) {
    return { safe: false, normalizedPath: path, error: `Absolute paths are forbidden: ${path}` };
  }

  // Segment analysis
  const segments = path.split('/');
  for (const segment of segments) {
    if (segment === '..') {
      return { safe: false, normalizedPath: path, error: `Path traversal '..' is forbidden: ${path}` };
    }
    if (WINDOWS_RESERVED_NAMES.test(segment)) {
      return { safe: false, normalizedPath: path, error: `Reserved device name is forbidden: ${segment}` };
    }
  }

  // Extension check (ignoring directory markers)
  if (!path.endsWith('/')) {
    const filename = segments[segments.length - 1];
    const isLicenseFile = filename.toUpperCase() === 'LICENSE';

    if (!isLicenseFile) {
      const extMatch = filename.match(/\.[a-zA-Z0-9]+$/);
      if (!extMatch) {
        return { safe: false, normalizedPath: path, error: `Missing file extension: ${path}` };
      }
      const ext = extMatch[0].toLowerCase();
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        return { safe: false, normalizedPath: path, error: `Forbidden file extension '${ext}': ${path}` };
      }
    }
  }

  return { safe: true, normalizedPath: path };
}

/**
 * Strips dangerous bidi overrides and non-printable control characters from text.
 */
export function sanitizePackText(input: string): string {
  if (!input) return '';
  return input
    .replace(BIDI_OVERRIDE_REGEX, '')
    .replace(DANGEROUS_CONTROL_CHARS_REGEX, '');
}

/**
 * Checks if a string contains bidi override characters.
 */
export function containsBidiOverrides(input: string): boolean {
  return BIDI_OVERRIDE_REGEX.test(input);
}
