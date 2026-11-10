import { useCallback, useEffect, useState } from 'react';
import { finalGirls } from '../data/games.js';
import { markLocalChange, pushState } from '../lib/sync.js';

/* ==========================================================================
   Your Final Girl collection: favourites, and where each one is stored.
   Synced to the cloud (key 'fg-collection'), so phone and PC agree.

     favourites  ids you've starred (e.g. for their abilities)
     storage     id -> where she's kept, only when it isn't her own box
                 (e.g. a special edition kept in a promo binder)
     owned       collection checklist id -> true/false, only where it
                 differs from the default in src/data/collection.js
     envelopes   id -> your override for her Secret Envelope:
                   'unlocked'  won with her before the tracker existed,
                               envelope still sealed (shows the marker)
                   'opened'    envelope already opened (hides the marker)
                 With no override, a logged win unlocks it automatically.

   With no note set, a Final Girl is assumed to live in her own Feature Film
   box. Promos and packs have no film box, so they show "not set yet".
   ========================================================================== */

export const COLLECTION_KEY = 'fg-collection';
const EVENT = 'fg-collection-change';
const SYNC_EVENT = 'fg-game-log-change'; // fired after a cloud pull lands

function read() {
  try {
    const v = JSON.parse(localStorage.getItem(COLLECTION_KEY)) || {};
    return {
      favourites: Array.isArray(v.favourites) ? v.favourites : [],
      storage: v.storage && typeof v.storage === 'object' ? v.storage : {},
      envelopes: v.envelopes && typeof v.envelopes === 'object' ? v.envelopes : {},
      owned: v.owned && typeof v.owned === 'object' ? v.owned : {},
    };
  } catch {
    return { favourites: [], storage: {}, envelopes: {}, owned: {} };
  }
}

function write(next) {
  try {
    localStorage.setItem(COLLECTION_KEY, JSON.stringify(next));
    markLocalChange();
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
  pushState();
}

/* Where she'd normally be: her own Feature Film box, if she has one. */
export function defaultStorage(fg) {
  if (!fg) return null;
  if (fg.pack && fg.pack.box) return fg.pack.box;
  if (fg.group === 'Promos & Packs') return null;
  const film = String(fg.film || '').replace(/\s*\(.*\)\s*$/, '');
  return film ? `${film} box` : null;
}

/* { text, isDefault } — what to show for "Stored in". text is null if unknown. */
export function storageFor(fg, storage) {
  const custom = fg && storage[fg.id];
  if (custom) return { text: custom, isDefault: false };
  return { text: defaultStorage(fg), isDefault: true };
}

/* True while her Codex "Stored in" says she has missing components (any text
   containing "missing", e.g. "Missing components" or "Missing - lent out").
   Clears itself as soon as the Stored in text no longer says missing. */
export function hasMissingComponents(fg, storage) {
  const custom = fg && storage && storage[fg.id];
  return Boolean(custom) && /missing/i.test(custom);
}
/* Suggestions for the "Stored in" box: every Feature Film box, plus any
   places you've already typed (so "Promo binder" only needs typing once). */
export function storageSuggestions(storage) {
  const set = new Set();
  Object.values(storage).forEach((s) => s && set.add(s));
  finalGirls.forEach((fg) => {
    const d = defaultStorage(fg);
    if (d) set.add(d);
  });
  return [...set];
}

/* Secret Envelope status for one Final Girl.
   wins: number of real (non-test) logged wins with her.
   Returns { status, source }:
     status  'unlocked' (won, still to open) | 'opened' | 'sealed'
     source  'log' (automatic, from a logged win) | 'manual' (your override) | null */
export function envelopeStatus(fgId, wins, envelopes) {
  const o = envelopes && envelopes[fgId];
  if (o === 'opened') return { status: 'opened', source: 'manual' };
  if (o === 'unlocked') return { status: 'unlocked', source: 'manual' };
  if (wins > 0) return { status: 'unlocked', source: 'log' };
  return { status: 'sealed', source: null };
}

/* Count real wins per Final Girl id from the game log. */
export function winsByFinalGirl(log) {
  const out = {};
  (log || []).forEach((g) => {
    if (g && !g.isTest && g.outcome === 'won' && g.finalGirlId) {
      out[g.finalGirlId] = (out[g.finalGirlId] || 0) + 1;
    }
  });
  return out;
}

/* Per Killer and per Location, from real (non-test) games in date order:
   - path: the results up to and including the first win, e.g.
     ['lost','lost','won'] — losses it took before the first victory;
     once won, later games don't add to it.
   - won / played: totals across all games, for the win %.
   Abandoned games don't count. Never-played ids are absent. */
export function resultsByKillerLocation(log) {
  const killer = {};
  const location = {};
  const when = (g) => g.endedAt || g.startedAt || String(g.id || '').replace(/^g-/, '');
  const games = (log || [])
    .filter((g) => g && !g.isTest && (g.outcome === 'won' || g.outcome === 'lost'))
    .slice()
    .sort((a, b) => {
      const ta = Date.parse(when(a)) || Number(when(a)) || 0;
      const tb = Date.parse(when(b)) || Number(when(b)) || 0;
      return ta - tb;
    });
  const add = (map, id, outcome) => {
    if (!id) return;
    const r = (map[id] ||= { path: [], won: 0, played: 0 });
    if (!r.path.includes('won')) r.path.push(outcome);
    r.played += 1;
    if (outcome === 'won') r.won += 1;
  };
  games.forEach((g) => {
    add(killer, g.killerId, g.outcome);
    add(location, g.locationId, g.outcome);
  });
  return { killer, location };
}

export function useFgCollection() {
  const [state, setState] = useState(read);

  useEffect(() => {
    const refresh = () => setState(read());
    const onStorage = (e) => { if (e.key === COLLECTION_KEY) refresh(); };
    window.addEventListener(EVENT, refresh);
    window.addEventListener(SYNC_EVENT, refresh);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, refresh);
      window.removeEventListener(SYNC_EVENT, refresh);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const isFavourite = useCallback((id) => state.favourites.includes(id), [state]);

  const toggleFavourite = useCallback((id) => {
    const cur = read();
    const favourites = cur.favourites.includes(id)
      ? cur.favourites.filter((x) => x !== id)
      : [...cur.favourites, id];
    write({ ...cur, favourites });
  }, []);

  /* Pass '' or null to go back to "her own box". */
  const setStorage = useCallback((id, text) => {
    const cur = read();
    const storage = { ...cur.storage };
    const clean = String(text || '').trim();
    if (clean) storage[id] = clean;
    else delete storage[id];
    write({ ...cur, storage });
  }, []);

  /* value: 'opened' | 'unlocked' | null (null = back to automatic). */
  const setEnvelope = useCallback((id, value) => {
    const cur = read();
    const envelopes = { ...cur.envelopes };
    if (value === 'opened' || value === 'unlocked') envelopes[id] = value;
    else delete envelopes[id];
    write({ ...cur, envelopes });
  }, []);

  /* Collection checklist: true = have it, false = don't. Stored only where
     it differs from the catalogue default, so defaults can be corrected. */
  const setOwned = useCallback((id, value, defaultValue) => {
    const cur = read();
    const owned = { ...cur.owned };
    if (Boolean(value) === Boolean(defaultValue)) delete owned[id];
    else owned[id] = Boolean(value);
    write({ ...cur, owned });
  }, []);

  return {
    favourites: state.favourites,
    owned: state.owned,
    setOwned,
    storage: state.storage,
    envelopes: state.envelopes,
    setEnvelope,
    isFavourite,
    toggleFavourite,
    setStorage,
  };
}
