/* ==========================================================================
   AI rules answerer (Tier 2) — OPTIONAL, retrieval-augmented.

   The app has no backend (static GitHub Pages site, single user), so there is
   NO server to hold an API key. Instead the user pastes their own Google
   Gemini key, which is stored ONLY in this browser's localStorage. It is never
   committed, never synced to the cloud (not in sync.js SYNCED_KEYS), and only
   ever leaves the browser in the direct HTTPS call to Google's API.

   How it stays accurate: we do NOT ask the model from its own knowledge (it
   would invent Final Girl specifics). We run the app's offline rules search
   first, then send ONLY those matching passages plus the question, with a
   strict instruction to answer from the passages and say so when they don't
   cover it. The raw passages stay visible under the answer so you can verify.
   ========================================================================== */
import { readPersistent, writePersistent } from '../hooks/usePersistentState.js';

// localStorage keys (device-local; NOT in SYNCED_KEYS, so never synced).
const KEY_STORE = 'fg-ai-gemini-key';
const MODEL_STORE = 'fg-ai-gemini-model';
// Google retires model names over time (e.g. gemini-1.5-flash now 404s on the
// REST endpoint). This default is current as of late 2026; if it ever stops
// working, change the Model field in Settings to whatever Google AI Studio
// lists. The 404 handler below tells the user exactly that.
const DEFAULT_MODEL = 'gemini-3.8-flash';

export function getApiKey() {
  return readPersistent(KEY_STORE, '') || '';
}
export function setApiKey(key) {
  writePersistent(KEY_STORE, (key || '').trim() || undefined);
}
export function hasApiKey() {
  return getApiKey().length > 0;
}
export function getModel() {
  return readPersistent(MODEL_STORE, '') || DEFAULT_MODEL;
}
export function setModel(model) {
  writePersistent(MODEL_STORE, (model || '').trim() || undefined);
}

/* Turn the ranked search passages into a compact, numbered context block the
   model can cite. `scenario` passages (this game's Killer/Location) are marked
   so the model knows they override the general rules. */
function buildContext(results, { killerName, locationName } = {}) {
  const lines = [];
  const add = (r, tag) => {
    lines.push(
      `[${lines.length + 1}] (${tag}; ${r.source || r.kind || 'rule'}) ${r.title ? r.title + ': ' : ''}${r.text}`
    );
  };
  for (const r of results.scenario || []) add(r, 'THIS GAME');
  for (const r of results.generic || []) add(r, 'general');
  const header =
    killerName || locationName
      ? `The player is currently playing${killerName ? ` Killer: ${killerName}` : ''}${
          locationName ? ` Location: ${locationName}` : ''
        }.\n`
      : '';
  return header + lines.join('\n');
}

const SYSTEM_PROMPT = `You are a rules assistant for the solo horror board game "Final Girl" by Van Ryder Games. Answer the player's question using ONLY the numbered rule passages provided. Rules specific to the player's current Killer or Location (marked "THIS GAME") OVERRIDE the general rules when they conflict — say so if that happens. Be concise and direct: give the answer first in a sentence or two, then a brief why, citing the passage numbers you used like [2]. If the passages do not contain enough to answer, say plainly that the loaded rules don't cover it and suggest checking the printed rule sheet — do NOT guess or use outside knowledge of the game. Never invent card names, numbers, or effects that aren't in the passages.`;

/* Call Gemini with the question + retrieved passages. Returns a string answer.
   Throws an Error with a user-friendly message on any failure so the caller
   can show it while leaving the offline passage list intact. */
export async function askAI(question, results, { killerName, locationName, signal } = {}) {
  const key = getApiKey();
  if (!key) throw new Error('no-key');

  const context = buildContext(results, { killerName, locationName });
  const userText = `${SYSTEM_PROMPT}\n\n--- RULE PASSAGES ---\n${context}\n\n--- QUESTION ---\n${question}`;

  const model = getModel();
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(key)}`;

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal,
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: userText }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 600 },
      }),
    });
  } catch (e) {
    if (e.name === 'AbortError') throw e;
    throw new Error('Could not reach the AI service. Check your connection and try again.');
  }

  if (!res.ok) {
    let detail = '';
    try {
      const j = await res.json();
      detail = j?.error?.message || '';
    } catch {
      /* ignore parse failure */
    }
    if (res.status === 400 && /API key not valid/i.test(detail)) {
      throw new Error('That API key was rejected. Check it in Settings (it should start with "AIza").');
    }
    if (res.status === 403) {
      throw new Error('The API key was refused (403). Make sure the Generative Language API is enabled for your key.');
    }
    if (res.status === 404) {
      throw new Error(
        `The model "${model}" was not found. Google retires model names over time — open AI settings and set the Model field to a current one (e.g. a "gemini-...-flash" listed in Google AI Studio).`
      );
    }
    if (res.status === 429) {
      throw new Error('Rate limit reached for your key — wait a moment and try again.');
    }
    throw new Error(`AI request failed (${res.status})${detail ? ': ' + detail : ''}.`);
  }

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('The AI returned an unreadable response. Try again.');
  }
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('').trim();
  if (!text) {
    const blocked = data?.promptFeedback?.blockReason;
    throw new Error(blocked ? `The AI declined to answer (${blocked}).` : 'The AI returned an empty answer. Try rephrasing.');
  }
  return text;
}
