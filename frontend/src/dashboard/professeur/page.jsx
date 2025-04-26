"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ClockIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import DashboardLayout from "@/components/DashboardLayout"

export default function ProfesseurDashboard() {
  const [activeTab, setActiveTab] = useState("cours")
  const [searchTerm, setSearchTerm] = useState("")

  // Données fictives pour les cours
  const courses = [
    {
      id: 1,
      title: "Introduction à la programmation",
      code: "INFO101",
      students: 35,
      nextSession: "2023-05-22",
      time: "09:00 - 12:00",
      location: "Salle A101",
    },
    {
      id: 2,
      title: "Bases de données avancées",
      code: "INFO305",
      students: 28,
      nextSession: "2023-05-23",
      time: "14:00 - 17:00",
      location: "Salle B202",
    },
    {
      id: 3,
      title: "Intelligence artificielle",
      code: "INFO401",
      students: 22,
      nextSession: "2023-05-24",
      time: "09:00 - 12:00",
      location: "Salle C303",
    },
    {
      id: 4,
      title: "Développement web",
      code: "INFO203",
      students: 30,
      nextSession: "2023-05-25",
      time: "14:00 - 17:00",
      location: "Salle A102",
    },
  ]

  // Données fictives pour les étudiants
  const students = [
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      courses: ["INFO101", "INFO305"],
      averageGrade: 15.5,
    },
    {
      id: 2,
      name: "Marie Martin",
      email: "marie.martin@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=MM",
      courses: ["INFO101", "INFO401"],
      averageGrade: 17.2,
    },
    {
      id: 3,
      name: "Lucas Bernard",
      email: "lucas.bernard@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=LB",
      courses: ["INFO305", "INFO203"],
      averageGrade: 14.8,
    },
    {
      id: 4,
      name: "Sophie Petit",
      email: "sophie.petit@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=SP",
      courses: ["INFO101", "INFO203"],
      averageGrade: 16.3,
    },
    {
      id: 5,
      name: "Thomas Leroy",
      email: "thomas.leroy@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=TL",
      courses: ["INFO401", "INFO305"],
      averageGrade: 13.7,
    },
  ]

  // Données fictives pour les évaluations
  const evaluations = [
    {
      id: 1,
      title: "Examen final - Introduction à la programmation",
      course: "INFO101",
      date: "2023-06-15",
      time: "09:00 - 12:00",
      location: "Amphithéâtre A",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Contrôle continu - Bases de données avancées",
      course: "INFO305",
      date: "2023-05-30",
      time: "14:00 - 16:00",
      location: "Salle B202",
      status: "scheduled",
    },
    {
      id: 3,
      title: "Projet final - Intelligence artificielle",
      course: "INFO401",
      date: "2023-06-10",
      time: "Remise en ligne",
      location: "Plateforme e-learning",
      status: "scheduled",
    },
    {
      id: 4,
      title: "Contrôle continu - Introduction à la programmation",
      course: "INFO101",
      date: "2023-04-20",
      time: "09:00 - 11:00",
      location: "Salle A101",
      status: "completed",
    },
  ]

  // Données fictives pour les stages
  const internships = [
    {
      id: 1,
      student: "Jean Dupont",
      company: "Tech Solutions",
      position: "Développeur Full Stack",
      startDate: "2023-07-01",
      endDate: "2023-12-31",
      status: "validated",
    },
    {
      id: 2,
      student: "Marie Martin",
      company: "Marketing Pro",
      position: "Assistant Marketing Digital",
      startDate: "2023-07-01",
      endDate: "2023-10-31",
      status: "pending",
    },
    {
      id: 3,
      student: "Lucas Bernard",
      company: "Finance Corp",
      position: "Analyste Financier",
      startDate: "2023-07-01",
      endDate: "2023-12-31",
      status: "pending",
    },
  ]

  // Filtrer les cours
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filtrer les étudiants
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filtrer les évaluations
  const filteredEvaluations = evaluations.filter(
    (evaluation) =>
      evaluation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.course.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filtrer les stages
  const filteredInternships = internships.filter(
    (internship) =>
      internship.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Statistiques
  const stats = [
    {
      title: "Cours",
      value: courses.length,
      icon: <AcademicCapIcon className="h-6 w-6 text-white" />,
      color: "#0927EB",
    },
    {
      title: "Étudiants",
      value: students.length,
      icon: <UserGroupIcon className="h-6 w-6 text-white" />,
      color: "#FD6E47",
    },
    {
      title: "Évaluations à venir",
      value: evaluations.filter((e) => e.status === "scheduled").length,
      icon: <DocumentTextIcon className="h-6 w-6 text-white" />,
      color: "#16A637",
    },
    {
      title: "Stages à valider",
      value: internships.filter((i) => i.status === "pending").length,
      icon: <CalendarIcon className="h-6 w-6 text-white" />,
      color: "#0927EB",
    },
  ]

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord - Professeur</h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Statistiques */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="rounded-md p-3" style={{ backgroundColor: stat.color }}>
                        {stat.icon}
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{stat.title}</dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Onglets */}
          <div className="mt-8">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Sélectionner un onglet
              </label>
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 focus:border-[#0927EB] focus:ring-[#0927EB]"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="cours">Mes cours</option>
                <option value="etudiants">Mes étudiants</option>
                <option value="evaluations">Évaluations</option>
                <option value="stages">Stages</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab("cours")}
                    className={`${
                      activeTab === "cours"
                        ? "border-[#0927EB] text-[#0927EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Mes cours
                  </button>
                  <button
                    onClick={() => setActiveTab("etudiants")}
                    className={`${
                      activeTab === "etudiants"
                        ? "border-[#0927EB] text-[#0927EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Mes étudiants
                  </button>
                  <button
                    onClick={() => setActiveTab("evaluations")}
                    className={`${
                      activeTab === "evaluations"
                        ? "border-[#0927EB] text-[#0927EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Évaluations
                  </button>
                  <button
                    onClick={() => setActiveTab("stages")}
                    className={`${
                      activeTab === "stages"
                        ? "border-[#0927EB] text-[#0927EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Stages
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="mt-6">
            <div className="max-w-lg">
              <label htmlFor="search" className="sr-only">
                Rechercher
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm"
                  placeholder={`Rechercher ${
                    activeTab === "cours"
                      ? "un cours"
                      : activeTab === "etudiants"
                        ? "un étudiant"
                        : activeTab === "evaluations"
                          ? "une évaluation"
                          : "un stage"
                  }...`}
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Contenu de l'onglet Cours */}
          {activeTab === "cours" && (
            <div className="mt-6">
              <div className="flex justify-end mb-4">
                <Link
                  href="/dashboard/professeur/cours/nouveau"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Nouveau cours
                </Link>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <li key={course.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#0927EB]/10 flex items-center justify-center">
                                  <AcademicCapIcon className="h-6 w-6 text-[#0927EB]" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-[#0927EB]">{course.title}</div>
                                  <div className="text-sm text-gray-500">{course.code}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Link
                                href={`/dashboard/professeur/cours/${course.id}`}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                              >
                                Gérer
                              </Link>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <UserGroupIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                {course.students} étudiants
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                Prochaine séance: {course.nextSession}
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {course.time}, {course.location}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-6 text-center text-gray-500">
                      Aucun cours ne correspond à votre recherche.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Contenu de l'onglet Étudiants */}
          {activeTab === "etudiants" && (
            <div className="mt-6">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <li key={student.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                                <Image
                                  src={student.avatar || "/placeholder.svg"}
                                  alt={student.name}
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 object-cover"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-[#0927EB]">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.email}</div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Link
                                href={`/dashboard/professeur/etudiants/${student.id}`}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                              >
                                Voir profil
                              </Link>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <AcademicCapIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                Cours: {student.courses.join(", ")}
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <DocumentTextIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              Moyenne: {student.averageGrade}/20
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-6 text-center text-gray-500">
                      Aucun étudiant ne correspond à votre recherche.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Contenu de l'onglet Évaluations */}
          {activeTab === "evaluations" && (
            <div className="mt-6">
              <div className="flex justify-end mb-4">
                <Link
                  href="/dashboard/professeur/evaluations/nouvelle"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Nouvelle évaluation
                </Link>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredEvaluations.length > 0 ? (
                    filteredEvaluations.map((evaluation) => (
                      <li key={evaluation.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#FD6E47]/10 flex items-center justify-center">
                                  <DocumentTextIcon className="h-6 w-6 text-[#FD6E47]" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-[#0927EB]">{evaluation.title}</div>
                                  <div className="text-sm text-gray-500">{evaluation.course}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  evaluation.status === "scheduled"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {evaluation.status === "scheduled" ? "Planifiée" : "Terminée"}
                              </span>
                              <Link
                                href={`/dashboard/professeur/evaluations/${evaluation.id}`}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                              >
                                {evaluation.status === "scheduled" ? "Gérer" : "Voir résultats"}
                              </Link>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                {evaluation.date}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                {evaluation.time}
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {evaluation.location}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-6 text-center text-gray-500">
                      Aucune évaluation ne correspond à votre recherche.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Contenu de l'onglet Stages */}
          {activeTab === "stages" && (
            <div className="mt-6">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredInternships.length > 0 ? (
                    filteredInternships.map((internship) => (
                      <li key={internship.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#16A637]/10 flex items-center justify-center">
                                  <CalendarIcon className="h-6 w-6 text-[#16A637]" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-[#0927EB]">{internship.student}</div>
                                  <div className="text-sm text-gray-500">
                                    {internship.position} - {internship.company}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  internship.status === "validated"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {internship.status === "validated" ? "Validé" : "En attente"}
                              </span>
                              {internship.status === "pending" && (
                                <div className="flex space-x-1">
                                  <button
                                    type="button"
                                    className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                  >
                                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                  >
                                    <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                                  </button>
                                </div>
                              )}
                              <Link
                                href={`/dashboard/professeur/stages/${internship.id}`}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                              >
                                Voir détails
                              </Link>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                Du {internship.startDate} au {internship.endDate}
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {internship.company}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-6 text-center text-gray-500">
                      Aucun stage ne correspond à votre recherche.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
