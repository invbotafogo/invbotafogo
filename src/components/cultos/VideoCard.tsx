import type { Video } from '../../lib/youtube';

interface VideoCardProps {
  video: Video;
  indice: number;
}

export function VideoCard({ video, indice }: VideoCardProps) {
  return (
    <iframe
      title={`Último culto ${indice + 1}`}
      src={video.embedUrl}
      width="360"
      height="215"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ margin: '10px' }}
    />
  );
}
