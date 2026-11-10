/* ==========================================================================
   Final Girl product catalogue for the Codex "Collection" tab.

   Each item: { id, group, name, kind, what, where, worth?, owned? }
     group  'generic' | 's1' | 's2' | 's3' | 's4' | 'promo' | 'thirdparty'
     kind   short label shown as a badge
     what   what it is / what's in it
     where  how you get it (retail, only in X, Kickstarter only…)
     worth  optional one-line view on whether it's worth having
     owned  default "have it" before the user ticks anything
            (from what Chris said he owns: Core Box, all S1 & S2 Feature
            Films, the S3 and S4 Ultimate Boxes)

   SPOILER RULE: never name a Secret Envelope item here. Say "Secret
   Envelope" only.

   Sources (Nov 2026): Van Ryder Games product pages, The Game Steward and
   PHD Games Ultimate Box listings, ReDesign Insert collector's checklist,
   Board Game Bliss promo pack listings, Noble Knight (S2 Mystery Box).
   ========================================================================== */

export const COLLECTION_GROUPS = [
  { id: 'generic', label: 'Core & generic' },
  { id: 's1', label: 'Series 1' },
  { id: 's2', label: 'Series 2' },
  { id: 's3', label: 'Series 3' },
  { id: 's4', label: 'Series 4' },
  { id: 'promo', label: 'Promo Final Girls & character packs' },
  { id: 'thirdparty', label: 'Third-party extras' },
];

const ff = (group, id, name, killer, location, girls, owned) => ({
  id,
  group,
  name,
  kind: 'Feature Film',
  what: `${killer} at ${location}, with Final Girls ${girls}.`,
  where: 'Retail, sold on its own. Also in that series’ Ultimate Box.',
  owned,
});

