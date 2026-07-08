import { useState } from 'react';
import { AppHeader } from './components/layout/AppHeader.tsx';
import { GeneratorPage } from './pages/GeneratorPage.tsx';
import { HistoryPage } from './pages/HistoryPage.tsx';
import { useHashRoute } from './hooks/useHashRoute.ts';
import { useTheme } from './hooks/useTheme.ts';
import type { HistoryEntry } from './types/history.ts';

function App() {
  const [route, navigate] = useHashRoute();
  const [theme, toggleTheme] = useTheme();
  const [entryToLoad, setEntryToLoad] = useState<HistoryEntry | null>(null);

  function handleSelectEntry(entry: HistoryEntry) {
    setEntryToLoad(entry);
    navigate('generator');
  }

  return (
    <>
      <AppHeader route={route} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />
      {route === 'generator' ? (
        <GeneratorPage entryToLoad={entryToLoad} onEntryLoaded={() => setEntryToLoad(null)} />
      ) : (
        <HistoryPage onSelectEntry={handleSelectEntry} />
      )}
    </>
  );
}

export default App;
