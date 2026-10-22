/* ==========================================================================
   Final Girl — Killers & Locations (for the "This Game" feature)
   Season 1 Feature Films. Extra rules are shown as page images supplied by
   the user, for personal, non-commercial fan use.

   Asset naming conventions (images live in src/assets/games/):
     Rules pages:  S{season}-{killer|location}-{shortName}-{page}.png
                   e.g. S1-killer-hans-1.png, S1-location-camp-happy-trails-2.png
     Key art:      S{season}-{killer|location}-{shortName}-art.png
                   e.g. S1-killer-hans-art.png
     Flavour text: S{season}-{killer|location}-{shortName}-flavour.png
                   e.g. S1-killer-hans-flavour.png
   ========================================================================== */

export const killers = [
  // Series 1
  { id: 'hans', season: 1, name: 'Hans the Butcher', shortName: 'hans', film: 'The Happy Trails Horror' },
  { id: 'poltergeist', season: 1, name: 'The Poltergeist', shortName: 'poltergeist', film: 'The Haunting of Creech Manor' },
  { id: 'inkanyamba', season: 1, name: 'Inkanyamba', shortName: 'inkanyamba', film: 'Slaughter in the Groves' },
  { id: 'geppetto', season: 1, name: 'Geppetto', shortName: 'geppetto', film: 'Carnage at the Carnival' },
  { id: 'dr-fright', season: 1, name: 'Dr. Fright', shortName: 'dr-fright', film: 'Frightmare on Maple Lane' },
  // Series 2
  { id: 'evomorph', season: 2, name: 'The Evomorph', shortName: 'evomorph', film: 'Into the Void' },
  { id: 'organism', season: 2, name: 'The Organism', shortName: 'organism', film: 'Panic at Station 2891' },
  { id: 'intruders', season: 2, name: 'The Intruders', shortName: 'intruders', film: 'A Knock at the Door' },
  { id: 'big-bad-wolf', season: 2, name: 'The Big Bad Wolf', shortName: 'big-bad-wolf', film: 'Once Upon a Full Moon' },
  { id: 'ratchet-lady', season: 2, name: 'The Ratchet Lady', shortName: 'ratchet-lady', film: 'Madness in the Dark' },
  // Series 3
  { id: 'hunter', season: 3, name: 'The H.U.N.T.E.R.', shortName: 'hunter', film: 'The Killer from Tomorrow' },
  { id: 'razorface', season: 3, name: 'Razorface', shortName: 'razorface', film: 'Hell to Pay' },
  { id: 'slayer', season: 3, name: 'Slayer', shortName: 'slayer', film: 'The Falconwood Files' },
  { id: 'tormentor', season: 3, name: 'The Tormentor', shortName: 'tormentor', film: 'The Marrek Murders' },
  { id: 'eyeless', season: 3, name: 'The Eyeless', shortName: 'eyeless', film: "Don't Make a Sound" },
  // Vignettes — killer-only, no fixed Location, playable with any Location.
  // isVignette flags the different data shape (no official-scenario pairing).
  { id: 'the-birds', season: 1, name: 'The Birds', shortName: 'the-birds', film: 'Terror From Above', isVignette: true },
  { id: 'patsy-zombies', season: 2, name: 'The Zombies', shortName: 'patsy-zombies', film: 'Terror From the Grave', isVignette: true },
  { id: 'destiny', season: 3, name: 'Destiny', shortName: 'destiny', film: 'Terror From Destiny', isVignette: true },
];

export const locations = [
  // Series 1
  { id: 'camp-happy-trails', season: 1, name: 'Camp Happy Trails', shortName: 'camp-happy-trails', film: 'The Happy Trails Horror' },
  { id: 'creech-manor', season: 1, name: 'Creech Manor', shortName: 'creech-manor', film: 'The Haunting of Creech Manor' },
  { id: 'sacred-groves', season: 1, name: 'The Sacred Groves', shortName: 'sacred-groves', film: 'Slaughter in the Groves' },
  { id: 'carnival-of-blood', season: 1, name: 'The Carnival of Blood', shortName: 'carnival-of-blood', film: 'Carnage at the Carnival' },
  { id: 'maple-lane', season: 1, name: 'Maple Lane', shortName: 'maple-lane', film: 'Frightmare on Maple Lane' },
  // Series 2
  { id: 'uss-konrad', season: 2, name: 'The USS Konrad', shortName: 'uss-konrad', film: 'Into the Void' },
  { id: 'station-2891', season: 2, name: 'Station 2891', shortName: 'station-2891', film: 'Panic at Station 2891' },
  { id: 'wingard-cottage', season: 2, name: 'Wingard Cottage', shortName: 'wingard-cottage', film: 'A Knock at the Door' },
  { id: 'storybook-woods', season: 2, name: 'Storybook Woods', shortName: 'storybook-woods', film: 'Once Upon a Full Moon' },
  { id: 'wolfe-asylum', season: 2, name: 'Wolfe Asylum', shortName: 'wolfe-asylum', film: 'Madness in the Dark' },
  // Series 3
  { id: 'sunnydaze-mall', season: 3, name: 'Sunnydaze Mall', shortName: 'sunnydaze-mall', film: 'The Killer from Tomorrow' },
  { id: 'hellscape', season: 3, name: 'The Hellscape', shortName: 'hellscape', film: 'Hell to Pay' },
  { id: 'falconwood', season: 3, name: 'Falconwood', shortName: 'falconwood', film: 'The Falconwood Files' },
  { id: 'marrek-warehouse', season: 3, name: 'Marrek Warehouse', shortName: 'marrek-warehouse', film: 'The Marrek Murders' },
  { id: 'utopia', season: 3, name: 'Utopia', shortName: 'utopia', film: "Don't Make a Sound" },
];

/* --------------------------------------------------------------------------
   Final Girls.
   Provided per episode/box, but any Final Girl can be played with any Killer
   and Location. `group` drives the dropdown's optgroup. `season` sets the
   asset prefix. `note` flags entries the user still needs to verify.

   Asset naming (front/back of the card):
     S{season}-finalgirl-{shortName}-front.png
     S{season}-finalgirl-{shortName}-back.png
   -------------------------------------------------------------------------- */
export const finalGirls = [
  // Series 1
  { id: 'laurie', season: 1, name: 'Laurie', shortName: 'laurie', group: 'Series 1', film: 'The Happy Trails Horror' },
  { id: 'reiko', season: 1, name: 'Reiko', shortName: 'reiko', group: 'Series 1', film: 'The Happy Trails Horror' },
  { id: 'selena', season: 1, name: 'Selena', shortName: 'selena', group: 'Series 1', film: 'The Haunting of Creech Manor' },
  { id: 'alice', season: 1, name: 'Alice', shortName: 'alice', group: 'Series 1', film: 'The Haunting of Creech Manor' },
  { id: 'adelaide', season: 1, name: 'Adelaide', shortName: 'adelaide', group: 'Series 1', film: 'Slaughter in the Groves' },
  { id: 'barbara', season: 1, name: 'Barbara', shortName: 'barbara', group: 'Series 1', film: 'Slaughter in the Groves' },
  { id: 'asami', season: 1, name: 'Asami', shortName: 'asami', group: 'Series 1', film: 'Carnage at the Carnival' },
  { id: 'charlie', season: 1, name: 'Charlie', shortName: 'charlie', group: 'Series 1', film: 'Carnage at the Carnival' },
  { id: 'nancy', season: 1, name: 'Nancy', shortName: 'nancy', group: 'Series 1', film: 'Frightmare on Maple Lane' },
  { id: 'sheila', season: 1, name: 'Sheila', shortName: 'sheila', group: 'Series 1', film: 'Frightmare on Maple Lane' },

  // Series 2
  { id: 'ellen', season: 2, name: 'Ellen', shortName: 'ellen', group: 'Series 2', film: 'Into the Void' },
  { id: 'jenette', season: 2, name: 'Jenette', shortName: 'jenette', group: 'Series 2', film: 'Into the Void' },
  { id: 'kate', season: 2, name: 'Kate', shortName: 'kate', group: 'Series 2', film: 'Panic at Station 2891' },
  { id: 'uki', season: 2, name: 'Uki', shortName: 'uki', group: 'Series 2', film: 'Panic at Station 2891' },
  { id: 'ginny', season: 2, name: 'Ginny', shortName: 'ginny', group: 'Series 2', film: 'A Knock at the Door' },
  { id: 'ava', season: 2, name: 'Ava', shortName: 'ava', group: 'Series 2', film: 'A Knock at the Door' },
  { id: 'red', season: 2, name: 'Red', shortName: 'red', group: 'Series 2', film: 'Once Upon a Full Moon' },
  { id: 'gretel', season: 2, name: 'Gretel', shortName: 'gretel', group: 'Series 2', film: 'Once Upon a Full Moon' },
  { id: 'heather', season: 2, name: 'Heather', shortName: 'heather', group: 'Series 2', film: 'Madness in the Dark' },
  { id: 'veronica', season: 2, name: 'Veronica', shortName: 'veronica', group: 'Series 2', film: 'Madness in the Dark' },

  // Series 3
  { id: 'tali', season: 3, name: 'Tali', shortName: 'tali', group: 'Series 3', film: 'The Killer from Tomorrow' },
  { id: 'kat', season: 3, name: 'Kat', shortName: 'kat', group: 'Series 3', film: 'The Killer from Tomorrow' },
  { id: 'christie', season: 3, name: 'Christie', shortName: 'christie', group: 'Series 3', film: 'Hell to Pay' },
  { id: 'kenzie', season: 3, name: 'Kenzie', shortName: 'kenzie', group: 'Series 3', film: 'Hell to Pay' },
  { id: 'octavia', season: 3, name: 'Octavia', shortName: 'octavia', group: 'Series 3', film: 'The Falconwood Files' },
  { id: 'janelle', season: 3, name: 'Janelle', shortName: 'janelle', group: 'Series 3', film: 'The Falconwood Files' },
  { id: 'cassie', season: 3, name: 'Cassie', shortName: 'cassie', group: 'Series 3', film: 'The Marrek Murders', note: 'Pairing unconfirmed — verify against the box.' },
  { id: 'mandy', season: 3, name: 'Mandy', shortName: 'mandy', group: 'Series 3', film: 'The Marrek Murders', note: 'Pairing unconfirmed — verify against the box.' },
  { id: 'meghan', season: 3, name: 'Meghan', shortName: 'meghan', group: 'Series 3', film: "Don't Make a Sound" },
  { id: 'ronda', season: 3, name: 'Ronda', shortName: 'ronda', group: 'Series 3', film: "Don't Make a Sound" },

  // Series 4
  { id: 'bad-times-a', season: 4, name: 'Rena / Jen', shortName: 'bad-times-a', group: 'Series 4', film: 'Bad Times at Buddyland', note: 'Sources disagree (Rena/Gwynn vs Jen/Rina) — verify against the box.' },
  { id: 'bad-times-b', season: 4, name: 'Gwynn / Rina', shortName: 'bad-times-b', group: 'Series 4', film: 'Bad Times at Buddyland', note: 'Sources disagree (Rena/Gwynn vs Jen/Rina) — verify against the box.' },
  { id: 'vicky', season: 4, name: 'Vicky', shortName: 'vicky', group: 'Series 4', film: 'A Rotten Harvest' },
  { id: 'joy', season: 4, name: 'Joy', shortName: 'joy', group: 'Series 4', film: 'A Rotten Harvest' },
  { id: 'rita', season: 4, name: 'Rita', shortName: 'rita', group: 'Series 4', film: 'A Demon in the Shadows' },
  { id: 'lindi', season: 4, name: 'Lindi', shortName: 'lindi', group: 'Series 4', film: 'A Demon in the Shadows' },
  { id: 'alois', season: 4, name: 'Alois', shortName: 'alois', group: 'Series 4', film: 'The Green Terror' },
  { id: 'dakota', season: 4, name: 'Dakota', shortName: 'dakota', group: 'Series 4', film: 'The Green Terror' },

  // Vignettes
  { id: 'melanie', season: 1, name: 'Melanie', shortName: 'melanie', group: 'Vignettes', film: 'Terror From Above' },
  { id: 'patsy', season: 2, name: 'Patsy', shortName: 'patsy', group: 'Vignettes', film: 'Terror From the Grave' },
  { id: 'gabrielle', season: 3, name: 'Gabrielle', shortName: 'gabrielle', group: 'Vignettes', film: 'Terror From Destiny' },

  // Special Features
  { id: 'claus', season: 0, name: 'Claus', shortName: 'claus', group: 'Special Features', film: 'North Pole Nightmare (Krampus)' },
  { id: 'cindy', season: 0, name: 'Cindy the Elf', shortName: 'cindy', group: 'Special Features', film: 'North Pole Nightmare (Krampus)' },
  { id: 'adrianne', season: 0, name: 'Adrianne', shortName: 'adrianne', group: 'Special Features', film: 'Shriek (Mort the Teenage Dirtbag)' },
  { id: 'maureen', season: 0, name: 'Maureen', shortName: 'maureen', group: 'Special Features', film: 'Shriek (Mort the Teenage Dirtbag)' },

  // Promos & Packs
  { id: 'paula', season: 0, name: 'Paula', shortName: 'paula', group: 'Promos & Packs', film: 'Promo card' },
  { id: 'holiday-paula', season: 0, name: 'Holiday Paula', shortName: 'holiday-paula', group: 'Promos & Packs', film: 'Guest Stars Box (alt-art)' },
  { id: 'agnes', season: 2, name: 'Agnes', shortName: 'agnes', group: 'Promos & Packs', film: 'Box of Props' },
  { id: 'layla', season: 2, name: 'Layla', shortName: 'layla', group: 'Promos & Packs', film: 'Box of Props' },
  { id: 'julia', season: 2, name: 'Julia', shortName: 'julia', group: 'Promos & Packs', film: 'Box of Props (The Dark Quarter crossover)' },
  { id: 'constance', season: 2, name: 'Constance', shortName: 'constance', group: 'Promos & Packs', film: 'Box of Props (The Dark Quarter crossover)' },
  { id: 'carolyn', season: 3, name: "Carolyn's Revenge", shortName: 'carolyn', group: 'Promos & Packs', film: 'Guest Stars Box' },
  { id: 'grandma', season: 3, name: "Grandma's Grudge", shortName: 'grandma', group: 'Promos & Packs', film: 'Guest Stars Box' },
  { id: 'jamie', season: 3, name: 'Jamie', shortName: 'jamie', group: 'Promos & Packs', film: 'Guest Stars Box' },
  { id: 'julie', season: 4, name: 'Julie (with cat Mazzy)', shortName: 'julie', group: 'Promos & Packs', film: 'S4 Premium Promo Pack' },
  { id: 'meg', season: 4, name: 'Meg (with dog Mipha)', shortName: 'meg', group: 'Promos & Packs', film: 'S4 Premium Promo Pack' },
  { id: 'jen-promo', season: 4, name: 'Jen', shortName: 'jen-promo', group: 'Promos & Packs', film: 'S4 Premium Promo Pack', note: 'Not regularly listed yet — verify.' },
  { id: 'iris', season: 4, name: 'Iris', shortName: 'iris', group: 'Promos & Packs', film: 'S4 Premium Promo Pack', note: 'Not regularly listed yet — verify.' },
];

export function getKiller(id) {
  return killers.find((k) => k.id === id) || null;
}

export function getLocation(id) {
  return locations.find((l) => l.id === id) || null;
}

export function getFinalGirl(id) {
  return finalGirls.find((g) => g.id === id) || null;
}

/* --------------------------------------------------------------------------
   Official scenarios.
   Each Feature Film has a "home" pairing of one Killer + one Location with a
   named scenario (the box title). Final Girls are NOT part of this — they may
   be deployed with any combo. A named pairing below is the official (canon)
   scenario; any other Killer+Location is a "mix-up".

   The Lore & Scenario books ALSO define an official scenario for every
   killer×location cross-combo within a series (up to 25 each) with its own
   title and special rules — those titles aren't known yet, so they're not
   listed here. When available, add them to OFFICIAL_SCENARIOS keyed by
   `${killerId}|${locationId}`.
   -------------------------------------------------------------------------- */
export const OFFICIAL_SCENARIOS = {
  // Series 1 (killerId | locationId) -> scenario name
  'hans|camp-happy-trails': 'The Happy Trails Horror',
  'poltergeist|creech-manor': 'The Haunting of Creech Manor',
  'inkanyamba|sacred-groves': 'Slaughter in the Groves',
  'geppetto|carnival-of-blood': 'Carnage at the Carnival',
  'dr-fright|maple-lane': 'Frightmare on Maple Lane',
  // Series 2
  'evomorph|uss-konrad': 'Into the Void',
  'organism|station-2891': 'Panic at Station 2891',
  'intruders|wingard-cottage': 'A Knock at the Door',
  'big-bad-wolf|storybook-woods': 'Once Upon a Full Moon',
  'ratchet-lady|wolfe-asylum': 'Madness in the Dark',
  // Series 3
  'hunter|sunnydaze-mall': 'The Killer from Tomorrow',
  'razorface|hellscape': 'Hell to Pay',
  'slayer|falconwood': 'The Falconwood Files',
  'tormentor|marrek-warehouse': 'The Marrek Murders',
  'eyeless|utopia': "Don't Make a Sound",
};

export function getOfficialScenario(killer, location) {
  if (!killer || !location) return null;
  // Vignettes have no official Killer+Location pairing — they play anywhere.
  if (killer.isVignette) return null;
  const name = OFFICIAL_SCENARIOS[`${killer.id}|${location.id}`];
  return name ? { name } : null;
}

/* --------------------------------------------------------------------------
   Special SETUP instructions per Killer / Location.
   Paraphrased from the Season 1 Feature Film rulebook — SETUP-relevant steps
   only (full rules live on the printed sheets shown in "This Game").
   Keyed by the killer/location id. An entry with no key here means that
   Killer/Location adds no special setup.
   -------------------------------------------------------------------------- */
