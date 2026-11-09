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
   5. FG_STATS: every girl's health, the number of Victims she must save
      before her Ultimate (the save slots on her card), and how strong that
      Ultimate is. These count in EVERY scenario (see scoreGirl).
   6. scoreGirl / rankGirls: combine the lot into a score out of 10 with the
      reasons, for any Killer + Location:
        55%  scenario fit   her traits x what the Killer/Location rewards
        20%  survival       her health (counts for more vs hard-hitting Killers,
                            and where Victim deaths feed Bloodlust)
        25%  Ultimate       how fast she gets it x how good it is (counts for
                            more where Victims die quickly; 5-6 saves are
                            marked down there, as she may never get there)

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
  { id: 'rescue', label: 'Fast Ultimate', short: 'Fast Ult', desc: 'How much the scenario rewards saving Victims early and unlocking the Ultimate quickly.' },
];

/* Traits each girl is rated in. Health and Ultimate speed are NOT here: they
   come from FG_STATS and count in every scenario. 'rescue' stays a scenario
   need (it boosts how much her Ultimate speed counts). */
export const GIRL_TRAIT_IDS = TRAITS.filter((t) => t.id !== 'rescue').map((t) => t.id);

export const TRAIT_LABEL = Object.fromEntries(TRAITS.map((t) => [t.id, t.label]));

/* t(rating, reason) */
const t = (v, why) => ({ v, why });

/* Old helper kept so the lines below read as before; Ultimate speed now comes
   from FG_STATS, and scoreGirl ignores any 'rescue' rating here. */
const ult = (n) => t(0, `Ultimate after ${n} saves`);

/* Each Final Girl's strengths. Girls not listed have no card data yet, so
   they can't be rated (shown as "not rated" rather than scoring 0). */
