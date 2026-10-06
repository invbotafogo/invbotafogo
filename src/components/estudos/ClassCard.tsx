import { useState } from 'react';
import type { Aula } from '../../lib/estudos';

/**
 * Uma aula: a capa (ou o vídeo), o título e o PDF.
 *
 * O vídeo só carrega o YouTube depois do clique, como o player de Cultos: até
 * lá é a capa do vídeo com o botão de play dourado. Vinte players do YouTube
 * abertos de uma vez (Apocalipse) deixavam a página pesada e com a cara do
 * YouTube no meio do site.
 */
export function ClassCard({ aula }: { aula: Aula }) {
  const [tocando, setTocando] = useState(false);

  return (
    <div className={`est-aula${tocando ? ' is-tocando' : ''}`}>
      <div className="est-aula-midia">
        {aula.videoId ? (
          tocando ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${aula.videoId}?autoplay=1&rel=0`}
              title={aula.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="est-aula-capa"
              onClick={() => setTocando(true)}
              aria-label={`Assistir: ${aula.titulo}`}
            >
              <img
                src={`https://i.ytimg.com/vi/${aula.videoId}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                width={480}
                height={360}
              />
              <span className="est-play" aria-hidden="true">
                <i className="fa-solid fa-play" />
              </span>
            </button>
          )
        ) : aula.imagem ? (
          <img src={aula.imagem} alt="" loading="lazy" width={1280} height={720} />
        ) : (
          <div className="est-sem-video">Sem vídeo</div>
        )}
      </div>

      <div className="est-aula-texto">
        <h3>{aula.titulo}</h3>

        {aula.pdf && (
          <a href={aula.pdf} download className="est-botao">
            Baixar PDF
          </a>
        )}
      </div>
    </div>
  );
}
