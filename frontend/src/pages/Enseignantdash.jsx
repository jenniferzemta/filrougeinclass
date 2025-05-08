import logo from "./../assets/logo.png"
import { useState, useEffect } from "react"
import {
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  BellIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  HomeIcon,
  ChartBarIcon,
  AcademicCapIcon,DocumentIcon, CogIcon, Cog6ToothIcon
} from "@heroicons/react/24/outline"
import SupportProfContent from "../components/enseignant/SupportProfContent"
import Calendar from "../components/Calendar/Calendar"
import { logout } from "../services/auth"
import { useNavigate } from "react-router-dom"
import CalendarE from "../components/enseignant/CalendarE"


export default function EnseignantDash() {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSection, setActiveSection] = useState("emploi")
  const navigate= useNavigate()

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDarkMode(localStorage.getItem("darkMode") === "true" || prefersDark)

    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    localStorage.setItem("darkMode", newMode.toString())
  }
//deconnexion
   //logout 
    const handleLogout = async () => {
      try {
        await logout();
        navigate('/login');
      } catch (error) {
        console.error('Logout error:', error);
      }
    };
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
            return <CalendarE/>
          case "support":
            return <SupportProfContent />

          default:
            return <Calendar />
        }
      }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40 backdrop-blur-sm transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen overflow-hidden">
        <aside
          className={`fixed lg:static z-50 w-56 h-screen transition-all duration-300 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } bg-gradient-to-b from-[#0927EB] to-[#0927EB]/90 text-white shadow-xl`}
        >
          <div className="flex items-center justify-center h-16 px-4 border-b border-white/10">
            <div className="w-48 h-32 md:w-48 md:h-32 rounded-full flex items-center justify-center mt-8 overflow-hidden">
              <img src={logo} className="w-48 object-center object-contain" alt="Logo" />
            </div>
          </div>
          <div className=" py-7 border-b border-white"></div>

          <div className="px-4 py-6">
            <nav className="space-y-1">
              <SidebarItem
                         icon={<AcademicCapIcon className="h-5 w-5" />}
                         text="Emploi du temps"
                         active={activeSection === "emploi"}
                         section="emploi"
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
                           {/* Pied de page */}
                      
                       <div className="pt-2 mt-2 border-white/30 w-full flex justify-center md:justify-start  rounded-lg text-white hover:bg-white  hover:text-[#0927eb]">
                       <button
                         onClick={handleLogout}
                         className="flex items-center gap-2 px-4 m-2  text-sm  rounded"
                       >
                         <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                         Déconnexion
                       </button>
                    
                   </div>
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-4 py-4 border-t border-white/10">
            <SidebarItem icon={<ArrowLeftOnRectangleIcon className="h-5 w-5" />} text="Déconnexion" />
          </div>
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10 transition-colors duration-300">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <button
                  className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0927EB] transition-all"
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
                      placeholder="Rechercher un support..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-colors duration-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0927EB]"
                  >
                    {darkMode ? <SunIcon className="h-6 w-6 text-[#FD6E47]" /> : <MoonIcon className="h-6 w-6" />}
                  </button>

                  <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0927EB] relative">
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute top-1 right-1 h-3 w-3 bg-[#FD6E47] rounded-full border-2 border-white dark:border-gray-800"></span>
                  </button>

                  <div className="hidden sm:flex items-center space-x-2 pl-2 border-l border-gray-300 dark:border-gray-700">
                    <div className="bg-[#0927EB] rounded-full p-1">
                      <UserCircleIcon className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Professeur</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            {/* <SupportProfContent searchTerm={searchTerm} /> */}
            <MainContent/>
            
          </main>

          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 px-6 transition-colors duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} AKADEMIC. Tous droits réservés.
              </p>
              <div className="flex space-x-4 mt-2 sm:mt-0">
                <a href="#" className="text-sm text-[#0927EB] dark:text-[#4d63e8] hover:underline">
                  Politique de confidentialité
                </a>
                <a href="#" className="text-sm text-[#0927EB] dark:text-[#4d63e8] hover:underline">
                  Conditions d'utilisation
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

function SidebarItem({ icon, text, active = false }) {
  return (
    <button
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
        active ? "bg-white text-[#0927EB] font-medium shadow-md" : "text-white hover:bg-white/10"
      }`}
    >
      <span className="flex items-center justify-center w-5 h-5">{icon}</span>
      <span className="ml-3 text-sm">{text}</span>
      {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#FD6E47]"></span>}
    </button>
  )
}