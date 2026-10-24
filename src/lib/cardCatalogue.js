/* ==========================================================================
   Card catalogue — every known card in src/data/cards.json, arranged for the
   Codex "All cards" list, with each card's data gaps spelled out.

   Covers EVERY killer / location / final girl in the dataset (including ones
   the rest of the app doesn't ship yet, e.g. Series 4 and the specials).

   Card images (optional, added over time):
     Drop a picture into  src/assets/cards/  named after the card's id, e.g.
       src/assets/cards/hans_the_butcher_death_blow.png
     If the same card id appears in more than one box and the printings
     differ, prefix the owner id with a double underscore to target one:
       src/assets/cards/camp_happy_trails__aluminum_bat.png
     png / jpg / jpeg / webp all work. The list picks them up on the next build.
   ========================================================================== */

import cards from '../data/cards.json';

const cardImages = import.meta.glob('../assets/cards/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
});
const imageByBase = {};
for (const [path, url] of Object.entries(cardImages)) {
  const base = path.split('/').pop().replace(/\.[^.]+$/, '').toLowerCase();
  imageByBase[base] = url;
}

export const CARD_IMAGE_FOLDER = 'src/assets/cards/';
export const cardImageCount = Object.keys(imageByBase).length;

export function cardImageFor(ownerId, cardId) {
  if (!cardId) return null;
  return imageByBase[`${ownerId}__${cardId}`.toLowerCase()] || imageByBase[String(cardId).toLowerCase()] || null;
}

/* Which list fields hold cards, in display order, per kind. */
const KILLER_GROUPS = [
  ['finales', 'Finales'],
  ['dark_powers', 'Dark Powers'],
  ['minor_dark_powers', 'Minor Dark Powers'],
  ['killer_items', 'Killer items'],
  ['terror_cards', 'Terror cards'],
];
const LOCATION_GROUPS = [
  ['setup_cards', 'Setup cards'],
  ['events', 'Events'],
  ['items', 'Items'],
  ['minor_dark_powers', 'Minor Dark Powers'],
  ['terror_cards', 'Terror cards'],
];
const DECK_LABELS = {
  mission: 'Missions',
  friend: 'Friends',
  savior_card: 'Savior cards',
  side_effect: 'Side effects',
  amped_card: 'Amped cards',
  harvest_madness: 'Harvest Madness',
  ancient_curse: 'Ancient Curses',
  action_card: 'Special Action cards',
  crafted_item: 'Crafted items',
  supply_item: 'Supply items',
  item_trap: 'Item traps',
  terror_trap: 'Terror traps',
  mission_item: 'Mission items',
  affliction: 'Afflictions',
  victim_death_trap: 'Victim death traps',
};

export const SERIES_ORDER = ['S1', 'S2', 'S3', 'S4', 'SPECIAL'];
export const SERIES_LABEL = { S1: 'Series 1', S2: 'Series 2', S3: 'Series 3', S4: 'Series 4', SPECIAL: 'Special features & promos' };

/* What's missing about one card. Returns { status, note }:
     ok          rules text transcribed from the card (via the wiki)
     paraphrase  wording paraphrased from a review — check against the card
     diagram     setup card: it's a placement diagram, so no rules text exists
     no-text     the card exists but its rules text isn't recorded anywhere yet */
function cardStatus(card, groupKey) {
  if (card.effect && card.effect_source === 'review_paraphrase') {
    return { status: 'paraphrase', note: 'Wording paraphrased from a review — check it against the card.' };
  }
  if (card.effect) return { status: 'ok', note: null };
  if (groupKey === 'setup_cards') {
    return { status: 'diagram', note: 'Name only — setup cards are placement diagrams (an image would capture it).' };
  }
  return { status: 'no-text', note: 'Rules text not recorded yet.' };
}

export const STATUS_META = {
  ok: { label: 'Complete', short: 'OK' },
  paraphrase: { label: 'Paraphrased', short: 'Check' },
  diagram: { label: 'Name only (diagram)', short: 'Diagram' },
  'no-text': { label: 'Rules text missing', short: 'Missing' },
};

const boxesById = Object.fromEntries((cards.boxes || []).map((b) => [b.id, b]));
const KNOWN_GAPS = cards.known_gaps || [];

function gapsFor(name) {
  const n = String(name).toLowerCase().replace(/^the\s+/, '');
  return KNOWN_GAPS.filter((g) => g.toLowerCase().includes(n));
}