export const GIRL_TRAITS = {
  // ---- Series 1
  laurie: { attack: t(3, 'Extra damage whenever she hits an Enemy in her space') },
  reiko: { move: t(2, 'Free move to a nearby Enemy each Action phase'), attack: t(1, 'Gets into fights quickly') },
  selena: { search: t(3, 'Rolls 2 extra dice on Search, and can take a Search card as a save reward') },
  alice: { dice: t(3, 'Her chosen Action card always rolls 5 dice'), move: t(1, 'Save rewards include moves') },
  adelaide: { tank: t(2, 'Can recover all health'), cards: t(2, 'Can grab 6 Time of Action cards at once'), control: t(1, 'Can drop one Wrath track to 1') },
  barbara: { attack: t(2, 'Extra damage for each Victim in the Killer’s space') },
  asami: { items: t(3, 'Draws an extra Item to choose from and ignores Item traps'), search: t(2, 'Better Item finds when searching') },
  charlie: { attack: t(2, 'Can take Critical Blow straight into her hand') },
  nancy: { tank: t(1, 'Can swap for a better Final Health token') },
  sheila: { time: t(3, '2 Time (not 1) for each card discarded for Time') },
  melanie: { attack: t(2, 'Can trade 1 health for 2 damage each Action phase') },
  // ---- Series 2
  ellen: { search: t(2, 'Can pick from all the Location’s unused Items after a Search'), items: t(2, 'Picks exactly the Item she needs') },
  jenette: { items: t(3, 'An extra hand for Items, plus spare uses on limited Items'), attack: t(1, 'More weapons in play') },
  kate: { tank: t(3, 'Max health rises to 7 and heals fully'), dice: t(1, 'Extra die on Horror rolls at full health') },
  uki: { tank: t(3, 'A free Guard every turn'), cards: t(2, 'Guard without buying it') },
  ginny: { move: t(1, 'Walk moves further'), tank: t(1, 'Short Rest heals more'), attack: t(1, 'Weak Attack hits harder'), horror: t(1, 'Focus lowers more Horror') },
  ava: { dice: t(2, 'Rerolls every 1 on Horror rolls') },
  red: { move: t(3, 'Free move when an Enemy is within 2 spaces: great at dodging'), time: t(1, 'Save rewards include Time') },
  gretel: { dice: t(1, 'Can turn a 2 into a success by discarding cards'), time: t(1, 'Save rewards include Time'), horror: t(1, 'Save rewards include Horror drops') },
  heather: { attack: t(3, 'Rerolls and +1 damage per success when attacking'), dice: t(1, 'Rerolls on attack rolls') },
  veronica: { time: t(3, 'Time resets to 7 (6 in Extreme), and her save rewards are all Time') },
  // ---- Series 3
  tali: { cards: t(2, 'Takes a Reaction card, and Reactions cost 1 Time less'), tank: t(1, 'Cheaper Guard/Retaliate-style defence') },
  kat: { attack: t(2, '+2 damage with guns (needs a gun)'), items: t(1, 'Wants a gun') },
  christie: { control: t(3, 'Draws two Terror cards and chooses which happens'), move: t(1, 'Extra saves give moves') },
  kenzie: { cards: t(3, 'Buys every copy of an Action card for the price of one'), horror: t(1, 'Extra saves lower Horror') },
  octavia: { tank: t(2, 'Builds up a marker to soak incoming damage') },
  janelle: { attack: t(2, 'Builds up a marker that adds damage to one attack') },
  cassie: { attack: t(3, 'Can double the damage of her next attack for Time'), time: t(0, 'Her power eats Time') },
  mandy: { attack: t(2, 'Extra damage on unarmed attacks, so she needs no weapon') },
  meghan: { tank: t(2, 'Heals when the Killer reaches her (or lowers Horror at full health)'), horror: t(1, 'Lowers Horror at full health') },
  ronda: { time: t(3, 'Time equal to Bloodlust, then more Time whenever Bloodlust rises') },
  // ---- Series 4
  maud: { attack: t(2, 'Damage cards cost less and ignore their health cost'), time: t(1, 'Cheaper damage cards') },
  christina: { attack: t(2, 'Throws any Item as a ranged weapon; better ranged hits'), items: t(2, 'Every Item doubles as a weapon') },
  dakota: { dice: t(3, 'Rerolls all 1s and 2s on Horror rolls'), horror: t(0, 'Her save rewards RAISE Horror') },
  alois: { dice: t(3, 'Always rolls 6 dice for Horror rolls') },
  rita: { horror: t(3, 'Lowers Horror every Upkeep (and on extra saves)') },
  lindi: { tank: t(3, 'Heals every Upkeep') },
  vicky: { move: t(3, 'Extra spaces on Walk/Sprint for Time'), tank: t(1, 'Save rewards include health') },
  joy: { tank: t(3, 'Ignores one damage or health loss every turn'), horror: t(1, 'Save rewards include Horror drops') },
  rena: { cards: t(2, 'Takes back a free (0 Time) card each Action phase') },
  gwynn: { horror: t(3, 'Every save and her Ultimate lower Horror') },
  // ---- Vignettes, specials, promos with card data
  patsy: { attack: t(1, 'Spends Time for chip damage'), move: t(1, 'Save rewards include moves') },
  claus: { tank: t(3, 'Full heal and no health limit') },
  cindy: { move: t(3, 'Failed Walk/Sprint results count as successes'), time: t(1, 'Extra saves give Time') },
  adrianne: { time: t(1, 'Flexible boosts'), tank: t(1, 'Flexible boosts'), move: t(1, 'Flexible boosts'), horror: t(1, 'Flexible boosts') },
  maureen: { cards: t(2, 'Uses Victims to play cards straight from the tableau') },
  paula: { dice: t(2, 'Rolls 2 dice whenever she’d roll 1'), horror: t(1, 'Save rewards include Horror drops') },
  jamie: { attack: t(2, 'Two-success rolls deal damage anywhere on the board'), horror: t(1, 'Save rewards lower Horror') },

  // ---- Rated from Chris's card photos (src/assets/games), not cards.json.
  // Card reading: top-left number = health; number of meeples = saves needed
  // for the Ultimate; slashed-mask meeple = -1 Horror (checked against Paula's
  // card, whose wiki text lists the same rewards).
  // Both sides photographed:
  agnes: { dice: t(2, 'Ultimate: gains 2 Ultimate Dice of her choice'), tank: t(1, 'Two save rewards heal (one heals 2)'), time: t(1, 'Save rewards and extra saves give Time'), horror: t(1, 'A save reward lowers Horror') },
  layla: { cards: t(2, 'Ultimate: takes any Signature Action card from out of play'), tank: t(1, 'Extra saves heal'), time: t(1, 'A save reward gives 2 Time'), horror: t(1, 'A save reward lowers Horror') },
  julia: { tank: t(2, 'Can recover all health by sacrificing a Victim'), attack: t(1, 'Can deal damage by sacrificing a Victim'), move: t(1, 'Can move 2 spaces ignoring penalties by sacrificing a Victim') },
  constance: { attack: t(2, 'Ultimate: uses any weapon from range 0-2'), items: t(2, 'Ultimate makes every weapon ranged; a save reward takes a top Item'), time: t(1, 'A save reward gives 2 Time, and extra saves give Time') },
  'jen-promo': { attack: t(2, 'Ultimate: Furious Strike costs 0 Time'), cards: t(1, 'Furious Strike becomes free to play'), horror: t(2, 'Two save rewards lower Horror, and extra saves lower it again') },
  iris: { items: t(3, 'Ultimate: 3 times, goes through all Items at her space and takes 1; a save reward takes any top Item'), search: t(2, 'Picks the exact Item she wants'), horror: t(2, 'Two save rewards lower Horror'), move: t(1, 'A save reward takes a Sprint card') },
  // Action side only (Ultimate side not photographed yet), so these are
  // provisional: the Ultimate could move them a lot.
  julie: { items: t(2, 'Two save rewards are Items, one of them any unused Item'), horror: t(2, 'Three save rewards lower Horror') },
  meg: { time: t(1, 'A save reward gives 2 Time'), items: t(1, 'A save reward takes any top Item'), tank: t(1, 'A save reward takes a Guard card'), horror: t(1, 'A save reward lowers Horror') },
  carolyn: { move: t(1, 'Save rewards include 2 Psychic Travel cards'), attack: t(1, 'Save rewards include 2 Psychic Attack cards'), horror: t(1, 'Save rewards include 2 Psychic Focus cards'), cards: t(1, 'Every save reward is a Psychic card') },
  // Not rated:
  //   grandma: action side shows 1 health and five card rewards (Retaliate,
  //     Gather the Flock, Guard, Slow Walk, Rally). Rating her on 1 health
  //     alone would mislead; needs the Ultimate side / pack rules.
  //   gabrielle: no card photos or card data yet.
};
// Holiday Paula is an alt-art Paula (cards.json: "alt-art Holiday Paula exists").
GIRL_TRAITS['holiday-paula'] = GIRL_TRAITS.paula;

