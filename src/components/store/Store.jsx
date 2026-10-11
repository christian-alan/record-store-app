import { RECORDS } from '../../data/catalog.js';
import { cx } from '../../lib/cx.js';
import { two } from '../../lib/format.js';
import Sleeve from '../Sleeve.jsx';

const lift = 'group-hover:-translate-y-1.5 group-hover:[--peek:11%] group-focus-visible:-translate-y-1.5 group-focus-visible:[--peek:11%]';

export default function Store({ owns, onOpen }) {
  return (
    <main className="animate-enter motion-reduce:animate-none">
      <h1 className="headline mt-2.5 -ml-[0.045em] text-[clamp(88px,17vw,244px)]">Store</h1>
      <div className="caps mt-3.5 flex flex-wrap justify-between gap-x-4 gap-y-1 border-t border-ink pt-2.5">
        <span>Records for sale</span>
        <span className="text-muted">{RECORDS.length} in stock</span>
        <span className="text-muted">October 2026</span>
      </div>

      <div className="mt-[26px] grid grid-cols-[repeat(auto-fill,minmax(min(180px,45%),1fr))] gap-x-6 gap-y-8">
        {RECORDS.map((record, i) => {
          const mine = owns(record.id);
          return (
            <button
              key={record.id}
              type="button"
              data-ui="tile"
              className="caps group flex min-w-0 flex-col gap-2 text-left"
              aria-label={`${record.title} by ${record.artist}, ${mine ? 'in your library' : record.price}`}
              onClick={() => onOpen(record.id)}
            >
              <span className="text-muted group-hover:text-accent-ink group-focus-visible:text-accent-ink">
                {two(i + 1)}
                <span className="invisible group-hover:visible group-focus-visible:visible"> — View record</span>
              </span>
              <Sleeve record={record} className={lift} />
              <span className="mt-1 flex items-start justify-between gap-2">
                <span className="min-w-0">
                  <span className="block">{record.title}</span>
                  <span className="block text-muted">{record.artist}</span>
                </span>
                <span className={cx('whitespace-nowrap', mine && 'text-muted')}>{mine ? 'In library' : record.price}</span>
              </span>
            </button>
          );
        })}
      </div>
    </main>
  );
}
