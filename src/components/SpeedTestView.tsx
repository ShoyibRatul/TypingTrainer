import React, { useState, useEffect, useRef } from 'react';
import { useProfile } from '../context/ProfileContext';
import { soundEngine } from '../utils/audio';
import { TypingResult } from '../types';
import confetti from 'canvas-confetti';
import { Timer, Zap, Award, RotateCcw, Sparkles } from 'lucide-react';

const TEST_TEXTS = [
  {
    title: 'The Architecture of Open Source Software',
    content: 'Open source software represents a collaborative paradigm where code is made publicly accessible for inspection, modification, and enhancement. By empowering global communities of developers to scrutinize algorithms, fix vulnerabilities, and share improvements, open source fosters transparent innovation. From foundational operating system kernels to modern compilers and graphical user interfaces, collaborative engineering drives digital progress without commercial paywalls or vendor lock-in.'
  },
  {
    title: 'The Evolution of Mechanical Keyboards',
    content: 'The journey of the keyboard spans over a century, beginning with mechanical typewriters designed to prevent physical typebar jams. Today, modern touch typists celebrate tactile switches engineered with precision springs and stems. Touch typing is fundamentally an art of muscle memory, allowing the human mind to translate cognitive thoughts directly into digital expression without visual confirmation of individual keycaps.'
  },
  {
    title: 'Deep Space Exploration and Astronomy',
    content: 'Stargazers throughout human history have looked up at the night sky with wonder. Modern space observatories orbiting Earth capture photons traveling across billions of light years. As scientific instruments advance, we unlock the intricate mysteries of stellar birth, cosmic dust, planetary nebulae, and gravitational waves propagating across the cosmic fabric.'
  }
];

export const SpeedTestView: React.FC = () => {
  const { activeProfile, recordTestResult } = useProfile();

  const [selectedDuration, setSelectedDuration] = useState<number>(60); // 60, 120, 300 seconds
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
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 }
    });

    recordTestResult(currentTest.title, selectedDuration, result);
  };

  // Live real-time stats
  const elapsedSecs = selectedDuration - timeLeft;
  const liveWpm = elapsedSecs > 0 ? Math.round((inputBuffer.length / 5) / (elapsedSecs / 60)) : 0;
  const liveAccuracy = inputBuffer.length > 0 ? Math.max(0, Math.round(((inputBuffer.length - errorCount) / inputBuffer.length) * 100)) : 100;

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Header and Test Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Typing Certification & Speed Test
          </span>
          <h2 className="text-xl font-bold text-slate-100">{currentTest.title}</h2>
        </div>

        {/* Duration selector */}
        <div className="flex items-center gap-2">
          {[60, 120, 300].map(secs => (
            <button
              key={secs}
              disabled={isTestRunning}
              onClick={() => setSelectedDuration(secs)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedDuration === secs
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {secs / 60} Min
            </button>
          ))}

          <select
            value={selectedTextIdx}
            disabled={isTestRunning}
            onChange={(e) => setSelectedTextIdx(Number(e.target.value))}
            className="bg-slate-950 border border-slate-700 text-slate-300 text-xs rounded-xl px-3 py-1.5 focus:border-indigo-500 focus:outline-none"
          >
            {TEST_TEXTS.map((_, i) => (
              <option key={i} value={i}>
                Text #{i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Real-time Tickers */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center shadow-lg">
          <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
            <Timer className="w-4 h-4 text-indigo-400" /> Time Remaining
          </span>
          <span className="text-3xl font-black font-mono text-indigo-400 mt-1 block">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center shadow-lg">
          <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
            <Zap className="w-4 h-4 text-amber-400" /> Live Speed
          </span>
          <span className="text-3xl font-black font-mono text-amber-400 mt-1 block">
            {liveWpm} <span className="text-xs font-normal text-slate-500">WPM</span>
          </span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl text-center shadow-lg">
          <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
            <Award className="w-4 h-4 text-emerald-400" /> Accuracy
          </span>
          <span className="text-3xl font-black font-mono text-emerald-400 mt-1 block">
            {liveAccuracy}%
          </span>
        </div>
      </div>

      {/* Main Typing Canvas */}
      <div
        onClick={focusInput}
        className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl cursor-text focus-within:border-indigo-500"
      >
        <input
          ref={hiddenInputRef}
          type="text"
          className="absolute opacity-0 pointer-events-none"
          autoFocus
          onKeyDown={handleKeyDown}
        />

        <div className="font-mono text-xl sm:text-2xl tracking-wide leading-relaxed p-6 bg-slate-950/80 rounded-2xl border border-slate-800/80 min-h-[180px] select-none">
          {targetText.split('').map((char, index) => {
            const isTyped = index < inputBuffer.length;
            const isCurrent = index === inputBuffer.length;

            return (
              <span
                key={index}
                className={
                  isTyped
                    ? 'text-emerald-400'
                    : isCurrent
                    ? 'text-indigo-300 font-bold bg-indigo-500/30 px-1 rounded ring-1 ring-indigo-400'
                    : 'text-slate-600'
                }
              >
                {char}
              </span>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <span>Click text and start typing to initiate timer</span>
          <button
            onClick={startOrResetTest}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Test
          </button>
        </div>
      </div>

      {/* Completion Dialog */}
      {isFinished && testResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center mx-auto text-3xl shadow-lg">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-100">Speed Test Complete!</h3>
              <p className="text-xs text-slate-400 mt-1">Official certificate metrics saved to your profile</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Net WPM</span>
                <span className="text-3xl font-black text-indigo-400 font-mono">{testResult.wpm}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Accuracy</span>
                <span className="text-3xl font-black text-emerald-400 font-mono">{testResult.accuracy}%</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Raw WPM</span>
                <span className="text-2xl font-black text-slate-300 font-mono">{testResult.rawWpm}</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Errors</span>
                <span className="text-2xl font-black text-rose-400 font-mono">{testResult.errors}</span>
              </div>
            </div>

            <button
              onClick={startOrResetTest}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl transition shadow-lg"
            >
              Take Another Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