/* ---- Health, save slots and Ultimate strength --------------------------
   h      starting health (top-left of her card)
   saves  Victims she must save before her Ultimate (the meeple slots on her
          card). Fewer = she gets it sooner.
   ult    how much her Ultimate swings a game once she has it:
            3 strong every turn (e.g. 6 dice always, free Guard every turn)
            2 solid but situational or one-off
            1 minor
          null = Ultimate side not known yet (counted as middling, 1.5)
   note   one line on the Ultimate, shown in "Why?"
   From cards.json, or read off Chris's card photos where cards.json has no
   number (asami, red, octavia, janelle, cassie, mandy, meghan, ronda, maud,
   christina). Edit freely: every score updates itself. */
const stat = (h, saves, ult, note) => ({ h, saves, ult, note });
export const FG_STATS = {
  // Series 1
  laurie: stat(5, 6, 3, 'Extra damage every time she hits an Enemy in her space'),
  reiko: stat(6, 5, 2, 'Free move to an Enemy within 2 spaces each Action phase'),
  selena: stat(6, 4, 2, '2 extra dice on every Search'),
  alice: stat(4, 6, 2, 'One chosen Action card always rolls 5 dice'),
  adelaide: stat(6, 5, 2, 'One-off: drop a Wrath track to 1, full heal, or 6 Time of cards'),
  barbara: stat(7, 5, 2, 'Extra damage per Victim in the Killer’s space (but each kills a Victim)'),
  asami: stat(5, 4, 2, 'Draws an extra Item to choose from; immune to Item traps'),
  charlie: stat(7, 6, 2, 'Can pay 3 health to take Critical Blow into her hand'),
  nancy: stat(4, 5, 1, 'Can swap her Final Health token for a better one'),
  sheila: stat(6, 6, 3, '2 Time (not 1) for every card discarded for Time'),
  melanie: stat(5, 6, 2, 'Trade 1 health for 2 damage split among Enemies in her space'),
  // Series 2
  ellen: stat(4, 6, 2, 'Picks any unused Item after a successful Search'),
  jenette: stat(7, 4, 2, 'An extra hand for Items, plus spare uses on limited Items'),
  kate: stat(4, 6, 2, 'Max health rises to 7, heals fully, extra die at full health'),
  uki: stat(6, 4, 3, 'A free Guard every turn'),
  ginny: stat(6, 6, 1, 'Two small permanent boosts to basic cards'),
  ava: stat(5, 5, 2, 'Rerolls all 1s on Horror rolls'),
  red: stat(5, 6, 2, 'Free move when an Enemy is within 2 spaces'),
  gretel: stat(6, 5, 1, 'Turn a 2 into a success by discarding 3 cards'),
  heather: stat(5, 6, 3, 'Rerolls and +1 damage per success when attacking'),
  veronica: stat(5, 5, 3, 'Time resets to 7 every turn'),
  // Series 3
  tali: stat(6, 4, 2, 'Takes a Reaction card; Reactions cost 1 Time less'),
  kat: stat(4, 6, 2, '+2 damage with guns (needs a gun)'),
  christie: stat(5, 4, 3, 'Draws two Terror cards and picks which happens'),
  kenzie: stat(5, 5, 2, 'All copies of an Action card for the price of one'),
  octavia: stat(5, 4, 2, 'Builds a marker that soaks incoming damage'),
  janelle: stat(5, 4, 2, 'Builds a marker that adds damage to one attack'),
  cassie: stat(5, 6, 2, 'Doubles one attack (in the Killer’s space or with 6 Time)'),
  mandy: stat(6, 5, 3, 'Unarmed attacks automatically deal 3 damage'),
  meghan: stat(5, 5, 1, 'Heals 1 when she and the Killer share a space'),
  ronda: stat(6, 4, 2, 'A big Time boost, then Time whenever Bloodlust rises'),
  // Series 4
  maud: stat(6, 6, 2, 'Damage cards cost 1 less; ignores health loss from failed rolls'),
  christina: stat(5, 5, 2, 'Throws any Item as a ranged attack'),
  dakota: stat(6, 5, 3, 'Rerolls all 1s and 2s on Horror rolls'),
  alois: stat(5, 5, 3, 'Always rolls 6 dice for Horror rolls'),
  rita: stat(5, 6, 2, 'Lowers Horror on a die roll every Upkeep'),
  lindi: stat(5, 4, 2, 'Heals on a die roll every Upkeep'),
  vicky: stat(5, 5, 2, 'Extra spaces on Walk/Sprint for Time'),
  joy: stat(6, 6, 3, 'Ignores one damage or health loss every turn'),
  rena: stat(6, 5, 2, 'Takes back a 0-Time card each Action phase'),
  gwynn: stat(5, 4, 1, '-1 Horror when rolling a single die (and may choose to)'),
  // Vignettes, specials, promos
  patsy: stat(6, 5, 1, 'Spend 2 Time for 1 chip damage'),
  claus: stat(6, 4, 3, 'Full heal and no maximum health'),
  cindy: stat(5, 4, 2, 'Failed Walk/Sprint results count as successes'),
  adrianne: stat(6, null, 1, 'Small boosts paid for with Victims; flips on a die roll'),
  maureen: stat(5, null, 2, 'Plays Action cards straight from the tableau, paid with Victims'),
  paula: stat(5, 5, 1, 'Rolls 2 dice whenever she’d roll 1'),
  agnes: stat(4, 6, 2, 'Gains 2 Ultimate Dice of her choice'),
  layla: stat(5, 5, 1, 'Takes one Signature Action card'),
  julia: stat(6, 1, 1, 'After 1 save: kill a Victim to heal fully, hit, or move 2 (then flips back)'),
  constance: stat(5, 5, 2, 'Uses any weapon at range 0-2'),
  'jen-promo': stat(5, 5, 2, 'Furious Strike costs 0 Time'),
  iris: stat(4, 5, 2, 'Three times, takes any Item from the space she’s on'),
  jamie: stat(5, 5, 2, 'Two-success rolls deal 1 damage anywhere'),
  julie: stat(5, 5, null, 'Ultimate side not photographed yet'),
  meg: stat(5, 4, null, 'Ultimate side not photographed yet'),
  carolyn: stat(5, 6, null, 'Ultimate side not photographed yet'),
};
FG_STATS['holiday-paula'] = FG_STATS.paula;

