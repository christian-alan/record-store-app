import { cx } from '../lib/cx.js';

const LOOKS = {
  red: 'bg-accent text-on-accent',
  ink: 'bg-ink text-ground',
  line: 'text-ink shadow-[inset_0_0_0_1.5px_var(--ink)]',
  // an outline button sitting on the dark story card
  lineOnHero: 'text-hero-ink shadow-[inset_0_0_0_1.5px_var(--hero-fg)]',
};

export const buttonBase = 'caps flex min-h-14 w-full items-center justify-between gap-4 px-5 text-left text-[13px] font-medium';

export default function Button({ look = 'red', children, className, ...props }) {
  return (
    <button type="button" className={cx(buttonBase, LOOKS[look], className)} {...props}>
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </button>
  );
}

const iconBase = 'inline-flex flex-none items-center justify-center';

export function IconButton({ label, on = false, className, children, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cx(iconBase, 'size-11 disabled:text-off-ink', on ? 'text-accent-ink' : 'text-ink', className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function PlayButton({ label, small = false, children, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cx(iconBase, 'rounded-full bg-accent text-on-accent disabled:bg-off disabled:text-off-ink', small ? 'size-12' : 'size-16')}
      {...props}
    >
      {children}
    </button>
  );
}
