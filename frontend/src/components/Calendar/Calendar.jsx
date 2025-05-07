"use client"

import { useState, useEffect } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { timetableService } from "../../services/timetableService"
import EventModal from "./EventModal"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import "./calendar.css"

const Calendar = () => {
  const [events, setEvents] = useState([])
  const [courses, setCourses] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    loadData()

    // Check system preference for dark mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(prefersDark)

    // Listen for changes in system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e) => setDarkMode(e.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
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

  const handleAddOrUpdateEvent = async (coursId) => {
    try {
      if (selectedEvent?.id) {
        await timetableService.updateTimetableEntry(selectedEvent.id, coursId)
      } else {
        await timetableService.createTimetableEntry(coursId)
      }
      await loadData()
    } catch (error) {
      console.error("Error saving event:", error)
    }
    setIsModalOpen(false)
  }

  const handleDeleteEvent = async () => {
    try {
      await timetableService.deleteTimetableEntry(selectedEvent.id)
      await loadData()
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error deleting event:", error)
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
      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
      </button>

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
        editable={true}
        selectable={true}
        eventClick={(info) => {
          setSelectedEvent({
            id: info.event.id,
            ...info.event.extendedProps.cours,
          })
          setIsModalOpen(true)
        }}
        select={(info) => {
          setSelectedEvent(null)
          setIsModalOpen(true)
        }}
        eventContent={renderEventContent}
        height="auto"
        stickyHeaderDates={true}
        nowIndicator={true}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: "08:00",
          endTime: "18:00",
        }}
        slotEventOverlap={false}
        allDaySlot={false}
      />

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courses={courses}
        selectedCourse={selectedEvent}
        onSelectCourse={handleAddOrUpdateEvent}
        onDelete={handleDeleteEvent}
        darkMode={darkMode}
      />
    </div>
  )
}

export default Calendar