/* 0-1: how well her health keeps her alive. 4 = 0.25 ... 7 = 1. */
export function survivalOf(girlId) {
  const st = FG_STATS[girlId];
  if (!st || st.h == null) return null;
  return Math.max(0, Math.min(1, (st.h - 3) / 4));
}
/* 0-1: how soon her Ultimate arrives. 1 save = 1, 4 = 0.8, 5 = 0.55, 6 = 0.3.
   No fixed number (flip conditions) counts as middling. */
export function ultSpeedOf(girlId) {
  const st = FG_STATS[girlId];
  if (!st) return null;
  if (st.saves == null) return 0.5;
  return { 1: 1, 2: 0.95, 3: 0.9, 4: 0.8, 5: 0.55, 6: 0.3 }[st.saves] ?? 0.2;
}
/* 0-1: Ultimate value = speed x power (an early but weak Ultimate stays modest). */
export function ultValueOf(girlId) {
  const st = FG_STATS[girlId];
  if (!st) return null;
  const power = st.ult == null ? 1.5 : st.ult;
  return ultSpeedOf(girlId) * (power / 3);
}

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
  'the-birds': { confidence: 'estimate', tank: need(2, 'Swarms chip away at health'), rescue: need(2, 'Victims die fast'), horror: need(2, 'Constant attacks raise Horror'), attack: need(2, 'Killing Birds (1 health each) stops the swarm; lose if every space fills up') },
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

const LOCATION_WEIGHT = 0.7; // the Killer usually matters more than the map

/* ---- Victim deaths and Bloodlust ----------------------------------------
   For each Killer and Location:
     deaths     how quickly Victims die (0 = rarely, 3 = very fast)
     bloodlust  how much those deaths feed the Killer (0 = Bloodlust doesn't
                rise on deaths, 3 = every death makes it much more dangerous)
   Used in scoreGirl: fast deaths make a quick Ultimate worth more and punish
   girls who need 5-6 saves (she may never get there); fast deaths that also
   feed Bloodlust make the Killer hit harder over time, so health counts more.
   Ratings from the rules in the app (playRules) and the strategy tips; edit
   freely. */
