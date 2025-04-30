

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CalendarIcon, ClockIcon, BuildingOfficeIcon, UserGroupIcon, ArrowPathIcon } from "@heroicons/react/24/outline"

export default function SchedulesContent() {
  const [loading, setLoading] = useState(true)
  const [selectedDay, setSelectedDay] = useState("Lundi")
  const [scheduleData, setScheduleData] = useState(null)

  // Jours de la semaine
  const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

  // Données fictives pour l'emploi du temps
  const mockScheduleData = {
    Lundi: [
      { id: 1, course: "Mathématiques", time: "08:00 - 10:00", room: "A101", professor: "Dr. Martin" },
      { id: 2, course: "Informatique", time: "10:15 - 12:15", room: "B205", professor: "Prof. Dubois" },
      { id: 3, course: "Anglais", time: "14:00 - 16:00", room: "C310", professor: "Mme. Johnson" },
    ],
    Mardi: [
      { id: 4, course: "Physique", time: "09:00 - 11:00", room: "A102", professor: "Dr. Petit" },
      { id: 5, course: "Programmation", time: "13:00 - 16:00", room: "Labo Info", professor: "M. Garcia" },
    ],
    Mercredi: [
      { id: 6, course: "Base de données", time: "08:00 - 10:00", room: "B201", professor: "Dr. Chen" },
      { id: 7, course: "Réseaux", time: "10:15 - 12:15", room: "B205", professor: "Prof. Moreau" },
    ],
    Jeudi: [
      { id: 8, course: "Projet tuteuré", time: "08:00 - 12:00", room: "Salle Projet", professor: "Dr. Lefebvre" },
      { id: 9, course: "Gestion de projet", time: "14:00 - 16:00", room: "A105", professor: "Mme. Dupont" },
    ],
    Vendredi: [
      { id: 10, course: "Sécurité informatique", time: "09:00 - 12:00", room: "B205", professor: "M. Bernard" },
      { id: 11, course: "Communication", time: "14:00 - 16:00", room: "C310", professor: "Mme. Rousseau" },
    ],
    Samedi: [],
  }

  useEffect(() => {
    // Simuler un chargement de données
    const timer = setTimeout(() => {
      setScheduleData(mockScheduleData)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Obtenir la date actuelle pour afficher le jour en cours
  useEffect(() => {
    const today = new Date().getDay()
    // Convertir 0 (dimanche) à 6 (samedi) en jours de la semaine français
    const dayIndex = today === 0 ? 5 : today - 1 // Dimanche = 0, Lundi = 1, etc.
    if (dayIndex >= 0 && dayIndex < days.length) {
      setSelectedDay(days[dayIndex])
    }
  }, [])

  const refreshSchedule = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full border-4 border-[#0927EB] border-t-transparent animate-spin mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Chargement de l'emploi du temps...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <CalendarIcon className="h-8 w-8 mr-2 text-[#0927EB]" />
            Emploi du temps
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Consultez votre emploi du temps pour la semaine en cours</p>
        </div>

        <button
          onClick={refreshSchedule}
          className="flex items-center px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-[#0927EB] dark:text-white border border-[#0927EB]/20 dark:border-gray-700 hover:bg-[#0927EB]/5 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          <ArrowPathIcon className={`h-5 w-5 mr-2 ${loading ? "animate-spin" : ""}`} />
          Actualiser
        </button>
      </div>

      {/* Sélecteur de jours */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 relative ${
                selectedDay === day
                  ? "bg-[#0927EB] text-white shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {day}
              {selectedDay === day && (
                <motion.div
                  layoutId="dayIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#FD6E47] rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu de l'emploi du temps */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="mr-2">{selectedDay}</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {new Date().toLocaleDateString("fr-FR", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </h2>

          {scheduleData[selectedDay].length > 0 ? (
            <div className="space-y-4">
              {scheduleData[selectedDay].map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all duration-200 bg-gray-50 dark:bg-gray-700/50"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{course.course}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{course.professor}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <ClockIcon className="h-5 w-5 mr-1" />
                        <span>{course.time}</span>
                      </div>
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <BuildingOfficeIcon className="h-5 w-5 mr-1" />
                        <span>{course.room}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <UserGroupIcon className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Pas de cours</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                Aucun cours n'est prévu pour ce jour. Profitez de cette journée pour avancer sur vos projets ou réviser.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Vue hebdomadaire simplifiée */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Aperçu de la semaine</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {days.map((day) => (
            <motion.div
              key={day}
              whileHover={{ y: -5 }}
              className={`p-4 rounded-lg border ${
                selectedDay === day
                  ? "border-[#0927EB] bg-[#0927EB]/5 dark:bg-[#0927EB]/10"
                  : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              } cursor-pointer`}
              onClick={() => setSelectedDay(day)}
            >
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">{day}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{scheduleData[day].length} cours</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
