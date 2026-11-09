import { useCallback, useEffect, useState } from 'react';
import './ImageZoom.css';

/* ==========================================================================
   ImageZoom — click any image inside it to see it full screen.

   Wrap a whole screen in <ImageZoom> and every <img> inside becomes
   clickable (one click handler for the lot, so new images just work):
     - click an image  -> it opens full screen on a dark backdrop
     - click again (anywhere) or press Esc -> it closes
   Images inside a link open in the viewer instead of following the link.
   An image can opt out with data-nozoom.
   ========================================================================== */
export default function ImageZoom({ children, className }) {
  const [shown, setShown] = useState(null); // { src, alt }

  const onClickCapture = useCallback((e) => {
    const img = e.target && e.target.closest ? e.target.closest('img') : null;
    if (!img || img.hasAttribute('data-nozoom')) return;
    const src = img.currentSrc || img.src;
    if (!src) return;
    e.preventDefault();
    e.stopPropagation();
    setShown({ src, alt: img.alt || '' });
  }, []);

  const close = useCallback(() => setShown(null), []);

  useEffect(() => {
    if (!shown) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // no page scroll behind it
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [shown, close]);

  return (
    <div className={'imgzoom-scope' + (className ? ' ' + className : '')} onClickCapture={onClickCapture}>
      {children}
      {shown && (
        <div
          className="imgzoom"
          role="dialog"
          aria-modal="true"
          aria-label={shown.alt ? `${shown.alt}, full screen` : 'Image, full screen'}
          onClick={close}
        >
          <img className="imgzoom__img" src={shown.src} alt={shown.alt} data-nozoom />
          <span className="imgzoom__hint">Click anywhere to close</span>
        </div>
      )}
    </div>
  );
}
