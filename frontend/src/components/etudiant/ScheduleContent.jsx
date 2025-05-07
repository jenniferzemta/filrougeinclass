import { useState, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { timetableService } from "../../services/timetableService"

import "./../calendar/calendar.css"

const ScheduleContent = () => {
  const [events, setEvents] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    loadData()

  }, [])

  const loadData = async () => {
    try {
      const [timetableRes, coursesRes] = await Promise.all([
        timetableService.getTimetable(),
        timetableService.getCourses(),
      ])
      setEvents(timetableRes.data)
      setCourses(coursesRes.data)
    } catch (error) {
      console.error("Error loading data:", error)
    }
  }

  const renderEventContent = (eventInfo) => (
    <div className="event-content">
      <div className="event-header">
        <div className="event-title">{eventInfo.event.title}</div>
        <div className="event-time">
          {new Date(eventInfo.event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -
          {new Date(eventInfo.event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
      <div className="event-details">
        <span className="professor">{eventInfo.event.extendedProps.cours.enseignant.name}</span>
        <span className="salle">{eventInfo.event.extendedProps.cours.salle.nom}</span>
      </div>
    </div>
  )

  return (
    <div className={`calendar-container ${darkMode ? "dark-mode" : "light-mode"}`}>
      {/* <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      </button> */}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events.map((event) => ({
          id: event.id,
          title: event.title,
          start: event.start,
          end: event.end,
          extendedProps: {
            cours: event.cours,
          },
        }))}
        editable={false}
        selectable={false}
       
        eventContent={renderEventContent}
        height="auto"
        stickyHeaderDates={true}
        nowIndicator={true}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: "08:00",
          endTime: "23:00",
        }}
        slotEventOverlap={false}
        allDaySlot={false}
      />

      
    </div>
  )
}

export default ScheduleContent
