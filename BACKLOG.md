# Final Girl Rules Assistant — Feature Backlog

A running list of ideas and planned work. Newest/active at the top.

## Backlog

### AI game recap (Tier 2 — richer narrative via an LLM)
**Status:** planned — not started.

We already have **Tier 1**: a free, offline, template-based story generator
(`src/lib/narrateGame.js`) that turns a game's chronological event stream into a
readable slasher recap, shown in the Game Log detail ("The Story"). It uses the
real card names, character names, outcome and flavour, with a reshuffle for
phrasing variety.

**Tier 2** would send the structured game (events + flavour context) to a real
LLM for a genuinely creative, interpretive narrative.

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

### Rich-data trends in MI / Stats
Surface the newly-captured rich data (items found/used, dark powers, finales,
events, setup variants) as trends in the MI/Stats tab — e.g. most-found items,
which finale shows up in losses, average turns to first Dark Power, etc.

### Edit-form card suggestions
The Game Log **edit** form uses plain multi-line text for items/events/etc.
Consider per-line card suggestions (like the in-flow CardPicker) so edits also
benefit from the known-card dropdowns.

## Done
- Hosting on GitHub Pages with auto-deploy on push.
- Supabase cloud sync of game log across devices.
- Mobile nav (hamburger), larger phone text, home-screen icon + manifest.
- Per-turn event capture (victims, items, dark powers, finale, terror, weapons,
  events, notes) stamped with turn + phase.
- Game setup + starting event capture, inline with the setup steps.
- Rich end-of-game summary + editable Game Log detail with turn-by-turn timeline.
- Bundled card database with known-card dropdowns (+ free text) and effect text.
- Enriched demo data with logical, card-accurate event streams.
- Tier 1 offline game story generator.
