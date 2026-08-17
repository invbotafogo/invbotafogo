import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';

/** No site antigo cada clique recarregava a página; aqui o scroll precisa voltar ao topo. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <div id="header">
        <Header />
      </div>
      <Outlet />
    </>
  );
}
