# Typing Trainer: Master Plan (Universal, Pack-Based Edition)

> Instructions for the AI agent. This file **replaces and combines** the earlier redesign plan with the new universal lesson-pack system. Read the whole file before writing code. Work through the phases in order, commit after each phase, and never skip verification steps.

---

## 0. Vision

A free, open-source, cross-platform typing tutor that:

1. Installs as a **real native app** on Windows (`.msi`/`.exe`), macOS (`.dmg`), and Linux (`.deb`/`.AppImage`/`.rpm`).
2. Ships by default with a complete **English (QWERTY)** course matching everything TypingMaster offers, and more.
3. Is a **universal platform**: anyone can import a **lesson pack** (`.ttpack` or `.zip`) to learn typing in **any language and any keyboard layout** (Bengali, Hindi, Russian, Japanese, Chinese, Korean, Arabic, and so on).
4. Has a **minimal, modern, native-feeling UI** with Light, Dark and System themes in a neutral + green + red palette (no blue).
5. Works fully **offline**, with no telemetry, accounts or ads.

**Key design principle: pack-first.** The built-in English course is itself a lesson pack in the exact same format that community packs use. The app contains no hard-coded lessons. If the pack system can't express something, fix the pack format, not the app.

---

## 1. Current state (already done, do not redo)

- Location: `D:\TypingTrainer`
- Stack: Tauri v2 (Rust) + React 19 + TypeScript + Vite + Tailwind CSS
- Existing: multi-user profiles with PIN lock, SVG virtual keyboard, hand guide, lessons, speed tests, Word Fall arcade, analytics with inter-key latency, Web Audio sound synthesis, GitHub Actions release workflow, README, MIT-intended licence.
- `npm run build` passes. Initial commit made.

**Clarification:** this is *already* a native desktop app via Tauri. Do **not** rewrite in another language. The work is a redesign, a universal pack architecture, and native polish.

**Known problems to fix:**
1. The UI is bluish and generic. Full redesign required.
2. Lessons are hard-coded in `src/data/curriculum.ts` and keyboards in `src/data/keyboards.ts`. These must become data-driven packs.
3. The engine assumes Latin, one-keystroke-one-character typing. It must become Unicode-aware.
4. Storage uses `localStorage`. It must move to a durable database.
5. PIN hashing uses plain salted SHA-256. It must be upgraded.

---

## 2. Non-negotiable rules

1. **Clean-room only.** Never copy or reference TypingMaster assets, text, lessons, icons, sounds or code. `TypingMaster12/` stays in `.gitignore`. All content is original or public-domain (record the source).
2. **Offline first.** The only optional network features are: Pack Store index fetch, pack download by URL, and update check. All are user-initiated or opt-in, and the app must be fully usable without them.
3. **Packs are data, never code.** Packs contain JSON, text, fonts and images only. **No JavaScript, no executables, no HTML rendering, no remote code.** This is a hard security rule.
4. **Licence:** MIT for the app. Every pack declares its own licence. Add `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, `THIRD_PARTY_NOTICES.md`.
5. **Accessibility:** keyboard-navigable, WCAG AA contrast in both themes, honours `prefers-reduced-motion`.
6. **Performance:** keystroke-to-render under 16 ms; cold start under 2 s.
7. **Quality gate:** 0 TypeScript errors, 0 lint errors, tests green before every commit.
8. **Unicode correctness is a feature:** all text handling uses grapheme clusters (`Intl.Segmenter`) and NFC normalisation, never raw `string.length` or index-per-codepoint.

---

## 3. Design direction (visual)

### 3.1 Personality
Minimal, calm, fast and precise. A premium native tool (think Linear, Raycast, Things), not a dashboard template. Lots of whitespace, strong typography, hairline borders, subtle motion.

### 3.2 Colour tokens (replace all blue, including focus rings and links)

**Light**

| Token | Value | Use |
|---|---|---|
| `--bg` | `#FAFAFA` | App background |
| `--surface` | `#FFFFFF` | Cards, panels |
| `--surface-2` | `#F4F4F5` | Inset areas, keys |
| `--border` | `#E4E4E7` | Hairlines |
| `--text` | `#0A0A0A` | Primary text |
| `--text-muted` | `#71717A` | Secondary text |
| `--accent` | `#16A34A` | Primary action, correct keystroke, progress |
| `--accent-soft` | `#DCFCE7` | Accent backgrounds |
| `--danger` | `#DC2626` | Mistakes, destructive actions |
| `--danger-soft` | `#FEE2E2` | Error backgrounds |
| `--warning` | `#CA8A04` | Slow keys, caution (sparingly) |

**Dark**

