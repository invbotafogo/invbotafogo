import { useEffect, type RefObject } from 'react';

/** Marca a raiz do documento enquanto o rodapé estiver na tela. */
const CLASSE = 'rodape-a-vista';

/**
 * Avisa o CSS quando o rodapé entra na viewport.
 *
 * Serve ao botão flutuante de WhatsApp: ele é `position: fixed` no canto
 * inferior direito e, ao rolar até o fim, ficava por cima dos links do rodapé
 * — no celular chegava a cobrir "Ministérios". Como o botão captura o toque,
 * o link ficava parcialmente inacessível: quem tocasse ali abria o WhatsApp.
 *
 * Esconder o botão nesse momento não tira nada de ninguém: o próprio rodapé
 * já traz o WhatsApp na fileira de ícones sociais, mais o telefone e o e-mail.
 * O botão é redundante exatamente onde atrapalha.
 *
 * Quem observa é o próprio rodapé, sobre a sua própria ref. Assim não é
 * preciso procurá-lo no DOM nem reatar o observador a cada troca de rota, e
 * nada aqui muda se um dia o rodapé mudar de lugar na árvore.
 *
 * O aviso sai como classe no <html>, e não como estado do React, de propósito:
 * o botão reage por CSS e nenhuma re-renderização acontece ao rolar.
 */
export function useRodapeAVista(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const elemento = ref.current;
    const raiz = document.documentElement;

    /* Sem IntersectionObserver o botão simplesmente nunca some — o
       comportamento antigo, que é aceitável como reserva. */
    if (!elemento || !('IntersectionObserver' in window)) return;

    const observador = new IntersectionObserver(
      ([entrada]) => raiz.classList.toggle(CLASSE, entrada.isIntersecting),
      /* -16px = o mesmo `bottom` do botão: a sobreposição começa quando o
         topo do rodapé passa da base do botão, não quando o rodapé aparece. */
      { rootMargin: '0px 0px -16px 0px' },
    );

    observador.observe(elemento);

    return () => {
      observador.disconnect();
      raiz.classList.remove(CLASSE);
    };
  }, [ref]);
}
