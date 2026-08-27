import { ASSETS_RAW_BASE } from './constants';

const PDF = `${ASSETS_RAW_BASE}/pdfs`;
const IMG_ES = `${ASSETS_RAW_BASE}/imagesES`;
const IMG_CR = `${ASSETS_RAW_BASE}/imagesCR`;
const IMG_CC = `${ASSETS_RAW_BASE}/imagesCC`;
const IMG_OR = `${ASSETS_RAW_BASE}/imagesOR`;

export interface Aula {
  titulo: string;
  /** Vídeo do YouTube. Tem prioridade sobre `imagem` na renderização. */
  videoId?: string;
  imagem?: string;
  /** Classe do <img>: o card de apostila da Capacitação usa uma classe diferente. */
  imagemClasse?: 'video-thumb' | 'aula-imagem';
  pdf?: string;
}

export interface Tema {
  id: string;
  titulo: string;
  /**
   * Capa do tema, usada na faixa do painel e na miniatura do índice.
   * Sem capa, a interface cai no marcador listrado — nada quebra.
   */
  capa?: string;
  aulas: Aula[];
}

/** Aba EBD — Escola Bíblica Dominical. */
export const TEMAS_EBD: Tema[] = [
  {
    id: 'apocalipse',
    titulo: 'Apocalipse',
    // Sem arte própria: usa a miniatura do vídeo da Aula 1 no YouTube.
    capa: 'https://img.youtube.com/vi/W-9M-PvIs3I/hqdefault.jpg',
    aulas: [
      { titulo: 'Aula 1', videoId: 'W-9M-PvIs3I', pdf: `${PDF}/APOCALIPSE_Aula1.pdf` },
      { titulo: 'Aula 2', videoId: 'UjytdzVytzI', pdf: `${PDF}/APOCALIPSE_Aula2.pdf` },
      { titulo: 'Aula 3', videoId: 'NZ1r3sO4dfU', pdf: `${PDF}/APOCALIPSE_Aula3.pdf` },
      { titulo: 'Aula 4', videoId: 'V_scgNPGmUM', pdf: `${PDF}/APOCALIPSE_Aula4.pdf` },
      { titulo: 'Aula 5', videoId: 'Q1J2GK_81L0', pdf: `${PDF}/APOCALIPSE_Aula5.pdf` },
      { titulo: 'Aula 6', videoId: 'foY5i2GJQHI', pdf: `${PDF}/APOCALIPSE_Aula6.pdf` },
      { titulo: 'Aula 7', videoId: 'Ns_fhLRZfBc', pdf: `${PDF}/APOCALIPSE_Aula7.pdf` },
      { titulo: 'Aula 8', videoId: 'S2v4D7edAZY', pdf: `${PDF}/APOCALIPSE_Aula8.pdf` },
      { titulo: 'Aula 9', videoId: '4BEZ3cBxAxs', pdf: `${PDF}/APOCALIPSE_Aula9.pdf` },
      { titulo: 'Aula 10', videoId: 'yyNB9latoJA', pdf: `${PDF}/APOCALIPSE_Aula10.pdf` },
      { titulo: 'Aula 11', videoId: 'B8nssUilmUw', pdf: `${PDF}/APOCALIPSE_Aula11.pdf` },
      { titulo: 'Aula 12', videoId: '1vcK5Iq01Xg', pdf: `${PDF}/APOCALIPSE_Aula12.pdf` },
      { titulo: 'Aula 13', videoId: '6ytzOZ6hxPo', pdf: `${PDF}/APOCALIPSE_Aula13.pdf` },
      { titulo: 'Aula 14', videoId: '8xSw2fvRmos', pdf: `${PDF}/APOCALIPSE_Aula14.pdf` },
      { titulo: 'Aula 15', videoId: 'e2Hx7JHyCws', pdf: `${PDF}/APOCALIPSE_Aula15.pdf` },
      { titulo: 'Aula 16', videoId: '9nF4GHUhqc8', pdf: `${PDF}/APOCALIPSE_Aula16.pdf` },
      { titulo: 'Aula 17', videoId: 'KKLdA2VGj6k', pdf: `${PDF}/APOCALIPSE_Aula17.pdf` },
      { titulo: 'Aula 18', videoId: 'Ix74fta9zYE', pdf: `${PDF}/APOCALIPSE_Aula18.pdf` },
      { titulo: 'Aula 19', videoId: 'nTVSwWWeDws', pdf: `${PDF}/APOCALIPSE_Aula19.pdf` },
      { titulo: 'Aula 20', pdf: `${PDF}/APOCALIPSE_Aula20.pdf` },
      { titulo: 'Aula 21', videoId: 'Ezp3lBmE7gM', pdf: `${PDF}/APOCALIPSE_Aula21.pdf` },
    ],
  },
  {
    id: 'espirito_santo',
    titulo: 'Espírito Santo',
    capa: `${IMG_ES}/1.webp`,
    aulas: [
      { titulo: 'Quem é o Espírito Santo?', imagem: `${IMG_ES}/1.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula1.pdf` },
      { titulo: 'Os símbolos do Espírito Santo', imagem: `${IMG_ES}/2.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula2.pdf` },
      { titulo: 'O Espírito Santo e as Escrituras', imagem: `${IMG_ES}/3.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula3.pdf` },
      { titulo: 'Da criação até o nascimento de Jesus', imagem: `${IMG_ES}/4.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula4.pdf` },
      { titulo: 'Do nascimento de Jesus até Pentecostes', imagem: `${IMG_ES}/5.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula5.pdf` },
      { titulo: 'Depois de Pentecostes', imagem: `${IMG_ES}/6.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula6.pdf` },
      { titulo: 'O Espírito Santo na vida do crente', imagem: `${IMG_ES}/7.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula7.pdf` },
      { titulo: 'A luta interior do crente', imagem: `${IMG_ES}/8.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula8.pdf` },
      { titulo: 'O batismo com o Espírito Santo', imagem: `${IMG_ES}/9.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula9.pdf` },
      { titulo: 'Pecados contra o Espírito Santo', imagem: `${IMG_ES}/10.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula10.pdf` },
      { titulo: 'O fruto do Espírito', imagem: `${IMG_ES}/11.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula11.pdf` },
      { titulo: 'Princípios e objetivos dos dons', imagem: `${IMG_ES}/12.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula12.pdf` },
      { titulo: 'Os dons de ministério', imagem: `${IMG_ES}/13.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula13.pdf` },
      { titulo: 'Os dons de serviço', imagem: `${IMG_ES}/14.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula14.pdf` },
      { titulo: 'Os dons de sinais', imagem: `${IMG_ES}/15.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula15.pdf` },
      { titulo: 'Como reconhecer o seu dom', imagem: `${IMG_ES}/16.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula16.pdf` },
      { titulo: 'Como ficar cheio do Espírito Santo', imagem: `${IMG_ES}/17.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula17.pdf` },
    ],
  },
  {
    id: 'cristologia',
    titulo: 'Cristologia',
    capa: `${IMG_CR}/1.webp`,
    aulas: [
      { titulo: 'Cristologia - Parte I', imagem: `${IMG_CR}/1.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula1.pdf` },
      { titulo: 'Cristologia - Parte II', imagem: `${IMG_CR}/2.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula2.pdf` },
      { titulo: 'Cristologia - Parte III', imagem: `${IMG_CR}/3.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula3.pdf` },
      { titulo: 'Cristologia - Parte IV', imagem: `${IMG_CR}/4.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula4.pdf` },
      { titulo: 'Cristologia - Parte V', imagem: `${IMG_CR}/5.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula5.pdf` },
      { titulo: 'Cristologia - Parte VI', imagem: `${IMG_CR}/6.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula6.pdf` },
      { titulo: 'Cristologia - Parte VII', imagem: `${IMG_CR}/7.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula7.pdf` },
      { titulo: 'Cristologia - Parte VIII', imagem: `${IMG_CR}/8.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula8.pdf` },
      { titulo: 'Cristologia - Parte IX', imagem: `${IMG_CR}/9.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula9.pdf` },
      { titulo: 'Cristologia - Parte X', imagem: `${IMG_CR}/10.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula10.pdf` },
      { titulo: 'Cristologia - Parte XI', imagem: `${IMG_CR}/11.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula11.pdf` },
      { titulo: 'Cristologia - Parte XII', imagem: `${IMG_CR}/12.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula12.pdf` },
      { titulo: 'Cristologia - Parte XIII', imagem: `${IMG_CR}/13.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula13.pdf` },
      { titulo: 'Cristologia - Parte XIV', imagem: `${IMG_CR}/14.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula14.pdf` },
      { titulo: 'Cristologia - Parte XV', imagem: `${IMG_CR}/15.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula15.pdf` },
      { titulo: 'Cristologia - Parte XVI', imagem: `${IMG_CR}/16.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula16.pdf` },
      { titulo: 'Cristologia - Parte XVII', imagem: `${IMG_CR}/17.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula17.pdf` },
    ],
  },
  {
    id: 'oracao',
    titulo: 'Oração',
    capa: `${IMG_OR}/1.webp`,
    // Capas em src/assets/imagesOR, apostilas em src/assets/pdfs.
    // As aulas 2 a 16 já estão escritas: descomente cada uma conforme o
    // material for para o repositório (imagem + PDF no branch main).
    aulas: [
      { titulo: 'Aula 1', imagem: `${IMG_OR}/1.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula1.pdf` },
      { titulo: 'Aula 2', imagem: `${IMG_OR}/2.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula2.pdf` },
      // { titulo: 'Aula 3', imagem: `${IMG_OR}/3.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula3.pdf` },
      // { titulo: 'Aula 4', imagem: `${IMG_OR}/4.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula4.pdf` },
      // { titulo: 'Aula 5', imagem: `${IMG_OR}/5.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula5.pdf` },
      // { titulo: 'Aula 6', imagem: `${IMG_OR}/6.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula6.pdf` },
      // { titulo: 'Aula 7', imagem: `${IMG_OR}/7.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula7.pdf` },
      // { titulo: 'Aula 8', imagem: `${IMG_OR}/8.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula8.pdf` },
      // { titulo: 'Aula 9', imagem: `${IMG_OR}/9.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula9.pdf` },
      // { titulo: 'Aula 10', imagem: `${IMG_OR}/10.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula10.pdf` },
      // { titulo: 'Aula 11', imagem: `${IMG_OR}/11.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula11.pdf` },
      // { titulo: 'Aula 12', imagem: `${IMG_OR}/12.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula12.pdf` },
      // { titulo: 'Aula 13', imagem: `${IMG_OR}/13.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula13.pdf` },
      // { titulo: 'Aula 14', imagem: `${IMG_OR}/14.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula14.pdf` },
      // { titulo: 'Aula 15', imagem: `${IMG_OR}/15.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula15.pdf` },
      // { titulo: 'Aula 16', imagem: `${IMG_OR}/16.webp`, imagemClasse: 'video-thumb', pdf: `${PDF}/ORACAO_Aula16.pdf` },
    ],
  },
];

