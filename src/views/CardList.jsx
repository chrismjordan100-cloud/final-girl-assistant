import { useMemo, useState } from 'react';
import { getCatalogue, STATUS_META, SERIES_ORDER, SERIES_LABEL, CARD_IMAGE_FOLDER } from '../lib/cardCatalogue.js';
import './CardList.css';

/* ==========================================================================
   Codex → "All cards": a text-only list of every known card per Killer,
   Location and Final Girl, with missing details flagged on each card and each
   box. Image slots show where a card picture can be added later
   (see src/lib/cardCatalogue.js for the file naming).
   ========================================================================== */

const KIND_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'killer', label: 'Killers' },
  { id: 'location', label: 'Locations' },
  { id: 'finalgirl', label: 'Final Girls' },
];
const KIND_LABEL = { killer: 'Killer', location: 'Location', finalgirl: 'Final Girl' };

function StatusBadge({ status }) {
  if (status === 'ok') return null;
  return <span className={'cl-badge cl-badge--' + status}>{STATUS_META[status].label}</span>;
}

function ImageSlot({ image, file, show }) {
  if (image) {
    return (
      <a className="cl-thumb" href={image} target="_blank" rel="noreferrer" title="Open the card image">
        <img src={image} alt="" loading="lazy" />
      </a>
    );
  }
  if (!show || !file) return null;
  return (
    <span className="cl-slot" title={`Add ${CARD_IMAGE_FOLDER}${file} to show the card here`}>
      No image &middot; <code>{file}</code>
    </span>
  );
}

function itemStats(c) {
  const bits = [];
  if (c.range != null) bits.push(`Range ${c.range}`);
  if (c.damage != null) bits.push(`Damage ${c.damage}`);
  if (c.hands != null) bits.push(`${c.hands} hand${String(c.hands) === '1' ? '' : 's'}`);
  if (c.uses != null) bits.push(`${c.uses} use${String(c.uses) === '1' ? '' : 's'}`);
  if (c.bonusHealth != null) bits.push(`Bonus Health ${c.bonusHealth}`);
  return bits.join(' · ');
}

function CardRow({ c, showSlots }) {
  const stats = itemStats(c);
  return (
    <li className={'cl-card cl-card--' + c.status}>
      <div className="cl-card__main">
        <div className="cl-card__head">
          <span className="cl-card__name">{c.name}</span>
          {c.qty > 1 && <span className="cl-card__qty">&times;{c.qty}</span>}
          {c.epic && <span className="cl-badge cl-badge--epic">Epic</span>}
          {c.minorDarkPower && <span className="cl-badge cl-badge--mdp">Minor Dark Power</span>}
          {c.variant && <span className="cl-badge">{c.variant}</span>}
          <StatusBadge status={c.status} />
        </div>
        {c.effect ? (
          <p className="cl-card__effect">{c.effect}</p>
        ) : (
          <p className="cl-card__missing">{c.note}</p>
        )}
        {c.effect && c.note && <p className="cl-card__note">{c.note}</p>}
        {(stats || (c.tags && c.tags.length)) && (
          <p className="cl-card__stats">
            {stats}
            {stats && c.tags && c.tags.length ? ' · ' : ''}
            {c.tags && c.tags.join(', ')}
          </p>
        )}
        {c.recipe && <p className="cl-card__stats">Recipe: {Array.isArray(c.recipe) ? c.recipe.join(' + ') : String(c.recipe)}</p>}
        {c.sourceUrl && (
          <a className="cl-card__src" href={c.sourceUrl} target="_blank" rel="noreferrer">wiki page &#8599;</a>
        )}
      </div>
      <ImageSlot image={c.image} file={c.imageFile} show={showSlots} />
    </li>
  );
}

function OwnerSummaryBadges({ o }) {
  return (
    <span className="cl-owner__badges">
      <span className="cl-owner__count">{o.cardCount} card{o.cardCount === 1 ? '' : 's'}</span>
      {o.dataStatus !== 'complete' && (
        <span className={'cl-badge cl-badge--' + (o.dataStatus === 'missing' ? 'no-text' : 'paraphrase')}>
          {o.dataStatus === 'missing' ? 'No card data' : 'Incomplete list'}
        </span>
      )}
      {o.gaps.noText > 0 && <span className="cl-badge cl-badge--no-text">{o.gaps.noText} missing text</span>}
      {o.gaps.paraphrase > 0 && <span className="cl-badge cl-badge--paraphrase">{o.gaps.paraphrase} paraphrased</span>}
      {o.imageCount > 0 && <span className="cl-badge cl-badge--img">{o.imageCount} image{o.imageCount === 1 ? '' : 's'}</span>}
    </span>
  );
}