export const setupExtras = {
  // --- Killers ---
  poltergeist: [
    {
      title: 'Hide Carolyn & Mr. Floppy in the Item decks',
      itemDeck: true,
      body: 'The Carolyn and Mr. Floppy Item cards are always in the game but must never start faceup. Shuffle 10 of the Location\u2019s Item cards (not the usual 12) and return the rest. Set aside one card per Item deck, then shuffle Carolyn and Mr. Floppy into the remaining cards. Deal those facedown into equal piles, and finally place one set-aside card faceup on top of each deck. Carolyn and Mr. Floppy end up hidden inside the decks.',
      watchOut: 'This deck build is fiddly and easy to get wrong — follow the Killer rule sheet (on the This Game tab) step by step the first time.',
    },
    {
      title: 'Note the altered win condition',
      body: 'The Poltergeist has no health and cannot be attacked or killed. You win only by finding Carolyn and saving her at an Exit space while she is with you (and also Mr. Floppy if the "Forgetting Something?" Epic Dark Power is in play).',
    },
  ],
  inkanyamba: [
    {
      title: 'Set up the Killer Wrath track',
      body: 'Place the Killer Wrath card in the play area and put a Tracking marker on level 2. This track (1\u201310) governs Inkanyamba\u2019s rising anger all game.',
    },
    {
      title: 'Add the Atonement Action cards',
      body: 'Include BOTH Atonement Action cards in the Action Tableau (they come with Inkanyamba). They are your main tool for reducing Killer Wrath and have a bonus line for 3+ successes.',
    },
  ],
  geppetto: [
    {
      title: 'Prepare the Puppets',
      body: 'Place the Puppets card next to the Killer board and put all 3 Puppet tokens on the card\u2019s "Ready" space. The Puppets are Minions (max 3) that spawn one per Killer phase during play; the card also lists their stats as a reminder.',
    },
  ],
  'dr-fright': [
    {
      title: 'Build the Boiler Room deck',
      body: 'Shuffle the 4 Boiler Room cards and place them facedown in a stack. Place the Awake/Asleep card on top, Awake side faceup, completely covering them with no edges showing \u2014 this combined stack is the Boiler Room deck. You begin the game Awake.',
    },
  ],

  // --- Locations ---
  'creech-manor': [
    {
      title: 'No extra components \u2014 but know the board before you start',
      body: 'Creech Manor needs no special setup steps, but note these board features first: THREE one-way spaces (white arrows \u2014 you, Enemies and Victims cannot move against them; only the Rope Ladder item overrides this); THREE Window spaces (no rules of their own but referenced by many cards); and that EVERY space is Inside except the 3 green Exit spaces, which count as Outside (some cards treat these differently).',
    },
  ],
  'sacred-groves': [
    {
      title: 'Set up the Divine Wrath track',
      body: 'Place the Divine Wrath card in the play area with a Tracking marker on level 2. This track (1\u201310) works like a Wrath track and applies no matter which Killer you paired with the Groves.',
    },
    {
      title: 'Position the Sacred Groves Bloodlust track',
      body: 'Place the Sacred Groves Bloodlust Track directly to the right of the chosen Killer\u2019s board, lined up with the BOTTOM of the Killer\u2019s own Bloodlust track. Whenever Divine Wrath increases you\u2019ll also apply the matching line here.',
    },
    {
      title: 'Set aside the Finale token & add Atonement cards',
      body: 'Set the Sacred Groves Finale token to the side \u2014 it is only needed if the Finale is revealed (then it sits on the Finale card and forces an Unleash + Increase each Killer phase). Include BOTH Atonement Action cards (these come with Inkanyamba) in the Action Tableau.',
    },
  ],
  'carnival-of-blood': [
    {
      title: 'Build Item decks with hidden Item Traps',
      itemDeck: true,
      body: 'This REPLACES the normal Item-deck setup. Set the three Item Trap cards aside and shuffle the remaining Item cards. Deal three facedown decks of TWO Item cards each, then add one Item Trap facedown to each deck and shuffle each of the three decks separately. Finally, deal one Item card faceup on top of each deck and return any unused Item cards to the box. You end with three 4-card decks, each secretly containing one Item Trap at an unknown depth.',
      watchOut: 'Shuffle each small deck AFTER adding its trap so you don\u2019t know where the trap sits \u2014 check the Location rule sheet if unsure.',
    },
  ],
  'maple-lane': [
    {
      title: 'Make four quadrant Item decks',
      itemDeck: true,
      body: 'This REPLACES the normal 3-deck Item setup. Maple Lane uses 4 Item decks, one per Quadrant (NW, SW, NE, SE). Form them by the normal rules but as FOUR decks of THREE Item cards each, revealing the top card of each deck as usual. Each Quadrant has 3 House spaces that draw from its own deck when searched.',
      watchOut: 'Four decks of three \u2014 not three decks. Each deck belongs to one Quadrant of Houses.',
    },
    {
      title: 'Add the Convince Action cards',
      body: 'Include BOTH Convince Action cards in the Action Tableau. They\u2019re needed to enter occupied Houses (Houses with Victims in them), and have a bonus success line for 3+ successes.',
    },
  ],

  // ===== SERIES 2 =====

  // --- Killers ---
  evomorph: [
    {
      title: 'Set the Evolution stage to Hatchling',
      body: 'Place the Evolution card next to the Killer board and put the Evolution marker beside the Hatchling stage. The Evomorph begins as a Hatchling (just 4 health, but this can rise to 10 later).',
    },
    {
      title: 'Build an 8-card Terror deck (not 10)',
      body: 'Shuffle the Evomorph\u2019s Terror cards with the chosen Location\u2019s Terror cards as usual, but deal only EIGHT into the Terror deck rather than the normal ten.',
    },
    {
      title: 'Prepare the Ambush deck',
      body: 'Shuffle the 10 Ambush cards and place them facedown next to the Terror deck with the YOUNGLING side (light green) readable \u2014 the Adult side will be upside down until the Evomorph becomes an Adult.',
    },
  ],
  organism: [
    {
      title: 'Hide the Exposed Victims among the Victims',
      body: 'When placing Victims, swap three yellow Victims for the Red (Core box), Black and Grey Killer meeples, placed one at a time \u2014 these are the Exposed Victims. Nothing goes on the Killer start space; the Killer(s) are hidden among the Victims. If NOT playing at Station 2891, put the Lab token where the Killer-start icon is on the Setup card (that marks the Lab).',
    },
    {
      title: 'Set out Test Kits and the Test Results deck',
      body: 'Place one Test Kit Item card faceup above each Item deck (most locations have 3). Shuffle the 3 Test Results cards into a facedown Test Results deck.',
    },
    {
      title: 'Seed the Exposed Victim cards',
      body: 'Shuffle the 3 Exposed Victim cards and place them facedown in the three spaces on the Killer board.',
    },
  ],
  intruders: [
    {
      title: 'Place all three Killers',
      body: 'Put all three Killer meeples (Red from the Core box, Black, and Grey) on the Killer start space from the Setup card. Give each its own starting health including a Final Health token.',
    },
    {
      title: 'Set the Active Killer token',
      body: 'Place the Active Killer token on Trish\u2019s (the Red Killer) circle on the Killer board. Only the Active Killer acts when resolving move/attack/place effects; the token shifts around during play.',
    },
  ],
  'big-bad-wolf': [
    {
      title: 'Start in Track mode',
      body: 'No components to place, but note: the Wolf begins in TRACK mode and switches to SLAY mode when its Dark Power is revealed. Most of its Terror cards do different things depending on the current mode.',
    },
  ],
  'ratchet-lady': [
    {
      title: 'Prepare the Maniacs',
      body: 'Place the 6 Maniac meeples in a pile beside the Victim meeples, then put TWO Maniac meeples in the Ratchet Lady\u2019s starting space. She starts at just 6 health but has no upper health cap and several ways to heal.',
    },
  ],

  // --- Locations ---
  'uss-konrad': [
    {
      title: 'Place the starting Keycard tokens',
      body: 'Start with two Keycard tokens on the board (each Setup card shows where). Put one Keycard Item card in your inventory with a Keycard token on it, set two more Keycard Item cards beside your play area with the remaining tokens, then shuffle the last three Keycard Item cards into the Item decks as normal.',
      itemDeck: true,
    },
    {
      title: 'Set out the Super Loader and Maintenance cards',
      body: 'Place the Super Loader Item card beside your play area and its token in the Hangar. Place the three Maintenance cards faceup next to your Player board (they run the Crusher, Incinerator, Airlock and Self Destruct functions).',
    },
  ],
  'station-2891': [
    {
      title: 'Set out the Helicopter and Skidozer',
      body: 'Place the Helicopter Card near the board and the Helicopter token on the helicopter Exit space. Put the Skidozer token in any outdoor space adjacent to an Exit space.',
    },
    {
      title: 'Start with a Two-Way Radio',
      body: 'Before building the Item decks, find a Two-Way Radio and place it in your inventory.',
    },
  ],
  'wingard-cottage': [
    {
      title: 'Lay out Supply and Crafted Item cards',
      body: 'Place the four Supply Item cards faceup in the play area. Shuffle the Crafted Item cards and deal four of them faceup in the play area. These feed the crafting system (spend listed items + Time to craft).',
    },
  ],
  'storybook-woods': [
    {
      title: 'No special setup',
      body: 'Storybook Woods has no special setup steps \u2014 set up as normal. Just be aware it has FEWER spaces than most locations, plus three fragile bridges and a possible Raft (see the play rules).',
    },
  ],
  'wolfe-asylum': [
    {
      title: 'Prepare Stun and Pill tokens',
      body: 'Put the Stun tokens in a pile by your play area. Shuffle the Pill tokens facedown into a pool. You start with four Pill tokens on the board (each Setup card shows where) placed facedown from the pool.',
    },
    {
      title: 'Set up the Pill Effects card',
      body: 'Place the Pill Effects card next to your Player board and draw 1 Pill token to place faceup beneath it (leaving 5 in the pool). Shuffle the Amped and Side Effects cards and place them next to your play area.',
    },
  ],

  // ===== SERIES 3 =====

  // --- Killers ---
  hunter: [
    {
      title: 'Build the hidden Cybernetic Parts stack',
      body: 'Place the two Countdown tokens on the back of the Finale card. Then randomly pick 3 Cybernetic Part tokens and, WITHOUT looking, stack them facedown on top of the Countdown tokens \u2014 a stack of 5 on the Finale card.',
    },
    {
      title: 'Seed the Mark X Terror card near the bottom',
      body: 'Set aside the Hunter Mark X Terror card and build the Terror deck normally. Then take the bottom TWO cards of that deck, shuffle them with the Mark X Terror card, and put those three back at the bottom of the Terror deck.',
    },
    {
      title: 'Place Mark V now, Mark X aside',
      body: 'Put the Mark V meeple (red Core-box Killer) on the Killer start space. Set the Mark X meeple (silver) beside your play area for later. Place the Mark V Ally card and 4 Action cubes aside \u2014 used only once the Mark V is defeated and repaired. The Mark V is the Active Killer to start.',
    },
  ],
  razorface: [
    {
      title: 'Draw your starting Afflictions',
      body: 'Shuffle the Affliction cards and place 3 faceup on the table. To win you must Purge all your Afflictions (usually 3, but you can gain more) before you can land the killing blow \u2014 Razorface\u2019s Final Health token can only be revealed when NO Afflictions are in play.',
    },
  ],
  slayer: [
    {
      title: 'Set up the Dimension Tracker',
      body: 'Place the Dimension Tracker card near your play area and put the Final Girl and all Special Victim tokens in its "Our Dimension" half. Add one Mirror Dimension Victim (grey meeple) on your space and another on the Exit space closest to Slayer.',
    },
    {
      title: 'Add the Open a Rift Action cards',
      body: 'Add the Open a Rift Action cards to the Action Tableau. They let you (and Special Victims with you) cross into the Mirror Dimension during your Action phase.',
    },
  ],
  tormentor: [
    {
      title: 'The Tormentor starts off the board',
      body: 'The Tormentor does NOT start on the board \u2014 she appears only after the Finale is revealed (until then her Killer Actions on Terror cards are ignored). Keep the Setup card faceup for reference and keep the rest of the Setup cards nearby (don\u2019t box them).',
    },
    {
      title: 'Build the two Death Trap decks',
      body: 'Shuffle the Victim Death Trap cards into one facedown deck and the Final Girl Death Trap cards into a second facedown deck. Place a Victim in the Killer-start space and immediately resolve a Victim Death Trap for it.',
    },
  ],
  eyeless: [
    {
      title: 'Set up the Noise tracker',
      body: 'Place the Noise marker on the zero space of the Time track and keep the Noise cards beside your play area. Your Noise level rises by 1 for EACH Action card you resolve, and resets to zero at the end of each Upkeep \u2014 it governs when the Eyeless can home in on you.',
    },
  ],

  // --- Locations ---
  'sunnydaze-mall': [
    {
      title: 'Set up the Savior ally',
      body: 'Place the Savior meeple (orange Special Victim) on the Exit space from the Setup card. Put the Savior Ally card in your play area with 4 Health markers and 4 Action cubes nearby, and the Trust card beside it with the Trust marker on the bottom "Go to Hell!" space.',
    },
    {
      title: 'Prepare Savior deck, Build Trust cards & Chopper',
      body: 'Shuffle the Savior cards into the Savior deck. Add the Build Trust Action cards to the Tableau. Place the Chopper token in the Atrium space.',
    },
  ],
  hellscape: [
    {
      title: 'Lay out the four Hellscape tiles',
      body: 'Shuffle the 4 double-sided Hellscape tiles and deal one to each of the four blank spaces on the board, each oriented with its symbol top-left (so Panic numbers read upright). Place 1 Victim in each space of each tile (8 Victims total), THEN reveal the Setup card to place the remaining Victims, Final Girl and Killer.',
    },
    {
      title: 'Add the Hellshift Action card',
      body: 'Add the Hellshift Action card to the Tableau. The tiles move around all game (by your choice or by effects), carrying all pieces with them, so plan movement carefully.',
    },
  ],
  falconwood: [
    {
      title: 'Choose and set up a Mission',
      body: 'Set aside the "Survive the Hunt" Terror card, both Mission Item cards and the Friend cards (used only when a Mission calls for them). Before normal setup, randomly pick ONE of the 5 Missions and follow its setup sheet. Completing that Mission is mandatory to win \u2014 the Killer\u2019s Final Health token can\u2019t be revealed until it\u2019s done.',
    },
  ],
  'marrek-warehouse': [
    {
      title: 'Lock the exits and place the Forklift',
      body: 'Place a Locked token on each Exit space and the Forklift token in The Pit (used only if you find the Forklift Keys). Locked exits can be entered but no Victims can be saved there until unlocked.',
      itemDeck: false,
    },
    {
      title: 'Seed the "Click" Terror cards & add Climb/Leap',
      body: 'Set aside the 3 "Click" Terror cards and build the Terror deck as normal. Then set aside the top 2 cards, shuffle the 3 "Click" cards into the rest, and put the 2 set-aside cards back on top. Add the Climb and Leap Action cards to the Tableau.',
    },
  ],
  utopia: [
    {
      title: 'Build the Sand Snake deck',
      body: 'Shuffle the 12 Sand Snake cards into a facedown Sand Snake deck. Each turn, at the end of the Killer phase, you draw 2 Sand Snake cards and resolve their attacks.',
    },
  ],

  // ===== VIGNETTES =====
  'the-birds': [
    {
      title: 'No Killer board \u2014 use the Bloodlust & Bird Spawn cards',
      body: 'This vignette has no Killer board. Place the Bloodlust card and the Bird Spawn card next to the chosen Location board, and put the Bloodlust marker on the Bloodlust card\u2019s start space. Set up at any Location, following its normal setup except as below.',
    },
    {
      title: 'Horror starts at 4',
      body: 'Set the Horror Level to 4 at the start (rather than a Killer\u2019s starting value).',
    },
    {
      title: 'Seed the board with Birds',
      body: 'Place a Bird token (3-birds side up) on the Killer-start space from the Location\u2019s Setup card. Place the Final Girl and Victims as normal. Then place 1 Bird token on every empty space that has no Victims and no Final Girl.',
    },
  ],
  'patsy-zombies': [
    {
      title: 'No Killer board \u2014 use the two Bloodlust cards',
      body: 'This vignette has no Killer board. Align and place the two Bloodlust cards next to the chosen Location board and put the Bloodlust marker on the start space. Playable at any Location, following its normal setup except as below.',
    },
    {
      title: 'Horror starts at 4',
      body: 'Set the Horror Level to 4 at the start.',
    },
    {
      title: 'Seed the board with Zombies',
      body: 'No Killer is placed. Instead place 1 Zombie on each Exit space and on the Killer-start space. If the Location has only one Exit, place 1 there, 2 on the Killer-start space, and 1 on an Exit space of your choice.',
    },
    {
      title: 'Prepare Hordes and the Vehicle tokens',
      body: 'Place one Horde token on the facedown Dark Power card; put the remaining Zombies and Horde tokens below the Bloodlust track. Shuffle the 4 Vehicle tokens facedown and distribute them facedown to the Exit spaces (extras go to the farthest Exit from your start; if only one Exit, spread the other 3 to thematically fitting spaces).',
    },
  ],
  destiny: [
    {
      title: 'No Killer board \u2014 use the two Bloodlust cards, Horror starts at 5',
      body: 'Follow the chosen Location\u2019s normal setup except as below. There is no Killer board: align and place the two Bloodlust cards next to the Location board and put the Bloodlust marker on its start space. Set the Horror Level to 5 at the start.',
    },
    {
      title: 'Build the Terror deck with the 5 Fated Death Terror cards',
      body: 'Set the 5 Fated Death Terror cards aside and shuffle the Vignette\u2019s remaining Terror cards together with the Location\u2019s Terror cards. Deal out 8 and set the rest aside. Of those 8, put 1 back in each of their respective boxes, then shuffle the remaining 7 with the 5 Fated Death Terror cards. Place that 12-card pile on top of the set-aside cards, then put the single reserved Terror card on top. The deck has 13 cards (not the usual 10), and you know the top card will NOT be a Fated Death card.',
    },
    {
      title: 'Choose a Death Order and set up the Consequence row',
      body: 'Randomly choose 1 Death Order card and place it faceup by the Location board. Shuffle the 5 Death tokens (the circular ones, Destiny symbol on the back) and place them facedown on the Death Order card (A). Shuffle the Consequence cards and lay 5 in a row; below each place a Punishment card (B). Put the Arrow token above the leftmost Consequence card (C). Return any unused Consequence and Punishment cards to the box.',
    },
    {
      title: 'Place Victims and the Final Girl (no Killer)',
      body: 'Place the Victims and Final Girl on the spaces shown on the Location\u2019s Setup card, but do NOT place a Killer \u2014 there is none in this Vignette.',
    },
    {
      title: 'Place the 5 Fated Victims using the Setup Grid',
      body: 'Lay the Setup Grid rulers around the Location board: the colored rulers line up by their arrows \u2014 blue arrows down the left side, green arrows across the bottom (D). For each Fated Victim, roll two dice (one = horizontal axis, one = vertical axis) and place that square Fated Victim token on the resulting grid space, subject to the rules below. If a placement is illegal, re-roll both dice and try again. Repeat until all 5 Fated Victim tokens are placed (labelled E1\u2013E5 in the example).',
    },
    {
      title: 'Fated Victim placement rules',
      body: 'At least half of a space must fall inside the grid section to place a Fated Victim there. A Fated Victim can\u2019t be placed with the Final Girl, can\u2019t be placed on an Exit space, and can\u2019t be placed on a space that already has a Fated Victim.',
    },
    {
      title: 'Add the Destiny Action cards',
      body: 'Add the Thwart Destiny Action card and 1 Premonition Action card to your Action Tableau. For an easier game, add both Premonition Action cards instead of one.',
    },
  ],
};

/** Return the special setup steps for a Killer/Location entry (or []). */
export function getSetupExtras(entry) {
  if (!entry) return [];
  return setupExtras[entry.id] || [];
}

/** True if this entry changes how the Item decks are built. */
export function changesItemDecks(entry) {
  return getSetupExtras(entry).some((s) => s.itemDeck);
}

/**
 * Whether a Killer/Location has had its WRITTEN special rules transcribed into
 * the app (setup steps and/or play-rules summary). Images display on their own,
 * but these text summaries must be authored by hand — this lets the Asset Admin
 * flag any Killer/Location whose rule-sheet images exist but whose written rules
 * are still missing. Final Girls have no written rules, so they're never flagged.
 */
export function hasWrittenRules(entry) {
  if (!entry) return false;
  return getSetupExtras(entry).length > 0 || Boolean(playRules[entry.id]);
}

// Final Girls that are only a single cross-referenced card (no special rules at
// all in the base game) could legitimately have none; but for Killers/Locations
// in this app's scope, each has at least setup or play rules. This set lets us
// mark any entry as "intentionally has no written rules" to suppress the flag.
export const noWrittenRulesExpected = new Set([
  'hans',               // Hans: "There are no special rules for Hans."
  'camp-happy-trails',  // Camp Happy Trails: "There are no special rules."
]);

/* --------------------------------------------------------------------------
   Special PLAY rules per Killer / Location (not setup — that's in Setup
   Assist). Short, at-the-table reminders plus "watch out" flags pointing to
   the printed rule sheets for full detail. Paraphrased from the Season 1
   Feature Film rulebook. Keyed by killer/location id.
   -------------------------------------------------------------------------- */
