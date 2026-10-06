import { BankDetails } from '../components/doacao/BankDetails';
import { PixButton } from '../components/doacao/PixButton';
import { FooterSlot } from '../components/layout/Footer';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import '../styles/doacao.css';

/* Na Almeida Revista e Atualizada (ARA), a mesma dos versículos do menu e do
   Contato. */
const VERSICULO = {
  texto:
    'Cada um contribua segundo tiver proposto no coração, não com tristeza ou por necessidade; porque Deus ama a quem dá com alegria.',
  referencia: '2 Coríntios 9.7',
};

/**
 * Doe: a abertura com o versículo, o Pix em destaque (QR Code, chave e passo
 * a passo) e, embaixo, os dados da conta para transferência ou depósito.
 */
export default function Doacao() {
  useDocumentTitle('INVB - Doação');

  return (
    <>
      <div className="section-doe" id="main">
        <div className="doe-wrap">
          <div className="doe-topo">
            <div className="doe-intro">
              <h1>Seja um abençoador</h1>
              <p>
                Suas ofertas e dízimos nos ajudam a continuar avançando na obra de Deus em nossa
                comunidade. Contribua com alegria e fé!
              </p>
            </div>

            <figure className="doe-versiculo">
              <blockquote>“{VERSICULO.texto}”</blockquote>
              <figcaption>{VERSICULO.referencia}</figcaption>
            </figure>
          </div>

          <PixButton />
          <BankDetails />
        </div>
      </div>

      <FooterSlot />
    </>
  );
}