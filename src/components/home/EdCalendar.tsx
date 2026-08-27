import { useMemo, useState } from 'react';
import { ArrowRight, ArrowLeft, Clock } from './icons';
import { PROGRAMACAO_SEMANAL, type ProgramacaoMensal } from '../../lib/programacao';
import { useProgramacaoMensal } from '../../hooks/useProgramacaoMensal';

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

/* Meses em português → índice (0 = janeiro) para ler o rótulo da programação */
const MESES_PT = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

/* Índice da semana vigente dentro da programação mensal (Brasília).
   Retorna -1 se hoje estiver fora do mês/ano do calendário. */
function semanaAtual(programacao: ProgramacaoMensal): number {
  const lbl = (programacao.rotulo || '').toLowerCase();
  const mIdx = MESES_PT.findIndex((m) => lbl.includes(m));
  const ano = lbl.match(/\d{4}/);
  if (mIdx < 0 || !ano) return -1;

  const n = agoraSP();
  if (n.getMonth() !== mIdx || n.getFullYear() !== Number(ano[0])) return -1;

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

  const abrirMes = () => {
    setVerMes(true);
    const atual = semanaAtual(programacaoMensal);
    setSemanaSelecionada(
      atual >= 0 ? atual : programacaoMensal.semanas.findIndex((s) => s.eventos.length > 0),
    );
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
              {programacaoMensal.semanas.map((s, i) => (
                <button
                  key={s.rotulo}
                  type="button"
                  className={`week-badge ${semanaSelecionada === i ? 'on' : ''}`}
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
            <div className="agenda">
              {PROGRAMACAO_SEMANAL.map((dia, d) => (
                <div key={dia.dia} className={`slot ${d === proximo.d ? 'next' : ''}`}>
                  <div className="day">{dia.dia}</div>
                  <div className="info">
                    {dia.eventos.map((ev, e) => (
                      <div className="ev" key={ev.titulo}>
                        <div className="ev-main">
                          <b>{ev.titulo}</b>
                          <p>
                            <Clock /> {ev.horario}
                          </p>
                        </div>
                        {d === proximo.d && e === proximo.e && (
                          <span className="tag">PRÓXIMO</span>
                        )}
                      </div>
                    ))}
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
            {semanaSelecionada != null && semanaSelecionada >= 0 && (
              <p className="week-range">
                {programacaoMensal.semanas[semanaSelecionada].intervalo}
              </p>
            )}
            {semanaSelecionada != null &&
            semanaSelecionada >= 0 &&
            programacaoMensal.semanas[semanaSelecionada].eventos.length ? (
              programacaoMensal.semanas[semanaSelecionada].eventos.map((ev) => (
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
            ) : (
              <p className="week-hint">Sem eventos extras nesta semana.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
