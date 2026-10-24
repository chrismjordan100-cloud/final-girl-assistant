import { useMemo, useState } from 'react';
import {
  killers,
  locations,
  finalGirls,
  narration,
  getArtImage,
  getFlavourImage,
  getPlayRules,
  getFinalGirlCards,
  getIcon,
} from '../data/games.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import CardList from './CardList.jsx';
import './Codex.css';

const TABS = [
  { id: 'killer', label: 'Killers' },
  { id: 'location', label: 'Locations' },
  { id: 'finalgirl', label: 'Final Girls' },
  { id: 'cards', label: 'All cards (text)' },
];

/* A collapsible section with a clickable header showing a count. */
function CollapsibleSection({ title, count, collapsed, onToggle, children }) {
  return (
    <section className="cx-section">
      <button
        className="cx-section__title"
        onClick={onToggle}
        aria-expanded={!collapsed}
      >
        <span className="cx-section__caret" aria-hidden="true">
          {collapsed ? '\u25B6' : '\u25BC'}
        </span>
        {title}
        <span className="cx-section__count">{count}</span>
      </button>
      {!collapsed && children}
    </section>
  );
}

/* A browsable card for a Killer or Location: art, flavour image, flavour
   text (where written), and the at-a-glance play-rules summary. */
function EntryCard({ type, entry, selected, onPick }) {
  const art = getArtImage(type, entry);
  const flavourImg = getFlavourImage(type, entry);
  const flavourText =
    (type === 'killer' ? narration.killers[entry.id] : narration.locations[entry.id]) || null;
  const rules = getPlayRules(entry);
  const hasRules = Boolean(rules && rules.points && rules.points.length > 0);
  const icon = getIcon(type, entry);
  // Detail is hidden by default so the card stays a quick scan of art + flavour.
  const [showDetail, setShowDetail] = useState(false);

  return (
    <article className={'cx-card fg-panel' + (selected ? ' is-selected' : '')}>
      <header className="cx-card__head">
        {icon && <img className="cx-card__icon" src={icon} alt="" aria-hidden="true" loading="lazy" />}
        <div className="cx-card__headmain">
          <h3 className="cx-card__name">{entry.name}</h3>
          <span className="cx-card__meta fg-type">
            {entry.film}
            {entry.isVignette ? ' \u00b7 Vignette' : ''} &middot; S{entry.season}
          </span>
        </div>
        <button
          className={'cx-pick' + (selected ? ' is-selected' : '')}
          onClick={() => onPick(entry)}
          title={selected ? 'Already picked for this game' : `Set as this game\u2019s ${type === 'killer' ? 'Killer' : 'Location'} and open Setup`}
        >
          {selected ? '\u2713 Picked' : 'Play this'}
        </button>
      </header>

      {entry.note && <p className="cx-card__note fg-type">&#9888; {entry.note}</p>}

      <div className="cx-card__media">
        {art ? (
          <img className="cx-card__art" src={art} alt={`${entry.name} key art`} loading="lazy" />
        ) : (
          <div className="cx-card__art cx-card__art--missing fg-type">No art added</div>
        )}
        {flavourImg && (
          <img className="cx-card__flavimg" src={flavourImg} alt={`${entry.name} flavour`} loading="lazy" />
        )}
      </div>

      {flavourText && <p className="cx-card__flavour">{flavourText}</p>}

      {hasRules && (
        <div className="cx-card__rules">
          <button
            className="cx-card__rules-toggle"
            onClick={() => setShowDetail((v) => !v)}
            aria-expanded={showDetail}
          >
            <span className="cx-card__rules-caret" aria-hidden="true">
              {showDetail ? '\u25BC' : '\u25B6'}
            </span>
            At a glance
            <span className="cx-card__rules-hint fg-type">
              {showDetail ? 'Hide' : `${rules.points.length} rule${rules.points.length === 1 ? '' : 's'}`}
            </span>
          </button>
          {showDetail && (
            <>
              <ul className="cx-card__points">
                {rules.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
              {rules.watchOuts && rules.watchOuts.length > 0 && (
                <ul className="cx-card__watch">
                  {rules.watchOuts.map((w, i) => (
                    <li key={i}>&#9888; {w}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </article>
  );
}

/* A Final Girl card: both card faces (front = base, back = Ultimate Ability),
   so you can compare abilities when choosing. */
function FinalGirlCard({ entry, selected, onPick }) {
  const { front, back } = getFinalGirlCards(entry);
  const blurb = narration.finalGirls[entry.id] || null;

  return (
    <article className={'cx-fg fg-panel' + (selected ? ' is-selected' : '')}>
      <header className="cx-card__head">
        <div className="cx-card__headmain">
          <h3 className="cx-card__name">{entry.name}</h3>
          <span className="cx-card__meta fg-type">{entry.film}</span>
        </div>
        <button
          className={'cx-pick' + (selected ? ' is-selected' : '')}
          onClick={() => onPick(entry)}
          title={selected ? 'Already picked for this game' : 'Set as this game\u2019s Final Girl and open Setup'}
        >
          {selected ? '\u2713 Picked' : 'Play this'}
        </button>
      </header>
      {entry.note && <p className="cx-card__note fg-type">&#9888; {entry.note}</p>}
      {blurb && <p className="cx-card__flavour">{blurb}</p>}
      <div className="cx-fg__faces">
        <figure className="cx-fg__face">
          {front ? (
            <img src={front} alt={`${entry.name} card front`} loading="lazy" />
          ) : (
            <div className="cx-fg__missing fg-type">Front not added</div>
          )}
          <figcaption className="fg-type">Front</figcaption>
        </figure>
        <figure className="cx-fg__face">
          {back ? (
            <img src={back} alt={`${entry.name} Ultimate Ability (back)`} loading="lazy" />
          ) : (
            <div className="cx-fg__missing fg-type">Back not added</div>
          )}
          <figcaption className="fg-type">Ultimate Ability</figcaption>
        </figure>
      </div>
    </article>
  );
}

export default function Codex({ onNavigate }) {
  const [tab, setTab] = useState('killer');
  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState({}); // section key -> true if collapsed
  const q = query.trim().toLowerCase();

  // While a filter is active, keep everything expanded so matches are visible.
  const filtering = q.length > 0;
  const isCollapsed = (key) => !filtering && !!collapsed[key];
  const toggle = (key) => setCollapsed((c) => ({ ...c, [key]: !c[key] }));

  const { finalGirlId, killerId, locationId, setFinalGirl, setKiller, setLocation } =
    useGameSelection();

  // Pick an entry for "This Game" and jump to Setup Assist.
  function pickKiller(entry) {
    setKiller(entry.id);
    onNavigate && onNavigate('setup');
  }
  function pickLocation(entry) {
    setLocation(entry.id);
    onNavigate && onNavigate('setup');
  }
  function pickFinalGirl(entry) {
    setFinalGirl(entry.id);
    onNavigate && onNavigate('setup');
  }

  const matches = (e) =>
    !q || (e.name + ' ' + e.film + ' ' + (e.group || '')).toLowerCase().includes(q);

  // Killers and Locations grouped by season (ascending).
  const grouped = (items) => {
    const list = items.filter(matches);
    const bySeason = {};
    for (const e of list) (bySeason[e.season] ||= []).push(e);
    return Object.keys(bySeason)
      .map(Number)
      .sort((a, b) => a - b)
      .map((season) => ({ season, entries: bySeason[season] }));
  };

  // Final Girls grouped by their `group` label (Series 1, Vignettes, etc.),
  // preserving the order they appear in the data.
  const fgGroups = useMemo(() => {
    const order = [];
    const map = {};
    for (const fg of finalGirls) {
      if (!matches(fg)) continue;
      const key = fg.group || 'Other';
      if (!map[key]) {
        map[key] = [];
        order.push(key);
      }
      map[key].push(fg);
    }
    return order.map((key) => ({ group: key, entries: map[key] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div>
      <div className="view-head">
        <p className="section-eyebrow">Know your night</p>
        <h1>Codex</h1>
        <p className="lead">
          Browse every Killer, Location and Final Girl at a glance &mdash; art, flavour and
          the key rules, plus both ability sides of each Final Girl to help you choose.
        </p>
      </div>

      <div className="cx-controls">
        <div className="cx-tabs" role="tablist">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={'cx-tab' + (tab === t.id ? ' is-active' : '')}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tab !== 'cards' && <div className="cx-search">
          <span className="cx-search__icon" aria-hidden="true">&#128269;</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name or film..."
            aria-label="Filter"
          />
          {query && (
            <button className="cx-search__clear" onClick={() => setQuery('')} aria-label="Clear filter">
              &times;
            </button>
          )}
        </div>}
      </div>

      {tab === 'cards' && <CardList />}

      {tab === 'killer' &&
        grouped(killers).map((grp) => {
          const key = 'killer-s' + grp.season;
          return (
            <CollapsibleSection
              key={key}
              title={`Season ${grp.season}`}
              count={grp.entries.length}
              collapsed={isCollapsed(key)}
              onToggle={() => toggle(key)}
            >
              <div className="cx-grid">
                {grp.entries.map((e) => (
                  <EntryCard
                    key={e.id}
                    type="killer"
                    entry={e}
                    selected={e.id === killerId}
                    onPick={pickKiller}
                  />
                ))}
              </div>
            </CollapsibleSection>
          );
        })}

      {tab === 'location' &&
        grouped(locations).map((grp) => {
          const key = 'location-s' + grp.season;
          return (
            <CollapsibleSection
              key={key}
              title={`Season ${grp.season}`}
              count={grp.entries.length}
              collapsed={isCollapsed(key)}
              onToggle={() => toggle(key)}
            >
              <div className="cx-grid">
                {grp.entries.map((e) => (
                  <EntryCard
                    key={e.id}
                    type="location"
                    entry={e}
                    selected={e.id === locationId}
                    onPick={pickLocation}
                  />
                ))}
              </div>
            </CollapsibleSection>
          );
        })}

      {tab === 'finalgirl' &&
        fgGroups.map((grp) => {
          const key = 'fg-' + grp.group;
          return (
            <CollapsibleSection
              key={key}
              title={grp.group}
              count={grp.entries.length}
              collapsed={isCollapsed(key)}
              onToggle={() => toggle(key)}
            >
              <div className="cx-grid cx-grid--fg">
                {grp.entries.map((e) => (
                  <FinalGirlCard
                    key={e.id}
                    entry={e}
                    selected={e.id === finalGirlId}
                    onPick={pickFinalGirl}
                  />
                ))}
              </div>
            </CollapsibleSection>
          );
        })}

      {((tab === 'killer' && grouped(killers).length === 0) ||
        (tab === 'location' && grouped(locations).length === 0) ||
        (tab === 'finalgirl' && fgGroups.length === 0)) && (
        <p className="cx-empty fg-type">Nothing matches that filter.</p>
      )}
    </div>
  );
}
