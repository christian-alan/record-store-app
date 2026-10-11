export const two = (n) => String(n).padStart(2, '0');

// 118 -> "01:58" (the transport clock)
export const clock = (seconds) => {
  const s = Math.max(0, Math.floor(seconds));
  return `${two(Math.floor(s / 60))}:${two(s % 60)}`;
};

// 266 -> "4:26" (song lengths in lists)
export const length = (seconds) => {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${two(s % 60)}`;
};

export const dateLabel = (iso) => {
  try {
    return new Date(`${iso}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
};

export const today = () => new Date().toISOString().slice(0, 10);

export const initials = (name) =>
  name
    .split(/\s+/)
    .filter((w) => w.toLowerCase() !== 'the')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

export const firstSentence = (text) => {
  const i = text.indexOf('. ');
  return i < 0 ? text : text.slice(0, i + 1);
};

// A headline size that keeps the longest word of `text` inside its column.
// `max` is the largest size in px; `budget` is roughly column width / 0.6.
export const fitHeadline = (text, max, budget) => {
  const longest = Math.max(...text.split(/\s+/).map((w) => w.length));
  const px = Math.round(Math.min(max, budget / longest));
  return `min(${px}px, ${((px / 14.4) * 1.7).toFixed(1)}vw)`;
};
