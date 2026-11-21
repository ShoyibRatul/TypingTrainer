/**
 * Built-in English (US QWERTY & Alternatives) Master Pack
 * 54 lessons across 4 comprehensive courses (Fundamentals, Programmer, Numpad, Speed Building).
 * Conforms 100% to Typing Trainer Pack Specification.
 */

import { LoadedPack, PackManifest, KeyboardLayout, CourseDefinition, LessonDefinition } from "./types";

export const BUILTIN_ENGLISH_MANIFEST: PackManifest = {
  "schemaVersion": 1,
  "id": "org.typingtrainer.en-us",
  "name": {
    "en": "English (Universal QWERTY & More)"
  },
  "version": "1.0.0",
  "description": {
    "en": "Comprehensive English touch-typing master curriculum featuring 54 lessons, code syntax, numpad, speed building, and alternative layouts."
  },
  "language": "en",
  "region": "US",
  "script": "Latn",
  "direction": "ltr",
  "authors": [
    {
      "name": "Shoyib Ratul",
      "email": "hello@shoyibratul.com",
      "url": "https://github.com/ShoyibRatul/TypingTrainer"
    }
  ],
  "license": "PolyForm-Noncommercial-1.0.0",
  "minAppVersion": "1.0.0",
  "dependencies": [],
  "defaults": {
    "layout": "en-us-qwerty",
    "course": "fundamentals"
  },
  "unitOfLength": {
    "type": "word",
    "charsPerWord": 5
  },
  "contents": {
    "layouts": [
      "layouts/en-us-qwerty.json",
      "layouts/en-dvorak.json",
      "layouts/en-colemak.json",
      "layouts/en-colemak-dh.json"
    ],
    "courses": [
      "courses/fundamentals/course.json",
      "courses/programmer/course.json",
      "courses/numpad/course.json",
      "courses/speed-building/course.json"
    ],
    "wordlists": [
      "wordlists/frequency-1000.txt"
    ],
    "placement": "assessment/placement.json"
  }
};

export const BUILTIN_ENGLISH_LAYOUTS: Record<string, KeyboardLayout> = {
  "en-colemak-dh": {
    "schemaVersion": 1,
    "id": "en-colemak-dh",
    "name": {
      "en": "English (Colemak-DH)"
    },
    "type": "physical",
    "geometry": "ansi",
    "direction": "ltr",
    "inputMethod": "direct",
    "keys": {
      "Backquote": {
        "base": "`",
        "shift": "~",
        "finger": "L-pinky"
      },
      "Digit1": {
        "base": "1",
        "shift": "!",
        "finger": "L-pinky"
      },
      "Digit2": {
        "base": "2",
        "shift": "@",
        "finger": "L-ring"
      },
      "Digit3": {
        "base": "3",
        "shift": "#",
        "finger": "L-middle"
      },
      "Digit4": {
        "base": "4",
        "shift": "$",
        "finger": "L-index"
      },
      "Digit5": {
        "base": "5",
        "shift": "%",
        "finger": "L-index"
      },
      "Digit6": {
        "base": "6",
        "shift": "^",
        "finger": "R-index"
      },
      "Digit7": {
        "base": "7",
        "shift": "&",
        "finger": "R-index"
      },
      "Digit8": {
        "base": "8",
        "shift": "*",
        "finger": "R-middle"
      },
      "Digit9": {
        "base": "9",
        "shift": "(",
        "finger": "R-ring"
      },
      "Digit0": {
        "base": "0",
        "shift": ")",
        "finger": "R-pinky"
      },
      "Minus": {
        "base": "-",
        "shift": "_",
        "finger": "R-pinky"
      },
      "Equal": {
        "base": "=",
        "shift": "+",
        "finger": "R-pinky"
      },
      "KeyQ": {
        "base": "q",
        "shift": "Q",
        "finger": "L-pinky"
      },
      "KeyW": {
        "base": "w",
        "shift": "W",
        "finger": "L-ring"
      },
      "KeyE": {
        "base": "f",
        "shift": "F",
        "finger": "L-middle"
      },
      "KeyR": {
        "base": "p",
        "shift": "P",
        "finger": "L-index"
      },
      "KeyT": {
        "base": "b",
        "shift": "B",
        "finger": "L-index"
      },
      "KeyY": {
        "base": "j",
        "shift": "J",
        "finger": "R-index"
      },
      "KeyU": {
        "base": "l",
        "shift": "L",
        "finger": "R-index"
      },
      "KeyI": {
        "base": "u",
        "shift": "U",
        "finger": "R-middle"
      },
      "KeyO": {
        "base": "y",
        "shift": "Y",
        "finger": "R-ring"
      },
      "KeyP": {
        "base": ";",
        "shift": ":",
        "finger": "R-pinky"
      },
      "BracketLeft": {
        "base": "[",
        "shift": "{",
        "finger": "R-pinky"
      },
      "BracketRight": {
        "base": "]",
        "shift": "}",
        "finger": "R-pinky"
      },
      "Backslash": {
        "base": "\\",
        "shift": "|",
        "finger": "R-pinky"
      },
      "KeyA": {
        "base": "a",
        "shift": "A",
        "finger": "L-pinky"
      },
      "KeyS": {
        "base": "r",
        "shift": "R",
        "finger": "L-ring"
      },
      "KeyD": {
        "base": "s",
        "shift": "S",
        "finger": "L-middle"
      },
      "KeyF": {
        "base": "t",
        "shift": "T",
        "finger": "L-index",
        "homeBump": true
      },
      "KeyG": {
        "base": "g",
        "shift": "G",
        "finger": "L-index"
      },
      "KeyH": {
        "base": "m",
        "shift": "M",
        "finger": "R-index"
      },
      "KeyJ": {
        "base": "n",
        "shift": "N",
        "finger": "R-index",
        "homeBump": true
      },
      "KeyK": {
        "base": "e",
        "shift": "E",
        "finger": "R-middle"
      },
      "KeyL": {
        "base": "i",
        "shift": "I",
        "finger": "R-ring"
      },
      "Semicolon": {
        "base": "o",
        "shift": "O",
        "finger": "R-pinky"
      },
      "Quote": {
        "base": "'",
        "shift": "\"",
        "finger": "R-pinky"
      },
      "KeyZ": {
        "base": "z",
        "shift": "Z",
        "finger": "L-pinky"
      },
      "KeyX": {
        "base": "x",
        "shift": "X",
        "finger": "L-ring"
      },
      "KeyC": {
        "base": "c",
        "shift": "C",
        "finger": "L-middle"
      },
      "KeyV": {
        "base": "d",
        "shift": "D",
        "finger": "L-index"
      },
      "KeyB": {
        "base": "v",
        "shift": "V",
        "finger": "L-index"
      },
      "KeyN": {
        "base": "k",
        "shift": "K",
        "finger": "R-index"
      },
      "KeyM": {
        "base": "h",
        "shift": "H",
        "finger": "R-index"
      },
      "Comma": {
        "base": ",",
        "shift": "<",
        "finger": "R-middle"
      },
      "Period": {
        "base": ".",
        "shift": ">",
        "finger": "R-ring"
      },
      "Slash": {
        "base": "/",
        "shift": "?",
        "finger": "R-pinky"
      },
      "Space": {
        "base": " ",
        "shift": " ",
        "finger": "R-thumb"
      }
    }
  },
  "en-colemak": {
    "schemaVersion": 1,
    "id": "en-colemak",
    "name": {
      "en": "English (Colemak)"
    },
    "type": "physical",
    "geometry": "ansi",
    "direction": "ltr",
    "inputMethod": "direct",
    "keys": {
      "Backquote": {
        "base": "`",
        "shift": "~",
        "finger": "L-pinky"
      },
      "Digit1": {
        "base": "1",
        "shift": "!",
        "finger": "L-pinky"
      },
      "Digit2": {
        "base": "2",
        "shift": "@",
        "finger": "L-ring"
      },
      "Digit3": {
        "base": "3",
        "shift": "#",
        "finger": "L-middle"
      },
      "Digit4": {
        "base": "4",
        "shift": "$",
        "finger": "L-index"
      },
      "Digit5": {
        "base": "5",
        "shift": "%",
        "finger": "L-index"
      },
      "Digit6": {
        "base": "6",
        "shift": "^",
        "finger": "R-index"
      },
      "Digit7": {
        "base": "7",
        "shift": "&",
        "finger": "R-index"
      },
      "Digit8": {
        "base": "8",
        "shift": "*",
        "finger": "R-middle"
      },
      "Digit9": {
        "base": "9",
        "shift": "(",
        "finger": "R-ring"
      },
      "Digit0": {
        "base": "0",
        "shift": ")",
        "finger": "R-pinky"
      },
      "Minus": {
        "base": "-",
        "shift": "_",
        "finger": "R-pinky"
      },
      "Equal": {
        "base": "=",
        "shift": "+",
        "finger": "R-pinky"
      },
      "KeyQ": {
        "base": "q",
        "shift": "Q",
        "finger": "L-pinky"
      },
      "KeyW": {
        "base": "w",
        "shift": "W",
        "finger": "L-ring"
      },
      "KeyE": {
        "base": "f",
        "shift": "F",
        "finger": "L-middle"
      },
      "KeyR": {
        "base": "p",
        "shift": "P",
        "finger": "L-index"
      },
      "KeyT": {
        "base": "g",
        "shift": "G",
        "finger": "L-index"
      },
      "KeyY": {
        "base": "j",
        "shift": "J",
        "finger": "R-index"
      },
      "KeyU": {
        "base": "l",
        "shift": "L",
        "finger": "R-index"
      },
      "KeyI": {
        "base": "u",
        "shift": "U",
        "finger": "R-middle"
      },
      "KeyO": {
        "base": "y",
        "shift": "Y",
        "finger": "R-ring"
      },
      "KeyP": {
        "base": ";",
        "shift": ":",
        "finger": "R-pinky"
      },
      "BracketLeft": {
        "base": "[",
        "shift": "{",
        "finger": "R-pinky"
      },
      "BracketRight": {
        "base": "]",
        "shift": "}",
        "finger": "R-pinky"
      },
      "Backslash": {
        "base": "\\",
        "shift": "|",
        "finger": "R-pinky"
      },
      "KeyA": {
        "base": "a",
        "shift": "A",
        "finger": "L-pinky"
      },
      "KeyS": {
        "base": "r",
        "shift": "R",
        "finger": "L-ring"
      },
      "KeyD": {
        "base": "s",
        "shift": "S",
        "finger": "L-middle"
      },
      "KeyF": {
        "base": "t",
        "shift": "T",
        "finger": "L-index",
        "homeBump": true
      },
      "KeyG": {
        "base": "d",
        "shift": "D",
        "finger": "L-index"
      },
      "KeyH": {
        "base": "h",
        "shift": "H",
        "finger": "R-index"
      },
      "KeyJ": {
        "base": "n",
        "shift": "N",
        "finger": "R-index",
        "homeBump": true
      },
      "KeyK": {
        "base": "e",
        "shift": "E",
        "finger": "R-middle"
      },
      "KeyL": {
        "base": "i",
        "shift": "I",
        "finger": "R-ring"
      },
      "Semicolon": {
        "base": "o",
        "shift": "O",
        "finger": "R-pinky"
      },
      "Quote": {
        "base": "'",
        "shift": "\"",
        "finger": "R-pinky"
      },
      "KeyZ": {
        "base": "z",
        "shift": "Z",
        "finger": "L-pinky"
      },
      "KeyX": {
        "base": "x",
        "shift": "X",
        "finger": "L-ring"
      },
      "KeyC": {
        "base": "c",
        "shift": "C",
        "finger": "L-middle"
      },
      "KeyV": {
        "base": "v",
        "shift": "V",
        "finger": "L-index"
      },
      "KeyB": {
        "base": "b",
        "shift": "B",
        "finger": "L-index"
      },
      "KeyN": {
        "base": "k",
        "shift": "K",
        "finger": "R-index"
      },
      "KeyM": {
        "base": "m",
        "shift": "M",
        "finger": "R-index"
      },
      "Comma": {
        "base": ",",
        "shift": "<",
        "finger": "R-middle"
      },
      "Period": {
        "base": ".",
        "shift": ">",
        "finger": "R-ring"
      },
      "Slash": {
        "base": "/",
        "shift": "?",
        "finger": "R-pinky"
      },
      "Space": {
        "base": " ",
        "shift": " ",
        "finger": "R-thumb"
      }
    }
  },
  "en-dvorak": {
    "schemaVersion": 1,
    "id": "en-dvorak",
    "name": {
      "en": "English (Dvorak)"
    },
    "type": "physical",
    "geometry": "ansi",
    "direction": "ltr",
    "inputMethod": "direct",
    "keys": {
      "Backquote": {
        "base": "`",
        "shift": "~",
        "finger": "L-pinky"
      },
      "Digit1": {
        "base": "1",
        "shift": "!",
        "finger": "L-pinky"
      },
      "Digit2": {
        "base": "2",
        "shift": "@",
        "finger": "L-ring"
      },
      "Digit3": {
        "base": "3",
        "shift": "#",
        "finger": "L-middle"
      },
      "Digit4": {
        "base": "4",
        "shift": "$",
        "finger": "L-index"
      },
      "Digit5": {
        "base": "5",
        "shift": "%",
        "finger": "L-index"
      },
      "Digit6": {
        "base": "6",
        "shift": "^",
        "finger": "R-index"
      },
      "Digit7": {
        "base": "7",
        "shift": "&",
        "finger": "R-index"
      },
      "Digit8": {
        "base": "8",
        "shift": "*",
        "finger": "R-middle"
      },
      "Digit9": {
        "base": "9",
        "shift": "(",
        "finger": "R-ring"
      },
      "Digit0": {
        "base": "0",
        "shift": ")",
        "finger": "R-pinky"
      },
      "Minus": {
        "base": "-",
        "shift": "_",
        "finger": "R-pinky"
      },
      "Equal": {
        "base": "=",
        "shift": "+",
        "finger": "R-pinky"
      },
      "KeyQ": {
        "base": "'",
        "shift": "\"",
        "finger": "L-pinky"
      },
      "KeyW": {
        "base": ",",
        "shift": "<",
        "finger": "L-ring"
      },
      "KeyE": {
        "base": ".",
        "shift": ">",
        "finger": "L-middle"
      },
      "KeyR": {
        "base": "p",
        "shift": "P",
        "finger": "L-index"
      },
      "KeyT": {
        "base": "y",
        "shift": "Y",
        "finger": "L-index"
      },
      "KeyY": {
        "base": "f",
        "shift": "F",
        "finger": "R-index"
      },
      "KeyU": {
        "base": "g",
        "shift": "G",
        "finger": "R-index"
      },
      "KeyI": {
        "base": "c",
        "shift": "C",
        "finger": "R-middle"
      },
      "KeyO": {
        "base": "r",
        "shift": "R",
        "finger": "R-ring"
      },
      "KeyP": {
        "base": "l",
        "shift": "L",
        "finger": "R-pinky"
      },
      "BracketLeft": {
        "base": "/",
        "shift": "?",
        "finger": "R-pinky"
      },
      "BracketRight": {
        "base": "=",
        "shift": "+",
        "finger": "R-pinky"
      },
      "Backslash": {
        "base": "\\",
        "shift": "|",
        "finger": "R-pinky"
      },
      "KeyA": {
        "base": "a",
        "shift": "A",
        "finger": "L-pinky"
      },
      "KeyS": {
        "base": "o",
        "shift": "O",
        "finger": "L-ring"
      },
      "KeyD": {
        "base": "e",
        "shift": "E",
        "finger": "L-middle"
      },
      "KeyF": {
        "base": "u",
        "shift": "U",
        "finger": "L-index",
        "homeBump": true
      },
      "KeyG": {
        "base": "i",
        "shift": "I",
        "finger": "L-index"
      },
      "KeyH": {
        "base": "d",
        "shift": "D",
        "finger": "R-index"
      },
      "KeyJ": {
        "base": "h",
        "shift": "H",
        "finger": "R-index",
        "homeBump": true
      },
      "KeyK": {
        "base": "t",
        "shift": "T",
        "finger": "R-middle"
      },
      "KeyL": {
        "base": "n",
        "shift": "N",
        "finger": "R-ring"
      },
      "Semicolon": {
        "base": "s",
        "shift": "S",
        "finger": "R-pinky"
      },
      "Quote": {
        "base": "-",
        "shift": "_",
        "finger": "R-pinky"
      },
      "KeyZ": {
        "base": ";",
        "shift": ":",
        "finger": "L-pinky"
      },
      "KeyX": {
        "base": "q",
        "shift": "Q",
        "finger": "L-ring"
      },
      "KeyC": {
        "base": "j",
        "shift": "J",
        "finger": "L-middle"
      },
      "KeyV": {
        "base": "k",
        "shift": "K",
        "finger": "L-index"
      },
      "KeyB": {
        "base": "x",
        "shift": "X",
        "finger": "L-index"
      },
      "KeyN": {
        "base": "b",
        "shift": "B",
        "finger": "R-index"
      },
      "KeyM": {
        "base": "m",
        "shift": "M",
        "finger": "R-index"
      },
      "Comma": {
        "base": "w",
        "shift": "W",
        "finger": "R-middle"
      },
      "Period": {
        "base": "v",
        "shift": "V",
        "finger": "R-ring"
      },
      "Slash": {
        "base": "z",
        "shift": "Z",
        "finger": "R-pinky"
      },
      "Space": {
        "base": " ",
        "shift": " ",
        "finger": "R-thumb"
      }
    }
  },
  "en-us-qwerty": {
    "schemaVersion": 1,
    "id": "en-us-qwerty",
    "name": {
      "en": "US QWERTY"
    },
    "type": "physical",
    "geometry": "ansi",
    "direction": "ltr",
    "inputMethod": "direct",
    "keys": {
      "Backquote": {
        "base": "`",
        "shift": "~",
        "finger": "L-pinky"
      },
      "Digit1": {
        "base": "1",
        "shift": "!",
        "finger": "L-pinky"
      },
      "Digit2": {
        "base": "2",
        "shift": "@",
        "finger": "L-ring"
      },
      "Digit3": {
        "base": "3",
        "shift": "#",
        "finger": "L-middle"
      },
      "Digit4": {
        "base": "4",
        "shift": "$",
        "finger": "L-index"
      },
      "Digit5": {
        "base": "5",
        "shift": "%",
        "finger": "L-index"
      },
      "Digit6": {
        "base": "6",
        "shift": "^",
        "finger": "R-index"
      },
      "Digit7": {
        "base": "7",
        "shift": "&",
        "finger": "R-index"
      },
      "Digit8": {
        "base": "8",
        "shift": "*",
        "finger": "R-middle"
      },
      "Digit9": {
        "base": "9",
        "shift": "(",
        "finger": "R-ring"
      },
      "Digit0": {
        "base": "0",
        "shift": ")",
        "finger": "R-pinky"
      },
      "Minus": {
        "base": "-",
        "shift": "_",
        "finger": "R-pinky"
      },
      "Equal": {
        "base": "=",
        "shift": "+",
        "finger": "R-pinky"
      },
      "KeyQ": {
        "base": "q",
        "shift": "Q",
        "finger": "L-pinky"
      },
      "KeyW": {
        "base": "w",
        "shift": "W",
        "finger": "L-ring"
      },
      "KeyE": {
        "base": "e",
        "shift": "E",
        "finger": "L-middle"
      },
      "KeyR": {
        "base": "r",
        "shift": "R",
        "finger": "L-index"
      },
      "KeyT": {
        "base": "t",
        "shift": "T",
        "finger": "L-index"
      },
      "KeyY": {
        "base": "y",
        "shift": "Y",
        "finger": "R-index"
      },
      "KeyU": {
        "base": "u",
        "shift": "U",
        "finger": "R-index"
      },
      "KeyI": {
        "base": "i",
        "shift": "I",
        "finger": "R-middle"
      },
      "KeyO": {
        "base": "o",
        "shift": "O",
        "finger": "R-ring"
      },
      "KeyP": {
        "base": "p",
        "shift": "P",
        "finger": "R-pinky"
      },
      "BracketLeft": {
        "base": "[",
        "shift": "{",
        "finger": "R-pinky"
      },
      "BracketRight": {
        "base": "]",
        "shift": "}",
        "finger": "R-pinky"
      },
      "Backslash": {
        "base": "\\",
        "shift": "|",
        "finger": "R-pinky"
      },
      "KeyA": {
        "base": "a",
        "shift": "A",
        "finger": "L-pinky"
      },
      "KeyS": {
        "base": "s",
        "shift": "S",
        "finger": "L-ring"
      },
      "KeyD": {
        "base": "d",
        "shift": "D",
        "finger": "L-middle"
      },
      "KeyF": {
        "base": "f",
        "shift": "F",
        "finger": "L-index",
        "homeBump": true
      },
      "KeyG": {
        "base": "g",
        "shift": "G",
        "finger": "L-index"
      },
      "KeyH": {
        "base": "h",
        "shift": "H",
        "finger": "R-index"
      },
      "KeyJ": {
        "base": "j",
        "shift": "J",
        "finger": "R-index",
        "homeBump": true
      },
      "KeyK": {
        "base": "k",
        "shift": "K",
        "finger": "R-middle"
      },
      "KeyL": {
        "base": "l",
        "shift": "L",
        "finger": "R-ring"
      },
      "Semicolon": {
        "base": ";",
        "shift": ":",
        "finger": "R-pinky"
      },
      "Quote": {
        "base": "'",
        "shift": "\"",
        "finger": "R-pinky"
      },
      "KeyZ": {
        "base": "z",
        "shift": "Z",
        "finger": "L-pinky"
      },
      "KeyX": {
        "base": "x",
        "shift": "X",
        "finger": "L-ring"
      },
      "KeyC": {
        "base": "c",
        "shift": "C",
        "finger": "L-middle"
      },
      "KeyV": {
        "base": "v",
        "shift": "V",
        "finger": "L-index"
      },
      "KeyB": {
        "base": "b",
        "shift": "B",
        "finger": "L-index"
      },
      "KeyN": {
        "base": "n",
        "shift": "N",
        "finger": "R-index"
      },
      "KeyM": {
        "base": "m",
        "shift": "M",
        "finger": "R-index"
      },
      "Comma": {
        "base": ",",
        "shift": "<",
        "finger": "R-middle"
      },
      "Period": {
        "base": ".",
        "shift": ">",
        "finger": "R-ring"
      },
      "Slash": {
        "base": "/",
        "shift": "?",
        "finger": "R-pinky"
      },
      "Space": {
        "base": " ",
        "shift": " ",
        "finger": "R-thumb"
      }
    }
  }
};

