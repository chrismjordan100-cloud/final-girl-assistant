import { useMemo, useState } from 'react';
import {
  killers,
  locations,
  generalTips,
  killerTips,
  locationTips,
  normaliseTip,
  getIcon,
} from '../data/games.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import { getKiller, getLocation } from '../data/games.js';
import IconSelect from '../components/IconSelect.jsx';
import './Tips.css';

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'killer', label: 'By Killer' },
  { id: 'location', label: 'By Location' },
];

/* A single tip: the advice text, plus its source and confidence tag. */
function TipItem({ tip }) {
  const t = normaliseTip(tip);
  return (
    <li className="tips-item">
      <span className="tips-item__text">{t.text}</span>
      {(t.source || t.confidence) && (
        <span className="tips-item__meta">
          {t.confidence && (
            <span className={'tips-badge tips-badge--' + t.confidence}>
              {t.confidence === 'confirmed' ? 'Confirmed' : 'Reported'}
            </span>
          )}
          {t.source && <span className="tips-item__source">{t.source}</span>}
        </span>
      )}
    </li>
  );
}

export default function Tips() {
  const { killerId, locationId } = useGameSelection();
  const currentKiller = getKiller(killerId);
  const currentLocation = getLocation(locationId);

  const [tab, setTab] = useState('general');
  // For the By-Killer / By-Location tabs, which entry is selected to view.
  const [killerView, setKillerView] = useState(killerId || (killers[0] && killers[0].id));
  const [locationView, setLocationView] = useState(locationId || (locations[0] && locations[0].id));

  const killerEntry = useMemo(() => killers.find((k) => k.id === killerView), [killerView]);
  const locationEntry = useMemo(() => locations.find((l) => l.id === locationView), [locationView]);

  const killerList = killerEntry ? (killerTips[killerEntry.id] || []) : [];
  const locationList = locationEntry ? (locationTips[locationEntry.id] || []) : [];

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">Survive smarter</p>
        <h1>Tips</h1>
        <p className="lead">
          Strategy advice grounded in how the game actually works &mdash; general play
          plus pointers for each Killer and Location.
        </p>
      </div>

      {(currentKiller || currentLocation) && (
        <p className="tips-current fg-type">
          This game: {currentKiller ? <strong>{currentKiller.name}</strong> : <em>no Killer</em>}
          {' @ '}
          {currentLocation ? <strong>{currentLocation.name}</strong> : <em>no Location</em>}.
          {' '}See the By-Killer / By-Location tabs for specifics.
        </p>
      )}

      <div className="tips-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            className={'tips-tab' + (tab === t.id ? ' is-active' : '')}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'general' && (
        <div className="stack">
          {generalTips.map((group) => (
            <section key={group.category} className="tips-group fg-panel">
              <h2 className="tips-group__title">{group.category}</h2>
              <ul className="tips-list">
                {group.items.map((t, i) => (
                  <TipItem key={i} tip={t} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      {tab === 'killer' && (
        <div>
          <div className="tips-picker">
            <span className="tips-picker__label">Killer</span>
            <IconSelect
              ariaLabel="Choose a Killer"
              value={killerView || ''}
              onChange={setKillerView}
              options={killers.map((k) => ({
                id: k.id,
                name: k.name,
                icon: getIcon('killer', k),
                note: k.id === killerId ? 'this game' : undefined,
              }))}
            />
          </div>
          <section className="tips-group fg-panel">
            <h2 className="tips-group__title">
              {killerEntry && getIcon('killer', killerEntry) && (
                <img className="tips-group__icon" src={getIcon('killer', killerEntry)} alt="" aria-hidden="true" />
              )}
              {killerEntry ? killerEntry.name : ''}
            </h2>
            {killerList.length > 0 ? (
              <ul className="tips-list">
                {killerList.map((t, i) => <TipItem key={i} tip={t} />)}
              </ul>
            ) : (
              <p className="tips-empty fg-type">No specific tips recorded yet for this Killer.</p>
            )}
          </section>
        </div>
      )}

      {tab === 'location' && (
        <div>
          <div className="tips-picker">
            <span className="tips-picker__label">Location</span>
            <IconSelect
              ariaLabel="Choose a Location"
              value={locationView || ''}
              onChange={setLocationView}
              options={locations.map((l) => ({
                id: l.id,
                name: l.name,
                icon: getIcon('location', l),
                note: l.id === locationId ? 'this game' : undefined,
              }))}
            />
          </div>
          <section className="tips-group fg-panel">
            <h2 className="tips-group__title">
              {locationEntry && getIcon('location', locationEntry) && (
                <img className="tips-group__icon" src={getIcon('location', locationEntry)} alt="" aria-hidden="true" />
              )}
              {locationEntry ? locationEntry.name : ''}
            </h2>
            {locationList.length > 0 ? (
              <ul className="tips-list">
                {locationList.map((t, i) => <TipItem key={i} tip={t} />)}
              </ul>
            ) : (
              <p className="tips-empty fg-type">No specific tips recorded yet for this Location.</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