/** Aba Capacitação. */
export const TEMAS_CAPACITACAO: Tema[] = [
  {
    id: 'evangelismo',
    titulo: 'Evangelismo',
    capa: `${IMG_CC}/evangelismo.jpg`,
    aulas: [
      { titulo: 'Capacitação para o Evangelismo - Parte I', videoId: 'Hodgcydb7aY' },
      { titulo: 'Capacitação para o Evangelismo - Parte II', videoId: 'l2SjPiQY2do' },
      { titulo: 'Capacitação para o Evangelismo - Parte III', videoId: 'OI8QZWsqeyo' },
      { titulo: 'Capacitação para o Evangelismo - Parte IV', videoId: 'VlIgm2LxGe8' },
      { titulo: 'Apostila', imagem: `${IMG_CC}/evangelismo.jpg`, imagemClasse: 'aula-imagem', pdf: `${PDF}/EVANGELISMO.pdf` },
    ],
  },
  {
    id: 'capelania',
    titulo: 'Capelania Cristã',
    capa: `${IMG_CC}/capelania.jpg`,
    aulas: [
      { titulo: 'Apostila', imagem: `${IMG_CC}/capelania.jpg`, imagemClasse: 'video-thumb', pdf: `${PDF}/CAPELANIA.pdf` },
    ],
  },
];

