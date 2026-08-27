import type { Tema } from '../../lib/estudos';

interface StudyIndexProps {
  temas: Tema[];
  /** Rótulo da aba aberta — vira o título do índice. */
  rotuloAba: string;
  temaAtivo: string;
  aoSelecionar: (id: string) => void;
}

/**
 * Índice dos estudos da categoria aberta.
 * Lista apenas os nomes dos estudos — sem miniaturas/capas, para manter a
 * escolha simples e limpa. A capa e o resumo do estudo continuam no painel
 * ao lado (StudyPanel).
 * Em telas largas é uma coluna fixa ao lado do painel; abaixo de 900px o CSS
 * transforma a mesma lista numa grade de botões.
 */
export function StudyIndex({ temas, rotuloAba, temaAtivo, aoSelecionar }: StudyIndexProps) {
  return (
    <nav className="estudos-indice" aria-label={`Estudos de ${rotuloAba}`}>
      <p className="estudos-indice__titulo">Estudos · {rotuloAba}</p>

      <div className="estudos-indice__lista">
        {temas.map((tema) => {
          const ativo = tema.id === temaAtivo;

          return (
            <button
              key={tema.id}
              type="button"
              className="estudo-item"
              aria-current={ativo}
              onClick={() => aoSelecionar(tema.id)}
            >
              <span className="estudo-item__nome">{tema.titulo}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/** "17 aulas · PDF" — o que a pessoa precisa saber antes de abrir. */
export function resumo(tema: Tema): string {
  const total = tema.aulas.length;
  if (total === 0) return 'Aulas em breve';

  const partes = [total === 1 ? '1 aula' : `${total} aulas`];
  if (tema.aulas.some((a) => a.videoId)) partes.push('vídeo');
  if (tema.aulas.some((a) => a.pdf)) partes.push('PDF');

  return partes.join(' · ');
}