export const BUILTIN_ENGLISH_COURSES: Record<string, CourseDefinition> = {
  "fundamentals": {
    "schemaVersion": 1,
    "id": "fundamentals",
    "title": {
      "en": "English QWERTY Comprehensive Mastery"
    },
    "description": {
      "en": "The complete 35-lesson touch-typing journey from Home Row anchor to professional prose fluency."
    },
    "layout": "en-us-qwerty",
    "levels": [
      {
        "id": "level-1-home-row",
        "title": {
          "en": "Stage 1: Home Row Foundation"
        },
        "lessons": [
          "lessons/fund-01-fj.json",
          "lessons/fund-02-dk.json",
          "lessons/fund-03-sl.json",
          "lessons/fund-04-a-semi.json",
          "lessons/fund-05-gh.json",
          "lessons/fund-06-home-mastery.json"
        ]
      },
      {
        "id": "level-2-top-row",
        "title": {
          "en": "Stage 2: Top Row & High Frequency Vowels"
        },
        "lessons": [
          "lessons/fund-07-ei.json",
          "lessons/fund-08-ru.json",
          "lessons/fund-09-ty.json",
          "lessons/fund-10-op.json",
          "lessons/fund-11-qw.json",
          "lessons/fund-12-top-mastery.json"
        ]
      },
      {
        "id": "level-3-bottom-row",
        "title": {
          "en": "Stage 3: Bottom Row Reaches"
        },
        "lessons": [
          "lessons/fund-13-cm.json",
          "lessons/fund-14-vn.json",
          "lessons/fund-15-bx.json",
          "lessons/fund-16-z-slash.json",
          "lessons/fund-17-comma-period.json",
          "lessons/fund-18-alphabet-run.json"
        ]
      },
      {
        "id": "level-4-capitals",
        "title": {
          "en": "Stage 4: Capitalization & Shift Keys"
        },
        "lessons": [
          "lessons/fund-19-left-shift.json",
          "lessons/fund-20-right-shift.json",
          "lessons/fund-21-mixed-caps.json",
          "lessons/fund-22-sentence-caps.json",
          "lessons/fund-23-acronyms.json",
          "lessons/fund-24-caps-speed.json"
        ]
      },
      {
        "id": "level-5-numbers",
        "title": {
          "en": "Stage 5: Number Row Reaches"
        },
        "lessons": [
          "lessons/fund-25-num-47.json",
          "lessons/fund-26-num-38.json",
          "lessons/fund-27-num-29.json",
          "lessons/fund-28-num-10.json",
          "lessons/fund-29-num-dates.json",
          "lessons/fund-30-num-sprint.json"
        ]
      },
      {
        "id": "level-6-punctuation",
        "title": {
          "en": "Stage 6: Punctuation & Cadence Fluency"
        },
        "lessons": [
          "lessons/fund-31-quotes-hyphens.json",
          "lessons/fund-32-parentheses-excl.json",
          "lessons/fund-33-symbols.json",
          "lessons/fund-34-paragraphs.json",
          "lessons/fund-35-grand-mastery.json"
        ]
      }
    ]
  },
  "programmer": {
    "schemaVersion": 1,
    "id": "programmer",
    "title": {
      "en": "Developer Code Syntax"
    },
    "description": {
      "en": "Targeted drills for brackets, arrows, operators, and programming identifiers."
    },
    "layout": "en-us-qwerty",
    "levels": [
      {
        "id": "prog-level-1",
        "title": {
          "en": "Code Mechanics"
        },
        "lessons": [
          "lessons/prog-01-delimiters.json",
          "lessons/prog-02-operators.json",
          "lessons/prog-03-casing.json",
          "lessons/prog-04-jsx-html.json",
          "lessons/prog-05-snippets.json"
        ]
      }
    ]
  },
  "speed-building": {
    "schemaVersion": 1,
    "id": "speed-building",
    "title": {
      "en": "Speed Building and Advanced Drills"
    },
    "description": {
      "en": "10 advanced exercises to push your typing speed and accuracy beyond fundamentals. Common words, bigrams, trigrams, paragraphs, mixed case, and professional writing."
    },
    "layout": "en-us-qwerty",
    "levels": [
      {
        "id": "level-1-word-speed",
        "title": {
          "en": "Stage 1: Word-Level Speed"
        },
        "lessons": [
          "lessons/speed-01-common-words.json",
          "lessons/speed-02-bigrams.json",
          "lessons/speed-03-trigrams.json"
        ]
      },
      {
        "id": "level-2-sentence-flow",
        "title": {
          "en": "Stage 2: Sentence Flow"
        },
        "lessons": [
          "lessons/speed-04-sentences.json",
          "lessons/speed-05-paragraphs.json",
          "lessons/speed-06-mixed-case.json"
        ]
      },
      {
        "id": "level-3-mastery",
        "title": {
          "en": "Stage 3: Advanced Mastery"
        },
        "lessons": [
          "lessons/speed-07-accuracy-drill.json",
          "lessons/speed-08-number-prose.json",
          "lessons/speed-09-professional.json",
          "lessons/speed-10-ultimate.json"
        ]
      }
    ]
  },
  "numpad": {
    "schemaVersion": 1,
    "id": "numpad",
    "title": {
      "en": "10-Key Numpad Mastery"
    },
    "description": {
      "en": "Touch typing on the dedicated numeric keypad for accounting and data entry."
    },
    "layout": "en-us-qwerty",
    "levels": [
      {
        "id": "numpad-level-1",
        "title": {
          "en": "10-Key Touch Skills"
        },
        "lessons": [
          "lessons/numpad-01-home.json",
          "lessons/numpad-02-reaches.json",
          "lessons/numpad-03-zero-decimal.json",
          "lessons/numpad-04-speed-entry.json"
        ]
      }
    ]
  }
};

