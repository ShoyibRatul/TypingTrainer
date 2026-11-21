import React, { useState, useEffect, useRef } from 'react';
import { useProfile } from '../context/ProfileContext';
import { soundEngine } from '../utils/audio';
import { Play, RotateCcw, Flame, ShieldAlert, Trophy } from 'lucide-react';
import { Button } from './ui/Button';

const ARCADE_WORDS = [
  'swift', 'flame', 'spark', 'laser', 'orbit', 'matrix', 'cyber', 'rocket',
  'nexus', 'hyper', 'pulse', 'sonic', 'pixel', 'turbo', 'quantum', 'stream',
  'vector', 'shadow', 'engine', 'beacon', 'cosmos', 'galaxy', 'planet', 'syntax'
];

interface FallingWord {
  id: number;
  text: string;
  x: number;
  y: number;
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

  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameLoop = setInterval(() => {
      setFallingWords(prev => {
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

    const matchedIdx = fallingWords.findIndex(w => w.text.toLowerCase() === val);
    if (matchedIdx !== -1) {
      const matched = fallingWords[matchedIdx];
      setFallingWords(prev => prev.filter(w => w.id !== matched.id));
      setScore(s => s + matched.text.length * 10 * combo);
      setCombo(c => Math.min(c + 1, 8));
      setInputVal('');
      soundEngine.playSuccess();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Top Banner & Stats */}
      <div className="bg-surface border border-border rounded-card p-4 flex items-center justify-between shadow-sm">
        <div>
          <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">
            English QWERTY Arcade
          </span>
          <h2 className="text-lg font-bold text-txt">Word Fall Arena</h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="text-[10px] text-txt-muted uppercase font-medium">Score</span>
            <span className="text-2xl font-black font-mono text-txt block">{score}</span>
          </div>

          <div className="text-center">
            <span className="text-[10px] text-txt-muted uppercase font-medium">Combo</span>
            <span className="text-xl font-black font-mono text-warning flex items-center gap-1 justify-center">
              <Flame className="w-4 h-4" /> {combo}x
            </span>
          </div>

          <div className="text-center">
            <span className="text-[10px] text-txt-muted uppercase font-medium">Shields</span>
            <div className="flex gap-1 mt-1">
              {[1, 2, 3].map(heart => (
                <span
                  key={heart}
                  className={`w-3.5 h-3.5 rounded-full ${
                    heart <= health ? 'bg-danger shadow-sm shadow-danger/40' : 'bg-surface-2 border border-border'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="relative w-full h-[440px] bg-surface-2 border border-border rounded-card overflow-hidden shadow-sm flex flex-col justify-between">
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
                className={`absolute px-3 py-1 rounded-btn font-mono text-sm font-semibold tracking-wide transition-all shadow-sm border ${
                  isMatchPartial
                    ? 'bg-accent-soft text-accent border-accent scale-105 ring-1 ring-accent'
                    : 'bg-surface text-txt border-border'
                }`}
              >
                {word.text}
              </div>
            );
          })}

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-danger"></div>
        </div>

        <div className="p-3 bg-surface border-t border-border flex items-center justify-center">
          <input
            ref={inputRef}
            type="text"
            disabled={gameState !== 'playing'}
            value={inputVal}
            onChange={handleInputChange}
            placeholder={gameState === 'playing' ? 'Type falling words here...' : 'Press Start Game'}
            className="w-full max-w-sm bg-surface-2 border border-border text-txt font-mono text-center text-base py-2 px-3 rounded-btn focus:border-accent focus:outline-none placeholder:text-txt-muted"
          />
        </div>

        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-surface/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-center p-6">
            <div className="w-12 h-12 rounded-full bg-accent-soft text-accent flex items-center justify-center">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-txt">Word Fall Challenge</h3>
            <p className="text-xs text-txt-muted max-w-sm">
              Words descend from the sky. Destroy them before they reach the bottom line by typing them correctly.
            </p>
            <Button variant="primary" size="md" onClick={startGame}>
              <Play className="w-4 h-4 fill-current" /> Start Game
            </Button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="absolute inset-0 bg-surface/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-center p-6 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-danger-soft text-danger flex items-center justify-center">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-danger">Game Over</h3>
            <p className="text-xs text-txt-muted">
              Final Score: <span className="font-mono font-bold text-txt text-base">{score}</span>
            </p>
            <Button variant="primary" size="md" onClick={startGame}>
              <RotateCcw className="w-4 h-4" /> Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