export const playRules = {
  // --- Killers ---
  poltergeist: {
    points: [
      'The Poltergeist has no health and cannot be attacked, damaged or killed. Any effect that would damage her is simply ignored. You never defeat her the normal way, so the whole game is a race to rescue, not to kill.',
      'The ONLY way to win is to find the Carolyn Item card, keep her with you, and save her at a green Exit space while she is in your possession. Reaching an Exit with Carolyn is your victory condition.',
      'Carolyn and Mr. Floppy are two special Item cards shuffled into the Location\u2019s Item decks at setup (never starting faceup), so you have to search to dig them out. You find them like any other item.',
      'Carolyn can never be discarded or removed from the game \u2014 ignore any effect that tries. She can, however, be shuffled back into an Item deck by a card effect, which is normal and means you may have to find her again. She cannot be placed in your backpack; she travels in hand.',
      'Mr. Floppy is only needed if the "Forgetting Something?" Epic Dark Power is in play. His own printed discard-effect (to ignore the "Carolyn? Where are you?!?!?" Terror card) can only be used AFTER the Dark Power is revealed, and never at all while "Forgetting Something?" is active \u2014 in that case he becomes a second mandatory rescue.',
      'Even though she can\u2019t be killed, keep damage-dealing Action cards handy: several of her Terror cards can be answered or reduced by dealing damage, so attacks are not wasted.',
    ],
    watchOuts: [
      'If "Forgetting Something?" (Epic Dark Power) is revealed, you must save BOTH Carolyn AND Mr. Floppy to win \u2014 reaching the Exit with only Carolyn is no longer enough.',
      'Because Carolyn can be shuffled back into a deck mid-game, don\u2019t assume holding her once means you\u2019re safe \u2014 a Terror card can send her back into hiding.',
    ],
  },
  inkanyamba: {
    points: [
      'Inkanyamba adds a Killer Wrath track (its own card, levels 1\u201310) that starts the game at level 2. Managing this rising anger is the core of the fight \u2014 if it maxes out, the onslaught becomes unsurvivable.',
      'When a card or effect tells you to Increase or Decrease Killer Wrath, slide the Tracking marker up or down that many levels. It can never drop below 1 or rise above 10; ignore any part of an increase/decrease that would push past those limits.',
      'When an effect says to Unleash, look at the marker\u2019s CURRENT level on the Killer Wrath card and carry out whatever is listed there. An Unleash can raise the Horror Level, heal Inkanyamba, make him perform a Killer Action (move/attack), or several of those at once \u2014 the higher the Wrath, the nastier it is.',
      'The main way to bring Wrath down is the two Atonement Action cards (added to your Tableau at setup). Atonement cards are special: besides the normal single/double success lines, they have an EXTRA line for 3+ successes, letting a great roll cut Wrath hard.',
      'Some other item/card effects can also reduce Wrath, but Atonement is your reliable lever \u2014 buy and play them before Wrath climbs into the dangerous upper levels.',
      'His Terror deck includes five "Wrath of\u2026" cards; his Dark Lightning Epic Dark Power makes each Victim he kills also kill a second Victim in the same or an adjacent space if able.',
    ],
    watchOuts: [
      'Unleash effects differ at every level and can chain with other effects \u2014 always re-read the current Wrath level before resolving, because what Unleash does changes as the marker moves.',
      'Because Unleash reads the live level, an Increase immediately followed by an Unleash hits harder than you might expect \u2014 resolve increases first, then check the level.',
    ],
  },
  geppetto: {
    points: [
      'Geppetto brings 3 Puppets, which are Minions (general Minion rules are on Core Rulebook pg. 32). Three is the hard maximum that can ever exist on the board and the Puppets card combined.',
      'Each Puppet has 1 health, Attack Value 1, and a Movement Value equal to Geppetto\u2019s current value (so it rises as his Bloodlust climbs). The Puppets card restates these as a reminder.',
      'Spawning: each Killer phase, up until the Finale is revealed, the first step of the Minion Action on the Finale card is to spawn a Puppet \u2014 move one token from the card\u2019s "Ready" space into Geppetto\u2019s space. If "Ready" is empty, none spawns. Then, either way, move every token from "Exhausted" back to "Ready".',
      'When you kill a Puppet, put its token on the "Exhausted" space (not back in the box) \u2014 it will cycle back to "Ready" next Killer phase, so they keep coming.',
      'Resolving actions: if a Terror card\u2019s Killer Action does NOT specify "Puppets only" (and Location Terror cards never do), EACH Puppet on the board performs the whole action one at a time (you choose the order if there are several), and THEN Geppetto performs the same action. Some of Geppetto\u2019s own Terror cards do specify Puppets-only \u2014 follow that wording when present.',
      'Leash rule: Puppets are on strings and must END their movement within 2 spaces of Geppetto. They may pass farther than 2 spaces away mid-move (e.g. taking the direct route to a nearby target), as long as they finish within 2 spaces of him.',
      'Stranded Puppet: if some effect leaves a Puppet more than 2 spaces from Geppetto, then the next time it would choose a target it instead heads back to Geppetto, stopping as soon as it is exactly within 2 spaces. If it runs out of movement still too far, it repeats this the next time it must choose a target.',
      'Any leftover movement is lost whenever a Puppet has to stop \u2014 whether because moving on would end it more than 2 spaces from Geppetto, or because it just returned to exactly 2 spaces away.',
    ],
    watchOuts: [
      'The "each Puppet then Geppetto" rule means an unspecified Terror action can resolve up to FOUR times in one card \u2014 easy to under-resolve. Count the Puppets on the board before you start.',
      'Immortal Master (Epic Dark Power): while all Puppets are on the board, Geppetto cannot be killed \u2014 damage that would remove his Final Health token is ignored. You must thin the Puppets first.',
    ],
  },
  'dr-fright': {
    points: [
      'Dr. Fright runs on two states shown by the Awake/Asleep card: Awake (normal world) and Asleep (the Boiler Room dream world). You start Awake.',
      'While AWAKE: you move, search, save Victims, and play as normal \u2014 BUT you and Dr. Fright cannot attack each other. If his Killer Action starts with an attack icon, treat it as a move instead (unless his "The Frightmare is Inevitable" Dark Power is out, which lets him attack you while Awake). If his action is a move, he still advances toward you and will attack a Victim in the space he stops on, just not you.',
      'While ASLEEP (Boiler Room): now you CAN attack Dr. Fright and he can attack you \u2014 this is the only way to hurt him. You may still move and search, but Victims will NOT follow you and cannot be saved while you dream.',
      'Falling asleep: some Terror cards force it. You can also choose to sleep by playing a Short Rest or Long Rest Action card \u2014 apply its normal effect, then you fall Asleep. To change state, slide the Awake/Asleep card to the bottom of the Boiler Room deck without flipping it, then flip the whole deck so "Asleep" shows on top.',
      'The Boiler Room deck is 4 cards. While Asleep you MUST resolve exactly one Boiler Room card at the END of each Killer phase (you may also resolve as many as you like, including none, during your Action phase). When all 4 are resolved you immediately wake up: shuffle them facedown and put the Awake/Asleep card back on top, Awake side up.',
      'Resolving a Boiler Room card: slide the stack Up, Down, Left or Right so that half (sometimes a quarter) of the next unrevealed card shows. You must slide in a direction that reveals new card and extends the previously revealed one. If Dr. Fright\u2019s illustration appears on the newly revealed portion, he attacks you right then \u2014 from anywhere, regardless of his board position \u2014 and you may defend as normal.',
      'Dr. Fright\u2019s image appears in each of the four quadrants only once, so as you reveal cards you can deduce where he is and slide to dodge attacks. Most trips through the Boiler Room cost one or two attacks; a smart route can avoid some entirely.',
    ],
    watchOuts: [
      'To kill Dr. Fright you have to be Asleep and in the Boiler Room \u2014 you cannot win while staying Awake. Plan deliberate sleeps.',
      'The slide direction matters: you can\u2019t slide a way that reveals nothing, and the first slide of a fresh Boiler Room has the card fully hidden \u2014 see the worked example on the rule sheet the first time to get the sliding right.',
      'Shock Factor (a Dark Power): if a Victim would panic it is killed instead (max 3 per turn) \u2014 watch your Victim count.',
    ],
  },

  // --- Locations ---
  'creech-manor': {
    points: [
      'One-way spaces: three spaces have white arrows showing the only direction you may travel. You cannot move against an arrow (e.g. you can\u2019t climb the tire swing back in through a window, or go up through the washroom ceiling hole). The two spaces either side are still considered adjacent in both directions for card effects \u2014 it\u2019s only your movement that\u2019s one-way.',
      'The one-way restriction applies to Enemies and Victims too, not just you. The single exception is the Rope Ladder item: while used, it turns a one-way space into a normal two-way space.',
      'Window spaces are a new space type \u2014 two on the right of the house, one on the left. They have no special rules of their own, but many Terror and Event cards specifically target or reference Window spaces, so note where they are.',
      'Inside vs Outside: every space is Inside EXCEPT the 3 green Exit spaces, which count as Outside. Several cards (e.g. "the windows and doors slammed shut") treat Inside and Outside differently, restricting movement in or out, so always know which you\u2019re standing in.',
      '"The Ladder" on any card means the ladder on the OUTSIDE of the building connecting the left Exit space to the 3rd-floor washroom. The attic "ladder" is just artwork and is never affected by game effects.',
    ],
    watchOuts: [
      'Before committing a move near the three one-way spaces, check the arrows \u2014 getting trapped on the wrong side can cost you the game.',
      'The "Lights Out" event makes you roll 1 fewer die (min 1) on movement actions unless you hold a Flashlight or Candle \u2014 grab a light source if it\u2019s in play.',
    ],
  },
  'sacred-groves': {
    points: [
      'The Sacred Groves adds a Divine Wrath track (its own card, levels 1\u201310, starting at level 2) that works exactly like a Wrath track \u2014 so it combines with ANY Killer, even those who don\u2019t have their own Wrath.',
      'Increase / Decrease Divine Wrath moves the marker up or down that many levels, clamped at 1 and 10; ignore any overflow past those ends.',
      'Unleash: read the marker\u2019s CURRENT level on the Divine Wrath card and apply what\u2019s listed there (can raise Horror, trigger effects, etc.).',
      'Crucial interaction: whenever Divine Wrath INCREASES, you also apply the matching line on the Sacred Groves Bloodlust Track (placed beside the Killer board at setup) \u2014 this is IN ADDITION to any normal Killer-board Bloodlust effect. So a single increase can fire two effects.',
      'Sacred spaces are the Burial Ground, Sacred Shrine and Holy Groves. The more Victims standing on Sacred spaces, the angrier the gods get and the more likely Wrath rises \u2014 managing where Victims gather matters.',
      'Reduce Divine Wrath mainly with the two Atonement Action cards (added to the Tableau at setup; shared with Inkanyamba). Like all Atonement cards they have a bonus success line for 3+ successes.',
    ],
    watchOuts: [
      'When the Finale triggers, place the Sacred Groves Finale token on the Finale card: from then on, each Killer phase AFTER the Killer Action you must Unleash and then Increase Divine Wrath by 1 \u2014 a relentless climb, so push for the kill quickly once the Finale is near.',
      'Remember the double-hit on increases (Divine Wrath line + Sacred Groves Bloodlust line) \u2014 it\u2019s easy to forget the second effect.',
    ],
  },
  'carnival-of-blood': {
    points: [
      'The Carnival has TWO kinds of traps: Item Traps (hidden in the Item decks, found by searching) and Terror Traps (cards in the Terror deck, revealed during the Killer phase).',
      'Item Traps: three of them are shuffled into the Item decks at setup \u2014 one per deck, at an unknown depth. They\u2019re only discovered by searching at an orange Search space.',
      'When a search turns up an Item Trap you MUST resolve it (the one exception is if you have Zappo the monkey with you). If the same search also revealed a real item, you may still take that item \u2014 but resolve the trap first. Item Trap cards are then discarded (unless the card says otherwise).',
      'Terror Traps: three Terror Trap cards live in the Terror deck. When drawn, resolve like any Terror card. When it tells you to place its Trap token, put the token in YOUR current space; its effect happens immediately to you and any Victims there.',
      'A Terror Trap always kills Victims in the space, and affects YOU per the Terror Trap Reference card (each trap differs \u2014 e.g. lose health, discard a card, forced movement/damage). After resolving, finish any remaining text on the Terror Trap card and discard the card as normal.',
      'Critical: Trap tokens are NOT removed \u2014 they stay on the board for the rest of the game. Every time you OR a Victim enters (or is in) a space with a Trap token, the trap\u2019s effect triggers again. Victims entering are always killed; you suffer the listed effect.',
      'Enemies (Killer and any Minions) completely ignore Trap tokens \u2014 traps never affect them, only you and the Victims.',
    ],
    watchOuts: [
      'Because each Item deck hides exactly one Item Trap at an unknown depth, every search is a gamble \u2014 weigh the odds before searching a deck you\u2019ve not drawn from.',
      'Trap tokens are permanent board hazards: map where they are and route around them, since re-entering a trapped space re-triggers the effect on you and instantly kills any Victim you\u2019re escorting through it.',
      'Keep the Terror Trap Reference card handy \u2014 the three traps (rope / spinning blade / acid pit) each do something different to you.',
    ],
  },
  'maple-lane': {
    points: [
      'The board is divided into four Quadrants \u2014 NW, SW, NE, SE \u2014 each containing 3 House spaces (12 Houses total), and each Quadrant has its own Item deck (four decks total).',
      'Houses are a new space type that also count as orange Search spaces (both marked orange). Search a House and you draw from THAT Quadrant\u2019s Item deck. After a House is successfully searched, place an "X" token on it \u2014 it can never be searched again.',
      'If a search gives multiple items, keep one and return the other to that Quadrant\u2019s deck (top faceup or bottom facedown) as normal. If an item ever needs to be added to a deck whose Houses are all "X"-ed out, add it to the nearest Quadrant that isn\u2019t fully searched.',
      'Occupied Houses: you CANNOT enter a House that has one or more Victims in it using Walk, Sprint or any normal movement \u2014 the suspicious residents won\u2019t let you. You must play a Convince Action card instead (see below). An unoccupied House is entered and exited with normal movement.',
      'Panicking Victims and Enemies are NOT restricted by the occupied-House rule \u2014 they move into occupied Houses freely.',
      'Convince cards (two added to the Tableau at setup) are only for entering an occupied House from the adjacent Street space. You never need Convince to LEAVE a House \u2014 exiting always uses normal movement. Like Atonement cards, Convince has a bonus success line for 3+ successes.',
      'Street spaces: all the normal spaces and Exit spaces, plus the Intersection, count as "Street spaces" for any card that references them.',
    ],
    watchOuts: [
      'Entering an occupied House needs a successful Convince roll \u2014 if Victims you want are holed up inside, you can\u2019t just walk in, so keep a Convince card in hand when planning a rescue.',
      'Once all 3 Houses in a Quadrant are "X"-ed, that Quadrant is searched out \u2014 plan your searches across Quadrants rather than exhausting one.',
    ],
  },

  // ===== SERIES 2 =====

  // --- Killers ---
  evomorph: {
    points: [
      'The Evomorph grows through three stages tracked on the Evolution card: Hatchling \u2192 Youngling \u2192 Adult. The EVOLVE keyword sits on its Bloodlust track; when Bloodlust rises to an EVOLVE, advance the Evolution marker and apply that stage\u2019s changes.',
      'HATCHLING (start): very slow but deadly. Bloodlust will ONLY rise if the Hatchling itself kills a Victim \u2014 ignore all other Bloodlust increases (Terror/Event/Victims dying elsewhere) and instead do the alternate effect shown for each ignored increase. It has just 4 health here.',
      'YOUNGLING: on evolving it immediately Vanishes (see below), and from now on Bloodlust rises normally.',
      'ADULT: on evolving, max health jumps from 4 to 10 and it recovers ALL health; reveal its Dark Power and rotate the Ambush deck so the Adult (dark green) side reads upright.',
      'VANISH: whenever the Vanish icon appears, the Evomorph disappears \u2014 end the Killer phase, take its meeple off the board and set it on top of the Terror deck. While Vanished you skip the normal Killer phase (no Finale action, no Terror draw) and instead draw an AMBUSH card, reading the side matching the current stage (Youngling light-green / Adult dark-green). Higher red Danger numbers = nastier. Reshuffle the Ambush discard if the deck runs out.',
      'SCAN: Scan Action cards can ONLY be played while the Evomorph has Vanished. They let you place a Scan token in your space, marking that the Evomorph is NOT hiding there \u2014 protection against Ambush cards that make it appear and attack. One Scan token per space; if told to place one where none remain, move the farthest one. Scan\u2019s 3+ success line lets YOU ambush it instead.',
    ],
    watchOuts: [
      'While it\u2019s a Hatchling, most Bloodlust increases are ignored (replaced by the alternate effect) \u2014 don\u2019t advance Bloodlust unless the Hatchling itself made the kill.',
      'Scan only works during a Vanish, so hold Scan cards for the right moment rather than playing them while the Evomorph is on the board.',
    ],
  },
  organism: {
    points: [
      'The Organism hides among the Victims. Three Exposed Victims (Red/Black/Grey meeples) sit in place of normal Victims; you don\u2019t know which are infected. To WIN you must test the Exposed Victims and destroy every Mutated Organism (there\u2019s always at least 1, up to 3).',
      'Exposed Victims count as Victims but: can never be targeted/killed by a Mutated Organism, cannot be saved, cannot be swapped for Special Victims, and ALWAYS panic in the Panic phase (even if no Victim died). If a game effect "kills" one, immediately draw a Test Results card instead.',
      'TESTING is a free action (no Time) when you share an Exposed Victim\u2019s space: either discard a Test Kit Item or bring them to the Lab, then draw a Test Results card. SAFE = remove the card from the game and swap in a normal yellow Victim. ASSIMILATED = reveal the rightmost Killer-board card as a Mutated Organism, set its health + Final Health token, apply all its Bloodlust effects from the bottom up to the current level \u2014 then SHUFFLE the Assimilated card back into the deck (the others may be infected too).',
      'Acquire Test Kits by taking one (if available at that location) whenever you take an item from a successful Search.',
      'MUTATED ORGANISMS are Killers (not minions). They take Killer Actions normally; with several, resolve left-to-right on the Killer board. After the Finale they gain extra Killer-Action effects. You only get the Adrenaline +1 die bonus once, however many Organisms are down to their Final Health token.',
    ],
    watchOuts: [
      'Testing an Exposed Victim that was "killed" can spawn a Mutated Organism mid-game \u2014 and because the Assimilated card is reshuffled, more than one of your Exposed Victims may turn.',
      'You cannot win just by surviving \u2014 you must test to expose and then kill every Mutated Organism.',
      'INSTANT LOSS: while Regenerative Assimilation (Dark Power) is in play, if the Horror Level ever rises above 6 you are assimilated and lose immediately \u2014 keep Horror in check once it\u2019s out.',
    ],
  },
  intruders: {
    points: [
      'The Intruders are THREE Killers (Trish/Red, Zeke/Black, Baghead/Grey), each with its own health and Final Health token, but only ONE is "Active" at a time \u2014 marked by the Active Killer token \u2014 for resolving move/attack/place effects.',
      'The Active Killer changes often: (1) attacking or damaging a Killer makes THAT Killer active immediately; (2) up/down arrow symbols move the token to the next living Killer (wrapping top/bottom, skipping dead ones); (3) if the Active Killer dies, the token goes to the top-most living Killer.',
      '"All Killers" effects ignore the Active token: resolve top-to-bottom for every Killer, and the Active token doesn\u2019t change.',
      'Panic: Victims sharing a space with ANY Killer (not just the Active one) panic if a Victim died that turn. Minor Dark Powers apply to ALL Killers, and damage hits the Minor Dark Power card first.',
      'Killer death with others alive: lay the "dead" Killer on its side, change the Active Killer, and finish the phase BEFORE checking its black Final Health token \u2014 blank means truly dead and removed; health means it stands back up with a white token. Adrenaline +1 die applies only once no matter how many are on their Final Health.',
    ],
    watchOuts: [
      'Attacking a Killer instantly makes it the Active one \u2014 useful to control which Killer acts next, but think before you swing.',
      'Won\u2019t Stay Down (Epic Dark Power): a killed Killer immediately restores 2 health and a random black Final Health token (once) \u2014 then the card is removed.',
    ],
  },
  'big-bad-wolf': {
    points: [
      'The Wolf is always in one of two MODES: TRACK (starts here) or SLAY. Many of its Terror cards do different things depending on the mode at the START of the Killer phase \u2014 apply only that mode\u2019s effects.',
      'The Wolf switches from TRACK to SLAY when its Dark Power is revealed. If it changes mode mid-Killer-phase, you don\u2019t start using the new mode\u2019s effects until the NEXT Killer phase.',
      'Many Terror effects are not mode-dependent and apply regardless \u2014 only the parts marked with a mode icon care which mode it\u2019s in.',
      'In SLAY mode its attacks spread the Wolf\u2019s damage among as many Victims in its space as possible; if you\u2019re also there, you take any leftover damage after the Victims are killed.',
    ],
    watchOuts: [
      'Always check the Wolf\u2019s current mode at the start of the Killer phase before resolving a Terror card \u2014 the same card behaves differently in TRACK vs SLAY.',
      'A Killing Machine (Epic Dark Power): for the rest of the game, resolve BOTH the Track and Slay effects \u2014 the only time the Wolf isn\u2019t in just one mode.',
    ],
  },
  'ratchet-lady': {
    points: [
      'The Ratchet Lady starts at only 6 health but has NO upper cap and several ways to heal \u2014 she can balloon well past her start, so chip-and-finish tactics matter.',
      'She is accompanied by Maniacs (Minions \u2014 former Victims gone mad). Max 6 on the board; each has 1 health and Attack/Movement of 1. Maniacs won\u2019t follow you and can\u2019t be saved.',
      'When a Victim becomes a Maniac, swap in a red Maniac meeple and do NOT raise Bloodlust (nobody died). When a Maniac is killed, return it to the pool and again do NOT raise Bloodlust, even if it used to be a Victim.',
      'Leaving a space with Maniacs costs Horror: you take +1 Horror for each Maniac beyond the first (one Maniac = free to leave; three Maniacs = +2 Horror on leaving). Special Victims never become Maniacs \u2014 only normal Victims do.',
      'CALM Action cards turn a set number of Maniacs back into normal Victims (who can then follow you, be saved, and be killed by Enemies).',
    ],
    watchOuts: [
      'Shield of Madness (Epic Dark Power): she cannot lose health while ANY Maniac is on the board \u2014 you must clear the Maniacs (kill or Calm) before you can hurt her.',
      'Because killing a former-Victim Maniac doesn\u2019t raise Bloodlust, culling Maniacs is "free" of that cost \u2014 but Calming them back to Victims is how you actually rescue and score.',
    ],
  },

  // --- Locations ---
  'uss-konrad': {
    points: [
      'Keycards are the ship\u2019s key resource. Start/end your movement on a space with a Keycard token (not passing through) to spend Time and take it \u2014 grab a set-aside Keycard Item card and put a Keycard token on it. Using a Keycard (placing its token) costs NO Time, and you keep the now-empty Keycard card (it can never be discarded; ignore discard instructions for it).',
      'Maintenance Shafts: four shafts block movement while inactive (you and Victims can\u2019t pass; Enemies never can unless a card says so). Adjacent to an inactive shaft, place an available Keycard token on it to activate it \u2014 then you and following Victims travel through freely.',
      'Maintenance functions: four purple rooms (Trash Compactor/Crusher, Furnace/Incinerator, Hangar/Airlock, Bridge/Self Destruct). Be IN the matching room (not passing through) and spend the required number of Keycard tokens to activate its function. Removing Keycard tokens from a Maintenance card after activation immediately cancels that function.',
      'Super Loader: starts in the Hangar but only usable once you find the Super Loader Key item. Equipped: Victims won\u2019t follow, movement and damage-taken are each reduced by 1 (min 1), and you can\u2019t Short/Long Rest or Search. Unequipping or losing the Key leaves the token in your space and returns the card to its spot (it can\u2019t go in your backpack).',
    ],
    watchOuts: [
      'The Airlock and Self Destruct can kill you alongside the Killer \u2014 but if you die that way YOU LOSE, even if the Killer dies too. No victory for self-destruction.',
      'Self Destruct: once activated, the Countdown token advances each Upkeep; when it reaches the end the ship explodes and kills everything \u2014 if you\u2019re not at an Escape Pod space you lose.',
    ],
  },
  'station-2891': {
    points: [
      'Space types: OUTDOOR = the five outside spaces (incl. the helicopter Exit); everything else is indoors. MAIN BUILDING = indoor spaces except the Commander\u2019s Hut and Tool Shed. HALLWAY spaces are the long Main Building spaces (use Victim Holding boards for them).',
      'Saving Victims needs the HELICOPTER. With the Helicopter token on its Exit space you may move it plus up to 3 accompanying Victims onto the Station 2891 space of the Helicopter card. Once it holds Victims it must reach the Arctic Airport before returning. Victims on the Helicopter card can\u2019t be targeted or killed.',
      'The helicopter-move icon moves it 1 space on the Helicopter card; the new "Fly Faster!" Action card is your main way to move it (some Terror cards move it too). If it reaches the Airport outside your Action phase, apply the save at the start of your next Action phase, then fly back (landing freely).',
      'FROSTBITE: the Frostbite icon gives you, each Victim, and each Enemy in an OUTDOOR space a Frostbite token \u2014 or costs 1 health if they already have one. During each Upkeep, discard all Frostbite tokens from anyone indoors.',
      'The Skidozer (outdoor-only) lets you move to any outdoor space, or (just outside the Lab) place the "Hole" token to link those two spaces.',
    ],
    watchOuts: [
      'Frostbite stacks into real damage: lingering outdoors with a Frostbite token already on you costs health \u2014 duck indoors on Upkeep to shed it.',
      'The Helicopter can\u2019t shuttle back for more Victims until it has dropped its current load at the Airport \u2014 plan loads carefully.',
    ],
  },
  'wingard-cottage': {
    points: [
      'Space types: HOUSE = the Kitchen, both Bedrooms, Bathroom, Family Room, Foyer, Laundry Room and Garage. INDOORS = all House spaces plus the Shed and Boathouse. OUTDOOR = everything else.',
      'SUPPLY ITEMS: certain spaces show a Supply symbol (Discarded Tools, Nails, Rope, Wood). While on such a space (not passing through) spend Time to take that Supply Item card into a Backpack slot. Discarding a Supply card returns it faceup to the play area to be gained again.',
      'CRAFTING: spend the Items/Supply cards listed on an available Crafted Item card (plus the Time cost) to gain it into a Hand or Backpack slot. Discarded Crafted cards return faceup to be crafted again.',
      'Carry-over uses: if you craft using an item that has limited uses left, those remaining uses carry to the crafted item (e.g. a Shotgun with one use left crafts a Sawed-off Shotgun with one use left).',
    ],
    watchOuts: [
      'Crafting consumes the ingredient cards \u2014 weigh whether the crafted item is worth losing the parts, especially late-game.',
    ],
  },
  'storybook-woods': {
    points: [
      'Fewer spaces than most locations \u2014 it can feel easy but turns deadly fast because everything is close together.',
      'BRIDGES: three bridges cross the River and are fragile \u2014 only 1 Victim may follow you across a bridge (normal limit is 2). The Troll Bridge Event can add a fourth bridge token, which follows the same 1-Victim rule.',
      'THE RAFT: if you find the Raft item, choose 4 marked shore spaces and place Raft tokens so each touches both the river and a non-exit space. The Raft then lets you move to and from those spaces along the river per its Item card.',
    ],
    watchOuts: [
      'Only one Victim crosses a bridge at a time \u2014 escorting a group across the River takes several trips, exposing you between them.',
    ],
  },
  'wolfe-asylum': {
    points: [
      'PILLS: four types (3 yellow, 3 blue, 3 pink, 1 wild). End your movement on a space with a Pill token (not passing through) and spend Time to pick it up, placing it faceup beneath your Pill Effects card.',
      'CONSUMING: any time in the Action phase, consume any number of collected Pills (discard their tokens) and apply the Pill Effects card result. Taking TWO or THREE at once forces you to draw that many Side Effects cards afterward, one at a time. Taking one of EACH colour lets you randomly draw a powerful Amped card.',
      'Pill effects scale with how many you take at once \u2014 bigger combos do more but carry the Side Effects risk. You may take Pills in any order and as many as you like across the phase.',
      'STUNNED: some items can Stun an Enemy \u2014 place a Stun token under it; next Killer phase it ignores all movement (but still attacks). Discard all Stun tokens during Upkeep.',
    ],
    watchOuts: [
      'Side Effects cards are drawn one at a time and applied \u2014 a 3-pill combo can backfire hard, so weigh the benefit against the draws.',
      'The "Powerful Meds" event makes every Pill-consumption draw an EXTRA Side Effects card \u2014 more dangerous while it\u2019s in play.',
    ],
  },

  // ===== SERIES 3 =====

  // --- Killers ---
  hunter: {
    points: [
      'The Hunter comes in two models: the Mark V (active from the start) and the Mark X (appears late game). "The Hunter" always refers to whichever is the Active Killer.',
      'Unusual Bloodlust: it does NOT rise when Victims die. Instead it rises when the Hunter deals damage to you/an Ally OR takes damage itself \u2014 but only ONCE per phase (even if you and it damage each other). In the Panic phase, Victims in the Hunter\u2019s space also panic if Bloodlust rose that turn.',
      'Defeating the Mark V: the board\u2019s health/Final Health token belong to the Mark X, not the Mark V. To beat the Mark V you must destroy its Cybernetic Parts \u2014 each takes 2 damage to remove (damage accumulates across attacks in a phase but does NOT carry between phases). When a Part is destroyed, remove the top token from the Finale stack and roll to scatter it near the Mark V.',
      'Once all Cybernetic Part tokens are gone, the Mark V shuts down: slide its Dark Power under the Ally card (showing the ability) \u2014 it\u2019s no longer a Killer/Enemy. Only Countdown tokens remain on the Finale.',
      'Countdown \u2192 Mark X: with only Countdown tokens left, skip the Finale Killer Action and Terror draw; instead remove one Countdown token each Killer phase and +1 Bloodlust. When the second is removed (or the Mark X Terror card resolves), draw a new Setup card and place the Mark X there \u2014 it becomes the Active Killer and acts normally next turn.',
      'Repairing the Mark V into an Ally: pick up scattered Cybernetic Parts (spend Time in their space, keep facedown in Backpack). Once the Mark V is defeated and you\u2019re in its space, spend Time to flip a Part and add that many Health markers to the Mark V Ally card \u2014 it\u2019s now an Ally. If it ever loses all health as an Ally it\u2019s destroyed for good.',
    ],
    watchOuts: [
      'Bloodlust only ticks once per phase and never from Victim deaths \u2014 don\u2019t advance it for bystanders.',
      'Reinforced Endoskeleton (Epic Dark Power): the Mark V ignores all movement effects (damage effects still apply) \u2014 and the M134 Minigun armament gives it attack range 0\u20131, denying Reaction cards at range 1.',
    ],
  },
  razorface: {
    points: [
      'You start bound by 3 Afflictions (drawn faceup). To win you must PURGE all your Afflictions \u2014 Razorface\u2019s Final Health token cannot be revealed while any Affliction is in play (damage that would reveal it is ignored).',
      'Each Affliction card has a Purge Requirement (top) and a Purge Effect (bottom). During the Action phase, if you\u2019ve met the requirement you MAY purge it by resolving the bottom effect, then remove it from the game. You may only Purge ONE Affliction per turn.',
      'If you choose not to purge when the requirement is met, you must achieve the requirement again later. You can also GAIN new Afflictions during play (e.g. from the Soulbound card), so the count can grow past 3.',
      'Impossible Afflictions: if one becomes impossible to purge (e.g. no Victims on the board), remove it and draw a replacement \u2014 but if you must draw one and none remain, you immediately lose.',
    ],
    watchOuts: [
      'You can get Razorface to his Final Health token while Afflictions remain, but you can\u2019t finish him until the last Affliction is purged \u2014 sequence your purges before the kill.',
      'Only one Purge per turn means a late pile-up of Afflictions can be fatal \u2014 clear them steadily.',
    ],
  },
  slayer: {
    points: [
      'Two overlapping dimensions share one board: Our Dimension (yellow Victim meeples) and the Mirror Dimension (grey meeples). Your/Special Victims\u2019 current dimension is shown on the Dimension Tracker card. Slayer only MOVES in the Mirror Dimension unless an effect says otherwise.',
      'Only Victims in YOUR current dimension follow you. A Victim can only be SAVED when both you and the Victim are at an Exit space in Our Dimension. Space tokens/location effects apply to both dimensions unless specified.',
      'Slayer pulls Victims across: on the pull icon it targets the closest Victim in Our Dimension \u2014 swap a normal Victim\u2019s yellow meeple for grey (if grey meeples are out, the Mirror Victim farthest from Slayer is killed to free one), move a Special Victim\u2019s token, and panic the pulled Victim. If none could be pulled, increase Horror instead.',
      'Open a Rift (Action card) lets you cross into the Mirror Dimension in your space (Special Victims may come; normal Victims can\u2019t). You may return to Our Dimension any time in the Action phase (bringing Victims in your space back). If you\u2019re in the Mirror Dimension during Upkeep, you lose health.',
      'Attacking: you must be in Slayer\u2019s dimension to attack it \u2014 EXCEPT a Reaction card damages Slayer from any dimension. It can attack you in any dimension but only attacks Victims in the Mirror Dimension.',
    ],
    watchOuts: [
      'Lingering in the Mirror Dimension costs health every Upkeep \u2014 cross back when you can.',
      'During Panic, Our-Dimension Victims do NOT panic (unless the Interdimensional Rift Collapse Finale is out) \u2014 only Mirror-Dimension Victims sharing Slayer\u2019s space do.',
    ],
  },
  tormentor: {
    points: [
      'The Tormentor isn\u2019t on the board until the Finale is revealed; until then her Terror-card Killer Actions are ignored. While she\u2019s off-board, effects that place/count from "the Killer" use a randomly revealed Setup card\u2019s Killer space (then reshuffle it); effects that "place the Killer" are ignored.',
      'Once the Finale is revealed she appears at the start of the NEXT Killer phase on a random Setup card\u2019s Killer space, then acts normally for the rest of the game.',
      'DEATH TRAPS: trap icons make you or a Victim Trapped \u2014 draw a Death Trap card (Victim or Final Girl deck), place the matching token and put the meeple on the trap card\u2019s start space. Trapped subjects can\u2019t move, play Reactions, search or attack, and aren\u2019t targeted by the Tormentor.',
      'Escaping: complete the trap\u2019s Escape Tasks top-to-bottom (spend Time/damage/movement/health as listed), marking each done. Finishing the last frees the subject. A Trapped VICTIM reaching the trap\u2019s final space is killed (Bloodlust up) and you apply its Fail Result; the FINAL GIRL reaching the final space means you lose immediately (no Final Health token).',
      'Progressing traps: on the progress icon, advance every active trap meeple one space and apply that space\u2019s effect. Untrapped Victims in your space give +1 die (max +1) on rolls toward Escape Tasks.',
    ],
    watchOuts: [
      'If YOU are trapped, a Final Girl Death Trap reaching its end is an instant loss \u2014 prioritise your own escape over everything.',
      'Endless Traps (Epic Dark Power): each freed Victim triggers a new Death Trap on the farthest Victim \u2014 and you lose if there\u2019s no Victim left to trap.',
    ],
  },
  eyeless: {
    points: [
      'The Eyeless hunts by sound. Your Noise level (tracked on the Time track) rises by 1 for EACH Action card you resolve in the Action phase \u2014 regardless of result. Cards discarded for Time or to convert successes don\u2019t count; Reaction/Close Call played in other phases don\u2019t count. Noise resets to zero at the end of Upkeep.',
      'Items make noise too: silent (0), heard nearby (+1, melee etc.), or heard at distance (+3, gunshots/vehicles). Put a Noise card under noisy items as a reminder and add that Noise when used.',
      'Eyeless targeting: it targets normally UNLESS a Terror card shows a Final Girl Noise icon. Then it targets YOU only if BOTH are true: your current Noise \u2265 the icon\u2019s value, AND it can reach you with its movement. Otherwise resolve the card\u2019s "Otherwise" effect (which can still target you).',
    ],
    watchOuts: [
      'Every Action card is +1 Noise \u2014 a busy turn makes you loud and easy to find. Balance tempo against staying quiet before Killer-phase Terror draws.',
      'Hard Skin: the Eyeless ignores the first damage it takes each turn \u2014 plan to get past that with a bigger hit.',
    ],
  },

  // --- Locations ---
  'sunnydaze-mall': {
    points: [
      'The Savior is an Ally teen you must protect \u2014 if he dies you immediately lose. He is the Killer\u2019s primary target: when an Enemy targets "you", it targets the Savior instead (until he exits the board).',
      'Build Trust (Action card, usable only in the Savior\u2019s space) raises his Trust level on the Trust card. Higher Trust = more Ally actions available and more control; at the top ("I Believe You!") he may exit via an Exit space, which instantly grants your unclaimed Victim rewards and flips your card (Ultimate Ability). After he exits, YOU become the target again and the game ends normally.',
      'Savior cards: while he\u2019s in play, draw one each Upkeep and resolve by current Trust level. He panics like a Victim in the Panic phase.',
      'RAILINGS (arrows) overlook the Food Court. You/Allies may "jump" from a Railing to an adjacent Food Court space \u2014 roll a die, 5\u20136 safe, 1\u20134 take damage (Victims won\u2019t follow a jump). Anyone taking damage in a Railing space is knocked over into the Food Court below, taking extra damage. Enemies never jump voluntarily.',
      'STORES: taking damage in a store knocks you through an eligible wall (your choice) into the newly adjacent space for 1 extra damage \u2014 place a Destroyed Wall token there. Eligible walls are solid ones between two spaces with no opening/token.',
    ],
    watchOuts: [
      'The Savior dying is an instant loss \u2014 keeping him alive outranks almost everything, especially since the Killer prioritises him.',
      'Allies use Action cubes (placed on the Ally card, sliding right each Upkeep) \u2014 an action isn\u2019t available if a cube is already in its row.',
    ],
  },
  hellscape: {
    points: [
      'The board is four double-sided Hellscape tiles that constantly rearrange \u2014 by your choice (Hellshift card/items) or by effects. When a tile moves, ALL pieces on it move with it, so track positions carefully.',
      'Tile operations: SHIFT = move each tile one step in the named rotation; SWAP = two tiles trade places; FLIP = lift a tile, note each piece\u2019s colour-space, flip it, and return pieces to matching colours; REARRANGE = freely set all tiles (no flipping).',
      'Hellscape dice: once each Upkeep you must roll both dice \u2014 matching symbols FLIP the indicated tile; different symbols SWAP the indicated tiles.',
      'Walls & adjacency: each tile has 1\u20132 wall sides you can\u2019t move through, so areas can be sealed off until tiles shift. Panic into a wall = stay put. Killer targeting/range uses only unblocked paths (if none reach, ignore walls and use best judgement). "Place" effects ignore walls; "move" effects don\u2019t.',
    ],
    watchOuts: [
      'A flip or swap can strand you, the Killer, or Victims behind walls \u2014 powerful defensively, but it can also trap you away from Victims you need.',
      'The forced Upkeep dice roll changes the board every single turn \u2014 don\u2019t over-commit to a layout.',
    ],
  },
  falconwood: {
    points: [
      'Completing the randomly-chosen MISSION is mandatory to win \u2014 the Killer\u2019s Final Health token can\u2019t be revealed until the Mission is done (ignore damage that would reveal it before then; with multiple Killers this applies to the last one).',
      'Cards may tell you to Gain or Lose Progress on the Mission \u2014 follow the Mission sheet and track it with a marker.',
      'FRIENDS: completing the Mission brings a Friend to help. Friends are Special Victims but: they WILL follow you into the Killer\u2019s space, other Victims in their space are attacked before them, and they don\u2019t panic while in your space.',
      'River: BRIDGES are road paths crossing the river; RIVER CROSSINGS (blue lines) normally can\u2019t be used unless an effect allows it (Victims may follow, Enemies never can). Spaces joined only by a River Crossing are NOT adjacent/connected for range. Many cards use the 20-sided die.',
    ],
    watchOuts: [
      'No Mission, no kill \u2014 you can\u2019t win by damage alone, so progress the Mission even while surviving.',
    ],
  },
  'marrek-warehouse': {
    points: [
      'LOCKED EXITS: each Exit starts Locked \u2014 you can enter the space but can\u2019t save Victims there. Unlock via effects/items or wait for the automatic "Click!" Terror cards (which unlock an exit and remove its Locked token).',
      'RACK spaces are the tops of storage racks. You reach them only with the CLIMB card; you LEAVE them with normal movement (not Climb). LEAP jumps between two Rack spaces \u2014 fail and you fall to the ground (following Victims just climb down to you, unhurt).',
      'Climb & Leap aren\u2019t bought normally: any time in the Action phase, discard a Walk to take Climb OR Leap into hand, or discard a Sprint to take BOTH. Victims may follow you when you Climb or Leap.',
      'The Pit (centre): when panicking someone out of The Pit, roll 2 dice instead of 1 for direction.',
    ],
    watchOuts: [
      'You can\u2019t rescue through a Locked Exit \u2014 plan unlocks (or time the "Click!" cards) before escorting Victims there.',
    ],
  },
  utopia: {
    points: [
      'SAND SNAKES strike every turn: at the end of the Killer phase draw 2 Sand Snake cards and resolve them. Each does damage to ONE target on its named space by priority Victim \u2192 Final Girl \u2192 Minion \u2192 Killer, then burrows away. Sand Snakes aren\u2019t Minions and can\u2019t be attacked \u2014 you can only use Reaction cards/items to prevent their damage to you. One card reshuffles the discard back in (resolved after the others).',
      'SINKHOLES: when a space Collapses, Victims there are killed, you/Enemies take damage, and anyone left panics until they leave. Place a Sinkhole token \u2014 that space can never be entered or passed through again by anyone.',
      'BOULDER spaces are safe from Sand Snake attacks (and some cards reference them).',
    ],
    watchOuts: [
      'Sand Snakes can\u2019t be fought \u2014 only dodged or Reaction-blocked \u2014 so position to keep a Victim (higher priority) between the snakes and yourself when you can\u2019t avoid the named space.',
      'Sinkholes permanently remove spaces from the board \u2014 collapsing spaces can wall off routes for the rest of the game.',
    ],
  },

  // ===== VIGNETTES =====
  'the-birds': {
    points: [
      'There is no Killer \u2014 the threat is a swarm of Birds (Minions). To WIN you must save ALL the Special Victims using normal save rules (2 of them for the normal game, 3 for Hard). You LOSE instantly if every space on the board has 3 Birds, or if the Final Girl dies.',
      'Special Victims stay hidden until you either unlock your Ultimate Ability OR there are no normal Victims left on the board. Then place them on the farthest Search space(s) from you (one per space). They can never be attacked or killed, but otherwise behave like normal Victims.',
      'Birds never move on their own \u2014 only a special effect/item can move them. Each Bird token has a 1-bird and a 3-birds side for easy counting; a space holds at most 3 Birds.',
      'Spawning Birds (spawn icon): roll 2 dice and use the Bird Spawn card \u2014 one die result is HOW MANY Birds, the other is WHERE, and you choose which die feeds which. Birds always spawn at least once per round during the Minion Action (first step of the Killer phase), and often more from Terror cards. If a target space already has 3 Birds, place the overflow in an adjacent space of your choice, expanding outward until all are placed.',
      'Bird attacks (attack icon): an attack happens in the Final Girl\u2019s space if at least one Bird is there, AND in every space holding 3 Birds. Each attack hits ONE target for damage equal to the number of Birds in that space, prioritising normal Victims over the Final Girl.',
      'Destroying Birds: attack a space to remove 1 Bird per damage dealt (excess is lost) \u2014 this is how you keep the board from filling up.',
    ],
    watchOuts: [
      'When Birds attack, you MAY use Reaction cards to protect anyone in your space (an exception to the usual rule) \u2014 but to save a Victim you must prevent ALL the damage, since a single point kills them.',
      '"Killer" references on cards: there is none \u2014 if a card says move the Killer, spawn Birds instead; if it says place the Killer, place 3 Birds there instead. Ignore/redraw Events that need Special Victim meeples or don\u2019t make sense here.',
      'Some Location items may be useless against Birds (e.g. the Bear Trap) \u2014 that\u2019s expected; swap or live with it.',
    ],
  },
  'patsy-zombies': {
    points: [
      'No Killer here \u2014 the threat is Zombies (Minions) that clump into Hordes. To WIN you must kill ALL Zombies and Hordes; the moment none remain on the board, you win. You LOSE instantly if a 4th Horde would be created while 3 are already in play, or if the Final Girl dies.',
      'ZOMBIES are slow: they move only ONCE per Killer phase (during the Minion Action) and ignore all move icons on Terror cards. Spawning (spawn icon): place the number of Zombies shown by the current Bloodlust level, one at a time into Exit spaces, always filling the space with the fewest Zombies first (ties: start farthest from you).',
      'Zombie movement uses normal targeting, except a Zombie that can\u2019t reach its target instead panics (shambles 1 space in a random direction). Zombies attack as a GROUP: one target in their space for damage equal to the number of Zombies there, Victims before the Final Girl. When a Victim is killed by a Zombie attack, replace it with a Zombie token (Bloodlust up as normal) \u2014 so losses feed the swarm.',
      'HORDES form when 3+ Zombies share a space at the END of the Killer phase: replace them with a Horde token with health equal to the number of Zombies (min 3; the first Horde uses the Dark Power card\u2019s token and reveals the Dark Power). Hordes do NOT use Final Health tokens and have no upper health cap.',
      'A Horde counts as a KILLER for targeting/movement (Victims won\u2019t follow you into its space). It never disbands back into Zombies. If it shares a space with a loose Zombie, that Zombie is absorbed (+1 Horde health). Killing a Victim gives a Horde +1 health. "Kill X Zombies" effects instead read as "deal X damage to a Horde" against a Horde.',
      'VEHICLES: each Location has one special Vehicle (with its own Vehicle Action card from this vignette). It\u2019s hidden under the Exit-space tokens \u2014 entering an Exit for the first time reveals the tokens there; revealing the vehicle removes all Vehicle tokens and places that vehicle in your space (water vehicles go to the nearest eligible space), and you take its Action card. A vehicle whose card title has the driver icon can be used without being in its space.',
    ],
    watchOuts: [
      'Every Victim a Zombie kills becomes another Zombie \u2014 losses compound fast, and 3 Zombies in one space at end of Killer phase hardens into a Horde you can no longer whittle one-at-a-time.',
      'Three Hordes is the danger line: if a 4th would form you lose instantly, so thin big Zombie clusters before the Killer phase ends.',
      'Hordes have no Final Health token and no health cap \u2014 they just soak damage, so a neglected Horde that keeps eating Victims can become almost unkillable.',
    ],
  },
  destiny: {
    points: [
      'There is no Killer to attack. Your goal is to SAVE as many of the 5 Fated Victims as possible \u2014 AND in the correct order set by the facedown Death tokens on the Death Order card. Saving one out of order has consequences. When the Terror deck runs out, the game ends and you face the end-of-game Destiny phase.',
      'FATED VICTIMS behave like normal Victims with exceptions: they can\u2019t be replaced with Special Victims. When one leaves via an Exit it is NOT immediately saved \u2014 put its token on the first Death token on the Death Order that doesn\u2019t already have a Fated Victim token on it; whether it was really saved is settled later, when that Fated Death Terror card is resolved.',
      'If a Fated Victim DIES for any reason other than a Fated Death Terror card, place its token in the Limbo area of the Bloodlust card. Do NOT increase Bloodlust now \u2014 Bloodlust rises later, when that Fated Victim\u2019s Death token is revealed.',
      'DESTINY SYMBOL: the Death Order card shows what resolves when the Destiny symbol appears. You may play the Thwart Destiny Reaction card to ignore one Destiny symbol.',
      'KILLER ACTIONS: treat a Killer Action on a Terror card as if it were a Destiny symbol. If a Terror card has two Killer Actions, the Destiny symbol resolves twice. Ignore other Terror effects that relate to the Killer.',
      'PREMONITION (Action card): when played it lets you look at one or more Unknowns \u2014 a facedown Death token, a facedown Consequence or Punishment card, the next Terror card, the next Event card, the top Item card, or the Dark Power card \u2014 flipping the appropriate number faceup so you learn what\u2019s coming.',
    ],
    watchOuts: [
      'FATED DEATH TERROR CARD: when drawn, check the next Death token on the Death Order (start at START, follow the arrows), and flip it faceup. If a Fated Victim token sits on it and they match, you may have saved them \u2014 take the Saved reward and place the token on your Final Girl card; at the start of the next Action phase apply the save effects as normal. If they don\u2019t match, you saved out of order: kill the pictured victim, then move the mismatched Fated Victim token to Limbo. If the Death token is alone (no Fated Victim on top), kill that victim (applying Limbo consequences if they\u2019re in Limbo), increase Bloodlust, and place the token on the Consequence card under the Arrow.',
      'After each Fated Death Terror card: discard the Death token and move the Arrow token one Consequence card to the right so it always sits above the next Death token in line.',
      'NO MORE FATED VICTIMS ON THE BOARD (all are on the Death Order, in Limbo, or saved on your card): draw and resolve 2 Terror cards each Killer phase instead of 1.',
      'END OF GAME / DESTINY PHASE: after the final Terror card the game ends \u2014 there is no Finale. Resolve each Consequence card that has a Fated Victim on top (flip if facedown): meet its requirement or lose that much health via the Punishment beneath it; if flipping your Final Health token, treat it as normal health. Consequence cards without a Fated Victim are ignored. Survive all of them and you win.',
    ],
  },
};

