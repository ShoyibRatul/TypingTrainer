import React, { useState, useEffect, useRef } from 'react';
import { VirtualKeyboard } from './VirtualKeyboard';
import { HandGuide } from './HandGuide';
import { useProfile } from '../context/ProfileContext';
import { soundEngine } from '../utils/audio';
import { TypingSession } from '../engine/session';
import { packRegistry } from '../engine/packs/registry';
import { CourseDefinition, LessonDefinition, LessonStep } from '../engine/packs/types';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Star,
  Award,
  Zap,
  Target,
  ArrowRight,
  BookOpen,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import { Button } from './ui/Button';

export const LessonView: React.FC = () => {
  const { activeProfile, recordLessonCompletion, recordKeyTelemetry } = useProfile();

  // Pack & Curriculum State
  const [course, setCourse] = useState<CourseDefinition | undefined>(() => packRegistry.getCourse());
  const [activeLessonId, setActiveLessonId] = useState<string>('lesson-1-anchor');
  const [activeLesson, setActiveLesson] = useState<LessonDefinition | undefined>(() =>
    packRegistry.getLesson('lesson-1-anchor')
  );
  const [stepIndex, setStepIndex] = useState<number>(0);

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

  // Level accordion expansion state
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({
    'level-1-home-row': true,
  });

  const hiddenInputRef = useRef<HTMLInputElement>(null);

  // Sync with pack changes
  useEffect(() => {
    const onPackChange = () => {
      const c = packRegistry.getCourse();
      setCourse(c);
      if (c && c.levels.length > 0 && c.levels[0].lessons.length > 0) {
        const firstLessonId = c.levels[0].lessons[0];
        setActiveLessonId(firstLessonId);
        setActiveLesson(packRegistry.getLesson(firstLessonId));
        setStepIndex(0);
      }
    };
    return packRegistry.subscribe(onPackChange);
  }, []);

  const activeStep: LessonStep =
    activeLesson?.steps[stepIndex] || { type: 'keys', target: 'ff jj ff jj' };
  const targetText = activeStep.target || '';

  const focusInput = () => {
    hiddenInputRef.current?.focus();
  };

  useEffect(() => {
    resetDrill();
  }, [activeLessonId, stepIndex]);

  const resetDrill = () => {
    if (!targetText) return;

    const newSession = new TypingSession({
      targetText,
      onKeystroke: (metrics, nextGrapheme) => {
        setProgressPercent(newSession.getProgressPercent());
        setCurrentExpected(nextGrapheme);
        setTypedGraphemes(newSession.getTypedGraphemes());
        setMistakeCount(metrics.errors);
        setLiveWpm(metrics.wpm);
        setLiveAccuracy(metrics.accuracy);
      },
      onComplete: (finalMetrics) => {
        const passReq = activeLesson?.pass || { minAccuracyPercent: 90, minWpm: 15 };
        let stars = 1;
        if (finalMetrics.accuracy >= 98 && finalMetrics.wpm >= passReq.minWpm * 1.3) {
          stars = 3;
        } else if (finalMetrics.accuracy >= passReq.minAccuracyPercent) {
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
      // Find next lesson in course
      if (course) {
        const allLessonIds = course.levels.flatMap((lvl) => lvl.lessons);
        const currIdx = allLessonIds.indexOf(activeLessonId);
        if (currIdx + 1 < allLessonIds.length) {
          const nextId = allLessonIds[currIdx + 1];
          setActiveLessonId(nextId);
          setActiveLesson(packRegistry.getLesson(nextId));
          setStepIndex(0);
        }
      }
    }
  };

  const toggleLevel = (levelId: string) => {
    setExpandedLevels((prev) => ({
      ...prev,
      [levelId]: !prev[levelId],
    }));
  };

  const selectLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setActiveLesson(packRegistry.getLesson(lessonId));
    setStepIndex(0);
  };

  const layout = packRegistry.getLayout();
  const targetKeyDef = Object.values(layout.keys).find(
    (def) => def.base === currentExpected || def.shift === currentExpected
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Hidden input for receiving clean keystrokes */}
      <input
        ref={hiddenInputRef}
        type="text"
        onKeyDown={handleKeyDown}
        className="opacity-0 absolute -z-50 pointer-events-none"
        autoFocus
      />

      {/* Main Workspace Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Course Navigation & Level Progress Tree (Hidden in Focus Mode) */}
        {!isFocusMode && (
          <aside className="w-full lg:w-72 bg-surface border border-border rounded-card p-4 shadow-sm flex flex-col gap-3">
            <div className="pb-3 border-b border-border">
              <span className="text-[10px] uppercase font-mono tracking-wider text-accent font-semibold block">
                Active Curriculum
              </span>
              <h3 className="font-bold text-sm text-txt flex items-center gap-1.5 mt-0.5">
                <BookOpen className="w-4 h-4 text-accent" />
                {course?.title['en'] || 'English QWERTY'}
              </h3>
              <p className="text-[11px] text-txt-muted mt-0.5 line-clamp-2">
                {course?.description['en'] || 'Standard touch typing curriculum.'}
              </p>
            </div>

            {/* Course Levels Tree */}
            <div className="space-y-2 max-h-[calc(100vh-22rem)] overflow-y-auto pr-1">
              {course?.levels.map((level) => {
                const isExpanded = expandedLevels[level.id] ?? false;

                return (
                  <div key={level.id} className="border border-border/60 rounded-btn overflow-hidden bg-surface-2/30">
                    <button
                      onClick={() => toggleLevel(level.id)}
                      className="w-full flex items-center justify-between p-2.5 text-left text-xs font-semibold text-txt hover:bg-surface-2 transition-colors"
                    >
                      <span className="truncate">{level.title['en'] || level.id}</span>
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-txt-muted" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-txt-muted" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="p-1 space-y-0.5 border-t border-border/40 bg-surface">
                        {level.lessons.map((lessonId) => {
                          const l = packRegistry.getLesson(lessonId);
                          const isCurrent = lessonId === activeLessonId;
                          const profileRecord = activeProfile?.stats.lessonScores[lessonId];
                          const stars = profileRecord?.stars || 0;

                          return (
                            <button
                              key={lessonId}
                              onClick={() => selectLesson(lessonId)}
                              className={`w-full flex items-center justify-between px-2.5 py-2 rounded-btn text-left text-xs transition-colors ${
                                isCurrent
                                  ? 'bg-accent-soft text-accent font-semibold'
                                  : 'hover:bg-surface-2 text-txt-muted hover:text-txt'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                {profileRecord ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                                ) : (
                                  <span className="w-1.5 h-1.5 rounded-full bg-border flex-shrink-0" />
                                )}
                                <span className="truncate">{l?.title['en'] || lessonId}</span>
                              </div>
                              {stars > 0 && (
                                <div className="flex text-warning">
                                  {[...Array(stars)].map((_, i) => (
                                    <Star key={i} className="w-2.5 h-2.5 fill-warning" />
                                  ))}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        {/* Right: Active Drill & Focus Canvas */}
        <main className="flex-1 space-y-5">
          {/* Header & Metrics Strip */}
          <div className="bg-surface border border-border rounded-card p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-accent-soft text-accent font-semibold">
                  Step {stepIndex + 1} of {activeLesson?.steps.length || 1}
                </span>
                <span className="text-[11px] text-txt-muted">
                  Type: <strong className="text-txt uppercase font-mono">{activeStep.type}</strong>
                </span>
              </div>
              <h2 className="text-base font-bold text-txt mt-1">
                {activeLesson?.title['en'] || 'Practice Exercise'}
              </h2>
            </div>

            <div className="flex items-center gap-5">
              {/* Calm Live Metrics */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-accent" />
                  <div>
                    <span className="text-txt font-bold">{liveWpm}</span>
                    <span className="text-txt-muted text-[10px] ml-1">WPM</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-accent" />
                  <div>
                    <span className="text-txt font-bold">{liveAccuracy}%</span>
                    <span className="text-txt-muted text-[10px] ml-1">ACC</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`font-bold ${mistakeCount > 0 ? 'text-danger' : 'text-txt-muted'}`}>{mistakeCount}</span>
                  <span className="text-txt-muted text-[10px]">ERR</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5">
                <Button variant="outline" size="sm" onClick={resetDrill} title="Restart Exercise">
                  <RotateCcw className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFocusMode(!isFocusMode)}
                  title={isFocusMode ? 'Exit Focus Mode' : 'Enter Focus Mode'}
                >
                  {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-surface-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-150 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Drill Typing Card */}
          <div
            onClick={focusInput}
            className="bg-surface border border-border rounded-card p-8 shadow-sm cursor-text min-h-[160px] flex flex-col justify-center items-center text-center relative overflow-hidden select-none"
          >
            <div className="text-2xl sm:text-3xl font-mono leading-relaxed tracking-wider max-w-3xl">
              {/* Typed graphemes */}
              {typedGraphemes.map((char, idx) => (
                <span key={idx} className="text-accent font-semibold">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}

              {/* Current Caret & Next Character */}
              {session && session.getStatus() !== 'completed' && (
                <span className="relative inline-block">
                  <span className="animate-pulse text-txt bg-accent-soft px-0.5 rounded border-b-2 border-accent">
                    {currentExpected === ' ' ? '\u00A0' : currentExpected}
                  </span>
                </span>
              )}

              {/* Remaining un-typed target text */}
              <span className="text-txt-muted/50">
                {targetText.slice(typedGraphemes.length + (currentExpected ? 1 : 0))}
              </span>
            </div>

            <p className="text-[11px] text-txt-muted mt-6">
              Click anywhere or press any key to focus. Rest fingers on <span className="font-mono text-txt">F</span> and{' '}
              <span className="font-mono text-txt">J</span>.
            </p>
          </div>

          {/* Virtual Keyboard (Rendered dynamically from layout JSON) */}
          <VirtualKeyboard
            targetChar={currentExpected}
            activeKey={lastActiveKey}
            isError={isLastKeyError}
          />

          {/* Hand Visualizer synced to required finger */}
          <HandGuide activeFinger={targetKeyDef?.finger} />
        </main>
      </div>

      {/* Mastery Results Sheet Modal */}
      {completedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-surface border border-border rounded-card w-full max-w-md shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-accent-soft text-accent flex items-center justify-center mx-auto">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-txt">Exercise Completed!</h3>
              <p className="text-xs text-txt-muted">
                {completedResult.stars >= 3
                  ? 'Mastery Level Achieved! Exceptional speed and rhythm.'
                  : completedResult.stars >= 2
                  ? 'Great performance! Your muscle memory is locking in.'
                  : 'Well done! Keep practicing to increase accuracy.'}
              </p>

              {/* Star Rating */}
              <div className="flex justify-center gap-1.5 pt-1 text-warning">
                {[1, 2, 3].map((starNum) => (
                  <Star
                    key={starNum}
                    className={`w-6 h-6 ${
                      starNum <= completedResult.stars ? 'fill-warning text-warning' : 'text-border fill-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-surface-2 rounded-btn text-center font-mono">
              <div>
                <span className="text-[10px] text-txt-muted uppercase block">Speed</span>
                <span className="text-xl font-bold text-accent">{completedResult.wpm}</span>
                <span className="text-[10px] text-txt-muted ml-1">WPM</span>
              </div>
              <div>
                <span className="text-[10px] text-txt-muted uppercase block">Accuracy</span>
                <span className="text-xl font-bold text-txt">{completedResult.accuracy}%</span>
              </div>
              <div>
                <span className="text-[10px] text-txt-muted uppercase block">Errors</span>
                <span className="text-sm font-semibold text-txt">{completedResult.errors}</span>
              </div>
              <div>
                <span className="text-[10px] text-txt-muted uppercase block">Duration</span>
                <span className="text-sm font-semibold text-txt">{completedResult.elapsedSeconds}s</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={resetDrill} className="flex-1">
                <RotateCcw className="w-3.5 h-3.5" /> Retry
              </Button>
              <Button variant="primary" size="sm" onClick={nextStepOrLesson} className="flex-1">
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
