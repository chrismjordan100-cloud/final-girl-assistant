/* ==========================================================================
   Final Girl — Core rules data
   Transcribed and summarised from FinalGirl_Rules_Core.pdf (Van Ryder Games,
   ©2020) for personal, non-commercial fan use only.
   ========================================================================== */

/* --------------------------------------------------------------------------
   SETUP ASSIST — the full setup sequence, grouped by phase.
   Faithful to the rulebook's Setup section (steps 1-18).
   -------------------------------------------------------------------------- */
export const setupGroups = [
  {
    id: 'choose',
    title: 'Choose Your Nightmare',
    blurb: 'Final Girl needs the Core Box plus at least one Feature Film box.',
    steps: [
      {
        id: 's1',
        title: 'Choose a Killer and a Location',
        body: 'Pick a Killer and a Location from the Feature Films you own. You can mix ANY Killer with ANY Location. Remove the Killer and Location boards (they are the reverse of the box covers) and their component trays.',
      },
      {
        id: 's2',
        title: 'Choose a Final Girl',
        body: 'Open the Core Box and choose a Final Girl card, or pick one at random. Final Girl cards can be used in any game regardless of Killer or Location.',
      },
      {
        id: 's3',
        title: 'Place the Player board',
        body: 'Place the Player board on the table. Choose normal difficulty, or flip to Extreme Horror Mode for a harsher game. Put your Final Girl card below the board, faceup, with the Victim Saved spaces showing.',
        tip: 'For your first few games, use the normal (non-Extreme) side.',
      },
    ],
  },
  {
    id: 'corebox',
    title: 'Core Box Components',
    blurb: 'Lay out your dice and the Action Tableau.',
    steps: [
      {
        id: 's4',
        title: 'Grab the six custom dice',
        body: 'Take the six custom dice from the Core Box and set them to the side.',
      },
      {
        id: 's5',
        title: 'Build your starting hand',
        body: 'Take the Action cards. Set the six Zero Cost Action cards aside — this is your starting hand. Zero Cost cards show a gold hourglass with a "0" in the lower right corner.',
      },
      {
        id: 's6',
        title: 'Build the Action Tableau',
        body: 'Sort the remaining Action cards into piles by name and lay them out in two rows. Some piles have two cards, some have one. This layout is the Action Tableau.',
      },
      {
        id: 's7',
        title: 'Set aside Victims & Holding boards',
        body: 'Set the Victim meeples, Special Victim meeples, and the three Victim Holding (Overflow) boards with their matching tokens aside. Keep any remaining meeples, markers and tokens handy for later.',
      },
    ],
  },
  {
    id: 'feature',
    title: 'Feature Film Box',
    blurb: 'Build the Killer, the decks, and the Location.',
    steps: [
      {
        id: 's8',
        title: 'Place Killer & Location boards',
        body: 'Place the chosen Killer board above the Player board. Place the chosen Location board directly to the right of the Killer board.',
      },
      {
        id: 's9',
        title: 'Seed Finale & Dark Power',
        body: 'Shuffle the Killer\u2019s Finale cards (card backs show the Killer\u2019s upper body) and place one facedown lined up with the board art. Shuffle the Dark Power cards (backs show the lower body) and place one facedown below the Finale. Return the rest to the tray.',
        tip: 'Epic Dark Powers (bloody border) are optional — only include them when you want an epic challenge.',
      },
      {
        id: 's10',
        title: 'Build the Terror deck',
        body: 'Shuffle the Killer\u2019s Terror cards together with the Location\u2019s Terror cards. Deal out 10 of them facedown to form the Terror deck, placed to the right of the Location board. Set the remaining Terror cards aside.',
      },
      {
        id: 's11',
        title: 'Lay out the Item decks',
        body: 'Shuffle the Location\u2019s Item cards and deal three facedown piles of four cards each above the Location board. Flip the top card of each pile faceup. Return the rest to the tray.',
      },
      {
        id: 's12',
        title: 'Draw a Setup card',
        body: 'Shuffle the Location\u2019s Setup cards and draw one. Set up the board as shown: the Final Girl icon is her starting space, the Killer icon is a Killer meeple start, and numbers show how many Victim meeples go in each space. Keep the Setup card faceup for reference.',
      },
    ],
  },
  {
    id: 'finalhealth',
    title: 'Health & The Final Blow',
    blurb: 'The Final Health tokens decide who truly dies.',
    steps: [
      {
        id: 's13',
        title: 'Seed the Final Health tokens',
        body: 'Mix the nine black Final Health tokens facedown (the +1 side showing). WITHOUT LOOKING, place one on the Killer board circle and one on the Player board circle. Return the rest to the box, still without looking.',
        tip: 'Three of the nine black tokens secretly carry 1, 2 or 3 health. This is the "they\u2019re not dead yet!" twist.',
      },
      {
        id: 's14',
        title: 'Stock Health markers',
        body: 'Give the Final Girl and the Killer Health markers equal to their max health — the black Final Health token counts as 1 of that total. Example: Laurie has 5 health = 1 black token + 4 markers. Hans has 12 = 1 black token + 11 markers.',
      },
    ],
  },
  {
    id: 'tracks',
    title: 'Set the Tracks',
    blurb: 'Bloodlust, Time, and Horror all start now.',
    steps: [
      {
        id: 's15',
        title: 'Bloodlust to the bottom',
        body: 'Place the Bloodlust marker at the bottom of the Bloodlust track on the right side of the Killer board — the Killer is at its weakest.',
      },
      {
        id: 's16',
        title: 'Time marker to 6',
        body: 'Place the Time marker on the blue \u20186\u2019 space on the Player board.',
      },
      {
        id: 's17',
        title: 'Set the Horror Level',
        body: 'Place the second Killer meeple on the Horror track of the Player board — this is now the Horror marker. The Killer\u2019s starting Horror Level is the number by the Horror icon in the upper left of the Killer board.',
      },
      {
        id: 's18',
        title: 'Draw the first Event',
        body: 'Shuffle the Location\u2019s Event cards and place them facedown by the board. Draw the top card and follow it (it may add Victims, change gameplay, etc.). You are now ready to begin!',
      },
    ],
  },
];

