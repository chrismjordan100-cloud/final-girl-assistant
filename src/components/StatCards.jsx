import './StatCards.css';

/* ==========================================================================
   Shared headline stat cards — used on MI, Achievements and Debrief so the
   dashboards look consistent.

   <StatCardGrid> wraps a responsive grid of <StatCard>s.
     value  the big number/label
     label  the caption under it
     sub    optional small subtext
     tone   optional 'good' | 'bad' | 'gold' colour accent
   ========================================================================== */
export function StatCard({ value, label, sub, tone }) {
  return (
    <div className={'statcard fg-panel' + (tone ? ' statcard--' + tone : '')}>
      <span className="statcard__value">{value}</span>
      <span className="statcard__label">{label}</span>
      {sub && <span className="statcard__sub fg-type">{sub}</span>}
    </div>
  );
}

export function StatCardGrid({ children }) {
  return <div className="statcard-grid">{children}</div>;
}
