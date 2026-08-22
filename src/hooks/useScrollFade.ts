import { useEffect, useState } from 'react';

/**
 * Na home, a seção "Bem-vindo" some e as seções seguintes aparecem
 * depois de 100px de rolagem.
 */
export function useScrollFade(limite = 100): boolean {
  const [passou, setPassou] = useState(() => window.scrollY > limite);

  useEffect(() => {
    const aoRolar = () => setPassou(window.scrollY > limite);
    window.addEventListener('scroll', aoRolar, { passive: true });
    aoRolar();
    return () => window.removeEventListener('scroll', aoRolar);
  }, [limite]);

  return passou;
}
