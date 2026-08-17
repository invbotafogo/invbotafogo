/**
 * Programação semanal e mensal — mesma estrutura de dados do `site-igreja`
 * (`CHURCH.schedule` e `MONTH_SCHEDULE` em src/config.js), preenchida com os
 * dados reais da Igreja Nova Vida de Botafogo.
 *
 * O selo "PRÓXIMO" é calculado automaticamente pelo horário de Brasília.
 */

export interface EventoSemanal {
  titulo: string;
  /** O que aparece na tela. */
  horario: string;
  /** Horários em 24h — só para o cálculo do selo "PRÓXIMO". */
  horarios: string[];
}

export interface DiaSemanal {
  /** Abreviação exibida no quadradinho dourado. */
  dia: string;
  /** Dia da semana: 0 = DOM, 1 = SEG … 6 = SÁB. */
  w: number;
  eventos: EventoSemanal[];
}

export const PROGRAMACAO_SEMANAL: DiaSemanal[] = [
  {
    dia: 'DOM',
    w: 0,
    eventos: [{ titulo: 'Culto', horario: '10h - 19h', horarios: ['10:00', '19:00'] }],
  },
  {
    dia: 'QUA',
    w: 3,
    eventos: [{ titulo: 'Culto', horario: '19h30', horarios: ['19:30'] }],
  },
  {
    dia: 'QUI',
    w: 4,
    eventos: [{ titulo: 'Culto de Oração', horario: '7h15', horarios: ['07:15'] }],
  },
];

export interface EventoMensal {
  /** Abreviação do dia (DOM, SEG… SÁB). */
  dia: string;
  /** Data no formato DD/MM. */
  data: string;
  titulo: string;
  horario?: string;
  /** Observação opcional, exibida em dourado. */
  nota?: string;
}

export interface SemanaMensal {
  rotulo: string;
  /** Precisa conter "N a M" para o site saber qual semana é a atual. */
  intervalo: string;
  eventos: EventoMensal[];
}

export interface ProgramacaoMensal {
  /** Precisa conter o mês por extenso e o ano (ex.: "Agosto de 2026"). */
  rotulo: string;
  semanas: SemanaMensal[];
}

/**
 * Liste APENAS os eventos extras — os cultos fixos da semana já aparecem acima.
 * Editar a cada mês.
 */
export const PROGRAMACAO_MENSAL: ProgramacaoMensal = {
  rotulo: 'Agosto de 2026',
  semanas: [
    { rotulo: 'Semana 1', intervalo: '1 a 8 de agosto', eventos: [] },
    { rotulo: 'Semana 2', intervalo: '9 a 15 de agosto', eventos: [] },
    { rotulo: 'Semana 3', intervalo: '16 a 22 de agosto', eventos: [] },
    { rotulo: 'Semana 4', intervalo: '23 a 29 de agosto', eventos: [] },
    { rotulo: 'Semana 5', intervalo: '30 a 31 de agosto', eventos: [] },
  ],
};
