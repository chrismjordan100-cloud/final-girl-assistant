/* ==========================================================================
   Final Girl fit engine.

   1. TRAITS: the strengths that matter in Final Girl.
   2. GIRL_TRAITS: how strong each Final Girl is in each trait (0-3), with a
      short reason (her Ultimate Ability, save rewards, health or how many
      Victims she needs).
   3. NEEDS: how much each Killer and each Location rewards each trait (0-3),
      with the reason. `confidence` says how solid that profile is:
        'tips'     built from the rules and the strategy tips in the app
        'estimate' a reasoned guess from the rules; refine as you play
   4. SPECIALS: one-off pairings worth extra (e.g. Adelaide lowering Wrath
      against Inkanyamba).
   5. scoreGirl / rankGirls: combine the lot into a score out of 10 with the
      reasons, for any Killer + Location.

   All ratings are judgement calls, so edit freely: the score updates itself.
   ========================================================================== */

export const TRAITS = [
  { id: 'move', label: 'Movement', short: 'Move', desc: 'Getting around the board quickly or for free.' },
  { id: 'search', label: 'Searching', short: 'Search', desc: 'Better Search rolls and better Item draws.' },
  { id: 'attack', label: 'Damage', short: 'Dmg', desc: 'Dealing extra damage to the Killer or its minions.' },
  { id: 'tank', label: 'Toughness', short: 'Tough', desc: 'High health, healing, or preventing damage.' },
  { id: 'horror', label: 'Horror control', short: 'Horror', desc: 'Lowering Horror so you roll more dice.' },
  { id: 'dice', label: 'Dice control', short: 'Dice', desc: 'Rerolls and extra dice on Horror rolls.' },
  { id: 'time', label: 'Time', short: 'Time', desc: 'More Time to spend each turn.' },
  { id: 'cards', label: 'Card access', short: 'Cards', desc: 'Cheaper or free Action cards (Guard, Reactions…).' },
  { id: 'items', label: 'Item use', short: 'Items', desc: 'Holding and using Items/weapons better.' },
  { id: 'control', label: 'Killer control', short: 'Control', desc: 'Choosing or blunting what the Killer does.' },
  { id: 'rescue', label: 'Fast Ultimate', short: 'Fast Ult', desc: 'Needs few Victims saved to unlock her Ultimate.' },
];

export const TRAIT_LABEL = Object.fromEntries(TRAITS.map((t) => [t.id, t.label]));

/* t(rating, reason) */
const t = (v, why) => ({ v, why });

/* Fast Ultimate is from how many Victims she needs: 4 = 2, 5 = 1, 6 = 0.
   Kept modest so it tips close calls rather than dominating. */
const ult = (n) => t(n <= 4 ? 2 : n === 5 ? 1 : 0, `Ultimate after only ${n} saves`);

/* Each Final Girl's strengths. Girls not listed have no card data yet, so
   they can't be rated (shown as "not rated" rather than scoring 0). */
