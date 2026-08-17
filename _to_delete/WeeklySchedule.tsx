import { useEffect, useState } from 'react';
import { PROGRAMACAO_SEMANAL, encontrarProximoEvento } from '../../lib/cultos';

/**
 * Programação da semana por dia, dentro do bloco "Nossos Cultos".
 * O selo "Próximo" acompanha o mesmo cálculo usado na faixa de /cultos.
 */
export function WeeklySchedule() {
  const [proximo, setProximo] = useState(() => encontrarProximoEvento());

  // Recalcula de minuto em minuto para o selo andar sozinho, igual ao NextService.
  useEffect(() => {
    const id = setInterval(() => setProximo(encontrarProximoEvento()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <ul className="programacao-semanal">
      {PROGRAMACAO_SEMANAL.map((dia, iDia) => (
        <li key={dia.dia} className="programacao-dia">
          <span className="programacao-dia-rotulo">{dia.rotulo}</span>

          <div className="programacao-eventos">
            {dia.eventos.map((evento, iEvento) => {
              const ehProximo = proximo?.dia === iDia && proximo?.evento === iEvento;
              return (
                <div key={evento.titulo} className="programacao-evento">
                  <span className="programacao-evento-titulo">{evento.titulo}</span>
                  <span className="programacao-evento-horario">
                    <i className="fa-solid fa-clock" /> {evento.horario}
                  </span>
                  {ehProximo && <span className="programacao-selo">Próximo</span>}
                </div>
              );
            })}
          </div>
        </li>
      ))}
    </ul>
  );
}
