import { useMemo, useState } from 'react';
import { ArrowRight, ArrowLeft, Clock } from './icons';
import {
  PROGRAMACAO_SEMANAL,
  ehDoMesCorrente,
  mesDoRotulo,
  type ProgramacaoMensal,
} from '../../lib/programacao';
import { useProgramacaoMensal } from '../../hooks/useProgramacaoMensal';

/* Nada para mostrar: agenda carregando, com erro, ou de outro mês. */
const SEM_PROGRAMACAO: ProgramacaoMensal = { rotulo: '', semanas: [] };

/* Hora atual no fuso de Brasília (independe do fuso do visitante) */
const agoraSP = () =>
  new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));

/* Próximo culto semanal (dia + evento), a partir de agora (Brasília) */
function proximoSlot() {
  const n = agoraSP();
  const agoraMin = n.getDay() * 1440 + n.getHours() * 60 + n.getMinutes();
  let melhor = Infinity;
  let res = { d: 0, e: 0 };

  PROGRAMACAO_SEMANAL.forEach((dia, d) => {
    dia.eventos.forEach((ev, e) => {
      ev.horarios.forEach((t) => {
        const [hh, mm] = t.split(':').map(Number);
        const occ = dia.w * 1440 + hh * 60 + mm;
        const delta = (occ - agoraMin + 10080) % 10080;
        if (delta < melhor) {
          melhor = delta;
          res = { d, e };
        }
      });
    });
  });

  return res;
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
  const [verMes, setVerMes] = useState(false);
  const [semanaSelecionada, setSemanaSelecionada] = useState<number | null>(null);
  const proximo = useMemo(() => proximoSlot(), []);

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
    <section className="ed reveal ed-top ed-cal">
      <div className="lead-col">
        <p className="kicker">{verMes ? 'Programação mensal' : 'Programação semanal'}</p>
        {!verMes ? (
          <h3>Nossos encontros</h3>
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
            <div className="agenda agenda-week">
              {PROGRAMACAO_SEMANAL.map((dia, d) => (
                /*
                 * `slot-timeline` liga o fio vertical do CSS, e só faz sentido
                 * quando o dia tem mais de um evento para ligar: em QUA e QUI,
                 * com um culto só, a linha não conectaria nada e ainda sugeriria
                 * que os cartões são uma sequência contínua.
                 */
                <div
                  key={dia.dia}
                  className={`slot ${d === proximo.d ? 'next' : ''} ${
                    dia.eventos.length > 1 ? 'slot-timeline' : ''
                  }`}
                >
                  <div className="day">{dia.dia}</div>
                  <div className="info">
                    {dia.eventos.map((ev, e) => {
                      const ehProximo = d === proximo.d && e === proximo.e;
                      return (
                        <div className={`ev ${ehProximo ? 'is-next' : ''}`} key={ev.titulo}>
                          <div className="ev-main">
                            <b>{ev.titulo}</b>
                            <p>
                              <Clock /> {ev.horario}
                            </p>
                          </div>
                          {ehProximo && <span className="tag">PRÓXIMO</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
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
