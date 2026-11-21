import React, { useState, useEffect, useRef } from 'react';
import { VirtualKeyboard } from './VirtualKeyboard';
import { useProfile } from '../context/ProfileContext';
import { soundEngine } from '../utils/audio';
import { TypingSession } from '../engine/session';
import { packRegistry } from '../engine/packs/registry';
import { LessonDefinition, LessonStep } from '../engine/packs/types';
import { ProgressRing } from './ui/ProgressRing';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Star,
  Zap,
  Target,
  ArrowRight,
  BookOpen,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Play,
  Award,
  Hash,
  Code,
  Sparkles,
  Clock,
} from 'lucide-react';

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  lessonIds: string[];
}

export const LessonView: React.FC = () => {
  const { activeProfile, recordLessonCompletion, recordKeyTelemetry } = useProfile();

  // Categories configuration (TypingMaster style 8 categories)
  const categories: CategoryItem[] = [
    {
      id: 'cat-home',
      title: 'Home Row Foundation',
      description: 'Master anchor keys A S D F J K L ; and spacebar flow',
      icon: BookOpen,
      lessonIds: [
        'fund-01-fj',
        'fund-02-dk',
        'fund-03-sl',
        'fund-04-a-semi',
        'fund-05-gh',
        'fund-06-home-mastery',
      ],
    },
    {
      id: 'cat-top',
      title: 'Top Row & Vowels',
      description: 'Upper reach training: Q W E R T Y U I O P',
      icon: Sparkles,
      lessonIds: [
        'fund-07-ei',
        'fund-08-ru',
        'fund-09-ty',
        'fund-10-op',
        'fund-11-qw',
        'fund-12-top-mastery',
      ],
    },
    {
      id: 'cat-bottom',
      title: 'Bottom Row Reaches',
      description: 'Lower diagonal stagger: Z X C V B N M , . /',
      icon: Target,
      lessonIds: [
        'fund-13-cm',
        'fund-14-vn',
        'fund-15-bx',
        'fund-16-z-slash',
        'fund-17-comma-period',
        'fund-18-alphabet-run',
      ],
    },
    {
      id: 'cat-shift',
      title: 'Shift & Capitals',
      description: 'Synchronized pinky shift coordination for uppercase words',
      icon: Zap,
      lessonIds: [
        'fund-19-left-shift',
        'fund-20-right-shift',
        'fund-21-mixed-caps',
        'fund-22-sentence-caps',
        'fund-23-acronyms',
        'fund-24-caps-speed',
      ],
    },
    {
      id: 'cat-numbers',
      title: 'Number Row & Dates',
      description: 'Top numerical row touch muscle memory: 1 through 0',
      icon: Hash,
      lessonIds: [
        'fund-25-num-47',
        'fund-26-num-38',
        'fund-27-num-29',
        'fund-28-num-10',
        'fund-29-num-dates',
        'fund-30-num-sprint',
      ],
    },
    {
      id: 'cat-symbols',
      title: 'Punctuation & Prose',
      description: 'Special symbols, quotes, hyphens, and multi-line paragraphs',
      icon: Award,
      lessonIds: [
        'fund-31-quotes-hyphens',
        'fund-32-parentheses-excl',
        'fund-33-symbols',
        'fund-34-paragraphs',
        'fund-35-grand-mastery',
      ],
    },
    {
      id: 'cat-speed',
      title: 'Speed Building',
      description: 'Advanced vocabulary, bigrams, trigrams, and endurance text drills',
      icon: Zap,
      lessonIds: [
        'speed-01-common-words',
        'speed-02-bigrams',
        'speed-03-trigrams',
        'speed-04-sentences',
        'speed-05-paragraphs',
        'speed-06-mixed-case',
        'speed-07-accuracy-drill',
        'speed-08-number-prose',
        'speed-09-professional',
        'speed-10-ultimate',
      ],
    },
    {
      id: 'cat-special-marks',
      title: 'Special Marks & Symbols',
      description: 'TypingMaster-inspired drills for colons, slashes, quotes, brackets, and arithmetic',
      icon: Sparkles,
      lessonIds: [
        'spec-01-colons-slashes',
        'spec-02-math-quotes',
        'spec-03-brackets-currency',
        'spec-04-braces-special',
        'spec-05-special-mastery',
      ],
    },
    {
      id: 'cat-numpad',
      title: 'Numeric Keypad',
      description: '10-key high-speed data entry and accounting rhythm',
      icon: Hash,
      lessonIds: [
        'numpad-01-home',
        'numpad-02-reaches',
        'numpad-03-zero-decimal',
        'numpad-04-speed-entry',
      ],
    },
    {
      id: 'cat-programmer',
      title: 'Programmer Syntax',
      description: 'Brackets, braces, operators, camelCase, JSX and code snippets',
      icon: Code,
      lessonIds: [
        'prog-01-delimiters',
        'prog-02-operators',
        'prog-03-casing',
        'prog-04-jsx-html',
        'prog-05-snippets',
      ],
    },
  ];

  const [activeCategoryId, setActiveCategoryId] = useState<string>('cat-home');
  const [activeLessonId, setActiveLessonId] = useState<string>('fund-01-fj');
  const [activeLesson, setActiveLesson] = useState<LessonDefinition | undefined>(() =>
    packRegistry.getLesson('fund-01-fj') || packRegistry.getLesson('001-home')
  );
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('typing_trainer_drill_duration');
      return saved ? parseInt(saved, 10) : 180; // Default 3 minutes like TypingMaster
    } catch {
      return 180;
    }
  });
  const [timeLeft, setTimeLeft] = useState<number>(180);

  // Drill Execution State
  const [session, setSession] = useState<TypingSession | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [currentExpected, setCurrentExpected] = useState<string>('');
  const [typedGraphemes, setTypedGraphemes] = useState<string[]>([]);
  const [lastActiveKey, setLastActiveKey] = useState<string>('');
  const [isLastKeyError, setIsLastKeyError] = useState<boolean>(false);
  const [liveWpm, setLiveWpm] = useState<number>(0);
  const [liveAccuracy, setLiveAccuracy] = useState<number>(100);
  const [mistakeCount, setMistakeCount] = useState<number>(0);

  // Focus mode & Results Modal
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [completedResult, setCompletedResult] = useState<{
    wpm: number;
    rawWpm: number;
    accuracy: number;
    errors: number;
    elapsedSeconds: number;
    stars: number;
  } | null>(null);

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcuts for the completion modal (Space/Enter → Continue, R → Retry, Esc → Exit)
  useEffect(() => {
    if (!completedResult) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        nextStepOrLesson();
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        resetDrill();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsPlaying(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [completedResult]);

  const activeStep: LessonStep =
    activeLesson?.steps[stepIndex] || { type: 'keys', items: ['ff jj ff jj'] };
  const targetText = activeStep.target || (activeStep.items && activeStep.items[0]) || '';

  const focusInput = () => {
    hiddenInputRef.current?.focus();
  };

  useEffect(() => {
    if (isPlaying) {
      resetDrill();
    }
  }, [activeLessonId, stepIndex, isPlaying, selectedDuration]);

  const startDrill = (lessonId: string) => {
    const l = packRegistry.getLesson(lessonId);
    if (l) {
      setActiveLessonId(lessonId);
      setActiveLesson(l);
      setStepIndex(0);
      setIsPlaying(true);
    }
  };

  const handleDurationChange = (seconds: number) => {
    setSelectedDuration(seconds);
    try {
      localStorage.setItem('typing_trainer_drill_duration', seconds.toString());
    } catch {}
  };

  const resetDrill = () => {
    if (!targetText) return;

    if (session) {
      session.destroy();
    }

    setTimeLeft(selectedDuration);

    const newSession = new TypingSession({
      targetText,
      durationSeconds: selectedDuration,
      autoLoop: true,
      onKeystroke: (metrics, nextGrapheme) => {
        setProgressPercent(newSession.getProgressPercent());
        setCurrentExpected(nextGrapheme);
        setTypedGraphemes(newSession.getTypedGraphemes());
        setMistakeCount(metrics.errors);
        setLiveWpm(metrics.wpm);
        setLiveAccuracy(metrics.accuracy);
      },
      onTick: (remainingSeconds, metrics) => {
        setTimeLeft(remainingSeconds);
        setProgressPercent(newSession.getProgressPercent());
        setLiveWpm(metrics.wpm);
        setLiveAccuracy(metrics.accuracy);
      },
      onComplete: (finalMetrics) => {
        const passReq = activeLesson?.pass || { minAccuracy: 90, minWpm: 15 };
        const minAcc = passReq.minAccuracy ?? (passReq as any).minAccuracyPercent ?? 90;
        let stars = 1;
        if (finalMetrics.accuracy >= 98 && finalMetrics.wpm >= passReq.minWpm * 1.3) {
          stars = 3;
        } else if (finalMetrics.accuracy >= minAcc) {
          stars = 2;
        }

        const result = {
          wpm: finalMetrics.wpm,
          rawWpm: finalMetrics.rawWpm,
          accuracy: finalMetrics.accuracy,
          errors: finalMetrics.errors,
          elapsedSeconds: finalMetrics.elapsedSeconds,
          stars,
        };

        setCompletedResult(result);
        soundEngine.playSuccess();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });

        // Record progress in repository
        recordLessonCompletion(activeLessonId, {
          wpm: result.wpm,
          rawWpm: result.rawWpm,
          cpm: finalMetrics.cpm,
          accuracy: result.accuracy,
          elapsedSeconds: result.elapsedSeconds,
          errors: result.errors,
          backspaceCount: 0,
          stars,
        });

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
    setLastActiveKey('');
    setIsLastKeyError(false);
    setLiveWpm(0);
    setLiveAccuracy(100);
    setMistakeCount(0);
    setCompletedResult(null);
    setTimeLeft(selectedDuration);
    setTimeout(focusInput, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setLastActiveKey(e.key);

    if (e.key === 'Escape') {
      setIsPlaying(false);
      return;
    }

    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
      return;
    }

    if (!session || session.getStatus() === 'completed') return;

    const soundProfile = activeProfile?.preferences.soundProfile || 'cherry-blue';
    const soundVolume = activeProfile?.preferences.soundVolume ?? 0.6;

    const res = session.handleKey(e.key, e.code);
    if (res.isCorrect) {
      setIsLastKeyError(false);
      soundEngine.playKeystroke(soundProfile, soundVolume);
    } else {
      setIsLastKeyError(true);
      soundEngine.playError(soundVolume);
    }
  };

  const nextStepOrLesson = () => {
    if (!activeLesson) return;
    if (stepIndex + 1 < activeLesson.steps.length) {
      setStepIndex((prev) => prev + 1);
    } else {
      // Find next lesson
      const activeCat = categories.find((c) => c.id === activeCategoryId);
      if (activeCat) {
        const currIdx = activeCat.lessonIds.indexOf(activeLessonId);
        if (currIdx + 1 < activeCat.lessonIds.length) {
          const nextId = activeCat.lessonIds[currIdx + 1];
          setActiveLessonId(nextId);
          setActiveLesson(packRegistry.getLesson(nextId));
          setStepIndex(0);
        } else {
          setIsPlaying(false);
        }
      }
    }
  };

  const currentCategory = categories.find((c) => c.id === activeCategoryId) || categories[0];
  const activeLessonMeta = packRegistry.getLesson(activeLessonId);
  const activeRecord = activeProfile?.stats.lessonScores[activeLessonId];

  // If in active typing player mode
  if (isPlaying) {
    return (
      <div className="w-full h-full flex flex-col justify-between py-2 select-none relative">
        <input
          ref={hiddenInputRef}
          type="text"
          onKeyDown={handleKeyDown}
          className="opacity-0 absolute -z-50 pointer-events-none"
          autoFocus
        />

        {/* Top Player Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(false)}
              className="px-2.5 py-1 rounded-sm bg-surface-2 hover:bg-surface-2/80 text-xs text-txt-muted hover:text-txt border border-border transition-colors cursor-pointer"
            >
              &larr; Exit (Esc)
            </button>
            <div>
              <span className="text-[10px] font-mono text-accent uppercase font-bold tracking-wider">
                Step {stepIndex + 1} of {activeLesson?.steps.length || 1}
              </span>
              <h2 className="text-sm font-bold text-txt">
                {activeLesson?.title['en'] || activeLessonId}
              </h2>
            </div>
          </div>

          {/* Calm Live Metrics */}
          <div className="flex items-center gap-5 font-mono text-xs">
            {/* Duration Selector Tabs */}
            <div className="flex items-center gap-1 bg-surface-2 p-0.5 rounded-sm border border-border">
              {[
                { label: '1m', sec: 60 },
                { label: '2m', sec: 120 },
                { label: '3m', sec: 180 },
                { label: '5m', sec: 300 },
                { label: '∞', sec: 0 },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleDurationChange(opt.sec)}
                  className={`px-1.5 py-0.5 rounded-sm text-[10px] font-semibold transition-colors cursor-pointer ${
                    selectedDuration === opt.sec
                      ? 'bg-accent text-on-accent'
                      : 'text-txt-muted hover:text-txt'
                  }`}
                  title={opt.sec === 0 ? 'Unlimited completion mode' : `${opt.label} timed drill`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Countdown or Duration indicator */}
            {selectedDuration > 0 && (
              <div className="flex items-center gap-1.5 text-accent font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span className="font-bold text-txt">{liveWpm}</span>
              <span className="text-[10px] text-txt-muted">WPM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-accent" />
              <span className="font-bold text-txt">{liveAccuracy}%</span>
              <span className="text-[10px] text-txt-muted">ACC</span>
            </div>
            <div className="flex items-center gap-1">
              <span className={`font-bold ${mistakeCount > 0 ? 'text-danger' : 'text-txt-muted'}`}>
                {mistakeCount}
              </span>
              <span className="text-[10px] text-txt-muted">ERR</span>
            </div>
            <button
              onClick={() => setIsFocusMode(!isFocusMode)}
              className="p-1 rounded-sm text-txt-muted hover:text-txt hover:bg-surface-2"
              title={isFocusMode ? 'Exit Full Focus' : 'Full Focus'}
            >
              {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Thin Green Progress Thread */}
        <div className="w-full h-1 bg-surface-2 rounded-full overflow-hidden my-2">
          <div
            className="h-full bg-accent transition-all duration-150 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Center: Signature Big Typing Text Display */}
        <div
          onClick={focusInput}
          className="my-auto py-12 px-8 bg-surface rounded-md border border-border flex flex-col justify-center items-center text-center cursor-text min-h-[220px]"
        >
          <div className="text-3xl font-mono leading-relaxed tracking-wider max-w-3xl">
            {/* Typed characters */}
            {typedGraphemes.map((char, idx) => (
              <span key={idx} className="text-accent font-semibold">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}

            {/* Active Caret */}
            {session && session.getStatus() !== 'completed' && (
              <span className="relative inline-block">
                <span className="inline-block w-0.5 h-7 bg-accent animate-caret align-middle mx-0.5" />
                <span className="text-txt underline decoration-accent decoration-2 underline-offset-4">
                  {currentExpected === ' ' ? '\u00A0' : currentExpected}
                </span>
              </span>
            )}

            {/* Remaining untyped text */}
            {session && (
              <span className="text-txt-muted/40 font-normal">
                {targetText.slice(typedGraphemes.length + 1)}
              </span>
            )}
          </div>
        </div>

        {/* Bottom: Signature Virtual Keyboard */}
        <div className="pt-3">
          <VirtualKeyboard
            targetChar={currentExpected}
            activeKey={lastActiveKey}
            isError={isLastKeyError}
          />
        </div>

        {/* Completed Modal */}
        {completedResult && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-md bg-surface border border-border rounded-md p-6 shadow-float space-y-5 animate-fadeIn">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-accent-soft text-accent mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-txt">Lesson Completed!</h3>
                <p className="text-xs text-txt-muted">
                  {completedResult.accuracy >= 90
                    ? 'Excellent precision! Muscle memory normalized.'
                    : 'Target threshold missed. Give it another repetition!'}
                </p>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-2 text-warning">
                {[...Array(3)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < completedResult.stars ? 'fill-warning text-warning' : 'text-border'
                    }`}
                  />
                ))}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-sm bg-surface-2 border border-border">
                  <span className="text-[10px] text-txt-muted uppercase font-mono">Speed</span>
                  <span className="text-base font-bold text-txt block">{completedResult.wpm} WPM</span>
                </div>
                <div className="p-2.5 rounded-sm bg-surface-2 border border-border">
                  <span className="text-[10px] text-txt-muted uppercase font-mono">Accuracy</span>
                  <span className="text-base font-bold text-txt block">{completedResult.accuracy}%</span>
                </div>
                <div className="p-2.5 rounded-sm bg-surface-2 border border-border">
                  <span className="text-[10px] text-txt-muted uppercase font-mono">Errors</span>
                  <span className="text-base font-bold text-txt block">{completedResult.errors}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={resetDrill}
                  className="flex-1 py-2 rounded-sm bg-surface-2 hover:bg-surface-2/80 text-txt text-xs font-semibold border border-border flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry (R)</span>
                </button>
                <button
                  onClick={nextStepOrLesson}
                  className="flex-1 py-2 rounded-sm bg-accent hover:bg-accent-hover text-on-accent text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Master-Detail Catalog View
  return (
    <div className="h-full flex gap-5 overflow-hidden">
      {/* Column 1: Category Tree (240px) */}
      <aside className="w-60 bg-surface rounded-md border border-border p-3 flex flex-col justify-between flex-shrink-0">
        <div>
          <div className="pb-3 mb-2 border-b border-border">
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-bold block">
              Curriculum Map
            </span>
            <h3 className="text-xs font-bold text-txt">Touch Typing Master Track</h3>
          </div>

          <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-14rem)] pr-1">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = cat.id === activeCategoryId;

              // compute completed in category
              const completedInCat = cat.lessonIds.filter(
                (id) => activeProfile?.stats.completedLessons?.includes(id)
              ).length;
              const catProgress = Math.round((completedInCat / cat.lessonIds.length) * 100);

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategoryId(cat.id);
                    if (cat.lessonIds.length > 0) {
                      setActiveLessonId(cat.lessonIds[0]);
                      setActiveLesson(packRegistry.getLesson(cat.lessonIds[0]));
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 h-[38px] rounded-sm text-left text-xs transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-surface-2 text-txt font-semibold border border-border'
                      : 'text-txt-muted hover:text-txt hover:bg-surface-2/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-accent' : 'text-txt-muted'}`} />
                    <span className="truncate">{cat.title}</span>
                  </div>
                  <ProgressRing progress={catProgress} size={18} strokeWidth={2} />
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3 bg-surface-2 rounded-sm border border-border text-[11px] text-txt-muted">
          <span>Completed: </span>
          <strong className="text-txt">{activeProfile?.stats.completedLessons?.length || 0}</strong>
          <span> / 59 total</span>
        </div>
      </aside>

      {/* Column 2: Lesson List Grid (Workspace Center) */}
      <main className="flex-1 flex flex-col gap-4 overflow-y-auto pr-1">
        {/* Banner with Elevation */}
        <div className="p-5 rounded-md bg-surface border border-border flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-sm bg-accent-soft text-accent text-[10px] font-bold uppercase font-mono">
                Category
              </span>
              <h1 className="text-lg font-bold text-txt">{currentCategory.title}</h1>
            </div>
            <p className="text-xs text-txt-muted mt-1">{currentCategory.description}</p>
          </div>

          <button
            onClick={() => startDrill(activeLessonId)}
            className="px-4 py-2 rounded-sm bg-accent hover:bg-accent-hover text-on-accent text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Start Practice</span>
          </button>
        </div>

        {/* Lesson Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentCategory.lessonIds.map((lessonId, index) => {
            const l = packRegistry.getLesson(lessonId);
            const isSelected = lessonId === activeLessonId;
            const score = activeProfile?.stats.lessonScores[lessonId];
            const isCompleted = !!score;

            return (
              <div
                key={lessonId}
                onClick={() => {
                  setActiveLessonId(lessonId);
                  setActiveLesson(l);
                }}
                className={`p-4 rounded-md transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-surface-2 border-2 border-accent shadow-float'
                    : 'bg-surface border border-border hover:border-txt-muted/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-sm text-xs font-bold flex items-center justify-center ${
                        isSelected
                          ? 'bg-accent text-on-accent'
                          : isCompleted
                          ? 'bg-accent-soft text-accent'
                          : 'bg-surface-2 text-txt-muted'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-txt leading-tight">
                        {l?.title['en'] || lessonId}
                      </h4>
                      <span className="text-[11px] text-txt-muted">
                        {l?.steps.length || 1} steps &bull; {l?.pass.minWpm || 15} WPM target
                      </span>
                    </div>
                  </div>

                  {score?.stars ? (
                    <div className="flex text-warning">
                      {[...Array(score.stars)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-warning" />
                      ))}
                    </div>
                  ) : (
                    <span className="text-[10px] text-txt-muted font-mono">Unranked</span>
                  )}
                </div>

                {/* Keys Introduced */}
                {l?.newKeys && l.newKeys.length > 0 && (
                  <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-border/50">
                    <span className="text-[10px] text-txt-muted font-mono">New:</span>
                    <div className="flex gap-1">
                      {l.newKeys.map((k) => (
                        <span
                          key={k}
                          className="px-1.5 py-0.5 rounded-sm bg-surface-2 border border-border text-[10px] font-mono font-bold text-accent"
                        >
                          {k.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Column 3: Inspector Panel (300px) */}
      <aside className="w-72 bg-surface rounded-md border border-border p-4 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-4">
          <div className="pb-3 border-b border-border">
            <span className="text-[10px] font-mono text-accent uppercase font-bold tracking-wider block">
              Lesson Inspector
            </span>
            <h3 className="text-sm font-bold text-txt mt-0.5">
              {activeLessonMeta?.title['en'] || activeLessonId}
            </h3>
            <p className="text-xs text-txt-muted mt-1">
              {activeLessonMeta?.objective['en'] || 'Standard touch typing practice exercise.'}
            </p>
          </div>

          {/* New Keys Introduced */}
          {activeLessonMeta?.newKeys && activeLessonMeta.newKeys.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold text-txt block mb-1.5">New Keycaps:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeLessonMeta.newKeys.map((k) => (
                  <span
                    key={k}
                    className="px-2.5 py-1 rounded-sm bg-surface-2 border-b-2 border-accent text-xs font-mono font-bold text-accent"
                  >
                    {k.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Pass Criteria */}
          <div className="p-3 rounded-sm bg-surface-2 border border-border space-y-1.5 text-xs">
            <span className="font-semibold text-txt block text-[11px] uppercase tracking-wider font-mono">
              Pass Standards
            </span>
            <div className="flex justify-between text-txt-muted">
              <span>Minimum Speed:</span>
              <strong className="text-txt">{activeLessonMeta?.pass.minWpm || 15} WPM</strong>
            </div>
            <div className="flex justify-between text-txt-muted">
              <span>Minimum Accuracy:</span>
              <strong className="text-txt">{activeLessonMeta?.pass.minAccuracy || 90}%</strong>
            </div>
          </div>

          {/* Personal Record */}
          {activeRecord ? (
            <div className="p-3 rounded-sm bg-surface-2 border border-border space-y-1 text-xs">
              <span className="font-semibold text-accent block text-[11px] uppercase tracking-wider font-mono">
                Personal Best
              </span>
              <div className="flex justify-between text-txt-muted">
                <span>Speed:</span>
                <strong className="text-txt">{activeRecord.wpm} WPM</strong>
              </div>
              <div className="flex justify-between text-txt-muted">
                <span>Accuracy:</span>
                <strong className="text-txt">{activeRecord.accuracy}%</strong>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-sm bg-surface-2/60 text-center text-xs text-txt-muted">
              Not yet practiced
            </div>
          )}
        </div>

        <button
          onClick={() => startDrill(activeLessonId)}
          className="w-full py-2.5 rounded-sm bg-accent hover:bg-accent-hover text-on-accent text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Start Drill (Enter)</span>
        </button>
      </aside>
    </div>
  );
};
