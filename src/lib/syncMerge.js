/* ==========================================================================
   Merge the cloud copy INTO this device's data before a push — used only when
   this device has never completed a sync (a new device, or one whose browser
   storage was wiped by "Clear browsing data" / CCleaner).

   Without this, a wiped device that saved a game before it had pulled from
   the cloud (e.g. offline, or Supabase asleep) would push a near-empty game
   log over the cloud copy, and every other device would then pull that.

   Rules (they only ever ADD data, never remove it):
   - fg-game-log: union by entry id. This device's version of an entry wins.
     Newest first (by endedAt), matching how the app stores the log.
   - fg-achievement-overrides: cloud overrides as the base, this device's win.
   - fg-collection: keep this device's if it has one, otherwise take the cloud's.
   - fg-active-game: left alone. This device's state is the newest (it may have
     just ended the game), so the cloud's must not resurrect it.

   Pure: takes get/set functions so it can be unit-tested without a browser.
   Returns true if anything on this device changed.
   ========================================================================== */
function parse(raw, fallback) {
  if (typeof raw !== 'string') return fallback;
  try {
    const v = JSON.parse(raw);
    return v === null || v === undefined ? fallback : v;
  } catch {
    return fallback;
  }
}

export function mergeCloudIntoLocal(cloud, get, set) {
  if (!cloud || typeof cloud !== 'object') return false;
  let changed = false;

  // Game log — union by id.
  const cloudLog = parse(cloud['fg-game-log'], []);
  if (Array.isArray(cloudLog) && cloudLog.length) {
    const localRaw = get('fg-game-log');
    const localLog = parse(localRaw, []);
    const local = Array.isArray(localLog) ? localLog : [];
    const ids = new Set(local.map((e) => e && e.id));
    const extra = cloudLog.filter((e) => e && e.id && !ids.has(e.id));
    if (extra.length) {
      const merged = [...local, ...extra].sort((a, b) =>
        String((b && b.endedAt) || '').localeCompare(String((a && a.endedAt) || ''))
      );
      set('fg-game-log', JSON.stringify(merged));
      changed = true;
    }
  }

  // Achievement overrides — cloud as base, local wins.
  const cloudOv = parse(cloud['fg-achievement-overrides'], null);
  if (cloudOv && typeof cloudOv === 'object' && !Array.isArray(cloudOv)) {
    const localOv = parse(get('fg-achievement-overrides'), {});
    const merged = { ...cloudOv, ...(localOv && typeof localOv === 'object' ? localOv : {}) };
    const next = JSON.stringify(merged);
    if (Object.keys(merged).length && next !== get('fg-achievement-overrides')) {
      // Only write when the cloud actually added something.
      const before = Object.keys(localOv || {}).length;
      if (Object.keys(merged).length > before) {
        set('fg-achievement-overrides', next);
        changed = true;
      }
    }
  }

  // Collection — take the cloud's only if this device has none.
  if (get('fg-collection') === null && typeof cloud['fg-collection'] === 'string') {
    set('fg-collection', cloud['fg-collection']);
    changed = true;
  }

  return changed;
}
