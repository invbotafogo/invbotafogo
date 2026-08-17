import { Link } from 'react-router-dom';
import { ArrowRight } from './icons';
import { VERSICULO } from '../../lib/constants';

/** Versículo + chamadas para ação. Abre os blocos editoriais, logo antes da
 *  programação semanal — o hero voltou a ser só as boas-vindas do site antigo. */
export function VerseCta() {
  return (
    <section className="verse-cta reveal">
      <blockquote className="verse">
        “{VERSICULO.texto}”
        <small>{VERSICULO.referencia}</small>
      </blockquote>

      <div className="cta-row">
        <Link className="btn btn-gold" to="/cultos">
          Assistir aos cultos <ArrowRight />
        </Link>
        <Link className="btn btn-ghost" to="/contato">
          Fale conosco
        </Link>
      </div>
    </section>
  );
}