export type AbaEstudos = 'ebd' | 'capacitacao';

export const ABAS_ESTUDOS = [
  { id: 'ebd' as const, rotulo: 'EBD', titulo: 'Escola Bíblica Dominical', temas: TEMAS_EBD },
  { id: 'capacitacao' as const, rotulo: 'Capacitação', titulo: 'Capacitação', temas: TEMAS_CAPACITACAO },
];

/* ============================================================
 *  ESTUDO ATUAL
 *
 *  É ISTO QUE ABRE SOZINHO quando a pessoa entra em /estudos.
 *  Não é o primeiro da lista, nem a ordem do array: é o id escrito aqui.
 *
 *  >>> Para trocar o estudo em andamento, mude o id abaixo. Só aqui. <<<
 *
 *  O id é o campo `id` do tema (ex.: 'oracao', 'apocalipse', 'cristologia').
 *  Cada aba tem o seu, porque cada uma abre com um estudo diferente.
 * ============================================================ */
export const ESTUDO_ATUAL: Record<AbaEstudos, string> = {
  ebd: 'oracao',
  capacitacao: 'evangelismo',
};

/** Temas de uma aba. */
export function temasDaAba(aba: AbaEstudos): Tema[] {
  return ABAS_ESTUDOS.find((a) => a.id === aba)!.temas;
}

/**
 * O tema que a aba deve abrir por padrão — a tradução de ESTUDO_ATUAL para o
 * objeto do tema. É o único lugar do projeto que decide isso.
 *
 * Se o id configurado não existir na aba (erro de digitação, ou o estudo foi
 * renomeado/removido), o fallback é o primeiro tema — mas com aviso no
 * console, para que a configuração quebrada não passe despercebida.
 */
export function estudoAtual(aba: AbaEstudos): Tema | undefined {
  const temas = temasDaAba(aba);
  const idConfigurado = ESTUDO_ATUAL[aba];
  const configurado = temas.find((t) => t.id === idConfigurado);

  if (configurado) return configurado;

  console.warn(
    `[estudos] ESTUDO_ATUAL.${aba} aponta para "${idConfigurado}", que não existe nesta aba. ` +
      `Ids disponíveis: ${temas.map((t) => t.id).join(', ')}. ` +
      'Abrindo o primeiro estudo como emergência — corrija o id em src/lib/estudos.ts.',
  );

  return temas[0];
}