export const GIRL_TRAITS = {
  // ---- Series 1
  laurie: { attack: t(3, 'Extra damage whenever she hits an Enemy in her space'), tank: t(1, '5 health'), rescue: ult(6) },
  reiko: { move: t(2, 'Free move to a nearby Enemy each Action phase'), attack: t(1, 'Gets into fights quickly'), tank: t(1, '6 health'), rescue: ult(5) },
  selena: { search: t(3, 'Rolls 2 extra dice on Search, and can take a Search card as a save reward'), tank: t(1, '6 health'), rescue: ult(4) },
  alice: { dice: t(3, 'Her chosen Action card always rolls 5 dice'), move: t(1, 'Save rewards include moves'), tank: t(0, 'Only 4 health'), rescue: ult(6) },
  adelaide: { tank: t(2, 'Can recover all health; 6 health'), cards: t(2, 'Can grab 6 Time of Action cards at once'), control: t(1, 'Can drop one Wrath track to 1'), rescue: ult(5) },
  barbara: { attack: t(2, 'Extra damage for each Victim in the Killer’s space'), tank: t(2, '7 health'), rescue: ult(5) },
  asami: { items: t(3, 'Draws an extra Item to choose from and ignores Item traps'), search: t(2, 'Better Item finds when searching'), rescue: ult(4) },
  charlie: { attack: t(2, 'Can take Critical Blow straight into her hand'), tank: t(2, '7 health'), rescue: ult(6) },
  nancy: { tank: t(1, 'Can swap for a better Final Health token, but only 4 health'), rescue: ult(5) },
  sheila: { time: t(3, '2 Time (not 1) for each card discarded for Time'), tank: t(1, '6 health'), rescue: ult(6) },
  melanie: { attack: t(2, 'Can trade 1 health for 2 damage each Action phase'), rescue: ult(6) },
  // ---- Series 2
  ellen: { search: t(2, 'Can pick from all the Location’s unused Items after a Search'), items: t(2, 'Picks exactly the Item she needs'), tank: t(0, 'Only 4 health'), rescue: ult(6) },
  jenette: { items: t(3, 'An extra hand for Items, plus spare uses on limited Items'), attack: t(1, 'More weapons in play'), tank: t(2, '7 health'), rescue: ult(4) },
  kate: { tank: t(3, 'Max health rises to 7 and heals fully'), dice: t(1, 'Extra die on Horror rolls at full health'), rescue: ult(6) },
  uki: { tank: t(3, 'A free Guard every turn'), cards: t(2, 'Guard without buying it'), rescue: ult(4) },
  ginny: { move: t(1, 'Walk moves further'), tank: t(1, 'Short Rest heals more'), attack: t(1, 'Weak Attack hits harder'), horror: t(1, 'Focus lowers more Horror'), rescue: ult(6) },
  ava: { dice: t(2, 'Rerolls every 1 on Horror rolls'), rescue: ult(5) },
  red: { move: t(3, 'Free move when an Enemy is within 2 spaces: great at dodging'), time: t(1, 'Save rewards include Time'), rescue: ult(6) },
  gretel: { dice: t(1, 'Can turn a 2 into a success by discarding cards'), time: t(1, 'Save rewards include Time'), horror: t(1, 'Save rewards include Horror drops'), tank: t(1, '6 health'), rescue: ult(5) },
  heather: { attack: t(3, 'Rerolls and +1 damage per success when attacking'), dice: t(1, 'Rerolls on attack rolls'), rescue: ult(6) },
  veronica: { time: t(3, 'Time resets to 7 (6 in Extreme), and her save rewards are all Time'), rescue: ult(5) },
  // ---- Series 3
  tali: { cards: t(2, 'Takes a Reaction card, and Reactions cost 1 Time less'), tank: t(1, 'Cheaper Guard/Retaliate-style defence; 6 health'), rescue: ult(4) },
  kat: { attack: t(2, '+2 damage with guns (needs a gun)'), items: t(1, 'Wants a gun'), tank: t(0, 'Only 4 health'), rescue: ult(6) },
  christie: { control: t(3, 'Draws two Terror cards and chooses which happens'), move: t(1, 'Extra saves give moves'), rescue: ult(4) },
  kenzie: { cards: t(3, 'Buys every copy of an Action card for the price of one'), horror: t(1, 'Extra saves lower Horror'), rescue: ult(5) },
  octavia: { tank: t(2, 'Builds up a marker to soak incoming damage'), rescue: ult(4) },
  janelle: { attack: t(2, 'Builds up a marker that adds damage to one attack'), rescue: ult(4) },
  cassie: { attack: t(3, 'Can double the damage of her next attack for Time'), time: t(0, 'Her power eats Time'), rescue: ult(5) },
  mandy: { attack: t(2, 'Extra damage on unarmed attacks, so she needs no weapon'), rescue: ult(6) },
  meghan: { tank: t(2, 'Heals when the Killer reaches her (or lowers Horror at full health)'), horror: t(1, 'Lowers Horror at full health'), rescue: ult(5) },
  ronda: { time: t(3, 'Time equal to Bloodlust, then more Time whenever Bloodlust rises'), tank: t(1, '6 health'), rescue: ult(6) },
  // ---- Series 4
  maud: { attack: t(2, 'Damage cards cost less and ignore their health cost'), time: t(1, 'Cheaper damage cards'), tank: t(1, '6 health'), rescue: ult(5) },
  christina: { attack: t(2, 'Throws any Item as a ranged weapon; better ranged hits'), items: t(2, 'Every Item doubles as a weapon'), rescue: ult(5) },
  dakota: { dice: t(3, 'Rerolls all 1s and 2s on Horror rolls'), horror: t(0, 'Her save rewards RAISE Horror'), tank: t(1, '6 health'), rescue: ult(5) },
  alois: { dice: t(3, 'Always rolls 6 dice for Horror rolls'), tank: t(0, 'Saving Victims costs her health'), rescue: ult(5) },
  rita: { horror: t(3, 'Lowers Horror every Upkeep (and on extra saves)'), rescue: ult(6) },
  lindi: { tank: t(3, 'Heals every Upkeep'), rescue: ult(4) },
  vicky: { move: t(3, 'Extra spaces on Walk/Sprint for Time'), tank: t(1, 'Save rewards include health'), rescue: ult(5) },
  joy: { tank: t(3, 'Ignores one damage or health loss every turn; 6 health'), horror: t(1, 'Save rewards include Horror drops'), rescue: ult(6) },
  rena: { cards: t(2, 'Takes back a free (0 Time) card each Action phase'), tank: t(1, '6 health'), rescue: ult(5) },
  gwynn: { horror: t(3, 'Every save and her Ultimate lower Horror'), rescue: ult(4) },
  // ---- Vignettes, specials, promos with card data
  patsy: { attack: t(1, 'Spends Time for chip damage'), move: t(1, 'Save rewards include moves'), tank: t(1, '6 health'), rescue: ult(5) },
  claus: { tank: t(3, 'Full heal and no health limit'), rescue: ult(4) },
  cindy: { move: t(3, 'Failed Walk/Sprint results count as successes'), time: t(1, 'Extra saves give Time'), rescue: ult(4) },
  adrianne: { time: t(1, 'Flexible boosts'), tank: t(1, 'Flexible boosts; 6 health'), move: t(1, 'Flexible boosts'), horror: t(1, 'Flexible boosts') },
  maureen: { cards: t(2, 'Uses Victims to play cards straight from the tableau') },
  paula: { dice: t(2, 'Rolls 2 dice whenever she’d roll 1'), horror: t(1, 'Save rewards include Horror drops'), rescue: ult(5) },
  jamie: { attack: t(2, 'Two-success rolls deal damage anywhere on the board'), horror: t(1, 'Save rewards lower Horror'), rescue: ult(5) },

  // ---- Rated from Chris's card photos (src/assets/games), not cards.json.
  // Card reading: top-left number = health; number of meeples = saves needed
  // for the Ultimate; slashed-mask meeple = -1 Horror (checked against Paula's
  // card, whose wiki text lists the same rewards).
  // Both sides photographed:
  agnes: { dice: t(2, 'Ultimate: gains 2 Ultimate Dice of her choice'), tank: t(1, 'Only 4 health, but two save rewards heal (one heals 2)'), time: t(1, 'Save rewards and extra saves give Time'), horror: t(1, 'A save reward lowers Horror'), rescue: ult(6) },
  layla: { cards: t(2, 'Ultimate: takes any Signature Action card from out of play'), tank: t(1, '5 health, and extra saves heal'), time: t(1, 'A save reward gives 2 Time'), horror: t(1, 'A save reward lowers Horror'), rescue: ult(5) },
  julia: { tank: t(2, '6 health, and can recover all health by sacrificing a Victim'), attack: t(1, 'Can deal damage by sacrificing a Victim'), move: t(1, 'Can move 2 spaces ignoring penalties by sacrificing a Victim'), rescue: t(1, 'Ultimate after just 1 save, but it flips back after each use and each use costs a Victim') },
  constance: { attack: t(2, 'Ultimate: uses any weapon from range 0-2'), items: t(2, 'Ultimate makes every weapon ranged; a save reward takes a top Item'), time: t(1, 'A save reward gives 2 Time, and extra saves give Time'), tank: t(1, '5 health'), rescue: ult(5) },
  'jen-promo': { attack: t(2, 'Ultimate: Furious Strike costs 0 Time'), cards: t(1, 'Furious Strike becomes free to play'), horror: t(2, 'Two save rewards lower Horror, and extra saves lower it again'), tank: t(1, '5 health'), rescue: ult(5) },
  iris: { items: t(3, 'Ultimate: 3 times, goes through all Items at her space and takes 1; a save reward takes any top Item'), search: t(2, 'Picks the exact Item she wants'), horror: t(2, 'Two save rewards lower Horror'), move: t(1, 'A save reward takes a Sprint card'), tank: t(0, 'Only 4 health (extra saves heal)'), rescue: ult(5) },
  // Action side only (Ultimate side not photographed yet), so these are
  // provisional: the Ultimate could move them a lot.
  julie: { items: t(2, 'Two save rewards are Items, one of them any unused Item'), horror: t(2, 'Three save rewards lower Horror'), tank: t(1, '5 health'), rescue: t(1, 'Ultimate after 5 saves (Ultimate side not photographed yet)') },
  meg: { time: t(1, 'A save reward gives 2 Time'), items: t(1, 'A save reward takes any top Item'), tank: t(1, '5 health; a save reward takes a Guard card'), horror: t(1, 'A save reward lowers Horror'), rescue: t(2, 'Ultimate after only 4 saves (Ultimate side not photographed yet)') },
  carolyn: { move: t(1, 'Save rewards include 2 Psychic Travel cards'), attack: t(1, 'Save rewards include 2 Psychic Attack cards'), horror: t(1, 'Save rewards include 2 Psychic Focus cards'), cards: t(1, 'Every save reward is a Psychic card'), tank: t(1, '5 health'), rescue: t(0, 'Ultimate after 6 saves (Ultimate side not photographed yet; Psychic card effects not known)') },
  // Not rated:
  //   grandma: action side shows 1 health and five card rewards (Retaliate,
  //     Gather the Flock, Guard, Slow Walk, Rally). Rating her on 1 health
  //     alone would mislead; needs the Ultimate side / pack rules.
  //   gabrielle: no card photos or card data yet.
};
// Holiday Paula is an alt-art Paula (cards.json: "alt-art Holiday Paula exists").
GIRL_TRAITS['holiday-paula'] = GIRL_TRAITS.paula;

