import { cx } from '../../lib/cx.js';
import { Vinyl } from '../Sleeve.jsx';

// Everything is positioned in percentages of the 500 × 460 stage, so the turntable scales with its column.
// `angle` is the tonearm rotation in degrees: 0 on its rest, about 13 at the outer groove, 34 at the label.
export default function Turntable({ record, status, angle, target, over, platterRef }) {
  const needle = status === 'playing' ? 'down' : status === 'paused' ? 'up' : 'rest';
  const arm = 'absolute block bg-arm';
  return (
    <div data-ui="deck" aria-hidden="true" className="relative aspect-[500/460] w-[min(100%,500px)]">
      <div ref={platterRef} data-ui="platter" className="absolute top-[2.17%] left-[2%] aspect-square w-[88%] rounded-full bg-soft shadow-[inset_0_0_0_1px_var(--line)]">
        <span className="absolute inset-[6%] rounded-full border border-line" />
        {target && (
          <span className={cx('absolute inset-[2.3%] rounded-full border-2 border-accent-ink', over ? 'border-solid' : 'border-dashed')} />
        )}
        {record ? (
          <span key={record.id} data-ui="disc" className="absolute inset-[2.3%] block animate-drop motion-reduce:animate-none">
            <Vinyl
              record={record}
              spin={status === 'playing' || status === 'paused'}
              held={status !== 'playing'}
              className="size-full shadow-[0_6px_16px_rgb(0_0_0/0.28),0_0_0_1px_var(--vinyl-edge)]"
            />
          </span>
        ) : (
          <>
            <span className="absolute top-[48.6%] left-[48.6%] size-[2.8%] rounded-full bg-ink" />
            <span className={cx('caps absolute top-[60%] left-0 w-full text-center', target ? 'text-accent-ink' : 'text-muted')}>
              {target ? 'Put the record here' : 'No record'}
            </span>
          </>
        )}
      </div>

      {/* tonearm: base, then the arm itself, which rotates around its pivot */}
      <div className="absolute top-[6.96%] left-[84.8%] aspect-square w-[11.2%] rounded-full bg-soft shadow-[inset_0_0_0_1px_var(--line)]" />
      <div
        data-ui="arm"
        data-angle={angle}
        className={cx(
          'absolute top-[13.04%] left-[88.2%] h-[65.2%] w-[4.4%] origin-top transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.3,0.7,0.2,1)] motion-reduce:transition-none',
          needle === 'down' && 'drop-shadow-[3px_5px_3px_rgb(0_0_0/0.3)]',
          needle === 'up' && 'drop-shadow-[9px_14px_7px_rgb(0_0_0/0.22)]',
        )}
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <i className={cx(arm, 'top-[-17.5%] left-[14%] h-[12.7%] w-[72%]')} />
        <i className={cx(arm, 'top-[-5%] left-[39%] h-full w-[22%] shadow-[0_0_0_1px_rgb(255_255_255/0.28)]')} />
        <i className={cx(arm, 'top-[-4.33%] left-[-9%] aspect-square w-[118%] rounded-full shadow-[inset_0_0_0_6px_var(--arm),inset_0_0_0_8px_var(--ground)]')} />
        <i className={cx(arm, 'top-[89%] left-0 h-[11.3%] w-full shadow-[inset_0_-6px_0_var(--accent),0_0_0_1px_rgb(255_255_255/0.28)]')} />
      </div>
    </div>
  );
}
