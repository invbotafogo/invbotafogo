import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Clock } from './icons';
import {
  PROGRAMACAO_SEMANAL,
  ehDoMesCorrente,
  mesDoRotulo,
  type DiaSemanal,
  type ProgramacaoMensal,
} from '../../lib/programacao';
import { useProgramacaoMensal } from '../../hooks/useProgramacaoMensal';
import { AssinarAgenda } from './AssinarAgenda';

/* Nada para mostrar: agenda carregando, com erro, ou de outro mês. */
const SEM_PROGRAMACAO: ProgramacaoMensal = { rotulo: '', semanas: [] };

/* Hora atual no fuso de Brasília (independe do fuso do visitante) */
const agoraSP = () =>
  new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));

/* "08:30" → "8h30"; "10:00" → "10h" — o mesmo jeito de escrever do resto do site. */
function horaAmigavel(hhmm: string): string {
  const [hora, minutos] = hhmm.split(':').map(Number);
  return minutos ? `${hora}h${String(minutos).padStart(2, '0')}` : `${hora}h`;
}

interface Linha {
  hora: string;
  titulo: string;
}

/*
 * Um horário por linha, em ordem. O "Culto" de domingo tem dois horários e vira
 * duas linhas (10h e 19h): escrito como "10h - 19h" ele se lia como um culto
 * só, das 10h às 19h.
 */
function linhasDoDia(dia: DiaSemanal): Linha[] {
  return dia.eventos
    .flatMap((evento) => evento.horarios.map((hora) => ({ hora, titulo: evento.titulo })))
    .sort((a, b) => a.hora.localeCompare(b.hora));
}

/* Dia da semana por extenso, no padrão Date.getDay() — o `w` da programação. */
const NOME_DO_DIA = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

interface Proximo {
  /** Índice do dia em PROGRAMACAO_SEMANAL. */
  d: number;
  hora: string;
  titulo: string;
  /** "Hoje", "Amanhã" ou "Daqui a 3 dias". */
  quando: string;
}

/* Próximo encontro da semana, a partir de agora (Brasília) */
function proximoEncontro(): Proximo {
  const n = agoraSP();
  const agoraMin = n.getDay() * 1440 + n.getHours() * 60 + n.getMinutes();
  let melhor = Infinity;
  let res = { d: 0, w: 0, hora: '', titulo: '' };

  PROGRAMACAO_SEMANAL.forEach((dia, d) => {
    dia.eventos.forEach((ev) => {
      ev.horarios.forEach((t) => {
        const [hh, mm] = t.split(':').map(Number);
        const occ = dia.w * 1440 + hh * 60 + mm;
        const delta = (occ - agoraMin + 10080) % 10080;
        if (delta < melhor) {
          melhor = delta;
          res = { d, w: dia.w, hora: t, titulo: ev.titulo };
        }
      });
    });
  });

  /* Dias de calendário até lá. Um encontro de hoje que já passou só volta na
     semana que vem: são 7 dias, não "hoje". */
  let dias = (res.w - n.getDay() + 7) % 7;
  if (dias === 0 && melhor >= 1440) dias = 7;
  const quando = dias === 0 ? 'Hoje' : dias === 1 ? 'Amanhã' : `Daqui a ${dias} dias`;

  return { d: res.d, hora: res.hora, titulo: res.titulo, quando };
}

/* Índice da semana vigente dentro da programação mensal (Brasília).
   Retorna -1 se hoje estiver fora do mês/ano do calendário. */
function semanaAtual(programacao: ProgramacaoMensal): number {
  const referencia = mesDoRotulo(programacao.rotulo);
  if (!referencia) return -1;

  const n = agoraSP();
  if (n.getMonth() !== referencia.mes || n.getFullYear() !== referencia.ano) return -1;

  const hoje = n.getDate();
  return programacao.semanas.findIndex((s) => {
    const r = (s.intervalo || '').match(/(\d+)\s*a\s*(\d+)/);
    if (!r) return false;
    return hoje >= Number(r[1]) && hoje <= Number(r[2]);
  });
}

/**
 * Seção "Programação semanal / mensal" — copiada do site-igreja (bloco `.ed-cal`
 * de pages/Home.jsx). Substitui o antigo bloco de horários e o iframe do
 * Google Calendar.
 */
