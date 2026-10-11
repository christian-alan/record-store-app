import { clock } from '../../lib/format.js';
import Button, { IconButton, PlayButton } from '../Button.jsx';
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, RepeatIcon } from '../Icons.jsx';

// The seek bar and the buttons under the turntable.
// While a record is picked but nothing is on the platter, the buttons give way to "Put it on".
export default function Transport({ player, position, duration, putOn }) {
  const { deck, record, repeat, actions } = player;
  const playing = deck.status === 'playing';
  return (
    <div className="mt-[18px] w-full max-w-[500px]">
      <div className="caps flex items-center gap-3.5 text-muted">
        <span data-ui="time">{clock(position)}</span>
        <input
          id="seek"
          type="range"
          className="seek min-w-0 flex-1"
          min="0"
          max={duration || 1}
          step="1"
          value={Math.floor(position)}
          disabled={!record}
          aria-label="Position in the song"
          style={{ '--pct': `${duration ? (position / duration) * 100 : 0}%` }}
          onChange={(e) => actions.seek(Number(e.target.value))}
        />
        <span>{clock(duration)}</span>
      </div>

      {putOn ? (
        <div className="mt-4 flex flex-col items-center gap-2.5">
          <Button className="max-w-[300px]" onClick={putOn}>Put it on</Button>
          <div className="caps text-muted">Or drag the vinyl onto the platter</div>
        </div>
      ) : (
        <>
          <div className="mt-3.5 flex items-center justify-center gap-[18px]">
            <IconButton label="Repeat the record" on={repeat} aria-pressed={repeat} disabled={!record} onClick={actions.toggleRepeat}><RepeatIcon /></IconButton>
            <IconButton label="Previous song" disabled={!record} onClick={actions.prev}><PrevIcon /></IconButton>
            <PlayButton label={playing ? 'Pause' : 'Play'} disabled={!record} onClick={actions.toggle}>{playing ? <PauseIcon /> : <PlayIcon />}</PlayButton>
            <IconButton label="Next song" disabled={!record} onClick={actions.next}><NextIcon /></IconButton>
            <span aria-hidden="true" className="w-11" />
          </div>
          <div className="mt-1 flex min-h-11 items-center justify-center">
            {record && !playing && (
              <button type="button" className="caps min-h-11 underline underline-offset-[3px]" onClick={actions.takeOff}>
                Take it off
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
