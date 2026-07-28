# VERSIO
## Bible Study Inside Photoshop

<div align="center">

**English text. Russian translation. Vocabulary practice.**  
Daily Scripture lessons while you work.

[![Download](https://img.shields.io/badge/Download-v5.0.0-blue.svg)](https://github.com/TheMaestr-o/VERSIO-Photoshop-Panel/releases/download/v5.0.0/VERSIO.zip)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Photoshop](https://img.shields.io/badge/Photoshop-2020%E2%80%942026-blue.svg)

[What is VERSIO?](#what-is-versio) • [Install](#quick-install) • [How to Use](#how-to-use) • [Features](#features)

---

### The Problem

You spend hours in Photoshop. You want to study Scripture daily. But switching between apps breaks your flow.

### The Solution

**VERSIO** brings today's Bible lesson directly into Photoshop. English and Russian, side by side. Learn new words. Understand Scripture better. No leaving your workspace.

</div>

---

## What is VERSIO?

A **CEP panel** for Adobe Photoshop that displays:

- ✨ **Today's Bible passages** from the Sabbath School lesson
- ✨ **English text** (King James Version) 
- ✨ **Russian translation** (Synodal Version)
- ✨ **Vocabulary study** — click words to learn definitions
- ✨ **Real dictionary examples** for each word

Live data from **SDARM**. No manual updates. No configuration. Install once, it works.

---

## Screenshots

<table>
<tr>
  <td align="center">
    <img src="screenshots/screen-1-load.jpg" width="280" alt="Initial Load"/><br>
    <sub><b>Daily lesson loads automatically</b></sub>
  </td>
  <td align="center">
    <img src="screenshots/screen-2-vocab.jpg" width="280" alt="Vocabulary"/><br>
    <sub><b>Click word → see definition</b></sub>
  </td>
  <td align="center">
    <img src="screenshots/screen-3-next.jpg" width="280" alt="Navigation"/><br>
    <sub><b>Click verse → next passage</b></sub>
  </td>
</tr>
</table>

[View full gallery →](screenshots/index.html)

---

## Quick Install

### For Mac

**1 minute setup:**

```bash
# Download the panel
curl -L https://github.com/TheMaestr-o/VERSIO-Photoshop-Panel/releases/download/v5.0.0/VERSIO.zip -o ~/Downloads/VERSIO.zip

# Extract
unzip ~/Downloads/VERSIO.zip -d ~/Library/Application\ Support/Adobe/CEP/extensions/

# Restart Photoshop
```

Then: **Window → VERSIO**

### For Windows

```bash
# Download: https://github.com/TheMaestr-o/VERSIO-Photoshop-Panel/releases/download/v5.0.0/VERSIO.zip
# Extract to: C:\Users\<Your Username>\AppData\Roaming\Adobe\CEP\extensions\
# Restart Photoshop
```

Then: **Window → VERSIO**

### Manual Install (Any OS)

1. [Download VERSIO.zip](https://github.com/TheMaestr-o/VERSIO-Photoshop-Panel/releases/download/v5.0.0/VERSIO.zip)
2. Copy the `VERSIO` folder to your CEP extensions directory:
   - **Mac**: `~/Library/Application Support/Adobe/CEP/extensions/`
   - **Windows**: `C:\Users\<Your Username>\AppData\Roaming\Adobe\CEP\extensions\`
3. Restart Photoshop
4. Open Window → VERSIO

---

## How to Use

### Launching

After install, VERSIO appears in your **Window** menu. Click **Window → VERSIO** to open.

### Navigation

| Action | What Happens |
|--------|---|
| **Click on the verse** | Loads the next Bible passage |
| **Click on the word** | Shows the next vocabulary term |
| **Read the example** | Understand the word in context |
| **Read Russian translation** | Compare both versions |

### Layout

```
┌─────────────────────────────────┐
│      Designed by Maestro        │
├─────────────────────────────────┤
│                                 │
│  For God so loved the world     │
│  that he gave his one and       │
│  only Son...                    │
│                       John 3:16 │
│                                 │
├─────────────────────────────────┤
│                                 │
│        BELIEVED (2 / 8)         │
│                                 │
│  "She believed his promise"     │
│                                 │
├─────────────────────────────────┤
│  Перевод стиха                  │
│  Ибо так возлюбил Бог мир...    │
│                       John 3:16 │
│                                 │
└─────────────────────────────────┘

Width:  300px
Height: 550px
Theme:  Dark (optimized for long sessions)
```

---

## Features

### 🌐 Live Data

VERSIO fetches **today's Sabbath School lesson** directly from SDARM. No manual updates. When you open Photoshop, you see today's passages automatically.

**Data sources:**
- Lessons: `app.sdarm.org/sbl/data/`
- Bible text: KJV (English), Synodal (Russian)

### 📚 Dual Language

Study Scripture in **two languages side by side**:
- **English**: King James Version (formal, poetic)
- **Russian**: Synodal Version (authorized Russian translation)

Understand the nuances. Compare translations. Learn faster.

### 🎓 Vocabulary Builder

VERSIO automatically extracts meaningful words from each passage. Click to study:
- The word itself
- A real dictionary example
- How many more words remain in this verse

No setup. No word lists. Just the words from today's Scripture.

### ⚡ Works Offline

No internet on launch day? VERSIO has you covered.

Fallback passage included (John 3:16). Works even if SDARM API is unreachable. When connection returns, loads live data.

### 🎨 Minimal, Dark Design

Optimized for long study sessions:
- Dark theme reduces eye strain
- Typography sized for readability
- No distractions—just Scripture

Matches Photoshop's native design language.

### 🚀 Zero Configuration

Drop the panel in your CEP extensions folder. Photoshop finds it. No config files. No restart needed (just close/reopen the panel). It works.

---

## Technical Details

| Property | Value |
|----------|-------|
| **Type** | CEP Panel (CEP 10.0) |
| **Language** | HTML5 + Vanilla JavaScript |
| **Size** | ~50 KB |
| **Photoshop** | 2020 (v21.0) through 2026 and later |
| **OS** | macOS 10.13+, Windows 7+ |
| **Internet** | Required on first load; works offline after |

### Architecture

```
VERSIO/
  ├── CSXS/
  │   └── manifest.xml       # Panel registration
  ├── index.html             # UI + JavaScript
  ├── hostscript.jsx         # Photoshop communication
  └── README.md              # Instructions
```

**Manifest** (CEP 10.0):
- Extension ID: `versio`
- Version: 5.1.0
- Size: 300×550 pixels
- Target: Photoshop 21.0–999.0 (2020–2026+)

---

## Troubleshooting

### Panel doesn't appear in Window menu

**Solution:**
1. Verify VERSIO folder is in correct location:
   - **Mac**: `~/Library/Application Support/Adobe/CEP/extensions/VERSIO`
   - **Windows**: `C:\Users\<You>\AppData\Roaming\Adobe\CEP\extensions\VERSIO`
2. Restart Photoshop completely
3. Check Adobe logs: `~/Library/Logs/Adobe/CEP/PSXS.log` (Mac)

### "No verses found" message

**Solution:**
- Check internet connection
- SDARM API may be temporarily down—try again in a moment
- Panel falls back to John 3:16 automatically

### Words don't show examples

**Solution:**
- Dictionary API (dictionaryapi.dev) needs internet connection
- Some rare words may not be in the public dictionary
- Try a different word from the passage

### CEP warnings in console

**Info:** CEP panels show warnings by default. This is normal. VERSIO works despite these messages.

---

## Roadmap

**Planned features:**

- [ ] Offline lesson caching (pre-download quarters)
- [ ] Custom date selection (not just today)
- [ ] Memory quiz mode
- [ ] Search within verse text
- [ ] Custom word list export to CSV
- [ ] German (DE) language support
- [ ] iPad companion app

---

## Credits

**VERSIO v5.0.0**  
© 2026 Sergio (Maestro)

**Built with:**
- SDARM Bible Lesson API
- Dictionary API (dictionaryapi.dev)
- Adobe CEP Framework

**Author:** Sergio (Maestro)  
**GitHub:** [@TheMaestr-o](https://github.com/TheMaestr-o)  
**Email:** gssdarm@gmail.com  
**Support:** [Issues](https://github.com/TheMaestr-o/VERSIO-Photoshop-Panel/issues)

---

## License

MIT License – Free to use, modify, and distribute.

```
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the 
"Software"), to deal in the Software without restriction...
```

[Full license text](LICENSE)

---

<div align="center">

**Study Scripture daily.**  
**Stay focused.**  
**VERSIO keeps you there.**

[Install VERSIO](https://github.com/TheMaestr-o/VERSIO-Photoshop-Panel/releases/download/v5.0.0/VERSIO.zip) • [Report Issue](https://github.com/TheMaestr-o/VERSIO-Photoshop-Panel/issues) • [Contact](mailto:gssdarm@gmail.com)

</div>
