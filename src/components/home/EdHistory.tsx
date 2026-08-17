import CountUp from './CountUp';
import { IGREJA } from '../../lib/constants';

/**
 * Seção "Quem somos" — copiada do site-igreja (bloco `.ed-hist` de
 * pages/Home.jsx), com os dados reais da igreja. Substitui a antiga
 * seção "Nossa História".
 */
export function EdHistory() {
  return (
    <section className="ed reveal ed-top ed-hist">
      <div className="lead-col">
        <p className="kicker">Quem somos</p>
        <div className="bignum">
          <CountUp value={IGREJA.fundacao} />
        </div>
        <div className="bignum-lbl">Desde</div>
      </div>
      <div>
        <h3 className="ed-hist-title">Nossa história</h3>
        <p className="ed-text">
          Uma igreja com raízes em Botafogo e coração voltado para Deus.
        </p>
        <p className="ed-text">
          Fundada pelo Pr. Luiz Carlos, seu primeiro culto foi realizado em 5 de janeiro de
          2003, com um pequeno grupo de adoradores.
        </p>
        <p className="ed-text">
          Desde então, temos vivido um crescimento abençoado: cultos cheios da presença de
          Deus, avivamento espiritual, batismos, casamentos, capacitações de novos obreiros e
          líderes ministeriais, aconselhamentos e muito mais.
        </p>
        <p className="ed-text">
          Em março de 2005, com a presença do Bispo Tito Oscar, celebramos a inauguração
          oficial do templo, ampliado em dezembro de 2006, para acolher ainda mais vidas.
        </p>
        <p className="ed-text">
          Hoje, permanecemos sob a liderança do Pr. Luiz Carlos, expandindo o Reino de Deus
          com amor, fé e perseverança.
        </p>
        <p className="ed-text">
          No corpo eclesiástico da igreja constam, ainda, os seguintes membros:
        </p>
        <p className="ed-roles">
          <b>Pastores-Auxiliares:</b> Sônia, Humberto, Marcio Soares e Daniela Soares
        </p>
        <p className="ed-roles">
          <b>Diáconos:</b> Atayde, Luciana, Alfredo, Marilda e Wellington
        </p>
      </div>
    </section>
  );
}
