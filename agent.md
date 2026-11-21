# Typing Trainer: Autonomous Agent Progress & Engineering Ledger

**Project Name:** Typing Trainer (Universal, Pack-Based FOSS Edition)  
**Repository Path:** `D:\TypingTrainer\TypingTrainer`  
**Master Plan Reference:** `TYPING_TRAINER_MASTER_PLAN.md`  
**Last Updated:** November 2026  
**License Target:** MIT (Application) / CC-BY-4.0 & Open Licenses (Packs)  

---

## 1. Executive Mission & Core Guidelines

Typing Trainer is a next-generation, free, open-source, universal touch-typing platform built on **Tauri v2 (Rust) + React 19 + TypeScript + Vite + Tailwind CSS**.

### Unbreakable Architectural & Legal Rules:
1. **Clean-Room Enforcement**: Zero copying of any TypingMaster assets, texts, or copyrighted code. Legacy folder `TypingMaster12/` remains permanently in `.gitignore`.
2. **Pack-First Architecture**: The app contains **no hard-coded courses or lessons**. All educational content (including the default English course) is loaded from standardized `.ttpack` packages (data-only: JSON, TXT, WOFF2; zero executable code).
3. **Offline-First & Privacy**: No tracking, telemetry, or remote dependencies. Optional network operations (Pack Store index and pack updates) are strictly user-initiated.
4. **Universal Script & Unicode Correctness**: All string handling employs grapheme cluster segmentation (`Intl.Segmenter`) and NFC normalization (`String.prototype.normalize('NFC')`). No naive `string.length` or codepoint-based indexing.
5. **Neutral / Precision Design System**: Neutral zinc/slate base + green accent (correct keystroke/progress) + red (mistakes). **No blue UI elements, blue focus rings, or blue highlights.**
6. **Strict Quality Gate**: 0 TypeScript errors, 0 lint errors, green test suite before any commit.

---

## 2. Progress Tracker: What Has Been Done

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

### Phase 0: Specifications & Schemas (COMPLETED)
- [x] **All 7 Official JSON Schemas Created** in `/schemas` (Draft 2020-12):
  - [x] `schemas/manifest.schema.json` (Validates pack metadata, units of length, checksums, author provenance)
  - [x] `schemas/layout.schema.json` (Validates physical key geometries, input strategies, layers, finger mappings)
  - [x] `schemas/course.schema.json` (Validates course structure, levels, and lesson references)
  - [x] `schemas/lesson.schema.json` (Validates lesson objectives, step types, pass criteria, and reading prompts)
  - [x] `schemas/texts.schema.json` (Validates passages, source attributions, difficulty levels)
  - [x] `schemas/placement.schema.json` (Validates placement tests and skill evaluations)
  - [x] `schemas/index.schema.json` (Validates Pack Store repository catalog)
- [x] **Documentation Authored**:
  - [x] `docs/PACK_SPEC.md` (Complete container format, limits, 4 input strategies, grapheme rules, security constraints)
  - [x] `docs/ARCHITECTURE.md` (System layers, SQLite schema, security model, and offline guarantees)
- [x] **Golden Test Pack Fixtures Created**:
  - [x] `test/fixtures/packs/direct-en` (Direct physical Latin QWERTY mapping)
  - [x] `test/fixtures/packs/translit-bn` (Bengali Avro Phonetic transliteration rule tables)
  - [x] `test/fixtures/packs/composition-ko` (Korean Hangul 2-set syllable composition)
  - [x] `test/fixtures/packs/rtl-ar` (Arabic Standard Right-to-Left layout)
- [x] **Automated Schema Verification Engine**:
  - [x] `test/validate-schemas.js` running Ajv 2020 with `ajv-formats`.
  - [x] Test suite passing: **16/16 fixtures verified with 0 errors**.
  - [x] Verified build: `npm run test:schemas && npm run build` passes cleanly.

---

## 3. What Is Left To Do (Phased Roadmap)

