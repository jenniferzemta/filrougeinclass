"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BriefcaseIcon,
  CalendarIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  ClockIcon,
  MapPinIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import DashboardLayout from "@/components/DashboardLayout"

export default function EtudiantDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterLocation, setFilterLocation] = useState("all")

  // Données fictives pour les offres de stage
  const stageOffers = [
    {
      id: 1,
      title: "Développeur Full Stack",
      company: "Tech Solutions",
      location: "Paris",
      type: "Stage de fin d'études",
      duration: "6 mois",
      logo: "/placeholder.svg?height=40&width=40",
      date: "2023-05-15",
      description: "Nous recherchons un développeur full stack pour rejoindre notre équipe dynamique...",
    },
    {
      id: 2,
      title: "Assistant Marketing Digital",
      company: "Marketing Pro",
      location: "Lyon",
      type: "Stage conventionné",
      duration: "4 mois",
      logo: "/placeholder.svg?height=40&width=40",
      date: "2023-05-10",
      description: "Participez au développement de notre stratégie marketing digital...",
    },
    {
      id: 3,
      title: "Analyste Financier",
      company: "Finance Corp",
      location: "Bordeaux",
      type: "Stage de fin d'études",
      duration: "6 mois",
      logo: "/placeholder.svg?height=40&width=40",
      date: "2023-04-01",
      description: "Rejoignez notre équipe d'analystes financiers pour travailler sur des projets stimulants...",
    },
    {
      id: 4,
      title: "Ingénieur en Cybersécurité",
      company: "Secure Net",
      location: "Toulouse",
      type: "Stage conventionné",
      duration: "5 mois",
      logo: "/placeholder.svg?height=40&width=40",
      date: "2023-05-12",
      description: "Participez à la sécurisation de nos infrastructures et à l'analyse des menaces...",
    },
    {
      id: 5,
      title: "Assistant Ressources Humaines",
      company: "HR Solutions",
      location: "Nantes",
      type: "Stage d'observation",
      duration: "2 mois",
      logo: "/placeholder.svg?height=40&width=40",
      date: "2023-05-18",
      description: "Découvrez le fonctionnement d'un service RH au sein d'une entreprise dynamique...",
    },
  ]

  // Données fictives pour les candidatures
  const applications = [
    {
      id: 1,
      title: "Développeur Full Stack",
      company: "Tech Solutions",
      logo: "/placeholder.svg?height=40&width=40",
      date: "2023-04-20",
      status: "pending",
    },
    {
      id: 2,
      title: "Assistant Marketing Digital",
      company: "Digital Agency",
      logo: "/placeholder.svg?height=40&width=40",
      date: "2023-04-15",
      status: "accepted",
    },
    {
      id: 3,
      title: "Analyste de données",
      company: "Data Corp",
      logo: "/placeholder.svg?height=40&width=40",
      date: "2023-04-10",
      status: "rejected",
    },
  ]

  // Données fictives pour les événements à venir
  const upcomingEvents = [
    {
      id: 1,
      title: "Forum des stages",
      date: "2023-06-15",
      time: "10:00 - 17:00",
      location: "Campus principal",
    },
    {
      id: 2,
      title: "Atelier CV et lettre de motivation",
      date: "2023-05-25",
      time: "14:00 - 16:00",
      location: "Salle B202",
    },
    {
      id: 3,
      title: "Conférence sur l'entrepreneuriat",
      date: "2023-06-02",
      time: "18:00 - 20:00",
      location: "Amphithéâtre A",
    },
  ]

  // Filtrer les offres de stage
  const filteredOffers = stageOffers.filter((offer) => {
    const matchesSearch =
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || offer.type === filterType
    const matchesLocation = filterLocation === "all" || offer.location === filterLocation

    return matchesSearch && matchesType && matchesLocation
  })

  // Liste des types de stage pour le filtre
  const stageTypes = [...new Set(stageOffers.map((offer) => offer.type))]

  // Liste des lieux pour le filtre
  const locations = [...new Set(stageOffers.map((offer) => offer.location))]

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord - Étudiant</h1>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Statistiques */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Offres disponibles",
                value: stageOffers.length,
                icon: <BriefcaseIcon className="h-6 w-6 text-white" />,
                color: "#0927EB",
              },
              {
                title: "Candidatures",
                value: applications.length,
                icon: <DocumentTextIcon className="h-6 w-6 text-white" />,
                color: "#FD6E47",
              },
              {
                title: "Événements à venir",
                value: upcomingEvents.length,
                icon: <CalendarIcon className="h-6 w-6 text-white" />,
                color: "#16A637",
              },
              {
                title: "Jours avant la fin du semestre",
                value: "45",
                icon: <AcademicCapIcon className="h-6 w-6 text-white" />,
                color: "#0927EB",
              },
            ].map((stat, index) => (
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

          {/* Mes candidatures */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Mes candidatures</h2>
              <Link
                href="/dashboard/etudiant/candidatures"
                className="text-sm font-medium text-[#0927EB] hover:text-[#0927EB]/80 flex items-center"
              >
                Voir toutes
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {applications.map((application) => (
                  <li key={application.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                            <Image
                              src={application.logo || "/placeholder.svg"}
                              alt={application.company}
                              width={40}
                              height={40}
                              className="h-10 w-10 object-contain"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-[#0927EB]">{application.title}</div>
                            <div className="text-sm text-gray-500">{application.company}</div>
                          </div>
                        </div>
                        <div>
                          {application.status === "pending" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              En attente
                            </span>
                          )}
                          {application.status === "accepted" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Acceptée
                            </span>
                          )}
                          {application.status === "rejected" && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Refusée
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            Candidature envoyée le {application.date}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Link
                            href={`/dashboard/etudiant/candidatures/${application.id}`}
                            className="text-[#0927EB] hover:text-[#0927EB]/80 font-medium"
                          >
                            Voir les détails
                          </Link>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Événements à venir */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Événements à venir</h2>
              <Link
                href="/dashboard/etudiant/evenements"
                className="text-sm font-medium text-[#0927EB] hover:text-[#0927EB]/80 flex items-center"
              >
                Voir tous
                <ChevronRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CalendarIcon className="h-8 w-8 text-[#0927EB]" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <h3 className="text-lg font-medium text-gray-900 truncate">{event.title}</h3>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {event.location}
                      </div>
                    </div>
                    <div className="mt-5">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                      >
                        S'inscrire
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recherche d'offres de stage */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Rechercher des offres de stage</h2>
            <div className="mt-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                <div className="flex-1 flex items-center max-w-lg">
                  <div className="w-full">
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
                        placeholder="Rechercher une offre de stage..."
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  <div>
                    <label htmlFor="type-filter" className="sr-only">
                      Filtrer par type
                    </label>
                    <select
                      id="type-filter"
                      name="type-filter"
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm rounded-md"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="all">Tous les types</option>
                      {stageTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="location-filter" className="sr-only">
                      Filtrer par lieu
                    </label>
                    <select
                      id="location-filter"
                      name="location-filter"
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm rounded-md"
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                    >
                      <option value="all">Tous les lieux</option>
                      {locations.map((location, index) => (
                        <option key={index} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Liste des offres */}
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredOffers.length > 0 ? (
                    filteredOffers.map((offer) => (
                      <li key={offer.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                                <Image
                                  src={offer.logo || "/placeholder.svg"}
                                  alt={offer.company}
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 object-contain"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-[#0927EB]">{offer.title}</div>
                                <div className="text-sm text-gray-500">{offer.company}</div>
                              </div>
                            </div>
                            <div>
                              <Link
                                href={`/dashboard/etudiant/offres/${offer.id}`}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                              >
                                Voir l'offre
                              </Link>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                {offer.location}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                {offer.type} - {offer.duration}
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              Publié le {offer.date}
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-gray-600 line-clamp-2">{offer.description}</p>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-6 text-center text-gray-500">
                      Aucune offre ne correspond à vos critères de recherche.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
