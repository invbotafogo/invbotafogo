import { useEffect } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import { Header } from './Header';
import { WhatsAppFab } from './WhatsAppFab';
import '../../styles/fabs.css';

export function Layout() {
  const { pathname, hash } = useLocation();
  const tipoDeNavegacao = useNavigationType();

  /*
   * Trocou de página, começa do topo. O React Router mantém a rolagem da
   * página anterior: clicar na logo ou no menu com a página rolada abria a
   * página nova no meio.
   *
   * Ficam de fora o "voltar" do navegador (POP), que devolve a posição de
   * antes, e os links com âncora (/#nossa-historia, /?agenda=mes#programacao),
   * que a própria página rola até o lugar certo. `instant` porque o
   * global.css deixa a rolagem suave: sem isso a página nova "subiria"
   * animada.
   */
  useEffect(() => {
    if (tipoDeNavegacao === 'POP' || hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    /* Só a troca de página conta: mudar ?ministerio= ou ?assunto= não rola. */
  }, [pathname]);

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
