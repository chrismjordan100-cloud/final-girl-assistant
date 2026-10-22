import { useEffect, useRef, useState } from 'react';
import './IconSelect.css';

/* ==========================================================================
   IconSelect — a dropdown that can show a small icon beside each option.

   Native <select>/<option> can't render images, so this is a lightweight
   custom listbox: a button showing the current choice, and a popup list of
   options (each optionally with an icon). Keyboard + click + outside-click
   close are handled; falls back to name-only when an option has no icon.

   Props:
     value      selected option id (or '' for none)
     onChange   (id) => void
     options    [{ id, name, icon?, note?, group? }]
     placeholder  text shown when nothing is selected
     ariaLabel  accessible label
   ========================================================================== */
export default function IconSelect({
  value,
  onChange,
  options,
  placeholder = '\u2014 choose \u2014',
  ariaLabel,
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const selected = options.find((o) => o.id === value) || null;

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  function choose(id) {
    onChange(id);
    setOpen(false);
  }

  // Group options if any carry a `group` label (preserve first-seen order).
  const hasGroups = options.some((o) => o.group);
  let grouped = null;
  if (hasGroups) {
    const order = [];
    const map = {};
    for (const o of options) {
      const key = o.group || '';
      if (!(key in map)) {
        map[key] = [];
        order.push(key);
      }
      map[key].push(o);
    }
    grouped = order.map((key) => ({ group: key, items: map[key] }));
  }

  const renderOption = (o) => (
    <li
      key={o.id}
      role="option"
      aria-selected={o.id === value}
      className={'iconselect__option' + (o.id === value ? ' is-selected' : '')}
      onClick={() => choose(o.id)}
    >
      {o.icon ? (
        <img className="iconselect__icon" src={o.icon} alt="" aria-hidden="true" />
      ) : (
        <span className="iconselect__icon iconselect__icon--empty" aria-hidden="true" />
      )}
      <span className="iconselect__name">{o.name}</span>
      {o.note && <span className="iconselect__note">{o.note}</span>}
    </li>
  );

  return (
    <div className="iconselect" ref={rootRef}>
      <button
        type="button"
        className="iconselect__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((v) => !v)}
      >
        {selected ? (
          <>
            {selected.icon && <img className="iconselect__icon" src={selected.icon} alt="" aria-hidden="true" />}
            <span className="iconselect__name">{selected.name}</span>
            {selected.note && <span className="iconselect__note">{selected.note}</span>}
          </>
        ) : (
          <span className="iconselect__placeholder">{placeholder}</span>
        )}
        <span className="iconselect__caret" aria-hidden="true">{open ? '\u25B2' : '\u25BC'}</span>
      </button>

      {open && (
        <ul className="iconselect__list" role="listbox" aria-label={ariaLabel}>
          {hasGroups
            ? grouped.map((g) => (
                <li key={g.group || 'ungrouped'} className="iconselect__group" role="presentation">
                  {g.group && <span className="iconselect__group-label">{g.group}</span>}
                  <ul role="presentation">{g.items.map(renderOption)}</ul>
                </li>
              ))
            : options.map(renderOption)}
        </ul>
      )}
    </div>
  );
}