/** Return the special play-rules summary for an entry (or null). */
export function getPlayRules(entry) {
  if (!entry) return null;
  return playRules[entry.id] || null;
}

/* --------------------------------------------------------------------------
   Phase-specific reminders per Killer / Location.
   Some scenarios inject steps into particular turn phases (a countdown that
   advances each Upkeep, snakes that strike at the end of the Killer phase,
   etc.). The Turn Tracker reads these for the CURRENT game's Killer + Location
   and shows them inline in the matching phase. Keyed by entry id, then by
   phase id: 'action' | 'planning' | 'killer' | 'panic' | 'upkeep'.
   Paraphrased mechanics only; the rule sheets remain the authority.
   -------------------------------------------------------------------------- */
export const phaseExtras = {
  // ----- Season 1 -----
  poltergeist: {
    action: ['Win check: you only win by saving Carolyn at an Exit while she\u2019s with you \u2014 the Poltergeist can\u2019t be attacked.'],
  },
  geppetto: {
    killer: ['First step of the Minion Action spawns a Puppet from "Ready" into Geppetto\u2019s space (if any), then move all "Exhausted" Puppets back to "Ready".'],
  },
  'dr-fright': {
    killer: ['If you are Asleep, you MUST resolve exactly one Boiler Room card at the END of this phase (slide to reveal; Dr. Fright attacks if his art shows).'],
  },
  inkanyamba: {
    upkeep: ['Volatile Temper (if the Dark Power is out): at the end of Upkeep make a Horror roll \u2014 on a miss, Unleash.'],
  },
  'sacred-groves': {
    killer: ['If the Finale is revealed (Sacred Groves Finale token in play): after the Killer Action, Unleash Divine Wrath and then Increase it by 1.'],
  },

  // ----- Season 2 -----
  evomorph: {
    killer: ['If the Evomorph has Vanished: skip the normal Killer Action and Terror draw \u2014 instead draw an Ambush card and resolve the side for its current stage.'],
  },
  organism: {
    killer: ['Regenerative Assimilation (Dark Power): if only ONE Mutated Organism is in play, it heals at the start of this phase. If the Horror Level is ever above 6, you\u2019ve been assimilated and lose.'],
    panic: ['Exposed Victims ALWAYS panic this phase, even if no Victim was killed this turn.'],
  },
  'big-bad-wolf': {
    killer: ['Check the Wolf\u2019s MODE (Track vs Slay) at the start of this phase \u2014 it sets which version of each Terror card\u2019s effects you apply.'],
    upkeep: ['Destructive Roar (Dark Power, once revealed): once this phase, remove from the game the top Item card of the Item deck closest to the Wolf.'],
  },
  'ratchet-lady': {
    killer: ['Feed the Madness (Dark Power): at the START of this phase, if there are no Maniacs on the board, spawn one in the Ratchet Lady\u2019s space.'],
  },
  'uss-konrad': {
    action: ['Keycards: if you start/end movement (not passing through) on a Keycard-token space, you may spend Time to take it.'],
    upkeep: ['If the Self Destruct is active: move the Countdown token one space right. If it reaches the end, the ship explodes \u2014 be at an Escape Pod or you lose.'],
  },
  'station-2891': {
    action: ['Move the Helicopter with Fly Faster! / its move icon; it must reach the Arctic Airport to drop off (save) Victims before returning.'],
    upkeep: ['Discard all Frostbite tokens from anyone INDOORS. (Frostbite icons give outdoor characters a token or cost 1 health if they already have one.)'],
  },
  'wolfe-asylum': {
    upkeep: ['Discard all Stun tokens still under Enemies.'],
  },

  // ----- Season 3 -----
  hunter: {
    killer: ['Once only Countdown tokens remain on the Finale: skip the Finale action + Terror draw \u2014 remove one Countdown token and +1 Bloodlust instead (2nd removal spawns the Mark X).'],
    panic: ['Also panic Victims in the Hunter\u2019s space if Bloodlust increased this turn (in addition to the normal panic rule).'],
  },
  slayer: {
    upkeep: ['If you are in the Mirror Dimension during Upkeep, you lose 1 health.'],
  },
  razorface: {
    action: ['You may Purge at most ONE Affliction this turn (if its Purge Requirement is met). All Afflictions must be purged before you can land the killing blow.'],
  },
  tormentor: {
    upkeep: ['Remove tokens/cards for any COMPLETED Death Traps from the game.'],
  },
  eyeless: {
    action: ['Noise +1 for EACH Action card you resolve (any result). Cards discarded for Time or to convert successes don\u2019t count. Add item Noise when you use a noisy item.'],
    killer: ['Hard Skin: the Eyeless ignores the FIRST damage it takes this turn \u2014 land a bigger hit to get past it. If a Terror card shows a Final Girl Noise icon, it targets you only if your Noise \u2265 that value and it can reach you.'],
    upkeep: ['Reset your Noise level to zero at the END of Upkeep.'],
  },
  'sunnydaze-mall': {
    upkeep: ['While the Savior is in play (and the Savior deck isn\u2019t empty): draw a Savior card and resolve it by the current Trust level.'],
  },
  hellscape: {
    upkeep: ['Roll the two Hellscape dice: matching symbols FLIP the indicated tile; different symbols SWAP the indicated tiles.'],
  },
  utopia: {
    killer: ['At the END of this phase, draw 2 Sand Snake cards and resolve their attacks (target priority: Victim \u2192 Final Girl \u2192 Minion \u2192 Killer).'],
  },
  falconwood: {
    killer: ['The Killer\u2019s Final Health token can\u2019t be revealed until the Mission is complete \u2014 ignore any damage that would reveal it while the Mission is unfinished (with multiple Killers, this applies to the last one).'],
  },
  'marrek-warehouse': {
    killer: ['When a "Click!" Terror card is drawn, it unlocks an Exit and removes its Locked token \u2014 remember you still can\u2019t save Victims at an Exit that\u2019s Locked.'],
  },
  // Storybook Woods, Wingard Cottage, Maple Lane, Creech Manor, Carnival of
  // Blood and others add no fixed per-phase step beyond their general play
  // rules, so they have no entry here.

  // ----- Vignettes -----
  'the-birds': {
    killer: ['Minion Action (first step): spawn Birds \u2014 roll 2 dice and use the Bird Spawn card (one die = how many, the other = where). Birds spawn at least once per round here.'],
    upkeep: ['Birdnado check: if there are 10 or more total Birds across your space and adjacent spaces, you lose 1 health.'],
  },
  'patsy-zombies': {
    killer: [
      'Zombies act in the Minion Action (first step): spawn per the current Bloodlust level and move ONCE (they ignore move icons on Terror cards).',
      'At the END of this phase, any space with 3+ Zombies becomes a Horde (first Horde reveals the Dark Power). Lose instantly if a 4th Horde would form.',
    ],
  },
  destiny: {
    action: ['No Killer to attack \u2014 move toward and escort Fated Victims out via Exits. A Fated Victim leaving the board isn\u2019t saved yet: place its token on the next open Death token on the Death Order. Apply any pending Saved-reward effects at the start of this phase.'],
    killer: [
      'Treat a Killer Action on a Terror card as a DESTINY symbol (two Killer Actions = resolve it twice); ignore other Killer-related Terror effects. Play Thwart Destiny to ignore one Destiny symbol.',
      'FATED DEATH TERROR card: flip the next Death token on the Death Order. Match with a Fated Victim on it = saved (take the reward, token to your card). Mismatch = you saved out of order (kill that victim, token to Limbo). Alone = kill that victim, +Bloodlust, token onto the Consequence under the Arrow. Then move the Arrow one card right.',
      'If NO Fated Victims remain on the board (all on the Death Order, in Limbo, or saved): draw and resolve 2 Terror cards this phase instead of 1.',
    ],
    upkeep: ['When the Terror deck runs out the game ends (no Finale) \u2014 then resolve the end-of-game Destiny phase: for each Consequence card with a Fated Victim on it, meet its requirement or lose the Punishment health. Survive them all to win.'],
  },
};

