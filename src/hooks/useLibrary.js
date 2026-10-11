import { useEffect, useState } from 'react';
import { today } from '../lib/format.js';
import { loadSaved, save } from '../lib/storage.js';

// The records you own, newest first. Each entry: { id, bought, played }.
export function useLibrary(muted) {
  const [owned, setOwned] = useState(() => loadSaved().owned);

  useEffect(() => {
    save({ owned, muted });
  }, [owned, muted]);

  const owns = (id) => owned.some((o) => o.id === id);
  const buy = (id) =>
    setOwned((list) => (list.some((o) => o.id === id) ? list : [{ id, bought: today(), played: false }, ...list]));
  const markPlayed = (id) =>
    setOwned((list) => list.map((o) => (o.id === id && !o.played ? { ...o, played: true } : o)));

  return { owned, owns, buy, markPlayed, reset: setOwned };
}
