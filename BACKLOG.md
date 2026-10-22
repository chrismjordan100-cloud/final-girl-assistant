# Final Girl Rules Assistant — Feature Backlog

A running list of ideas and planned work. Newest/active at the top.

**RAG key:**
🟢 Green = built & shipped · 🟡 Amber = partially built / in progress · 🔴 Red = not started

_Status last verified against the codebase: 2026-10-22._

## Backlog

### 🔴 Real flavour text on cards
Find and add REAL flavour text (lore/atmosphere) to the card detail dataset
(`src/data/cards.json`). The current data has rules `effect` text but excludes
flavour. Source it (verify against physical cards / wiki) and add a `flavour`
field per card so the app — and the game story generator — can draw on it.
**Verified:** no `flavour` field present in `cards.json` yet.

### 🔴 Update card detail for the extra data
The card dataset has richer fields (tags, range/damage/hands, bonus_health,
epic flags, start_health/horror, etc.). Surface the useful ones in the places
that show card detail (CardPicker, Game Log detail, Codex if relevant).
**Verified:** `cardData.js` only exposes `id/name/effect/epic`; CardPicker shows
`effect` text only — the extra fields aren't surfaced anywhere.

### 🔴 Richer game summary using the extra card detail
Feed the extra card-detail JSON (effects, flavour, tags) into the game story
generator (`src/lib/narrateGame.js`) so recaps can describe what cards actually
did, not just name them — e.g. "she swung the Aluminum Bat, discarding one of
Hans' Minor Dark Powers." Pairs naturally with the Tier 2 AI recap.
**Verified:** `narrateGame.js` uses card *names* only; doesn't read effect text.

### 🔴 Rich-data trends in MI / Stats
Surface the captured rich data (items found/used, dark powers, finales, events,
setup variants) as trends in the MI/Stats tab — e.g. most-found items, which
finale shows up in losses, average turns to first Dark Power, etc.
**Verified:** `Stats.jsx` reads outcome/turns/achievements only; it does not
touch `events` or `summary` yet.

### 🔴 AI game recap (Tier 2 — richer narrative via an LLM)
Tier 1 (offline template recap) is DONE and shipped. Tier 2 would send the
structured game (events + flavour context) to a real LLM for a genuinely
creative, interpretive narrative.
**Verified:** no AI/API wiring exists in the app.

Design notes for when we build it:
- The app is a **static site on public GitHub Pages — no backend**. So a billing
  API key must NOT be baked into the frontend (anyone could view-source and steal
  it and run up charges).
- **Recommended approach (single user):** a Settings box where the user pastes
  their own LLM API key, stored only in `localStorage` (never committed, never
  synced to Supabase). An "✨ AI recap" button sends the structured game to the
  chosen provider and caches the result on the game entry so it isn't regenerated
  on every view.
- Provider options: Google Gemini (generous free tier), OpenAI, Anthropic. Pick
  one API shape; keep it swappable.
- Alternative (more secure/shareable, more setup): a tiny serverless proxy
  (Cloudflare Workers / Vercel free tier) that holds the key server-side. Overkill
  for a single user.
- Reuse the Tier 1 structured input; the two tiers share the same data pipeline.

### 🔴 Edit-form card suggestions
The Game Log **edit** form uses plain multi-line text for items/events/etc.
Consider per-line card suggestions (like the in-flow CardPicker) so edits also
benefit from the known-card dropdowns.
**Verified:** `GameDetail.jsx` edit form uses plain textareas; no CardPicker.

## Done (🟢 shipped)
- Hosting on GitHub Pages with auto-deploy on push.
- Supabase cloud sync of game log across devices.
- Mobile nav (hamburger), larger phone text, home-screen icon + manifest.
- Per-turn event capture (victims, items, dark powers, finale, terror, weapons,
  events, notes) stamped with turn + phase, with fast multi-entry per turn.
- Game setup + starting event capture, inline with the setup steps.
- Rich end-of-game summary + editable Game Log detail with turn-by-turn timeline.
- Bundled card database with known-card dropdowns (+ free text) and effect text.
- Enriched demo data with logical, card-accurate event streams.
- Tier 1 offline game story generator ("The Story") with reshuffle.
