import { ContactForm } from '../components/contato/ContactForm';
import { FooterSlot } from '../components/layout/Footer';
import { IGREJA } from '../lib/constants';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import '../styles/contato.css';

export default function Contato() {
  useDocumentTitle('INVB - Contato');

  return (
    <div id="main">
      <div className="section-contato">
        <div className="contato-glass-card">
          <div className="text">
            <h2>Contato</h2>
            <p>
              Entre em contato conosco para saber mais sobre nossa igreja e nossos cultos.
            </p>
            <p>
              <i className="fa-solid fa-envelope" /> E-mail:{' '}
              <a id="email" href={`mailto:${IGREJA.email}`}>
                {IGREJA.email}
              </a>
            </p>
            <p>
              <i className="fa-solid fa-phone" /> Telefone:{' '}
              <a href={IGREJA.telefoneHref}>{IGREJA.telefone}</a>
            </p>

            <ContactForm />
          </div>
        </div>
      </div>

      <FooterSlot />
    </div>
  );
}
