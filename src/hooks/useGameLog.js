import { useCallback, useEffect, useState } from 'react';
import { DEMO_LOG, DEMO_OVERRIDES } from '../data/demoData.js';

/* ==========================================================================
   Game log — a persisted history of completed games, plus the "in progress"
   marker set when Start Game is pressed. Stored in localStorage and synced
   across components in the same tab via a custom event.

   DEMO MODE: a toggle (default OFF = real data) swaps in a generated sample
   dataset so the stats tabs look populated for demos. In demo mode the real
   data is read-only (writes are ignored) so nothing gets polluted.
   ========================================================================== */

const LOG_KEY = 'fg-game-log';
const ACTIVE_KEY = 'fg-active-game';
const MANUAL_KEY = 'fg-achievement-overrides';
const DEMO_KEY = 'fg-demo-mode';
const EVENT = 'fg-game-log-change';

function readDemoMode() {
  try {
    return localStorage.getItem(DEMO_KEY) === '1';
  } catch {
    return false;
  }
}

function writeDemoMode(on) {
  try {
    if (on) localStorage.setItem(DEMO_KEY, '1');
    else localStorage.removeItem(DEMO_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

function readLog() {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY)) || [];
  } catch {
    return [];
  }
}

function readActive() {
  try {
    return JSON.parse(localStorage.getItem(ACTIVE_KEY)) || null;
  } catch {
    return null;
  }
}

function readManual() {
  try {
    return JSON.parse(localStorage.getItem(MANUAL_KEY)) || {};
  } catch {
    return {};
  }
}

function writeManual(overrides) {
  try {
    localStorage.setItem(MANUAL_KEY, JSON.stringify(overrides));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

function writeLog(entries) {
  try {
    localStorage.setItem(LOG_KEY, JSON.stringify(entries));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

function writeActive(active) {
  try {
    if (active) localStorage.setItem(ACTIVE_KEY, JSON.stringify(active));
    else localStorage.removeItem(ACTIVE_KEY);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

/* Normalise a mistake's text for grouping: lowercase, collapse whitespace,
   strip trailing punctuation. Two mistakes that read the same way group
   together even if capitalisation or spacing differs. */
function mistakeKey(text) {
  return String(text)
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[.!?,;:]+$/, '')
    .trim();
}

/* Aggregate mistakes across completed games. Only real games count toward
   trends (test games are practice). Returns an array of groups sorted by
   how often each mistake recurs, each:
   { key, type, text, count, lastAt, games: [{ id, combo, endedAt }] }. */
export function aggregateMistakes(log, { includeTest = false } = {}) {
  const groups = new Map();
  for (const entry of log) {
    if (!includeTest && entry.isTest) continue;
    const mistakes = entry.mistakes || [];
    for (const m of mistakes) {
      if (!m || !m.text) continue;
      const key = m.type + '::' + mistakeKey(m.text);
      const combo =
        [entry.finalGirlName, entry.killerName, entry.locationName]
          .filter(Boolean)
          .join(' \u00B7 ') || 'Unknown game';
      if (!groups.has(key)) {
        groups.set(key, {
          key,
          type: m.type,
          text: m.text, // keep first-seen wording for display
          count: 0,
          lastAt: entry.endedAt || null,
          games: [],
        });
      }
      const g = groups.get(key);
      g.count += 1;
      g.games.push({ id: entry.id, combo, endedAt: entry.endedAt || null });
      if (entry.endedAt && (!g.lastAt || entry.endedAt > g.lastAt)) {
        g.lastAt = entry.endedAt;
      }
    }
  }
  return [...groups.values()].sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return (b.lastAt || '').localeCompare(a.lastAt || '');
  });
}

export function useGameLog() {
  const [realLog, setRealLog] = useState(readLog);
  const [active, setActive] = useState(readActive);
  const [realManual, setRealManual] = useState(readManual);
  const [demoMode, setDemoModeState] = useState(readDemoMode);

  useEffect(() => {
    const refresh = () => {
      setRealLog(readLog());
      setActive(readActive());
      setRealManual(readManual());
      setDemoModeState(readDemoMode());
    };
    window.addEventListener(EVENT, refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener(EVENT, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  // What the rest of the app sees: demo data when the switch is on.
  const log = demoMode ? DEMO_LOG : realLog;
  const manual = demoMode ? DEMO_OVERRIDES : realManual;

  const setDemoMode = useCallback((on) => {
    writeDemoMode(on);
    setDemoModeState(on);
  }, []);

  // Mark a game as started (combo snapshot + start time + mode).
  const startGame = useCallback((combo) => {
    const next = {
      ...combo,
      isTest: Boolean(combo.isTest),
      startedAt: new Date().toISOString(),
    };
    writeActive(next);
    setActive(next);
  }, []);
  // (Starting a game still works in demo mode — it uses the real active slot.)

  // Record the result and move it into the log history.
  const endGame = useCallback((result) => {
    const current = readActive();
    const isTest = Boolean(current?.isTest);
    const entry = {
      id: `g-${Date.now()}`,
      isTest,
      finalGirlId: current?.finalGirlId || null,
      killerId: current?.killerId || null,
      locationId: current?.locationId || null,
      finalGirlName: current?.finalGirlName || null,
      killerName: current?.killerName || null,
      locationName: current?.locationName || null,
      startedAt: current?.startedAt || null,
      endedAt: new Date().toISOString(),
      outcome: result.outcome,          // 'won' | 'lost' | 'abandoned'
      turns: result.turns ?? null,
      notes: result.notes || '',
      // Test games never contribute achievements, even if ticked.
      achievements: isTest ? [] : (result.achievements || []),
      // Mistakes made this game, each { type: 'rules' | 'strategy', text }.
      mistakes: result.mistakes || [],
    };
    const nextLog = [entry, ...readLog()];
    writeLog(nextLog);
    writeActive(null);
    setRealLog(nextLog);
    setActive(null);
  }, []);

  const discardActive = useCallback(() => {
    writeActive(null);
    setActive(null);
  }, []);

  const deleteEntry = useCallback((id) => {
    // Demo entries aren't persisted, so deletion is a no-op in demo mode.
    if (readDemoMode()) return;
    const nextLog = readLog().filter((e) => e.id !== id);
    writeLog(nextLog);
    setRealLog(nextLog);
  }, []);

  // Set a manual override for an achievement: true (force earned),
  // false (force not earned), or null/undefined to clear it (fall back to
  // games + auto-detection).
  const setAchievementOverride = useCallback((id, value) => {
    // Don't let demo toggling write over the real overrides.
    if (readDemoMode()) return;
    const next = { ...readManual() };
    if (value === null || value === undefined) delete next[id];
    else next[id] = value;
    writeManual(next);
    setRealManual(next);
  }, []);

  return {
    log,
    active,
    manual,
    demoMode,
    setDemoMode,
    startGame,
    endGame,
    discardActive,
    deleteEntry,
    setAchievementOverride,
  };
}
