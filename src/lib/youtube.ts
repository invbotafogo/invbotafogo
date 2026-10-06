/**
 * Consome o videos.json gerado pelo workflow update-videos.yml na branch `data`.
 * O arquivo é a resposta da busca da API do YouTube, com o `snippet` de cada
 * vídeo: título, data de publicação e capas.
 */

export const VIDEOS_JSON_URL =
  'https://raw.githubusercontent.com/invbotafogo/invbotafogo/refs/heads/data/videos.json';

interface Capa {
  url?: string;
}

interface YoutubeSearchItem {
  id?: { kind?: string; videoId?: string };
  snippet?: {
    title?: string;
    publishedAt?: string;
    thumbnails?: Partial<Record<'default' | 'medium' | 'high' | 'standard' | 'maxres', Capa>>;
  };
}

interface YoutubeSearchResponse {
  items?: YoutubeSearchItem[];
}

export interface Video {
  videoId: string;
  /** "Motivação para o Crescimento" — o título sem a referência e o pregador. */
  titulo: string;
  /** "Pr. Marcio Soares" — o que vem depois do último " - " do título. */
  pregador: string | null;
  /** "Rm.13:11-14" — o que estiver entre parênteses no fim do título. */
  referencia: string | null;
  /** Data de publicação no YouTube, em ISO 8601. */
  publicadoEm: string | null;
  /** Capa grande (até 1280 × 720) e pequena (320 × 180). */
  capa: string;
  capaPequena: string;
}

/* A API devolve o título com entidades HTML: "&amp;", "&quot;", "&#39;". */
const ENTIDADES: Record<string, string> = {
  amp: '&',
  quot: '"',
  apos: "'",
  lt: '<',
  gt: '>',
};

function decodificar(texto: string): string {
  return texto
    .replace(/&#(\d+);/g, (_, numero: string) => String.fromCodePoint(Number(numero)))
    .replace(/&([a-z]+);/gi, (inteira, nome: string) => ENTIDADES[nome.toLowerCase()] ?? inteira);
}

/**
 * Os títulos do canal seguem o padrão "Mensagem (Referência) - Pregador":
 *   "Motivação para o Crescimento (Rm.13:11-14) - Pr. Marcio Soares"
 *   "Culto de Domingo - Pr. Luiz Carlos"
 * Fora do padrão, o título inteiro vira o título, e o resto fica vazio.
 */
export function separarTitulo(bruto: string) {
  let titulo = decodificar(bruto).trim();
  let pregador: string | null = null;
  let referencia: string | null = null;

  const comPregador = titulo.match(/^(.*\S)\s+[-–—|]\s+(.+)$/);
  if (comPregador) {
    titulo = comPregador[1].trim();
    pregador = comPregador[2].trim();
  }

  const comReferencia = titulo.match(/^(.*\S)\s*\(([^()]+)\)$/);
  if (comReferencia) {
    titulo = comReferencia[1].trim();
    referencia = comReferencia[2].trim();
  }

  return { titulo, pregador, referencia };
}

export function parseVideos(data: unknown): Video[] {
  const items = (data as YoutubeSearchResponse)?.items;
  if (!Array.isArray(items)) return [];

  return items
    .filter((item) => item?.id?.kind === 'youtube#video' && item.id.videoId)
    .map((item) => {
      const videoId = item.id!.videoId!;
      const capas = item.snippet?.thumbnails ?? {};
      const reserva = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
      return {
        videoId,
        ...separarTitulo(item.snippet?.title ?? ''),
        publicadoEm: item.snippet?.publishedAt ?? null,
        capa: capas.maxres?.url ?? capas.standard?.url ?? capas.high?.url ?? reserva,
        capaPequena: capas.medium?.url ?? capas.high?.url ?? reserva,
      };
    });
}

/** "5 de outubro" — com o ano só quando não é o ano corrente. Horário de Brasília. */
export function formatarPublicacao(iso: string): string {
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return '';
  const fuso = 'America/Sao_Paulo';
  const anoDaData = data.toLocaleDateString('pt-BR', { year: 'numeric', timeZone: fuso });
  const anoAtual = new Date().toLocaleDateString('pt-BR', { year: 'numeric', timeZone: fuso });
  return data.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    ...(anoDaData === anoAtual ? {} : { year: 'numeric' }),
    timeZone: fuso,
  });
}

export async function fetchLatestVideos(signal?: AbortSignal): Promise<Video[]> {
  const response = await fetch(VIDEOS_JSON_URL, { signal });
  if (!response.ok) {
    throw new Error(`Erro ao carregar vídeos: HTTP ${response.status}`);
  }
  return parseVideos(await response.json());
}