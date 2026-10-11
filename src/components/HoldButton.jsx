import { useEffect, useRef, useState } from 'react';
import { cx } from '../lib/cx.js';
import { buttonBase } from './Button.jsx';

const HOLD_MS = 1000;
const isHoldKey = (e) => e.key === ' ' || e.key === 'Enter';

// Press and hold to confirm. Letting go early cancels.
// `onProgress` reports 0..1 while held, so the page can react (the vinyl slides into the sleeve).
export default function HoldButton({ label, onDone, onProgress }) {
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);
  const startedAt = useRef(0);
  const held = useRef(false);

  const cancel = () => {
    if (!held.current) return;
    held.current = false;
    cancelAnimationFrame(frame.current);
    setProgress(0);
    onProgress?.(0);
  };

  const begin = () => {
    if (held.current) return;
    held.current = true;
    startedAt.current = performance.now();
    const tick = (now) => {
      if (!held.current) return;
      const value = Math.min(1, (now - startedAt.current) / HOLD_MS);
      setProgress(value);
      onProgress?.(value);
      if (value >= 1) {
        held.current = false;
        onDone();
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
  };

  useEffect(
    () => () => {
      held.current = false;
      cancelAnimationFrame(frame.current);
    },
    [],
  );

  return (
    <button
      type="button"
      data-ui="hold"
      aria-describedby="hold-hint"
      className={cx(buttonBase, 'relative touch-none overflow-hidden bg-accent text-on-accent select-none')}
      onPointerDown={(e) => {
        e.preventDefault();
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // capture is a nicety, not a requirement
        }
        e.currentTarget.focus();
        begin();
      }}
      onPointerUp={cancel}
      onPointerCancel={cancel}
      onBlur={cancel}
      onKeyDown={(e) => {
        if (!isHoldKey(e)) return;
        e.preventDefault();
        if (!e.repeat) begin();
      }}
      onKeyUp={(e) => {
        if (isHoldKey(e)) cancel();
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <span className="absolute inset-0 origin-left bg-hold" style={{ transform: `scaleX(${progress})` }} />
      <span className="relative">{progress > 0 ? 'Keep holding' : label}</span>
      <span className="relative" aria-hidden="true">
        {progress > 0 ? `${Math.round(progress * 100)}%` : '→'}
      </span>
    </button>
  );
}
