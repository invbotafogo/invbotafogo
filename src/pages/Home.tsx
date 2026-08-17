import { HeroHome } from '../components/home/HeroHome';
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
        <div className="ed-home">
          <EdCalendar />
          <EdLocation />
          <EdHistory />
        </div>
      </div>

      <FooterSlot />
    </div>
  );
}
