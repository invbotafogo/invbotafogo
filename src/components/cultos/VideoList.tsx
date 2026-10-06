import { useState } from 'react';
import { REDES } from '../../lib/constants';
import { formatarPublicacao } from '../../lib/youtube';
import { useLatestVideos } from '../../hooks/useLatestVideos';
import { VideoCard } from './VideoCard';

const CANAL_VIDEOS = `${REDES.youtube}/videos`;
/* O YouTube abre a confirmação de inscrição direto com este parâmetro. */
const CANAL_INSCREVER = `${REDES.youtube}?sub_confirmation=1`;

/** Leva o player para a tela quando ele está escondido (no celular, a lista fica embaixo). */
function rolarAteOPlayer() {
  const player = document.getElementById('cul-player');
  if (!player) return;
  const topo = player.getBoundingClientRect().top;
  const alturaDoHeader = 70; /* --navbar-height */
  if (topo < alturaDoHeader || topo > window.innerHeight * 0.5) {
    player.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Últimas mensagens: a mais recente num player grande e, ao lado, a lista com
 * as três. Escolher um vídeo da lista leva ele para o player e já começa.
 *
 * O player só carrega o YouTube depois do clique: até lá é a capa do vídeo,
 * com o botão de play. Três players do YouTube abertos de uma vez deixavam a
 * página pesada, principalmente no celular.
 */
export function VideoList() {
  const { videos, carregando, erro } = useLatestVideos();
  const [indice, setIndice] = useState(0);
  const [tocando, setTocando] = useState(false);

  const atual = videos[Math.min(indice, videos.length - 1)];

  const escolher = (i: number) => {
    setIndice(i);
    setTocando(true);
    rolarAteOPlayer();
  };

  return (
    <section className="cul-mensagens" aria-labelledby="cul-mensagens-titulo">
      <div className="cul-mensagens-cabeca">
        <h2 id="cul-mensagens-titulo">Últimas mensagens</h2>
        <a className="cul-link" href={CANAL_VIDEOS} target="_blank" rel="noopener noreferrer">
          Ver todas no YouTube
        </a>
      </div>

      {carregando ? (
        <div className="cul-grade" aria-hidden="true">
          <div className="cul-destaque cul-esqueleto">
            <div className="cul-player" />
            <div className="cul-destaque-texto">
              <span className="cul-esqueleto-linha" />
              <span className="cul-esqueleto-linha cul-esqueleto-linha--curta" />
            </div>
          </div>
          <div className="cul-lista cul-esqueleto">
            {[0, 1, 2].map((n) => (
              <span key={n} className="cul-esqueleto-item" />
            ))}
          </div>
        </div>
      ) : erro || !atual ? (
        <p className="cul-aviso">
          Não foi possível carregar os vídeos agora. Os cultos estão todos{' '}
          <a href={CANAL_VIDEOS} target="_blank" rel="noopener noreferrer">
            no canal do YouTube
          </a>
          .
        </p>
      ) : (
        <div className="cul-grade">
          <article className="cul-destaque" id="cul-player" aria-labelledby="cul-destaque-titulo">
            <div className="cul-player">
              {tocando ? (
                <iframe
                  key={atual.videoId}
                  src={`https://www.youtube-nocookie.com/embed/${atual.videoId}?autoplay=1&rel=0`}
                  title={atual.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  className="cul-capa"
                  onClick={() => setTocando(true)}
                  aria-label={`Assistir: ${atual.titulo}`}
                >
                  <img src={atual.capa} alt="" width={1280} height={720} />
                  <span className="cul-play" aria-hidden="true">
                    <i className="fa-solid fa-play" />
                  </span>
                </button>
              )}
            </div>

            <div className="cul-destaque-texto">
              <h3 id="cul-destaque-titulo">{atual.titulo}</h3>
              {(atual.referencia || atual.pregador) && (
                <p className="cul-meta">
                  {atual.referencia && <span className="cul-ref">{atual.referencia}</span>}
                  {atual.pregador && <span>{atual.pregador}</span>}
                </p>
              )}
              {atual.publicadoEm && (
                <p className="cul-data">Publicado em {formatarPublicacao(atual.publicadoEm)}</p>
              )}
            </div>
          </article>

          <div className="cul-lista">
            <p className="cul-lista-titulo">As mais recentes</p>
            <ul>
              {videos.map((video, i) => (
                <li key={video.videoId}>
                  <VideoCard video={video} ativo={video === atual} onEscolher={() => escolher(i)} />
                </li>
              ))}
            </ul>

            {/* No pé da lista, alinhado com o fim do player. */}
            <div className="cul-inscrever">
              <p>Quer saber quando começa a transmissão? Inscreva-se no canal e ative o sininho.</p>
              <a className="cul-botao" href={CANAL_INSCREVER} target="_blank" rel="noopener noreferrer">
                <i className="fa-brands fa-youtube" aria-hidden="true" />
                Inscrever-se no canal
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}