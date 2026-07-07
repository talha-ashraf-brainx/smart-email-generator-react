import { AppHeader } from './components/layout/AppHeader.tsx';
import { GeneratorPage } from './pages/GeneratorPage.tsx';
import { HistoryPage } from './pages/HistoryPage.tsx';
import { useHashRoute } from './hooks/useHashRoute.ts';

function App() {
  const [route, navigate] = useHashRoute();

  return (
    <>
      <AppHeader route={route} onNavigate={navigate} />
      {route === 'generator' ? <GeneratorPage /> : <HistoryPage />}
    </>
  );
}

export default App;
