import React, { useState, useEffect } from 'react';
import { Play, Flame, Target, Award, ArrowRight, Zap, TrendingUp, Sparkles, BookOpen } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';
import { ProgressRing } from './ui/ProgressRing';
import { ActiveTab } from '../types';

interface HomeViewProps {
  onNavigate: (tab: ActiveTab) => void;
  onContinueLesson: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onContinueLesson }) => {
  const { activeProfile } = useProfile();
  const stats = activeProfile?.stats;

  // Ambient Typing words animation
  const sampleWords = ['fast', 'rhythm', 'flow', 'precision', 'balance', 'mastery'];
  const [typedIndex, setTypedIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = sampleWords[typedIndex];
    if (charIndex < currentWord.length) {
      const timer = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 140);
      return () => clearTimeout(timer);
    } else {
      const pauseTimer = setTimeout(() => {
        setCharIndex(0);
        setTypedIndex((prev) => (prev + 1) % sampleWords.length);
      }, 2000);
      return () => clearTimeout(pauseTimer);
    }
  }, [charIndex, typedIndex]);

  const currentWord = sampleWords[typedIndex];
  const activeLetters = currentWord.slice(0, charIndex);
  const remainingLetters = currentWord.slice(charIndex);

  // Compute stats
  const completedLessonsCount = stats?.completedLessons?.length || 0;
  const totalLessons = 54; // built-in English pack (35 fundamentals + 10 speed + 4 numpad + 5 programmer)
  const progressPercent = Math.round((completedLessonsCount / totalLessons) * 100);

  // Recent best WPM
  const scores = Object.values(stats?.lessonScores || {});
  const bestWpm = scores.length > 0 ? Math.max(...scores.map((s: any) => s.wpm)) : 0;
  const avgAccuracy = scores.length > 0 ? Math.round(scores.reduce((a: number, b: any) => a + b.accuracy, 0) / scores.length) : 100;

  // Weak keys
  const weakKeys = Object.entries(stats?.keyErrors || {})
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 5)
    .map(([key]) => key);

  return (
    <div className="h-full flex flex-col gap-6 overflow-y-auto pr-2">
      {/* Top Ambient Typing Hero Centerpiece */}
      <div className="relative overflow-hidden rounded-md bg-surface p-7 border border-border flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-sm bg-accent-soft text-accent text-[11px] font-semibold tracking-wide uppercase flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Focus State
            </span>
            <span className="text-xs text-txt-muted">Ready to practice</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-txt">
            Welcome back, <span className="text-accent">{activeProfile?.name || 'Typist'}</span>
          </h1>

          <p className="text-xs text-txt-muted max-w-md">
            Maintain your daily rhythm. Keep your fingers stationed on the home row and glide through lessons with tactile precision.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={onContinueLesson}
              className="px-4 py-2 rounded-sm bg-accent hover:bg-accent-hover text-on-accent text-xs font-semibold flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Continue Training</span>
            </button>
            <button
              onClick={() => onNavigate('test')}
              className="px-3.5 py-2 rounded-sm bg-surface-2 hover:bg-surface-2/80 text-txt text-xs font-medium border border-border flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>1-Min Speed Test</span>
              <ArrowRight className="w-3 h-3 text-txt-muted" />
            </button>
          </div>
        </div>

        {/* Signature Ambient Caret Visual */}
        <div className="relative flex flex-col items-center justify-center p-6 bg-surface-2 rounded-md border border-border min-w-[280px]">
          <div className="text-[11px] font-mono text-txt-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-accent" />
            Ambient Caret Centerpiece
          </div>
          <div className="font-mono text-3xl font-bold tracking-wider flex items-center justify-center py-3">
            <span className="text-accent">{activeLetters}</span>
            <span className="w-0.5 h-8 bg-accent animate-caret inline-block mx-0.5" />
            <span className="text-txt-muted/30">{remainingLetters}</span>
          </div>
          <span className="text-[10px] text-txt-muted font-mono mt-1">
            flow &bull; accuracy &bull; speed
          </span>
        </div>
      </div>

      {/* Grid of Key Telemetry (Level 1 Elevation) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Progress Ring Card */}
        <div className="p-4 rounded-md bg-surface border border-border flex items-center gap-4">
          <ProgressRing progress={progressPercent} size={48} strokeWidth={4}>
            <span className="text-[10px] font-bold">{progressPercent}%</span>
          </ProgressRing>
          <div>
            <span className="text-[11px] text-txt-muted uppercase font-medium tracking-wider block">Course Progress</span>
            <span className="text-lg font-bold text-txt">
              {completedLessonsCount} <span className="text-xs text-txt-muted font-normal">/ {totalLessons} Lessons</span>
            </span>
          </div>
        </div>

        {/* Best WPM */}
        <div className="p-4 rounded-md bg-surface border border-border flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-sm bg-surface-2 flex items-center justify-center text-accent">
            <TrendingUp className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] text-txt-muted uppercase font-medium tracking-wider block">Top Speed</span>
            <span className="text-lg font-bold text-txt">
              {bestWpm} <span className="text-xs text-txt-muted font-normal">WPM</span>
            </span>
          </div>
        </div>

        {/* Average Accuracy */}
        <div className="p-4 rounded-md bg-surface border border-border flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-sm bg-surface-2 flex items-center justify-center text-accent">
            <Target className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] text-txt-muted uppercase font-medium tracking-wider block">Avg Accuracy</span>
            <span className="text-lg font-bold text-txt">
              {avgAccuracy}%
            </span>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="p-4 rounded-md bg-surface border border-border flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-sm bg-surface-2 flex items-center justify-center text-warning">
            <Flame className="w-5 h-5 stroke-[1.5]" />
          </div>
          <div>
            <span className="text-[11px] text-txt-muted uppercase font-medium tracking-wider block">Daily Streak</span>
            <span className="text-lg font-bold text-txt">
              3 <span className="text-xs text-txt-muted font-normal">Days</span>
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Quick Actions & Problem Keys */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Left 2 Cols: Course Overview */}
        <div className="md:col-span-2 p-5 rounded-md bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-semibold text-txt">Current Curriculum Roadmap</h2>
            </div>
            <button
              onClick={() => onNavigate('curriculum')}
              className="text-xs text-accent hover:underline flex items-center gap-1 font-medium"
            >
              <span>View All 8 Categories</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-sm bg-surface-2 border border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-accent text-on-accent text-xs font-bold flex items-center justify-center">1</span>
                <div>
                  <span className="text-xs font-semibold text-txt block">Home Row Fundamentals</span>
                  <span className="text-[11px] text-txt-muted">Master keys A S D F J K L ; and spacebar flow</span>
                </div>
              </div>
              <span className="text-xs text-accent font-medium">Ready</span>
            </div>

            <div className="p-3 rounded-sm bg-surface-2 border border-border flex items-center justify-between opacity-80">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-surface border border-border text-txt-muted text-xs font-bold flex items-center justify-center">2</span>
                <div>
                  <span className="text-xs font-semibold text-txt block">Top Row & Upper Reach</span>
                  <span className="text-[11px] text-txt-muted">Introduce Q W E R T Y U I O P</span>
                </div>
              </div>
              <span className="text-xs text-txt-muted font-medium">Next</span>
            </div>

            <div className="p-3 rounded-sm bg-surface-2 border border-border flex items-center justify-between opacity-80">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded bg-surface border border-border text-txt-muted text-xs font-bold flex items-center justify-center">3</span>
                <div>
                  <span className="text-xs font-semibold text-txt block">Bottom Row & Stagger Mechanics</span>
                  <span className="text-[11px] text-txt-muted">Master Z X C V B N M , . /</span>
                </div>
              </div>
              <span className="text-xs text-txt-muted font-medium">Locked</span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Problem Keys & Insights */}
        <div className="p-5 rounded-md bg-surface border border-border space-y-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-warning" />
            <h2 className="text-sm font-semibold text-txt">Weak Keys & Target Focus</h2>
          </div>

          <p className="text-xs text-txt-muted">
            Keys with the highest error frequency during recent sessions. Focused drills will normalize muscle memory.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {weakKeys.length > 0 ? (
              weakKeys.map((key) => (
                <div
                  key={key}
                  className="px-3 py-1.5 rounded-sm bg-surface-2 border border-border font-mono text-xs font-bold text-danger flex items-center gap-2"
                >
                  <span>{key.toUpperCase()}</span>
                  <span className="text-[10px] text-txt-muted">+{stats?.keyErrors?.[key] ?? 0} err</span>
                </div>
              ))
            ) : (
              <div className="p-3 rounded-sm bg-surface-2 text-center w-full">
                <span className="text-xs text-accent font-medium">No problem keys recorded yet!</span>
                <span className="text-[11px] text-txt-muted block mt-0.5">Complete a lesson to identify weak spots.</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-border">
            <button
              onClick={() => onNavigate('arcade')}
              className="w-full py-2 rounded-sm bg-surface-2 hover:bg-surface-2/80 text-xs font-medium text-txt border border-border transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Play Arcade to Warm Up</span>
              <ArrowRight className="w-3 h-3 text-txt-muted" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
