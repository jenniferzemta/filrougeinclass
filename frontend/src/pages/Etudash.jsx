import { useState, useEffect } from "react";
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  HomeIcon,
  BriefcaseIcon,
  DocumentIcon 
} from "@heroicons/react/24/outline";
import StageContent from "../components/etudiant/StageContent";
import etudiantStageService from "../services/etudiantStageService";
import ProfileSettings from "../components/etudiant/ProfileSettings";

export default function Etudash() {
    //USESTATE
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState("schedules");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasNewOffers, setHasNewOffers] = useState(false);
  const [lastChecked, setLastChecked] = useState(new Date().toISOString());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    
    // Vérifier les nouvelles offres au chargement
   // checkNewOffers();
    
    // Vérifier périodiquement (toutes les 5 minutes)
    // const interval = setInterval(checkNewOffers, 300000);
    // return () => clearInterval(interval);
  }, [darkMode]);

//   const checkNewOffers = async () => {
//     try {
//       const lastCheck = localStorage.getItem('lastOffersCheck') || lastChecked;
//       const newOffers = await etudiantStageService.getActiveOffers(lastCheck);
      
//       if (newOffers.length > 0) {
//         setHasNewOffers(true);
//         localStorage.setItem('hasNewOffers', 'true');
//       }
//     } catch (error) {
//       console.error('Erreur vérification nouvelles offres:', error);
//     }
//   };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    if (section === "offre") {
      // Reset l'alerte quand l'étudiant consulte les offres
      setHasNewOffers(false);
      localStorage.removeItem('hasNewOffers');
      setLastChecked(new Date().toISOString());
      localStorage.setItem('lastOffersCheck', new Date().toISOString());
    }
  };

  const SidebarItem = ({ icon, text, active, hasAlert, section }) => {
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
      if (hasAlert && !active) {
        setIsBlinking(true);
        const interval = setInterval(() => {
          setIsBlinking(prev => !prev);
        }, 1000);
        return () => clearInterval(interval);
      } else {
        setIsBlinking(false);
      }
    }, [hasAlert, active]);

    return (
      <button
        className={`
          flex items-center w-full p-2 rounded-full transition-all duration-200 relative
          ${active ? "bg-white text-black" : "text-white hover:bg-white hover:bg-opacity-20"}
          ${isBlinking ? "bg-yellow-500 bg-opacity-50" : ""}
        `}
        onClick={() => handleSectionChange(section)}
      >
        <span className="mx-auto md:mx-0 md:mr-3">{icon}</span>
        <span className="hidden md:inline font-medium text-sm">{text}</span>
        {hasAlert && !active && (
          <span className="absolute top-1 right-1 md:right-3 h-2 w-2 bg-red-500 rounded-full"></span>
        )}
      </button>
    );
  };

  const Sidebar = () => (
    <div className="w-16 md:w-56 h-screen bg-[#0927EB] font-open flex flex-col transition-all duration-300 border-r border-gray-200 fixed lg:static z-50">
      {/* Logo avec séparateur */}
      <div className="p-4 flex justify-center items-center h-24 border-opacity-20">
       
       
      </div>
      <div className="mt-5 border-b border-white"></div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center md:items-start px-2 space-y-1 mt-5 overflow-y-auto">
        <SidebarItem
          icon={<HomeIcon className="h-5 w-5 md:h-6 md:w-6" />}
          text="Tableau de bord"
          active={activeSection === "dashboard"}
          section="dashboard"
        />
        <SidebarItem
          icon={<AcademicCapIcon className="h-5 w-5 md:h-6 md:w-6" />}
          text="Emploi de temps"
          active={activeSection === "emploi"}
          section="emploi"
        />
        <SidebarItem
          icon={<BriefcaseIcon className="h-5 w-5 md:h-6 md:w-6" />}
          text="stage/formation"
          active={activeSection === "offre"}
          hasAlert={hasNewOffers}
          section="offre"
        />
        <SidebarItem
          icon={<DocumentIcon className="h-5 w-5 md:h-6 md:w-6" />}
          text="Support de cours"
          active={activeSection === "support"}
          section="support"
        />
        <SidebarItem
          icon={<Cog6ToothIcon className="h-5 w-5 md:h-6 md:w-6" />}
          text="Paramètres"
          active={activeSection === "settings"}
          section="settings"
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
  );

  const MainContent = () => {
    switch (activeSection) {
      case "schedules":
        return <div>Content for Schedules</div>;
      case "offre":
        return <StageContent />;
      case "internships":
        return <div>Content for Internships</div>;
      case "settings":
        return <ProfileSettings/>
      default:
        return <div>Content for Schedules</div>;
    }
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className={`flex-1 flex flex-col overflow-hidden ${darkMode ? "dark" : ""}`}>
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
            <button className="lg:hidden p-2 rounded-md focus:outline-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="flex-1 hidden md:block max-w-md relative">
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
            <div className="flex items-center space-x-4">
              <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
              </button>
              <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                <BellIcon className="h-6 w-6" />
                {hasNewOffers && (
                  <span className="absolute top-0 right-0 h-3 w-3 bg-[#FD6E47] rounded-full"></span>
                )}
              </button>
              <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <MainContent />
        </main>
      </div>
    </div>
  );
}