import { NextService } from '../components/cultos/NextService';
import { VideoList } from '../components/cultos/VideoList';
import { FooterSlot } from '../components/layout/Footer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import '../styles/cultos.css';

export default function Cultos() {
  useDocumentTitle('INVB - Cultos');

  return (
    <div className="section-cultos">
      <NextService />

      <section id="ultimos-cultos" className="ultimos-cultos">
        <h2>Últimos Cultos</h2>
        <VideoList />
      </section>

      <FooterSlot />
    </div>
  );
}
