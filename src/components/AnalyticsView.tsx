import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import {
  TrendingUp,
  Clock,
  AlertTriangle,
  Award,
  Printer,
  Activity,
  Layers,
  CheckCircle2,
  X,
  Sparkles
} from 'lucide-react';
import { Button } from './ui/Button';

// Standard ANSI keyboard layout definition for analytics heatmap
interface KeyHeatmapDef {
  code: string;
  label: string;
  char: string;
  shiftChar?: string;
  finger: string;
  width?: string; // Tailwind width class
  hasBump?: boolean;
}

const HEATMAP_ROWS: KeyHeatmapDef[][] = [
  // Row 0 - Number Row
  [
    { code: 'Backquote', label: '`', char: '`', shiftChar: '~', finger: 'left-pinky', width: 'w-8' },
    { code: 'Digit1', label: '1', char: '1', shiftChar: '!', finger: 'left-pinky', width: 'w-8' },
    { code: 'Digit2', label: '2', char: '2', shiftChar: '@', finger: 'left-ring', width: 'w-8' },
    { code: 'Digit3', label: '3', char: '3', shiftChar: '#', finger: 'left-middle', width: 'w-8' },
    { code: 'Digit4', label: '4', char: '4', shiftChar: '$', finger: 'left-index', width: 'w-8' },
    { code: 'Digit5', label: '5', char: '5', shiftChar: '%', finger: 'left-index', width: 'w-8' },
    { code: 'Digit6', label: '6', char: '6', shiftChar: '^', finger: 'right-index', width: 'w-8' },
    { code: 'Digit7', label: '7', char: '7', shiftChar: '&', finger: 'right-index', width: 'w-8' },
    { code: 'Digit8', label: '8', char: '8', shiftChar: '*', finger: 'right-middle', width: 'w-8' },
    { code: 'Digit9', label: '9', char: '9', shiftChar: '(', finger: 'right-ring', width: 'w-8' },
    { code: 'Digit0', label: '0', char: '0', shiftChar: ')', finger: 'right-pinky', width: 'w-8' },
    { code: 'Minus', label: '-', char: '-', shiftChar: '_', finger: 'right-pinky', width: 'w-8' },
    { code: 'Equal', label: '=', char: '=', shiftChar: '+', finger: 'right-pinky', width: 'w-8' },
    { code: 'Backspace', label: 'Bksp', char: '', finger: 'right-pinky', width: 'w-14' },
  ],
  // Row 1 - Top Row
  [
    { code: 'Tab', label: 'Tab', char: '', finger: 'left-pinky', width: 'w-12' },
    { code: 'KeyQ', label: 'Q', char: 'q', shiftChar: 'Q', finger: 'left-pinky', width: 'w-8' },
    { code: 'KeyW', label: 'W', char: 'w', shiftChar: 'W', finger: 'left-ring', width: 'w-8' },
    { code: 'KeyE', label: 'E', char: 'e', shiftChar: 'E', finger: 'left-middle', width: 'w-8' },
    { code: 'KeyR', label: 'R', char: 'r', shiftChar: 'R', finger: 'left-index', width: 'w-8' },
    { code: 'KeyT', label: 'T', char: 't', shiftChar: 'T', finger: 'left-index', width: 'w-8' },
    { code: 'KeyY', label: 'Y', char: 'y', shiftChar: 'Y', finger: 'right-index', width: 'w-8' },
    { code: 'KeyU', label: 'U', char: 'u', shiftChar: 'U', finger: 'right-index', width: 'w-8' },
    { code: 'KeyI', label: 'I', char: 'i', shiftChar: 'I', finger: 'right-middle', width: 'w-8' },
    { code: 'KeyO', label: 'O', char: 'o', shiftChar: 'O', finger: 'right-ring', width: 'w-8' },
    { code: 'KeyP', label: 'P', char: 'p', shiftChar: 'P', finger: 'right-pinky', width: 'w-8' },
    { code: 'BracketLeft', label: '[', char: '[', shiftChar: '{', finger: 'right-pinky', width: 'w-8' },
    { code: 'BracketRight', label: ']', char: ']', shiftChar: '}', finger: 'right-pinky', width: 'w-8' },
    { code: 'Backslash', label: '\\', char: '\\', shiftChar: '|', finger: 'right-pinky', width: 'w-10' },
  ],
  // Row 2 - Home Row
  [
    { code: 'CapsLock', label: 'Caps', char: '', finger: 'left-pinky', width: 'w-14' },
    { code: 'KeyA', label: 'A', char: 'a', shiftChar: 'A', finger: 'left-pinky', width: 'w-8' },
    { code: 'KeyS', label: 'S', char: 's', shiftChar: 'S', finger: 'left-ring', width: 'w-8' },
    { code: 'KeyD', label: 'D', char: 'd', shiftChar: 'D', finger: 'left-middle', width: 'w-8' },
    { code: 'KeyF', label: 'F', char: 'f', shiftChar: 'F', finger: 'left-index', width: 'w-8', hasBump: true },
    { code: 'KeyG', label: 'G', char: 'g', shiftChar: 'G', finger: 'left-index', width: 'w-8' },
    { code: 'KeyH', label: 'H', char: 'h', shiftChar: 'H', finger: 'right-index', width: 'w-8' },
    { code: 'KeyJ', label: 'J', char: 'j', shiftChar: 'J', finger: 'right-index', width: 'w-8', hasBump: true },
    { code: 'KeyK', label: 'K', char: 'k', shiftChar: 'K', finger: 'right-middle', width: 'w-8' },
    { code: 'KeyL', label: 'L', char: 'l', shiftChar: 'L', finger: 'right-ring', width: 'w-8' },
    { code: 'Semicolon', label: ';', char: ';', shiftChar: ':', finger: 'right-pinky', width: 'w-8' },
    { code: 'Quote', label: "'", char: "'", shiftChar: '"', finger: 'right-pinky', width: 'w-8' },
    { code: 'Enter', label: 'Enter', char: '', finger: 'right-pinky', width: 'w-14' },
  ],
  // Row 3 - Bottom Row
  [
    { code: 'ShiftLeft', label: 'Shift', char: '', finger: 'left-pinky', width: 'w-16' },
    { code: 'KeyZ', label: 'Z', char: 'z', shiftChar: 'Z', finger: 'left-pinky', width: 'w-8' },
    { code: 'KeyX', label: 'X', char: 'x', shiftChar: 'X', finger: 'left-ring', width: 'w-8' },
    { code: 'KeyC', label: 'C', char: 'c', shiftChar: 'C', finger: 'left-middle', width: 'w-8' },
    { code: 'KeyV', label: 'V', char: 'v', shiftChar: 'V', finger: 'left-index', width: 'w-8' },
    { code: 'KeyB', label: 'B', char: 'b', shiftChar: 'B', finger: 'left-index', width: 'w-8' },
    { code: 'KeyN', label: 'N', char: 'n', shiftChar: 'N', finger: 'right-index', width: 'w-8' },
    { code: 'KeyM', label: 'M', char: 'm', shiftChar: 'M', finger: 'right-index', width: 'w-8' },
    { code: 'Comma', label: ',', char: ',', shiftChar: '<', finger: 'right-middle', width: 'w-8' },
    { code: 'Period', label: '.', char: '.', shiftChar: '>', finger: 'right-ring', width: 'w-8' },
    { code: 'Slash', label: '/', char: '/', shiftChar: '?', finger: 'right-pinky', width: 'w-8' },
    { code: 'ShiftRight', label: 'Shift', char: '', finger: 'right-pinky', width: 'w-16' },
  ],
  // Row 4 - Space Bar Row
  [
    { code: 'ControlLeft', label: 'Ctrl', char: '', finger: 'left-pinky', width: 'w-12' },
    { code: 'AltLeft', label: 'Alt', char: '', finger: 'left-thumb', width: 'w-10' },
    { code: 'Space', label: 'Space', char: ' ', finger: 'thumb', width: 'w-56' },
    { code: 'AltRight', label: 'Alt', char: '', finger: 'right-thumb', width: 'w-10' },
    { code: 'ControlRight', label: 'Ctrl', char: '', finger: 'right-pinky', width: 'w-12' },
  ]
];

