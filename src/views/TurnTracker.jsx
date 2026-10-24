import { useState, useEffect, useRef } from 'react';
import { phases, horrorRoll } from '../data/rules.js';
import { getKiller, getLocation, getFinalGirl, getPhaseExtras } from '../data/games.js';
import { finalGirlUltimate } from '../data/cardData.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import { useTurnState } from '../hooks/useTurnState.js';
import SetupCapture from '../components/SetupCapture.jsx';
import CardPicker from '../components/CardPicker.jsx';
import { useGameFlow, useEndDraft } from '../hooks/useGameFlow.js';
import { writePersistent } from '../hooks/usePersistentState.js';
import './TurnTracker.css';

/* The per-turn event types the quick-capture bar can log. `needsText` means
   the user types the card name / detail exactly as written. Totals and the
   future AI summary are both derived from this same event stream. */
const EVENT_TYPES = [
  { type: 'victim-died', label: 'Victim died', glyph: '\u2620', tone: 'blood', needsText: false },
  { type: 'victim-saved', label: 'Victim saved', glyph: '\u2665', tone: 'green', needsText: false },
  { type: 'victim-escape', label: 'Helped a victim escape', glyph: '\uD83C\uDFC3', tone: 'green', needsText: false },
  { type: 'fg-power', label: 'Enabled Final Girl power', glyph: '\u2728', tone: 'gold', needsText: true, placeholder: 'Her Ultimate / power (auto-filled if known)', isFgPower: true },
  { type: 'item-found', label: 'Found item', glyph: '\uD83C\uDFD5', tone: 'gold', needsText: true, placeholder: 'Item name, as on the card' },
  { type: 'item-used', label: 'Used item', glyph: '\u2692', tone: 'gold', needsText: true, placeholder: 'Item name, as on the card' },
  { type: 'dark-power', label: 'Dark Power', glyph: '\uD83D\uDC41', tone: 'blood', needsText: true, placeholder: 'Dark Power name', hasPower: true },
  { type: 'finale', label: 'Finale', glyph: '\uD83C\uDFAC', tone: 'blood', needsText: true, placeholder: 'Finale card name' },
  { type: 'event', label: 'Event card', glyph: '\u26A1', tone: 'default', needsText: true, placeholder: 'Event card name / effect' },
  { type: 'terror', label: 'Terror card', glyph: '\uD83C\uDCCF', tone: 'default', needsText: true, placeholder: 'Terror card / effect' },
  { type: 'weapon', label: 'Weapon', glyph: '\uD83D\uDDE1', tone: 'default', needsText: true, placeholder: 'Weapon name' },
  { type: 'location', label: 'Where she is', glyph: '\uD83D\uDCCD', tone: 'default', needsText: true, placeholder: 'Where she ended the turn (free text)' },
  { type: 'note', label: 'Note', glyph: '\u270E', tone: 'default', needsText: true, placeholder: 'Anything worth remembering' },
];

const EVENT_LABELS = Object.fromEntries(EVENT_TYPES.map((e) => [e.type, e.label]));

/* Dice rolled for a Horror Roll in STANDARD mode, read off the player board's
   Horror track (inverse, non-linear — higher Horror = fewer dice):
     Horror 1 -> 3 dice · Horror 2–5 -> 2 dice · Horror 6 -> 1 die.
   Clamped for anything outside 1–6. In Extreme Horror Mode the board's track
   is harsher; its exact dice-per-level isn't in the rulebook text yet, so the
   tracker points you at the board instead of guessing (see BACKLOG). */
function diceForHorror(horror) {
  if (horror <= 1) return 3;
  if (horror >= 6) return 1;
  return 2; // Horror 2, 3, 4, 5
}

/* A compact +/- counter for a live game value. */
function Counter({ label, value, onChange, min = 0, max = 99, tone, hint }) {
  return (
    <div className={'tt-counter' + (tone ? ' tt-counter--' + tone : '')}>
      <span className="tt-counter__label">{label}</span>
      <div className="tt-counter__controls">
        <button
          type="button"
          className="tt-counter__btn"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label={`${label} down`}
        >
          &minus;
        </button>
        <span className="tt-counter__value">{value}</span>
        <button
          type="button"
          className="tt-counter__btn"
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label={`${label} up`}
        >
          +
        </button>
      </div>
      {hint && <span className="tt-counter__hint">{hint}</span>}
    </div>
  );
}

