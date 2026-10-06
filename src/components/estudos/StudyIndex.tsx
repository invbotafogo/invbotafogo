import type { Tema } from '../../lib/estudos';

interface StudyIndexProps {
  temas: Tema[];
  /** Rótulo da aba aberta, para o leitor de tela. */
  rotuloAba: string;
  temaAtivo: string;
  aoSelecionar: (id: string) => void;
}

/**
 * Índice dos estudos da aba aberta, no mesmo painel de vidro do índice de
 * Ministérios, só com os nomes. No computador fica à esquerda do painel; abaixo
 * de 980px vira uma grade em cima dele.
 */
export function StudyIndex({ temas, rotuloAba, temaAtivo, aoSelecionar }: StudyIndexProps) {
  return (
    <nav className="est-indice" aria-label={`Estudos de ${rotuloAba}`}>
      {temas.map((tema) => {
        const ativo = tema.id === temaAtivo;

        return (
          <button
            key={tema.id}
            type="button"
            className={`est-item${ativo ? ' is-ativo' : ''}`}
            aria-current={ativo}
            onClick={() => aoSelecionar(tema.id)}
          >
            {tema.titulo}
          </button>
        );
      })}
    </nav>
  );
}

/** "8 aulas, com vídeo e PDF": o que a pessoa encontra antes de abrir. */
export function resumo(tema: Tema): string {
  const total = tema.aulas.length;
  if (total === 0) return 'Aulas em breve';

  const aulas = total === 1 ? '1 aula' : `${total} aulas`;
  const video = tema.aulas.some((a) => a.videoId);
  const pdf = tema.aulas.some((a) => a.pdf);

  if (video && pdf) return `${aulas}, com vídeo e PDF`;
  if (video) return `${aulas}, com vídeo`;
  if (pdf) return `${aulas}, com PDF`;
  return aulas;
}
