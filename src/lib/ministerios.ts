import louvor from '../assets/images/louvor.png';
import infantil from '../assets/images/infantil.png';
import intercessao from '../assets/images/intercessao.png';
import comunicacoes from '../assets/images/comunicacoes.png';
import juventude from '../assets/images/juventude.png';
import mulheres from '../assets/images/mulheres.png';
import guerreiros from '../assets/images/guerreiros.png';
import intro from '../assets/images/intro.png';
import evangelismo from '../assets/images/evangelismo2.png';

export interface Ministerio {
  id: string;
  /** Primeira linha do título: "Ministério de", "Grupo de"... */
  label: string;
  nome: string;
  /** Classe do ícone Font Awesome usada no card. */
  icone: string;
  imagem: string;
  imagemAlt: string;
  paragrafos: string[];
  atividades: string[];
}

export const MINISTERIOS: Ministerio[] = [
  {
    id: 'louvor',
    label: 'Ministério de',
    nome: 'Louvor',
    icone: 'fa-solid fa-music',
    imagem: louvor,
    imagemAlt: 'Ministério de Louvor',
    paragrafos: [
      'O Ministério de Louvor tem como missão conduzir a igreja à adoração a Deus com reverência, excelência e sensibilidade espiritual. Por meio da música, buscamos preparar os corações para receber a Palavra e promover um ambiente de comunhão com o Espírito Santo. Nosso foco não está na performance, mas no serviço ao altar — com dedicação, santidade e amor pela presença de Deus.',
    ],
    atividades: [
      'Conduzir momentos de louvor e adoração durante os cultos e eventos da igreja',
      'Interceder espiritualmente por meio da música, promovendo cura, libertação e encorajamento',
      'Preparar espiritualmente o ambiente para a ministração da Palavra de Deus',
      'Promover unidade e sensibilidade ao mover do Espírito Santo em cada ministração',
    ],
  },
  {
    id: 'infantil',
    label: 'Ministério',
    nome: 'Infantil',
    icone: 'fa-solid fa-child',
    imagem: infantil,
    imagemAlt: 'Ministério Infantil',
    paragrafos: [
      'Voltado à formação espiritual das crianças, o Ministério Infantil tem como missão apresentar a Palavra de Deus de maneira acessível, criativa e significativa. Seu propósito é ensinar os princípios cristãos, promover o discipulado desde a infância e oferecer suporte às famílias na caminhada com Cristo.',
    ],
    atividades: [
      'Organização e realização de atividades lúdicas e didáticas',
      'Acolhimento e cuidado com as crianças durante os cultos e eventos da igreja',
      'Ensaios e apresentações com músicas, corais e jograis',
      'Ensino dos princípios cristãos por meio de histórias bíblicas',
      'Planejamento e organização de eventos especiais, como festas temáticas, gincanas e piqueniques',
    ],
  },
  {
    id: 'intercessao',
    label: 'Ministério de',
    nome: 'Intercessão',
    icone: 'fa-solid fa-hands-praying',
    imagem: intercessao,
    imagemAlt: 'Ministério de Intercessão',
    paragrafos: [
      'Com um chamado voltado à oração, o Ministério de Intercessão tem como propósito clamar a Deus em favor do próximo, da igreja, dos líderes e dos ministérios. Busca ser um alicerce espiritual por meio da intercessão contínua, promovendo a unidade do corpo de Cristo, apoiando causas específicas e protegendo a igreja através da oração constante e vigilante.',
    ],
    atividades: [
      'Interceder em oração pela igreja de forma geral',
      'Participar de cultos de oração e campanhas de jejum e oração por causas específicas',
      'Cobrir cultos, eventos, pastores e líderes de ministérios com oração',
      'Realizar visitas a membros da igreja e manter uma vida constante de oração',
    ],
  },
  {
    id: 'comunicacoes',
    label: 'Ministério de',
    nome: 'Comunicações',
    icone: 'fa-solid fa-tower-broadcast',
    imagem: comunicacoes,
    imagemAlt: 'Ministério de Comunicações',
    paragrafos: [
      'O Ministério de Comunicação tem como missão propagar a Palavra de Deus e as ações da igreja, por meio de mensagens, fotos e vídeos em nossas redes sociais. Também buscamos fortalecer a identidade visual da igreja e apoiar outros ministérios em suas necessidades de comunicação.',
    ],
    atividades: [
      'Produção de material audiovisual para as redes sociais',
      'Atualização e manutenção do site da igreja',
      'Apoio na criação de conteúdo para eventos e apresentações internas e externas',
      'Operação e gerenciamento dos equipamentos de mídia utilizados nas transmissões dos eventos',
    ],
  },
  {
    id: 'juventude',
    label: 'Ministério da',
    nome: 'Juventude',
    icone: 'fa-solid fa-fire',
    imagem: juventude,
    imagemAlt: 'Ministério da Juventude',
    paragrafos: [
      'O Ministério da Juventude tem como propósitos contribuir para o crescimento espiritual dos jovens e promover a comunhão dos mesmos.',
      'Os jovens serão incentivados a conhecer e aplicar os princípios bíblicos no dia a dia, a fim de construir uma base sólida para a caminhada cristã.',
    ],
    atividades: [
      'Encontros semanais para estudo da Bíblia e oração',
      'Comunhão e integração dos jovens',
      'Discipulado e suporte espiritual para os jovens',
    ],
  },
  {
    id: 'mulheres',
    label: 'Ministério de',
    nome: 'Mulheres',
    icone: 'fa-solid fa-heart',
    imagem: mulheres,
    imagemAlt: 'Ministério de Mulheres',
    paragrafos: [
      'O Ministério de Mulheres busca inspirar e fortalecer as mulheres da igreja, promovendo seu crescimento espiritual e incentivando o desenvolvimento de dons e talentos para servir ao Senhor com excelência.',
      'Oferecemos um espaço de comunhão e apoio, onde as mulheres podem se sentir acolhidas, criando laços de amizade e suporte emocional, porque unidas somos mais fortes.',
    ],
    atividades: [
      'Encontros de amigas com testemunhos',
      'Discussão de assuntos relacionados à vida cristã e pessoal',
      'Fortalecimento dos laços entre as mulheres',
      'Auxílio para compreender o papel da mulher no lar, na igreja e na sociedade',
    ],
  },
  {
    id: 'guerreiros',
    label: 'Grupo de',
    nome: 'Guerreiros',
    icone: 'fa-solid fa-shield',
    imagem: guerreiros,
    imagemAlt: 'Grupo de Guerreiros',
    paragrafos: [
      'O Encontro dos Guerreiros busca promover o fortalecimento espiritual dos homens, capacitando-os a serem líderes inspiradores em suas famílias, na igreja e na sociedade.',
    ],
    atividades: [
      'Incentivar cada homem a orar, estudar a Palavra e buscar a santificação',
      'Estimular amizades saudáveis e oferecer apoio emocional e espiritual entre os irmãos',
      'Criar um ambiente onde os homens possam compartilhar suas lutas, desafios e vitórias',
    ],
  },
  {
    id: 'introducao',
    label: 'Ministério de',
    nome: 'Introdução',
    icone: 'fa-solid fa-handshake',
    imagem: intro,
    imagemAlt: 'Ministério de Introdução e recepção',
    paragrafos: [
      'O Ministério de Introdução & Recepção tem como responsabilidade garantir que todos os que chegam à igreja sejam bem recebidos com cordialidade e cuidado. Além disso, oferece suporte nas atividades internas, colaborando para o bom andamento dos cultos e eventos.',
    ],
    atividades: [
      'Auxiliar no bom funcionamento dos cultos e eventos da igreja',
      'Dar apoio aos pastores, membros e demais ministérios',
      'Servir com zelo na preparação da ceia, recepção e manutenção do templo',
    ],
  },
  {
    id: 'evangelismo',
    label: 'Ministério de',
    nome: 'Evangelismo',
    icone: 'fa-solid fa-book-bible',
    imagem: evangelismo,
    imagemAlt: 'Ministério de Evangelismo',
    paragrafos: [
      'O Ministério de Evangelismo tem como propósitos basilares proclamar o Evangelho de Cristo para despertar a fé nas pessoas, com o objetivo de levá-las a uma decisão de salvação, capacitar a igreja para cumprir a Grande Comissão e promover a integração dos novos convertidos ao corpo de Cristo.',
    ],
    atividades: [
      'Desenvolver a capacitação pessoal para o evangelismo, com estudos direcionados para esse fim',
      'Preparar um programa de evangelização que ofereça a oportunidade de todos participarem, segundo os dons recebidos por Deus',
      'Promover evangelização em locais públicos (rua, hospitais e presídios) e nos lares',
      'Promover imediata integração dos novos convertidos ao seio da Igreja',
      'Estimular e apoiar projetos evangelísticos elaborados por outros ministérios da Igreja',
    ],
  },
];

/**
 * O card usa "INTRODUÇÃO" e o painel expandido usa "Introdução & Recepção".
 * Mantido como no site antigo.
 */
export const NOME_EXPANDIDO: Record<string, string> = {
  introducao: 'Introdução & Recepção',
};

/**
 * Ministérios cujo card ampliado já usa o layout novo — card de vidro em
 * coluna única, no padrão das seções Contato e "Nossa história"
 * (ver components/ministerios/MinistryDetailSolo.tsx e
 * styles/ministerios-solo.css).
 *
 * Hoje vale para todos. Para devolver um ministério ao painel antigo, troque
 * pela lista explícita dos ids que devem usar o layout novo — por exemplo
 * `new Set(['louvor'])` — sem mexer em nenhum outro arquivo.
 */
export const MINISTERIOS_LAYOUT_SOLO: ReadonlySet<string> = new Set(
  MINISTERIOS.map((ministerio) => ministerio.id),
);

export function usaLayoutSolo(id?: string | null): boolean {
  return !!id && MINISTERIOS_LAYOUT_SOLO.has(id);
}