/* --------------------------------------------------------------------------
   TURN TRACKER — the 5 phases of a game turn, with checklists.
   -------------------------------------------------------------------------- */
export const phases = [
  {
    id: 'action',
    name: 'Action Phase',
    color: 'var(--fg-bone)',
    summary: 'Play Action cards to move, attack, rest, search and more.',
    checklist: [
      'Play Action cards (most require a Horror Roll).',
      'Move, attack, search, rest, or save Victims at green Exit spaces.',
      'Discard Action cards for +1 Time each if you want.',
      'Keep played/discarded cards in a SEPARATE discard pile.',
    ],
    notes: [
      'The phase ends when: you choose to stop, you run out of cards, an "Action phase immediately ends" effect triggers, or your Time drops BELOW zero.',
      'You can always buy Zero Cost cards for free (unless it would exceed the 10-card hand limit).',
    ],
    // Core "don't forget" beats that commonly need action this phase, every
    // game. Shown prominently in the Turn Tracker.
    prompts: [
      'Saved a Victim at a green Exit? Take the save reward on your Final Girl card — and tick the Victims saved counter.',
      'Hit the Victims-saved number on your Final Girl card? Flip it to unlock your Ultimate Ability (a one-time event).',
      'Resolve a save reward now; some are once-per-game, so cross them off your Final Girl card as you use them.',
      'Spending Time to act. Discard cards for +1 Time each if you need more — don\u2019t let Time drop below zero.',
    ],
  },
  {
    id: 'planning',
    name: 'Planning Phase',
    color: 'var(--fg-gold)',
    summary: 'Spend leftover Time to buy new Action cards, then reset.',
    checklist: [
      'Spend Time to buy Action cards from the Tableau.',
      'Reset the Time marker to 6 (unspent Time is lost).',
      'Return all played/discarded cards to the Tableau.',
    ],
    notes: [
      'You may NOT buy cards played or discarded since the last Planning phase — not even Zero Cost cards.',
      'You may NOT buy a card if paying would drop Time below zero, or if you already hold 10 cards.',
    ],
    prompts: [
      'Buy with leftover Time first, THEN reset Time to 6 — unspent Time is lost.',
      'Return every played/discarded card to the Tableau so it\u2019s buyable again next turn.',
    ],
  },
  {
    id: 'killer',
    name: 'Killer Phase',
    color: 'var(--fg-blood-bright)',
    summary: 'The Killer acts, then a Terror card is drawn.',
    checklist: [
      'Resolve the Killer Action on the back of the Finale card.',
      'If the Finale is revealed, skip the Terror card step.',
      'Otherwise draw the top Terror card and resolve it top to bottom.',
    ],
    notes: [
      'Killer targets the CLOSEST option unless told otherwise; ties go to the larger group of Victims.',
      'The Killer always takes the shortest path and stops the instant it reaches its target.',
      'Victims are killed by any damage (1 health). Each Victim killed raises Bloodlust by 1.',
    ],
    prompts: [
      'A Victim died? Raise Bloodlust by 1 for EACH one — even if a Terror card (not the Killer) did it, unless the card says otherwise.',
      'Update the Killer\u2019s Movement and Attack values if Bloodlust crossed a new step on its track.',
      'Watch for Bloodlust effects that trigger at the new level (per the Killer board).',
      'If a Victim died this turn, remember the Panic phase is coming — otherwise it\u2019s skipped.',
    ],
  },
  {
    id: 'panic',
    name: 'Panic Phase',
    color: 'var(--fg-orange)',
    summary: 'Scared Victims flee if blood was spilled this turn.',
    checklist: [
      'Only panic if at least one Victim died this turn.',
      'Each Victim sharing the Killer\u2019s space panics.',
      'Roll a die per panicking Victim; move per the space\u2019s Panic Numbers.',
    ],
    notes: [
      'If the rolled number is not shown leaving the space, the Victim stays put.',
      'Victims can panic INTO the Killer\u2019s space. The Final Girl never panics.',
    ],
    prompts: [
      'No Victim died this turn? Skip this phase entirely — go straight to Upkeep.',
      'Only Victims sharing the Killer\u2019s space panic; roll one die each and move per the space\u2019s Panic Numbers.',
    ],
  },
  {
    id: 'upkeep',
    name: 'Upkeep Phase',
    color: 'var(--fg-sick-green)',
    summary: 'Check the Finale, resolve lingering effects, tidy your gear.',
    checklist: [
      'Finale Check: if the Terror deck is empty, reveal the Finale.',
      'Resolve any required upkeep from Events, Items or special rules.',
      'Optionally rearrange Items between your Hands and Backpack.',
    ],
    notes: [
      'This is the only time (besides gaining a new Item) that you may freely rearrange your inventory.',
      'Once the Finale is revealed you no longer draw Terror cards.',
    ],
    prompts: [
      'Finale check: Terror deck empty? Reveal the Finale (this also flips the Dark Power if it hasn\u2019t already) and stop drawing Terror cards.',
      'Resolve any per-turn upkeep from Events, Items or special rules (countdowns, Frostbite, Divine Wrath, etc.).',
      'Discard any tokens that clear in Upkeep (e.g. Stun, Frostbite indoors) and reset per-turn Noise if your Killer uses it.',
      'Rearrange Items between Hands and Backpack now if you need to — this is one of the few times you can.',
    ],
  },
];