| Token | Value |
|---|---|
| `--bg` | `#09090B` |
| `--surface` | `#111113` |
| `--surface-2` | `#18181B` |
| `--border` | `#27272A` |
| `--text` | `#FAFAFA` |
| `--text-muted` | `#A1A1AA` |
| `--accent` | `#22C55E` |
| `--accent-soft` | `#052E16` |
| `--danger` | `#EF4444` |
| `--danger-soft` | `#2A0A0A` |
| `--warning` | `#EAB308` |

### 3.3 Theme behaviour
- Modes: **System (default)**, **Light**, **Dark**. Follow the OS live; per-profile override.
- Apply theme before first paint (no flash). 150 ms colour transition on switch.
- Accent presets in Settings: Green (default), Emerald, Lime, Amber. Red stays reserved for errors.

### 3.4 Typography (script-aware)
- UI: **Inter**. Typing text and code: **JetBrains Mono**. Both bundled locally.
- **Script font fallback stack:** Noto Sans / Noto Serif families per script (Bengali, Devanagari, Arabic, Hebrew, CJK JP/SC/TC/KR, Thai, Tamil, Cyrillic, and so on). A pack may bundle its own fonts (`.woff2`, open-licensed). Otherwise fall back to installed system fonts, with a Settings option "Typing font".
- Typing area: 28 to 36 px, line height 1.7, user-adjustable. Numbers use tabular figures.
- Complex scripts need extra line height and vertical padding so marks and conjuncts never clip.

### 3.5 Shape, spacing, motion
- Radius: 10 px cards, 8 px buttons, 6 px keys. 8 px grid. Content max-width ~1100 px.
- 1 px borders, very soft shadows only on floating layers.
- Motion 120 to 200 ms ease-out (caret, key press, progress, route changes). Respect reduced motion.
- Icons: Lucide, 1.5 px stroke.

### 3.6 Native-app feel
- Custom title bar with draggable region (macOS: overlay style keeping native traffic lights).
- Remember window size/position (window-state plugin). Minimum size 900x600.
- Native menu bar on macOS; standard shortcuts: `Cmd/Ctrl+,` Settings, `Cmd/Ctrl+K` command palette, `Cmd/Ctrl+L` lock, `Cmd/Ctrl+O` import pack, `Esc` pause/exit lesson.
- Single-instance lock; optional tray icon; native notifications for reminders.
- Registered file association for `.ttpack` (double-click to import) on all three OSes, plus drag-and-drop onto the window.
- Disable text selection and context menu on UI chrome only.

---

## 4. App layout and screens

**Collapsible sidebar + main content + optional right panel.** Sidebar: Home, Courses, Practice, Tests, Games, Stats, Library, Packs, Settings. Profile switcher and lock button pinned at the bottom. A **language/course switcher** sits at the top of the sidebar (shows current pack and layout, e.g. "English · QWERTY").

1. **Home:** goal ring, streak, "Continue lesson", last result, weakest keys, daily challenge for the active course.
2. **Courses:** shows all courses from installed packs, grouped by language. Course map as a clean vertical path of levels; locked/unlocked/completed; star ratings.
3. **Lesson player (focus mode):** target text, virtual keyboard + hand guide, quiet live metrics. Results sheet with Retry/Next.
4. **Tests:** timed (15/30/60/120 s), word-count, quote, custom text, code. Results with WPM graph, raw vs net, consistency, accuracy, error list. Certificate export.
5. **Games:** Word Fall, Race, Zen, Letter Rain, Daily Challenge. Word lists come from the active pack.
6. **Stats:** charts over time, per-key heatmap (on the active layout), slow-key and error-key tables, calendar heatmap. Filter by pack/course.
7. **Library:** user's custom texts, imported `.txt`, public-domain texts, saved drills (per language).
8. **Packs:** installed packs (enable/disable/update/remove), **Import** (file / drag-drop / URL), **Pack Store** (browse community index), **Create pack** (editor).
9. **Settings:** Appearance, Sound, Typing behaviour, Layout & input method, Practice goals/reminders, Profile & security, Data (export/import/reset), Language (UI), About.
10. **Lock screen:** minimal PIN pad.
11. **Command palette:** jump to screens, switch course/pack/layout/theme/profile, import a pack.

---

## 5. Universal pack system (the core new feature)

### 5.1 Concepts

| Concept | Meaning |
|---|---|
| **Pack** | A distributable `.ttpack` file (a ZIP) containing everything for one language/layout family |
| **Course** | An ordered set of lessons inside a pack (a pack may hold several: Beginner, Advanced, Programmer, and so on) |
| **Lesson** | One unit of practice with steps, pass criteria, tips |
| **Layout** | Physical-key to character mapping, with finger assignments, for the virtual keyboard and engine |
| **Input method** | How keystrokes become target text: `direct`, `transliteration`, `composition` or `ime` (see 5.5) |
| **Word list / texts** | Source material for tests, games and generated drills |
| **UI language pack** | Separate, optional: translates the app's own interface. It is *not* a lesson pack |

A `.ttpack` is a ZIP with the extension renamed. The importer also accepts plain `.zip` (such as `lessons.zip`) if it contains a valid `manifest.json`.

