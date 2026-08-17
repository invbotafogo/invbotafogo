import { HeroHome } from '../components/home/HeroHome';
import { ServiceInfo } from '../components/home/ServiceInfo';
import { ChurchHistory } from '../components/home/ChurchHistory';
import { FooterSlot } from '../components/layout/Footer';
import { useScrollFade } from '../hooks/useScrollFade';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import '../styles/home.css';

export default function Home() {
  useDocumentTitle('INVB - Igreja Nova Vida de Botafogo');
  const rolou = useScrollFade();

  return (
    <div className="section-index">
      <HeroHome esmaecido={rolou} />

      {/* As duas seções abaixo só aparecem depois da rolagem, como no site antigo. */}
      <div style={{ opacity: rolou ? 1 : 0 }}>
        <ServiceInfo />
      </div>
      <div style={{ opacity: rolou ? 1 : 0 }}>
        <ChurchHistory />
      </div>

      <FooterSlot />
    </div>
  );
}
