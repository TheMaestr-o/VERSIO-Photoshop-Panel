# VERSIO
## Bible Study Inside Photoshop

<div align="center">

**English text. Russian translation. Vocabulary practice.**  
Daily Scripture lessons while you work.

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Photoshop](https://img.shields.io/badge/Photoshop-2020%E2%80%942026-blue.svg)

[What is VERSIO?](#what-is-versio) • [Install](#install) • [How to Use](#how-to-use) • [Features](#features)

---

### The Problem

You spend hours in Photoshop. You want to study Scripture daily. But switching between apps breaks your flow.

### The Solution

**VERSIO** brings today's Bible lesson directly into Photoshop. English and Russian, side by side. Learn new words. Understand Scripture better. No leaving your workspace.

</div>

---

## What is VERSIO?

A Photoshop panel that displays:

- Today's Bible passages, cited from the Sabbath School lesson and quoted from the full Bible text
- English text (King James Version)
- Russian translation (Synodal Version)
- Vocabulary study — click words to learn definitions
- Real dictionary examples for each word, with a second dictionary as fallback

Live data from **SDARM**. No manual updates. No configuration. Install once, it works.

**Two editions, same panel:**

| Edition | Photoshop | Folder |
|---|---|---|
| **UXP** (recommended) | 2024–2026 and later | [`VERSIO-UXP/`](VERSIO-UXP/) |
| **CEP** (legacy) | 2020–2025 | [`VERSIO/`](VERSIO/) |

Photoshop replaced its old CEP extension system with UXP starting around 2024; by 2026 CEP no longer loads third-party panels at all. Install the edition that matches your Photoshop version — see [Install](#install).

---

## Screenshots

<div align="center">

![VERSIO Panel Gallery](https://raw.githubusercontent.com/TheMaestr-o/VERSIO-Photoshop-Panel/main/screenshots/gallery-full.png)

**① Initial Load** · **② Word Study** · **③ Navigate** · **④ Dual Language**

English + Russian side by side. Click to learn. Dark theme optimized for focus.

[View interactive HTML gallery →](screenshots/index.html)

</div>

---

## Install

### UXP edition — Photoshop 2024–2026+

UXP plugins load either through the **UXP Developer Tool** (Adobe's official loader) or by placing the plugin directly in Photoshop's external plugins folder.

**Option A — UXP Developer Tool (recommended):**

1. Install [Adobe UXP Developer Tool](https://developer.adobe.com/photoshop/uxp/2022/guides/devtool/) (free, from Adobe)
2. In UDT, click **Add Plugin** and select the [`VERSIO-UXP/manifest.json`](VERSIO-UXP/manifest.json) file
3. Click **Load** next to the plugin, with Photoshop running
4. Find VERSIO under **Plugins → VERSIO**

**Option B — manual sideload (no UDT needed):**

1. Download or clone this repository
2. Copy the `VERSIO-UXP` folder to:
   - **Mac**: `/Library/Application Support/Adobe/UXP/Plugins/External/com.maestro.versio/`
   - **Windows**: `C:\Program Files\Common Files\Adobe\UXP\Plugins\External\com.maestro.versio\`
   (rename the copied folder to `com.maestro.versio` if it isn't already)
3. Restart Photoshop
4. Find VERSIO under **Plugins → VERSIO**

### CEP edition — Photoshop 2020–2025

1. Download or clone this repository
2. Copy the `VERSIO` folder to your CEP extensions directory:
   - **Mac**: `~/Library/Application Support/Adobe/CEP/extensions/`
   - **Windows**: `C:\Users\<Your Username>\AppData\Roaming\Adobe\CEP\extensions\`
3. Restart Photoshop
4. Find VERSIO under **Window → VERSIO**

---

## How to Use

### Navigation

| Action | What Happens |
|--------|---|
| Click on the verse | Loads the next Bible passage |
| Click on the word | Shows the next vocabulary term |
| Read the example | Understand the word in context |
| Read the text below the divider | Compare the Russian translation |

### Layout

```
┌─────────────────────────────────┐
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
│  Ибо так возлюбил Бог мир...    │
│                       John 3:16 │
│                                 │
└─────────────────────────────────┘

Width:  300px
Height: 550px (fixed — not resizable)
Theme:  Dark (optimized for long sessions)
```

---

## Features

### Verses sourced like the SBL project

Today's lesson gives the Bible citations (book, chapter, verse); the full Bible text files supply the exact quoted wording in each language — the same pipeline used by the SDARM SBL and MANNA projects, rather than any shortened or paraphrased text.

**Data sources:**
- Lesson citations: `app.sdarm.org/sbl/data/`
- Full Bible text: `app.sdarm.org/bible/data/` — KJV (English), Synodal (Russian)

### Dual Language

Study Scripture in **two languages side by side**:
- **English**: King James Version (formal, poetic)
- **Russian**: Synodal Version (authorized Russian translation)

Understand the nuances. Compare translations. Learn faster.

### Vocabulary Builder

VERSIO automatically extracts meaningful words from each passage. Click to study:
- The word itself
- A real dictionary example
- How many more words remain in this verse

Examples come from the Free Dictionary API first; if a word has no example there, VERSIO checks Wiktionary before giving up. No setup. No word lists. Just the words from today's Scripture.

### Works Offline

No internet on launch day? VERSIO works anyway.

Fallback passage included (John 3:16). Works even if the SDARM API is down. When connection returns, it loads live data.

### Minimal, Dark Design

Optimized for long study sessions:
- Dark theme reduces eye strain
- Typography sized for readability
- No distractions—just Scripture
- Text automatically shrinks to fit even the longest Bible verse, so the panel never scrolls

Matches Photoshop's native design language.

---

## Technical Details

| Property | UXP edition | CEP edition |
|---|---|---|
| **Photoshop** | 2024–2026+ | 2020–2025 |
| **Manifest** | `manifest.json` (manifestVersion 5) | `CSXS/manifest.xml` (CEP 10.0) |
| **Language** | HTML5 + Vanilla JavaScript | HTML5 + Vanilla JavaScript |
| **Size** | 300×550, fixed | 300×550, fixed |
| **Menu location** | Plugins → VERSIO | Window → VERSIO |
| **Internet** | Required on first load; works offline after | Same |

### Architecture

```
VERSIO-UXP/                  VERSIO/ (CEP)
  ├── manifest.json            ├── CSXS/manifest.xml
  ├── index.html                ├── index.html (UI + JS)
  ├── styles.css                └── hostscript.jsx
  ├── index.js
  └── icons/
```

---

## Troubleshooting

### UXP: plugin doesn't appear under Plugins menu

1. Confirm the folder is named exactly `com.maestro.versio` and sits directly inside `.../UXP/Plugins/External/`
2. Confirm `manifest.json` is valid JSON (any JSON validator will do)
3. Restart Photoshop completely
4. Check the UXP log: `~/Library/Logs/Adobe/Adobe Photoshop 2026/UXPLogs_*.log` (Mac) — search for `com.maestro.versio`. Its presence there, without an accompanying error, means Photoshop found and registered the plugin.

### CEP: panel doesn't appear in Window menu

1. Verify the VERSIO folder is in the correct CEP extensions location (see [Install](#install))
2. Restart Photoshop completely
3. Check Adobe logs: `~/Library/Logs/CSXS/` (Mac) — look for a `VERSIO` log file after launch. No file means Photoshop never attempted to load it — likely because this Photoshop version has dropped CEP support for third-party panels; use the UXP edition instead.

### "No verses found" message

- Check internet connection
- SDARM API may be temporarily down—try again in a moment
- Panel falls back to John 3:16 automatically

### Words don't show examples

- Both dictionary sources need an internet connection
- A handful of very rare words may have no example in either source

---

## Roadmap

Planned features:

- Offline lesson caching (pre-download quarters)
- Custom date selection (not just today)
- Memory quiz mode
- Search within verse text
- Custom word list export to CSV
- German (DE) language support
- iPad companion app

---

## Credits

**VERSIO**  
© 2026 Sergio (Maestro)

**Built with:**
- SDARM Bible Lesson and Bible text API
- Free Dictionary API (dictionaryapi.dev) and Wiktionary
- Adobe UXP and CEP frameworks

**Author:** Sergio (Maestro)  
**GitHub:** [@TheMaestr-o](https://github.com/TheMaestr-o)  
**Email:** gssdarm@gmail.com  
**Support:** [Issues](https://github.com/TheMaestr-o/VERSIO-Photoshop-Panel/issues)

---

## License

MIT License – Free to use, modify, and distribute.

[Full license text](LICENSE)

---

<div align="center">

Study Scripture daily. Stay focused. VERSIO keeps you there.

[Report Issue](https://github.com/TheMaestr-o/VERSIO-Photoshop-Panel/issues) • [Contact](mailto:gssdarm@gmail.com)

</div>
