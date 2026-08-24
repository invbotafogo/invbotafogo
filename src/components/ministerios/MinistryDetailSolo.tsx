import type { MouseEvent, Ref } from 'react';
import { NOME_EXPANDIDO, type Ministerio } from '../../lib/ministerios';

interface MinistryDetailSoloProps {
  ministerio: Ministerio | null;
  aoFechar: () => void;
  /**
   * O ref vai direto no #expanded-content: o CSS usa seletores irmãos
   * (`#expanded-content:not(.hidden) ~ .cards-container`), então qualquer
   * wrapper extra aqui quebra o layout do painel expandido.
   */
  painelRef?: Ref<HTMLDivElement>;
}

/**
 * Card ampliado no padrão visual das seções Contato e "Nossa história":
 * card de vidro em coluna única, centrado, com borda dourada à esquerda.
 * Conteúdo idêntico ao do painel antigo (imagem, título, parágrafos e
 * atividades) — muda só a apresentação. Estilos em styles/ministerios-solo.css.
 *
 * Fechar: botão "Voltar aos ministérios" ou clique no fundo. O clique
 * dentro do card não fecha, para permitir ler e selecionar o texto.
 */
export function MinistryDetailSolo({ ministerio, aoFechar, painelRef }: MinistryDetailSoloProps) {
  const pararPropagacao = (evento: MouseEvent<HTMLDivElement>) => evento.stopPropagation();

  return (
    <div
      ref={painelRef}
      id="expanded-content"
      className={`expanded-content expanded-content--solo${ministerio ? '' : ' hidden'}`}
      onClick={aoFechar}
    >
      {ministerio && (
        <div
          className="ministerio-solo-card"
          data-id={ministerio.id}
          onClick={pararPropagacao}
        >
          <figure className="ministerio-solo__figure">
            <img
              className="ministerio-solo__image"
              src={ministerio.imagem}
              alt={ministerio.imagemAlt}
            />
          </figure>

          <p className="ministerio-solo__kicker">{ministerio.label}</p>
          <h2 className="ministerio-solo__nome">
            {NOME_EXPANDIDO[ministerio.id] ?? ministerio.nome}
          </h2>

          {ministerio.paragrafos.map((texto) => (
            <p className="ministerio-solo__texto" key={texto.slice(0, 40)}>
              {texto}
            </p>
          ))}

          <hr className="ministerio-solo__divider" />

          <p className="ministerio-solo__lead-in">As atividades incluem</p>
          <ul className="ministerio-solo__atividades">
            {ministerio.atividades.map((atividade) => (
              <li key={atividade}>{atividade}</li>
            ))}
          </ul>

          <div className="ministerio-solo__footer">
            <button type="button" className="ministerio-solo__voltar" onClick={aoFechar}>
              <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Voltar aos ministérios
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