### 5.2 Folder structure inside a pack

```
my-pack.ttpack
├── manifest.json            # required
├── README.md                # optional, shown in import preview
├── LICENSE                  # required (any open or declared licence)
├── layouts/
│   └── bangla-bijoy.json
├── courses/
│   └── beginner/
│       ├── course.json
│       └── lessons/
│           ├── 001-home-row.json
│           └── 002-top-row.json
├── wordlists/
│   └── common-1000.txt      # one word per line, UTF-8
├── texts/
│   └── passages.json        # test/typing passages
├── assessment/
│   └── placement.json       # optional placement test
├── fonts/                   # optional, .woff2/.ttf/.otf, open-licensed only
├── assets/                  # optional, icons/images (png, svg-sanitised, webp)
└── i18n/
    └── en.json              # optional: pack strings (course titles, tips) per UI language
```

### 5.3 `manifest.json` (v1)

```json
{
  "schemaVersion": 1,
  "id": "org.typingtrainer.bn-bd",
  "name": { "en": "Bengali (Bangladesh)", "bn": "বাংলা (বাংলাদেশ)" },
  "version": "1.0.0",
  "description": { "en": "Touch typing for Bengali with Bijoy and Avro Phonetic layouts." },
  "language": "bn",
  "region": "BD",
  "script": "Beng",
  "direction": "ltr",
  "authors": [{ "name": "Jane Doe", "url": "https://github.com/janedoe" }],
  "license": "CC-BY-4.0",
  "minAppVersion": "1.0.0",
  "dependencies": [],
  "defaults": { "layout": "bangla-bijoy", "course": "beginner" },
  "unitOfLength": { "type": "grapheme", "charsPerWord": 5 },
  "contents": {
    "layouts": ["layouts/bangla-bijoy.json", "layouts/bangla-avro.json"],
    "courses": ["courses/beginner/course.json"],
    "wordlists": ["wordlists/common-1000.txt"],
    "texts": ["texts/passages.json"],
    "fonts": [{ "file": "fonts/NotoSansBengali.woff2", "family": "Noto Sans Bengali", "license": "OFL-1.1" }]
  },
  "checksums": { "algorithm": "sha256", "files": { "layouts/bangla-bijoy.json": "…" } },
  "signature": null
}
```

Rules:
- `id` is a stable, globally unique reverse-DNS string. It never changes between versions.
- `version` is SemVer. Updates replace the old version; user progress survives because lesson ids are stable.
- `language` is a BCP 47 tag, `script` an ISO 15924 code, `direction` is `ltr` or `rtl`.
- `unitOfLength` defines how WPM is computed (see 5.7).
- `signature` is optional (Ed25519) and marks "Verified" packs from the official repo.

### 5.4 Layout file (`layouts/*.json`)

Keyed by **physical key code** (`KeyA`, `Digit1`, `Space`, `IntlBackslash`...), so one layout works on any hardware.

```json
{
  "schemaVersion": 1,
  "id": "bangla-bijoy",
  "name": { "en": "Bangla (Bijoy)" },
  "type": "physical",
  "geometry": "ansi",
  "direction": "ltr",
  "inputMethod": "direct",
  "keys": {
    "KeyA": { "base": "ৃ", "shift": "ঋ", "finger": "L-pinky" },
    "KeyS": { "base": "ু", "shift": "ূ", "finger": "L-ring" },
    "KeyF": { "base": "ি", "shift": "ী", "finger": "L-index", "homeBump": true }
  },
  "deadKeys": [],
  "composition": null,
  "transliteration": null
}
```

- `geometry`: `ansi`, `iso`, `jis`, `abnt`, `ks`, `numpad`. The virtual keyboard renders from geometry + legends.
- Layers: `base`, `shift`, `altgr`, `shiftAltgr`.
- `finger` values: `L-pinky, L-ring, L-middle, L-index, L-thumb, R-thumb, R-index, R-middle, R-ring, R-pinky`.

### 5.5 Input methods (how packs support every language)

The engine implements **four** strategies. A layout declares one.

1. **`direct`**: key press maps to a character via the layout (QWERTY, Cyrillic, Bijoy, Hindi InScript, Hebrew, Arabic, Greek, Thai, Dvorak, and so on). Dead keys (accents) supported via `deadKeys`.
2. **`transliteration`**: user types Latin letters and the engine converts to the target script using a **rule table in the layout** (Avro Phonetic for Bengali, ITRANS/phonetic for Hindi, Pinyin-to-hanzi is *not* here). Rules are longest-match-first, declarative JSON:
   ```json
   "transliteration": { "rules": [ { "in": "kkh", "out": "ক্ষ" }, { "in": "k", "out": "ক" }, { "in": "a", "out": "া", "context": "afterConsonant" } ] }
   ```
