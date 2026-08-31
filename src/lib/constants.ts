/** Dados fixos da igreja, centralizados para não repetir string solta pelos componentes. */

export const IGREJA = {
  nome: 'Igreja de Nova Vida em Botafogo',
  nomeCurto: 'INV Botafogo',
  enderecoCompleto: 'Rua da Matriz, 95 - Botafogo, Rio de Janeiro - RJ, 22260-100',
  enderecoFooter: 'Rua da Matriz, 95 - Rio de Janeiro/RJ',
  fundacao: '2003',
  email: 'invbotafogo.contato@gmail.com',
  telefone: '(21) 98298-2802',
  telefoneHref: 'tel:+5521982982802',
} as const;

export const REDES = {
  youtube: 'https://www.youtube.com/@igrejadenovavidabotafogo3785',
  youtubeLive: 'https://www.youtube.com/@igrejadenovavidabotafogo3785/live',
  facebook: 'https://www.facebook.com/igrejanovavidadebotafogo',
  instagram: 'https://www.instagram.com/igrejanvb',
  whatsapp: `https://wa.me/5521982982802?text=${encodeURIComponent(
    'Olá! Estou entrando em contato através do site da igreja e gostaria de obter algumas informações.',
  )}`,
} as const;

/**
 * Versículo do rodapé da gaveta do menu mobile.
 *
 * Um só, fixo: trocar é editar aqui — nada no componente precisa saber qual é.
 * Texto na Almeida Revista e Atualizada (ARA), da Sociedade Bíblica do Brasil.
 */
export const VERSICULO_MENU = {
  texto:
    'Vinde a mim, todos os que estais cansados e sobrecarregados, e eu vos aliviarei.',
  referencia: 'Mateus 11.28',
} as const;

export const PIX = {
  chave: '04.800.134/0001-48',
  instituicao: 'BCO SANTANDER (BRASIL) S.A.',
  agencia: '1053',
  conta: '13000740-2',
  tipo: 'Corrente',
  favorecido: 'Igreja de Nova Vida',
  cnpj: '04.800.134/0001-48',
} as const;

/**
 * PDFs e imagens das aulas são servidos direto do repositório no GitHub,
 * não pelo build. Mover a pasta src/assets quebra todos estes links.
 */
export const ASSETS_RAW_BASE =
  'https://raw.githubusercontent.com/invbotafogo/invbotafogo/main/src/assets';
