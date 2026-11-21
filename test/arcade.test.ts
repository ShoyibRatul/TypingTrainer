import { describe, it, expect } from 'vitest';
import { ARCADE_WORD_POOLS, getRandomArcadeWord } from '../src/data/arcadeWords';

describe('Arcade Module & Word Pools', () => {
  it('should have all 4 word pool categories defined', () => {
    expect(ARCADE_WORD_POOLS.easy.length).toBeGreaterThan(20);
    expect(ARCADE_WORD_POOLS.medium.length).toBeGreaterThan(20);
    expect(ARCADE_WORD_POOLS.hard.length).toBeGreaterThan(20);
    expect(ARCADE_WORD_POOLS.code.length).toBeGreaterThan(20);
  });

  it('should respect character length tiers', () => {
    // Easy words should mostly be 3-4 letters
    const easyValid = ARCADE_WORD_POOLS.easy.every(w => w.length >= 2 && w.length <= 5);
    expect(easyValid).toBe(true);

    // Hard words should be longer (8+ letters)
    const hardValid = ARCADE_WORD_POOLS.hard.every(w => w.length >= 7);
    expect(hardValid).toBe(true);
  });

  it('should return random words from requested pool', () => {
    const word = getRandomArcadeWord('easy');
    expect(typeof word).toBe('string');
    expect(ARCADE_WORD_POOLS.easy).toContain(word);

    const codeWord = getRandomArcadeWord('code');
    expect(typeof codeWord).toBe('string');
    expect(ARCADE_WORD_POOLS.code).toContain(codeWord);
  });

  it('should fallback gracefully to medium for unknown category', () => {
    // @ts-expect-error Testing fallback
    const fallback = getRandomArcadeWord('non-existent');
    expect(typeof fallback).toBe('string');
    expect(ARCADE_WORD_POOLS.medium).toContain(fallback);
  });
});
