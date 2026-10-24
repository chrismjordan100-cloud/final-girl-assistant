import {
  getKiller,
  getLocation,
  getFinalGirl,
  getPageImages,
  getArtImage,
  getFlavourImage,
  getFinalGirlCards,
  getPlayRules,
  getAchievements,
  getOfficialScenario,
  isAutoAchievement,
  getIcon,
  getRuleIcons,
  getRulesetNote,
  killerTips,
  locationTips,
  normaliseTip,
  getScenarioImage,
} from '../data/games.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import { useGameLog, aggregateMistakes } from '../hooks/useGameLog.js';
import { useGameFlow, useEndDraft } from '../hooks/useGameFlow.js';
import { usePersistentState } from '../hooks/usePersistentState.js';
import { useTurnState } from '../hooks/useTurnState.js';
import { deriveSummary } from '../lib/gameSummary.js';
import { useEffect, useState } from 'react';
import CollapsibleSection from '../components/CollapsibleSection.jsx';
import './ThisGame.css';

/* A labelled image tile, or a "not added yet" placeholder. */
function ImageTile({ src, alt, caption }) {
  if (!src) return null;
  return (
    <figure className="tg-tile fg-panel">
      <img className="tg-tile__img" src={src} alt={alt} />
      {caption && <figcaption className="tg-tile__cap fg-type">{caption}</figcaption>}
    </figure>
  );
}

function MissingNote({ children }) {
  return (
    <div className="tg-missing fg-panel">
      <p className="fg-type">{children}</p>
    </div>
  );
}

