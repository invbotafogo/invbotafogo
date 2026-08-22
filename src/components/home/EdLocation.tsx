import { ArrowRight, MapPin } from './icons';
import { IGREJA } from '../../lib/constants';

/**
 * Seção "Localização / Como chegar" — copiada do site-igreja (bloco `.ed-loc`
 * de pages/Home.jsx). Substitui o mapa que ficava dentro do card de cultos.
 */
export function EdLocation() {
  const endereco = IGREJA.enderecoCompleto;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(endereco)}&output=embed`;

  return (
    <section className="ed reveal ed-top ed-loc">
      <div className="lead-col">
        <p className="kicker">Localização</p>
        <h3>Como chegar</h3>
        <div className="addr">
          <MapPin /> <span>{endereco}</span>
        </div>
        <a
          className="btn btn-ghost map-link"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(endereco)}`}
          target="_blank"
          rel="noreferrer"
        >
          Abrir no Google Maps <ArrowRight />
        </a>
      </div>
      <div>
        <div className="map-frame ed-map">
          <iframe
            title="Mapa"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
