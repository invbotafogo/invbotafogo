/**
 * Consome o videos.json gerado pelo workflow update-videos.yml na branch `data`.
 * O script Python e o workflow não foram alterados na migração.
 */

export const VIDEOS_JSON_URL =
  'https://raw.githubusercontent.com/invbotafogo/invbotafogo/refs/heads/data/videos.json';

interface YoutubeSearchItem {
  id?: { kind?: string; videoId?: string };
}

interface YoutubeSearchResponse {
  items?: YoutubeSearchItem[];
}

export interface Video {
  videoId: string;
  embedUrl: string;
}

export function parseVideos(data: unknown): Video[] {
  const items = (data as YoutubeSearchResponse)?.items;
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item?.id?.kind === 'youtube#video' && item.id.videoId)
    .map((item) => ({
      videoId: item.id!.videoId!,
      embedUrl: `https://www.youtube.com/embed/${item.id!.videoId}`,
    }));
}

export async function fetchLatestVideos(signal?: AbortSignal): Promise<Video[]> {
  const response = await fetch(VIDEOS_JSON_URL, { signal });
  if (!response.ok) {
    throw new Error(`Erro ao carregar vídeos: HTTP ${response.status}`);
  }
  return parseVideos(await response.json());
}
