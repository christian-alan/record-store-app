import { clock } from '../lib/format.js';
import { IconButton, PlayButton } from './Button.jsx';
import { NextIcon, PauseIcon, PlayIcon, PrevIcon } from './Icons.jsx';
import Sleeve from './Sleeve.jsx';

// Follows you around the store while a record is on the turntable.
export default function MiniPlayer({ player, onOpen }) {
  const { deck, record, actions } = player;
  const song = record.songs[deck.song];
  const pct = `${(deck.pos / song.dur) * 100}%`;
  const playing = deck.status === 'playing';
  return (
    <div data-ui="mini" role="region" aria-label="Now on the turntable" className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-ground pb-[env(safe-area-inset-bottom,0px)]">
      <div className="-mt-px h-0.5" style={{ background: `linear-gradient(90deg, var(--accent) ${pct}, transparent ${pct})` }} />
      <div className="caps mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-5 gap-y-1.5 px-[clamp(16px,3.9vw,56px)] py-2.5">
        <button type="button" data-ui="mini-now" className="caps flex min-h-12 min-w-0 items-center gap-3.5 text-left" onClick={onOpen}>
          <span className="block w-12 flex-none"><Sleeve record={record} vinyl={false} /></span>
          <span>
            <span className="block">{song.title}</span>
            <span className="block text-muted">{record.artist} — back to the turntable</span>
          </span>
        </button>
        <div className="flex items-center gap-2">
          <span className="mr-3 text-muted">{clock(deck.pos)} / {clock(song.dur)}</span>
          <IconButton label="Previous song" onClick={actions.prev}><PrevIcon /></IconButton>
          <PlayButton small label={playing ? 'Pause' : 'Play'} onClick={actions.toggle}>{playing ? <PauseIcon /> : <PlayIcon />}</PlayButton>
          <IconButton label="Next song" onClick={actions.next}><NextIcon /></IconButton>
        </div>
      </div>
    </div>
  );
}