### Phase 1: Design System & Theming (NEXT UP)
- [ ] Establish `src/styles/tokens.css` with semantic CSS variables:
  - Neutral palette: `--bg`, `--surface`, `--surface-2`, `--border`, `--text`, `--text-muted`.
  - Functional palette: `--accent` (Green #16A34A / #22C55E), `--danger` (Red #DC2626 / #EF4444), `--warning` (Yellow/Amber).
  - **Eliminate all remaining blue shades** from Tailwind config, focus rings, buttons, and links.
- [ ] Zero-flash theme loader (System default, Light, Dark) persisted per profile.
- [ ] Local font bundling (Inter for UI, JetBrains Mono for code/typing, Noto Sans fallback subsets).
- [ ] Reusable UI primitive components (`src/components/ui/`): Button, Card, Dialog, Tabs, Input, Kbd, Tooltip, Switch, Toast.
- [ ] Native shell layout: custom title bar with window controls, collapsible sidebar, course/language selector header.

### Phase 2: Unicode-Aware Engine & Storage
- [ ] Pure TypeScript typing engine (`src/engine/`):
  - Grapheme segmentation via `Intl.Segmenter`.
  - NFC normalization and RTL directional typing support (`unicode-bidi: isolate`).
  - Four input strategies: `direct`, `transliteration`, `composition`, and `ime`.
  - Metric computation (`unitOfLength`: grapheme, word, character/CPM).
- [ ] SQLite database integration via `tauri-plugin-sql` with schema migrations (`profiles`, `packs`, `courses`, `lesson_progress`, `keystroke_stats`, `test_results`).
- [ ] IndexedDB web adapter fallback for zero-install browser deployment.
- [ ] Upgrade PIN security to **Argon2id** in Rust (with migration from legacy SHA-256).

### Phase 3: Universal Pack System Core
- [ ] Rust zip-extraction engine in `src-tauri/src/packs/`:
  - Strict security guards: 50MB compressed / 200MB uncompressed limits, 100:1 ratio zip-bomb guard, zip-slip path traversal blocker.
  - Allowed filetype whitelist (`.json`, `.txt`, `.md`, `.woff2`, `.ttf`, `.otf`, `.png`, `.webp`, `.svg`, `LICENSE`).
  - Checksum validation and optional Ed25519 signature verification.
  - Atomic directory staging and rollback on failure.
- [ ] TypeScript pack loader, layout resolver, and pack registry.
- [ ] Pack management UI: Browse installed, Enable/Disable, Remove, Update, Import dialog with preview, Drag-and-drop, and OS file association for `.ttpack`.
- [ ] Security test suite with malicious pack fixtures (zip-slip, zip-bomb, HTML/script injection attempts).

### Phase 4: Core Screens Redesign (Pack-Driven)
- [ ] Redesign Home: goal ring, streak counter, daily challenge, weak keys summary.
- [ ] Redesign Courses: vertical path of levels, sequential unlocking, mastery stars.
- [ ] Redesign Lesson Player: focus mode, clean vector keyboard rendered from layout JSON, translucent hand guide, calm live metrics, results sheet.
- [ ] Command Palette (`Cmd/Ctrl+K`) for rapid navigation and switching.

### Phase 5: Built-In English Pack (`packs-builtin/en-us`)
- [ ] Author complete built-in English pack in standard `.ttpack` format:
  - 40+ original structured lessons (home row -> outer reaches -> punctuation -> capitals -> numbers -> symbols).
  - Placement assessment test (`assessment/placement.json`).
  - Frequency-ordered word lists and public-domain passage library.
  - Alternative layouts: Dvorak, Colemak, Colemak-DH, Workman, UK QWERTY.
  - Specialized courses: Numpad and Programmer Syntax.
- [ ] Completely remove hardcoded lesson/keyboard definitions from `src/data/`.

### Phase 6: Advanced Input Strategies Implementation
- [ ] Transliteration engine with JSON rule tables (Avro Phonetic, ITRANS, romaji-to-kana).
- [ ] Composition engine for Hangul 2-set (Dubeolsik jamo assembly).
- [ ] IME reading mode for Japanese and Chinese with `readingType: romaji/pinyin`.

### Phase 7: Pack Authoring Ecosystem & Tooling
- [ ] `ttpack` CLI tool (init, validate, lint, build, preview).
- [ ] In-app Pack Creator (form-based course builder & visual keyboard layout editor).
- [ ] Pack Store client (fetches signed index from official repository).
- [ ] Documentation: `docs/PACK_AUTHORING.md` with AI prompt templates for community pack authors.

### Phase 8: Deep Analytics, Games & Polish
- [ ] Heatmaps rendered directly on active layout geometry.
- [ ] Dynamic word lists for *Word Fall Arena* and new games (*Race*, *Zen*, *Letter Rain*).
- [ ] Exportable PDF/PNG certificates and classroom CSV export.
- [ ] Accessibility audit: keyboard focus rings, WCAG AA contrast, screen reader labels, reduced-motion compliance.

### Phase 9: Official Reference Language Packs
- [ ] Bengali (Bijoy, Avro, Jatiya).
- [ ] Hindi (InScript, Remington Gail).
- [ ] Russian (ЙЦУКЕН).
- [ ] Japanese & Chinese (IME reading and romaji/pinyin modes).
- [ ] Korean (Dubeolsik).
- [ ] Arabic & Hebrew (RTL validation).
- [ ] Spanish, French (AZERTY), German (QWERTZ).

### Phase 10: Native Packaging & v1.0.0 Release
- [ ] Platform polish: macOS native menu bar, window state preservation, system tray, notifications.
- [ ] Multi-platform release matrix producing signed/checksummed `.msi`, `.exe`, `.dmg`, `.AppImage`, `.deb`, `.rpm`.
- [ ] Official documentation suite and tag `v1.0.0`.
