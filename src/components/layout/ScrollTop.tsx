import { useEffect, useState } from 'react';

/* Ícone ArrowUp — mesmo desenho da lucide usada no site-igreja. */
function ArrowUp() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </svg>
  );
}

/* Botão "voltar ao topo" (aparece após rolar 400px, como no site-igreja) */
export function ScrollTop() {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const aoRolar = () => setMostrar(window.scrollY > 400);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  if (!mostrar) return null;

  return (
    <button
      type="button"
      className="to-top"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp />
    </button>
  );
}
