// EmploiDuTemps.jsx
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import '@fullcalendar/core/main.css';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';

export default function EmploiDuTemps() {
  const [events, setEvents] = useState([
    { title: 'Maths', start: '2025-04-24T10:00:00', end: '2025-04-24T12:00:00' },
    { title: 'Physique', start: '2025-04-25T14:00:00', end: '2025-04-25T16:00:00' }
  ]);

  const handleDateSelect = (selectInfo) => {
    let title = prompt('Nom du cours :');
    let calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      const newEvent = {
        id: String(Date.now()),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };
      setEvents([...events, newEvent]);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (confirm(`Supprimer le cours "${clickInfo.event.title}" ?`)) {
      clickInfo.event.remove();
      setEvents(events.filter(e => e.id !== clickInfo.event.id));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Emploi du temps</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        editable={true}
        selectable={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        allDaySlot={false}
        locale="fr"
      />
    </div>
  );
}
