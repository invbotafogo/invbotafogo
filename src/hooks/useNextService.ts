import { useEffect, useState } from 'react';
import { calcularProximoCulto } from '../lib/cultos';

export interface ProximoCulto {
  data: Date;
  aoVivo: boolean;
  rotulo: string;
}

function montar(agora: Date): ProximoCulto | null {
  const data = calcularProximoCulto(agora);
  if (!data) return null;
  return {
    data,
    aoVivo: data <= agora,
    rotulo: data.toLocaleString('pt-BR', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}

/** Recalcula de minuto em minuto para a faixa virar "ao vivo" sozinha. */
export function useNextService(): ProximoCulto | null {
  const [culto, setCulto] = useState<ProximoCulto | null>(() => montar(new Date()));

  useEffect(() => {
    const id = setInterval(() => setCulto(montar(new Date())), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return culto;
}
