import { cx } from '../../lib/cx.js';
import { firstSentence, fitHeadline, initials, length, two } from '../../lib/format.js';
import Button from '../Button.jsx';
import Sleeve from '../Sleeve.jsx';

// The story panel has three layers: the song, the record and the artist.
// One of them fills the main card; the other two sit underneath as small cards.
// Clicking a small card moves that layer into the main card.

const LAYERS = ['song', 'record', 'artist'];

function MainCard({ layer, quiet = false, label, aside, title, children }) {
  return (
    <section
      data-ui="hero"
      data-layer={layer}
      className={cx('animate-enter px-5 pt-[18px] pb-5 motion-reduce:animate-none', quiet ? 'shadow-[inset_0_0_0_1px_var(--ink)]' : 'bg-hero text-hero-ink')}
    >
      <div className="caps flex flex-wrap justify-between gap-x-3 gap-y-0.5">
        <span className={quiet ? 'text-muted' : 'text-hero-accent'}>{label}</span>
        {aside && <span className="text-hero-muted">{aside}</span>}
      </div>
      <h1 data-ui="hero-title" className="headline mt-3.5 -ml-[0.045em]" style={{ fontSize: fitHeadline(title, 56, 560) }}>
        {title}
      </h1>
      {children}
    </section>
  );
}

const Text = ({ children }) => <p className="mt-3 text-base">{children}</p>;

function SmallCard({ layer, record, deck, onOpen }) {
  const frame = 'flex min-w-0 flex-col gap-2.5 px-3.5 pt-3.5 pb-3 text-left';
  if (layer === 'song-off') {
    return (
      <div className={cx(frame, 'border-[1.5px] border-dashed border-dash text-muted')}>
        <span className="caps">The song</span>
        <span className="text-[14.5px] leading-[1.4]">Its story starts when the needle drops.</span>
      </div>
    );
  }

  const avatar = 'caps flex size-11 flex-none items-center justify-center rounded-full bg-soft group-hover:bg-line';
  let label, lead, name, sub, teaser, more;
  if (layer === 'song') {
    const song = record.songs[deck.song];
    label = 'The song';
    name = song.title;
    sub = `Song ${two(deck.song + 1)} — ${length(song.dur)}`;
    teaser = firstSentence(song.story);
    more = 'Back to the song';
    lead = <span aria-hidden="true" className={avatar}><span className="size-2 rounded-full bg-accent" /></span>;
  } else if (layer === 'record') {
    label = 'The record';
    name = record.title;
    sub = `${record.year} — ${record.songs.length} songs`;
    teaser = record.story[1] || firstSentence(record.story[0]);
    more = 'Read its story';
    lead = <span className="block w-11 flex-none"><Sleeve record={record} vinyl={false} /></span>;
  } else {
    label = 'The artist';
    name = record.artist;
    sub = record.about.from;
    teaser = firstSentence(record.about.bio[0]);
    more = 'Read about the artist';
    lead = <span aria-hidden="true" className={avatar}>{initials(record.artist)}</span>;
  }

  return (
    <button
      type="button"
      data-ui="card"
      data-layer={layer}
      className={cx(frame, 'group shadow-[inset_0_0_0_1px_var(--ink)] transition-colors hover:bg-soft')}
      onClick={() => onOpen(layer)}
    >
      <span className="caps text-accent-ink">{label}</span>
      <span className="flex min-w-0 items-center gap-3">
        {lead}
        <span className="min-w-0">
          <span className="block text-lg leading-[1.15] font-medium tracking-[-0.02em]">{name}</span>
          <span className="caps mt-0.5 block text-muted">{sub}</span>
        </span>
      </span>
      <span className="line-clamp-3 text-[14.5px] leading-[1.4]">{teaser}</span>
      <span className="caps mt-auto">{more} →</span>
    </button>
  );
}

export default function Story({ hasRecords, shown, player, layer, onLayer, onPutBack, onGoToStore, onOpenInStore }) {
  const { deck, record: onDeck, isActive, actions } = player;
  const finished = Boolean(onDeck) && deck.status === 'finished' && (!shown || shown.id === onDeck.id);
  // While a record plays the story follows the turntable; otherwise it follows the record you picked.
  const subject = isActive || finished ? onDeck : shown;

  if (!subject) {
    return hasRecords ? (
      <MainCard layer="idle" quiet label="Nothing playing" title="Pick a record">
        <Text>Take a record off the shelf. Its story shows up here, with the artist beside it, and each song’s story follows while it plays.</Text>
      </MainCard>
    ) : (
      <MainCard layer="empty" quiet label="Your library" title="No records yet">
        <Text>Everything here is something you chose. Find a record in the store, read what it is about, and bring it home.</Text>
        <div className="mt-[18px] max-w-[300px]">
          <Button look="ink" onClick={onGoToStore}>Go to the store</Button>
        </div>
      </MainCard>
    );
  }

  // Which layer is in the main card: your choice if you made one, otherwise whatever fits the moment.
  const current = finished && !layer ? 'end' : layer === 'song' && !isActive ? 'record' : layer || (isActive ? 'song' : 'record');

  let main;
  if (current === 'end') {
    main = (
      <MainCard key={`end:${subject.id}`} layer="end" label="End of the record" aside={subject.title} title="Play it again?">
        <Text>The needle is back on its rest. Leave the record on, or put it back in its sleeve.</Text>
        <div className="mt-[18px] flex max-w-[300px] flex-col gap-2">
          <Button onClick={actions.play}>Play it again</Button>
          <Button look="lineOnHero" onClick={onPutBack}>Put it back</Button>
        </div>
      </MainCard>
    );
  } else if (current === 'song') {
    const song = subject.songs[deck.song];
    const aside = `${two(deck.song + 1)} of ${two(subject.songs.length)} — ${length(song.dur)}${deck.status === 'paused' ? ' — paused' : ''}`;
    main = (
      <MainCard key={`song:${subject.id}:${deck.song}`} layer="song" label="Story of the song" aside={aside} title={song.title}>
        <Text>{song.story}</Text>
      </MainCard>
    );
  } else if (current === 'artist') {
    const { about } = subject;
    main = (
      <MainCard key={`artist:${subject.id}`} layer="artist" label="Story of the artist" aside={subject.genres} title={subject.artist}>
        {about.bio.map((text) => <Text key={text}>{text}</Text>)}
        <div className="caps mt-3.5 text-hero-muted">From {about.from} — Active since {about.since} — {about.plays}</div>
        <button type="button" className="caps min-h-11 underline underline-offset-[3px]" onClick={() => onOpenInStore(subject.id)}>
          In the shop: {subject.title} →
        </button>
      </MainCard>
    );
  } else {
    main = (
      <MainCard key={`record:${subject.id}`} layer="record" label="Story of the record" aside={`${subject.year} — ${subject.songs.length} songs`} title={subject.title}>
        {subject.story.map((text) => <Text key={text}>{text}</Text>)}
      </MainCard>
    );
  }

  const others = current === 'end' ? ['record', 'artist'] : LAYERS.filter((l) => l !== current);

  return (
    <>
      {main}
      <div className="mt-2.5 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2.5">
        {others.map((l) =>
          l === 'song' && !isActive ? (
            <SmallCard key="song-off" layer="song-off" />
          ) : (
            <SmallCard key={l} layer={l} record={subject} deck={deck} onOpen={onLayer} />
          ),
        )}
      </div>
    </>
  );
}
