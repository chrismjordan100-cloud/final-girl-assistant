import { useCallback, useEffect, useState } from 'react';

/* ==========================================================================
   Text size preference.

   Scales the whole UI by multiplying the root font size. Because the app is
   built in rem/em, one multiplier resizes everything proportionally, and it
   stacks cleanly on top of the per-device base size set in theme.css (16px on
   desktop, 18px on phones). Stored per device in localStorage — it's a display
   preference, so it is deliberately NOT synced across devices.
   ========================================================================== */

const KEY = 'fg-text-scale';
const STEPS = [0.9, 1, 1.1, 1.25, 1.4]; // Smaller … Larger
const DEFAULT_INDEX = 1; // 1.0 = the theme's base size

function readIndex() {
  try {
    const v = parseInt(localStorage.getItem(KEY), 10);
    return Number.isInteger(v) && v >= 0 && v < STEPS.length ? v : DEFAULT_INDEX;
  } catch {
    return DEFAULT_INDEX;
  }
}

function applyScale(index) {
  // Expose as a CSS variable the stylesheet multiplies the base size by.
  document.documentElement.style.setProperty('--text-scale', String(STEPS[index]));
}

export function useTextScale() {
  const [index, setIndex] = useState(readIndex);

  // Apply on mount and whenever it changes.
  useEffect(() => {
    applyScale(index);
  }, [index]);

  const setScaleIndex = useCallback((next) => {
    const clamped = Math.max(0, Math.min(STEPS.length - 1, next));
    setIndex(clamped);
    try {
      localStorage.setItem(KEY, String(clamped));
    } catch {
      /* ignore storage failures (e.g. private mode) */
    }
  }, []);

  const inc = useCallback(() => setScaleIndex(readIndex() + 1), [setScaleIndex]);
  const dec = useCallback(() => setScaleIndex(readIndex() - 1), [setScaleIndex]);

  return {
    index,
    steps: STEPS.length,
    percent: Math.round(STEPS[index] * 100),
    canInc: index < STEPS.length - 1,
    canDec: index > 0,
    inc,
    dec,
  };
}
