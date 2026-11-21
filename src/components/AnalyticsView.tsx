import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { TrendingUp, Clock, AlertTriangle } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { activeProfile } = useProfile();

  if (!activeProfile) return null;

  const stats = activeProfile.stats;
  const recentTests = stats.testHistory.slice(0, 10);
  const totalMinutes = Math.round(stats.totalTimeSeconds / 60);

  const sortedErrors = Object.entries(stats.keyErrors)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const sortedLatencies = Object.entries(stats.keyLatencies)
    .map(([key, data]) => ({
      key,
      avgMs: Math.round(data.totalMs / Math.max(data.count, 1)),
    }))
    .sort((a, b) => b.avgMs - a.avgMs)
    .slice(0, 8);

  const bestWpm = stats.testHistory.reduce((max, t) => Math.max(max, t.wpm), 0);
  const averageWpm = stats.testHistory.length > 0
    ? Math.round(stats.testHistory.reduce((acc, t) => acc + t.wpm, 0) / stats.testHistory.length)
    : 0;

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
              Active English QWERTY Typist
            </p>
          </div>
        </div>

        {/* Global Key Stats Cards */}
        <div className="flex flex-wrap gap-2.5">
          <div className="bg-surface-2 px-3.5 py-2.5 rounded-btn border border-border text-center min-w-[90px]">
            <span className="text-[10px] text-txt-muted block">Best WPM</span>
            <span className="text-xl font-black text-accent font-mono">{bestWpm}</span>
          </div>
          <div className="bg-surface-2 px-3.5 py-2.5 rounded-btn border border-border text-center min-w-[90px]">
            <span className="text-[10px] text-txt-muted block">Avg WPM</span>
            <span className="text-xl font-black text-txt font-mono">{averageWpm}</span>
          </div>
          <div className="bg-surface-2 px-3.5 py-2.5 rounded-btn border border-border text-center min-w-[90px]">
            <span className="text-[10px] text-txt-muted block">Lessons</span>
            <span className="text-xl font-black text-txt font-mono">{stats.completedLessons.length}</span>
          </div>
          <div className="bg-surface-2 px-3.5 py-2.5 rounded-btn border border-border text-center min-w-[90px]">
            <span className="text-[10px] text-txt-muted block">Practice</span>
            <span className="text-xl font-black text-txt font-mono">{totalMinutes}m</span>
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
                  <span className="font-mono text-lg font-bold text-danger block">{key === ' ' ? 'SPC' : key}</span>
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
                  <span className="font-mono text-lg font-bold text-warning block">{key === ' ' ? 'SPC' : key}</span>
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
    </div>
  );
};
