/**
 * Calendário para assinar: o arquivo calendario.ics que vai junto com o site
 * (invbotafogo.com.br/calendario.ics). Quem assina vê os encontros da igreja
 * no próprio calendário — Google, iPhone, Outlook — e o app busca as
 * mudanças sozinho.
 *
 * Ele é montado no build (vite.config.ts) com os mesmos dados que o site
 * mostra:
 *   - a programação semanal fixa (PROGRAMACAO_SEMANAL), como eventos que se
 *     repetem toda semana;
 *   - a agenda do mês (agenda.json, da planilha). Um evento da planilha no
 *     mesmo dia e horário de um encontro fixo — o culto de domingo com a Ceia,
 *     por exemplo — vira aquele encontro com o nome do dia, e não um segundo
 *     evento por cima dele.
 *
 * O site é publicado de novo sempre que a agenda do mês é atualizada (ver
 * .github/workflows/deploy.yml), e é isso que leva os eventos novos para
 * quem assinou.
 */

import { mesDoRotulo, type DiaSemanal, type ProgramacaoMensal } from './programacao.ts';

/** Onde o arquivo fica publicado. É para este endereço que as assinaturas apontam. */
export const CALENDARIO_ICS = {
  arquivo: 'calendario.ics',
  url: 'https://invbotafogo.com.br/calendario.ics',
  webcal: 'webcal://invbotafogo.com.br/calendario.ics',
} as const;

const FUSO = 'America/Sao_Paulo';
const DOMINIO = 'invbotafogo.com.br';

/*
 * Duração de cada encontro, em minutos. É só para o calendário de quem assina
 * mostrar um bloco do tamanho certo: o site não informa a hora de término.
 */
const DURACAO_MIN: Record<string, number> = {
  Culto: 120,
  'Culto de Oração': 60,
  'Escola Bíblica Dominical': 60,
  'Novos Convertidos': 60,
};
const DURACAO_PADRAO_MIN = 90;

/* Os encontros semanais começam a valer a partir desta data. */
const INICIO_DA_SERIE = { ano: 2026, mes: 0, dia: 1 };

const DIA_ICS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

interface Dados {
  semanal: DiaSemanal[];
  /** Agenda do mês. Nula quando o agenda.json não pôde ser lido. */
  mensal: ProgramacaoMensal | null;
  nome: string;
  endereco: string;
  site: string;
  agora: Date;
}

interface Data {
  ano: number;
  mes: number; // 0 = janeiro
  dia: number;
}

const doisDigitos = (n: number) => String(n).padStart(2, '0');

const dataIcs = ({ ano, mes, dia }: Data) => `${ano}${doisDigitos(mes + 1)}${doisDigitos(dia)}`;

const horaIcs = (minutos: number) =>
  `${doisDigitos(Math.floor(minutos / 60))}${doisDigitos(minutos % 60)}00`;

function somarDias({ ano, mes, dia }: Data, dias: number): Data {
  const d = new Date(Date.UTC(ano, mes, dia + dias));
  return { ano: d.getUTCFullYear(), mes: d.getUTCMonth(), dia: d.getUTCDate() };
}

const diaDaSemana = ({ ano, mes, dia }: Data) => new Date(Date.UTC(ano, mes, dia)).getUTCDay();

/** "08:30" → 510 minutos. */
function minutosDe(hhmm: string): number {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + (m || 0);
}

const duracao = (titulo: string, minutos = DURACAO_MIN[titulo] ?? DURACAO_PADRAO_MIN) =>
  `PT${Math.floor(minutos / 60) ? `${Math.floor(minutos / 60)}H` : ''}${minutos % 60 ? `${minutos % 60}M` : ''}`;

