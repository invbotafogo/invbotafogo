import { useEffect, useState } from 'react';
import { fetchLatestVideos, type Video } from '../lib/youtube';

interface EstadoVideos {
  videos: Video[];
  carregando: boolean;
  erro: string | null;
}

/** Busca os últimos vídeos publicados pelo workflow na branch `data`. */
export function useLatestVideos(): EstadoVideos {
  const [estado, setEstado] = useState<EstadoVideos>({
    videos: [],
    carregando: true,
    erro: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetchLatestVideos(controller.signal)
      .then((videos) => setEstado({ videos, carregando: false, erro: null }))
      .catch((erro: unknown) => {
        if (controller.signal.aborted) return;
        console.error('Erro ao carregar vídeos:', erro);
        setEstado({
          videos: [],
          carregando: false,
          erro: 'Não foi possível carregar os vídeos agora.',
        });
      });

    return () => controller.abort();
  }, []);

  return estado;
}
