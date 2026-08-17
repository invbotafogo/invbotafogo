import type { Ministerio } from '../../lib/ministerios';

interface MinistryCardProps {
  ministerio: Ministerio;
  aoSelecionar: () => void;
}

export function MinistryCard({ ministerio, aoSelecionar }: MinistryCardProps) {
  return (
    <div
      className="card"
      id={ministerio.id}
      role="button"
      tabIndex={0}
      onClick={aoSelecionar}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          aoSelecionar();
        }
      }}
    >
      <i className={`${ministerio.icone} card-icon`} />
      <span className="card-label">{ministerio.label.toUpperCase()}</span>
      <span className="card-name">{ministerio.nome.toUpperCase()}</span>
    </div>
  );
}
