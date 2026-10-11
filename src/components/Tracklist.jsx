import { cx } from '../lib/cx.js';
import { length, two } from '../lib/format.js';

// `current` marks the song that is on now; `done` greys the list once the record has ended.
// Pass `onPick` to make the rows clickable.
export default function Tracklist({ record, current = -1, done = false, onPick }) {
  return (
    <ol className="caps border-t border-ink">
      {record.songs.map((song, i) => {
        const isCurrent = i === current;
        const row = cx(
          'flex min-h-11 w-full items-center gap-3 border-b border-line text-left',
          isCurrent && 'font-medium',
          done ? 'text-muted' : 'text-ink',
        );
        const cells = (
          <>
            <span className="w-[22px] flex-none text-muted">
              {isCurrent ? <span role="img" aria-label="On now" className="inline-block size-2 rounded-full bg-accent" /> : two(i + 1)}
            </span>
            <span className={cx('min-w-0 flex-1 underline-offset-[3px]', onPick && 'group-hover:underline')}>{song.title}</span>
            <span className="text-muted">{length(song.dur)}</span>
          </>
        );
        return (
          <li key={song.title}>
            {onPick ? (
              <button type="button" data-ui="track" className={cx(row, 'group')} aria-current={isCurrent ? 'true' : undefined} onClick={() => onPick(i)}>
                {cells}
              </button>
            ) : (
              <div className={row}>{cells}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
