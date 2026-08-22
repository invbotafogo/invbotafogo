import { useEffect, useState } from 'react';
import { PIX } from '../../lib/constants';

export function PixButton() {
  const [confirmacao, setConfirmacao] = useState('');

  useEffect(() => {
    if (!confirmacao) return;
    const id = setTimeout(() => setConfirmacao(''), 3000);
    return () => clearTimeout(id);
  }, [confirmacao]);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(PIX.chave);
      setConfirmacao('Chave PIX copiada!');
    } catch {
      setConfirmacao('Não foi possível copiar. Copie manualmente.');
    }
  };

  return (
    <div className="pix-box">
      <br />
      <h3>Chave PIX</h3>

      {/* QR Code vem como background-image no CSS, igual ao site antigo. */}
      <div className="qrcode" />

      <p>
        <i className="fa-solid fa-qrcode" /> <strong id="chave-pix">{PIX.chave}</strong>
      </p>

      <button type="button" id="copiar-btn" onClick={copiar}>
        Copiar chave PIX
      </button>
      <p id="confirmacao-pix" className="confirmacao" role="status" aria-live="polite">
        {confirmacao}
      </p>
    </div>
  );
}
