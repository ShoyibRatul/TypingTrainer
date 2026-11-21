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
  const normTarget = targetChar === ' ' ? ' ' : (targetChar || '').toLowerCase();
  const requiresShift = targetChar && targetChar !== ' ' && targetChar === targetChar.toUpperCase() && targetChar !== targetChar.toLowerCase();

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-surface rounded-card border border-border shadow-sm">
      {/* Finger Legend / Active Target Hint */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1 text-xs text-txt-muted">
        <div className="flex items-center gap-3">
          <span className="font-medium text-txt">Target Finger:</span>
          {targetFinger ? (
            <span
              className="px-2.5 py-0.5 rounded-full font-medium text-white flex items-center gap-1.5 shadow-sm text-[11px]"
              style={{ backgroundColor: FINGER_NAMES[targetFinger]?.color || 'var(--accent)' }}
            >
              <span>{FINGER_NAMES[targetFinger]?.hand} {FINGER_NAMES[targetFinger]?.name}</span>
            </span>
          ) : (
            <span className="text-txt-muted italic">Rest on Home Row</span>
          )}
        </div>

        {/* Hand Color Mini Legend */}
        <div className="hidden sm:flex items-center gap-2.5 text-[11px] text-txt-muted">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span> Pinky
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span> Ring
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block"></span> Middle
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span> Index (L)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span> Index (R)
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

                const fingerColor = FINGER_NAMES[key.finger]?.color || 'var(--accent)';
                const keyWidth = key.width || 1.0;
                const flexBasis = `${keyWidth * 56}px`;

                return (
                  <div
                    key={key.code}
                    style={{
                      flexBasis,
                      flexGrow: key.width ? key.width * 0.5 : 1,
                      minWidth: key.width ? `${key.width * 38}px` : '38px',
                      height: '44px',
                    }}
                    className={`relative rounded-key flex flex-col items-center justify-center transition-all duration-75 text-xs font-semibold border ${
                      isPressed
                        ? 'bg-accent text-white border-accent-hover translate-y-0.5 shadow-inner'
                        : isTarget || isShiftTarget
                        ? 'bg-accent-soft text-accent border-accent ring-1 ring-accent font-bold'
                        : 'bg-surface-2 text-txt border-border hover:border-txt-muted/40 shadow-sm'
                    }`}
                  >
                    <span className="text-[12px] leading-tight">
                      {key.labels[1] && <span className="text-[9px] text-txt-muted block -mb-0.5">{key.labels[1]}</span>}
                      {key.labels[0] === ' ' ? 'SPACE' : key.labels[0]}
                    </span>

                    {/* Tactile bump marker on F and J */}
                    {key.hasBump && (
                      <span className="absolute bottom-1 w-2.5 h-0.5 bg-txt-muted rounded-full"></span>
                    )}

                    {/* Finger color dot indicator on key base */}
                    <span
                      className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full opacity-70"
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
