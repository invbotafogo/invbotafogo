/**
 * Os endereços da igreja, reunidos na Central INVB (/central).
 *
 * Nome e descrição saíram do próprio site de cada um (título e texto da
 * página). Para acrescentar um endereço, acrescente um bloco aqui — a página
 * monta a lista sozinha, na ordem deste array.
 */

export interface Subdominio {
  /** Endereço sem https:// — é o que aparece na tela. */
  host: string;
  /** Caminho depois do endereço, quando o link não é a página inicial ('/admin'). */
  caminho?: string;
  nome: string;
  descricao: string;
  /** Classe do ícone Font Awesome. */
  icone: string;
  /** Aviso curto ao lado do nome ("Pede login"). */
  aviso?: string;
}

export const SUBDOMINIOS: Subdominio[] = [
  {
    host: 'cestabasica.invbotafogo.com.br',
    nome: 'Cesta Básica',
    descricao:
      'Arrecadação de alimentos para as cestas básicas do mês: cada pessoa registra o que vai doar.',
    icone: 'fa-solid fa-basket-shopping',
  },
  {
    host: 'chat.invbotafogo.com.br',
    nome: 'NVB Chat',
    descricao: 'Chat interno da igreja.',
    icone: 'fa-solid fa-comments',
  },
  {
    host: 'consagracao.invbotafogo.com.br',
    nome: 'Café da Manhã — Consagração',
    descricao: 'Lista do café da manhã da Consagração: cada um marca os itens que vai levar.',
    icone: 'fa-solid fa-mug-hot',
  },
  {
    host: 'escala.invbotafogo.com.br',
    nome: 'Escala INVB',
    descricao: 'Sistema de escala dos ministérios.',
    icone: 'fa-solid fa-calendar-check',
  },
  {
    host: 'escala2.invbotafogo.com.br',
    nome: 'Evangelismo & Integração',
    descricao: 'Escala do Ministério de Evangelismo & Integração.',
    icone: 'fa-solid fa-people-group',
    aviso: 'Pede login',
  },
  {
    host: 'evangelismo.invbotafogo.com.br',
    nome: 'Disponibilidades do Evangelismo',
    descricao: 'Cada membro do Grupo de Evangelismo informa os dias em que pode servir no mês.',
    icone: 'fa-solid fa-hand-holding-heart',
  },
  {
    host: 'louvores.invbotafogo.com.br',
    nome: 'Tom Louvores',
    descricao: 'O que a equipe de louvor vai cantar nos próximos cultos, com os tons.',
    icone: 'fa-solid fa-music',
    aviso: 'Login para editar',
  },
  {
    host: 'lyra-music-database.vercel.app',
    caminho: '/admin',
    nome: 'Banco de Músicas do Lyra',
    descricao:
      'Letras e cifras em todos os tons, com link direto para cada tom. Este link abre a área de administração.',
    icone: 'fa-solid fa-guitar',
    aviso: 'Admin',
  },
  {
    host: 'www.invbotafogo.com.br',
    nome: 'Site, com www',
    descricao: 'O endereço com www leva para o site principal.',
    icone: 'fa-solid fa-globe',
  },
  {
    host: 'invbotafogo.com.br',
    nome: 'Site da igreja',
    descricao: 'Este site.',
    icone: 'fa-solid fa-church',
  },
];
