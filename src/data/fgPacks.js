/* --------------------------------------------------------------------------
   Final Girls who come with their own Character Pack (extra cards + rules).
   Setup steps are paraphrased from the pack's printed rule sheet (Chris's
   photos, Nov 2026). `onlyAt` limits a step to one Location; `itemDeck`
   marks a step that changes how the Item decks are built.
     items   pack Item cards: added to the Item lists (capture dropdowns)
             only while she is the Final Girl
     events  pack Event cards (same, `onlyAt` a Location if set)
     phases  Turn Tracker reminders per phase id, shown while she's in play
             (`onlyAt` a Location / `onlyKiller` a Killer if set)
     noWeapons  true = weapon Items are left out of her Item lists
   Kept in its own file so both games.js and cardData.js can use it.
   NEVER name a Secret Envelope item here.
   -------------------------------------------------------------------------- */
export const FG_PACKS = {
  elisabeth: {
    name: "Elisabeth's Rebellion",
    box: 'Corpses Box (inside the Mausoleum)',
    rulesKnown: true,
    setup: [
      {
        title: "Get out Elisabeth's Rebellion",
        body: 'From the Corpses Box (inside the Mausoleum): her Final Girl card, the Moxie card, 6 Cheerleader Item cards, 11 Elisabeth Action cards and \u201cThe Savior\u2019s Ex\u201d Event card. Keep her rule sheet handy.',
      },
      {
        title: 'Swap in her zero-cost Action cards',
        body: 'Replace all six Zero Cost Action cards with hers: Strut \u00d72, Pep Talk \u00d72, Self-Care and Gnarly Burn.',
      },
      {
        title: 'Change the Action Tableau',
        body: 'Replace both Search cards with the two Window Shop cards, replace both Sprint cards with the two Swagger cards, and add the Pump it Up! card.',
      },
      {
        title: 'Moxie track',
        body: 'Put the Moxie card beside your play area with a Tracking marker on the \u20182\u2019 space.',
      },
      {
        title: 'Start with a Cheerleader Item',
        body: 'Put one Cheerleader Item card, chosen at random, into your Backpack. Easier game: choose which one, or start with two.',
      },
      {
        title: 'Cheerleader Items on the Item decks',
        itemDeck: true,
        body: 'Build the Item decks as normal. Then shuffle the remaining Cheerleader Items and put one faceup on top of each Item deck, so every deck has one extra card and its top two cards are faceup.',
      },
      {
        title: 'Sunnydaze Mall: The Savior\u2019s Ex',
        onlyAt: 'sunnydaze-mall',
        body: 'Replace \u201cThe Savior\u2019s Girl\u201d Event card with \u201cThe Savior\u2019s Ex\u201d, and start the Savior\u2019s Trust at \u201cI Guess You\u2019re Ok\u201d.',
      },
    ],
    items: [
      { id: 'cheer-dummys-guide', name: "Dummy's Guide to Cheering", effect: 'Victims can be saved whenever they are at an Exit space, even if you are not with them.', flavour: 'Everything from high-v\u2019s to round-offs!' },
      { id: 'cheer-spunky-kicks', name: 'Spunky Kicks', effect: 'When moving, you may move an additional space.', flavour: null },
      { id: 'cheer-pom-poms', name: 'Pom Poms', effect: 'Hold in one hand or two (your choice). During the Upkeep phase: held in one hand +1 Moxie; held in two hands +2 Moxie.', flavour: 'Shake \u2019em like they\u2019re hot!' },
      { id: 'cheer-tiara', name: 'Homecoming Queen Tiara', effect: 'All Moxie costs are reduced by 1.', flavour: 'You like me, you really like me!' },
      { id: 'cheer-bag', name: 'Cheer Bag', effect: 'You can rearrange Items at any time.', flavour: 'I wouldn\u2019t stick my nose in there if I was you.' },
      { id: 'cheer-megaphone', name: 'Megaphone', effect: '1 hand. When spending Moxie to move Victims, Allies or Enemies, you may move them from anywhere on the board.', flavour: 'When I say JUMP, you say HOW HIGH?' },
    ],
    events: [
      { id: 'saviors-ex', name: "The Savior's Ex", onlyAt: 'sunnydaze-mall', effect: 'The Victim closest to you is now the Savior\u2019s Ex. She will not follow you and cannot be moved using Moxie. During Upkeep, before resolving a Trust card, move her 1 space closer to the Savior; if she is in the Savior\u2019s space, reduce Trust by 1. If the Savior\u2019s Ex leaves play, discard this card.' },
    ],
    moxie: [
      { cost: 2, text: 'Move a normal Victim 1 space' },
      { cost: 2, text: 'Move an Enemy 1 space towards you' },
      { cost: 3, text: 'Move any Victim or an Ally 1 space' },
      { cost: 4, text: 'Move an Enemy 1 space' },
      { cost: 4, text: 'Take the top Item in your space' },
    ],
    phases: {
      action: [
        {
          title: 'Spend Moxie (target must be in your space or adjacent; Megaphone: anywhere; Tiara: each costs 1 less)',
          options: ['2: Move a normal Victim 1 space', '2: Move an Enemy 1 space towards you', '3: Move any Victim or an Ally 1 space', '4: Move an Enemy 1 space', '4: Take the top Item in your space'],
        },
        'Moving into a Search space with a Cheerleader Item faceup? Put it straight into your Backpack.',
        'Resolving the pink hand-sign icon raises Moxie by 1 (maximum 10).',
      ],
      upkeep: [
        'Pom Poms (if you have them): +1 Moxie held in one hand, +2 held in two.',
        { text: 'The Savior\u2019s Ex (if out): before the Trust card, move her 1 space closer to the Savior; in his space, Trust \u22121.', onlyAt: 'sunnydaze-mall' },
      ],
    },
  },
  ursula: {
    name: "Ursula's Faith",
    box: 'Corpses Box (inside the Mausoleum)',
    rulesKnown: true,
    // She can't take or use weapons, so weapon Items drop out of her Item lists.
    noWeapons: true,
    setup: [
      {
        title: "Get out Ursula's Faith",
        body: 'From the Corpses Box (inside the Mausoleum): her Final Girl card, 3 Ursula Item cards (Holy Book, Holy Cross, Holy Rosary), 2 Prayer Action cards (Quick Prayer, Solemn Prayer), the Prayer Points Tracker card and 6 Divine Action cards. Keep her rule sheet handy.',
      },
      {
        title: 'Remove the damage Action cards',
        body: 'Take Weak Attack, Furious Strike, Critical Blow and Retaliate out of the game. She can\u2019t use Action cards that deal damage.',
      },
      {
        title: 'Add her Prayer and Divine Action cards',
        body: 'Put the zero-cost Quick Prayer card in your hand. Add Solemn Prayer and all 6 Divine Action cards to the Action Tableau.',
      },
      {
        title: 'Prayer Points Tracker',
        body: 'Put the Prayer Points Tracker card near the play area with a Tracking marker on 0.',
      },
      {
        title: 'Start with a Holy Item',
        itemDeck: true,
        body: 'Take one of Holy Book, Holy Cross or Holy Rosary (choose, or draw at random). Optional: shuffle the two unused ones into the Location\u2019s Items before building the Item decks.',
      },
      {
        title: 'Against Berith: no Final Girl meeple',
        onlyKiller: 'berith',
        body: 'Don\u2019t place a Final Girl meeple or miniature. The Killer meeple is BOTH Ursula (you) and Berith (possessed Ursula) for this match-up.',
      },
    ],
    items: [
      { id: 'ursula-holy-book', name: 'Holy Book', effect: '1 hand, 3 uses. Roll +1 die when resolving Quick Prayer or Solemn Prayer.', flavour: 'The word of God.' },
      { id: 'ursula-holy-rosary', name: 'Holy Rosary', effect: '1 hand. All Divine Action card costs are reduced by 1.', flavour: 'A prayer for each bead.' },
      { id: 'ursula-holy-cross', name: 'Holy Cross', effect: '1 hand. When resolving an effect with two or more Increase Horror icons, treat it as only one.', flavour: 'He died for all of our sins.' },
    ],
    phases: {
      planning: [
        'Divine Action cards are bought with Prayer Points here (Holy Rosary: each costs 1 less). Unspent Prayer Points carry over.',
      ],
      action: [
        'No damage Action cards and no weapons: Holy Smite (a Divine Action card) is your only way to damage Enemies.',
        'Search drew a weapon? Remove it from the game and draw again. If the deck runs out, take 1 Prayer Point per card removed.',
        'Something that isn\u2019t an Enemy needs damage (a trap, a door)? Pay 2 Prayer Points per damage, or use Holy Smite.',
        'Saving Victims gives Prayer Points in order: 1, 2, 2, 3, 3 (Ultimate after the fifth). Extra saves: +2 each.',
        { text: 'Against Berith: you move the Killer meeple (you share Berith\u2019s body). Victims still follow you, and with Holy Smite you can hit Berith every turn.', onlyKiller: 'berith' },
      ],
      killer: [
        { text: 'Against Berith: \u201cVictim or Final Girl\u201d targets count as Victim until no Victims are left or the Finale is out. Berith only attacks you if the attack targets the Final Girl, there are no Victims on the board, or the Finale is out and no Victim is in your space.', onlyKiller: 'berith' },
        { text: 'Against Berith: \u201cUrsula\u201d on Terror, Dark Power and Finale cards means Berith, not you. Effects that hit everyone in the space hurt you both.', onlyKiller: 'berith' },
      ],
      panic: [
        { text: 'Against Berith: your space counts as the Killer\u2019s space for panic.', onlyKiller: 'berith' },
      ],
      upkeep: [
        'Ultimate (once unlocked): return a removed Divine Action card to the Action Tableau; if you do, gain 3 Prayer Points.',
      ],
    },
  },
};

