import { useCalendarMode } from '../../hooks/useCalendarMode';
import { CALENDAR_ID } from '../../lib/constants';

/** Embed do Google Calendar. As cores escuras acompanham o filtro aplicado no CSS. */
export function EventsCalendar() {
  const modo = useCalendarMode();

  const src =
    `https://calendar.google.com/calendar/embed?src=${CALENDAR_ID}` +
    `&ctz=America%2FSao_Paulo&mode=${modo}&showTitle=1&showPrint=0` +
    `&showCalendars=0&showTz=0&color=%231a1814&bgcolor=%231a1814`;

  return (
    <div id="calendar-container">
      <iframe
        title="Calendário de eventos"
        src={src}
        scrolling={modo === 'AGENDA' ? 'yes' : 'no'}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '380px',
          border: 'none',
          borderRadius: '12px',
          display: 'block',
        }}
      />
    </div>
  );
}
