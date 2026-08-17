import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { useMobileMenu } from '../../hooks/useMobileMenu';
import '../../styles/header.css';

/** EBD e Capacitação foram unificados no item único "Estudos". */
const ITENS = [
  { para: '/', rotulo: 'Home' },
  { para: '/contato', rotulo: 'Contato' },
  { para: '/estudos', rotulo: 'Estudos' },
  { para: '/ministerios', rotulo: 'Ministérios' },
  { para: '/doacao', rotulo: 'Doe' },
  { para: '/cultos', rotulo: 'Cultos' },
];

export function Header() {
  const { aberto, alternar, fechar } = useMobileMenu();

  return (
    <header className="navbar">
      <div className="logo navbar__brand">
        <Link to="/">
          <img src={logo} alt="INVB Logo" />
        </Link>
      </div>

      <nav>
        <ul id="menu" className={`navbar__menu${aberto ? ' is-open' : ''}`}>
          {ITENS.map((item) => (
            <li key={item.para}>
              <NavLink to={item.para} onClick={fechar} end={item.para === '/'}>
                {item.rotulo}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        type="button"
        className={`navbar__toggle${aberto ? ' active' : ''}`}
        aria-label="Abrir menu"
        aria-expanded={aberto}
        aria-controls="menu"
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
  );
}
