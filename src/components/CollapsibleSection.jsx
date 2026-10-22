import { useState } from 'react';
import './CollapsibleSection.css';

/* ==========================================================================
   CollapsibleSection — the app-wide collapsible block.

   A headed <section> whose body collapses behind a caret toggle. Used
   consistently across every tab so sections behave the same everywhere.

   Props:
     title        heading text (string or node)
     count        optional right-aligned count/label (e.g. "5" or "3/10")
     defaultOpen  start expanded (default true)
     open         optional controlled open state; pair with onToggle
     onToggle     optional controlled toggle handler
     level        heading level for the class hook: 'section' (default) | 'sub'
     className    extra class on the <section>
     titleClassName  extra class on the header button (to reuse view styles)
   ========================================================================== */
export default function CollapsibleSection({
  title,
  count,
  defaultOpen = true,
  open: controlledOpen,
  onToggle,
  className = '',
  titleClassName = '',
  children,
}) {
  const [localOpen, setLocalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : localOpen;

  const toggle = () => {
    if (onToggle) onToggle(!open);
    if (!isControlled) setLocalOpen((v) => !v);
  };

  return (
    <section className={'collapsible ' + className}>
      <button
        type="button"
        className={'collapsible__title ' + titleClassName}
        onClick={toggle}
        aria-expanded={open}
      >
        <span className="collapsible__caret" aria-hidden="true">
          {open ? '\u25BC' : '\u25B6'}
        </span>
        <span className="collapsible__titletext">{title}</span>
        {count !== undefined && count !== null && (
          <span className="collapsible__count">{count}</span>
        )}
      </button>
      {open && <div className="collapsible__body">{children}</div>}
    </section>
  );
}
