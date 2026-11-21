import { KeyboardLayoutModel } from '../types';

export const US_QWERTY_LAYOUT: KeyboardLayoutModel = {
  id: 'en-us-qwerty',
  name: 'US QWERTY Standard',
  standard: 'ANSI',
  homeRow: ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'],
  keys: [
    // Row 0: Number Row
    { code: 'Backquote', labels: ['`', '~'], finger: 1, row: 0, col: 0, width: 1.0 },
    { code: 'Digit1', labels: ['1', '!'], finger: 1, row: 0, col: 1, width: 1.0 },
    { code: 'Digit2', labels: ['2', '@'], finger: 2, row: 0, col: 2, width: 1.0 },
    { code: 'Digit3', labels: ['3', '#'], finger: 3, row: 0, col: 3, width: 1.0 },
    { code: 'Digit4', labels: ['4', '$'], finger: 4, row: 0, col: 4, width: 1.0 },
    { code: 'Digit5', labels: ['5', '%'], finger: 4, row: 0, col: 5, width: 1.0 },
    { code: 'Digit6', labels: ['6', '^'], finger: 5, row: 0, col: 6, width: 1.0 },
    { code: 'Digit7', labels: ['7', '&'], finger: 5, row: 0, col: 7, width: 1.0 },
    { code: 'Digit8', labels: ['8', '*'], finger: 6, row: 0, col: 8, width: 1.0 },
    { code: 'Digit9', labels: ['9', '('], finger: 7, row: 0, col: 9, width: 1.0 },
    { code: 'Digit0', labels: ['0', ')'], finger: 8, row: 0, col: 10, width: 1.0 },
    { code: 'Minus', labels: ['-', '_'], finger: 8, row: 0, col: 11, width: 1.0 },
    { code: 'Equal', labels: ['=', '+'], finger: 8, row: 0, col: 12, width: 1.0 },
    { code: 'Backspace', labels: ['Backspace'], finger: 8, row: 0, col: 13, width: 2.0 },

    // Row 1: Top Alpha Row
    { code: 'Tab', labels: ['Tab'], finger: 1, row: 1, col: 0, width: 1.5 },
    { code: 'KeyQ', labels: ['q', 'Q'], finger: 1, row: 1, col: 1, width: 1.0 },
    { code: 'KeyW', labels: ['w', 'W'], finger: 2, row: 1, col: 2, width: 1.0 },
    { code: 'KeyE', labels: ['e', 'E'], finger: 3, row: 1, col: 3, width: 1.0 },
    { code: 'KeyR', labels: ['r', 'R'], finger: 4, row: 1, col: 4, width: 1.0 },
    { code: 'KeyT', labels: ['t', 'T'], finger: 4, row: 1, col: 5, width: 1.0 },
    { code: 'KeyY', labels: ['y', 'Y'], finger: 5, row: 1, col: 6, width: 1.0 },
    { code: 'KeyU', labels: ['u', 'U'], finger: 5, row: 1, col: 7, width: 1.0 },
    { code: 'KeyI', labels: ['i', 'I'], finger: 6, row: 1, col: 8, width: 1.0 },
    { code: 'KeyO', labels: ['o', 'O'], finger: 7, row: 1, col: 9, width: 1.0 },
    { code: 'KeyP', labels: ['p', 'P'], finger: 8, row: 1, col: 10, width: 1.0 },
    { code: 'BracketLeft', labels: ['[', '{'], finger: 8, row: 1, col: 11, width: 1.0 },
    { code: 'BracketRight', labels: [']', '}'], finger: 8, row: 1, col: 12, width: 1.0 },
    { code: 'Backslash', labels: ['\\', '|'], finger: 8, row: 1, col: 13, width: 1.5 },

    // Row 2: Home Row
    { code: 'CapsLock', labels: ['Caps'], finger: 1, row: 2, col: 0, width: 1.75 },
    { code: 'KeyA', labels: ['a', 'A'], finger: 1, row: 2, col: 1, width: 1.0 },
    { code: 'KeyS', labels: ['s', 'S'], finger: 2, row: 2, col: 2, width: 1.0 },
    { code: 'KeyD', labels: ['d', 'D'], finger: 3, row: 2, col: 3, width: 1.0 },
    { code: 'KeyF', labels: ['f', 'F'], finger: 4, row: 2, col: 4, width: 1.0, hasBump: true },
    { code: 'KeyG', labels: ['g', 'G'], finger: 4, row: 2, col: 5, width: 1.0 },
    { code: 'KeyH', labels: ['h', 'H'], finger: 5, row: 2, col: 6, width: 1.0 },
    { code: 'KeyJ', labels: ['j', 'J'], finger: 5, row: 2, col: 7, width: 1.0, hasBump: true },
    { code: 'KeyK', labels: ['k', 'K'], finger: 6, row: 2, col: 8, width: 1.0 },
    { code: 'KeyL', labels: ['l', 'L'], finger: 7, row: 2, col: 9, width: 1.0 },
    { code: 'Semicolon', labels: [';', ':'], finger: 8, row: 2, col: 10, width: 1.0 },
    { code: 'Quote', labels: ["'", '"'], finger: 8, row: 2, col: 11, width: 1.0 },
    { code: 'Enter', labels: ['Enter'], finger: 8, row: 2, col: 12, width: 2.25 },

    // Row 3: Bottom Alpha Row
    { code: 'ShiftLeft', labels: ['Shift'], finger: 1, row: 3, col: 0, width: 2.25 },
    { code: 'KeyZ', labels: ['z', 'Z'], finger: 1, row: 3, col: 1, width: 1.0 },
    { code: 'KeyX', labels: ['x', 'X'], finger: 2, row: 3, col: 2, width: 1.0 },
    { code: 'KeyC', labels: ['c', 'C'], finger: 3, row: 3, col: 3, width: 1.0 },
    { code: 'KeyV', labels: ['v', 'V'], finger: 4, row: 3, col: 4, width: 1.0 },
    { code: 'KeyB', labels: ['b', 'B'], finger: 4, row: 3, col: 5, width: 1.0 },
    { code: 'KeyN', labels: ['n', 'N'], finger: 5, row: 3, col: 6, width: 1.0 },
    { code: 'KeyM', labels: ['m', 'M'], finger: 5, row: 3, col: 7, width: 1.0 },
    { code: 'Comma', labels: [',', '<'], finger: 6, row: 3, col: 8, width: 1.0 },
    { code: 'Period', labels: ['.', '>'], finger: 7, row: 3, col: 9, width: 1.0 },
    { code: 'Slash', labels: ['/', '?'], finger: 8, row: 3, col: 10, width: 1.0 },
    { code: 'ShiftRight', labels: ['Shift'], finger: 8, row: 3, col: 11, width: 2.75 },

    // Row 4: Space Row
    { code: 'ControlLeft', labels: ['Ctrl'], finger: 1, row: 4, col: 0, width: 1.25 },
    { code: 'MetaLeft', labels: ['Win'], finger: 1, row: 4, col: 1, width: 1.25 },
    { code: 'AltLeft', labels: ['Alt'], finger: 1, row: 4, col: 2, width: 1.25 },
    { code: 'Space', labels: [' '], finger: 9, row: 4, col: 3, width: 6.25 },
    { code: 'AltRight', labels: ['Alt'], finger: 8, row: 4, col: 4, width: 1.25 },
    { code: 'MetaRight', labels: ['Win'], finger: 8, row: 4, col: 5, width: 1.25 },
    { code: 'ControlRight', labels: ['Ctrl'], finger: 8, row: 4, col: 6, width: 1.25 },
  ]
};

export const FINGER_NAMES: Record<number, { name: string; hand: 'Left' | 'Right' | 'Both'; color: string }> = {
  1: { name: 'Pinky', hand: 'Left', color: '#f43f5e' },    // rose-500
  2: { name: 'Ring', hand: 'Left', color: '#f97316' },     // orange-500
  3: { name: 'Middle', hand: 'Left', color: '#eab308' },   // yellow-500
  4: { name: 'Index', hand: 'Left', color: '#22c55e' },    // green-500
  5: { name: 'Index', hand: 'Right', color: '#06b6d4' },   // cyan-500
  6: { name: 'Middle', hand: 'Right', color: '#3b82f6' },  // blue-500
  7: { name: 'Ring', hand: 'Right', color: '#a855f7' },    // purple-500
  8: { name: 'Pinky', hand: 'Right', color: '#ec4899' },   // pink-500
  9: { name: 'Thumbs', hand: 'Both', color: '#6366f1' },   // indigo-500
};
