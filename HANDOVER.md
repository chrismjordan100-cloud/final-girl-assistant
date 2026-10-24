# Final Girl Rules Assistant — Handover / Orientation

A concise guide for a developer or AI picking up this project. Enough to work
without re-deriving how everything fits. For the feature backlog + RAG status,
see `BACKLOG.md` (it is auto-generated from the code — don't hand-edit it).

## What this is
A personal, fan-made companion app for the board game **Final Girl** (Van Ryder
Games). React + Vite single-page app, no backend. Hosted free on GitHub Pages,
with cloud sync of the user's game log via Supabase. Single user (the owner).

## Where it lives
- **Local path:** `c:\Users\chris\Projects\Final Girl Rule Assistant`
- **GitHub repo:** `chrismjordan100-cloud/final-girl-assistant` (public)
- **Live URL:** https://chrismjordan100-cloud.github.io/final-girl-assistant/
- Note: this is one folder in a multi-root VS Code workspace. The shell often
  defaults its working directory to a SIBLING folder ("Lucy life tracker").
  ALWAYS set the cwd / `Set-Location` to the Final Girl path before running
  commands, and double-check any file you create landed in this project.

## Tech + build
- Vite + React 18. Node scripts are ESM (`.mjs` / `type: module`).
- `src/data/cards.json` is a large (~1 MB) bundled card dataset imported by the
  app. Importing JSON in a plain Node script needs `with { type: 'json' }`;
  Vite handles it natively.
- **Two build modes** (see `vite.config.js`, switched by `FG_BUILD` env):
  - `npm run build` → single-file `dist/index.html` (everything inlined, ~115 MB;
    for double-clicking on a PC). NOT used for hosting.
  - `npm run build:web` → normal multi-file build with `base: '/final-girl-assistant/'`
    for GitHub Pages. THIS is what gets deployed.
- `prebuild` / `prebuild:web` run `scripts/update-backlog.mjs` automatically.
- Windows/PowerShell gotcha: long tool output and some chained commands glitch
  the terminal display (shows stray `^C`), but the command usually still runs.
  Prefer running a dev/build as a background process and reading its output, or
  check the result a second way (e.g. inspect `dist/`).

## Deploy flow (this is "push = live")
1. Make code changes under `src/`.
2. `npm run build:web` locally to verify it compiles (the big image list scrolls
   past; success line is `✓ built in …`).
3. `git add <files>` + `git commit` + `git push origin main`.
4. GitHub Actions (`.github/workflows/deploy.yml`) rebuilds and deploys to Pages
   on every push to `main`. Takes ~1–2 min.
5. Check status: `gh run list --limit 1 --json status,conclusion` (gh is at
   `C:\Program Files\GitHub CLI\gh.exe`; the user is authenticated).
6. The phone is a home-screen PWA; a normal reload picks up new deploys
   (no-cache meta on the HTML). To force-refresh: close & reopen the shortcut.

## Data & sync (important mental model)
- The app persists to the browser's **localStorage** under `fg-*` keys. The
  running app does NOT hold game state in memory alone — it reads/writes
  localStorage — so reloading never loses an in-progress game ON THE SAME DEVICE.
- **Synced across devices** (Supabase, `src/lib/sync.js`, `SYNCED_KEYS`):
  `fg-game-log`, `fg-active-game`, `fg-achievement-overrides`. Stored as one JSON
  blob in a single Supabase row (`app_state`, id `final-girl`). "Last save wins".
- **Device-local only (NOT synced):** `fg-turn-state` (the live Turn Tracker:
  current turn, phase, counters, and the per-turn EVENT STREAM you capture),
  `fg-setup-progress`, `fg-demo-mode`, text-size, etc. The event stream only
  becomes cross-device when it's folded into the saved game at end-of-game.
- Supabase publishable key + URL live in `src/lib/sync.js` (safe to ship; it's a
  public static site, single user, non-sensitive data — accepted tradeoff).
- Supabase free tier pauses after ~1 week idle; may need a wake/restore.

## The key data pipeline (events → summary → story)
This is the heart of the recent work. Flow:
1. **Capture** (Turn Tracker, `src/views/TurnTracker.jsx`): the user logs events
   each turn. Each event: `{ id, turn, phaseId, phaseName, type, detail, meta, at }`.
   Types: setup, event-start, victim-died, victim-saved, victim-escape, fg-power,
   item-found, item-used, dark-power, finale, event, terror, weapon, location, note.
   Turn 0 = "Game start" (setup + starting event). Stored in `fg-turn-state`
   via `src/hooks/useTurnState.js` (`addEvent`, `removeEvent`).
   - Capture UI uses `src/components/CardPicker.jsx` (datalist dropdown of known
     cards for the current killer/location + free text) and
     `src/components/SetupCapture.jsx` (setup + starting event, also inline on
     Setup Assist at steps s12 / s18).
   - The capture bar shows in EVERY phase now (don't re-add phase-based hiding —
     it kept blocking real captures).
2. **Save** (`src/views/ThisGame.jsx`, `handleEndGame`): copies the event stream
   + a derived summary into the game-log entry and calls `endGame` in
   `src/hooks/useGameLog.js`. Entry has: outcome, turns, notes, achievements,
   mistakes, `events[]`, `summary{}`.
3. **Summary** (`src/lib/gameSummary.js`): `deriveSummary(events)` tallies the
   stream (victims, items, dark powers, finale, etc.); `groupByTurn`,
   `buildTimeline` order it.
4. **Story** (`src/lib/narrateGame.js`): `narrateGame(entry, {variant})` turns the
   event stream into a long-form (~500+ word) slasher recap. Stories are NOT
   stored — regenerated on view, deterministic per `id + variant` (the Reshuffle
   button bumps variant). Displayed in `src/views/GameDetail.jsx` ("The Story");
   that view also shows the summary and a turn-by-turn timeline, and has an Edit
   form that writes the summary via `updateEntry` (editing does NOT create the
   raw event timeline — that only comes from live capture).

## Card data bridge — READ THIS before touching cards
- `src/data/cards.json` = the dataset (killers, locations, final_girls, each with
  effect text, `flavour_unofficial`, tags, stats). Ids here are DIFFERENT slugs
  from the app's ids (e.g. app `the-birds` → data `birds`, app `hunter` →
  `the_h_u_n_t_e_r`).