export function EdCalendar() {
  /* /?agenda=mes#programacao (o link de "Primeira vez aqui?") já abre na
     programação do mês. */
  const [parametros] = useSearchParams();
  const [verMes, setVerMes] = useState(() => parametros.get('agenda') === 'mes');
  const [semanaSelecionada, setSemanaSelecionada] = useState<number | null>(null);
  const proximo = useMemo(() => proximoEncontro(), []);

  /* Eventos extras do mês: vêm da planilha. A programação semanal acima é fixa. */
  const {
    programacao: programacaoMensal,
    carregando: agendaCarregando,
    erro: agendaComErro,
  } = useProgramacaoMensal();

  /*
   * A sincronização é mensal. Se a do dia 1 falhar, o agenda.json do mês
   * passado continua sendo servido — válido, porém do mês errado. Melhor dizer
   * que não sincronizou do que exibir setembro com os eventos de agosto.
   */
  const agendaDeOutroMes =
    !agendaCarregando &&
    !agendaComErro &&
    !ehDoMesCorrente(programacaoMensal.rotulo, agoraSP());

  /* Enquanto a agenda não é confiável, não há semana nenhuma para mostrar. */
  const agendaValida = !agendaCarregando && !agendaComErro && !agendaDeOutroMes;
  const programacao = agendaValida ? programacaoMensal : SEM_PROGRAMACAO;

  /*
   * A semana aberta é derivada, não guardada no clique: a agenda chega depois
   * da primeira renderização, e um índice escolhido antes dela ficaria preso
   * no valor errado. `semanaSelecionada` só existe quando a pessoa escolhe.
   */
  const semanaPadrao = useMemo(() => {
    const atual = semanaAtual(programacao);
    return atual >= 0 ? atual : programacao.semanas.findIndex((s) => s.eventos.length > 0);
  }, [programacao]);

  const semanaAberta = semanaSelecionada ?? semanaPadrao;

  const abrirMes = () => {
    setVerMes(true);
    setSemanaSelecionada(null);
  };

  return (
    /* Âncora de /#programacao; a margem compensa o header fixo. */
    <section
      id="programacao"
      className="ed reveal ed-top ed-cal"
      style={{ scrollMarginTop: 'calc(var(--navbar-height) + 24px)' }}
    >
      <div className="lead-col">
        <p className="kicker">{verMes ? 'Programação mensal' : 'Programação semanal'}</p>
        {!verMes ? (
          <>
            <h3>Nossos encontros</h3>
            {/* Assina o calendário da igreja no app de calendário da pessoa. */}
            <AssinarAgenda />
          </>
        ) : (
          <>
            <div className="week-badges">
              {programacao.semanas.map((s, i) => (
                <button
                  key={s.rotulo}
                  type="button"
                  className={`week-badge ${semanaAberta === i ? 'on' : ''}`}
                  onClick={() => setSemanaSelecionada(i)}
                >
                  {s.rotulo}
                </button>
              ))}
            </div>
            <button type="button" className="month-back" onClick={() => setVerMes(false)}>
              <ArrowLeft /> Voltar
            </button>
          </>
        )}
      </div>

      <div className="prog-col">
        {!verMes ? (
          <>
            {/* O próximo encontro em destaque — a hora grande é o que a pessoa
                procura — e, embaixo, a semana inteira: uma coluna por dia de
                encontro, um horário por linha. */}
            <div className="encontros">
              <div className="encontro-proximo">
                <p className="encontro-proximo-rotulo">Próximo encontro</p>
                <div className="encontro-proximo-corpo">
                  <time className="encontro-proximo-hora" dateTime={proximo.hora}>
                    {horaAmigavel(proximo.hora)}
                  </time>
                  <div className="encontro-proximo-info">
                    <b>{NOME_DO_DIA[PROGRAMACAO_SEMANAL[proximo.d].w]}</b>
                    <span>{proximo.titulo}</span>
                    <small>{proximo.quando}</small>
                  </div>
                </div>
              </div>

              <div className="semana-grade">
                {PROGRAMACAO_SEMANAL.map((dia, d) => (
                  <div className="semana-coluna" key={dia.dia}>
                    <h4>{NOME_DO_DIA[dia.w]}</h4>
                    <ul>
                      {linhasDoDia(dia).map((linha) => (
                        <li
                          key={`${linha.hora}-${linha.titulo}`}
                          className={
                            d === proximo.d && linha.hora === proximo.hora ? 'is-next' : undefined
                          }
                        >
                          <time dateTime={linha.hora}>{horaAmigavel(linha.hora)}</time>
                          <span>{linha.titulo}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <button type="button" className="month-link" onClick={abrirMes}>
              Ver outros eventos no mês <ArrowRight />
            </button>
          </>
        ) : (
          <div className="agenda">
            {semanaAberta >= 0 && (
              <p className="week-range">
                {programacao.semanas[semanaAberta].intervalo}
              </p>
            )}
            {semanaAberta >= 0 && programacao.semanas[semanaAberta].eventos.length ? (
              programacao.semanas[semanaAberta].eventos.map((ev) => (
                <div className="slot" key={`${ev.data}-${ev.titulo}`}>
                  <div className="day day-stack">
                    <span>{ev.dia}</span>
                    <small>{ev.data}</small>
                  </div>
                  <div className="info">
                    <b>{ev.titulo}</b>
                    {ev.horario && (
                      <p>
                        <Clock /> {ev.horario}
                      </p>
                    )}
                    {ev.nota && <p className="slot-note">{ev.nota}</p>}
                  </div>
                </div>
              ))
            ) : agendaCarregando ? (
              <p className="week-hint">Carregando a agenda do mês…</p>
            ) : agendaComErro ? (
              <p className="week-hint">Não foi possível carregar a agenda agora.</p>
            ) : agendaDeOutroMes ? (
              <p className="week-hint">A agenda deste mês ainda não foi publicada.</p>
            ) : (
              <p className="week-hint">Sem eventos extras nesta semana.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}