const vp = (deaths, bloodlust, why) => ({ deaths, bloodlust, why });
export const KILLER_PRESSURE = {
  hans: vp(2, 2, 'Hunts Victims steadily; each death feeds a strong Bloodlust track'),
  poltergeist: vp(2, 2, 'Can’t be killed, so Victims keep dying until you get them out'),
  inkanyamba: vp(2, 2, 'Deaths raise Bloodlust, and his Wrath Unleashes add more danger'),
  geppetto: vp(3, 2, 'Puppets swarm and keep respawning, picking off Victims'),
  'dr-fright': vp(2, 3, 'Low Bloodlust keeps him nearly still; each death wakes him up'),
  evomorph: vp(2, 3, 'Bloodlust makes it EVOLVE (Hatchling → Youngling → Adult)'),
  organism: vp(2, 2, 'Exposed Victims can’t be saved until tested; others die as normal'),
  intruders: vp(3, 2, 'Three Killers on the board means more Victims caught'),
  'big-bad-wolf': vp(3, 2, 'In Slay mode its attacks are spread across every Victim in its space'),
  'ratchet-lady': vp(3, 1, 'Victims turn into Maniacs (lost to you), but that doesn’t raise Bloodlust'),
  hunter: vp(2, 0, 'Its Bloodlust doesn’t rise when Victims die, only when damage is dealt'),
  razorface: vp(2, 2, 'Afflictions need Victims to purge, so losing them can make him unbeatable'),
  slayer: vp(2, 2, 'Pulls Victims into the Mirror Dimension and kills them there'),
  tormentor: vp(2, 2, 'Death Traps catch Victims, though she’s off the board until the Finale'),
  eyeless: vp(2, 2, 'Noise draws him to Victims (estimate)'),
  'the-birds': vp(3, 2, 'Swarms of Birds kill Victims fast'),
  'patsy-zombies': vp(2, 3, 'Bloodlust sets how many Zombies spawn; dead Victims swell the Hordes'),
  destiny: vp(2, 2, 'Fated deaths come in order; Bloodlust rises when their Death tokens are revealed'),
  raptors: vp(2, 2, 'A pack that stops on Victims (estimate)'),
  volkar: vp(2, 2, 'Concealed most of the game, then strikes (estimate)'),
  berith: vp(2, 2, 'Possessed nun hunting Victims (estimate)'),
  grimlash: vp(3, 2, 'Victims in the fields die quickly'),
  billy: vp(2, 2, 'Buddies and Billy both attack Victims (estimate)'),
  pods: vp(3, 2, 'Victims get taken over (estimate)'),
  mort: vp(1, 2, 'Disguised among Suspects for much of the game, so fewer direct kills'),
  krampus: vp(2, 2, 'Attacks, then Krampus Presents hurt Victims who open them'),
};
export const LOCATION_PRESSURE = {
  'camp-happy-trails': vp(1, 0, 'Victims spread out, no extra hazards'),
  'creech-manor': vp(1, 0, 'One-way spaces slow everyone, Victims included'),
  'sacred-groves': vp(1, 2, 'Victims on Sacred spaces raise Wrath, which climbs the Groves’ own Bloodlust track'),
  'carnival-of-blood': vp(2, 0, 'Terror Traps always kill the Victims in your space'),
  'maple-lane': vp(1, 0, 'Victims holed up in houses are slow to reach'),
  'uss-konrad': vp(1, 0, 'Closed shafts slow rescues'),
  'station-2891': vp(2, 0, 'Frostbite hurts Victims outdoors, and saving needs the helicopter'),
  'wingard-cottage': vp(1, 0, 'Victims close together'),
  'storybook-woods': vp(1, 0, 'Bridges let only 1 Victim across at a time'),
  'wolfe-asylum': vp(1, 0, 'No extra Victim hazards'),
  'sunnydaze-mall': vp(1, 0, 'The Savior is the target, not the Victims'),
  hellscape: vp(1, 0, 'Shifting tiles can strand Victims'),
  falconwood: vp(1, 0, 'The Mission comes first; Friends help'),
  'marrek-warehouse': vp(1, 0, 'Locked Exits keep Victims on the floor longer'),
  utopia: vp(3, 0, 'Sand Snakes hit Victims first every turn, and sinkholes kill everyone in them'),
  'isla-lagarto': vp(3, 0, 'The T-Rex instantly kills a Victim first'),
  'pesadilla-verde': vp(2, 0, 'Soldiers follow you into the Killer’s space; friendly fire kills them'),
  'larmes-abbey': vp(1, 0, 'Malice builds up in the rooms (estimate)'),
  'shady-acres': vp(2, 0, 'The Children keep spawning while Victims remain'),
  buddyland: vp(1, 0, 'No extra Victim hazards (estimate)'),
  megabgcon: vp(0, 0, 'Booths keep spawning new Victims, so saves are plentiful'),
  'santas-village': vp(1, 0, 'Elves slow movement, not Victims'),
};

/* Combined pressure for a combo: deaths and bloodlust (Location at 70%). */
export function comboPressure(killerId, locationId) {
  const k = KILLER_PRESSURE[killerId];
  const l = LOCATION_PRESSURE[locationId];
  const deaths = (k ? k.deaths : 0) + LOCATION_WEIGHT * (l ? l.deaths : 0);
  const bloodlust = (k ? k.bloodlust : 0) + LOCATION_WEIGHT * (l ? l.bloodlust : 0);
  const reasons = [k && `Killer: ${k.why}`, l && `Location: ${l.why}`].filter(Boolean);
  return { deaths, bloodlust, reasons, known: Boolean(k || l) };
}