- `src/data/cardData.js` bridges them: `KILLER_ID_MAP` / `LOCATION_ID_MAP`
  translate app ids → data ids; final girls match by NAME. Accessors:
  `getItems, getDarkPowers, getMinorDarkPowers, getFinales, getEvents,
  getSetupCards, getTerror, cardOptionsFor(type, combo), findCard, effectForName,
  killerFlavour, locationFlavour, finalGirlUltimate`.
- `cardOptionsFor(type, {killerId, locationId})` is what the dropdowns call —
  every capture type that has data MUST have a case here (bug we hit: `terror`
  was missing and silently gave no dropdown). Types with no list (location, note)
  return [] and the UI falls back to free text — correct.
- Some card NAMES are stored WITH their own quote marks (e.g.
  `"What's that noise? Let's go and see!"`). The narrator's `q()` helper avoids
  doubling quotes — reuse it.

## The narrator (`src/lib/narrateGame.js`) specifics
- Opening paragraph (location + killer + final-girl flavour, setup, starting
  event) → one paragraph per turn with immersive transitions (NO "Turn 3."
  labels — the user explicitly rejected those; use "Then,/Later,/Near the end,")
  → closing paragraph by outcome. A word-count floor (~520) pads with atmosphere.
- `narrativeEffect(e, subject)` translates a card's rules effect into NATURAL
  language (never raw rulebook text — the user explicitly rejected quoting
  "increase Bloodlust by 1" etc.). It pattern-matches common mechanics; for the
  killer/night's cards it has a generic menace fallback so a card is never just
  named with no consequence; for the girl's own items it returns null rather than
  invent an effect. `subject` is 'killer' or 'girl' (events + terror use
  'killer'). ADD MORE PATTERNS here as gaps are found — that's the main ongoing
  tuning job for story quality.
- Each event type has a `pick([...])` list of phrasings — keep multiple variants
  per type (a single-variant beat caused repetitive output we had to fix).

## Backlog automation
- `BACKLOG.md` is REGENERATED by `scripts/update-backlog.mjs` — edit the script,
  not the md. Each item has a `check(src)` that inspects the code and returns
  green/amber/red; runs on build (prebuild) and on file-save via the hook at
  `.kiro/hooks/sync-backlog-rag.json`.
- The script ALSO writes `src/data/backlogAuto.json`, which the in-app Asset
  Admin "Backlog — progress" panel merges with its own hand-kept `BACKLOG` array
  in `src/views/Admin.jsx` (those show tagged "Auto-tracked"). So the app shows
  BOTH lists. Feature items with code checks → add to the script; asset/content
  items → add to the Admin.jsx array.
- Current big open items: AI recap (Tier 2, user-supplied API key), MI/Stats
  rich-data trends, voice narration (fix start-of-game voice + read the story
  aloud), Extreme Horror dice track, official card flavour text.

## Rules accuracy notes (verified against the rulebook)
- A "Horror Roll" IS the roll you make playing most Action cards (not a separate
  thing). Dice come from the player board's Horror track, INVERSE to the level:
  standard mode Horror 1 → 3 dice, Horror 2–5 → 2 dice, Horror 6 → 1 die. See
  `diceForHorror()` in TurnTracker. (App previously had level = dice — wrong.)
  Extreme Horror mode differs and is on the backlog.

## Testing approach used
Node one-off scripts (deleted after use) that stub `cardData.js`'s exports and
import a transformed copy of `narrateGame.js` to print generated stories / word
counts / leakage checks. The real `findCard` matches on exact stored card names
(mind the embedded quotes). Always clean up temp `.mjs` test files and any
`cloud-dump.json` — and verify they didn't land in the sibling workspace folder.
