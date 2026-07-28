# VERSIO — Photoshop Bible Study Panel

<div align="center">

**Daily Bible Lessons in Adobe Photoshop** — English text, vocabulary study, and Russian translation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Photoshop CS 21.0+](https://img.shields.io/badge/Photoshop-CS%2021.0%2B-blue.svg)
![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg)

[Features](#features) • [Installation](#installation) • [Usage](#usage) • [Credits](#credits)

</div>

---

## Overview

**VERSIO** is a CEP panel for Adobe Photoshop that brings the daily Sabbath Bible Lesson directly into your workspace. Study Scripture in English and Russian, learn vocabulary, and read authentic translations—all without leaving Photoshop.

The panel fetches today's lesson from SDARM and displays Scripture passages with:
- **English text** from the King James Version  
- **Russian translation** from the Synodal Version
- **Word study mode** with vocabulary examples
- **Click navigation** to browse through the day's passages

---

## Features

✨ **Live Lesson Data**  
Pulls today's Bible passages and translations directly from the SDARM API—always fresh, always accurate.

📖 **Dual-Language Study**  
English (KJV) and Russian (Synodal) texts side-by-side. Understand the nuances between versions.

📚 **Vocabulary Builder**  
Auto-extract meaningful words from each passage. Click to advance through vocabulary with real dictionary examples.

🎨 **Clean, Minimal Design**  
Dark theme optimized for long study sessions. Typography and spacing follow Photoshop's native design language.

🔄 **One-Click Navigation**  
Click the verse to load the next passage. Click a word to study the next term. Fluid, distraction-free workflow.

⚡ **No Installation Friction**  
Drop into your CEP extensions folder. Photoshop finds it automatically—no config, no restart needed.

---

## Installation

### For Mac

1. **Download** the VERSIO panel files
2. **Copy** to:
   ```
   ~/Library/Application Support/Adobe/CEP/extensions/VERSIO/
   ```
3. **Restart** Photoshop (if running)
4. **Open**: Window > VERSIO

### For Windows  
   ```
   C:\Users\<Username>\AppData\Roaming\Adobe\CEP\extensions\VERSIO\
   ```

### From Source (Advanced)

```bash
git clone https://github.com/TheMaestr-o/VERSIO-Photoshop-Panel.git
cd VERSIO-Photoshop-Panel
cp -r VERSIO ~/Library/Application\ Support/Adobe/CEP/extensions/
```

---

## Usage

### Starting the Panel

1. Open Photoshop
2. Go to **Window > VERSIO**
3. Panel loads today's lesson automatically

### Navigation

- **Click the verse** → Next passage in today's lesson
- **Click the word** → Next vocabulary term from the current passage
- **Counter** (bottom right) → Shows current word position (e.g., 3 / 8)

### The Layout

```
┌─────────────────────────────────┐
│       VERSIO (Designed by       │
│         Maestro)                │
├─────────────────────────────────┤
│                                 │
│  For God so loved the world     │
│  that he gave his one and       │
│  only Son, that whoever         │
│  believes in him shall not      │
│  perish but have eternal        │
│  life.                          │
│                    John 3:16    │
│                                 │
├─────────────────────────────────┤
│                                 │
│        BELIEVED (1 / 8)         │
│                                 │
│    Example: The jury            │
│    believed the defendant's     │
│    testimony.                   │
│                                 │
├─────────────────────────────────┤
│                                 │
│  Перевод стиха                  │
│  Ибо так возлюбил Бог мир,      │
│  что отдал Сына Своего...       │
│                  John 3:16      │
│                                 │
└─────────────────────────────────┘
```

---

## Data Source

VERSIO fetches lessons and Bible text from **SDARM** (Seventh-day Adventist Reform Movement):

- **Lessons**: `https://app.sdarm.org/sbl/data/{lang}/{lang}-{year}-{quarter}.json`
- **Bible Text**: English (KJV), Russian (Synodal)

Fallback passages included for offline study.

---

## Technical Details

- **Type**: CEP Panel (CEP 10.0)
- **Language**: HTML5 + JavaScript (vanilla)
- **Size**: < 50 KB
- **Photoshop**: 2020 (21.0) and later
- **OS**: macOS 10.13+, Windows 7+

### Manifest

```xml
<ExtensionManifest Version="7.0" ExtensionBundleId="versio">
  <Extension Id="versio.panel" Version="5.0.0">
    <UI Type="Panel" Menu="VERSIO">
      <Geometry Width="300" Height="550" />
    </UI>
  </Extension>
</ExtensionManifest>
```

---

## Troubleshooting

### Panel doesn't appear in Window menu
- Verify the VERSIO folder is in the correct CEP extensions path
- Restart Photoshop completely
- Check Adobe's CEP logs: `~/Library/Logs/Adobe/CEP/`

### "No verses found" error
- Internet connection required on first load
- SDARM API may be temporarily unavailable; try again in a moment
- Panel falls back to John 3:16 if offline

### Words not showing examples
- Dictionary API (dictionaryapi.dev) connection required
- Some rare words may not have examples in the public dictionary

---

## Roadmap

- [ ] Offline mode with cached lessons
- [ ] Custom date selection (not just today)
- [ ] Memory/memorization quiz mode
- [ ] Search within verses
- [ ] Custom word list export
- [ ] German language support

---

## Credits

**VERSIO v5.0.0**  
© 2026 Sergio (Maestro). All rights reserved.

Built with:
- SDARM Bible Lesson Data API
- Dictionary API (dictionaryapi.dev)
- Adobe CEP Framework

**Author**: [Maestro (@TheMaestr-o)](https://github.com/TheMaestr-o)  
**Email**: gssdarm@gmail.com  
**License**: MIT

---

## Support

Found a bug? Ideas for features?

- **Report issues**: [GitHub Issues](https://github.com/TheMaestr-o/VERSIO-Photoshop-Panel/issues)
- **Contact**: gssdarm@gmail.com
- **Telegram**: [@my_studify_bot](https://t.me/my_studify_bot)

---

## License

MIT License — See [LICENSE](LICENSE) file for details.

```
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software to deal in the Software without restriction...
```

---

<div align="center">

**Keep learning. Keep growing. Study Scripture daily.**

*VERSIO — Your Bible lesson, always in reach.*

</div>