3. **`composition`**: several keystrokes assemble one syllable block (Korean Hangul 2-set: jamo to syllable). Implemented with a built-in, standardised composition algorithm selected by `"composition": "hangul-dubeolsik"`. Not user-scriptable (no code in packs).
4. **`ime`**: the target requires the **OS IME** (Japanese, Chinese). The engine listens to `compositionstart/update/end` and compares the **committed** text to the target. For learner-friendly CJK practice, each exercise item may supply a **reading** so the user knows what to type:
   ```json
   { "text": "日本語", "reading": "nihongo", "readingType": "romaji" }
   ```
   Also support **romaji-to-kana typing** (kana targets, user types Latin letters, with accepted variants like `shi/si`, `chi/ti`) through the transliteration engine so users can practise without enabling an IME.

> Rule: new language needs must be met by extending these four declarative methods, not by letting packs ship code.

### 5.6 Course and lesson files

`courses/beginner/course.json`

```json
{
  "schemaVersion": 1,
  "id": "beginner",
  "title": { "en": "Beginner" },
  "description": { "en": "From the home row to full sentences." },
  "layout": "bangla-bijoy",
  "levels": [
    { "id": "home-row", "title": { "en": "Home Row" }, "lessons": ["001-home-row", "002-home-row-words"] }
  ],
  "unlock": "sequential"
}
```

`lessons/001-home-row.json`

```json
{
  "schemaVersion": 1,
  "id": "001-home-row",
  "title": { "en": "Home row: first keys" },
  "objective": { "en": "Learn the resting position and the first four letters." },
  "newKeys": ["KeyA", "KeyS", "KeyD", "KeyF"],
  "tips": [{ "en": "Keep your wrists level and relaxed." }],
  "steps": [
    { "type": "keys", "items": ["আ", "স", "দ", "ফ"], "repeat": 4 },
    { "type": "words", "items": ["আসা", "সদা"], "repeat": 3 },
    { "type": "sentence", "items": ["আমরা সবাই আসি।"] },
    { "type": "generated", "source": "weakKeys", "count": 30 }
  ],
  "pass": { "minWpm": 8, "minAccuracy": 92, "maxErrorsPerStep": null },
  "estimatedMinutes": 5
}
```

Step types: `keys`, `words`, `sentence`, `paragraph`, `generated` (from word list + key subset or weak keys), `numpad`, `code`, `reading` (with `reading` fields), `tipCard` (no typing, just info/posture).

All human-visible strings use **localisable objects** (`{ "en": ..., "bn": ... }`) with fallback order: UI language, then pack `language`, then `en`, then first available.

### 5.7 Metrics that work for every script
- Base unit is a **grapheme cluster**, not a codepoint.
- Standard "word" = `charsPerWord` units (default 5) so WPM is comparable across packs. Packs may override.
- For Chinese/Japanese (no spaces), the default `unitOfLength` is `characters` and the primary metric shown is **CPM (characters per minute)**; WPM is shown as secondary. The Settings option "Speed unit" lets users pick WPM/CPM/KPM.
- **Accuracy** = correct committed units / total committed units. **Keystroke accuracy** (for composition/transliteration/IME) is tracked separately from **output accuracy**.
- Per-key latency is tracked on physical key codes, so heatmaps work for any layout.

### 5.8 Rendering requirements for complex scripts
- Segment target text with `Intl.Segmenter('grapheme')`. Colour/highlight at the **cluster** level.
- For Indic scripts and Arabic (conjuncts, ligatures, contextual shaping), a cluster may need several keystrokes. Show a **"pending cluster"** state (neutral highlight) until the cluster is complete, then flip to correct/incorrect.
- **RTL support:** `dir="rtl"` on the typing area, logical caret movement, mirrored layout of progress, keyboard legends unchanged. Bidi-safe rendering for mixed numbers/Latin text.
- Never split a cluster across spans in a way that breaks shaping. Render per cluster with `unicode-bidi: isolate`.
- Ensure vertical metrics are tested with Bengali, Devanagari, Tamil, Thai, Arabic, Japanese and Chinese samples.
- Normalise all pack text to NFC on import, and compare typed input using the same normalisation (with documented exceptions).

### 5.9 Import, validation and security

**Import flows:** double-click `.ttpack`, `Ctrl/Cmd+O`, drag-and-drop, Packs → Import, or "Install from URL" (HTTPS only, user-initiated).

