import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { codigoConfere, liberarCentral } from '../../lib/acessoCentral';
import '../../styles/acesso-central.css';

/*
 * Acesso à Central INVB (/central), que não tem link no site. Só funciona na
 * página inicial. Abre uma janelinha para digitar o código de acesso:
 *   - pelo link direto invbotafogo.com.br/#central;
 *   - no computador, apertando Shift 3 vezes seguidas;
 *   - no celular, com 5 toques rápidos no "© Igreja..." do rodapé.
 * O código não está no repositório: vem de um secret do GitHub no build (ver
 * src/lib/acessoCentral.ts).
 *
 * Continua sendo um acesso escondido, não protegido: o conteúdo da Central vai
 * junto com o site. Nada de senha ou dado pessoal nessa página.
 */
const DESTINO = '/central';

/*
 * Link direto: invbotafogo.com.br/#central abre a página inicial já com a
 * janelinha do código. O #central fica no endereço enquanto a janela está
 * aberta — é o que deixa salvar o link na tela de início do celular
 * (Compartilhar → Adicionar à Tela de Início) — e sai quando ela fecha.
 */
const ANCORA = '#central';

const SHIFTS = 3;
const JANELA_DOS_SHIFTS_MS = 1500;

const TOQUES = 5;
const JANELA_DOS_TOQUES_MS = 2500;

export function AcessoCentral({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const naHome = pathname === '/';

  const dialogo = useRef<HTMLDialogElement>(null);
  const campo = useRef<HTMLInputElement>(null);
  const toques = useRef<number[]>([]);
  const [erro, setErro] = useState(false);

  const abrir = useCallback(() => {
    setErro(false);
    if (dialogo.current && !dialogo.current.open) dialogo.current.showModal();
  }, []);

  /*
   * Computador: Shift, Shift, Shift, em até 1,5 segundo e sem outra tecla no
   * meio — assim escrever em maiúsculas não abre a janela sem querer.
   */
  useEffect(() => {
    if (!naHome) return;
    let apertos: number[] = [];

    const aoTeclar = (evento: KeyboardEvent) => {
      const alvo = evento.target as HTMLElement | null;
      if (alvo?.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (evento.key !== 'Shift') {
        apertos = [];
        return;
      }
      if (evento.repeat) return; // segurar o Shift não conta como vários apertos

      const agora = Date.now();
      apertos = [...apertos.filter((t) => agora - t < JANELA_DOS_SHIFTS_MS), agora];
      if (apertos.length >= SHIFTS) {
        apertos = [];
        abrir();
      }
    };

    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [naHome, abrir]);

  /* Link direto (#central): abre ao chegar pelo link e também se o endereço
     mudar com a página inicial já aberta. */
  useEffect(() => {
    if (!naHome) return;
    const conferir = () => {
      if (window.location.hash === ANCORA) abrir();
    };
    conferir();
    window.addEventListener('hashchange', conferir);
    return () => window.removeEventListener('hashchange', conferir);
  }, [naHome, abrir]);

  /* Celular: 5 toques em até 2,5 segundos. */
  const aoTocar = () => {
    if (!naHome) return;
    const agora = Date.now();
    toques.current = [...toques.current.filter((t) => agora - t < JANELA_DOS_TOQUES_MS), agora];
    if (toques.current.length < TOQUES) return;
    toques.current = [];
    abrir();
  };

  const entrar = async () => {
    if (await codigoConfere(campo.current?.value ?? '')) {
      liberarCentral();
      /* Veio pelo link: o #central sai do histórico, para o "voltar" da
         Central levar à página inicial, e não à caixa do código de novo. */
      if (window.location.hash === ANCORA) navigate('/', { replace: true });
      dialogo.current?.close();
      navigate(DESTINO);
      return;
    }
    setErro(true);
    campo.current?.select();
  };

  const aoFechar = () => {
    if (campo.current) campo.current.value = '';
    setErro(false);
    /* Fechou a janela que veio do link: o #central sai do endereço. */
    if (window.location.hash === ANCORA) navigate('/', { replace: true });
  };

  return (
    <>
      <p className="acc-gatilho" onClick={aoTocar}>
        {children}
      </p>

      <dialog ref={dialogo} className="acc-dialogo" onClose={aoFechar} aria-labelledby="acc-titulo">
        <form
          onSubmit={(evento) => {
            evento.preventDefault();
            void entrar();
          }}
        >
          <label id="acc-titulo" htmlFor="acc-codigo">
            Código de acesso
          </label>
          <input
            id="acc-codigo"
            ref={campo}
            type="text"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            maxLength={12}
            aria-invalid={erro}
            aria-describedby={erro ? 'acc-erro' : undefined}
          />
          {erro && (
            <p id="acc-erro" className="acc-erro" role="alert">
              Código incorreto.
            </p>
          )}
          <div className="acc-acoes">
            <button type="button" className="acc-botao" onClick={() => dialogo.current?.close()}>
              Cancelar
            </button>
            <button type="submit" className="acc-botao acc-botao--cheio">
              Entrar
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
