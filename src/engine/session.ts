import { segmentGraphemes } from './text/segmenter';
import { computeTypingMetrics, ComputedMetrics, KeystrokeInterval } from './metrics/calculator';

export type SessionStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface SessionConfig {
  targetText: string;
  allowBackspace?: boolean;
  stopOnError?: boolean;
  charsPerWord?: number;
  locale?: string;
  onKeystroke?: (metrics: ComputedMetrics, currentGrapheme: string, isCorrect: boolean) => void;
  onComplete?: (finalMetrics: ComputedMetrics) => void;
}

export class TypingSession {
  private targetGraphemes: string[];
  private currentIndex: number = 0;
  private typedGraphemes: string[] = [];
  private status: SessionStatus = 'idle';
  private startTime: number | null = null;
  private lastKeyTime: number | null = null;
  private intervals: KeystrokeInterval[] = [];
  private keyErrors: Record<string, number> = {};
  private config: SessionConfig;

  constructor(config: SessionConfig) {
    this.config = {
      allowBackspace: true,
      stopOnError: false,
      charsPerWord: 5,
      locale: 'en',
      ...config,
    };
    this.targetGraphemes = segmentGraphemes(this.config.targetText, this.config.locale);
  }

  public getStatus(): SessionStatus {
    return this.status;
  }

  public getTargetGraphemes(): string[] {
    return this.targetGraphemes;
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  public getCurrentExpected(): string {
    return this.targetGraphemes[this.currentIndex] || '';
  }

  public getTypedGraphemes(): string[] {
    return this.typedGraphemes;
  }

  public getProgressPercent(): number {
    if (this.targetGraphemes.length === 0) return 100;
    return Math.min(100, Math.round((this.currentIndex / this.targetGraphemes.length) * 100));
  }

  public getKeyErrors(): Record<string, number> {
    return { ...this.keyErrors };
  }

  public getIntervals(): KeystrokeInterval[] {
    return [...this.intervals];
  }

  public handleKey(key: string, code: string): { isCorrect: boolean; isComplete: boolean } {
    if (this.status === 'completed') {
      return { isCorrect: false, isComplete: true };
    }

    const now = Date.now();

    // Start session on first input
    if (this.status === 'idle') {
      this.status = 'running';
      this.startTime = now;
      this.lastKeyTime = now;
    }

    const latency = this.lastKeyTime ? now - this.lastKeyTime : 0;
    this.lastKeyTime = now;

    // Handle backspace
    if (key === 'Backspace') {
      if (this.config.allowBackspace && this.currentIndex > 0) {
        this.currentIndex--;
        this.typedGraphemes.pop();
      }
      return { isCorrect: true, isComplete: false };
    }

    const expected = this.getCurrentExpected();
    const isCorrect = key === expected;

    this.intervals.push({
      char: expected,
      code,
      timestamp: now,
      latencyMs: latency,
      isCorrect,
    });

    if (isCorrect) {
      this.typedGraphemes.push(key);
      this.currentIndex++;

      const isComplete = this.currentIndex >= this.targetGraphemes.length;
      if (isComplete) {
        this.status = 'completed';
        const metrics = this.getMetrics();
        this.config.onComplete?.(metrics);
        return { isCorrect: true, isComplete: true };
      }

      const metrics = this.getMetrics();
      this.config.onKeystroke?.(metrics, this.getCurrentExpected(), true);
      return { isCorrect: true, isComplete: false };
    } else {
      // Record error for the expected character
      this.keyErrors[expected] = (this.keyErrors[expected] || 0) + 1;

      if (!this.config.stopOnError) {
        // If not stop-on-error, we can allow typing or stay on key
      }

      const metrics = this.getMetrics();
      this.config.onKeystroke?.(metrics, this.getCurrentExpected(), false);
      return { isCorrect: false, isComplete: false };
    }
  }

  public getMetrics(): ComputedMetrics {
    const elapsedMs = this.startTime ? Date.now() - this.startTime : 0;
    return computeTypingMetrics(this.intervals, elapsedMs, this.config.charsPerWord);
  }

  public reset(newText?: string): void {
    if (newText !== undefined) {
      this.config.targetText = newText;
      this.targetGraphemes = segmentGraphemes(newText, this.config.locale);
    }
    this.currentIndex = 0;
    this.typedGraphemes = [];
    this.status = 'idle';
    this.startTime = null;
    this.lastKeyTime = null;
    this.intervals = [];
    this.keyErrors = {};
  }
}