/** Phase-specific reminders for the current game, grouped by phase id. */
export function getPhaseExtras(killer, location) {
  const out = {};
  for (const entry of [killer, location]) {
    if (!entry) continue;
    const map = phaseExtras[entry.id];
    if (!map) continue;
    for (const [phaseId, items] of Object.entries(map)) {
      for (const text of items) {
        (out[phaseId] ||= []).push({ owner: entry.name, text });
      }
    }
  }
  return out;
}

/* --------------------------------------------------------------------------
   TIPS.
   Strategy advice grounded in the game's mechanics, expanded from the
   "Final Girl – Strategy Tips Handbook" (Chris Jordan, Oct 2026), which
   itself draws on community guides, designer rulings and the official
   rulebooks. Each tip carries its `source` (shown with the tip) and a
   `confidence`: 'confirmed' (rulebook / designer ruling) or 'reported' (a
   single player's experience or preliminary source). Content is paraphrased
   for licensing; the named reviews/threads are the attribution.

   `generalTips` apply to every game; `killerTips` and `locationTips` are
   keyed by id and surface for the relevant selection. Tip shape:
     { text, source, confidence }   (source/confidence optional)
   -------------------------------------------------------------------------- */

// Small helper to keep the tip data readable.
const tip = (text, source, confidence) => ({ text, source, confidence });

