import React, { useState, useEffect, useRef } from 'react';
import { useProfile } from '../context/ProfileContext';
import { soundEngine } from '../utils/audio';
import { Play, RotateCcw, Flame, ShieldAlert, Trophy, Sparkles, Wind, Target, Pause } from 'lucide-react';
import { Button } from './ui/Button';
import { getRandomArcadeWord, WordPools } from '../data/arcadeWords';

interface FallingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
  isSpecial?: boolean;
}

type ArcadeMode = 'arena' | 'zen';

export const ArcadeView: React.FC = () => {
  const { activeProfile, recordArcadeScore } = useProfile();

  // Mode and Configuration
  const [mode, setMode] = useState<ArcadeMode>('arena');
  const [category, setCategory] = useState<keyof WordPools>('medium');
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'gameover'>('idle');

  // Gameplay State
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(1);
  const [maxCombo, setMaxCombo] = useState<number>(1);
  const [health, setHealth] = useState<number>(3);
  const [wordsCleared, setWordsCleared] = useState<number>(0);
  const [inputVal, setInputVal] = useState<string>('');
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([]);
  const [lastClearedWord, setLastClearedWord] = useState<string | null>(null);

  // Zen Mode Specific
  const [zenTargetWord, setZenTargetWord] = useState<string>('');
  const [zenUpcomingWords, setZenUpcomingWords] = useState<string[]>([]);
  const [zenWpm, setZenWpm] = useState<number>(0);
  const zenStartTimeRef = useRef<number>(0);
  const zenTypedCharsRef = useRef<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const wordIdRef = useRef<number>(1);

  const currentHighScore = activeProfile?.stats.arcadeHighScore || 0;

  // Sound settings
  const soundProfile = activeProfile?.preferences.soundProfile || 'cherry-blue';
  const soundVolume = activeProfile?.preferences.soundVolume ?? 0.6;

  // Initialize Zen pool
  const initZenMode = () => {
    const firstWord = getRandomArcadeWord(category);
    const queue = [
      getRandomArcadeWord(category),
      getRandomArcadeWord(category),
      getRandomArcadeWord(category),
      getRandomArcadeWord(category)
    ];
    setZenTargetWord(firstWord);
    setZenUpcomingWords(queue);
    zenStartTimeRef.current = Date.now();
    zenTypedCharsRef.current = 0;
    setZenWpm(0);
  };

  const startGame = () => {
    setScore(0);
    setCombo(1);
    setMaxCombo(1);
    setHealth(3);
    setWordsCleared(0);
    setFallingWords([]);
    setInputVal('');
    setLastClearedWord(null);

    if (mode === 'zen') {
      initZenMode();
    }

    setGameState('playing');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const pauseGame = () => {
    if (gameState === 'playing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  };

  // High score updater
  useEffect(() => {
    if (score > currentHighScore) {
      recordArcadeScore(score);
    }
  }, [score, currentHighScore, recordArcadeScore]);

  // Arena Game Loop
  useEffect(() => {
    if (gameState !== 'playing' || mode !== 'arena') return;

    const gameLoop = setInterval(() => {
      setFallingWords(prev => {
        let newWords = [...prev];
        const maxActiveWords = 4 + Math.min(Math.floor(score / 400), 4);
        const spawnChance = 0.25 + Math.min(score / 3000, 0.25);

        if (newWords.length < maxActiveWords && Math.random() < spawnChance) {
          const randomText = getRandomArcadeWord(category);
          // 8% chance of special bonus word
          const isSpecial = Math.random() < 0.08 && newWords.length > 1;
          newWords.push({
            id: wordIdRef.current++,
            text: randomText,
            x: Math.floor(Math.random() * 65) + 10,
            y: 0,
            speed: (0.7 + Math.random() * 0.6) * (1 + Math.min(score / 2500, 0.8)),
            isSpecial
          });
        }

        let lostHealth = 0;
        newWords = newWords.map(w => ({ ...w, y: w.y + w.speed })).filter(w => {
          if (w.y >= 92) {
            lostHealth++;
            return false;
          }
          return true;
        });

        if (lostHealth > 0) {
          soundEngine.playError(soundVolume);
          setHealth(h => {
            const nextH = h - lostHealth;
            if (nextH <= 0) {
              setGameState('gameover');
              return 0;
            }
            return nextH;
          });
          setCombo(1);
        }

        return newWords;
      });
    }, 100);

    return () => clearInterval(gameLoop);
  }, [gameState, mode, score, category, soundVolume]);

  // Handle Input Changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim().toLowerCase();
    setInputVal(val);

    soundEngine.playKeystroke(soundProfile, soundVolume);

    if (mode === 'arena') {
      const matchedIdx = fallingWords.findIndex(w => w.text.toLowerCase() === val);
      if (matchedIdx !== -1) {
        const matched = fallingWords[matchedIdx];
        soundEngine.playWordPop();

        // If it was a special bomb word, clear all words on screen!
        if (matched.isSpecial) {
          soundEngine.playStreak(combo + 3);
          setScore(s => s + 300 * combo);
          setFallingWords([]);
        } else {
          setFallingWords(prev => prev.filter(w => w.id !== matched.id));
          const points = Math.round(matched.text.length * 15 * (1 + (combo - 1) * 0.25));
          setScore(s => s + points);
        }

        setWordsCleared(wc => wc + 1);
        setLastClearedWord(matched.text);
        setCombo(c => {
          const nextC = c + 1;
          setMaxCombo(m => Math.max(m, nextC));
          if (nextC % 5 === 0) {
            soundEngine.playStreak(nextC);
          }
          return nextC;
        });

        setInputVal('');
      }
    } else if (mode === 'zen') {
      if (val === zenTargetWord.toLowerCase()) {
        soundEngine.playWordPop();
        const charsAdded = zenTargetWord.length + 1;
        zenTypedCharsRef.current += charsAdded;

        // Calculate live zen WPM
        const elapsedMinutes = (Date.now() - zenStartTimeRef.current) / 60000;
        if (elapsedMinutes > 0) {
          const currentZenWpm = Math.round((zenTypedCharsRef.current / 5) / elapsedMinutes);
          setZenWpm(currentZenWpm);
        }

        setWordsCleared(wc => wc + 1);
        setScore(s => s + zenTargetWord.length * 10);
        setCombo(c => {
          const next = c + 1;
          setMaxCombo(m => Math.max(m, next));
          if (next % 5 === 0) soundEngine.playStreak(next);
          return next;
        });

        // Advance zen queue
        const nextWord = zenUpcomingWords[0];
        const newQueue = [...zenUpcomingWords.slice(1), getRandomArcadeWord(category)];
        setZenTargetWord(nextWord);
        setZenUpcomingWords(newQueue);
        setInputVal('');
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Top Header & Mode / Category Selection */}
      <div className="bg-surface border border-border rounded-card p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-txt flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            Arcade Arena
          </h2>
          <p className="text-xs text-txt-muted mt-0.5">
            Dynamic typing challenges & flow rhythm exercises
          </p>
        </div>

        {/* Mode & Category Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Selector */}
          <div className="flex bg-surface-2 p-1 rounded-btn border border-border text-xs">
            <button
              onClick={() => { if (gameState === 'idle') setMode('arena'); }}
              disabled={gameState === 'playing'}
              className={`px-3 py-1.5 rounded font-medium flex items-center gap-1.5 transition-all ${
                mode === 'arena'
                  ? 'bg-surface text-accent shadow-sm font-semibold'
                  : 'text-txt-muted hover:text-txt'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              Word Fall
            </button>
            <button
              onClick={() => { if (gameState === 'idle') setMode('zen'); }}
              disabled={gameState === 'playing'}
              className={`px-3 py-1.5 rounded font-medium flex items-center gap-1.5 transition-all ${
                mode === 'zen'
                  ? 'bg-surface text-accent shadow-sm font-semibold'
                  : 'text-txt-muted hover:text-txt'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              Zen Flow
            </button>
          </div>

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as keyof WordPools)}
            disabled={gameState === 'playing'}
            className="bg-surface-2 text-txt border border-border rounded-btn px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:border-accent"
          >
            <option value="easy">Common (3-4 Letters)</option>
            <option value="medium">Vocabulary (5-7 Letters)</option>
            <option value="hard">Advanced (8+ Letters)</option>
            <option value="code">Developer Syntax</option>
          </select>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="relative w-full h-[440px] bg-surface border border-border rounded-card overflow-hidden shadow-inner flex flex-col justify-between">
        {/* Top HUD Bar */}
        <div className="flex items-center justify-between p-4 bg-surface/80 backdrop-blur-sm border-b border-border z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-txt-muted font-medium">Score:</span>
              <span className="font-mono text-lg font-bold text-accent">{score}</span>
            </div>

            {mode === 'arena' ? (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-txt-muted font-medium">Combo:</span>
                <span className="font-mono text-sm font-semibold text-warning flex items-center gap-0.5">
                  <Flame className="w-3.5 h-3.5" />
                  {combo}x
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-txt-muted font-medium">Flow Pace:</span>
                <span className="font-mono text-sm font-semibold text-accent">{zenWpm} WPM</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {mode === 'arena' && (
              <div className="flex items-center gap-1">
                <span className="text-xs text-txt-muted font-medium mr-1">Shields:</span>
                {[1, 2, 3].map((h) => (
                  <span
                    key={h}
                    className={`inline-block w-3.5 h-3.5 rounded-full border transition-all ${
                      h <= health
                        ? 'bg-accent border-accent shadow-sm'
                        : 'bg-surface-2 border-border opacity-30'
                    }`}
                  />
                ))}
              </div>
            )}

            <div className="text-xs text-txt-muted font-mono">
              Best: <span className="text-txt font-semibold">{currentHighScore}</span>
            </div>

            {gameState === 'playing' && (
              <button
                onClick={pauseGame}
                className="p-1 rounded-btn text-txt-muted hover:text-txt bg-surface-2 border border-border"
                title="Pause (Esc)"
              >
                <Pause className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Canvas / Arena */}
        <div className="relative flex-1 w-full overflow-hidden">
          {/* Mode 1: Word Fall Arena */}
          {mode === 'arena' && gameState === 'playing' && (
            <>
              {fallingWords.map((word) => (
                <div
                  key={word.id}
                  style={{
                    left: `${word.x}%`,
                    top: `${word.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 font-mono font-bold text-sm tracking-wide px-2.5 py-1 rounded shadow-sm border transition-all duration-75 select-none ${
                    word.isSpecial
                      ? 'bg-warning text-zinc-950 border-warning font-black animate-pulse'
                      : word.text.startsWith(inputVal) && inputVal.length > 0
                      ? 'bg-accent text-zinc-950 border-accent font-black shadow-md'
                      : 'bg-surface-2 text-txt border-border'
                  }`}
                >
                  {word.isSpecial && <Sparkles className="w-3 h-3 inline mr-1" />}
                  <span className="underline decoration-accent font-bold">
                    {word.text.slice(0, inputVal.length)}
                  </span>
                  <span>{word.text.slice(inputVal.length)}</span>
                </div>
              ))}

              {/* Laser Danger Floor Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-danger/60 to-transparent" />
            </>
          )}

          {/* Mode 2: Zen Flow Stream */}
          {mode === 'zen' && gameState === 'playing' && (
            <div className="h-full flex flex-col items-center justify-center p-6 space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-txt-muted">
                  Current Target
                </span>
                <div className="font-mono text-4xl font-extrabold text-txt tracking-wide">
                  <span className="text-accent underline decoration-2">
                    {zenTargetWord.slice(0, inputVal.length)}
                  </span>
                  <span className="text-txt-muted">
                    {zenTargetWord.slice(inputVal.length)}
                  </span>
                </div>
              </div>

              {/* Upcoming words queue */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-txt-muted uppercase font-medium">Next:</span>
                {zenUpcomingWords.map((w, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-surface-2 border border-border text-txt-muted"
                  >
                    {w}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Idle Splash Screen */}
          {gameState === 'idle' && (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-accent-soft border border-accent/20 flex items-center justify-center text-accent">
                {mode === 'arena' ? <Target className="w-7 h-7" /> : <Wind className="w-7 h-7" />}
              </div>
              <div className="max-w-md space-y-1">
                <h3 className="text-lg font-bold text-txt">
                  {mode === 'arena' ? 'Word Fall Survival' : 'Zen Rhythm Flow'}
                </h3>
                <p className="text-xs text-txt-muted leading-relaxed">
                  {mode === 'arena'
                    ? 'Words drop from above at increasing speeds. Type them before they hit the danger laser line. Keep streaks alive for combo multipliers!'
                    : 'A peaceful, continuous flow exercise. Maintain smooth cadence, rhythm, and accuracy without time pressure or life loss.'}
                </p>
              </div>
              <Button onClick={startGame} className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                Launch Session
              </Button>
            </div>
          )}

          {/* Paused Screen */}
          {gameState === 'paused' && (
            <div className="absolute inset-0 bg-surface/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 space-y-4 z-20">
              <h3 className="text-xl font-bold text-txt">Game Paused</h3>
              <p className="text-xs text-txt-muted">Take a breath. Press Resume to jump back in.</p>
              <Button onClick={pauseGame} className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                Resume
              </Button>
            </div>
          )}

          {/* Game Over Screen */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-surface/95 backdrop-blur-md flex flex-col items-center justify-center p-6 space-y-4 z-20">
              <div className="w-14 h-14 rounded-full bg-danger/10 border border-danger/30 flex items-center justify-center text-danger">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold text-txt">Shields Depleted!</h3>
                <p className="text-xs text-txt-muted">Words breached your defense perimeter.</p>
              </div>

              {/* Run Summary */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-xs pt-1">
                <div className="bg-surface-2 p-2.5 rounded-btn border border-border text-center">
                  <span className="text-[10px] text-txt-muted block">Final Score</span>
                  <span className="font-mono text-base font-bold text-accent">{score}</span>
                </div>
                <div className="bg-surface-2 p-2.5 rounded-btn border border-border text-center">
                  <span className="text-[10px] text-txt-muted block">Max Combo</span>
                  <span className="font-mono text-base font-bold text-warning">{maxCombo}x</span>
                </div>
                <div className="bg-surface-2 p-2.5 rounded-btn border border-border text-center">
                  <span className="text-[10px] text-txt-muted block">Cleared</span>
                  <span className="font-mono text-base font-bold text-txt">{wordsCleared}</span>
                </div>
              </div>

              <Button onClick={startGame} className="flex items-center gap-2 mt-2">
                <RotateCcw className="w-4 h-4" />
                Play Again
              </Button>
            </div>
          )}
        </div>

        {/* Bottom Input Field Container */}
        <div className="p-4 bg-surface border-t border-border flex items-center justify-center">
          <div className="relative w-full max-w-md">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={handleInputChange}
              disabled={gameState !== 'playing'}
              placeholder={gameState === 'playing' ? 'Type falling word...' : 'Launch session to begin...'}
              className="w-full bg-surface-2 text-txt font-mono font-medium text-center text-lg py-2.5 px-4 rounded-btn border border-border focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all placeholder:text-txt-muted/40 disabled:opacity-50"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {lastClearedWord && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-accent animate-fade">
                +{lastClearedWord}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
