import { useTextScale } from '../hooks/useTextScale.js';

/* Compact text-size control: A−  [size]  A+. Lives beside the demo toggle in
   the header, so on phones it drops into the open menu — easy to find, out of
   the way. Setting persists per device. */
export default function TextSize() {
  const { percent, canInc, canDec, inc, dec } = useTextScale();

  return (
    <div className="text-size" role="group" aria-label="Text size">
      <span className="text-size__label" aria-hidden="true">Text</span>
      <button
        type="button"
        className="text-size__btn"
        onClick={dec}
        disabled={!canDec}
        aria-label="Smaller text"
      >
        A&minus;
      </button>
      <span className="text-size__value" aria-live="polite">{percent}%</span>
      <button
        type="button"
        className="text-size__btn text-size__btn--big"
        onClick={inc}
        disabled={!canInc}
        aria-label="Larger text"
      >
        A+
      </button>
    </div>
  );
}
