import { Link } from 'react-router-dom';
import { IGREJA, REDES } from '../lib/constants';
import { LINKS_DA_BIO, type LinkDaBio } from '../lib/links';
import { useNextService } from '../hooks/useNextService';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useForaDosBuscadores } from '../hooks/useForaDosBuscadores';
import '../styles/links.css';

function Botao({ link, aoVivo }: { link: LinkDaBio; aoVivo: boolean }) {
  const classe = `lk-botao${link.destaque ? ' lk-botao--destaque' : ''}`;
  const conteudo = (
    <>
      <span className="lk-icone" aria-hidden="true">
        <i className={link.icone} />
      </span>
      <span className="lk-texto">
        <span className="lk-titulo">
          {link.titulo}
          {link.mostraAoVivo && aoVivo && (
            <span className="lk-ao-vivo">
              <span className="lk-pulso" aria-hidden="true" />
              Ao vivo agora
            </span>
          )}
        </span>
        <span className="lk-detalhe">{link.detalhe}</span>
      </span>
      <i className="fa-solid fa-chevron-right lk-seta" aria-hidden="true" />
    </>
  );

  return link.destino.startsWith('/') ? (
    <Link className={classe} to={link.destino}>
      {conteudo}
    </Link>
  ) : (
    <a className={classe} href={link.destino} target="_blank" rel="noopener noreferrer">
      {conteudo}
    </a>
  );
}

/**
 * /links: o link da bio do Instagram. Não está no menu do site. Uma tela só,
 * com o que as pessoas procuram ao chegar pelo Instagram: o primeiro botão,
 * em dourado, leva para "Primeira vez aqui?"; os outros, para o resto do
 * site. Os botões moram em src/lib/links.ts.
 *
 * Nada de <header>, <nav> ou <footer> aqui dentro: o CSS do site estiliza
 * essas tags pelo nome (header.css fixa todo <header> no topo da tela).
 */
export default function Links() {
  useDocumentTitle('INVB - Links');
  useForaDosBuscadores();
  const proximoCulto = useNextService();
  const aoVivo = proximoCulto?.aoVivo ?? false;

  return (
    <div className="section-links" id="main">
      <div className="lk-wrap">
        <div className="lk-intro">
          {/* "Nova Vida" não se separa na quebra de linha. */}
          <h1>{IGREJA.nome.replace('Nova Vida', 'Nova\u00a0Vida')}</h1>
          <p>Não apenas uma igreja, mas uma família.</p>
          {proximoCulto && (
            <p className="lk-proximo">
              <i className="fa-regular fa-clock" aria-hidden="true" />
              {aoVivo ? 'Tem culto acontecendo agora' : `Próximo culto: ${proximoCulto.rotulo}`}
            </p>
          )}
        </div>

        <ul className="lk-lista">
          {LINKS_DA_BIO.map((link) => (
            <li key={link.titulo}>
              <Botao link={link} aoVivo={aoVivo} />
            </li>
          ))}
        </ul>

        <div className="lk-redes">
          <a href={REDES.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <i className="fa-brands fa-youtube" aria-hidden="true" />
          </a>
          <a href={REDES.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fa-brands fa-instagram" aria-hidden="true" />
          </a>
          <a href={REDES.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fa-brands fa-facebook-f" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