export const BUILTIN_ENGLISH_LESSONS: Record<string, LessonDefinition> = {
  "fund-01-fj": {
    "schemaVersion": 1,
    "id": "fund-01-fj",
    "title": {
      "en": "Anchor Keys: F and J"
    },
    "objective": {
      "en": "Feel the tactile bumps on F and J to establish your physical anchor."
    },
    "newKeys": [
      "KeyF",
      "KeyJ"
    ],
    "tips": [
      {
        "en": "Rest your left index on F and right index on J."
      },
      {
        "en": "Never look at your hands."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "ff jj ff jj fj fj jf jf ff jj fjf jfj"
        ],
        "repeat": 1
      },
      {
        "type": "keys",
        "items": [
          "fff jjj fff jjj fj fj jf jf"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "fjf jfj ff jj fj jf"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 12,
      "minAccuracy": 90,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-01-fj.json": {
    "schemaVersion": 1,
    "id": "fund-01-fj",
    "title": {
      "en": "Anchor Keys: F and J"
    },
    "objective": {
      "en": "Feel the tactile bumps on F and J to establish your physical anchor."
    },
    "newKeys": [
      "KeyF",
      "KeyJ"
    ],
    "tips": [
      {
        "en": "Rest your left index on F and right index on J."
      },
      {
        "en": "Never look at your hands."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "ff jj ff jj fj fj jf jf ff jj fjf jfj"
        ],
        "repeat": 1
      },
      {
        "type": "keys",
        "items": [
          "fff jjj fff jjj fj fj jf jf"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "fjf jfj ff jj fj jf"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 12,
      "minAccuracy": 90,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-01-fj.json": {
    "schemaVersion": 1,
    "id": "fund-01-fj",
    "title": {
      "en": "Anchor Keys: F and J"
    },
    "objective": {
      "en": "Feel the tactile bumps on F and J to establish your physical anchor."
    },
    "newKeys": [
      "KeyF",
      "KeyJ"
    ],
    "tips": [
      {
        "en": "Rest your left index on F and right index on J."
      },
      {
        "en": "Never look at your hands."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "ff jj ff jj fj fj jf jf ff jj fjf jfj"
        ],
        "repeat": 1
      },
      {
        "type": "keys",
        "items": [
          "fff jjj fff jjj fj fj jf jf"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "fjf jfj ff jj fj jf"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 12,
      "minAccuracy": 90,
      "maxErrorsPerStep": null
    }
  },
  "fund-02-dk": {
    "schemaVersion": 1,
    "id": "fund-02-dk",
    "title": {
      "en": "Middle Fingers: D and K"
    },
    "objective": {
      "en": "Locate D and K with your middle fingers beside your anchor keys."
    },
    "newKeys": [
      "KeyD",
      "KeyK"
    ],
    "tips": [
      {
        "en": "Left middle rests on D; right middle rests on K."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "dd kk dd kk dk dk kd kd fd jk df kj"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "kdd dkk fdf jkj fdk jkd"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 14,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-02-dk.json": {
    "schemaVersion": 1,
    "id": "fund-02-dk",
    "title": {
      "en": "Middle Fingers: D and K"
    },
    "objective": {
      "en": "Locate D and K with your middle fingers beside your anchor keys."
    },
    "newKeys": [
      "KeyD",
      "KeyK"
    ],
    "tips": [
      {
        "en": "Left middle rests on D; right middle rests on K."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "dd kk dd kk dk dk kd kd fd jk df kj"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "kdd dkk fdf jkj fdk jkd"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 14,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-02-dk.json": {
    "schemaVersion": 1,
    "id": "fund-02-dk",
    "title": {
      "en": "Middle Fingers: D and K"
    },
    "objective": {
      "en": "Locate D and K with your middle fingers beside your anchor keys."
    },
    "newKeys": [
      "KeyD",
      "KeyK"
    ],
    "tips": [
      {
        "en": "Left middle rests on D; right middle rests on K."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "dd kk dd kk dk dk kd kd fd jk df kj"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "kdd dkk fdf jkj fdk jkd"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 14,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fund-03-sl": {
    "schemaVersion": 1,
    "id": "fund-03-sl",
    "title": {
      "en": "Ring Fingers: S and L"
    },
    "objective": {
      "en": "Engage your ring fingers on S and L."
    },
    "newKeys": [
      "KeyS",
      "KeyL"
    ],
    "tips": [
      {
        "en": "Left ring on S; right ring on L. Keep wrists relaxed."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "ss ll ss ll sl sl ls ls sdk lkj sld kls"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "fall ask lads flask salad"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 15,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-03-sl.json": {
    "schemaVersion": 1,
    "id": "fund-03-sl",
    "title": {
      "en": "Ring Fingers: S and L"
    },
    "objective": {
      "en": "Engage your ring fingers on S and L."
    },
    "newKeys": [
      "KeyS",
      "KeyL"
    ],
    "tips": [
      {
        "en": "Left ring on S; right ring on L. Keep wrists relaxed."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "ss ll ss ll sl sl ls ls sdk lkj sld kls"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "fall ask lads flask salad"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 15,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-03-sl.json": {
    "schemaVersion": 1,
    "id": "fund-03-sl",
    "title": {
      "en": "Ring Fingers: S and L"
    },
    "objective": {
      "en": "Engage your ring fingers on S and L."
    },
    "newKeys": [
      "KeyS",
      "KeyL"
    ],
    "tips": [
      {
        "en": "Left ring on S; right ring on L. Keep wrists relaxed."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "ss ll ss ll sl sl ls ls sdk lkj sld kls"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "fall ask lads flask salad"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 15,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fund-04-a-semi": {
    "schemaVersion": 1,
    "id": "fund-04-a-semi",
    "title": {
      "en": "Pinky Keys: A and Semicolon"
    },
    "objective": {
      "en": "Anchor the edges of the home row with A and Semicolon (;)."
    },
    "newKeys": [
      "KeyA",
      "Semicolon"
    ],
    "tips": [
      {
        "en": "Left pinky on A; right pinky on Semicolon (;)."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "aa ;; aa ;; a; a; ;a ;a asdf jkl; asdf jkl;"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "all alas salad shall flask asks"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 16,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-04-a-semi.json": {
    "schemaVersion": 1,
    "id": "fund-04-a-semi",
    "title": {
      "en": "Pinky Keys: A and Semicolon"
    },
    "objective": {
      "en": "Anchor the edges of the home row with A and Semicolon (;)."
    },
    "newKeys": [
      "KeyA",
      "Semicolon"
    ],
    "tips": [
      {
        "en": "Left pinky on A; right pinky on Semicolon (;)."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "aa ;; aa ;; a; a; ;a ;a asdf jkl; asdf jkl;"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "all alas salad shall flask asks"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 16,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-04-a-semi.json": {
    "schemaVersion": 1,
    "id": "fund-04-a-semi",
    "title": {
      "en": "Pinky Keys: A and Semicolon"
    },
    "objective": {
      "en": "Anchor the edges of the home row with A and Semicolon (;)."
    },
    "newKeys": [
      "KeyA",
      "Semicolon"
    ],
    "tips": [
      {
        "en": "Left pinky on A; right pinky on Semicolon (;)."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "aa ;; aa ;; a; a; ;a ;a asdf jkl; asdf jkl;"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "all alas salad shall flask asks"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 16,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fund-05-gh": {
    "schemaVersion": 1,
    "id": "fund-05-gh",
    "title": {
      "en": "Center Reaches: G and H"
    },
    "objective": {
      "en": "Reach inward with left index to G and right index to H."
    },
    "newKeys": [
      "KeyG",
      "KeyH"
    ],
    "tips": [
      {
        "en": "F reaches right to G and returns. J reaches left to H and returns."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "fg gf fg gf jh hj jh hj fgh jhg asdfg hjkl;"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "glad half flag dash hall fall flash"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "half a flag falls as a glad dad laughs"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 18,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-05-gh.json": {
    "schemaVersion": 1,
    "id": "fund-05-gh",
    "title": {
      "en": "Center Reaches: G and H"
    },
    "objective": {
      "en": "Reach inward with left index to G and right index to H."
    },
    "newKeys": [
      "KeyG",
      "KeyH"
    ],
    "tips": [
      {
        "en": "F reaches right to G and returns. J reaches left to H and returns."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "fg gf fg gf jh hj jh hj fgh jhg asdfg hjkl;"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "glad half flag dash hall fall flash"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "half a flag falls as a glad dad laughs"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 18,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-05-gh.json": {
    "schemaVersion": 1,
    "id": "fund-05-gh",
    "title": {
      "en": "Center Reaches: G and H"
    },
    "objective": {
      "en": "Reach inward with left index to G and right index to H."
    },
    "newKeys": [
      "KeyG",
      "KeyH"
    ],
    "tips": [
      {
        "en": "F reaches right to G and returns. J reaches left to H and returns."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "fg gf fg gf jh hj jh hj fgh jhg asdfg hjkl;"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "glad half flag dash hall fall flash"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "half a flag falls as a glad dad laughs"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 18,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fund-06-home-mastery": {
    "schemaVersion": 1,
    "id": "fund-06-home-mastery",
    "title": {
      "en": "Home Row Mastery Sprint"
    },
    "objective": {
      "en": "Demonstrate rhythm and cadence across the entire home row."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Breathe calmly and maintain an even tempo."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "glad flash shall flags half dash hall alas salad asks"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "a sad dad asks a lad as glad gals laugh loudly"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 20,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-06-home-mastery.json": {
    "schemaVersion": 1,
    "id": "fund-06-home-mastery",
    "title": {
      "en": "Home Row Mastery Sprint"
    },
    "objective": {
      "en": "Demonstrate rhythm and cadence across the entire home row."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Breathe calmly and maintain an even tempo."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "glad flash shall flags half dash hall alas salad asks"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "a sad dad asks a lad as glad gals laugh loudly"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 20,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-06-home-mastery.json": {
    "schemaVersion": 1,
    "id": "fund-06-home-mastery",
    "title": {
      "en": "Home Row Mastery Sprint"
    },
    "objective": {
      "en": "Demonstrate rhythm and cadence across the entire home row."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Breathe calmly and maintain an even tempo."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "glad flash shall flags half dash hall alas salad asks"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "a sad dad asks a lad as glad gals laugh loudly"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 20,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "fund-07-ei": {
    "schemaVersion": 1,
    "id": "fund-07-ei",
    "title": {
      "en": "High Frequency Vowels: E and I"
    },
    "objective": {
      "en": "Reach middle fingers upward to E (left) and I (right)."
    },
    "newKeys": [
      "KeyE",
      "KeyI"
    ],
    "tips": [
      {
        "en": "D reaches up to E; K reaches up to I. Return immediately."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "de ed de ed ki ik ki ik ded kik ee ii"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "feed side silk life like desk field"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "he likes a hike like life in a field"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 20,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-07-ei.json": {
    "schemaVersion": 1,
    "id": "fund-07-ei",
    "title": {
      "en": "High Frequency Vowels: E and I"
    },
    "objective": {
      "en": "Reach middle fingers upward to E (left) and I (right)."
    },
    "newKeys": [
      "KeyE",
      "KeyI"
    ],
    "tips": [
      {
        "en": "D reaches up to E; K reaches up to I. Return immediately."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "de ed de ed ki ik ki ik ded kik ee ii"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "feed side silk life like desk field"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "he likes a hike like life in a field"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 20,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-07-ei.json": {
    "schemaVersion": 1,
    "id": "fund-07-ei",
    "title": {
      "en": "High Frequency Vowels: E and I"
    },
    "objective": {
      "en": "Reach middle fingers upward to E (left) and I (right)."
    },
    "newKeys": [
      "KeyE",
      "KeyI"
    ],
    "tips": [
      {
        "en": "D reaches up to E; K reaches up to I. Return immediately."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "de ed de ed ki ik ki ik ded kik ee ii"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "feed side silk life like desk field"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "he likes a hike like life in a field"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 20,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fund-08-ru": {
    "schemaVersion": 1,
    "id": "fund-08-ru",
    "title": {
      "en": "Top Row Reaches: R and U"
    },
    "objective": {
      "en": "Reach index fingers upward to R (left) and U (right)."
    },
    "newKeys": [
      "KeyR",
      "KeyU"
    ],
    "tips": [
      {
        "en": "F reaches up-left to R; J reaches up-right to U."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "fr rf fr rf ju uj ju uj fru jur frf juj"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "surf rush rust fruit user ruler dark"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "sure fruit rush under a dark summer rule"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 22,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-08-ru.json": {
    "schemaVersion": 1,
    "id": "fund-08-ru",
    "title": {
      "en": "Top Row Reaches: R and U"
    },
    "objective": {
      "en": "Reach index fingers upward to R (left) and U (right)."
    },
    "newKeys": [
      "KeyR",
      "KeyU"
    ],
    "tips": [
      {
        "en": "F reaches up-left to R; J reaches up-right to U."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "fr rf fr rf ju uj ju uj fru jur frf juj"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "surf rush rust fruit user ruler dark"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "sure fruit rush under a dark summer rule"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 22,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-08-ru.json": {
    "schemaVersion": 1,
    "id": "fund-08-ru",
    "title": {
      "en": "Top Row Reaches: R and U"
    },
    "objective": {
      "en": "Reach index fingers upward to R (left) and U (right)."
    },
    "newKeys": [
      "KeyR",
      "KeyU"
    ],
    "tips": [
      {
        "en": "F reaches up-left to R; J reaches up-right to U."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "fr rf fr rf ju uj ju uj fru jur frf juj"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "surf rush rust fruit user ruler dark"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "sure fruit rush under a dark summer rule"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 22,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fund-09-ty": {
    "schemaVersion": 1,
    "id": "fund-09-ty",
    "title": {
      "en": "Center Top Reaches: T and Y"
    },
    "objective": {
      "en": "Reach index fingers up and inward to T and Y."
    },
    "newKeys": [
      "KeyT",
      "KeyY"
    ],
    "tips": [
      {
        "en": "F reaches up-right to T; J reaches up-left to Y."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "ft tf ft tf jy yj jy yj fty jty ty ty"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "they that city study tasty yet try style"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "they try to study the tasty style of art"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 22,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-09-ty.json": {
    "schemaVersion": 1,
    "id": "fund-09-ty",
    "title": {
      "en": "Center Top Reaches: T and Y"
    },
    "objective": {
      "en": "Reach index fingers up and inward to T and Y."
    },
    "newKeys": [
      "KeyT",
      "KeyY"
    ],
    "tips": [
      {
        "en": "F reaches up-right to T; J reaches up-left to Y."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "ft tf ft tf jy yj jy yj fty jty ty ty"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "they that city study tasty yet try style"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "they try to study the tasty style of art"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 22,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-09-ty.json": {
    "schemaVersion": 1,
    "id": "fund-09-ty",
    "title": {
      "en": "Center Top Reaches: T and Y"
    },
    "objective": {
      "en": "Reach index fingers up and inward to T and Y."
    },
    "newKeys": [
      "KeyT",
      "KeyY"
    ],
    "tips": [
      {
        "en": "F reaches up-right to T; J reaches up-left to Y."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "ft tf ft tf jy yj jy yj fty jty ty ty"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "they that city study tasty yet try style"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "they try to study the tasty style of art"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 22,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fund-10-op": {
    "schemaVersion": 1,
    "id": "fund-10-op",
    "title": {
      "en": "Right Top Extensions: O and P"
    },
    "objective": {
      "en": "Reach right ring to O and right pinky to P."
    },
    "newKeys": [
      "KeyO",
      "KeyP"
    ],
    "tips": [
      {
        "en": "L reaches up to O; Semicolon reaches up to P."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "lo ol lo ol ;p p; ;p p; lop pol pop ooo ppp"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "poor drop hope pool shop stop point report"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "proper people hope to drop poor reports"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 24,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-10-op.json": {
    "schemaVersion": 1,
    "id": "fund-10-op",
    "title": {
      "en": "Right Top Extensions: O and P"
    },
    "objective": {
      "en": "Reach right ring to O and right pinky to P."
    },
    "newKeys": [
      "KeyO",
      "KeyP"
    ],
    "tips": [
      {
        "en": "L reaches up to O; Semicolon reaches up to P."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "lo ol lo ol ;p p; ;p p; lop pol pop ooo ppp"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "poor drop hope pool shop stop point report"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "proper people hope to drop poor reports"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 24,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-10-op.json": {
    "schemaVersion": 1,
    "id": "fund-10-op",
    "title": {
      "en": "Right Top Extensions: O and P"
    },
    "objective": {
      "en": "Reach right ring to O and right pinky to P."
    },
    "newKeys": [
      "KeyO",
      "KeyP"
    ],
    "tips": [
      {
        "en": "L reaches up to O; Semicolon reaches up to P."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "lo ol lo ol ;p p; ;p p; lop pol pop ooo ppp"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "poor drop hope pool shop stop point report"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "proper people hope to drop poor reports"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 24,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fund-11-qw": {
    "schemaVersion": 1,
    "id": "fund-11-qw",
    "title": {
      "en": "Left Top Extensions: Q and W"
    },
    "objective": {
      "en": "Reach left pinky to Q and left ring to W."
    },
    "newKeys": [
      "KeyQ",
      "KeyW"
    ],
    "tips": [
      {
        "en": "A reaches up to Q; S reaches up to W."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "aq qa aq qa sw ws sw ws qsw wsq qqq www"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "quiet quick write water sweet power west"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "quick water flows west with quiet power"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 24,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-11-qw.json": {
    "schemaVersion": 1,
    "id": "fund-11-qw",
    "title": {
      "en": "Left Top Extensions: Q and W"
    },
    "objective": {
      "en": "Reach left pinky to Q and left ring to W."
    },
    "newKeys": [
      "KeyQ",
      "KeyW"
    ],
    "tips": [
      {
        "en": "A reaches up to Q; S reaches up to W."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "aq qa aq qa sw ws sw ws qsw wsq qqq www"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "quiet quick write water sweet power west"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "quick water flows west with quiet power"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 24,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-11-qw.json": {
    "schemaVersion": 1,
    "id": "fund-11-qw",
    "title": {
      "en": "Left Top Extensions: Q and W"
    },
    "objective": {
      "en": "Reach left pinky to Q and left ring to W."
    },
    "newKeys": [
      "KeyQ",
      "KeyW"
    ],
    "tips": [
      {
        "en": "A reaches up to Q; S reaches up to W."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "aq qa aq qa sw ws sw ws qsw wsq qqq www"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "quiet quick write water sweet power west"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "quick water flows west with quiet power"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 24,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fund-12-top-mastery": {
    "schemaVersion": 1,
    "id": "fund-12-top-mastery",
    "title": {
      "en": "Top Row Comprehensive Fluency"
    },
    "objective": {
      "en": "Combine top row and home row keys into complex vocabulary."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Keep hands hovering lightly above the home row."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "power query write quiet yellow update report repeat"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the power to write quiet queries updates our reports"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-12-top-mastery.json": {
    "schemaVersion": 1,
    "id": "fund-12-top-mastery",
    "title": {
      "en": "Top Row Comprehensive Fluency"
    },
    "objective": {
      "en": "Combine top row and home row keys into complex vocabulary."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Keep hands hovering lightly above the home row."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "power query write quiet yellow update report repeat"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the power to write quiet queries updates our reports"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-12-top-mastery.json": {
    "schemaVersion": 1,
    "id": "fund-12-top-mastery",
    "title": {
      "en": "Top Row Comprehensive Fluency"
    },
    "objective": {
      "en": "Combine top row and home row keys into complex vocabulary."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Keep hands hovering lightly above the home row."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "power query write quiet yellow update report repeat"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the power to write quiet queries updates our reports"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fund-13-cm": {
    "schemaVersion": 1,
    "id": "fund-13-cm",
    "title": {
      "en": "Bottom Reaches: C and M"
    },
    "objective": {
      "en": "Curl left middle down to C and right index down to M."
    },
    "newKeys": [
      "KeyC",
      "KeyM"
    ],
    "tips": [
      {
        "en": "D curls down to C; J reaches down-right to M."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "dc cd dc cd jm mj jm mj dcd jmj ccc mmm"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "claim calm music cream march magic come"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "calm music creates much magic in summer"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-13-cm.json": {
    "schemaVersion": 1,
    "id": "fund-13-cm",
    "title": {
      "en": "Bottom Reaches: C and M"
    },
    "objective": {
      "en": "Curl left middle down to C and right index down to M."
    },
    "newKeys": [
      "KeyC",
      "KeyM"
    ],
    "tips": [
      {
        "en": "D curls down to C; J reaches down-right to M."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "dc cd dc cd jm mj jm mj dcd jmj ccc mmm"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "claim calm music cream march magic come"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "calm music creates much magic in summer"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-13-cm.json": {
    "schemaVersion": 1,
    "id": "fund-13-cm",
    "title": {
      "en": "Bottom Reaches: C and M"
    },
    "objective": {
      "en": "Curl left middle down to C and right index down to M."
    },
    "newKeys": [
      "KeyC",
      "KeyM"
    ],
    "tips": [
      {
        "en": "D curls down to C; J reaches down-right to M."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "dc cd dc cd jm mj jm mj dcd jmj ccc mmm"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "claim calm music cream march magic come"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "calm music creates much magic in summer"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fund-14-vn": {
    "schemaVersion": 1,
    "id": "fund-14-vn",
    "title": {
      "en": "Bottom Center: V and N"
    },
    "objective": {
      "en": "Curl left index down to V and right index down to N."
    },
    "newKeys": [
      "KeyV",
      "KeyN"
    ],
    "tips": [
      {
        "en": "F curls down-right to V; J curls down-left to N."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "fv vf fv vf jn nj jn nj fvf jnj vvv nnn"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "voice view never novel river raven navy"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "never leave a novel view unseen along the river"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-14-vn.json": {
    "schemaVersion": 1,
    "id": "fund-14-vn",
    "title": {
      "en": "Bottom Center: V and N"
    },
    "objective": {
      "en": "Curl left index down to V and right index down to N."
    },
    "newKeys": [
      "KeyV",
      "KeyN"
    ],
    "tips": [
      {
        "en": "F curls down-right to V; J curls down-left to N."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "fv vf fv vf jn nj jn nj fvf jnj vvv nnn"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "voice view never novel river raven navy"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "never leave a novel view unseen along the river"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-14-vn.json": {
    "schemaVersion": 1,
    "id": "fund-14-vn",
    "title": {
      "en": "Bottom Center: V and N"
    },
    "objective": {
      "en": "Curl left index down to V and right index down to N."
    },
    "newKeys": [
      "KeyV",
      "KeyN"
    ],
    "tips": [
      {
        "en": "F curls down-right to V; J curls down-left to N."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "fv vf fv vf jn nj jn nj fvf jnj vvv nnn"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "voice view never novel river raven navy"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "never leave a novel view unseen along the river"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fund-15-bx": {
    "schemaVersion": 1,
    "id": "fund-15-bx",
    "title": {
      "en": "Outer Bottom: B and X"
    },
    "objective": {
      "en": "Stretch left index down to B and left ring down to X."
    },
    "newKeys": [
      "KeyB",
      "KeyX"
    ],
    "tips": [
      {
        "en": "F reaches down-right to B; S curls down to X."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "fb bf fb bf sx xs sx xs fbf sxs bbb xxx"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "box exact basic habit blame mixed balance"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "exact habits balance basic mixed boxes"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-15-bx.json": {
    "schemaVersion": 1,
    "id": "fund-15-bx",
    "title": {
      "en": "Outer Bottom: B and X"
    },
    "objective": {
      "en": "Stretch left index down to B and left ring down to X."
    },
    "newKeys": [
      "KeyB",
      "KeyX"
    ],
    "tips": [
      {
        "en": "F reaches down-right to B; S curls down to X."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "fb bf fb bf sx xs sx xs fbf sxs bbb xxx"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "box exact basic habit blame mixed balance"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "exact habits balance basic mixed boxes"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-15-bx.json": {
    "schemaVersion": 1,
    "id": "fund-15-bx",
    "title": {
      "en": "Outer Bottom: B and X"
    },
    "objective": {
      "en": "Stretch left index down to B and left ring down to X."
    },
    "newKeys": [
      "KeyB",
      "KeyX"
    ],
    "tips": [
      {
        "en": "F reaches down-right to B; S curls down to X."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "fb bf fb bf sx xs sx xs fbf sxs bbb xxx"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "box exact basic habit blame mixed balance"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "exact habits balance basic mixed boxes"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fund-16-z-slash": {
    "schemaVersion": 1,
    "id": "fund-16-z-slash",
    "title": {
      "en": "Pinky Drops: Z and Slash"
    },
    "objective": {
      "en": "Curl left pinky to Z and right pinky to Slash (/)."
    },
    "newKeys": [
      "KeyZ",
      "Slash"
    ],
    "tips": [
      {
        "en": "A reaches down to Z; Semicolon reaches down to Slash."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "az za az za ;/ /; ;/ /; az/ z/z zzz ///"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "zero zone maze prize puzzle blaze zip"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the blaze in the zero zone amazed the team"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-16-z-slash.json": {
    "schemaVersion": 1,
    "id": "fund-16-z-slash",
    "title": {
      "en": "Pinky Drops: Z and Slash"
    },
    "objective": {
      "en": "Curl left pinky to Z and right pinky to Slash (/)."
    },
    "newKeys": [
      "KeyZ",
      "Slash"
    ],
    "tips": [
      {
        "en": "A reaches down to Z; Semicolon reaches down to Slash."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "az za az za ;/ /; ;/ /; az/ z/z zzz ///"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "zero zone maze prize puzzle blaze zip"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the blaze in the zero zone amazed the team"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-16-z-slash.json": {
    "schemaVersion": 1,
    "id": "fund-16-z-slash",
    "title": {
      "en": "Pinky Drops: Z and Slash"
    },
    "objective": {
      "en": "Curl left pinky to Z and right pinky to Slash (/)."
    },
    "newKeys": [
      "KeyZ",
      "Slash"
    ],
    "tips": [
      {
        "en": "A reaches down to Z; Semicolon reaches down to Slash."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "az za az za ;/ /; ;/ /; az/ z/z zzz ///"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "zero zone maze prize puzzle blaze zip"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the blaze in the zero zone amazed the team"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fund-17-comma-period": {
    "schemaVersion": 1,
    "id": "fund-17-comma-period",
    "title": {
      "en": "Punctuation Drops: Comma and Period"
    },
    "objective": {
      "en": "Curl right middle down to Comma (,) and right ring down to Period (.)."
    },
    "newKeys": [
      "Comma",
      "Period"
    ],
    "tips": [
      {
        "en": "K reaches down to Comma (,); L reaches down to Period (.)."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "k, ,k k, ,k l. .l l. .l k,l. ,.,."
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "yes, no. wait, look. stop, go. clear, clean."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "steady hands make few mistakes, and speed grows daily."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-17-comma-period.json": {
    "schemaVersion": 1,
    "id": "fund-17-comma-period",
    "title": {
      "en": "Punctuation Drops: Comma and Period"
    },
    "objective": {
      "en": "Curl right middle down to Comma (,) and right ring down to Period (.)."
    },
    "newKeys": [
      "Comma",
      "Period"
    ],
    "tips": [
      {
        "en": "K reaches down to Comma (,); L reaches down to Period (.)."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "k, ,k k, ,k l. .l l. .l k,l. ,.,."
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "yes, no. wait, look. stop, go. clear, clean."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "steady hands make few mistakes, and speed grows daily."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-17-comma-period.json": {
    "schemaVersion": 1,
    "id": "fund-17-comma-period",
    "title": {
      "en": "Punctuation Drops: Comma and Period"
    },
    "objective": {
      "en": "Curl right middle down to Comma (,) and right ring down to Period (.)."
    },
    "newKeys": [
      "Comma",
      "Period"
    ],
    "tips": [
      {
        "en": "K reaches down to Comma (,); L reaches down to Period (.)."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "k, ,k k, ,k l. .l l. .l k,l. ,.,."
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "yes, no. wait, look. stop, go. clear, clean."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "steady hands make few mistakes, and speed grows daily."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fund-18-alphabet-run": {
    "schemaVersion": 1,
    "id": "fund-18-alphabet-run",
    "title": {
      "en": "The Complete Alphabet Marathon"
    },
    "objective": {
      "en": "Type sentences containing all 26 letters of the English alphabet."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Trust muscle memory without hesitating."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "the quick brown fox jumps over the lazy dog"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "pack my box with five dozen liquor jugs"
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "sphinx of black quartz judge my vow as we discover all keys cleanly and rhythmically."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-18-alphabet-run.json": {
    "schemaVersion": 1,
    "id": "fund-18-alphabet-run",
    "title": {
      "en": "The Complete Alphabet Marathon"
    },
    "objective": {
      "en": "Type sentences containing all 26 letters of the English alphabet."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Trust muscle memory without hesitating."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "the quick brown fox jumps over the lazy dog"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "pack my box with five dozen liquor jugs"
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "sphinx of black quartz judge my vow as we discover all keys cleanly and rhythmically."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-18-alphabet-run.json": {
    "schemaVersion": 1,
    "id": "fund-18-alphabet-run",
    "title": {
      "en": "The Complete Alphabet Marathon"
    },
    "objective": {
      "en": "Type sentences containing all 26 letters of the English alphabet."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Trust muscle memory without hesitating."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "the quick brown fox jumps over the lazy dog"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "pack my box with five dozen liquor jugs"
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "sphinx of black quartz judge my vow as we discover all keys cleanly and rhythmically."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "fund-19-left-shift": {
    "schemaVersion": 1,
    "id": "fund-19-left-shift",
    "title": {
      "en": "Left Shift: Capitalizing Right Hand Keys"
    },
    "objective": {
      "en": "Hold Left Shift with left pinky while striking right hand keys."
    },
    "newKeys": [
      "ShiftLeft"
    ],
    "tips": [
      {
        "en": "Press and hold Left Shift before striking J, K, L, U, I, O, P, etc."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "John King Lake United Ohio Pacific Mountain"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "John Kept Looking In Open Places"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-19-left-shift.json": {
    "schemaVersion": 1,
    "id": "fund-19-left-shift",
    "title": {
      "en": "Left Shift: Capitalizing Right Hand Keys"
    },
    "objective": {
      "en": "Hold Left Shift with left pinky while striking right hand keys."
    },
    "newKeys": [
      "ShiftLeft"
    ],
    "tips": [
      {
        "en": "Press and hold Left Shift before striking J, K, L, U, I, O, P, etc."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "John King Lake United Ohio Pacific Mountain"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "John Kept Looking In Open Places"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-19-left-shift.json": {
    "schemaVersion": 1,
    "id": "fund-19-left-shift",
    "title": {
      "en": "Left Shift: Capitalizing Right Hand Keys"
    },
    "objective": {
      "en": "Hold Left Shift with left pinky while striking right hand keys."
    },
    "newKeys": [
      "ShiftLeft"
    ],
    "tips": [
      {
        "en": "Press and hold Left Shift before striking J, K, L, U, I, O, P, etc."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "John King Lake United Ohio Pacific Mountain"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "John Kept Looking In Open Places"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fund-20-right-shift": {
    "schemaVersion": 1,
    "id": "fund-20-right-shift",
    "title": {
      "en": "Right Shift: Capitalizing Left Hand Keys"
    },
    "objective": {
      "en": "Hold Right Shift with right pinky while striking left hand keys."
    },
    "newKeys": [
      "ShiftRight"
    ],
    "tips": [
      {
        "en": "Press and hold Right Shift before striking F, D, S, A, R, E, W, Q, etc."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "Frank David Sarah Alice Robert Edward William"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Frank Saw David While Alice Rested"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-20-right-shift.json": {
    "schemaVersion": 1,
    "id": "fund-20-right-shift",
    "title": {
      "en": "Right Shift: Capitalizing Left Hand Keys"
    },
    "objective": {
      "en": "Hold Right Shift with right pinky while striking left hand keys."
    },
    "newKeys": [
      "ShiftRight"
    ],
    "tips": [
      {
        "en": "Press and hold Right Shift before striking F, D, S, A, R, E, W, Q, etc."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "Frank David Sarah Alice Robert Edward William"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Frank Saw David While Alice Rested"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-20-right-shift.json": {
    "schemaVersion": 1,
    "id": "fund-20-right-shift",
    "title": {
      "en": "Right Shift: Capitalizing Left Hand Keys"
    },
    "objective": {
      "en": "Hold Right Shift with right pinky while striking left hand keys."
    },
    "newKeys": [
      "ShiftRight"
    ],
    "tips": [
      {
        "en": "Press and hold Right Shift before striking F, D, S, A, R, E, W, Q, etc."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "Frank David Sarah Alice Robert Edward William"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Frank Saw David While Alice Rested"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 26,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fund-21-mixed-caps": {
    "schemaVersion": 1,
    "id": "fund-21-mixed-caps",
    "title": {
      "en": "Alternating Shift Hand Coordination"
    },
    "objective": {
      "en": "Coordinate both shift keys seamlessly on proper names and titles."
    },
    "newKeys": [
      "ShiftLeft",
      "ShiftRight"
    ],
    "tips": [
      {
        "en": "Opposite shift key rule: right hand keys use left shift; left hand keys use right shift."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "London Paris Tokyo Berlin Washington Madrid Cairo Sydney"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Every New City Brings Fresh Energy And Bright Hope"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-21-mixed-caps.json": {
    "schemaVersion": 1,
    "id": "fund-21-mixed-caps",
    "title": {
      "en": "Alternating Shift Hand Coordination"
    },
    "objective": {
      "en": "Coordinate both shift keys seamlessly on proper names and titles."
    },
    "newKeys": [
      "ShiftLeft",
      "ShiftRight"
    ],
    "tips": [
      {
        "en": "Opposite shift key rule: right hand keys use left shift; left hand keys use right shift."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "London Paris Tokyo Berlin Washington Madrid Cairo Sydney"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Every New City Brings Fresh Energy And Bright Hope"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-21-mixed-caps.json": {
    "schemaVersion": 1,
    "id": "fund-21-mixed-caps",
    "title": {
      "en": "Alternating Shift Hand Coordination"
    },
    "objective": {
      "en": "Coordinate both shift keys seamlessly on proper names and titles."
    },
    "newKeys": [
      "ShiftLeft",
      "ShiftRight"
    ],
    "tips": [
      {
        "en": "Opposite shift key rule: right hand keys use left shift; left hand keys use right shift."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "London Paris Tokyo Berlin Washington Madrid Cairo Sydney"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Every New City Brings Fresh Energy And Bright Hope"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fund-22-sentence-caps": {
    "schemaVersion": 1,
    "id": "fund-22-sentence-caps",
    "title": {
      "en": "Full Sentence Capitalization & Rhythm"
    },
    "objective": {
      "en": "Type punctuated paragraphs with standard sentence capitalization."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Maintain a constant typing tempo."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Great things are not done by impulse, but by a series of small things brought together. Vincent Van Gogh observed this truth about all mastery."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-22-sentence-caps.json": {
    "schemaVersion": 1,
    "id": "fund-22-sentence-caps",
    "title": {
      "en": "Full Sentence Capitalization & Rhythm"
    },
    "objective": {
      "en": "Type punctuated paragraphs with standard sentence capitalization."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Maintain a constant typing tempo."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Great things are not done by impulse, but by a series of small things brought together. Vincent Van Gogh observed this truth about all mastery."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-22-sentence-caps.json": {
    "schemaVersion": 1,
    "id": "fund-22-sentence-caps",
    "title": {
      "en": "Full Sentence Capitalization & Rhythm"
    },
    "objective": {
      "en": "Type punctuated paragraphs with standard sentence capitalization."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Maintain a constant typing tempo."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Great things are not done by impulse, but by a series of small things brought together. Vincent Van Gogh observed this truth about all mastery."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "fund-23-acronyms": {
    "schemaVersion": 1,
    "id": "fund-23-acronyms",
    "title": {
      "en": "ALL CAPS & Acronym Control"
    },
    "objective": {
      "en": "Type multi-character uppercase acronyms without losing finger home placement."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Do not use CapsLock for short acronyms; hold the shift key."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "HTML CSS JSON REST API HTTP URL ASCII UTF"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Send the JSON payload via HTTP to the REST API"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-23-acronyms.json": {
    "schemaVersion": 1,
    "id": "fund-23-acronyms",
    "title": {
      "en": "ALL CAPS & Acronym Control"
    },
    "objective": {
      "en": "Type multi-character uppercase acronyms without losing finger home placement."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Do not use CapsLock for short acronyms; hold the shift key."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "HTML CSS JSON REST API HTTP URL ASCII UTF"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Send the JSON payload via HTTP to the REST API"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-23-acronyms.json": {
    "schemaVersion": 1,
    "id": "fund-23-acronyms",
    "title": {
      "en": "ALL CAPS & Acronym Control"
    },
    "objective": {
      "en": "Type multi-character uppercase acronyms without losing finger home placement."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Do not use CapsLock for short acronyms; hold the shift key."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "HTML CSS JSON REST API HTTP URL ASCII UTF"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Send the JSON payload via HTTP to the REST API"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fund-24-caps-speed": {
    "schemaVersion": 1,
    "id": "fund-24-caps-speed",
    "title": {
      "en": "Capitalization Sprint"
    },
    "objective": {
      "en": "Combine speed with zero shift release errors."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Release shift immediately after key impact."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "The North Atlantic Treaty, The United Nations, and The World Wide Web Consortium shape international standards across continents."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 32,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-24-caps-speed.json": {
    "schemaVersion": 1,
    "id": "fund-24-caps-speed",
    "title": {
      "en": "Capitalization Sprint"
    },
    "objective": {
      "en": "Combine speed with zero shift release errors."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Release shift immediately after key impact."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "The North Atlantic Treaty, The United Nations, and The World Wide Web Consortium shape international standards across continents."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 32,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-24-caps-speed.json": {
    "schemaVersion": 1,
    "id": "fund-24-caps-speed",
    "title": {
      "en": "Capitalization Sprint"
    },
    "objective": {
      "en": "Combine speed with zero shift release errors."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Release shift immediately after key impact."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "The North Atlantic Treaty, The United Nations, and The World Wide Web Consortium shape international standards across continents."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 32,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "fund-25-num-47": {
    "schemaVersion": 1,
    "id": "fund-25-num-47",
    "title": {
      "en": "Index Numbers: 4, 5, 6, 7"
    },
    "objective": {
      "en": "Reach left index up to 4 and 5; right index up to 6 and 7."
    },
    "newKeys": [
      "Digit4",
      "Digit5",
      "Digit6",
      "Digit7"
    ],
    "tips": [
      {
        "en": "F reaches up to 4 and 5; J reaches up to 6 and 7."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "f4 4f f5 5f j7 7j j6 6j 45 67 47 56 4567"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "44 55 66 77 457 765 476 574"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "we ordered 45 items and 67 boxes from room 47"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 22,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-25-num-47.json": {
    "schemaVersion": 1,
    "id": "fund-25-num-47",
    "title": {
      "en": "Index Numbers: 4, 5, 6, 7"
    },
    "objective": {
      "en": "Reach left index up to 4 and 5; right index up to 6 and 7."
    },
    "newKeys": [
      "Digit4",
      "Digit5",
      "Digit6",
      "Digit7"
    ],
    "tips": [
      {
        "en": "F reaches up to 4 and 5; J reaches up to 6 and 7."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "f4 4f f5 5f j7 7j j6 6j 45 67 47 56 4567"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "44 55 66 77 457 765 476 574"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "we ordered 45 items and 67 boxes from room 47"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 22,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-25-num-47.json": {
    "schemaVersion": 1,
    "id": "fund-25-num-47",
    "title": {
      "en": "Index Numbers: 4, 5, 6, 7"
    },
    "objective": {
      "en": "Reach left index up to 4 and 5; right index up to 6 and 7."
    },
    "newKeys": [
      "Digit4",
      "Digit5",
      "Digit6",
      "Digit7"
    ],
    "tips": [
      {
        "en": "F reaches up to 4 and 5; J reaches up to 6 and 7."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "f4 4f f5 5f j7 7j j6 6j 45 67 47 56 4567"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "44 55 66 77 457 765 476 574"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "we ordered 45 items and 67 boxes from room 47"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 22,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fund-26-num-38": {
    "schemaVersion": 1,
    "id": "fund-26-num-38",
    "title": {
      "en": "Middle Numbers: 3 and 8"
    },
    "objective": {
      "en": "Reach left middle up to 3 and right middle up to 8."
    },
    "newKeys": [
      "Digit3",
      "Digit8"
    ],
    "tips": [
      {
        "en": "D reaches up to 3; K reaches up to 8."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "d3 3d d3 3d k8 8k k8 8k 38 83 33 88 3838"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the flight leaves at 38 minutes past 3 or 8"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 24,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-26-num-38.json": {
    "schemaVersion": 1,
    "id": "fund-26-num-38",
    "title": {
      "en": "Middle Numbers: 3 and 8"
    },
    "objective": {
      "en": "Reach left middle up to 3 and right middle up to 8."
    },
    "newKeys": [
      "Digit3",
      "Digit8"
    ],
    "tips": [
      {
        "en": "D reaches up to 3; K reaches up to 8."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "d3 3d d3 3d k8 8k k8 8k 38 83 33 88 3838"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the flight leaves at 38 minutes past 3 or 8"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 24,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-26-num-38.json": {
    "schemaVersion": 1,
    "id": "fund-26-num-38",
    "title": {
      "en": "Middle Numbers: 3 and 8"
    },
    "objective": {
      "en": "Reach left middle up to 3 and right middle up to 8."
    },
    "newKeys": [
      "Digit3",
      "Digit8"
    ],
    "tips": [
      {
        "en": "D reaches up to 3; K reaches up to 8."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "d3 3d d3 3d k8 8k k8 8k 38 83 33 88 3838"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the flight leaves at 38 minutes past 3 or 8"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 24,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fund-27-num-29": {
    "schemaVersion": 1,
    "id": "fund-27-num-29",
    "title": {
      "en": "Ring Numbers: 2 and 9"
    },
    "objective": {
      "en": "Reach left ring up to 2 and right ring up to 9."
    },
    "newKeys": [
      "Digit2",
      "Digit9"
    ],
    "tips": [
      {
        "en": "S reaches up to 2; L reaches up to 9."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "s2 2s s2 2s l9 9l l9 9l 29 92 22 99 2929"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "page 29 lists 92 references and 299 citations"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 24,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-27-num-29.json": {
    "schemaVersion": 1,
    "id": "fund-27-num-29",
    "title": {
      "en": "Ring Numbers: 2 and 9"
    },
    "objective": {
      "en": "Reach left ring up to 2 and right ring up to 9."
    },
    "newKeys": [
      "Digit2",
      "Digit9"
    ],
    "tips": [
      {
        "en": "S reaches up to 2; L reaches up to 9."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "s2 2s s2 2s l9 9l l9 9l 29 92 22 99 2929"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "page 29 lists 92 references and 299 citations"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 24,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-27-num-29.json": {
    "schemaVersion": 1,
    "id": "fund-27-num-29",
    "title": {
      "en": "Ring Numbers: 2 and 9"
    },
    "objective": {
      "en": "Reach left ring up to 2 and right ring up to 9."
    },
    "newKeys": [
      "Digit2",
      "Digit9"
    ],
    "tips": [
      {
        "en": "S reaches up to 2; L reaches up to 9."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "s2 2s s2 2s l9 9l l9 9l 29 92 22 99 2929"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "page 29 lists 92 references and 299 citations"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 24,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fund-28-num-10": {
    "schemaVersion": 1,
    "id": "fund-28-num-10",
    "title": {
      "en": "Pinky Numbers: 1 and 0"
    },
    "objective": {
      "en": "Reach left pinky up to 1 and right pinky up to 0."
    },
    "newKeys": [
      "Digit1",
      "Digit0"
    ],
    "tips": [
      {
        "en": "A reaches up to 1; Semicolon reaches up to 0."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "a1 1a a1 1a ;0 0; ;0 0; 10 100 1000 1010"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "unit 10 received 100 requests in 10 minutes"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-28-num-10.json": {
    "schemaVersion": 1,
    "id": "fund-28-num-10",
    "title": {
      "en": "Pinky Numbers: 1 and 0"
    },
    "objective": {
      "en": "Reach left pinky up to 1 and right pinky up to 0."
    },
    "newKeys": [
      "Digit1",
      "Digit0"
    ],
    "tips": [
      {
        "en": "A reaches up to 1; Semicolon reaches up to 0."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "a1 1a a1 1a ;0 0; ;0 0; 10 100 1000 1010"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "unit 10 received 100 requests in 10 minutes"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-28-num-10.json": {
    "schemaVersion": 1,
    "id": "fund-28-num-10",
    "title": {
      "en": "Pinky Numbers: 1 and 0"
    },
    "objective": {
      "en": "Reach left pinky up to 1 and right pinky up to 0."
    },
    "newKeys": [
      "Digit1",
      "Digit0"
    ],
    "tips": [
      {
        "en": "A reaches up to 1; Semicolon reaches up to 0."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "a1 1a a1 1a ;0 0; ;0 0; 10 100 1000 1010"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "unit 10 received 100 requests in 10 minutes"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "fund-29-num-dates": {
    "schemaVersion": 1,
    "id": "fund-29-num-dates",
    "title": {
      "en": "Dates, Times, and Full Numbers"
    },
    "objective": {
      "en": "Type standard numbers and historical dates fluidly."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Return to home row after every number reach."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "in 1969 humans landed on the moon after 10 years of effort"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the year 2026 brings 365 days of new possibilities"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-29-num-dates.json": {
    "schemaVersion": 1,
    "id": "fund-29-num-dates",
    "title": {
      "en": "Dates, Times, and Full Numbers"
    },
    "objective": {
      "en": "Type standard numbers and historical dates fluidly."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Return to home row after every number reach."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "in 1969 humans landed on the moon after 10 years of effort"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the year 2026 brings 365 days of new possibilities"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-29-num-dates.json": {
    "schemaVersion": 1,
    "id": "fund-29-num-dates",
    "title": {
      "en": "Dates, Times, and Full Numbers"
    },
    "objective": {
      "en": "Type standard numbers and historical dates fluidly."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Return to home row after every number reach."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "in 1969 humans landed on the moon after 10 years of effort"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the year 2026 brings 365 days of new possibilities"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fund-30-num-sprint": {
    "schemaVersion": 1,
    "id": "fund-30-num-sprint",
    "title": {
      "en": "Number Row Mastery Sprint"
    },
    "objective": {
      "en": "Execute rapid number sequences without looking."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Count rhythmically in your mind."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "dial 1800 234 5678 or call office 302 on floor 19"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-30-num-sprint.json": {
    "schemaVersion": 1,
    "id": "fund-30-num-sprint",
    "title": {
      "en": "Number Row Mastery Sprint"
    },
    "objective": {
      "en": "Execute rapid number sequences without looking."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Count rhythmically in your mind."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "dial 1800 234 5678 or call office 302 on floor 19"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-30-num-sprint.json": {
    "schemaVersion": 1,
    "id": "fund-30-num-sprint",
    "title": {
      "en": "Number Row Mastery Sprint"
    },
    "objective": {
      "en": "Execute rapid number sequences without looking."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Count rhythmically in your mind."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "dial 1800 234 5678 or call office 302 on floor 19"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "fund-31-quotes-hyphens": {
    "schemaVersion": 1,
    "id": "fund-31-quotes-hyphens",
    "title": {
      "en": "Quotes, Apostrophes, and Hyphens"
    },
    "objective": {
      "en": "Master single quote ('), double quote (\"), and hyphen (-)."
    },
    "newKeys": [
      "Quote",
      "Minus"
    ],
    "tips": [
      {
        "en": "Right pinky controls Quote and Hyphen."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "it's don't can't well-known full-time high-speed"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "\"Knowledge is power,\" said the well-known teacher."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-31-quotes-hyphens.json": {
    "schemaVersion": 1,
    "id": "fund-31-quotes-hyphens",
    "title": {
      "en": "Quotes, Apostrophes, and Hyphens"
    },
    "objective": {
      "en": "Master single quote ('), double quote (\"), and hyphen (-)."
    },
    "newKeys": [
      "Quote",
      "Minus"
    ],
    "tips": [
      {
        "en": "Right pinky controls Quote and Hyphen."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "it's don't can't well-known full-time high-speed"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "\"Knowledge is power,\" said the well-known teacher."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-31-quotes-hyphens.json": {
    "schemaVersion": 1,
    "id": "fund-31-quotes-hyphens",
    "title": {
      "en": "Quotes, Apostrophes, and Hyphens"
    },
    "objective": {
      "en": "Master single quote ('), double quote (\"), and hyphen (-)."
    },
    "newKeys": [
      "Quote",
      "Minus"
    ],
    "tips": [
      {
        "en": "Right pinky controls Quote and Hyphen."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "it's don't can't well-known full-time high-speed"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "\"Knowledge is power,\" said the well-known teacher."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "fund-32-parentheses-excl": {
    "schemaVersion": 1,
    "id": "fund-32-parentheses-excl",
    "title": {
      "en": "Exclamation, Question, and Parentheses"
    },
    "objective": {
      "en": "Type Shifted punctuation marks (!, ?, (, ))."
    },
    "newKeys": [
      "Digit1",
      "Slash",
      "Digit9",
      "Digit0"
    ],
    "tips": [
      {
        "en": "Use opposite shift key for shifted number row symbols."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "Are you ready? Yes, absolutely! (Let us begin now.)"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Wait! Did you notice the difference (between A and B)?"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-32-parentheses-excl.json": {
    "schemaVersion": 1,
    "id": "fund-32-parentheses-excl",
    "title": {
      "en": "Exclamation, Question, and Parentheses"
    },
    "objective": {
      "en": "Type Shifted punctuation marks (!, ?, (, ))."
    },
    "newKeys": [
      "Digit1",
      "Slash",
      "Digit9",
      "Digit0"
    ],
    "tips": [
      {
        "en": "Use opposite shift key for shifted number row symbols."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "Are you ready? Yes, absolutely! (Let us begin now.)"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Wait! Did you notice the difference (between A and B)?"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-32-parentheses-excl.json": {
    "schemaVersion": 1,
    "id": "fund-32-parentheses-excl",
    "title": {
      "en": "Exclamation, Question, and Parentheses"
    },
    "objective": {
      "en": "Type Shifted punctuation marks (!, ?, (, ))."
    },
    "newKeys": [
      "Digit1",
      "Slash",
      "Digit9",
      "Digit0"
    ],
    "tips": [
      {
        "en": "Use opposite shift key for shifted number row symbols."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "Are you ready? Yes, absolutely! (Let us begin now.)"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Wait! Did you notice the difference (between A and B)?"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fund-33-symbols": {
    "schemaVersion": 1,
    "id": "fund-33-symbols",
    "title": {
      "en": "Currency & Symbols ($, %, &, @, #)"
    },
    "objective": {
      "en": "Reach shifted symbol keys across the number row."
    },
    "newKeys": [
      "Digit2",
      "Digit3",
      "Digit4",
      "Digit5",
      "Digit7"
    ],
    "tips": [
      {
        "en": "4 reaches for $, 5 for %, 7 for &, 2 for @, 3 for #."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "save $500 or 15% on orders at user@example.com #deals"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "growth & profit reached $100M with a 25% margin"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-33-symbols.json": {
    "schemaVersion": 1,
    "id": "fund-33-symbols",
    "title": {
      "en": "Currency & Symbols ($, %, &, @, #)"
    },
    "objective": {
      "en": "Reach shifted symbol keys across the number row."
    },
    "newKeys": [
      "Digit2",
      "Digit3",
      "Digit4",
      "Digit5",
      "Digit7"
    ],
    "tips": [
      {
        "en": "4 reaches for $, 5 for %, 7 for &, 2 for @, 3 for #."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "save $500 or 15% on orders at user@example.com #deals"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "growth & profit reached $100M with a 25% margin"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-33-symbols.json": {
    "schemaVersion": 1,
    "id": "fund-33-symbols",
    "title": {
      "en": "Currency & Symbols ($, %, &, @, #)"
    },
    "objective": {
      "en": "Reach shifted symbol keys across the number row."
    },
    "newKeys": [
      "Digit2",
      "Digit3",
      "Digit4",
      "Digit5",
      "Digit7"
    ],
    "tips": [
      {
        "en": "4 reaches for $, 5 for %, 7 for &, 2 for @, 3 for #."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "save $500 or 15% on orders at user@example.com #deals"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "growth & profit reached $100M with a 25% margin"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "fund-34-paragraphs": {
    "schemaVersion": 1,
    "id": "fund-34-paragraphs",
    "title": {
      "en": "Professional Prose Fluency"
    },
    "objective": {
      "en": "Sustain steady 40+ WPM cadence across multi-sentence paragraphs."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Maintain calm posture and breathe smoothly."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Precision in typing reflects precision in thought. When your fingers move across the keyboard effortlessly, you remove the barrier between conceptual idea and written expression."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 35,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-34-paragraphs.json": {
    "schemaVersion": 1,
    "id": "fund-34-paragraphs",
    "title": {
      "en": "Professional Prose Fluency"
    },
    "objective": {
      "en": "Sustain steady 40+ WPM cadence across multi-sentence paragraphs."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Maintain calm posture and breathe smoothly."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Precision in typing reflects precision in thought. When your fingers move across the keyboard effortlessly, you remove the barrier between conceptual idea and written expression."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 35,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-34-paragraphs.json": {
    "schemaVersion": 1,
    "id": "fund-34-paragraphs",
    "title": {
      "en": "Professional Prose Fluency"
    },
    "objective": {
      "en": "Sustain steady 40+ WPM cadence across multi-sentence paragraphs."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Maintain calm posture and breathe smoothly."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Precision in typing reflects precision in thought. When your fingers move across the keyboard effortlessly, you remove the barrier between conceptual idea and written expression."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 35,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "fund-35-grand-mastery": {
    "schemaVersion": 1,
    "id": "fund-35-grand-mastery",
    "title": {
      "en": "Touch Typing Grand Mastery Assessment"
    },
    "objective": {
      "en": "Final certification of comprehensive English QWERTY touch-typing skill."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "You have conquered all 47 keys. Type with confidence!"
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Congratulations on reaching the pinnacle of English touch typing! From humble beginnings on the F and J bumps, you have mastered every reach, symbol, number, and capital letter across the entire keyboard layout."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 40,
      "minAccuracy": 96,
      "maxErrorsPerStep": null
    }
  },
  "lessons/fund-35-grand-mastery.json": {
    "schemaVersion": 1,
    "id": "fund-35-grand-mastery",
    "title": {
      "en": "Touch Typing Grand Mastery Assessment"
    },
    "objective": {
      "en": "Final certification of comprehensive English QWERTY touch-typing skill."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "You have conquered all 47 keys. Type with confidence!"
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Congratulations on reaching the pinnacle of English touch typing! From humble beginnings on the F and J bumps, you have mastered every reach, symbol, number, and capital letter across the entire keyboard layout."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 40,
      "minAccuracy": 96,
      "maxErrorsPerStep": null
    }
  },
  "fundamentals/lessons/fund-35-grand-mastery.json": {
    "schemaVersion": 1,
    "id": "fund-35-grand-mastery",
    "title": {
      "en": "Touch Typing Grand Mastery Assessment"
    },
    "objective": {
      "en": "Final certification of comprehensive English QWERTY touch-typing skill."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "You have conquered all 47 keys. Type with confidence!"
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Congratulations on reaching the pinnacle of English touch typing! From humble beginnings on the F and J bumps, you have mastered every reach, symbol, number, and capital letter across the entire keyboard layout."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 40,
      "minAccuracy": 96,
      "maxErrorsPerStep": null
    }
  },
  "prog-01-delimiters": {
    "schemaVersion": 1,
    "id": "prog-01-delimiters",
    "title": {
      "en": "Braces, Brackets, and Parentheses"
    },
    "objective": {
      "en": "Master code scoping delimiters ({}, [], ())."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "keys",
        "items": [
          "{ } [ ] ( ) { [ ( ) ] } () [] {}"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "const list = [1, 2, { id: 3, items: [] }];"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "lessons/prog-01-delimiters.json": {
    "schemaVersion": 1,
    "id": "prog-01-delimiters",
    "title": {
      "en": "Braces, Brackets, and Parentheses"
    },
    "objective": {
      "en": "Master code scoping delimiters ({}, [], ())."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "keys",
        "items": [
          "{ } [ ] ( ) { [ ( ) ] } () [] {}"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "const list = [1, 2, { id: 3, items: [] }];"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "programmer/lessons/prog-01-delimiters.json": {
    "schemaVersion": 1,
    "id": "prog-01-delimiters",
    "title": {
      "en": "Braces, Brackets, and Parentheses"
    },
    "objective": {
      "en": "Master code scoping delimiters ({}, [], ())."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "keys",
        "items": [
          "{ } [ ] ( ) { [ ( ) ] } () [] {}"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "const list = [1, 2, { id: 3, items: [] }];"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "prog-02-operators": {
    "schemaVersion": 1,
    "id": "prog-02-operators",
    "title": {
      "en": "Comparison & Logic Operators"
    },
    "objective": {
      "en": "Type arrows, comparisons, and boolean logic (=>, ===, &&, ||)."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "if (a === b && c !== d || count <= 0) return true;"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "const add = (x: number, y: number): number => x + y;"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "lessons/prog-02-operators.json": {
    "schemaVersion": 1,
    "id": "prog-02-operators",
    "title": {
      "en": "Comparison & Logic Operators"
    },
    "objective": {
      "en": "Type arrows, comparisons, and boolean logic (=>, ===, &&, ||)."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "if (a === b && c !== d || count <= 0) return true;"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "const add = (x: number, y: number): number => x + y;"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "programmer/lessons/prog-02-operators.json": {
    "schemaVersion": 1,
    "id": "prog-02-operators",
    "title": {
      "en": "Comparison & Logic Operators"
    },
    "objective": {
      "en": "Type arrows, comparisons, and boolean logic (=>, ===, &&, ||)."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "if (a === b && c !== d || count <= 0) return true;"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "const add = (x: number, y: number): number => x + y;"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "prog-03-casing": {
    "schemaVersion": 1,
    "id": "prog-03-casing",
    "title": {
      "en": "Identifiers & Naming Conventions"
    },
    "objective": {
      "en": "Practice camelCase, PascalCase, snake_case, and CONST_CASE."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "words",
        "items": [
          "getUserById fetchUserProfile MAX_RETRY_COUNT is_valid_token"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "const activeProfileId = profileRepo.get_default_id();"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "lessons/prog-03-casing.json": {
    "schemaVersion": 1,
    "id": "prog-03-casing",
    "title": {
      "en": "Identifiers & Naming Conventions"
    },
    "objective": {
      "en": "Practice camelCase, PascalCase, snake_case, and CONST_CASE."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "words",
        "items": [
          "getUserById fetchUserProfile MAX_RETRY_COUNT is_valid_token"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "const activeProfileId = profileRepo.get_default_id();"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "programmer/lessons/prog-03-casing.json": {
    "schemaVersion": 1,
    "id": "prog-03-casing",
    "title": {
      "en": "Identifiers & Naming Conventions"
    },
    "objective": {
      "en": "Practice camelCase, PascalCase, snake_case, and CONST_CASE."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "words",
        "items": [
          "getUserById fetchUserProfile MAX_RETRY_COUNT is_valid_token"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "const activeProfileId = profileRepo.get_default_id();"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 28,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "prog-04-jsx-html": {
    "schemaVersion": 1,
    "id": "prog-04-jsx-html",
    "title": {
      "en": "HTML Tags & JSX Elements"
    },
    "objective": {
      "en": "Rapidly type angle brackets (<, >), self-closing tags, and attributes."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "<button onClick={handleClick} className=\"px-3 py-2 text-sm\">"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "<div className=\"flex items-center gap-2\" />"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "lessons/prog-04-jsx-html.json": {
    "schemaVersion": 1,
    "id": "prog-04-jsx-html",
    "title": {
      "en": "HTML Tags & JSX Elements"
    },
    "objective": {
      "en": "Rapidly type angle brackets (<, >), self-closing tags, and attributes."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "<button onClick={handleClick} className=\"px-3 py-2 text-sm\">"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "<div className=\"flex items-center gap-2\" />"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "programmer/lessons/prog-04-jsx-html.json": {
    "schemaVersion": 1,
    "id": "prog-04-jsx-html",
    "title": {
      "en": "HTML Tags & JSX Elements"
    },
    "objective": {
      "en": "Rapidly type angle brackets (<, >), self-closing tags, and attributes."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "<button onClick={handleClick} className=\"px-3 py-2 text-sm\">"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "<div className=\"flex items-center gap-2\" />"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 94,
      "maxErrorsPerStep": null
    }
  },
  "prog-05-snippets": {
    "schemaVersion": 1,
    "id": "prog-05-snippets",
    "title": {
      "en": "Full Code Snippet Fluency"
    },
    "objective": {
      "en": "Type complete functional TypeScript / Rust statements without pausing."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "export async function query<T>(sql: string, params: unknown[] = []): Promise<T[]> { const res = await db.execute(sql, params); return res.rows as T[]; }"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 32,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "lessons/prog-05-snippets.json": {
    "schemaVersion": 1,
    "id": "prog-05-snippets",
    "title": {
      "en": "Full Code Snippet Fluency"
    },
    "objective": {
      "en": "Type complete functional TypeScript / Rust statements without pausing."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "export async function query<T>(sql: string, params: unknown[] = []): Promise<T[]> { const res = await db.execute(sql, params); return res.rows as T[]; }"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 32,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "programmer/lessons/prog-05-snippets.json": {
    "schemaVersion": 1,
    "id": "prog-05-snippets",
    "title": {
      "en": "Full Code Snippet Fluency"
    },
    "objective": {
      "en": "Type complete functional TypeScript / Rust statements without pausing."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "export async function query<T>(sql: string, params: unknown[] = []): Promise<T[]> { const res = await db.execute(sql, params); return res.rows as T[]; }"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 32,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "numpad-01-home": {
    "schemaVersion": 1,
    "id": "numpad-01-home",
    "title": {
      "en": "10-Key Home Row: 4, 5, 6"
    },
    "objective": {
      "en": "Anchor middle finger on 5 (tactile bump), index on 4, ring on 6."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "keys",
        "items": [
          "456 654 456 654 44 55 66 45 56 64 546"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "456 546 645 564 465 654"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "lessons/numpad-01-home.json": {
    "schemaVersion": 1,
    "id": "numpad-01-home",
    "title": {
      "en": "10-Key Home Row: 4, 5, 6"
    },
    "objective": {
      "en": "Anchor middle finger on 5 (tactile bump), index on 4, ring on 6."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "keys",
        "items": [
          "456 654 456 654 44 55 66 45 56 64 546"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "456 546 645 564 465 654"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "numpad/lessons/numpad-01-home.json": {
    "schemaVersion": 1,
    "id": "numpad-01-home",
    "title": {
      "en": "10-Key Home Row: 4, 5, 6"
    },
    "objective": {
      "en": "Anchor middle finger on 5 (tactile bump), index on 4, ring on 6."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "keys",
        "items": [
          "456 654 456 654 44 55 66 45 56 64 546"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "456 546 645 564 465 654"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "numpad-02-reaches": {
    "schemaVersion": 1,
    "id": "numpad-02-reaches",
    "title": {
      "en": "Numpad Reaches: 7, 8, 9 and 1, 2, 3"
    },
    "objective": {
      "en": "Reach upward to 7 8 9 and downward to 1 2 3."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "keys",
        "items": [
          "789 123 789 123 741 852 963 159 357"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "123 789 456 741 852 963 789123"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "lessons/numpad-02-reaches.json": {
    "schemaVersion": 1,
    "id": "numpad-02-reaches",
    "title": {
      "en": "Numpad Reaches: 7, 8, 9 and 1, 2, 3"
    },
    "objective": {
      "en": "Reach upward to 7 8 9 and downward to 1 2 3."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "keys",
        "items": [
          "789 123 789 123 741 852 963 159 357"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "123 789 456 741 852 963 789123"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "numpad/lessons/numpad-02-reaches.json": {
    "schemaVersion": 1,
    "id": "numpad-02-reaches",
    "title": {
      "en": "Numpad Reaches: 7, 8, 9 and 1, 2, 3"
    },
    "objective": {
      "en": "Reach upward to 7 8 9 and downward to 1 2 3."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "keys",
        "items": [
          "789 123 789 123 741 852 963 159 357"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "123 789 456 741 852 963 789123"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "numpad-03-zero-decimal": {
    "schemaVersion": 1,
    "id": "numpad-03-zero-decimal",
    "title": {
      "en": "Zero, Decimal, and Enter"
    },
    "objective": {
      "en": "Use thumb on 0, ring on Decimal (.), and pinky on Enter (+ - * /)."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "words",
        "items": [
          "10.50 250.00 45.99 1200.50 89.10 3.1415"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "100 + 250 = 350; 500 - 125 = 375;"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 32,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "lessons/numpad-03-zero-decimal.json": {
    "schemaVersion": 1,
    "id": "numpad-03-zero-decimal",
    "title": {
      "en": "Zero, Decimal, and Enter"
    },
    "objective": {
      "en": "Use thumb on 0, ring on Decimal (.), and pinky on Enter (+ - * /)."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "words",
        "items": [
          "10.50 250.00 45.99 1200.50 89.10 3.1415"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "100 + 250 = 350; 500 - 125 = 375;"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 32,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "numpad/lessons/numpad-03-zero-decimal.json": {
    "schemaVersion": 1,
    "id": "numpad-03-zero-decimal",
    "title": {
      "en": "Zero, Decimal, and Enter"
    },
    "objective": {
      "en": "Use thumb on 0, ring on Decimal (.), and pinky on Enter (+ - * /)."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "words",
        "items": [
          "10.50 250.00 45.99 1200.50 89.10 3.1415"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "100 + 250 = 350; 500 - 125 = 375;"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 32,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "numpad-04-speed-entry": {
    "schemaVersion": 1,
    "id": "numpad-04-speed-entry",
    "title": {
      "en": "High-Speed Accounting Entry"
    },
    "objective": {
      "en": "Rapidly enter financial and numeric ledger data."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "1024 2048 4096 8192 16384 32768 65536 131072 262144 524288"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 38,
      "minAccuracy": 96,
      "maxErrorsPerStep": null
    }
  },
  "lessons/numpad-04-speed-entry.json": {
    "schemaVersion": 1,
    "id": "numpad-04-speed-entry",
    "title": {
      "en": "High-Speed Accounting Entry"
    },
    "objective": {
      "en": "Rapidly enter financial and numeric ledger data."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "1024 2048 4096 8192 16384 32768 65536 131072 262144 524288"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 38,
      "minAccuracy": 96,
      "maxErrorsPerStep": null
    }
  },
  "numpad/lessons/numpad-04-speed-entry.json": {
    "schemaVersion": 1,
    "id": "numpad-04-speed-entry",
    "title": {
      "en": "High-Speed Accounting Entry"
    },
    "objective": {
      "en": "Rapidly enter financial and numeric ledger data."
    },
    "newKeys": [],
    "tips": [],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "1024 2048 4096 8192 16384 32768 65536 131072 262144 524288"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 38,
      "minAccuracy": 96,
      "maxErrorsPerStep": null
    }
  },
  "speed-01-common-words": {
    "schemaVersion": 1,
    "id": "speed-01-common-words",
    "title": {
      "en": "Common Words Sprint"
    },
    "objective": {
      "en": "Build speed and rhythm with the 100 most common English words."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Focus on smooth transitions between words rather than raw speed."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "the be to of and a in that have I it for not on with he as you do at"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "this but his by from they we say her she or an will my one all would there their what"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "so up out if about who get which go me when make can like time no just him know take people"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "I would like to know if you can make time for me and my people"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/speed-01-common-words.json": {
    "schemaVersion": 1,
    "id": "speed-01-common-words",
    "title": {
      "en": "Common Words Sprint"
    },
    "objective": {
      "en": "Build speed and rhythm with the 100 most common English words."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Focus on smooth transitions between words rather than raw speed."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "the be to of and a in that have I it for not on with he as you do at"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "this but his by from they we say her she or an will my one all would there their what"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "so up out if about who get which go me when make can like time no just him know take people"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "I would like to know if you can make time for me and my people"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "speed-building/lessons/speed-01-common-words.json": {
    "schemaVersion": 1,
    "id": "speed-01-common-words",
    "title": {
      "en": "Common Words Sprint"
    },
    "objective": {
      "en": "Build speed and rhythm with the 100 most common English words."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Focus on smooth transitions between words rather than raw speed."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "the be to of and a in that have I it for not on with he as you do at"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "this but his by from they we say her she or an will my one all would there their what"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "so up out if about who get which go me when make can like time no just him know take people"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "I would like to know if you can make time for me and my people"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "speed-02-bigrams": {
    "schemaVersion": 1,
    "id": "speed-02-bigrams",
    "title": {
      "en": "High-Frequency Bigrams"
    },
    "objective": {
      "en": "Master the most common two-letter combinations in English for fluid typing."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Let your fingers flow through each bigram as a single unit, not two separate keystrokes."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "th he in er an re on at en nd st es or te of ed is it al ar"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "there other enter under state reason another interest order eastern"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the other eastern states entered another interesting order on the first date"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/speed-02-bigrams.json": {
    "schemaVersion": 1,
    "id": "speed-02-bigrams",
    "title": {
      "en": "High-Frequency Bigrams"
    },
    "objective": {
      "en": "Master the most common two-letter combinations in English for fluid typing."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Let your fingers flow through each bigram as a single unit, not two separate keystrokes."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "th he in er an re on at en nd st es or te of ed is it al ar"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "there other enter under state reason another interest order eastern"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the other eastern states entered another interesting order on the first date"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "speed-building/lessons/speed-02-bigrams.json": {
    "schemaVersion": 1,
    "id": "speed-02-bigrams",
    "title": {
      "en": "High-Frequency Bigrams"
    },
    "objective": {
      "en": "Master the most common two-letter combinations in English for fluid typing."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Let your fingers flow through each bigram as a single unit, not two separate keystrokes."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "th he in er an re on at en nd st es or te of ed is it al ar"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "there other enter under state reason another interest order eastern"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "the other eastern states entered another interesting order on the first date"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "speed-03-trigrams": {
    "schemaVersion": 1,
    "id": "speed-03-trigrams",
    "title": {
      "en": "Trigram Power Drill"
    },
    "objective": {
      "en": "Train the most common three-letter sequences to accelerate word recognition."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Think of trigrams as single finger movements rather than three individual presses."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "the and tha ent ion tio for nde has nce edt tis oft sth men"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "therefore understand intention formation evidence mention essential"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "therefore the formation of intentions requires essential evidence and understanding"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/speed-03-trigrams.json": {
    "schemaVersion": 1,
    "id": "speed-03-trigrams",
    "title": {
      "en": "Trigram Power Drill"
    },
    "objective": {
      "en": "Train the most common three-letter sequences to accelerate word recognition."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Think of trigrams as single finger movements rather than three individual presses."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "the and tha ent ion tio for nde has nce edt tis oft sth men"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "therefore understand intention formation evidence mention essential"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "therefore the formation of intentions requires essential evidence and understanding"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "speed-building/lessons/speed-03-trigrams.json": {
    "schemaVersion": 1,
    "id": "speed-03-trigrams",
    "title": {
      "en": "Trigram Power Drill"
    },
    "objective": {
      "en": "Train the most common three-letter sequences to accelerate word recognition."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Think of trigrams as single finger movements rather than three individual presses."
      }
    ],
    "steps": [
      {
        "type": "keys",
        "items": [
          "the and tha ent ion tio for nde has nce edt tis oft sth men"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "therefore understand intention formation evidence mention essential"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "therefore the formation of intentions requires essential evidence and understanding"
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "speed-04-sentences": {
    "schemaVersion": 1,
    "id": "speed-04-sentences",
    "title": {
      "en": "Sentence Flow Builder"
    },
    "objective": {
      "en": "Practice typing complete sentences with proper capitalization and punctuation at speed."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Read slightly ahead of what you are typing to maintain flow."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "The quick brown fox jumps over the lazy dog near the quiet river bank."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Every morning she reads the paper, drinks her coffee, and plans the day ahead."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "He packed his bag with five dozen quality journals for the long expedition."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Walking through the forest at dawn, they noticed how the golden light filtered through the tall oak trees."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 35,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "lessons/speed-04-sentences.json": {
    "schemaVersion": 1,
    "id": "speed-04-sentences",
    "title": {
      "en": "Sentence Flow Builder"
    },
    "objective": {
      "en": "Practice typing complete sentences with proper capitalization and punctuation at speed."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Read slightly ahead of what you are typing to maintain flow."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "The quick brown fox jumps over the lazy dog near the quiet river bank."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Every morning she reads the paper, drinks her coffee, and plans the day ahead."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "He packed his bag with five dozen quality journals for the long expedition."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Walking through the forest at dawn, they noticed how the golden light filtered through the tall oak trees."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 35,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "speed-building/lessons/speed-04-sentences.json": {
    "schemaVersion": 1,
    "id": "speed-04-sentences",
    "title": {
      "en": "Sentence Flow Builder"
    },
    "objective": {
      "en": "Practice typing complete sentences with proper capitalization and punctuation at speed."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Read slightly ahead of what you are typing to maintain flow."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "The quick brown fox jumps over the lazy dog near the quiet river bank."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Every morning she reads the paper, drinks her coffee, and plans the day ahead."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "He packed his bag with five dozen quality journals for the long expedition."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Walking through the forest at dawn, they noticed how the golden light filtered through the tall oak trees."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 35,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "speed-05-paragraphs": {
    "schemaVersion": 1,
    "id": "speed-05-paragraphs",
    "title": {
      "en": "Paragraph Endurance"
    },
    "objective": {
      "en": "Sustain typing speed and accuracy through extended multi-sentence passages."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Maintain a steady rhythm. Speed comes from consistency, not bursts."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Learning to type without looking at the keyboard is one of the most valuable skills you can develop. It frees your mind to focus on what you are writing rather than where your fingers need to go."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "The best typists in the world maintain a calm and steady rhythm. They do not rush through easy sections or slow down for difficult ones. Instead, they keep an even pace that allows their fingers to find each key with precision and confidence."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 35,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "lessons/speed-05-paragraphs.json": {
    "schemaVersion": 1,
    "id": "speed-05-paragraphs",
    "title": {
      "en": "Paragraph Endurance"
    },
    "objective": {
      "en": "Sustain typing speed and accuracy through extended multi-sentence passages."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Maintain a steady rhythm. Speed comes from consistency, not bursts."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Learning to type without looking at the keyboard is one of the most valuable skills you can develop. It frees your mind to focus on what you are writing rather than where your fingers need to go."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "The best typists in the world maintain a calm and steady rhythm. They do not rush through easy sections or slow down for difficult ones. Instead, they keep an even pace that allows their fingers to find each key with precision and confidence."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 35,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "speed-building/lessons/speed-05-paragraphs.json": {
    "schemaVersion": 1,
    "id": "speed-05-paragraphs",
    "title": {
      "en": "Paragraph Endurance"
    },
    "objective": {
      "en": "Sustain typing speed and accuracy through extended multi-sentence passages."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Maintain a steady rhythm. Speed comes from consistency, not bursts."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Learning to type without looking at the keyboard is one of the most valuable skills you can develop. It frees your mind to focus on what you are writing rather than where your fingers need to go."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "The best typists in the world maintain a calm and steady rhythm. They do not rush through easy sections or slow down for difficult ones. Instead, they keep an even pace that allows their fingers to find each key with precision and confidence."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 35,
      "minAccuracy": 93,
      "maxErrorsPerStep": null
    }
  },
  "speed-06-mixed-case": {
    "schemaVersion": 1,
    "id": "speed-06-mixed-case",
    "title": {
      "en": "Mixed Case Challenge"
    },
    "objective": {
      "en": "Master smooth shift-key coordination with proper names, titles, and mixed-case text."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Use the opposite hand shift key: left Shift for right-hand letters, right Shift for left-hand letters."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "Alice Bob Charlie Diana Edward Frank Grace Henry Irene Jack Karen Lewis"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Dr. Martin Luther King Jr. delivered a speech in Washington on August 28."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "The United Nations held a conference in New York City on Tuesday, March 15."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Professor Williams from Oxford University published her findings in the Journal of Modern Science."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/speed-06-mixed-case.json": {
    "schemaVersion": 1,
    "id": "speed-06-mixed-case",
    "title": {
      "en": "Mixed Case Challenge"
    },
    "objective": {
      "en": "Master smooth shift-key coordination with proper names, titles, and mixed-case text."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Use the opposite hand shift key: left Shift for right-hand letters, right Shift for left-hand letters."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "Alice Bob Charlie Diana Edward Frank Grace Henry Irene Jack Karen Lewis"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Dr. Martin Luther King Jr. delivered a speech in Washington on August 28."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "The United Nations held a conference in New York City on Tuesday, March 15."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Professor Williams from Oxford University published her findings in the Journal of Modern Science."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "speed-building/lessons/speed-06-mixed-case.json": {
    "schemaVersion": 1,
    "id": "speed-06-mixed-case",
    "title": {
      "en": "Mixed Case Challenge"
    },
    "objective": {
      "en": "Master smooth shift-key coordination with proper names, titles, and mixed-case text."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Use the opposite hand shift key: left Shift for right-hand letters, right Shift for left-hand letters."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "Alice Bob Charlie Diana Edward Frank Grace Henry Irene Jack Karen Lewis"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Dr. Martin Luther King Jr. delivered a speech in Washington on August 28."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "The United Nations held a conference in New York City on Tuesday, March 15."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Professor Williams from Oxford University published her findings in the Journal of Modern Science."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 30,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "speed-07-accuracy-drill": {
    "schemaVersion": 1,
    "id": "speed-07-accuracy-drill",
    "title": {
      "en": "Accuracy Precision Challenge"
    },
    "objective": {
      "en": "Push for 98% or higher accuracy on tricky word combinations and similar-looking sequences."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Slow down. Accuracy is more important than speed in this drill."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "affect effect accept except assess access desert dessert advice advise"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "principle principal stationary stationery complement compliment weather whether"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Whether the weather affects the principal decision remains to be seen in the stationary report."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "She accepted his advice to assess the effect of the dessert recipe on the complement of guests."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 97,
      "maxErrorsPerStep": null
    }
  },
  "lessons/speed-07-accuracy-drill.json": {
    "schemaVersion": 1,
    "id": "speed-07-accuracy-drill",
    "title": {
      "en": "Accuracy Precision Challenge"
    },
    "objective": {
      "en": "Push for 98% or higher accuracy on tricky word combinations and similar-looking sequences."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Slow down. Accuracy is more important than speed in this drill."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "affect effect accept except assess access desert dessert advice advise"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "principle principal stationary stationery complement compliment weather whether"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Whether the weather affects the principal decision remains to be seen in the stationary report."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "She accepted his advice to assess the effect of the dessert recipe on the complement of guests."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 97,
      "maxErrorsPerStep": null
    }
  },
  "speed-building/lessons/speed-07-accuracy-drill.json": {
    "schemaVersion": 1,
    "id": "speed-07-accuracy-drill",
    "title": {
      "en": "Accuracy Precision Challenge"
    },
    "objective": {
      "en": "Push for 98% or higher accuracy on tricky word combinations and similar-looking sequences."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Slow down. Accuracy is more important than speed in this drill."
      }
    ],
    "steps": [
      {
        "type": "words",
        "items": [
          "affect effect accept except assess access desert dessert advice advise"
        ],
        "repeat": 1
      },
      {
        "type": "words",
        "items": [
          "principle principal stationary stationery complement compliment weather whether"
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Whether the weather affects the principal decision remains to be seen in the stationary report."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "She accepted his advice to assess the effect of the dessert recipe on the complement of guests."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 97,
      "maxErrorsPerStep": null
    }
  },
  "speed-08-number-prose": {
    "schemaVersion": 1,
    "id": "speed-08-number-prose",
    "title": {
      "en": "Numbers in Prose"
    },
    "objective": {
      "en": "Seamlessly integrate number row keys into natural writing with dates, addresses, and quantities."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Return your fingers to home row after each number reach."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "The meeting is scheduled for January 15, 2026 at 3:00 PM in Room 204."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Order #4829 contains 7 items weighing 12.5 kg and costs $349.99 total."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Flight BA247 departs at 08:45 from Gate 31B and arrives at 14:20 local time."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "lessons/speed-08-number-prose.json": {
    "schemaVersion": 1,
    "id": "speed-08-number-prose",
    "title": {
      "en": "Numbers in Prose"
    },
    "objective": {
      "en": "Seamlessly integrate number row keys into natural writing with dates, addresses, and quantities."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Return your fingers to home row after each number reach."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "The meeting is scheduled for January 15, 2026 at 3:00 PM in Room 204."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Order #4829 contains 7 items weighing 12.5 kg and costs $349.99 total."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Flight BA247 departs at 08:45 from Gate 31B and arrives at 14:20 local time."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "speed-building/lessons/speed-08-number-prose.json": {
    "schemaVersion": 1,
    "id": "speed-08-number-prose",
    "title": {
      "en": "Numbers in Prose"
    },
    "objective": {
      "en": "Seamlessly integrate number row keys into natural writing with dates, addresses, and quantities."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Return your fingers to home row after each number reach."
      }
    ],
    "steps": [
      {
        "type": "sentence",
        "items": [
          "The meeting is scheduled for January 15, 2026 at 3:00 PM in Room 204."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Order #4829 contains 7 items weighing 12.5 kg and costs $349.99 total."
        ],
        "repeat": 1
      },
      {
        "type": "sentence",
        "items": [
          "Flight BA247 departs at 08:45 from Gate 31B and arrives at 14:20 local time."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 25,
      "minAccuracy": 92,
      "maxErrorsPerStep": null
    }
  },
  "speed-09-professional": {
    "schemaVersion": 1,
    "id": "speed-09-professional",
    "title": {
      "en": "Professional Writing Drill"
    },
    "objective": {
      "en": "Practice typing professional emails, reports, and business correspondence at speed."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Professional writing demands both speed and precision. Keep errors below 2%."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Dear Mr. Thompson, I am writing to confirm our meeting scheduled for next Thursday at 2:30 PM. Please bring the quarterly sales report and the updated client list."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "The project deadline has been moved to December 15. All team members should submit their progress reports by end of day Friday. Contact Sarah at extension 4201 if you have questions."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "Following our review of the Q3 financial statements, we recommend increasing the marketing budget by 12% and reallocating resources from the legacy systems division to the new product development team."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 35,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "lessons/speed-09-professional.json": {
    "schemaVersion": 1,
    "id": "speed-09-professional",
    "title": {
      "en": "Professional Writing Drill"
    },
    "objective": {
      "en": "Practice typing professional emails, reports, and business correspondence at speed."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Professional writing demands both speed and precision. Keep errors below 2%."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Dear Mr. Thompson, I am writing to confirm our meeting scheduled for next Thursday at 2:30 PM. Please bring the quarterly sales report and the updated client list."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "The project deadline has been moved to December 15. All team members should submit their progress reports by end of day Friday. Contact Sarah at extension 4201 if you have questions."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "Following our review of the Q3 financial statements, we recommend increasing the marketing budget by 12% and reallocating resources from the legacy systems division to the new product development team."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 35,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "speed-building/lessons/speed-09-professional.json": {
    "schemaVersion": 1,
    "id": "speed-09-professional",
    "title": {
      "en": "Professional Writing Drill"
    },
    "objective": {
      "en": "Practice typing professional emails, reports, and business correspondence at speed."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "Professional writing demands both speed and precision. Keep errors below 2%."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "Dear Mr. Thompson, I am writing to confirm our meeting scheduled for next Thursday at 2:30 PM. Please bring the quarterly sales report and the updated client list."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "The project deadline has been moved to December 15. All team members should submit their progress reports by end of day Friday. Contact Sarah at extension 4201 if you have questions."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "Following our review of the Q3 financial statements, we recommend increasing the marketing budget by 12% and reallocating resources from the legacy systems division to the new product development team."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 35,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "speed-10-ultimate": {
    "schemaVersion": 1,
    "id": "speed-10-ultimate",
    "title": {
      "en": "Ultimate Speed Challenge"
    },
    "objective": {
      "en": "The final speed test. Type complex, varied text at maximum velocity with high accuracy."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "This is the summit. Trust your muscle memory and let your fingers fly."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "The ancient library contained over 50,000 volumes spanning every subject imaginable. From philosophy to physics, history to horticulture, each shelf told a story of human curiosity and the relentless pursuit of knowledge."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "By 2025, renewable energy sources accounted for 38% of global electricity generation. Solar panels covered 12 million rooftops, and wind turbines dotted coastlines from Portugal to Japan, spinning quietly against bright morning skies."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "Dr. Elizabeth Chen (MIT, Class of '09) published her groundbreaking research on quantum computing in Nature magazine. Her team's 47-qubit processor achieved a 99.2% gate fidelity, surpassing all previous benchmarks by a significant margin."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 45,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "lessons/speed-10-ultimate.json": {
    "schemaVersion": 1,
    "id": "speed-10-ultimate",
    "title": {
      "en": "Ultimate Speed Challenge"
    },
    "objective": {
      "en": "The final speed test. Type complex, varied text at maximum velocity with high accuracy."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "This is the summit. Trust your muscle memory and let your fingers fly."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "The ancient library contained over 50,000 volumes spanning every subject imaginable. From philosophy to physics, history to horticulture, each shelf told a story of human curiosity and the relentless pursuit of knowledge."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "By 2025, renewable energy sources accounted for 38% of global electricity generation. Solar panels covered 12 million rooftops, and wind turbines dotted coastlines from Portugal to Japan, spinning quietly against bright morning skies."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "Dr. Elizabeth Chen (MIT, Class of '09) published her groundbreaking research on quantum computing in Nature magazine. Her team's 47-qubit processor achieved a 99.2% gate fidelity, surpassing all previous benchmarks by a significant margin."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 45,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  },
  "speed-building/lessons/speed-10-ultimate.json": {
    "schemaVersion": 1,
    "id": "speed-10-ultimate",
    "title": {
      "en": "Ultimate Speed Challenge"
    },
    "objective": {
      "en": "The final speed test. Type complex, varied text at maximum velocity with high accuracy."
    },
    "newKeys": [],
    "tips": [
      {
        "en": "This is the summit. Trust your muscle memory and let your fingers fly."
      }
    ],
    "steps": [
      {
        "type": "paragraph",
        "items": [
          "The ancient library contained over 50,000 volumes spanning every subject imaginable. From philosophy to physics, history to horticulture, each shelf told a story of human curiosity and the relentless pursuit of knowledge."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "By 2025, renewable energy sources accounted for 38% of global electricity generation. Solar panels covered 12 million rooftops, and wind turbines dotted coastlines from Portugal to Japan, spinning quietly against bright morning skies."
        ],
        "repeat": 1
      },
      {
        "type": "paragraph",
        "items": [
          "Dr. Elizabeth Chen (MIT, Class of '09) published her groundbreaking research on quantum computing in Nature magazine. Her team's 47-qubit processor achieved a 99.2% gate fidelity, surpassing all previous benchmarks by a significant margin."
        ],
        "repeat": 1
      }
    ],
    "pass": {
      "minWpm": 45,
      "minAccuracy": 95,
      "maxErrorsPerStep": null
    }
  }
};

export const BUILTIN_PLACEMENT_ASSESSMENT = {
  "schemaVersion": 1,
  "stages": [
    {
      "id": "stage-home-row",
      "type": "homeRow",
      "content": "asdf jkl; fdsa ;lkj dad ask fall salad flask half glad",
      "durationSeconds": 30
    },
    {
      "id": "stage-all-letters",
      "type": "allLetters",
      "content": "the quick brown fox jumps over the lazy dog and pack my box with five dozen jugs",
      "durationSeconds": 45
    },
    {
      "id": "stage-paragraph",
      "type": "paragraph",
      "content": "Smooth, steady touch typing unlocks effortless creative thought. When fingers find every key naturally through muscle memory, ideas flow straight from the mind onto the screen without hesitation.",
      "durationSeconds": 60
    }
  ],
  "evaluations": [
    {
      "minWpm": 45,
      "minAccuracy": 96,
      "recommendCourseId": "programmer",
      "recommendLessonId": "prog-01-delimiters"
    },
    {
      "minWpm": 25,
      "minAccuracy": 90,
      "recommendCourseId": "fundamentals",
      "recommendLessonId": "stage-4-caps-01"
    },
    {
      "minWpm": 0,
      "minAccuracy": 0,
      "recommendCourseId": "fundamentals",
      "recommendLessonId": "stage-1-anchor-01"
    }
  ]
};

export function getBuiltinEnglishPack(): LoadedPack {
  const layoutsMap = new Map<string, KeyboardLayout>();
  for (const [id, l] of Object.entries(BUILTIN_ENGLISH_LAYOUTS)) {
    layoutsMap.set(id, l);
    layoutsMap.set(l.id, l);
  }

  const coursesMap = new Map<string, CourseDefinition>();
  for (const [id, c] of Object.entries(BUILTIN_ENGLISH_COURSES)) {
    coursesMap.set(id, c);
    coursesMap.set(c.id, c);
  }

  const lessonsMap = new Map<string, LessonDefinition>();
  for (const [id, les] of Object.entries(BUILTIN_ENGLISH_LESSONS)) {
    lessonsMap.set(id, les);
  }

  return {
    manifest: BUILTIN_ENGLISH_MANIFEST,
    licenseText: "Free for non-commercial and educational use under PolyForm Noncommercial License 1.0.0",
    layouts: layoutsMap,
    courses: coursesMap,
    lessons: lessonsMap,
    isBuiltin: true,
  };
}