/* What each Killer rewards. */
const need = (v, why) => ({ v, why });
export const KILLER_NEEDS = {
  hans: { confidence: 'tips', rescue: need(3, 'Rescue fast while he’s slow, to keep Bloodlust low'), attack: need(2, 'A low-Bloodlust Hans can be out-traded in the finale'), horror: need(2, 'He raises Horror a lot'), tank: need(1, 'Guard/Retaliate grind works') },
  poltergeist: { confidence: 'tips', search: need(3, 'You win by finding Carolyn in the Item decks'), move: need(3, 'Then you must get her to an exit'), tank: need(1, 'Guard is the answer to Unstoppable Evil'), attack: need(0, 'She can’t be damaged') },
  inkanyamba: { confidence: 'tips', horror: need(3, 'Atonement only works well with 3 dice'), dice: need(2, 'Atonement rolls need successes'), attack: need(2, 'Dual-purpose weapons hurt him and lower Wrath'), control: need(2, 'Anything that lowers Wrath is gold') },
  geppetto: { confidence: 'tips', attack: need(3, 'Killing Puppets cuts his output'), rescue: need(2, 'Rescuing beat searching in reviews'), move: need(1, 'Distance keeps Puppets off you') },
  'dr-fright': { confidence: 'tips', rescue: need(2, 'Low Bloodlust keeps him nearly still'), tank: need(2, 'Guard/Retaliate in the Boiler Room'), attack: need(2, 'Fight only when armed and asleep'), cards: need(1, 'Guard and Retaliate decide fights') },
  evomorph: { confidence: 'tips', attack: need(3, 'Hit the Hatchling hard before it grows'), items: need(2, 'Flamethrower and Super Loader win games'), cards: need(1, 'Retaliate combos') },
  organism: { confidence: 'tips', attack: need(3, 'Every Mutated Organism must die'), horror: need(3, 'Horror above 6 can be an instant loss'), items: need(2, 'Flamethrower does huge damage'), cards: need(2, 'Guard rated essential') },
  intruders: { confidence: 'tips', attack: need(3, 'Kill them one at a time; burst damage matters'), dice: need(2, 'Big "super turns" need successes'), horror: need(2, 'Green Horror predicts wins'), items: need(1, 'Shotguns are excellent') },
  'big-bad-wolf': { confidence: 'tips', attack: need(3, 'Kill him fast before he snowballs'), search: need(2, 'Search early: his Roar strips Items'), rescue: need(2, 'Save Victims before he flips to Slay') },
  'ratchet-lady': { confidence: 'tips', rescue: need(3, 'Save Victims before they become Maniacs'), attack: need(2, 'Engage early while she’s on 6 health'), tank: need(2, 'Budget for a long fight'), time: need(1, 'Leaving a space with two or more Maniacs costs Time') },
  hunter: { confidence: 'tips', attack: need(3, '2 damage in one phase knocks off parts'), items: need(2, 'Boomsticks and ramming items'), move: need(2, 'Race to the Savior and use balconies') },
  razorface: { confidence: 'tips', time: need(2, 'Purging Afflictions costs Time'), cards: need(2, 'Purges need the right cards'), attack: need(2, 'He still has to be killed'), tank: need(1, 'Some Afflictions hurt') },
  slayer: { confidence: 'tips', tank: need(3, 'The Mirror Dimension drains health each Upkeep'), move: need(2, 'Keep trips between dimensions short'), attack: need(2, 'Hit hard while you’re in its dimension') },
  tormentor: { confidence: 'estimate', move: need(2, 'Avoiding Death Traps'), tank: need(2, 'Traps punish slow girls'), attack: need(2, 'He still has to be killed') },
  eyeless: { confidence: 'estimate', move: need(2, 'Moving quietly and getting away'), horror: need(2, 'Panic is dangerous'), time: need(1, 'Careful turns cost Time') },
  'the-birds': { confidence: 'estimate', tank: need(2, 'Swarms chip away at health'), rescue: need(2, 'Victims die fast'), horror: need(2, 'Constant attacks raise Horror') },
  'patsy-zombies': { confidence: 'estimate', attack: need(3, 'Lots of bodies to put down'), rescue: need(2, 'Victims turn into Zombies'), tank: need(2, 'Being surrounded hurts') },
  destiny: { confidence: 'estimate', dice: need(2, 'Fate rolls reward successes'), tank: need(2, 'Fated deaths come for you too'), attack: need(2, 'You still have to win the fight') },
  raptors: { confidence: 'estimate', move: need(3, 'A pack that hunts: stay mobile'), attack: need(2, 'Thin the pack'), tank: need(2, 'Several attackers at once') },
  volkar: { confidence: 'estimate', attack: need(2, 'A big brute to bring down'), tank: need(2, 'Hits hard') },
  berith: { confidence: 'estimate', horror: need(3, 'A demon that feeds on fear'), tank: need(2, 'Possession hurts') },
  grimlash: { confidence: 'estimate', attack: need(2, 'Must be cut down'), rescue: need(2, 'Victims in the fields die quickly') },
  billy: { confidence: 'estimate', attack: need(2, 'Must be destroyed'), move: need(2, 'A big park to cover'), horror: need(1, 'Jump scares raise Horror'), time: need(1, 'Switching off Power Sources costs Time') },
  pods: { confidence: 'estimate', rescue: need(2, 'Victims get taken over'), attack: need(2, 'Pods must be destroyed') },
  mort: { confidence: 'estimate', attack: need(2, 'Must be stopped'), rescue: need(2, 'Victims at the con') },
  krampus: { confidence: 'estimate', tank: need(2, 'Punishing attacks'), attack: need(2, 'Must be beaten'), rescue: need(1, 'Victims in the village') },
};

