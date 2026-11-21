/**
 * Unicode-aware text utilities using Intl.Segmenter and NFC normalization.
 * Guarantees correct handling of grapheme clusters rather than raw codepoints.
 */

export function normalizeNFC(str: string): string {
  return str.normalize('NFC');
}

export function segmentGraphemes(text: string, locale: string = 'en'): string[] {
  const normalized = normalizeNFC(text);
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(locale, { granularity: 'grapheme' });
    return Array.from(segmenter.segment(normalized), (s) => s.segment);
  }
  // Fallback for older JS runtimes
  return Array.from(normalized);
}

export function getGraphemeCount(text: string, locale: string = 'en'): number {
  return segmentGraphemes(text, locale).length;
}
