import type { Route } from '../../hooks/useHashRoute.ts';
import type { ThemePreference } from '../../lib/storage/themePreference.ts';
import { ThemeToggle } from './ThemeToggle.tsx';
import styles from './AppHeader.module.css';

interface AppHeaderProps {
  route: Route;
  onNavigate: (route: Route) => void;
  theme: ThemePreference;
  onToggleTheme: () => void;
}

export function AppHeader({ route, onNavigate, theme, onToggleTheme }: AppHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.seal} aria-hidden="true">
          S
        </span>
        <h1 className={styles.title}>Smart Email Generator</h1>
      </div>
      <div className={styles.controls}>
        <nav className={styles.nav}>
          <button
            type="button"
            className={route === 'generator' ? styles.active : ''}
            onClick={() => onNavigate('generator')}
          >
            Generator
          </button>
          <button
            type="button"
            className={route === 'history' ? styles.active : ''}
            onClick={() => onNavigate('history')}
          >
            History
          </button>
        </nav>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
