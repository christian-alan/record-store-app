// Joins class names, skipping anything falsy: cx('a', cond && 'b').
export const cx = (...parts) => parts.filter(Boolean).join(' ');
