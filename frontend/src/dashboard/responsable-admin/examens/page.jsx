"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline"
import DashboardLayout from "@/components/DashboardLayout"

export default function ExamensPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPeriod, setFilterPeriod] = useState("all")

  // Données fictives pour les examens
  const examens = [
    {
      id: 1,
      title: "Examen final - Programmation Web",
      course: "INFO305 - Programmation Web",
      professor: "Dr. Robert Dupuis",
      date: "15/12/2023",
      time: "09:00 - 12:00",
      room: "Salle A101",
      students: 35,
      period: "semester1",
      status: "scheduled",
    },
    {
      id: 2,
      title: "Contrôle continu - Marketing Digital",
      course: "MKT201 - Marketing Digital",
      professor: "Prof. Claire Martin",
      date: "20/11/2023",
      time: "14:00 - 16:00",
      room: "Salle C303",
      students: 42,
      period: "semester1",
      status: "scheduled",
    },
    {
      id: 3,
      title: "Examen final - Finance d'entreprise",
      course: "FIN301 - Finance d'entreprise",
      professor: "Dr. Philippe Lefevre",
      date: "18/12/2023",
      time: "09:00 - 12:00",
      room: "Salle A102",
      students: 30,
      period: "semester1",
      status: "scheduled",
    },
    {
      id: 4,
      title: "Rattrapage - Bases de données",
      course: "INFO202 - Bases de données",
      professor: "Dr. Robert Dupuis",
      date: "10/01/2024",
      time: "14:00 - 17:00",
      room: "Salle B202",
      students: 15,
      period: "semester2",
      status: "scheduled",
    },
    {
      id: 5,
      title: "Examen final - Ressources Humaines",
      course: "RH301 - Gestion des RH",
      professor: "Prof. Isabelle Moreau",
      date: "20/12/2023",
      time: "09:00 - 12:00",
      room: "Salle C202",
      students: 28,
      period: "semester1",
      status: "scheduled",
    },
  ]

  // Filtrer les examens en fonction de la recherche et de la période
  const filteredExamens = examens.filter(
    (examen) =>
      (examen.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        examen.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        examen.professor.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterPeriod === "all" || examen.period === filterPeriod),
  )

  // Statistiques
  const stats = [
    {
      title: "Examens programmés",
      value: examens.filter((e) => e.status === "scheduled").length,
      icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-white" />,
      bgClass: "from-[#0927EB] to-[#0927EB]/80",
    },
    {
      title: "Cours concernés",
      value: [...new Set(examens.map((e) => e.course))].length,
      icon: <AcademicCapIcon className="h-6 w-6 text-white" />,
      bgClass: "from-[#FD6E47] to-[#FD6E47]/80",
    },
    {
      title: "Salles utilisées",
      value: [...new Set(examens.map((e) => e.room))].length,
      icon: <BuildingOfficeIcon className="h-6 w-6 text-white" />,
      bgClass: "from-[#16A637] to-[#16A637]/80",
    },
  ]

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Gestion des Examens</h1>

          <div className="mt-4 bg-gradient-to-r from-[#0927EB]/10 to-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium text-gray-900">Planification des examens</h2>
            <p className="mt-1 text-sm text-gray-600">
              Gérez les examens, planifiez les sessions et attribuez les salles pour chaque période d'examen.
            </p>
          </div>

          {/* Statistiques */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`rounded-md p-3 bg-gradient-to-br ${stat.bgClass}`}>{stat.icon}</div>
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

          {/* Filtres et recherche */}
          <div className="mt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="max-w-lg w-full">
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
                  placeholder="Rechercher un examen..."
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="period-filter" className="sr-only">
                  Filtrer par période
                </label>
                <select
                  id="period-filter"
                  name="period-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm rounded-md"
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                >
                  <option value="all">Toutes les périodes</option>
                  <option value="semester1">Semestre 1</option>
                  <option value="semester2">Semestre 2</option>
                </select>
              </div>
              <Link
                href="/dashboard/responsable-admin/examens/nouveau"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Planifier un examen
              </Link>
            </div>
          </div>

          {/* Liste des examens */}
          <div className="mt-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredExamens.length > 0 ? (
                  filteredExamens.map((examen) => (
                    <li key={examen.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#0927EB]/10 flex items-center justify-center">
                                <ClipboardDocumentCheckIcon className="h-6 w-6 text-[#0927EB]" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-[#0927EB]">{examen.title}</div>
                                <div className="text-sm text-gray-500">{examen.course}</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <button
                                type="button"
                                className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                              >
                                <EyeIcon className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-[#FD6E47] hover:bg-[#FD6E47]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FD6E47]"
                              >
                                <PencilIcon className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                <TrashIcon className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <div className="flex items-center text-sm text-gray-500">
                              <AcademicCapIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {examen.professor}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <UserGroupIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {examen.students} étudiants
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {examen.date}, {examen.time}
                            <BuildingOfficeIcon className="flex-shrink-0 mx-1.5 h-5 w-5 text-gray-400" />
                            {examen.room}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-6 text-center text-gray-500">Aucun examen ne correspond à votre recherche.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
