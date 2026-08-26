import { HeroHome } from '../components/home/HeroHome';
import { VerseCta } from '../components/home/VerseCta';
import { EdCalendar } from '../components/home/EdCalendar';
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

  return (
    <div className="section-index">
      <HeroHome esmaecido={rolou} />

      {/* Blocos editoriais copiados do site-igreja. */}
      <div className="wrap">
        {/* Versículo + botões: fora do hero, abrindo os blocos editoriais. */}
        {/* <VerseCta /> */}

        <div className="ed-home">
          <EdCalendar />
          <EdLocation />
          {/* Linha fina dourada separando "Localização" de "Nossa história". */}
          <hr className="ed-divider" aria-hidden="true" />
          <EdHistory />
        </div>
      </div>

      <FooterSlot />
    </div>
  );
}
