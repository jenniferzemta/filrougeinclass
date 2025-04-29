import { useState, useEffect } from 'react';
import { 
  SunIcon, 
  MoonIcon, 
  UserCircleIcon, 
  BellIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';
import StageContent from './StageContent';


export default function RSDash() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Gestion du dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`fixed lg:static z-50 w-64 h-screen bg-[#0927EB] transition-all duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="flex items-center justify-center h-16 px-4 bg-[#0927EB]/90">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
                <div className="w-5 h-5 rounded-full bg-[#FD6E47] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#16A637]"></div>
                </div>
              </div>
              <span className="text-white font-semibold text-lg">RS Dashboard</span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            <SidebarItem
              icon={<BriefcaseIcon className="h-5 w-5" />}
              text="Offres de stage"
              active
            />
          </nav>

          <div className="px-4 py-6 border-t border-white/20">
            <SidebarItem
              icon={<ArrowLeftOnRectangleIcon className="h-5 w-5" />}
              text="Déconnexion"
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Navigation */}
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Mobile menu button */}
                <button
                  className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>

                {/* Search */}
                <div className="flex-1 max-w-md px-4 mx-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {/* Right buttons */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {darkMode ? (
                      <SunIcon className="h-6 w-6 text-yellow-400" />
                    ) : (
                      <MoonIcon className="h-6 w-6" />
                    )}
                  </button>

                  <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-[#FD6E47] rounded-full"></span>
                  </button>

                  <div className="flex items-center">
                    <UserCircleIcon className="h-8 w-8 text-gray-500" />
                    <span className="hidden md:inline ml-2 text-sm">Responsable Stage</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 dark:bg-gray-900">
            <StageContent searchTerm={searchTerm} />
          </main>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, text, active = false }) {
  return (
    <button
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
        active
          ? 'bg-white text-[#0927EB] font-medium shadow-sm'
          : 'text-white hover:bg-white/10'
      }`}
    >
      <span className="flex items-center justify-center w-5 h-5">
        {icon}
      </span>
      <span className="ml-3">{text}</span>
    </button>
  );
}