/* --------------------------------------------------------------------------
   HORROR ROLL — the central dice mechanic, used across the app.
   -------------------------------------------------------------------------- */
export const horrorRoll = {
  title: 'The Horror Roll',
  dicePerLevel: 'Roll a number of dice equal to the current Horror Level.',
  results: [
    { range: '5\u20136', label: 'Success', tone: 'success' },
    { range: '3\u20134', label: 'Partial success', tone: 'partial', note: 'Discard 2 Action cards to convert one partial into a success (once per 3/4 rolled).' },
    { range: '1\u20132', label: 'Failure', tone: 'fail' },
  ],
  rules: [
    'You always roll at least 1 die.',
    'Some cards modify the dice count or let you re-roll.',
    'Need more than 6 dice? Note your values and re-roll as needed, combining old and new.',
    'Resolve a card\u2019s effects left to right by outcome: 2+ successes, 1 success, or failure.',
  ],
};

/* --------------------------------------------------------------------------
   ICON REFERENCE — from the back page of the rulebook.
   -------------------------------------------------------------------------- */
export const iconReference = [
  { glyph: '\u2665', label: 'Recover 1 Health', group: 'Health & Time' },
  { glyph: '\uD83D\uDC94', label: 'Lose 1 Health (unpreventable)', group: 'Health & Time' },
  { glyph: '\u29D7', label: 'Gain 1 Time (marker UP)', group: 'Health & Time' },
  { glyph: '\u231B', label: 'Lose 1 Time (marker DOWN)', group: 'Health & Time' },
  { glyph: '\u2191H', label: 'Increase Horror Level by 1', group: 'Horror' },
  { glyph: '\u2193H', label: 'Decrease Horror Level by 1', group: 'Horror' },
  { glyph: '\uD83C\uDFB2', label: 'Roll 1 additional die', group: 'Horror' },
  { glyph: '\uD83D\uDDE1', label: '1 Damage', group: 'Combat' },
  { glyph: '\u2620', label: 'Killer attacks', group: 'Killer' },
  { glyph: '\u27A1', label: 'Killer moves', group: 'Killer' },
  { glyph: '\u2191B', label: 'Increase Bloodlust by 1', group: 'Killer' },
  { glyph: '\u25C9', label: 'Target closest Victim or Final Girl', group: 'Targeting' },
  { glyph: '\u25CB', label: 'Target closest Victim', group: 'Targeting' },
  { glyph: '\u2640', label: 'Target the Final Girl', group: 'Targeting' },
  { glyph: '\u2691', label: 'Draw a new Event', group: 'Other' },
  { glyph: '\u2912', label: 'Action phase immediately ends', group: 'Other' },
  { glyph: '\uD83D\uDEAA', label: 'Exit space (save Victims here)', group: 'Spaces' },
  { glyph: '\uD83D\uDD0D', label: 'Search space (find Items here)', group: 'Spaces' },
];