**Pipeline (Rust side, in a Tauri command):**
1. Read the ZIP in a streaming way with hard limits: max file size 50 MB compressed, 200 MB uncompressed, max 5,000 entries, max compression ratio 100:1 (zip-bomb guard).
2. **Zip-slip protection:** reject absolute paths, `..`, backslashes, symlinks, device names, and case-insensitive duplicate paths.
3. **Allowed file types only:** `.json`, `.txt`, `.md`, `.woff2`, `.ttf`, `.otf`, `.png`, `.webp`, `.svg` (sanitised), `LICENSE`. Reject everything else (no `.js`, `.html`, `.exe`, `.sh`, and so on).
4. Parse `manifest.json`; validate against **JSON Schema** for every file type (shared schemas live in `/schemas`).
5. Verify `checksums` if present; verify `signature` if present and show a "Verified" badge.
6. Check `minAppVersion`, `dependencies`, and `id` collisions (offer Update / Install as separate / Cancel).
7. Sanitise: strip control chars and bidi override characters (U+202A to U+202E, U+2066 to U+2069) from displayed text unless they are part of valid RTL content; sanitise SVG (no scripts, no external refs) or rasterise it.
8. Show an **import preview dialog**: name, author, language, licence, size, number of courses/lessons/layouts, fonts included, Verified/Unverified badge. The user confirms.
9. Install into the app data directory: `<appdata>/packs/<id>/<version>/`. Never execute or render pack content as HTML. Everything is displayed as plain text.
10. Register in the database. Atomic install (temp dir, then rename); rollback on failure.

**Fonts:** only loaded via `@font-face` from the pack's local files. Show the font licence in the preview. Allow the user to disable pack fonts.

### 5.10 Versioning, updates, progress
- Progress is keyed by `(profileId, packId, courseId, lessonId)`. Packs must keep lesson ids stable across versions. If a lesson id disappears, archive its progress (never delete silently).
- Updating: version comparison by SemVer; keep the previous version until the new one validates; offer rollback.
- Uninstall: ask "Keep my progress?" (default yes, so reinstalling restores it).
- Export a pack: users can re-export any installed pack and **export their own custom courses** as `.ttpack`.

### 5.11 Pack Store and community repositories
- Official GitHub repo `typing-trainer-packs` containing: `index.json` (catalogue), one folder per pack, CI that validates every PR with the same validator as the app.
- `index.json` lists: id, name, language, version, size, sha256, download URL (GitHub Release asset), licence, verified flag, screenshots optional.
- The app's **Pack Store** fetches `index.json` **only when the user opens it** (clearly labelled as an online action), caches it, and supports a custom repository URL in Settings (for schools/organisations).
- Everything installable also works by manual download then import, so offline-only users are never blocked.
- Ship a `pack-template` repo, plus `docs/PACK_AUTHORING.md` with a ready-to-use **AI prompt template** so contributors can generate a new language pack with any AI assistant and then validate it with the CLI.

### 5.12 Authoring tools
1. **CLI `ttpack`** (Node, published to npm and as a standalone binary):
   - `ttpack init <lang>` creates a pack skeleton.
   - `ttpack validate <dir|file>` runs the same schemas/limits as the app.
   - `ttpack lint` checks lesson quality: key coverage, progression, duplicate items, Unicode normalisation, missing translations, unreachable lessons.
   - `ttpack build <dir>` produces `.ttpack` with checksums.
   - `ttpack preview <dir>` opens the app dev build with the pack loaded.
   - `ttpack sign` (optional, for official maintainers).
2. **In-app Pack Creator** (Packs → Create): form-based editor for manifest, layout (visual keyboard editor: click a key, type its characters, choose finger), courses and lessons, with live preview and one-click export to `.ttpack`.
3. **Lesson generator helpers:** "Generate drills from word list for this key set" for pack authors (offline algorithm: frequency-ordered words that use only learned keys, as in the built-in English course).
4. Shared **JSON Schemas** in `/schemas` are the single source of truth for the app, the CLI and CI.

### 5.13 Language roadmap (reference packs)
Build these as official packs after the system works, in this order:
1. **English (US QWERTY)**: built-in, 40+ lessons (Phase 5).
2. **Bengali**: Bijoy (direct), Avro Phonetic (transliteration), National/Jatiya.
3. **Hindi**: InScript (direct), Remington Gail optional.
4. **Russian**: ЙЦУКЕН (direct).
5. **Japanese**: romaji-to-kana trainer, plus IME reading mode; JIS kana as an optional layout.
6. **Chinese (Simplified & Traditional)**: Pinyin IME reading mode; Zhuyin (Bopomofo) direct layout.
7. **Korean**: Dubeolsik (composition).
8. **Arabic and Hebrew** (RTL validation), then Spanish, French (AZERTY), German (QWERTZ), Turkish, Thai, Tamil, Urdu, Persian, Greek, Portuguese (ABNT).
Also English alternative layouts: Dvorak, Colemak, Colemak-DH, Workman, UK QWERTY.

---

## 6. Feature parity and beyond (all delivered through the pack system where applicable)

