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

/* Read the synced keys out of localStorage into a plain object. */
export function collectLocalState() {
  const out = {};
  for (const key of SYNCED_KEYS) {
    const raw = localStorage.getItem(key);
    if (raw !== null) out[key] = raw; // store the raw JSON string as-is
  }
  return out;
}

/* Write a state object (from the cloud) back into localStorage. Returns true
   if anything actually changed, so callers can decide whether to refresh. */
export function applyStateToLocal(state) {
  if (!state || typeof state !== 'object') return false;
  let changed = false;
  for (const key of SYNCED_KEYS) {
    const incoming = state[key];
    const current = localStorage.getItem(key);
    if (incoming === undefined || incoming === null) continue;
    if (incoming !== current) {
      localStorage.setItem(key, incoming);
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
    if (!data) return null;
    return { data: data.data || {}, updatedAt: data.updated_at || null };
  } catch (err) {
    console.warn('[sync] pull threw:', err);
    return null;
  }
}

/* Push the current local state up to the cloud row. Returns true on success. */
export async function pushState() {
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
    return true;
  } catch (err) {
    console.warn('[sync] push threw:', err);
    return false;
  }
}
