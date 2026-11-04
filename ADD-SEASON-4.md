# Adding Season 4 — step-by-step runbook

A complete, do-this-in-order guide to bring Season 4 up to the same level as
Seasons 1-3: data, rules, tips, achievements, scenarios, assets and icons.

Written against the current code. The pieces touched are all in `src/data/games.js`,
`src/data/cardData.js`, `src/data/cards.json`, and the asset folders. Everything is
visible on the **Asset Admin** tab, which turns red crosses into green ticks as you go.

> **Fastest path:** do Stage 0, then for each Killer/Location drop the images in
> (Stage 5 — purely copy files, no code) and have Kiro transcribe the rules
> (Stages 2-4) from the S4 PDF. Images display on their own; only the written
> rules, tips and achievements need code edits.

---

## Already DONE ahead of the boxes arriving (Nov 2026)

These were wired up from the public Kickstarter line-up + retailer listings, so
S4 already shows in the app. **Verify every name against the physical boxes and
remove the "verify" notes once confirmed.**

- **Stage 0.2 — extract script ready.** `extract-feature-rules-s4.cjs` exists;
  drop `FeatureFilmRules_S4.pdf` in the root and run `node extract-feature-rules-s4.cjs`.
- **Stage 1 — S4 Killers & Locations added** to `games.js`:
  - Killers: `raptors` (The Raptor Games), `volkar` (The Green Terror),
    `berith` (A Demon in the Shadows), `grimlash` (A Rotten Harvest),
    `billy` (Bad Times at Buddyland), plus vignette `pods` (Terror From Beyond —
    name is a placeholder, not yet published).
  - Locations: `isla-lagarto`, `pesadilla-verde`, `larmes-abbey`, `shady-acres`,
    `buddyland`.
- **Final Girls corrected.** Added Maud & Christina (Raptor Games). Fixed the
  Buddyland pair to **Rena & Gwynn** (the old "Rena/Jen" + "Gwynn/Rina" guesses
  were wrong). Dakota/Alois, Rita/Lindi, Vicky/Joy confirmed.
- **Stage 8 — `OFFICIAL_SCENARIOS`** home pairings added for all five S4 films.
- **Stage 2 — setup steps (`setupExtras`)** added for all 5 S4 killers + 5 locations,
  transcribed from the official rule sheets (`s4-rules-pdf/`).
- **Stage 3 — play rules (`playRules`)** added for all 10 S4 entries, from the same sheets.
- **Stage 4 — phase extras (`phaseExtras`)** added for the S4 combos that have a
  per-phase recurring action (Billy, Grimlash, Berith, Volk'ar, Raptors, Shady
  Acres, Pesadilla Verde, Isla Lagarto) and for Mort + Mega Boardgame Con.
- **Stage 6 — card bridge** done: `KILLER_ID_MAP` / `LOCATION_ID_MAP` in `cardData.js`
  now map the S4 app ids to the (already-present) `cards.json` records, so the
  capture dropdowns, Codex card lists and the narrator all have S4 data.
- **Stage 7 — scenario rule icons DONE.** The 45 S4 rule-symbol PNGs + their
  `rule-icons.json` / `rulesets.json` records are in `src/assets/icons/rules/`
  (12 S4 rule sets), and the Icon Reference tab was rewired to group rule icons
  by series and badge the low-res ones. S4 icons show in Icon Reference and (via
  `getRuleIcons`) on the This Game tab automatically.
- The S4 rule PDFs were downloaded and their text extracted to `s4-rules-pdf/*.txt`
  (handy reference for future edits — flavour, achievements, etc.).
