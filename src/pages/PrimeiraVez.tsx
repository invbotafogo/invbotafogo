import { Link } from 'react-router-dom';
import { FooterSlot } from '../components/layout/Footer';
import { ArrowRight, Clock, MapPin } from '../components/home/icons';
import { IGREJA, REDES } from '../lib/constants';
import { PROGRAMACAO_SEMANAL } from '../lib/programacao';
import {
  CRIANCAS,
  ETAPAS_DO_CULTO,
  HISTORIA,
  PERGUNTAS,
  SOBRE_OS_ENCONTROS,
  type LinkDaPergunta,
} from '../lib/primeiraVez';
import { useNextService } from '../hooks/useNextService';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import '../styles/primeira-vez.css';

const DESTINO = encodeURIComponent(IGREJA.enderecoCompleto);
const MAPA = `https://www.google.com/maps?q=${DESTINO}&output=embed`;
const ROTA_GOOGLE_MAPS = `https://www.google.com/maps/dir/?api=1&destination=${DESTINO}`;
const ROTA_WAZE = `https://waze.com/ul?q=${DESTINO}&navigate=yes`;

function LinkDaResposta({ link }: { link: LinkDaPergunta }) {
  const conteudo = (
    <>
      {link.rotulo} <ArrowRight />
    </>
  );

  return 'rota' in link ? (
    <Link className="pv-link" to={link.rota}>
      {conteudo}
    </Link>
  ) : (
    <a className="pv-link" href={link.url} target="_blank" rel="noopener noreferrer">
      {conteudo}
    </a>
  );
}

/**
 * "Primeira vez aqui?" — porta de entrada de quem nunca veio a um culto e
 * destino do link da bio do Instagram. Textos em lib/primeiraVez.ts; horários
 * e endereço vêm dos mesmos dados da home.
 *
 * Nada de <header>, <nav> ou <footer> aqui dentro: o CSS do site estiliza
 * essas tags pelo nome (header.css fixa todo <header> no topo da tela).
 */