/* What each Location rewards. */
export const LOCATION_NEEDS = {
  'camp-happy-trails': { confidence: 'tips', rescue: need(2, 'Victims spread across camp'), move: need(1, 'A wide map') },
  'creech-manor': { confidence: 'tips', search: need(2, 'Lots of searchable rooms'), move: need(2, 'Two floors and stairs to cross') },
  'sacred-groves': { confidence: 'tips', horror: need(2, 'Wrath and Horror stack up'), control: need(2, 'Its own Wrath track to manage'), tank: need(1, 'Wrath events hurt') },
  'carnival-of-blood': { confidence: 'tips', items: need(2, 'Item traps make searching risky'), move: need(2, 'A big park to cover') },
  'maple-lane': { confidence: 'estimate', move: need(2, 'Houses spread along the street'), rescue: need(2, 'Victims in every house'), dice: need(2, 'Convince rolls are needed to enter occupied houses, every time') },
  'uss-konrad': { confidence: 'estimate', move: need(2, 'Long corridors'), items: need(2, 'Ship Items like the Flamethrower') },
  'station-2891': { confidence: 'estimate', tank: need(2, 'Frostbite outside hurts'), search: need(1, 'Supplies to find') },
  'wingard-cottage': { confidence: 'estimate', search: need(2, 'A small house full of things to find'), rescue: need(1, 'Victims close together'), time: need(1, 'Supply Items cost Time to pick up') },
  'storybook-woods': { confidence: 'estimate', move: need(2, 'Spread-out woods'), search: need(2, 'Items hidden around the woods'), time: need(1, 'Each Raft token you pass through costs Time') },
  'wolfe-asylum': { confidence: 'estimate', horror: need(3, 'An asylum that piles on Horror'), tank: need(1, 'Dangerous wards'), time: need(1, 'Picking up a Pill costs Time') },
  'sunnydaze-mall': { confidence: 'tips', move: need(2, 'Two floors and balconies'), search: need(2, 'Shops full of Items'), dice: need(1, 'Rescuing the Savior is very dice-dependent') },
  hellscape: { confidence: 'estimate', tank: need(2, 'Hell hurts'), horror: need(2, 'Horror climbs quickly'), dice: need(1, 'Hellshift rolls: fewer successes cost Time'), time: need(1, 'Failed Hellshifts cost Time') },
  falconwood: { confidence: 'estimate', search: need(2, 'Missions need Items'), items: need(2, 'Mission Items to use') },
  'marrek-warehouse': { confidence: 'estimate', move: need(2, 'A big warehouse floor'), tank: need(1, 'Traps around the floor') },
  utopia: { confidence: 'estimate', move: need(2, 'Spread out'), horror: need(1, 'Noise and panic') },
  'isla-lagarto': { confidence: 'estimate', move: need(2, 'Jungle island to cross'), tank: need(1, 'Hazards') },
  'pesadilla-verde': { confidence: 'estimate', move: need(2, 'Dense jungle'), tank: need(2, 'Hazards') },
  'larmes-abbey': { confidence: 'estimate', horror: need(2, 'An abbey full of dread'), search: need(1, 'Relics to find'), dice: need(1, 'Malice rooms swap a die for the cursed die') },
  'shady-acres': { confidence: 'estimate', rescue: need(2, 'Farmhands to save'), attack: need(1, 'Things in the fields') },
  buddyland: { confidence: 'estimate', move: need(1, 'Big park'), horror: need(1, 'Animatronic scares') },
  megabgcon: { confidence: 'estimate', rescue: need(2, 'Crowds of Victims'), move: need(1, 'A busy hall') },
  'santas-village': { confidence: 'estimate', tank: need(1, 'Cold and danger'), rescue: need(1, 'Elves to save'), move: need(1, 'Village to cross'), time: need(2, 'Entering a space costs 1 Time per Elf in it') },
};

