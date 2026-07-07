import type { Route } from '../../hooks/useHashRoute.ts';
import styles from './AppHeader.module.css';

interface AppHeaderProps {
  route: Route;
  onNavigate: (route: Route) => void;
}

export function AppHeader({ route, onNavigate }: AppHeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Smart Email Generator</h1>
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
    </header>
  );
}
