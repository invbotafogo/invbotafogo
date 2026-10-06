import { NextService } from '../components/cultos/NextService';
import { VideoList } from '../components/cultos/VideoList';
import { FooterSlot } from '../components/layout/Footer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import '../styles/cultos.css';

/**
 * Cultos: a abertura com o próximo culto em destaque e, embaixo, as últimas
 * mensagens publicadas no YouTube (atualizadas sozinhas pelo workflow).
 */
export default function Cultos() {
  useDocumentTitle('INVB - Cultos');

  return (
    <>
      <div className="section-cultos" id="main">
        <div className="cul-wrap">
          <div className="cul-topo">
            <div className="cul-intro">
              <h1>Cultos</h1>
              <p>
                Os cultos são transmitidos ao vivo no YouTube. Aqui ficam as mensagens mais
                recentes, para assistir quando quiser.
              </p>
            </div>

            <NextService />
          </div>

          <VideoList />
        </div>
      </div>

      <FooterSlot />
    </>
  );
}