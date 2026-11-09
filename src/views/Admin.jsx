import { useMemo, useState } from 'react';
import {
  killers,
  locations,
  finalGirls,
  ASSETS_FOLDER,
  hasImageBaseName,
  getPageImages,
  getIcon,
  getScenarioAssetList,
  hasWrittenRules,
  noWrittenRulesExpected,
  getVideoChecklist,
  VIDEOS_FOLDER,
  getFinalGirlEnvelopeImage,
} from '../data/games.js';
import { finalGirlUnlockableName } from '../data/cardData.js';
import { useFgCollection } from '../hooks/useFgCollection.js';
import { VIDEO_PROMPT } from '../data/videoPrompt.js';
import BACKLOG_AUTO from '../data/backlogAuto.json';
import './Admin.css';

/* One marker per asset TYPE for an entry (not per page). */
function assetTypesFor(type, entry, opened) {
  const prefix = `S${entry.season}-${type}-${entry.shortName}`;

  if (type === 'finalgirl') {
    const list = [
      { key: 'front', label: 'Card front', example: `${prefix}-front.png`, present: hasImageBaseName(`${prefix}-front`) },
      { key: 'back', label: 'Card back', example: `${prefix}-back.png`, present: hasImageBaseName(`${prefix}-back`) },
    ];
    // Her Secret Envelope item card. SPOILER RULE: the item is never named or
    // requested until you've marked her envelope OPENED in the Codex. Sealed
    // (or won-but-unopened) girls get no item line at all.
    const isOpened = Boolean(opened && opened.has(entry.id));
    const itemName = isOpened ? finalGirlUnlockableName(entry) : null;
    const itemImg = isOpened ? getFinalGirlEnvelopeImage(entry) : null;
    if (isOpened) {
      const itemSlug = String(itemName || 'item')
        .toLowerCase()
        .replace(new RegExp(`^${entry.shortName}\\W*s?\\s+`, 'i'), '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      list.push({
        key: 'item',
        label: itemName ? `Envelope item: ${itemName}` : 'Envelope item card',
        example: `S${entry.season}-item-${entry.shortName}-${itemSlug || 'item'}.png`,
        present: Boolean(itemImg),
      });
    }
    return list;
  }

  // killer / location
  const list = [
    { key: 'icon', label: 'Icon', example: `${prefix}-icon.png`, present: Boolean(getIcon(type, entry)) },
    { key: 'art', label: 'Key art', example: `${prefix}-art.png`, present: hasImageBaseName(`${prefix}-art`) },
    { key: 'flavour', label: 'Flavour text', example: `${prefix}-flavour.png`, present: hasImageBaseName(`${prefix}-flavour`) },
    { key: 'rules', label: 'Rules pages', example: `${prefix}-1.png (+ -2, -3, …)`, present: getPageImages(type, entry).length > 0 },
  ];
  // Locations: a sharp, straight-on photo of the board / map, shown in the Codex.
  if (type === 'location') {
    list.push({ key: 'board', label: 'Board / map (high res)', example: `${prefix}-board.jpg`, present: hasImageBaseName(`${prefix}-board`) });
  }
  return list;
}

function entryStatus(type, entry, opened) {
  const types = assetTypesFor(type, entry, opened);
  const present = types.filter((t) => t.present).length;
  return { types, present, total: types.length, complete: present === types.length };
}