- **Special Features wired in** (`season: 0`): Mort (@ Mega Boardgame Con) with
  FULL setup + play + phase rules; Krampus (@ Santa's Village) as entries with card
  data but rules flagged "not yet transcribed" (no sheet yet).
- **Two backlog items added** (Asset Admin → Backlog): "Final Girl Series 4 –
  card reference sheet" (waiting on card photos) and "Periodically harvest new
  online tips (especially Series 4)".
- Build verified after every step: `npm run build:web` passes.

**Name confirmations from the rule sheets** (remove any remaining doubt):
Billy (Buddyland, with Buddies + Boris), Grimlash (Shady Acres), Berith possessing
Ursula (L'Armes Abbey), Volk'ar (Pesadilla Verde), the Raptors/Pack (Isla Lagarto,
with a T-Rex). Final Girls: Maud & Christina, Dakota & Alois, Rita & Lindi,
Vicky & Joy, Rena & Gwynn.

> Source: Van Ryder KS line-up via the Zatu campaign write-up, cross-checked with
> Meeple Madness / Board Game Bliss / the S4 alt-killer minis list (Billy,
> Grimlash, Berith, Volk'ar, Raptors). The vignette killer name wasn't published.

## Also already present from before

- `src/data/cards.json` has a few S4 stubs marked `"data_status": "missing"`.
- `src/lib/cardCatalogue.js` already knows `S4` as a series — Codex groups it.
- S4 promo girls (Julie, Meg, Jen, Iris) were already listed.

## What is still MISSING for S4 — and what it's blocked on

Everything left needs a physical file you don't have yet. Nothing more can be
done purely from online sources without risking made-up data.

- **The big one — card photos / box scans (Stages 5).** All S4 **art, flavour,
  rule-sheet pages, Final Girl card faces, scenario title graphics, and the
  killer/location EMBLEM icons** (`S4-killer-{id}-icon.png` etc. in
  `src/assets/icons/`). These are images; they can only come from scans. This is
  the bulk of what's still red on Asset Admin. (Note: the per-rule SYMBOL icons in
  Stage 7 are a different set and are already DONE.)
- **Achievements** — NOT in the Feature Film rule sheets; they're on a separate
  achievement card/sheet per box. Can't be transcribed without that sheet (making
  them up would violate "don't state facts not in the data").
- **Tips** — S4 tips data is currently EMPTY. These come from the Strategy Tips
  Handbook / community guides, not the rule sheets, so they're deliberately left
  for the "harvest online tips" backlog item rather than invented.
- **Card effect text** — most S4 records already exist in `cards.json`; check
  Codex "All cards" for any S4 card still flagged missing and fill from scans/wiki.
- **Terror From Beyond vignette** — killer is a placeholder (`pods`); its rule
  sheet wasn't in the set. Confirm the real name and add its rules.
- **Krampus / Santa's Village** (North Pole Nightmare) — entries + card data are
  in, but setup/play/phase rules are placeholder "not yet transcribed" (no sheet).

### Could we do more right now, before the files arrive?
Checked — no. The data sections that can be driven from the rule sheets we already
have (setup, play rules, phase extras) are DONE. The rest is genuinely gated on
images (scans) or on separate sheets we don't have (achievements), or is content
that shouldn't be fabricated (tips). So this is the correct stopping point until
the boxes/photos are in hand.

---

## Stage 0 — Prep (5 minutes, do this first)

1. **Get the S4 Feature Film Rules PDF.** Download it and save it in the project
   root as `FeatureFilmRules_S4.pdf` (same place as `_S2` / `_S3`). Online sources:
   the official Van Ryder Games support/downloads page, or BoardGameGeek Files for
   Final Girl Series 4.

2. **Extract the text** so Kiro (and you) can read it. Copy the existing script:
   - Duplicate `extract-feature-rules-s3.cjs` → `extract-feature-rules-s4.cjs`
   - Change the two filenames inside to `FeatureFilmRules_S4.pdf` and
     `feature-rules-s4-extracted.txt`.
   - Run it from the project folder:
     ```powershell
     node extract-feature-rules-s4.cjs
     ```
   - You now have `feature-rules-s4-extracted.txt`.

3. **Confirm the S4 line-up** (killers, locations, which killer pairs with which
   location as the "home" scenario, and the Final Girl pairings). Note each
   name's **short id** — lowercase, hyphenated, no "the" (e.g. `big-bad-wolf`,
   `camp-happy-trails`). You'll reuse that id everywhere.

> If you'd rather hand it all to Kiro: once `feature-rules-s4-extracted.txt`
> exists, say *"read the S4 rules and add all Season 4 killers and locations —
> data, setup, play rules, phase extras, tips, achievements and scenarios."*
> Kiro can do Stages 1-4 and 6 from the extracted text. You still do Stage 5
> (images) by hand because the app can't read a rule-sheet image.

