import { IGREJA, MAPA_EMBED_URL } from '../../lib/constants';
import { EventsCalendar } from './EventsCalendar';

export function ServiceInfo() {
  return (
    <section className="section-cultos-unificada">
      <div className="cultos-eventos-container">
        <div className="cultos-box">
          <div className="cultos-conteudo">
            <div className="cultos-info">
              <h2>
                <i className="fa-solid fa-church" /> Nossos Cultos
              </h2>
              <p className="cultos-horarios">
                <strong>Domingo:</strong> 10h &amp; 19h &nbsp;|&nbsp;{' '}
                <strong>Quarta-feira:</strong> 19h30 &nbsp;|&nbsp;{' '}
                <strong>Quinta-feira:</strong> 7h15
              </p>
              <p className="cultos-endereco">
                <i className="fa-solid fa-location-dot" /> {IGREJA.endereco}
              </p>
            </div>

            <div className="cultos-mapa">
              <iframe
                title="Mapa da igreja"
                src={MAPA_EMBED_URL}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="eventos-box">
          <div className="eventos-conteudo">
            <div className="eventos-header">
              <h2>
                <i className="fa-solid fa-calendar-days" /> Calendário de Eventos
              </h2>
              <p className="eventos-subtitulo">
                Programe-se para estar conosco nos próximos eventos.
              </p>
              <p className="eventos-subtitulo">
                Um lugar para você crescer, servir e pertencer.
              </p>
            </div>
          </div>
          <EventsCalendar />
        </div>
      </div>
    </section>
  );
}
