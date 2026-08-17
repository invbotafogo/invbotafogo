import type { Aula } from '../../lib/estudos';

export function ClassCard({ aula }: { aula: Aula }) {
  return (
    <div className="aula-card">
      {aula.videoId ? (
        <iframe
          src={`https://www.youtube.com/embed/${aula.videoId}`}
          title={aula.titulo}
          allowFullScreen
          loading="lazy"
        />
      ) : aula.imagem ? (
        <img
          src={aula.imagem}
          alt={aula.titulo}
          className={aula.imagemClasse ?? 'video-thumb'}
          loading="lazy"
        />
      ) : (
        <div className="sem-video" role="img" aria-label="Sem vídeo disponível">
          Sem vídeo
        </div>
      )}

      <h3>{aula.titulo}</h3>

      {aula.pdf && (
        <a href={aula.pdf} download className="btn">
          Baixar PDF
        </a>
      )}
    </div>
  );
}
