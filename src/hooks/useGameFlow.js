import { useCallback } from 'react';
import { getKiller, getLocation, getFinalGirl, buildScenario } from '../data/games.js';
import { useGameLog } from './useGameLog.js';
import { useTurnState } from './useTurnState.js';
import { useGameSelection } from './useGameSelection.js';
import { useNarration } from './useNarration.js';
import { usePersistentState, writePersistent } from './usePersistentState.js';

/* ==========================================================================
   One place for the start / end / discard of a game, so every screen that
   offers those buttons (This Game, Turn Tracker, Setup Assist) behaves the
   same way and keeps the stores in step:

   - START: records the in-progress game, speaks the intro, and gives the Turn
     Tracker a clean slate — keeping only the Setup / Starting event you
     recorded during setup. (Previously the Turn Tracker kept the LAST game's
     events unless you remembered to press New game, and they got saved into
     the next game's record.)
   - END / DISCARD: saves (or drops) the game, then clears the Turn Tracker
     and the end-of-game draft so the next game starts fresh.

   The end-of-game draft (outcome, notes, mistakes, achievement answers) is
   persisted, so you can note a mistake from the Turn Tracker mid-game and it's
   waiting on the end-of-game form.
   ========================================================================== */

export const END_DRAFT_KEY = 'fg-endgame-draft';
export const EMPTY_DRAFT = {
  outcome: '',
  turns: '',
  turnsEdited: false,
  notes: '',
  answers: {},
  mistakes: [],
};

export function useEndDraft() {
  const [draft, setDraft] = usePersistentState(END_DRAFT_KEY, EMPTY_DRAFT);
  const d = { ...EMPTY_DRAFT, ...(draft || {}) };
  const update = useCallback(
    (changes) => setDraft((cur) => ({ ...EMPTY_DRAFT, ...(cur || {}), ...changes })),
    [setDraft],
  );
  const addMistake = useCallback(
    (type, text) =>
      setDraft((cur) => {
        const base = { ...EMPTY_DRAFT, ...(cur || {}) };
        return { ...base, mistakes: [...base.mistakes, { type, text }] };
      }),
    [setDraft],
  );
  return { draft: d, update, addMistake };
}

function clearDraft() {
  writePersistent(END_DRAFT_KEY, undefined);
}

export function useGameFlow() {
  const { active, startGame: logStart, endGame: logEnd, discardActive } = useGameLog();
  const { reset: resetTurns } = useTurnState();
  const { finalGirlId, killerId, locationId } = useGameSelection();
  const narration = useNarration();

  const finalGirl = getFinalGirl(finalGirlId);
  const killer = getKiller(killerId);
  const location = getLocation(locationId);
  const canStart = Boolean(finalGirl || killer || location);

  const start = useCallback(
    (isTest) => {
      if (narration.supported) narration.speak(buildScenario({ finalGirl, killer, location }));
      logStart({
        isTest,
        finalGirlId: finalGirl ? finalGirl.id : null,
        killerId: killer ? killer.id : null,
        locationId: location ? location.id : null,
        finalGirlName: finalGirl ? finalGirl.name : null,
        killerName: killer ? killer.name : null,
        locationName: location ? location.name : null,
      });
      resetTurns(undefined, { keepSetup: true });
      clearDraft();
    },
    [narration, finalGirl, killer, location, logStart, resetTurns],
  );

  const end = useCallback(
    (result) => {
      logEnd(result);
      resetTurns();
      clearDraft();
    },
    [logEnd, resetTurns],
  );

  const discard = useCallback(() => {
    discardActive();
    resetTurns();
    clearDraft();
  }, [discardActive, resetTurns]);

  return { active, canStart, start, end, discard, narration };
}
