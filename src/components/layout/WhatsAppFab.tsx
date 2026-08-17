import { REDES } from '../../lib/constants';

/* Ícone do WhatsApp — mesmo SVG de components/icons.jsx do site-igreja. */
function WaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21z" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

/* Botão flutuante de WhatsApp */
export function WhatsAppFab() {
  if (!REDES.whatsapp) return null;

  return (
    <a
      className="wa-fab"
      href={REDES.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Fale no WhatsApp"
      title="Fale no WhatsApp"
    >
      <WaIcon />
    </a>
  );
}
