import { Link } from 'react-router-dom';
import { ArrowRight } from './icons';
import { VERSICULO } from '../../lib/constants';

interface HeroHomeProps {
  esmaecido: boolean;
}

export function HeroHome({ esmaecido }: HeroHomeProps) {
  return (
    <div className={`section-home${esmaecido ? ' fade-out' : ''}`}>
      <div className="text">
        <h1>Bem-vindo à Igreja Nova Vida de Botafogo</h1>
        <h4>Não apenas uma Igreja, mas uma Família!</h4>
        <p>Participe conosco!</p>

        {/* Versículo + botões copiados do hero do site-igreja. */}
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
      </div>
    </div>
  );
}
