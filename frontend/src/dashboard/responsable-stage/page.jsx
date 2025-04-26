"use client"

import { useState } from "react"
import Image from "next/image"
import {
  PlusIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ChartBarIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import DashboardLayout from "@/components/DashboardLayout"

export default function ResponsableStageDashboard() {
  const [activeTab, setActiveTab] = useState("offres")
  const [showNewOfferForm, setShowNewOfferForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCompany, setFilterCompany] = useState("all")

  // Données fictives pour les offres de stage
  const stageOffers = [
    {
      id: 1,
      title: "Développeur Full Stack",
      company: "Tech Solutions",
      location: "Paris",
      type: "Stage de fin d'études",
      duration: "6 mois",
      status: "active",
      applications: 12,
      date: "2023-05-15",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      title: "Assistant Marketing Digital",
      company: "Marketing Pro",
      location: "Lyon",
      type: "Stage conventionné",
      duration: "4 mois",
      status: "active",
      applications: 8,
      date: "2023-05-10",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      title: "Analyste Financier",
      company: "Finance Corp",
      location: "Bordeaux",
      type: "Stage de fin d'études",
      duration: "6 mois",
      status: "expired",
      applications: 5,
      date: "2023-04-01",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      title: "Ingénieur en Cybersécurité",
      company: "Secure Net",
      location: "Toulouse",
      type: "Stage conventionné",
      duration: "5 mois",
      status: "active",
      applications: 15,
      date: "2023-05-12",
      logo: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      title: "Assistant Ressources Humaines",
      company: "HR Solutions",
      location: "Nantes",
      type: "Stage d'observation",
      duration: "2 mois",
      status: "draft",
      applications: 0,
      date: "2023-05-18",
      logo: "/placeholder.svg?height=40&width=40",
    },
  ]

  // Filtrer les offres de stage
  const filteredOffers = stageOffers.filter((offer) => {
    const matchesSearch =
      offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || offer.status === filterStatus
    const matchesCompany = filterCompany === "all" || offer.company === filterCompany

    return matchesSearch && matchesStatus && matchesCompany
  })

  // Statistiques
  const stats = [
    {
      title: "Offres actives",
      value: stageOffers.filter((offer) => offer.status === "active").length,
      icon: <BriefcaseIcon className="h-6 w-6 text-white" />,
      color: "#0927EB",
    },
    {
      title: "Entreprises partenaires",
      value: [...new Set(stageOffers.map((offer) => offer.company))].length,
      icon: <BuildingOfficeIcon className="h-6 w-6 text-white" />,
      color: "#FD6E47",
    },
    {
      title: "Candidatures totales",
      value: stageOffers.reduce((acc, offer) => acc + offer.applications, 0),
      icon: <UserGroupIcon className="h-6 w-6 text-white" />,
      color: "#16A637",
    },
    {
      title: "Taux de placement",
      value: "78%",
      icon: <ChartBarIcon className="h-6 w-6 text-white" />,
      color: "#0927EB",
    },
  ]

  // Liste des entreprises pour le filtre
  const companies = [...new Set(stageOffers.map((offer) => offer.company))]

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord - Responsable des Stages</h1>
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
                <option value="offres">Offres de stage</option>
                <option value="candidatures">Candidatures</option>
                <option value="entreprises">Entreprises</option>
                <option value="etudiants">Étudiants</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  <button
                    onClick={() => setActiveTab("offres")}
                    className={`${
                      activeTab === "offres"
                        ? "border-[#0927EB] text-[#0927EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Offres de stage
                  </button>
                  <button
                    onClick={() => setActiveTab("candidatures")}
                    className={`${
                      activeTab === "candidatures"
                        ? "border-[#0927EB] text-[#0927EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Candidatures
                  </button>
                  <button
                    onClick={() => setActiveTab("entreprises")}
                    className={`${
                      activeTab === "entreprises"
                        ? "border-[#0927EB] text-[#0927EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Entreprises
                  </button>
                  <button
                    onClick={() => setActiveTab("etudiants")}
                    className={`${
                      activeTab === "etudiants"
                        ? "border-[#0927EB] text-[#0927EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Étudiants
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Contenu de l'onglet Offres de stage */}
          {activeTab === "offres" && (
            <div className="mt-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
                <div className="flex-1 flex items-center max-w-md">
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
                        placeholder="Rechercher une offre..."
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
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
                      <option value="expired">Expirées</option>
                      <option value="draft">Brouillons</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="company-filter" className="sr-only">
                      Filtrer par entreprise
                    </label>
                    <select
                      id="company-filter"
                      name="company-filter"
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-[#0927EB] focus:border-[#0927EB] sm:text-sm rounded-md"
                      value={filterCompany}
                      onChange={(e) => setFilterCompany(e.target.value)}
                    >
                      <option value="all">Toutes les entreprises</option>
                      {companies.map((company, index) => (
                        <option key={index} value={company}>
                          {company}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNewOfferForm(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                  >
                    <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Nouvelle offre
                  </button>
                </div>
              </div>

              {/* Formulaire de nouvelle offre */}
              {showNewOfferForm && (
                <div className="bg-white shadow sm:rounded-lg mb-6">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Nouvelle offre de stage</h3>
                    <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Titre du poste
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="title"
                            id="title"
                            className="shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                          Entreprise
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="company"
                            id="company"
                            className="shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                          Lieu
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="location"
                            id="location"
                            className="shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                          Type de stage
                        </label>
                        <div className="mt-1">
                          <select
                            id="type"
                            name="type"
                            className="shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option>Stage de fin d'études</option>
                            <option>Stage conventionné</option>
                            <option>Stage d'observation</option>
                            <option>Stage alterné</option>
                          </select>
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                          Durée
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="duration"
                            id="duration"
                            className="shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Ex: 6 mois"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                          Statut
                        </label>
                        <div className="mt-1">
                          <select
                            id="status"
                            name="status"
                            className="shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="draft">Brouillon</option>
                            <option value="active">Active</option>
                          </select>
                        </div>
                      </div>
                      <div className="sm:col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="description"
                            name="description"
                            rows={4}
                            className="shadow-sm focus:ring-[#0927EB] focus:border-[#0927EB] block w-full sm:text-sm border-gray-300 rounded-md"
                          ></textarea>
                        </div>
                      </div>
                      <div className="sm:col-span-6">
                        <label className="block text-sm font-medium text-gray-700">Logo de l'entreprise</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-[#0927EB] hover:text-[#0927EB]/90 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#0927EB]"
                              >
                                <span>Télécharger un fichier</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                              </label>
                              <p className="pl-1">ou glisser-déposer</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF jusqu'à 10MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowNewOfferForm(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                      >
                        Annuler
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
                            <div className="flex items-center space-x-2">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  offer.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : offer.status === "expired"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {offer.status === "active"
                                  ? "Active"
                                  : offer.status === "expired"
                                    ? "Expirée"
                                    : "Brouillon"}
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
                                <svg
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {offer.location}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <svg
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {offer.type} - {offer.duration}
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <svg
                                className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              {offer.applications} candidature{offer.applications > 1 ? "s" : ""}
                            </div>
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
          )}

          {/* Contenu des autres onglets */}
          {activeTab === "candidatures" && (
            <div className="mt-6">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Candidatures récentes</h3>
                  <div className="mt-4 divide-y divide-gray-200">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="py-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                            <Image
                              src={`/placeholder.svg?height=40&width=40&text=E${item}`}
                              alt={`Étudiant ${item}`}
                              width={40}
                              height={40}
                              className="h-10 w-10 object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Étudiant {item}</div>
                            <div className="text-sm text-gray-500">
                              Candidature pour{" "}
                              {item % 2 === 0 ? "Développeur Full Stack" : "Assistant Marketing Digital"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              item % 3 === 0
                                ? "bg-yellow-100 text-yellow-800"
                                : item % 3 === 1
                                  ? "bg-green-100 text-green-800"
                                  : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {item % 3 === 0 ? "En attente" : item % 3 === 1 ? "Acceptée" : "Nouvelle"}
                          </span>
                          <button
                            type="button"
                            className="inline-flex items-center p-1.5 border border-transparent rounded-full shadow-sm text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                          >
                            <EyeIcon className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "entreprises" && (
            <div className="mt-6">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Entreprises partenaires</h3>
                  <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {["Tech Solutions", "Marketing Pro", "Finance Corp", "Secure Net", "HR Solutions"].map(
                      (company, index) => (
                        <div key={index} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                          <div className="p-5">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-100 overflow-hidden">
                                <Image
                                  src={`/placeholder.svg?height=48&width=48&text=${company.charAt(0)}`}
                                  alt={company}
                                  width={48}
                                  height={48}
                                  className="h-12 w-12 object-contain"
                                />
                              </div>
                              <div className="ml-5 w-0 flex-1">
                                <dl>
                                  <dt className="text-sm font-medium text-gray-500 truncate">{company}</dt>
                                  <dd>
                                    <div className="text-sm text-gray-900">
                                      {index + 1} offre{index !== 0 ? "s" : ""} active{index !== 0 ? "s" : ""}
                                    </div>
                                  </dd>
                                </dl>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end">
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
                              >
                                Voir le profil
                              </button>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "etudiants" && (
            <div className="mt-6">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Étudiants en recherche de stage</h3>
                  <div className="mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Nom
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Formation
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Spécialité
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Statut
                          </th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {[
                          {
                            name: "Jean Dupont",
                            formation: "Master 2",
                            specialite: "Informatique",
                            statut: "En recherche",
                          },
                          {
                            name: "Marie Martin",
                            formation: "Licence 3",
                            specialite: "Marketing",
                            statut: "Stage trouvé",
                          },
                          {
                            name: "Lucas Bernard",
                            formation: "Master 1",
                            specialite: "Finance",
                            statut: "En recherche",
                          },
                          {
                            name: "Sophie Petit",
                            formation: "Master 2",
                            specialite: "Ressources Humaines",
                            statut: "En attente",
                          },
                          {
                            name: "Thomas Leroy",
                            formation: "Licence 3",
                            specialite: "Communication",
                            statut: "Stage trouvé",
                          },
                        ].map((etudiant, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                                  <Image
                                    src={`/placeholder.svg?height=40&width=40&text=${etudiant.name.charAt(0)}`}
                                    alt={etudiant.name}
                                    width={40}
                                    height={40}
                                    className="h-10 w-10 object-cover"
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{etudiant.name}</div>
                                  <div className="text-sm text-gray-500">etudiant{index + 1}@email.com</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{etudiant.formation}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{etudiant.specialite}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  etudiant.statut === "En recherche"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : etudiant.statut === "Stage trouvé"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {etudiant.statut}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button type="button" className="text-[#0927EB] hover:text-[#0927EB]/80">
                                Voir profil
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