function slimCard(card, ownerId, groupKey) {
  const { status, note } = cardStatus(card, groupKey);
  return {
    id: card.id || null,
    name: card.name || '(unnamed card)',
    qty: card.qty ?? null,
    effect: card.effect || null,
    epic: Boolean(card.epic),
    minorDarkPower: Boolean(card.is_minor_dark_power),
    bonusHealth: card.bonus_health ?? null,
    tags: card.tags || null,
    range: card.range ?? null,
    damage: card.damage ?? null,
    hands: card.hands ?? null,
    uses: card.uses ?? null,
    recipe: card.recipe ?? null,
    variant: card.variant ?? null,
    sourceUrl: card.source_url || null,
    status: card.id ? status : 'no-text',
    note: card.id ? note : 'Card has no id in the data — needs tidying.',
    image: cardImageFor(ownerId, card.id),
    imageFile: card.id ? `${card.id}.png` : null,
  };
}

function ownerGroups(record, spec) {
  const groups = [];
  for (const [key, label] of spec) {
    const list = record[key];
    if (!Array.isArray(list) || list.length === 0) continue;
    groups.push({ key, label, cards: list.map((c) => slimCard(c, record.id, key)) });
  }
  // Box-specific decks, split by deck type.
  if (Array.isArray(record.special_cards) && record.special_cards.length) {
    const byDeck = {};
    for (const c of record.special_cards) (byDeck[c.deck || 'other'] ||= []).push(c);
    for (const [deck, list] of Object.entries(byDeck)) {
      groups.push({
        key: 'special:' + deck,
        label: DECK_LABELS[deck] || 'Special cards',
        cards: list.map((c) => slimCard(c, record.id, 'special')),
      });
    }
  }
  return groups;
}

function buildOwner(kind, record, spec) {
  const groups = ownerGroups(record, spec);
  const all = groups.flatMap((g) => g.cards);
  const gaps = {
    noText: all.filter((c) => c.status === 'no-text').length,
    paraphrase: all.filter((c) => c.status === 'paraphrase').length,
    diagram: all.filter((c) => c.status === 'diagram').length,
  };
  const box = boxesById[record.box_id];
  return {
    kind,
    id: record.id,
    name: record.name,
    series: record.series || 'SPECIAL',
    box: box ? box.title : null,
    dataStatus: record.data_status || 'complete',
    notes: record.notes || null,
    knownGaps: gapsFor(record.name),
    stats:
      kind === 'killer'
        ? { health: record.start_health ?? null, horror: record.start_horror ?? null }
        : null,
    groups,
    cardCount: all.length,
    gaps,
    imageCount: all.filter((c) => c.image).length,
  };
}

function buildFinalGirl(g) {
  const box = boxesById[g.box_id];
  const missing = [];
  if (!g.ultimate_ability) missing.push('Ultimate ability');
  if (g.health == null) missing.push('Health');
  if (g.victims_for_ultimate == null) missing.push('Victims needed for Ultimate');
  if (!g.save_rewards_text) missing.push('Save rewards');
  return {
    kind: 'finalgirl',
    id: g.id,
    name: g.name,
    // Promos / props packs have no box; take the series from their source text.
    series: (box && box.series) || (/series\s*([1-4])/i.exec(g.other_source || '') ? 'S' + /series\s*([1-4])/i.exec(g.other_source)[1] : 'SPECIAL'),
    box: box ? box.title : g.other_source || null,
    dataStatus: g.data_status || (missing.length ? 'partial' : 'complete'),
    health: g.health ?? null,
    victimsForUltimate: g.victims_for_ultimate ?? null,
    ultimate: g.ultimate_ability || null,
    unlockable: g.unlockable_item || null,
    saveRewards: g.save_rewards_text || null,
    missing,
    sourceUrl: g.source_url || null,
    image: cardImageFor('finalgirl', g.id),
    imageFile: `${g.id}.png`,
  };
}

let cache = null;
export function getCatalogue() {
  if (cache) return cache;
  const killers = (cards.killers || []).map((k) => buildOwner('killer', k, KILLER_GROUPS));
  const locations = (cards.locations || []).map((l) => buildOwner('location', l, LOCATION_GROUPS));
  const finalGirls = (cards.final_girls || []).map(buildFinalGirl);
  const allCards = [...killers, ...locations].flatMap((o) => o.groups.flatMap((g) => g.cards));
  cache = {
    killers,
    locations,
    finalGirls,
    knownGaps: KNOWN_GAPS,
    totals: {
      cards: allCards.length,
      ok: allCards.filter((c) => c.status === 'ok').length,
      paraphrase: allCards.filter((c) => c.status === 'paraphrase').length,
      noText: allCards.filter((c) => c.status === 'no-text').length,
      diagram: allCards.filter((c) => c.status === 'diagram').length,
      images: allCards.filter((c) => c.image).length + finalGirls.filter((g) => g.image).length,
      finalGirls: finalGirls.length,
      finalGirlsMissing: finalGirls.filter((g) => g.missing.length).length,
    },
  };
  return cache;
}