---

## Stage 1 — Register the S4 Killers & Locations  (`src/data/games.js`)

This is the step that makes S4 appear in the pickers, Codex, This Game, Setup
Assist and Asset Admin.

1. In `src/data/games.js`, in the `killers` array, add a `// Series 4` block
   after the Series 3 entries, one line per killer:
   ```js
   // Series 4
   { id: 'killer-short-id', season: 4, name: 'Killer Name', shortName: 'killer-short-id', film: 'Feature Film Title' },
   ```
   - For a **vignette** killer (killer-only, plays at any location) add
     `isVignette: true` like `the-birds` / `patsy-zombies` / `destiny` do. S4's
     "A Green Terror / Green Terror" vignette from the Ultimate Box goes here.

2. In the `locations` array, add a `// Series 4` block the same way:
   ```js
   // Series 4
   { id: 'location-short-id', season: 4, name: 'Location Name', shortName: 'location-short-id', film: 'Feature Film Title' },
   ```

3. **`shortName` must equal `id`** (every existing entry follows this — the asset
   filenames are built from `shortName`, the data lookups from `id`).

4. **Final Girls:** already present, but open the `finalGirls` array and for each
   S4 girl with a `note:` about unconfirmed names, verify against the box and
   correct `name` / remove the `note` once confirmed.

5. Save. Run `npm run dev` and open **Asset Admin** — the S4 killers/locations
   now show up (all red crosses, which the next stages turn green).

---

## Stage 2 — Setup steps  (`setupExtras` in `src/data/games.js`)

For each S4 Killer and Location that has special **setup** (deck builds, tracks,
tokens placed at the start), add an entry to the `setupExtras` object, keyed by
the `id`. Follow the Series 1-3 examples already in the file. Shape:

```js
'killer-short-id': [
  {
    title: 'Short imperative title',
    body: 'Paraphrased setup instruction from the S4 rule sheet.',
    // optional flags:
    itemDeck: true,        // set if this CHANGES how Item decks are built
    watchOut: 'Gotcha note shown in a warning style.',
  },
  // ...more steps
],
```

- Only add setup-relevant steps here (full play detail goes in Stage 3).
- If a Killer/Location genuinely has **no** special setup, either omit it, or —
  if it has rule-sheet images but no written rules — add its `id` to the
  `noWrittenRulesExpected` Set so Asset Admin doesn't flag it (see how `hans`
  and `camp-happy-trails` are handled).
- `changesItemDecks()` and `hasWrittenRules()` read this automatically — no other
  wiring needed.

---

## Stage 3 — Play rules  (`playRules` in `src/data/games.js`)

For each S4 Killer/Location with special **in-play** rules, add to the `playRules`
object, keyed by `id`. Shape (match the Series 1-3 entries):

```js
'killer-short-id': {
  points: [
    'Paraphrased play-rule reminder 1.',
    'Paraphrased play-rule reminder 2.',
    // ...
  ],
  watchOuts: [
    'Easy-to-miss gotcha (e.g. the Epic Dark Power interaction).',
  ],
},
```

These surface on the **This Game** tab and feed the **Ask** search index
automatically (via `rulesSearch.js`, which already imports `playRules`).

---

## Stage 4 — Phase extras, Tips & Achievements  (`src/data/games.js`)

1. **Phase extras** — if an S4 Killer/Location adds a per-phase reminder (e.g.
   "each Killer phase, draw a Sand Snake card"), add it to the `phaseExtras`
   object keyed by `id` (same pattern as existing entries; `rulesSearch.js`
   already imports `phaseExtras`).

2. **Tips** — add strategy advice to `killerTips` / `locationTips` (keyed by `id`),
   using the `tip('text', 'source', 'confidence')` helper. `source` is attribution
   (e.g. the Strategy Tips Handbook or a named review); `confidence` is optional
   (`'confirmed'` / `'reported'`). General S4 tips that apply to any game go in
   `generalTips`. These show on the **Tips** tab for the current selection.

