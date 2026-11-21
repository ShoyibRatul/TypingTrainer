import React, { useState, useEffect, useRef } from 'react';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { Exercise, Lesson, TypingResult } from '../types';
import { VirtualKeyboard } from './VirtualKeyboard';
import { HandGuide } from './HandGuide';
import { useProfile } from '../context/ProfileContext';
import { soundEngine } from '../utils/audio';
import { TypingSession } from '../engine/session';
import confetti from 'canvas-confetti';
import { ChevronRight, RotateCcw, Star, Award, Zap, Target } from 'lucide-react';
import { Button } from './ui/Button';

export const LessonView: React.FC = () => {
  const { activeProfile, recordLessonCompletion, recordKeyTelemetry } = useProfile();

  const [selectedLesson, setSelectedLesson] = useState<Lesson>(CURRICULUM_MODULES[0].lessons[0]);
  const [exerciseIndex, setExerciseIndex] = useState<number>(0);

  const [session, setSession] = useState<TypingSession | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [currentExpected, setCurrentExpected] = useState<string>('');
  const [typedGraphemes, setTypedGraphemes] = useState<string[]>([]);
  const [lastActiveKey, setLastActiveKey] = useState<string>('');
  const [mistakeCount, setMistakeCount] = useState<number>(0);
  const [completedResult, setCompletedResult] = useState<TypingResult | null>(null);

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const activeExercise: Exercise = selectedLesson.exercises[exerciseIndex] || selectedLesson.exercises[0];
  const targetText = activeExercise.content;
  const currentFinger = activeExercise.targetFingers[0] || 4;

  const focusInput = () => {
    hiddenInputRef.current?.focus();
  };

  useEffect(() => {
    resetExercise();
  }, [selectedLesson, exerciseIndex]);

  const resetExercise = () => {
    const newSession = new TypingSession({
      targetText,
      onKeystroke: (metrics, nextGrapheme) => {
        setProgressPercent(newSession.getProgressPercent());
        setCurrentExpected(nextGrapheme);
        setTypedGraphemes(newSession.getTypedGraphemes());
        setMistakeCount(metrics.errors);
      },
      onComplete: (finalMetrics) => {
        let stars = 1;
        if (finalMetrics.accuracy >= 98 && finalMetrics.wpm >= 25) stars = 3;
        else if (finalMetrics.accuracy >= 94) stars = 2;

        const result: TypingResult = {
          wpm: finalMetrics.wpm,
          rawWpm: finalMetrics.rawWpm,
          cpm: finalMetrics.cpm,
          accuracy: finalMetrics.accuracy,
          elapsedSeconds: finalMetrics.elapsedSeconds,
          errors: finalMetrics.errors,
          backspaceCount: 0,
          stars,
        };

        setCompletedResult(result);
        soundEngine.playSuccess();
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });

        recordLessonCompletion(selectedLesson.id, result);
        const intervals = newSession.getIntervals();
        const latenciesMap: Record<string, number> = {};
        intervals.forEach((i) => {
          if (i.isCorrect) latenciesMap[i.char] = i.latencyMs;
        });
        recordKeyTelemetry(newSession.getKeyErrors(), latenciesMap);
      },
    });

    setSession(newSession);
    setProgressPercent(0);
    setCurrentExpected(newSession.getCurrentExpected());
    setTypedGraphemes([]);
    setMistakeCount(0);
    setCompletedResult(null);
    setTimeout(focusInput, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setLastActiveKey(e.key);

    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
      return;
    }

    if (!session || session.getStatus() === 'completed') return;

    const soundProfile = activeProfile?.preferences.soundProfile || 'cherry-blue';
    const soundVolume = activeProfile?.preferences.soundVolume ?? 0.6;

    const res = session.handleKey(e.key, e.code);
    if (res.isCorrect) {
      soundEngine.playKeystroke(soundProfile, soundVolume);
    } else {
      soundEngine.playError(soundVolume);
    }
  };

  const nextExercise = () => {
    if (exerciseIndex + 1 < selectedLesson.exercises.length) {
      setExerciseIndex((prev) => prev + 1);
    } else {
      const allLessons = CURRICULUM_MODULES.flatMap((m) => m.lessons);
      const currIdx = allLessons.findIndex((l) => l.id === selectedLesson.id);
      if (currIdx + 1 < allLessons.length) {
        setSelectedLesson(allLessons[currIdx + 1]);
        setExerciseIndex(0);
      }
    }
  };

  const targetGraphemes = session ? session.getTargetGraphemes() : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5">
      {/* Top Banner: Module & Lesson Picker */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface p-4 rounded-card border border-border shadow-sm">
        <div>
          <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">
            English QWERTY Curriculum
          </span>
          <h2 className="text-lg font-bold text-txt mt-0.5">{selectedLesson.title}</h2>
          <p className="text-xs text-txt-muted mt-0.5 max-w-xl">{selectedLesson.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedLesson.id}
            onChange={(e) => {
              const found = CURRICULUM_MODULES.flatMap((m) => m.lessons).find((l) => l.id === e.target.value);
              if (found) {
                setSelectedLesson(found);
                setExerciseIndex(0);
              }
            }}
            className="bg-surface-2 border border-border text-txt text-xs font-medium rounded-btn px-3 py-1.5 focus:border-accent focus:outline-none"
          >
            {CURRICULUM_MODULES.map((m) => (
              <optgroup key={m.id} label={`${m.title} (${m.level})`}>
                {m.lessons.map((l) => (
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
        <div className="flex items-center gap-1.5">
          {selectedLesson.exercises.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => setExerciseIndex(idx)}
              className={`px-3 py-1.5 rounded-btn text-xs font-medium transition-colors ${
                idx === exerciseIndex
                  ? 'bg-accent text-white font-semibold shadow-sm'
                  : 'bg-surface-2 text-txt-muted hover:text-txt'
              }`}
            >
              <span>Part {idx + 1}</span>
              <span className="text-[10px] opacity-75 hidden sm:inline ml-1">({ex.type})</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="text-txt-muted flex items-center gap-1">
            <Target className="w-3.5 h-3.5 text-danger" /> Mistakes: <span className="text-danger font-semibold">{mistakeCount}</span>
          </span>
          <span className="text-txt-muted flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-accent" /> Progress: <span className="text-txt font-semibold">{progressPercent}%</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Typing Canvas */}
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

        <div className="mb-4 text-xs text-txt-muted bg-surface-2 border border-border px-3.5 py-2 rounded-btn flex items-center justify-between">
          <span>💡 {activeExercise.instructions}</span>
          <span className="text-[10px] text-txt-muted italic">Click & type</span>
        </div>

        {/* Text Display Stream */}
        <div className="font-mono text-2xl sm:text-3xl tracking-wide leading-relaxed p-6 bg-surface-2 rounded-btn border border-border min-h-[130px] flex flex-wrap items-center">
          {targetGraphemes.map((char, index) => {
            const isTyped = index < typedGraphemes.length;
            const isCurrent = index === typedGraphemes.length;

            return (
              <span
                key={index}
                className={`relative inline-block transition-colors duration-75 ${
                  isTyped
                    ? 'text-accent font-medium'
                    : isCurrent
                    ? 'text-accent font-bold bg-accent-soft px-1 rounded-sm ring-1 ring-accent'
                    : 'text-txt-muted/50'
                }`}
              >
                {char === ' ' ? '␣' : char}
                {isCurrent && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"></span>
                )}
              </span>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-txt-muted">
          <Button variant="ghost" size="sm" onClick={resetExercise}>
            <RotateCcw className="w-3.5 h-3.5" /> Restart Part
          </Button>

          <span className="text-[11px]">
            Target Keys: <span className="font-mono text-txt font-bold">{activeExercise.targetKeys.join(' ')}</span>
          </span>
        </div>
      </div>

      {activeProfile?.preferences.showHands && (
        <HandGuide activeFinger={currentFinger} />
      )}

      {activeProfile?.preferences.showKeyboard && (
        <VirtualKeyboard
          targetChar={currentExpected}
          activeKey={lastActiveKey}
          targetFinger={currentFinger}
        />
      )}

      {completedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface border border-border rounded-card p-6 max-w-sm w-full shadow-lg text-center space-y-5">
            <div className="w-12 h-12 rounded-full bg-accent-soft text-accent flex items-center justify-center mx-auto text-2xl">
              <Award className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-txt">Exercise Completed</h3>
              <p className="text-xs text-txt-muted mt-1">Muscle memory progress updated.</p>
            </div>

            <div className="flex justify-center gap-1.5">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className={`w-6 h-6 ${
                    s <= completedResult.stars ? 'text-warning fill-warning' : 'text-border'
                  }`}
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-surface-2 p-2.5 rounded-btn border border-border">
                <span className="text-[10px] text-txt-muted block">Net WPM</span>
                <span className="text-xl font-black text-accent font-mono">{completedResult.wpm}</span>
              </div>
              <div className="bg-surface-2 p-2.5 rounded-btn border border-border">
                <span className="text-[10px] text-txt-muted block">Accuracy</span>
                <span className="text-xl font-black text-txt font-mono">{completedResult.accuracy}%</span>
              </div>
              <div className="bg-surface-2 p-2.5 rounded-btn border border-border">
                <span className="text-[10px] text-txt-muted block">Raw WPM</span>
                <span className="text-xl font-black text-txt-muted font-mono">{completedResult.rawWpm}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <Button variant="outline" className="flex-1" onClick={resetExercise}>
                <RotateCcw className="w-3.5 h-3.5" /> Retry
              </Button>
              <Button
                variant="primary"
                className="flex-1"
                onClick={() => {
                  setCompletedResult(null);
                  nextExercise();
                }}
              >
                <span>Continue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
