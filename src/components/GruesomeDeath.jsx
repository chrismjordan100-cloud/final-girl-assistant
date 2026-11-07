import { useEffect, useMemo, useRef, useState } from 'react';
import {
  deathOptions, passagesFor, rollGeneral, pickRandom, drawPassage,
  kindLabel, variantLabel,
} from '../lib/gruesomeDeaths.js';
import './GruesomeDeath.css';

/* ==========================================================================
   Gruesome Death popup. Opens when a Victim dies in the Turn Tracker and
   shows the matching passage from Van Ryder's free Gruesome Death book, as
   an image cut from their PDF.

   Props:
     killerId, locationId - this game's combo (app ids)
     turnEvents           - events logged this turn (to find the card that
                            caused the death)
     seen                 - passage ids already shown this game
     onSeen(id)           - remember a passage as shown
     onClose()
   ========================================================================== */
export default function GruesomeDeath({ killerId, locationId, turnEvents, seen = [], onSeen, onClose }) {
  const ctx = useMemo(
    () => deathOptions({ killerId, locationId, turnEvents }),
    // Work out the situation once, when the popup opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const all = useMemo(() => passagesFor(killerId, locationId), [killerId, locationId]);
  const killerGroups = ctx.generalGroups.filter((g) => !g.isHazard);
  const hazardGroups = ctx.generalGroups.filter((g) => g.isHazard);

  // mode: 'card' (from a logged card) | 'general' (rolled) | 'manual' (picked)
  const [mode, setMode] = useState(ctx.options.length ? 'card' : 'general');
  const [groupKey, setGroupKey] = useState(killerGroups[0]?.key || hazardGroups[0]?.key || null);
  const [current, setCurrent] = useState(null); // { entry, die }
  const [status, setStatus] = useState('loading'); // loading | ready | error
  const [error, setError] = useState('');
  const canvasRef = useRef(null);
  const boxRef = useRef(null);

  const group = ctx.generalGroups.find((g) => g.key === groupKey) || null;

  function show(entry, die = null) {
    if (!entry) return;
    setCurrent({ entry, die });
    if (onSeen) onSeen(entry.id);
  }

  function rollFor(g) {
    if (!g) return;
    const { entry, die } = rollGeneral(g, seen);
    show(entry, die);
  }

  // First passage when the popup opens.
  useEffect(() => {
    if (ctx.options.length) show(pickRandom(ctx.options, seen));
    else if (group) rollFor(group);
    else setStatus('empty');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Draw whenever the passage changes.
  useEffect(() => {
    if (!current || !canvasRef.current) return undefined;
    let cancelled = false;
    setStatus('loading');
    const width = Math.min(640, (boxRef.current?.clientWidth || 360));
    drawPassage(current.entry, canvasRef.current, width)
      .then(() => { if (!cancelled) setStatus('ready'); })
      .catch((err) => {
        if (cancelled) return;
        setError(err && err.message ? err.message : String(err));
        setStatus('error');
      });
    return () => { cancelled = true; };
  }, [current]);

  // Escape closes.
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const e = current?.entry;
  let why = '';
  if (e) {
    if (mode === 'card' && ctx.trigger) why = `From the card you logged: ${ctx.trigger.detail}`;
    else if (e.kind === 'general') why = `${e.variant ? variantLabel(e.variant) + ' · ' : ''}General Kill${current.die ? ` — rolled a ${current.die}` : ''}`;
    else why = kindLabel(e.kind);
  }

  // Grouped list for "pick a different one".
  const pickList = useMemo(() => {
    const byKind = new Map();
    all.forEach((p) => {
      const k = p.kind === 'general' ? `General Kills${p.variant ? ' — ' + variantLabel(p.variant) : ''}` : kindLabel(p.kind) + (p.killer ? '' : ' (Location)');
      if (!byKind.has(k)) byKind.set(k, []);
      byKind.get(k).push(p);
    });
    return [...byKind.entries()];
  }, [all]);

  return (
    <div className="gd-overlay" role="dialog" aria-modal="true" aria-label="Gruesome Death" onClick={onClose}>
      <div className="gd-modal" onClick={(ev) => ev.stopPropagation()}>
        <header className="gd-head">
          <h2 className="gd-title">&#9760; Gruesome Death</h2>
          <button type="button" className="gd-close" onClick={onClose} aria-label="Close">&times;</button>
        </header>

        {why && <p className="gd-why">{why}</p>}

        {/* Card with several passages (e.g. Fire! at different places) */}
        {mode === 'card' && ctx.options.length > 1 && (
          <div className="gd-chips" role="group" aria-label="Which one?">
            {ctx.options.map((o) => (
              <button key={o.id} type="button" className={'gd-chip' + (e && e.id === o.id ? ' is-active' : '')} onClick={() => show(o)}>
                {o.title}
              </button>
            ))}
          </div>
        )}

        {/* General Kill: who did it (forms / members / hazards) */}
        {mode === 'general' && (killerGroups.length > 1 || hazardGroups.length > 0) && (
          <div className="gd-chips" role="group" aria-label="Who or what did it?">
            {[...killerGroups, ...hazardGroups].map((g) => (
              <button
                key={g.key}
                type="button"
                className={'gd-chip' + (g.isHazard ? ' gd-chip--hazard' : '') + (g.key === groupKey ? ' is-active' : '')}
                onClick={() => { setGroupKey(g.key); rollFor(g); }}
              >
                {g.isHazard ? `⚠ ${g.label}` : g.label}
              </button>
            ))}
          </div>
        )}

        <div className="gd-page" ref={boxRef}>
          {status === 'empty' && <p className="gd-msg">There's no passage for this Killer in this Location's book.</p>}
          {status === 'error' && (
            <p className="gd-msg gd-msg--error">
              Couldn&rsquo;t open Van Ryder&rsquo;s book ({error}). Check you&rsquo;re online and try again.
            </p>
          )}
          {status === 'loading' && current && <p className="gd-msg">Opening the book&hellip;</p>}
          <canvas ref={canvasRef} className={'gd-canvas' + (status === 'ready' ? ' is-ready' : '')} />
        </div>

        <footer className="gd-actions">
          {mode === 'general' && group && (
            <button type="button" className="fg-btn fg-btn--small" onClick={() => rollFor(group)}>&#127922; Roll again</button>
          )}
          {mode === 'card' && ctx.options.length > 1 && (
            <button type="button" className="fg-btn fg-btn--small" onClick={() => show(pickRandom(ctx.options.filter((o) => o.id !== e?.id), seen))}>
              Another
            </button>
          )}
          {mode === 'card' && killerGroups.length > 0 && (
            <button type="button" className="fg-btn fg-btn--small" onClick={() => { setMode('general'); rollFor(group); }}>
              It was a General Kill
            </button>
          )}
          <label className="gd-pick">
            <span className="visually-hidden">Pick a different passage</span>
            <select
              value=""
              onChange={(ev) => {
                const hit = all.find((p) => p.id === ev.target.value);
                if (hit) { setMode('manual'); show(hit); }
              }}
            >
              <option value="">Pick a different one&hellip;</option>
              {pickList.map(([label, list]) => (
                <optgroup key={label} label={label}>
                  {list.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <button type="button" className="fg-btn fg-btn--small fg-btn--primary" onClick={onClose}>Done</button>
        </footer>
        <p className="gd-credit">Text &copy; Van Ryder Games, shown from their free Gruesome Death book.</p>
      </div>
    </div>
  );
}
