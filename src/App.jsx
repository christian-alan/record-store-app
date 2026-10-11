import { useRef, useState } from 'react';
import { BY_ID, STARTER_LIBRARY } from './data/catalog.js';
import { useLibrary } from './hooks/useLibrary.js';
import { usePlayer } from './hooks/usePlayer.js';
import { useTheme } from './hooks/useTheme.js';
import { loadSaved } from './lib/storage.js';
import MiniPlayer from './components/MiniPlayer.jsx';
import TopBar from './components/TopBar.jsx';
import Library from './components/library/Library.jsx';
import RecordPage from './components/store/RecordPage.jsx';
import Store from './components/store/Store.jsx';

// Three screens: the store, one record's page in the store, and the library.
// App owns what is shared between them: which screen is open, the library, the turntable.
export default function App() {
  const savedMuted = useRef(loadSaved().muted).current;
  const [view, setView] = useState({ name: 'store' });
  const [picked, setPicked] = useState(null); // the record taken off the shelf, if any
  const { theme, toggle: toggleTheme } = useTheme();

  // usePlayer needs "mark as played" from the library, and the library saves the mute setting
  // from the player, so the callback goes through a ref.
  const markPlayed = useRef(() => {});
  const player = usePlayer({ initiallyMuted: savedMuted, onFirstPlay: (id) => markPlayed.current(id) });
  const library = useLibrary(player.muted);
  markPlayed.current = library.markPlayed;

  const go = (next) => {
    setView(next);
    window.scrollTo(0, 0);
  };
  const playNow = (id) => {
    setPicked(id);
    go({ name: 'library' });
  };
  const reset = (list) => {
    player.actions.takeOff();
    setPicked(null);
    library.reset(list);
    go({ name: list.length ? 'store' : 'library' });
  };

  const record = view.name === 'record' ? BY_ID[view.id] : null;
  const showMini = view.name !== 'library' && player.record && player.isActive;

  return (
    <div className="mx-auto max-w-[1440px] px-[clamp(16px,3.9vw,56px)] pt-5 pb-[110px]">
      <TopBar view={view.name} go={go} count={library.owned.length} muted={player.muted} onToggleMute={player.actions.toggleMute} theme={theme} onToggleTheme={toggleTheme} />

      {view.name === 'store' && <Store owns={library.owns} onOpen={(id) => go({ name: 'record', id })} />}
      {record && (
        <RecordPage
          key={record.id}
          record={record}
          ownedEntry={library.owned.find((o) => o.id === record.id)}
          onBuy={library.buy}
          onPlayNow={playNow}
          onBack={() => go({ name: 'store' })}
        />
      )}
      {view.name === 'library' && (
        <Library
          owned={library.owned}
          picked={picked}
          onPick={setPicked}
          player={player}
          onGoToStore={() => go({ name: 'store' })}
          onOpenInStore={(id) => go({ name: 'record', id })}
        />
      )}

      <footer className="caps mt-11 flex flex-wrap items-center gap-x-6 border-t border-line pt-2.5 text-muted">
        <span>Records, stories and sound are stand-ins.</span>
        <button type="button" className="caps min-h-11 text-ink underline underline-offset-[3px]" onClick={() => reset(STARTER_LIBRARY)}>
          Reset to three records
        </button>
        <button type="button" className="caps min-h-11 text-ink underline underline-offset-[3px]" onClick={() => reset([])}>
          Reset to an empty library
        </button>
      </footer>

      {showMini && <MiniPlayer player={player} onOpen={() => go({ name: 'library' })} />}
    </div>
  );
}
