import { useEffect } from 'react';

/**
 * A página não aparece no Google, mesmo que alguém publique o endereço.
 * Usado nas páginas que não estão no menu: a Central e o /links.
 */
export function useForaDosBuscadores() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);
}
