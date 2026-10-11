import { cx } from '../lib/cx.js';

// A small on/off switch with its label, used in the top bar.
export default function Switch({ label, checked, onChange }) {
  return (
    <button type="button" role="switch" aria-checked={checked} className="caps flex min-h-11 items-center gap-2.5" onClick={() => onChange(!checked)}>
      <span>{label}</span>
      <span aria-hidden="true" className={cx('relative h-4 w-8 shadow-[inset_0_0_0_1.5px_var(--ink)] transition-colors', checked && 'bg-ink')}>
        <span
          className={cx(
            'absolute top-1 left-1 size-2 transition-transform duration-200 motion-reduce:transition-none',
            checked ? 'translate-x-4 bg-ground' : 'bg-ink',
          )}
        />
      </span>
    </button>
  );
}