export default function PrimeiraVez() {
  useDocumentTitle('INVB - Primeira vez aqui?');
  const proximoCulto = useNextService();

  return (
    <>
      <div className="section-primeira-vez" id="main">
        <div className="pv-wrap">
          <section className="pv-intro" aria-labelledby="pv-titulo">
            <p className="pv-kicker">Primeira vez aqui?</p>
            <h1 id="pv-titulo">Que bom que você quer nos conhecer</h1>
            <p className="pv-lead">
              Se você nunca veio a um culto, ou faz tempo que não vai a uma igreja, esta página é
              para você: o que acontece no culto, onde ficam as crianças, os horários e como chegar.
            </p>

            {proximoCulto && (
              <p className="pv-proximo">
                <Clock />
                {proximoCulto.aoVivo ? (
                  <span>
                    Tem culto acontecendo agora.{' '}
                    <a href={REDES.youtubeLive} target="_blank" rel="noopener noreferrer">
                      Assistir ao vivo
                    </a>
                  </span>
                ) : (
                  <span>Próximo culto: {proximoCulto.rotulo}</span>
                )}
              </p>
            )}

            <div className="pv-acoes">
              <a className="pv-btn pv-btn-ouro" href="#horarios">
                Ver os horários
              </a>
              <a className="pv-btn pv-btn-vidro" href="#como-chegar">
                Como chegar <ArrowRight />
              </a>
            </div>
          </section>

          <section className="pv-bloco" aria-labelledby="pv-culto">
            <p className="pv-kicker">O que esperar</p>
            <h2 id="pv-culto">Como é um culto</h2>
            <ol className="pv-etapas">
              {ETAPAS_DO_CULTO.map((etapa) => (
                <li className="pv-etapa" key={etapa.titulo}>
                  <span className="pv-etapa-icone" aria-hidden="true">
                    <i className={etapa.icone} />
                  </span>
                  <h3>{etapa.titulo}</h3>
                  <p>{etapa.texto}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="pv-bloco pv-criancas" aria-labelledby="pv-criancas">
            <span className="pv-criancas-icone" aria-hidden="true">
              <i className="fa-solid fa-child" />
            </span>
            <div>
              <h2 id="pv-criancas">{CRIANCAS.titulo}</h2>
              <p>{CRIANCAS.texto}</p>
              <Link className="pv-link" to="/ministerios?ministerio=infantil">
                Conhecer o Ministério Infantil <ArrowRight />
              </Link>
            </div>
          </section>

          <section className="pv-bloco" id="horarios" aria-labelledby="pv-horarios">
            <p className="pv-kicker">Programação semanal</p>
            <h2 id="pv-horarios">Horários</h2>
            <div className="pv-agenda">
              {PROGRAMACAO_SEMANAL.map((dia) => (
                <div className="pv-dia" key={dia.dia}>
                  <span className="pv-dia-sigla">{dia.dia}</span>
                  <ul>
                    {dia.eventos.map((evento) => (
                      <li key={evento.titulo}>
                        <div className="pv-evento">
                          <b>{evento.titulo}</b>
                          <span className="pv-hora">
                            <Clock /> {evento.horario}
                          </span>
                        </div>
                        {SOBRE_OS_ENCONTROS[evento.titulo] && (
                          <p>{SOBRE_OS_ENCONTROS[evento.titulo]}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="pv-nota">
              Eventos especiais do mês aparecem na{' '}
              {/* Abre a home já na programação do mês (ver EdCalendar.tsx). */}
              <Link to="/?agenda=mes#programacao">programação da página inicial</Link>.
            </p>
          </section>

          <section className="pv-bloco pv-chegar" id="como-chegar" aria-labelledby="pv-chegar">
            <div>
              <p className="pv-kicker">Localização</p>
              <h2 id="pv-chegar">Como chegar</h2>
              <p className="pv-endereco">
                <MapPin /> <span>{IGREJA.enderecoCompleto}</span>
              </p>
              <div className="pv-acoes">
                <a
                  className="pv-btn pv-btn-ouro"
                  href={ROTA_GOOGLE_MAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Traçar rota no Google Maps
                </a>
                <a
                  className="pv-btn pv-btn-vidro"
                  href={ROTA_WAZE}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Abrir no Waze
                </a>
              </div>
            </div>
            <div className="pv-mapa">
              <iframe
                title={`Mapa: ${IGREJA.enderecoCompleto}`}
                src={MAPA}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </section>

          <section className="pv-bloco pv-historia" aria-labelledby="pv-historia">
            <div className="pv-historia-ano">
              <p className="pv-kicker">Quem somos</p>
              <b>{IGREJA.fundacao}</b>
              <span>Desde</span>
            </div>
            <div>
              <h2 id="pv-historia">{HISTORIA.titulo}</h2>
              <p className="pv-historia-texto">{HISTORIA.texto}</p>
              {/* A home rola até a âncora #nossa-historia (ver Home.tsx). */}
              <Link className="pv-link" to="/#nossa-historia">
                Conhecer a nossa história <ArrowRight />
              </Link>
            </div>
          </section>

          <section className="pv-bloco" aria-labelledby="pv-perguntas">
            <p className="pv-kicker">Dúvidas</p>
            <h2 id="pv-perguntas">Perguntas de quem vem pela primeira vez</h2>
            <div className="pv-perguntas">
              {PERGUNTAS.map((item) => (
                <details className="pv-pergunta" key={item.pergunta}>
                  <summary>{item.pergunta}</summary>
                  <p>{item.resposta}</p>
                  {item.link && <LinkDaResposta link={item.link} />}
                </details>
              ))}
            </div>
          </section>

          <section className="pv-bloco pv-convite" aria-labelledby="pv-convite">
            <h2 id="pv-convite">Ainda ficou alguma dúvida?</h2>
            <p>
              Mande uma mensagem pelo WhatsApp e converse com a gente antes de vir. Nas redes você
              já pode conhecer um pouco da igreja.
            </p>
            <div className="pv-redes">
              <a
                className="pv-btn pv-btn-ouro"
                href={REDES.whatsappVisita}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true" /> Falar no WhatsApp
              </a>
              <a
                className="pv-btn pv-btn-vidro"
                href={REDES.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram" aria-hidden="true" /> Instagram
              </a>
              <a
                className="pv-btn pv-btn-vidro"
                href={REDES.youtube}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-youtube" aria-hidden="true" /> YouTube
              </a>
            </div>
          </section>
        </div>
      </div>

      <FooterSlot />
    </>
  );
}