import { useEffect } from 'react';

/** Cada página tinha seu próprio <title>; numa SPA precisamos definir na troca de rota. */
export function useDocumentTitle(titulo: string) {
  useEffect(() => {
    document.title = titulo;
  }, [titulo]);
}