/* One-off pairings worth more than the trait maths shows. */
export const SPECIALS = [
  { girl: 'adelaide', killer: 'inkanyamba', bonus: 2, why: 'Her Ultimate can drop a Wrath track straight to 1' },
  { girl: 'adelaide', location: 'sacred-groves', bonus: 1, why: 'Her Ultimate can drop the Groves’ Wrath to 1' },
  { girl: 'asami', location: 'carnival-of-blood', bonus: 1, why: 'Immune to the Carnival’s Item traps' },
  { girl: 'selena', killer: 'poltergeist', bonus: 1, why: 'Reviewers’ top pick: fast Ultimate plus Search dice to find Carolyn' },
];

/* ---- Scoring -------------------------------------------------------------- */

const LOCATION_WEIGHT = 0.7; // the Killer usually matters more than the map

/* Needs that apply to EVERY scenario, on top of the Killer and Location.
   Without these, Time and dice specialists (Sheila, Veronica, Ronda, Ava,
   Alois…) scored near 1 almost everywhere, because hardly any profile asked
   for them, even though both drive every turn.
   Bonus only (see scoreGirl): a girl strong in these gains points, a girl
   without them loses nothing. */
export const BASE_NEEDS = {
  time: need(1, 'Time buys every action; the Handbook calls discarding for Time one of the strongest moves'),
  dice: need(1, 'Every Action card rolls Horror dice, so rerolls and extra dice always help'),
};

