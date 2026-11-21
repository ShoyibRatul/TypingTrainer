import { segmentGraphemes } from './text/segmenter';
import { computeTypingMetrics, ComputedMetrics, KeystrokeInterval } from './metrics/calculator';

export type SessionStatus = 'idle' | 'running' | 'paused' | 'completed';

export interface SessionConfig {
  targetText: string;
  allowBackspace?: boolean;
  stopOnError?: boolean;
  charsPerWord?: number;
  locale?: string;
  durationSeconds?: number; // 0 or undefined = unlimited / text exhaustion mode
  autoLoop?: boolean;       // Automatically recycle text when duration is active
  onKeystroke?: (metrics: ComputedMetrics, currentGrapheme: string, isCorrect: boolean) => void;
  onTick?: (timeLeftSeconds: number, metrics: ComputedMetrics) => void;
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
  private timerId: number | null = null;
  private completedLoops: number = 0;

  constructor(config: SessionConfig) {
    this.config = {
      allowBackspace: true,
      stopOnError: false,
      charsPerWord: 5,
      locale: 'en',
      durationSeconds: 0,
      autoLoop: true,
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

  public getCompletedLoops(): number {
    return this.completedLoops;
  }

  public getTimeLeft(): number {
    if (!this.config.durationSeconds || this.config.durationSeconds <= 0) return 0;
    if (!this.startTime) return this.config.durationSeconds;
    const elapsed = (Date.now() - this.startTime) / 1000;
    return Math.max(0, Math.ceil(this.config.durationSeconds - elapsed));
  }

  public getProgressPercent(): number {
    if (this.config.durationSeconds && this.config.durationSeconds > 0) {
      if (!this.startTime) return 0;
      const elapsed = (Date.now() - this.startTime) / 1000;
      return Math.min(100, Math.round((elapsed / this.config.durationSeconds) * 100));
    }
    if (this.targetGraphemes.length === 0) return 100;
    return Math.min(100, Math.round((this.currentIndex / this.targetGraphemes.length) * 100));
  }

  public getKeyErrors(): Record<string, number> {
    return { ...this.keyErrors };
  }

  public getIntervals(): KeystrokeInterval[] {
    return [...this.intervals];
  }

  private startTimer(): void {
    if (this.timerId) clearInterval(this.timerId);
    if (!this.config.durationSeconds || this.config.durationSeconds <= 0) return;

    this.timerId = window.setInterval(() => {
      if (this.status !== 'running') return;
      const timeLeft = this.getTimeLeft();
      const metrics = this.getMetrics();
      this.config.onTick?.(timeLeft, metrics);

      if (timeLeft <= 0) {
        this.completeSession();
      }
    }, 250);
  }

  public completeSession(): void {
    if (this.status === 'completed') return;
    this.status = 'completed';
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    const metrics = this.getMetrics();
    this.config.onComplete?.(metrics);
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
      this.startTimer();
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

      const isTextExhausted = this.currentIndex >= this.targetGraphemes.length;

      // Handle continuous timed looping or completion
      if (isTextExhausted) {
        const isTimed = (this.config.durationSeconds || 0) > 0;
        const hasTimeLeft = this.getTimeLeft() > 0;

        if (isTimed && this.config.autoLoop && hasTimeLeft) {
          // Seamlessly loop text without stopping
          this.completedLoops++;
          this.currentIndex = 0;
          this.typedGraphemes = [];
          const metrics = this.getMetrics();
          this.config.onKeystroke?.(metrics, this.getCurrentExpected(), true);
          return { isCorrect: true, isComplete: false };
        } else {
          // Complete session (untimed text exhaustion or time expired)
          this.completeSession();
          return { isCorrect: true, isComplete: true };
        }
      }

      const metrics = this.getMetrics();
      this.config.onKeystroke?.(metrics, this.getCurrentExpected(), true);
      return { isCorrect: true, isComplete: false };
    } else {
      // Record error for the expected character
      this.keyErrors[expected] = (this.keyErrors[expected] || 0) + 1;

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
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
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
    this.completedLoops = 0;
  }

  public destroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
