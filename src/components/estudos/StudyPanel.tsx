import type { Tema } from '../../lib/estudos';
import { ClassCard } from './ClassCard';
import { resumo } from './StudyIndex';

interface StudyPanelProps {
  tema: Tema;
  /** Nome da aba por extenso ("Escola Bíblica Dominical", "Capacitação"). */
  rotulo: string;
}

/**
 * Painel do estudo escolhido, no mesmo desenho do painel de Ministérios:
 * rótulo, nome grande e o resumo em dourado; embaixo do fio, as aulas.
 */
export function StudyPanel({ tema, rotulo }: StudyPanelProps) {
  return (
    <article className="est-painel" aria-labelledby={`estudo-${tema.id}`}>
      {/*
        A `key` refaz o conteúdo a cada troca de estudo: ele entra com o mesmo
        esmaecer de Ministérios, e um vídeo que estava tocando para. Sem ela,
        a "Aula 1" de um estudo herdava o player aberto da "Aula 1" do outro.
      */}
      <div className="est-painel-conteudo" key={tema.id}>
        {/*
          Não usar <header> aqui: header.css estiliza a tag `header` como a
          navbar fixa do site (position: fixed !important), e o cabeçalho do
          painel viraria uma segunda barra colada no topo da página.
        */}
        <div className="est-topo">
          <p className="est-rotulo">{rotulo}</p>
          <h2 id={`estudo-${tema.id}`}>{tema.titulo}</h2>
          <p className="est-resumo">{resumo(tema)}</p>
        </div>

        {tema.aulas.length > 0 ? (
          <div className="est-aulas">
            {tema.aulas.map((aula) => (
              <ClassCard key={aula.titulo} aula={aula} />
            ))}
          </div>
        ) : (
          <p className="est-vazio">Aulas em breve.</p>
        )}
      </div>
    </article>
  );
}