export const COLLECTION_ITEMS = [
  /* ---------------- Core & generic ---------------- */
  {
    id: 'core-box', group: 'generic', kind: 'Core', name: 'Core Box',
    what: 'The core components every game needs: Action cards, dice, tracks, tokens. Needs a Feature Film to play.',
    where: 'Retail. Also in the Series 1 Ultimate Box.',
    owned: true,
  },
  {
    id: 'starter-happy-trails', group: 'generic', kind: 'Bundle', name: 'Starter Set: Core Box + The Happy Trails Horror',
    what: 'Core Box bundled with the Series 1 Happy Trails Horror film.',
    where: 'Retail bundle.',
    worth: 'Skip: you already have both halves.',
  },
  {
    id: 'starter-buddyland', group: 'generic', kind: 'Bundle', name: 'Starter Set: Core Box + Bad Times at Buddyland',
    what: 'Core Box bundled with the Series 4 Bad Times at Buddyland film.',
    where: 'Retail bundle.',
    worth: 'Skip: you already have both halves.',
  },

  /* ---------------- Series 1 ---------------- */
  {
    id: 's1-ultimate', group: 's1', kind: 'Bundle', name: 'Series 1 Ultimate Box',
    what: 'Core Box, all 5 Series 1 films, Terror From Above vignette, S1 game mat bundle, miniatures, Lore Book, Paula promo card, Vehicle Pack 1, Gruesome Death Books, Cast and Crew Box, Bonus Features Box, Birds miniatures.',
    where: 'Retail bundle. Does not include the Series 1 Mystery Box.',
    worth: 'Only worth it second-hand for the extras; you have the films and Core Box.',
  },
  ff('s1', 's1-happy-trails', 'The Happy Trails Horror', 'Hans the Butcher', 'Camp Happy Trails', 'Laurie and Reiko', true),
  ff('s1', 's1-creech-manor', 'The Haunting of Creech Manor', 'The Poltergeist', 'Creech Manor', 'Selena and Alice', true),
  ff('s1', 's1-groves', 'Slaughter in the Groves', 'Inkanyamba', 'the Sacred Groves', 'Adelaide and Barbara', true),
  ff('s1', 's1-carnival', 'Carnage at the Carnival', 'Geppetto', 'the Carnival of Blood', 'Asami and Charlie', true),
  ff('s1', 's1-maple-lane', 'Frightmare on Maple Lane', 'Dr. Fright', 'Maple Lane', 'Nancy and Sheila', true),
  {
    id: 's1-vignette-birds', group: 's1', kind: 'Vignette', name: 'Terror From Above (The Birds)',
    what: 'Small-box Killer (The Birds) you can play at any Location, plus Final Girl Melanie.',
    where: 'Series 1 Kickstarter and the Series 1 Ultimate Box. Not a regular standalone retail box.',
    worth: 'Worth having: a whole extra Killer that works with every Location you own.',
  },
  {
    id: 's1-bonus-features', group: 's1', kind: 'Accessory', name: 'S1 Bonus Features Box',
    what: 'The Feature Film Rulebook for all five Series 1 films plus their Achievement lists; storage for the Lore Book and Gruesome Death Books.',
    where: 'Retail. Also in the Series 1 Ultimate Box.',
    worth: 'Nice to have: the app already covers the rules and achievements.',
  },
  {
    id: 's1-lore-book', group: 's1', kind: 'Book', name: 'Lore and Scenario Book – Series 1',
    what: 'Background for each Series 1 Killer and Final Girl, strategy tips per Final Girl, and curated scenarios with special rules.',
    where: 'Retail. Also in the Series 1 Ultimate Box.',
    worth: 'Worth having: the scenarios give your Series 1 films fresh challenges.',
  },
  {
    id: 's1-gruesome', group: 's1', kind: 'Book', name: 'Gruesome Death Books – Series 1',
    what: 'Flavour passages describing every possible death at each Series 1 Location. No rules effect.',
    where: 'Printed: Series 1 Ultimate Box. Free PDFs on the Van Ryder Games resources page.',
    worth: 'Use the free PDFs instead.',
  },
  {
    id: 's1-mat', group: 's1', kind: 'Accessory', name: 'Game Mat – Series 1',
    what: 'Play mat with organised spaces for the board, cards and tracks.',
    where: 'Retail. Also in the Series 1 Ultimate Box.',
  },
  {
    id: 's1-minis', group: 's1', kind: 'Miniatures', name: 'Series 1 miniatures',
    what: 'Killer and Final Girl miniatures for the five Series 1 films. Sold as one pack per film, or together as Miniatures Box – Series 1.',
    where: 'Retail (per film or the box). Also in the Series 1 Ultimate Box.',
    worth: 'Cosmetic only.',
  },
  {
    id: 's1-alt-killers', group: 's1', kind: 'Miniatures', name: 'S1 Alt Killer Minis',
    what: 'Alternative sculpts of the Series 1 Killers.',
    where: 'Sold separately.',
    worth: 'Cosmetic only.',
  },
  {
    id: 's1-birds-minis', group: 's1', kind: 'Miniatures', name: 'Birds Miniatures Pack',
    what: 'Bird miniatures for the Terror From Above vignette.',
    where: 'Series 1 Ultimate Box (and the Series 1 campaign).',
    worth: 'Only if you get the vignette.',
  },
  {
    id: 's1-vehicles', group: 's1', kind: 'Miniatures', name: 'Vehicle Pack 1',
    what: 'Vehicle miniatures that stand in for the vehicle tokens in the Series 1 films.',
    where: 'Retail. Also in the Series 1 Ultimate Box.',
    worth: 'Cosmetic only.',
  },
  {
    id: 's1-storage', group: 's1', kind: 'Storage', name: 'Storage Box – Series 1 (with Cast and Crew Box)',
    what: 'Storage for the series’ accessories (not the Core Box or film boxes). The Cast and Crew Box inside stores Final Girl minis, cards and Secret Envelopes.',
    where: 'Sold separately; the Cast and Crew Box comes with it rather than on its own. Cast and Crew Box also in the Ultimate Box.',
    worth: 'Storage only.',
  },
  {
    id: 's1-mystery', group: 's1', kind: 'Exclusive', name: 'Series 1 Mystery Box',
    what: 'A mystery accessory. Contents have not been published by retailers.',
    where: 'Kickstarter only (Series 1 campaign); now second-hand or Kickstarter resellers. Not in the Ultimate Box.',
  },

  /* ---------------- Series 2 ---------------- */
  {
    id: 's2-ultimate', group: 's2', kind: 'Bundle', name: 'Series 2 Ultimate Box',
    what: 'Box of Props, all 5 Series 2 films, Terror From the Grave vignette, Cast and Crew Box, Bonus Features Box, two game mats, 22 Killer/Final Girl minis, 5 vehicle minis, 18 zombie minis, Lore Book, Gruesome Death Books, storage box.',
    where: 'Retail bundle. Does not include the Series 2 Mystery Box.',
    worth: 'Good value if you want Box of Props AND the vignette; you already have the films.',
  },
  ff('s2', 's2-into-the-void', 'Into the Void', 'The Evomorph', 'the USS Konrad', 'Ellen and Jenette', true),
  ff('s2', 's2-station-2891', 'Panic at Station 2891', 'The Organism', 'Station 2891', 'Kate and Uki', true),
  ff('s2', 's2-knock', 'A Knock at the Door', 'The Intruders', 'Wingard Cottage', 'Ginny and Ava', true),
  ff('s2', 's2-full-moon', 'Once Upon a Full Moon', 'The Big Bad Wolf', 'Storybook Woods', 'Red and Gretel', true),
  ff('s2', 's2-madness', 'Madness in the Dark', 'The Ratchet Lady', 'Wolfe Asylum', 'Heather and Veronica', true),
  {
    id: 's2-vignette-zombies', group: 's2', kind: 'Vignette', name: 'Terror From the Grave (Zombies)',
    what: 'Small-box Killer (the Zombies) you can play at any Location, plus Final Girl Patsy.',
    where: 'Series 2 Kickstarter and the Series 2 Ultimate Box. Not a regular standalone retail box.',
    worth: 'Worth having: another Killer for every Location you own.',
  },
  {
    id: 's2-box-of-props', group: 's2', kind: 'Expansion', name: 'Box of Props',
    what: 'Deluxe Horror, Time and Bloodlust trackers and Final Health tokens; the Desperation Die; Ultimate Dice; 10 Signature Action cards; promo Final Girls Layla, Agnes, Julia and Constance.',
    where: 'Retail (availability comes and goes). Also in the Series 2 Ultimate Box.',
    worth: 'The best gameplay add-on you’re missing: Signature Actions, Ultimate Dice and the Desperation Die work in every game.',
  },
  {
    id: 's2-bonus-features', group: 's2', kind: 'Accessory', name: 'S2 Bonus Features Box',
    what: 'The Feature Film Rulebook for all five Series 2 films plus their Achievement lists; storage for the Lore Book and Gruesome Death Books.',
    where: 'Retail. Also in the Series 2 Ultimate Box.',
    worth: 'Nice to have: the app already covers the rules and achievements.',
  },
  {
    id: 's2-lore-book', group: 's2', kind: 'Book', name: 'Lore and Scenario Book – Series 2',
    what: 'Background for each Series 2 Killer and Final Girl, strategy tips, and curated scenarios with special rules.',
    where: 'Retail. Also in the Series 2 Ultimate Box.',
    worth: 'Worth having: new scenarios for films you already own.',
  },
  {
    id: 's2-gruesome', group: 's2', kind: 'Book', name: 'Gruesome Death Books – Series 2',
    what: 'Flavour passages describing every possible death at each Series 2 Location. No rules effect.',
    where: 'Printed: Series 2 Ultimate Box. Free PDFs on the Van Ryder Games resources page.',
    worth: 'Use the free PDFs instead.',
  },
  {
    id: 's2-mat', group: 's2', kind: 'Accessory', name: 'Game Mat – Series 2 (two-mat bundle)',
    what: 'Two game mats with organised spaces for play.',
    where: 'Retail. Also in the Series 2 Ultimate Box.',
  },
  {
    id: 's2-minis', group: 's2', kind: 'Miniatures', name: 'Series 2 miniatures',
    what: 'Killer and Final Girl miniatures for the five Series 2 films. One pack per film, or together as Miniatures Box – Series 2.',
    where: 'Retail (per film or the box). Also in the Series 2 Ultimate Box.',
    worth: 'Cosmetic only.',
  },
  {
    id: 's2-zombie-minis', group: 's2', kind: 'Miniatures', name: 'Zombies Miniatures Pack',
    what: '18 zombie miniatures for the Terror From the Grave vignette.',
    where: 'Series 2 Ultimate Box (and the Series 2 campaign).',
    worth: 'Only if you get the vignette.',
  },
  {
    id: 's2-vehicles', group: 's2', kind: 'Miniatures', name: 'Vehicle Pack 2',
    what: '5 vehicle miniatures that stand in for the vehicle tokens in the Series 2 films.',
    where: 'Retail. Also in the Series 2 Ultimate Box.',
    worth: 'Cosmetic only.',
  },
  {
    id: 's2-storage', group: 's2', kind: 'Storage', name: 'Storage Box – Series 2 (with Cast and Crew Box)',
    what: 'Storage for the series’ accessories. The Cast and Crew Box stores Final Girl minis, Bird minis, Secret Envelopes and Final Girl cards.',
    where: 'Sold separately; the Cast and Crew Box comes with it. Both also in the Series 2 Ultimate Box.',
    worth: 'Storage only.',
  },
  {
    id: 's2-mystery', group: 's2', kind: 'Exclusive', name: 'Series 2 Mystery Box',
    what: 'Reported to contain the Otherworldly Mirror, two six-sided dice and a metal coin for randomly picking Killers and Locations.',
    where: 'Crowdfunding only (Series 2 campaign); now out of print, second-hand only. Not in the Ultimate Box.',
  },

  /* ---------------- Series 3 ---------------- */
  {
    id: 's3-ultimate', group: 's3', kind: 'Bundle', name: 'Series 3 Ultimate Box',
    what: 'All 5 Series 3 films, Vehicle Pack 3, Terror From Destiny vignette, Special FX Crate, Accessories Box, Guest Stars Box and minis, Miniatures Box, Lore Book, Bonus Features Box, Fated Victims minis, Cast and Crew Box, Gruesome Death Books.',
    where: 'Retail bundle. Does not include the Series 3 Mystery Box.',
    owned: true,
  },
  ff('s3', 's3-killer-tomorrow', 'The Killer from Tomorrow', 'The H.U.N.T.E.R.', 'Sunnydaze Mall', 'Tali and Kat', true),
  ff('s3', 's3-hell-to-pay', 'Hell to Pay', 'Razorface', 'the Hellscape', 'Christie and Kenzie', true),
  ff('s3', 's3-falconwood', 'The Falconwood Files', 'Slayer', 'Falconwood', 'Octavia and Janelle', true),
  ff('s3', 's3-marrek', 'The Marrek Murders', 'The Tormentor', 'Marrek Warehouse', 'Cassie and Mandy', true),
  ff('s3', 's3-dont-make-a-sound', "Don't Make a Sound", 'The Eyeless', 'Utopia', 'Meghan and Ronda', true),
  {
    id: 's3-vignette-destiny', group: 's3', kind: 'Vignette', name: 'Terror From Destiny',
    what: 'Small-box Killer (Destiny) you can play at any Location, plus Final Girl Gabrielle.',
    where: 'Series 3 Ultimate Box (and the Series 3 campaign).',
    owned: true,
  },
  {
    id: 's3-north-pole', group: 's3', kind: 'Special Feature', name: 'The North Pole Nightmare',
    what: 'Holiday Special Feature film: Krampus at Santa’s Village, with its own miniatures.',
    where: 'Retail (released December 2023). Van Ryder lists it with Series 3. Not in any Ultimate Box.',
    worth: 'Worth having: a full extra Killer and Location.',
  },
  {
    id: 's3-guest-stars', group: 's3', kind: 'Expansion', name: 'Guest Stars Box',
    what: 'Carolyn’s Revenge and Grandma’s Grudge character packs; Final Girls Agnes, Layla, Carolyn, Grandma, Jamie and Holiday Paula; 5 Signature Action cards; 5 Vehicle Action cards; proxy cards; 11 Secret Envelopes.',
    where: 'Retail. Also in the Series 3 Ultimate Box (as the Guest Stars Promos Box).',
    owned: true,
  },
  {
    id: 's3-guest-minis', group: 's3', kind: 'Miniatures', name: 'Guest Stars Miniatures',
    what: 'Miniatures for the Guest Stars Final Girls.',
    where: 'Retail. Also in the Series 3 Ultimate Box.',
    owned: true,
  },
  {
    id: 's3-special-fx', group: 's3', kind: 'Accessory', name: 'Special FX Crate',
    what: 'Minis and Secret Envelopes for Paula, Agnes and Layla; card, mini and envelope for Carolyn’s Revenge, Jamie and Grandma’s Grudge; S3 Gruesome Death Books.',
    where: 'Series 3 Ultimate Box (and the Series 3 campaign).',
    owned: true,
  },
  {
    id: 's3-accessories', group: 's3', kind: 'Accessory', name: 'S3 Accessories Box',
    what: 'Accessories from the Series 3 campaign. Contents aren’t itemised in retailer listings.',
    where: 'Sold separately. Also in the Series 3 Ultimate Box.',
    owned: true,
  },
  {
    id: 's3-bonus-features', group: 's3', kind: 'Accessory', name: 'S3 Bonus Features Box',
    what: 'The Series 3 Feature Film Rulebook and Achievement lists, plus 5 Epic Finale cards (one per Series 3 Killer).',
    where: 'Retail. Also in the Series 3 Ultimate Box.',
    owned: true,
  },
  {
    id: 's3-lore-book', group: 's3', kind: 'Book', name: 'Lore and Scenario Book – Series 3',
    what: 'Background, Final Girl tips and curated scenarios for Series 3.',
    where: 'Retail. Also in the Series 3 Ultimate Box.',
    owned: true,
  },
  {
    id: 's3-gruesome', group: 's3', kind: 'Book', name: 'Gruesome Death Books – Series 3',
    what: 'Flavour passages for every death at each Series 3 Location.',
    where: 'Series 3 Ultimate Box. Free PDFs on the Van Ryder Games resources page.',
    owned: true,
  },
  {
    id: 's3-minis', group: 's3', kind: 'Miniatures', name: 'Series 3 miniatures',
    what: 'Killer and Final Girl miniatures for the five Series 3 films (Miniatures Box – Series 3, or one pack per film).',
    where: 'Retail. Also in the Series 3 Ultimate Box.',
    owned: true,
  },
  {
    id: 's3-fated-victims', group: 's3', kind: 'Miniatures', name: 'Fated Victims Miniatures',
    what: 'Miniatures for the Terror From Destiny vignette.',
    where: 'Series 3 Ultimate Box; also sold separately.',
    owned: true,
  },
  {
    id: 's3-vehicles', group: 's3', kind: 'Miniatures', name: 'Vehicle Pack 3',
    what: 'Vehicle miniatures for the Series 3 films.',
    where: 'Retail. Also in the Series 3 Ultimate Box.',
    owned: true,
  },
  {
    id: 's3-cast-crew', group: 's3', kind: 'Storage', name: 'S3 Cast and Crew Box',
    what: 'Storage for Series 3 Final Girl minis, cards and Secret Envelopes.',
    where: 'Series 3 Ultimate Box (or with the Series 3 storage box).',
    owned: true,
  },
  {
    id: 's3-mystery', group: 's3', kind: 'Exclusive', name: 'Series 3 Mystery Box',
    what: 'A mystery accessory. Contents not listed by retailers.',
    where: 'Kickstarter only (Series 3 campaign). Not in the Ultimate Box.',
  },

  /* ---------------- Series 4 ---------------- */
  {
    id: 's4-ultimate', group: 's4', kind: 'Bundle', name: 'Series 4 Ultimate Box',
    what: 'All 5 Series 4 films, Mausoleum Box, Cast and Crew Box, Bonus Features Box, miniatures, Lore Book, Gruesome Death Books, Terror From Beyond vignette.',
    where: 'Retail bundle. Does not include the Jen or Iris promo packs or the Mystery Accessory Box.',
    owned: true,
  },
  ff('s4', 's4-buddyland', 'Bad Times at Buddyland', 'Billy', 'Buddyland', 'Rena and Gwynn', true),
  ff('s4', 's4-rotten-harvest', 'A Rotten Harvest', 'Grimlash', 'Shady Acres', 'Vicky and Joy', true),
  ff('s4', 's4-demon', 'A Demon in the Shadows', 'Berith', "L'Armes Abbey", 'Rita and Lindi', true),
  ff('s4', 's4-green-terror', 'The Green Terror', "The Volk'ar", 'Pesadilla Verde', 'Dakota and Alois', true),
  ff('s4', 's4-raptor-games', 'The Raptor Games', 'The Raptors', 'Isla Lagarto', 'Maud and Christina', true),
  {
    id: 's4-vignette-beyond', group: 's4', kind: 'Vignette', name: 'Terror From Beyond',
    what: 'Small-box Killer you can play at any Location.',
    where: 'Series 4 Ultimate Box (and the Series 4 campaign).',
    owned: true,
  },
  {
    id: 's4-shriek', group: 's4', kind: 'Special Feature', name: 'Shriek',
    what: 'Special Feature film: Mort the Teenage Dirtbag at the Mega Boardgame Convention, with its own miniatures.',
    where: 'Convention release (GenCon 2025), now in retail. Van Ryder lists it with Series 4. Not in the Ultimate Box.',
    worth: 'Worth having: a full extra Killer and Location.',
  },
  {
    id: 's4-mausoleum', group: 's4', kind: 'Expansion', name: 'Mausoleum Box',
    what: '71 special Victim meeples (every series plus Special Features); Final Girls Julia and Constance; 5 Signature Action and 7 Vehicle Action cards; Elizabeth’s Rebellion and Ursula’s Faith character packs with minis; 7 proxy Event cards; Evan and AJ meeples.',
    where: 'Retail. Also in the Series 4 Ultimate Box.',
    owned: true,
  },
  {
    id: 's4-bonus-features', group: 's4', kind: 'Accessory', name: 'S4 Bonus Features Box',
    what: 'The Series 4 Feature Film Rulebook and Achievement lists.',
    where: 'Series 4 Ultimate Box.',
    owned: true,
  },
  {
    id: 's4-lore-book', group: 's4', kind: 'Book', name: 'Lore and Scenario Book – Series 4',
    what: 'Background, Final Girl tips and curated scenarios for Series 4.',
    where: 'Series 4 Ultimate Box.',
    owned: true,
  },
  {
    id: 's4-gruesome', group: 's4', kind: 'Book', name: 'Gruesome Death Books – Series 4',
    what: 'Flavour passages for every death at each Series 4 Location.',
    where: 'Series 4 Ultimate Box. Free PDFs on the Van Ryder Games resources page.',
    owned: true,
  },
  {
    id: 's4-minis', group: 's4', kind: 'Miniatures', name: 'Series 4 miniatures',
    what: 'Killer and Final Girl miniatures for the five Series 4 films (one box per film).',
    where: 'Retail per film. Also in the Series 4 Ultimate Box.',
    owned: true,
  },
  {
    id: 's4-cast-crew', group: 's4', kind: 'Storage', name: 'S4 Cast and Crew Box',
    what: 'Storage for Series 4 Final Girl minis, cards and Secret Envelopes.',
    where: 'Series 4 Ultimate Box.',
    owned: true,
  },
  {
    id: 's4-mystery', group: 's4', kind: 'Exclusive', name: 'Series 4 Mystery Accessory Box',
    what: 'A mystery accessory. Contents not published.',
    where: 'Kickstarter exclusive (Series 4 campaign); some Kickstarter resellers. Not in the Ultimate Box.',
  },

  /* ---------------- Promo Final Girls & character packs ---------------- */
  {
    id: 'promo-paula', group: 'promo', kind: 'Promo', name: 'Paula',
    what: 'Promo Final Girl card (5 Health).',
    where: 'Van Ryder Games shop and some retailers; also in the Series 1 Ultimate Box.',
    worth: 'Cheap and you already have her holiday version.',
  },
  {
    id: 'promo-holiday-paula', group: 'promo', kind: 'Promo', name: 'Holiday Paula',
    what: 'Alternative-art version of Paula.',
    where: 'Only in the Guest Stars Box.',
    owned: true,
  },
  {
    id: 'promo-agnes', group: 'promo', kind: 'Promo', name: 'Agnes',
    what: 'Final Girl (4 Health) whose Ultimate uses the Ultimate Dice.',
    where: 'Box of Props; reprinted in the Guest Stars Box.',
    owned: true,
  },
  {
    id: 'promo-layla', group: 'promo', kind: 'Promo', name: 'Layla',
    what: 'Final Girl (5 Health) whose Ultimate uses the Signature Action cards.',
    where: 'Box of Props; reprinted in the Guest Stars Box.',
    owned: true,
  },
  {
    id: 'promo-julia', group: 'promo', kind: 'Promo', name: 'Julia',
    what: 'Final Girl (6 Health), a guest from Van Ryder’s The Dark Quarter.',
    where: 'Box of Props; also in the Mausoleum Box.',
    owned: true,
  },
  {
    id: 'promo-constance', group: 'promo', kind: 'Promo', name: 'Constance',
    what: 'Final Girl (5 Health), a guest from Van Ryder’s The Dark Quarter.',
    where: 'Box of Props; also in the Mausoleum Box.',
    owned: true,
  },
  {
    id: 'pack-carolyn', group: 'promo', kind: 'Character pack', name: "Carolyn's Revenge",
    what: 'Teenage Carolyn hunts the Poltergeist, but works against any Killer: psychic Action cards and an alternate win by banishing the Killer.',
    where: 'Only in the Guest Stars Box.',
    owned: true,
  },
  {
    id: 'pack-grandma', group: 'promo', kind: 'Character pack', name: "Grandma's Grudge",
    what: 'Red’s Grandma takes on the Big Bad Wolf.',
    where: 'Only in the Guest Stars Box.',
    owned: true,
  },
  {
    id: 'promo-jamie', group: 'promo', kind: 'Promo', name: 'Jamie',
    what: 'Final Girl (5 Health) based on Jamie Foster the Meeple.',
    where: 'Guest Stars Box.',
    owned: true,
  },
  {
    id: 'pack-elizabeth', group: 'promo', kind: 'Character pack', name: "Elizabeth's Rebellion",
    what: 'Character pack with an Elizabeth miniature.',
    where: 'Only in the Mausoleum Box.',
    owned: true,
  },
  {
    id: 'pack-ursula', group: 'promo', kind: 'Character pack', name: "Ursula's Faith",
    what: 'Character pack with an Ursula miniature.',
    where: 'Only in the Mausoleum Box.',
    owned: true,
  },
  {
    id: 'promo-julie', group: 'promo', kind: 'Promo pack', name: 'Julie (with Mazzy the cat)',
    what: 'Premium promo pack: Final Girl card, Julie and Mazzy miniature, Secret Envelope. Julie Ahern designed Once Upon a Full Moon.',
    where: 'Released at GenCon 2025; retail but often sold out.',
    worth: 'Worth it if you want another Final Girl option for every Killer.',
  },
  {
    id: 'promo-meg', group: 'promo', kind: 'Promo pack', name: 'Meg (with Mipha the dog)',
    what: 'Premium promo pack: Final Girl card, Meg and Mipha miniature, Secret Envelope. Meg is YouTube’s Professor Meg.',
    where: 'Released at GenCon 2025; retail but often sold out.',
    worth: 'Worth it if you want another Final Girl option for every Killer.',
  },
  {
    id: 'promo-jen', group: 'promo', kind: 'Promo pack', name: 'Jen',
    what: 'Promo pack: foil Final Girl card, miniature, Secret Envelope. Works with any Killer and Location.',
    where: 'Series 4 Kickstarter add-on; sold separately by some stores. Not in the Series 4 Ultimate Box.',
    worth: 'The easiest Series 4 piece you’re missing.',
  },
  {
    id: 'promo-iris', group: 'promo', kind: 'Promo pack', name: 'Iris',
    what: 'Promo pack: Final Girl card, miniature, Secret Envelope.',
    where: 'Series 4 Kickstarter add-on; sold separately by some stores. Not in the Series 4 Ultimate Box.',
    worth: 'The other Series 4 Final Girl you’re missing.',
  },

  /* ---------------- Third-party ---------------- */
  {
    id: 'tp-redesign-insert', group: 'thirdparty', kind: 'Third-party', name: 'ReDesign Insert box inserts',
    what: 'Organiser inserts for the Core Box and Feature Film boxes.',
    where: 'ReDesign Insert online shop.',
  },
  {
    id: 'tp-sleeves', group: 'thirdparty', kind: 'Third-party', name: 'Sleeve Kings card sleeve bundles',
    what: 'Pre-counted sleeve bundles for the Core Box and each series’ films.',
    where: 'Sleeve Kings and ReDesign Insert.',
  },
];