### 6.1 TypingMaster-parity checklist
- [ ] Full beginner-to-advanced touch-typing course (original content, 40+ lessons for English): home row, top row, bottom row, numbers, symbols, capitals, punctuation, numpad.
- [ ] Per-finger colour coding on the keyboard and hand guide, with home-row bumps shown.
- [ ] Adaptive pass criteria per lesson; repeat until passed; star ratings.
- [ ] Initial **skill assessment** that places the user at the right lesson (`assessment/placement.json`).
- [ ] **Personalised practice**: auto-generated drills from weakest keys and bigrams.
- [ ] Speed and accuracy tests with graded results and exportable certificates (PDF/PNG).
- [ ] Posture and ergonomics tips between lessons.
- [ ] Numeric keypad training.
- [ ] Speed-building games.
- [ ] Printable/exportable progress reports per user.

### 6.2 Beyond TypingMaster
- [ ] Universal packs for any language/layout (section 5).
- [ ] Code typing mode (JS/TS, Python, Rust, Go, C, HTML/CSS, SQL) as an official "Programmer" pack with original snippets.
- [ ] Custom text import, saved per language.
- [ ] Per-key latency analytics, bigram table, finger-usage balance, layout-aware heatmaps.
- [ ] Goals, streaks, achievements (all local).
- [ ] Backup/export/import of profile data (JSON).
- [ ] Dyslexia-friendly font option, high-contrast mode, large-text mode.
- [ ] Modes: stop-on-error, allow-errors, forgive, blind (hide keyboard), no-backspace, metronome/rhythm.
- [ ] Teacher/classroom mode: admin profile views all profiles' progress; export CSV; classroom can pre-install a pack set and a custom Pack Store URL.
- [ ] Layout visual editor and layout converter (view any layout on ANSI/ISO/JIS geometry).
- [ ] Multiple UI languages (separate i18n packs; start with English and Bengali).

### 6.3 Profiles and security
- [ ] Multiple local profiles with avatars/colours; each profile has a default pack/course/layout.
- [ ] Optional PIN/password hashed in Rust with **Argon2id** (fallback PBKDF2-SHA256, 600k+ iterations), per-profile salt, migration from the old SHA-256 hashes on next successful unlock.
- [ ] Auto-lock after idle time.
- [ ] Rate limiting on PIN attempts (exponential back-off).

### 6.4 Data storage
- [ ] SQLite via `tauri-plugin-sql` with versioned migrations. Web-build fallback: IndexedDB adapter behind the same interface.
- [ ] Typed repository layer (`src/data/repositories/*`). UI never touches storage directly.
- [ ] Core tables: `profiles`, `settings`, `packs`, `pack_files_index`, `courses`, `lesson_progress`, `sessions`, `keystroke_stats`, `bigram_stats`, `test_results`, `achievements`, `custom_texts`, `schema_migrations`.
- [ ] One-time import of old `localStorage` data.

### 6.5 Games and sound
- [ ] Word Fall (restyle), Race (ghost of best score), Zen mode, Letter Rain, Daily Challenge (date-seeded, works offline, language-aware).
- [ ] Games draw words from the **active pack's word lists**, so they work in every language.
- [ ] Keep Web Audio synthesis; volume, per-profile sound profile, error-sound toggle, silent default option.

---

## 7. Technical architecture

### 7.1 Folder layout
```
/schemas                 # JSON Schemas (manifest, layout, course, lesson, texts, placement, index)
/packs-builtin/en-us     # the built-in English pack, in the same format as any pack
/tools/ttpack            # CLI (validate, lint, build, init, preview, sign)
/docs                    # FEATURES, ARCHITECTURE, PACK_SPEC, PACK_AUTHORING, SIGNING, ...
src/
  app/                   # shell, routing, providers, title bar, command palette
  engine/                # pure TS typing engine (no React)
    text/                # normalisation, graphemes, bidi helpers
    input/               # direct, transliteration, composition, ime strategies
    metrics/             # WPM/CPM, accuracy, consistency, latency
    generator/           # drill generation from word lists and weak keys
  packs/                 # loader, validator (schema), registry, i18n resolver, font loader
  features/              # courses, lesson-player, tests, games, stats, library, packs-ui, settings
  components/ui/         # design-system primitives (Radix + Tailwind + cva)
  data/repositories/     # SQLite/IndexedDB repositories
  styles/                # tokens.css, themes.css
src-tauri/src/
  packs/                 # zip extraction, limits, hashing, signature verify, atomic install
  security/              # Argon2 hashing, rate limiting
  commands.rs            # exposed commands
```

### 7.2 Engine rules
- Pure TypeScript, unit-tested with fixtures for every input method and script.
- Session state in **Zustand**; profile in React context; the engine is UI-agnostic.
- Per-cluster memoised rendering; caret positioned with transform and animated.
- Input via `keydown` (physical `code` for latency/stats) + `beforeinput`/`composition*` events for text. Test dead keys, AltGr, IME and mobile-style soft keyboards.
- The engine receives a **resolved layout** + **input strategy** + **target text**; it knows nothing about languages directly.

