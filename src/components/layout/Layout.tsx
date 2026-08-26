import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { WhatsAppFab } from './WhatsAppFab';
import '../../styles/fabs.css';

export function Layout() {
  return (
    <>
      <div id="header">
        <Header />
      </div>

      <Outlet />

      <WhatsAppFab />
    </>
  );
}
