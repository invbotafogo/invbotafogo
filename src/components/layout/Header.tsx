import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useMobileMenu } from '../../hooks/useMobileMenu';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { REDES, VERSICULO_MENU } from '../../lib/constants';
import '../../styles/header.css';

const ITENS = [
  { para: '/', rotulo: 'Home' },
  { para: '/contato', rotulo: 'Contato' },
  { para: '/estudos', rotulo: 'Estudos' },
  { para: '/ministerios', rotulo: 'Ministérios' },
  { para: '/doacao', rotulo: 'Doe' },
  { para: '/cultos', rotulo: 'Cultos' },
];

/* As mesmas redes do rodapé do site, na mesma ordem do Footer.tsx e lendo de
   REDES — nenhuma URL duplicada. Os ícones vêm do Font Awesome já carregado no
   index.html. Mudou a ordem lá? Mude aqui: quem usa o site nos dois lugares
   espera encontrar os ícones na mesma sequência. */
const REDES_GAVETA = [
  { href: REDES.youtube, icone: 'fa-brands fa-youtube fa-xl', nome: 'YouTube' },
  { href: REDES.facebook, icone: 'fa-brands fa-facebook fa-xl', nome: 'Facebook' },
  { href: REDES.instagram, icone: 'fa-brands fa-instagram fa-xl', nome: 'Instagram' },
  { href: REDES.whatsapp, icone: 'fa-brands fa-whatsapp fa-xl', nome: 'WhatsApp' },
];

export function Header() {
  const { aberto, alternar, fechar, gavetaRef, gatilhoRef, arrasto, gestos } =
    useMobileMenu();
  const barraProgresso = useScrollProgress<HTMLDivElement>();

  return (
    /*
     * O overlay e a gaveta ficam FORA do <header> de propósito. O header tem
     * `transform: translateZ(0)` (ver header.css), e um transform torna o
     * elemento o bloco contêiner dos descendentes `position: fixed` — dentro
     * dele, `bottom: 0` seria a base da barra de 70px, não a da tela, e a
     * gaveta nunca teria altura inteira. Como irmãos dentro de `#header`
     * (que é só `position: relative`), os dois medem pela viewport.
     */
    <>
      <header className="navbar">
        <div ref={barraProgresso} className="navbar__progress" />

        <div className="logo navbar__brand">
          <Link to="/" onClick={fechar}>
            <img src={logo} alt="INVB Logo" />
          </Link>
        </div>

        <nav className="navbar__nav">
          <ul className="navbar__menu">
            {ITENS.map((item) => (
              <li key={item.para}>
                <NavLink to={item.para} end={item.para === '/'}>
                  {item.rotulo}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          ref={gatilhoRef}
          className={`navbar__toggle${aberto ? ' active' : ''}`}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
          aria-controls="menu-mobile"
          onClick={(e) => {
            e.stopPropagation();
            alternar();
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Escurece a página atrás da gaveta; clicar aqui fecha. */}
      <div
        className={`navbar__overlay${aberto ? ' is-open' : ''}`}
        onClick={fechar}
        aria-hidden="true"
      />

      {/*
        A gaveta fica sempre no DOM e entra/sai por `transform` — é o que
        permite animar a saída também. Fechada, ela recebe `visibility: hidden`
        no CSS, o que já a tira da navegação por tab e do leitor de tela; por
        isso não há `aria-hidden` aqui, que só duplicaria (e poderia conflitar
        com) esse estado.
      */}
      <nav
        id="menu-mobile"
        ref={gavetaRef}
        className={
          `navbar__drawer${aberto ? ' is-open' : ''}${arrasto ? ' is-arrastando' : ''}`
        }
        /* Enquanto o dedo arrasta, a posição vem daqui e a transição do CSS
           fica desligada por `is-arrastando` — senão a gaveta correria atrás
           do dedo com um quadro de atraso. */
        style={arrasto ? { transform: `translateX(${arrasto}px)` } : undefined}
        {...gestos}
        aria-label="Menu principal"
      >
        <div className="navbar__drawer-top">
          <span className="navbar__drawer-title">Menu</span>
          <button
            type="button"
            className="navbar__drawer-close"
            aria-label="Fechar menu"
            onClick={fechar}
          >
            {/* Duas barras cruzadas, do mesmo talhe das três do hambúrguer —
                é o mesmo X que ele forma quando está aberto. */}
            <span />
            <span />
          </button>
        </div>

        <ul className="navbar__drawer-list">
          {ITENS.map((item) => (
            <li key={item.para}>
              <NavLink to={item.para} onClick={fechar} end={item.para === '/'}>
                {item.rotulo}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* `margin-top: auto` no CSS empurra este bloco para o fim da gaveta,
            ocupando o vazio que sobrava abaixo dos links. */}
        <div className="navbar__drawer-foot">
          <blockquote className="navbar__drawer-verso">
            <p>{VERSICULO_MENU.texto}</p>
            <cite>{VERSICULO_MENU.referencia}</cite>
          </blockquote>

          <ul className="navbar__drawer-redes">
            {REDES_GAVETA.map((rede) => (
              <li key={rede.nome}>
                <a
                  href={rede.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={rede.nome}
                  onClick={fechar}
                >
                  <i className={rede.icone} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
