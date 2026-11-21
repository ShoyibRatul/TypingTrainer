import React, { useState, useEffect, useRef } from 'react';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { Exercise, Lesson, TypingResult } from '../types';
import { VirtualKeyboard } from './VirtualKeyboard';
import { HandGuide } from './HandGuide';
import { useProfile } from '../context/ProfileContext';
import { soundEngine } from '../utils/audio';
import confetti from 'canvas-confetti';
import { ChevronRight, RotateCcw, Star, Award, Zap, Target } from 'lucide-react';

export const LessonView: React.FC = () => {
  const { activeProfile, recordLessonCompletion, recordKeyTelemetry } = useProfile();

  const [selectedLesson, setSelectedLesson] = useState<Lesson>(CURRICULUM_MODULES[0].lessons[0]);
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);
  const [inputBuffer, setInputBuffer] = useState<string>('');
  const [errorCount, setErrorCount] = useState<number>(0);
  const [lastActiveKey, setLastActiveKey] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completedResult, setCompletedResult] = useState<TypingResult | null>(null);

  // Fine-grained key metrics (errors and latency tracking)
  const lastKeyTimeRef = useRef<number>(Date.now());
  const keyErrorsRef = useRef<Record<string, number>>({});
  const keyLatenciesRef = useRef<Record<string, number>>({});

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const activeExercise: Exercise = selectedLesson.exercises[exerciseIndex] || selectedLesson.exercises[0];
  const targetText = activeExercise.content;
  const currentChar = targetText[inputBuffer.length] || '';
  const currentFinger = activeExercise.targetFingers[0] || 4;

  // Focus input automatically
  const focusInput = () => {
    hiddenInputRef.current?.focus();
  };

  useEffect(() => {
    resetExercise();
  }, [selectedLesson, exerciseIndex]);

  const resetExercise = () => {
    setInputBuffer('');
    setErrorCount(0);
    setStartTime(null);
    setCompletedResult(null);
    keyErrorsRef.current = {};
    keyLatenciesRef.current = {};
    setTimeout(focusInput, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setLastActiveKey(e.key);

    // Ignore modifier presses alone
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
      return;
    }

    if (!startTime) {
      setStartTime(Date.now());
    }

    const now = Date.now();
    const latency = now - lastKeyTimeRef.current;
    lastKeyTimeRef.current = now;

    const expected = targetText[inputBuffer.length];
    const soundProfile = activeProfile?.preferences.soundProfile || 'cherry-blue';
    const soundVolume = activeProfile?.preferences.soundVolume ?? 0.6;

    if (e.key === 'Backspace') {
      // allow backspace if desired, or skip
      return;
    }

    if (e.key === expected) {
      // Correct keystroke
      soundEngine.playKeystroke(soundProfile, soundVolume);

      // Track latency for this character
      keyLatenciesRef.current[expected] = latency;

      const nextBuffer = inputBuffer + e.key;
      setInputBuffer(nextBuffer);

      // Check if finished
      if (nextBuffer.length >= targetText.length) {
        finishExercise(nextBuffer, startTime ? (now - startTime) / 1000 : 1);
      }
    } else {
      // Incorrect keystroke
      soundEngine.playError(soundVolume);
      setErrorCount(prev => prev + 1);

      // Track error for expected character
      keyErrorsRef.current[expected] = (keyErrorsRef.current[expected] || 0) + 1;
    }
  };

  const finishExercise = (buffer: string, elapsedSecs: number) => {
    const words = buffer.length / 5;
    const minutes = Math.max(elapsedSecs / 60, 0.05);
    const rawWpm = Math.round(words / minutes);
    const accuracy = Math.max(0, Math.round(((buffer.length - errorCount) / buffer.length) * 100));
    const netWpm = Math.max(0, Math.round(rawWpm * (accuracy / 100)));
    const cpm = Math.round(buffer.length / minutes);

    let stars = 1;
    if (accuracy >= 98 && netWpm >= 25) stars = 3;
    else if (accuracy >= 94) stars = 2;

    const result: TypingResult = {
      wpm: netWpm,
      rawWpm,
      cpm,
      accuracy,
      elapsedSeconds: Math.round(elapsedSecs),
      errors: errorCount,
      backspaceCount: 0,
      stars,
    };

    setCompletedResult(result);
    soundEngine.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Record into user profile
    recordLessonCompletion(selectedLesson.id, result);
    recordKeyTelemetry(keyErrorsRef.current, keyLatenciesRef.current);
  };

  const nextExercise = () => {
    if (exerciseIndex + 1 < selectedLesson.exercises.length) {
      setExerciseIndex(prev => prev + 1);
    } else {
      // Find next lesson
      const allLessons = CURRICULUM_MODULES.flatMap(m => m.lessons);
      const currIdx = allLessons.findIndex(l => l.id === selectedLesson.id);
      if (currIdx + 1 < allLessons.length) {
        setSelectedLesson(allLessons[currIdx + 1]);
        setExerciseIndex(0);
      }
    }
  };

  const progressPercent = Math.round((inputBuffer.length / targetText.length) * 100);

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 space-y-6">
      {/* Top Banner: Module & Lesson Picker */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 backdrop-blur-sm p-4 rounded-2xl border border-slate-800">
        <div>
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Curriculum Navigator
          </span>
          <h2 className="text-xl font-bold text-slate-100 mt-0.5">{selectedLesson.title}</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">{selectedLesson.description}</p>
        </div>

        {/* Lesson selector dropdown / pills */}
        <div className="flex items-center gap-2">
          <select
            value={selectedLesson.id}
            onChange={(e) => {
              const found = CURRICULUM_MODULES.flatMap(m => m.lessons).find(l => l.id === e.target.value);
              if (found) {
                setSelectedLesson(found);
                setExerciseIndex(0);
              }
            }}
            className="bg-slate-950 border border-slate-700 text-slate-200 text-xs font-medium rounded-xl px-3 py-2 focus:border-indigo-500 focus:outline-none"
          >
            {CURRICULUM_MODULES.map(m => (
              <optgroup key={m.id} label={`${m.title} (${m.level})`}>
                {m.lessons.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

      {/* Exercise Step Indicators */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          {selectedLesson.exercises.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => setExerciseIndex(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                idx === exerciseIndex
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <span>Part {idx + 1}</span>
              <span className="text-[10px] opacity-75 hidden sm:inline">({ex.type})</span>
            </button>
          ))}
        </div>

        {/* Accuracy and Progress Ticker */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <span className="text-slate-400 flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-indigo-400" /> Errors: <span className="text-rose-400">{errorCount}</span>
          </span>
          <span className="text-slate-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> Progress: <span className="text-slate-200">{progressPercent}%</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Typing Canvas */}
      <div
        onClick={focusInput}
        className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl cursor-text transition-all duration-150 focus-within:border-indigo-500/80 focus-within:ring-2 focus-within:ring-indigo-500/20"
      >
        {/* Hidden Input field capturing real keystrokes */}
        <input
          ref={hiddenInputRef}
          type="text"
          className="absolute opacity-0 pointer-events-none"
          autoFocus
          onKeyDown={handleKeyDown}
        />

        {/* Instructions banner */}
        <div className="mb-4 text-xs text-indigo-300/80 bg-indigo-950/40 border border-indigo-500/20 px-4 py-2 rounded-xl flex items-center justify-between">
          <span>💡 {activeExercise.instructions}</span>
          <span className="text-[11px] text-slate-400 italic">Click here & start typing</span>
        </div>

        {/* Interactive Text Display Stream */}
        <div className="font-mono text-2xl sm:text-3xl tracking-wide leading-relaxed p-6 bg-slate-950/80 rounded-2xl border border-slate-800/80 min-h-[140px] flex flex-wrap items-center">
          {targetText.split('').map((char, index) => {
            const isTyped = index < inputBuffer.length;
            const isCurrent = index === inputBuffer.length;

            return (
              <span
                key={index}
                className={`relative inline-block transition-colors duration-75 ${
                  isTyped
                    ? 'text-emerald-400 font-medium'
                    : isCurrent
                    ? 'text-indigo-300 font-bold bg-indigo-500/30 px-1 rounded ring-1 ring-indigo-400 animate-pulse'
                    : 'text-slate-600'
                }`}
              >
                {char === ' ' ? '␣' : char}
                {isCurrent && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-indigo-400 animate-bounce"></span>
                )}
              </span>
            );
          })}
        </div>

        {/* Bottom controls */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={resetExercise}
            className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Restart Part
          </button>

          <span className="text-slate-500 text-[11px]">
            Target Keys: <span className="font-mono text-slate-300 font-bold">{activeExercise.targetKeys.join(' ')}</span>
          </span>
        </div>
      </div>

      {/* Visual Hand Ergonomic Guide */}
      {activeProfile?.preferences.showHands && (
        <HandGuide activeFinger={currentFinger} />
      )}

      {/* Vector Virtual Keyboard */}
      {activeProfile?.preferences.showKeyboard && (
        <VirtualKeyboard
          targetChar={currentChar}
          activeKey={lastActiveKey}
          targetFinger={currentFinger}
        />
      )}

      {/* Completed Modal */}
      {completedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 flex items-center justify-center mx-auto text-3xl shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-slate-100">Exercise Completed!</h3>
              <p className="text-xs text-slate-400 mt-1">Excellent progress! Your muscle memory is locking in.</p>
            </div>

            {/* Star Rating */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3].map(s => (
                <Star
                  key={s}
                  className={`w-7 h-7 ${
                    s <= completedResult.stars
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-slate-700'
                  }`}
                />
              ))}
            </div>

            {/* Score Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Net Speed</span>
                <span className="text-2xl font-black text-indigo-400 font-mono">{completedResult.wpm}</span>
                <span className="text-[10px] text-slate-500 block">WPM</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Accuracy</span>
                <span className="text-2xl font-black text-emerald-400 font-mono">{completedResult.accuracy}%</span>
                <span className="text-[10px] text-slate-500 block">{completedResult.errors} errors</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Raw Speed</span>
                <span className="text-2xl font-black text-slate-300 font-mono">{completedResult.rawWpm}</span>
                <span className="text-[10px] text-slate-500 block">WPM</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={resetExercise}
                className="flex-1 py-3 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> Try Again
              </button>
              <button
                onClick={() => {
                  setCompletedResult(null);
                  nextExercise();
                }}
                className="flex-1 py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition shadow-lg flex items-center justify-center gap-1.5"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
