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
 * Endereço do agenda.json publicado pelo workflow atualizar-agenda.yml na
 * branch `data`, a partir da planilha do Google Sheets.
 *
 * Quem decide o que entra aqui é a coluna de controle da planilha: só as
 * linhas marcadas com X viram eventos. A configuração da planilha (id, aba,
 * coluna) fica em scripts/importar_agenda_do_sheets.py — num lugar só.
 */
export const AGENDA_JSON_URL =
  'https://raw.githubusercontent.com/invbotafogo/invbotafogo/refs/heads/data/agenda.json';

function ehEventoMensal(valor: unknown): valor is EventoMensal {
  const e = valor as EventoMensal;
  return !!e && typeof e.dia === 'string' && typeof e.data === 'string'
    && typeof e.titulo === 'string';
}

/** Valida o JSON da branch `data` antes de deixá-lo chegar na tela. */
export function parseProgramacaoMensal(dados: unknown): ProgramacaoMensal | null {
  const bruto = dados as ProgramacaoMensal;
  if (!bruto || typeof bruto.rotulo !== 'string' || !Array.isArray(bruto.semanas)) {
    return null;
  }

  const semanas = bruto.semanas
    .filter((s) => s && typeof s.rotulo === 'string' && typeof s.intervalo === 'string')
    .map((s) => ({
      rotulo: s.rotulo,
      intervalo: s.intervalo,
      eventos: Array.isArray(s.eventos) ? s.eventos.filter(ehEventoMensal) : [],
    }));

  return semanas.length ? { rotulo: bruto.rotulo, semanas } : null;
}

export async function fetchProgramacaoMensal(signal?: AbortSignal): Promise<ProgramacaoMensal> {
  const resposta = await fetch(AGENDA_JSON_URL, { signal });
  if (!resposta.ok) throw new Error(`agenda.json: HTTP ${resposta.status}`);

  const programacao = parseProgramacaoMensal(await resposta.json());
  if (!programacao) throw new Error('agenda.json veio em formato inesperado');

  return programacao;
}

/**
 * Reserva vazia, de propósito.
 *
 * Não existe mais cadastro manual de evento aqui: os eventos extras do mês
 * vêm da planilha (agenda.json na branch `data`). Deixar dados escritos à mão
 * neste arquivo esconderia uma integração quebrada — o site mostraria o mês
 * antigo como se estivesse tudo certo.
 *
 * É isto que aparece enquanto o agenda.json carrega e se ele não vier: nada,
 * e o calendário diz o motivo.
 *
 * A programação SEMANAL (EBD, Culto e Novos Convertidos no domingo, Culto na
 * quarta e Culto de Oração na quinta) continua fixa no código, em
 * PROGRAMACAO_SEMANAL, lá em cima — essa não passa pela planilha.
 */
export const PROGRAMACAO_MENSAL: ProgramacaoMensal = {
  rotulo: '',
  semanas: [],
};