export const generalTips = [
  {
    category: 'Core strategy',
    items: [
      tip('The winning pattern for most killers: save victims early, get Horror into the green, find a weapon, then grind the finale with Guard and Retaliate.', 'Strategy Tips Handbook \u00b7 General strategy'),
    ],
  },
  {
    category: 'Time and cards',
    items: [
      tip('Discarding cards face down for +1 Time is one of the strongest moves in the game. Use it to afford big cards instead of holding cards you won\u2019t play.', 'Strategy Tips Handbook \u00b7 Time and cards'),
      tip('Every Action card is useful somewhere. Buy for the situation in front of you, not a fixed build.', 'Strategy Tips Handbook \u00b7 Time and cards'),
      tip('Action cards go back to the tableau and must be rebought; Items stay with you. Plan around what you\u2019ll still have next turn.', 'Strategy Tips Handbook \u00b7 Time and cards'),
      tip('Decide which cards you\u2019re willing to pitch for a partial success before you roll. A clean success saves them for more actions.', 'Strategy Tips Handbook \u00b7 Time and cards'),
      tip('Never let Time drop below zero outside the Action phase. You lose your entire next Action phase.', 'Strategy Tips Handbook \u00b7 Time and cards', 'confirmed'),
    ],
  },
  {
    category: 'Horror and dice',
    items: [
      tip('Get Horror into the green early, so every roll uses more dice. Distraction and Focus are the main tools.', 'Strategy Tips Handbook \u00b7 Horror and dice'),
      tip('Buy more Distraction against killers whose Terror cards and Bloodlust track spike Horror often, such as Hans.', 'Strategy Tips Handbook \u00b7 Horror and dice'),
    ],
  },
  {
    category: 'Victims and routing',
    items: [
      tip('Saving victims early denies the killer Bloodlust and buys you rounds to prepare. This holds against most killers.', 'Strategy Tips Handbook \u00b7 Victims and routing'),
      tip('Many save rewards on your Final Girl card need no roll. Plan your opening route to collect them.', 'Strategy Tips Handbook \u00b7 Victims and routing'),
      tip('Play to your Final Girl\u2019s strengths. Each one wants a different style.', 'Strategy Tips Handbook \u00b7 Victims and routing'),
      tip('If you\u2019re stuck in the killer\u2019s space, summoning a victim into it (for example with a Whistle) makes the killer attack them instead of you.', 'Strategy Tips Handbook \u00b7 Victims and routing', 'confirmed'),
    ],
  },
  {
    category: 'The finale',
    items: [
      tip('Find a decent weapon before the finale. A range-0 melee weapon adds its damage to Retaliate.', 'Strategy Tips Handbook \u00b7 The finale'),
      tip('Expect your plan to break every few turns. Final Girl rewards tactics more than fixed strategy.', 'Strategy Tips Handbook \u00b7 The finale'),
      tip('Check the killer\u2019s action on the Finale card at the start of every Killer phase. It is easy to run the wrong one.', 'Strategy Tips Handbook \u00b7 The finale'),
    ],
  },
  {
    category: 'Rules people commonly get wrong',
    items: [
      tip('The killer only moves with a boot icon. Target-only actions don\u2019t move them. Moving the killer every turn is the most common mistake.', 'Strategy Tips Handbook \u00b7 Common mistakes (designer, BGG)', 'confirmed'),
      tip('Ties go to the most victims. When a killer targets both you and victims, ties break towards the space with more victims. You don\u2019t count.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('Dying together is a win. If Retaliate kills the killer as you flip your last blank heart, you still win.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('Adrenaline Rush works both ways: +1 die when you\u2019re on your last heart, and +1 when the killer is on theirs.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('Finale reveals the Dark Power. Entering the Finale flips the Dark Power if it hasn\u2019t already.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('Panic needs a death and the killer\u2019s space. Victims only panic if someone died this turn and they share the killer\u2019s space.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('Killer phase cards are limited. Only Reaction cards and Close Call can be played then; Planning and Improvise can\u2019t.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('Any victim death raises Bloodlust. Even if a Terror card did it rather than the killer, unless the card says otherwise.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('Traps need the killer to enter. Placing a trap in the killer\u2019s current space does nothing.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('Items can\u2019t be used mid-move. Use them before or after moving.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('Items rearrange at set times. Only when you gain a new item, or in Upkeep. Two-handed vehicles may force you to drop a weapon.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('No peek after drawing an Item. Don\u2019t flip the next Item card unless the Search card says so.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('Killer heal icons are for the killer. A heart on any killer card heals them, not you.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('Guard only stops attacks. You can\u2019t Guard or Retaliate against damage that isn\u2019t an attack.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('Three successes \u2260 both lines. Three stars gives only the two-star result.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('Killers don\u2019t overheal. Starting health is their maximum unless a rule says otherwise (e.g. Ratchet Lady).', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
      tip('When a rule is genuinely unclear, the rulebook says pick the most thematic, the worst for you, or the funniest outcome.', 'Strategy Tips Handbook \u00b7 Common mistakes', 'confirmed'),
    ],
  },
  {
    category: 'Difficulty ladder',
    items: [
      tip('Easiest starts: Hans, then the Big Bad Wolf, then Razorface for Series 3. Hardest: Inkanyamba, the H.U.N.T.E.R. and the Volk\u2019ar.', 'Strategy Tips Handbook \u00b7 Killer-by-killer'),
      tip('Strongest Final Girls: Ellen, Dakota and Alois are rated among the strongest; Asami and Selena are the friendliest for beginners.', 'Strategy Tips Handbook \u00b7 Final Girl picks'),
      tip('The USS Konrad, Hellscape and L\u2019Armes Abbey are rated the best boards; Storybook Woods and Maple Lane the weakest.', 'Strategy Tips Handbook \u00b7 Location tips'),
    ],
  },
];

export const killerTips = {
  hans: [
    tip('No special rules, so he\u2019s the ideal learning killer.', 'Strategy Tips Handbook \u00b7 Hans'),
    tip('He raises Horror a lot. Buy extra Distraction or look for Horror-reducing items.', 'Strategy Tips Handbook \u00b7 Hans'),
    tip('He\u2019s slow and weak at low Bloodlust. Rescue victims fast to keep him that way.', 'Strategy Tips Handbook \u00b7 Hans'),
    tip('Even a strong Hans is predictable. Recycling Guard and Retaliate can beat him.', 'Strategy Tips Handbook \u00b7 Hans'),
    tip('His "Dark, Darker, Darkest" power reveals his second Dark Power immediately when the Finale forces a reveal.', 'Strategy Tips Handbook \u00b7 Hans', 'confirmed'),
    tip('The Aluminium Bat discards a Minor Dark Power and still does full damage to him.', 'Strategy Tips Handbook \u00b7 Hans', 'confirmed'),
    tip('Deny Bloodlust. Hans barely moves early on. Spend the opening turns rescuing as many victims as you can before he reaches them.', 'r/finalgirl "Hans is rough"; Shelfside review'),
    tip('Then trade blows. A Hans with low Bloodlust is weak in the finale. With a decent weapon you can stand in his space and swap hits until he drops.', 'r/finalgirl "Hans is rough"; Shelfside review'),
    tip('If he gets strong anyway, cycle Guard and Retaliate. He is simple and predictable, so a defensive grind still works.', 'r/finalgirl "Hans is rough"; Shelfside review'),
  ],
  poltergeist: [
    tip('She can\u2019t be damaged. You win by finding Carolyn in the Item decks and escaping with her, so search-strong Final Girls shine.', 'Strategy Tips Handbook \u00b7 Poltergeist'),
    tip('Keep some attack cards: several of her Terror cards can still be fought.', 'Strategy Tips Handbook \u00b7 Poltergeist'),
    tip('Hold on to Mr Floppy. Once her Dark Power is out, discarding him cancels "Carolyn? Where are you?!"', 'Strategy Tips Handbook \u00b7 Poltergeist'),
    tip('If "Forgetting Something?" appears, you need Mr Floppy as well as Carolyn to win.', 'Strategy Tips Handbook \u00b7 Poltergeist'),
    tip('Teleport cards can drop her on you just as you reach an exit. Don\u2019t relax once you have Carolyn.', 'Strategy Tips Handbook \u00b7 Poltergeist'),
    tip('"The Ground is Shaking" panics you once per space moved.', 'Strategy Tips Handbook \u00b7 Poltergeist', 'confirmed'),
    tip('Search first, rescue second. The win came from reaching a search space straight away and finding Carolyn on the second card. Searching matters more than saving victims here.', 'Dude Take Your Turn review; Jerome23 review'),
    tip('Play Selena. She unlocks her Ultimate after only 4 saves, gets a free Search action, and her Ultimate adds 2 dice to searches. Alice needs 6 saves and is too fragile for this killer.', 'Dude Take Your Turn review'),
    tip('Carry Guard. It is the best answer to her Unstoppable Evil attacks. Retaliate blocks but does no damage, as she can\u2019t be hurt.', 'Dude Take Your Turn review'),
    tip('Don\u2019t loop back. One loss came from finding Carolyn, losing her on the way downstairs and having to go back for her.', 'Dude Take Your Turn review'),
  ],
  inkanyamba: [
    tip('Very harsh at the Sacred Groves, where two Wrath tracks stack. Try him elsewhere first.', 'Strategy Tips Handbook \u00b7 Inkanyamba'),
    tip('Atonement cards are your main way to lower Killer Wrath. Three successes give a bigger drop.', 'Strategy Tips Handbook \u00b7 Inkanyamba'),
    tip('"Wrath of Death" raises Wrath by your current health, so full health hurts here.', 'Strategy Tips Handbook \u00b7 Inkanyamba'),
    tip('Don\u2019t rely on Atonement. It is unreliable with only one or two dice. Get Horror down first so you roll three.', 'Board Game Breakdown review'),
    tip('Hunt dual-purpose weapons. Some items damage him and lower Wrath at the same time. The Aluminium Bat also strips a Minor Dark Power.', 'Board Game Breakdown review'),
  ],
  geppetto: [
    tip('Each Puppet runs the full Terror card action. Killing Puppets cuts his output.', 'Strategy Tips Handbook \u00b7 Geppetto'),
    tip('With "Immortal Master" out, he can\u2019t lose his Final Health while all three Puppets are on the board. Keep at least one dead.', 'Strategy Tips Handbook \u00b7 Geppetto'),
    tip('"Join the Family": all three Puppets in your space drops you to your Final Health token.', 'Strategy Tips Handbook \u00b7 Geppetto'),
    tip('Puppets must end within 2 spaces of him. Distance from Geppetto keeps them off you.', 'Strategy Tips Handbook \u00b7 Geppetto'),
    tip('He can feel easy if you wipe the Puppets early.', 'Strategy Tips Handbook \u00b7 Geppetto', 'reported'),
    tip('Pick one plan early. Splitting effort between rescuing and damaging Geppetto got the reviewer overwhelmed. Commit to one.', 'Zatu review (2 games, 1 win)'),
    tip('Rescuing beat searching. Item traps made searching risky, so the second game focused on rescues, and it worked better.', 'Zatu review (2 games, 1 win)'),
    tip('Watch the Puppets. They gather around groups of victims and can kill several at once when a Terror card fires.', 'Zatu review (2 games, 1 win)'),
  ],
  'dr-fright': [
    tip('While you\u2019re Awake he can\u2019t attack you, and you can\u2019t hurt him. Choose when to sleep.', 'Strategy Tips Handbook \u00b7 Dr. Fright'),
    tip('Short and Long Rest always send you to sleep.', 'Strategy Tips Handbook \u00b7 Dr. Fright', 'confirmed'),
    tip('Boiler Room: he appears in each quadrant only once. Track what\u2019s been revealed to dodge attacks.', 'Strategy Tips Handbook \u00b7 Dr. Fright'),
    tip('You can reveal several Boiler Room cards in your Action phase to wake faster.', 'Strategy Tips Handbook \u00b7 Dr. Fright'),
    tip('Retaliate works in the Boiler Room, boosted only by range-0 weapons.', 'Strategy Tips Handbook \u00b7 Dr. Fright', 'confirmed'),
    tip('Booby traps hurt him even while you\u2019re Awake.', 'Strategy Tips Handbook \u00b7 Dr. Fright', 'confirmed'),
    tip('Victims won\u2019t follow you while Asleep. Do rescues while Awake.', 'Strategy Tips Handbook \u00b7 Dr. Fright'),
    tip('His Killer Action targets without moving, so don\u2019t move him unless there\u2019s a boot icon.', 'Strategy Tips Handbook \u00b7 Dr. Fright'),
    tip('Keep victims alive. Low Bloodlust keeps him nearly stationary. The third win came with four victims still alive, which gave spare rounds to Guard and Retaliate.', 'Dude Take Your Turn review (3 plays, 3 wins)'),
    tip('Grab the Megaphone. It pulls him one space towards you while moving a victim away, and was key to saving nearly everyone in one game.', 'Dude Take Your Turn review (3 plays, 3 wins)'),
    tip('Sleep with a weapon. He can\u2019t hurt you while you\u2019re Awake, so only fall asleep once you\u2019re armed and ready to fight.', 'Dude Take Your Turn review (3 plays, 3 wins)'),
  ],
  evomorph: [
    tip('The Hatchling hits very hard but barely moves. Don\u2019t fight it early.', 'Strategy Tips Handbook \u00b7 Evomorph'),
    tip('As a Hatchling its Bloodlust only rises when it kills. Keep victims away to delay evolution.', 'Strategy Tips Handbook \u00b7 Evomorph'),
    tip('While it\u2019s Vanished, Scan to place tokens. Ambushes can\u2019t place it on a scanned space.', 'Strategy Tips Handbook \u00b7 Evomorph'),
    tip('Scan with three successes lets you ambush it and skip its next Killer phase.', 'Strategy Tips Handbook \u00b7 Evomorph'),
    tip('Rated the best killer to take to other locations.', 'Strategy Tips Handbook \u00b7 Evomorph', 'reported'),
    tip('Be aggressive early. The Hatchling has only 4 health before it grows to 10.', 'Dude Take Your Turn review (3 plays, 2+ wins)'),
    tip('Winning combo: Flamethrower with Retaliate, then step into an adjacent space and attack again to avoid splash damage.', 'Dude Take Your Turn review (3 plays, 2+ wins)'),
    tip('Super Loader plus Guard or Retaliate is strong in the endgame.', 'Dude Take Your Turn review (3 plays, 2+ wins)'),
  ],
  organism: [
    tip('Test Exposed Victims with Test Kits or the Lab. You must kill every Mutated Organism (one to three) to win.', 'Strategy Tips Handbook \u00b7 Organism'),
    tip('An "assimilated" result goes back in the deck. The next one could be infected too.', 'Strategy Tips Handbook \u00b7 Organism'),
    tip('"Regenerative Assimilation": Horror above 6 is an instant loss.', 'Strategy Tips Handbook \u00b7 Organism'),
    tip('Kill one monster before testing the next victim. The first loss came from testing a second victim early: both were infected, then the third mutated too.', 'Dude Take Your Turn review (won on third play)'),
    tip('Get the Flamethrower. It costs no action and takes roughly half a killer\u2019s health per charge. Use it while they still have a lot of health.', 'Dude Take Your Turn review (won on third play)'),
    tip('Always hold a Guard card. The reviewer rated it essential.', 'Dude Take Your Turn review (won on third play)'),
  ],
  intruders: [
    tip('Attacking any Intruder makes it the Active Killer. Use that to control who acts.', 'Strategy Tips Handbook \u00b7 Intruders'),
    tip('Minor Dark Powers apply to all three, and soak damage first.', 'Strategy Tips Handbook \u00b7 Intruders'),
    tip('Easier to track than it sounds; especially good on other locations.', 'Strategy Tips Handbook \u00b7 Intruders', 'reported'),
    tip('Kill them one at a time. Fighting several Intruders at once is unmanageable.', 'Breakup Gaming Society; Dude Take Your Turn'),
    tip('Build a "super turn". Get Horror down for a third die and save up a big hand, then open with Improvise to force a double success.', 'Breakup Gaming Society session report'),
    tip('Get a shotgun. One success deals 3 damage, so two hits kill an Intruder. The crafted Sawed-off Shotgun needs no roll and also hits others in the same space.', 'Breakup Gaming Society session report'),
    tip('Strip Coordinated Attack first \u2013 the worst Minor Dark Power. Any hit damages Minor Dark Powers before the killers.', 'Breakup Gaming Society session report'),
    tip('Rescue the Outsider fast. Every killer targets him and kills victims on the way.', 'Breakup Gaming Society session report'),
    tip('Buy Distraction. A commenter rates it their third most-used card; keeping Horror in the green predicts wins against them.', 'Breakup Gaming Society session report'),
  ],
  'big-bad-wolf': [
    tip('The best step up after Hans.', 'Strategy Tips Handbook \u00b7 Big Bad Wolf'),
    tip('In Track mode it mostly raises Bloodlust. Save victims before its Dark Power flips it to Slay.', 'Strategy Tips Handbook \u00b7 Big Bad Wolf'),
    tip('"Destructive Roar" removes Item cards every Upkeep, so search early.', 'Strategy Tips Handbook \u00b7 Big Bad Wolf'),
    tip('Kill him fast. He starts at Horror 5, heals often and has extra attacks. Let him build momentum and you run out of victims.', 'Zatu review'),
  ],
  'ratchet-lady': [
    tip('She starts on just 6 health with no cap and several ways to heal. Engage early.', 'Strategy Tips Handbook \u00b7 Ratchet Lady'),
    tip('Calm turns Maniacs back into savable victims. Killing Maniacs doesn\u2019t raise Bloodlust.', 'Strategy Tips Handbook \u00b7 Ratchet Lady'),
    tip('"Shield of Madness": she can\u2019t lose health while any Maniac is on the board.', 'Strategy Tips Handbook \u00b7 Ratchet Lady'),
    tip('Leaving a space with two or more Maniacs costs Time.', 'Strategy Tips Handbook \u00b7 Ratchet Lady'),
    tip('Save victims early, or they become Maniacs that hunt you.', 'Zatu review (no wins yet)'),
    tip('Take the pills. Avoiding them was a mistake: without pills, neither Heather nor Veronica could win. One of each colour gives an Amped card.', 'Zatu review (no wins yet)'),
    tip('Budget for a long fight. Her healing drains your Final Health tokens. An early rush looks tempting on paper but hadn\u2019t worked.', 'Zatu review (no wins yet)'),
  ],
  hunter: [
    tip('Destroying a Cybernetic Part needs 2 damage in one phase. Damage doesn\u2019t carry over, so bunch your attacks.', 'Strategy Tips Handbook \u00b7 H.U.N.T.E.R.'),
    tip('Collect dropped parts to repair the Mark V into an Ally against the Mark X.', 'Strategy Tips Handbook \u00b7 H.U.N.T.E.R.'),
    tip('Its Bloodlust rises when it hurts you or is hurt, not when victims die.', 'Strategy Tips Handbook \u00b7 H.U.N.T.E.R.'),
    tip('Better received away from Sunnydaze Mall.', 'Strategy Tips Handbook \u00b7 H.U.N.T.E.R.', 'reported'),
    tip('Race to the Savior. The killer heads straight for him. Build Trust fully before moving him to an exit; Walkie Talkies build Trust from a distance.', 'Dude Take Your Turn review'),
    tip('Rescuing him flips your Ultimate immediately, even with no other saves.', 'Dude Take Your Turn review'),
    tip('Don\u2019t try to kill the Mark V. Deal 2 damage in one round to knock off parts, then collect and repair them to turn it into your Ally.', 'Dude Take Your Turn review'),
    tip('Winning combo: a Boomstick shot at the Mark V on a balcony added fall damage and knocked it out. A motorcycle ram (Chopper Keys) plus a second Boomstick took the Mark X to half health.', 'Dude Take Your Turn review'),
    tip('Use the balconies. Banana Peels and attacks knock enemies over railings for extra damage.', 'Dude Take Your Turn review'),
  ],
  razorface: [
    tip('The community\u2019s favourite Series 3 starting point.', 'Strategy Tips Handbook \u00b7 Razorface'),
    tip('You must purge every Affliction before his Final Health can be revealed. Only one purge per turn, so start early.', 'Strategy Tips Handbook \u00b7 Razorface'),
    tip('If you need a new Affliction and none remain, you lose.', 'Strategy Tips Handbook \u00b7 Razorface'),
    tip('Purge cheap or time-sensitive Afflictions first, as some get worse if left.', 'Dude Take Your Turn review (3 plays, won first game)'),
    tip('Purge the Affliction that heals him before you damage him.', 'Dude Take Your Turn review (3 plays, won first game)'),
  ],
  slayer: [
    tip('Slayer only attacks victims in the Mirror Dimension but can attack you anywhere.', 'Strategy Tips Handbook \u00b7 Slayer'),
    tip('You must be in its dimension to attack it, except through Reaction cards.', 'Strategy Tips Handbook \u00b7 Slayer'),
    tip('Each Upkeep in the Mirror Dimension costs you health. Keep trips short.', 'Strategy Tips Handbook \u00b7 Slayer'),
    tip('Retaliate is your main weapon. It hits him even from the real world; the reviewer used it repeatedly.', 'Dude Take Your Turn review (3 plays, wins)'),
    tip('Bring victims back to the real world, where he ignores them.', 'Dude Take Your Turn review (3 plays, wins)'),
    tip('One win came from the Rift Collapse finale, which drags him into the real world where you can hit him freely.', 'Dude Take Your Turn review (3 plays, wins)'),
    tip('One of the hardest killers, around a 42% win rate for them.', 'Dude Take Your Turn review (3 plays, wins)', 'reported'),
  ],
  tormentor: [
    tip('She isn\u2019t on the board until the Finale. Focus on freeing victims from Death Traps.', 'Strategy Tips Handbook \u00b7 Tormentor'),
    tip('An untrapped victim with you adds a die to Escape Task rolls.', 'Strategy Tips Handbook \u00b7 Tormentor'),
    tip('"No Escape!": if she locks every exit, you lose. Keep unlocking them.', 'Strategy Tips Handbook \u00b7 Tormentor'),
    tip('Winning combo: two Odds & Ends traps plus a Bowling Ball thrown from a shelf dealt 7 damage without a direct attack.', 'Dude Take Your Turn review (3 plays)'),
    tip('Triage traps. Give up on victims trapped too far away and take the Horror hit.', 'Dude Take Your Turn review (3 plays)'),
    tip('Best finale is No Escape: she doesn\u2019t attack, has 7 health and moves slowly.', 'Dude Take Your Turn review (3 plays)'),
    tip('Chainsaw plus Furious Strike can hit for 5, but it ends your Action phase.', 'Dude Take Your Turn review (3 plays)'),
  ],
  eyeless: [
    tip('Every Action card adds 1 Noise, and loud items add more. Stay under the Terror card\u2019s threshold to avoid being targeted.', 'Strategy Tips Handbook \u00b7 Eyeless'),
    tip('Put a Noise card under each item when you gain it, as a reminder of its cost.', 'Strategy Tips Handbook \u00b7 Eyeless'),
    tip('Wear it down before the finale. Its finales attack twice, so hold Reaction cards.', 'Dude Take Your Turn review'),
    tip('Deal several hits per turn to beat Hard Skin, which ignores the first damage.', 'Dude Take Your Turn review'),
    tip('Finish it quietly. Big attacks can push Noise over 4 and drag it onto you.', 'Dude Take Your Turn review'),
  ],
  'the-birds': [
    tip('Race to the exits; only kill Birds when you must. Birds spread rather than chase, so you can often go several turns without being attacked.', 'Dude Take Your Turn review (3 plays, 1 win at Creech Manor)'),
    tip('Route around full spaces. Birds only attack in your space or where a victim\u2019s space holds three.', 'Dude Take Your Turn review'),
    tip('Melanie suits this vignette. Her Ultimate removes two Birds for one health.', 'Dude Take Your Turn review'),
    tip('Best finale is Endless Swarm, where Birds never attack. Fowl Aggression and Insurmountable Odds are much harder.', 'Dude Take Your Turn review'),
    tip('Avoid small boards like Storybook Woods, where Birds overrun you faster.', 'Dude Take Your Turn review'),
  ],
  'patsy-zombies': [
    tip('Kill every Zombie and Horde to win. A fourth Horde forming is a loss, so break up groups of three before the Killer phase ends.', 'Strategy Tips Handbook \u00b7 Terror From the Grave'),
    tip('Zombies move only once per Killer phase. Use their slowness to kite them.', 'Strategy Tips Handbook \u00b7 Terror From the Grave'),
    tip('Find the location\u2019s vehicle early; each has a powerful Vehicle Action card.', 'Strategy Tips Handbook \u00b7 Terror From the Grave'),
  ],
  destiny: [
    tip('Save Fated Victims in the Death Order. Use Premonition to reveal the order before committing.', 'Strategy Tips Handbook \u00b7 Terror From Destiny'),
    tip('In the final Destiny phase, Consequence cards can cost you health. Keep enough health and items to survive it.', 'Strategy Tips Handbook \u00b7 Terror From Destiny'),
  ],
};

export const locationTips = {
  'camp-happy-trails': [
    tip('No special rules. The Motorboat moves with you and can be used as often as you can pay. Enemies can cross the Lake.', 'Strategy Tips Handbook \u00b7 Camp Happy Trails'),
    tip('Get the boat keys. Ferrying victims across the lake speeds up rescues. The Bow and Bear Trap are the other standout items.', 'r/finalgirl "Hans is rough"; Shelfside review'),
  ],
  'creech-manor': [
    tip('One-way spaces bind everyone; only the Rope Ladder undoes them. Exits are at street level, so bring victims down early.', 'Strategy Tips Handbook \u00b7 Creech Manor'),
    tip('Avoid the Attic. Victims sent there tend to die in bulk, which can trigger her Dark Power in the first turn.', 'Dude Take Your Turn review; Jerome23 review'),
    tip('Keep a Flashlight or Candle if Lights Out comes up, or your movement collapses.', 'Dude Take Your Turn review'),
    tip('If it feels unfair, pair the Poltergeist with another location, or Creech Manor with another killer.', 'Dude Take Your Turn review'),
  ],
  'sacred-groves': [
    tip('Keep victims off the Burial Ground, Shrine and Holy Groves to stop Divine Wrath rising. Atonement cards lower it. Wrath discards come from your hand.', 'Strategy Tips Handbook \u00b7 Sacred Groves'),
    tip('Keep victims off the red Sacred spaces, which drive Divine Wrath up.', 'Board Game Breakdown review'),
    tip('Barbara starts with extra health and rewards hitting him early; Adelaide is weak early but strong late.', 'Board Game Breakdown review'),
  ],
  'carnival-of-blood': [
    tip('Each Item deck hides one trap; Zappo or Asami avoid them. Terror Trap tokens stay and hurt you every time you enter. Enemies ignore them.', 'Strategy Tips Handbook \u00b7 Carnival of Blood'),
    tip('Charlie won it. After her rescues she can take Critical Blow for 3 health, which let her roll big and push damage into Geppetto. Her extra save slots also lower Horror.', 'Zatu review (2 games, 1 win)'),
    tip('Asami is the safer choice: immune to Item Traps, draws two items and keeps one.', 'Zatu review (2 games, 1 win)'),
  ],
  'maple-lane': [
    tip('Convince is needed to enter occupied houses, every time. Empty houses are free. Each house can be searched once, so spread across quadrants.', 'Strategy Tips Handbook \u00b7 Maple Lane'),
    tip('Boost Convince. The Bible adds 2 dice. At three Horror dice you can sometimes enter a house and take the top item without searching.', 'Dude Take Your Turn review (3 plays, 3 wins)'),
    tip('Plan routes across quadrants. Each house can only be searched once and each quadrant holds three items.', 'Dude Take Your Turn review (3 plays, 3 wins)'),
    tip('Finale "Everyone Must Die": he can be hit from anywhere while you sleep. With plenty of victims alive you have time to Retaliate him down.', 'Dude Take Your Turn review (3 plays, 3 wins)'),
    tip('Keep a Crucifix for "Slicing Off His Own Fingers", which hits your Horror.', 'Dude Take Your Turn review (3 plays, 3 wins)'),
  ],
  'uss-konrad': [
    tip('Plan keycard use before spending them: they open shafts and power the Crusher, Incinerator, Airlock and Self Destruct. Dying with the killer by Airlock or Self Destruct is a loss.', 'Strategy Tips Handbook \u00b7 USS Konrad'),
    tip('Rated one of the best boards.', 'Strategy Tips Handbook \u00b7 Location tips'),
    tip('Rescue through the bottom escape pods. Two followers travel with you, so three victims leave at once. Many setups start victims near a pod.', 'Dude Take Your Turn review (3 plays, 2+ wins)'),
    tip('Use the Orphan Girl. She lets you use vents without keycards and bring extra victims. One game saved many victims this way.', 'Dude Take Your Turn review (3 plays, 2+ wins)'),
    tip('Scan for safety. Scan tokens stop Ambush cards placing it next to you. With three dice you can pull it into your space and get the first hit.', 'Dude Take Your Turn review (3 plays, 2+ wins)'),
    tip('Jenette\u2019s flipped side gives extra hands and extra Flamethrower ammo; Ellen gets out of the pod room fast.', 'Dude Take Your Turn review (3 plays, 2+ wins)'),
  ],
  'station-2891': [
    tip('Victims are only saved by the Helicopter reaching the Airport, so keep buying Fly Faster. Frostbite punishes time outdoors.', 'Strategy Tips Handbook \u00b7 Station 2891'),
    tip('Skip the helicopter if needed. The winning game ignored rescues almost entirely. If you do rescue, buy Fly Faster.', 'Dude Take Your Turn review (won on third play)'),
    tip('Stay indoors to avoid Frostbite, which kills victims.', 'Dude Take Your Turn review (won on third play)'),
    tip('Uki is sturdy from the start; Kate is fragile until she saves 6 victims.', 'Dude Take Your Turn review (won on third play)'),
  ],
  'wingard-cottage': [
    tip('Collect Supply Items and craft weapons. Limited uses carry over into the crafted item.', 'Strategy Tips Handbook \u00b7 Wingard Cottage'),
    tip('Craft in the shed. Ava built a Spiked Bat that quickly finished an Intruder.', 'Breakup Gaming Society session report'),
    tip('Keep the Sawed-off Shotgun near the Garage, where the Discarded Tools are.', 'Breakup Gaming Society session report'),
    tip('The winning game used a shotgun, snare traps and the Home Security event to keep the Intruders outside, then hunted them inside.', 'Breakup Gaming Society session report'),
  ],
  'storybook-woods': [
    tip('Small board, turns deadly fast. Only one victim follows you over each bridge.', 'Strategy Tips Handbook \u00b7 Storybook Woods'),
    tip('Choose your bridge plan. Each bridge carries you and one victim. Pick between a quick exit with one victim or a longer loop that saves more.', 'Zatu review'),
    tip('The Raft is a quick escape, but each Raft token you pass through costs Time.', 'Zatu review'),
    tip('Gretel turns 2s into successes on key rolls and lowers Horror with extra saves; Red dodges when he\u2019s within 2 spaces.', 'Zatu review'),
  ],
  'wolfe-asylum': [
    tip('One pill of each colour gives an Amped card. Multi-pill doses are strong but force Side Effects.', 'Strategy Tips Handbook \u00b7 Wolfe Asylum'),
    tip('Stun her or her Maniacs \u2013 a useful option here.', 'Zatu review (no wins yet)'),
    tip('Try her elsewhere first; the reviewer planned Hans or Geppetto in the Asylum as an easier way in.', 'Zatu review (no wins yet)'),
  ],
  'sunnydaze-mall': [
    tip('Damage on a Railing drops you to the Food Court for extra damage. Build the Savior\u2019s Trust early so he can exit and unlock your Ultimate.', 'Strategy Tips Handbook \u00b7 Sunnydaze Mall'),
    tip('Tali suits the Mall better than Kat, whose gun bonus has only two guns to work with.', 'Dude Take Your Turn review'),
  ],
  hellscape: [
    tip('Hellshift lets you rearrange tiles to wall off the killer. "Place" ignores walls; "move" doesn\u2019t.', 'Strategy Tips Handbook \u00b7 Hellscape'),
    tip('One of the best-rated boards.', 'Strategy Tips Handbook \u00b7 Location tips'),
    tip('Use Hellshift to strand him. If he\u2019s stuck on a tile with no victims, the board works for you.', 'Dude Take Your Turn review (3 plays, won first game)'),
    tip('Check exits before shifting. Upkeep tile moves can cut you off right after a rescue.', 'Dude Take Your Turn review (3 plays, won first game)'),
    tip('Best item: Discipline of Courage (health for Horror reduction). The Haladie adds damage when he stands on a Hellscape tile.', 'Dude Take Your Turn review (3 plays, won first game)'),
    tip('Kenzie rescues several victims in one turn with her movement bonus.', 'Dude Take Your Turn review (3 plays, won first game)'),
    tip('The loss came from rolling a 1 with 2 health left in the finale \u2013 bank health before the final fight.', 'Dude Take Your Turn review (3 plays, won first game)'),
  ],
  falconwood: [
    tip('The Mission is mandatory. The killer\u2019s Final Health can\u2019t be revealed until it\u2019s done; finishing it brings a Friend ally.', 'Strategy Tips Handbook \u00b7 Falconwood'),
    tip('Pizza Delivery Van (two extra moves, an extra follower) and Dragon\u2019s Breath (3 damage) were the standout items. Keep the Adopted Father alive.', 'Dude Take Your Turn review (3 plays, wins)'),
    tip('Janelle combo: stack her token to +5 with a weapon and Critical Blow for 9\u201310 damage in one hit (it doesn\u2019t apply to Retaliate).', 'Dude Take Your Turn review (3 plays, wins)'),
  ],
  'marrek-warehouse': [
    tip('Exits start Locked. Swap Walk or Sprint for Climb and Leap to use the racks.', 'Strategy Tips Handbook \u00b7 Marrek Warehouse'),
    tip('Use the racks. Climb and Leap carry victims; a failed Leap costs 2 health.', 'Dude Take Your Turn review (3 plays)'),
    tip('Mandy is the reliable pick: her Ultimate makes unarmed attacks deal 3, so you don\u2019t need a weapon.', 'Dude Take Your Turn review (3 plays)'),
    tip('Get victims to an exit before it unlocks \u2013 with "Smarter Than They Look" they save themselves.', 'Dude Take Your Turn review (3 plays)'),
  ],
  utopia: [
    tip('Sand Snakes strike two spaces each turn; Boulder spaces are safe, and the Bulldozer protects you. Sinkholes are permanent.', 'Strategy Tips Handbook \u00b7 Utopia'),
    tip('Fight from the Boulders. They\u2019re safe from Sand Snakes and give ranged weapons extra range.', 'Dude Take Your Turn review'),
    tip('Find the Canteen early to beat Dehydration.', 'Dude Take Your Turn review'),
  ],
};

/** Normalise a tip to the { text, source, confidence } object shape. */
export function normaliseTip(t) {
  return typeof t === 'string' ? { text: t } : t;
}

/** All tips relevant to the current selection, grouped. */
export function getTips(killer, location) {
  return {
    general: generalTips,
    killer: killer ? { name: killer.name, items: killerTips[killer.id] || [] } : null,
    location: location ? { name: location.name, items: locationTips[location.id] || [] } : null,
  };
}

/* --------------------------------------------------------------------------
   Achievements per Killer / Location (Season 1 Feature Film rulebook).
   These are the in-game accomplishment conditions. Shown as tickboxes at the
   end of a game so you can record which you earned, and tracked in the
   Achievements & Stats tab. Keyed by id; each is a stable { id, label }.
   -------------------------------------------------------------------------- */
function mkAchievements(ownerId, labels) {
  return labels.map((label, i) => ({ id: `${ownerId}-a${i + 1}`, label }));
}

export const achievements = {
  // --- Killers ---
  hans: mkAchievements('hans', [
    'Defeat Hans at Camp Happy Trails.',
    'Defeat Hans at five different Locations.',
    'Defeat Hans when his Epic Dark Power has been revealed.',
    'Defeat Hans in Extreme Horror Mode.',
    'Defeat Hans without saving any Victims.',
    'Defeat Hans without losing any health.',
    'Defeat Hans with your bare hands (no weapon attacks).',
    'Defeat Hans after he has revived once.',
    'Inflict 6 damage on Hans in a single attack.',
    'Discard BOTH of Hans\u2019 Minor Dark Powers in a single attack.',
  ]),
  poltergeist: mkAchievements('poltergeist', [
    'Defeat the Poltergeist at Creech Manor.',
    'Defeat the Poltergeist at five different Locations.',
    'Defeat the Poltergeist in Extreme Horror Mode.',
    'Defeat the Poltergeist with Mr. Floppy in your inventory.',
    'Defeat the Poltergeist having searched in 3 separate spaces.',
    'Defeat the Poltergeist in under 5 turns.',
    'Defeat the Poltergeist ending the game with full health.',
    'Unlock your Ultimate Ability against the Poltergeist.',
    'Witness the Poltergeist kill 3 or more Victims in one turn.',
    'Defend against all damage from Unstoppable Evil.',
  ]),
  inkanyamba: mkAchievements('inkanyamba', [
    'Defeat Inkanyamba at the Sacred Groves.',
    'Defeat Inkanyamba at five different Locations.',
    'Defeat Inkanyamba in Extreme Horror Mode.',
    'Defeat Inkanyamba after all five \u201CWrath of...\u201D Terror cards have been revealed.',
    'Defeat Inkanyamba without playing any Atonement cards.',
    'Defeat Inkanyamba before his Dark Power has been revealed.',
    'Deliver the killing blow to Inkanyamba while the Horror level is maxed out.',
    'Deliver the killing blow to Inkanyamba when Killer Wrath is at 10.',
    'Survive attacks from Inkanyamba in a single turn totalling at least 6 damage.',
    'Witness Inkanyamba kill 4 Victims in a single turn.',
  ]),
  geppetto: mkAchievements('geppetto', [
    'Defeat Geppetto at the Carnival of Blood.',
    'Defeat Geppetto at five different Locations.',
    'Defeat Geppetto in Extreme Horror Mode.',
    'Kill 5 or more Puppets in one game.',
    'Kill 3 Puppets in one turn.',
    'Deal 5 or more damage to Geppetto in one Action phase.',
    'Defeat Geppetto after revealing your Final Health token.',
    'Defeat Geppetto after revealing his Epic Dark Power.',
    'Kill multiple Puppets in different spaces in one Action phase.',
    'Kill a Puppet with Furious Strike.',
  ]),
  'dr-fright': mkAchievements('dr-fright', [
    'Defeat Dr. Fright at Maple Lane.',
    'Defeat Dr. Fright at five different Locations.',
    'Defeat Dr. Fright in Extreme Horror Mode.',
    'Exit the Boiler Room without having taken any damage.',
    'Retaliate successfully against a Boiler Room attack.',
    'Damage Dr. Fright while you are Awake.',
    'Defeat Dr. Fright after he has revived once.',
    'Resolve 3 or more Boiler Room cards in one turn.',
    'Use a Short Rest or Long Rest card to go to sleep.',
    'Defeat Dr. Fright before the Finale is revealed.',
  ]),

  // --- Locations ---
  'camp-happy-trails': mkAchievements('camp-happy-trails', [
    'Win a game at Camp Happy Trails.',
    'Defeat five different Killers at Camp Happy Trails.',
    'Lure the Killer into the Bear Trap using the Fireworks.',
    'Save both your Boyfriend and your Girlfriend in a single game.',
    'Save the Damned in a game.',
    'Kill the Killer with the Axe immediately after using the Pepper Spray.',
    'Use the Lucky Rabbit\u2019s Foot and receive all four bonuses.',
    'Have a space burst into flames while you and the Killer are both there.',
    'Defeat the Killer in the Lake.',
    'During the Bonfire setup, save all 6 Victims that begin at the Firepit.',
    'Save 5 Victims in a single turn.',
  ]),
  'creech-manor': mkAchievements('creech-manor', [
    'Win a game at Creech Manor.',
    'Defeat 5 different Killers at Creech Manor.',
    'Save 2 Victims with the Helicopter at the same time.',
    'Witness at least 2 Victims jump out a window to their death.',
    'Win a game where the Ghost Hunters event was revealed.',
    'Kill a Victim with the Ritual Dagger.',
    'Move 6 or more spaces in one Action phase.',
    'Find 4 or more Item cards in one game.',
    'Win a game where at least half of the Victims were saved.',
    'Win a game with the Lights Out event in play.',
  ]),
  'sacred-groves': mkAchievements('sacred-groves', [
    'Win a game at the Sacred Groves.',
    'Defeat five different Killers at the Sacred Groves.',
    'Be in the same space as the Holy Man when he reaches the Killer.',
    'Use the Airhorn to panic at least 6 Victims at once.',
    'Defeat the Killer on Hallowed Ground.',
    'Defeat the Killer at a Sacred space that has been Closed for Maintenance.',
    'Win a game without playing any Atonement cards.',
    'Win a game where Divine Wrath never gets higher than 4.',
    'Deliver the killing blow with the Old Rifle while at a Sacred space.',
    'Witness at least 8 Victims at a single Sacred space.',
    'Win without letting the Tour Guide leave your side or die.',
  ]),
  'carnival-of-blood': mkAchievements('carnival-of-blood', [
    'Win a game at the Carnival of Blood.',
    'Defeat five different Killers at the Carnival of Blood.',
    'Win a game where no traps were triggered.',
    'Win a game where 3 or more traps were triggered.',
    'Deliver the killing blow to the Killer with the Golf Cart.',
    'Witness the Werewolf kill a Minion.',
    'Win with Zappo still with you.',
    'Move 5 or more spaces in one Action phase.',
    'Find an item by the end of turn 2.',
    'Unlock your Ultimate Ability at the Carnival of Blood.',
    'Save 3 or more Victims in one turn.',
  ]),
  'maple-lane': mkAchievements('maple-lane', [
    'Win a game at Maple Lane.',
    'Defeat five different Killers at Maple Lane.',
    'Save a Victim with Officer Kopp.',
    'Search each quadrant at least once.',
    'Gain an item using Convince.',
    'Search all 3 houses in one quadrant.',
    'Find 2 or more Crucifixes.',
    'Win a game where 3 or more events were revealed.',
    'Win a game where at least half of the Victims were killed.',
    'Win a game where two exits had Road Blocks.',
    'Kill an Enemy with an Odds and Ends token.',
  ]),

  // ===== SERIES 2 =====

  // --- Killers ---
  evomorph: mkAchievements('evomorph', [
    'Defeat the Evomorph on the USS Konrad.',
    'Defeat the Evomorph at five different Locations.',
    'Defeat the Evomorph in Extreme Horror Mode.',
    'Defeat the Evomorph immediately after forcing it to appear via a successful Scan.',
    'Defeat the Evomorph before it becomes an Adult.',
    'Prevent the Evomorph being placed in your space due to a Scan token there.',
    'Witness the Evomorph Vanish at least 5 times.',
    'Defeat the Evomorph without losing any health.',
    'Deal damage to the Evomorph both before and after it becomes an Adult.',
    'Remove 2 Scan Action cards from the game.',
  ]),
  organism: mkAchievements('organism', [
    'Defeat the Organism at Station 2891.',
    'Defeat the Organism at five different Locations.',
    'Defeat the Organism in Extreme Horror Mode.',
    'Defeat the Organism before the Finale is revealed.',
    'Defeat the Organism using only the Lab to test Exposed Victims.',
    'Defeat the Organism with all 3 Minor Dark Powers on the same Mutated Organism.',
    'Defeat the Organism with all 3 Exposed Victims assimilated when the Finale is revealed.',
    'Defeat the Organism without any Victim being killed by a Mutated Organism.',
    'Survive attacks from 2 or more Mutated Organisms on the same turn.',
    'Kill 2 or more Mutated Organisms on the same turn.',
  ]),
  intruders: mkAchievements('intruders', [
    'Defeat the Intruders at Wingard Cottage.',
    'Defeat the Intruders at five different Locations.',
    'Defeat the Intruders in Extreme Horror Mode.',
    'Defeat the Intruders by killing all 3 after the Finale is revealed.',
    'Defeat the Intruders before the Finale is revealed.',
    'Witness the Intruders kill 5 or more Victims in a single turn.',
    'Witness all three Killers recover health from their black Final Health token.',
    'Survive an attack from each Killer on the same turn.',
    'Survive 3 attacks from the same Killer on the same turn.',
    'Kill all 3 Killers on the same turn.',
  ]),
  'big-bad-wolf': mkAchievements('big-bad-wolf', [
    'Defeat the Big Bad Wolf at Storybook Woods.',
    'Defeat the Big Bad Wolf at five different Locations.',
    'Defeat the Big Bad Wolf in Extreme Horror Mode.',
    'Defeat the Big Bad Wolf while it\u2019s in Track mode.',
    'Defeat the Big Bad Wolf in a game where all 3 Minor Dark Powers came into play.',
    'Defeat the Big Bad Wolf after revealing its Epic Dark Power.',
    'Defeat the Big Bad Wolf with your bare hands (no weapon attacks).',
    'Defeat the Big Bad Wolf with Bloodlust at maximum.',
    'Witness the Big Bad Wolf kill a Victim while moving 4 or more spaces.',
    'Use an Axe to deliver the killing blow to the Big Bad Wolf.',
  ]),
  'ratchet-lady': mkAchievements('ratchet-lady', [
    'Defeat the Ratchet Lady at Wolfe Asylum.',
    'Defeat the Ratchet Lady at five different Locations.',
    'Defeat the Ratchet Lady in Extreme Horror Mode.',
    'Defeat the Ratchet Lady after she reaches at least 15 health.',
    'Defeat the Ratchet Lady without her ever exceeding her starting health.',
    'Defeat the Ratchet Lady without killing any Maniacs.',
    'Defeat the Ratchet Lady without Calming any Maniacs.',
    'Defeat the Ratchet Lady in a game where you couldn\u2019t place a Maniac (meeples ran out).',
    'Convert 4 Maniacs to Victims and save them on the same turn.',
    'Calm 2 Maniacs and kill 2 Maniacs on the same turn.',
  ]),

  // --- Locations ---
  'uss-konrad': mkAchievements('uss-konrad', [
    'Win a game on the USS Konrad.',
    'Win a game using the Self Destruct.',
    'Activate the Airlock with the Killer in the Hangar.',
    'Have the Crusher deal the final damage to the Killer.',
    'Have the Incinerator deal the final damage to the Killer.',
    'Save the Orphan Girl and Jonas the Cat.',
    'Win with no Victim killed by the Crusher, Incinerator, or Airlock.',
    'Defeat the Killer with the Super Loader equipped.',
    'Use the Flamethrower for the killing blow while also damaging yourself.',
    'Win a game where at least half the Victims were saved.',
  ]),
  'station-2891': mkAchievements('station-2891', [
    'Win a game at Station 2891.',
    'Save at least 6 Victims.',
    'Win a game with no Victims dying from Frostbite.',
    'Win a game without using the Fly Faster! Action card.',
    'Win a game using only weapons from the Armory.',
    'Save two or more Special Victims.',
    'Use the Flamethrower to deal at least 5 damage to an Enemy.',
    'Use an Alaskan Malamute to deliver the killing blow to the Killer.',
    'Obtain an Item from the Supply Closet, Tool Shed, Commander\u2019s Hut and Armory.',
    'Witness you, an Enemy and a Victim all take Frostbite damage on the same turn.',
  ]),
  'wingard-cottage': mkAchievements('wingard-cottage', [
    'Win a game at Wingard Cottage.',
    'Win a game using only Crafted Items (regular Items may still be used for crafting).',
    'Craft 4 Crafted Items.',
    'Use the Sawed-off Shotgun to damage at least 3 Enemies at once.',
    'Witness an Enemy trigger the Nail Trap and the Snare on the same turn.',
    'Use the Blender to deal 6 damage to an Enemy.',
    'Witness a Victim move 2+ spaces and be saved while resolving Escape Attempt.',
    'Save 4 Victims with the Boat.',
    'Win a game without entering the house.',
    'Save a Victim on each of the 3 Exits on the same turn.',
  ]),
  'storybook-woods': mkAchievements('storybook-woods', [
    'Win a game at Storybook Woods.',
    'Win a game where at least half the Victims were saved.',
    'Defeat the Killer at Grandmother\u2019s House.',
    'Move Victims across each of the 3 Bridges.',
    'Attack the Killer with 6 dice.',
    'Have the Killer target you instead of a Victim due to the Red Cape.',
    'Witness a Killer trigger Chicken Bones and Thorny Vines on the same turn.',
    'Replenish the Slingshot\u2019s uses twice.',
    'Use the Raft to move to a space at least 4 spaces away.',
    'Use the Songbirds to deliver the killing blow to the Killer.',
  ]),
  'wolfe-asylum': mkAchievements('wolfe-asylum', [
    'Win a game at Wolfe Asylum.',
    'Obtain at least 8 Pill tokens.',
    'Consume Pills for a 1-Pill, a 2-Pill, and a 3-Pill effect.',
    'Save more than half the Victims with Scratching and Biting revealed.',
    'Win a game where Dr. Sunshine is killed in your space.',
    'Witness Dr. Death and Hannibal the Cannibal kill a Victim in your space.',
    'Deal 3 damage with the Hospital Gurney.',
    'Win a game where you received at least 2 negative Side Effects.',
    'Obtain 2 Amped cards.',
    'Stun Enemies 5 times.',
  ]),

  // ===== SERIES 3 =====

  // --- Killers ---
  hunter: mkAchievements('hunter', [
    'Defeat the Hunter at Sunnydaze Mall.',
    'Defeat the Hunter at five different Locations.',
    'Defeat the Hunter in Extreme Horror Mode.',
    'Use the Mark V to deliver the killing blow to the Hunter Mark X.',
    'Defeat the Hunter Mark X without the Mark V being repaired.',
    'Defeat the Hunter Mark X without the repaired Mark V taking any damage.',
    'Destroy at least 3 Cybernetic Parts on the same turn.',
    'Defeat the Hunter before the Finale is revealed.',
    'Repair the Mark V to at least 10 health.',
    'Repair the Mark V and have it damage the Mark X on the same turn.',
  ]),
  razorface: mkAchievements('razorface', [
    'Defeat Razorface at Hellscape.',
    'Defeat Razorface at five different Locations.',
    'Defeat Razorface in Extreme Horror Mode.',
    'Purge an Affliction on 3 consecutive turns.',
    'Defeat Razorface after having purged 5 Afflictions.',
    'Defeat Razorface on the same turn you purged your last Affliction.',
    'Defeat Razorface without purging any Afflictions before the Finale is revealed.',
    'Defeat Razorface without dealing damage before all your Afflictions are purged.',
    'Get Razorface to his Final Health token before purging your last Affliction.',
    'Defeat Razorface having purged "A Delicious Sacrifice" after the Dark Power was revealed.',
  ]),
  slayer: mkAchievements('slayer', [
    'Defeat Slayer at Falconwood.',
    'Defeat Slayer at five different Locations.',
    'Defeat Slayer in Extreme Horror Mode.',
    'Defeat Slayer without ever having more than 3 Victims in the Mirror Dimension.',
    'Deliver the killing blow to Slayer from Our Dimension.',
    'Defeat Slayer without returning any Victims from the Mirror Dimension.',
    'Stay at least 5 consecutive turns in the Mirror Dimension.',
    'Take 2 Special Victims to the Mirror Dimension with Open a Rift.',
    'Return to Our Dimension with at least 4 Victims.',
    'Witness Slayer die when the Interdimensional Rift Collapse Finale is revealed.',
  ]),
  tormentor: mkAchievements('tormentor', [
    'Defeat the Tormentor at Marrek Warehouse.',
    'Defeat the Tormentor at five different Locations.',
    'Defeat the Tormentor in Extreme Horror Mode.',
    'Defeat the Tormentor after escaping 3 or more Final Girl Death Traps.',
    'Defeat the Tormentor after freeing 5 or more Victims from Death Traps.',
    'Defeat the Tormentor without any Victim killed in a Death Trap.',
    'Free a Victim from a Death Trap and save that Victim on the same turn.',
    'Defeat the Tormentor the turn immediately after she appears on the board.',
    'Free a Victim from a Death Trap the turn immediately after it appears.',
    'Free both yourself and a Victim from Death Traps on the same turn.',
  ]),
  eyeless: mkAchievements('eyeless', [
    'Defeat the Eyeless at Utopia.',
    'Defeat the Eyeless at five different Locations.',
    'Defeat the Eyeless in Extreme Horror Mode.',
    'Defeat the Eyeless with your Noise level at zero.',
    'Defeat the Eyeless before the Finale is revealed.',
    'Win a game where the Eyeless never targeted you due to Noise.',
    'Get the Eyeless past its Hard Skin to deal damage on the same turn.',
    'Defeat the Eyeless without firing a ranged weapon.',
    'End an Action phase with a Noise level of 5 or more and survive the Killer phase.',
    'Use a silent item to avoid raising your Noise while attacking.',
  ]),

  // --- Locations ---
  'sunnydaze-mall': mkAchievements('sunnydaze-mall', [
    'Win a game at Sunnydaze Mall.',
    'Win a game without using the Build Trust Action card.',
    'Place all Destroyed Wall tokens.',
    'Witness the Killer lose its final health from falling off the Railing.',
    'Use the Chopper to deliver the killing blow to the Killer.',
    'Win a game with the Savior still on the board.',
    'Win a game without the Savior taking any damage.',
    'Witness Bart the Mall Cop deliver the killing blow to the Killer.',
    'Witness at least 4 Victims panic off the railing on the same turn.',
    'Use both Boomsticks to deal at least 8 damage in a single attack.',
  ]),
  hellscape: mkAchievements('hellscape', [
    'Win a game at Hellscape.',
    'Win a game where at least half the Victims were saved.',
    'Win a game without using the Hellshift Action card.',
    'Save 2 or more Special Victims.',
    'Use any 2 of the Disciplines of Courage, Choices or Cruelty on the same turn.',
    'Kill the Killer when you both are in a space blocked off from any Victim.',
    'Use Hellshift to Rearrange so the Killer is blocked off from you and Victims.',
    'Use The Nexus to save a Victim and acquire an item in the same turn.',
    'Use the Bone Chariot to reach an otherwise-inaccessible space.',
    'Use the Gambler\u2019s Cube while down to your Final Health token.',
  ]),
  falconwood: mkAchievements('falconwood', [
    'Win a game at Falconwood.',
    'Win a game with each of the 5 Missions.',
    'Reduce Horror by 6 with the Game of Chance Event.',
    'Win a game without using any of the Bridges.',
    'Use the Spell Book to damage multiple Enemies.',
    'Deliver the killing blow with the Best Friend in the Killer\u2019s space.',
    'Witness the Conspiracy Theorist deliver the killing blow to the Killer.',
    'Replenish the Slingshot\u2019s uses twice.',
    'Roll a result of 20 on the d20.',
    'Use Telekinesis to deliver the killing blow to the Killer.',
  ]),
  'marrek-warehouse': mkAchievements('marrek-warehouse', [
    'Win a game at Marrek Warehouse.',
    'Save a Victim before any Click! Terror cards are resolved.',
    'Win a game where at least half the Victims were saved.',
    'Use both the Climb and Leap Action cards on the same turn.',
    'Save the Heroic Best Friend.',
    'Use the Bowling Ball to deliver the killing blow to the Killer.',
    'Unlock an Exit using an Item.',
    'Win a game where zero Victims were saved.',
    'Use the Chain Saw to deliver the killing blow to the Killer.',
    'Witness 2 or more Victims save themselves without you in their space.',
  ]),
  utopia: mkAchievements('utopia', [
    'Win a game at Utopia.',
    'Witness a Sand Snake deliver the killing blow to the Killer.',
    'Witness the Killer lose its final health in a space that Collapses.',
    'Witness all 4 Sinkholes in the same game.',
    'Deal 6 damage using Household Chemicals.',
    'Use the Scoped Rifle at range 4 to deliver the killing blow.',
    'Witness a Sand Snake attack you, a Victim, and the Killer.',
    'Save the Defiant Teenager.',
    'Win a game with Dehydration as the starting Event.',
    'Use the Crowbar\u2019s discard effect to acquire a weapon with a 2+ damage modifier.',
  ]),

  // ===== VIGNETTES =====
  'the-birds': mkAchievements('the-birds', [
    'Defeat the Birds at five different Locations.',
    'Kill 3 Birds in a single attack.',
    'Spawn 6 Birds in one spawn.',
    'Defeat the Birds without using any weapons.',
    'Defeat the Birds in Extreme Horror Mode.',
  ]),
  'patsy-zombies': mkAchievements('patsy-zombies', [
    'Win a game at five different Locations.',
    'Win a game with one or fewer Hordes being formed.',
    'Kill a Horde that had at least 8 health.',
    'Kill 5 Zombies on the same turn.',
    'Witness 3 Hordes being formed on the same turn.',
  ]),
  // Official Terror from Destiny achievements (transcribed from the card).
  destiny: mkAchievements('destiny', [
    'Win a game at five different Locations.',
    'Win a game with each Death Order card.',
    'Win a game with no Fated Victim being in Limbo.',
    'Win a game with all Fated Victims being saved.',
    'Win a game where all 5 Consequence cards are resolved.',
  ]),
};

/** Return the achievement list for an entry (or []). */
export function getAchievements(entry) {
  if (!entry) return [];
  return achievements[entry.id] || [];
}

/* --------------------------------------------------------------------------
   Auto-detectable achievements.

   Some achievements can be proven purely from the Game Log (won games), so we
   detect them automatically rather than relying on the end-of-game tickboxes.
   Each rule is keyed by achievement id. These three label shapes recur across
   every Killer/Location, so we build the rule set programmatically:

     Killer  slot a1: "Defeat {killer} at {home Location}"       -> won game, that killer at home location
     Killer  slot a2: "Defeat {killer} at five different Locations" -> >=5 distinct locations in wins w/ that killer
     Location slot a1: "Win a game at/on {location}"             -> won game at that location

   Location slot a2 is NOT consistent across seasons (some are "defeat N
   different Killers", many are not), so only the "defeat five different
   Killers at {location}" ones are tagged explicitly below.
   -------------------------------------------------------------------------- */

// Location ids whose a2 achievement is "Defeat five different Killers here".
const FIVE_KILLER_LOCATIONS = new Set([
  'camp-happy-trails',
  'creech-manor',
  'sacred-groves',
  'carnival-of-blood',
  'maple-lane',
]);

function buildAutoRules() {
  const rules = {};
  // Killers: a1 = home location win, a2 = five different locations.
  // Vignettes don't follow this positional pattern (and have no home
  // Location), so they're skipped — their achievements stay manual/question.
  for (const k of killers) {
    if (!achievements[k.id] || k.isVignette) continue;
    const home = locations.find((l) => l.film === k.film);
    if (home) {
      rules[`${k.id}-a1`] = { kind: 'winKillerAtLocation', killerId: k.id, locationId: home.id };
    }
    rules[`${k.id}-a2`] = { kind: 'winKillerAtNLocations', killerId: k.id, n: 5 };
  }
  // Locations: a1 = win here; a2 = five different killers (S1 only).
  for (const l of locations) {
    if (!achievements[l.id]) continue;
    rules[`${l.id}-a1`] = { kind: 'winAtLocation', locationId: l.id };
    if (FIVE_KILLER_LOCATIONS.has(l.id)) {
      rules[`${l.id}-a2`] = { kind: 'winNKillersAtLocation', locationId: l.id, n: 5 };
    }
  }
  // Vignettes: each has a "win at five different Locations" achievement. Since a
  // vignette win still records a locationId, we can count distinct Locations the
  // same way as for a Killer. Keyed explicitly (not positional) because the
  // vignette achievement ordering differs.
  const VIGNETTE_FIVE_LOCATION_ACH = {
    'the-birds-a1': 'the-birds',       // "Defeat the Birds at five different Locations."
    'patsy-zombies-a1': 'patsy-zombies', // "Win a game at five different Locations."
    'destiny-a1': 'destiny',           // "Win a game at five different Locations."
  };
  for (const [achId, killerId] of Object.entries(VIGNETTE_FIVE_LOCATION_ACH)) {
    if (achievements[killerId]) {
      rules[achId] = { kind: 'winKillerAtNLocations', killerId, n: 5 };
    }
  }
  return rules;
}

export const autoRules = buildAutoRules();

/** True if this achievement id can be auto-detected from the log. */
export function isAutoAchievement(id) {
  return Boolean(autoRules[id]);
}

/* Evaluate one auto rule against the list of WON real games. */
function evalAutoRule(rule, wonGames) {
  switch (rule.kind) {
    case 'winAtLocation':
      return wonGames.some((g) => g.locationId === rule.locationId);
    case 'winKillerAtLocation':
      return wonGames.some(
        (g) => g.killerId === rule.killerId && g.locationId === rule.locationId,
      );
    case 'winKillerAtNLocations': {
      const locs = new Set(
        wonGames.filter((g) => g.killerId === rule.killerId && g.locationId).map((g) => g.locationId),
      );
      return locs.size >= rule.n;
    }
    case 'winNKillersAtLocation': {
      const ks = new Set(
        wonGames.filter((g) => g.locationId === rule.locationId && g.killerId).map((g) => g.killerId),
      );
      return ks.size >= rule.n;
    }
    default:
      return false;
  }
}

/* Which achievement ids are auto-detected as earned from this log.
   Only real, WON games count toward auto-detection. */
export function autoEarnedIds(log) {
  const won = (log || []).filter((g) => !g.isTest && g.outcome === 'won');
  const out = new Set();
  for (const [id, rule] of Object.entries(autoRules)) {
    if (evalAutoRule(rule, won)) out.add(id);
  }
  return out;
}

/* Progress toward a count-based auto achievement (e.g. "5 different
   Locations"). Returns { current, target } for the count rules, or null for
   binary/non-counting rules. Only real WON games count. */
export function autoProgress(id, log) {
  const rule = autoRules[id];
  if (!rule) return null;
  const won = (log || []).filter((g) => !g.isTest && g.outcome === 'won');
  if (rule.kind === 'winKillerAtNLocations') {
    const locs = new Set(
      won.filter((g) => g.killerId === rule.killerId && g.locationId).map((g) => g.locationId),
    );
    return { current: Math.min(locs.size, rule.n), target: rule.n };
  }
  if (rule.kind === 'winNKillersAtLocation') {
    const ks = new Set(
      won.filter((g) => g.locationId === rule.locationId && g.killerId).map((g) => g.killerId),
    );
    return { current: Math.min(ks.size, rule.n), target: rule.n };
  }
  return null;
}

/* --------------------------------------------------------------------------
   The final earned set. Combines three sources, with manual overrides winning:

     1. Per-game tickboxes recorded on real games (g.achievements)
     2. Auto-detected from won games (autoEarnedIds)
     3. Manual overrides: { [id]: true | false }
        - true  forces earned (even if nothing else proves it)
        - false forces NOT earned (even if a game or auto-rule says otherwise)

   manual wins over everything, so an explicit un-tick always removes it.
   Returns { earned: Set<id>, source: Map<id, 'manual'|'game'|'auto'> }.
   -------------------------------------------------------------------------- */
export function computeEarned(log, manual = {}) {
  const earned = new Set();
  const source = new Map();

  const add = (id, src) => {
    if (manual[id] === false) return; // explicit un-tick always wins
    if (!earned.has(id)) {
      earned.add(id);
      source.set(id, src);
    }
  };

  // 1. Per-game recorded achievements (real games only).
  for (const g of log || []) {
    if (g.isTest) continue;
    for (const id of g.achievements || []) add(id, 'game');
  }
  // 2. Auto-detected from won games.
  for (const id of autoEarnedIds(log)) add(id, 'auto');
  // 3. Manual "on" overrides win over a missing/absent state.
  for (const [id, val] of Object.entries(manual)) {
    if (val === true) {
      earned.add(id);
      source.set(id, 'manual');
    } else if (val === false) {
      earned.delete(id);
      source.set(id, 'manual');
    }
  }
  return { earned, source };
}

/* --------------------------------------------------------------------------
   Scenario narration snippets (for the spooky "Start Game" voiceover).
   Original atmospheric lines written for this app — NOT the rulebook text.
   Stitched at runtime into: [location] + [killer] + [final girl] + sting.
   Keyed by id. Missing entries fall back to a generic line.
   -------------------------------------------------------------------------- */
export const narration = {
  locations: {
    'camp-happy-trails': 'Welcome to Camp Happy Trails! Sun-warmed days by the lake, archery at the range, ghost stories around the firepit, sweethearts sneaking off to Makeout Point. Summers here are the stuff of memories. Wait... was that screaming, off past the cabins? Surely just the other campers, having the time of their lives. Surely. Summers at Camp Happy Trails really are to die for.',
    'creech-manor': 'Creech Manor is over a hundred years old, full of the kind of character and charm people adore — grand rooms, a storied past, a history you can almost feel in the walls. But the stories of Creech Manor are stories of horrifying events and macabre happenings, of powers beyond understanding. Go now, while you still can. Evil reigns within.',
    'sacred-groves': 'The Sacred Groves are ancient and beautiful, a place the gods once called their own. But careless feet have desecrated this holy ground, and the gods have made their pact with the Killer. Now their fury gathers in the trees and the roots and the air itself — Divine Wrath, rising, hungry to cleanse the Groves in blood and fire.',
    'carnival-of-blood': 'Step right up to the carnival — lights and music, the carousel turning, the house of mirrors, prizes for the brave! Of course, the public never hears it called the Carnival of Blood. There is a reason this show rolls into a new town every few days, and a reason that when someone wanders in and never wanders home, nobody who works here calls it a problem.',
    'maple-lane': 'Maple Lane runs through a quiet, ordinary neighbourhood in the quaint town of Spring Hill — a street like any other, where children play and neighbours gather for the holidays. At least, it was ordinary, until the murders began. Now the doors stay locked and the curtains twitch, and that false sense of security is about to cost them all dearly.',
  },
  killers: {
    hans: 'You hear him before you see him — the slow, dragging scrape of a sledgehammer on concrete. Seven feet of butcher in a blood-black smock, a pig-iron mask where his face should be, and a wet crunching sound beneath it. Hans has found your scent. He is in no hurry at all.',
    poltergeist: 'How do you fight a thing you cannot see? You do not. It is already here — in the cold that creeps up your spine, in the furniture that shifts when you blink, in the whisper of a little girl who died a long, long time ago. The Poltergeist knows this house. It has forever.',
    inkanyamba: 'It took the name of a monster and became one. Inkanyamba remembers nothing now but the fury — a rage so old it has forgotten its own reason. Every death feeds it. Every scream makes it stronger. And its wrath is only beginning to rise.',
    geppetto: 'Geppetto has such plans for you. He wants you for the family, you see. His puppets drag themselves through the shadows on taut, creaking strings, their painted smiles fixed, waiting for their master to whisper the word that sets them loose.',
    'dr-fright': 'Do not fall asleep. He is waiting in the dream behind your dream — pock-marked, milk-eyed, a pitchfork dragging sparks across the boiler-room floor. Dr. Fright cannot touch you while you are awake. But you cannot stay awake forever.',
    destiny: 'There is no face in the dark tonight, no blade, no mask. Something is trying to kill them all, and in a very specific order. You cannot fight Destiny. You cannot outrun it. You can only reach them in time, one by one, in the sequence fate has already written. Save them in the wrong order, and the price comes due at the end. It always comes due.',
  },
  finalGirls: {
    // Optional per-girl angle; falls back to a generic line below.
    laurie: 'You are Laurie. You have outlived everyone who told you to stay calm and stay put. You will not break tonight. You never do.',
    reiko: 'You are Reiko. Cornered, cold-eyed, and finished with running. If it wants you, it will have to come and take you.',
    selena: 'You are Selena. You will claw your way out of this nightmare, or you will tear it down around you. Either way, you are done being prey.',
  },
};

/** Build the spoken scenario text from the current selection. */
export function buildScenario({ finalGirl, killer, location }) {
  const parts = [];
  if (location) {
    parts.push(narration.locations[location.id] || `You arrive at ${location.name}. Something is terribly wrong here.`);
  }
  if (killer) {
    parts.push(narration.killers[killer.id] || `${killer.name} is here, and ${killer.name} means to kill you.`);
  }
  if (finalGirl) {
    parts.push(
      narration.finalGirls[finalGirl.id] ||
      `You are ${finalGirl.name}.`
    );
  }
  // Iconic closing beat, then the fixed sign-off on every combo.
  parts.push('Everyone else is dead. You are the Final Girl.');
  parts.push('Let the terror commence.');
  return parts.join(' ');
}

/** Final Girls grouped by their `group` field, preserving insertion order. */
export function getFinalGirlGroups() {
  const groups = [];
  const index = {};
  for (const girl of finalGirls) {
    if (!(girl.group in index)) {
      index[girl.group] = groups.length;
      groups.push([girl.group, []]);
    }
    groups[index[girl.group]][1].push(girl);
  }
  return groups;
}

/* --------------------------------------------------------------------------
   Page-image loader.
   Eagerly globs every image in src/assets/games/ so we can resolve the
   bundled URL for a given selection at runtime. Missing pages simply resolve
   to nothing, which the UI treats as "pages not added yet".
   -------------------------------------------------------------------------- */
const gameImages = import.meta.glob(
  '../assets/games/*.{png,jpg,jpeg,webp}',
  { eager: true, import: 'default' }
);

// Build a lookup keyed by the bare filename (without extension), lowercased.
const imagesByBaseName = {};
for (const [path, url] of Object.entries(gameImages)) {
  const file = path.split('/').pop();                 // e.g. S1-killer-hans-1.png
  const base = file.replace(/\.[^.]+$/, '').toLowerCase(); // e.g. s1-killer-hans-1
  imagesByBaseName[base] = url;
}

/**
 * Resolve a single named image variant for an entry (e.g. "art", "flavour").
 * @param {('killer'|'location')} type
 * @param {{season:number, shortName:string}} entry
 * @param {string} variant  the suffix after the short name, e.g. 'art'
 * @returns {string|null} the bundled image URL, or null if not supplied yet
 */
export function getImage(type, entry, variant) {
  if (!entry) return null;
  const base = `s${entry.season}-${type}-${entry.shortName}-${variant}`.toLowerCase();
  return imagesByBaseName[base] || null;
}

/** True if a file with the given base name (any supported ext) is present. */
export function hasImageBaseName(baseName) {
  return Boolean(imagesByBaseName[baseName.toLowerCase()]);
}

/** The absolute-ish folder where game image assets live (for display). */
export const ASSETS_FOLDER = 'src/assets/games/';

/* --------------------------------------------------------------------------
   Official Killer / Location ICONS (the little emblem for each entry).
   Separate folder/glob so they can be used decoratively across the app.
   Named S{season}-{type}-{shortName}-icon.png (type = killer | location).
   -------------------------------------------------------------------------- */
const iconImages = import.meta.glob(
  '../assets/icons/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, import: 'default' }
);
const iconsByBaseName = {};
for (const [path, url] of Object.entries(iconImages)) {
  const file = path.split('/').pop();
  const base = file.replace(/\.[^.]+$/, '').toLowerCase();
  iconsByBaseName[base] = url;
}

/**
 * The official icon URL for a Killer or Location entry, or null if not added.
 * @param {('killer'|'location')} type
 * @param {{season:number, shortName:string}} entry
 */
export function getIcon(type, entry) {
  if (!entry) return null;
  const base = `s${entry.season}-${type}-${entry.shortName}-icon`.toLowerCase();
  return iconsByBaseName[base] || null;
}

/* --------------------------------------------------------------------------
   RULE ICONS — the scenario-specific symbols pulled from each rule sheet
   (Killer Wrath, Vanish, Keycard token, Hellscape tiles, etc.). Metadata
   lives in src/assets/icons/rules/rule-icons.json (id, label, description,
   ruleset = killer/location id, type). The PNGs are globbed alongside it.
   -------------------------------------------------------------------------- */
import ruleIconMeta from '../assets/icons/rules/rule-icons.json';
import rulesetMeta from '../assets/icons/rules/rulesets.json';

const ruleIconImages = import.meta.glob(
  '../assets/icons/rules/*.{png,jpg,jpeg,webp,svg}',
  { eager: true, import: 'default' }
);
const ruleIconsByBaseName = {};
for (const [path, url] of Object.entries(ruleIconImages)) {
  const file = path.split('/').pop();
  const base = file.replace(/\.[^.]+$/, '').toLowerCase();
  ruleIconsByBaseName[base] = url;
}

/* Full list of rule-icon records, each { id, label, description, ruleset,
   type, ruleset_name, lowRes, src }. Only entries whose image is present. */
export const ruleIcons = (ruleIconMeta || [])
  .map((m) => ({
    id: m.id,
    label: m.label,
    description: m.description,
    ruleset: m.ruleset,
    rulesetName: m.ruleset_name,
    type: m.type, // 'killer' | 'location'
    lowRes: Boolean(m.low_res_source),
    src: ruleIconsByBaseName[String(m.id).toLowerCase()] || null,
  }))
  .filter((r) => r.src);

/** Rule icons for a given Killer/Location entry (matched by id). */
export function getRuleIcons(entry) {
  if (!entry) return [];
  return ruleIcons.filter((r) => r.ruleset === entry.id);
}

/** Rule icons grouped by ruleset name, in series/type order (for the library). */
export function getRuleIconGroups() {
  const order = [];
  const map = {};
  for (const r of ruleIcons) {
    if (!map[r.ruleset]) {
      map[r.ruleset] = { ruleset: r.ruleset, name: r.rulesetName, type: r.type, items: [] };
      order.push(r.ruleset);
    }
    map[r.ruleset].items.push(r);
  }
  return order.map((id) => map[id]);
}

/* Per-ruleset manifest (icon counts + an explanatory note for rulesets that
   have no special icons, e.g. "Hans uses core icons only"). Keyed by id. */
const rulesetNotes = {};
for (const r of rulesetMeta || []) {
  rulesetNotes[r.ruleset] = { note: r.note || '', iconCount: r.icon_count || 0 };
}

/** The "no special icons" note for an entry, or null if it has icons / none. */
export function getRulesetNote(entry) {
  if (!entry) return null;
  const meta = rulesetNotes[entry.id];
  if (!meta || meta.iconCount > 0) return null;
  return meta.note || null;
}

/* Every ruleset in manifest order (from rulesets.json), each with its icons
   (possibly empty) and note. Used by the Icon Reference library so rulesets
   with no special icons are still listed with their "core icons only" note.
   Returns [{ ruleset, name, type, series, items, note }]. */
export function getAllRulesetGroups() {
  const iconsByRuleset = {};
  for (const r of ruleIcons) {
    (iconsByRuleset[r.ruleset] ||= []).push(r);
  }
  return (rulesetMeta || []).map((r) => ({
    ruleset: r.ruleset,
    name: r.ruleset_name,
    type: r.type,
    series: r.series,
    items: iconsByRuleset[r.ruleset] || [],
    note: r.note || '',
  }));
}

/** Convenience: the key-art image for an entry (or null). */
export function getArtImage(type, entry) {
  return getImage(type, entry, 'art');
}

/** Convenience: the flavour-text image for an entry (or null). */
export function getFlavourImage(type, entry) {
  return getImage(type, entry, 'flavour');
}

/** Final Girl card faces: front and back images (either may be null). */
export function getFinalGirlCards(entry) {
  return {
    front: getImage('finalgirl', entry, 'front'),
    back: getImage('finalgirl', entry, 'back'),
  };
}

/* --------------------------------------------------------------------------
   SCENARIO GRAPHIC — the big title image for a named official scenario, or
   for a vignette (killer-only, any Location). Shown at the top of This Game
   when the current combo is one of these.

   Asset naming (in src/assets/games/):
     Official pairing:  S{killerSeason}-scenario-{killerShortName}-{locationShortName}.png
     Vignette:          S{vignetteSeason}-scenario-{vignetteShortName}.png
   -------------------------------------------------------------------------- */

/** The expected scenario-image base name for a combo, or null if the combo
 *  isn't an official scenario or a vignette. (No file needed — just the name.) */
export function getScenarioImageBaseName(killer, location) {
  if (!killer) return null;
  // Vignette: killer-only, any Location (or none).
  if (killer.isVignette) {
    return `s${killer.season}-scenario-${killer.shortName}`.toLowerCase();
  }
  // Official pairing: needs a Location and a canon match.
  if (!location) return null;
  if (!OFFICIAL_SCENARIOS[`${killer.id}|${location.id}`]) return null;
  return `s${killer.season}-scenario-${killer.shortName}-${location.shortName}`.toLowerCase();
}

/** Resolve the scenario graphic URL for the current combo (or null).
 *  Returns { src, name, kind } where kind is 'official' | 'vignette'. */
export function getScenarioImage(killer, location) {
  const base = getScenarioImageBaseName(killer, location);
  if (!base) return null;
  const src = imagesByBaseName[base] || null;
  if (!src) return null;
  const kind = killer.isVignette ? 'vignette' : 'official';
  const name = killer.isVignette
    ? killer.film || killer.name
    : OFFICIAL_SCENARIOS[`${killer.id}|${location.id}`];
  return { src, name, kind };
}

/** Every scenario graphic the app expects (for the Asset Admin tracker):
 *  one per official pairing + one per vignette. Each:
 *  { key, label, file, present, kind }. */
export function getScenarioAssetList() {
  const out = [];
  // Official pairings.
  for (const [key, name] of Object.entries(OFFICIAL_SCENARIOS)) {
    const [killerId, locationId] = key.split('|');
    const killer = killers.find((k) => k.id === killerId);
    const location = locations.find((l) => l.id === locationId);
    if (!killer || !location) continue;
    const base = `s${killer.season}-scenario-${killer.shortName}-${location.shortName}`.toLowerCase();
    out.push({
      key,
      label: name,
      sub: `${killer.name} @ ${location.name}`,
      file: `${base}.png`,
      present: hasImageBaseName(base),
      kind: 'official',
      season: killer.season,
    });
  }
  // Vignettes.
  for (const k of killers.filter((x) => x.isVignette)) {
    const base = `s${k.season}-scenario-${k.shortName}`.toLowerCase();
    out.push({
      key: k.id,
      label: k.film || k.name,
      sub: `${k.name} (vignette — any Location)`,
      file: `${base}.png`,
      present: hasImageBaseName(base),
      kind: 'vignette',
      season: k.season,
    });
  }
  return out.sort((a, b) => a.season - b.season || a.label.localeCompare(b.label));
}

/**
 * Return the ordered list of page-image URLs for a given entry.
 * @param {('killer'|'location')} type
 * @param {{season:number, shortName:string}} entry
 * @returns {string[]} ordered page image URLs (empty if none supplied yet)
 */
export function getPageImages(type, entry) {
  if (!entry) return [];
  const prefix = `s${entry.season}-${type}-${entry.shortName}-`.toLowerCase();
  const pages = [];
  for (let page = 1; page <= 20; page++) {
    const url = imagesByBaseName[`${prefix}${page}`];
    if (url) {
      pages.push(url);
    } else if (page > 1) {
      // Stop at the first gap after page 1 so numbering stays contiguous.
      break;
    }
  }
  return pages;
}
