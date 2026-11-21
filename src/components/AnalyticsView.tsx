import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { TrendingUp, Clock, AlertTriangle } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { activeProfile } = useProfile();

  if (!activeProfile) return null;

  const stats = activeProfile.stats;
  const recentTests = stats.testHistory.slice(0, 10);
  const totalMinutes = Math.round(stats.totalTimeSeconds / 60);

  // Compute weak keys sorted by error count
  const sortedErrors = Object.entries(stats.keyErrors)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  // Compute highest latency keys
  const sortedLatencies = Object.entries(stats.keyLatencies)
    .map(([key, data]) => ({
      key,
      avgMs: Math.round(data.totalMs / Math.max(data.count, 1)),
    }))
    .sort((a, b) => b.avgMs - a.avgMs)
    .slice(0, 8);

  // Best WPM from tests
  const bestWpm = stats.testHistory.reduce((max, t) => Math.max(max, t.wpm), 0);
  const averageWpm = stats.testHistory.length > 0
    ? Math.round(stats.testHistory.reduce((acc, t) => acc + t.wpm, 0) / stats.testHistory.length)
    : 0;

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 space-y-6">
      {/* Header Profile Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <span className="text-5xl p-2 bg-slate-800 rounded-2xl shadow-inner">
            {activeProfile.avatar}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-slate-100">{activeProfile.name}</h2>
              <span className="text-xs bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full font-medium">
                Goal: {activeProfile.preferences.wpmGoal} WPM
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Member since {new Date(activeProfile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Global Key Stats Cards */}
        <div className="flex flex-wrap gap-3">
          <div className="bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800 text-center min-w-[100px]">
            <span className="text-[11px] text-slate-400 block">Best WPM</span>
            <span className="text-2xl font-black text-indigo-400 font-mono">{bestWpm}</span>
          </div>
          <div className="bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800 text-center min-w-[100px]">
            <span className="text-[11px] text-slate-400 block">Avg WPM</span>
            <span className="text-2xl font-black text-cyan-400 font-mono">{averageWpm}</span>
          </div>
          <div className="bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800 text-center min-w-[100px]">
            <span className="text-[11px] text-slate-400 block">Lessons Done</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">{stats.completedLessons.length}</span>
          </div>
          <div className="bg-slate-950 px-4 py-3 rounded-2xl border border-slate-800 text-center min-w-[100px]">
            <span className="text-[11px] text-slate-400 block">Practice Time</span>
            <span className="text-2xl font-black text-amber-400 font-mono">{totalMinutes}m</span>
          </div>
        </div>
      </div>

      {/* Weak Keys & Latency Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Most Frequent Misses */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="font-bold text-slate-100">Top Problematic Keys</h3>
          </div>
          <p className="text-xs text-slate-400">Keys where you make the most frequent typographical errors</p>

          {sortedErrors.length > 0 ? (
            <div className="grid grid-cols-4 gap-2 pt-2">
              {sortedErrors.map(([key, count]) => (
                <div key={key} className="bg-slate-950 border border-rose-500/20 p-3 rounded-2xl text-center">
                  <span className="font-mono text-xl font-black text-rose-400 block">{key === ' ' ? 'SPC' : key}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{count} errors</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500">
              No errors logged yet. Complete more exercises to see error diagnostics!
            </div>
          )}
        </div>

        {/* Slowest / Hesitation Keys */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-slate-100">Hesitation Latency Heatmap</h3>
          </div>
          <p className="text-xs text-slate-400">Keys with highest transition delays (muscle memory friction)</p>

          {sortedLatencies.length > 0 ? (
            <div className="grid grid-cols-4 gap-2 pt-2">
              {sortedLatencies.map(({ key, avgMs }) => (
                <div key={key} className="bg-slate-950 border border-amber-500/20 p-3 rounded-2xl text-center">
                  <span className="font-mono text-xl font-black text-amber-400 block">{key === ' ' ? 'SPC' : key}</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">{avgMs} ms</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500">
              Complete typing sessions to generate latency metrics!
            </div>
          )}
        </div>
      </div>

      {/* Speed Test History Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-slate-100">Speed Test Certification History</h3>
          </div>
          <span className="text-xs text-slate-400">{recentTests.length} recorded tests</span>
        </div>

        {recentTests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Date</th>
                  <th className="py-3 px-4">Test Title</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Net WPM</th>
                  <th className="py-3 px-4">Accuracy</th>
                  <th className="py-3 px-4 rounded-r-xl">Raw WPM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {recentTests.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 px-4 text-slate-400 font-sans">
                      {new Date(t.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 font-sans font-medium text-slate-200">
                      {t.testTitle}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {t.durationSeconds}s
                    </td>
                    <td className="py-3 px-4 font-bold text-indigo-400">
                      {t.wpm}
                    </td>
                    <td className="py-3 px-4 text-emerald-400">
                      {t.accuracy}%
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {t.rawWpm}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-xs text-slate-500">
            No speed tests completed yet. Head to the Speed Test tab to earn your first certified score!
          </div>
        )}
      </div>
    </div>
  );
};
