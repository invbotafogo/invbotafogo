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
    eventos: [
      { titulo: 'Escola Bíblica Dominical', horario: '8h30', horarios: ['08:30'] },
      { titulo: 'Culto', horario: '10h - 19h', horarios: ['10:00', '19:00'] },
      { titulo: 'Novos Convertidos', horario: '18h', horarios: ['18:00'] },
    ],
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
 * Liste APENAS os eventos extras — os fixos da semana (EBD, Culto e Novos
 * Convertidos no domingo, Culto na quarta e Culto de Oração na quinta) já
 * aparecem acima. Um fixo só reaparece aqui quando tem algo especial na data
 * (ex.: Ceia do Senhor, Dia dos Pais, ou quando não há atividade).
 * Editar a cada mês.
 */
export const PROGRAMACAO_MENSAL: ProgramacaoMensal = {
  rotulo: 'Agosto de 2026',
  semanas: [
    {
      rotulo: 'Semana 1',
      intervalo: '1 a 8 de agosto',
      eventos: [
        {
          dia: 'SÁB',
          data: '01/08',
          titulo: 'Consagração',
          horario: '8h',
          nota: 'Obreiros / planejamento do Dia das Crianças',
        },
        {
          dia: 'DOM',
          data: '02/08',
          titulo: 'Culto',
          horario: '10h e 19h',
          nota: 'Ceia do Senhor / início do ensaio do Dia das Crianças',
        },
      ],
    },
    {
      rotulo: 'Semana 2',
      intervalo: '9 a 15 de agosto',
      eventos: [
        {
          dia: 'DOM',
          data: '09/08',
          titulo: 'Culto',
          horario: '10h e 19h',
          nota: 'Apresentação das crianças · Dia dos Pais (à noite)',
        },
        {
          dia: 'DOM',
          data: '09/08',
          titulo: 'Novos Convertidos',
          nota: 'Sem atividade',
        },
        {
          dia: 'SEG',
          data: '10/08',
          titulo: 'Jejum da Edificação',
          nota: 'Início',
        },
      ],
    },
    {
      rotulo: 'Semana 3',
      intervalo: '16 a 22 de agosto',
      eventos: [
        {
          dia: 'DOM',
          data: '16/08',
          titulo: 'Oração pelas Famílias',
          horario: '18h',
        },
        {
          dia: 'SEX',
          data: '21/08',
          titulo: 'Encontro de Casados',
          horario: '19h45',
          nota: '12º Encontro de Casados',
        },
      ],
    },
    {
      rotulo: 'Semana 4',
      intervalo: '23 a 29 de agosto',
      eventos: [
        {
          dia: 'QUA',
          data: '26/08',
          titulo: 'Culto',
          horario: '19h30',
          nota: 'Noite de Adoração e Clamor',
        },
        {
          dia: 'SEX',
          data: '28/08',
          titulo: 'Batismo / Luau',
          horario: '20h',
          nota: 'Praia da Urca',
        },
      ],
    },
    {
      rotulo: 'Semana 5',
      intervalo: '30 a 31 de agosto',
      eventos: [
        {
          dia: 'DOM',
          data: '30/08',
          titulo: 'Culto',
          horario: '10h e 19h',
          nota: 'Término do Jejum da Edificação',
        },
        {
          dia: 'SEG',
          data: '31/08',
          titulo: 'Encontro de Amigas',
          horario: '19h',
          nota: 'Reunião mensal',
        },
        {
          dia: 'SEG',
          data: '31/08',
          titulo: 'Encontro de Guerreiros',
          horario: '19h',
          nota: 'Reunião mensal',
        },
      ],
    },
  ],
};