/* One-off pairings worth more than the trait maths shows. */
export const SPECIALS = [
  { girl: 'adelaide', killer: 'inkanyamba', bonus: 2, why: 'Her Ultimate can drop a Wrath track straight to 1' },
  { girl: 'adelaide', location: 'sacred-groves', bonus: 1, why: 'Her Ultimate can drop the Groves’ Wrath to 1' },
  { girl: 'asami', location: 'carnival-of-blood', bonus: 1, why: 'Immune to the Carnival’s Item traps' },
  { girl: 'melanie', killer: 'the-birds', bonus: 3, why: 'Her Ultimate wipes out every Bird in her space (Birds have 1 health); she was made for this Killer' },
  { girl: 'selena', killer: 'poltergeist', bonus: 1, why: 'Reviewers’ top pick: fast Ultimate plus Search dice to find Carolyn' },
];

/* ---- Scoring -------------------------------------------------------------- */

/* The three parts are divided by this before x10, so a strong all-rounder
   lands around 8-9 and only an exceptional pairing reaches 10. */
export const SCORE_SCALE = 0.95;


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
  laurie: {
    bonus: 0.5,
    why: 'Her Bow lets her hit from 1-3 spaces away for 1 Time, without an Action card (3 arrows)',
    notes: [
      'Range 1-3, 1 damage per arrow, 1 Time a shot. It can\u2019t be powered up by an Action card.',
      'Only 3 arrows, so save them for when chip damage from a distance really matters.',
      'Her own ability adds damage to Enemies in HER space, so it doesn\u2019t stack with shots from range: shoot as they close in, then finish them up close.',
    ],
  },
  // Jenette's Scanner: on a Search space, see the whole Item deck and pick.
  jenette: {
    traits: { search: 2 },
    why: 'Her Scanner lets her look through a Search space\u2019s whole Item deck and choose',
    notes: [
      'Works on any Search space at any Location, not just the Konrad.',
      'It doesn\u2019t give extra searches or dice: it turns every search you do into a pick of the deck.',
      'Strongest where one particular Item wins the game or a deck is full of traps; weakest where you barely search.',
      'Pairs with her extra Item hand: find exactly what you need and carry more of it.',
    ],
  },
  // Uki's Gus: 1 damage to any Enemy entering her space; soaks her next 3 hits.
  // Her Toughness is already 3, so the soak counts as a small flat bonus.
  uki: {
    traits: { attack: 1 },
    bonus: 0.5,
    why: 'Gus bites any Enemy that enters her space and soaks her next 3 hits',
    notes: [
      '1 damage to every Enemy that enters her space, with no Time or card needed.',
      'Soaks her next 3 hits (one marker each). Once the markers are gone, he can\u2019t soak any more.',
      'He\u2019s an ally, not a Backpack item, so he doesn\u2019t use up a slot.',
      'Best against Killers that keep coming to you or bring lots of minions. Pairs with her free Guard.',
    ],
  },
  // Tali's Grenades: 2 Time for 2 damage to an adjacent Enemy (2 uses); can
  // instead blow a hole in a store wall, which only exists at Sunnydaze Mall.
  tali: {
    traits: { attack: 1 },
    why: 'Her Grenades deal 2 damage to an Enemy in an adjacent space (2 uses)',
    notes: [
      '2 Time for 2 damage, and only against an Enemy in an ADJACENT space, not her own. Keep a one-space gap.',
      'Only 2 grenades: worth holding for the Killer or a finale.',
      'The Destroyed Wall option needs a store wall, which only Sunnydaze Mall has. Everywhere else it\u2019s damage only.',
    ],
    extras: [{ locations: ['sunnydaze-mall'], bonus: 0.5, why: 'Her Grenades can blow a Destroyed Wall into a store to open a shortcut' }],
  },
  // Ginny's Sawed-off Shotgun: 1 Time for 3 damage to the target and 2 to every
  // other Enemy in the space (2 uses), no Action card needed.
  ginny: {
    traits: { attack: 2 },
    why: 'Her Sawed-off Shotgun deals 3 damage, plus 2 to every other Enemy in the space, for 1 Time (2 uses)',
    notes: [
      'Range 0: the target has to be in her space.',
      '1 Time for 3 damage to the target and 2 to every other Enemy there. It doesn\u2019t need an Action card.',
      'Only 2 shots. Best saved for a crowded space or the Killer itself.',
      'No Action card is used, so her Ultimate\u2019s Weak Attack boost doesn\u2019t apply to it.',
    ],
  },
};

/* Where her (opened) envelope item lifts her fit score, from the same engine.
   Returns null if she has no profile, else:
     { avgLift, raised, total, killers: [{ name, lift }], locations: [...] }
   killers/locations: the biggest average lifts (top 3, lift > 0), so the
   Codex can say where the item really earns its place. */
