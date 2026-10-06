import { useRef } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { IGREJA, REDES } from '../../lib/constants';
import { CULTOS } from '../../lib/cultos';
import { MINISTERIOS, NOME_EXPANDIDO } from '../../lib/ministerios';
import { useRodapeAVista } from '../../hooks/useRodapeAVista';
import { AcessoCentral } from './AcessoCentral';
import '../../styles/footer.css';

const PAGINAS = [
  { para: '/', rotulo: 'Home' },
  { para: '/primeira-vez', rotulo: 'Primeira vez?' },
  { para: '/cultos', rotulo: 'Cultos' },
  { para: '/estudos', rotulo: 'Estudos' },
  { para: '/ministerios', rotulo: 'Ministérios' },
  { para: '/doacao', rotulo: 'Doe' },
  { para: '/contato', rotulo: 'Contato' },
];

const REDES_SOCIAIS = [
  { href: REDES.youtube, icone: 'fa-brands fa-youtube', nome: 'YouTube' },
  { href: REDES.instagram, icone: 'fa-brands fa-instagram', nome: 'Instagram' },
  { href: REDES.facebook, icone: 'fa-brands fa-facebook-f', nome: 'Facebook' },
  { href: REDES.whatsapp, icone: 'fa-brands fa-whatsapp', nome: 'WhatsApp' },
];

const NOME_DO_DIA = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

/* 10:00 → "10h"; 19:30 → "19h30". */
const hora = (h: number, m: number) => (m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`);

/* ["10h", "19h"] → "10h e 19h". */
const juntar = (itens: string[]) =>
  itens.length > 1 ? `${itens.slice(0, -1).join(', ')} e ${itens[itens.length - 1]}` : itens[0];

/*
 * Os horários de culto, agrupados por dia, domingo primeiro: vêm da mesma
 * grade que calcula o "Próximo culto" (lib/cultos.ts). Mudou lá, muda aqui.
 */
const CULTOS_POR_DIA = [...new Set(CULTOS.map((culto) => culto.dia))]
  .sort((a, b) => a - b)
  .map((dia) => ({
    dia: NOME_DO_DIA[dia],
    horas: juntar(
      CULTOS.filter((culto) => culto.dia === dia)
        .sort((a, b) => a.hora * 60 + a.minutos - (b.hora * 60 + b.minutos))
        .map((culto) => hora(culto.hora, culto.minutos)),
    ),
  }));

/* "Rua da Matriz, 95" numa linha e "Botafogo, Rio de Janeiro" na outra. */
const [rua, bairroECidade] = IGREJA.enderecoCompleto.split(' - ');
const MAPA = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(IGREJA.enderecoCompleto)}`;
const [usuarioDoEmail, dominioDoEmail] = IGREJA.email.split('@');

function voltarAoTopo() {
  const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: semMovimento ? 'auto' : 'smooth' });
}

/* Link para a página em que a pessoa já está: o React Router não troca de
   página, então o clique leva ao topo. Trocando de página, quem sobe é o
   Layout. */
function subirSeForAMesmaPagina(destino: string) {
  if (window.location.pathname === destino) voltarAoTopo();
}

/**
 * Rodapé: a marca com as redes, as páginas, os ministérios e "Visite a gente"
 * (endereço, horários dos cultos, telefone e e-mail). Mesma largura do header
 * e das páginas.
 */
export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="rodape">
      <div className="rod-wrap">
        <div className="rod-grade">
          <div className="rod-marca">
            <Link
              to="/"
              className="rod-logo"
              aria-label="Página inicial"
              onClick={() => subirSeForAMesmaPagina('/')}
            >
              <img src={logo} alt="Nova Vida Botafogo" width={170} height={70} />
            </Link>
            <p className="rod-lema">Não apenas uma Igreja, mas uma Família!</p>
            <ul className="rod-redes">
              {REDES_SOCIAIS.map((rede) => (
                <li key={rede.nome}>
                  <a href={rede.href} target="_blank" rel="noopener noreferrer" aria-label={rede.nome}>
                    <i className={rede.icone} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="rod-coluna rod-paginas" aria-labelledby="rod-paginas-titulo">
            <h2 id="rod-paginas-titulo">Páginas</h2>
            {/* Duas listas: no celular, cada uma é uma fileira centralizada. */}
            {[PAGINAS.slice(0, 4), PAGINAS.slice(4)].map((fileira) => (
              <ul className="rod-lista" key={fileira[0].para}>
                {fileira.map((pagina) => (
                  <li key={pagina.para}>
                    <Link to={pagina.para} onClick={() => subirSeForAMesmaPagina(pagina.para)}>
                      {pagina.rotulo}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>

          <nav className="rod-coluna rod-ministerios" aria-labelledby="rod-ministerios-titulo">
            <h2 id="rod-ministerios-titulo">Ministérios</h2>
            <ul className="rod-lista">
              {MINISTERIOS.map((ministerio) => (
                <li key={ministerio.id}>
                  <Link to={`/ministerios?ministerio=${ministerio.id}`}>
                    {NOME_EXPANDIDO[ministerio.id] ?? ministerio.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="rod-coluna rod-visite">
            <h2>Visite a gente</h2>
            <address>
              <p className="rod-endereco">
                {rua}
                <br />
                {bairroECidade}
              </p>
              <a className="rod-mapa" href={MAPA} target="_blank" rel="noopener noreferrer">
                Ver no mapa
              </a>

              <dl className="rod-horarios">
                {CULTOS_POR_DIA.map((culto) => (
                  <div key={culto.dia}>
                    <dt>{culto.dia}</dt>
                    <dd>{culto.horas}</dd>
                  </div>
                ))}
              </dl>

              <p className="rod-contato">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                <a href={IGREJA.telefoneHref}>{IGREJA.telefone}</a>
              </p>
              <p className="rod-contato">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                <a href={`mailto:${IGREJA.email}`}>
                  {usuarioDoEmail}
                  <wbr />@{dominioDoEmail}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="rod-base">
          {/* Na página inicial, 5 toques aqui abrem o código da Central INVB. */}
          <AcessoCentral>
            © {ano} {IGREJA.nome}
          </AcessoCentral>
          <button type="button" className="rod-topo" onClick={voltarAoTopo}>
            Voltar ao topo <i className="fa-solid fa-arrow-up" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}

/** Wrapper com o id que o global.css usa (`#footer, footer`). */
export function FooterSlot() {
  /* O rodapé avisa o CSS quando entra na tela, para o botão flutuante de
     WhatsApp sair da frente dos links. Ver hooks/useRodapeAVista.ts. */
  const rodape = useRef<HTMLDivElement>(null);
  useRodapeAVista(rodape);

  return (
    <div id="footer" ref={rodape}>
      <Footer />
    </div>
  );
}