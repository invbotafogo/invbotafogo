import { useEffect, useState } from 'react';

export type ModoCalendario = 'MONTH' | 'AGENDA';

const calcularModo = (): ModoCalendario =>
  window.innerWidth < 450 ? 'AGENDA' : 'MONTH';

/**
 * Agenda em telas estreitas, mês nas demais. O resize é debounced em 1s,
 * como no initializeCalendar() antigo.
 */
export function useCalendarMode(): ModoCalendario {
  const [modo, setModo] = useState<ModoCalendario>(calcularModo);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const aoRedimensionar = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setModo(calcularModo()), 1000);
    };

    window.addEventListener('resize', aoRedimensionar);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', aoRedimensionar);
    };
  }, []);

  return modo;
}
