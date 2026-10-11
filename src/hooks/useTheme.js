import { useEffect, useState } from 'react';

const KEY = 'record-store-theme';
const DARK = '(prefers-color-scheme: dark)';

const systemTheme = () => (window.matchMedia?.(DARK).matches ? 'dark' : 'light');
const savedChoice = () => {
  try {
    const value = localStorage.getItem(KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

// Light or dark. Until you use the switch the app follows the system setting;
// after that your choice is remembered in this browser.
export function useTheme() {
  const [choice, setChoice] = useState(savedChoice);
  const [system, setSystem] = useState(systemTheme);

  useEffect(() => {
    const query = window.matchMedia?.(DARK);
    if (!query) return undefined;
    const onChange = (e) => setSystem(e.matches ? 'dark' : 'light');
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const theme = choice ?? system;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setChoice(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // storage unavailable: the choice lasts for this visit only
    }
  };

  return { theme, toggle };
}
