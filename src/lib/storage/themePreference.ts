const STORAGE_KEY = 'smart-email-generator:theme';

export type ThemePreference = 'light' | 'dark';

export function getStoredTheme(): ThemePreference {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch (error) {
    console.warn('Failed to read theme preference from localStorage', error);
    return 'light';
  }
}

export function setStoredTheme(theme: ThemePreference): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    console.warn('Failed to write theme preference to localStorage', error);
  }
}
