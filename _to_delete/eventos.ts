/**
 * Destaques do mês — resumo curto que aparece acima do calendário na home.
 *
 * O calendário do Google continua sendo a agenda completa. Esta lista existe só
 * para dar destaque aos eventos que fogem da programação semanal fixa
 * (consagrações, ceia, encontros, datas especiais).
 *
 * Deixe o array vazio quando não houver nada a destacar: o bloco some sozinho.
 */

export interface EventoDestaque {
  /** Como a data aparece na tela (ex.: "Domingo, 07/09"). */
  data: string;
  titulo: string;
  /** Horário já formatado (ex.: "19h"). Opcional. */
  horario?: string;
  /** Observação curta (ex.: "Não haverá culto de quinta"). Opcional. */
  observacao?: string;
}

export const EVENTOS_DESTAQUE: EventoDestaque[] = [];
