import { useEffect, useRef, useState } from 'react';
import { BY_ID } from '../data/catalog.js';
import { Sound } from '../lib/sound.js';

// The turntable. `status` is one of:
//   empty    – nothing on the platter
//   stopped  – a record is on, needle up, at the start
//   playing  – needle down
//   paused   – needle lifted mid-song
//   finished – the last song has ended
const EMPTY = { id: null, status: 'empty', song: 0, pos: 0 };

export function usePlayer({ initiallyMuted = false, onFirstPlay } = {}) {
  const [deck, setDeck] = useState(EMPTY);
  const [repeat, setRepeat] = useState(false);
  const [muted, setMuted] = useState(initiallyMuted);

  const soundRef = useRef(null);
  if (!soundRef.current) {
    soundRef.current = new Sound();
    soundRef.current.muted = initiallyMuted;
  }
  const repeatRef = useRef(repeat);
  repeatRef.current = repeat;

  // The clock: while playing, move the position forward and step through the songs.
  useEffect(() => {
    if (deck.status !== 'playing') return undefined;
    let last = performance.now();
    const timer = setInterval(() => {
      const now = performance.now();
      const dt = (now - last) / 1000;
      last = now;
      setDeck((d) => {
        if (d.status !== 'playing') return d;
        const record = BY_ID[d.id];
        const pos = d.pos + dt;
        if (pos < record.songs[d.song].dur) return { ...d, pos };
        if (d.song < record.songs.length - 1) return { ...d, song: d.song + 1, pos: 0 };
        if (repeatRef.current) return { ...d, song: 0, pos: 0 };
        return { ...d, status: 'finished', pos: record.songs[d.song].dur };
      });
    }, 200);
    return () => clearInterval(timer);
  }, [deck.status]);

  // The sound follows whichever song is playing.
  const playing = deck.status === 'playing';
  useEffect(() => {
    const sound = soundRef.current;
    if (playing && deck.id) sound.play(`${deck.id}:${deck.song}`);
    else sound.stop();
    return () => sound.stop();
  }, [playing, deck.id, deck.song]);

  const start = () => {
    soundRef.current.unlock();
    if (deck.id && onFirstPlay) onFirstPlay(deck.id);
  };

  const actions = {
    putOn: (id) => setDeck({ id, status: 'stopped', song: 0, pos: 0 }),
    takeOff: () => setDeck(EMPTY),
    play: () => {
      if (!deck.id) return;
      start();
      setDeck((d) => (d.status === 'finished' ? { ...d, status: 'playing', song: 0, pos: 0 } : { ...d, status: 'playing' }));
    },
    pause: () => setDeck((d) => (d.status === 'playing' ? { ...d, status: 'paused' } : d)),
    toggle: () => (deck.status === 'playing' ? actions.pause() : actions.play()),
    playSong: (index) => {
      if (!deck.id) return;
      start();
      setDeck((d) => ({ ...d, status: 'playing', song: index, pos: 0 }));
    },
    next: () =>
      setDeck((d) => {
        if (!d.id) return d;
        const record = BY_ID[d.id];
        if (d.song < record.songs.length - 1) {
          return { ...d, status: d.status === 'finished' ? 'stopped' : d.status, song: d.song + 1, pos: 0 };
        }
        if (repeatRef.current) return { ...d, song: 0, pos: 0 };
        return { ...d, status: 'finished', pos: record.songs[d.song].dur };
      }),
    prev: () =>
      setDeck((d) => {
        if (!d.id) return d;
        if (d.pos > 3 && d.status !== 'finished') return { ...d, pos: 0 };
        return { ...d, status: d.status === 'finished' ? 'stopped' : d.status, song: Math.max(0, d.song - 1), pos: 0 };
      }),
    seek: (seconds) =>
      setDeck((d) => {
        if (!d.id) return d;
        const max = BY_ID[d.id].songs[d.song].dur - 0.5;
        return { ...d, status: d.status === 'finished' ? 'paused' : d.status, pos: Math.min(seconds, max) };
      }),
    toggleRepeat: () => setRepeat((r) => !r),
    toggleMute: () => {
      const next = !muted;
      setMuted(next);
      soundRef.current.setMuted(next);
    },
  };

  const record = deck.id ? BY_ID[deck.id] : null;
  const isActive = deck.status === 'playing' || deck.status === 'paused';

  return { deck, record, isActive, repeat, muted, actions };
}