/* Special play-rules summary for a Killer or Location. */
function PlayRulesBlock({ kind, entry, rules }) {
  return (
    <div className="tg-playrules__block">
      <h3 className="tg-playrules__head">
        <span className={'tg-playrules__badge tg-playrules__badge--' + kind}>
          {kind === 'killer' ? 'Killer' : 'Location'}
        </span>
        {entry.name}
      </h3>
      {rules.points.length > 0 && (
        <ul className="tg-playrules__list">
          {rules.points.map((p, i) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      )}
      {rules.watchOuts && rules.watchOuts.length > 0 && (
        <ul className="tg-playrules__watch">
          {rules.watchOuts.map((w, i) => (
            <li key={i}>&#9888; {w}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ThisGame({ onNavigate }) {
  const { finalGirlId, killerId, locationId, clear } = useGameSelection();
  const { log } = useGameLog();
  const { active, start, end, discard, narration } = useGameFlow();
  const { speaking, stop } = narration;
  const { state: turnState } = useTurnState();

  const finalGirl = getFinalGirl(finalGirlId);
  const killer = getKiller(killerId);
  const location = getLocation(locationId);
  const nothingPicked = !finalGirl && !killer && !location;

  // Resolve every asset once, up front.
  const killerFlavour = killer ? getFlavourImage('killer', killer) : null;
  const locationFlavour = location ? getFlavourImage('location', location) : null;
  const killerArt = killer ? getArtImage('killer', killer) : null;
  const locationArt = location ? getArtImage('location', location) : null;
  const fgCards = finalGirl ? getFinalGirlCards(finalGirl) : { front: null, back: null };
  const killerPages = killer ? getPageImages('killer', killer) : [];
  const locationPages = location ? getPageImages('location', location) : [];
  const killerPlay = killer ? getPlayRules(killer) : null;
  const locationPlay = location ? getPlayRules(location) : null;
  const hasPlayRules = Boolean(killerPlay || locationPlay);
  const comboRuleIcons = [
    ...(killer ? getRuleIcons(killer) : []),
    ...(location ? getRuleIcons(location) : []),
  ];
  // Killer / Location specific strategy tips for this combo (same data the
  // Tips tab shows, surfaced here so you don't have to switch tabs).
  const comboTips = [
    ...(killer ? (killerTips[killer.id] || []).map((t) => ({ owner: killer.name, ...normaliseTip(t) })) : []),
    ...(location ? (locationTips[location.id] || []).map((t) => ({ owner: location.name, ...normaliseTip(t) })) : []),
  ];

  // "Uses core icons only" notes for a picked Killer/Location with no icons.
  const ruleIconNotes = [
    ...(killer && getRuleIcons(killer).length === 0 && getRulesetNote(killer)
      ? [{ name: killer.name, note: getRulesetNote(killer) }]
      : []),
    ...(location && getRuleIcons(location).length === 0 && getRulesetNote(location)
      ? [{ name: location.name, note: getRulesetNote(location) }]
      : []),
  ];

  const official = getOfficialScenario(killer, location);

  // Recurring mistakes worth flagging before this game starts. We prefer ones
  // tied to this Killer or Location; if there are none, fall back to overall
  // repeat offenders so the reminder is still useful.
  const allGroups = aggregateMistakes(log);
  const relevantGroups = allGroups.filter(
    (g) =>
      g.count > 1 &&
      g.games.some(
        (game) =>
          (killer && game.combo.includes(killer.name)) ||
          (location && game.combo.includes(location.name)),
      ),
  );
  const reminderGroups = (relevantGroups.length > 0
    ? relevantGroups
    : allGroups.filter((g) => g.count > 1)
  ).slice(0, 4);

  // End-of-game record form. The draft is PERSISTED (useEndDraft), so going to
  // the Turn Tracker and back — or noting a mistake from there mid-game —
  // never loses what you've entered.
  const { draft, update: updateDraft, addMistake: addDraftMistake } = useEndDraft();
  const { outcome, notes, answers, mistakes, turnsEdited } = draft;
  // "Turns taken" follows the live Turn Tracker count until you type your own.
  // (The Turn Tracker counts the turn you're ON, so that's the turns played.)
  const liveTurns = turnState && turnState.turn ? String(turnState.turn) : '';
  const turns = turnsEdited ? draft.turns : liveTurns;
  const setOutcome = (v) => updateDraft({ outcome: v });
  const setNotes = (v) => updateDraft({ notes: v });
  const [savedMsg, setSavedMsg] = useState(false);
  const [mistakeType, setMistakeType] = useState('rules');
  const [mistakeText, setMistakeText] = useState('');
  // Two-tap confirm for Discard, so one stray tap can't throw a game away.
  const [confirmDiscard, setConfirmDiscard] = useState(false);
  useEffect(() => {
    if (!confirmDiscard) return undefined;
    const t = setTimeout(() => setConfirmDiscard(false), 4000);
    return () => clearTimeout(t);
  }, [confirmDiscard]);
  // The record form is tucked away while you play (so the rules aren't pushed
  // down the page) and opens when you're ready — or if you've started filling it.
  const draftStarted = Boolean(outcome || notes || mistakes.length || Object.keys(answers).length);
  // Persisted so the Turn Tracker's "End game" button lands here with it open.
  const [recordOpen, setRecordOpen] = usePersistentState('fg-endgame-open', false);
  const showRecord = recordOpen || draftStarted;

  // Achievements available for this combo (killer + location lists).
  const comboAchievements = [
    ...(killer ? getAchievements(killer).map((a) => ({ ...a, owner: killer.name })) : []),
    ...(location ? getAchievements(location).map((a) => ({ ...a, owner: location.name })) : []),
  ];

  // The end-game form ONLY asks about achievements that can't be worked out
  // from your history. The auto-detected ones (e.g. "win at 5 different
  // Locations", "win at home Location") are computed by the MI from your won
  // games — you never answer them, so there's no way to accidentally mark one
  // "no" and hide something you've genuinely earned.
  const manualAchievements = comboAchievements.filter((a) => !isAutoAchievement(a.id));

  // Live summary of everything captured in the Turn Tracker this game — shown
  // read-only on the end-game screen so you can see what will be saved.
  const capturedEvents = (turnState && turnState.events) || [];
  const liveSummary = deriveSummary(capturedEvents);

  const answeredCount = manualAchievements.filter((a) => answers[a.id]).length;
  // Whether we show the (manual-only) achievement questions at all.
  const achievementsRelevant =
    active && !active.isTest && outcome !== 'abandoned' && manualAchievements.length > 0;
  // You can always save: anything you don't mark "yes" is simply treated as
  // not earned this game. (Auto-detected achievements aren't asked about and
  // are never affected by saving — they come straight from your win history.)

  function handleStartGame(isTest) {
    start(isTest);
    setMistakeText('');
    setRecordOpen(false);
  }

  function answerAchievement(id, value) {
    updateDraft({ answers: { ...answers, [id]: value } });
  }

  function addMistake() {
    const text = mistakeText.trim();
    if (!text) return;
    addDraftMistake(mistakeType, text);
    setMistakeText('');
  }

  function removeMistake(idx) {
    updateDraft({ mistakes: mistakes.filter((_, i) => i !== idx) });
  }

  function handleDiscard() {
    if (!confirmDiscard) {
      setConfirmDiscard(true);
      return;
    }
    setConfirmDiscard(false);
    discard();
    setRecordOpen(false);
  }

  function handleEndGame() {
    if (!outcome) return;
    // Earned = the MANUAL achievements you answered "yes". Auto-detected ones
    // are intentionally NOT recorded per-game — the MI derives them from your
    // win history, so there's no way for a save to hide a genuine earn.
    const earnedIds =
      outcome === 'abandoned'
        ? []
        : manualAchievements.filter((a) => answers[a.id] === 'yes').map((a) => a.id);
    // Carry the captured per-turn event stream into the saved game, plus a
    // derived summary. Both persist so the record is self-contained and a
    // future AI summary can follow the game turn-by-turn.
    const capturedEvents = (turnState && turnState.events) || [];
    end({
      outcome,
      turns: turns ? Number(turns) : null,
      notes,
      achievements: earnedIds,
      mistakes,
      events: capturedEvents,
      summary: deriveSummary(capturedEvents),
    });
    setMistakeText('');
    setRecordOpen(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 4000);
  }

  const hasFlavour = killerFlavour || locationFlavour;
  const hasArt = killerArt || locationArt;
  const hasFinalGirlCards = fgCards.front || fgCards.back;
  const hasRules = killerPages.length > 0 || locationPages.length > 0;
  const scenarioImage = getScenarioImage(killer, location);

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">Your table, right now</p>
        <h1>This Game</h1>
        <p className="lead">
          Everything for the Final Girl, Killer and Location you picked during setup —
          flavour, cards, art, and the extra rule sheets.
        </p>
      </div>

      {nothingPicked ? (
        <div className="tg-empty fg-panel">
          <span className="tg-empty__glyph" aria-hidden="true">&#x1F52A;</span>
          <h2 className="tg-empty__title">No game chosen yet</h2>
          <p className="tg-empty__body">
            Head to <strong>Setup Assist</strong> and choose your Final Girl, Killer and
            Location. Once you do, everything for this game appears here.
          </p>
        </div>
      ) : (
        <>
          {killer && location && (
            official ? (
              <div className="tg-scenario tg-scenario--official">
                <span className="tg-scenario__star" aria-hidden="true">&#9733;</span>
                <span>
                  <strong>Official scenario:</strong> {official.name}
                  <span className="tg-scenario__sub"> — the canon {killer.name} / {location.name} pairing</span>
                </span>
              </div>
            ) : (
              <div className="tg-scenario tg-scenario--mix">
                <span aria-hidden="true">&#128256;</span>
                <span>
                  <strong>Mix-up:</strong> {killer.name} isn&rsquo;t the canon Killer for {location.name}.
                </span>
              </div>
            )
          )}

          <div className="tg-selectionbar fg-panel">
            <div className="tg-selectionbar__chips">
              <span className="tg-chip">
                <span className="tg-chip__kind">Final Girl</span>
                {finalGirl ? finalGirl.name : <em className="tg-chip__none">not chosen</em>}
              </span>
              <span className="tg-chip">
                {killer && getIcon('killer', killer) && (
                  <img className="tg-chip__icon" src={getIcon('killer', killer)} alt="" aria-hidden="true" />
                )}
                <span className="tg-chip__kind">Killer</span>
                {killer ? killer.name : <em className="tg-chip__none">not chosen</em>}
              </span>
              <span className="tg-chip">
                {location && getIcon('location', location) && (
                  <img className="tg-chip__icon" src={getIcon('location', location)} alt="" aria-hidden="true" />
                )}
                <span className="tg-chip__kind">Location</span>
                {location ? location.name : <em className="tg-chip__none">not chosen</em>}
              </span>
            </div>
            <div className="tg-selectionbar__actions">
              {speaking ? (
                <button className="fg-btn tg-startgame is-speaking" onClick={stop}>
                  &#9632; Stop narration
                </button>
              ) : active ? null : (
                <>
                  <button
                    className="fg-btn tg-start-test"
                    onClick={() => handleStartGame(true)}
                    title="Plays normally but never affects Achievements or MI"
                  >
                    &#9654; Start Test
                  </button>
                  <button
                    className="fg-btn fg-btn--primary tg-start-real"
                    onClick={() => handleStartGame(false)}
                    title="Counts toward Achievements and MI"
                  >
                    &#9760; START REAL GAME
                  </button>
                </>
              )}
              <button className="fg-btn tg-clear" onClick={clear}>Clear</button>
            </div>
          </div>

          {reminderGroups.length > 0 && (
            <div className="tg-reminders fg-panel">
              <h2 className="tg-reminders__title">&#9888; Don&rsquo;t repeat these</h2>
              <p className="tg-reminders__intro fg-type">
                {relevantGroups.length > 0
                  ? 'Mistakes you\u2019ve made more than once with this Killer or Location.'
                  : 'Mistakes you\u2019ve made more than once across your games.'}
              </p>
              <ul className="tg-reminders__list">
                {reminderGroups.map((g) => (
                  <li key={g.key} className={'tg-reminder tg-reminder--' + g.type}>
                    <span className="tg-reminder__tag">{g.type === 'rules' ? 'Rules' : 'Strategy'}</span>
                    <span className="tg-reminder__text">{g.text}</span>
                    <span className="tg-reminder__count">{g.count}&times;</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {savedMsg && (
            <p className="tg-saved" role="status">Game recorded to the Game Log.</p>
          )}

          {active && (
            <section className="tg-endgame fg-panel">
              <div className="tg-endgame__head">
                <h2 className="tg-endgame__title">
                  Game in progress
                  {active.isTest && <span className="tg-testbadge">Test</span>}
                </h2>
                <span className="tg-endgame__since fg-type">
                  Started {new Date(active.startedAt).toLocaleString()}
                </span>
              </div>
              <p className="tg-endgame__intro fg-type">
                {active.isTest
                  ? 'Test game — recorded to the log for reference, but it won\u2019t count toward Achievements or MI.'
                  : 'Record the result when you finish (no need to use the Turn Tracker).'}
              </p>

              <div className="tg-endgame__quick">
                {onNavigate && (
                  <button className="fg-btn" onClick={() => onNavigate('turn')}>
                    &#128337; Turn Tracker
                  </button>
                )}
                {!showRecord && (
                  <button className="fg-btn fg-btn--primary" onClick={() => setRecordOpen(true)}>
                    End game &amp; record result
                  </button>
                )}
              </div>

              {showRecord && (<>
              <div className="tg-endgame__outcome">
                <button
                  className={'tg-outcome tg-outcome--won' + (outcome === 'won' ? ' is-selected' : '')}
                  onClick={() => setOutcome('won')}
                >
                  &#9876; Survived (Won)
                </button>
                <button
                  className={'tg-outcome tg-outcome--lost' + (outcome === 'lost' ? ' is-selected' : '')}
                  onClick={() => setOutcome('lost')}
                >
                  &#9760; Died (Lost)
                </button>
                <button
                  className={'tg-outcome tg-outcome--abandoned' + (outcome === 'abandoned' ? ' is-selected' : '')}
                  onClick={() => setOutcome('abandoned')}
                >
                  &#9888; Abandoned
                </button>
              </div>

              {achievementsRelevant && (
                <div className="tg-achievements">
                  <h3 className="tg-achievements__head">
                    Achievements — tick any you earned
                    <span className="tg-achievements__count">
                      {answeredCount}/{manualAchievements.length} marked
                    </span>
                  </h3>
                  <p className="tg-achievements__intro fg-type">
                    Only achievements that can&rsquo;t be worked out from your
                    history are shown here. Tick the ones you earned this game;
                    anything you leave blank counts as not earned. History-based
                    ones (like &ldquo;win at five Locations&rdquo;) are tracked
                    automatically in MI &mdash; you don&rsquo;t record those here.
                  </p>
                  <ul className="tg-achievements__qlist">
                    {manualAchievements.map((a) => {
                      const ans = answers[a.id]; // 'yes' | 'no' | undefined
                      return (
                        <li key={a.id} className={'tg-q' + (ans ? ' is-answered' : '') + (ans === 'yes' ? ' is-yes' : '')}>
                          <span className="tg-q__text">
                            {a.label}
                            <span className="tg-q__owner">{a.owner}</span>
                          </span>
                          <span className="tg-q__buttons">
                            <button
                              type="button"
                              className={'tg-q__btn tg-q__btn--yes' + (ans === 'yes' ? ' is-active' : '')}
                              onClick={() => answerAchievement(a.id, 'yes')}
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              className={'tg-q__btn tg-q__btn--no' + (ans === 'no' ? ' is-active' : '')}
                              onClick={() => answerAchievement(a.id, 'no')}
                            >
                              No
                            </button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  {answeredCount < manualAchievements.length && (
                    <p className="tg-achievements__warn fg-type">
                      &#9888; {manualAchievements.length - answeredCount} still to answer.
                    </p>
                  )}
                </div>
              )}

              <div className="tg-mistakes">
                <h3 className="tg-mistakes__head">Mistakes this game (optional)</h3>
                <p className="tg-mistakes__intro fg-type">
                  Log any slip-ups so the app can spot trends and remind you next time.
                </p>
                {mistakes.length > 0 && (
                  <ul className="tg-mistakes__list">
                    {mistakes.map((m, i) => (
                      <li key={i} className={'tg-mistake tg-mistake--' + m.type}>
                        <span className="tg-mistake__tag">{m.type === 'rules' ? 'Rules' : 'Strategy'}</span>
                        <span className="tg-mistake__text">{m.text}</span>
                        <button
                          className="tg-mistake__del"
                          onClick={() => removeMistake(i)}
                          aria-label="Remove"
                        >
                          &times;
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="tg-mistakes__add">
                  <div className="tg-mistakes__type">
                    <button
                      type="button"
                      className={'tg-mtype' + (mistakeType === 'rules' ? ' is-active' : '')}
                      onClick={() => setMistakeType('rules')}
                    >
                      Rules error
                    </button>
                    <button
                      type="button"
                      className={'tg-mtype' + (mistakeType === 'strategy' ? ' is-active' : '')}
                      onClick={() => setMistakeType('strategy')}
                    >
                      Strategy error
                    </button>
                  </div>
                  <input
                    className="tg-field__input"
                    type="text"
                    value={mistakeText}
                    onChange={(e) => setMistakeText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') addMistake(); }}
                    placeholder="e.g. Forgot the Finale replaces the Killer Action"
                  />
                  <button className="fg-btn tg-mistakes__addbtn" onClick={addMistake} disabled={!mistakeText.trim()}>
                    Add
                  </button>
                </div>
              </div>

              {/* What the Turn Tracker captured this game (read-only here —
                  you can fine-tune it later from the Game Log). */}
              {capturedEvents.length > 0 && (
                <div className="tg-captured">
                  <h3 className="tg-captured__head">
                    Captured this game
                    <span className="tg-captured__count">{capturedEvents.length} event{capturedEvents.length === 1 ? '' : 's'}</span>
                  </h3>
                  <ul className="tg-captured__tallies">
                    {liveSummary.setup && <li>setup: <strong>{liveSummary.setup}</strong></li>}
                    {liveSummary.startingEvent && <li>start event: <strong>{liveSummary.startingEvent}</strong></li>}
                    <li><strong>{liveSummary.victimsSaved}</strong> saved</li>
                    <li><strong>{liveSummary.victimsDied}</strong> died</li>
                    <li><strong>{liveSummary.itemsFound.length}</strong> items found</li>
                    <li><strong>{liveSummary.itemsUsed.length}</strong> items used</li>
                    <li><strong>{liveSummary.darkPowers.length}</strong> dark powers</li>
                    {liveSummary.events.length > 0 && <li><strong>{liveSummary.events.length}</strong> events</li>}
                    {liveSummary.finale && <li>finale: <strong>{liveSummary.finale}</strong></li>}
                  </ul>
                  <p className="tg-captured__hint fg-type">
                    Saved with the game &mdash; you can edit any of it afterwards in the Game Log.
                  </p>
                </div>
              )}

              <div className="tg-endgame__fields">
                <label className="tg-field">
                  <span className="tg-field__label">
                    Turns taken
                    {!turnsEdited && turns ? ' (from Turn Tracker — edit if needed)' : ' (optional)'}
                  </span>
                  <input
                    className="tg-field__input"
                    type="number"
                    min="1"
                    value={turns}
                    onChange={(e) => updateDraft({ turns: e.target.value, turnsEdited: true })}
                    placeholder="e.g. 8"
                  />
                </label>
                <label className="tg-field tg-field--wide">
                  <span className="tg-field__label">Notes (optional)</span>
                  <input
                    className="tg-field__input"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="How it went, close calls, house rules..."
                  />
                </label>
              </div>

              <div className="tg-endgame__actions">
                <button
                  className="fg-btn fg-btn--primary"
                  onClick={handleEndGame}
                  disabled={!outcome}
                  title={!outcome ? 'Choose an outcome first' : ''}
                >
                  Save result
                </button>
                <button
                  className={'fg-btn' + (confirmDiscard ? ' fg-btn--danger' : '')}
                  onClick={handleDiscard}
                >
                  {confirmDiscard ? 'Tap again to discard' : 'Discard (don\u2019t record)'}
                </button>
                {!draftStarted && (
                  <button className="fg-btn fg-btn--ghost" onClick={() => setRecordOpen(false)}>
                    Not yet
                  </button>
                )}
              </div>
              </>)}
            </section>
          )}

          {/* Scenario graphic (if any) + flavour + key art — one un-headlined block */}
          {(scenarioImage || hasFlavour || hasArt) && (
            <div className="tg-showcase">
              {scenarioImage && (
                <figure className="tg-scenario-graphic">
                  <figcaption className="tg-scenario-graphic__cap fg-type">
                    {scenarioImage.kind === 'vignette' ? 'Vignette' : 'Official scenario'}
                    {' \u00b7 '}{scenarioImage.name}
                  </figcaption>
                  <img
                    className="tg-scenario-graphic__img"
                    src={scenarioImage.src}
                    alt={`${scenarioImage.name} scenario`}
                  />
                </figure>
              )}
              {hasFlavour && (
                <div className="tg-pair tg-pair--plain">
                  {killerFlavour && <ImageTile src={killerFlavour} alt={`${killer.name} flavour text`} />}
                  {locationFlavour && <ImageTile src={locationFlavour} alt={`${location.name} flavour text`} />}
                </div>
              )}
              {hasArt && (
                <div className="tg-pair tg-pair--plain">
                  {killerArt && <ImageTile src={killerArt} alt={`${killer.name} key art`} />}
                  {locationArt && <ImageTile src={locationArt} alt={`${location.name} key art`} />}
                </div>
              )}
            </div>
          )}

          {/* 3. Final Girl card(s) */}
          {finalGirl && (
            <CollapsibleSection title={`Final Girl \u2014 ${finalGirl.name}`}>
              {finalGirl.note && <p className="tg-verify fg-type">&#9888; {finalGirl.note}</p>}
              {hasFinalGirlCards ? (
                <div className="tg-pair">
                  <ImageTile src={fgCards.front} alt={`${finalGirl.name} card, front`} caption="Front" />
                  <ImageTile src={fgCards.back} alt={`${finalGirl.name} card, back`} caption="Back (Ultimate Ability)" />
                </div>
              ) : (
                <MissingNote>
                  Card images for {finalGirl.name} haven&rsquo;t been added yet
                  (<code>S{finalGirl.season}-finalgirl-{finalGirl.shortName}-front.png</code> / <code>-back.png</code>).
                </MissingNote>
              )}
            </CollapsibleSection>
          )}

          {/* 4. Special play rules summary (setup lives in Setup Assist) */}
          {hasPlayRules && (
            <CollapsibleSection title="Special Rules in Play">
              <p className="tg-playrules__intro fg-type">
                Quick reminders for this game. Setup is handled in Setup Assist. For full
                detail, see the rule sheets below.
              </p>
              {killerPlay && <PlayRulesBlock kind="killer" entry={killer} rules={killerPlay} />}
              {locationPlay && <PlayRulesBlock kind="location" entry={location} rules={locationPlay} />}
            </CollapsibleSection>
          )}

          {/* Strategy tips for this Killer + Location */}
          {comboTips.length > 0 && (
            <CollapsibleSection title="Tips for this game" count={`${comboTips.length}`}>
              <p className="tg-tips__intro fg-type">
                Strategy pointers for {[killer?.name, location?.name].filter(Boolean).join(' and ')}.
                See the Tips tab for general advice too.
              </p>
              <ul className="tg-tips">
                {comboTips.map((t, i) => (
                  <li key={i} className="tg-tip">
                    <span className="tg-tip__text">{t.text}</span>
                    {(t.source || t.confidence) && (
                      <span className="tg-tip__meta">
                        {t.confidence && (
                          <span className={'tg-tip__badge tg-tip__badge--' + t.confidence}>
                            {t.confidence === 'confirmed' ? 'Confirmed' : 'Reported'}
                          </span>
                        )}
                        {t.source && <span className="tg-tip__source">{t.source}</span>}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </CollapsibleSection>
          )}

          {/* Scenario rule icons for this Killer + Location */}
          {(comboRuleIcons.length > 0 || ruleIconNotes.length > 0) && (
            <CollapsibleSection
              title="Rule icons for this game"
              count={comboRuleIcons.length > 0 ? `${comboRuleIcons.length}` : undefined}
            >
              {comboRuleIcons.length > 0 && (
                <>
                  <p className="tg-ruleicons__intro fg-type">
                    Symbols specific to this game that you&rsquo;ll see on the cards and board.
                  </p>
                  <ul className="tg-ruleicons">
                    {comboRuleIcons.map((r) => (
                      <li key={r.id} className="tg-ruleicon">
                        <img className="tg-ruleicon__img" src={r.src} alt={r.label} loading="lazy" />
                        <div className="tg-ruleicon__text">
                          <span className="tg-ruleicon__label">{r.label}</span>
                          <span className="tg-ruleicon__desc fg-type">{r.description}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {ruleIconNotes.map((n) => (
                <p key={n.name} className="tg-ruleicons__note fg-type">
                  <strong>{n.name}:</strong> {n.note}
                </p>
              ))}
            </CollapsibleSection>
          )}

          {/* 5. Rule sheets — Killer then Location, stacked */}
          <CollapsibleSection title="Rule Sheets">
            {!hasRules && (
              <MissingNote>No rule-sheet pages have been added for this game yet.</MissingNote>
            )}

            {killer && killerPages.length > 0 && (
              <div className="tg-rules-block">
                <h3 className="tg-rules-block__head">
                  <span className="tg-rules-block__badge tg-rules-block__badge--killer">Killer</span>
                  {killer.name}
                </h3>
                <div className="tg-pages">
                  {killerPages.map((src, i) => (
                    <ImageTile key={src} src={src} alt={`${killer.name} rules, page ${i + 1}`} caption={`Page ${i + 1}`} />
                  ))}
                </div>
              </div>
            )}

            {location && locationPages.length > 0 && (
              <div className="tg-rules-block">
                <h3 className="tg-rules-block__head">
                  <span className="tg-rules-block__badge tg-rules-block__badge--location">Location</span>
                  {location.name}
                </h3>
                <div className="tg-pages">
                  {locationPages.map((src, i) => (
                    <ImageTile key={src} src={src} alt={`${location.name} rules, page ${i + 1}`} caption={`Page ${i + 1}`} />
                  ))}
                </div>
              </div>
            )}
          </CollapsibleSection>
        </>
      )}
    </div>
  );
}
