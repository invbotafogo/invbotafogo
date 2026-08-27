import type { Tema } from '../../lib/estudos';
import { ClassCard } from './ClassCard';
import { resumo } from './StudyIndex';

/**
 * Painel do estudo selecionado: faixa da capa, cabeçalho e as aulas.
 * A faixa entra escurecida e desfocada de propósito — as artes já trazem o
 * nome do estudo escrito, e o título do painel não pode disputar com elas.
 */
export function StudyPanel({ tema }: { tema: Tema }) {
  return (
    <article className="estudo-painel" aria-labelledby={`estudo-${tema.id}`}>
      {tema.capa ? (
        <div className="estudo-painel__capa">
          <img src={tema.capa} alt="" />
        </div>
      ) : (
        <div className="estudo-painel__capa estudo-painel__capa--vazia" />
      )}

      {/*
        Não usar <header> aqui: header.css estiliza a tag `header` como a
        navbar fixa do site (position: fixed !important), e o cabeçalho do
        painel viraria uma segunda barra colada no topo da página.
      */}
      <div className="estudo-painel__cab">
        <h3 id={`estudo-${tema.id}`}>{tema.titulo}</h3>
        <span className="estudo-painel__meta">{resumo(tema)}</span>
      </div>

      <div className="estudo-painel__corpo">
        {tema.aulas.length > 0 ? (
          <div className="estudo-aulas">
            {tema.aulas.map((aula) => (
              <ClassCard key={aula.titulo} aula={aula} />
            ))}
          </div>
        ) : (
          <p className="estudo-vazio">Aulas em breve.</p>
        )}
      </div>
    </article>
  );
}
