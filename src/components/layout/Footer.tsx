import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { IGREJA, REDES } from '../../lib/constants';
import { MINISTERIOS } from '../../lib/ministerios';
import '../../styles/footer.css';

const LINKS_INSTITUCIONAIS = [
  { para: '/', rotulo: 'Home' },
  { para: '/contato', rotulo: 'Contato' },
  { para: '/estudos', rotulo: 'Estudos' },
  { para: '/doacao', rotulo: 'Doe' },
  { para: '/cultos', rotulo: 'Cultos' },
];

/** Rótulos completos usados só no rodapé (o card usa a versão curta). */
const ROTULO_RODAPE: Record<string, string> = {
  louvor: 'Ministério de Louvor',
  infantil: 'Ministério Infantil',
  intercessao: 'Ministério de Intercessão',
  comunicacoes: 'Ministério de Comunicações',
  juventude: 'Ministério da Juventude',
  mulheres: 'Ministério de Mulheres',
  guerreiros: 'Grupo de Guerreiros',
  introducao: 'Ministério de Introdução & Recepção',
  evangelismo: 'Ministério de Evangelismo',
};

const REDES_SOCIAIS = [
  { href: REDES.youtube, icone: 'fa-brands fa-youtube fa-xl', nome: 'YouTube' },
  { href: REDES.facebook, icone: 'fa-brands fa-facebook fa-xl', nome: 'Facebook' },
  { href: REDES.instagram, icone: 'fa-brands fa-instagram fa-xl', nome: 'Instagram' },
  { href: REDES.whatsapp, icone: 'fa-brands fa-whatsapp fa-xl', nome: 'WhatsApp' },
];

export function Footer() {
  const grupo1 = MINISTERIOS.slice(0, 5);
  const grupo2 = MINISTERIOS.slice(5);

  return (
    <footer>
      <div className="logo footer-top">
        <Link to="/">
          <img src={logo} alt="INVB Logo" />
        </Link>
        <nav>
          <ul className="social-icons">
            {REDES_SOCIAIS.map((rede) => (
              <li key={rede.nome}>
                <a href={rede.href} target="_blank" rel="noopener noreferrer" aria-label={rede.nome}>
                  <i className={rede.icone} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <hr />

      <div className="footer-content">
        <div className="footer-links">
          <div>
            <ul>
              {LINKS_INSTITUCIONAIS.map((link) => (
                <li key={link.para}>
                  <Link to={link.para}>{link.rotulo}</Link>
                </li>
              ))}
              <li id="esconder">
                <Link to="/ministerios">Ministérios</Link>
              </li>
            </ul>
          </div>

          <div className="footer_infos">
            <ul>
              {grupo1.map((m) => (
                <li key={m.id}>
                  <Link to={`/ministerios?ministerio=${m.id}`}>{ROTULO_RODAPE[m.id]}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer_infos">
            <ul>
              {grupo2.map((m) => (
                <li key={m.id}>
                  <Link to={`/ministerios?ministerio=${m.id}`}>{ROTULO_RODAPE[m.id]}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4>{IGREJA.nomeCurto}</h4>
            <p>{IGREJA.enderecoFooter}</p>
            <p>
              <i className="fa-solid fa-envelope" /> E-mail:{' '}
              <a href={`mailto:${IGREJA.email}`}>{IGREJA.email}</a>
            </p>
            <p>
              <i className="fa-solid fa-phone" /> Telefone:{' '}
              <a href={IGREJA.telefoneHref}>{IGREJA.telefone}</a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        © 2025 {IGREJA.nome}. Todos os direitos reservados.
      </div>
    </footer>
  );
}

/** Wrapper com o id que o CSS antigo usa (`.section-ministerios #footer`, `#footer, footer`). */
export function FooterSlot() {
  return (
    <div id="footer">
      <Footer />
    </div>
  );
}
