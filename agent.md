# Typing Trainer: Autonomous Agent Progress & Engineering Ledger

**Project Name:** Typing Trainer (English QWERTY Focus Edition)  
**Repository Path:** `D:\TypingTrainer\TypingTrainer`  
**Master Plan Reference:** `TYPING_TRAINER_MASTER_PLAN.md`  
**Current Focus:** 100% English (US QWERTY) touch-typing mastery  
**Last Updated:** November 2026  
**License Target:** MIT (Application) / CC-BY-4.0 & Open Licenses (Packs)  

---

## 1. Executive Direction: English QWERTY Exclusive Focus

Per user direction, all non-English lesson content and fixtures have been removed. The project is focused 100% on perfecting the **English (US QWERTY)** touch-typing experience:
- Dedicated, exhaustive beginner-to-advanced curriculum for English QWERTY (40+ lessons).
- Tactile virtual keyboard and hand guide specifically tailored to standard QWERTY finger placement.
- Multilingual and international layout packs are deferred to post-v1.0 releases, while retaining the clean, pack-based architectural foundation.

---

## 2. Unbreakable Core Rules:
1. **Clean-Room Enforcement**: Zero copying of any TypingMaster assets, texts, or copyrighted code. Legacy folder `TypingMaster12/` remains permanently in `.gitignore`.
2. **Pack-First Architecture**: The app contains no hard-coded courses or lessons. All educational content is loaded from standardized `.ttpack` packages (data-only: JSON, TXT, WOFF2; zero executable code).
3. **Offline-First & Privacy**: No tracking, telemetry, or remote dependencies. Everything runs completely locally.
4. **Neutral / Precision Design System**: Neutral zinc/slate base + green accent (correct keystroke/progress) + red (mistakes). **No blue UI elements, blue focus rings, or blue highlights.**
5. **Strict Quality Gate**: 0 TypeScript errors, 0 lint errors, green test suite before any commit.

---

## 3. Progress Tracker: What Has Been Done

### Initial Scaffolding & Core Architecture
- [x] **Project Scaffolding**: Modern Vite + React 19 + TypeScript + Tailwind CSS desktop app configured with Tauri v2 (`src-tauri/Cargo.toml`, `tauri.conf.json`, `build.rs`).
- [x] **Multi-User Profile Architecture**: Local profile management supporting multiple distinct users, isolated statistics, settings, and PIN locking with SHA-256 (queued for upgrade to Argon2id in Phase 2).
- [x] **Responsive Vector Virtual Keyboard**: SVG keyboard component supporting dynamic key depression, target finger highlighting, and tactile home row markers on `F` and `J`.
- [x] **Ergonomic Hand Visualizer**: Two-hand 2D anatomical guide illustrating physical finger placement in real-time.
- [x] **Web Audio API Mechanical Sound Engine**: Synthetic sound generator with zero external media files (*Cherry MX Blue*, *Cherry MX Brown*, *Topre Thock*, *Typewriter*).
- [x] **Initial Practice & Testing Interfaces**: Step-by-step interactive lesson player, certified speed tests (1/2/5 min), and *Word Fall Arena* arcade mini-game.
- [x] **Key Latency & Analytics Tracker**: Initial logging of Inter-Key Latency (IKL) in milliseconds to identify hesitation keys and error distribution.
- [x] **GitHub Actions Automated Multi-Platform CI/CD Pipeline**: `.github/workflows/release.yml` configured to build native binaries for Windows (`.msi`, `.exe`), macOS (Universal `.dmg`), Linux (`.AppImage`, `.deb`), and deploy to GitHub Pages.
- [x] **Master Plan Integration**: Full Universal Pack-Based Edition Master Plan incorporated into `TYPING_TRAINER_MASTER_PLAN.md`.

### Phase 0: Specifications & Schemas (COMPLETED - English QWERTY Scoped)
- [x] **All 7 Official JSON Schemas Created** in `/schemas` (Draft 2020-12):
  - [x] `schemas/manifest.schema.json`
  - [x] `schemas/layout.schema.json`
  - [x] `schemas/course.schema.json`
  - [x] `schemas/lesson.schema.json`
  - [x] `schemas/texts.schema.json`
  - [x] `schemas/placement.schema.json`
  - [x] `schemas/index.schema.json`
- [x] **Documentation Authored**:
  - [x] `docs/PACK_SPEC.md`
  - [x] `docs/ARCHITECTURE.md`
