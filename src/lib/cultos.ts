/** Grade de cultos usada para calcular o "próximo culto" na página /cultos. */

export interface HorarioCulto {
  /** Dia da semana no padrão Date.getDay(): 0 = domingo, 3 = quarta. */
  dia: number;
  hora: number;
  minutos: number;
}

export const CULTOS: HorarioCulto[] = [
  { dia: 3, hora: 19, minutos: 30 },
  { dia: 0, hora: 10, minutos: 0 },
  { dia: 0, hora: 19, minutos: 0 },
];

/** Quanto tempo depois do início ainda consideramos o culto "ao vivo". */
export const JANELA_AO_VIVO_MS = 2 * 60 * 60 * 1000;

/**
 * Devolve o próximo culto, ou o culto em andamento se ele começou
 * há menos de JANELA_AO_VIVO_MS.
 */
export function calcularProximoCulto(agora: Date = new Date()): Date | null {
  const candidatos = CULTOS.map((culto) => {
    const data = new Date(agora);
    const diffDias = (culto.dia - data.getDay() + 7) % 7;
    data.setDate(data.getDate() + diffDias);
    data.setHours(culto.hora, culto.minutos, 0, 0);
    return data;
  })
    .filter(
      (data) =>
        data > agora || agora.getTime() - data.getTime() <= JANELA_AO_VIVO_MS,
    )
    .sort((a, b) => a.getTime() - b.getTime());

  return candidatos[0] ?? null;
}
