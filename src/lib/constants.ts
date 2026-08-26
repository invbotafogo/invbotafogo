/** Dados fixos da igreja, centralizados para não repetir string solta pelos componentes. */

export const IGREJA = {
  nome: 'Igreja de Nova Vida em Botafogo',
  nomeCurto: 'INV Botafogo',
  endereco: 'Rua da Matriz, 95 - Botafogo, RJ',
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

export const PIX = {
  chave: '04.800.134/0001-48',
  instituicao: 'BCO SANTANDER (BRASIL) S.A.',
  agencia: '1053',
  conta: '13000740-2',
  tipo: 'Corrente',
  favorecido: 'Igreja de Nova Vida',
  cnpj: '04.800.134/0001-48',
} as const;

export const MAPA_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14629.225512768957!2d-43.1868425!3d-22.951573!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997fe5fe31a04b%3A0x2a11fcf4df0f6202!2sRua%20da%20Matriz%2C%2095%20-%20Botafogo%2C%20Rio%20de%20Janeiro%20-%20RJ%2C%2022260-100!5e0!3m2!1spt-BR!2sbr!4v1717491000000!5m2!1spt-BR!2sbr&zoom=10';

export const CALENDAR_ID = 'mdc.invb%40gmail.com';

/**
 * PDFs e imagens das aulas são servidos direto do repositório no GitHub,
 * não pelo build. Mover a pasta src/assets quebra todos estes links.
 */
export const ASSETS_RAW_BASE =
  'https://raw.githubusercontent.com/invbotafogo/invbotafogo/main/src/assets';
