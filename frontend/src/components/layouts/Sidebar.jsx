import { NavLink } from 'react-router-dom';
import {
  ChartBarIcon,
  UserGroupIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  UsersIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import logo from "./../../assets/logo.png";

const Sidebar = () => {
  return (
    <div className="w-16 md:w-56 h-screen bg-[#0927EB] flex flex-col transition-all duration-300 border-r border-gray-200">
      {/* Logo section */}
      <div className="px-2 md:px-4 flex justify-center items-center h-24 border-opacity-20">
        <div className="w-12 h-12 md:w-64 md:h-64 rounded-full flex items-center justify-center mt-5 overflow-hidden">
          <img 
            src={logo} 
            className="w-full h-full object-contain" 
            alt="Logo" 
          />
        </div>
      </div>
      <div className="mt-5 border-b border-white"></div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center md:items-start px-2 space-y-1 mt-5 overflow-y-auto">
        <SidebarItem 
          icon={<ChartBarIcon className="h-5 w-5 md:h-6 md:w-6" />} 
          text="Dashboard" 
          to="/dashboard" 
        />
        <SidebarItem 
          icon={<UserGroupIcon className="h-5 w-5 md:h-6 md:w-6" />} 
          text="RA" 
          to="/raadmin" 
        />
        <SidebarItem 
          icon={<BriefcaseIcon className="h-5 w-5 md:h-6 md:w-6" />} 
          text="RS" 
          to="/rsadmin" 
        />
        <SidebarItem 
          icon={<AcademicCapIcon className="h-5 w-5 md:h-6 md:w-6" />} 
          text="Étudiants" 
          to="/etudiantadmin" 
        />
        <SidebarItem 
          icon={<UsersIcon className="h-5 w-5 md:h-6 md:w-6" />} 
          text="Professeurs" 
          to="/professeuradmin" 
        />
        <SidebarItem 
          icon={<CogIcon className="h-5 w-5 md:h-6 md:w-6" />} 
          text="Paramètres" 
          to="/parametres" 
        />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center w-full p-2 md:p-3 rounded-full transition-all duration-200
      ${isActive ? 
        'bg-white text-black md:rounded-r-none md:pr-6 relative after:hidden md:after:absolute md:after:-right-4 md:after:top-0 md:after:w-4 md:after:h-full md:after:bg-[#0927EB] md:after:rounded-tr-full md:after:rounded-br-full' : 
        'text-white hover:bg-white hover:bg-opacity-20'}
    `}
  >
    <span className="mx-auto md:mx-0 md:mr-3">{icon}</span>
    <span className="hidden md:inline font-medium text-sm">{text}</span>
  </NavLink>
);

export default Sidebar;