- [x] **English QWERTY Golden Test Pack Fixture**:
  - [x] `test/fixtures/packs/direct-en` (Complete English US QWERTY test fixture conforming to all schemas).
  - [x] Removed all non-English test fixtures (`translit-bn`, `composition-ko`, `rtl-ar`).
- [x] **Automated Schema Verification Engine**:
  - [x] `test/validate-schemas.js` running Ajv 2020 with `ajv-formats`.
  - [x] Validation passing: 4/4 schemas verified cleanly.
  - [x] Verified build: `npm run test:schemas && npm run build` passes cleanly.

---

## 4. What Is Left To Do (Phased Roadmap)

### Phase 1: Design System & Theming (NEXT UP)
- [ ] Establish `src/styles/tokens.css` with semantic CSS variables:
  - Neutral palette: `--bg`, `--surface`, `--surface-2`, `--border`, `--text`, `--text-muted`.
  - Functional palette: `--accent` (Green #16A34A / #22C55E), `--danger` (Red #DC2626 / #EF4444), `--warning` (Yellow/Amber).
  - **Eliminate all remaining blue shades** from Tailwind config, focus rings, buttons, and links.
- [ ] Zero-flash theme loader (System default, Light, Dark) persisted per profile.
- [ ] Local font bundling (Inter for UI, JetBrains Mono for code/typing).
- [ ] Reusable UI primitive components (`src/components/ui/`): Button, Card, Dialog, Tabs, Input, Kbd, Tooltip, Switch, Toast.
- [ ] Native shell layout: custom title bar with window controls, collapsible sidebar, course header.

### Phase 2: Typing Engine Refinement & Storage
- [ ] Pure TypeScript typing engine (`src/engine/`):
  - Direct QWERTY key evaluation with sub-millisecond precision.
  - Grapheme segmentation via `Intl.Segmenter` and NFC normalization.
  - Metric computation (WPM, CPM, Raw WPM, Accuracy, Consistency, Inter-Key Latency).
- [ ] SQLite database integration via `tauri-plugin-sql` with schema migrations (`profiles`, `courses`, `lesson_progress`, `keystroke_stats`, `test_results`).
- [ ] IndexedDB web adapter fallback for browser build.
- [ ] Upgrade PIN security to **Argon2id** in Rust.

### Phase 3: English Pack System Core
- [ ] Rust zip-extraction engine in `src-tauri/src/packs/` (strict security guards, path traversal protection, file validation).
- [ ] TypeScript pack loader and layout resolver.
- [ ] Pack management UI: Inspect pack details, reload, verify checksums.

### Phase 4: Core Screens Redesign (English QWERTY Native)
- [ ] Redesign Home: goal ring, streak counter, daily challenge, weak keys summary.
- [ ] Redesign Courses: vertical path of levels, sequential unlocking, mastery stars.
- [ ] Redesign Lesson Player: focus mode, clean vector keyboard rendered from layout JSON, translucent hand guide, calm live metrics, results sheet.
- [ ] Command Palette (`Cmd/Ctrl+K`) for rapid navigation and switching.

### Phase 5: Built-In English QWERTY Pack (`packs-builtin/en-us`)
- [ ] Complete built-in English pack in standard `.ttpack` format:
  - 40+ original structured lessons (home row -> top row -> bottom row -> numbers -> symbols -> punctuation -> capitals).
  - Diagnostic placement assessment test (`assessment/placement.json`).
  - Frequency-ordered word lists and public-domain passage library.
  - Specialized courses: Numpad and Developer Syntax.
- [ ] Completely remove hardcoded lesson/keyboard definitions from `src/data/`.

### Phase 6: Deep Analytics & Arcade Games
- [ ] Heatmaps rendered directly on QWERTY geometry.
- [ ] Dynamic word lists for *Word Fall Arena* and new games (*Race*, *Zen*, *Letter Rain*).
- [ ] Exportable PDF/PNG certificates and progress reports.
- [ ] Accessibility audit: keyboard focus rings, WCAG AA contrast, screen reader labels, reduced-motion compliance.

### Phase 7: Native Polish & v1.0.0 Packaging
- [ ] Platform polish: macOS native menu bar, window state preservation, system tray, notifications.
- [ ] Multi-platform release matrix producing signed/checksummed `.msi`, `.exe`, `.dmg`, `.AppImage`, `.deb`, `.rpm`.
- [ ] Official documentation suite and tag `v1.0.0`.
