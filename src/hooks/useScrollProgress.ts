import { useEffect, useRef } from 'react';

/**
 * Prende a barra de progresso ao movimento da página.
 *
 * Devolve uma ref para o elemento da barra: o valor é escrito direto no DOM,
 * dentro de um requestAnimationFrame, em vez de virar estado do React. Estado
 * fazia o header inteiro re-renderizar a cada evento de scroll, e era isso que
 * dava a sensação de avanço aos saltos.
 *
 * O preenchimento usa `scaleX`, que o navegador resolve no compositor, sem
 * recalcular layout a cada quadro como acontecia animando `width`.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    let quadro = 0;

    function aplicar() {
      quadro = 0;

      const elemento = ref.current;
      if (!elemento) return;

      const doc = document.documentElement;
      const rolavel = doc.scrollHeight - window.innerHeight;
      const razao = rolavel > 0 ? window.scrollY / rolavel : 0;

      // Rolagem elástica (iOS) devolve valores fora de 0–1.
      const limitada = Math.min(Math.max(razao, 0), 1);

      elemento.style.transform = `scaleX(${limitada})`;
    }

    /* Eventos de scroll chegam mais rápido do que a tela desenha: um quadro
       por vez basta, e mantém a barra sempre no mesmo instante da rolagem. */
    function agendar() {
      if (!quadro) quadro = requestAnimationFrame(aplicar);
    }

    aplicar();
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', agendar);

    /* Páginas que crescem depois de carregar (vídeos, imagens, aulas abrindo)
       mudam o total rolável — sem isso a barra passaria a mentir o percentual. */
    const observador = new ResizeObserver(agendar);
    observador.observe(document.body);

    return () => {
      if (quadro) cancelAnimationFrame(quadro);
      window.removeEventListener('scroll', agendar);
      window.removeEventListener('resize', agendar);
      observador.disconnect();
    };
  }, []);

  return ref;
}
