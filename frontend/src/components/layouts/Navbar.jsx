// import React, { useState } from "react";
// import logo from "./../../assets/logo.png";
// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md">
//       {/* Desktop Navbar */}
//       <div className="container mx-auto  py-3 flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center">
//           <img 
//             src={logo} // Remplace par ton chemin de logo
//             alt="AcademicFlow Logo" 
//             className="h-20 object-contain rounded-3xl W-64 mr-2"
//           />
//           {/* <span className="font-bold text-xl text-blue-800">AcademicFlow</span> */}
//         </div>

//         {/* Onglets Desktop (cachés en mobile) */}
//         <div className="hidden px-4 md:flex space-x-8">
//           <a href="/" className="text-gray-800 font-serif hover:text-[#64C369] ">Accueil</a>
//           <a href="/about" className="text-gray-800 font-serif hover:text-[#64C369] ">À propos</a>
//           <a href="/services" className="text-gray-800 font-serif hover:text-[#64C369] ">Services</a>
//           <a href="/contact" className="text-gray-800 font-serif hover:text-[#64C369] ">Contact</a>
//         </div>

//         {/* Boutons Desktop (cachés en mobile) */}
//         <div className="hidden md:flex r-10 space-x-4">
//           <button className="bg-[#FD6E47] font-serif rounded-lg text-white px-4 py-2 rounded hover:bg-white hover:text-[#FD6E47] hover:border hover:border-[#FD6E47]">
//             Login
//           </button>
//           <button className=" text-white font-serif rounded-lg px-4 py-2 border bg-[#0927EB] hover:border-[#0923EB] hover:bg-white hover:text-gray-800">
//             Connexion
//           </button>
//         </div>

//         {/* Menu Burger (mobile only) */}
//         <button 
//           className="md:hidden text-gray-700 focus:outline-none"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             {isMenuOpen ? (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </svg>
//         </button>
//       </div>

//       {/* Menu Mobile (toggle) */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white  font-serif pb-4 px-5">
//           <div className="flex flex-col space-y-2">
//             <a href="/" className="text-gray-800 hover:text-blue-600 py-2 ">Accueil</a>
//             <a href="/about" className="text-gray-800 hover:text-blue-600 py-2 ">À propos</a>
//             <a href="/services" className="text-gray-800 hover:text-blue-600 py-2 ">Services</a>
//             <a href="/contact" className="text-gray-800 hover:text-blue-600 py-2 ">Contact</a>
//           </div>
//           <div className="mt-4 flex flex-col space-y-4">
//             <button className="bg-[#FD6E47] text-white px-4 py-2 rounded-lg w-32 rounded hover:bg-white hover:text-[#FD6E47] hover:border hover:border-[#FD6E47]">
//               Login
//             </button>
//             <button className="bg-[#0923EB] text-white px-4 py-2 rounded-lg w-32  hover:border hover:border-[#0923EB] hover:bg-white hover:text-gray-800">
//               Connexion
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

 import React, { useState, useEffect } from "react";
 import logo from "./../../assets/logo.png";

import { motion } from "framer-motion";

import { Link } from 'react-router-dom';
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // If darkMode is passed as a prop, use it
    if (darkMode !== undefined) {
      setIsDarkMode(darkMode)
    } else {
      // Otherwise, check for user preference
      const isDark = localStorage.getItem("darkMode") === "true"
      setIsDarkMode(isDark)
      if (isDark) {
        document.documentElement.classList.add("dark")
      }
    }
  }, [darkMode])

  const handleToggleDarkMode = () => {
    if (toggleDarkMode) {
      toggleDarkMode()
    } else {
      const newMode = !isDarkMode
      setIsDarkMode(newMode)
      localStorage.setItem("darkMode", newMode)
      document.documentElement.classList.toggle("dark")
    }
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm font-open">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="flex items-center">
              <img src={logo} // Remplace par ton chemin de logo
           alt="AcademicFlow Logo" 
         className="h-20 object-contain rounded-3xl W-64 mr-2" />
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/home"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600"
              >
                Accueil
              </a>
              <a
                href="/about"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600"
              >
                À propos
              </a>
              <a
                href="/services"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600"
              >
                Services
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={handleToggleDarkMode}
              className="p-1 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB] dark:focus:ring-offset-gray-800"
            >
              {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>

            <div className="ml-4 flex items-center space-x-2">
              <a
                href="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#0927EB] bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB] dark:focus:ring-offset-gray-800"
              >
                Connexion
              </a>
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#0927EB] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB]"
              >
                Inscription
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={handleToggleDarkMode}
              className="p-1 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0927EB] dark:focus:ring-offset-gray-800 mr-2"
            >
              {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#0927EB] dark:focus:ring-offset-gray-800"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 0, height: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="sm:hidden overflow-hidden"
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/home"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
          >
            Accueil
          </Link>
          <Link
            href="/about"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
          >
            À propos
          </Link>
          <Link
            href="/services"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-800 dark:hover:text-white"
          >
            Contact
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center px-4 space-x-2">
            <Link
              href="/login"
              className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-[#0927EB] bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="block w-full text-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-[#0927EB] hover:bg-blue-700"
            >
              Inscription
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>
  )
}
