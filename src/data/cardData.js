/* ==========================================================================
   Card database bridge.

   Loads the bundled card dataset (src/data/cards.json, transcribed from the
   community Final Girl wiki) and exposes lookups keyed by the APP's killer /
   location ids. The card file uses its own slug ids, so we map app id ->
   card-file id explicitly (the slugs are irregular, e.g. the-birds -> birds).

   Each accessor returns a list of { id, name, effect } (effect may be null if
   the source didn't transcribe it). The capture UI uses these for dropdowns,
   falling back to free text for anything not in the data.
   ========================================================================== */

import cards from './cards.json';

// App killer id -> card-file killer id. Only the killers the app ships.
const KILLER_ID_MAP = {
  hans: 'hans_the_butcher',
  poltergeist: 'poltergeist',
  inkanyamba: 'inkanyamba',
  geppetto: 'geppetto',
  'dr-fright': 'dr_fright',
  'the-birds': 'birds',
  evomorph: 'evomorph',
  organism: 'the_organism',
  intruders: 'the_intruders',
  'big-bad-wolf': 'big_bad_wolf',
  'ratchet-lady': 'ratchet_lady',
  'patsy-zombies': 'zombies',
  hunter: 'the_h_u_n_t_e_r',
  razorface: 'razorface',
  slayer: 'slayer',
  tormentor: 'the_tormentor',
  eyeless: 'the_eyeless',
  destiny: 'destiny',
};

// App location id -> card-file location id.
const LOCATION_ID_MAP = {
  'camp-happy-trails': 'camp_happy_trails',
  'creech-manor': 'creech_manor',
  'sacred-groves': 'sacred_groves',
  'carnival-of-blood': 'carnival_of_blood',
  'maple-lane': 'maple_lane',
  'uss-konrad': 'uss_konrad',
  'station-2891': 'station_2891',
  'wingard-cottage': 'wingard_cottage',
  'storybook-woods': 'storybook_woods',
  'wolfe-asylum': 'wolfe_asylum',
  'sunnydaze-mall': 'sunnydaze_mall',
  hellscape: 'hellscape',
  falconwood: 'falconwood',
  'marrek-warehouse': 'marrek_warehouse',
  utopia: 'utopia',
};

// Index the card-file collections by their own id for O(1) lookup.
const killersById = Object.fromEntries((cards.killers || []).map((k) => [k.id, k]));
const locationsById = Object.fromEntries((cards.locations || []).map((l) => [l.id, l]));
const globalItems = cards.items || [];

// Final girls: the app's ids differ from the card file's, but names match, so
// index by lowercased name for a reliable lookup.
const finalGirlsByName = Object.fromEntries(
  (cards.final_girls || []).map((g) => [String(g.name).toLowerCase(), g])
);

function killerRecord(appKillerId) {
  const cardId = KILLER_ID_MAP[appKillerId];
  return cardId ? killersById[cardId] : null;
}
function locationRecord(appLocationId) {
  const cardId = LOCATION_ID_MAP[appLocationId];
  return cardId ? locationsById[cardId] : null;
}

// Normalise a raw card record down to the fields the UI + narrator need.
function slim(card) {
  if (!card) return null;
  return {
    id: card.id,
    name: card.name,
    effect: card.effect ?? null,
    // Atmospheric one-liner (unofficial, from the dataset) — used to embellish
    // the game story and, optionally, card detail.
    flavour: card.flavour_unofficial ?? null,
    epic: card.epic ?? undefined,
    // Extra detail for item cards (null for non-items).
    tags: card.tags ?? undefined,
    range: card.range ?? undefined,
    damage: card.damage ?? undefined,
    hands: card.hands ?? undefined,
  };
}
function slimList(arr) {
  return (arr || []).map(slim).filter(Boolean);
}

/* --- Killer-linked cards --- */
export function getFinales(appKillerId) {
  return slimList(killerRecord(appKillerId)?.finales);
}
export function getDarkPowers(appKillerId) {
  return slimList(killerRecord(appKillerId)?.dark_powers);
}
export function getMinorDarkPowers(appKillerId, appLocationId) {
  // Minor Dark Powers can come from the killer and (occasionally) the location.
  const fromKiller = killerRecord(appKillerId)?.minor_dark_powers || [];
  const fromLocation = locationRecord(appLocationId)?.minor_dark_powers || [];
  return slimList([...fromKiller, ...fromLocation]);
}
export function getKillerItems(appKillerId) {
  return slimList(killerRecord(appKillerId)?.killer_items);
}

/* --- Location-linked cards --- */
export function getEvents(appLocationId) {
  return slimList(locationRecord(appLocationId)?.events);
}
export function getSetupCards(appLocationId) {
  return slimList(locationRecord(appLocationId)?.setup_cards);
}

/* Items: the location's own item list if present, else the shared global
   pool. Item cards are the main "found/used item" vocabulary. */
export function getItems(appLocationId) {
  const loc = locationRecord(appLocationId);
  const list = loc?.items && loc.items.length ? loc.items : globalItems;
  return slimList(list);
}

/* A combined options list for a given capture type, given the current combo.
   Returns [{ id, name, effect }]. Empty array = we have no known cards, so
   the UI should just show the free-text field. */
export function cardOptionsFor(type, { killerId, locationId } = {}) {
  switch (type) {
    case 'item-found':
    case 'item-used':
      return getItems(locationId);
    case 'dark-power':
      // Offer Epic/standard Dark Powers plus Minor Dark Powers together.
      return [...getDarkPowers(killerId), ...getMinorDarkPowers(killerId, locationId)];
    case 'finale':
      return getFinales(killerId);
    case 'event':
    case 'event-start':
      return getEvents(locationId);
    case 'setup':
      return getSetupCards(locationId);
    case 'weapon':
      // Weapons are a subset of items tagged as weapons; fall back to all items.
      return getItems(locationId);
    default:
      return [];
  }
}

/* Look up a single card's effect text by name within a type+combo (used to
   show "what it does" when a known card is picked). */
export function effectForName(type, name, combo) {
  if (!name) return null;
  const opts = cardOptionsFor(type, combo || {});
  const hit = opts.find((o) => o.name.toLowerCase() === String(name).toLowerCase());
  return hit ? hit.effect : null;
}

/* Find a known card (any of a type's options) by name — returns the full slim
   record { id, name, effect, flavour, ... } or null. Used by the narrator to
   pull flavour/effect for a card the player logged by name. */
export function findCard(type, name, combo) {
  if (!name) return null;
  const opts = cardOptionsFor(type, combo || {});
  return opts.find((o) => o.name.toLowerCase() === String(name).toLowerCase()) || null;
}

/* The killer's unofficial flavour line (atmosphere), if present. */
export function killerFlavour(appKillerId) {
  return killerRecord(appKillerId)?.flavour_unofficial ?? null;
}
/* The location's unofficial flavour line. */
export function locationFlavour(appLocationId) {
  return locationRecord(appLocationId)?.flavour_unofficial ?? null;
}

/* A Final Girl's Ultimate ability info, looked up by her NAME (the app and the
   card file use different ids, but names match). Returns:
     { ability, victimsForUltimate, flavour } or null.
   Used to pre-fill the "enabled Final Girl power" capture and to narrate it. */
export function finalGirlUltimate(finalGirlName) {
  if (!finalGirlName) return null;
  const g = finalGirlsByName[String(finalGirlName).toLowerCase()];
  if (!g) return null;
  return {
    ability: g.ultimate_ability ?? null,
    victimsForUltimate: g.victims_for_ultimate ?? null,
    flavour: g.flavour_unofficial ?? null,
  };
}