### 7.3 Rust (Tauri) commands
`import_pack(path|bytes)`, `validate_pack`, `install_pack`, `uninstall_pack`, `list_packs`, `read_pack_file`, `export_pack`, `hash_pin`, `verify_pin`, `export_profile`, `import_profile`, `pick_file`, `save_file`, `fetch_pack_index` (HTTPS, size-limited, user-initiated only).
Use the Tauri v2 **capabilities/permissions** system with the minimum permissions. Restrict filesystem scope to the app data dir plus user-picked files.

### 7.4 Testing
- **Vitest:** engine (all input methods), pack validator (good and malicious fixtures), generators, repositories.
- **Malicious-pack fixtures:** zip-slip, zip bomb, huge JSON, wrong types, script files, symlinks, bidi-override text, duplicate ids, missing licence.
- **Playwright:** key flows on the web build (import pack, take lesson, change theme).
- **Golden packs:** keep small test packs for each input method (`direct`, `transliteration`, `composition`, `ime-reading`, `rtl`).
- CI runs all of the above on Windows, macOS and Linux.

---

## 8. Packaging and distribution

Configure `tauri.conf.json` `bundle.targets`: `["msi", "nsis", "dmg", "app", "deb", "appimage", "rpm"]`.

| Platform | Artifacts | Notes |
|---|---|---|
| Windows | `.msi` (WiX) and `.exe` (NSIS) | Per-user install option, Start Menu shortcut, `.ttpack` file association, WebView2 bootstrapper |
| macOS | `.dmg`, universal (`aarch64` + `x86_64`) | Unsigned is acceptable at first. Document Gatekeeper steps. Notarisation optional (`docs/SIGNING.md`) |
| Linux | `.deb`, `.AppImage`, `.rpm` | `.desktop` file, MIME type for `.ttpack`, icons at standard sizes; Flatpak manifest later |

- CI: extend `.github/workflows/release.yml` to attach all artifacts, with SHA-256 checksums, and also publish the `ttpack` CLI.
- Optional auto-update via `tauri-plugin-updater` (opt-in, signed manifest).
- Keep the web build on GitHub Pages as "try it now" (pack import works in-browser via the same validator compiled to WASM or TS fallback; no file association).
- Single version source (`package.json`), synced to `Cargo.toml` and `tauri.conf.json` by script.

---

## 9. Phased work plan

After each phase: build + lint + tests, commit with a clear message, give a short summary with light/dark screenshots where UI changed. Ask before irreversible decisions (database schema, pack format v1 freeze, licence).

### Phase 0: Specs first (no UI work)
1. Write `docs/PACK_SPEC.md` and all JSON Schemas in `/schemas` (manifest, layout, course, lesson, texts, placement, index).
2. Write small golden test packs for each input method.
3. Draft `docs/ARCHITECTURE.md` (folder layout, data flow, security model).
4. **Done when:** schemas validate the golden packs, and the spec has been reviewed by the user.

### Phase 1: Design system & theming
1. Remove all blue from Tailwind/CSS; add `tokens.css` with the section 3.2 variables.
2. System/Light/Dark switch, no-flash, persisted per profile.
3. Bundle Inter, JetBrains Mono and the Noto fallback subsets locally.
4. Build UI primitives (Button, Card, Input, Switch, Tabs, Dialog, Tooltip, Progress, Toast, Kbd, Select, Combobox).
5. Sidebar shell, custom title bar, course/language switcher placeholder.
6. **Done when:** no hard-coded colours remain (lint/grep check) and both themes look right.

### Phase 2: Unicode-aware engine + storage
1. Extract the typing engine into pure TS under `src/engine/` with the four input strategies (start with `direct`).
2. Grapheme segmentation, NFC normalisation, RTL helpers, metrics with `unitOfLength`.
3. Move storage to SQLite with migrations and the repository layer; import old `localStorage` data.
4. Argon2id PIN hashing in Rust; migration from SHA-256.
5. **Done when:** engine tests pass for Latin, Cyrillic, Bengali (direct) and Arabic (RTL), and data survives restarts.

### Phase 3: Pack system core
1. Rust import pipeline (limits, zip-slip, whitelist, schema validation, checksums, atomic install).
2. TS pack loader/registry, i18n string resolver, font loader, layout resolver.
3. Packs screen: list, enable/disable, remove, update; Import dialog with preview; file association and drag-drop.
4. Malicious-pack test suite.
5. **Done when:** golden packs install, work and uninstall cleanly, and every malicious fixture is rejected with a clear error.

### Phase 4: Redesign core screens on top of packs
1. Home, Courses map, Lesson player (focus mode), Results sheet, Tests, Settings.
2. Virtual keyboard rendered from layout JSON + geometry (ANSI/ISO/JIS): neutral keys, green target, red flash on error, optional muted finger colours; hand guide synced to layout fingers.
3. Smooth caret, per-cluster correct/incorrect colouring, pending-cluster state.
4. Command palette and keyboard shortcuts.
5. **Done when:** a full session feels fast and calm, runs entirely from a pack, and works in both themes.

