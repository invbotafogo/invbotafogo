import { useEffect, useState } from 'react';

/** Retorna o progresso de rolagem da página, de 0 a 100. */
export function useScrollProgress() {
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    function calcular() {
      const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollAtual = window.scrollY;
      const percentual = alturaTotal > 0 ? (scrollAtual / alturaTotal) * 100 : 0;
      setProgresso(percentual);
    }

    calcular();
    window.addEventListener('scroll', calcular, { passive: true });
    window.addEventListener('resize', calcular);

    return () => {
      window.removeEventListener('scroll', calcular);
      window.removeEventListener('resize', calcular);
    };
  }, []);

  return progresso;
}