import qrcodePix from '../../assets/images/qrcode_pix.png';
import { PIX } from '../../lib/constants';
import { useCopiar } from '../../hooks/useCopiar';

/* É uma sequência de verdade — por isso os números. */
const PASSOS = [
  'Abra o app do seu banco e escolha Pix.',
  'Escaneie o QR Code ou cole a chave.',
  `Confira o favorecido, ${PIX.favorecido}, e confirme.`,
];

/**
 * O Pix, em destaque: o QR Code, a chave em numerais grandes com o botão de
 * copiar e, ao lado, o passo a passo.
 */
export function PixButton() {
  const { estado, copiar } = useCopiar();

  return (
    <section className="doe-pix" aria-labelledby="doe-pix-titulo">
      <div className="doe-pix-qr">
        <img src={qrcodePix} alt="QR Code do Pix da igreja" width={176} height={176} />
      </div>

      <div className="doe-pix-info">
        <h2 id="doe-pix-titulo">
          <i className="fa-brands fa-pix" aria-hidden="true" /> Doe pelo Pix
        </h2>
        <p className="doe-pix-rotulo">Chave Pix (CNPJ)</p>
        <p className="doe-pix-chave">{PIX.chave}</p>

        <div className="doe-pix-acoes">
          <button
            type="button"
            className={`doe-botao${estado === 'ok' ? ' is-copiado' : ''}`}
            onClick={() => copiar(PIX.chave)}
          >
            <i
              className={estado === 'ok' ? 'fa-solid fa-check' : 'fa-regular fa-copy'}
              aria-hidden="true"
            />
            {estado === 'ok' ? 'Chave copiada' : 'Copiar chave Pix'}
          </button>

          <p
            className={`doe-pix-status${estado === 'erro' ? ' doe-pix-status--erro' : ''}`}
            role="status"
            aria-live="polite"
          >
            {estado === 'ok'
              ? 'Agora é só colar no app do banco.'
              : estado === 'erro'
                ? 'Não foi possível copiar. Selecione a chave e copie.'
                : ''}
          </p>
        </div>
      </div>

      {/* role="list": com list-style none, o Safari deixa de anunciar como lista. */}
      <ol className="doe-passos" role="list">
        {PASSOS.map((passo) => (
          <li key={passo}>{passo}</li>
        ))}
      </ol>
    </section>
  );
}