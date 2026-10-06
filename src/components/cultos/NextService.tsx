import { REDES } from '../../lib/constants';
import { useNextService } from '../../hooks/useNextService';

const NOME_DO_DIA = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

/* 19:30 → "19h30"; 10:00 → "10h" — o mesmo jeito de escrever do resto do site. */
function horaAmigavel(data: Date): string {
  const minutos = data.getMinutes();
  return minutos ? `${data.getHours()}h${String(minutos).padStart(2, '0')}` : `${data.getHours()}h`;
}

/* "Hoje", "Amanhã" ou "Daqui a 3 dias", contando dias de calendário. */
function quando(data: Date, agora: Date): string {
  const meiaNoite = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const dias = Math.round((meiaNoite(data) - meiaNoite(agora)) / 86_400_000);
  if (dias <= 0) return 'Hoje';
  if (dias === 1) return 'Amanhã';
  return `Daqui a ${dias} dias`;
}

/**
 * O próximo culto em destaque, como o "Próximo encontro" da home: o horário em
 * numerais grandes, o dia e quando é. Durante o culto (até duas horas depois
 * do início), vira "Ao vivo agora", com o botão para a transmissão.
 */
export function NextService() {
  const culto = useNextService();
  if (!culto) return null;

  const { data, aoVivo } = culto;

  return (
    <div className={`cul-proximo${aoVivo ? ' is-ao-vivo' : ''}`}>
      <p className="cul-proximo-rotulo">
        {aoVivo ? (
          <>
            <span className="cul-pulso" aria-hidden="true" /> Ao vivo agora
          </>
        ) : (
          'Próximo culto'
        )}
      </p>

      <div className="cul-proximo-corpo">
        <time className="cul-proximo-hora" dateTime={data.toISOString()}>
          {horaAmigavel(data)}
        </time>
        <div className="cul-proximo-info">
          <b>{NOME_DO_DIA[data.getDay()]}</b>
          <span>Culto</span>
          <small>{aoVivo ? 'Acontecendo agora' : quando(data, new Date())}</small>
        </div>
      </div>

      <a
        className={`cul-botao${aoVivo ? ' cul-botao--cheio' : ''}`}
        href={REDES.youtubeLive}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-youtube" aria-hidden="true" />
        {aoVivo ? 'Assistir ao vivo' : 'Abrir o canal no YouTube'}
      </a>
    </div>
  );
}