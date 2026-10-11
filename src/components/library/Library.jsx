import { useEffect, useState } from 'react';
import { BY_ID, totalSeconds } from '../../data/catalog.js';
import { useVinylDrag } from '../../hooks/useVinylDrag.js';
import Button from '../Button.jsx';
import Sleeve, { Vinyl } from '../Sleeve.jsx';
import Tracklist from '../Tracklist.jsx';
import Shelf from './Shelf.jsx';
import Story from './Story.jsx';
import Transport from './Transport.jsx';
import Turntable from './Turntable.jsx';

// Three columns over the shelf: the story, the turntable, and the record you picked.
export default function Library({ owned, picked, onPick, player, onGoToStore, onOpenInStore }) {
  const { deck, record: onDeck, isActive, actions } = player;
  const shown = BY_ID[picked || deck.id] || null; // the record in the right-hand column
  const shownIsOnDeck = Boolean(shown && onDeck && shown.id === onDeck.id);

  const putOn = (id) => {
    actions.putOn(id);
    onPick(id);
  };
  const putBack = () => {
    actions.takeOff();
    onPick(null);
  };

  const { platterRef, drag, start: startDrag } = useVinylDrag(() => shown && putOn(shown.id));

  // Which story layer you opened by hand. It resets when the subject changes or playback starts or stops.
  const [layer, setLayer] = useState(null);
  const subjectId = isActive ? deck.id : picked || deck.id;
  useEffect(() => {
    setLayer(null);
  }, [subjectId, isActive]);

  const song = onDeck ? onDeck.songs[deck.song] : null;
  const duration = song ? song.dur : 0;
  const position = onDeck ? Math.min(deck.pos, duration) : 0;
  const playedBefore = onDeck ? onDeck.songs.slice(0, deck.song).reduce((sum, s) => sum + s.dur, 0) : 0;
  // The needle travels from the outer groove (13°) to the label (34°) over the whole record.
  const angle = onDeck && isActive ? 13 + 21 * ((playedBefore + position) / totalSeconds(onDeck)) : 0;
  const waitingForRecord = Boolean(shown) && !onDeck;

  return (
    <main className="animate-enter motion-reduce:animate-none">
      <div className="mt-5 flex flex-wrap items-start gap-x-12 gap-y-10">
        <section data-ui="story" aria-label="Story" aria-live="polite" className="min-w-0 flex-[1_1_380px]">
          <Story
            hasRecords={owned.length > 0}
            shown={shown}
            player={player}
            layer={layer}
            onLayer={setLayer}
            onPutBack={putBack}
            onGoToStore={onGoToStore}
            onOpenInStore={onOpenInStore}
          />
        </section>

        <section aria-label="Turntable" className="flex min-w-0 flex-[1.15_1_420px] flex-col items-center">
          <Turntable
            record={onDeck}
            status={deck.status}
            angle={Number(angle.toFixed(2))}
            target={waitingForRecord || Boolean(drag)}
            over={Boolean(drag && drag.over)}
            platterRef={platterRef}
          />
          <Transport player={player} position={position} duration={duration} putOn={waitingForRecord ? () => putOn(shown.id) : null} />
        </section>

        <section aria-label="Picked record" className="min-w-0 flex-[0.7_1_250px]">
          {shown ? (
            <>
              <div className="transition-[width] duration-[350ms] motion-reduce:transition-none" style={{ width: shownIsOnDeck ? '100%' : '80%' }}>
                <Sleeve
                  record={shown}
                  peek={shownIsOnDeck ? 0 : 26}
                  vinyl={!shownIsOnDeck}
                  lifted
                  onGrab={shownIsOnDeck ? undefined : startDrag}
                  hideVinyl={Boolean(drag)}
                />
              </div>
              <div className="caps mt-4 flex justify-between gap-3 pb-2.5">
                <span>{shown.title}</span>
                <span className="text-muted">{shown.artist}</span>
              </div>
              {!shownIsOnDeck && onDeck && (
                <div className="mb-3.5">
                  <Button onClick={() => putOn(shown.id)}>Swap the record</Button>
                </div>
              )}
              <Tracklist
                record={shown}
                current={shownIsOnDeck && isActive ? deck.song : -1}
                done={shownIsOnDeck && deck.status === 'finished'}
                onPick={shownIsOnDeck ? actions.playSong : undefined}
              />
            </>
          ) : (
            <div className="caps flex aspect-square max-w-full items-end border-[1.5px] border-dashed border-dash p-3.5 text-muted">
              {owned.length ? 'No record picked' : 'Your first record will sit here'}
            </div>
          )}
        </section>
      </div>

      <Shelf owned={owned} shownId={shown ? shown.id : null} deckId={deck.id} onPick={onPick} onGoToStore={onGoToStore} />

      {drag && (
        <Vinyl
          record={shown}
          className="pointer-events-none fixed z-50 -mt-[120px] -ml-[120px] size-[240px] shadow-[0_24px_44px_rgb(0_0_0/0.4)]"
          style={{ left: drag.x, top: drag.y }}
        />
      )}
    </main>
  );
}
