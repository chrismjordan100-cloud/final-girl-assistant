# Final Girl Rules Assistant — Feature Backlog

_Auto-generated from the codebase by `scripts/update-backlog.mjs` — do not edit by hand; edit the script._

**RAG key:** 🟢 built & shipped · 🟡 partially built / in progress · 🔴 not started

_RAG last synced to code: 2026-10-22._

## Backlog

### 🔴 Real flavour text on cards

Find and add REAL flavour text (lore/atmosphere) to the card detail dataset
(`src/data/cards.json`). The current data has rules `effect` text but excludes
flavour. Source it and add a `flavour` field per card so the app — and the game
story generator — can draw on it.

**Status:** 🔴 not started.

### 🔴 Update card detail for the extra data

The card dataset has richer fields (tags, range/damage/hands, bonus_health,
epic flags, start_health/horror, etc.). Surface the useful ones in the places
that show card detail (CardPicker, Game Log detail, Codex if relevant).

**Status:** 🔴 not started.

### 🔴 Richer game summary using the extra card detail

Feed the extra card-detail JSON (effects, flavour, tags) into the game story
generator (`src/lib/narrateGame.js`) so recaps describe what cards actually did,
not just name them. Pairs naturally with the Tier 2 AI recap.

**Status:** 🔴 not started.

### 🔴 Rich-data trends in MI / Stats

Surface the captured rich data (items found/used, dark powers, finales, events,
setup variants) as trends in the MI/Stats tab — e.g. most-found items, which
finale shows up in losses, average turns to first Dark Power, etc.

**Status:** 🔴 not started.

### 🔴 AI game recap (Tier 2 — richer narrative via an LLM)

Tier 1 (offline template recap) is DONE and shipped. Tier 2 would send the
structured game to a real LLM for a creative, interpretive narrative.

Design notes for when we build it:
- Static site on public GitHub Pages — no backend. A billing API key must NOT
  be baked into the frontend (view-source would leak it).
- Recommended (single user): a Settings box where you paste your own LLM API
  key, stored only in `localStorage` (never committed, never synced). An
  "AI recap" button sends the game to the provider and caches the result.
- Providers: Google Gemini (free tier), OpenAI, Anthropic — keep swappable.
- Alternative: a serverless proxy (Cloudflare/Vercel) holding the key — overkill
  for one user.

**Status:** 🔴 not started.

### 🔴 Edit-form card suggestions

The Game Log edit form uses plain multi-line text for items/events/etc.
Add per-line card suggestions (like the in-flow CardPicker) so edits also
benefit from the known-card dropdowns.

**Status:** 🔴 not started.

## Done (🟢 shipped)
- Hosting on GitHub Pages with auto-deploy on push.
- Supabase cloud sync of game log across devices.
- Mobile nav (hamburger), larger phone text, home-screen icon + manifest.
- Per-turn event capture (victims, items, dark powers, finale, terror, weapons, events, notes) stamped with turn + phase, with fast multi-entry per turn.
- Game setup + starting event capture, inline with the setup steps.
- Rich end-of-game summary + editable Game Log detail with turn-by-turn timeline.
- Bundled card database with known-card dropdowns (+ free text) and effect text.
- Enriched demo data with logical, card-accurate event streams.
- Tier 1 offline game story generator ("The Story") with reshuffle.
- Self-updating backlog RAG (this file is regenerated from the code).
