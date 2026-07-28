/* VERSIO · UXP edition — Daily Bible verse study inside Photoshop
   Verses are sourced the same way the SBL project does: today's lesson
   gives the citations (sOsis references), the full Bible files give the
   exact quoted text in each language. */

const BIBLE = { en: "en-kjv", ru: "ru-rst" };

const state = { en: "", ru: "", ref: "", words: [], idx: 0, vocabCache: {} };
let loading = false;
let versePool = [];
let verseIdx = 0;
const bibles = {};

const STOP_WORDS = new Set([
    "the","and","of","to","in","that","is","he","for","it","as","was","with","be","on","at","by","not","this","but","from","they","his","her","she","him","my","me","you","your","are","have","had","do","does","did","will","shall","can","could","would","should","an","or","so","if","all","into","upon","unto","their","them","who","what","which","then","when","were","been","hath","thou","thee","thy","said","also","even","now","yet","let","its","has","more","those","such","over","only","these","here","out","about","just","been","should","could","would","have","there","these","should","than"
]);

const FALLBACK = [
    { text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", ref: "John 3:16", ru: "Ибо так возлюбил Бог мир, что отдал Сына Своего единородного, дабы всякий верующий в Него, не погибал, но имел жизнь вечную." }
];

function ymd(d = new Date()) {
    const y = d.getFullYear();
    const m = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    return y + m + day;
}

function quarterOf(d) { return Math.floor(d.getMonth() / 3) + 1; }

function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function stripHtml(s) { return (s || "").replace(/<[^>]*>/g, "").trim(); }

/* ---------------- lesson lookup ---------------- */

async function fetchQuarter(lang, y, q) {
    const url = `https://app.sdarm.org/sbl/data/${lang}/${lang}-${y}-${q}.json`;
    try {
        const r = await fetch(url);
        if (!r.ok) return null;
        return await r.json();
    } catch (e) {
        return null;
    }
}

// Daily readings run Sun-Fri before the Sabbath, so today's date can sit in
// a quarter file adjacent to the calendar quarter.
async function findTodayDay(lang) {
    const today = new Date();
    const target = ymd(today);
    const y = today.getFullYear();
    const q = quarterOf(today);
    const candidates = [[y, q], q === 1 ? [y - 1, 4] : [y, q - 1], q === 4 ? [y + 1, 1] : [y, q + 1]];

    for (const [cy, cq] of candidates) {
        const data = await fetchQuarter(lang, cy, cq);
        if (!data || !data.lessons) continue;
        for (const lesson of data.lessons) {
            for (const day of lesson.dailyLessons || []) {
                if (day.date === target) return { lesson, day };
            }
            if (lesson.date === target) return { lesson, day: null };
        }
    }
    return null;
}

// Pull every Bible citation (sOsis reference) out of a day's questions,
// keeping the human-readable label the lesson itself printed next to it.
function collectRefs(lesson, day) {
    const refs = [];
    const seen = new Set();

    function addRef(label, sOsis) {
        if (!sOsis || seen.has(sOsis)) return;
        seen.add(sOsis);
        refs.push({ label: label.replace(/[;,.\s]+$/, "").trim(), sOsis });
    }

    if (lesson && lesson.keyText && lesson.keyText.ref) {
        addRef(lesson.keyText.ref.text || "", lesson.keyText.ref.sOsis);
    }

    if (day && day.subsections) {
        for (const sub of day.subsections) {
            for (const frag of sub.q || []) {
                if (frag.sOsis) addRef(frag.text || "", frag.sOsis);
            }
        }
    }

    return refs;
}

/* ---------------- full bible lookup ---------------- */

function loadBible(version) {
    if (bibles[version]) return bibles[version];
    const url = `https://app.sdarm.org/bible/data/${version}.json`;
    bibles[version] = fetch(url).then(r => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
    }).catch(e => { delete bibles[version]; throw e; });
    return bibles[version];
}

function parseSeg(seg) {
    const dash = seg.split("-");
    const a = dash[0].split(".");
    const b = (dash[1] || dash[0]).split(".");
    return { book: a[0], chap: +a[1], v1: +a[2], echap: +(b[1] || a[1]), v2: +(b[2] || a[2]) };
}

// A reference a little too long or with a versification quirk still returns
// what it can rather than nothing at all.
function versesIn(books, sOsis) {
    const rows = [];
    for (const raw of String(sOsis).split(",")) {
        const seg = parseSeg(raw.trim());
        const chapters = books && books[seg.book];
        if (!chapters) continue;
        for (let c = seg.chap; c <= seg.echap; c++) {
            const vs = chapters[c - 1];
            if (!vs || !vs.length) continue;
            let from = (c === seg.chap) ? seg.v1 : 1;
            let to = (c === seg.echap) ? seg.v2 : vs.length;
            if (to > vs.length) to = vs.length;
            if (from === vs.length + 1 && seg.book !== "Ps") from = vs.length;
            for (let n = from; n <= to; n++) {
                const t = vs[n - 1];
                if (t == null) continue;
                rows.push(stripHtml(String(t)));
            }
        }
    }
    return rows.join(" ");
}

