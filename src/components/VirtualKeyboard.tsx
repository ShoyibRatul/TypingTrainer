import React, { useState, useEffect } from 'react';
import { packRegistry } from '../engine/packs/registry';
import { KeyboardLayout, KeyDefinition } from '../engine/packs/types';

interface VirtualKeyboardProps {
  targetChar?: string;
  activeKey?: string;
  isError?: boolean;
}

interface PhysicalKeySlot {
  code: string;
  defaultLabel: string;
  row: number;
  width?: number;
  isModifier?: boolean;
  homeBump?: boolean;
}

// Standard ANSI Keyboard physical geometry slots
const ANSI_KEY_SLOTS: PhysicalKeySlot[] = [
  // Row 0: Number Row
  { code: 'Backquote', defaultLabel: '`', row: 0, width: 1.0 },
  { code: 'Digit1', defaultLabel: '1', row: 0, width: 1.0 },
  { code: 'Digit2', defaultLabel: '2', row: 0, width: 1.0 },
  { code: 'Digit3', defaultLabel: '3', row: 0, width: 1.0 },
  { code: 'Digit4', defaultLabel: '4', row: 0, width: 1.0 },
  { code: 'Digit5', defaultLabel: '5', row: 0, width: 1.0 },
  { code: 'Digit6', defaultLabel: '6', row: 0, width: 1.0 },
  { code: 'Digit7', defaultLabel: '7', row: 0, width: 1.0 },
  { code: 'Digit8', defaultLabel: '8', row: 0, width: 1.0 },
  { code: 'Digit9', defaultLabel: '9', row: 0, width: 1.0 },
  { code: 'Digit0', defaultLabel: '0', row: 0, width: 1.0 },
  { code: 'Minus', defaultLabel: '-', row: 0, width: 1.0 },
  { code: 'Equal', defaultLabel: '=', row: 0, width: 1.0 },
  { code: 'Backspace', defaultLabel: 'Backspace', row: 0, width: 2.0, isModifier: true },

  // Row 1: Top Alpha Row
  { code: 'Tab', defaultLabel: 'Tab', row: 1, width: 1.5, isModifier: true },
  { code: 'KeyQ', defaultLabel: 'q', row: 1, width: 1.0 },
  { code: 'KeyW', defaultLabel: 'w', row: 1, width: 1.0 },
  { code: 'KeyE', defaultLabel: 'e', row: 1, width: 1.0 },
  { code: 'KeyR', defaultLabel: 'r', row: 1, width: 1.0 },
  { code: 'KeyT', defaultLabel: 't', row: 1, width: 1.0 },
  { code: 'KeyY', defaultLabel: 'y', row: 1, width: 1.0 },
  { code: 'KeyU', defaultLabel: 'u', row: 1, width: 1.0 },
  { code: 'KeyI', defaultLabel: 'i', row: 1, width: 1.0 },
  { code: 'KeyO', defaultLabel: 'o', row: 1, width: 1.0 },
  { code: 'KeyP', defaultLabel: 'p', row: 1, width: 1.0 },
  { code: 'BracketLeft', defaultLabel: '[', row: 1, width: 1.0 },
  { code: 'BracketRight', defaultLabel: ']', row: 1, width: 1.0 },
  { code: 'Backslash', defaultLabel: '\\', row: 1, width: 1.5 },

  // Row 2: Home Row
  { code: 'CapsLock', defaultLabel: 'Caps', row: 2, width: 1.75, isModifier: true },
  { code: 'KeyA', defaultLabel: 'a', row: 2, width: 1.0 },
  { code: 'KeyS', defaultLabel: 's', row: 2, width: 1.0 },
  { code: 'KeyD', defaultLabel: 'd', row: 2, width: 1.0 },
  { code: 'KeyF', defaultLabel: 'f', row: 2, width: 1.0, homeBump: true },
  { code: 'KeyG', defaultLabel: 'g', row: 2, width: 1.0 },
  { code: 'KeyH', defaultLabel: 'h', row: 2, width: 1.0 },
  { code: 'KeyJ', defaultLabel: 'j', row: 2, width: 1.0, homeBump: true },
  { code: 'KeyK', defaultLabel: 'k', row: 2, width: 1.0 },
  { code: 'KeyL', defaultLabel: 'l', row: 2, width: 1.0 },
  { code: 'Semicolon', defaultLabel: ';', row: 2, width: 1.0 },
  { code: 'Quote', defaultLabel: "'", row: 2, width: 1.0 },
  { code: 'Enter', defaultLabel: 'Enter', row: 2, width: 2.25, isModifier: true },

  // Row 3: Bottom Alpha Row
  { code: 'ShiftLeft', defaultLabel: 'Shift', row: 3, width: 2.25, isModifier: true },
  { code: 'KeyZ', defaultLabel: 'z', row: 3, width: 1.0 },
  { code: 'KeyX', defaultLabel: 'x', row: 3, width: 1.0 },
  { code: 'KeyC', defaultLabel: 'c', row: 3, width: 1.0 },
  { code: 'KeyV', defaultLabel: 'v', row: 3, width: 1.0 },
  { code: 'KeyB', defaultLabel: 'b', row: 3, width: 1.0 },
  { code: 'KeyN', defaultLabel: 'n', row: 3, width: 1.0 },
  { code: 'KeyM', defaultLabel: 'm', row: 3, width: 1.0 },
  { code: 'Comma', defaultLabel: ',', row: 3, width: 1.0 },
  { code: 'Period', defaultLabel: '.', row: 3, width: 1.0 },
  { code: 'Slash', defaultLabel: '/', row: 3, width: 1.0 },
  { code: 'ShiftRight', defaultLabel: 'Shift', row: 3, width: 2.75, isModifier: true },

  // Row 4: Space Row
  { code: 'ControlLeft', defaultLabel: 'Ctrl', row: 4, width: 1.25, isModifier: true },
  { code: 'MetaLeft', defaultLabel: 'Win', row: 4, width: 1.25, isModifier: true },
  { code: 'AltLeft', defaultLabel: 'Alt', row: 4, width: 1.25, isModifier: true },
  { code: 'Space', defaultLabel: ' ', row: 4, width: 6.25 },
  { code: 'AltRight', defaultLabel: 'Alt', row: 4, width: 1.25, isModifier: true },
  { code: 'MetaRight', defaultLabel: 'Win', row: 4, width: 1.25, isModifier: true },
  { code: 'ControlRight', defaultLabel: 'Ctrl', row: 4, width: 1.25, isModifier: true },
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  targetChar,
  activeKey,
  isError,
}) => {
  const [layout, setLayout] = useState<KeyboardLayout>(() => packRegistry.getLayout());

  useEffect(() => {
    const update = () => setLayout(packRegistry.getLayout());
    return packRegistry.subscribe(update);
  }, []);

  const normTarget = targetChar === ' ' ? ' ' : (targetChar || '');
  const requiresShift =
    normTarget !== ' ' &&
    normTarget.length > 0 &&
    normTarget === normTarget.toUpperCase() &&
    normTarget !== normTarget.toLowerCase();

  // Find target KeyDefinition to determine target finger
  let targetKeyDef: KeyDefinition | undefined;
  for (const def of Object.values(layout.keys)) {
    if (def.base === normTarget || (def.shift && def.shift === normTarget)) {
      targetKeyDef = def;
      break;
    }
  }

  const fingerLabel = targetKeyDef?.finger
    ? targetKeyDef.finger.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Home Row Rest';

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-surface rounded-card border border-border shadow-sm">
      {/* Top Hint Bar */}
      <div className="flex items-center justify-between gap-2 mb-3 px-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-txt-muted font-medium">Target Finger:</span>
          <span className="px-2.5 py-0.5 rounded-full font-semibold text-xs bg-accent-soft text-accent border border-accent/20">
            {fingerLabel}
          </span>
        </div>
        <div className="text-[11px] font-mono text-txt-muted">
          Layout: <span className="text-txt font-medium">{layout.name['en'] || layout.id}</span> ({layout.geometry.toUpperCase()})
        </div>
      </div>

      {/* Keyboard Grid */}
      <div className="space-y-1.5 font-mono select-none">
        {[0, 1, 2, 3, 4].map((rowIndex) => {
          const rowKeys = ANSI_KEY_SLOTS.filter((k) => k.row === rowIndex);

          return (
            <div key={rowIndex} className="flex gap-1.5 justify-center">
              {rowKeys.map((slot) => {
                const def = layout.keys[slot.code];
                const baseLabel = def ? def.base : slot.defaultLabel;
                const shiftLabel = def ? def.shift : undefined;

                const isTarget =
                  (normTarget === ' ' && slot.code === 'Space') ||
                  (baseLabel && baseLabel === normTarget) ||
                  (shiftLabel && shiftLabel === normTarget);

                const isShiftKey = slot.code === 'ShiftLeft' || slot.code === 'ShiftRight';
                const isShiftTarget = requiresShift && isShiftKey;

                const isPressed =
                  activeKey &&
                  (activeKey.toLowerCase() === baseLabel.toLowerCase() ||
                    (shiftLabel && activeKey.toLowerCase() === shiftLabel.toLowerCase()) ||
                    (activeKey === ' ' && slot.code === 'Space') ||
                    (activeKey === 'Shift' && isShiftKey) ||
                    (activeKey === 'Backspace' && slot.code === 'Backspace') ||
                    (activeKey === 'Enter' && slot.code === 'Enter'));

                const keyWidth = slot.width || 1.0;
                const flexBasis = `${keyWidth * 56}px`;

                return (
                  <div
                    key={slot.code}
                    style={{
                      flexBasis,
                      flexGrow: slot.width ? slot.width * 0.5 : 1,
                      minWidth: slot.width ? `${slot.width * 38}px` : '38px',
                      height: '44px',
                    }}
                    className={`relative rounded-key flex flex-col items-center justify-center transition-all duration-75 text-xs font-semibold border ${
                      isPressed && isError
                        ? 'bg-danger text-white border-danger translate-y-0.5 shadow-inner'
                        : isPressed
                        ? 'bg-accent text-white border-accent-hover translate-y-0.5 shadow-inner'
                        : isTarget || isShiftTarget
                        ? 'bg-accent-soft text-accent border-accent ring-2 ring-accent/40 font-bold animate-pulse'
                        : 'bg-surface-2 text-txt border-border hover:border-txt-muted/40 shadow-sm'
                    }`}
                  >
                    {/* Shift Label */}
                    {shiftLabel && shiftLabel !== baseLabel && (
                      <span className="text-[10px] text-txt-muted leading-none -mt-1">{shiftLabel}</span>
                    )}

                    {/* Base Label */}
                    <span className="leading-tight">{slot.isModifier ? slot.defaultLabel : baseLabel.toUpperCase()}</span>

                    {/* Tactile Bumps on F and J */}
                    {slot.homeBump && (
                      <span className="absolute bottom-1 w-3.5 h-0.5 rounded-full bg-txt-muted/80"></span>
                    )}
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
