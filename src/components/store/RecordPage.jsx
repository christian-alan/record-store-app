import { useState } from 'react';
import { RECORDS, totalSeconds } from '../../data/catalog.js';
import { dateLabel, fitHeadline, two } from '../../lib/format.js';
import Button from '../Button.jsx';
import HoldButton from '../HoldButton.jsx';
import Sleeve from '../Sleeve.jsx';
import Tracklist from '../Tracklist.jsx';

const paragraph = 'mt-3.5 max-w-[460px]';

// One record in the store: who made it, what it is about, and the button you hold to buy it.
export default function RecordPage({ record, ownedEntry, onBuy, onPlayNow, onBack }) {
  const [holding, setHolding] = useState(0); // 0..1 while the buy button is held
  const mine = Boolean(ownedEntry);
  const peek = mine ? 0 : 30 * (1 - holding);
  const { about } = record;

  return (
    <main className="animate-enter motion-reduce:animate-none">
      <button type="button" className="caps relative z-10 mt-1 inline-flex min-h-11 items-center" onClick={onBack}>
        ← Back to the store
      </button>

      <div className="mt-5 flex flex-wrap items-start gap-x-12 gap-y-10">
        <section data-ui="record-info" className="min-w-0 flex-[1.1_1_400px]">
          <div className="caps text-accent-ink">{mine ? 'Yours' : `Record ${two(RECORDS.indexOf(record) + 1)}`}</div>
          <h1 data-ui="artist-name" className="headline mt-3 -ml-[0.045em]" style={{ fontSize: fitHeadline(record.artist, 136, 700) }}>
            {record.artist}
          </h1>
          <div className="caps mt-4">{record.genres}</div>

          <div className="mt-6 border-t border-ink pt-4">
            <div className="caps text-accent-ink">About the record</div>
            <h2 className="mt-2.5 text-[30px] leading-[1.1] font-medium tracking-[-0.03em]">
              {record.title}, {record.year}
            </h2>
            {record.story.map((text) => (
              <p key={text} className={paragraph}>{text}</p>
            ))}
          </div>

          <div className="mt-[22px] border-t border-line pt-4">
            <div className="caps text-accent-ink">About the artist</div>
            {about.bio.map((text) => (
              <p key={text} className={paragraph}>{text}</p>
            ))}
            <div className="caps mt-4 text-muted">
              From {about.from} — Active since {about.since} — {about.plays}
            </div>
          </div>
        </section>

        <section aria-label="Sleeve" className="min-w-0 flex-[1.2_1_420px]">
          <div className="w-[77%]">
            <Sleeve record={record} peek={peek} lifted />
          </div>
        </section>

        <section className="min-w-0 flex-[0.8_1_260px]">
          <div className="caps flex justify-between gap-3 pb-2.5">
            <span>Songs</span>
            <span className="text-muted">{record.songs.length} — {Math.round(totalSeconds(record) / 60)} min</span>
          </div>
          <Tracklist record={record} />

          <div className="mt-8">
            {mine ? (
              <>
                <div role="status" className="caps flex items-center gap-2.5 text-accent-ink">
                  <span aria-hidden="true" className="size-2 flex-none rounded-full bg-accent" />
                  <span>In your library</span>
                </div>
                <div className="caps mt-1.5 text-muted">Bought {dateLabel(ownedEntry.bought)} — {record.price}</div>
                <div className="mt-4 flex flex-col gap-2">
                  <Button look="ink" onClick={() => onPlayNow(record.id)}>Play it now</Button>
                  <Button look="line" onClick={onBack}>Back to the store</Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-[44px] leading-none font-medium tracking-[-0.04em]">{record.price}</div>
                <div className="mt-3.5">
                  <HoldButton label="Hold to buy" onProgress={setHolding} onDone={() => onBuy(record.id)} />
                </div>
                <div id="hold-hint" className="caps mt-2.5 text-muted">
                  {holding > 0 ? 'Let go to cancel' : 'Press and hold for one second'}
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
