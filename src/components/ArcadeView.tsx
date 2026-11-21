import React, { useState, useEffect, useRef } from 'react';
import { useProfile } from '../context/ProfileContext';
import { soundEngine } from '../utils/audio';
import { Play, RotateCcw, Flame, ShieldAlert, Trophy } from 'lucide-react';

const ARCADE_WORDS = [
  'swift', 'flame', 'spark', 'laser', 'orbit', 'matrix', 'cyber', 'rocket',
  'nexus', 'hyper', 'pulse', 'sonic', 'pixel', 'turbo', 'quantum', 'stream',
  'vector', 'shadow', 'engine', 'beacon', 'cosmos', 'galaxy', 'planet', 'syntax'
];

interface FallingWord {
  id: number;
  text: string;
  x: number; // percentage (10 to 80%)
  y: number; // percentage (0 to 100%)
  speed: number;
}

export const ArcadeView: React.FC = () => {
  const { activeProfile } = useProfile();

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(1);
  const [health, setHealth] = useState<number>(3);
  const [inputVal, setInputVal] = useState<string>('');
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const wordIdRef = useRef<number>(1);

  const startGame = () => {
    setScore(0);
    setCombo(1);
    setHealth(3);
    setFallingWords([]);
    setInputVal('');
    setGameState('playing');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Main game tick: spawn words and update falling positions
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setFallingWords(prev => {
        // Spawn chance
        let newWords = [...prev];
        if (newWords.length < 5 && Math.random() < 0.3) {
          const randomText = ARCADE_WORDS[Math.floor(Math.random() * ARCADE_WORDS.length)];
          newWords.push({
            id: wordIdRef.current++,
            text: randomText,
            x: Math.floor(Math.random() * 70) + 10,
            y: 0,
            speed: 0.8 + Math.random() * 0.8,
          });
        }

        // Advance positions
        let lostHealth = 0;
        newWords = newWords.map(w => ({ ...w, y: w.y + w.speed })).filter(w => {
          if (w.y >= 92) {
            lostHealth++;
            return false;
          }
          return true;
        });

        if (lostHealth > 0) {
          soundEngine.playError(0.8);
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
  }, [gameState]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim().toLowerCase();
    setInputVal(val);

    const soundProfile = activeProfile?.preferences.soundProfile || 'cherry-blue';
    const soundVolume = activeProfile?.preferences.soundVolume ?? 0.6;
    soundEngine.playKeystroke(soundProfile, soundVolume);

    // Check if input matches any falling word completely
    const matchedIdx = fallingWords.findIndex(w => w.text.toLowerCase() === val);
    if (matchedIdx !== -1) {
      // Destroy word!
      const matched = fallingWords[matchedIdx];
      setFallingWords(prev => prev.filter(w => w.id !== matched.id));
      setScore(s => s + matched.text.length * 10 * combo);
      setCombo(c => Math.min(c + 1, 8));
      setInputVal('');
      soundEngine.playSuccess();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 space-y-4">
      {/* Top Banner & Stats */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-xl">
        <div>
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            Arcade Mini-Game
          </span>
          <h2 className="text-xl font-bold text-slate-100">Word Fall Arena</h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Score</span>
            <span className="text-2xl font-black font-mono text-cyan-400 block">{score}</span>
          </div>

          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Combo</span>
            <span className="text-xl font-black font-mono text-amber-400 flex items-center gap-1 justify-center">
              <Flame className="w-4 h-4" /> {combo}x
            </span>
          </div>

          <div className="text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Shields</span>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3].map(heart => (
                <span
                  key={heart}
                  className={`w-3.5 h-3.5 rounded-full ${
                    heart <= health ? 'bg-rose-500 shadow-sm shadow-rose-500/50' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="relative w-full h-[450px] bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Falling Words Arena */}
        <div className="relative flex-1 w-full overflow-hidden">
          {fallingWords.map(word => {
            const isMatchPartial = inputVal && word.text.startsWith(inputVal);
            return (
              <div
                key={word.id}
                style={{
                  left: `${word.x}%`,
                  top: `${word.y}%`,
                }}
                className={`absolute px-3 py-1 rounded-xl font-mono text-sm font-bold tracking-wide transition-all shadow-lg border ${
                  isMatchPartial
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 scale-110 shadow-cyan-500/30 ring-2 ring-cyan-400'
                    : 'bg-slate-800 text-slate-200 border-slate-700'
                }`}
              >
                {word.text}
              </div>
            );
          })}

          {/* Danger zone line at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500/20 via-rose-500 to-rose-500/20"></div>
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-center">
          <input
            ref={inputRef}
            type="text"
            disabled={gameState !== 'playing'}
            value={inputVal}
            onChange={handleInputChange}
            placeholder={gameState === 'playing' ? 'Type the falling words here...' : 'Press Start Game below'}
            className="w-full max-w-md bg-slate-950 border border-slate-700 text-slate-100 font-mono text-center text-lg py-2.5 px-4 rounded-xl focus:border-cyan-500 focus:outline-none placeholder:text-slate-600"
          />
        </div>

        {/* Overlays: Idle & GameOver */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Trophy className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-100">Word Fall Challenge</h3>
            <p className="text-xs text-slate-400 max-w-sm">
              Words descend from the sky. Destroy them before they reach the red laser floor by typing them correctly!
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-2xl transition shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" /> Start Game
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center p-6 animate-fadeIn">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-rose-400">Shields Depleted!</h3>
            <p className="text-sm text-slate-300">
              Final Score: <span className="font-mono font-bold text-cyan-400 text-lg">{score}</span>
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition shadow-lg flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
