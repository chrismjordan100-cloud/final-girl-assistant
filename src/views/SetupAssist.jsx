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
  getOfficialFinalGirls,
  finalGirlCardStatus,
  getFinalGirlEnvelopeImage,
} from '../data/games.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import { useFgCollection, storageFor, envelopeStatus, hasMissingComponents } from '../hooks/useFgCollection.js';
import { finalGirlUnlockableName } from '../data/cardData.js';
import IconSelect from '../components/IconSelect.jsx';
import BestFits from '../components/BestFits.jsx';
import { writePersistent } from '../hooks/usePersistentState.js';
import SetupCapture from '../components/SetupCapture.jsx';
import { useGameFlow } from '../hooks/useGameFlow.js';
import { useTurnState } from '../hooks/useTurnState.js';
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

export default function SetupAssist({ onNavigate }) {
  const [done, setDone] = useState(loadProgress);
  const { active, canStart, start } = useGameFlow();
  const { state: turnState, patch: patchTurns } = useTurnState();
  const extremeMode = Boolean(turnState.extreme);

  // Start straight from setup and jump to the Turn Tracker.
  function startAndPlay(isTest) {
    start(isTest);
    if (onNavigate) onNavigate('turn');
  }

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

  // Favourites (starred in the Codex) and where the chosen Final Girl is kept.
  const collection = useFgCollection();
  const pickedGirl = finalGirlGroups.flatMap(([, girls]) => girls).find((g) => g.id === finalGirlId) || null;
  const pickedStorage = pickedGirl ? storageFor(pickedGirl, collection.storage).text : null;
  const killerExtras = getSetupExtras(killer);
  const locationExtras = getSetupExtras(location);
  const hasExtras = killerExtras.length > 0 || locationExtras.length > 0;

  // Her Secret Envelope is open (you only open it after a win), so her own item
  // is now available: remind the player to bring it in. "Opened" is only ever
  // set by the player in the Codex, so demo-mode wins can't trigger this.
  const envelopeOpened = Boolean(pickedGirl)
    && envelopeStatus(pickedGirl.id, 0, collection.envelopes).status === 'opened';
  const girlItem = envelopeOpened ? finalGirlUnlockableName(pickedGirl) : null;
  const girlItemImg = envelopeOpened ? getFinalGirlEnvelopeImage(pickedGirl) : null;
  const girlExtras = envelopeOpened
    ? [{
        title: `Bring in ${girlItem || 'her Secret Envelope item'}`,
        body: `${pickedGirl.name} has won before and her Secret Envelope is open, so her own item is available. Take ${girlItem ? 'it' : 'the item card'} out of the envelope and bring it into this game. Her item card shows how she uses it.`,
      }]
    : [];

  // Which selections alter the core Item-deck step (s11). Used to warn there.
  const itemChangers = [killer, location].filter((e) => changesItemDecks(e));
  const itemDeckChanged = itemChangers.length > 0;
  const itemDeckChangedBy = itemChangers.map((e) => e.name).join(' and ');

  // Official (canon) Final Girls for the chosen Killer / Location, matched by
  // the Feature Film they share. Shown as a hint — any Final Girl is still
  // playable with any combo.
  const officialGirls = getOfficialFinalGirls(killer, location);
  const hasOfficialGirls = officialGirls.killer.length > 0 || officialGirls.location.length > 0;

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

  const specialSetupBlock = (killer || location || girlExtras.length > 0) ? (
    <section className="setup-group setup-group--special fg-panel">
      <header className="setup-group__head">
        <span className="setup-group__num setup-group__num--special" aria-hidden="true">!</span>
        <div>
          <h2 className="setup-group__title">Special Setup for This Game</h2>
          <p className="setup-group__blurb">
            {killer || location
              ? <>Your chosen Killer and Location change how some core steps work (especially
                how the Item decks are built). Read these BEFORE the Item &amp; component
                steps below.</>
              : <>Extra steps for your chosen Final Girl. Do these alongside the Item &amp;
                component steps below.</>}
          </p>
        </div>
      </header>

      {girlExtras.length > 0 && (
        <SpecialSetupList
          kind="finalgirl"
          label="Final Girl"
          entryName={pickedGirl.name}
          steps={girlExtras}
          done={done}
          onToggle={toggle}
        />
      )}

      {(killer || location) && !hasExtras && (
        <p className="setup-extra__none fg-type">
          {killer && location
            ? `Neither ${killer.name} nor ${location.name} adds any ${girlExtras.length ? 'other ' : ''}special setup — just follow the core steps below.`
            : `${(killer || location).name} adds no ${girlExtras.length ? 'other ' : ''}special setup — just follow the core steps below.`}
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
                      {step.id === 's3' && (
                        <label className="setup-extreme" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={extremeMode}
                            onChange={(e) => patchTurns({ extreme: e.target.checked, time: e.target.checked ? 5 : 6 })}
                          />
                          <span>Playing Extreme Horror Mode (the Turn Tracker gives you 5 Time per turn)</span>
                        </label>
                      )}
                      {step.id === 's6' && (
                        <p className="callout setup-step__tip setup-step__signature">
                          <strong>Optional (Box of Props):</strong> add ONE Signature Action card to
                          the Tableau as an extra card you can buy &mdash; choose one or pick at
                          random. It behaves like any Action card. See &ldquo;Signature Action
                          cards&rdquo; in Rules Reference &rarr; Add-ons.
                        </p>
                      )}
                      {step.id === 's12' && <SetupCapture only="setup" />}
                      {step.id === 's18' && <SetupCapture only="event-start" />}
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
                                girls.map((g) => {
                                  // Missing components (from her Codex "Stored in") beats
                                  // the card-image status: always red, with a note.
                                  const missing = hasMissingComponents(g, collection.storage);
                                  return {
                                    id: g.id,
                                    name: (collection.isFavourite(g.id) ? '\u2605 ' : '') + g.name,
                                    group,
                                    dot: missing ? 'missing' : finalGirlCardStatus(g),
                                    note: missing ? 'missing components' : undefined,
                                  };
                                })
                              )}
                            />
                          </div>
                          {pickedGirl && (
                            <p className="game-picker__stored">
                              &#128230; <strong>{pickedGirl.name}</strong> is stored in:{' '}
                              <strong>{pickedStorage || 'not set yet'}</strong>
                              {!pickedStorage && (
                                <span className="fg-type"> &mdash; set it on her card in the Codex.</span>
                              )}
                            </p>
                          )}
                          {girlItemImg && (
                            <figure className="game-picker__envitem">
                              <img src={girlItemImg} alt={`${pickedGirl.name}'s Secret Envelope item card`} />
                              <figcaption className="fg-type">&#9993; Her Secret Envelope item (opened)</figcaption>
                            </figure>
                          )}
                          {(killer || location) && (
                            <div className="game-picker__official">
                              {hasOfficialGirls ? (
                                <>
                                  <span className="game-picker__official-title">
                                    Official Final Girls for this game:
                                  </span>
                                  {officialGirls.killer.length > 0 && (
                                    <span className="game-picker__official-line">
                                      <span className="setup-extra__badge setup-extra__badge--killer">Killer</span>
                                      {killer.name}: {officialGirls.killer.join(', ')}
                                    </span>
                                  )}
                                  {officialGirls.location.length > 0 && (
                                    <span className="game-picker__official-line">
                                      <span className="setup-extra__badge setup-extra__badge--location">Location</span>
                                      {location.name}: {officialGirls.location.join(', ')}
                                    </span>
                                  )}
                                  <span className="game-picker__official-note fg-type">
                                    You can still pick any Final Girl &mdash; any of them plays with any Killer and Location.
                                  </span>
                                </>
                              ) : (
                                <span className="game-picker__official-note fg-type">
                                  No official Final Girl is tied to this{' '}
                                  {killer && location ? 'Killer or Location' : killer ? 'Killer' : 'Location'} &mdash; pick whichever you like.
                                </span>
                              )}
                            </div>
                          )}
                          {(killer || location) && (
                            <BestFits
                              killerId={killerId}
                              locationId={locationId}
                              officialNames={[...officialGirls.killer, ...officialGirls.location]}
                              selectedId={finalGirlId}
                              onPick={setFinalGirl}
                              isFavourite={collection.isFavourite}
                              onOpenGrid={onNavigate ? () => { writePersistent('fg-codex-tab', 'fit'); onNavigate('codex'); } : undefined}
                            />
                          )}
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

      {/* Straight from the last setup step into the game */}
      <div className="setup-start fg-panel">
        {active ? (
          <>
            <p className="setup-start__text">A game is already in progress.</p>
            {onNavigate && (
              <button className="fg-btn fg-btn--primary" onClick={() => onNavigate('turn')}>
                Go to the Turn Tracker &rarr;
              </button>
            )}
          </>
        ) : canStart ? (
          <>
            <p className="setup-start__text">Set up? Start the game and open the Turn Tracker.</p>
            <div className="setup-start__btns">
              <button className="fg-btn" onClick={() => startAndPlay(true)} title="Never affects Achievements or MI">
                &#9654; Start test
              </button>
              <button className="fg-btn fg-btn--primary" onClick={() => startAndPlay(false)}>
                &#9760; Start real game
              </button>
            </div>
          </>
        ) : (
          <p className="setup-start__text">Choose your Killer, Location and Final Girl in the first steps to start a game.</p>
        )}
      </div>
    </div>
  );
}
