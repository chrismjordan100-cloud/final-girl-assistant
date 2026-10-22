import { useCallback, useEffect, useState } from 'react';

/* ==========================================================================
   Live turn state for the Turn Tracker — turn number, current phase, the
   running counters (Horror, Bloodlust, Time, Victims saved) and which beats
   you've ticked this phase. Persisted so a mid-game refresh never loses your
   place, and synced across the tab like the other fg-* stores.

   Deliberately separate from the game log's `active` object: the Turn Tracker
   is usable with or without pressing Start Game, so its live state stands on
   its own.
   ========================================================================== */

const KEY = 'fg-turn-state';
const EVENT = 'fg-turn-state-change';

const DEFAULT = {
  turn: 1,
  phaseIndex: 0,
  horror: 5,        // Horror Level — drives the dice count
  bloodlust: 0,
  time: 6,          // Time resets to 6 in Planning (5 in Extreme Horror)
  victimsSaved: 0,
  checked: {},      // keyed "{phaseIndex}:{i}" and "x:{phaseIndex}:{i}"
  // Chronological event stream for THIS game. Each event is stamped with the
  // turn + phase it happened in, so the saved game holds the full narrative
  // sequence (not just totals) — ready for a future AI game summary. Shape:
  //   { id, turn, phaseId, phaseName, type, detail, meta, at }
  // Types: victim-died | victim-saved | item-found | item-used | dark-power |
  //        finale | terror | weapon | note
  events: [],
};

function read() {
  try {
    return { ...DEFAULT, ...(JSON.parse(localStorage.getItem(KEY)) || {}) };
  } catch {
    return { ...DEFAULT };
  }
}

function write(next) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
}

export function useTurnState() {
  const [state, setState] = useState(read);

  useEffect(() => {
    const refresh = (e) => setState(e.detail || read());
    const onStorage = (e) => {
      if (e.key === KEY) setState(read());
    };
    window.addEventListener(EVENT, refresh);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, refresh);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  // Merge a partial patch into the state.
  const patch = useCallback((changes) => {
    const next = { ...read(), ...changes };
    write(next);
    setState(next);
  }, []);

  // Append an event to the chronological stream, stamped with the current
  // turn + phase. `phaseName` is stored alongside `phaseId` so later readers
  // (incl. a future AI summary) don't need the rules file to make sense of it.
  const addEvent = useCallback(({ type, detail = '', meta = {}, phaseId, phaseName }) => {
    const cur = read();
    const event = {
      id: `e-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      turn: cur.turn,
      phaseId: phaseId ?? null,
      phaseName: phaseName ?? null,
      type,
      detail: String(detail || '').trim(),
      meta: meta || {},
      at: new Date().toISOString(),
    };
    const next = { ...cur, events: [...(cur.events || []), event] };
    write(next);
    setState(next);
    return event;
  }, []);

  // Remove an event by id (for fixing a mis-entry mid-game).
  const removeEvent = useCallback((id) => {
    const cur = read();
    const next = { ...cur, events: (cur.events || []).filter((e) => e.id !== id) };
    write(next);
    setState(next);
  }, []);

  // Reset for a brand-new game (optionally with a starting Horror level).
  const reset = useCallback((startHorror = DEFAULT.horror) => {
    const next = { ...DEFAULT, horror: startHorror };
    write(next);
    setState(next);
  }, []);

  return { state, patch, reset, addEvent, removeEvent };
}
