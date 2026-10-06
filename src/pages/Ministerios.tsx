import { useEffect, useRef, type KeyboardEvent } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { FooterSlot } from '../components/layout/Footer';
import { MINISTERIOS, NOME_EXPANDIDO, type Ministerio } from '../lib/ministerios';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import '../styles/ministerios.css';

/** "Louvor", "Guerreiros", "Introdução & Recepção". */
function nomeDe(ministerio: Ministerio): string {
  return NOME_EXPANDIDO[ministerio.id] ?? ministerio.nome;
}

/** Leva o painel para a tela quando o topo dele está escondido ou abaixo da metade da tela. */
function rolarAteOPainel() {
  const painel = document.getElementById('min-painel');
  if (!painel) return;
  const topo = painel.getBoundingClientRect().top;
  const alturaDoHeader = 70; /* --navbar-height */
  if (topo < alturaDoHeader || topo > window.innerHeight * 0.5) {
    painel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Ministérios: o índice com os nove à esquerda (no celular, uma grade em cima)
 * e, ao lado, o painel do ministério escolhido, com a ilustração, o texto e o
 * que a equipe faz.
 *
 * O ministério aberto fica na URL (?ministerio=louvor), e é assim que os links
 * do rodapé abrem direto no ministério certo. Sem nada na URL, abre o primeiro.
 */
export default function Ministerios() {
  useDocumentTitle('INVB - Ministérios');

  const [parametros, setParametros] = useSearchParams();
  const { key: chaveDaNavegacao } = useLocation();

  const indice = Math.max(
    0,
    MINISTERIOS.findIndex((m) => m.id === parametros.get('ministerio')),
  );
  const ministerio = MINISTERIOS[indice];
  const anterior = MINISTERIOS[indice - 1];
  const proximo = MINISTERIOS[indice + 1];

  const abas = useRef<(HTMLButtonElement | null)[]>([]);

  /* De onde veio a última troca: clique (índice ou anterior/próximo),
     teclado (setas no índice) ou de fora (link do rodapé, chegada na página). */
  const origem = useRef<'clique' | 'teclado' | null>(null);

  const escolher = (i: number, como: 'clique' | 'teclado') => {
    origem.current = como;
    setParametros({ ministerio: MINISTERIOS[i].id }, { replace: true });
    if (como === 'teclado') abas.current[i]?.focus();
  };

  /* Setas, Home e End andam pelo índice, como em qualquer lista de abas. */
  const aoTeclar = (evento: KeyboardEvent<HTMLDivElement>) => {
    const total = MINISTERIOS.length;
    const destino: Record<string, number> = {
      ArrowDown: (indice + 1) % total,
      ArrowRight: (indice + 1) % total,
      ArrowUp: (indice - 1 + total) % total,
      ArrowLeft: (indice - 1 + total) % total,
      Home: 0,
      End: total - 1,
    };
    if (!(evento.key in destino)) return;
    evento.preventDefault();
    escolher(destino[evento.key], 'teclado');
  };

  /*
   * Depois de cada troca, o painel vem para a tela se tiver ficado fora de
   * vista: no celular ele fica embaixo da grade; no computador, o "Próximo"
   * fica no fim do painel. Quem anda pelo teclado não é rolado — a aba focada
   * sairia da tela. Chegando sem ministério na URL, a página fica no topo.
   */
  useEffect(() => {
    const como = origem.current;
    origem.current = null;
    if (como === 'teclado') return;
    if (como === null && !parametros.has('ministerio')) return;

    let cancelado = false;
    /* Espera a Montserrat: com a fonte de reserva a página tem outra altura. */
    document.fonts.ready.then(() => {
      if (!cancelado) rolarAteOPainel();
    });
    return () => {
      cancelado = true;
    };
    /* Roda a cada navegação — inclusive um clique no rodapé no ministério que
       já está aberto, que não muda o `indice`. */
  }, [chaveDaNavegacao]);

  return (
    <>
      <div className="section-ministerios" id="main">
        <div className="min-wrap">
          <div className="min-intro">
            <h1>Ministérios</h1>
            
          </div>

          <div className="min-corpo">
            <div className="min-indice" role="tablist" aria-label="Ministérios" onKeyDown={aoTeclar}>
              {MINISTERIOS.map((m, i) => {
                const ativa = i === indice;
                return (
                  <button
                    key={m.id}
                    ref={(botao) => {
                      abas.current[i] = botao;
                    }}
                    type="button"
                    role="tab"
                    id={`min-aba-${m.id}`}
                    aria-selected={ativa}
                    aria-controls="min-painel"
                    tabIndex={ativa ? 0 : -1}
                    className={`min-aba${ativa ? ' is-ativa' : ''}`}
                    onClick={() => escolher(i, 'clique')}
                  >
                    <span className="min-aba-icone" aria-hidden="true">
                      <i className={m.icone} />
                    </span>
                    <span className="min-aba-nome">{nomeDe(m)}</span>
                  </button>
                );
              })}
            </div>

            <div
              className="min-painel"
              id="min-painel"
              role="tabpanel"
              aria-labelledby={`min-aba-${ministerio.id}`}
            >
              {/* A key troca o conteúdo inteiro, e a animação de entrada roda de novo. */}
              <div className="min-painel-conteudo" key={ministerio.id}>
                <div className="min-topo">
                  <div className="min-emblema">
                    <img src={ministerio.imagem} alt="" />
                  </div>

                  <div className="min-titulo">
                    <p className="min-rotulo">{ministerio.label}</p>
                    <h2>{nomeDe(ministerio)}</h2>
                    <p className="min-resumo">{ministerio.resumo}</p>
                  </div>
                </div>

                <div className="min-texto">
                  {ministerio.paragrafos.map((texto) => (
                    <p key={texto.slice(0, 40)}>{texto}</p>
                  ))}
                </div>

                <h3 className="min-atividades-titulo">O que fazem</h3>
                <ul className="min-atividades">
                  {ministerio.atividades.map((atividade) => (
                    <li key={atividade}>
                      <i className="fa-solid fa-check" aria-hidden="true" />
                      <span>{atividade}</span>
                    </li>
                  ))}
                </ul>

                <div className="min-navegacao">
                  {anterior && (
                    <button
                      type="button"
                      className="min-nav min-nav--anterior"
                      onClick={() => escolher(indice - 1, 'clique')}
                    >
                      <i className="fa-solid fa-chevron-left" aria-hidden="true" />
                      <span>
                        <small>Anterior</small>
                        <b>{nomeDe(anterior)}</b>
                      </span>
                    </button>
                  )}
                  {proximo && (
                    <button
                      type="button"
                      className="min-nav min-nav--proximo"
                      onClick={() => escolher(indice + 1, 'clique')}
                    >
                      <span>
                        <small>Próximo</small>
                        <b>{nomeDe(proximo)}</b>
                      </span>
                      <i className="fa-solid fa-chevron-right" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterSlot />
    </>
  );
}