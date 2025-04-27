import { useState } from "react";
import { MoonIcon, SunIcon, UserCircleIcon, BellIcon, MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar";
import StageContent from "./StageContent";

export default function RSDash() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Gestion du dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <button
                  className="md:hidden p-2 rounded-md focus:outline-none"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>

                <div className="flex-1 px-4 max-w-md">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
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

                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                  </button>

                  <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute top-0 right-0 h-3 w-3 bg-[#FD6E47] rounded-full"></span>
                  </button>

                  <div className="flex items-center">
                    <UserCircleIcon className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                    <span className="hidden md:inline ml-2">Responsable Stage</span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Contenu */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6">
            <StageContent searchTerm={searchTerm} />
          </main>
        </div>
      </div>
    </div>
  );
}