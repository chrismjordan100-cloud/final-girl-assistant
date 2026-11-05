/* --------------------------------------------------------------------------
   Community tips from finalgirlstats.com (added Nov 2026).
   Two kinds: player advice (paraphrased from the site's 'What players say' and
   map/killer notes) and win-rate facts from the community tracking sheet
   (14,825 logged games, last checked 5 Nov 2026). Merged into killerTips,
   locationTips and generalTips in games.js.
   -------------------------------------------------------------------------- */

const tip = (text, source, confidence) => ({ text, source, confidence });
const P = "finalgirlstats.com \u00b7 players";
const ST = "finalgirlstats.com \u00b7 14,825 logged games";

export const communityKillerTips = {
  "hans": [
    tip("He\u2019s slow but hits very hard. Always keep one or two Guards in hand.", P),
    tip("Outrun him early: loot the far end of the map before he gets there.", P),
    tip("Never end your turn in his space. He hits anyone next to him for free.", P),
    tip("The Final Girl wins 63.4% of logged games against Hans (1,489 games), about the same as the 65.5% game-wide average.", ST),
    tip("Easiest locations to face Hans: Santa's Village (77%), the USS Konrad (76.9%). Hardest: the Sacred Groves (36.1%), the Carnival of Blood (41.1%).", ST),
    tip("Most punishing Dark Power: Dark Obsession (only 48% wins over 369 games).", ST),
    tip("Most punishing Finale card: Death Blow (only 51.7% wins over 87 games).", ST),
  ],
  "poltergeist": [
    tip("Don\u2019t search for weapons. Attacks and weapons can\u2019t hurt her, so put your Time into moving, searching and rescuing.", P),
    tip("The Final Girl wins 57.3% of logged games against the Poltergeist (983 games), tougher than the 65.5% game-wide average.", ST),
    tip("Easiest locations to face the Poltergeist: the USS Konrad (85%), the Hellscape (78.3%). Hardest: the Sacred Groves (41.1%), Creech Manor (43.2%).", ST),
    tip("Most punishing Dark Power: Forgetting Something? (only 52% wins over 177 games).", ST),
    tip("Most punishing Finale card: She Will Soon Be Lost (only 53.2% wins over 109 games).", ST),
  ],
  "inkanyamba": [
    tip("The logged games back it up: Inkanyamba at the Sacred Groves is the hardest box in the game. Move him to another location for a fairer fight.", P),
    tip("The Final Girl wins 64.8% of logged games against Inkanyamba (654 games), about the same as the 65.5% game-wide average.", ST),
    tip("Easiest locations to face Inkanyamba: the USS Konrad (88.2%), Storybook Woods (85.2%). Hardest: the Sacred Groves (38%), Creech Manor (56.6%).", ST),
    tip("Most punishing Dark Power: Volatile Temper (only 54% wins over 163 games).", ST),
    tip("Most punishing Finale card: Savage Whirlwind (only 44.5% wins over 110 games).", ST),
  ],
  "geppetto": [
    tip("Clear the Puppets before you try to finish him. Players find he can feel too easy once the Puppets go early.", P),
    tip("The Final Girl wins 65.1% of logged games against Geppetto (881 games), about the same as the 65.5% game-wide average.", ST),
    tip("Easiest locations to face Geppetto: Storybook Woods (90.7%), the Hellscape (83.3%). Hardest: the Carnival of Blood (44.6%), the Sacred Groves (62.5%).", ST),
    tip("Most punishing Dark Power: Join the Family (only 59.5% wins over 153 games).", ST),
  ],
  "evomorph": [
    tip("You don\u2019t have to kill it. Self-destructing the ship and escaping, or blowing it out of an airlock, also wins. If the fight turns against you, switch goals.", P),
    tip("The Final Girl wins 75.2% of logged games against the Evomorph (901 games), easier than the 65.5% game-wide average.", ST),
    tip("Easiest locations to face the Evomorph: the Hellscape (88.9%), Storybook Woods (81.5%). Hardest: Wolfe Asylum (68.2%), the Carnival of Blood (68.6%).", ST),
    tip("Most punishing Dark Power: Acid Blood (only 71.4% wins over 231 games).", ST),
    tip("Most punishing Finale card: The Perfect Organism (only 59.1% wins over 115 games).", ST),
  ],
  "organism": [
    tip("Test the two Exposed Victims nearest the Lab as soon as you can, and let the third mutate on its own.", P),
    tip("Keep one Organism alive on low health. You keep the Adrenaline die and avoid the \"if there is no Organism\" effects.", P),
    tip("Take the Axe if you see it. Organisms have low health.", P),
    tip("The Final Girl wins 73.3% of logged games against the Organism (767 games), easier than the 65.5% game-wide average.", ST),
    tip("Easiest locations to face the Organism: Camp Happy Trails (85.3%), Creech Manor (84.2%). Hardest: the Sacred Groves (52.8%), Station 2891 (64.9%).", ST),
    tip("Most punishing Finale card: Regenerative Assimilation (only 67.4% wins over 190 games).", ST),
  ],
  "intruders": [
    tip("Attacking a Killer makes it the Active Killer, even if you deal no damage.", P),
    tip("Damage to any Killer goes onto the Minor Dark Power card first.", P),
    tip("The Final Health +1 die bonus only applies once, however many Final Health tokens are out.", P),
    tip("The Final Girl wins 62.6% of logged games against the Intruders (947 games), about the same as the 65.5% game-wide average.", ST),
    tip("Easiest locations to face the Intruders: Maple Lane (78.3%), Falconwood (77.6%). Hardest: Station 2891 (42.1%), the Sacred Groves (43.6%).", ST),
  ],
  "big-bad-wolf": [
    tip("One of his Dark Powers stops Retaliate (and similar hit-back cards) dealing damage. The attack is still blocked, so if it appears, change your plan.", P),
    tip("Once he speeds up he crosses the map fast. Items are your best way to slow him. Thorny/Tangling Vines are very strong if timed well.", P),
    tip("In Track mode he sometimes circles round. Use that breathing space to act.", P),
    tip("The Final Girl wins 70% of logged games against the Big Bad Wolf (744 games), easier than the 65.5% game-wide average.", ST),
    tip("Easiest locations to face the Big Bad Wolf: Mega Boardgame Con (81.8%), Falconwood (76.7%). Hardest: the Sacred Groves (40.9%), the Carnival of Blood (58.1%).", ST),
    tip("Most punishing Dark Power: A Killing Machine (only 50.4% wins over 117 games).", ST),
    tip("Most punishing Finale card: Tasty Treats (only 60% wins over 100 games).", ST),
  ],
  "ratchet-lady": [
    tip("Maniacs cause direct health loss that Guard and Retaliate can\u2019t block. Defensive cards do little here.", P),
    tip("Prioritise mobility, rescue victims quickly and always keep an attack card in hand.", P),
    tip("Reviewers rate this box one of the hardest in the game. Not a good first box.", P),
    tip("The Final Girl wins 66.3% of logged games against the Ratchet Lady (709 games), about the same as the 65.5% game-wide average.", ST),
    tip("Easiest locations to face the Ratchet Lady: Camp Happy Trails (81%), the USS Konrad (80.8%). Hardest: Wolfe Asylum (49.7%), the Carnival of Blood (51.6%).", ST),
    tip("Most punishing Dark Power: Shield of Madness (only 55.4% wins over 112 games).", ST),
    tip("Most punishing Finale card: Hold Her Down (only 63.5% wins over 107 games).", ST),
  ],
  "hunter": [
    tip("Bloodlust only rises when it damages you or an ally, or is damaged itself, and at most once per phase.", P),
    tip("Each Cybernetic Part on the Mark V needs 2 damage in the same phase to remove. Save your hits for one big turn.", P),
    tip("The Final Girl wins 70.3% of logged games against the H.U.N.T.E.R. (481 games), easier than the 65.5% game-wide average.", ST),
    tip("Easiest locations to face the H.U.N.T.E.R.: the USS Konrad (93%), Camp Happy Trails (81.5%). Hardest: Marrek Warehouse (56.9%), Sunnydaze Mall (60.4%).", ST),
    tip("Most punishing Dark Power: Cybernetic Agility (only 65.5% wins over 145 games).", ST),
  ],
  "razorface": [
    tip("His Final Health can\u2019t be revealed while any Affliction is in play. Damage to it is ignored until they\u2019re cleared.", P),
    tip("The Final Girl wins 53.8% of logged games against Razorface (528 games), tougher than the 65.5% game-wide average.", ST),
    tip("Easiest locations to face Razorface: Storybook Woods (69.2%), Station 2891 (61.3%). Hardest: the Sacred Groves (27.1%), the Carnival of Blood (29.6%).", ST),
    tip("Most punishing Dark Power: Life Drain (only 44.4% wins over 142 games).", ST),
  ],
  "tormentor": [
    tip("Players find disarming traps before the Finale poor value for the Time spent.", P),
    tip("The Final Girl wins 72.2% of logged games against the Tormentor (616 games), easier than the 65.5% game-wide average.", ST),
    tip("Easiest locations to face the Tormentor: Wingard Cottage (85.7%), Maple Lane (81%). Hardest: the Sacred Groves (47.4%), Creech Manor (60%).", ST),
  ],
  "billy": [
    tip("A Buddy that spawns during the Killer phase doesn\u2019t act until the next Killer phase.", P),
    tip("Buddy Kill Rewards are worth taking (Toby\u2019s gives 2 Time, for example).", P),
    tip("Power Surge (epic Finale) brings in Boris. You must beat both Billy and Boris to win.", P),
    tip("The basic Finale has no move icons, so Buddies and Billy attack without moving. Encore and Sizzling Power are harder.", P),
    tip("The Final Girl wins 59.7% of logged games against Billy (201 games), tougher than the 65.5% game-wide average.", ST),
    tip("Most punishing Dark Power: Merciless Minions (only 46.4% wins over 28 games).", ST),
    tip("Most punishing Finale card: Power Surge (only 41.4% wins over 29 games).", ST),
  ],
  "grimlash": [
    tip("He only moves 1 space in his Killer action, but a move (boot) icon on a Terror card moves him his full speed for the current Harvest Madness level.", P),
    tip("Once-per-turn effects are used by flipping the card face down. It flips back in the Upkeep.", P),
    tip("The Final Girl wins 78.6% of logged games against Grimlash (271 games), easier than the 65.5% game-wide average.", ST),
    tip("Most punishing Dark Power: Root-bound Curse (only 65.6% wins over 61 games).", ST),
    tip("Most punishing Finale card: God of Blood and Grain (only 66.7% wins over 33 games).", ST),
  ],
  "berith": [
    tip("She doesn\u2019t move before the Finale. Use that time to gear up and save victims.", P),
    tip("You don\u2019t need all seven blessings before beating her, but each extra one makes her return more likely.", P),
    tip("\"Leave Her! Take Me!\" trades your health for a blessing, which moves you closer to winning.", P),
    tip("The Blasphemy Dark Power stops you resolving Expel Demon, your usual source of blessings.", P),
    tip("The Final Girl wins 62.1% of logged games against Berith (169 games), tougher than the 65.5% game-wide average.", ST),
    tip("Most punishing Dark Power: Rejecting God (only 47.4% wins over 38 games).", ST),
  ],
  "volkar": [
    tip("If every Path card is face up you know exactly where she is. Any face-down card means you\u2019re guessing.", P),
    tip("She comes out of hiding when a Reveal icon resolves, when a sixth card joins the Path, or when you damage her while Concealed.", P),
    tip("Players rate her one of the most rules-heavy killers. Keep the rule sheet to hand.", P),
    tip("The Final Girl wins 73.6% of logged games against Volk'ar (106 games), easier than the 65.5% game-wide average.", ST),
    tip("Most punishing Finale card: Self Destruct (only 58.3% wins over 36 games).", ST),
  ],
  "raptors": [
    tip("Use weak attacks on loose Raptors and save strong weapons for the Pack.", P),
    tip("The Pack has no health cap, but its attack doesn\u2019t grow as it gets bigger.", P),
    tip("The Final Girl wins 66.7% of logged games against the Raptors (99 games), about the same as the 65.5% game-wide average.", ST),
    tip("Most punishing Dark Power: Pack Conditioning (only 57.7% wins over 26 games).", ST),
  ],
  "dr-fright": [
    tip("The Final Girl wins 74.4% of logged games against Dr. Fright (915 games), easier than the 65.5% game-wide average.", ST),
    tip("Easiest locations to face Dr. Fright: the Hellscape (94%), the USS Konrad (90.6%). Hardest: the Carnival of Blood (59.4%), Creech Manor (60.4%).", ST),
    tip("Most punishing Dark Power: Shock Factor (only 66.4% wins over 149 games).", ST),
    tip("Most punishing Finale card: Time to Die (only 70.8% wins over 130 games).", ST),
  ],
  "slayer": [
    tip("The Final Girl wins 60.5% of logged games against Slayer (542 games), tougher than the 65.5% game-wide average.", ST),
    tip("Easiest locations to face Slayer: Falconwood (72%), Wingard Cottage (66%). Hardest: the Sacred Groves (32.6%), Creech Manor (46%).", ST),
    tip("Most punishing Finale card: Your Time is Up (only 44.2% wins over 52 games).", ST),
  ],
  "eyeless": [
    tip("The Final Girl wins 64.6% of logged games against the Eyeless (508 games), about the same as the 65.5% game-wide average.", ST),
    tip("Easiest locations to face the Eyeless: the USS Konrad (87%), Storybook Woods (77.8%). Hardest: Utopia (56.4%), Creech Manor (61.7%).", ST),
  ],
  "mort": [
    tip("The Final Girl wins 68.6% of logged games against Mort (334 games), easier than the 65.5% game-wide average.", ST),
    tip("Easiest locations to face Mort: Marrek Warehouse (74.5%). Hardest: Wingard Cottage (60%).", ST),
    tip("Most punishing Dark Power: Relentless Paranoia (only 63.4% wins over 82 games).", ST),
  ],
  "krampus": [
    tip("The Final Girl wins 58.2% of logged games against Krampus (613 games), tougher than the 65.5% game-wide average.", ST),
    tip("Easiest locations to face Krampus: the USS Konrad (83%), Camp Happy Trails (80%). Hardest: the Carnival of Blood (37.2%), Creech Manor (43.7%).", ST),
    tip("Most punishing Dark Power: Explosive Gifts (only 52.7% wins over 150 games).", ST),
    tip("Most punishing Finale card: Past Midnight (only 39.4% wins over 66 games).", ST),
  ],
  "destiny": [
    tip("The Final Girl wins 80.3% of logged games against Destiny (269 games), easier than the 65.5% game-wide average.", ST),
    tip("Easiest locations to face Destiny: Falconwood (84%), Mega Boardgame Con (83.3%). Hardest: Utopia (68.8%), the Hellscape (76.7%).", ST),
  ],
  "the-birds": [
    tip("Easiest locations to face the Birds: Wolfe Asylum (90.5%), Mega Boardgame Con (78.3%). Hardest: Creech Manor (40%), Station 2891 (42.1%).", ST),
  ],
  "patsy-zombies": [
    tip("Easiest locations to face the Zombies: Creech Manor (69.6%), Mega Boardgame Con (60%). Hardest: Maple Lane (30.6%), Wolfe Asylum (34%).", ST),
  ],
  "pods": [
    tip("The Final Girl wins 57.6% of logged games against the Pods (66 games), tougher than the 65.5% game-wide average.", ST),
    tip("Most punishing Dark Power: Mass Hysteria (only 40.9% wins over 22 games).", ST),
  ],
};

