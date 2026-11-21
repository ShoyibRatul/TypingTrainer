import { describe, it, expect } from 'vitest';
import { segmentGraphemes, normalizeNFC } from '../src/engine/text/segmenter';
import { computeTypingMetrics } from '../src/engine/metrics/calculator';
import { TypingSession } from '../src/engine/session';

describe('Typing Engine: Unicode & Segmenter', () => {
  it('correctly segments standard English text', () => {
    const text = 'Quick fox';
    const graphemes = segmentGraphemes(text);
    expect(graphemes).toEqual(['Q', 'u', 'i', 'c', 'k', ' ', 'f', 'o', 'x']);
    expect(graphemes.length).toBe(9);
  });

  it('normalizes text to Unicode NFC', () => {
    // 'e\u0301' (decomposed é) vs '\u00e9' (precomposed é)
    const decomposed = 'e\u0301';
    const normalized = normalizeNFC(decomposed);
    expect(normalized).toBe('é');
    expect(segmentGraphemes(decomposed).length).toBe(1);
  });
});

describe('Typing Engine: Metrics Calculator', () => {
  it('computes 100% accuracy and accurate WPM on perfect typing', () => {
    const now = Date.now();
    const intervals = [
      { char: 'h', code: 'KeyH', timestamp: now, latencyMs: 200, isCorrect: true },
      { char: 'e', code: 'KeyE', timestamp: now + 200, latencyMs: 200, isCorrect: true },
      { char: 'l', code: 'KeyL', timestamp: now + 400, latencyMs: 200, isCorrect: true },
      { char: 'l', code: 'KeyL', timestamp: now + 600, latencyMs: 200, isCorrect: true },
      { char: 'o', code: 'KeyO', timestamp: now + 800, latencyMs: 200, isCorrect: true },
    ];

    const metrics = computeTypingMetrics(intervals, 1000, 5); // 1 second for 5 chars = 1 word in 1 sec = 60 WPM
    expect(metrics.accuracy).toBe(100);
    expect(metrics.errors).toBe(0);
    expect(metrics.rawWpm).toBe(60);
    expect(metrics.wpm).toBe(60);
    expect(metrics.consistency).toBeGreaterThan(90);
  });

  it('computes accuracy penalty when errors are present', () => {
    const intervals = [
      { char: 'a', code: 'KeyA', timestamp: 100, latencyMs: 100, isCorrect: true },
      { char: 'b', code: 'KeyB', timestamp: 200, latencyMs: 100, isCorrect: false },
      { char: 'c', code: 'KeyC', timestamp: 300, latencyMs: 100, isCorrect: true },
      { char: 'd', code: 'KeyD', timestamp: 400, latencyMs: 100, isCorrect: true },
    ];

    const metrics = computeTypingMetrics(intervals, 2000, 5);
    expect(metrics.accuracy).toBe(75); // 3 correct out of 4 total
    expect(metrics.errors).toBe(1);
  });
});

describe('Typing Engine: Session State Machine', () => {
  it('advances on correct keystrokes and completes when finished', () => {
    let completed = false;
    const session = new TypingSession({
      targetText: 'test',
      onComplete: () => {
        completed = true;
      },
    });

    expect(session.getStatus()).toBe('idle');
    expect(session.getCurrentExpected()).toBe('t');

    // First key: 't'
    const res1 = session.handleKey('t', 'KeyT');
    expect(res1.isCorrect).toBe(true);
    expect(res1.isComplete).toBe(false);
    expect(session.getStatus()).toBe('running');
    expect(session.getCurrentExpected()).toBe('e');

    // Second key: 'e'
    session.handleKey('e', 'KeyE');
    expect(session.getCurrentExpected()).toBe('s');

    // Incorrect key: 'x'
    const resErr = session.handleKey('x', 'KeyX');
    expect(resErr.isCorrect).toBe(false);
    expect(session.getKeyErrors()['s']).toBe(1);
    expect(session.getCurrentExpected()).toBe('s');

    // Correct key: 's'
    session.handleKey('s', 'KeyS');
    expect(session.getCurrentExpected()).toBe('t');

    // Final key: 't'
    const resFinal = session.handleKey('t', 'KeyT');
    expect(resFinal.isCorrect).toBe(true);
    expect(resFinal.isComplete).toBe(true);
    expect(session.getStatus()).toBe('completed');
    expect(completed).toBe(true);
  });
});
