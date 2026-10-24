import { useCallback, useEffect, useState } from 'react';

/* ==========================================================================
   useState that survives screen changes and reloads (localStorage), shared by
   every component using the same key in this tab. Used for drafts you build up
   over a game — e.g. the end-of-game form — so switching to the Turn Tracker
   and back never loses what you'd entered. Device-local; not synced.
   ========================================================================== */

const EVENT = 'fg-persistent-state-change';

function readKey(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writePersistent(key, value) {
  try {
    if (value === undefined) localStorage.removeItem(key);
    else localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { key } }));
}

export function readPersistent(key, fallback) {
  return readKey(key, fallback);
}

export function usePersistentState(key, fallback) {
  const [value, setValue] = useState(() => readKey(key, fallback));

  useEffect(() => {
    const onChange = (e) => {
      if (!e.detail || e.detail.key === key) setValue(readKey(key, fallback));
    };
    const onStorage = (e) => {
      if (e.key === key) setValue(readKey(key, fallback));
    };
    window.addEventListener(EVENT, onChange);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener('storage', onStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = useCallback(
    (next) => {
      const resolved = typeof next === 'function' ? next(readKey(key, fallback)) : next;
      writePersistent(key, resolved);
      setValue(resolved);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  return [value, set];
}
