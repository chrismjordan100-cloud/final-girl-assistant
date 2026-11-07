/* ==========================================================================
   Gruesome Deaths — pick the right passage, then show it as an image.

   Van Ryder publish a free Gruesome Death book (PDF) per Location. We do NOT
   copy any of the books into the app. `gruesomeDeaths.json` is only a map of
   where each passage sits (page + a top/bottom band). At play time the app
   opens Van Ryder's own PDF from their file store, cuts out that band and
   shows it as a picture. So you need to be online to see them.

   How a death is matched (see `deathOptions`):
     1. A card you logged this turn (Terror, Event, Dark Power, Item, Finale…)
        whose name matches a passage title → that passage. Cards like "Fire!"
        that have one passage per place (Fire at the Cabins / Shed / Dock)
        give several options; you pick one, or it picks at random.
     2. Otherwise → a General Kill for this Killer: roll a die and show the
        passage for that roll, avoiding ones you've already had this game.
        Killers with forms or members (Evomorph stages, Organism types,
        Intruders, Mark V / Mark X…) let you choose which one did it.
        Location hazards (Crusher, Airlock, Frostbite…) are offered too.
   ========================================================================== */
import index from '../data/gruesomeDeaths.json';

const PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
const PDFJS_WORKER = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const ns = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

/* Readable names for the variant keys in the index. */
const VARIANT_LABELS = {
  hatchling: 'Hatchling', youngling: 'Youngling', adult: 'Adult', ambush: 'Ambush',
  fastorganism: 'Fast Organism', strongorganism: 'Strong Organism', toughorganism: 'Tough Organism',
  trish: 'Trish', baghead: 'Baghead', zeke: 'Zeke',
  markv: 'Mark V', markx: 'Mark X', mirrordimension: 'Mirror Dimension',
  incinerator: 'Incinerator', crusher: 'Crusher', airlock: 'Airlock', frostbite: 'Frostbite',
  sandsnake: 'Sand Snake', sinkhole: 'Sinkhole',
};
export const variantLabel = (v) => VARIANT_LABELS[v] || (v ? v.charAt(0).toUpperCase() + v.slice(1) : 'Any');

const KIND_LABELS = {
  general: 'General Kill', terror: 'Terror card', event: 'Event', item: 'Item',
  'dark-power': 'Dark Power', 'epic-dark-power': 'Epic Dark Power', attack: 'Attack',
  affliction: 'Affliction', 'death-trap': 'Death Trap', mission: 'Mission',
};
export const kindLabel = (k) => KIND_LABELS[k] || k;

/* Every passage for one Location, as objects. */
function bookEntries(locationId) {
  const book = index.books[locationId];
  if (!book) return [];
  return book.e.map(([killer, kind, variant, title, page, top, bottom, roll], i) => ({
    id: `${locationId}:${i}`,
    locationId, killer, kind, variant, title, page, top, bottom, roll,
  }));
}

export function hasBook(locationId) {
  return Boolean(index.books[locationId]);
}

/* Passages that can happen in this Killer + Location game: the Killer's own,
   plus the Location's shared ones (killer null). */
export function passagesFor(killerId, locationId) {
  return bookEntries(locationId).filter((e) => e.killer === killerId || e.killer === null);
}

/* Card types whose names can match a passage title. */
const CARD_EVENT_TYPES = new Set(['terror', 'event', 'dark-power', 'finale', 'item-used', 'weapon', 'item-found']);

const STOP = new Set(['the', 'and', 'you', 'are', 'its', 'for', 'our', 'his', 'her', 'was', 'has', 'have', 'all']);
const PREFIXES = /^(epic dark power|dark power|minor dark power|cm item|item|terror|event)\s*[:\-–]\s*/i;
const words = (s) => String(s || '').toLowerCase().replace(PREFIXES, '').replace(/[’']/g, '')
  .split(/[^a-z0-9]+/).filter((w) => w.length >= 3 && !STOP.has(w));

/* Does a logged card name refer to this passage? Exact / prefix match on the
   squashed text first (so "Fire!" finds every "Fire at the …"), then a
   word-overlap check for small wording differences between the card list
   and the book. */
export function titleMatches(title, cardName) {
  const t = ns(String(title).replace(PREFIXES, ''));
  const c = ns(String(cardName).replace(PREFIXES, ''));
  if (!t || !c || c.length < 3) return false;
  if (t === c || t.startsWith(c) || c.startsWith(t)) return true;
  const tw = new Set(words(title));
  const cw = words(cardName);
  if (cw.length < 2 || tw.size < 2) return false;
  const shared = cw.filter((w) => tw.has(w)).length;
  return shared / Math.max(cw.length, tw.size) >= 0.75;
}

/* What could explain this death, given what was logged this turn.
   Returns { trigger, options, generalGroups }:
     trigger       - the logged card the match came from (or null)
     options       - passages matching that card (may be several)
     generalGroups - General Kills grouped by variant, for the roll         */
export function deathOptions({ killerId, locationId, turnEvents = [] }) {
  const pool = passagesFor(killerId, locationId);
  const cards = [...turnEvents].reverse().filter((e) => CARD_EVENT_TYPES.has(e.type) && e.detail);
  for (const ev of cards) {
    const hits = pool.filter((p) => p.kind !== 'general' && titleMatches(p.title, ev.detail));
    if (hits.length) return { trigger: ev, options: hits, generalGroups: generalGroups(pool) };
  }
  return { trigger: null, options: [], generalGroups: generalGroups(pool) };
}

/* General Kills grouped by who/what did it. The Killer's own groups come
   first; Location hazards (killer null) after. */
export function generalGroups(pool) {
  const groups = new Map();
  for (const p of pool) {
    if (p.kind !== 'general') continue;
    const key = `${p.killer || 'loc'}|${p.variant || ''}`;
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        isHazard: p.killer === null,
        label: p.variant ? variantLabel(p.variant) : 'General Kill',
        entries: [],
      });
    }
    groups.get(key).entries.push(p);
  }
  return [...groups.values()].sort((a, b) => Number(a.isHazard) - Number(b.isHazard));
}