function EntryCard({ type, entry, opened }) {
  const { types, present, total, complete } = entryStatus(type, entry, opened);

  // Rule-sheet images present but the WRITTEN rules haven't been transcribed by
  // Kiro yet (Killers/Locations only — Final Girls have no written rules).
  const rulesImagesPresent = type !== 'finalgirl' && getPageImages(type, entry).length > 0;
  const needsTranscription =
    type !== 'finalgirl' &&
    rulesImagesPresent &&
    !hasWrittenRules(entry) &&
    !noWrittenRulesExpected.has(entry.id);

  return (
    <article className={'admin-entry fg-panel' + (complete ? ' is-complete' : '')}>
      <header className="admin-entry__head">
        <h3 className="admin-entry__name">{entry.name}</h3>
        <span className="admin-entry__meta">{entry.film} &middot; S{entry.season}</span>
        <span className={'admin-entry__count' + (complete ? ' is-complete' : '')}>
          {complete ? 'Complete' : `${present}/${total}`}
        </span>
      </header>
      {entry.note && <p className="admin-entry__note fg-type">&#9888; {entry.note}</p>}
      {needsTranscription && (
        <p className="admin-entry__transcribe">
          &#9888; Rule-sheet images are in, but the written rules aren&rsquo;t in the app
          yet. Ask Kiro: &ldquo;read and add the special rules for {entry.name}.&rdquo;
        </p>
      )}
      <ul className="admin-asset-list">
        {types.map((t) => (
          <li key={t.key} className={'admin-asset' + (t.present ? ' is-present' : '')}>
            <span className={'admin-asset__status ' + (t.present ? 'is-ok' : 'is-missing')}>
              {t.present ? '\u2713' : '\u2715'}
            </span>
            <span className="admin-asset__label">{t.label}</span>
            <code className="admin-asset__file">{t.example}</code>
          </li>
        ))}
      </ul>
    </article>
  );
}

const SECTIONS = [
  { type: 'finalgirl', title: 'Final Girls', entries: finalGirls },
  { type: 'killer', title: 'Killers', entries: killers },
  { type: 'location', title: 'Locations', entries: locations },
];

/* How-to-play videos: one per Killer and Location. Worked out from the files
   present, so the backlog item and the Training videos panel stay current. */
const VIDEO_LIST = getVideoChecklist();
const VIDEOS_DONE = VIDEO_LIST.filter((v) => v.present).length;
const VIDEOS_TOTAL = VIDEO_LIST.length;

/* Running backlog of material still to scan / transcribe with Kiro. Add to
   this list as new ideas come up so nothing gets forgotten. */
/* Location board photos still to take, worked out from the files present. */
const BOARDS_NEEDED = locations.filter((l) => !hasImageBaseName(`S${l.season}-location-${l.shortName}-board`));

const BACKLOG = [
  {
    title: 'Chris to do: sort the Mausoleum Box into the Feature Film boxes',
    detail:
      'A physical job, not a digital one. The Mausoleum Box holds extras for every series in one place, so move each piece into the Feature Film box it belongs to, so a game\u2019s whole set comes out of one box. Example: the Special Victim meeples for The Happy Trails Horror go into The Happy Trails Horror box. Contents to sort: Special Victim meeples (Series 1 to 4 and the Special Features), the Vehicle Action cards and Proxy Event cards (each into its film\u2019s box), the Signature Action cards, Julia and Constance, the Elizabeth and Ursula character packs and miniatures, and the Evan and AJ meeples. Anything with no single film (e.g. the Signature Action cards or the character packs) needs a home of your choosing. Tell Claude when it\u2019s done and she\u2019ll mark it green.',
    affects: ['You (Chris)', 'Storage'],
    status: 'todo',
  },
  {
    title: 'Chris to do: photograph the missing location boards',
    detail:
      'Each Location in the Codex shows its board / map under the key art; click it to see it full screen. Most boards came from the publisher\u2019s shop images, but some aren\u2019t published anywhere usable. For those, lay the board flat in good light and take one photo from straight above, filling the frame (no angle, no glare), then send it in the chat saying which board it is. Claude straightens it and saves it as S{season}-location-{shortName}-board.jpg. The Locations section below shows a tick or cross for each. Once a board is in, Claude also reads its spaces into the Turn Tracker\u2019s \u201cWhere she is\u201d list (those two locations use free text until then).',
    affects: ['Codex', 'You (Chris)'],
    status: BOARDS_NEEDED.length === 0 ? 'done' : 'partial',
    remaining: `Boards still needed: ${BOARDS_NEEDED.map((l) => l.name).join(', ')}.`,
  },
  {
    title: 'How-to videos for add-on and optional rules (not tied to a Killer or Location)',
    detail:
      'Videos in the same format as the Killer and Location ones, for each optional rule set from the add-on boxes, so when you decide to bring one into a game you can watch how to introduce it. Rules explained thoroughly, as with the other videos. Each would be found under its name below. The planned file name is shown so the app can pick it up when it exists (src/assets/videos/). Where the card text is still unknown (marked "cards needed"), photograph the cards first. Make them in one batch using the Training videos prompt, adapted to "add-on rule sets" instead of a season. Nothing made yet.',
    affects: ['Rules Reference', 'Asset Admin', 'This Game'],
    status: 'todo',
    list: [
      { name: 'Extreme Horror Mode', from: 'Core Box', what: 'the harsher back of the Player board: tougher Horror track and 5 Time per turn.', file: 'S0-addon-extreme-horror-video.mp4' },
      { name: 'Desperation Die', from: 'Box of Props', what: 'once a game, swap a red die for the black die: +1 success, or a skull and you lose. Includes the Book of Desperate Deaths.', file: 'S0-addon-desperation-die-video.mp4' },
      { name: 'Ultimate Dice', from: 'Box of Props', what: 'take a Tier 1\u20133 die instead of your Ultimate Ability (4/5/6 saves), which cards each die boosts, and Ultimate Desperation.', file: 'S0-addon-ultimate-dice-video.mp4' },
      { name: 'Signature Action cards (Box of Props set)', from: 'Box of Props', what: 'add one to the Action Tableau each game; the 10 cards (Dodge, Meditate, Double Up, Parkour, Discipline, Scavenge, Intimidate, Throw, Ambush, Protect). Most text provisional: cards needed.', file: 'S0-addon-signature-actions-video.mp4' },
      { name: 'Signature Action cards (Guest Stars set)', from: 'Guest Stars Box', what: 'Bribe, Combo, Kick, Prescience, Will to Live. Cards needed.', file: 'S0-addon-signature-actions-2-video.mp4' },
      { name: 'Vehicle Action cards', from: 'Guest Stars Box', what: 'Bone Chariot, Bulldozer, Chopper, Forklift, Van, and how they work with vehicles. Cards needed.', file: 'S0-addon-vehicle-actions-video.mp4' },
      { name: 'Carolyn\u2019s Revenge', from: 'Guest Stars Box', what: 'psychic attacks, teleporting, attuned items and the Psychic Expulsion alternative win, usable against any Killer. Cards needed.', file: 'S0-addon-carolyns-revenge-video.mp4' },
      { name: 'Grandma\u2019s Grudge', from: 'Guest Stars Box', what: 'Grandma\u2019s character pack and Handbag. Cards needed.', file: 'S0-addon-grandmas-grudge-video.mp4' },
      { name: 'Promo and guest Final Girls with special rules', from: 'Box of Props / Guest Stars / promo packs', what: 'Layla (Signature Actions), Agnes (Ultimate Dice), Julia, Constance, Jamie, Paula and Julie: anything their cards change about play.', file: 'S0-addon-promo-final-girls-video.mp4' },
      { name: 'Secret Envelopes and unlockable items', from: 'Core rules / Guest Stars', what: 'when you open an envelope and how the unlocked items join your games.', file: 'S0-addon-secret-envelopes-video.mp4' },
      { name: 'Epic Finales (Series 3)', from: 'S3 Bonus Features Box', what: 'the 5 extra Epic Finale cards and how to add them.', file: 'S0-addon-s3-epic-finales-video.mp4' },
      { name: 'Lore & Scenario Book scenarios', from: 'Series 1\u20134 Lore Books', what: 'how to set up and play a scenario, including any scenario-only rules.', file: 'S0-addon-scenarios-video.mp4' },
      { name: 'Series 4 add-on boxes', from: 'Mausoleum Box, S4 Bonus Features, S3 Accessories Box, Vehicle Pack 3', what: 'check these for any optional rules (contents not yet catalogued) and add a line here for each rule set found.', file: '' },
    ],
  },
  {
    title: 'How-to-play videos for every Killer and Location',
    detail:
      'A narrated, subtitled how-to-play video for each Killer and each Location, shown under the key art on This Game. The rules are explained thoroughly enough to play from; setup and tips stay brief because the app covers them elsewhere. Seasons 1 to 4 and the Specials are done; only the Pods vignette is waiting (see the next item). Videos are made a whole season at a time: copy the prompt in Training videos (below) and give it to Claude with the season filled in.',
    affects: ['This Game', 'Asset Admin'],
    status: VIDEOS_DONE === VIDEOS_TOTAL ? 'done' : VIDEOS_DONE > 0 ? 'partial' : 'todo',
    remaining: `${VIDEOS_TOTAL - VIDEOS_DONE} of ${VIDEOS_TOTAL} videos still to make (${VIDEOS_DONE} done). See Training videos for the list.`,
  },
  {
    title: 'Pods vignette (Terror From Beyond): scan the rules, then make its video',
    detail:
      'The Pods vignette has no rule sheet anywhere yet: it isn\u2019t in the tracker, on RulesPal or on the publisher\u2019s site, and its official name is unconfirmed. When you have the box, scan or photograph the rule sheet and the key cards (Finales, Dark Powers, any special cards), put them in s4-rules-pdf (e.g. FV04_Pods.pdf) and src/assets/games (S4-killer-pods-1.png, -2.png\u2026), add its -flavour.png, and fix the name and setup text in games.js. Then give Claude the Training videos prompt for Season 4: it will only make the missing Pods video (S4-killer-pods-video.mp4).',
    affects: ['This Game', 'Asset Admin', 'Rules Reference'],
    status: 'partial',
    remaining:
      'The key art is in (S4-killer-pods-art.png). Still to do: the rule sheet and key cards scanned, its -flavour.png, its official name and setup text in games.js, then its how-to-play video.',
  },
  // status: 'done' (green) | 'partial' (amber) | 'todo' (red).
  // `remaining` is shown ONLY for 'partial' items — what's left to finish.
  // Keep this RAG + remaining notes current as the app grows.
  {
    title: 'Tips: strategy database with sources per combination',
    detail:
      'A Tips tab with general strategy plus per-Killer and per-Location advice, surfaced for the current selection and searchable via Ask. Built from the Strategy Tips Handbook, each tip carrying its source and a confirmed/reported confidence tag.',
    affects: ['Tips', 'Ask', 'This Game'],
    status: 'done',
  },
  {
    title: 'Codex: browse Killers, Locations & Final Girls',
    detail:
      'A Codex tab to scan art, flavour and at-a-glance rules for every Killer and Location, and both ability faces of every Final Girl, with "Play this" to jump into Setup. Collapsible by season/group.',
    affects: ['Codex', 'Setup Assist'],
    status: 'done',
  },
  {
    title: 'Ask a Question: offline rules search',
    detail:
      'A plain-English rules search over all loaded data (core rules, icons, setup, play rules, phase steps, tips), tailored to the current combination — general rules plus how your Killer/Location change them. Achievements excluded by design.',
    affects: ['Ask'],
    status: 'done',
  },
  {
    title: 'Debrief: post-match mistake tracking & trends',
    detail:
      'Log rules/strategy mistakes at end of game; the Debrief tab groups recurring ones and surfaces reminders before you play that combo again.',
    affects: ['This Game', 'Debrief', 'Game Log'],
    status: 'done',
  },
  {
    title: 'Vignettes: verify Destiny rules/achievements + build all three',
    detail:
      'All three vignettes (Terror From Above / the Birds, Terror From the Grave / the Zombies, Terror From Destiny / Destiny) are built as killer-only entries selectable from the Killer list, with setup, play rules, phase extras, tips and achievements. Destiny\u2019s full rules and its official achievement list were transcribed from the rule sheet and verified.',
    affects: ['Setup Assist', 'This Game', 'Turn Tracker', 'Achievements', 'Asset Admin'],
    status: 'done',
  },
  {
    title: 'Auto-track achievements from wins (incl. vignettes)',
    detail:
      'Win-based achievements (win here, defeat here, five different Locations/Killers) auto-detect from the Game Log, with live progress counts and manual overrides. Vignette "five Locations" achievements auto-track too.',
    affects: ['Achievements', 'MI'],
    status: 'done',
  },
  {
    title: 'Make the full Feature Film Rules PDFs viewable in-app',
    detail:
      'Serve the full-season special-rules PDFs from public/ and add "Open the Feature Film Rules (PDF)" links, mirroring the Core Rules PDF link on Rules Reference.',
    affects: ['This Game', 'Rules Reference'],
    status: 'partial',
    remaining:
      'PDFs are present in public/ (FeatureFilmRules.pdf, _S2, _S3), but no in-app link/viewer is wired up yet. Add links on Rules Reference (and ideally per-season). S4 PDF still to source.',
  },
  {
    title: 'Official scenarios: Series 2-4, specials, vignettes & cross-combos',
    detail:
      'Canon Killer+Location pairings and names in OFFICIAL_SCENARIOS, with vignettes correctly treated as "no official pairing".',
    affects: ['This Game', 'Scenarios'],
    status: 'partial',
    remaining:
      'Series 1-3 pairings + names are wired, and vignettes are handled. Still to add: Series 4 pairings (needs the S4 Killers/Locations added first), the Special Features (Krampus @ Santa\u2019s Village, Mort @ Mega Boardgame Convention), and the Lore-book cross-combo scenario titles (up to 25 per series) which need the books.',
  },
  {
    title: 'Add achievements with each new rules import',
    detail:
      'Every new season/vignette brings its own achievement lists; transcribe them so the end-of-game tickboxes and Achievements tab stay complete.',
    affects: ['This Game', 'Achievements'],
    status: 'partial',
    remaining:
      'Series 1-3 and all three vignettes are fully transcribed. Ongoing: add Series 4 achievements (and any Special Features / promos) when those Killers/Locations are added to the app.',
  },
  {
    title: 'Bespoke Final Girl narration lines',
    detail:
      'Custom spooky Start Game lines per Final Girl, instead of the generic fallback.',
    affects: ['Start Game audio'],
    status: 'partial',
    remaining:
      'Only Laurie, Reiko and Selena have bespoke lines so far; every other Final Girl (Series 1-4, vignettes, specials, promos) still uses the generic fallback. Write lines for the rest.',
  },
  {
    title: 'Best-fit Final Girls for a scenario (with reasons)',
    detail:
      'Setup Assist shows \u201cBest fits by ability\u201d under the official girls once a Killer or Location is picked: the top 5 Final Girls scored out of 10 for that scenario, each with a one-line summary and a \u201cWhy?\u201d listing her matching strengths, weak spots and any special pairing (e.g. Adelaide lowering Wrath against Inkanyamba). Official girls always show their score. The logic is on Codex \u2192 Fit grid: 11 traits, every girl rated 0\u20133, what every Killer and Location rewards, and scores for any combo. Codex \u2192 Fit summary shows every girl against every Killer + Location combo in one colour-coded table (red = poor, green = great), with a gold ring where she is official for that combo (e.g. Laurie under Hans), so highs, lows and official pairings stand out at a glance. Filter by series, then narrow to one Killer or Location (e.g. Series 4 \u2192 The Raptors), and sort by \u201cBest for this selection\u201d to rank the girls for just that, or \u201cBest overall\u201d for every combo. Ratings live in src/data/fgFit.js.',
    affects: ['Setup Assist', 'Codex'],
    status: 'partial',
    remaining: 'Grandma and Gabrielle are still unrated (Grandma\u2019s card shows 1 health, so she needs her Ultimate side first; Gabrielle has no card photos). Julie, Meg and Carolyn are rated from the action side only, so photograph their Ultimate sides to firm them up. Firm up the estimated Killer/Location profiles (mostly Series 4 and specials) from play.',
  },
  {
    title: 'Favourite Final Girls + where each is stored',
    detail:
      'Done. In the Codex \u2192 Final Girls, tap the \u2606 to make one a favourite (e.g. for her abilities), and use \u201cFavourites only\u201d to see just those. Each card shows \u201c\U0001F4E6 Stored in\u201d \u2014 her own Feature Film box by default (e.g. The Happy Trails Horror box); tap Change to set somewhere else for special editions (e.g. Promo binder). Promos start as \u201cnot set yet\u201d. When you pick her, Setup Assist tells you where to find her, and favourites get a \u2605 in the Final Girl list. Synced between phone and PC.',
    affects: ['Codex', 'Setup Assist'],
    status: 'done',
  },
  {
    title: 'Finish the Final Girl card images',
    detail:
      'Most Final Girls now have both card sides in the Codex. Still to do: (1) Joy (A Rotten Harvest) \u2014 her back photo needs labelling/retaking: it\u2019s cropped on the left, so her Health number and the start of the \u201cFor each additional Victim saved\u201d line are cut off. (2) Back still needed: Melanie, Paula, Jamie, Carolyn, Grandma, Julie, Meg. (3) Both sides needed: Patsy, Gabrielle, Mrs. Claus, Cindy the Elf, Adrianne, Maureen, Holiday Paula. Lay 6\u20138 cards face up on a dark surface, one photo straight down, flip them in place, second photo, then send them in the chat saying which box they came from. Done when every Final Girl shows a front and an Ultimate Ability side with nothing cut off.',
    affects: ['Codex', 'This Game', 'Setup Assist'],
    status: 'partial',
  },
  {
    title: 'Secret Envelope marker on each Final Girl',
    detail:
      'Done. Win a (non-test) game with a Final Girl and her Codex card shows a gold \u201c\u2709\ufe0f Envelope unlocked \u2014 open her Secret Envelope!\u201d marker; tap \u201cI\u2019ve opened it\u201d once you have. For games won before the tracker existed, tap \u201cAlready won?\u201d on a sealed card to switch the marker on by hand (e.g. you beat Hans with Laurie last year but never opened her envelope), or \u201cAlready opened?\u201d if it\u2019s been done. \u201cEnvelopes to open\u201d at the top of the Final Girls tab filters to just the ones waiting. The end-of-game screen also reminds you when a win unlocks one. Synced between phone and PC.',
    affects: ['Codex', 'This Game'],
    status: 'done',
  },
  {
    title: 'Setup reminder to bring in an opened envelope item',
    detail:
      'Done. Once a Final Girl\u2019s Secret Envelope is marked \u201cI\u2019ve opened it\u201d in the Codex, picking her in Setup Assist adds a \u201cBring in <her item>\u201d step under Special Setup for This Game. It shows even before a Killer or Location is picked. Item names come from the card data; the few girls with no item named yet get \u201cher Secret Envelope item\u201d instead. A won-but-still-sealed envelope does not add the step.',
    affects: ['Setup Assist', 'Codex'],
    status: 'done',
  },
  {
    title: 'Unlocked items shown in the Setup Final Girl list',
    detail:
      'Done. When you pick a Final Girl in Setup Assist, the list shows a green \u201c\uD83D\uDD13 Unlocked\u201d badge beside every girl whose Secret Envelope is opened (her item can come into the game), and a gold \u201c\u2709\uFE0F To open\u201d badge where you\u2019ve won with her but not opened it yet. Uses the same rules as the Codex marker.',
    affects: ['Setup Assist'],
    status: 'done',
  },
  {
    title: 'Chris to do: scan the Lore & Scenario books',
    detail:
      'Your job before Claude can wire the lore in. Photograph or scan every page of each printed Lore & Scenario book (a phone scanning app like Microsoft Lens or Adobe Scan is fine, one page per image, flat and well lit), then drop them into the chat or a folder on the PC. Example: all 64 pages of the Series 1 book in one go, then Series 2, and so on. Progress: Series 1 \u2014 to scan \u00b7 Series 2 \u2014 to scan \u00b7 Series 3 \u2014 to scan \u00b7 Series 4 \u2014 check whether a book has come out yet.',
    affects: ['You (Chris)'],
    status: 'todo',
  },
  {
    title: 'Lore & Scenario books \u2014 bring in all 4 series',
    detail:
      'Each series has a printed Lore & Scenario book: a backstory for every Killer and Final Girl, tips for playing each Final Girl, and a special scenario for each Killer/Location pair (e.g. a Hans at Camp Happy Trails scenario with its own setup and rules). Van Ryder don\u2019t publish these as free PDFs, so they need scanning from your own copies. Bring them in the same way as the card photos: show the pages as images where they\u2019re relevant (Killer/Final Girl backstory in This Game, scenario rules in Setup Assist and the Turn Tracker), not retyped. Progress: Series 1 \u2014 not started \u00b7 Series 2 \u2014 not started \u00b7 Series 3 \u2014 not started \u00b7 Series 4 \u2014 check a book exists yet. Done when all four are in.',
    affects: ['This Game', 'Setup Assist', 'Turn Tracker', 'Tips', 'Start Game audio'],
    status: 'todo',
  },
  {
    title: 'Gruesome Deaths section',
    detail:
      'Built for Series 1\u20133 (15 books, 2,004 passages). Tap \u201cVictim died\u201d in the Turn Tracker and the matching passage pops up as an image from Van Ryder\u2019s free PDF: the Terror/Event/Dark Power card you logged that turn if it has one (e.g. Fire! asks which spot), otherwise a rolled General Kill for your Killer, with no repeats in a game.',
    affects: ['Turn Tracker'],
    status: 'partial',
    remaining:
      'Series 4 books (none published yet, so S4 deaths show nothing), and the Final Girl\u2019s own death, which the books don\u2019t cover.',
  },
  {
    title: 'Use the full as-written flavour (not paraphrases)',
    detail:
      'Prefer the complete original flavour text over paraphrased narration snippets. Cleanest route is likely the scanned flavour images already shown in This Game — decide the mechanism (copyright) when we pick this up.',
    affects: ['This Game', 'Start Game audio'],
    status: 'todo',
  },
  {
    title: 'Scan win conditions per Killer / Location',
    detail:
      'Each Killer/Location can have different victory conditions (e.g. Poltergeist is won by saving Carolyn). Capture these so the end-of-game record (and maybe in-game tracking) reflects condition-specific outcomes rather than just Won/Lost.',
    affects: ['Game Log', 'Turn Tracker (future)'],
    status: 'todo',
  },
  {
    title: 'Host on phone / iPad (iOS companion)',
    detail:
      'Hosted on GitHub Pages with auto-deploy on every push to main, and installed on the phone as a home-screen app (icon + manifest), with the game log synced across devices via Supabase.',
    affects: ['Whole app', 'Hosting'],
    status: 'done',
  },
  {
    title: 'Set up ElevenLabs for cinematic Start Game audio',
    detail:
      'Replace the robotic browser speech with ElevenLabs TTS. Recommended: pre-generate an .mp3 per narration snippet once and play the files (cinematic, no runtime key, offline). Alternative: live API calls (needs key in app, per-play cost, internet).',
    affects: ['Start Game audio'],
    status: 'todo',
  },
  {
    title: 'Scenario rule icons — add the rest as they\u2019re pulled',
    detail:
      'Scenario-specific rule icons live in src/assets/icons/rules/ with metadata in rule-icons.json. They show in the Icon Reference (Scenario rule icons) and on This Game for the chosen combo. Series 1-3 + vignettes are in; keep extracting any still-missing symbols from the rule sheets and drop them in the folder (filename = the id, add a matching rule-icons.json entry).',
    affects: ['Icon Reference', 'This Game'],
    status: 'partial',
    remaining:
      'Add any remaining per-ruleset symbols you still want (some rule sheets have more icons than are extracted). A few current ones are flagged low-res in the JSON and could be re-captured at higher resolution.',
  },
  {
    title: 'Periodically harvest new online tips (especially Series 4)',
    detail:
      'Community strategy tips keep surfacing over time as more people play, so revisit the web periodically and fold new ones into the Tips data (generalTips / killerTips / locationTips in src/data/games.js), each with its source and a confirmed/reported confidence tag like the existing ones. Series 4 is the priority: it is newest and under-covered, and tips will grow as it gets played around the world \u2014 watch for per-Killer and per-Location advice for Billy/Buddyland, Grimlash/Shady Acres, Berith/L\u2019Armes Abbey, The Volk\u2019ar/Pesadilla Verde, The Raptors/Isla Lagarto, and the Shriek Special Feature (Mort). Also backfill the S1\u2013S3 combos as new guides appear. Good sources to sweep: BoardGameGeek forums/strategy threads, the Final Girl wiki, YouTube playthrough/strategy channels (e.g. Dude Take Your Turn), Reddit, and Van Ryder\u2019s own posts. Rough cadence: every few months, and whenever a new S4 box hits the table.',
    affects: ['Tips', 'Ask', 'This Game'],
    status: 'partial',
    remaining:
      'Ongoing by design. Series 4 has 33 tips so far (most Killers and Locations covered, from reviews and the Strategy Tips Handbook). Next sweep: fill gaps for The Raptors / Isla Lagarto and Shriek, then top up S1\u2013S3 every few months.',
  },
  {
    title: 'Final Girl Series 4 \u2013 card reference sheet',
    detail:
      'A searchable, sortable reference of every card in each Series 4 Feature Film, built from photos of the physical cards. One section per film: Bad Times at Buddyland (Billy the Bear / Buddyland), A Rotten Harvest (Grimlash / Shady Acres), A Demon in the Shadows (Berith / L\u2019Armes Abbey), The Green Terror (The Volk\u2019ar / Pesadilla Verde), The Raptor Games (The Raptors / Isla Lagarto), and Shriek \u2013 Special Feature (Mort / Mega Board Game Con). Capture per Location and Killer: Terror cards (Location and Killer decks kept separate), Setup cards, Item cards (noting the Search space / Item deck where shown), Event cards, and killer-specific extras where present (Buddy cards, Harvest Madness, Raptor Spawn, Volk\u2019ar Movement, Clue/Suspect cards) plus Dark Power, Epic Dark Power, Finale and Epic Finale cards. Fields per card: Feature Film, Source (Location or Killer), Card type, Card name, Flavour text, full Effect text, key stats where relevant (range, damage, hands, one-time/limited use, weapon/reaction/passive), and Notes (e.g. clarifications from the rules PDF \u201CCard Notes\u201D section). Input: uploaded photos of each deck spread on a table, cross-checked against the official rules PDFs on the Van Ryder Games product pages; flag any card whose text isn\u2019t legible rather than guessing. Output: a single filterable view (filter by Feature Film, Location/Killer and card type, free-text search across names and effect text), also exportable as a spreadsheet. Waiting on card photos.',
    affects: ['Codex', 'Card data', 'Export'],
    status: 'partial',
    remaining:
      'The card data for all five Series 4 films and Shriek is in (about 160 Series 4 cards: Finales, Dark Powers, Terror, Setup, Event and Item cards, plus special cards), and Codex \u2192 All cards already gives the searchable, filterable view. Still to do: The Raptors and Isla Lagarto are thin (only 1 Finale, 4 Raptor Terror cards; no Isla Lagarto Setup cards, 4 Events, 1 Terror card), and the text hasn\u2019t been checked against photos of the real cards.',
  },
  {
    title: 'Series 4 icons \u2014 add with the S4 import',
    detail:
      'Done. All 10 Series 4 Killer and Location emblems are in src/assets/icons/ (e.g. S4-killer-grimlash-icon.png), and 62 Series 4 scenario rule icons are in src/assets/icons/rules/ with their rule-icons.json entries, so the S4 entries show their icons in the Codex, This Game, Scenarios, Tips and the pickers. Any S4 box added later (e.g. the Pods vignette) needs its icons adding the same way.',
    affects: ['Codex', 'This Game', 'Scenarios', 'Icon Reference', 'Asset Admin'],
    status: 'done',
  },
];

/* The full backlog shown on this screen = the hand-kept list above PLUS the
   feature items from BACKLOG.md. Those come from src/data/backlogAuto.json,
   which scripts/update-backlog.mjs regenerates (with RAG checked against the
   code) on every build — edit the script, not the JSON. */
// Sorted red (not started) → amber (in progress) → green (done); original
// order is kept within each group (Array.sort is stable).
const STATUS_ORDER = { todo: 0, partial: 1, done: 2 };
function sortBacklog(items) {
  return [...items].sort((a, b) => (STATUS_ORDER[a.status] ?? 0) - (STATUS_ORDER[b.status] ?? 0));
}

/* Item card photos to take. SPOILER RULE: only girls whose envelope you've
   marked OPENED in the Codex are counted or named, and the item itself is
   never named here (it shows on her line in the Final Girls section). */
function itemPhotosBacklog(opened) {
  const girls = finalGirls.filter((g) => opened.has(g.id));
  const have = girls.filter((g) => getFinalGirlEnvelopeImage(g)).map((g) => g.name);
  const need = girls.filter((g) => !getFinalGirlEnvelopeImage(g)).map((g) => g.name);
  const detail =
    'A photo of each opened Secret Envelope item card, shown in the Codex and Setup Assist. Nothing is named or asked for until you mark a Final Girl\u2019s envelope \u201cI\u2019ve opened it\u201d in the Codex; then her line in the Final Girls section below shows the item and the file name to use. Photograph it with other cards on a dark surface and send it in the chat; Claude cuts it out and names it.';
  if (need.length === 0) {
    return { title: 'Secret Envelope item card photos', detail, affects: ['Codex', 'Setup Assist', 'Asset Admin'], status: 'done' };
  }
  return {
    title: 'Secret Envelope item card photos',
    detail,
    affects: ['Codex', 'Setup Assist', 'Asset Admin'],
    status: have.length ? 'partial' : 'todo',
    remaining: `Opened envelopes still needing an item card photo: ${need.join(', ')}.`,
  };
}

const STATUS_META = {
  done: { label: 'Done', cls: 'done' },
  partial: { label: 'In progress', cls: 'partial' },
  todo: { label: 'Not started', cls: 'todo' },
};

/* Every collapsible panel that holds asset entries: each section (Final Girls /
   Killers / Locations), each season group inside it, and Scenario graphics.
   Built from the data so a new season is picked up automatically. */
const ENTRY_KEYS = [
  ...SECTIONS.flatMap((s) => [
    s.type,
    ...[...new Set(s.entries.map((e) => e.season))].map((n) => `${s.type}-s${n}`),
  ]),
  'scenario-graphics',
];

/* The screen opens fully collapsed so you can jump straight to the section you
   want. (backlogDone is deliberately left out: for that one key, true means
   "shown", and the done list is meant to start hidden.) */
const startCollapsed = () =>
  Object.fromEntries(['howto', 'backlog', 'videos', ...ENTRY_KEYS].map((k) => [k, true]));

export default function Admin() {
  const [query, setQuery] = useState('');
  const collection = useFgCollection();
  const opened = useMemo(
    () => new Set(Object.keys(collection.envelopes).filter((id) => collection.envelopes[id] === 'opened')),
    [collection.envelopes]
  );
  const ALL_BACKLOG = useMemo(
    () => sortBacklog([...BACKLOG, itemPhotosBacklog(opened), ...BACKLOG_AUTO]),
    [opened]
  );
  const OPEN_BACKLOG = ALL_BACKLOG.filter((i) => i.status !== 'done');
  const DONE_BACKLOG = ALL_BACKLOG.filter((i) => i.status === 'done');
  const [copied, setCopied] = useState(false);
  function copyPrompt() {
    navigator.clipboard?.writeText(VIDEO_PROMPT).then(
      () => { setCopied(true); setTimeout(() => setCopied(false), 2000); },
      () => setCopied(false)
    );
  }
  const [onlyMissing, setOnlyMissing] = useState(false);
  // Collapsed state per panel (true = collapsed). Default: everything collapsed.
  const [collapsed, setCollapsed] = useState(startCollapsed);

  const q = query.trim().toLowerCase();

  const sections = useMemo(() => {
    return SECTIONS.map((section) => {
      let entries = section.entries;
      if (q) {
        entries = entries.filter((e) =>
          (e.name + ' ' + e.film + ' ' + e.shortName).toLowerCase().includes(q)
        );
      }
      if (onlyMissing) {
        entries = entries.filter((e) => !entryStatus(section.type, e, opened).complete);
      }
      // Section-level completeness (over the FULL set, not the filtered view).
      const done = section.entries.filter((e) => entryStatus(section.type, e, opened).complete).length;

      // Group the (filtered) entries by season, ascending.
      const bySeason = {};
      for (const e of entries) {
        (bySeason[e.season] ||= []).push(e);
      }
      const seasons = Object.keys(bySeason)
        .map(Number)
        .sort((a, b) => a - b)
        .map((season) => {
          const seasonEntries = bySeason[season];
          const seasonDone = seasonEntries.filter((e) => entryStatus(section.type, e, opened).complete).length;
          return { season, entries: seasonEntries, done: seasonDone };
        });

      return { ...section, entries, seasons, done, totalEntries: section.entries.length };
    });
  }, [q, onlyMissing, opened]);

  // Open every entry panel. Used when a filter starts, so the matches are
  // visible instead of sitting behind closed headers.
  function expandEntries() {
    setCollapsed((c) => ({ ...c, ...Object.fromEntries(ENTRY_KEYS.map((k) => [k, false])) }));
  }

  function toggleSection(type) {
    setCollapsed((c) => ({ ...c, [type]: !c[type] }));
  }

  // One backlog card (shared by the open and the done lists).
  const renderBacklogItem = (item) => {
    const meta = STATUS_META[item.status] || STATUS_META.todo;
    return (
      <li key={item.title} className={'admin-backlog__item admin-backlog__item--' + meta.cls}>
        <h3 className="admin-backlog__item-title">
          <span className={'admin-rag-dot admin-rag-dot--' + meta.cls} aria-hidden="true" />
          {item.title}
          <span className={'admin-rag admin-rag--' + meta.cls}>{meta.label}</span>
        </h3>
        <p className="admin-backlog__item-detail">{item.detail}</p>
        {item.list && (
          <ul className="admin-backlog__list-rules">
            {item.list.map((r) => (
              <li key={r.name}>
                <strong>{r.name}</strong>
                {r.from && <span className="fg-type"> ({r.from})</span>}
                {' \u2014 '}{r.what}
                {r.file && <> <code className="admin-backlog__file">{r.file}</code></>}
              </li>
            ))}
          </ul>
        )}
        {item.status === 'partial' && item.remaining && (
          <p className="admin-backlog__remaining">
            <strong>Still to do:</strong> {item.remaining}
          </p>
        )}
        <div className="admin-backlog__affects">
          {item.affects.map((a) => (
            <span key={a} className="fg-tag">{a}</span>
          ))}
          {item.auto && <span className="fg-tag admin-backlog__auto">Auto-tracked</span>}
        </div>
      </li>
    );
  };

  // Done items are tucked behind a toggle (collapsed by default).
  const showDone = !!collapsed.backlogDone;

  // RAG tally for the backlog header.
  const backlogCounts = useMemo(() => {
    const c = { done: 0, partial: 0, todo: 0 };
    for (const item of ALL_BACKLOG) c[item.status || 'todo'] += 1;
    return c;
  }, [ALL_BACKLOG]);

  // Scenario title graphics (official pairings + vignettes), filtered like
  // the rest of the admin view.
  const scenarioAssets = useMemo(() => {
    let list = getScenarioAssetList();
    if (q) list = list.filter((s) => (s.label + ' ' + s.sub + ' ' + s.file).toLowerCase().includes(q));
    if (onlyMissing) list = list.filter((s) => !s.present);
    return list;
  }, [q, onlyMissing]);
  const scenarioDone = useMemo(
    () => getScenarioAssetList().filter((s) => s.present).length,
    []
  );
  const scenarioTotal = useMemo(() => getScenarioAssetList().length, []);

  // Overall asset readiness across every slot we track (art/flavour/rules for
  // killers & locations; front/back for final girls). Motivating %.
  const readiness = useMemo(() => {
    const perSection = SECTIONS.map((section) => {
      let present = 0;
      let total = 0;
      for (const entry of section.entries) {
        const s = entryStatus(section.type, entry, opened);
        present += s.present;
        total += s.total;
      }
      return { title: section.title, present, total, pct: total ? Math.round((present / total) * 100) : 0 };
    });
    const present = perSection.reduce((n, s) => n + s.present, 0);
    const total = perSection.reduce((n, s) => n + s.total, 0);
    return { perSection, present, total, pct: total ? Math.round((present / total) * 100) : 0 };
  }, [opened]);

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">Behind the screen</p>
        <h1>Asset Admin</h1>
        <p className="lead">
          A live checklist of every image the app expects, cross-referenced against what
          is actually in the folder. Green tick = added; red cross = still missing.
        </p>
      </div>

      <div className="admin-readiness fg-panel">
        <div className="admin-readiness__top">
          <span className="admin-readiness__pct">{readiness.pct}%</span>
          <div className="admin-readiness__label">
            <strong>Assets ready</strong>
            <span className="fg-type">{readiness.present} of {readiness.total} image slots filled</span>
          </div>
        </div>
        <div className="admin-readiness__bar">
          <div className="admin-readiness__fill" style={{ width: `${readiness.pct}%` }} />
        </div>
        <div className="admin-readiness__breakdown">
          {readiness.perSection.map((s) => (
            <span key={s.title} className="admin-readiness__chip">
              {s.title}: <strong>{s.pct}%</strong>
              <span className="fg-type"> ({s.present}/{s.total})</span>
            </span>
          ))}
        </div>
      </div>

      <div className="admin-howto fg-panel">
        <button
          className="admin-panel-toggle"
          onClick={() => toggleSection('howto')}
          aria-expanded={!collapsed.howto}
        >
          <span className="admin-panel-toggle__caret" aria-hidden="true">
            {collapsed.howto ? '\u25B6' : '\u25BC'}
          </span>
          <h2 className="admin-howto__title">How to add an asset</h2>
        </button>

        {!collapsed.howto && (
        <div className="admin-howto__body">
        <div className="admin-twostep">
          <div className="admin-twostep__item">
            <span className="admin-twostep__num">1</span>
            <div>
              <h3>Images &mdash; just add the file</h3>
              <p>
                Art, flavour, card faces and rule-sheet pages all display automatically.
                Drop the PNG in the folder with the right name and refresh — no step back
                in Kiro needed.
              </p>
            </div>
          </div>
          <div className="admin-twostep__item">
            <span className="admin-twostep__num">2</span>
            <div>
              <h3>Written rules &mdash; ask Kiro</h3>
              <p>
                The special <strong>setup steps</strong> and <strong>play-rules
                summaries</strong> are text Kiro writes by reading the rulebook. The app
                can&rsquo;t read a rule-sheet image. For a <em>new</em> Killer or Location,
                add the images <em>and</em> tell Kiro:{' '}
                <em>&ldquo;read and add the special rules for [name].&rdquo;</em> Season 1
                is already done.
              </p>
            </div>
          </div>
        </div>

        <h3 className="admin-howto__sub">Adding image files</h3>
        <ol className="admin-steps">
          <li>
            Save your PNG into this folder (relative to the project root):
            <span className="admin-folder"><code>{ASSETS_FOLDER}</code></span>
          </li>
          <li>Name it using the convention for its type (below). Names are lower-case and must match exactly.</li>
          <li>Refresh the page — new images are picked up automatically (no server restart needed).</li>
          <li>Come back here: the item&rsquo;s marker turns from a red cross to a green tick.</li>
        </ol>

        <div className="admin-naming">
          <div className="admin-naming__type">
            <h3>Final Girl</h3>
            <ul>
              <li><code>S&#123;season&#125;-finalgirl-&#123;shortName&#125;-front.png</code></li>
              <li><code>S&#123;season&#125;-finalgirl-&#123;shortName&#125;-back.png</code></li>
            </ul>
          </div>
          <div className="admin-naming__type">
            <h3>Killer</h3>
            <ul>
              <li><code>S&#123;season&#125;-killer-&#123;shortName&#125;-art.png</code></li>
              <li><code>S&#123;season&#125;-killer-&#123;shortName&#125;-flavour.png</code></li>
              <li><code>S&#123;season&#125;-killer-&#123;shortName&#125;-1.png</code>, <code>-2.png</code>, &hellip; (rules pages)</li>
              <li><code>S&#123;season&#125;-killer-&#123;shortName&#125;-icon.png</code> &mdash; in the <code>icons/</code> folder</li>
            </ul>
          </div>
          <div className="admin-naming__type">
            <h3>Location</h3>
            <ul>
              <li><code>S&#123;season&#125;-location-&#123;shortName&#125;-art.png</code></li>
              <li><code>S&#123;season&#125;-location-&#123;shortName&#125;-flavour.png</code></li>
              <li><code>S&#123;season&#125;-location-&#123;shortName&#125;-1.png</code>, <code>-2.png</code>, &hellip; (rules pages)</li>
              <li><code>S&#123;season&#125;-location-&#123;shortName&#125;-icon.png</code> &mdash; in the <code>icons/</code> folder</li>
              <li><code>S&#123;season&#125;-location-&#123;shortName&#125;-board.jpg</code> &mdash; sharp, straightened board photo (used in the how-to videos)</li>
            </ul>
          </div>
          <div className="admin-naming__type">
            <h3>Scenario graphic</h3>
            <ul>
              <li>Official: <code>S&#123;killerSeason&#125;-scenario-&#123;killerShortName&#125;-&#123;locationShortName&#125;.png</code></li>
              <li>Vignette: <code>S&#123;season&#125;-scenario-&#123;vignetteShortName&#125;.png</code></li>
            </ul>
          </div>
        </div>
        <p className="fg-type admin-restart-note">
          Icons live in <code>src/assets/icons/</code> (not the games folder) and show
          throughout the app &mdash; Codex, This Game, Scenarios and Tips.
        </p>
        <p className="fg-type admin-restart-note">
          The &ldquo;Rules pages&rdquo; marker is a single check for the whole set — it
          goes green once at least one numbered page is present. Number pages
          contiguously from 1. If a page doesn&rsquo;t appear after a refresh, give it a
          second (the file watcher polls) or reload once more.
        </p>
        </div>
        )}
      </div>

      <div className="admin-backlog fg-panel">
        <button
          className="admin-panel-toggle"
          onClick={() => toggleSection('backlog')}
          aria-expanded={!collapsed.backlog}
        >
          <span className="admin-panel-toggle__caret" aria-hidden="true">
            {collapsed.backlog ? '\u25B6' : '\u25BC'}
          </span>
          <h2 className="admin-backlog__title">
            Backlog &mdash; progress
            <span className="admin-backlog__rag">
              <span className="admin-rag admin-rag--done">{backlogCounts.done} done</span>
              <span className="admin-rag admin-rag--partial">{backlogCounts.partial} in progress</span>
              <span className="admin-rag admin-rag--todo">{backlogCounts.todo} not started</span>
            </span>
          </h2>
        </button>

        {!collapsed.backlog && (
        <div className="admin-backlog__body">
        <p className="admin-backlog__intro fg-type">
          Where each planned feature stands. Green = done, amber = in progress (with
          what&rsquo;s left), red = not started. Items tagged <em>Auto-tracked</em> come
          from BACKLOG.md and have their status checked against the code on every build.
        </p>
        <ul className="admin-backlog__list">
          {OPEN_BACKLOG.map(renderBacklogItem)}
        </ul>
        <button
          className="admin-backlog__done-toggle"
          onClick={() => toggleSection('backlogDone')}
          aria-expanded={!!showDone}
        >
          <span aria-hidden="true">{showDone ? '\u25BC' : '\u25B6'}</span>
          {showDone ? 'Hide' : 'Show'} {DONE_BACKLOG.length} done item{DONE_BACKLOG.length === 1 ? '' : 's'}
        </button>
        {showDone && (
        <ul className="admin-backlog__list">
          {DONE_BACKLOG.map(renderBacklogItem)}
        </ul>
        )}
        </div>
        )}
      </div>

      <div className="admin-howto admin-videos fg-panel">
        <button
          className="admin-panel-toggle"
          onClick={() => toggleSection('videos')}
          aria-expanded={!collapsed.videos}
        >
          <span className="admin-panel-toggle__caret" aria-hidden="true">
            {collapsed.videos ? '\u25B6' : '\u25BC'}
          </span>
          <h2 className="admin-howto__title">
            Training videos
            <span className={'admin-section__count' + (VIDEOS_DONE === VIDEOS_TOTAL ? ' is-complete' : '')}>
              {VIDEOS_DONE}/{VIDEOS_TOTAL} made
            </span>
          </h2>
        </button>

        {!collapsed.videos && (
        <div className="admin-howto__body">
          <p className="fg-type">
            Each Killer and Location gets a short How-to-play video, shown under its key art
            on This Game (with a &ldquo;coming soon&rdquo; placeholder until it&rsquo;s added).
            Videos live in <code>{VIDEOS_FOLDER}</code> and must be named exactly:
          </p>
          <ul className="admin-videos__names">
            <li><code>S&#123;season&#125;-killer-&#123;shortName&#125;-video.mp4</code></li>
            <li><code>S&#123;season&#125;-location-&#123;shortName&#125;-video.mp4</code></li>
          </ul>

          <h3 className="admin-howto__sub">Prompt for a season of videos</h3>
          <p className="fg-type">
            Copy this, fill in [SEASON], and give it to Claude. It makes every missing video for
            that season in one go, using the same builder, so they all come out in the same format.
            Rules are explained thoroughly; setup and tips stay brief.
          </p>
          <div className="admin-videos__prompt-wrap">
            <button className="fg-btn admin-videos__copy" onClick={copyPrompt}>
              {copied ? 'Copied \u2713' : 'Copy prompt'}
            </button>
            <pre className="admin-videos__prompt">{VIDEO_PROMPT}</pre>
          </div>

          <h3 className="admin-howto__sub">Checklist</h3>
          <ul className="admin-asset-list admin-videos__list">
            {VIDEO_LIST.map((v) => (
              <li key={v.file} className={'admin-asset' + (v.present ? ' is-present' : '')}>
                <span className={'admin-asset__status ' + (v.present ? 'is-ok' : 'is-missing')}>
                  {v.present ? '\u2713' : '\u2715'}
                </span>
                <span className="admin-asset__label">
                  {v.entry.name} <span className="fg-type">({v.type === 'killer' ? 'Killer' : 'Location'})</span>
                </span>
                <code className="admin-asset__file">{v.file}</code>
              </li>
            ))}
          </ul>
        </div>
        )}
      </div>

      <div className="admin-controls">
        <div className="admin-search">
          <span className="admin-search__icon" aria-hidden="true">&#128269;</span>
          <input
            type="search"
            value={query}
            onChange={(e) => {
              if (!query && e.target.value) expandEntries();
              setQuery(e.target.value);
            }}
            placeholder="Filter by name, film or short name..."
            aria-label="Filter assets"
          />
          {query && (
            <button className="admin-search__clear" onClick={() => setQuery('')} aria-label="Clear filter">
              &times;
            </button>
          )}
        </div>
        <label className="admin-toggle">
          <input
            type="checkbox"
            checked={onlyMissing}
            onChange={(e) => {
              if (e.target.checked) expandEntries();
              setOnlyMissing(e.target.checked);
            }}
          />
          Only show items with missing assets
        </label>
      </div>

      {sections.map((section) => {
        const isCollapsed = !!collapsed[section.type];
        const sectionComplete = section.done === section.totalEntries;
        return (
          <section key={section.type} className="admin-section">
            <button
              className="admin-section__title"
              onClick={() => toggleSection(section.type)}
              aria-expanded={!isCollapsed}
            >
              <span className="admin-section__caret" aria-hidden="true">
                {isCollapsed ? '\u25B6' : '\u25BC'}
              </span>
              {section.title}
              <span
                className={'admin-section__count' + (sectionComplete ? ' is-complete' : '')}
              >
                {section.done}/{section.totalEntries} complete
              </span>
            </button>

            {!isCollapsed && (
              section.entries.length === 0 ? (
                <p className="admin-empty fg-type">Nothing matches the current filter.</p>
              ) : (
                section.seasons.map((grp) => {
                  const seasonKey = `${section.type}-s${grp.season}`;
                  const seasonCollapsed = !!collapsed[seasonKey];
                  const seasonComplete = grp.done === grp.entries.length;
                  return (
                    <div key={seasonKey} className="admin-season">
                      <button
                        className="admin-season__title"
                        onClick={() => toggleSection(seasonKey)}
                        aria-expanded={!seasonCollapsed}
                      >
                        <span className="admin-season__caret" aria-hidden="true">
                          {seasonCollapsed ? '\u25B6' : '\u25BC'}
                        </span>
                        Season {grp.season}
                        <span
                          className={'admin-season__count' + (seasonComplete ? ' is-complete' : '')}
                        >
                          {grp.done}/{grp.entries.length} complete
                        </span>
                      </button>
                      {!seasonCollapsed && (
                        <div className="admin-grid">
                          {grp.entries.map((entry) => (
                            <EntryCard key={entry.id} type={section.type} entry={entry} opened={opened} />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )
            )}
          </section>
        );
      })}

      <section className="admin-section">
        <button
          className="admin-section__title"
          onClick={() => toggleSection('scenario-graphics')}
          aria-expanded={!collapsed['scenario-graphics']}
        >
          <span className="admin-section__caret" aria-hidden="true">
            {collapsed['scenario-graphics'] ? '\u25B6' : '\u25BC'}
          </span>
          Scenario graphics
          <span className={'admin-section__count' + (scenarioDone === scenarioTotal ? ' is-complete' : '')}>
            {scenarioDone}/{scenarioTotal} complete
          </span>
        </button>
        {!collapsed['scenario-graphics'] && (
          <>
            <p className="admin-empty fg-type" style={{ marginBottom: '0.8rem' }}>
              The big title image shown at the top of This Game for an official
              Killer+Location scenario or a vignette. Drop the PNG in{' '}
              <code>{ASSETS_FOLDER}</code> with the filename shown.
            </p>
            {scenarioAssets.length === 0 ? (
              <p className="admin-empty fg-type">Nothing matches the current filter.</p>
            ) : (
              <div className="admin-grid">
                {scenarioAssets.map((s) => (
                  <article key={s.key} className={'admin-entry fg-panel' + (s.present ? ' is-complete' : '')}>
                    <header className="admin-entry__head">
                      <h3 className="admin-entry__name">{s.label}</h3>
                      <span className="admin-entry__meta">
                        {s.sub} &middot; {s.kind === 'vignette' ? 'Vignette' : `S${s.season}`}
                      </span>
                      <span className={'admin-entry__count' + (s.present ? ' is-complete' : '')}>
                        {s.present ? 'Added' : 'Missing'}
                      </span>
                    </header>
                    <ul className="admin-asset-list">
                      <li className={'admin-asset' + (s.present ? ' is-present' : '')}>
                        <span className={'admin-asset__status ' + (s.present ? 'is-ok' : 'is-missing')}>
                          {s.present ? '\u2713' : '\u2715'}
                        </span>
                        <span className="admin-asset__label">Scenario graphic</span>
                        <code className="admin-asset__file">{s.file}</code>
                      </li>
                    </ul>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