export function envelopeItemImpact(girlId, killers, locations) {
  if (!ENVELOPE_ITEMS[girlId] || !GIRL_TRAITS[girlId]) return null;
  const opened = { [girlId]: 'opened' };
  const byK = {};
  const byL = {};
  let sum = 0;
  let total = 0;
  let raised = 0;
  for (const k of killers) for (const l of locations) {
    const a = scoreGirl(girlId, k.id, l.id);
    const b = scoreGirl(girlId, k.id, l.id, opened);
    if (!a || !b) continue;
    const d = b.score - a.score;
    total += 1;
    sum += d;
    if (d > 0) raised += 1;
    (byK[k.name] = byK[k.name] || []).push(d);
    (byL[l.name] = byL[l.name] || []).push(d);
  }
  const avgs = (m) => Object.entries(m)
    .map(([name, ds]) => ({ name, lift: ds.reduce((x, y) => x + y, 0) / ds.length }));
  const top = (list) => list
    .filter((x) => x.lift > 0)
    .sort((x, y) => y.lift - x.lift || x.name.localeCompare(y.name))
    .slice(0, 3);
  const kAvg = avgs(byK);
  const lAvg = avgs(byL);
  // "Even": every Killer and Location gets about the same lift, so a "helps
  // most" list would just be alphabetical ties.
  const avgLift = total ? sum / total : 0;
  const best = (list) => (list.length ? Math.max(...list.map((x) => x.lift)) : 0);
  const even = best(kAvg) - avgLift < 0.15 && best(lAvg) - avgLift < 0.15;
  return { avgLift, raised, total, even, killers: top(kAvg), locations: top(lAvg) };
}

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
  const st = FG_STATS[girlId];
  if (!base || !st) return null;
  const item = envelopeItemFor(girlId, killerId, locationId, envelopes);
  // Her ratings with the item folded in (each trait capped at 3).
  let g = base;
  if (item && item.traits) {
    g = { ...base };
    for (const [tr, add] of Object.entries(item.traits)) {
      if (tr === 'rescue') continue;
      const cur = g[tr] ? g[tr].v : 0;
      const why = g[tr] ? `${g[tr].why}; plus her envelope item` : `Her envelope item: ${item.why}`;
      g[tr] = { v: Math.min(3, cur + add), why };
    }
  }
  const needs = comboNeeds(killerId, locationId);
  // 'rescue' is not a girl trait: it sets how much Ultimate speed matters.
  const fitNeeds = Object.entries(needs).filter(([tr]) => tr !== 'rescue');
  const totalNeed = fitNeeds.reduce((a, [, n]) => a + n.v, 0);
  if (!totalNeed && !needs.rescue) return null;

  // ---- 1. Scenario fit (her traits x what the scenario rewards)
  let got = 0;
  const strengths = [];
  const gaps = [];
  for (const [tr, n] of fitNeeds) {
    const gv = g[tr] ? g[tr].v : 0;
    got += n.v * gv;
    if (gv >= 2) strengths.push({ trait: tr, label: TRAIT_LABEL[tr], weight: n.v * gv, girlWhy: g[tr].why, needWhy: n.reasons });
    else if (n.v >= 2 && gv === 0) gaps.push({ trait: tr, label: TRAIT_LABEL[tr], needWhy: n.reasons, girlWhy: g[tr] ? g[tr].why : null });
  }
  // Every-game Time/dice: bonus only (adds to her side, not to the need).
  for (const [tr, n] of Object.entries(BASE_NEEDS)) {
    const gv = g[tr] ? g[tr].v : 0;
    if (!gv) continue;
    got += n.v * gv;
    const already = strengths.find((x) => x.trait === tr);
    if (already) { already.weight += n.v * gv; already.needWhy = [...already.needWhy, `Every game: ${n.why}`]; }
    else if (gv >= 2) strengths.push({ trait: tr, label: TRAIT_LABEL[tr], weight: n.v * gv, girlWhy: g[tr].why, needWhy: [`Every game: ${n.why}`] });
  }
  // Rated 2 in everything the scenario wants = 0.8; rated 3s can reach 1.
  const fit = totalNeed ? Math.min(1, (got / (totalNeed * 2)) * 0.8) : 0.5;

  // ---- 2. Survival: health, weighted up against hard-hitting scenarios
  const tankNeed = needs.tank ? needs.tank.v : 0;
  // How fast Victims die (0-1) and how much that feeds Bloodlust (0-1).
  const press = comboPressure(killerId, locationId);
  const deathsN = Math.min(press.deaths, 4) / 4;
  const bloodN = Math.min(press.bloodlust, 3) / 3;
  // Deaths that feed Bloodlust make the Killer hit harder over time.
  const survWeight = 1 + 0.5 * Math.min(tankNeed, 3) / 3 + 0.3 * deathsN * bloodN; // 1 - 1.8
  const surv = survivalOf(girlId) ?? 0.5;
  // ---- 3. Ultimate: speed x power, weighted up where Victims are precious
  const rescueNeed = needs.rescue ? needs.rescue.v : 0;
  // Fast-dying Victims make an early Ultimate worth more...
  const ultWeight = 1 + 0.5 * Math.min(rescueNeed, 3) / 3 + 0.4 * deathsN; // 1 - 1.9
  // ...and a girl needing 5-6 saves may never get there.
  const late = st.saves != null && st.saves > 4 ? st.saves - 4 : 0;
  const speed = ultSpeedOf(girlId) * (1 - 0.15 * deathsN * late);
  const ultV = speed * ((st.ult == null ? 1.5 : st.ult) / 3);
  const power = st.ult == null ? null : st.ult;

  const parts = {
    fit: 0.55 * fit,
    survival: 0.2 * surv * survWeight,
    ultimate: 0.25 * ultV * ultWeight,
  };
  // A girl with fit 0.8 (rated 2 in everything), 6 health and a strong
  // Ultimate after 4 saves lands around 8.
  let raw = (parts.fit + parts.survival + parts.ultimate) / SCORE_SCALE;

  // Reasons for health and the Ultimate, so "Why?" explains them.
  const savesTxt = st.saves == null ? 'her own flip condition' : st.saves === 1 ? 'just 1 save' : `${st.saves} saves`;
  const powerTxt = power == null ? 'Ultimate not known yet' : power === 3 ? 'a strong Ultimate' : power === 2 ? 'a solid Ultimate' : 'a minor Ultimate';
  const health = { h: st.h, value: surv, weight: survWeight, why: `${st.h} health` };
  const pressure = { deaths: press.deaths, bloodlust: press.bloodlust, reasons: press.reasons };
  const ultimate = { saves: st.saves, power, speed, value: ultV, weight: ultWeight, why: `${powerTxt} after ${savesTxt}: ${st.note}` };
  if (st.h >= 7 || (st.h >= 6 && tankNeed >= 2)) {
    strengths.push({ trait: 'health', label: 'Health', weight: 3 * surv * survWeight, girlWhy: `${st.h} health`, needWhy: [...(tankNeed ? needs.tank.reasons : ['Every game: health is how long she survives']), ...(deathsN * bloodN >= 0.4 ? press.reasons : [])] });
  } else if (st.h <= 4) {
    gaps.push({ trait: 'health', label: 'Health', needWhy: tankNeed ? needs.tank.reasons : ['Every game: health is how long she survives'], girlWhy: `Only ${st.h} health` });
  }
  if (ultV >= 0.5) {
    strengths.push({ trait: 'ultimate', label: 'Ultimate', weight: 3 * ultV * ultWeight, girlWhy: ultimate.why, needWhy: [...(rescueNeed ? needs.rescue.reasons : ['Every game: a strong Ultimate, unlocked early']), ...(deathsN >= 0.5 ? press.reasons : [])] });
  } else if (ultV < 0.2 && (rescueNeed >= 2 || deathsN >= 0.6)) {
    gaps.push({ trait: 'ultimate', label: 'Ultimate', needWhy: [...(rescueNeed ? needs.rescue.reasons : []), ...press.reasons], girlWhy: late && deathsN >= 0.5 ? `${ultimate.why}; Victims die fast here, so ${st.saves} saves may never come` : ultimate.why });
  }

  const specials = SPECIALS.filter(
    (x) => x.girl === girlId && ((x.killer && x.killer === killerId) || (x.location && x.location === locationId)),
  );
  if (item && (item.bonus || !item.traits)) {
    specials.push({ girl: girlId, bonus: item.bonus || 0, why: `Envelope item: ${item.why}` });
  }
  for (const x of (item && item.extras) || []) {
    const hit = (x.killers && x.killers.includes(killerId)) || (x.locations && x.locations.includes(locationId));
    if (hit) specials.push({ girl: girlId, bonus: x.bonus || 0, why: `Envelope item: ${x.why}` });
  }
  const bonus = specials.reduce((a, x) => a + x.bonus, 0);

  let score = Math.min(10, raw * 10 + bonus);
  score = Math.max(1, Math.round(score * 2) / 2);
  strengths.sort((a, b) => b.weight - a.weight);
  gaps.sort((a, b) => ((needs[b.trait] ? needs[b.trait].v : 1) - (needs[a.trait] ? needs[a.trait].v : 1)));
  return { score, strengths, gaps, specials, item, health, ultimate, parts, pressure };
}

/* Every rated girl for a combo, best first. `girls` is the app's finalGirls list. */
export function rankGirls(girls, killerId, locationId, envelopes = null) {
  return girls
    .map((fg) => ({ fg, fit: scoreGirl(fg.id, killerId, locationId, envelopes) }))
    .filter((r) => r.fit)
    .sort((a, b) => b.fit.score - a.fit.score || a.fg.name.localeCompare(b.fg.name));
}
