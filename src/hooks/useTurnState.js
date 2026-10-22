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

  // Reset for a brand-new game (optionally with a starting Horror level).
  const reset = useCallback((startHorror = DEFAULT.horror) => {
    const next = { ...DEFAULT, horror: startHorror };
    write(next);
    setState(next);
  }, []);

  return { state, patch, reset };
}
