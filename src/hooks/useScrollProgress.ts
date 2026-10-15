import { useEffect, useRef } from 'react';

/**
 * Navegadores novos (Safari 26, Chrome 115+) sabem prender uma animação à
 * rolagem direto no compositor: `animation-timeline: scroll()`. Aí a barra
 * anda no mesmo thread que desenha a rolagem, sem passar pelo JavaScript.
 */
export function suportaTimelineDeRolagem(): boolean {
  return typeof CSS !== 'undefined' && CSS.supports('animation-timeline: scroll()');
}

/**
 * Prende a barra de progresso ao movimento da página.
 *
 * Devolve uma ref para o elemento da barra. Onde o navegador suporta a
 * timeline de rolagem, o CSS (header.css) cuida de tudo e este hook só liga
 * a classe. Nos outros, o valor é escrito direto no DOM, dentro de um
 * requestAnimationFrame, usando `scaleX` (resolvido no compositor).
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (suportaTimelineDeRolagem()) {
      ref.current?.classList.add('navbar__progress--css');
      return;
    }

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
       por vez basta. */
    function agendar() {
      if (!quadro) quadro = requestAnimationFrame(aplicar);
    }

    aplicar();
    window.addEventListener('scroll', agendar, { passive: true });
    window.addEventListener('resize', agendar);

    /* Páginas que crescem depois de carregar mudam o total rolável. */
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
