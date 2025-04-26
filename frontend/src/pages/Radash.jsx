
import { useState, useEffect } from "react"
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  UsersIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  BookOpenIcon,
  CalendarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline"


import DepartmentsContents from "../components/ra/DepartmentsContents"

import SallesContent from "../components/ra/SallesContent" ;
import MatieresContent from "../components/ra/MatieresContent";
import CoursContent from "../components/ra/CoursContent";


export default function Radash() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState("")
  const [modalAction, setModalAction] = useState("add")
  const [selectedItem, setSelectedItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Données mock
  const stats = [
    {
      id: 1,
      name: "Étudiants",
      value: "1,248",
      icon: AcademicCapIcon,
      change: "+12%",
      color: "bg-[#0927EB]/10 text-[#0927EB]",
    },
    { id: 2, name: "RA", value: "24", icon: UsersIcon, change: "+2", color: "bg-[#16A637]/10 text-[#16A637]" },
    { id: 3, name: "RS", value: "18", icon: UsersIcon, change: "+3", color: "bg-[#FD6E47]/10 text-[#FD6E47]" },
    {
      id: 4,
      name: "Professeurs",
      value: "94",
      icon: UsersIcon,
      change: "+5%",
      color: "bg-[#0927EB]/10 text-[#0927EB]",
    },
    {
      id: 5,
      name: "Salles",
      value: "42",
      icon: BuildingOffice2Icon,
      change: "",
      color: "bg-[#FD6E47]/10 text-[#FD6E47]",
    },
    {
      id: 6,
      name: "EDT Actifs",
      value: "36",
      icon: CalendarIcon,
      change: "+4",
      color: "bg-[#16A637]/10 text-[#16A637]",
    },
  ]

 
  const schedules = [
    { id: 1, course: "Algorithmique Avancée", day: "Lundi", startTime: "08:30", endTime: "10:30", room: "A101" },
    { id: 2, course: "Gestion de Projet", day: "Mardi", startTime: "10:45", endTime: "12:45", room: "B205" },
    { id: 3, course: "IA Fondamentale", day: "Mercredi", startTime: "14:00", endTime: "16:00", room: "C103" },
    { id: 4, course: "Analyse Mathématique", day: "Jeudi", startTime: "08:30", endTime: "10:30", room: "A204" },
    { id: 5, course: "Physique Quantique", day: "Vendredi", startTime: "10:45", endTime: "12:45", room: "B102" },
  ]

  // Effet pour le mode sombre
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Fonction pour ouvrir une modale
  const openModal = (type, action, item = null) => {
    setModalType(type)
    setModalAction(action)
    setSelectedItem(item)
    setShowModal(true)
    setIsModalOpen(true)
  }

  // Fonction pour fermer une modale
  const closeModal = () => {
    setShowModal(false)
    setSelectedItem(null)
    setModalAction("add")
    setIsModalOpen(false)
  }

  // Fonction pour filtrer les données selon le terme de recherche
  const filterData = (data) => {
    if (!searchTerm) return data
    return data.filter((item) =>
      Object.values(item).some(
        (value) => typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    )
  }

  // Remplacer le composant Sidebar par celui fourni par l'utilisateur
  const Sidebar = () => (
    <div className="w-16 md:w-56 h-screen bg-[#0927EB] font-open flex flex-col transition-all duration-300 border-r border-gray-200 fixed lg:static z-50">
      {/* Logo avec séparateur */}
      <div className="p-4 flex justify-center items-center h-24 border-opacity-20">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center overflow-hidden">
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
            <div className="h-5 w-5 rounded-full bg-[#FD6E47] flex items-center justify-center">
              <div className="h-2.5 w-2.5 rounded-full bg-[#16A637]"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 border-b border-white"></div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center md:items-start px-2 space-y-1 mt-5 overflow-y-auto">
        <SidebarItem
          icon={<HomeIcon className="h-5 w-5 md:h-6 md:w-6" />}
          text="Tableau de bord"
          active={activeSection === "dashboard"}
          onClick={() => setActiveSection("dashboard")}
        />
        {/* <SidebarItem
          icon={<UsersIcon className="h-5 w-5 md:h-6 md:w-6" />}
          text="Départements"
          active={activeSection === "departments"}
          onClick={() => setActiveSection("departments")}
        /> */}
          <SidebarItem
          icon={<UsersIcon className="h-5 w-5 md:h-6 md:w-6" />}
          text="Départements"
          active={activeSection === "departments"}
          onClick={() => setActiveSection("departments")}
        />
        <SidebarItem
          icon={<BuildingOffice2Icon className="h-5 w-5 md:h-6 md:w-6" />}
          text="Salles"
          active={activeSection === "salles"}
          onClick={() => setActiveSection("salles")}
        />
        <SidebarItem
          icon={<BookOpenIcon className="h-5 w-5 md:h-6 md:w-6" />}
          text="Matières"
          active={activeSection === "matieres"}
          onClick={() => setActiveSection("matieres")}
        />
        <SidebarItem
          icon={<AcademicCapIcon className="h-5 w-5 md:h-6 md:w-6" />}
          text="Cours"
          active={activeSection === "courses"}
          onClick={() => setActiveSection("courses")}
        />
        <SidebarItem
          icon={<CalendarIcon className="h-5 w-5 md:h-6 md:w-6" />}
          text="Emploi du temps"
          active={activeSection === "schedules"}
          onClick={() => setActiveSection("schedules")}
        />
        <SidebarItem
          icon={<Cog6ToothIcon className="h-5 w-5 md:h-6 md:w-6" />}
          text="Paramètres"
          active={activeSection === "settings"}
          onClick={() => setActiveSection("settings")}
        />
        <div className="pt-4 mt-4 border-t border-white/30 w-full flex justify-center md:justify-start">
          <SidebarItem
            icon={<ArrowLeftOnRectangleIcon className="h-5 w-5 md:h-6 md:w-6" />}
            text="Déconnexion"
            onClick={() => console.log("Déconnexion")}
          />
        </div>
      </nav>
    </div>
  )

  // Remplacer le composant SidebarItem par celui fourni par l'utilisateur
  const SidebarItem = ({ icon, text, active, onClick }) => (
    <button
      className={`
        flex items-center w-full p-2 md:p-3 rounded-full transition-all duration-200
        ${
          active
            ? "bg-white text-black md:rounded-r-none md:pr-6 relative after:absolute after:-right-4 after:top-0 after:w-4 after:h-full after:bg-[#0927EB] after:rounded-tr-full after:rounded-br-full"
            : "text-white hover:bg-white hover:bg-opacity-20"
        }
      `}
      onClick={onClick}
    >
      <span className="mx-auto md:mx-0 md:mr-3">{icon}</span>
      <span className="hidden md:inline font-medium text-sm">{text}</span>
    </button>
  )

  // Composant pour le contenu principal
  const MainContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />
      case "departments":
        return <DepartmentsContents />
      case "salles":
        return <SallesContent />
      case "matieres":
        return <MatieresContent />
      case "courses":
        return <CoursContent />
      case "schedules":
        return <SchedulesContent />
      case "settings":
        return <SettingsContent />
      default:
        return <DashboardContent />
    }
  }

  // Composant pour le tableau de bord
  const DashboardContent = () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>

      {/* Cartes statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="rounded-lg p-4 shadow bg-white dark:bg-gray-800">
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-300">{stat.name}</p>
                <p className="text-2xl font-semibold">
                  {stat.value}
                  {stat.change && (
                    <span className={`ml-2 text-sm ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
                      {stat.change}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bannière de bienvenue */}
      <div className="rounded-lg p-6 mb-8 bg-gradient-to-r from-[#0927EB] to-[#0927EB]/80 text-white">
        <h2 className="text-2xl font-bold mb-2">Bienvenue sur AcademiPro</h2>
        <p className="max-w-3xl">
          Votre plateforme complète de gestion académique. Gérez les emplois du temps, les ressources pédagogiques, les
          stages et bien plus encore en toute simplicité.
        </p>
      </div>

      {/* Aperçu des sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SectionPreview
          title="Départements"
        //  count={dept.length}
          icon={<UsersIcon className="h-6 w-6" />}
          color="bg-[#0927EB]/10 text-[#0927EB]"
          onClick={() => setActiveSection("departments")}
        />
        <SectionPreview
          title="Salles"
         // count={salles.length}
          icon={<BuildingOffice2Icon className="h-6 w-6" />}
          color="bg-[#FD6E47]/10 text-[#FD6E47]"
          onClick={() => setActiveSection("rooms")}
        />
        <SectionPreview
          title="Matières"
        //  count={subjects.length}
          icon={<BookOpenIcon className="h-6 w-6" />}
          color="bg-[#16A637]/10 text-[#16A637]"
          onClick={() => setActiveSection("subjects")}
        />
        <SectionPreview
          title="Cours"
         // count={courses.length}
          icon={<AcademicCapIcon className="h-6 w-6" />}
          color="bg-[#0927EB]/10 text-[#0927EB]"
          onClick={() => setActiveSection("courses")}
        />
        <SectionPreview
          title="Emploi du temps"
         // count={schedules.length}
          icon={<CalendarIcon className="h-6 w-6" />}
          color="bg-[#FD6E47]/10 text-[#FD6E47]"
          onClick={() => setActiveSection("schedules")}
        />
        <SectionPreview
          title="Paramètres"
          icon={<Cog6ToothIcon className="h-6 w-6" />}
          color="bg-[#16A637]/10 text-[#16A637]"
          onClick={() => setActiveSection("settings")}
        />
      </div>

      {/* Activités récentes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Activités récentes</h2>
        <ul className="space-y-3">
          <ActivityItem
            text="Nouveau département de Biologie ajouté"
            time="Il y a 2 heures"
            icon={<UsersIcon className="h-5 w-5" />}
            color="bg-[#0927EB]/10 text-[#0927EB]"
          />
          <ActivityItem
            text="Mise à jour de l'emploi du temps du département Informatique"
            time="Il y a 3 heures"
            icon={<CalendarIcon className="h-5 w-5" />}
            color="bg-[#FD6E47]/10 text-[#FD6E47]"
          />
          <ActivityItem
            text="Nouvelle salle C103 ajoutée"
            time="Il y a 5 heures"
            icon={<BuildingOffice2Icon className="h-5 w-5" />}
            color="bg-[#16A637]/10 text-[#16A637]"
          />
          <ActivityItem
            text="Nouveau cours d'IA Fondamentale ajouté"
            time="Hier à 14:30"
            icon={<AcademicCapIcon className="h-5 w-5" />}
            color="bg-[#0927EB]/10 text-[#0927EB]"
          />
          <ActivityItem
            text="Mise à jour des paramètres système"
            time="Hier à 10:15"
            icon={<Cog6ToothIcon className="h-5 w-5" />}
            color="bg-[#FD6E47]/10 text-[#FD6E47]"
          />
        </ul>
      </div>
    </>
  )

  // Composant pour l'aperçu d'une section
  const SectionPreview = ({ title, count, icon, color, onClick }) => (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      </div>
      {count !== undefined && <p className="text-3xl font-bold">{count}</p>}
      <button className="mt-4 text-sm text-[#0927EB] dark:text-blue-400 flex items-center">
        Voir détails
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )

  // Composant pour une activité récente
  const ActivityItem = ({ text, time, icon, color }) => (
    <li className="flex items-start">
      <div className={`p-2 rounded-full ${color} mr-3`}>{icon}</div>
      <div>
        <p className="font-medium">{text}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
      </div>
    </li>
  )

  // Composant pour la gestion des emplois du temps
  const SchedulesContent = () => {
    const filteredSchedules = filterData(schedules)

    return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Emploi du temps</h1>
          <button
            className="px-4 py-2 bg-[#0927EB] text-white rounded-md hover:bg-[#0927EB]/90 flex items-center"
            onClick={() => openModal("schedule", "add")}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Ajouter un créneau
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un créneau..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Cours
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Jour
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Horaire
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Salle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSchedules.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">{schedule.course}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">{schedule.day}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                      {schedule.startTime} - {schedule.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#0927EB]/10 text-[#0927EB]">
                        {schedule.room}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        className="text-[#0927EB] dark:text-blue-400 hover:text-[#0927EB]/80 dark:hover:text-blue-300 mr-3"
                        onClick={() => openModal("schedule", "edit", schedule)}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        className="text-[#FD6E47] dark:text-red-400 hover:text-[#FD6E47]/80 dark:hover:text-red-300"
                        onClick={() => openModal("schedule", "delete", schedule)}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSchedules.length === 0 && (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">Aucun créneau trouvé</div>
          )}
        </div>
      </>
    )
  }

  // Composant pour les paramètres
  const SettingsContent = () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Préférences d'affichage</h2>

        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <p className="font-medium">Mode sombre</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Activer le mode sombre pour l'interface</p>
          </div>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
            <input
              type="checkbox"
              id="darkModeToggle"
              className="absolute w-0 h-0 opacity-0"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <label
              htmlFor="darkModeToggle"
              className={`block w-12 h-6 overflow-hidden rounded-full cursor-pointer ${
                darkMode ? "bg-[#0927EB]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute block w-5 h-5 mt-0.5 ml-0.5 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                  darkMode ? "translate-x-6" : "translate-x-0"
                }`}
              ></span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
          <div>
            <p className="font-medium">Notifications</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Recevoir des notifications système</p>
          </div>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
            <input
              type="checkbox"
              id="notificationsToggle"
              className="absolute w-0 h-0 opacity-0"
              defaultChecked={true}
            />
            <label
              htmlFor="notificationsToggle"
              className="block w-12 h-6 overflow-hidden rounded-full cursor-pointer bg-[#0927EB]"
            >
              <span className="absolute block w-5 h-5 mt-0.5 ml-0.5 rounded-full bg-white shadow transform translate-x-6"></span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium">Langue</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Choisir la langue de l'interface</p>
          </div>
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Compte</h2>

        <div className="flex items-center mb-6">
          <div className="h-16 w-16 rounded-full bg-[#0927EB] flex items-center justify-center text-white text-2xl font-bold">
            A
          </div>
          <div className="ml-4">
            <p className="font-medium">Admin</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">admin@academipro.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center">
            <PencilIcon className="h-5 w-5 mr-2" />
            Modifier le profil
          </button>

          <button className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center">
            <Cog6ToothIcon className="h-5 w-5 mr-2" />
            Paramètres avancés
          </button>

          <button className="w-full px-4 py-2 bg-[#FD6E47]/10 text-[#FD6E47] rounded-md hover:bg-[#FD6E47]/20 flex items-center justify-center">
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
            Déconnexion
          </button>
        </div>
      </div>
    </>
  )

  // Composant pour les modales
  const Modal = () => {
    if (!showModal) return null

    let title = ""
    let content = null

    switch (modalType) {
  

      case "schedule":
        title =
          modalAction === "add"
            ? "Ajouter un créneau"
            : modalAction === "edit"
              ? "Modifier le créneau"
              : "Supprimer le créneau"
        content = <ScheduleModalContent />
        break
      default:
        break
    }

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
            <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
          </div>

          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>

          <div
            className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
                <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" onClick={closeModal}>
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }

  
  // Contenu de la modale pour les emplois du temps
  const ScheduleModalContent = () => {
    if (modalAction === "delete") {
      return (
        <div>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Êtes-vous sûr de vouloir supprimer ce créneau pour le cours "{selectedItem?.course}" ? Cette action est
            irréversible.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={closeModal}
            >
              Annuler
            </button>
            <button
              className="px-4 py-2 bg-[#FD6E47] text-white rounded-md hover:bg-[#FD6E47]/90"
              onClick={() => {
                // Logique de suppression
                closeModal()
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
      )
    }

    return (
      <form className="space-y-4">
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cours
          </label>
          <select
            id="course"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            defaultValue={selectedItem?.course || ""}
          >
            <option value="">Sélectionner un cours</option>
            {courses.map((course) => (
              <option key={course.id} value={course.name}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="day" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Jour
          </label>
          <select
            id="day"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            defaultValue={selectedItem?.day || ""}
          >
            <option value="">Sélectionner un jour</option>
            <option value="Lundi">Lundi</option>
            <option value="Mardi">Mardi</option>
            <option value="Mercredi">Mercredi</option>
            <option value="Jeudi">Jeudi</option>
            <option value="Vendredi">Vendredi</option>
            <option value="Samedi">Samedi</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Heure de début
            </label>
            <input
              type="time"
              id="startTime"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              defaultValue={selectedItem?.startTime || ""}
            />
          </div>
          <div>
            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Heure de fin
            </label>
            <input
              type="time"
              id="endTime"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              defaultValue={selectedItem?.endTime || ""}
            />
          </div>
        </div>
        <div>
          <label htmlFor="room" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Salle
          </label>
          <select
            id="room"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            defaultValue={selectedItem?.room || ""}
          >
            <option value="">Sélectionner une salle</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.name}>
                {room.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={closeModal}
          >
            Annuler
          </button>
          <button type="submit" className="px-4 py-2 bg-[#0927EB] text-white rounded-md hover:bg-[#0927EB]/90">
            {modalAction === "add" ? "Ajouter" : "Enregistrer"}
          </button>
        </div>
      </form>
    )
  }

  // Modifier la structure principale pour que le mode sombre n'affecte pas la sidebar
  return (
    <div className="min-h-screen">
      <div className="flex h-screen">
        {/* Sidebar - pas affectée par le mode sombre */}
        <Sidebar />

        {/* Overlay pour mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Contenu principal - affecté par le mode sombre */}
        <div className={`flex-1 flex flex-col overflow-hidden ${darkMode ? "dark" : ""}`}>
          {/* Navbar */}
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                {/* Bouton hamburger (mobile) */}
                <button
                  className="lg:hidden p-2 rounded-md focus:outline-none"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>

                {/* Titre de la section */}
                <div className="lg:hidden font-semibold">
                  {activeSection === "dashboard"
                    ? "Tableau de bord"
                    : activeSection === "departments"
                      ? "Départements"
                      : activeSection === "rooms"
                        ? "Salles"
                        : activeSection === "subjects"
                          ? "Matières"
                          : activeSection === "courses"
                            ? "Cours"
                            : activeSection === "schedules"
                              ? "Emploi du temps"
                              : "Paramètres"}
                </div>

                {/* Barre de recherche (masquée sur mobile) */}
                <div className="hidden md:block flex-1 px-4 max-w-md">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Elements côté droit */}
                <div className="flex items-center space-x-4">
                  {/* Bouton mode sombre */}
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                  </button>

                  {/* Notification */}
                  <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute top-0 right-0 h-3 w-3 bg-[#FD6E47] rounded-full"></span>
                  </button>

                  {/* Avatar utilisateur */}
                  <div className="flex items-center">
                    <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    <span className="hidden md:inline ml-2">Admin</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Contenu principal */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <MainContent />
          </main>
        </div>
      </div>

      {/* Modale */}
      {showModal && <Modal />}
    </div>
  )
}
