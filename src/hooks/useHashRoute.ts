import { useCallback, useEffect, useState } from 'react';

export type Route = 'generator' | 'history';

function readRoute(): Route {
  return window.location.hash === '#/history' ? 'history' : 'generator';
}

export function useHashRoute(): [Route, (route: Route) => void] {
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((next: Route) => {
    window.location.hash = next === 'history' ? '#/history' : '#/generator';
  }, []);

  return [route, navigate];
}
