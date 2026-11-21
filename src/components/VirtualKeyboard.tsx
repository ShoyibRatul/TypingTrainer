import React from 'react';
import { US_QWERTY_LAYOUT, FINGER_NAMES } from '../data/keyboards';
import { Finger } from '../types';

interface VirtualKeyboardProps {
  targetChar?: string;
  activeKey?: string;
  targetFinger?: Finger;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  targetChar,
  activeKey,
  targetFinger,
}) => {
  // Normalize targetChar for matching
  const normTarget = targetChar === ' ' ? ' ' : (targetChar || '').toLowerCase();
  const requiresShift = targetChar && targetChar !== ' ' && targetChar === targetChar.toUpperCase() && targetChar !== targetChar.toLowerCase();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl">
      {/* Finger Legend / Active Target Hint */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-2 text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-300">Active Finger:</span>
          {targetFinger ? (
            <span
              className="px-2.5 py-0.5 rounded-full font-medium text-slate-950 flex items-center gap-1.5 shadow-sm"
              style={{ backgroundColor: FINGER_NAMES[targetFinger]?.color || '#6366f1' }}
            >
              <span>{FINGER_NAMES[targetFinger]?.hand} {FINGER_NAMES[targetFinger]?.name}</span>
            </span>
          ) : (
            <span className="text-slate-500 italic">Rest on Home Row</span>
          )}
        </div>

        {/* Hand Color Mini Legend */}
        <div className="hidden sm:flex items-center gap-2 text-[11px]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span> Pinky
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block"></span> Ring
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span> Middle
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span> Index (L)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block"></span> Index (R)
          </span>
        </div>
      </div>

      {/* Keyboard Grid */}
      <div className="space-y-1.5 font-mono select-none">
        {[0, 1, 2, 3, 4].map(rowIndex => {
          const rowKeys = US_QWERTY_LAYOUT.keys.filter(k => k.row === rowIndex);
          return (
            <div key={rowIndex} className="flex gap-1.5 justify-center">
              {rowKeys.map(key => {
                const isTarget =
                  (key.labels[0].toLowerCase() === normTarget) ||
                  (key.labels[1]?.toLowerCase() === normTarget) ||
                  (normTarget === ' ' && key.code === 'Space');

                const isShiftKey = key.code === 'ShiftLeft' || key.code === 'ShiftRight';
                const isShiftTarget = requiresShift && isShiftKey;

                const isPressed = activeKey && (
                  activeKey.toLowerCase() === key.labels[0].toLowerCase() ||
                  (key.labels[1] && activeKey.toLowerCase() === key.labels[1].toLowerCase()) ||
                  (activeKey === ' ' && key.code === 'Space') ||
                  (activeKey === 'Shift' && isShiftKey) ||
                  (activeKey === 'Backspace' && key.code === 'Backspace') ||
                  (activeKey === 'Enter' && key.code === 'Enter')
                );

                const fingerColor = FINGER_NAMES[key.finger]?.color || '#6366f1';
                const keyWidth = key.width || 1.0;

                // Relative flex basis calculation
                const flexBasis = `${keyWidth * 56}px`;

                return (
                  <div
                    key={key.code}
                    style={{
                      flexBasis,
                      flexGrow: key.width ? key.width * 0.5 : 1,
                      minWidth: key.width ? `${key.width * 38}px` : '38px',
                      height: '46px',
                    }}
                    className={`relative rounded-lg flex flex-col items-center justify-center transition-all duration-75 text-xs font-semibold border ${
                      isPressed
                        ? 'bg-indigo-600 text-white border-indigo-400 translate-y-1 shadow-inner'
                        : isTarget || isShiftTarget
                        ? 'bg-indigo-500/30 text-indigo-200 border-indigo-400 animate-pulse ring-2 ring-indigo-400/50 shadow-lg'
                        : 'bg-slate-800/80 text-slate-300 border-slate-700/80 hover:border-slate-600 shadow-md'
                    }`}
                  >
                    {/* Primary & Secondary Key Labels */}
                    <span className="text-[13px] leading-tight">
                      {key.labels[1] && <span className="text-[10px] text-slate-400 block -mb-0.5">{key.labels[1]}</span>}
                      {key.labels[0] === ' ' ? 'SPACE' : key.labels[0]}
                    </span>

                    {/* Tactile bump marker on F and J */}
                    {key.hasBump && (
                      <span className="absolute bottom-1 w-3 h-0.5 bg-slate-400 rounded-full"></span>
                    )}

                    {/* Finger color dot indicator on key base */}
                    <span
                      className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full opacity-60"
                      style={{ backgroundColor: fingerColor }}
                    ></span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
