import React, { useState, useEffect, useRef } from 'react';
import { useProfile } from '../context/ProfileContext';
import { soundEngine } from '../utils/audio';
import { TypingResult } from '../types';
import confetti from 'canvas-confetti';
import { Timer, Zap, Award, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';

const TEST_TEXTS = [
  {
    title: 'Touch Typing and Muscle Memory',
    content: 'Touch typing is fundamentally an art of muscle memory, allowing the human mind to translate cognitive thoughts directly into digital expression without visual confirmation of individual keycaps. By practicing deliberate finger placement and maintaining ergonomic wrist alignment, a typist builds neural pathways that accelerate speed and reduce cognitive fatigue.'
  },
  {
    title: 'The Philosophy of Open Source',
    content: 'Open source software represents a collaborative paradigm where code is made publicly accessible for inspection, modification, and enhancement. By empowering global communities of developers to scrutinize algorithms, fix vulnerabilities, and share improvements, open source fosters transparent innovation without commercial paywalls or vendor lock-in.'
  },
  {
    title: 'The Evolution of Computing Systems',
    content: 'From early mechanical calculating engines and room-sized vacuum tube mainframes to microscopic silicon semiconductors and distributed cloud networks, computing technology has continually reshaped human civilization. As hardware miniaturization advanced, software abstractions expanded, transforming raw electrical current into interactive computing platforms.'
  }
];

export const SpeedTestView: React.FC = () => {
  const { activeProfile, recordTestResult } = useProfile();

  const [selectedDuration, setSelectedDuration] = useState<number>(60);
  const [selectedTextIdx, setSelectedTextIdx] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const [inputBuffer, setInputBuffer] = useState<string>('');
  const [errorCount, setErrorCount] = useState<number>(0);
  const [testResult, setTestResult] = useState<TypingResult | null>(null);

  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  const currentTest = TEST_TEXTS[selectedTextIdx];
  const targetText = currentTest.content;

  const focusInput = () => {
    hiddenInputRef.current?.focus();
  };

  const startOrResetTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(selectedDuration);
    setInputBuffer('');
    setErrorCount(0);
    setIsTestRunning(false);
    setIsFinished(false);
    setTestResult(null);
    setTimeout(focusInput, 50);
  };

  useEffect(() => {
    startOrResetTest();
  }, [selectedDuration, selectedTextIdx]);

  useEffect(() => {
    if (isTestRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTestRunning, timeLeft]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isFinished) return;

    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
      return;
    }

    if (!isTestRunning) {
      setIsTestRunning(true);
    }

    const expected = targetText[inputBuffer.length];
    const soundProfile = activeProfile?.preferences.soundProfile || 'cherry-blue';
    const soundVolume = activeProfile?.preferences.soundVolume ?? 0.6;

    if (e.key === expected) {
      soundEngine.playKeystroke(soundProfile, soundVolume);
      const nextBuffer = inputBuffer + e.key;
      setInputBuffer(nextBuffer);

      if (nextBuffer.length >= targetText.length) {
        finishTest(nextBuffer);
      }
    } else {
      soundEngine.playError(soundVolume);
      setErrorCount(prev => prev + 1);
    }
  };

  const finishTest = (buffer: string = inputBuffer) => {
    setIsTestRunning(false);
    setIsFinished(true);

    const elapsed = selectedDuration - timeLeft || 1;
    const words = buffer.length / 5;
    const minutes = Math.max(elapsed / 60, 0.05);
    const rawWpm = Math.round(words / minutes);
    const accuracy = Math.max(0, Math.round(((buffer.length - errorCount) / Math.max(buffer.length, 1)) * 100));
    const netWpm = Math.max(0, Math.round(rawWpm * (accuracy / 100)));
    const cpm = Math.round(buffer.length / minutes);

    let stars = 1;
    if (accuracy >= 98 && netWpm >= 50) stars = 3;
    else if (accuracy >= 95 && netWpm >= 35) stars = 2;

    const result: TypingResult = {
      wpm: netWpm,
      rawWpm,
      cpm,
      accuracy,
      elapsedSeconds: elapsed,
      errors: errorCount,
      backspaceCount: 0,
      stars,
    };

    setTestResult(result);
    soundEngine.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.5 }
    });

    recordTestResult(currentTest.title, selectedDuration, result);
  };

  const elapsedSecs = selectedDuration - timeLeft;
  const liveWpm = elapsedSecs > 0 ? Math.round((inputBuffer.length / 5) / (elapsedSecs / 60)) : 0;
  const liveAccuracy = inputBuffer.length > 0 ? Math.max(0, Math.round(((inputBuffer.length - errorCount) / inputBuffer.length) * 100)) : 100;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5">
      {/* Header and Test Controls */}
      <div className="bg-surface border border-border rounded-card p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">
            English QWERTY Certification
          </span>
          <h2 className="text-lg font-bold text-txt">{currentTest.title}</h2>
        </div>

        {/* Duration selector */}
        <div className="flex items-center gap-2">
          {[60, 120, 300].map(secs => (
            <button
              key={secs}
              disabled={isTestRunning}
              onClick={() => setSelectedDuration(secs)}
              className={`px-3 py-1.5 rounded-btn text-xs font-semibold transition-colors ${
                selectedDuration === secs
                  ? 'bg-accent text-white shadow-sm'
                  : 'bg-surface-2 text-txt-muted hover:text-txt'
              }`}
            >
              {secs / 60} Min
            </button>
          ))}

          <select
            value={selectedTextIdx}
            disabled={isTestRunning}
            onChange={(e) => setSelectedTextIdx(Number(e.target.value))}
            className="bg-surface-2 border border-border text-txt text-xs rounded-btn px-2.5 py-1.5 focus:border-accent focus:outline-none"
          >
            {TEST_TEXTS.map((_, i) => (
              <option key={i} value={i}>
                Passage #{i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Real-time Tickers */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-surface border border-border p-3.5 rounded-card text-center shadow-sm">
          <span className="text-[11px] text-txt-muted flex items-center justify-center gap-1">
            <Timer className="w-3.5 h-3.5 text-accent" /> Time Remaining
          </span>
          <span className="text-2xl font-black font-mono text-txt mt-0.5 block">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>

        <div className="bg-surface border border-border p-3.5 rounded-card text-center shadow-sm">
          <span className="text-[11px] text-txt-muted flex items-center justify-center gap-1">
            <Zap className="w-3.5 h-3.5 text-warning" /> Speed
          </span>
          <span className="text-2xl font-black font-mono text-accent mt-0.5 block">
            {liveWpm} <span className="text-xs font-normal text-txt-muted">WPM</span>
          </span>
        </div>

        <div className="bg-surface border border-border p-3.5 rounded-card text-center shadow-sm">
          <span className="text-[11px] text-txt-muted flex items-center justify-center gap-1">
            <Award className="w-3.5 h-3.5 text-accent" /> Accuracy
          </span>
          <span className="text-2xl font-black font-mono text-txt mt-0.5 block">
            {liveAccuracy}%
          </span>
        </div>
      </div>

      {/* Main Typing Canvas */}
      <div
        onClick={focusInput}
        className="relative bg-surface border border-border rounded-card p-6 shadow-sm cursor-text focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-colors"
      >
        <input
          ref={hiddenInputRef}
          type="text"
          className="absolute opacity-0 pointer-events-none"
          autoFocus
          onKeyDown={handleKeyDown}
        />

        <div className="font-mono text-xl sm:text-2xl tracking-wide leading-relaxed p-6 bg-surface-2 rounded-btn border border-border min-h-[160px] select-none">
          {targetText.split('').map((char, index) => {
            const isTyped = index < inputBuffer.length;
            const isCurrent = index === inputBuffer.length;

            return (
              <span
                key={index}
                className={
                  isTyped
                    ? 'text-accent'
                    : isCurrent
                    ? 'text-accent font-bold bg-accent-soft px-0.5 rounded-sm ring-1 ring-accent'
                    : 'text-txt-muted/50'
                }
              >
                {char}
              </span>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-txt-muted">
          <span>Click text and type to start timer</span>
          <Button variant="ghost" size="sm" onClick={startOrResetTest}>
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>
      </div>

      {/* Completion Dialog */}
      {isFinished && testResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface border border-border rounded-card p-6 max-w-sm w-full shadow-lg text-center space-y-5">
            <div className="w-12 h-12 rounded-full bg-accent-soft text-accent flex items-center justify-center mx-auto text-2xl">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-txt">Test Complete</h3>
              <p className="text-xs text-txt-muted mt-1">Official score recorded to your profile history</p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-surface-2 p-3 rounded-btn border border-border">
                <span className="text-[10px] text-txt-muted block">Net Speed</span>
                <span className="text-2xl font-black text-accent font-mono">{testResult.wpm}</span>
                <span className="text-[10px] text-txt-muted block">WPM</span>
              </div>
              <div className="bg-surface-2 p-3 rounded-btn border border-border">
                <span className="text-[10px] text-txt-muted block">Accuracy</span>
                <span className="text-2xl font-black text-txt font-mono">{testResult.accuracy}%</span>
                <span className="text-[10px] text-txt-muted block">{testResult.errors} mistakes</span>
              </div>
            </div>

            <Button variant="primary" className="w-full" onClick={startOrResetTest}>
              Take Another Test
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
