# Typing Trainer: Universal Lesson Pack Specification (v1)

This specification defines the format, validation rules, security boundaries, and lifecycle of **Typing Trainer Lesson Packs** (`.ttpack`).

---

## 1. Overview & File Container

A `.ttpack` file is a standard ZIP archive containing declarative metadata, layout geometries, course curricula, word lists, practice passages, and optional open-licensed fonts.

### Hard Security Constraints (Packs are Data, Never Code)
1. **Allowed Extensions Only**:
   * Documents & Metadata: `.json`, `.txt`, `.md`, `LICENSE`
   * Typography: `.woff2`, `.ttf`, `.otf` (OFL / open-licensed only)
   * Raster Assets: `.png`, `.webp`, `.svg` (strictly sanitized; zero `<script>` or external refs)
   * **Strictly Prohibited**: `.js`, `.mjs`, `.wasm`, `.html`, `.exe`, `.bat`, `.sh`, `.dll`, `.so`.
2. **Streaming Extraction Limits**:
   * Maximum Compressed Archive Size: **50 MB**
   * Maximum Uncompressed Size: **200 MB**
   * Maximum Files Count: **5,000 entries**
   * Maximum Compression Ratio: **100:1** (anti-zip-bomb guard)
3. **Zip-Slip & Path Traversal Protections**:
   * Reject any entry containing `..`, absolute paths (`/` or `C:\`), backslashes, symlinks, or duplicate case-insensitive file paths.

---

## 2. Directory Structure Inside a Pack

```
my-language-pack.ttpack
├── manifest.json            # [Required] Main pack metadata conforming to manifest.schema.json
├── LICENSE                  # [Required] Declared open license (e.g. CC-BY-4.0, MIT, OFL)
├── README.md                # [Optional] Pack overview and pedagogical background
├── layouts/                 # [Required] At least one layout file conforming to layout.schema.json
│   ├── standard.json
│   └── phonetic.json
├── courses/                 # [Required] At least one course directory
│   └── beginner/
│       ├── course.json      # Conforms to course.schema.json
│       └── lessons/         # Conforms to lesson.schema.json
│           ├── 001-home-row.json
│           └── 002-vowels.json
├── wordlists/               # [Optional] Plain text UTF-8 words (one per line)
│   └── frequency-1000.txt
├── texts/                   # [Optional] Conforms to texts.schema.json
│   └── passages.json
├── assessment/              # [Optional] Conforms to placement.schema.json
│   └── placement.json
└── fonts/                   # [Optional] Bundled fonts for complex scripts
    └── CustomFont.woff2
```

---

## 3. Four Core Input Strategies

Packs declare how physical keyboard events convert into the intended script:

### Strategy 1: `direct`
Each physical key maps directly to a target character or glyph through layer mappings (`base`, `shift`, `altgr`, `shiftAltgr`).
* Examples: English QWERTY, Bengali Bijoy, Russian ЙЦУКЕН, Hindi InScript, Arabic standard.
* Supports dead keys (accents and diacritics) via declarative `deadKeys` tables.

### Strategy 2: `transliteration`
The typist presses Latin keys, and the engine dynamically translates sequences into target script characters using declarative, longest-match-first JSON rule tables.
* Example: Bengali Avro Phonetic (`kkh` -> `ক্ষ`, `k` -> `ক`), Hindi ITRANS, Japanese romaji-to-kana (`ka` -> `か`).
* Does not require system IME installation.

### Strategy 3: `composition`
Sequential keystrokes combine into syllabic cluster blocks using built-in, standardized composition algorithms.
* Example: Korean Hangul 2-set (`hangul-dubeolsik`), assembling Choseong, Jungseong, and Jongseong jamo into precomposed Unicode syllable blocks.

### Strategy 4: `ime`
The typing exercise requires the user's operating system Input Method Editor (e.g., Japanese Kanji, Chinese Hanzi).
* The engine monitors DOM `compositionstart`, `compositionupdate`, and `compositionend` events, validating committed text against the target.
* Exercise items can specify `reading` and `readingType` (e.g. `romaji`, `pinyin`, `furigana`) so learners know which phonetic keys to input.

---

## 4. Unicode & Text Segmentation Requirements

* **Cluster-Level Evaluation**: All string operations rely on `Intl.Segmenter` configured for `granularity: 'grapheme'`.
* **Normalization**: All pack text and user keystroke buffers are normalized to Unicode **NFC** before comparison.
* **Pending Cluster State**: In complex Indic, Arabic, and Southeast Asian scripts, multiple keystrokes assemble into a single visible glyph cluster. The engine maintains a neutral "pending" state until cluster completion.
* **Bi-directional (RTL) Support**: When `direction: 'rtl'` is declared in the manifest, typing containers render with `dir="rtl"` and logical cursor positioning, while keyboard layouts remain physically mapped.

---

## 5. Metrics & Comparable WPM

* **Base Unit**: Grapheme cluster.
* **Standard Word**: Calculated as `charsPerWord` units (default: 5 units per word).
* **CJK Scripts**: For scripts without inter-word spacing (Chinese, Japanese), the primary display unit defaults to **CPM (Characters Per Minute)**, with WPM as a secondary metric.
