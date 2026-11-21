# Security Policy

## Supported Versions

Only the latest release of Typing Trainer receives active security updates.

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in Typing Trainer, please do not disclose it publicly or open an issue on the public tracker.

Please report vulnerabilities privately by emailing:
**hello@shoyibratul.com**

Please include in your report:
- A description of the vulnerability and its potential impact.
- Step-by-step instructions or proof-of-concept (PoC) code to reproduce the issue.
- Details regarding the affected operating system (Windows, macOS, Linux, or Web).

### Response Expectations
- **Initial Acknowledgement:** Within 48 hours of receipt.
- **Triage & Status Update:** Within 7 business days with an assessment and estimated remediation timeline.
- **Fix & Public Advisory:** Once the patch has been tested, released, and coordinated with the reporter.

## Lesson Pack Security Notice

Lesson packs (`.ttpack`) are treated as **untrusted input**:
- Packs are strictly sandboxed ZIP archives containing JSON definitions and assets.
- Path traversal sequences (e.g. `../`), symlinks, and archive bombs are actively rejected by the extraction and loading engine.
- Pack files do not have executable privileges and cannot run code within the host system.