3. **Achievements** — add to the `achievements` object, keyed by `id`, using the
   `mkAchievements('id', ['label 1', 'label 2', ...])` helper (it auto-numbers the
   ids). Transcribe the achievement list from each S4 Killer/Location rule sheet.
   These become end-of-game tickboxes and feed the Achievements/Stats tabs. The
   win-based ones ("defeat X here", "at five different Locations") auto-track.

---

## Stage 5 — Image assets  (NO code — just drop files in)

Everything here loads automatically by filename on the next refresh. Use the
`S4-` prefix and the **same `shortName`/`id`** from Stage 1. Grab the images from
the rule sheets / box scans ("icon image grabs" = screenshot/crop each emblem).

**Killer / Location art, flavour and rules pages** → `src/assets/games/`
```
S4-killer-{id}-art.png          key art
S4-killer-{id}-flavour.png      flavour-text panel
S4-killer-{id}-1.png, -2.png …  rule-sheet pages (number from 1, contiguous)
S4-location-{id}-art.png
S4-location-{id}-flavour.png
S4-location-{id}-1.png, -2.png …
```

**Final Girl card faces** → `src/assets/games/`
```
S4-finalgirl-{shortName}-front.png
S4-finalgirl-{shortName}-back.png
```
(Use the `shortName` already in `finalGirls[]`, e.g. `vicky`, `joy`, `rita`,
`lindi`, `alois`, `dakota`, `bad-times-a`, `bad-times-b`, and promos `julie`,
`meg`, `jen-promo`, `iris`.)

**Scenario title graphics** → `src/assets/games/`
```
Official pairing:  S4-scenario-{killerId}-{locationId}.png
Vignette:          S4-scenario-{vignetteId}.png
```

**Main Killer/Location emblem icons** → `src/assets/icons/`  (note: icons live
in `icons/`, NOT `games/`)
```
S4-killer-{id}-icon.png
S4-location-{id}-icon.png
```

> Naming is lowercase and must match exactly. The "Rules pages" checklist marker
> goes green once at least one numbered page exists. After copying files, refresh
> the page (the watcher polls; give it a second). Asset Admin ticks update live.

---

## Stage 6 — Card data bridge & dataset

So the capture dropdowns, Codex card lists and the story narrator know S4 cards.

1. **`src/data/cardData.js`** — add each S4 killer/location to the id maps:
   ```js
   // in KILLER_ID_MAP
   'killer-short-id': 'cards_json_killer_id',
   // in LOCATION_ID_MAP
   'location-short-id': 'cards_json_location_id',
   ```
   The left side is the app `id` (Stage 1); the right side is the matching record
   `id` inside `cards.json`. (Final Girls match by NAME, so no map entry needed.)

2. **`src/data/cards.json`** — add/complete the S4 records (killers, locations,
   final_girls) with their `finales`, `dark_powers`, `minor_dark_powers`,
   `killer_items`, `terror_cards`, `events`, `items`, `setup_cards`, and each
   card's `effect` text and (optional) `flavour_unofficial`. Set each record's
   `data_status` to `complete` once filled in. The community Final Girl wiki
   (`finalgirl.fandom.com`) is the usual source for effect text; keep the
   `source_url` where you have it.
   - This file is ~1 MB — edit the specific records; don't rewrite the file.
   - Codex "All cards" flags any card with missing text, so you can fill gaps
     over time rather than all at once.

---

## Stage 7 — Scenario rule icons  ✅ DONE for S4

> **Status: complete.** The 45 S4 rule-symbol PNGs and their `rule-icons.json` /
> `rulesets.json` records (12 S4 rule sets) are in `src/assets/icons/rules/`, and
> the Icon Reference tab now groups rule icons by series with a low-res badge. The
> steps below are the procedure (kept for reference / future series).

Scenario-specific symbols (e.g. a new track/token icon) live in
`src/assets/icons/rules/` and need metadata so they show in the Icon Reference
and on This Game.

For each S4 symbol:
1. Save the cropped PNG as `src/assets/icons/rules/S4-{killer|location}-{id}-icon-{symbol}.png`
   (follow the Series 1-3 names in that folder).
2. Add a matching entry to `src/assets/icons/rules/rule-icons.json` (copy an
   existing object — set `file`, `id`, `series: "S4"`, `type`, `ruleset` = the
   `id`, `ruleset_name`, `icon`, `label`, `description`, `source_sheet`).
