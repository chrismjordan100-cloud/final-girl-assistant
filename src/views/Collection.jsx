import { useMemo, useState } from 'react';
import { COLLECTION_GROUPS, COLLECTION_ITEMS } from '../data/collection.js';
import { useFgCollection } from '../hooks/useFgCollection.js';
import './Collection.css';

/* Codex "Collection" tab: every Final Girl box, add-on, promo and accessory,
   split by series (or generic), with a have / don't-have tick on each. */

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'have', label: 'Have' },
  { id: 'missing', label: 'Missing' },
];

export default function Collection() {
  const { owned, setOwned } = useFgCollection();
  const [filter, setFilter] = useState('all');
  const [closed, setClosed] = useState({});

  const isOwned = (item) =>
    Object.prototype.hasOwnProperty.call(owned, item.id) ? owned[item.id] : Boolean(item.owned);

  const groups = useMemo(
    () =>
      COLLECTION_GROUPS.map((g) => {
        const all = COLLECTION_ITEMS.filter((i) => i.group === g.id);
        const have = all.filter(isOwned).length;
        const shown = all.filter((i) =>
          filter === 'all' ? true : filter === 'have' ? isOwned(i) : !isOwned(i),
        );
        return { ...g, all, have, shown };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [owned, filter],
  );

  const total = COLLECTION_ITEMS.length;
  const haveTotal = COLLECTION_ITEMS.filter(isOwned).length;

  return (
    <div className="col">
      <div className="col-bar">
        <p className="col-bar__count">
          <strong>{haveTotal}</strong> of {total} owned
        </p>
        <div className="col-bar__filters" role="group" aria-label="Show">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={'col-filter' + (filter === f.id ? ' is-on' : '')}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {groups.map((g) => {
        if (g.shown.length === 0) return null;
        const isClosed = !!closed[g.id];
        return (
          <section key={g.id} className="col-group">
            <button
              type="button"
              className="col-group__title"
              aria-expanded={!isClosed}
              onClick={() => setClosed((c) => ({ ...c, [g.id]: !c[g.id] }))}
            >
              <span className="col-group__caret" aria-hidden="true">{isClosed ? '▶' : '▼'}</span>
              {g.label}
              <span className="col-group__count">
                {g.have}/{g.all.length}
              </span>
            </button>
            {!isClosed && (
              <ul className="col-list">
                {g.shown.map((item) => {
                  const have = isOwned(item);
                  return (
                    <li key={item.id} className={'col-item' + (have ? ' is-have' : ' is-missing')}>
                      <label className="col-item__tick">
                        <input
                          type="checkbox"
                          checked={have}
                          onChange={(e) => setOwned(item.id, e.target.checked, item.owned)}
                          aria-label={`I have ${item.name}`}
                        />
                        <span className="col-item__box" aria-hidden="true">{have ? '✔' : ''}</span>
                      </label>
                      <div className="col-item__body">
                        <p className="col-item__head">
                          <span className="col-item__name">{item.name}</span>
                          <span className="col-item__kind">{item.kind}</span>
                        </p>
                        <p className="col-item__what">{item.what}</p>
                        <p className="col-item__where">
                          <span className="col-item__label">Where:</span> {item.where}
                        </p>
                        {item.worth && !have && (
                          <p className="col-item__worth">
                            <span className="col-item__label">Worth it?</span> {item.worth}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}

      {groups.every((g) => g.shown.length === 0) && (
        <p className="cx-empty fg-type">
          {filter === 'have' ? 'Nothing ticked yet.' : 'You have everything listed here.'}
        </p>
      )}

      <p className="col-note fg-type">
        Compiled November 2026 from Van Ryder Games and retailer listings. Kickstarter
        exclusives and items only found inside other boxes are included, with where to
        find them.
      </p>
    </div>
  );
}
