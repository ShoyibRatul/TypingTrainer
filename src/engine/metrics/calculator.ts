export interface KeystrokeInterval {
  char: string;
  code: string;
  timestamp: number;
  latencyMs: number;
  isCorrect: boolean;
}

export interface ComputedMetrics {
  wpm: number;
  rawWpm: number;
  cpm: number;
  accuracy: number;
  consistency: number; // 0 to 100%
  elapsedSeconds: number;
  totalKeystrokes: number;
  correctKeystrokes: number;
  errors: number;
}

export function computeTypingMetrics(
  intervals: KeystrokeInterval[],
  elapsedMs: number,
  charsPerWord: number = 5
): ComputedMetrics {
  const elapsedSecs = Math.max(elapsedMs / 1000, 0.1);
  const elapsedMins = elapsedSecs / 60;

  const totalKeystrokes = intervals.length;
  const correctKeystrokes = intervals.filter((k) => k.isCorrect).length;
  const errors = totalKeystrokes - correctKeystrokes;

  // Raw WPM: based on total typed characters / charsPerWord
  const rawWpm = Math.round((totalKeystrokes / charsPerWord) / elapsedMins);

  // Accuracy: correct / total
  const accuracy = totalKeystrokes > 0
    ? Math.max(0, Math.min(100, Math.round((correctKeystrokes / totalKeystrokes) * 100)))
    : 100;

  // Net WPM: adjusted by accuracy
  const netWpm = Math.max(0, Math.round(rawWpm * (accuracy / 100)));

  // CPM: characters per minute
  const cpm = Math.round(totalKeystrokes / elapsedMins);

  // Consistency calculation based on variance of correct key latencies
  let consistency = 100;
  const latencies = intervals.filter((k) => k.isCorrect && k.latencyMs > 0).map((k) => k.latencyMs);

  if (latencies.length > 3) {
    const mean = latencies.reduce((a, b) => a + b, 0) / latencies.length;
    const variance = latencies.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / latencies.length;
    const stdDev = Math.sqrt(variance);
    // Coefficient of variation (CV) = stdDev / mean
    const cv = mean > 0 ? stdDev / mean : 0;
    // Map CV: 0.1 CV ~ 95% consistency, 0.5 CV ~ 50% consistency
    consistency = Math.max(0, Math.min(100, Math.round(100 - cv * 70)));
  }

  return {
    wpm: netWpm,
    rawWpm,
    cpm,
    accuracy,
    consistency,
    elapsedSeconds: Math.round(elapsedSecs),
    totalKeystrokes,
    correctKeystrokes,
    errors,
  };
}
