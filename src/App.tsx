import { AppHeader } from './components/layout/AppHeader.tsx';
import { GeneratorPage } from './pages/GeneratorPage.tsx';
import { HistoryPage } from './pages/HistoryPage.tsx';
import { useHashRoute } from './hooks/useHashRoute.ts';
import { useTheme } from './hooks/useTheme.ts';

function App() {
  const [route, navigate] = useHashRoute();
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <AppHeader route={route} onNavigate={navigate} theme={theme} onToggleTheme={toggleTheme} />
      {route === 'generator' ? <GeneratorPage /> : <HistoryPage />}
    </>
  );
}

export default App;
