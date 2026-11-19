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

const SETUP_PROGRESS_KEY = 'fg-setup-progress';
const SETUP_PROGRESS_EVENT = 'fg-setup-progress-change';

function clearDraft() {
  writePersistent(END_DRAFT_KEY, undefined);
  // Also close the end-of-game form, so it can't reopen on the next game
  // (the Turn Tracker's "End game" button sets this flag).
  writePersistent('fg-endgame-open', undefined);
}

export function useGameFlow() {
  const { active, startGame: logStart, endGame: logEnd, discardActive } = useGameLog();
  const { reset: resetTurns } = useTurnState();
  const { finalGirlId, killerId, locationId, clear: clearSelection } = useGameSelection();
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

  // Full wipe: drops any in-progress game (NOT recorded), the Turn Tracker,
  // the end-of-game draft, the picked Final Girl / Killer / Location and the
  // Setup Assist checklist, so a new game can be started from scratch.
  const clearGame = useCallback(() => {
    discardActive();
    resetTurns();
    clearDraft();
    clearSelection();
    try {
      localStorage.removeItem(SETUP_PROGRESS_KEY);
    } catch {
      /* ignore storage failures */
    }
    window.dispatchEvent(new CustomEvent(SETUP_PROGRESS_EVENT));
  }, [discardActive, resetTurns, clearSelection]);

  return { active, canStart, start, end, discard, clearGame, narration };
}
