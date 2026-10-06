/**
 * Textos da página "Primeira vez aqui?" (/primeira-vez).
 *
 * É a página que o link da bio do Instagram abre: fala com quem nunca veio a
 * um culto, ou faz tempo que não vai a uma igreja. O conteúdo mora aqui,
 * separado do layout, para o Núcleo de Comunicação revisar e ampliar sem
 * mexer no componente.
 *
 * Horários e endereço NÃO moram aqui. Vêm de PROGRAMACAO_SEMANAL
 * (lib/programacao.ts) e de IGREJA (lib/constants.ts), os mesmos da home:
 * mudou lá, muda aqui junto.
 *
 * Tom de voz do plano de comunicação: acolhedor, direto e sem termos que só
 * quem é de dentro entende.
 */
import { REDES } from './constants';

export interface Etapa {
  /** Classe do ícone Font Awesome (a folha já vem do index.html). */
  icone: string;
  titulo: string;
  texto: string;
}

/** "O que esperar do culto", na ordem em que as coisas acontecem. */
export const ETAPAS_DO_CULTO: Etapa[] = [
  {
    icone: 'fa-solid fa-door-open',
    titulo: 'Chegada',
    texto:
      'A equipe de recepção acolhe quem chega e ajuda a encontrar um lugar. Se for a sua primeira vez, conte para eles.',
  },
  {
    icone: 'fa-solid fa-music',
    titulo: 'Louvor',
    texto:
      'O culto começa com músicas cantadas por toda a igreja. Você pode cantar junto ou só acompanhar: as letras aparecem no telão.',
  },
  {
    icone: 'fa-solid fa-book-bible',
    titulo: 'Palavra',
    texto:
      'Depois vem a pregação, sempre a partir de um texto da Bíblia, com uma mensagem para levar para a semana.',
  },
  {
    icone: 'fa-solid fa-hands-praying',
    titulo: 'Oração',
    texto:
      'Há momentos de oração ao longo do culto. Se quiser que alguém ore com você, procure a recepção ou um dos pastores no final.',
  },
];

/**
 * Chamada para a "Nossa história" da home (/#nossa-historia). É um resumo:
 * o texto completo mora em components/home/EdHistory.tsx — mudou um fato
 * lá, confira aqui também.
 */
export const HISTORIA = {
  titulo: 'Uma igreja com raízes em Botafogo',
  texto:
    'O primeiro culto foi em 5 de janeiro de 2003, com um pequeno grupo de adoradores. Desde então a igreja cresceu, inaugurou o templo em 2005 e segue sob a liderança do Pr. Luiz Carlos.',
};

export const CRIANCAS = {
  titulo: 'E as crianças?',
  texto:
    'O Ministério Infantil acolhe e cuida das crianças durante os cultos, com histórias bíblicas e atividades pensadas para elas. Na chegada, a recepção mostra onde fica o espaço das crianças.',
};

/**
 * Uma linha sobre cada encontro da programação semanal, pelo título exato
 * usado em PROGRAMACAO_SEMANAL. Encontro sem linha aqui aparece só com nome e
 * horário — nada quebra se alguém renomear um evento lá.
 */
export const SOBRE_OS_ENCONTROS: Record<string, string> = {
  'Escola Bíblica Dominical': 'Estudo da Bíblia, antes do culto da manhã.',
  Culto: 'Louvor, oração e a pregação da Palavra.',
  'Novos Convertidos': 'Para quem decidiu seguir Jesus há pouco tempo e quer dar os primeiros passos.',
  'Culto de Oração': 'Um encontro cedo, para orar antes de começar o dia.',
};

export type LinkDaPergunta =
  | { rotulo: string; rota: string }
  | { rotulo: string; url: string };

export interface Pergunta {
  pergunta: string;
  resposta: string;
  link?: LinkDaPergunta;
}

/** As dúvidas mais comuns de quem nunca foi a um culto. */
export const PERGUNTAS: Pergunta[] = [
  {
    pergunta: 'Preciso ser evangélico ou membro para ir?',
    resposta: 'Não. Os cultos são abertos a qualquer pessoa, frequente ou não uma igreja.',
  },
  {
    pergunta: 'Posso ir sozinho?',
    resposta:
      'Pode, sim. A equipe de recepção está lá justamente para acolher quem chega, sozinho ou acompanhado.',
  },
  {
    pergunta: 'Tenho que contribuir com alguma coisa?',
    resposta:
      'Não. A oferta é voluntária, para quem quiser contribuir. Ninguém precisa dar nada para participar.',
  },
  {
    pergunta: 'Dá para assistir antes pela internet?',
    resposta:
      'Dá. Os cultos são transmitidos ao vivo no nosso canal do YouTube, e as mensagens ficam gravadas por lá.',
    link: { rotulo: 'Abrir o canal no YouTube', url: REDES.youtube },
  },
  {
    pergunta: 'Quero conversar com alguém ou pedir oração. Como faço?',
    resposta:
      'No fim do culto, procure a recepção ou um dos pastores. Se preferir, mande um pedido de oração pelo site.',
    link: { rotulo: 'Enviar um pedido de oração', rota: '/contato?assunto=oracao' },
  },
];