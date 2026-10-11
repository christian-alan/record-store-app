import { BY_ID } from '../../data/catalog.js';
import { cx } from '../../lib/cx.js';
import { two } from '../../lib/format.js';
import Sleeve from '../Sleeve.jsx';

const slot = 'caps mt-[23px] flex aspect-square w-[140px] flex-none items-end border-[1.5px] border-dashed border-dash p-3 text-left';

// Your records, newest first. The only way to add to the shelf is the store.
export default function Shelf({ owned, shownId, deckId, onPick, onGoToStore }) {
  return (
    <section aria-labelledby="shelf-heading" className="mt-[26px] border-t border-ink pt-2.5">
      <div className="caps flex justify-between gap-3">
        <h2 id="shelf-heading">My records</h2>
        <span className="text-muted">{two(owned.length)}</span>
      </div>

      <div className="-mx-2 flex gap-6 overflow-x-auto px-2 pt-[18px] pb-2.5">
        {owned.map((entry, i) => {
          const record = BY_ID[entry.id];
          const onDeck = deckId === entry.id;
          const picked = shownId === entry.id && !onDeck;
          const tag = onDeck ? 'On the turntable' : picked ? 'Picked' : !entry.played ? 'New' : null;
          const tone = tag ? 'text-accent-ink' : 'text-muted';
          return (
            <button
              key={entry.id}
              type="button"
              data-ui="shelf-item"
              aria-label={`${record.title} by ${record.artist}${tag ? `, ${tag.toLowerCase()}` : ''}`}
              className={cx(
                'caps group flex w-[140px] flex-none flex-col gap-1.5 text-left transition-transform duration-[250ms] hover:-translate-y-2.5 focus-visible:-translate-y-2.5 motion-reduce:transition-none',
                picked && '-translate-y-2.5',
              )}
              onClick={() => onPick(entry.id)}
            >
              <span className={tone}>{two(i + 1)}</span>
              {/* the sleeve is empty while its record is on the turntable */}
              <Sleeve record={record} vinyl={!onDeck} lifted={picked} className="group-hover:[--peek:9%] group-focus-visible:[--peek:9%]" />
              <span className="mt-1 block truncate">{record.title}</span>
              <span className={cx('-mt-1 block truncate', tone)}>{tag || record.artist}</span>
            </button>
          );
        })}

        <button type="button" className={slot} onClick={onGoToStore}>Add a record →</button>
        {owned.length === 0 && Array.from({ length: 6 }, (_, i) => <span key={i} aria-hidden="true" className={slot} />)}
      </div>
    </section>
  );
}
