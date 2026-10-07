/**
 * Botões da página /links: o link da bio do Instagram.
 *
 * A página não aparece no menu do site. É a porta de quem chega pelo
 * Instagram, seja pela primeira vez, seja procurando alguma coisa. Para
 * trocar, tirar ou mudar a ordem de um botão, mexa só aqui: a página monta a
 * lista sozinha, na ordem deste array.
 */
import { IGREJA, REDES } from './constants';

export interface LinkDaBio {
  titulo: string;
  /** Linha menor embaixo do título. */
  detalhe: string;
  /** Classe do ícone Font Awesome. */
  icone: string;
  /** Página do site ('/cultos') ou endereço de fora ('https://…'). */
  destino: string;
  /** O botão principal, cheio de dourado. Só um. */
  destaque?: boolean;
  /** Ganha o selo "Ao vivo agora" quando tem culto acontecendo. */
  mostraAoVivo?: boolean;
}

const ROTA_NO_MAPA = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  IGREJA.enderecoCompleto,
)}`;

export const LINKS_DA_BIO: LinkDaBio[] = [
  {
    titulo: 'Primeira vez? Comece aqui',
    detalhe: 'Tudo para a sua primeira visita',
    icone: 'fa-solid fa-door-open',
    destino: '/primeira-vez',
    destaque: true,
  },
  {
    titulo: 'Assistir aos cultos',
    detalhe: 'Ao vivo e as últimas mensagens',
    icone: 'fa-brands fa-youtube',
    destino: '/cultos',
    mostraAoVivo: true,
  },
  {
    titulo: 'Como chegar',
    detalhe: 'Rua da Matriz, 95 – Botafogo',
    icone: 'fa-solid fa-location-dot',
    destino: ROTA_NO_MAPA,
  },
  {
    titulo: 'Pedir oração',
    detalhe: 'A gente ora por você',
    icone: 'fa-solid fa-hands-praying',
    destino: '/contato?assunto=oracao',
  },
  {
    titulo: 'Estudos',
    detalhe: 'Aulas da EBD e das capacitações',
    icone: 'fa-solid fa-book-open',
    destino: '/estudos',
  },
  {
    titulo: 'Doar',
    detalhe: 'Pix e dados bancários',
    icone: 'fa-solid fa-hand-holding-heart',
    destino: '/doacao',
  },
  {
    titulo: 'Falar no WhatsApp',
    detalhe: IGREJA.telefone,
    icone: 'fa-brands fa-whatsapp',
    destino: REDES.whatsapp,
  },
];
