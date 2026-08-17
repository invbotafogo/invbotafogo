import { useLatestVideos } from '../../hooks/useLatestVideos';
import { VideoCard } from './VideoCard';

export function VideoList() {
  const { videos, erro } = useLatestVideos();

  return (
    <div id="videos" className="videos-container">
      {videos.map((video, indice) => (
        <VideoCard key={video.videoId} video={video} indice={indice} />
      ))}
      {erro && <p>{erro}</p>}
    </div>
  );
}
