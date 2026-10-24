import { createClient } from '@supabase/supabase-js';

/* ==========================================================================
   Cloud sync (Supabase)

   Single-user design: the whole synced app state lives in ONE row of the
   `app_state` table (id = 'final-girl'), stored as a JSON blob. We pull it
   on load and push it whenever the app writes. "Last save wins" — fine for
   one person who isn't editing on two devices at the exact same second.

   The publishable key below is safe to ship in the frontend: it only grants
   the read/write permissions set by the table's row-level security policies,
   and this app holds nothing sensitive (just board-game stats).
   ========================================================================== */

const SUPABASE_URL = 'https://xktjbswxnhmhcumviaub.supabase.co';
const SUPABASE_KEY = 'sb_publishable_9pswrSe5G5HXNaXV1GGd-g_1dBjkpZY';

// The id of the single row we read/write.
const ROW_ID = 'final-girl';

// The localStorage keys we sync to the cloud. Device-local UI state
// (demo mode, turn state, setup progress) is deliberately NOT synced.
export const SYNCED_KEYS = [
  'fg-game-log',
  'fg-active-game',
  'fg-achievement-overrides',
];

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

/* --------------------------------------------------------------------------
   Sync bookkeeping (device-local, never synced):
     fg-sync-pending   '1' while this device has changes the cloud hasn't
                       confirmed yet (e.g. saved offline, or Supabase asleep).
     fg-sync-local-at  when this device last changed a synced key.
   While changes are pending, the cloud copy is OLDER than this device's, so
   it must never be pulled over the top of it — we push instead. This is what
   stops a just-saved game being wiped by a stale pull.
   -------------------------------------------------------------------------- */
const PENDING_KEY = 'fg-sync-pending';
const LOCAL_AT_KEY = 'fg-sync-local-at';

function safeGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch { /* ignore */ }
}
function safeRemove(key) {
  try { localStorage.removeItem(key); } catch { /* ignore */ }
}

/* Call whenever a synced key is written locally. */
export function markLocalChange() {
  safeSet(LOCAL_AT_KEY, new Date().toISOString());
  safeSet(PENDING_KEY, '1');
}

export function hasPendingChanges() {
  return safeGet(PENDING_KEY) === '1';
}

/* Read the synced keys out of localStorage into a plain object. */
export function collectLocalState() {
  const out = {};
  for (const key of SYNCED_KEYS) {
    const raw = safeGet(key);
    if (raw !== null) out[key] = raw; // store the raw JSON string as-is
  }
  return out;
}

/* Write a state object (from the cloud) back into localStorage. Returns true
   if anything actually changed, so callers can decide whether to refresh.
   A key ABSENT from the cloud copy means it was removed on the other device
   (e.g. the in-progress game was ended there), so it's removed here too —
   otherwise a finished game would linger as "in progress" on this device. */
export function applyStateToLocal(state) {
  if (!state || typeof state !== 'object') return false;
  let changed = false;
  for (const key of SYNCED_KEYS) {
    const incoming = state[key];
    const current = safeGet(key);
    if (incoming === undefined || incoming === null) {
      if (current !== null) {
        safeRemove(key);
        changed = true;
      }
      continue;
    }
    if (incoming !== current) {
      safeSet(key, incoming);
      changed = true;
    }
  }
  return changed;
}

/* Pull the cloud row. Returns { data, updatedAt } or null on error/no row. */
export async function pullState() {
  try {
    const { data, error } = await supabase
      .from('app_state')
      .select('data, updated_at')
      .eq('id', ROW_ID)
      .maybeSingle();
    if (error) {
      console.warn('[sync] pull failed:', error.message);
      return null;
    }
    if (!data) return { data: null, updatedAt: null };
    return { data: data.data || {}, updatedAt: data.updated_at || null };
  } catch (err) {
    console.warn('[sync] pull threw:', err);
    return null;
  }
}

/* Push the current local state up to the cloud row. Returns true on success.
   Clears the pending flag only if nothing else changed while it was in flight. */
export async function pushState() {
  const startedAt = safeGet(LOCAL_AT_KEY);
  try {
    const payload = collectLocalState();
    const { error } = await supabase
      .from('app_state')
      .upsert(
        { id: ROW_ID, data: payload, updated_at: new Date().toISOString() },
        { onConflict: 'id' }
      );
    if (error) {
      console.warn('[sync] push failed:', error.message);
      return false;
    }
    if (safeGet(LOCAL_AT_KEY) === startedAt) safeRemove(PENDING_KEY);
    return true;
  } catch (err) {
    console.warn('[sync] push threw:', err);
    return false;
  }
}

/* One sync round: if this device has unsent changes, send them (they're the
   newest copy). Otherwise take the cloud copy if it differs. Returns true when
   local data changed and the UI should refresh. Only one round runs at a time. */
let inFlight = null;
export function syncNow() {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    try {
      if (hasPendingChanges()) {
        await pushState();
        return false;
      }
      const result = await pullState();
      if (!result) return false; // offline / error — try again later
      const cloud = result.data;
      const cloudHasLog = cloud && typeof cloud['fg-game-log'] === 'string';
      if (cloudHasLog) {
        // Re-check: a local save may have landed while the pull was in flight.
        if (hasPendingChanges()) {
          await pushState();
          return false;
        }
        return applyStateToLocal(cloud);
      }
      // Cloud empty (first run) but this device has history — seed the cloud.
      if (safeGet('fg-game-log')) await pushState();
      return false;
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}
