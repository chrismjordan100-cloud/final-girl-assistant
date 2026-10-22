import { Fragment, useEffect, useMemo, useState } from 'react';
import { setupGroups } from '../data/rules.js';
import {
  killers,
  locations,
  getFinalGirlGroups,
  getKiller,
  getLocation,
  getSetupExtras,
  changesItemDecks,
  getIcon,
} from '../data/games.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import IconSelect from '../components/IconSelect.jsx';
import SetupCapture from '../components/SetupCapture.jsx';
import './SetupAssist.css';

const finalGirlGroups = getFinalGirlGroups();

const STORAGE_KEY = 'fg-setup-progress';
const PROGRESS_EVENT = 'fg-setup-progress-change';

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function SpecialSetupList({ kind, label, entryName, steps, done, onToggle }) {
  return (
    <div className="setup-extra">
      <div className={'setup-extra__badge setup-extra__badge--' + kind}>
        {label}: {entryName}
      </div>
      <ol className="setup-steps">
        {steps.map((step, i) => {
          const id = `extra:${kind}:${entryName}:${i}`;
          const isDone = !!done[id];
          return (
            <li key={id} className={'setup-step' + (isDone ? ' is-done' : '')}>
              <label className="setup-step__label">
                <input type="checkbox" checked={isDone} onChange={() => onToggle(id)} />
                <span className="setup-step__box" aria-hidden="true" />
                <span className="setup-step__text">
                  <span className="setup-step__title">
                    {step.title}
                    {step.itemDeck && (
                      <span className="setup-step__itemflag">Item decks</span>
                    )}
                  </span>
                  <span className="setup-step__body">{step.body}</span>
                  {step.watchOut && (
                    <span className="callout callout--note setup-step__watch">
                      &#9888; {step.watchOut}
                    </span>
                  )}
                </span>
              </label>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function SetupAssist() {
  const [done, setDone] = useState(loadProgress);

  // Refresh the checklist if progress is cleared elsewhere (e.g. Home's
  // "Clear this game" button).
  useEffect(() => {
    const onCleared = () => setDone(loadProgress());
    window.addEventListener(PROGRESS_EVENT, onCleared);
    return () => window.removeEventListener(PROGRESS_EVENT, onCleared);
  }, []);

  const {
    finalGirlId,
    killerId,
    locationId,
    setFinalGirl,
    setKiller,
    setLocation,
  } = useGameSelection();

  const allSteps = useMemo(
    () => setupGroups.flatMap((g) => g.steps.map((s) => s.id)),
    []
  );
  const completedCount = allSteps.filter((id) => done[id]).length;
  const pct = Math.round((completedCount / allSteps.length) * 100);

  // Special setup steps for the currently-selected Killer / Location.
  const killer = getKiller(killerId);
  const location = getLocation(locationId);
  const killerExtras = getSetupExtras(killer);
  const locationExtras = getSetupExtras(location);
  const hasExtras = killerExtras.length > 0 || locationExtras.length > 0;

  // Which selections alter the core Item-deck step (s11). Used to warn there.
  const itemChangers = [killer, location].filter((e) => changesItemDecks(e));
  const itemDeckChanged = itemChangers.length > 0;
  const itemDeckChangedBy = itemChangers.map((e) => e.name).join(' and ');

  function persist(next) {
    setDone(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore storage failures (e.g. private mode) */
    }
  }

  function toggle(id) {
    persist({ ...done, [id]: !done[id] });
  }

  function reset() {
    persist({});
  }

  const specialSetupBlock = (killer || location) ? (
    <section className="setup-group setup-group--special fg-panel">
      <header className="setup-group__head">
        <span className="setup-group__num setup-group__num--special" aria-hidden="true">!</span>
        <div>
          <h2 className="setup-group__title">Special Setup for This Game</h2>
          <p className="setup-group__blurb">
            Your chosen Killer and Location change how some core steps work (especially
            how the Item decks are built). Read these BEFORE the Item &amp; component
            steps below.
          </p>
        </div>
      </header>

      {!hasExtras && (
        <p className="setup-extra__none fg-type">
          {killer && location
            ? `Neither ${killer.name} nor ${location.name} adds any special setup — just follow the core steps below.`
            : (killer
                ? `${killer.name} adds no special setup — just follow the core steps below.`
                : `${location.name} adds no special setup — just follow the core steps below.`)}
        </p>
      )}

      {killerExtras.length > 0 && (
        <SpecialSetupList
          kind="killer"
          label="Killer"
          entryName={killer.name}
          steps={killerExtras}
          done={done}
          onToggle={toggle}
        />
      )}
      {locationExtras.length > 0 && (
        <SpecialSetupList
          kind="location"
          label="Location"
          entryName={location.name}
          steps={locationExtras}
          done={done}
          onToggle={toggle}
        />
      )}
    </section>
  ) : null;

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">Before the screaming starts</p>
        <h1>Setup Assist</h1>
        <p className="lead">
          Work through each step to set the stage for your nightmare. Your progress is
          saved on this device, so you can set up at your own pace.
        </p>
      </div>

      <div className="setup-progress fg-panel" role="status" aria-live="polite">
        <div className="setup-progress__bar">
          <div className="setup-progress__fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="setup-progress__meta">
          <span>{completedCount} / {allSteps.length} steps</span>
          <button className="fg-btn setup-reset" onClick={reset} disabled={completedCount === 0}>
            Reset
          </button>
        </div>
      </div>

      {/* Capture the setup variant + starting event as you build the game. */}
      <SetupCapture heading="Record setup &amp; starting event as you go" />

      <div className="stack" style={{ marginTop: '1.5rem' }}>
        {setupGroups.map((group, gi) => {
          const groupDone = group.steps.every((s) => done[s.id]);
          return (
            <Fragment key={group.id}>
            <section className="setup-group fg-panel">
              <header className="setup-group__head">
                <span className="setup-group__num" aria-hidden="true">{gi + 1}</span>
                <div>
                  <h2 className="setup-group__title">
                    {group.title}
                    {groupDone && <span className="setup-group__check" aria-label="group complete"> &#10003;</span>}
                  </h2>
                  <p className="setup-group__blurb">{group.blurb}</p>
                </div>
              </header>

              <ol className="setup-steps">
                {group.steps.map((step) => {
                  const isDone = !!done[step.id];
                  return (
                    <li key={step.id} className={'setup-step' + (isDone ? ' is-done' : '')}>
                      <label className="setup-step__label">
                        <input
                          type="checkbox"
                          checked={isDone}
                          onChange={() => toggle(step.id)}
                        />
                        <span className="setup-step__box" aria-hidden="true" />
                        <span className="setup-step__text">
                          <span className="setup-step__title">{step.title}</span>
                          <span className="setup-step__body">{step.body}</span>
                          {step.tip && (
                            <span className="callout setup-step__tip">{step.tip}</span>
                          )}
                        </span>
                      </label>
                      {step.id === 's2' && (
                        <div className="game-picker" onClick={(e) => e.stopPropagation()}>
                          <div className="game-picker__field">
                            <span className="game-picker__label">Final Girl</span>
                            <IconSelect
                              ariaLabel="Choose a Final Girl"
                              placeholder={'\u2014 choose a Final Girl \u2014'}
                              value={finalGirlId || ''}
                              onChange={setFinalGirl}
                              options={finalGirlGroups.flatMap(([group, girls]) =>
                                girls.map((g) => ({ id: g.id, name: g.name, group }))
                              )}
                            />
                          </div>
                          <p className="game-picker__hint fg-type">
                            Picking your Final Girl shows her card on the
                            &ldquo;This Game&rdquo; tab.
                          </p>
                        </div>
                      )}
                      {step.id === 's11' && itemDeckChanged && (
                        <p className="callout callout--note setup-step__itemwarn">
                          &#9888; {itemDeckChangedBy} change how the Item decks are built —
                          see &ldquo;Special Setup for This Game&rdquo; (just after Choose
                          Your Nightmare) before doing this step.
                        </p>
                      )}
                      {step.id === 's1' && (
                        <div className="game-picker" onClick={(e) => e.stopPropagation()}>
                          <div className="game-picker__field">
                            <span className="game-picker__label">Killer</span>
                            <IconSelect
                              ariaLabel="Choose a Killer"
                              placeholder={'\u2014 choose a Killer \u2014'}
                              value={killerId || ''}
                              onChange={setKiller}
                              options={killers.map((k) => ({
                                id: k.id,
                                name: k.name,
                                icon: getIcon('killer', k),
                              }))}
                            />
                          </div>
                          <div className="game-picker__field">
                            <span className="game-picker__label">Location</span>
                            <IconSelect
                              ariaLabel="Choose a Location"
                              placeholder={'\u2014 choose a Location \u2014'}
                              value={locationId || ''}
                              onChange={setLocation}
                              options={locations.map((l) => ({
                                id: l.id,
                                name: l.name,
                                icon: getIcon('location', l),
                              }))}
                            />
                          </div>
                          <p className="game-picker__hint fg-type">
                            Your picks unlock the &ldquo;This Game&rdquo; tab, which shows
                            the extra rules for this Killer and Location.
                          </p>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
            {gi === 0 && specialSetupBlock}
            </Fragment>
          );
        })}
      </div>

      {pct === 100 && (
        <div className="setup-done fg-panel" role="alert">
          <h2 className="fg-title-slash">You are ready to begin.</h2>
          <p className="fg-type">The killer is waiting. Good luck.</p>
        </div>
      )}
    </div>
  );
}
