import { Link } from 'react-router-dom';

/**
 * Versículo em destaque logo abaixo do hero, seguido dos botões de ação.
 * Usa a classe `.versiculo` (mesmo padrão da página de Doação) e o `.btn`
 * já existente no projeto.
 */
export function VerseCta() {
  return (
    <section className="section-versiculo">
      <div className="versiculo-container">
        <p className="versiculo">
          “Alegrei-me quando me disseram: Vamos à casa do Senhor.”
          <span>Salmos 122:1</span>
        </p>

        <div className="versiculo-acoes">
          <Link to="/cultos" className="btn">
            Assistir aos cultos
          </Link>
          <Link to="/contato" className="btn">
            Fale conosco
          </Link>
        </div>
      </div>
    </section>
  );
}
