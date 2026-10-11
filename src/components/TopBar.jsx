import { two } from '../lib/format.js';
import Switch from './Switch.jsx';

function NavButton({ current, children, ...props }) {
  return (
    <button
      type="button"
      aria-current={current ? 'page' : undefined}
      className="caps min-h-11 text-muted aria-[current=page]:text-ink aria-[current=page]:shadow-[inset_0_-2px_0_var(--accent)]"
      {...props}
    >
      {children}
    </button>
  );
}

export default function TopBar({ view, go, count, muted, onToggleMute, theme, onToggleTheme }) {
  return (
    <header className="caps relative z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
      <nav aria-label="Sections" className="flex gap-7">
        <NavButton current={view !== 'library'} onClick={() => go({ name: 'store' })}>01 Store</NavButton>
        <NavButton current={view === 'library'} onClick={() => go({ name: 'library' })}>02 Library</NavButton>
      </nav>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
        <Switch label="Sound" checked={!muted} onChange={onToggleMute} />
        <Switch label="Dark" checked={theme === 'dark'} onChange={onToggleTheme} />
        <span data-ui="count" className="text-muted">
          {two(count)} {count === 1 ? 'record' : 'records'} in your library
        </span>
      </div>
    </header>
  );
}
