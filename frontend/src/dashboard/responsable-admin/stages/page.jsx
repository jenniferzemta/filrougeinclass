"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BriefcaseIcon,
  BuildingOfficeIcon,
  UserIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline"
import DashboardLayout from "@/components/DashboardLayout"

export default function StagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Données fictives pour les offres de stage
  const stageOffers = [
    {
      id: 1,
      title: "Développeur Full Stack",
      company: "TechSolutions",
      companyLogo: "/placeholder.svg?height=40&width=40&text=TS",
      location: "Paris",
      duration: "6 mois",
      startDate: "01/09/2023",
      status: "active",
      applications: 12,
      description: "Stage de développement web avec React et Node.js",
    },
    {
      id: 2,
      title: "Assistant Marketing Digital",
      company: "MarketPro",
      companyLogo: "/placeholder.svg?height=40&width=40&text=MP",
      location: "Lyon",
      duration: "4 mois",
      startDate: "01/10/2023",
      status: "active",
      applications: 8,
      description: "Stage en marketing digital et réseaux sociaux",
    },
    {
      id: 3,
      title: "Analyste Financier",
      company: "FinanceGroup",
      companyLogo: "/placeholder.svg?height=40&width=40&text=FG",
      location: "Bordeaux",
      duration: "6 mois",
      startDate: "15/09/2023",
      status: "expired",
      applications: 5,
      description: "Analyse financière et reporting",
    },
    {
      id: 4,
      title: "Assistant Ressources Humaines",
      company: "HRConsulting",
      companyLogo: "/placeholder.svg?height=40&width=40&text=HR",
      location: "Marseille",
      duration: "3 mois",
      startDate: "01/11/2023",
      status: "pending",
      applications: 0,
      description: "Stage en gestion des ressources humaines",
    },
    {
      id: 5,
      title: "Ingénieur en Cybersécurité",
      company: "SecureTech",
      companyLogo: "/placeholder.svg?height=40&width=40&text=ST",
      location: "Toulouse",
      duration: "6 mois",
      startDate: "01/10/2023",
      status: "active",
      applications: 15,
      description: "Stage en sécurité informatique et audit",
    },
  ]

  // Filtrer les offres de stage en fonction de la recherche et du statut
  const filteredOffers = stageOffers.filter(
    (offer) =>
      (offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.location.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === "all" || offer.status === filterStatus),
  )

  // Statistiques
  const stats = [
    {
      title: "Offres actives",
      value: stageOffers.filter((o) => o.status === "active").length,
      icon: <BriefcaseIcon className="h-6 w-6 text-white" />,
      bgClass: "from-[#0927EB] to-[#0927EB]/80",
    },
    {
      title: "Entreprises partenaires",
      value: [...new Set(stageOffers.map((o) => o.company))].length,
      icon: <BuildingOfficeIcon className="h-6 w-6 text-white" />,
      bgClass: "from-[#FD6E47] to-[#FD6E47]/80",
    },
    {
      title: "Candidatures",
      value: stageOffers.reduce((acc, curr) => acc + curr.applications, 0),
      icon: <UserIcon className="h-6 w-6 text-white" />,
      bgClass: "from-[#16A637] to-[#16A637]/80",
    },
  ]

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Gestion des Stages</h1>

          <div className="mt-4 bg-gradient-to-r from-[#0927EB]/10 to-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium text-gray-900">Offres de stage</h2>
            <p className="mt-1 text-sm text-gray-600">
              Gérez les offres de stage, validez les nouvelles offres et suivez les candidatures des étudiants.
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
                  placeholder="Rechercher une offre de stage..."
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <label htmlFor="status-filter" className="sr-only">
                  Filtrer par statut
                </label>
                <select
                  id="status-filter"
                  name="status-filter"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm rounded-md"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">Tous les statuts</option>
                  <option value="active">Actives</option>
                  <option value="pending">En attente</option>
                  <option value="expired">Expirées</option>
                </select>
              </div>
              <Link
                href="/dashboard/responsable-admin/stages/nouveau"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Ajouter une offre
              </Link>
            </div>
          </div>

          {/* Liste des offres de stage */}
          <div className="mt-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {filteredOffers.length > 0 ? (
                  filteredOffers.map((offer) => (
                    <li key={offer.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                              <Image
                                src={offer.companyLogo || "/placeholder.svg"}
                                alt={offer.company}
                                width={40}
                                height={40}
                                className="h-10 w-10 object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-[#0927EB]">{offer.title}</div>
                              <div className="text-sm text-gray-500">
                                {offer.company} - {offer.location}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                offer.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : offer.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {offer.status === "active"
                                ? "Active"
                                : offer.status === "pending"
                                  ? "En attente"
                                  : "Expirée"}
                            </span>
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
                              <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              Début: {offer.startDate} - Durée: {offer.duration}
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                              <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {offer.applications} candidature(s)
                            </div>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            {offer.status === "pending" && (
                              <div className="flex space-x-2">
                                <button
                                  type="button"
                                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                  <CheckCircleIcon className="mr-1 h-4 w-4" aria-hidden="true" />
                                  Approuver
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  <XCircleIcon className="mr-1 h-4 w-4" aria-hidden="true" />
                                  Refuser
                                </button>
                              </div>
                            )}
                            {offer.status === "active" && (
                              <Link
                                href={`/dashboard/responsable-admin/stages/${offer.id}/candidatures`}
                                className="text-[#0927EB] hover:text-[#0927EB]/80 font-medium"
                              >
                                Voir les candidatures
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-6 text-center text-gray-500">
                    Aucune offre de stage ne correspond à votre recherche.
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
