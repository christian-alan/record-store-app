import { BY_ID, STARTER_LIBRARY } from '../data/catalog.js';

const KEY = 'record-store-v1';

// The library and the sound setting are remembered in this browser only.
export const loadSaved = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved && Array.isArray(saved.owned)) {
      return { owned: saved.owned.filter((o) => BY_ID[o.id]), muted: Boolean(saved.muted) };
    }
  } catch {
    // storage unavailable: fall through to the defaults
  }
  return { owned: STARTER_LIBRARY, muted: false };
};

export const save = (state) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // storage unavailable: nothing to do
  }
};
