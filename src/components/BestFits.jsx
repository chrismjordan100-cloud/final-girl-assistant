import { useMemo, useState } from 'react';
import { finalGirls } from '../data/games.js';
import { rankGirls, comboConfidence } from '../data/fgFit.js';
import './BestFits.css';

/* ==========================================================================
   "Best fits for this scenario": the Final Girls whose traits suit the
   chosen Killer + Location, scored out of 10, with the reasons. The official
   girls for the scenario are always shown too, with their own score.

   Props: killerId, locationId, officialNames[], selectedId, onPick(id),
          isFavourite(id), onOpenGrid()
   ========================================================================== */
const TOP = 5;
const lc = (x) => x.charAt(0).toLowerCase() + x.slice(1);
const reasons = (arr) => arr.map((w) => lc(w.replace(/^(Killer|Location): /, ''))).join('; ');

function band(score) {
  if (score >= 7.5) return 'great';
  if (score >= 5) return 'good';
  if (score >= 3) return 'ok';
  return 'poor';
}

function Row({ r, official, selected, fav, onPick }) {
  const [open, setOpen] = useState(false);
  const { fg, fit } = r;
  return (
    <li className={'bf-row' + (selected ? ' is-selected' : '')}>
      <div className="bf-row__main">
        <span className={'bf-score bf-score--' + band(fit.score)} title="Fit score out of 10">
          {fit.score % 1 ? fit.score.toFixed(1) : fit.score}
        </span>
        <span className="bf-name">
          {fav && <span className="bf-fav" title="Favourite">&#9733;</span>}
          {fg.name}
          {official && <span className="bf-tag">Official</span>}
        </span>
        <span className="bf-film fg-type">{fg.film}</span>
        <button type="button" className="bf-why" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? 'Hide why' : 'Why?'}
        </button>
        <button
          type="button"
          className="bf-pick"
          onClick={() => onPick(fg.id)}
          disabled={selected}
        >
          {selected ? '✓ Picked' : 'Pick'}
        </button>
      </div>
      {/* One-line summary always visible */}
      <p className="bf-summary">
        {fit.strengths.length
          ? 'Strong in ' + fit.strengths.slice(0, 3).map((s) => s.label.toLowerCase()).join(', ')
          : 'No standout strengths for this scenario'}
        {fit.specials.length > 0 && ' · special synergy'}
        {fit.gaps.length > 0 && ` · weak at ${fit.gaps[0].label.toLowerCase()}`}
      </p>
      {open && (
        <div className="bf-detail">
          {fit.specials.map((s, i) => (
            <p key={'s' + i} className="bf-line bf-line--special">&#10024; {s.why}</p>
          ))}
          {fit.strengths.map((s) => (
            <div key={s.trait} className="bf-line bf-line--plus">
              <strong>+ {s.label}:</strong> {s.girlWhy}.
              <span className="bf-need"> Matters here because {reasons(s.needWhy)}.</span>
            </div>
          ))}
          {fit.gaps.map((g) => (
            <div key={g.trait} className="bf-line bf-line--minus">
              <strong>&minus; {g.label}:</strong> {g.girlWhy || 'nothing to help'}.
              <span className="bf-need"> This scenario wants it: {reasons(g.needWhy)}.</span>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}

export default function BestFits({ killerId, locationId, officialNames = [], selectedId, onPick, isFavourite, onOpenGrid }) {
  const ranked = useMemo(() => rankGirls(finalGirls, killerId, locationId), [killerId, locationId]);
  const [showAll, setShowAll] = useState(false);
  if (!ranked.length) return null;

  const isOfficial = (r) => officialNames.includes(r.fg.name);
  const top = showAll ? ranked : ranked.slice(0, TOP);
  // Official girls outside the top list still get shown, with their score.
  const extraOfficial = showAll ? [] : ranked.slice(TOP).filter(isOfficial);
  const confidence = comboConfidence(killerId, locationId);

  return (
    <div className="bf" onClick={(e) => e.stopPropagation()}>
      <div className="bf-head">
        <span className="bf-title">Best fits by ability</span>
        <span className="bf-sub fg-type">Scored out of 10 on how well each girl&rsquo;s traits suit this scenario</span>
      </div>
      <ol className="bf-list">
        {top.map((r) => (
          <Row key={r.fg.id} r={r} official={isOfficial(r)} selected={r.fg.id === selectedId} fav={isFavourite && isFavourite(r.fg.id)} onPick={onPick} />
        ))}
      </ol>
      {extraOfficial.length > 0 && (
        <>
          <p className="bf-subhead">The official girls score:</p>
          <ol className="bf-list">
            {extraOfficial.map((r) => (
              <Row key={r.fg.id} r={r} official selected={r.fg.id === selectedId} fav={isFavourite && isFavourite(r.fg.id)} onPick={onPick} />
            ))}
          </ol>
        </>
      )}
      <div className="bf-foot">
        <button type="button" className="fg-btn fg-btn--small" onClick={() => setShowAll((v) => !v)}>
          {showAll ? 'Show top 5' : `Show all ${ranked.length}`}
        </button>
        {onOpenGrid && (
          <button type="button" className="fg-btn fg-btn--small" onClick={onOpenGrid}>See the full fit grid</button>
        )}
        {confidence === 'estimate' && (
          <span className="bf-note fg-type">
            Part of this scenario&rsquo;s profile is an estimate from the rules, not proven strategy. Tweak it as you learn.
          </span>
        )}
      </div>
    </div>
  );
}