3. Add/extend the ruleset entry in `src/assets/icons/rules/rulesets.json` (set
   `icon_count` and list the icon ids, or an empty list + a `note` if the ruleset
   uses only core icons).

---

## Stage 8 — Official scenarios  (`OFFICIAL_SCENARIOS` in `src/data/games.js`)

Add the canon Killer+Location "home" pairing for each S4 feature film:
```js
// Series 4
'killer-id|location-id': 'Feature Film Title',
```
Vignettes have no pairing (leave them out — `getOfficialScenario` already returns
null for `isVignette` killers). Cross-combo scenario titles from the Lore book can
be added later when you have the book.

---

## Stage 9 — Verify & deploy

1. **Build check** (this is the real pass/fail — a dev server starting isn't proof):
   ```powershell
   npm run build:web
   ```
   Wait for the `✓ built in …` line. Fix any error it reports (usually a stray
   comma/brace in `games.js` or a JSON syntax slip in `cards.json`). The build
   also regenerates `BACKLOG.md` via the prebuild script.

2. **Eyeball in the app** (`npm run dev`):
   - Asset Admin → Season 4 sections: image ticks reflect the files you added.
   - Codex → Series 4: killers/locations/girls appear with art and card lists.
   - This Game: pick an S4 killer+location — setup steps, play rules, tips,
     achievements and the scenario name all show.
   - Pickers/Turn Tracker: S4 cards appear in the capture dropdowns.

3. **Update the backlog notes** (optional but tidy): in `src/views/Admin.jsx` the
   hand-kept `BACKLOG` array has items that say "when S4 is added…" (S4 pairings,
   S4 achievements, S4 icons, S4 PDF). Flip their `status` to `'done'` (or
   `'partial'` with a `remaining` note) as you complete each.

4. **Deploy** (push = live):
   ```powershell
   git add src/ public/ FeatureFilmRules_S4.pdf extract-feature-rules-s4.cjs feature-rules-s4-extracted.txt
   git commit -m "Add Season 4: killers, locations, rules, tips, achievements and assets"
   git push origin main
   ```
   GitHub Actions rebuilds and deploys to Pages in ~1-2 min. Check:
   ```powershell
   gh run list --limit 1 --json status,conclusion
   ```
   On the phone, close and reopen the home-screen shortcut to force the new build.

---

## Per-item status (the 5 S4 films + Mort; Krampus noted separately)

DONE for all five S4 films and the Mort special:
- [x] Listed in `killers[]` / `locations[]` (`id` = `shortName`)  — Stage 1
- [x] `setupExtras[id]`  — Stage 2
- [x] `playRules[id]`  — Stage 3
- [x] `phaseExtras[id]` (where the combo has a per-phase action)  — Stage 4
- [x] `KILLER_ID_MAP` / `LOCATION_ID_MAP` in `cardData.js`  — Stage 6
- [x] `cards.json` records present (spot-check for any still flagged missing)  — Stage 6
- [x] Rule-symbol icons + JSON metadata  — Stage 7
- [x] `OFFICIAL_SCENARIOS['killer|location']`  — Stage 8

STILL TO DO (blocked on physical files / separate sheets / content decisions):
- [ ] `achievements[id]`  — needs the per-box achievement sheet  — Stage 4
- [ ] `killerTips[id]` / `locationTips[id]`  — S4 tips empty; see the tips backlog item  — Stage 4
- [ ] Art / flavour / rules-page images in `src/assets/games/`  — needs scans  — Stage 5
- [ ] Emblem icon in `src/assets/icons/` (`S4-killer/location-{id}-icon.png`)  — needs scans  — Stage 5
- [ ] Scenario graphic in `src/assets/games/`  — needs scans  — Stage 5
- [ ] Final Girl faces (`S4-finalgirl-{short}-front/back.png`) + `note` cleared  — needs scans  — Stages 1 & 5

Krampus / Santa's Village (North Pole Nightmare) only: entries + card data + id-maps +
scenario pairing are in; `setupExtras` / `playRules` / `phaseExtras` are placeholders
awaiting the rule sheet. Terror From Beyond vignette: placeholder killer `pods`, awaiting its sheet.