/** Texto do calendário: barra, ponto e vírgula, vírgula e quebra de linha são escapados. */
function texto(valor: string): string {
  return valor
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/** "Culto de Oração" → "culto-de-oracao" (para o identificador do evento). */
function slug(valor: string): string {
  return valor
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Linhas com mais de 75 bytes continuam na linha de baixo, começando com um
 * espaço — é a regra do formato. Conta bytes, não letras: "ç" ocupa dois.
 */
function dobrar(linha: string): string {
  const codificador = new TextEncoder();
  const partes: string[] = [];
  let atual = '';
  let bytes = 0;
  for (const caractere of linha) {
    const tamanho = codificador.encode(caractere).length;
    const limite = partes.length ? 74 : 75; // a continuação já começa com 1 espaço
    if (bytes + tamanho > limite) {
      partes.push(atual);
      atual = '';
      bytes = 0;
    }
    atual += caractere;
    bytes += tamanho;
  }
  partes.push(atual);
  return partes.join('\r\n ');
}

/**
 * Horário escrito na planilha → início e, se houver, fim, em minutos.
 *   "8h" → [{ 480 }]          "19h30" → [{ 1170 }]
 *   "10h e 19h" → [{ 600 }, { 1140 }]   (dois encontros)
 *   "9h às 12h" → [{ 540, fim: 720 }]   (um encontro, das 9h às 12h)
 * Com hífen ("9h - 12h") é faixa só se durar até 5 horas: "10h - 19h" é o
 * jeito antigo de escrever os dois cultos de domingo, e não um culto de 9h.
 * Sem horário reconhecível, devolve vazio: o evento entra como dia inteiro.
 */
function horariosDaPlanilha(horario = ''): { inicio: number; fim?: number }[] {
  const hora = String.raw`(\d{1,2})\s*(?:h|:)\s*(\d{2})?`;
  const faixa = new RegExp(`${hora}\\s*(às|as|até|a|-|–)\\s*${hora}`, 'i').exec(horario);
  if (faixa) {
    const inicio = Number(faixa[1]) * 60 + Number(faixa[2] || 0);
    const fim = Number(faixa[4]) * 60 + Number(faixa[5] || 0);
    const comHifen = faixa[3] === '-' || faixa[3] === '–';
    if (fim > inicio && (!comHifen || fim - inicio <= 5 * 60)) return [{ inicio, fim }];
  }
  return [...horario.matchAll(new RegExp(hora, 'gi'))]
    .map((m) => ({ inicio: Number(m[1]) * 60 + Number(m[2] || 0) }))
    .filter(({ inicio }) => inicio < 24 * 60);
}

/** "04/10" + a agenda de "Outubro de 2026" → 4 de outubro de 2026. */
function dataDaPlanilha(ddmm: string, referencia: { mes: number; ano: number }): Data | null {
  const partes = /^(\d{1,2})\/(\d{1,2})/.exec(ddmm.trim());
  if (!partes) return null;
  const dia = Number(partes[1]);
  const mes = Number(partes[2]) - 1;
  if (mes < 0 || mes > 11 || dia < 1 || dia > 31) return null;
  /* Agenda de dezembro com um evento em 02/01: é janeiro do ano seguinte (e o
     contrário, numa agenda de janeiro com um evento em 30/12). */
  const ano =
    referencia.ano + (mes < referencia.mes - 6 ? 1 : 0) - (mes > referencia.mes + 6 ? 1 : 0);
  return { ano, mes, dia };
}

export function gerarCalendarioIcs({ semanal, mensal, nome, endereco, site, agora }: Dados): string {
  const carimbo = agora.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const local = `LOCATION:${texto(endereco)}`;
  const urlDoSite = `URL:${site}`;
  const linhas: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Igreja de Nova Vida em Botafogo//Site//PT-BR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${texto(nome)}`,
    `X-WR-CALDESC:${texto('Cultos, encontros da semana e eventos do mês.')}`,
    `X-WR-TIMEZONE:${FUSO}`,
    /* Sugestão aos apps de buscar novidades duas vezes por dia. */
    'REFRESH-INTERVAL;VALUE=DURATION:PT12H',
    'X-PUBLISHED-TTL:PT12H',
    /* Brasília não tem mais horário de verão: −3h o ano inteiro. */
    'BEGIN:VTIMEZONE',
    `TZID:${FUSO}`,
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:-0300',
    'TZOFFSETTO:-0300',
    'TZNAME:-03',
    'END:STANDARD',
    'END:VTIMEZONE',
  ];

  /* ---- Encontros fixos: um evento que se repete toda semana por horário. ---- */
  const fixos = new Map<string, { uid: string; titulo: string }>(); // "dia-minutos" → série
  const inicioDaSerie: Data = INICIO_DA_SERIE;

  for (const dia of semanal) {
    /* Primeira data, a partir do início da série, que cai neste dia da semana. */
    const primeira = somarDias(inicioDaSerie, (dia.w - diaDaSemana(inicioDaSerie) + 7) % 7);
    for (const evento of dia.eventos) {
      for (const hhmm of evento.horarios) {
        const minutos = minutosDe(hhmm);
        const uid = `semanal-${dia.w}-${horaIcs(minutos).slice(0, 4)}@${DOMINIO}`;
        fixos.set(`${dia.w}-${minutos}`, { uid, titulo: evento.titulo });
        linhas.push(
          'BEGIN:VEVENT',
          `UID:${uid}`,
          `DTSTAMP:${carimbo}`,
          `DTSTART;TZID=${FUSO}:${dataIcs(primeira)}T${horaIcs(minutos)}`,
          `DURATION:${duracao(evento.titulo)}`,
          `RRULE:FREQ=WEEKLY;BYDAY=${DIA_ICS[dia.w]}`,
          `SUMMARY:${texto(evento.titulo)}`,
          local,
          urlDoSite,
          'END:VEVENT',
        );
      }
    }
  }

  /* ---- Agenda do mês (planilha). ---- */
  const referencia = mensal ? mesDoRotulo(mensal.rotulo) : null;
  const substituidos = new Set<string>();

  for (const semana of referencia && mensal ? mensal.semanas : []) {
    for (const evento of semana.eventos) {
      const data = dataDaPlanilha(evento.data, referencia!);
      if (!data) continue;
      const titulo = evento.nota ? `${evento.titulo} — ${evento.nota}` : evento.titulo;
      const horarios = horariosDaPlanilha(evento.horario);

      /* Sem horário: o dia inteiro. */
      if (!horarios.length) {
        linhas.push(
          'BEGIN:VEVENT',
          `UID:mensal-${dataIcs(data)}-${slug(evento.titulo)}@${DOMINIO}`,
          `DTSTAMP:${carimbo}`,
          `DTSTART;VALUE=DATE:${dataIcs(data)}`,
          `DTEND;VALUE=DATE:${dataIcs(somarDias(data, 1))}`,
          `SUMMARY:${texto(titulo)}`,
          local,
          urlDoSite,
          'END:VEVENT',
        );
        continue;
      }

      for (const { inicio, fim } of horarios) {
        const inicioIcs = `${dataIcs(data)}T${horaIcs(inicio)}`;
        const chave = `${diaDaSemana(data)}-${inicio}`;
        const fixo = fixos.get(chave);
        const fimOuDuracao = fim
          ? `DTEND;TZID=${FUSO}:${dataIcs(data)}T${horaIcs(fim)}`
          : `DURATION:${duracao(fixo?.titulo ?? evento.titulo)}`;

        /* No horário de um encontro fixo: muda aquele dia do encontro (mesmo
           identificador da série + a data que ele substitui). Só uma vez —
           um segundo evento no mesmo horário entra como evento próprio. */
        if (fixo && !substituidos.has(`${chave}-${dataIcs(data)}`)) {
          substituidos.add(`${chave}-${dataIcs(data)}`);
          linhas.push(
            'BEGIN:VEVENT',
            `UID:${fixo.uid}`,
            `RECURRENCE-ID;TZID=${FUSO}:${inicioIcs}`,
            `DTSTAMP:${carimbo}`,
            `DTSTART;TZID=${FUSO}:${inicioIcs}`,
            fimOuDuracao,
            `SUMMARY:${texto(titulo)}`,
            local,
            urlDoSite,
            'END:VEVENT',
          );
          continue;
        }

        linhas.push(
          'BEGIN:VEVENT',
          `UID:mensal-${inicioIcs.slice(0, 13)}-${slug(evento.titulo)}@${DOMINIO}`,
          `DTSTAMP:${carimbo}`,
          `DTSTART;TZID=${FUSO}:${inicioIcs}`,
          fimOuDuracao,
          `SUMMARY:${texto(titulo)}`,
          local,
          urlDoSite,
          'END:VEVENT',
        );
      }
    }
  }

  linhas.push('END:VCALENDAR');
  return linhas.map(dobrar).join('\r\n') + '\r\n';
}
