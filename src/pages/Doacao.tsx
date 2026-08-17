import { BankDetails } from '../components/doacao/BankDetails';
import { PixButton } from '../components/doacao/PixButton';
import { FooterSlot } from '../components/layout/Footer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import '../styles/doacao.css';

export default function Doacao() {
  useDocumentTitle('INVB - Doação');

  return (
    <>
      <div className="section-doe" id="main">
        <section className="section-ofertas">
          <div className="ofertas-container">
            <h2>Seja um abençoador</h2>
            <p className="versiculo">
              "Cada um contribua segundo propôs no coração, não com tristeza ou por
              necessidade; porque Deus ama a quem dá com alegria." <br />
              <span>— 2 Coríntios 9:7</span>
            </p>

            <p className="descricao">
              Suas ofertas e dízimos nos ajudam a continuar avançando na obra de Deus em
              nossa comunidade. Contribua com alegria e fé!
            </p>

            <div className="blocos-doacao">
              <BankDetails />
              <PixButton />
            </div>
          </div>
        </section>
      </div>

      <FooterSlot />
    </>
  );
}
