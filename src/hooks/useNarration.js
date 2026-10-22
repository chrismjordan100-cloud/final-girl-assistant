import { useCallback, useEffect, useRef, useState } from 'react';

/* ==========================================================================
   Spooky scenario narration via the browser's Web Speech API.
   No network, no API key, no cost — uses the system's installed voices.
   Prefers the best "natural/neural" voice available, then tunes pitch, rate
   and pacing for a dread-filled read.
   ========================================================================== */

const supported =
  typeof window !== 'undefined' && 'speechSynthesis' in window;

/* Score a voice: higher is better. We favour modern "natural/neural/online"
   voices (far less robotic), then deeper-sounding named male voices, and
   English locales. */
function scoreVoice(v) {
  let score = 0;
  const name = (v.name || '').toLowerCase();

  // Prefer LOCAL voices: they actually respond to pitch/rate. The online
  // "Natural/Neural" voices sound smoother but frequently ignore tuning, so
  // "slow and deep" has no effect on them — not what we want here.
  if (v.localService) score += 60;

  if (/^en(-|_|$)/i.test(v.lang)) score += 20;
  if (/en-gb/i.test(v.lang)) score += 5; // a British lilt suits the horror read

  // Deeper / male-sounding named voices for menace.
  if (/ryan|george|daniel|arthur|guy|william|brandon|christopher|fred|david|mark/.test(name)) score += 15;
  if (/male/.test(name)) score += 8;

  // Mild nudge for quality voices, but not enough to beat a tunable local one.
  if (/natural|neural|premium|enhanced/.test(name)) score += 10;
  return score;
}

function pickSpookyVoice() {
  if (!supported) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  return voices.slice().sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
}

export function useNarration() {
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef(null);

  useEffect(() => {
    if (!supported) return;
    const load = () => { voiceRef.current = pickSpookyVoice(); };
    load();
    window.speechSynthesis.addEventListener('voiceschanged', load);
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', load);
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback((text) => {
    if (!supported || !text) return;
    window.speechSynthesis.cancel(); // never overlap

    // Re-pick in case voices loaded after mount (common on first use).
    if (!voiceRef.current) voiceRef.current = pickSpookyVoice();
    const voice = voiceRef.current;

    // Genuinely slow and deep, at the API floor. Local voices honour these;
    // if a voice ignores them it's an online voice the picker tries to avoid.
    const rate = 0.6;    // slow, deliberate
    const pitch = 0.1;   // as deep as the Web Speech API allows

    // Split into phrases and speak each as its own utterance with a trailing
    // pause. Queuing separate utterances gives a real beat between lines —
    // the menacing cadence the single run-on utterance couldn't manage.
    const phrases = text
      .split(/(?<=[.!?])\s+/)        // break on sentence ends
      .map((s) => s.trim())
      .filter(Boolean);

    setSpeaking(true);

    phrases.forEach((phrase, i) => {
      const u = new SpeechSynthesisUtterance(phrase);
      if (voice) u.voice = voice;
      u.rate = rate;
      u.pitch = pitch;
      u.volume = 1;
      if (i === phrases.length - 1) {
        u.onend = () => setSpeaking(false);
        u.onerror = () => setSpeaking(false);
      }
      window.speechSynthesis.speak(u);

      // Insert a short silent beat between phrases for dramatic pacing.
      if (i < phrases.length - 1) {
        const pause = new SpeechSynthesisUtterance(' ');
        if (voice) pause.voice = voice;
        pause.rate = 0.5;
        pause.volume = 0;
        window.speechSynthesis.speak(pause);
      }
    });
  }, []);

  return { supported, speaking, speak, stop };
}