/** Her Character Pack (or null). */
export function getFinalGirlPack(girl) {
  return (girl && FG_PACKS[girl.id]) || null;
}

/** Does a pack step/reminder apply to this Killer + Location? */
export function packApplies(x, killer, location) {
  if (x.onlyAt && (!location || x.onlyAt !== location.id)) return false;
  if (x.onlyKiller && (!killer || x.onlyKiller !== killer.id)) return false;
  return true;
}

/** Setup steps from her Character Pack, filtered to this Killer and Location. */
export function getFinalGirlPackSetup(girl, location, killer) {
  const pack = getFinalGirlPack(girl);
  if (!pack) return [];
  return pack.setup.filter((st) => packApplies(st, killer, location));
}

/** True if she can't take or use weapons (weapon Items hidden). */
export function packForbidsWeapons(girlId) {
  return Boolean(FG_PACKS[girlId] && FG_PACKS[girlId].noWeapons);
}

/** Her pack's Item cards (or []). */
export function getFinalGirlPackItems(girlId) {
  return (FG_PACKS[girlId] && FG_PACKS[girlId].items) || [];
}

/** Her pack's Event cards for this Location (or []). */
export function getFinalGirlPackEvents(girlId, locationId) {
  const ev = (FG_PACKS[girlId] && FG_PACKS[girlId].events) || [];
  return ev.filter((e) => !e.onlyAt || e.onlyAt === locationId);
}
