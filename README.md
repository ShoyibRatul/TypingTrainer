# ⌨️ Typing Trainer

> **Next-Generation Multi-Platform Touch Typing Suite**  
> Engineered for **Windows, macOS (Apple Silicon & Intel), Linux & Modern Web Browsers**.

[![Release & Multi-Platform Auto-Build](https://github.com/ShoyibRatul/TypingTrainer/actions/workflows/release.yml/badge.svg)](https://github.com/ShoyibRatul/TypingTrainer/actions/workflows/release.yml)
[![Deploy Web (GitHub Pages)](https://github.com/ShoyibRatul/TypingTrainer/actions/workflows/pages.yml/badge.svg)](https://github.com/ShoyibRatul/TypingTrainer/actions/workflows/pages.yml)
[![License: PolyForm Noncommercial](https://img.shields.io/badge/License-PolyForm%20Noncommercial-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux%20%7C%20Web-emerald.svg)](https://github.com/ShoyibRatul/TypingTrainer)
[![Web Live](https://img.shields.io/badge/Web%20App-GitHub%20Pages-22c55e.svg)](https://shoyibratul.github.io/TypingTrainer/)

---

## 🌟 Highlights & Key Features

* **Free for Non-Commercial & Educational Use**: Free for personal study, schools, universities, hobbyists, and non-profit organizations.
* **Universal Multi-Platform Support**:
  * 🪟 **Windows**: Native `.msi` installer & `.exe` executable.
  * 🍎 **macOS**: Universal `.dmg` supporting Apple Silicon (M1/M2/M3/M4) & Intel x64.
  * 🐧 **Linux**: Portable `.AppImage` and `.deb` packages.
  * 🌐 **Web & PWA**: Zero-install web edition deployable directly via GitHub Pages.
* **Multi-User Profile System with PIN Security**:
  * Perfect for classrooms, families, or shared computers.
  * Multiple users (e.g., Alice, Bob, Charlie) with isolated progress and history.
  * Each profile can be optionally locked with a **PBKDF2-SHA256 encrypted PIN/password**.
* **Clean-Room, 100% Original Curriculum**:
  * Independent pedagogical structure starting from the Home Row anchor (`ASDF JKL;`), moving through vowels, reaches, capitalization, numbers, and code syntax.
  * Clean-room design avoiding any copyrighted texts or materials from legacy software.
* **Universal Pack Architecture (`.ttpack`)**:
  * Decoupled curriculum, layouts, and wordlists running inside an in-memory zip-safe sandbox with strict path traversal & bomb protection.
  * Comprehensive built-in English pack with 44 structured progressive lessons across 3 courses (*Fundamentals*, *Programmer Syntax*, *10-Key Numpad*), diagnostic placement assessment, and 4 layout options (*US QWERTY*, *Dvorak*, *Colemak*, *Colemak-DH*).
* **Vector SVG Virtual Keyboard & Hand Visualizer**:
  * Crisp on 1080p, 4K, and Retina screens.
  * Real-time finger mapping guides and physical home-row tactile bumps on `F` and `J`.
* **Keyboard Diagnostic Heatmap & Biomechanics**:
  * Dual-mode ANSI keyboard heatmap visualizing key-by-key error frequency and hesitation latency.
  * Ergonomic workload balance analysis between Left and Right hands plus 9-way individual finger load distribution.
  * Printable/exportable **Certificate of Typing Proficiency** acknowledging verified velocity and accuracy.
* **Multi-Mode Arcade Arena**:
  * *Word Fall Survival*: Fast-paced falling word defense with combos, difficulty tiers (Easy, Medium, Hard, Developer), and power-ups.
  * *Zen Rhythm Flow*: Continuous, peaceful flow state exercises maintaining cadence and consistency without failure pressure.
* **Global Command Palette (`Cmd/Ctrl+K`)**:
  * Lightning-fast modal switcher for instant keyboard-only navigation across drills, packs, arcade, analytics, settings, and themes.
* **Automated GitHub Actions CI/CD**:
  * Pushing a tag (e.g. `v1.0.0`) automatically compiles native binaries for Windows, macOS, and Linux, creates a GitHub Release, and publishes the Web app to GitHub Pages.

---

## 🚀 Quick Start for Development

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or newer; v22 recommended)
* Optional for local native packaging: [Rust](https://rustup.rs/) (GitHub Actions compiles native binaries automatically)

### Running Locally
```bash
# Clone the repository
git clone https://github.com/ShoyibRatul/TypingTrainer.git
cd TypingTrainer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:1420` in your web browser.

### Building Web Version
```bash
npm run build
npm run preview
```

### Packaging Native Desktop Apps (via Tauri)
```bash
npm run tauri build
```

---

## 🤖 GitHub Actions Automated Multi-Platform Release

Typing Trainer comes equipped with a production GitHub Actions workflow (`.github/workflows/release.yml`).

To build native installers for **Windows**, **macOS**, and **Linux** automatically:
1. Create and push a version tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
2. GitHub Actions will automatically trigger:
   * Build the web app and deploy to **GitHub Pages**.
   * Compile **Windows `.msi` and `.exe`** binaries on a Windows runner.
   * Compile **macOS Universal `.dmg`** on an Apple runner.
   * Compile **Linux `.AppImage` and `.deb`** on an Ubuntu runner.
   * Create an official **GitHub Release** and attach all installers.

---

## 🔒 Privacy & Architecture

Unlike legacy commercial typing tutors that employ invasive global keyboard sniffing hooks (often flagged as keyloggers by antivirus), Typing Trainer is **100% sandboxed**:
* Key event listening occurs **strictly inside the application window**.
* All user profiles, statistics, and latency metrics are stored **locally** on your device (`localStorage` / SQLite).
* Zero analytics or personal data is transmitted over the internet.

---

## 📜 License

Free for personal, educational and non-commercial use under the
[PolyForm Noncommercial License 1.0.0](LICENSE).
Commercial use requires a separate license. See [COMMERCIAL.md](COMMERCIAL.md).

For contribution terms and licensing of contributions, see [CONTRIBUTING.md](CONTRIBUTING.md).
For third-party components and open-source licenses, see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
For code of conduct and security reporting, see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) and [SECURITY.md](SECURITY.md).
