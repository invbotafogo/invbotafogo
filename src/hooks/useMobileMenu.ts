import { useCallback, useEffect, useState } from 'react';

/**
 * Menu hambúrguer: fecha ao clicar fora, no Esc, ao redimensionar
 * e ao navegar — mesmo comportamento do setupMobileMenu() antigo.
 */
export function useMobileMenu() {
  const [aberto, setAberto] = useState(false);

  const fechar = useCallback(() => setAberto(false), []);
  const alternar = useCallback(() => setAberto((v) => !v), []);

  useEffect(() => {
    if (!aberto) return;

    const aoClicarFora = (e: MouseEvent) => {
      const alvo = e.target as HTMLElement;
      if (!alvo.closest('#menu') && !alvo.closest('.navbar__toggle')) fechar();
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar();
    };

    document.addEventListener('click', aoClicarFora);
    document.addEventListener('keydown', aoTeclar);
    window.addEventListener('resize', fechar);

    return () => {
      document.removeEventListener('click', aoClicarFora);
      document.removeEventListener('keydown', aoTeclar);
      window.removeEventListener('resize', fechar);
    };
  }, [aberto, fechar]);

  return { aberto, alternar, fechar };
}