export const AnalyticsView: React.FC = () => {
  const { activeProfile } = useProfile();

  const [heatmapMode, setHeatmapMode] = useState<'errors' | 'latency'>('errors');
  const [selectedKey, setSelectedKey] = useState<KeyHeatmapDef | null>(null);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  if (!activeProfile) return null;

  const stats = activeProfile.stats;
  const recentTests = stats.testHistory.slice(0, 10);
  const totalMinutes = Math.round(stats.totalTimeSeconds / 60);

  // Error statistics
  const sortedErrors = Object.entries(stats.keyErrors)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const maxErrors = Math.max(...Object.values(stats.keyErrors), 1);

  // Latency statistics
  const sortedLatencies = Object.entries(stats.keyLatencies)
    .map(([key, data]) => ({
      key,
      avgMs: Math.round(data.totalMs / Math.max(data.count, 1)),
      count: data.count,
    }))
    .sort((a, b) => b.avgMs - a.avgMs)
    .slice(0, 8);

  const bestWpm = stats.testHistory.reduce((max, t) => Math.max(max, t.wpm), 0);
  const averageWpm = stats.testHistory.length > 0
    ? Math.round(stats.testHistory.reduce((acc, t) => acc + t.wpm, 0) / stats.testHistory.length)
    : 0;

  // Finger Load Calculations
  const fingerKeyMap: Record<string, string[]> = {
    'left-pinky': ['1', '`', 'q', 'a', 'z'],
    'left-ring': ['2', 'w', 's', 'x'],
    'left-middle': ['3', 'e', 'd', 'c'],
    'left-index': ['4', '5', 'r', 't', 'f', 'g', 'v', 'b'],
    'thumb': [' '],
    'right-index': ['6', '7', 'y', 'u', 'h', 'j', 'n', 'm'],
    'right-middle': ['8', 'i', 'k', ','],
    'right-ring': ['9', 'o', 'l', '.'],
    'right-pinky': ['0', '-', '=', 'p', '[', ']', ';', "'", '/']
  };

  const fingerCounts: Record<string, number> = {
    'left-pinky': 0,
    'left-ring': 0,
    'left-middle': 0,
    'left-index': 0,
    'thumb': 0,
    'right-index': 0,
    'right-middle': 0,
    'right-ring': 0,
    'right-pinky': 0
  };

  Object.entries(stats.keyLatencies).forEach(([char, data]) => {
    const lower = char.toLowerCase();
    for (const [finger, keys] of Object.entries(fingerKeyMap)) {
      if (keys.includes(lower)) {
        fingerCounts[finger] += data.count;
        break;
      }
    }
  });

  const totalTrackedKeys = Object.values(fingerCounts).reduce((a, b) => a + b, 0) || 1;
  const leftHandKeys = fingerCounts['left-pinky'] + fingerCounts['left-ring'] + fingerCounts['left-middle'] + fingerCounts['left-index'];
  const rightHandKeys = fingerCounts['right-pinky'] + fingerCounts['right-ring'] + fingerCounts['right-middle'] + fingerCounts['right-index'];
  const leftRatio = Math.round((leftHandKeys / (leftHandKeys + rightHandKeys || 1)) * 100);
  const rightRatio = 100 - leftRatio;

  // Heatmap Color Resolution
  const getKeyHeatmapColor = (key: KeyHeatmapDef): string => {
    if (!key.char) return 'bg-surface-2 text-txt-muted border-border';

    if (heatmapMode === 'errors') {
      const errCount = (stats.keyErrors[key.char] || 0) + (key.shiftChar ? (stats.keyErrors[key.shiftChar] || 0) : 0);
      if (errCount === 0) return 'bg-surface-2 text-txt border-border hover:border-accent';

      const ratio = errCount / maxErrors;
      if (ratio > 0.6) return 'bg-danger text-zinc-950 font-bold border-danger shadow-sm';
      if (ratio > 0.3) return 'bg-danger/60 text-white font-medium border-danger/80';
      return 'bg-danger/25 text-danger font-medium border-danger/40';
    } else {
      // Latency Mode
      const data = stats.keyLatencies[key.char] || (key.shiftChar ? stats.keyLatencies[key.shiftChar] : null);
      if (!data || data.count === 0) return 'bg-surface-2 text-txt border-border hover:border-accent';

      const avgMs = Math.round(data.totalMs / data.count);
      if (avgMs > 350) return 'bg-danger/80 text-white font-bold border-danger';
      if (avgMs > 250) return 'bg-warning/70 text-zinc-950 font-medium border-warning';
      if (avgMs < 150) return 'bg-accent/30 text-accent font-medium border-accent/40';
      return 'bg-surface-2 text-txt border-border';
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-5">
      {/* Header Profile Summary */}
      <div className="bg-surface border border-border rounded-card p-5 shadow-sm flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <span className="text-4xl p-2 bg-surface-2 rounded-btn border border-border">
            {activeProfile.avatar}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-txt">{activeProfile.name}</h2>
              <span className="text-[10px] bg-accent-soft text-accent border border-accent/20 px-2 py-0.5 rounded-full font-semibold">
                Goal: {activeProfile.preferences.wpmGoal} WPM
              </span>
            </div>
            <p className="text-xs text-txt-muted mt-0.5">
              Fluency Analytics & Biomechanical Insights
            </p>
          </div>
        </div>

        {/* Action Controls & Top Stats */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2">
            <div className="bg-surface-2 px-3 py-2 rounded-btn border border-border text-center min-w-[80px]">
              <span className="text-[10px] text-txt-muted block">Best WPM</span>
              <span className="text-lg font-black text-accent font-mono">{bestWpm}</span>
            </div>
            <div className="bg-surface-2 px-3 py-2 rounded-btn border border-border text-center min-w-[80px]">
              <span className="text-[10px] text-txt-muted block">Avg WPM</span>
              <span className="text-lg font-black text-txt font-mono">{averageWpm}</span>
            </div>
            <div className="bg-surface-2 px-3 py-2 rounded-btn border border-border text-center min-w-[80px]">
              <span className="text-[10px] text-txt-muted block">Lessons</span>
              <span className="text-lg font-black text-txt font-mono">{stats.completedLessons.length}</span>
            </div>
            <div className="bg-surface-2 px-3 py-2 rounded-btn border border-border text-center min-w-[80px]">
              <span className="text-[10px] text-txt-muted block">Practice</span>
              <span className="text-lg font-black text-txt font-mono">{totalMinutes}m</span>
            </div>
          </div>

          <Button
            onClick={() => setShowCertificate(true)}
            variant="secondary"
            className="flex items-center gap-1.5 text-xs py-2 px-3"
          >
            <Award className="w-4 h-4 text-accent" />
            Certificate
          </Button>
        </div>
      </div>

      {/* Interactive Keyboard Heatmap */}
      <div className="bg-surface border border-border rounded-card p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-txt flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent" />
              Keyboard Diagnostic Heatmap
            </h3>
            <p className="text-xs text-txt-muted">
              Visual geometric representation of key friction, error concentration, and transition latency
            </p>
          </div>

          {/* Heatmap Mode Toggle */}
          <div className="flex bg-surface-2 p-1 rounded-btn border border-border text-xs">
            <button
              onClick={() => setHeatmapMode('errors')}
              className={`px-3 py-1 rounded font-medium transition-all ${
                heatmapMode === 'errors'
                  ? 'bg-surface text-danger shadow-sm font-semibold'
                  : 'text-txt-muted hover:text-txt'
              }`}
            >
              Error Rate
            </button>
            <button
              onClick={() => setHeatmapMode('latency')}
              className={`px-3 py-1 rounded font-medium transition-all ${
                heatmapMode === 'latency'
                  ? 'bg-surface text-warning shadow-sm font-semibold'
                  : 'text-txt-muted hover:text-txt'
              }`}
            >
              Hesitation Latency
            </button>
          </div>
        </div>

        {/* Heatmap Legend */}
        <div className="flex items-center gap-4 text-[10px] text-txt-muted pt-1">
          <span className="font-semibold text-txt">Legend:</span>
          {heatmapMode === 'errors' ? (
            <>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-surface-2 border border-border inline-block" />
                Zero Errors
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-danger/30 border border-danger/40 inline-block" />
                Infrequent
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-danger border border-danger inline-block" />
                Severe Error Hub
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-accent/40 border border-accent/50 inline-block" />
                Rapid (&lt;150ms)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-surface-2 border border-border inline-block" />
                Normal (150-250ms)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-warning/70 border border-warning inline-block" />
                Hesitation (&gt;250ms)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded bg-danger/80 border border-danger inline-block" />
                Severe Delay (&gt;350ms)
              </span>
            </>
          )}
        </div>

        {/* Heatmap Keyboard Geometry */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[620px] max-w-[760px] mx-auto bg-surface-2/40 border border-border/80 rounded-lg p-3 space-y-1.5 shadow-inner">
            {HEATMAP_ROWS.map((row, rIdx) => (
              <div key={rIdx} className="flex justify-center gap-1">
                {row.map((k) => {
                  const colorClass = getKeyHeatmapColor(k);
                  const isSelected = selectedKey?.code === k.code;

                  return (
                    <button
                      key={k.code}
                      onClick={() => setSelectedKey(k)}
                      className={`relative h-10 ${k.width || 'w-8'} rounded border text-xs font-mono flex flex-col items-center justify-center transition-all cursor-pointer ${colorClass} ${
                        isSelected ? 'ring-2 ring-accent -translate-y-0.5' : ''
                      }`}
                      title={`${k.label} (${k.finger})`}
                    >
                      <span className="text-[11px] font-bold leading-none">{k.label}</span>
                      {k.hasBump && (
                        <span className="absolute bottom-1 w-2.5 h-0.5 bg-txt-muted/60 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Key Diagnostic Inspector */}
        {selectedKey && (
          <div className="bg-surface-2 border border-border rounded-card p-3.5 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-btn bg-surface border border-accent flex items-center justify-center font-mono font-bold text-lg text-accent">
                {selectedKey.label}
              </div>
              <div>
                <h4 className="font-bold text-txt">
                  Key Inspection: <span className="font-mono text-accent">{selectedKey.label}</span>
                </h4>
                <p className="text-txt-muted text-[11px]">
                  Finger: <span className="text-txt font-medium capitalize">{selectedKey.finger.replace('-', ' ')}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-surface px-3 py-1.5 rounded-btn border border-border text-center">
                <span className="text-[10px] text-txt-muted block">Errors</span>
                <span className="font-mono font-bold text-danger">
                  {stats.keyErrors[selectedKey.char] || 0}
                </span>
              </div>
              <div className="bg-surface px-3 py-1.5 rounded-btn border border-border text-center">
                <span className="text-[10px] text-txt-muted block">Avg Latency</span>
                <span className="font-mono font-bold text-warning">
                  {stats.keyLatencies[selectedKey.char]
                    ? `${Math.round(stats.keyLatencies[selectedKey.char].totalMs / Math.max(stats.keyLatencies[selectedKey.char].count, 1))} ms`
                    : 'N/A'}
                </span>
              </div>
              <button
                onClick={() => setSelectedKey(null)}
                className="p-1 rounded text-txt-muted hover:text-txt"
                title="Close inspection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ergonomic Finger Load & Balance Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Hand Balance Ratio */}
        <div className="bg-surface border border-border rounded-card p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent" />
            <h3 className="font-bold text-sm text-txt">Ergonomic Hand Balance</h3>
          </div>
          <p className="text-xs text-txt-muted">
            Workload distribution between Left and Right hands
          </p>

          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-accent">Left Hand: {leftRatio}%</span>
              <span className="text-txt">Right Hand: {rightRatio}%</span>
            </div>

            {/* Split Progress Bar */}
            <div className="w-full h-3 rounded-full bg-surface-2 border border-border flex overflow-hidden">
              <div
                style={{ width: `${leftRatio}%` }}
                className="h-full bg-accent transition-all duration-300"
              />
              <div
                style={{ width: `${rightRatio}%` }}
                className="h-full bg-zinc-500/50 transition-all duration-300"
              />
            </div>

            <div className="text-[11px] text-txt-muted flex items-center justify-between pt-1">
              <span>{leftHandKeys.toLocaleString()} strokes</span>
              <span>{rightHandKeys.toLocaleString()} strokes</span>
            </div>
          </div>
        </div>

        {/* Individual Finger Load Breakdown */}
        <div className="bg-surface border border-border rounded-card p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent" />
            <h3 className="font-bold text-sm text-txt">Finger Load Distribution</h3>
          </div>
          <p className="text-xs text-txt-muted">
            Keystroke pressure across each individual finger
          </p>

          <div className="grid grid-cols-5 gap-1.5 pt-1 text-center font-mono">
            {[
              { label: 'L-Pinky', count: fingerCounts['left-pinky'] },
              { label: 'L-Ring', count: fingerCounts['left-ring'] },
              { label: 'L-Mid', count: fingerCounts['left-middle'] },
              { label: 'L-Idx', count: fingerCounts['left-index'] },
              { label: 'Thumbs', count: fingerCounts['thumb'] },
              { label: 'R-Idx', count: fingerCounts['right-index'] },
              { label: 'R-Mid', count: fingerCounts['right-middle'] },
              { label: 'R-Ring', count: fingerCounts['right-ring'] },
              { label: 'R-Pinky', count: fingerCounts['right-pinky'] },
            ].slice(0, 5).map((f) => (
              <div key={f.label} className="bg-surface-2 p-1.5 rounded border border-border">
                <span className="text-[9px] text-txt-muted block font-sans">{f.label}</span>
                <span className="text-xs font-bold text-txt">
                  {Math.round((f.count / totalTrackedKeys) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weak Keys & Latency Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Most Frequent Misses */}
        <div className="bg-surface border border-border rounded-card p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-danger" />
            <h3 className="font-bold text-sm text-txt">Most Mistyped Keys</h3>
          </div>
          <p className="text-xs text-txt-muted">Keys where you make the most frequent errors</p>

          {sortedErrors.length > 0 ? (
            <div className="grid grid-cols-4 gap-2 pt-1">
              {sortedErrors.map(([key, count]) => (
                <div key={key} className="bg-surface-2 border border-danger/20 p-2.5 rounded-btn text-center">
                  <span className="font-mono text-lg font-bold text-danger block">
                    {key === ' ' ? 'SPC' : key}
                  </span>
                  <span className="text-[10px] text-txt-muted block mt-0.5">{count} errors</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-txt-muted">
              No errors logged yet.
            </div>
          )}
        </div>

        {/* Slowest / Hesitation Keys */}
        <div className="bg-surface border border-border rounded-card p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-warning" />
            <h3 className="font-bold text-sm text-txt">Hesitation Latency</h3>
          </div>
          <p className="text-xs text-txt-muted">Keys with highest transition delays (microsecond friction)</p>

          {sortedLatencies.length > 0 ? (
            <div className="grid grid-cols-4 gap-2 pt-1">
              {sortedLatencies.map(({ key, avgMs }) => (
                <div key={key} className="bg-surface-2 border border-warning/20 p-2.5 rounded-btn text-center">
                  <span className="font-mono text-lg font-bold text-warning block">
                    {key === ' ' ? 'SPC' : key}
                  </span>
                  <span className="text-[10px] text-txt-muted block mt-0.5">{avgMs} ms</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-txt-muted">
              Complete lessons to generate latency metrics.
            </div>
          )}
        </div>
      </div>

      {/* Speed Test History Table */}
      <div className="bg-surface border border-border rounded-card p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            <h3 className="font-bold text-sm text-txt">Test History</h3>
          </div>
          <span className="text-xs text-txt-muted">{recentTests.length} recorded</span>
        </div>

        {recentTests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-txt">
              <thead className="bg-surface-2 text-txt-muted uppercase text-[9px] font-semibold">
                <tr>
                  <th className="py-2.5 px-3 rounded-l-btn">Date</th>
                  <th className="py-2.5 px-3">Passage</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-3">Net WPM</th>
                  <th className="py-2.5 px-3">Accuracy</th>
                  <th className="py-2.5 px-3 rounded-r-btn">Raw WPM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono">
                {recentTests.map((t) => (
                  <tr key={t.id} className="hover:bg-surface-2/60 transition-colors">
                    <td className="py-2.5 px-3 text-txt-muted font-sans">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="py-2.5 px-3 font-sans font-medium text-txt">
                      {t.testTitle}
                    </td>
                    <td className="py-2.5 px-3 text-txt-muted">
                      {t.durationSeconds}s
                    </td>
                    <td className="py-2.5 px-3 font-bold text-accent">
                      {t.wpm}
                    </td>
                    <td className="py-2.5 px-3 text-txt">
                      {t.accuracy}%
                    </td>
                    <td className="py-2.5 px-3 text-txt-muted">
                      {t.rawWpm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-txt-muted">
            No speed tests recorded yet.
          </div>
        )}
      </div>

      {/* Exportable Achievement Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-surface border-2 border-accent/40 rounded-xl p-8 max-w-2xl w-full shadow-2xl relative space-y-6">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-txt-muted hover:text-txt bg-surface-2"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Printable Certificate Frame */}
            <div className="border-4 border-double border-accent/30 rounded-lg p-6 text-center space-y-4 bg-gradient-to-b from-surface via-surface-2/20 to-surface">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-soft text-accent border border-accent/30 mb-1">
                <Sparkles className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-accent">
                  Certificate of Achievement
                </span>
                <h2 className="text-2xl font-black text-txt tracking-tight">
                  Typing Proficiency Recognition
                </h2>
                <p className="text-xs text-txt-muted">
                  This document certifies verified touch-typing velocity and mechanical precision
                </p>
              </div>

              <div className="py-4 border-y border-border/80 space-y-2">
                <span className="text-xs text-txt-muted">Awarded to</span>
                <div className="text-xl font-extrabold text-txt font-mono">
                  {activeProfile.name}
                </div>
              </div>

              {/* Stats Highlights */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
                <div className="bg-surface-2 p-2 rounded-btn border border-border">
                  <span className="text-[9px] text-txt-muted block">Peak Velocity</span>
                  <span className="font-mono text-base font-black text-accent">{bestWpm} WPM</span>
                </div>
                <div className="bg-surface-2 p-2 rounded-btn border border-border">
                  <span className="text-[9px] text-txt-muted block">Completed Lessons</span>
                  <span className="font-mono text-base font-black text-txt">
                    {stats.completedLessons.length}
                  </span>
                </div>
                <div className="bg-surface-2 p-2 rounded-btn border border-border">
                  <span className="text-[9px] text-txt-muted block">Practice Invested</span>
                  <span className="font-mono text-base font-black text-txt">{totalMinutes}m</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-txt-muted pt-6 px-4">
                <span>Date: {new Date().toLocaleDateString()}</span>
                <span className="flex items-center gap-1 font-semibold text-accent">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Typing Trainer Engine Verified
                </span>
              </div>
            </div>

            {/* Print Controls */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="secondary" onClick={() => setShowCertificate(false)}>
                Done
              </Button>
              <Button onClick={handlePrintCertificate} className="flex items-center gap-2">
                <Printer className="w-4 h-4" />
                Print Certificate
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
