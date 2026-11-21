# ⌨️ Typing Trainer

> **Next-Generation Multi-Platform Touch Typing Suite**  
> Engineered for **Windows, macOS (Apple Silicon & Intel), Linux & Modern Web Browsers**.

[![Release & Multi-Platform Auto-Build](https://github.com/ShoyibRatul/TypingTrainer/actions/workflows/release.yml/badge.svg)](https://github.com/ShoyibRatul/TypingTrainer/actions/workflows/release.yml)
[![License: PolyForm Noncommercial](https://img.shields.io/badge/License-PolyForm%20Noncommercial-blue.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux%20%7C%20Web-emerald.svg)](https://github.com/ShoyibRatul/TypingTrainer)

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
* **Vector SVG Virtual Keyboard & Hand Visualizer**:
  * Crisp on 1080p, 4K, and Retina screens.
  * Real-time finger mapping guides and physical home-row tactile bumps on `F` and `J`.
* **Tactile Mechanical Switch Sound Synthesizer**:
  * Built using the **Web Audio API** — zero external MP3s needed.
  * Choose between *Cherry MX Blue*, *Cherry MX Brown*, *Topre Thock*, and *Vintage Typewriter*.
* **Fine-Grained Telemetry & Weak Key Diagnostics**:
  * Measures **Inter-Key Latency (IKL)** in milliseconds to diagnose hesitation friction.
  * Real-time WPM, Raw WPM, CPM, Accuracy %, and Consistency variance.
* **Arcade Mini-Games**:
  * Built-in *Word Fall Arena* with falling blocks, combo multipliers, and retro particle effects.
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