/* Combined needs for a Killer and/or Location: { trait: { v, reasons[] } }. */
export function comboNeeds(killerId, locationId) {
  const out = {};
  const add = (src, w, owner) => {
    if (!src) return;
    for (const tr of TRAITS) {
      const n = src[tr.id];
      if (!n || !n.v) continue;
      out[tr.id] = out[tr.id] || { v: 0, reasons: [] };
      out[tr.id].v += n.v * w;
      out[tr.id].reasons.push(`${owner}: ${n.why}`);
    }
  };
  add(KILLER_NEEDS[killerId], 1, 'Killer');
  add(LOCATION_NEEDS[locationId], LOCATION_WEIGHT, 'Location');
  // BASE_NEEDS are NOT added here: they're a bonus-only extra in scoreGirl.
  return out;
}

export function comboConfidence(killerId, locationId) {
  const parts = [KILLER_NEEDS[killerId], LOCATION_NEEDS[locationId]].filter(Boolean);
  if (!parts.length) return null;
  return parts.every((p) => p.confidence === 'tips') ? 'tips' : 'estimate';
}

export function isRated(girlId) {
  return Boolean(GIRL_TRAITS[girlId]);
}

/* ---- Secret Envelope items ------------------------------------------------
   What each girl's envelope item adds, ONLY counted once her envelope is
   marked opened in the Codex (see scoreGirl's `envelopes` argument). A profile
   is only added here once Chris has opened that envelope, so nothing in here
   is a spoiler for a sealed one.
     traits   { trait: +n } added to her own ratings (capped at 3)
     killers / locations   optional: only applies against these ids. Leave
              both out for an item that helps everywhere.
     bonus    optional flat points for one-off strengths the traits miss
              (used where she is already rated 3 in what the item does)
     extras   optional [{ killers?, locations?, bonus, why }]: extra points in
              particular scenarios only, on top of the general effect
     why      one line shown in "Why?" (only ever shown when opened)
   Assessed from Chris's photos of the opened item cards.
   -------------------------------------------------------------------------- */
