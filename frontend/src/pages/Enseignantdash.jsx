import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
  BookOpenIcon,
  CalendarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon,
  Bars3Icon,
  DocumentIcon,
  ClipboardDocumentListIcon
} from "@heroicons/react/24/outline"
import logo from "./../assets/logo.png"
import SupportProfContent from "../components/enseignant/SupportProfContent"
import CalendarE from "../components/enseignant/CalendarE"
import { logout } from "../services/auth"
//import ProfileEnseignant from "../components/enseignant/ProfileEnseignant"

export default function EnseignantDash() {
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

  // Gestion du mode sombre
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Déconnexion
  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Contenu principal dynamique
  const MainContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />
      case "emploi":
        return <CalendarE />
      case "supports":
        return <SupportProfContent searchTerm={searchTerm} />
      case "evaluations":
        return <EvaluationsContent />
      case "profile":
        return <ProfileEnseignant />
      default:
        return <DashboardContent />
    }
  }

  // Sidebar spécifique enseignant
  const Sidebar = () => (
    <div
      className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} w-56 h-screen bg-[#0927EB] text-white fixed lg:static z-50 transition-all duration-300`}
    >
      <div className="flex items-center justify-center h-16 px-4 py-10 border-b border-white/10">
        <div className="w-48 h-32 rounded-full flex items-center justify-center mt-8 overflow-hidden">
          <img src={logo} className="w-48 object-center object-contain" alt="Logo" />
        </div>
      </div>
      <div className="py-5 border-b border-white"></div>

      <nav className="px-4 py-6">
        <div className="space-y-1">
          <SidebarItem
            icon={<HomeIcon className="h-5 w-5" />}
            text="Tableau de bord"
            active={activeSection === "dashboard"}
            onClick={() => setActiveSection("dashboard")}
          />
          <SidebarItem
            icon={<CalendarIcon className="h-5 w-5" />}
            text="Emploi du temps"
            active={activeSection === "emploi"}
            onClick={() => setActiveSection("emploi")}
          />
          <SidebarItem
            icon={<DocumentIcon className="h-5 w-5" />}
            text="Supports de cours"
            active={activeSection === "supports"}
            onClick={() => setActiveSection("supports")}
          />
          <SidebarItem
            icon={<ClipboardDocumentListIcon className="h-5 w-5" />}
            text="Évaluations"
            active={activeSection === "evaluations"}
            onClick={() => setActiveSection("evaluations")}
          />
          <SidebarItem
            icon={<Cog6ToothIcon className="h-5 w-5" />}
            text="Profil"
            active={activeSection === "profile"}
            onClick={() => setActiveSection("profile")}
          />
        </div>

        <div className="pt-4 mt-4 border-t border-white/30">
          <SidebarItem 
            icon={<ArrowLeftOnRectangleIcon className="h-5 w-5" />}
            text="Déconnexion"
            onClick={handleLogout}
          />
        </div>
      </nav>
    </div>
  )

  // Composant SidebarItem
  const SidebarItem = ({ icon, text, active = false, onClick }) => (
    <button
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
        active ? "bg-white text-[#0927EB] font-medium shadow-md" : "text-white hover:bg-white/10"
      }`}
      onClick={onClick}
    >
      <span className="flex items-center justify-center w-5 h-5">{icon}</span>
      <span className="ml-3 text-sm">{text}</span>
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FD6E47]"></span>}
    </button>
  )

  // Contenu du tableau de bord
  const DashboardContent = () => (
    <>
      <h1 className="text-2xl font-bold mb-6">Tableau de bord Enseignant</h1>

      {/* Bannière de bienvenue */}
      <div className="rounded-lg p-6 mb-8 bg-gradient-to-r from-[#0927EB] to-[#0927EB]/80 text-white">
        <h2 className="text-2xl font-bold mb-2">Bienvenue Professeur</h2>
        <p className="max-w-3xl">
          Consultez votre emploi du temps, gérez vos supports de cours et suivez les évaluations de vos étudiants.
        </p>
      </div>

      {/* Aperçu des sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <SectionPreview
          title="Emploi du temps"
          icon={<CalendarIcon className="h-6 w-6" />}
          color="bg-[#0927EB]/10 text-[#0927EB]"
          onClick={() => setActiveSection("emploi")}
        />
        <SectionPreview
          title="Supports de cours"
          icon={<DocumentIcon className="h-6 w-6" />}
          color="bg-[#FD6E47]/10 text-[#FD6E47]"
          onClick={() => setActiveSection("supports")}
        />
        <SectionPreview
          title="Évaluations"
          icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
          color="bg-[#16A637]/10 text-[#16A637]"
          onClick={() => setActiveSection("evaluations")}
        />
      </div>

      {/* Activités récentes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Activités récentes</h2>
        <ul className="space-y-3">
          <ActivityItem
            text="Nouveau support de cours ajouté"
            time="Aujourd'hui, 10:30"
            icon={<DocumentIcon className="h-5 w-5" />}
            color="bg-[#0927EB]/10 text-[#0927EB]"
          />
          <ActivityItem
            text="Cours de Mathématiques prévu demain"
            time="Aujourd'hui, 09:15"
            icon={<CalendarIcon className="h-5 w-5" />}
            color="bg-[#FD6E47]/10 text-[#FD6E47]"
          />
          <ActivityItem
            text="Évaluation corrigée - Classe 3A"
            time="Hier, 16:45"
            icon={<ClipboardDocumentListIcon className="h-5 w-5" />}
            color="bg-[#16A637]/10 text-[#16A637]"
          />
        </ul>
      </div>
    </>
  )

  // Contenu des évaluations (exemple)
  const EvaluationsContent = () => (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Gestion des Évaluations</h2>
      <p className="text-gray-600 dark:text-gray-300">Interface de gestion des évaluations à venir...</p>
    </div>
  )

  // Composant SectionPreview
  const SectionPreview = ({ title, icon, color, onClick }) => (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      </div>
      <button className="mt-4 text-sm text-[#0927EB] dark:text-blue-400 flex items-center">
        Accéder
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )

  // Composant ActivityItem
  const ActivityItem = ({ text, time, icon, color }) => (
    <li className="flex items-start">
      <div className={`p-2 rounded-full ${color} mr-3`}>{icon}</div>
      <div>
        <p className="font-medium">{text}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
      </div>
    </li>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40 backdrop-blur-sm transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <button
                  className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0927EB]"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>

                <div className="flex-1 max-w-md px-2 mx-2 sm:px-4 sm:mx-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                  </button>

                  <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute top-1 right-1 h-3 w-3 bg-[#FD6E47] rounded-full"></span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    <span className="hidden md:inline">Enseignant</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <MainContent />
          </main>

          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-6">
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} AKADEMIC - Plateforme Enseignant
            </p>
          </footer>
        </div>
      </div>
    </div>
  )
}