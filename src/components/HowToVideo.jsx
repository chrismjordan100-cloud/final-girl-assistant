import { useState } from 'react';
import { getVideo, getVideoFileName } from '../data/games.js';
import './HowToVideo.css';

/* How-to-play video for a Killer, Location or Character Pack Final Girl.
   Collapsed to a play button so it costs nothing until tapped. With
   `hideMissing`, nothing shows if the video hasn't been made yet. */
const KIND = { killer: 'Killer', location: 'Location', finalgirl: 'Character Pack' };

export default function HowToVideo({ type, entry, title, hideMissing = false }) {
  const [open, setOpen] = useState(false);
  if (!entry) return null;
  const src = getVideo(type, entry);
  const name = title || entry.name;
  if (!src) {
    if (hideMissing) return null;
    return (
      <div className="tg-video tg-video--missing fg-panel">
        <span className="tg-video__icon" aria-hidden="true">&#9654;</span>
        <div>
          <p className="tg-video__title">{name} &mdash; how-to video coming soon</p>
          <p className="tg-video__file fg-type">Add <code>{getVideoFileName(type, entry)}</code> to <code>src/assets/videos/</code></p>
        </div>
      </div>
    );
  }
  return (
    <div className="tg-video fg-panel">
      {open ? (
        <video className="tg-video__player" src={src} controls autoPlay playsInline preload="metadata">
          Your browser can&rsquo;t play this video.
        </video>
      ) : (
        <button className="tg-video__play" onClick={() => setOpen(true)} aria-label={`How to play ${name}`}>
          <span className="tg-video__icon" aria-hidden="true">&#9654;</span>
          <span>
            <span className="tg-video__title">How to play {name}</span>
            <span className="tg-video__sub fg-type">{KIND[type]} video &middot; narrated &middot; subtitled</span>
          </span>
        </button>
      )}
    </div>
  );
}
