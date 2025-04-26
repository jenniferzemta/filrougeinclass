

import { useState } from "react"
import {Link} from "react-router-dom";
import {
  UserGroupIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DashboardLayout from "../../components/DashboardLayout";



export default function RADashboard() {
  const [activeTab, setActiveTab] = useState("etudiants")
  const [searchTerm, setSearchTerm] = useState("")

  // Données fictives pour les étudiants
  const students = [
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=JD",
      formation: "Master 2 Informatique",
      status: "active",
    },
    {
      id: 2,
      name: "Marie Martin",
      email: "marie.martin@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=MM",
      formation: "Licence 3 Marketing",
      status: "active",
    },
    {
      id: 3,
      name: "Lucas Bernard",
      email: "lucas.bernard@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=LB",
      formation: "Master 1 Finance",
      status: "active",
    },
    {
      id: 4,
      name: "Sophie Petit",
      email: "sophie.petit@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=SP",
      formation: "Master 2 Ressources Humaines",
      status: "inactive",
    },
    {
      id: 5,
      name: "Thomas Leroy",
      email: "thomas.leroy@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=TL",
      formation: "Licence 3 Communication",
      status: "active",
    },
  ]

  // Données fictives pour les professeurs
  const professors = [
    {
      id: 1,
      name: "Dr. Robert Dupuis",
      email: "robert.dupuis@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=RD",
      department: "Informatique",
      courses: 3,
    },
    {
      id: 2,
      name: "Prof. Claire Martin",
      email: "claire.martin@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=CM",
      department: "Marketing",
      courses: 2,
    },
    {
      id: 3,
      name: "Dr. Philippe Lefevre",
      email: "philippe.lefevre@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=PL",
      department: "Finance",
      courses: 4,
    },
    {
      id: 4,
      name: "Prof. Isabelle Moreau",
      email: "isabelle.moreau@email.com",
      avatar: "/placeholder.svg?height=40&width=40&text=IM",
      department: "Ressources Humaines",
      courses: 2,
    },
  ]

  // Données fictives pour les cours
  const courses = [
    {
      id: 1,
      title: "Introduction à la programmation",
      code: "INFO101",
      professor: "Dr. Robert Dupuis",
      students: 35,
      schedule: "Lundi, 09:00 - 12:00",
      room: "Salle A101",
    },
    {
      id: 2,
      title: "Bases de données avancées",
      code: "INFO305",
      professor: "Dr. Robert Dupuis",
      students: 28,
      schedule: "Mardi, 14:00 - 17:00",
      room: "Salle B202",
    },
    {
      id: 3,
      title: "Marketing digital",
      code: "MKT201",
      professor: "Prof. Claire Martin",
      students: 42,
      schedule: "Mercredi, 09:00 - 12:00",
      room: "Salle C303",
    },
    {
      id: 4,
      title: "Finance d'entreprise",
      code: "FIN301",
      professor: "Dr. Philippe Lefevre",
      students: 30,
      schedule: "Jeudi, 14:00 - 17:00",
      room: "Salle A102",
    },
  ]

  // Données fictives pour les salles
  const rooms = [
    {
      id: 1,
      name: "Salle A101",
      capacity: 40,
      equipment: "Projecteur, Tableau blanc",
      building: "Bâtiment A",
      floor: "1er étage",
      status: "available",
    },
    {
      id: 2,
      name: "Salle B202",
      capacity: 30,
      equipment: "Projecteur, Ordinateurs",
      building: "Bâtiment B",
      floor: "2ème étage",
      status: "occupied",
    },
    {
      id: 3,
      name: "Salle C303",
      capacity: 50,
      equipment: "Projecteur, Tableau blanc, Système audio",
      building: "Bâtiment C",
      floor: "3ème étage",
      status: "available",
    },
    {
      id: 4,
      name: "Amphithéâtre A",
      capacity: 200,
      equipment: "Projecteur, Système audio, Microphones",
      building: "Bâtiment A",
      floor: "Rez-de-chaussée",
      status: "maintenance",
    },
  ]

  // Filtrer les données en fonction de la recherche
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.formation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredProfessors = professors.filter(
    (professor) =>
      professor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professor.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.professor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.equipment.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Statistiques
  const stats = [
    {
      title: "Étudiants",
      value: students.filter((s) => s.status === "active").length,
      icon: <UserGroupIcon className="h-6 w-6 text-white" />,
      color: "#0927EB",
      bgClass: "from-[#0927EB] to-[#0927EB]/80",
    },
    {
      title: "Professeurs",
      value: professors.length,
      icon: <AcademicCapIcon className="h-6 w-6 text-white" />,
      color: "#FD6E47",
      bgClass: "from-[#FD6E47] to-[#FD6E47]/80",
    },
    {
      title: "Cours",
      value: courses.length,
      icon: <DocumentTextIcon className="h-6 w-6 text-white" />,
      color: "#16A637",
      bgClass: "from-[#16A637] to-[#16A637]/80",
    },
    {
      title: "Salles",
      value: rooms.filter((r) => r.status === "available").length,
      icon: <BuildingOfficeIcon className="h-6 w-6 text-white" />,
      color: "#0927EB",
      bgClass: "from-[#0927EB]/90 to-[#0927EB]/70",
    },
  ]

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord - Responsable Administratif</h1>
          <div className="mt-4 bg-gradient-to-r from-[#0927EB]/10 to-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium text-gray-900">Bienvenue, Philippe Leroy</h2>
            <p className="mt-1 text-sm text-gray-600">
              Vous avez <span className="font-medium text-[#0927EB]">3 nouvelles inscriptions</span> et{" "}
              <span className="font-medium text-[#FD6E47]">5 demandes</span> en attente de validation.
            </p>
            <div className="mt-4 flex space-x-3">
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
              >
                Voir les inscriptions
              </button>
              <button
                type="button"
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
              >
                Gérer les demandes
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Statistiques */}
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                <option value="etudiants">Étudiants</option>
                <option value="professeurs">Professeurs</option>
                <option value="cours">Cours</option>
                <option value="salles">Salles</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
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
                  <button
                    onClick={() => setActiveTab("professeurs")}
                    className={`${
                      activeTab === "professeurs"
                        ? "border-[#0927EB] text-[#0927EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Professeurs
                  </button>
                  <button
                    onClick={() => setActiveTab("cours")}
                    className={`${
                      activeTab === "cours"
                        ? "border-[#0927EB] text-[#0927EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Cours
                  </button>
                  <button
                    onClick={() => setActiveTab("salles")}
                    className={`${
                      activeTab === "salles"
                        ? "border-[#0927EB] text-[#0927EB]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Salles
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Barre de recherche et bouton d'ajout */}
          <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
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
                  placeholder={`Rechercher ${
                    activeTab === "etudiants"
                      ? "un étudiant"
                      : activeTab === "professeurs"
                        ? "un professeur"
                        : activeTab === "cours"
                          ? "un cours"
                          : "une salle"
                  }...`}
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Link
              href={`/dashboard/responsable-admin/${activeTab}/nouveau`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#0927EB] hover:bg-[#0927EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Ajouter{" "}
              {activeTab === "etudiants"
                ? "un étudiant"
                : activeTab === "professeurs"
                  ? "un professeur"
                  : activeTab === "cours"
                    ? "un cours"
                    : "une salle"}
            </Link>
          </div>

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
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  student.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {student.status === "active" ? "Actif" : "Inactif"}
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
                                <AcademicCapIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                {student.formation}
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <Link
                                href={`/dashboard/responsable-admin/etudiants/${student.id}`}
                                className="text-[#0927EB] hover:text-[#0927EB]/80 font-medium"
                              >
                                Voir le dossier
                              </Link>
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

          {/* Contenu de l'onglet Professeurs */}
          {activeTab === "professeurs" && (
            <div className="mt-6">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredProfessors.length > 0 ? (
                    filteredProfessors.map((professor) => (
                      <li key={professor.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                                {/* <Image
                                  src={professor.avatar || "/placeholder.svg"}
                                  alt={professor.name}
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 object-cover"
                                /> */}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-[#0927EB]">{professor.name}</div>
                                <div className="text-sm text-gray-500">{professor.email}</div>
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
                                Département: {professor.department}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <DocumentTextIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                {professor.courses} cours
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <Link
                                href={`/dashboard/responsable-admin/professeurs/${professor.id}`}
                                className="text-[#0927EB] hover:text-[#0927EB]/80 font-medium"
                              >
                                Voir le profil
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-6 text-center text-gray-500">
                      Aucun professeur ne correspond à votre recherche.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Contenu de l'onglet Cours */}
          {activeTab === "cours" && (
            <div className="mt-6">
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
                                  <DocumentTextIcon className="h-6 w-6 text-[#0927EB]" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-[#0927EB]">{course.title}</div>
                                  <div className="text-sm text-gray-500">{course.code}</div>
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
                                {course.professor}
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <UserGroupIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                {course.students} étudiants
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {course.schedule}, {course.room}
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

          {/* Contenu de l'onglet Salles */}
          {activeTab === "salles" && (
            <div className="mt-6">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {filteredRooms.length > 0 ? (
                    filteredRooms.map((room) => (
                      <li key={room.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#16A637]/10 flex items-center justify-center">
                                  <BuildingOfficeIcon className="h-6 w-6 text-[#16A637]" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-[#0927EB]">{room.name}</div>
                                  <div className="text-sm text-gray-500">
                                    {room.building}, {room.floor}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  room.status === "available"
                                    ? "bg-green-100 text-green-800"
                                    : room.status === "occupied"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {room.status === "available"
                                  ? "Disponible"
                                  : room.status === "occupied"
                                    ? "Occupée"
                                    : "En maintenance"}
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
                                <UserGroupIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                Capacité: {room.capacity} personnes
                              </div>
                              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <DocumentTextIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                                Équipement: {room.equipment}
                              </div>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                              <Link
                                href={`/dashboard/responsable-admin/salles/${room.id}`}
                                className="text-[#0927EB] hover:text-[#0927EB]/80 font-medium"
                              >
                                Voir détails
                              </Link>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-6 text-center text-gray-500">
                      Aucune salle ne correspond à votre recherche.
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
