import { useEffect } from 'react';

/* Hook: revela elementos .reveal / .reveal-stagger ao rolar.
   Reexamina quando o conteúdo muda e respeita "reduzir movimento". */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || !('IntersectionObserver' in window)) {
      const markAll = () =>
        document
          .querySelectorAll('.reveal:not(.in), .reveal-stagger:not(.in)')
          .forEach((el) => el.classList.add('in'));
      markAll();
      const mo = new MutationObserver(markAll);
      mo.observe(document.body, { childList: true, subtree: true });
      return () => mo.disconnect();
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -7% 0px' },
    );

    const observeAll = () =>
      document
        .querySelectorAll('.reveal:not(.in), .reveal-stagger:not(.in)')
        .forEach((el) => io.observe(el));
    observeAll();

    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [dep]);
}