### Phase 5: Built-in English pack
1. Create `packs-builtin/en-us` in the standard format: 40+ original lessons, placement test, word lists (frequency-ordered, original or public-domain), passages, tips, numpad course, programmer course.
2. Remove `src/data/curriculum.ts` and the hard-coded keyboard data; everything flows through the pack loader.
3. Add alternative English layouts (Dvorak, Colemak, Colemak-DH, Workman, UK).
4. **Done when:** the app has no hard-coded lessons and the 6.1 checklist for English is ticked.

### Phase 6: Other input methods
1. `transliteration` engine and Avro-style rule tables; romaji-to-kana.
2. `composition` (Hangul).
3. `ime` mode with `reading` support (Japanese/Chinese), composition events handled on all three OSes.
4. Verify each method with golden packs and manual testing on Windows, macOS and Linux.
5. **Done when:** every golden pack passes automated tests and a manual checklist.

### Phase 7: Pack ecosystem
1. `ttpack` CLI (init, validate, lint, build, preview, sign).
2. In-app Pack Creator (manifest, visual layout editor, lesson editor, export).
3. Pack Store (opt-in network, custom repo URL, cache, checksum verification, Verified badge).
4. Create the `typing-trainer-packs` repo structure, CI validation workflow, and `pack-template` repo.
5. Write `docs/PACK_AUTHORING.md` including the AI-assistant prompt template.
6. **Done when:** a third party can create, validate, share and import a new-language pack using only the docs.

### Phase 8: Stats, games, extras
1. Stats screen (charts, layout-aware heatmap, calendar heatmap, filters by pack).
2. Games (pack word lists), goals, streaks, achievements, reminders.
3. Certificates, progress reports, classroom mode, profile export/import.
4. UI i18n framework (English and Bengali UI).
5. Accessibility pass (screen reader labels, focus order, AA contrast in both themes, reduced motion).

### Phase 9: Reference language packs
Build and publish, in order: Bengali, Hindi, Russian, Japanese, Chinese, Korean, Arabic, Hebrew, then the European set. For each: native-speaker review checklist, font check, rendering test, lint pass, and a README with credits and licence.

### Phase 10: Native polish & release
1. Native menus, shortcuts, window state, tray, single-instance, notifications.
2. Packaging for all targets (section 8), CI release pipeline, checksums.
3. Opt-in auto-update.
4. Test installers on real Windows, macOS (Intel and Apple Silicon) and Linux (Ubuntu and Fedora) machines or VMs.
5. Docs: FEATURES, ARCHITECTURE, PACK_SPEC, PACK_AUTHORING, SIGNING, ADDING_A_LAYOUT, CONTRIBUTING; README with light/dark screenshots, install instructions per OS, roadmap.
6. Tag `v1.0.0`.

---

## 10. Acceptance criteria for v1.0

- [ ] Installs and launches from `.msi`/`.exe`, `.dmg`, `.deb` and `.AppImage` with correct icons and name; `.ttpack` double-click opens the import dialog.
- [ ] Light, Dark and System themes; neutral + green + red palette; no blue anywhere.
- [ ] The app contains **no hard-coded lessons**; English ships as a built-in pack in the public format.
- [ ] A new-language pack can be created, validated, built and imported using only the CLI/docs, with no app changes.
- [ ] At least five scripts verified working end to end: Latin, Cyrillic, Bengali, Devanagari and one of Arabic/CJK. All four input methods covered by passing tests.
- [ ] All malicious-pack fixtures are rejected; no pack content is ever executed or rendered as HTML.
- [ ] Works fully offline; network used only for the opt-in Pack Store, URL install and update check.
- [ ] Keystroke latency under 16 ms; cold start under 2 s.
- [ ] 0 TS errors, 0 lint errors, engine and validator test coverage 85%+.
- [ ] Accessibility: keyboard-only usable, AA contrast in both themes, reduced motion respected, RTL verified.
- [ ] No proprietary content; fonts, icons and word lists are open-licensed and credited in `THIRD_PARTY_NOTICES.md`.
- [ ] README has screenshots and download links.

---

## 11. How you (the agent) should work

1. Begin with **Phase 0**. List the files you will create or change before coding each phase.
2. Make small, reviewable commits (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`).
3. Never remove a working feature during the redesign; port it onto the new design system and pack architecture.
4. When a decision is ambiguous or expensive to reverse (pack format v1 freeze, DB schema, signing keys, licence), **stop and ask**.
5. Keep all content original or public-domain, and record provenance for every word list and passage.
6. When a language needs something the four input methods cannot express, document the gap in `docs/PACK_SPEC.md` as a proposed spec extension instead of hacking it into the app or allowing code in packs.
7. Treat every pack as **untrusted input**. Validate first, render as plain text, and fail closed.
