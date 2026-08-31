import { useCallback, useEffect, useRef, useState } from 'react';
import type { TouchEvent } from 'react';
import { useLocation } from 'react-router-dom';

/** Mesmo breakpoint do header.css — acima disso a gaveta nem existe. */
const CONSULTA_MOBILE = '(max-width: 1024px)';

/** Quanto o dedo precisa arrastar para a direita para a gaveta fechar. */
const ARRASTO_PARA_FECHAR = 80;

/**
 * Menu hambúrguer (gaveta lateral do mobile): estado, teclado, foco, trava de
 * scroll e o gesto de arrastar para fechar.
 */
export function useMobileMenu() {
  const [aberto, setAberto] = useState(false);
  const gavetaRef = useRef<HTMLElement>(null);
  const gatilhoRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  const fechar = useCallback(() => setAberto(false), []);
  const alternar = useCallback(() => setAberto((v) => !v), []);

  /*
   * Fecha ao trocar de rota. O clique nos links já fecha, mas o botão "voltar"
   * do navegador troca a rota sem passar por eles — sem isto a gaveta ficava
   * aberta por cima da página nova.
   */
  useEffect(() => {
    setAberto(false);
  }, [pathname]);

  useEffect(() => {
    if (!aberto) return;

    const aoClicarFora = (e: MouseEvent) => {
      const alvo = e.target as HTMLElement;
      if (!alvo.closest('.navbar__drawer') && !alvo.closest('.navbar__toggle')) fechar();
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar();
    };

    /*
     * Fecha só quando a tela cresce além do breakpoint — e não em qualquer
     * `resize`, como antes. No Android, mostrar ou esconder a barra de
     * endereço dispara `resize`, e a gaveta fechava sozinha no meio do uso.
     */
    const consulta = window.matchMedia(CONSULTA_MOBILE);
    const aoTrocarLargura = (e: MediaQueryListEvent) => {
      if (!e.matches) fechar();
    };

    document.addEventListener('click', aoClicarFora);
    document.addEventListener('keydown', aoTeclar);
    consulta.addEventListener('change', aoTrocarLargura);

    return () => {
      document.removeEventListener('click', aoClicarFora);
      document.removeEventListener('keydown', aoTeclar);
      consulta.removeEventListener('change', aoTrocarLargura);
    };
  }, [aberto, fechar]);

  /*
   * Foco preso na gaveta enquanto ela está aberta, e devolvido ao hambúrguer
   * ao fechar. Sem a devolução o navegador joga o foco no <body> (o elemento
   * focado vira `visibility: hidden`) e a navegação por teclado recomeça do
   * topo da página.
   */
  useEffect(() => {
    const gaveta = gavetaRef.current;
    if (!aberto || !gaveta) return;

    const focaveis = () =>
      Array.from(
        gaveta.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );

    focaveis()[0]?.focus();

    const aoTabular = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const lista = focaveis();
      if (!lista.length) return;

      const primeiro = lista[0];
      const ultimo = lista[lista.length - 1];
      const atual = document.activeElement;
      const dentro = gaveta.contains(atual);

      if (e.shiftKey && (!dentro || atual === primeiro)) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && (!dentro || atual === ultimo)) {
        e.preventDefault();
        primeiro.focus();
      }
    };

    document.addEventListener('keydown', aoTabular);

    return () => {
      document.removeEventListener('keydown', aoTabular);
      const gatilho = gatilhoRef.current;
      if (gatilho && document.contains(gatilho)) gatilho.focus();
    };
  }, [aberto]);

  /*
   * Trava de scroll. `overflow: hidden` no body sozinho não segura o Safari do
   * iPhone — lá o jeito que funciona é fixar o body e compensar a posição com
   * um `top` negativo, restaurando a rolagem ao fechar. Os valores anteriores
   * são guardados e devolvidos um a um: se outro componente já tiver mexido
   * neles, fechar o menu não pode desfazer o trabalho alheio.
   */
  useEffect(() => {
    if (!aberto) return;

    const body = document.body;
    const posicao = window.scrollY;
    const anterior = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${posicao}px`;
    body.style.width = '100%';

    return () => {
      body.style.overflow = anterior.overflow;
      body.style.position = anterior.position;
      body.style.top = anterior.top;
      body.style.width = anterior.width;

      /*
       * Com o body fixo a rolagem do documento vai a zero; o scrollTo abaixo é
       * quem devolve a pessoa ao lugar em que ela estava. Só que o site tem
       * `html { scroll-behavior: smooth }` (global.css), e isso transformava
       * essa devolução numa animação: quem apenas abria e fechava o menu via a
       * página saltar para o topo e descer de volta sozinha.
       *
       * O comportamento é desligado no átimo da restauração e devolvido em
       * seguida — mexer no global.css tiraria a rolagem suave dos links
       * âncora, que é intencional.
       */
      const raiz = document.documentElement;
      const rolagemAnterior = raiz.style.scrollBehavior;
      raiz.style.scrollBehavior = 'auto';
      window.scrollTo(0, posicao);
      raiz.style.scrollBehavior = rolagemAnterior;
    };
  }, [aberto]);

  /*
   * Arrastar para a direita fecha. O deslocamento vai para o `transform` da
   * gaveta enquanto o dedo está na tela, então ela acompanha o gesto; soltando
   * antes do limite, a transição do CSS devolve a gaveta ao lugar.
   *
   * Um gesto mais vertical que horizontal é entregue de volta ao navegador —
   * é a rolagem da lista, não uma tentativa de fechar.
   */
  const inicio = useRef<{ x: number; y: number } | null>(null);
  const [arrasto, setArrasto] = useState(0);

  const aoTocarInicio = (e: TouchEvent) => {
    const toque = e.touches[0];
    inicio.current = { x: toque.clientX, y: toque.clientY };
  };

  const aoTocarMover = (e: TouchEvent) => {
    if (!inicio.current) return;

    const toque = e.touches[0];
    const dx = toque.clientX - inicio.current.x;
    const dy = toque.clientY - inicio.current.y;

    if (Math.abs(dy) > Math.abs(dx)) {
      inicio.current = null;
      setArrasto(0);
      return;
    }

    setArrasto(Math.max(0, dx));
  };

  const aoTocarFim = () => {
    if (!inicio.current) return;

    const largura = gavetaRef.current?.offsetWidth ?? 320;
    if (arrasto > Math.min(ARRASTO_PARA_FECHAR, largura * 0.3)) fechar();

    inicio.current = null;
    setArrasto(0);
  };

  return {
    aberto,
    alternar,
    fechar,
    gavetaRef,
    gatilhoRef,
    arrasto,
    gestos: {
      onTouchStart: aoTocarInicio,
      onTouchMove: aoTocarMover,
      onTouchEnd: aoTocarFim,
      onTouchCancel: aoTocarFim,
    },
  };
}
