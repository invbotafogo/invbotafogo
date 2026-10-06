import { useEffect, useState } from 'react';

export type EstadoDaCopia = 'ok' | 'erro' | null;

/**
 * Copia um texto para a área de transferência e guarda, por 3 segundos, se
 * deu certo — tempo de o botão mostrar "Copiado" antes de voltar ao normal.
 */
export function useCopiar() {
  const [estado, setEstado] = useState<EstadoDaCopia>(null);

  useEffect(() => {
    if (!estado) return;
    const id = setTimeout(() => setEstado(null), 3000);
    return () => clearTimeout(id);
  }, [estado]);

  const copiar = async (texto: string) => {
    try {
      await navigator.clipboard.writeText(texto);
      setEstado('ok');
    } catch {
      setEstado('erro');
    }
  };

  return { estado, copiar };
}