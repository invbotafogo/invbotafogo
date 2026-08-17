import { ASSETS_RAW_BASE } from './constants';

const PDF = `${ASSETS_RAW_BASE}/pdfs`;
const IMG_ES = `${ASSETS_RAW_BASE}/imagesES`;
const IMG_CR = `${ASSETS_RAW_BASE}/imagesCR`;
const IMG_CC = `${ASSETS_RAW_BASE}/imagesCC`;

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
  aulas: Aula[];
}

/** Aba EBD — Escola Bíblica Dominical. */
export const TEMAS_EBD: Tema[] = [
  {
    id: 'apocalipse',
    titulo: 'Apocalipse',
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
    aulas: [
      { titulo: 'Quem é o Espírito Santo?', imagem: `${IMG_ES}/1.jpg`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula1.pdf` },
      { titulo: 'Os símbolos do Espírito Santo', imagem: `${IMG_ES}/2.jpg`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula2.pdf` },
      { titulo: 'O Espírito Santo e as Escrituras', imagem: `${IMG_ES}/3.jpg`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula3.pdf` },
      { titulo: 'Da criação até o nascimento de Jesus', imagem: `${IMG_ES}/4.jpg`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula4.pdf` },
      { titulo: 'Do nascimento de Jesus até Pentecostes', imagem: `${IMG_ES}/5.jpg`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula5.pdf` },
      { titulo: 'Depois de Pentecostes', imagem: `${IMG_ES}/6.jpg`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula6.pdf` },
      { titulo: 'O Espírito Santo na vida do crente', imagem: `${IMG_ES}/7.jpg`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula7.pdf` },
      { titulo: 'A luta interior do crente', imagem: `${IMG_ES}/8.jpg`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula8.pdf` },
      { titulo: 'O batismo com o Espírito Santo', imagem: `${IMG_ES}/9.jpg`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula9.pdf` },
      { titulo: 'Pecados contra o Espírito Santo', imagem: `${IMG_ES}/10.jpg`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula10.pdf` },
      { titulo: 'O fruto do Espírito', imagem: `${IMG_ES}/11.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula11.pdf` },
      { titulo: 'Princípios e objetivos dos dons', imagem: `${IMG_ES}/12.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula12.pdf` },
      { titulo: 'Os dons de ministério', imagem: `${IMG_ES}/13.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula13.pdf` },
      { titulo: 'Os dons de serviço', imagem: `${IMG_ES}/14.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula14.pdf` },
      { titulo: 'Os dons de sinais', imagem: `${IMG_ES}/15.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula15.pdf` },
      { titulo: 'Como reconhecer o seu dom', imagem: `${IMG_ES}/16.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula16.pdf` },
      { titulo: 'Como ficar cheio do Espírito Santo', imagem: `${IMG_ES}/17.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/ESPIRITO_Aula17.pdf` },
    ],
  },
  {
    id: 'cristologia',
    titulo: 'Cristologia',
    aulas: [
      { titulo: 'Cristologia - Parte I', imagem: `${IMG_CR}/1.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula1.pdf` },
      { titulo: 'Cristologia - Parte II', imagem: `${IMG_CR}/2.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula2.pdf` },
      { titulo: 'Cristologia - Parte III', imagem: `${IMG_CR}/3.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula3.pdf` },
      { titulo: 'Cristologia - Parte IV', imagem: `${IMG_CR}/4.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula4.pdf` },
      { titulo: 'Cristologia - Parte V', imagem: `${IMG_CR}/5.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula5.pdf` },
      { titulo: 'Cristologia - Parte VI', imagem: `${IMG_CR}/6.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula6.pdf` },
      { titulo: 'Cristologia - Parte VII', imagem: `${IMG_CR}/7.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula7.pdf` },
      { titulo: 'Cristologia - Parte VIII', imagem: `${IMG_CR}/8.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula8.pdf` },
      { titulo: 'Cristologia - Parte IX', imagem: `${IMG_CR}/9.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula9.pdf` },
      { titulo: 'Cristologia - Parte X', imagem: `${IMG_CR}/10.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula10.pdf` },
      // Corrigido na migração: o arquivo no repositório é CRISTOLOGIA_Aula11.pdf (o link antigo apontava para "Aula11a").
      { titulo: 'Cristologia - Parte XI', imagem: `${IMG_CR}/11.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula11.pdf` },
      { titulo: 'Cristologia - Parte XII', imagem: `${IMG_CR}/12.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula12.pdf` },
      { titulo: 'Cristologia - Parte XIII', imagem: `${IMG_CR}/13.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula13.pdf` },
      { titulo: 'Cristologia - Parte XIV', imagem: `${IMG_CR}/14.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula14.pdf` },
      { titulo: 'Cristologia - Parte XV', imagem: `${IMG_CR}/15.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula15.pdf` },
      { titulo: 'Cristologia - Parte XVI', imagem: `${IMG_CR}/16.png`, imagemClasse: 'video-thumb', pdf: `${PDF}/CRISTOLOGIA_Aula16.pdf` },
      // Parte XVII permanece fora, como já estava comentada no site antigo.
    ],
  },
];

/** Aba Capacitação. */
export const TEMAS_CAPACITACAO: Tema[] = [
  {
    id: 'evangelismo',
    titulo: 'Evangelismo',
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
