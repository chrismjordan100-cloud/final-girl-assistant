import { useMemo } from 'react';
import {
  killers,
  locations,
  finalGirls,
  getOfficialScenario,
  getIcon,
} from '../data/games.js';
import { useGameLog } from '../hooks/useGameLog.js';
import CollapsibleSection from '../components/CollapsibleSection.jsx';
import './ScenarioMatrix.css';

/* Status of a Killer+Location combo from the real-game log. */
function comboStatus(realLog, killerId, locationId) {
  const games = realLog.filter(
    (g) => g.killerId === killerId && g.locationId === locationId
  );
  if (games.length === 0) return 'never';
  if (games.some((g) => g.outcome === 'won')) return 'won';
  // played but no win (lost/abandoned only)
  return games.some((g) => g.outcome === 'lost') ? 'lost' : 'played';
}

const STATUS_LABEL = {
  won: 'Beaten',
  lost: 'Played, not beaten',
  played: 'Played (no decisive loss)',
  never: 'Never played',
};

export default function ScenarioMatrix() {
  const { log } = useGameLog();
  const realLog = useMemo(() => log.filter((g) => !g.isTest), [log]);

  // Never-played lists.
  const neverKL = [];
  for (const k of killers) {
    for (const l of locations) {
      if (comboStatus(realLog, k.id, l.id) === 'never') {
        neverKL.push({ k, l, official: getOfficialScenario(k, l) });
      }
    }
  }

  // Count of KL+FinalGirl combos never played is astronomically large, so we
  // only surface the ones you've actually touched plus a reminder of scale.
  const playedTriples = useMemo(() => {
    const seen = new Set();
    for (const g of realLog) {
      if (g.killerId && g.locationId && g.finalGirlId) {
        seen.add(`${g.killerId}|${g.locationId}|${g.finalGirlId}`);
      }
    }
    return seen;
  }, [realLog]);

  const totalTriples = killers.length * locations.length * finalGirls.length;
  const officialPairs = killers
    .map((k) => {
      const l = locations.find((loc) => getOfficialScenario(k, loc));
      return l ? { k, l, name: getOfficialScenario(k, l).name } : null;
    })
    .filter(Boolean);

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">The checklist of carnage</p>
        <h1>Scenarios</h1>
        <p className="lead">
          Every Killer against every Location. Green = beaten, red = played but not yet
          beaten, amber = never played. Official scenarios (canon pairings) are starred.
          Real games only.
        </p>
      </div>

      <div className="sm-legend">
        <span className="sm-legend__item"><span className="sm-dot sm-dot--won" /> Beaten</span>
        <span className="sm-legend__item"><span className="sm-dot sm-dot--lost" /> Played, not beaten</span>
        <span className="sm-legend__item"><span className="sm-dot sm-dot--never" /> Never played</span>
        <span className="sm-legend__item"><span className="sm-star">&#9733;</span> Official scenario</span>
      </div>

      <CollapsibleSection title="The grid">
      <div className="sm-scroll">
        <table className="sm-table">
          <thead>
            <tr>
              <th className="sm-corner" scope="col">Killer \ Location</th>
              {locations.map((l) => {
                const icon = getIcon('location', l);
                return (
                  <th key={l.id} scope="col" className="sm-colhead">
                    {icon && <img className="sm-colhead__icon" src={icon} alt="" aria-hidden="true" />}
                    <span className="sm-colhead__label">{l.name}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {killers.map((k) => (
              <tr key={k.id}>
                <th scope="row" className="sm-rowhead">
                  {getIcon('killer', k) && (
                    <img className="sm-rowhead__icon" src={getIcon('killer', k)} alt="" aria-hidden="true" />
                  )}
                  <span className="sm-rowhead__name">{k.name}</span>
                </th>
                {locations.map((l) => {
                  const status = comboStatus(realLog, k.id, l.id);
                  const official = getOfficialScenario(k, l);
                  return (
                    <td
                      key={l.id}
                      className={'sm-cell sm-cell--' + status + (official ? ' is-official' : '')}
                      title={
                        (official ? `${official.name} (official) — ` : '') +
                        `${k.name} @ ${l.name}: ${STATUS_LABEL[status]}`
                      }
                    >
                      {official && <span className="sm-cell__star" aria-hidden="true">&#9733;</span>}
                      <span className="sm-cell__mark" aria-hidden="true">
                        {status === 'won' ? '\u2713' : status === 'never' ? '\u2013' : '\u2717'}
                      </span>
                      <span className="visually-hidden">
                        {k.name} at {l.name}: {STATUS_LABEL[status]}
                        {official ? ` (official scenario: ${official.name})` : ''}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </CollapsibleSection>

      <CollapsibleSection title="Official scenarios" count={`${officialPairs.length}`}>
        <ul className="sm-official-list">
          {officialPairs.map(({ k, l, name }) => {
            const status = comboStatus(realLog, k.id, l.id);
            return (
              <li key={name} className={'sm-official sm-official--' + status}>
                <span className="sm-official__name">&#9733; {name}</span>
                <span className="sm-official__combo fg-type">{k.name} @ {l.name}</span>
                <span className={'sm-official__status sm-official__status--' + status}>
                  {STATUS_LABEL[status]}
                </span>
              </li>
            );
          })}
        </ul>
      </CollapsibleSection>

      <CollapsibleSection
        title="Never played — Killer × Location"
        count={`${neverKL.length} of ${killers.length * locations.length}`}
      >
        {neverKL.length === 0 ? (
          <p className="fg-type">You&rsquo;ve played every Killer/Location combo at least once. Impressive.</p>
        ) : (
          <ul className="sm-never-list">
            {neverKL.map(({ k, l, official }) => (
              <li key={k.id + l.id} className="sm-never">
                {official && <span className="sm-star">&#9733;</span>}
                {k.name} <span className="sm-never__at">@</span> {l.name}
                {official && <span className="sm-never__official">{official.name}</span>}
              </li>
            ))}
          </ul>
        )}
      </CollapsibleSection>

      <CollapsibleSection title="Killer × Location × Final Girl">
        <p className="fg-type sm-triples">
          You&rsquo;ve played <strong>{playedTriples.size}</strong> distinct three-way
          combos out of <strong>{totalTriples.toLocaleString()}</strong> possible. With a
          roster this size, "never played" three-way combos are effectively the whole
          space — so this tracks what you <em>have</em> done rather than listing the rest.
        </p>
      </CollapsibleSection>
    </div>
  );
}
