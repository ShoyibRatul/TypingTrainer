# Third-Party Notices

Typing Trainer incorporates open-source and permissively licensed software components and assets. This document acknowledges these third-party components and their respective licenses.

---

## Direct Dependencies (Node.js / Web)

| Package | License | Author / Copyright |
| --- | --- | --- |
| `@tauri-apps/api` | Apache-2.0 OR MIT | Tauri Programme within The Commons Conservancy |
| `@tauri-apps/plugin-shell` | Apache-2.0 OR MIT | Tauri Programme within The Commons Conservancy |
| `react` | MIT | Meta Platforms, Inc. and affiliates |
| `react-dom` | MIT | Meta Platforms, Inc. and affiliates |
| `lucide-react` | ISC | Lucide Project Contributors |
| `clsx` | MIT | Luke Edwards |
| `tailwind-merge` | MIT | Dany Castillo |
| `canvas-confetti` | ISC | Kiril Vatev |
| `fflate` | MIT | Arjun G |

## Direct Dependencies (Rust / Tauri Core)

| Crate | License | Source / Maintainers |
| --- | --- | --- |
| `tauri` | Apache-2.0 OR MIT | Tauri Programme within The Commons Conservancy |
| `tauri-build` | Apache-2.0 OR MIT | Tauri Programme within The Commons Conservancy |
| `tauri-plugin-shell` | Apache-2.0 OR MIT | Tauri Programme within The Commons Conservancy |
| `serde` | Apache-2.0 OR MIT | Erick Tryzelaar and David Tolnay |
| `serde_json` | Apache-2.0 OR MIT | Erick Tryzelaar and David Tolnay |

## Bundled & Embedded Assets

| Asset | License | Author / Source |
| --- | --- | --- |
| **Inter Font Family** | SIL Open Font License 1.1 (OFL-1.1) | Rasmus Andersson (`https://rsms.me/inter/`) |
| **JetBrains Mono Font** | SIL Open Font License 1.1 (OFL-1.1) | JetBrains s.r.o. (`https://www.jetbrains.com/lp/mono/`) |
| **Noto Sans / Noto Serif** | SIL Open Font License 1.1 (OFL-1.1) | Google LLC (`https://fonts.google.com/noto`) |
| **Lucide UI Icons** | ISC License | Lucide Project (`https://lucide.dev/`) |

---

## License Summary & Compatibility Assessment

A full dependency audit of `node_modules` and Rust crates was conducted via `license-checker` and crate manifests:
- **MIT:** 140 packages
- **ISC:** 11 packages
- **Apache-2.0 / Apache-2.0 OR MIT:** 9 packages
- **BSD-3-Clause:** 2 packages
- **CC-BY-4.0:** 1 package
- **OFL-1.1 (Fonts):** Bundled typography

**Compatibility Confirmation:**
No copyleft (GPL, AGPL, LGPL, MPL) packages are linked or bundled into the application binaries. All runtime dependencies use permissive licenses (MIT, ISC, Apache-2.0, BSD-3-Clause, OFL-1.1) that permit redistribution and bundling under the PolyForm Noncommercial License 1.0.0 and separate commercial licenses.
