import { cx } from '../lib/cx.js';

// The disc. The grooves and sheen stay still; only the label turns.
export function Vinyl({ record, spin = false, held = false, className, ...props }) {
  return (
    <span className={cx('vinyl flex items-center justify-center rounded-full', className)} {...props}>
      <span
        data-ui="label"
        data-spin={spin ? (held ? 'held' : 'on') : 'off'}
        className={cx(
          'relative flex size-[35%] items-center justify-center rounded-full shadow-[0_0_0_1px_rgb(255_255_255/0.14)]',
          spin && 'animate-rpm33 motion-reduce:animate-none',
          held && '[animation-play-state:paused]',
        )}
        style={{ background: record.cover.label }}
      >
        {/* two marks, one light and one dark, so the turning shows on any label colour */}
        <i className="absolute top-[9%] left-1/2 -ml-[5%] block h-[20%] w-[4%] bg-white/80" />
        <i className="absolute top-[9%] left-1/2 ml-[1%] block h-[20%] w-[4%] bg-black/60" />
        <span className="size-[9%] rounded-full bg-ground" />
      </span>
    </span>
  );
}

// A record in its sleeve. `peek` slides the vinyl out to the right by that share of the width;
// leave it undefined to let a parent drive it through the --peek variable (hover states do this).
export default function Sleeve({ record, peek, vinyl = true, lifted = false, onGrab, hideVinyl = false, className }) {
  return (
    <span
      aria-hidden="true"
      className={cx('relative block aspect-square w-full max-w-full transition-transform duration-[250ms] motion-reduce:transition-none', className)}
      style={peek == null ? undefined : { '--peek': `${peek}%` }}
    >
      {vinyl && (
        <Vinyl
          record={record}
          data-ui={onGrab ? 'grab-vinyl' : undefined}
          onPointerDown={onGrab}
          className={cx(
            'absolute top-[2%] left-[calc(2%+var(--peek,0%))] size-[96%] transition-[left] duration-[400ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none',
            onGrab && 'cursor-grab touch-none',
            hideVinyl && 'opacity-0',
          )}
        />
      )}
      <span
        className={cx(
          'absolute inset-0 block overflow-hidden',
          lifted
            ? 'shadow-[0_2px_4px_rgb(0_0_0/0.16),0_22px_36px_rgb(0_0_0/0.2)]'
            : 'shadow-[0_1px_2px_rgb(0_0_0/0.14),0_10px_24px_rgb(0_0_0/0.12)]',
        )}
        style={{ background: record.cover.bg }}
      >
        {record.cover.art.map((shape, i) => (
          <i key={i} className="absolute block" style={shape} />
        ))}
      </span>
    </span>
  );
}