/* Roll a d6 for a General Kill group, skipping passages already seen this
   game when possible (the book says to re-roll repeats). */
export function rollGeneral(group, seen = []) {
  const fresh = group.entries.filter((e) => !seen.includes(e.id));
  const usable = fresh.length ? fresh : group.entries;
  for (let tries = 0; tries < 30; tries++) {
    const die = 1 + Math.floor(Math.random() * 6);
    const hit = usable.find((e) => e.roll && die >= e.roll[0] && die <= e.roll[1]);
    if (hit) return { entry: hit, die };
  }
  return { entry: pickRandom(usable, []), die: null };
}

export function pickRandom(list, seen = []) {
  const fresh = list.filter((e) => !seen.includes(e.id));
  const usable = fresh.length ? fresh : list;
  return usable[Math.floor(Math.random() * usable.length)] || null;
}

/* ---- Showing a passage: open Van Ryder's PDF and cut out the band ------- */

let pdfjsPromise = null;
function loadPdfJs() {
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
  if (!pdfjsPromise) {
    pdfjsPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = PDFJS;
      s.onload = () => {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
        resolve(window.pdfjsLib);
      };
      s.onerror = () => {
        pdfjsPromise = null;
        reject(new Error('Could not load the PDF reader — are you online?'));
      };
      document.head.appendChild(s);
    });
  }
  return pdfjsPromise;
}

const docCache = new Map();
function openBook(locationId) {
  const book = index.books[locationId];
  if (!book) return Promise.reject(new Error('No Gruesome Death book for this Location'));
  if (!docCache.has(locationId)) {
    const p = loadPdfJs()
      .then((lib) => lib.getDocument(book.url).promise)
      .catch((err) => {
        docCache.delete(locationId);
        throw err;
      });
    docCache.set(locationId, p);
  }
  return docCache.get(locationId);
}

/* Start fetching the book in the background (e.g. when a game starts), so
   the first death shows instantly. */
export function warmBook(locationId) {
  if (hasBook(locationId)) openBook(locationId).catch(() => {});
}

/* Draw one passage into `canvas`, `cssWidth` pixels wide on screen. */
export async function drawPassage(entry, canvas, cssWidth) {
  const doc = await openBook(entry.locationId);
  const page = await doc.getPage(entry.page);
  const base = page.getViewport({ scale: 1 });
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  // Scale so the margin-trimmed band fills cssWidth.
  const scale = (cssWidth / (base.width - 2 * SIDE_MARGIN)) * dpr;
  const vp = page.getViewport({ scale });

  const full = document.createElement('canvas');
  full.width = Math.ceil(vp.width);
  full.height = Math.ceil(vp.height);
  await page.render({ canvasContext: full.getContext('2d'), viewport: vp }).promise;

  // Band in PDF units (from the bottom) → pixels (from the top). If another
  // passage starts right where this one ends, stop a little higher so its
  // heading doesn't peep in.
  const bottom = entry.bottom + (nextStartsAt(entry) ? 6 : 0);
  const y0 = Math.max(0, (base.height - entry.top) * scale);
  const y1 = Math.min(full.height, (base.height - bottom) * scale);
  const h = Math.max(1, Math.round(y1 - y0));
  // Trim the page's side margins so the text is as big as possible.
  const x0 = Math.round(SIDE_MARGIN * scale);
  const w = Math.max(1, full.width - 2 * x0);
  canvas.width = w;
  canvas.height = h;
  canvas.style.width = '100%';
  canvas.style.height = 'auto';
  canvas.getContext('2d').drawImage(full, x0, y0, w, h, 0, 0, w, h);
}

const SIDE_MARGIN = 18; // PDF units trimmed from each side

function nextStartsAt(entry) {
  const book = index.books[entry.locationId];
  return book.e.some((x) => x[4] === entry.page && x[5] === entry.bottom);
}
