import { Link } from 'react-router-dom';
import { ArrowRight } from './icons';

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
      </div>

      <div className="cta-row">
        <Link className="btn btn-gold" to="/cultos">
          Assistir aos cultos <ArrowRight />
        </Link>
        <Link className="btn btn-ghost" to="/contato">
          Fale conosco
        </Link>
      </div>
    </div>
  );
}