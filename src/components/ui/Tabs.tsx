import type { ReactNode } from 'react';
import '../../styles/tabs.css';

export interface AbaDef<T extends string> {
  id: T;
  rotulo: string;
}

interface TabsProps<T extends string> {
  abas: readonly AbaDef<T>[];
  ativa: T;
  aoTrocar: (id: T) => void;
  children: ReactNode;
  /** Rótulo acessível do conjunto de abas. */
  rotuloLista?: string;
}

/** Componente de abas reutilizável, com navegação por setas do teclado. */
export function Tabs<T extends string>({
  abas,
  ativa,
  aoTrocar,
  children,
  rotuloLista = 'Seções',
}: TabsProps<T>) {
  const aoTeclar = (e: React.KeyboardEvent<HTMLButtonElement>, indice: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const passo = e.key === 'ArrowRight' ? 1 : -1;
    const proxima = abas[(indice + passo + abas.length) % abas.length];
    aoTrocar(proxima.id);
  };

  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist" aria-label={rotuloLista}>
        {abas.map((aba, indice) => (
          <button
            key={aba.id}
            type="button"
            role="tab"
            id={`tab-${aba.id}`}
            className="tabs__tab"
            aria-selected={aba.id === ativa}
            aria-controls={`painel-${aba.id}`}
            tabIndex={aba.id === ativa ? 0 : -1}
            onClick={() => aoTrocar(aba.id)}
            onKeyDown={(e) => aoTeclar(e, indice)}
          >
            {aba.rotulo}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`painel-${ativa}`} aria-labelledby={`tab-${ativa}`}>
        {children}
      </div>
    </div>
  );
}
