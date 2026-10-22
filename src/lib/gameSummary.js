/* ==========================================================================
   Derive an end-of-game summary from the captured per-turn event stream.

   The event stream (from the Turn Tracker) is the source of truth; this turns
   it into tallies and grouped lists for the end-of-game form and the Game Log
   detail view. Totals are also stored on the saved game so old/edited entries
   stay self-contained, but when events exist we always derive from them.

   Event shape: { id, turn, phaseId, phaseName, type, detail, meta, at }
   ========================================================================== */

export const SUMMARY_EVENT_TYPES = [
  'victim-died',
  'victim-saved',
  'item-found',
  'item-used',
  'dark-power',
  'finale',
  'terror',
  'weapon',
  'note',
];

/* Build a summary object from an events array. */
export function deriveSummary(events = []) {
  const list = Array.isArray(events) ? events : [];
  const byType = (t) => list.filter((e) => e.type === t);

  const details = (t) =>
    byType(t)
      .map((e) => e.detail)
      .filter(Boolean);

  const darkPowers = byType('dark-power').map((e) => ({
    name: e.detail,
    power: (e.meta && e.meta.power) || 'minor',
    turn: e.turn,
  }));

  return {
    victimsSaved: byType('victim-saved').length,
    victimsDied: byType('victim-died').length,
    itemsFound: details('item-found'),
    itemsUsed: details('item-used'),
    darkPowers,
    finale: details('finale')[0] || '',
    weapons: details('weapon'),
    terror: details('terror'),
    notes: details('note'),
  };
}

/* A flat, human-readable timeline (ordered by turn then capture time) — handy
   for the detail view and the future AI summary. */
export function buildTimeline(events = []) {
  const list = Array.isArray(events) ? [...events] : [];
  list.sort((a, b) => {
    if (a.turn !== b.turn) return a.turn - b.turn;
    return String(a.at || '').localeCompare(String(b.at || ''));
  });
  return list;
}

/* Group events by turn, in order, for a turn-by-turn display. Returns
   [{ turn, events: [...] }]. */
export function groupByTurn(events = []) {
  const timeline = buildTimeline(events);
  const map = new Map();
  for (const e of timeline) {
    if (!map.has(e.turn)) map.set(e.turn, []);
    map.get(e.turn).push(e);
  }
  return [...map.entries()].map(([turn, evs]) => ({ turn, events: evs }));
}
