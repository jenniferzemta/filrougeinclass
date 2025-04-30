
import { useState, useEffect } from "react"
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  HomeIcon,
  BriefcaseIcon,
  DocumentIcon,
  XMarkIcon
} from "@heroicons/react/24/outline"
import StageContent from "../components/etudiant/StageContent"
import ProfileSettings from "../components/etudiant/ProfileSettings"
import SupportContent from "../components/etudiant/SupportContent"
import SchedulesContent from "../components/etudiant/ScheduleContent"
import logo from './../assets/logo.png';
export default function Etudash() {
  // États
  const [darkMode, setDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState("offre")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [hasNewOffers, setHasNewOffers] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Initialisation du thème
  useEffect(() => {
    setIsMounted(true)
    const savedMode = localStorage.getItem('darkMode')
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setDarkMode(prefersDark)
    }
  }, [])

  // Application du thème
  useEffect(() => {
    if (isMounted) {
      if (darkMode) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('darkMode', 'true')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('darkMode', 'false')
      }
    }
  }, [darkMode, isMounted])

  const handleSectionChange = (section) => {
    setActiveSection(section)
    setSidebarOpen(false)
    
    if (section === "offre") {
      setHasNewOffers(false)
    }
  }

  const SidebarItem = ({ icon, text, active, hasAlert, section }) => {
    return (
      <button
        className={`
          flex items-center w-full p-3 rounded-lg transition-all duration-200
          ${active 
            ? "bg-white text-[#0927EB] font-semibold shadow-md" 
            : "text-white hover:bg-white/10 dark:hover:bg-gray-700"
          }
          ${hasAlert && !active ? "animate-pulse bg-[#FD6E47]/20" : ""}
        `}
        onClick={() => handleSectionChange(section)}
      >
        <span className={`${active ? "text-[#0927EB]" : "text-white/80"} mx-3`}>
          {icon}
        </span>
        <span className="font-medium text-sm">{text}</span>
        {hasAlert && !active && (
          <span className="ml-auto h-2 w-2 bg-[#FD6E47] rounded-full animate-pulse"></span>
        )}
      </button>
    )
  }

  const Sidebar = () => (
    <>
      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 inset-y-0 left-0 w-64 bg-[#0927EB] dark:bg-[#0927EB]
          flex flex-col transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          shadow-xl lg:shadow-none
        `}
      >
        {/* En-tête avec bouton fermer (mobile) */}
        <div className="p-4 flex justify-between items-center h-20 border-b border-white/20">
         <div className="p-4 flex justify-center items-center h-24 border-opacity-20">
                <div className="w-48 h-48 md:w-48 md:h-48 rounded-full flex items-center justify-center mt-5 overflow-hidden">
                  <img 
                    src={logo} 
                    className="w-48 object-center object-contain " 
                    alt="Logo" 
                  />
                </div>
              </div>
              <div className=" py-5 border-b border-white"></div>
          <button 
            className="lg:hidden -m-2 text-white/80 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col px-4 py-8 space-y-2 overflow-y-auto">
          <SidebarItem
            icon={<HomeIcon className="h-5 w-5" />}
            text="Tableau de bord"
            active={activeSection === "dashboard"}
            section="dashboard"
          />
          <SidebarItem
            icon={<AcademicCapIcon className="h-5 w-5" />}
            text="Emploi du temps"
            active={activeSection === "emploi"}
            section="emploi"
          />
          <SidebarItem
            icon={<BriefcaseIcon className="h-5 w-5" />}
            text="Stage/Formation"
            active={activeSection === "offre"}
            hasAlert={hasNewOffers}
            section="offre"
          />
          <SidebarItem
            icon={<DocumentIcon className="h-5 w-5" />}
            text="Support de cours"
            active={activeSection === "support"}
            section="support"
          />
          <SidebarItem
            icon={<Cog6ToothIcon className="h-5 w-5" />}
            text="Paramètres"
            active={activeSection === "settings"}
            section="settings"
          />
        </nav>

        {/* Pied de page */}
        <div className="p-4 border-t border-white/20">
          <button
            className="flex items-center w-full p-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            onClick={() => console.log("Déconnexion")}
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
            <span className="text-sm font-medium">Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  )

  const MainContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">Tableau de bord</h2>
            <p className="text-gray-600 dark:text-gray-300">Contenu du tableau de bord...</p>
          </div>
        )
      case "emploi":
        return <SchedulesContent/>
      case "offre":
        return <StageContent />
      case "support":
       return <SupportContent/>
      case "settings":
        return <ProfileSettings />
      default:
        return <StageContent />
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            {/* Bouton menu mobile */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>

            {/* Barre de recherche (masquée sur mobile) */}
            <div className="flex-1 max-w-md mx-4 hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Actions utilisateur */}
            <div className="flex items-center space-x-3">
              {/* Bouton dark mode */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label={darkMode ? "Mode clair" : "Mode sombre"}
              >
                {darkMode ? (
                  <SunIcon className="h-6 w-6 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>

              {/* Notifications */}
              <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                <BellIcon className="h-6 w-6" />
                {hasNewOffers && (
                  <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              {/* Profil utilisateur */}
              <button className="flex items-center space-x-2 focus:outline-none">
                <div className="h-9 w-9 rounded-full bg-[#0927EB]/10 dark:bg-gray-700 flex items-center justify-center">
                  <UserCircleIcon className="h-7 w-7 text-[#0927EB] dark:text-gray-300" />
                </div>
                <span className="hidden lg:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                  Étudiant
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <MainContent />
        </main>
      </div>
    </div>
  )
}