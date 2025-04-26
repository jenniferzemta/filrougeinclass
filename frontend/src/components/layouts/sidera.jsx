import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  BuildingOffice2Icon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  DocumentTextIcon,
  UsersIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  CogIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import logo from "./../../assets/logo.png";

const Sidebar = () => {
  const [openSections, setOpenSections] = useState({
    gestionAcademique: true,
    emploiDuTemps: true,
    administration: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="w-64 h-screen bg-[#0927EB]  font-sans border-r border-gray-200 flex flex-col">
      {/* En-tête */}
      <div className="p-4 border-b border-gray-200 flex flex-col items-center space-y-5 space-x-3">
        <div className="w-48 h-48 bg-orange-500 rounded-full flex items-center justify-center">
          <img src={logo} className="h-64 w-64 text-white object-contain" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 text-white">
        {/* Tableau de bord */}
        <SidebarItem 
          icon={<ChartBarIcon className="h-5 w-5" />} 
          text="Tableau de bord" 
          to="/dashboard" 
        />

        {/* Section Gestion Académique */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection('gestionAcademique')}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            {openSections.gestionAcademique ? (
              <ChevronDownIcon className="h-4 w-4 mr-2" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 mr-2" />
            )}
            <span>Gestion Académique</span>
          </button>

          {openSections.gestionAcademique && (
            <div className="ml-6 mt-1 space-y-1">
              <SidebarItem 
                icon={<UsersIcon className="h-5 w-5" />} 
                text="Gestion des Enseignants" 
                to="/enseignants" 
                indent
              />
              <SidebarItem 
                icon={<AcademicCapIcon className="h-5 w-5" />} 
                text="Gestion des Étudiants" 
                to="/etudiants" 
                indent
              />
              <SidebarItem 
                icon={<BookOpenIcon className="h-5 w-5" />} 
                text="Gestion des Matières" 
                to="/matieres" 
                indent
              />
              <SidebarItem 
                icon={<BuildingOffice2Icon className="h-5 w-5" />} 
                text="Gestion des Salles" 
                to="/salles" 
                indent
              />
            </div>
          )}
        </div>

        {/* Section Emploi du Temps */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection('emploiDuTemps')}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            {openSections.emploiDuTemps ? (
              <ChevronDownIcon className="h-4 w-4 mr-2" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 mr-2" />
            )}
            <span>Emploi du Temps</span>
          </button>

          {openSections.emploiDuTemps && (
            <div className="ml-6 mt-1 space-y-1">
              <SidebarItem 
                icon={<CalendarIcon className="h-5 w-5" />} 
                text="Programmation des Cours" 
                to="/programmation" 
                indent
              />
              <SidebarItem 
                icon={<ClockIcon className="h-5 w-5" />} 
                text="Plages Horaires" 
                to="/plages-horaires" 
                indent
              />
              <SidebarItem 
                icon={<DocumentTextIcon className="h-5 w-5" />} 
                text="Génération EDT" 
                to="/generation-edt" 
                indent
              />
            </div>
          )}
        </div>

        {/* Section Administration */}
        <div className="mb-2">
          <button
            onClick={() => toggleSection('administration')}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            {openSections.administration ? (
              <ChevronDownIcon className="h-4 w-4 mr-2" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 mr-2" />
            )}
            <span>Administration</span>
          </button>

          {openSections.administration && (
            <div className="ml-6 mt-1 space-y-1">
              <SidebarItem 
                icon={<UserGroupIcon className="h-5 w-5" />} 
                text="Départements" 
                to="/departements" 
                indent
              />
              <SidebarItem 
                icon={<CogIcon className="h-5 w-5" />} 
                text="Paramètres" 
                to="/parametres" 
                indent
              />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text, to, indent = false }) => (
  <NavLink
    to={to}
    className={({ isActive }) => 
      `flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
        indent ? 'ml-2' : ''
      } ${
        isActive 
          ? 'bg-white text-[#0927EB] font-medium bg-opacity-20' 
          : 'text-white hover:bg-white hover:bg-opacity-10'
      }`
    }
  >
    <span className="mr-3">{icon}</span>
    <span>{text}</span>
  </NavLink>
);

export default Sidebar;