import type { Tema } from '../../lib/estudos';
import { ClassCard } from './ClassCard';

interface TopicCardProps {
  tema: Tema;
  aberto: boolean;
  aoAlternar: () => void;
}

export function TopicCard({ tema, aberto, aoAlternar }: TopicCardProps) {
  return (
    <div className="tema-card">
      <button
        type="button"
        className="tema-btn"
        onClick={aoAlternar}
        aria-expanded={aberto}
        aria-controls={`${tema.id}-container`}
      >
        {tema.titulo}
      </button>

      <div
        id={`${tema.id}-container`}
        className={`aulas-container${aberto ? '' : ' hidden'}`}
      >
        {/* Só monta as aulas quando abre — evita carregar dezenas de iframes de uma vez. */}
        {aberto &&
          (tema.aulas.length > 0 ? (
            tema.aulas.map((aula) => <ClassCard key={aula.titulo} aula={aula} />)
          ) : (
            <p className="tema-vazio">Aulas em breve.</p>
          ))}
      </div>
    </div>
  );
}