export default function TurnTracker({ onNavigate }) {
  const { state, patch, reset, addEvent, removeEvent } = useTurnState();
  const { turn, phaseIndex, horror, bloodlust, time, victimsSaved, checked, events } = state;
  const extremeMode = Boolean(state.extreme);
  const fullTime = extremeMode ? 5 : 6;

  const { finalGirlId, killerId, locationId } = useGameSelection();
  const killer = getKiller(killerId);
  const location = getLocation(locationId);
  const finalGirl = getFinalGirl(finalGirlId);
  const phaseExtrasByPhase = getPhaseExtras(killer, location);

  const { active, canStart, start, narration } = useGameFlow();
  const { draft, addMistake } = useEndDraft();

  const phase = phases[phaseIndex];
  const extrasForPhase = phaseExtrasByPhase[phase.id] || [];
  const promptsForPhase = phase.prompts || [];
  const dice = diceForHorror(horror);
  const diceHint = extremeMode ? 'Extreme: see board' : `roll ${dice} ${dice === 1 ? 'die' : 'dice'}`;

  // --- Per-turn event capture -------------------------------------------
  const [picking, setPicking] = useState(null); // event type awaiting text, or null
  const [eventText, setEventText] = useState('');
  const [powerKind, setPowerKind] = useState('minor'); // for dark-power events
  // Mid-game mistake note (goes straight onto the end-of-game form).
  const [mistakeOpen, setMistakeOpen] = useState(false);
  const [mistakeType, setMistakeType] = useState('rules');
  const [mistakeText, setMistakeText] = useState('');
  const [mistakeSaved, setMistakeSaved] = useState(false);
  // Two-tap confirm for wiping the tracker.
  const [confirmReset, setConfirmReset] = useState(false);

  const phaseCardRef = useRef(null);
  const firstRender = useRef(true);

  // Changing turn or phase: drop any half-typed pick, and bring the top of the
  // new phase into view if you'd scrolled down — so after tapping Next you're
  // reading the new phase, not the bottom of the old one.
  useEffect(() => {
    setPicking(null);
    setEventText('');
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const card = phaseCardRef.current;
    if (!card) return;
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 0;
    const statsEl = document.querySelector('.tt-stats');
    const statsH = statsEl ? statsEl.getBoundingClientRect().height : 0;
    const top = card.getBoundingClientRect().top + window.scrollY - headerH - statsH - 12;
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn, phaseIndex]);

  useEffect(() => {
    if (!confirmReset) return undefined;
    const t = setTimeout(() => setConfirmReset(false), 4000);
    return () => clearTimeout(t);
  }, [confirmReset]);

  useEffect(() => {
    if (!mistakeSaved) return undefined;
    const t = setTimeout(() => setMistakeSaved(false), 2500);
    return () => clearTimeout(t);
  }, [mistakeSaved]);

  const allEvents = events || [];
  const thisTurnEvents = allEvents.filter((e) => e.turn === turn);
  const setupEvents = allEvents.filter((e) => e.turn === 0);
  // Setup capture is open at the very start of a game, tucked away after.
  const atGameStart = turn === 1 && phaseIndex === 0 && setupEvents.length === 0;

  function logQuick(type) {
    if (type === 'victim-died') patch({ bloodlust: Math.min(20, bloodlust + 1) });
    if (type === 'victim-saved') patch({ victimsSaved: Math.min(30, victimsSaved + 1) });
    addEvent({ type, phaseId: phase.id, phaseName: phase.name.replace(' Phase', '') });
  }

  function pickType(def) {
    if (!def.needsText) {
      logQuick(def.type);
      return;
    }
    setPicking(def);
    if (def.isFgPower && finalGirl) {
      const ult = finalGirlUltimate(finalGirl.name);
      setEventText(ult && ult.ability ? ult.ability : '');
    } else {
      setEventText('');
    }
    setPowerKind('minor');
  }

  function confirmEvent() {
    if (!picking) return;
    const detail = eventText.trim();
    if (!detail) return;
    const meta = picking.hasPower ? { power: powerKind } : {};
    addEvent({
      type: picking.type,
      detail,
      meta,
      phaseId: phase.id,
      phaseName: phase.name.replace(' Phase', ''),
    });
    setPicking(null);
    setEventText('');
  }

  function cancelPick() {
    setPicking(null);
    setEventText('');
  }

  function saveMistake() {
    const text = mistakeText.trim();
    if (!text) return;
    addMistake(mistakeType, text);
    setMistakeText('');
    setMistakeOpen(false);
    setMistakeSaved(true);
  }

  function toggleItem(key) {
    patch({ checked: { ...checked, [key]: !checked[key] } });
  }

  function clearPhaseChecks() {
    const next = { ...checked };
    Object.keys(next).forEach((k) => {
      if (k.startsWith(`${phaseIndex}:`) || k.startsWith(`x:${phaseIndex}:`)) delete next[k];
    });
    patch({ checked: next });
  }

  function goToPhase(idx) {
    patch({ phaseIndex: idx });
  }

  function nextPhase() {
    if (phaseIndex < phases.length - 1) {
      // Leaving Planning resets Time to full for the turn ahead.
      const leavingPlanning = phase.id === 'planning';
      patch({
        phaseIndex: phaseIndex + 1,
        ...(leavingPlanning ? { time: fullTime } : {}),
      });
    } else {
      // End of Upkeep -> next turn. Clear ticks, bump the turn counter.
      patch({ turn: turn + 1, phaseIndex: 0, checked: {} });
    }
  }

  function prevPhase() {
    if (phaseIndex > 0) patch({ phaseIndex: phaseIndex - 1 });
    else if (turn > 1) patch({ turn: turn - 1, phaseIndex: phases.length - 1 });
  }

  function handleReset() {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    setConfirmReset(false);
    reset(undefined, { keepSetup: false });
  }

  function setExtreme(on) {
    patch({ extreme: on, ...(time === (on ? 6 : 5) ? { time: on ? 5 : 6 } : {}) });
  }

  function goEndGame() {
    writePersistent('fg-endgame-open', true);
    if (onNavigate) onNavigate('thisgame');
  }

  const isLastPhase = phaseIndex === phases.length - 1;
  const nextLabel = isLastPhase ? `End turn ${turn} →` : `${phases[phaseIndex + 1].name.replace(' Phase', '')} →`;

  const phaseGuide = {
    action: { tip: 'Play cards, move, attack, search, save Victims. Spend Time freely.' },
    planning: { tip: `Buy Action cards with leftover Time, then Time resets to ${fullTime}.` },
    killer: { tip: 'Killer Action first, then draw & resolve a Terror card (skip the draw once the Finale is revealed).' },
    panic: {
      tip: 'Only happens if a Victim DIED this turn — otherwise skip straight to Upkeep.',
      skippable: true,
    },
    upkeep: { tip: 'Finale check (Terror deck empty?), resolve lingering effects, rearrange Items.' },
  }[phase.id];
  const victimDiedThisTurn = thisTurnEvents.some((e) => e.type === 'victim-died');

  const combo = [finalGirl?.name, killer?.name, location?.name].filter(Boolean).join(' · ');

  return (
    <div className="tt">
      <div className="view-head view-head--compact">
        <p className="section-eyebrow">One turn at a time</p>
        <h1>Turn Tracker</h1>
        <p className="lead">
          Your live game dashboard &mdash; the counters that matter, what each phase does,
          and this game&rsquo;s scenario beats. Tap through at the table; it remembers where
          you are.
        </p>
      </div>

      {/* GAME BAR — what's being played, and start / end without leaving */}
      <div className={'tt-gamebar fg-panel' + (active ? ' is-live' : '')}>
        <div className="tt-gamebar__info">
          <span className="tt-gamebar__status">
            {active ? (
              <><span className="tt-gamebar__dot" aria-hidden="true" />{active.isTest ? 'Test game in progress' : 'Game in progress'}</>
            ) : 'No game started'}
          </span>
          <span className="tt-gamebar__combo">
            {combo || 'Pick a Final Girl, Killer and Location in Setup Assist or the Codex.'}
          </span>
        </div>
        <div className="tt-gamebar__actions">
          {narration.speaking && (
            <button className="fg-btn fg-btn--small" onClick={narration.stop}>&#9632; Stop narration</button>
          )}
          {active ? (
            <button className="fg-btn fg-btn--small fg-btn--primary" onClick={goEndGame}>
              End game &amp; record &rarr;
            </button>
          ) : canStart ? (
            <>
              <button className="fg-btn fg-btn--small" onClick={() => start(true)} title="Never affects Achievements or MI">
                &#9654; Start test
              </button>
              <button className="fg-btn fg-btn--small fg-btn--primary" onClick={() => start(false)}>
                &#9760; Start real game
              </button>
            </>
          ) : (
            onNavigate && (
              <button className="fg-btn fg-btn--small" onClick={() => onNavigate('setup')}>
                Go to Setup Assist
              </button>
            )
          )}
        </div>
      </div>

      {/* LIVE STAT BAR — stays pinned under the header while you scroll */}
      <div className="tt-stats fg-panel">
        <div className="tt-stats__turn">
          <span className="tt-stats__turn-label">Turn</span>
          <span className="tt-stats__turn-num">{turn}</span>
          <span className="tt-stats__phase">&middot; {phase.name.replace(' Phase', '')}</span>
        </div>
        <div className="tt-stats__counters">
          <Counter label="Horror" value={horror} onChange={(v) => patch({ horror: v })} min={0} max={10} tone="horror" hint={diceHint} />
          <Counter label="Bloodlust" value={bloodlust} onChange={(v) => patch({ bloodlust: v })} min={0} max={20} tone="blood" />
          <Counter label="Time" value={time} onChange={(v) => patch({ time: v })} min={-1} max={12} tone="gold" />
          <Counter label="Saved" value={victimsSaved} onChange={(v) => patch({ victimsSaved: v })} min={0} max={30} tone="green" />
        </div>
      </div>

      {/* GAME SETUP — open at the start of a game, tucked away afterwards */}
      <details className="tt-setup" open={atGameStart || undefined}>
        <summary className="tt-setup__summary">
          Setup &amp; starting event
          <span className="tt-setup__recorded">
            {setupEvents.length > 0
              ? setupEvents.map((e) => e.detail).join(' · ')
              : 'not recorded yet'}
          </span>
        </summary>
        <SetupCapture heading="Game setup &amp; starting event" />
      </details>

      {/* PHASE PIPS */}
      <ol className="phase-pips fg-panel" aria-label="Phases">
        {phases.map((p, i) => (
          <li key={p.id}>
            <button
              className={
                'phase-pip' +
                (i === phaseIndex ? ' is-active' : '') +
                (i < phaseIndex ? ' is-past' : '')
              }
              onClick={() => goToPhase(i)}
              style={{ '--pip-color': p.color }}
              aria-current={i === phaseIndex ? 'step' : undefined}
            >
              <span className="phase-pip__dot" aria-hidden="true" />
              <span className="phase-pip__name">{p.name.replace(' Phase', '')}</span>
            </button>
          </li>
        ))}
      </ol>

      {/* CURRENT PHASE — read what to do first, then log what happened */}
      <section ref={phaseCardRef} className="phase-card fg-panel" style={{ '--phase-color': phase.color }}>
        <header className="phase-card__head">
          <h2 className="phase-card__title">
            <span className="phase-card__index">{phaseIndex + 1}</span>
            {phase.name}
          </h2>
          <p className="phase-card__summary">{phase.summary}</p>
        </header>

        {phaseGuide && (
          <p className={'phase-guide' + (phaseGuide.skippable ? ' phase-guide--skip' : '')}>
            {phaseGuide.skippable && (
              <span className="phase-guide__flag">
                {victimDiedThisTurn ? 'A Victim died — resolve it' : 'No deaths logged — skip'}
              </span>
            )}
            {phaseGuide.tip}
          </p>
        )}

        {/* Horror roll helper, inline during the Action phase where it's used */}
        {phase.id === 'action' && (
          <div className="phase-roll">
            <span className="phase-roll__dice">{extremeMode ? '?' : dice}</span>
            <span className="phase-roll__label">
              {extremeMode
                ? `Extreme Horror: read the dice for Horror ${horror} off the Extreme side of your board`
                : `${dice === 1 ? 'die' : 'dice'} per Horror Roll (Horror ${horror})`}
            </span>
          </div>
        )}

        {/* This game's scenario beats — the easiest rules to forget, so first */}
        {extrasForPhase.length > 0 && (
          <div className="phase-extras">
            <h3 className="phase-extras__head">&#9888; This game &mdash; {phase.name.replace(' Phase', '')} beats</h3>
            <ul className="phase-checklist phase-checklist--extra">
              {extrasForPhase.map((x, i) => {
                const key = `x:${phaseIndex}:${i}`;
                const on = !!checked[key];
                return (
                  <li key={key} className={on ? 'is-checked' : ''}>
                    <label>
                      <input type="checkbox" checked={on} onChange={() => toggleItem(key)} />
                      <span className="phase-check__box" aria-hidden="true" />
                      <span>
                        <span className="phase-extras__owner">{x.owner}</span>
                        {x.text}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Core "don't forget" beats for this phase — every game */}
        {promptsForPhase.length > 0 && (
          <ul className="phase-prompts">
            {promptsForPhase.map((p, i) => (
              <li key={i} className="phase-prompt">{p}</li>
            ))}
          </ul>
        )}

        {/* Per-turn event capture — always available in every phase */}
        <div className="turn-events">
          <h3 className="turn-events__head">
            Log an event <span className="turn-events__ctx">Turn {turn} &middot; {phase.name.replace(' Phase', '')}</span>
          </h3>

          {picking ? (
            <div className="turn-events__entry">
              <span className="turn-events__entry-label">
                {picking.glyph} {picking.label}
              </span>
              {picking.hasPower && (
                <div className="turn-events__power" role="group" aria-label="Dark Power kind">
                  <button type="button" className={'te-power' + (powerKind === 'minor' ? ' is-active' : '')} onClick={() => setPowerKind('minor')}>
                    Minor
                  </button>
                  <button type="button" className={'te-power' + (powerKind === 'epic' ? ' is-active' : '')} onClick={() => setPowerKind('epic')}>
                    Epic
                  </button>
                </div>
              )}
              <CardPicker
                type={picking.type}
                combo={{ killerId, locationId }}
                value={eventText}
                onChange={setEventText}
                placeholder={picking.placeholder}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmEvent();
                  if (e.key === 'Escape') cancelPick();
                }}
              />
              <button type="button" className="fg-btn fg-btn--primary fg-btn--small" onClick={confirmEvent} disabled={!eventText.trim()}>
                Log
              </button>
              <button type="button" className="fg-btn fg-btn--small" onClick={cancelPick}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="turn-events__buttons">
              {EVENT_TYPES.map((def) => (
                <button key={def.type} type="button" className={'te-btn te-btn--' + def.tone} onClick={() => pickType(def)}>
                  <span className="te-btn__glyph" aria-hidden="true">{def.glyph}</span>
                  {def.label}
                </button>
              ))}
            </div>
          )}

          {thisTurnEvents.length > 0 && (
            <ul className="turn-events__list">
              {thisTurnEvents.map((e) => (
                <li key={e.id} className={'te-item te-item--' + e.type}>
                  <span className="te-item__phase">{e.phaseName}</span>
                  <span className="te-item__text">
                    {EVENT_LABELS[e.type] || e.type}
                    {e.detail ? `: ${e.detail}` : ''}
                    {e.meta && e.meta.power ? ` (${e.meta.power})` : ''}
                  </span>
                  <button type="button" className="te-item__del" onClick={() => removeEvent(e.id)} aria-label="Remove this event" title="Remove">
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Spotted a rules slip? Note it now; it waits on the end-of-game form. */}
          <div className="tt-mistake">
            {mistakeOpen ? (
              <div className="tt-mistake__form">
                <div className="tt-mistake__types" role="group" aria-label="Mistake type">
                  <button type="button" className={'te-power' + (mistakeType === 'rules' ? ' is-active' : '')} onClick={() => setMistakeType('rules')}>Rules</button>
                  <button type="button" className={'te-power' + (mistakeType === 'strategy' ? ' is-active' : '')} onClick={() => setMistakeType('strategy')}>Strategy</button>
                </div>
                <input
                  className="tt-mistake__input"
                  type="text"
                  value={mistakeText}
                  autoFocus
                  onChange={(e) => setMistakeText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveMistake();
                    if (e.key === 'Escape') setMistakeOpen(false);
                  }}
                  placeholder="e.g. Forgot Panic moves Victims away"
                />
                <button type="button" className="fg-btn fg-btn--primary fg-btn--small" onClick={saveMistake} disabled={!mistakeText.trim()}>Save</button>
                <button type="button" className="fg-btn fg-btn--small" onClick={() => setMistakeOpen(false)}>Cancel</button>
              </div>
            ) : (
              <button type="button" className="tt-mistake__open" onClick={() => setMistakeOpen(true)}>
                &#9888; Note a mistake
                {draft.mistakes.length > 0 && <span className="tt-mistake__count">{draft.mistakes.length} noted</span>}
                {mistakeSaved && <span className="tt-mistake__ok">Saved for the end-of-game form</span>}
              </button>
            )}
          </div>
        </div>

        <details className="phase-details">
          <summary className="phase-details__summary">Full checklist &amp; reminders</summary>
          <div className="phase-card__cols">
            <div>
              <h3 className="phase-sub">Do this</h3>
              <ul className="phase-checklist">
                {phase.checklist.map((item, i) => {
                  const key = `${phaseIndex}:${i}`;
                  const on = !!checked[key];
                  return (
                    <li key={key} className={on ? 'is-checked' : ''}>
                      <label>
                        <input type="checkbox" checked={on} onChange={() => toggleItem(key)} />
                        <span className="phase-check__box" aria-hidden="true" />
                        <span>{item}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              <button className="fg-btn fg-btn--small phase-clear" onClick={clearPhaseChecks}>
                Clear ticks
              </button>
            </div>
            <div>
              <h3 className="phase-sub">Remember</h3>
              <ul className="phase-notes">
                {phase.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
            </div>
          </div>
        </details>

        {/* Back / Next — pinned to the bottom of the screen while you're in
            the phase, so you never scroll to find them */}
        <footer className="phase-card__nav">
          <button className="fg-btn" onClick={prevPhase} disabled={phaseIndex === 0 && turn === 1}>
            &larr; Back
          </button>
          <button className="fg-btn fg-btn--primary phase-card__next" onClick={nextPhase}>
            {nextLabel}
          </button>
        </footer>
      </section>

      {/* Horror roll reference — collapsed, for when you need the detail */}
      <details className="horror-roll fg-panel">
        <summary className="horror-roll__summary">{horrorRoll.title} &mdash; how it works</summary>
        <p className="horror-roll__lead">{horrorRoll.dicePerLevel}</p>
        <div className="horror-roll__results">
          {horrorRoll.results.map((r) => (
            <div key={r.label} className={'roll-chip roll-chip--' + r.tone}>
              <span className="roll-chip__range">{r.range}</span>
              <span className="roll-chip__label">{r.label}</span>
              {r.note && <span className="roll-chip__note">{r.note}</span>}
            </div>
          ))}
        </div>
        <ul className="horror-roll__rules">
          {horrorRoll.rules.map((rule, i) => (
            <li key={i}>{rule}</li>
          ))}
        </ul>
      </details>

      {/* Tracker settings — out of the way, but one tap from the table */}
      <div className="tt-settings fg-panel">
        <label className="tt-settings__toggle">
          <input type="checkbox" checked={extremeMode} onChange={(e) => setExtreme(e.target.checked)} />
          <span>
            <strong>Extreme Horror Mode</strong>
            <span className="tt-settings__hint">5 Time per turn and the harsher Horror track</span>
          </span>
        </label>
        <button
          className={'fg-btn fg-btn--small' + (confirmReset ? ' fg-btn--danger' : '')}
          onClick={handleReset}
          title="Clears the turn, counters and every captured event"
        >
          {confirmReset ? 'Tap again to wipe the tracker' : 'Reset tracker'}
        </button>
      </div>
    </div>
  );
}
