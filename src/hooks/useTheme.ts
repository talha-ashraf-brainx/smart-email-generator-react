import { useCallback, useEffect, useState } from 'react';
import { getStoredTheme, setStoredTheme } from '../lib/storage/themePreference.ts';
import type { ThemePreference } from '../lib/storage/themePreference.ts';

export function useTheme(): [ThemePreference, () => void] {
  const [theme, setTheme] = useState<ThemePreference>(getStoredTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: ThemePreference = current === 'light' ? 'dark' : 'light';
      setStoredTheme(next);
      return next;
    });
  }, []);

  return [theme, toggleTheme];
}