export default function CardList() {
  const cat = useMemo(() => getCatalogue(), []);
  const [kind, setKind] = useState('all');
  const [query, setQuery] = useState('');
  const [gapsOnly, setGapsOnly] = useState(false);
  const [showSlots, setShowSlots] = useState(false);
  const [open, setOpen] = useState({}); // owner key -> bool
  const q = query.trim().toLowerCase();

  // A card shows if it passes the gaps filter AND (no search, its Killer /
  // Location matched the search, or the card's own name / text matched).
  const cardShown = (c, ownerHit) =>
    (!gapsOnly || c.status !== 'ok') &&
    (!q || ownerHit || (c.name + ' ' + (c.effect || '')).toLowerCase().includes(q));

  // Filter owners → groups → cards, keeping only owners with something to show.
  const sections = useMemo(() => {
    const owners = [
      ...(kind === 'all' || kind === 'killer' ? cat.killers : []),
      ...(kind === 'all' || kind === 'location' ? cat.locations : []),
    ];
    const filtered = owners
      .map((o) => {
        const ownerHit = !q || o.name.toLowerCase().includes(q) || (o.box || '').toLowerCase().includes(q);
        const groups = o.groups
          .map((g) => ({ ...g, cards: g.cards.filter((c) => cardShown(c, ownerHit)) }))
          .filter((g) => g.cards.length);
        const ownerGap = o.dataStatus !== 'complete' || o.knownGaps.length > 0;
        const keep = groups.length > 0 || (ownerHit && (!gapsOnly || ownerGap));
        return keep ? { ...o, groups } : null;
      })
      .filter(Boolean);
    const girls =
      kind === 'all' || kind === 'finalgirl'
        ? cat.finalGirls.filter(
            (g) =>
              (!gapsOnly || g.missing.length) &&
              (!q || (g.name + ' ' + (g.ultimate || '') + ' ' + (g.box || '')).toLowerCase().includes(q)),
          )
        : [];
    return SERIES_ORDER.map((s) => ({
      series: s,
      owners: filtered.filter((o) => o.series === s),
      girls: girls.filter((g) => g.series === s),
    })).filter((s) => s.owners.length || s.girls.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, kind, q, gapsOnly]);

  const searching = q.length > 0;
  const isOpen = (key) => searching || !!open[key];
  const toggle = (key) => setOpen((o) => ({ ...o, [key]: !o[key] }));
  const t = cat.totals;

  return (
    <div className="cl">
      <p className="cl-intro fg-type">
        Every card we know of, as text. Cards with missing details are flagged so you can
        fill them in over time. Source: the community Final Girl wiki and published reviews
        &mdash; check against your physical cards.
      </p>

      <div className="cl-totals" role="status">
        <span><strong>{t.cards}</strong> cards</span>
        <span className="cl-totals--ok"><strong>{t.ok}</strong> complete</span>
        <span className="cl-totals--no-text"><strong>{t.noText}</strong> rules text missing</span>
        <span className="cl-totals--paraphrase"><strong>{t.paraphrase}</strong> paraphrased</span>
        <span className="cl-totals--diagram"><strong>{t.diagram}</strong> setup diagrams</span>
        <span><strong>{t.images}</strong> with images</span>
      </div>

      <details className="cl-knowngaps">
        <summary>Known gaps in the card data ({cat.knownGaps.length})</summary>
        <ul>
          {cat.knownGaps.map((g) => <li key={g}>{g}</li>)}
        </ul>
        <p className="fg-type">
          Adding card images: put a picture in <code>{CARD_IMAGE_FOLDER}</code> named after the
          card (tick &ldquo;Show image slots&rdquo; to see each card&rsquo;s file name). It appears
          here after the next build.
        </p>
      </details>

      <div className="cl-controls">
        <div className="cl-kinds" role="group" aria-label="Show">
          {KIND_FILTERS.map((k) => (
            <button key={k.id} type="button" className={'cl-kind' + (kind === k.id ? ' is-active' : '')} onClick={() => setKind(k.id)}>
              {k.label}
            </button>
          ))}
        </div>
        <input
          className="cl-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search cards, rules text, killers, locations..."
          aria-label="Search cards"
        />
        <label className="cl-check">
          <input type="checkbox" checked={gapsOnly} onChange={(e) => setGapsOnly(e.target.checked)} />
          Only show missing details
        </label>
        <label className="cl-check">
          <input type="checkbox" checked={showSlots} onChange={(e) => setShowSlots(e.target.checked)} />
          Show image slots
        </label>
      </div>

      {sections.length === 0 && <p className="cx-empty fg-type">Nothing matches that filter.</p>}

      {sections.map((sec) => (
        <section key={sec.series} className="cl-series">
          <h2 className="cl-series__title">{SERIES_LABEL[sec.series] || sec.series}</h2>

          {sec.owners.map((o) => {
            const key = o.kind + ':' + o.id;
            const expanded = isOpen(key);
            return (
              <div key={key} className={'cl-owner cl-owner--' + o.kind + (o.dataStatus !== 'complete' ? ' has-gaps' : '')}>
                <button type="button" className="cl-owner__head" onClick={() => toggle(key)} aria-expanded={expanded}>
                  <span className="cl-owner__caret" aria-hidden="true">{expanded ? '▼' : '▶'}</span>
                  <span className="cl-owner__kind">{KIND_LABEL[o.kind]}</span>
                  <span className="cl-owner__name">{o.name}</span>
                  <OwnerSummaryBadges o={o} />
                </button>
                {expanded && (
                  <div className="cl-owner__body">
                    {o.box && <p className="cl-owner__meta fg-type">From {o.box}{o.stats && o.stats.health != null ? ` · Health ${o.stats.health}` : ''}{o.stats && o.stats.horror != null ? ` · Starting Horror ${o.stats.horror}` : ''}</p>}
                    {(o.dataStatus !== 'complete' || o.knownGaps.length > 0) && (
                      <div className="cl-owner__gaps">
                        <strong>Missing details:</strong>
                        <ul>
                          {o.dataStatus === 'missing' && <li>No card data has been published for this box yet.</li>}
                          {o.dataStatus === 'partial' && <li>The card list is incomplete &mdash; some cards or names aren&rsquo;t recorded.</li>}
                          {o.knownGaps.map((g) => <li key={g}>{g}</li>)}
                        </ul>
                      </div>
                    )}
                    {o.notes && <p className="cl-owner__notes">{o.notes}</p>}
                    {o.groups.length === 0 && <p className="cl-card__missing">No cards listed.</p>}
                    {o.groups.map((g) => (
                      <div key={g.key} className="cl-group">
                        <h3 className="cl-group__title">{g.label} <span className="cl-group__count">{g.cards.length}</span></h3>
                        <ul className="cl-cards">
                          {g.cards.map((c, i) => <CardRow key={(c.id || 'x') + i} c={c} showSlots={showSlots} />)}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {sec.girls.length > 0 && (() => {
            const key = 'fg:' + sec.series;
            const expanded = isOpen(key);
            const gapCount = sec.girls.filter((g) => g.missing.length).length;
            return (
              <div className="cl-owner cl-owner--finalgirl">
                <button type="button" className="cl-owner__head" onClick={() => toggle(key)} aria-expanded={expanded}>
                  <span className="cl-owner__caret" aria-hidden="true">{expanded ? '▼' : '▶'}</span>
                  <span className="cl-owner__kind">Final Girls</span>
                  <span className="cl-owner__name">{SERIES_LABEL[sec.series] || sec.series}</span>
                  <span className="cl-owner__badges">
                    <span className="cl-owner__count">{sec.girls.length}</span>
                    {gapCount > 0 && <span className="cl-badge cl-badge--no-text">{gapCount} missing details</span>}
                  </span>
                </button>
                {expanded && (
                  <ul className="cl-cards cl-owner__body">
                    {sec.girls.map((g) => (
                      <li key={g.id} className={'cl-card' + (g.missing.length ? ' cl-card--no-text' : '')}>
                        <div className="cl-card__main">
                          <div className="cl-card__head">
                            <span className="cl-card__name">{g.name}</span>
                            {g.missing.length > 0 && <span className="cl-badge cl-badge--no-text">Missing: {g.missing.join(', ')}</span>}
                          </div>
                          {g.box && <p className="cl-card__stats">{g.box}{g.health != null ? ` · Health ${g.health}` : ''}{g.victimsForUltimate != null ? ` · Ultimate after ${g.victimsForUltimate} saved` : ''}</p>}
                          {g.ultimate && <p className="cl-card__effect"><strong>Ultimate:</strong> {g.ultimate}</p>}
                          {g.saveRewards && <p className="cl-card__effect"><strong>Save rewards:</strong> {g.saveRewards}</p>}
                          {g.unlockable && (
                            <p className="cl-card__effect">
                              <strong>Unlockable item &mdash; {typeof g.unlockable === 'string' ? g.unlockable : g.unlockable.name}:</strong>{' '}
                              {typeof g.unlockable === 'object' && g.unlockable.effect ? g.unlockable.effect : ''}
                            </p>
                          )}
                          {g.sourceUrl && <a className="cl-card__src" href={g.sourceUrl} target="_blank" rel="noreferrer">wiki page &#8599;</a>}
                        </div>
                        <ImageSlot image={g.image} file={g.imageFile} show={showSlots} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })()}
        </section>
      ))}
    </div>
  );
}