export const communityLocationTips = {
  "creech-manor": [
    tip("Two windows are one-way drops to the ground floor; the third has a ladder back up. Plan routes around them.", P),
    tip("One of the two hardest locations for these killers (Final Girl win rate): the Birds (40%), the Poltergeist (43.2%), Krampus (43.7%), Slayer (46%), Inkanyamba (56.6%), the Tormentor (60%), Dr. Fright (60.4%), the Eyeless (61.7%).", ST),
    tip("One of the two easiest locations for these killers (Final Girl win rate): the Organism (84.2%), the Zombies (69.6%).", ST),
  ],
  "sacred-groves": [
    tip("The starting setup matters here: there is a 17-point win-rate gap between the hardest and easiest setups.", P),
    tip("One of the two hardest locations for these killers (Final Girl win rate): Razorface (27.1%), Slayer (32.6%), Hans (36.1%), Inkanyamba (38%), the Big Bad Wolf (40.9%), the Poltergeist (41.1%), the Intruders (43.6%), the Tormentor (47.4%), the Organism (52.8%), Geppetto (62.5%).", ST),
  ],
  "station-2891": [
    tip("You can send victims to the Helicopter by radio without being there yourself.", P),
    tip("Up to three victims on the helipad with the Helicopter there can\u2019t be targeted or killed, but they only count as saved when it reaches the Arctic Airport.", P),
    tip("One of the two hardest locations for these killers (Final Girl win rate): the Intruders (42.1%), the Birds (42.1%), the Organism (64.9%).", ST),
    tip("One of the two easiest locations for these killers (Final Girl win rate): Razorface (61.3%).", ST),
  ],
  "wingard-cottage": [
    tip("You only pick up a Supply Item by ending your move in its space and paying Time. Passing through doesn\u2019t count.", P),
    tip("Discarded Supply and Crafted Items go back face up, so you can pick them up or craft them again.", P),
    tip("The Garage counts as House; the Shed and Boathouse are Indoors but not House. It matters for cards that mention the house.", P),
    tip("One of the two hardest locations for these killers (Final Girl win rate): Mort (60%).", ST),
    tip("One of the two easiest locations for these killers (Final Girl win rate): the Tormentor (85.7%), Slayer (66%).", ST),
  ],
  "storybook-woods": [
    tip("Players rate the map too simple. A good pick when you want a lighter game.", P),
    tip("One of the two easiest locations for these killers (Final Girl win rate): Geppetto (90.7%), Inkanyamba (85.2%), the Evomorph (81.5%), the Eyeless (77.8%), Razorface (69.2%).", ST),
  ],
  "wolfe-asylum": [
    tip("Picking up a Pill costs 1 Time and only works if you end your move in its space.", P),
    tip("The Patient\u2019s Gown ignores movement penalties from special rules, and can have a victim in your space die instead of you.", P),
    tip("Reviewers love the asylum and its Pill system.", P),
    tip("One of the two hardest locations for these killers (Final Girl win rate): the Zombies (34%), the Ratchet Lady (49.7%), the Evomorph (68.2%).", ST),
    tip("One of the two easiest locations for these killers (Final Girl win rate): the Birds (90.5%).", ST),
  ],
  "sunnydaze-mall": [
    tip("Enemies won\u2019t jump the railings to the Food Court, so jumping is an escape route (at the cost of damage).", P),
    tip("If the Savior dies you lose immediately. He can only leave the board, and use all Ally actions, at Trust 4.", P),
    tip("Rescuing the Savior is very dice-dependent. Players find the H.U.N.T.E.R. frustrating here and better elsewhere.", P),
    tip("One of the two hardest locations for these killers (Final Girl win rate): the H.U.N.T.E.R. (60.4%).", ST),
  ],
  "hellscape": [
    tip("Players call it the best way into Series 3.", P),
    tip("Hellshift: 2 successes rearrange all tiles, 1 swaps one tile and costs 1 Time, 0 costs 2 Time.", P),
    tip("One of the two hardest locations for these killers (Final Girl win rate): Destiny (76.7%).", ST),
    tip("One of the two easiest locations for these killers (Final Girl win rate): Dr. Fright (94%), the Evomorph (88.9%), Geppetto (83.3%), the Poltergeist (78.3%).", ST),
  ],
  "falconwood": [
    tip("Spaces joined by blue lines aren\u2019t adjacent and generally can\u2019t be crossed unless an event allows it.", P),
    tip("Plan your route so the Mission is done in time. The killer\u2019s Final Health can\u2019t be flipped until it is.", P),
    tip("One of the two easiest locations for these killers (Final Girl win rate): Destiny (84%), the Intruders (77.6%), the Big Bad Wolf (76.7%), Slayer (72%).", ST),
  ],
  "utopia": [
    tip("Treat the Sand Snakes as a second killer.", P),
    tip("Sinkholes can\u2019t be moved to or through for the rest of the game. Plan routes around them.", P),
    tip("One of the two hardest locations for these killers (Final Girl win rate): the Eyeless (56.4%), Destiny (68.8%).", ST),
  ],
  "isla-lagarto": [
    tip("Bait draws Enemies and the T-Rex onto the Goat until it dies.", P),
    tip("Victims won\u2019t follow you into the T-Rex\u2019s space. Its kill priority is Victim, Minion, Final Girl, then Killer.", P),
    tip("Lava spaces block everyone, including Raptors and the T-Rex.", P),
    tip("Setup matters: a 20-point win-rate gap between Beach Landing and Look at the Volcano! (small sample).", P),
  ],
  "pesadilla-verde": [
    tip("Soldiers, unlike normal victims, follow you into the killer\u2019s space and take orders.", P),
    tip("Nobody can move upriver. Downriver, you can cross several River spaces for one move.", P),
    tip("The Huey takes any number of victims once, then leaves and the Clearing stops being an exit. Time it well.", P),
    tip("Every Soldier in an attack rolls for friendly fire, so unlocking \"No Friendly Fire\" helps a lot.", P),
  ],
  "larmes-abbey": [
    tip("Items here are strong, so it\u2019s a good place to prepare. The Blessed die is close to essential.", P),
    tip("Keep victims out of the cursed areas, where they drop fast and push Bloodlust up.", P),
  ],
  "shady-acres": [
    tip("The Children are Enemies, not Minions. Another killer\u2019s Minion cards don\u2019t affect them.", P),
    tip("Children act first in the Killer phase, one at a time, starting with the one nearest the Altar.", P),
    tip("Victims follow you into a space with Children, unless the Killer is there too.", P),
    tip("Attacking several Children in one space splits the damage between them; leftover damage is lost.", P),
  ],
  "buddyland": [
    tip("Only place Skee-Ball markers once you\u2019re in an Arcade space.", P),
    tip("The Pinball and Claw Machine tokens are most useful discarded in an Arcade space.", P),
  ],
  "santas-village": [
    tip("Entering a space costs 1 Time per Elf in it, so crowded spaces are expensive.", P),
    tip("One of the two easiest locations for these killers (Final Girl win rate): Hans (77%).", ST),
  ],
  "marrek-warehouse": [
    tip("Climb and Leap: discard Walk for one, or Sprint for both. A failed Leap moves you 1 space and costs 2 health.", P),
    tip("One of the two hardest locations for these killers (Final Girl win rate): the H.U.N.T.E.R. (56.9%).", ST),
    tip("One of the two easiest locations for these killers (Final Girl win rate): Mort (74.5%).", ST),
  ],
  "carnival-of-blood": [
    tip("One of the two hardest locations for these killers (Final Girl win rate): Razorface (29.6%), Krampus (37.2%), Hans (41.1%), Geppetto (44.6%), the Ratchet Lady (51.6%), the Big Bad Wolf (58.1%), Dr. Fright (59.4%), the Evomorph (68.6%).", ST),
  ],
  "uss-konrad": [
    tip("One of the two easiest locations for these killers (Final Girl win rate): the H.U.N.T.E.R. (93%), Dr. Fright (90.6%), Inkanyamba (88.2%), the Eyeless (87%), the Poltergeist (85%), Krampus (83%), the Ratchet Lady (80.8%), Hans (76.9%).", ST),
  ],
  "camp-happy-trails": [
    tip("One of the two easiest locations for these killers (Final Girl win rate): the Organism (85.3%), the H.U.N.T.E.R. (81.5%), the Ratchet Lady (81%), Krampus (80%).", ST),
  ],
  "maple-lane": [
    tip("One of the two hardest locations for these killers (Final Girl win rate): the Zombies (30.6%).", ST),
    tip("One of the two easiest locations for these killers (Final Girl win rate): the Tormentor (81%), the Intruders (78.3%).", ST),
  ],
  "megabgcon": [
    tip("One of the two easiest locations for these killers (Final Girl win rate): Destiny (83.3%), the Big Bad Wolf (81.8%), the Birds (78.3%), the Zombies (60%).", ST),
  ],
};

