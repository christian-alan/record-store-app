const base = { 'aria-hidden': true, fill: 'currentColor' };

export const PlayIcon = () => (
  <svg {...base} width="22" height="22" viewBox="0 0 22 22"><path d="M7 3.5v15L19 11z" /></svg>
);
export const PauseIcon = () => (
  <svg {...base} width="22" height="22" viewBox="0 0 22 22"><path d="M5.5 4h4v14h-4zM12.5 4h4v14h-4z" /></svg>
);
export const PrevIcon = () => (
  <svg {...base} width="18" height="18" viewBox="0 0 18 18"><path d="M4 3.5h2v11H4zM15 3.5v11L7 9z" /></svg>
);
export const NextIcon = () => (
  <svg {...base} width="18" height="18" viewBox="0 0 18 18"><path d="M12 3.5h2v11h-2zM3 3.5v11L11 9z" /></svg>
);
export const RepeatIcon = () => (
  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.5 10a5.5 5.5 0 1 1-1.6-3.9M15.5 3.5v3h-3" />
  </svg>
);
