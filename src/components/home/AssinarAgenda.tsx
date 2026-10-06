import { useEffect, useId, useRef, useState } from 'react';
import { IGREJA } from '../../lib/constants';
import { CALENDARIO_ICS } from '../../lib/calendarioIcs';
import { useCopiar } from '../../hooks/useCopiar';
import '../../styles/assinar-agenda.css';

/*
 * Cada app assina o calendário de um jeito:
 *   - Google Agenda: pelo site do Google, com o endereço do calendário;
 *   - iPhone e Mac: o link webcal:// abre o Calendário já pedindo a assinatura;
 *   - Outlook: pelo site do Outlook, como "calendário da web".
 * Para qualquer outro app, o link copiado serve ("assinar calendário por URL").
 */
const OPCOES = [
  {
    nome: 'Google Agenda',
    detalhe: 'Android e Gmail',
    icone: 'fa-brands fa-google',
    href: `https://calendar.google.com/calendar/r?cid=${CALENDARIO_ICS.webcal}`,
    novaAba: true,
  },
  {
    nome: 'Calendário da Apple',
    detalhe: 'iPhone, iPad e Mac',
    icone: 'fa-brands fa-apple',
    href: CALENDARIO_ICS.webcal,
    novaAba: false,
  },
  {
    nome: 'Outlook',
    detalhe: 'Hotmail e Outlook.com',
    icone: 'fa-brands fa-microsoft',
    href: `https://outlook.live.com/calendar/0/addfromweb?url=${encodeURIComponent(
      CALENDARIO_ICS.webcal,
    )}&name=${encodeURIComponent(IGREJA.nome)}`,
    novaAba: true,
  },
];

/**
 * "Adicionar à minha agenda": assina o calendário da igreja — os encontros
 * da semana e os eventos do mês — no app de calendário da pessoa. O app
 * atualiza sozinho quando a agenda muda.
 */
export function AssinarAgenda() {
  const [aberto, setAberto] = useState(false);
  const { estado, copiar } = useCopiar();
  const raiz = useRef<HTMLDivElement>(null);
  const botao = useRef<HTMLButtonElement>(null);
  const idMenu = useId();

  /* Fecha ao tocar fora ou com Esc (e o foco volta para o botão). */
  useEffect(() => {
    if (!aberto) return;
    const aoTocar = (evento: PointerEvent) => {
      if (!raiz.current?.contains(evento.target as Node)) setAberto(false);
    };
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key !== 'Escape') return;
      setAberto(false);
      botao.current?.focus();
    };
    document.addEventListener('pointerdown', aoTocar);
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.removeEventListener('pointerdown', aoTocar);
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [aberto]);

  return (
    <div className="ag" ref={raiz}>
      <button
        ref={botao}
        type="button"
        className="ag-botao"
        aria-expanded={aberto}
        aria-controls={idMenu}
        onClick={() => setAberto((valor) => !valor)}
      >
        <i className="fa-regular fa-calendar-plus" aria-hidden="true" />
        Adicionar à minha agenda
        <i className="fa-solid fa-chevron-down ag-seta" aria-hidden="true" />
      </button>

      <div id={idMenu} className="ag-menu" hidden={!aberto}>
        <p className="ag-menu-texto">
          Os cultos e os eventos do mês no seu calendário. Ele se atualiza sozinho.
        </p>
        <ul>
          {OPCOES.map((opcao) => (
            <li key={opcao.nome}>
              <a
                className="ag-opcao"
                href={opcao.href}
                {...(opcao.novaAba ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => setAberto(false)}
              >
                <i className={opcao.icone} aria-hidden="true" />
                <span>
                  <b>{opcao.nome}</b>
                  <small>{opcao.detalhe}</small>
                </span>
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="ag-opcao"
              onClick={() => copiar(CALENDARIO_ICS.url)}
            >
              <i
                className={estado === 'ok' ? 'fa-solid fa-check' : 'fa-regular fa-copy'}
                aria-hidden="true"
              />
              <span>
                <b>{estado === 'ok' ? 'Link copiado' : 'Copiar o link'}</b>
                <small>
                  {estado === 'erro' ? CALENDARIO_ICS.url : 'Para outros apps de calendário'}
                </small>
              </span>
            </button>
          </li>
        </ul>
        <p className="ag-status" role="status" aria-live="polite">
          {estado === 'ok' ? 'Link do calendário copiado.' : ''}
        </p>
      </div>
    </div>
  );
}
