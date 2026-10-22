import { useCallback, useEffect, useState } from 'react';

/* ==========================================================================
   Shared "This Game" selection (chosen Final Girl + Killer + Location).
   Persisted to localStorage so it survives refreshes, and synced across
   components in the same tab via a custom event.
   ========================================================================== */

const STORAGE_KEY = 'fg-this-game';
const EVENT = 'fg-this-game-change';

const EMPTY = { finalGirlId: null, killerId: null, locationId: null };

function read() {
  try {
    return { ...EMPTY, ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
  } catch {
    return { ...EMPTY };
  }
}

function write(next) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore storage failures (e.g. private mode) */
  }
  // Notify other hook instances in this tab.
  window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
}

export function useGameSelection() {
  const [selection, setSelection] = useState(read);

  useEffect(() => {
    const onChange = (e) => setSelection(e.detail || read());
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setSelection(read());
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const setFinalGirl = useCallback((finalGirlId) => {
    const next = { ...read(), finalGirlId: finalGirlId || null };
    write(next);
    setSelection(next);
  }, []);

  const setKiller = useCallback((killerId) => {
    const next = { ...read(), killerId: killerId || null };
    write(next);
    setSelection(next);
  }, []);

  const setLocation = useCallback((locationId) => {
    const next = { ...read(), locationId: locationId || null };
    write(next);
    setSelection(next);
  }, []);

  const clear = useCallback(() => {
    const next = { ...EMPTY };
    write(next);
    setSelection(next);
  }, []);

  return {
    finalGirlId: selection.finalGirlId,
    killerId: selection.killerId,
    locationId: selection.locationId,
    setFinalGirl,
    setKiller,
    setLocation,
    clear,
  };
}