export const ENVELOPE_ITEMS = {
  // Laurie's Bow: range 1-3, 1 damage, 3 arrows, 1 Time per shot, no Action card
  // needed. Her Damage is already 3, so it counts as a small flat bonus.
  laurie: { bonus: 0.5, why: 'Her Bow lets her hit from 1-3 spaces away for 1 Time, without an Action card (3 arrows)' },
  // Jenette's Scanner: on a Search space, see the whole Item deck and pick.
  jenette: { traits: { search: 2 }, why: 'Her Scanner lets her look through a Search space\u2019s whole Item deck and choose' },
  // Uki's Gus: 1 damage to any Enemy entering her space; soaks her next 3 hits.
  // Her Toughness is already 3, so the soak counts as a small flat bonus.
  uki: { traits: { attack: 1 }, bonus: 0.5, why: 'Gus bites any Enemy that enters her space and soaks her next 3 hits' },
  // Tali's Grenades: 2 Time for 2 damage to an adjacent Enemy (2 uses); can
  // instead blow a hole in a store wall, which only exists at Sunnydaze Mall.
  tali: {
    traits: { attack: 1 },
    why: 'Her Grenades deal 2 damage to an Enemy in an adjacent space (2 uses)',
    extras: [{ locations: ['sunnydaze-mall'], bonus: 0.5, why: 'Her Grenades can blow a Destroyed Wall into a store to open a shortcut' }],
  },
  // Ginny's Sawed-off Shotgun: 1 Time for 3 damage to the target and 2 to every
  // other Enemy in the space (2 uses), no Action card needed.
  ginny: { traits: { attack: 2 }, why: 'Her Sawed-off Shotgun deals 3 damage, plus 2 to every other Enemy in the space, for 1 Time (2 uses)' },
};

/* The envelope item that counts for this girl and combo, or null. */
export function envelopeItemFor(girlId, killerId, locationId, envelopes) {
  if (!envelopes || envelopes[girlId] !== 'opened') return null;
  const it = ENVELOPE_ITEMS[girlId];
  if (!it) return null;
  const scoped = (it.killers && it.killers.length) || (it.locations && it.locations.length);
  if (scoped) {
    const k = it.killers && it.killers.includes(killerId);
    const l = it.locations && it.locations.includes(locationId);
    if (!k && !l) return null; // specific to other scenarios: no change here
  }
  return it;
}

