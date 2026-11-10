import { useMemo, useState } from 'react';
import {
  killers,
  locations,
  finalGirls,
  narration,
  getArtImage,
  getFlavourImage,
  getImage,
  getPlayRules,
  getFinalGirlCards,
  getFinalGirlEnvelopeImage,
  getIcon,
} from '../data/games.js';
import { useGameSelection } from '../hooks/useGameSelection.js';
import { useFgCollection, storageFor, defaultStorage, storageSuggestions, envelopeStatus, winsByFinalGirl, resultsByKillerLocation } from '../hooks/useFgCollection.js';
import { useGameLog } from '../hooks/useGameLog.js';
import { ENVELOPE_ITEMS, envelopeItemImpact } from '../data/fgFit.js';
import CardList from './CardList.jsx';
import FitGrid from './FitGrid.jsx';
import FitSummary from './FitSummary.jsx';
import { usePersistentState } from '../hooks/usePersistentState.js';
import ImageZoom from '../components/ImageZoom.jsx';
import './Codex.css';

const TABS = [
  { id: 'killer', label: 'Killers' },
  { id: 'location', label: 'Locations' },
  { id: 'finalgirl', label: 'Final Girls' },
  { id: 'fit', label: 'Fit grid' },
  { id: 'fitsum', label: 'Fit summary' },
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
function EntryCard({ type, entry, selected, onPick, result }) {
  const art = getArtImage(type, entry);
  const flavourImg = getFlavourImage(type, entry);
  // Locations also show their board / map (Codex only, not This Game).
  const board = type === 'location' ? getImage('location', entry, 'board') : null;
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
          <h3 className="cx-card__name">
            {entry.name}
            {result === 'beaten' && (
              <span className="cx-result cx-result--beaten" title="Beaten" aria-label="Beaten">{'\u2714'}</span>
            )}
            {result === 'lost' && (
              <span className="cx-result cx-result--lost" title="Played, not beaten yet" aria-label="Played, not beaten yet">{'\u2716'}</span>
            )}
          </h3>
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
        {type === 'location' && (
          board ? (
            <figure className="cx-card__board">
              <img src={board} alt={`${entry.name} board`} loading="lazy" />
              <figcaption className="fg-type">The board</figcaption>
            </figure>
          ) : (
            <div className="cx-card__board cx-card__board--missing fg-type">
              Board / map not yet provided
            </div>
          )
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

/* "Stored in" line for a Final Girl, with a small inline editor. By default
   she lives in her own Feature Film box; set a place for special editions. */
function StoredIn({ entry, collection }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const { text, isDefault } = storageFor(entry, collection.storage);
  const fallback = defaultStorage(entry);
  const listId = 'cx-store-' + entry.id;

  function start() {
    setDraft(isDefault ? '' : text);
    setEditing(true);
  }
  function save(value) {
    collection.setStorage(entry.id, value);
    setEditing(false);
  }

  if (editing) {
    return (
      <form className="cx-store cx-store--edit" onSubmit={(e) => { e.preventDefault(); save(draft); }}>
        <label className="cx-store__label" htmlFor={listId + '-in'}>&#128230; Stored in</label>
        <input
          id={listId + '-in'}
          className="cx-store__input"
          list={listId}
          value={draft}
          autoFocus
          placeholder={fallback || 'e.g. Promo binder, Guest Stars box'}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Escape') setEditing(false); }}
        />
        <datalist id={listId}>
          {storageSuggestions(collection.storage).map((s) => <option key={s} value={s} />)}
        </datalist>
        <div className="cx-store__actions">
          <button type="submit" className="fg-btn fg-btn--small fg-btn--primary">Save</button>
          {fallback && (
            <button type="button" className="fg-btn fg-btn--small" onClick={() => save('')}>
              Her own box
            </button>
          )}
          <button type="button" className="fg-btn fg-btn--small" onClick={() => setEditing(false)}>Cancel</button>
        </div>
      </form>
    );
  }

  return (
    <p className={'cx-store' + (text ? '' : ' is-unset')}>
      <span className="cx-store__label">&#128230; Stored in</span>{' '}
      <span className="cx-store__value">{text || 'not set yet'}</span>
      <button type="button" className="cx-store__edit" onClick={start}>
        {text ? 'Change' : 'Set'}
      </button>
    </p>
  );
}

/* Her Secret Envelope. Automatic: a logged win (not a test game) unlocks it.
   Overrides: "Won before the tracker" (still sealed) and "Opened". */
function EnvelopeMarker({ entry, wins, collection }) {
  const { status, source } = envelopeStatus(entry.id, wins, collection.envelopes);
  const set = (v) => collection.setEnvelope(entry.id, v);

  if (status === 'unlocked') {
    return (
      <div className="cx-env cx-env--unlocked" role="status">
        <p className="cx-env__title">&#9993;&#65039; Envelope unlocked &mdash; open her Secret Envelope!</p>
        <p className="cx-env__why fg-type">
          {source === 'log'
            ? `You’ve won ${wins === 1 ? 'a game' : wins + ' games'} with ${entry.name}.`
            : `Marked by you: won before the tracker, envelope still sealed.`}
        </p>
        <div className="cx-env__actions">
          <button type="button" className="cx-env__btn cx-env__btn--main" onClick={() => set('opened')}>
            I&rsquo;ve opened it
          </button>
          {source === 'manual' && (
            <button type="button" className="cx-env__btn" onClick={() => set(null)}>Undo</button>
          )}
        </div>
      </div>
    );
  }

  if (status === 'opened') {
    // Only an opened envelope ever shows its item card.
    const itemImg = getFinalGirlEnvelopeImage(entry);
    return (
      <>
        <p className="cx-env cx-env--opened">
          <span>&#9993; Envelope opened</span>
          <button type="button" className="cx-env__link" onClick={() => set(wins > 0 ? 'unlocked' : null)}>
            Not opened yet?
          </button>
        </p>
        {(itemImg || ENVELOPE_ITEMS[entry.id]) && (
          <div className="cx-env__itemrow">
            {itemImg && (
              <figure className="cx-env__item">
                <img src={itemImg} alt={`${entry.name}'s Secret Envelope item card`} loading="lazy" />
                <figcaption className="fg-type">Her Secret Envelope item</figcaption>
              </figure>
            )}
            <EnvelopeItemNotes entry={entry} />
          </div>
        )}
      </>
    );
  }

  return (
    <p className="cx-env cx-env--sealed">
      <span>&#128274; Envelope sealed &mdash; win with her to open it</span>
      <button type="button" className="cx-env__link" onClick={() => set('unlocked')}>
        Already won?
      </button>
      <button type="button" className="cx-env__link" onClick={() => set('opened')}>
        Already opened?
      </button>
    </p>
  );
}

/* Notes beside an OPENED envelope item: hand-written tips from the item card,
   plus where the fit engine says it lifts her score most. Only rendered from
   the opened branch of EnvelopeMarker, so sealed items never show. */
function EnvelopeItemNotes({ entry }) {
  const item = ENVELOPE_ITEMS[entry.id];
  const impact = useMemo(() => envelopeItemImpact(entry.id, killers, locations), [entry.id]);
  if (!item) {
    return (
      <div className="cx-env__notes fg-type">
        <p>Not assessed yet, so it doesn&rsquo;t count in her fit scores.</p>
      </div>
    );
  }
  const fmt = (x) => `${x.name} (+${x.lift.toFixed(1)})`;
  const share = impact && impact.total ? impact.raised / impact.total : 0;
  const reach = !impact || impact.raised === 0
    ? 'It doesn\u2019t change her fit scores anywhere.'
    : share >= 0.75
      ? `Useful almost everywhere: it raises her score in ${impact.raised} of ${impact.total} Killer \u00d7 Location combos (+${impact.avgLift.toFixed(1)} on average).`
      : share >= 0.25
        ? `Useful in some games, big in a few: it raises her score in ${impact.raised} of ${impact.total} combos and does nothing in the rest.`
        : `Only useful in a few games: it raises her score in ${impact.raised} of ${impact.total} combos and does nothing in the rest.`;
  return (
    <div className="cx-env__notes">
      <p className="cx-env__notes-title">About her item</p>
      <ul>
        {(item.notes || [item.why]).map((n) => <li key={n}>{n}</li>)}
      </ul>
      <p className="cx-env__notes-reach">{reach}</p>
      {impact && impact.even && impact.raised > 0 && (
        <p className="cx-env__notes-top">About the same small lift against every Killer and at every Location.</p>
      )}
      {impact && !impact.even && impact.killers.length > 0 && (
        <p className="cx-env__notes-top"><strong>Helps most against:</strong> {impact.killers.map(fmt).join(', ')}</p>
      )}
      {impact && !impact.even && impact.locations.length > 0 && (
        <p className="cx-env__notes-top"><strong>Helps most at:</strong> {impact.locations.map(fmt).join(', ')}</p>
      )}
    </div>
  );
}

/* A Final Girl card: both card faces (front = base, back = Ultimate Ability),
   so you can compare abilities when choosing. */
function FinalGirlCard({ entry, selected, onPick, collection, wins }) {
  const { front, back } = getFinalGirlCards(entry);
  const blurb = narration.finalGirls[entry.id] || null;
  const fav = collection.isFavourite(entry.id);

  return (
    <article className={'cx-fg fg-panel' + (selected ? ' is-selected' : '') + (fav ? ' is-fav' : '')}>
      <header className="cx-card__head">
        <button
          type="button"
          className={'cx-fav' + (fav ? ' is-on' : '')}
          onClick={() => collection.toggleFavourite(entry.id)}
          aria-pressed={fav}
          aria-label={fav ? `Remove ${entry.name} from favourites` : `Add ${entry.name} to favourites`}
          title={fav ? 'Favourite \u2014 tap to remove' : 'Mark as a favourite'}
        >
          {fav ? '\u2605' : '\u2606'}
        </button>
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
      <EnvelopeMarker entry={entry} wins={wins} collection={collection} />
      <StoredIn entry={entry} collection={collection} />
      {blurb && <p className="cx-card__flavour">{blurb}</p>}
      {!front && !back ? (
        <p className="cx-fg__missing cx-fg__missing--both fg-type">Card images not added yet (front and Ultimate Ability)</p>
      ) : (
      <div className="cx-fg__faces">
        <figure className={'cx-fg__face' + (front ? '' : ' is-missing')}>
          {front ? (
            <img src={front} alt={`${entry.name} card front`} loading="lazy" />
          ) : (
            <div className="cx-fg__missing fg-type">Front not added</div>
          )}
          <figcaption className="fg-type">Front</figcaption>
        </figure>
        <figure className={'cx-fg__face' + (back ? '' : ' is-missing')}>
          {back ? (
            <img src={back} alt={`${entry.name} Ultimate Ability (back)`} loading="lazy" />
          ) : (
            <div className="cx-fg__missing fg-type">Back not added</div>
          )}
          <figcaption className="fg-type">Ultimate Ability</figcaption>
        </figure>
      </div>
      )}
    </article>
  );
}

export default function Codex({ onNavigate }) {
  const [tab, setTab] = usePersistentState('fg-codex-tab', 'killer');
  const [query, setQuery] = useState('');
  const [collapsed, setCollapsed] = useState({}); // section key -> true if collapsed
  const q = query.trim().toLowerCase();

  // While a filter is active, keep everything expanded so matches are visible.
  const filtering = q.length > 0;
  const isCollapsed = (key) => !filtering && !!collapsed[key];
  const toggle = (key) => setCollapsed((c) => ({ ...c, [key]: !c[key] }));

  const { finalGirlId, killerId, locationId, setFinalGirl, setKiller, setLocation } =
    useGameSelection();
  const collection = useFgCollection();
  const [favsOnly, setFavsOnly] = useState(false);
  const [envOnly, setEnvOnly] = useState(false);
  const { log } = useGameLog();
  const wins = useMemo(() => winsByFinalGirl(log), [log]);
  const results = useMemo(() => resultsByKillerLocation(log), [log]);
  const isUnlocked = (id) => envelopeStatus(id, wins[id] || 0, collection.envelopes).status === 'unlocked';
  const unlockedCount = finalGirls.filter((fg) => isUnlocked(fg.id)).length;

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
      if (favsOnly && !collection.favourites.includes(fg.id)) continue;
      if (envOnly && !isUnlocked(fg.id)) continue;
      const key = fg.group || 'Other';
      if (!map[key]) {
        map[key] = [];
        order.push(key);
      }
      map[key].push(fg);
    }
    return order.map((key) => ({ group: key, entries: map[key] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, favsOnly, envOnly, collection.favourites, collection.envelopes, wins]);

  return (
    <ImageZoom>
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
        {tab !== 'cards' && tab !== 'fit' && tab !== 'fitsum' && <div className="cx-search">
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

      {tab === 'finalgirl' && (
        <div className="cx-favbar">
          <button
            type="button"
            className={'cx-favbar__toggle' + (favsOnly ? ' is-on' : '')}
            aria-pressed={favsOnly}
            onClick={() => setFavsOnly((v) => !v)}
          >
            {favsOnly ? '\u2605' : '\u2606'} Favourites only ({collection.favourites.length})
          </button>
          <button
            type="button"
            className={'cx-favbar__toggle cx-favbar__toggle--env' + (envOnly ? ' is-on' : '') + (unlockedCount ? ' has-some' : '')}
            aria-pressed={envOnly}
            onClick={() => setEnvOnly((v) => !v)}
          >
            &#9993;&#65039; Envelopes to open ({unlockedCount})
          </button>
          <span className="cx-favbar__hint fg-type">
            Tap the star on a Final Girl to make her a favourite.
          </span>
        </div>
      )}

      {tab === 'cards' && <CardList />}
      {tab === 'fit' && <FitGrid />}
        {tab === 'fitsum' && <FitSummary />}

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
                    result={results.killer[e.id]}
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
                    result={results.location[e.id]}
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
                    collection={collection}
                    wins={wins[e.id] || 0}
                  />
                ))}
              </div>
            </CollapsibleSection>
          );
        })}

      {((tab === 'killer' && grouped(killers).length === 0) ||
        (tab === 'location' && grouped(locations).length === 0) ||
        (tab === 'finalgirl' && fgGroups.length === 0)) && (
        <p className="cx-empty fg-type">
          {tab === 'finalgirl' && favsOnly && collection.favourites.length === 0
            ? 'No favourites yet \u2014 tap the \u2606 on any Final Girl to add her.'
            : tab === 'finalgirl' && envOnly && unlockedCount === 0
              ? 'No envelopes waiting. Win with a Final Girl (or tap \u201cAlready won?\u201d on her card) and she\u2019ll show here.'
              : 'Nothing matches that filter.'}
        </p>
      )}
    </ImageZoom>
  );
}
