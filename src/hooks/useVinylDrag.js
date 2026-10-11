import { useRef, useState } from 'react';

// Dragging the vinyl out of its sleeve and dropping it on the platter.
// Returns the platter ref, the live drag position ({ x, y, over } or null) and the pointer-down handler.
export function useVinylDrag(onDrop) {
  const platterRef = useRef(null);
  const [drag, setDrag] = useState(null);

  const overPlatter = (e) => {
    const el = platterRef.current;
    if (!el) return false;
    const r = el.getBoundingClientRect();
    return Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2)) < r.width / 2;
  };

  const start = (e) => {
    e.preventDefault();
    const move = (ev) => setDrag({ x: ev.clientX, y: ev.clientY, over: overPlatter(ev) });
    const end = (ev) => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
      setDrag(null);
      if (ev.type === 'pointerup' && overPlatter(ev)) onDrop();
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    move(e);
  };

  return { platterRef, drag, start };
}
