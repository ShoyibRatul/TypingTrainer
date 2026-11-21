# Typing Trainer: System Architecture & Security Design

---

## 1. High-Level Architecture Overview

Typing Trainer is engineered as a decoupled, multi-layer application uniting a high-performance native desktop shell (Tauri v2 / Rust) with an accessible, high-precision presentation layer (React 19 / TypeScript / Tailwind CSS).

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Presentation & UI Layer                         │
│       React 19 • Tailwind CSS (Neutral/Green/Red) • Radix UI           │
│                                                                        │
│   [Sidebar & Navigation]    [Lesson Player]    [Speed Test & Arcade]   │
│   [SVG Vector Keyboard]     [Hand Guide]       [Analytics Heatmaps]    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────┴────────────────────────────────────┐
│                       Core Typing Engine (Pure TS)                     │
│                                                                        │
│   • Intl.Segmenter (Graphemes)        • NFC Normalisation              │
│   • Input Strategies: Direct, Translit, Composition, IME               │
│   • Real-time Telemetry: WPM/CPM, Raw WPM, Accuracy, Inter-Key Latency │
│   • Web Audio API Synthetic Switch Acoustics (Zero audio files)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────┴────────────────────────────────────┐
│                         Universal Pack Registry                        │
│                                                                        │
│   • Schema Validation (JSON Schemas)  • Pack Manifest & Layout Loader  │
│   • Dynamic Font Loader (@font-face)  • Procedural Drill Generator     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────┴────────────────────────────────────┐
│                      Tauri v2 Desktop Bridge (Rust)                    │
│                                                                        │
│   • Hardened ZIP Extractor (Zip-slip, Zip-bomb, Whitelist guards)      │
│   • SQLite Storage Layer with versioned schema migrations              │
│   • Argon2id PIN / Password Cryptographic Hashing                      │
│   • Multi-platform Window & Menu integrations                          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Directory Layout & Boundaries

```
D:\TypingTrainer\TypingTrainer\
├── schemas/                     # Single source of truth JSON Schemas
│   ├── manifest.schema.json
│   ├── layout.schema.json
│   ├── course.schema.json
│   ├── lesson.schema.json
│   ├── texts.schema.json
│   ├── placement.schema.json
│   └── index.schema.json
├── docs/                        # Architecture, specs & guides
│   ├── ARCHITECTURE.md
│   ├── PACK_SPEC.md
│   └── PACK_AUTHORING.md
├── packs-builtin/               # Standard packs (starting with en-us)
│   └── en-us/
├── src-tauri/                   # Rust desktop engine
│   ├── src/
│   │   ├── main.rs
│   │   ├── packs/               # Streaming zip extractor & sanitizer
│   │   └── security/            # Argon2id hasher
│   ├── Cargo.toml
│   └── tauri.conf.json
└── src/                         # Frontend application
    ├── app/                     # Shell, title bar, routing, providers
    ├── engine/                  # Pure TypeScript engine (zero React deps)
    │   ├── text/                # Grapheme segmenter, NFC normalizer
    │   ├── input/               # Direct, Transliteration, Hangul, IME
    │   └── metrics/             # WPM, accuracy, latency calculations
    ├── packs/                   # Pack loader, layout resolver, validator
    ├── components/              # UI components & design system primitives
    ├── context/                 # Profile & application context
    └── styles/                  # Neutral + Green design tokens
```

---

## 3. Data Storage & Repositories

### SQLite Schema (`tauri-plugin-sql`)
User state is managed through typed repository layers (`src/data/repositories/`):

1. `profiles`: `id`, `name`, `avatar`, `pin_hash`, `created_at`, `last_active_at`, `preferences_json`
2. `packs`: `id`, `version`, `name_json`, `language`, `script`, `installed_at`, `is_enabled`
3. `courses`: `id`, `pack_id`, `title_json`, `layout_id`
4. `lesson_progress`: `profile_id`, `pack_id`, `course_id`, `lesson_id`, `best_wpm`, `best_accuracy`, `stars`, `completed_at`
5. `keystroke_stats`: `profile_id`, `layout_id`, `physical_code`, `error_count`, `total_latency_ms`, `keystroke_count`
6. `test_results`: `id`, `profile_id`, `date`, `wpm`, `raw_wpm`, `accuracy`, `duration_seconds`, `test_title`

*Web Fallback*: An IndexedDB adapter adheres to the exact same repository interfaces for the browser build.

---

## 4. Security & Threat Model

1. **Untrusted Data Containment**:
   * All lesson packs are treated as untrusted user inputs.
   * Extraction streams enforce maximum file size (50MB compressed / 200MB uncompressed) and check path names against directory traversal.
   * Zero evaluation of arbitrary code: packs contain pure JSON, TXT, and WOFF2 files. No HTML rendering is ever performed; all text is rendered as safe text nodes.
2. **Profile Lock Security**:
   * Profile PINs are hashed using **Argon2id** with a unique per-profile salt.
   * Rate-limiting logic prevents brute-force lock bypassing with exponential backoff.
3. **Local Privacy Guarantee**:
   * Typing Trainer operates 100% offline. No telemetry, keylogging, or diagnostic metrics are transmitted over any network socket.
