import { EVENTOS_DESTAQUE } from '../../lib/eventos';

/**
 * Resumo dos eventos em destaque, acima do calendário do Google.
 * Sem eventos cadastrados o bloco não renderiza nada — o calendário
 * segue sendo a agenda completa.
 */
export function MonthEvents() {
  if (EVENTOS_DESTAQUE.length === 0) return null;

  return (
    <div className="eventos-destaques">
      <h3 className="eventos-destaques-titulo">Destaques do mês</h3>

      {EVENTOS_DESTAQUE.map((evento) => (
        <div className="evento-mini" key={`${evento.data}-${evento.titulo}`}>
          <p className="evento-mini-data">
            {evento.data}
            {evento.horario && ` · ${evento.horario}`}
          </p>
          <p className="evento-mini-titulo">{evento.titulo}</p>
          {evento.observacao && (
            <p className="evento-mini-obs">{evento.observacao}</p>
          )}
        </div>
      ))}
    </div>
  );
}