export const communityGeneralTips = [
  { category: "Openings (finalgirlstats.com)", items: [
    tip("A \u2013 Full economy: discard all but your 2 Focus cards for Time, then buy Distraction, Improvise and Close Call to hit 3 dice on turn 2. Good against Horror-heavy killers like Hans; risky if the killer starts next to victims.", P),
    tip("B \u2013 Soft Horror (the default): play one Focus, move with the Walks, buy a Distraction and a Close Call, and play the Distraction on turn 2 for 3 dice. Hold Retaliate and attacks for when the killer arrives.", P),
    tip("C \u2013 Aggressive rescue: ignore the killer and rescue fast, using save bonuses to plan routes. Every saved victim weakens him; 10 saves left Hans on 2 damage and 1 move for the whole game.", P),
    tip("D \u2013 Weapon first: only when a melee weapon shows at setup. Travel to the search space for that deck, search twice, then head for an exit. If the weapon is far and victims are near, switch to C.", P),
    tip("Focus is only worth playing at Horror 5 or 6.", P),
  ] },
  { category: "Combat (finalgirlstats.com)", items: [
    tip("Build a hand of Retaliate, Furious Strike and Weak Attack, then unload it in one round. Retaliate works every other turn, so alternate it with Guard.", P),
    tip("Weapon bonuses only apply if the card has already dealt damage. You can choose not to use your weapon.", P),
    tip("Weapon ranking from players: Axe, then Bat, then Knife.", P),
    tip("Ranged weapons usually can\u2019t combine with Retaliate or attack cards, and many can\u2019t hit an adjacent killer. Treat them as no weapon, except for shooting Minor Dark Powers from range.", P),
    tip("A full hand beats an extra die: two dice with cards in hand is better than three with an empty hand.", P),
    tip("Each Reaction card covers one attack, so two attacks need two cards.", P),
  ] },
  { category: "Common mistakes (finalgirlstats.com)", items: [
    tip("You only pay a card\u2019s cost when buying it, not when playing it.", P),
    tip("Don\u2019t spend two cards per partial success; it\u2019s one.", P),
    tip("Don\u2019t hide instead of attacking, and don\u2019t end turns in the killer\u2019s space.", P),
    tip("Remember the 10-card hand limit.", P),
    tip("Guard and Retaliate don\u2019t stop health lost to Horror.", P),
    tip("Lowering Horror only holds your ground, because Terror cards push it back up.", P),
  ] },
  { category: "Map tricks (finalgirlstats.com)", items: [
    tip("Leaving victims in dead ends slows the killer down.", P),
    tip("Killers only move on movement icons and target the nearest victim; ties go to the largest group.", P),
    tip("Traps and items like Fireworks, Bear Trap and Pepper Spray can divert or stall the killer.", P),
  ] },
];