/* Score one girl for a combo.
   `envelopes` is the Codex envelope map ({ id: 'opened' | 'unlocked' }); pass
   it so opened envelope items count. Without it, scores are item-free.
   Returns { score (0-10, halves), strengths[], gaps[], specials[], item } or
   null if she isn't rated yet or nothing is selected. */
export function scoreGirl(girlId, killerId, locationId, envelopes = null) {
  const base = GIRL_TRAITS[girlId];
  const item = base ? envelopeItemFor(girlId, killerId, locationId, envelopes) : null;
  // Her ratings with the item folded in (each trait capped at 3).
  let g = base;
  if (item && item.traits) {
    g = { ...base };
    for (const [tr, add] of Object.entries(item.traits)) {
      const cur = g[tr] ? g[tr].v : 0;
      const why = g[tr] ? `${g[tr].why}; plus her envelope item` : `Her envelope item: ${item.why}`;
      g[tr] = { v: Math.min(3, cur + add), why };
    }
  }
  const needs = comboNeeds(killerId, locationId);
  const totalNeed = Object.values(needs).reduce((a, n) => a + n.v, 0);
  if (!g || !totalNeed) return null;

  let got = 0;
  const strengths = [];
  const gaps = [];
  for (const [tr, n] of Object.entries(needs)) {
    const gv = g[tr] ? g[tr].v : 0;
    got += n.v * gv;
    if (gv >= 2) strengths.push({ trait: tr, label: TRAIT_LABEL[tr], weight: n.v * gv, girlWhy: g[tr].why, needWhy: n.reasons });
    else if (n.v >= 2 && gv === 0) gaps.push({ trait: tr, label: TRAIT_LABEL[tr], needWhy: n.reasons, girlWhy: g[tr] ? g[tr].why : null });
  }
  // Every-game Time/dice: bonus only. It adds to what she brings but NOT to
  // what the scenario asks for, so girls without Time or dice lose nothing.
  for (const [tr, n] of Object.entries(BASE_NEEDS)) {
    const gv = g[tr] ? g[tr].v : 0;
    if (!gv) continue;
    got += n.v * gv;
    const already = strengths.find((s) => s.trait === tr);
    if (already) { already.weight += n.v * gv; already.needWhy = [...already.needWhy, `Every game: ${n.why}`]; }
    else if (gv >= 2) strengths.push({ trait: tr, label: TRAIT_LABEL[tr], weight: n.v * gv, girlWhy: g[tr].why, needWhy: [`Every game: ${n.why}`] });
  }
  // A girl rated 2 in everything the combo wants scores 10.
  let ratio = got / (totalNeed * 2);

  const specials = SPECIALS.filter(
    (s) => s.girl === girlId && ((s.killer && s.killer === killerId) || (s.location && s.location === locationId)),
  );
  if (item && (item.bonus || !item.traits)) {
    specials.push({ girl: girlId, bonus: item.bonus || 0, why: `Envelope item: ${item.why}` });
  }
  for (const x of (item && item.extras) || []) {
    const hit = (x.killers && x.killers.includes(killerId)) || (x.locations && x.locations.includes(locationId));
    if (hit) specials.push({ girl: girlId, bonus: x.bonus || 0, why: `Envelope item: ${x.why}` });
  }
  const bonus = specials.reduce((a, s) => a + s.bonus, 0);

  let score = Math.min(10, ratio * 10 + bonus);
  score = Math.max(1, Math.round(score * 2) / 2);
  strengths.sort((a, b) => b.weight - a.weight);
  gaps.sort((a, b) => (needs[b.trait].v - needs[a.trait].v));
  return { score, strengths, gaps, specials, item };
}

/* Every rated girl for a combo, best first. `girls` is the app's finalGirls list. */
export function rankGirls(girls, killerId, locationId, envelopes = null) {
  return girls
    .map((fg) => ({ fg, fit: scoreGirl(fg.id, killerId, locationId, envelopes) }))
    .filter((r) => r.fit)
    .sort((a, b) => b.fit.score - a.fit.score || a.fg.name.localeCompare(b.fg.name));
}
