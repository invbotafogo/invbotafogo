import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HeroHome } from '../components/home/HeroHome';
import { EdCalendar } from '../components/home/EdCalendar';
import { EdDevocional } from '../components/home/EdDevocional';
import { EdLocation } from '../components/home/EdLocation';
import { EdHistory } from '../components/home/EdHistory';
import { FooterSlot } from '../components/layout/Footer';
import { useScrollFade } from '../hooks/useScrollFade';
import { useReveal } from '../hooks/useReveal';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import '../styles/home.css';

export default function Home() {
  useDocumentTitle('INVB - Igreja Nova Vida de Botafogo');
  useReveal();
  const rolou = useScrollFade();
  const { hash } = useLocation();

  /* Links como /#nossa-historia (vindos da página "Primeira vez aqui?"):
     o React Router troca a rota, mas não rola até a âncora. O
     requestAnimationFrame deixa a rolagem para depois dos efeitos do
     Layout, caso algum deles leve a página de volta ao topo. */
  useEffect(() => {
    if (!hash) return;
    const quadro = requestAnimationFrame(() => {
      document
        .getElementById(hash.slice(1))
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => cancelAnimationFrame(quadro);
  }, [hash]);

  return (
    <div className="section-index">
      <HeroHome esmaecido={rolou} />

      {/* Blocos editoriais copiados do site-igreja. */}
      <div className="wrap">
        <div className="ed-home">
          <EdDevocional />
          <EdCalendar />
          {/* Devocional do dia: entra logo após a programação, ainda alto na
              página, porque é o conteúdo que muda todo dia e dá motivo para
              a pessoa voltar. */}
          <EdLocation />
          {/* Linha fina dourada separando "Localização" de "Nossa história". */}
          <hr className="ed-divider" aria-hidden="true" />
          {/* Âncora de /#nossa-historia; a margem compensa o header fixo. */}
          <div
            id="nossa-historia"
            style={{ scrollMarginTop: 'calc(var(--navbar-height) + 24px)' }}
          >
            <EdHistory />
          </div>
        </div>
      </div>

      <FooterSlot />
    </div>
  );
}
