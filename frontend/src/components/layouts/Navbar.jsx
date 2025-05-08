import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"

// Placeholder for the logo import
import logoPlaceholder from "./../../assets/logo.png"

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
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 font-open">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/home" className="flex items-center">
              <img
                src={logoPlaceholder || "/placeholder.svg"}
                alt="AcademicFlow Logo"
                className="h-20 w-20 object-contain rounded-2xl"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:justify-center flex-1">
            <div className="flex space-x-8">
              <a
                href="/home"
                className="text-gray-600 dark:text-gray-300 hover:text-[#0927EB] dark:hover:text-white px-3 py-2 text-sm font-medium"
              >
                Accueil
              </a>
              <a
                href="/about"
                className="text-gray-600 dark:text-gray-300 hover:text-[#0927EB] dark:hover:text-white px-3 py-2 text-sm font-medium"
              >
                À propos
              </a>
              <a
                href="/services"
                className="text-gray-600 dark:text-gray-300 hover:text-[#0927EB] dark:hover:text-white px-3 py-2 text-sm font-medium"
              >
                Services
              </a>
              <a
                href="/contact"
                className="text-gray-600 dark:text-gray-300 hover:text-[#0927EB] dark:hover:text-white px-3 py-2 text-sm font-medium"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Auth Buttons and Dark Mode Toggle */}
          <div className="hidden md:flex md:items-center space-x-4">
            <button
              onClick={handleToggleDarkMode}
              className="p-1 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
            >
              {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>

            <a href="/login" className="text-[#0927EB] hover:text-blue-700 px-3 py-2 text-sm font-medium">
              Connexion
            </a>
            <a
              href="/register"
              className="bg-[#0927EB] hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Inscription
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={handleToggleDarkMode}
              className="p-1 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
            >
              {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/home"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#0927EB] dark:hover:text-white"
          >
            Accueil
          </a>
          <a
            href="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#0927EB] dark:hover:text-white"
          >
            À propos
          </a>
          <a
            href="/services"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#0927EB] dark:hover:text-white"
          >
            Services
          </a>
          <a
            href="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#0927EB] dark:hover:text-white"
          >
            Contact
          </a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center px-4 space-x-3">
            <a
              href="/login"
              className="block text-center px-4 py-2 text-base font-medium text-[#0927EB] hover:text-blue-700"
            >
              Connexion
            </a>
            <a
              href="/register"
              className="block text-center px-4 py-2 rounded-md text-base font-medium text-white bg-[#0927EB] hover:bg-blue-700"
            >
              Inscription
            </a>
          </div>
        </div>
      </motion.div>
    </nav>
  )
}