/* --------------------------------------------------------------------------
   RULES REFERENCE — ordered to follow the core rulebook's own flow.
   Each section mirrors a part of the book; topics within a section are in
   reading order, with page references to the core rulebook (pg.).
   Summaries are original paraphrases for personal, non-commercial use.
   -------------------------------------------------------------------------- */
export const ruleSections = [
  {
    id: 'overview',
    title: 'Game Overview',
    topics: [
      {
        id: 'objective',
        title: 'Objective & Game End',
        page: 'pg. 3',
        tags: ['objective', 'win', 'lose', 'victory', 'defeat', 'goal'],
        body: 'You are the Final Girl against one horrific Killer. You move around the Location to search for items, save Victims, and confront or flee the Killer. The game ends the instant the Killer is destroyed (you win) or you die (you lose). If both die at once, you still win — the ultimate sacrifice. Saving Victims is never required, but it grants bonuses and unlocks your Ultimate Ability.',
      },
      {
        id: 'extreme-horror',
        title: 'Extreme Horror Mode',
        page: 'pg. 4',
        tags: ['extreme horror', 'difficulty', 'hard mode'],
        body: 'The reverse of the Player board is Extreme Horror Mode, for a tougher game. The Horror track is harsher and you get only 5 Time per turn (instead of 6). Choose the side at setup; the rulebook recommends normal difficulty for your first few games.',
      },
    ],
  },
  {
    id: 'boards',
    title: 'The Game Boards',
    topics: [
      {
        id: 'player-board',
        title: 'The Player Board',
        page: 'pg. 4',
        tags: ['player board', 'health track', 'horror track', 'time track', 'hands', 'backpack', 'extreme horror'],
        body: 'Your board holds the Health track (with the Final Health token space), the Horror track in the middle (the Horror marker sets your dice), and the Time track. To the right are your Hands and Backpack slots; Dead Victims go on their space, and your Final Girl card sits below. The reverse side is Extreme Horror Mode — a harsher Horror track and only 5 Time per turn.',
      },
      {
        id: 'killer-board',
        title: 'The Killer Board',
        page: 'pg. 5',
        tags: ['killer board', 'bloodlust', 'movement', 'attack', 'finale', 'dark power', 'starting stats'],
        body: 'The Killer board shows starting Horror Level and health, the Killer\u2019s health track, and slots for the facedown Finale and Dark Power cards. The Killer Action (top-left) is performed at the start of every Killer phase. The Bloodlust track on the right sets the Killer\u2019s current Movement and Attack values and lists special effects that trigger as Bloodlust climbs.',
      },
      {
        id: 'location-board',
        title: 'The Location Board',
        page: 'pg. 6',
        tags: ['location board', 'spaces', 'adjacent', 'search space', 'exit space', 'panic numbers', 'item decks'],
        body: 'The Location is a web of spaces connected by lines — two spaces are adjacent only if a line joins them, regardless of how close they look. Orange Search spaces have their own Item decks; green Exit spaces are where Victims are saved. The numbers printed between spaces are Panic Numbers, used to direct fleeing Victims.',
      },
    ],
  },
  {
    id: 'action-phase',
    title: 'The Action Phase',
    topics: [
      {
        id: 'action-cards',
        title: 'Action Cards',
        page: 'pg. 9',
        tags: ['action cards', 'discard pile', 'tableau'],
        body: 'You begin each turn playing Action cards to move, attack, rest, search and more. Most require a Horror Roll. Always play or discard cards into a central discard pile kept separate from the Action Tableau, so you don\u2019t accidentally re-buy them next Planning phase.',
      },
      {
        id: 'horror-rolls',
        title: 'Horror Rolls',
        page: 'pg. 10',
        tags: ['horror roll', 'dice', 'success', 'partial success', 'failure'],
        body: 'Roll dice equal to your current Horror Level (always at least 1 die, even at Horror 0). A 5 or 6 is a success; a 3 or 4 is a partial success; a 1 or 2 is nothing. For each die showing a 3 or 4 you MAY discard 2 Action cards from hand to convert that one partial into a full success (once per 3/4 rolled). After all conversions, count your final successes and resolve the card by that outcome: 2+ successes, exactly 1 success, or failure (no successes). Converting a partial can lift you from the 1-success line up to the 2-success line. Effects on a line resolve left to right. Some cards let you re-roll; if you ever need more than 6 dice, keep your rolled values and re-roll extras, combining old and new.',
      },
      {
        id: 'movement',
        title: 'Movement',
        page: 'pg. 12',
        tags: ['movement', 'move', 'adjacent', 'carry victims'],
        body: 'When an action grants movement, move up to that many times, one adjacent space per move; unused movement is lost. You may move freely into and out of the Killer\u2019s space. When leaving a space you may bring up to 2 Victims — but Victims will not follow you into the Killer\u2019s space.',
      },
      {
        id: 'victims-save',
        title: 'Saving Victims & the Ultimate Ability',
        page: 'pg. 13',
        tags: ['victims', 'exit', 'rescue', 'saving', 'ultimate ability', 'rewards'],
        body: 'While on a green Exit space during the Action phase (even passing through), you may save any Victims there. Place each on an open Victim Saved space on your Final Girl card and take that space\u2019s reward. Cover every space to flip the card and unlock your Ultimate Ability; further saves then give the reward shown beneath it. Victims alone on an Exit space are not saved automatically — only the Final Girl can convince them.',
      },
      {
        id: 'searching',
        title: 'Searching for Items',
        page: 'pg. 14',
        tags: ['search', 'items', 'item deck', 'search space'],
        body: 'Play a Search Action card while on an orange Search space to draw from that space\u2019s Item deck. Depending on your result you draw one or more cards, usually keeping one and returning the rest (on top faceup, or on the bottom facedown). A facedown top card is not revealed until drawn. If a deck runs out, there is nothing more to find there.',
      },
      {
        id: 'resting',
        title: 'Resting / Healing',
        page: 'pg. 14',
        tags: ['rest', 'heal', 'recover health', 'short rest'],
        body: 'Some cards and effects let you recover health — one Health marker per heart icon, never above your starting maximum.',
      },
      {
        id: 'attacking',
        title: 'Attacking the Killer',
        page: 'pg. 15',
        tags: ['attack', 'damage', 'combat', 'weak attack', 'furious strike'],
        body: 'To attack you must share the Killer\u2019s space (unless an item or ability grants range). Play a damage-dealing Action card and make a Horror Roll — each damage icon removes 1 of the Killer\u2019s Health markers. Add a held weapon\u2019s modifier when you inflict 1+ damage. When only the black Final Health token remains, reveal it to see if the Killer is truly dead.',
      },
      {
        id: 'time',
        title: 'Gaining & Losing Time',
        page: 'pg. 15',
        tags: ['time', 'hourglass', 'gain time', 'lose time'],
        body: 'Most actions lower Time (marker DOWN); some raise it (marker UP). If Time drops BELOW zero into the red, the Action phase ends after the current action resolves, and you cannot climb back into positive that phase. At any time before the phase ends you may discard Action cards for +1 Time each — a crucial tactic for extending the phase or saving Time for Planning.',
      },
      {
        id: 'horror-level',
        title: 'The Horror Level',
        page: 'pg. 16',
        tags: ['horror level', 'horror track', 'dice'],
        body: 'Adjust the Horror marker whenever an increase/decrease icon appears — this changes how many dice you roll. If an increase would push the marker off the top of the track, increase Bloodlust instead; if a decrease would push it off the bottom, gain 1 Time instead.',
      },
      {
        id: 'zero-cost',
        title: 'Zero Cost Cards & Ending the Phase',
        page: 'pg. 17-18',
        tags: ['zero cost', 'hand limit', 'end action phase'],
        body: 'You may always take Zero Cost cards (gold "0" hourglass) for free from the Tableau, even at or below zero Time, as long as it doesn\u2019t break the 10-card hand limit. IMPORTANT exception: you can never take a card that was played or discarded since the last Planning phase — not even a Zero Cost one — because those sit in the central discard pile until the next Planning phase. (This is the most commonly misplayed rule: keep played/discarded cards clearly separate from the Tableau.) The Action phase ends when you choose to stop, run out of cards to play, hit an "Action phase immediately ends" effect, or your Time drops below zero. Ending with cards still in hand is often the right call.',
      },
    ],
  },
  {
    id: 'planning-phase',
    title: 'The Planning Phase',
    topics: [
      {
        id: 'planning',
        title: 'Purchasing & Resetting',
        page: 'pg. 17',
        tags: ['planning', 'purchase', 'buy cards', 'reset time', 'tableau'],
        body: 'Spend leftover Time to buy Action cards from the Tableau (cost shown bottom-right). Then reset the Time marker to 6 — unspent Time is lost — and return all played/discarded cards to the Tableau. You may NOT buy cards played or discarded since the last Planning phase (not even Zero Cost ones), nor any purchase that would drop Time below zero or exceed 10 cards in hand.',
      },
    ],
  },
  {
    id: 'killer-phase',
    title: 'The Killer Phase',
    topics: [
      {
        id: 'killer-sequence',
        title: 'Killer Phase Sequence',
        page: 'pg. 19',
        tags: ['killer phase', 'killer action', 'terror card', 'finale'],
        body: 'First resolve the Killer Action on the back of the Finale card. Then draw the top Terror card and resolve it top to bottom. Once the Finale has been revealed, you skip the Terror-draw step entirely.',
      },
      {
        id: 'terror-cards',
        title: 'Terror Cards',
        page: 'pg. 19',
        tags: ['terror', 'terror deck', 'killer action'],
        body: 'Terror cards do many things: the Killer may target, move and attack, Horror may rise, Victims may be added, or special effects may fire. Resolve the card from top to bottom, carrying out any Killer Action it shows.',
      },
      {
        id: 'targeting',
        title: 'Targeting',
        page: 'pg. 20',
        tags: ['targeting', 'closest', 'tie', 'victim', 'final girl'],
        body: 'A Killer Action names a target — a Victim, the Final Girl, or whoever is closest. Unless told otherwise, always target the CLOSEST option. On a tie, pick the group holding the most Victims (the Final Girl is not a Victim); if still tied, use your chosen ambiguity rule.',
      },
      {
        id: 'killer-moving',
        title: 'Killer Movement',
        page: 'pg. 20',
        tags: ['killer move', 'movement value', 'shortest path'],
        body: 'With a Move icon, the Killer advances toward its target using its current Movement Value, always by the shortest path — multiple Move icons stack (Movement 3 with two icons = up to 6 spaces). It stops the instant it reaches the target, even with movement to spare, and ignores non-targets it passes through.',
      },
      {
        id: 'attacking-victim',
        title: 'Attacking a Victim',
        page: 'pg. 20',
        tags: ['attack victim', 'bloodlust', 'dead victim'],
        body: 'Each Attack icon is one attack on a single target in the Killer\u2019s space; Victims are always hit before the Final Girl unless she is the named target. A Victim has 1 health and dies to any damage — move it to the Dead space and raise Bloodlust by 1. Extra damage is wasted. More Attack icons mean more targets struck.',
      },
      {
        id: 'attacking-fg',
        title: 'Attacking the Final Girl',
        page: 'pg. 21',
        tags: ['attack final girl', 'damage', 'lose health'],
        body: 'If you are the target and share the Killer\u2019s space, each attack deals damage equal to the Killer\u2019s Attack Value — lose one Health marker per point, unless you play a Reaction card. Multiple Attack icons are resolved as separate attacks. If the Killer cannot reach its intended target and lands on someone else, it still attacks.',
      },
      {
        id: 'reaction',
        title: 'Reaction Cards (Defending)',
        page: 'pg. 21',
        tags: ['reaction', 'defend', 'guard', 'retaliate', 'blue'],
        body: 'Blue-background cards (Guard, Retaliate) can only be played in reaction to an attack. Make a Horror Roll to cancel or reduce the damage; Retaliate can even strike back. Each Reaction card defends a single attack — use several for multiple attacks. You cannot use them to protect Victims, nor to stop unpreventable "lose health" effects.',
      },
    ],
  },
  {
    id: 'panic-phase',
    title: 'The Panic Phase',
    topics: [
      {
        id: 'panic',
        title: 'Panic',
        page: 'pg. 23',
        tags: ['panic', 'panic numbers', 'victims flee'],
        body: 'If at least one Victim died this turn, every Victim sharing the Killer\u2019s space panics (the Final Girl never panics). Roll a die per panicking Victim and read the Panic Numbers leaving their space: move them one space in the matching direction, or leave them put if that number isn\u2019t shown. Victims can panic into the Killer\u2019s space. Some cards cause panic at other times, resolved the same way.',
      },
    ],
  },
  {
    id: 'upkeep-phase',
    title: 'The Upkeep Phase',
    topics: [
      {
        id: 'upkeep',
        title: 'Upkeep & Revealing the Finale',
        page: 'pg. 24',
        tags: ['upkeep', 'finale', 'reveal finale', 'rearrange items'],
        body: 'Resolve in order: (1) Finale Check — if the Terror deck is empty, reveal the Finale; (2) any required upkeep from Events, Items or special rules; (3) optionally rearrange Items between Hands and Backpack (the only time besides gaining an item). When the Finale is revealed, flip it faceup in place: some have an immediate effect, some an ongoing one. CRITICAL — the new Killer Action in the Finale\u2019s upper-left REPLACES the old back-of-card Killer Action for the rest of the game. If the Dark Power card is still facedown when the Finale reveals, reveal it too. With the Terror deck empty, you no longer draw Terror cards each Killer phase.',
      },
    ],
  },
  {
    id: 'additional',
    title: 'Additional Rules',
    topics: [
      {
        id: 'items',
        title: 'Items, Hands & Backpack',
        page: 'pg. 25-26',
        tags: ['items', 'hands', 'backpack', 'uses', 'tracking markers'],
        body: 'Items go into your two Hands or your unlimited Backpack. Each hand holds one item; a two-handed item fills both. Items with hand icons must be in your Hands to use; others work from the Backpack. Some items are discarded after a single use, while multi-use items track remaining uses with Tracking markers.',
      },
      {
        id: 'weapons',
        title: 'Weapons: Range & Damage',
        page: 'pg. 27',
        tags: ['weapons', 'range', 'damage modifier'],
        body: 'Weapons list a Range and a Damage Modifier. Range 0 means you must share the Killer\u2019s space; range 1+ means you must be exactly that many spaces away. When an Action card inflicts 1+ damage you may add the modifier of a held weapon. With a weapon in each hand, you must choose only ONE to use per attack.',
      },
      {
        id: 'final-health',
        title: 'The Final Health Token & Adrenaline Rush',
        page: 'pg. 28',
        tags: ['final health', 'death', 'revive', 'adrenaline rush'],
        body: 'Both the Final Girl and the Killer start with one hidden black Final Health token (counts as 1 of their max health). When all normal Health markers are gone and damage still remains, reveal the black token. Blank = truly dead, game effect ends. If it shows 1/2/3 health, they come back: replace it with a white token and add normal markers up to that amount, remove the black token, and the CURRENT PHASE IMMEDIATELY ENDS. The excess damage that would have been dealt is NOT applied to the recovered health. Because the phase ends at once, any remaining Killer attacks/effects that turn are skipped if the Killer revived mid-action (and likewise your action stops if you revived). Lose the white token later and they are dead for good. Adrenaline Rush: while reduced to only a Final Health token (black or white) you roll +1 die on ALL Horror Rolls — +2 if both sides are down to one. Lose that state (heal above the token) and the bonus is gone.',
      },
      {
        id: 'bloodlust',
        title: 'Bloodlust',
        page: 'pg. 29',
        tags: ['bloodlust', 'stronger', 'movement', 'attack', 'final effect'],
        body: 'Every Victim killed and every Bloodlust icon raises Bloodlust by 1. Apply the new row\u2019s special effect and update the Killer\u2019s Movement and Attack values. At maximum Bloodlust, each further increase triggers the Final Effect. Chained increases are each fully resolved before any other effect continues.',
      },
      {
        id: 'dark-powers',
        title: 'Dark Powers (incl. Epic & Minor)',
        page: 'pg. 29',
        tags: ['dark power', 'epic dark power', 'minor dark power', 'terror'],
        body: 'A marked Bloodlust space reveals the Killer\u2019s Dark Power. Epic Dark Powers (bloody border) are an optional, nastier variant for an epic challenge. Minor Dark Powers come from Terror cards: place them above the Killer board for a temporary ability plus extra Health markers that must be destroyed before the Killer\u2019s own health.',
      },
      {
        id: 'events',
        title: 'Events & Special Victims',
        page: 'pg. 30',
        tags: ['events', 'special victims', 'ongoing'],
        body: 'An Event is revealed at setup, with more when the Event icon shows. Effects may be one-time or ongoing, and ongoing Events stack — a new Event never cancels an old one. If an Event can\u2019t be applied (e.g. no Victims), ignore it and do NOT draw another. Some Events add Special Victims (white/orange/blue meeples), which otherwise behave like normal Victims.',
      },
      {
        id: 'card-terms',
        title: 'Card Terms & Tokens',
        page: 'pg. 31',
        tags: ['discard', 'draw', 'play', 'remove', 'tokens'],
        body: 'Discarding puts a card in the right discard pile; discarded Action cards return to the Tableau at the end of the Planning phase. If a card tells you to discard ITSELF, any effects printed below that discard line are ignored and NOT resolved. A card discarded straight from the top of a deck has none of its effects resolved. Drawing/taking adds Action cards to hand and Items to Hands/Backpack; all other card types resolve immediately when drawn. Playing refers to playing an Action card (usually with a Horror Roll) — using an item or ability is NOT "playing" a card. "Removed from the game" goes back in the box for good; "removed from play" leaves the board but can return if an effect brings it back. Tokens: when a card shows an associated token, place it on the board as instructed; they usually just mark an ongoing effect.',
      },
      {
        id: 'ambiguity',
        title: 'Game Ambiguity',
        page: 'pg. 31',
        tags: ['ambiguity', 'tie', 'rules question', 'house rule'],
        body: 'For anything the rules don\u2019t cover, or ties you can\u2019t break, choose ONE house rule before you play and stick to it: the Rule of Infinite Evil (worst outcome for you), the Rule of Abject Realism (most thematic outcome), or the Rule of Never-ending Hilarity (funniest outcome).',
      },
      {
        id: 'minions',
        title: 'Enemies, Killers & Minions',
        page: 'pg. 32-33',
        tags: ['minions', 'enemies', 'killer', 'minion action'],
        body: '"Enemy" covers both the Killer and Minions; rules naming the "Killer" or a "Minion" apply only to that type. Minions have their own reference cards for health, Attack and Movement. In the Killer phase, resolve any Minion Action with Minions acting before the Killer. When attacking a space with both, you must choose the Killer OR the Minions — never split damage across both. If there are several Minions in your target space you hit ALL of them, dividing your damage as you like (leftover is lost). The number of Minions is capped by the available Minion tokens; if told to spawn one with no token free, ignore it. Victims panic beside Minions just as they do beside the Killer.',
      },
      {
        id: 'victim-overflow',
        title: 'Victim Overflow Boards',
        page: 'pg. 30',
        tags: ['overflow', 'victim overflow', 'crowded', 'tokens'],
        body: 'If a space gets too crowded, use one of the 3 Victim Overflow boards: put its matching token in the space and move those Victims onto the board. The Victims still count as being in that space — the board is purely for tidiness. The Killer and Final Girl always stay on the main board and are never moved to an Overflow board.',
      },
    ],
  },
];

// Flattened list (in book order) for keyword search and backward compatibility.
export const ruleTopics = ruleSections.flatMap((section) =>
  section.topics.map((t) => ({ ...t, section: section.title }))
);