async function getVerseText(sOsis, lang) {
    try {
        const bible = await loadBible(BIBLE[lang]);
        return versesIn((bible && bible.books) || {}, sOsis);
    } catch (e) {
        return "";
    }
}

async function buildVersePool() {
    const [en, ru] = await Promise.all([findTodayDay('en'), findTodayDay('ru')]);
    if (!en) return [];

    const refs = collectRefs(en.lesson, en.day);
    if (refs.length === 0) return [];

    const pool = [];
    for (const ref of refs) {
        const enText = await getVerseText(ref.sOsis, 'en');
        if (!enText) continue;
        const ruText = await getVerseText(ref.sOsis, 'ru');
        pool.push({ text: enText, ref: ref.label, ru: ruText });
    }
    return pool;
}

/* ---------------- vocabulary ---------------- */

function extractWords(text) {
    if (!text) return [];
    const words = text.replace(/[^\w\s]/gi, '').split(/\s+/);
    const unique = [...new Set(
        words
            .map(w => w.toLowerCase())
            .filter(w => w.length > 3 && !STOP_WORDS.has(w))
    )];
    return unique.length > 0 ? unique : ["verse"];
}

async function loadVerseDefs() {
    if (!state.en) return;
    state.words = extractWords(state.en);
    state.idx = 0;
    update(state.words[0]);
}

async function fromFreeDictionary(word) {
    try {
        const r = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!r.ok) return null;
        const data = await r.json();

        for (const entry of data || []) {
            for (const m of entry.meanings || []) {
                for (const def of m.definitions || []) {
                    if (def.example) return def.example;
                }
            }
        }
    } catch (e) {}
    return null;
}

async function fromWiktionary(word) {
    try {
        const r = await fetch(`https://en.wiktionary.org/api/rest_v1/page/definition/${encodeURIComponent(word)}`);
        if (!r.ok) return null;
        const data = await r.json();
        const en = data && data.en;
        if (!en) return null;

        for (const block of en) {
            for (const def of block.definitions || []) {
                if (def.parsedExamples && def.parsedExamples.length && def.parsedExamples[0].example) {
                    return stripHtml(def.parsedExamples[0].example);
                }
                if (def.examples && def.examples.length) {
                    return stripHtml(def.examples[0]);
                }
            }
        }
    } catch (e) {}
    return null;
}

async function getWordExample(word) {
    if (state.vocabCache[word]) return state.vocabCache[word];

    const example = (await fromFreeDictionary(word)) || (await fromWiktionary(word));

    state.vocabCache[word] = example || "(example not found)";
    return state.vocabCache[word];
}

/* ---------------- render ---------------- */

function fitContent() {
    const stage = document.getElementById('stage');
    const steps = [1, 0.93, 0.87, 0.81, 0.75, 0.7, 0.65, 0.6, 0.55];
    for (const s of steps) {
        document.documentElement.style.setProperty('--scale', s);
        if (stage.scrollHeight <= stage.clientHeight + 1) return;
    }
}

async function update(w) {
    if (!w) return;
    const regex = new RegExp(`\\b${escapeRegex(w)}\\b`, 'gi');
    document.getElementById('v-en').innerHTML = state.en.replace(regex, '<span class="hl">$&</span>');
    document.getElementById('w-en').innerText = w;
    updateCounter();
    fitContent();

    const ex = await getWordExample(w);
    document.getElementById('ex-en').innerText = ex;
    fitContent();
}

function updateCounter() {
    const el = document.getElementById('word-counter');
    if (el) {
        el.innerText = state.words.length > 0 ? `${state.idx + 1} / ${state.words.length}` : '';
    }
}

function loadVerse() {
    if (versePool.length === 0) {
        document.getElementById('error-msg').innerText = 'No verses found.';
        document.getElementById('error-msg').style.display = 'block';
        return;
    }

    const v = versePool[verseIdx % versePool.length];
    state.en = v.text || '';
    state.ru = v.ru || '';
    state.ref = v.ref || '–';

    document.getElementById('v-ref').innerText = state.ref;
    document.getElementById('v-ru').innerText = state.ru || '–';
    document.getElementById('v-ru-ref').innerText = state.ref;
    document.getElementById('error-msg').style.display = 'none';

    loadVerseDefs();
}

async function init() {
    if (loading) return;
    loading = true;

    document.getElementById('loader').style.display = 'flex';
    document.getElementById('error-msg').style.display = 'none';

    try {
        versePool = await buildVersePool();
        if (versePool.length === 0) versePool = FALLBACK;
    } catch (e) {
        console.error('Init error:', e);
        versePool = FALLBACK;
    }

    verseIdx = 0;
    document.getElementById('loader').style.display = 'none';
    loading = false;
    loadVerse();
}

document.getElementById('verse-section').addEventListener('click', () => {
    verseIdx++;
    loadVerse();
});

document.getElementById('word-section').addEventListener('click', () => {
    if (state.words.length > 0) {
        state.idx = (state.idx + 1) % state.words.length;
        update(state.words[state.idx]);
    }
});

init();
