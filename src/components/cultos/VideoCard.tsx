import { formatarPublicacao, type Video } from '../../lib/youtube';

interface VideoCardProps {
  video: Video;
  /** É o vídeo que está no player grande. */
  ativo: boolean;
  onEscolher: () => void;
}

/** Uma linha da lista ao lado do player: capa, título, pregador e data. */
export function VideoCard({ video, ativo, onEscolher }: VideoCardProps) {
  return (
    <button
      type="button"
      className={`cul-item${ativo ? ' is-ativo' : ''}`}
      onClick={onEscolher}
      aria-current={ativo ? 'true' : undefined}
    >
      <span className="cul-item-capa">
        <img src={video.capaPequena} alt="" loading="lazy" width={320} height={180} />
      </span>
      <span className="cul-item-texto">
        <b>{video.titulo}</b>
        {video.pregador && <span>{video.pregador}</span>}
        {video.publicadoEm && <small>{formatarPublicacao(video.publicadoEm)}</small>}
      </span>
    </button>
  );
}