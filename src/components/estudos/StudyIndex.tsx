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
 * Em telas largas é uma coluna fixa ao lado do painel; abaixo de 900px o CSS
 * transforma a mesma lista numa faixa de botões que rola na horizontal.
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
              {tema.capa ? (
                <span className="estudo-item__thumb">
                  <img src={tema.capa} alt="" loading="lazy" />
                </span>
              ) : (
                <span className="estudo-item__thumb estudo-item__thumb--vazia" />
              )}

              <span className="estudo-item__txt">
                <span className="estudo-item__nome">{tema.titulo}</span>
                <span className="estudo-item__meta">{resumo(tema)}</span>
              </span>
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
