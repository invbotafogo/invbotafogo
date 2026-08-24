import type { Ref } from 'react';
import { NOME_EXPANDIDO, usaLayoutSolo, type Ministerio } from '../../lib/ministerios';
import { MinistryDetailSolo } from './MinistryDetailSolo';

interface MinistryDetailProps {
  ministerio: Ministerio | null;
  aoFechar: () => void;
  /**
   * O ref vai direto no #expanded-content: o CSS usa seletores irmãos
   * (`#expanded-content:not(.hidden) ~ .cards-container`), então qualquer
   * wrapper extra aqui quebra o layout do painel expandido.
   */
  painelRef?: Ref<HTMLDivElement>;
}

export function MinistryDetail({ ministerio, aoFechar, painelRef }: MinistryDetailProps) {
  /**
   * Ministérios já migrados para o layout novo (padrão Contato / "Nossa
   * história") usam o outro card. Os demais seguem no painel original.
   */
  if (usaLayoutSolo(ministerio?.id)) {
    return (
      <MinistryDetailSolo ministerio={ministerio} aoFechar={aoFechar} painelRef={painelRef} />
    );
  }

  return (
    <div
      ref={painelRef}
      id="expanded-content"
      className={`expanded-content${ministerio ? '' : ' hidden'}`}
      onClick={aoFechar}
    >
      {ministerio && (
        <div
          className="expanded-item expanded-item--invb"
          data-id={ministerio.id}
        >
          <div className="expanded-item__figure">
            <img
              className="expanded-image"
              src={ministerio.imagem}
              alt={ministerio.imagemAlt}
            />
          </div>
          <div className="expanded-text">
            <h2 className="ministerio-expanded-title">
              <span className="ministerio-expanded-title__label">{ministerio.label}</span>
              <span className="ministerio-expanded-title__name">
                {NOME_EXPANDIDO[ministerio.id] ?? ministerio.nome}
              </span>
            </h2>

            {ministerio.paragrafos.map((texto) => (
              <p key={texto.slice(0, 40)}>{texto}</p>
            ))}

            <p className="ministerio-lead-in">As atividades incluem:</p>
            <ul className="ministerio-atividades">
              {ministerio.atividades.map((atividade) => (
                <li key={atividade}>{atividade}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
