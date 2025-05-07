import { useState, useEffect } from "react"
import axios from "axios"
import Sidebar from "../../components/layouts/Sidebar"
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline"

const ProfesseurAdmin = () => {
  // État pour stocker les données des utilisateurs
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  // État pour la pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(10)

  // État pour le modal d'édition/ajout
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // État pour le mode sombre et la barre latérale
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // État pour la recherche
  const [searchTerm, setSearchTerm] = useState("")

  // Couleurs personnalisées selon la demande
  const primaryColor = "#0927eb" // Bleu
  const secondaryColor = "#16A637" // Vert
  const accentColor = "#FB5607" // Orange clair

  // Fonction pour récupérer les utilisateurs depuis l'API
  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:8000/api/users/Enseignant")
      setUsers(response.data.data)
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs:", error)
    } finally {
      setLoading(false)
    }
  }

  // Charger les utilisateurs au montage du composant
  useEffect(() => {
    fetchUsers()
  }, [])

  // Filtrer les utilisateurs en fonction du terme de recherche
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.numero_badge && user.numero_badge.toString().includes(searchTerm)),
  )

  // Logique de pagination
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Gérer l'édition d'un utilisateur
  const handleEdit = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  // Gérer la suppression d'un utilisateur
  const handleDelete = async (userId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${userId}`)
        fetchUsers()
        alert("Utilisateur supprimé avec succès")
      } catch (error) {
        console.error("Erreur lors de la suppression:", error)
      }
    }
  }

  return (
    <div className={`min-h-screen flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      {/* Sidebar (toujours visible sur desktop, cachée sur mobile) */}
      <div
        className={`fixed lg:static z-20 w-64 h-full transition-transform duration-300 ease-in-out 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <Sidebar darkMode={darkMode} />
      </div>

      {/* Overlay pour mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Contenu principal */}
      <div className="flex-1 overflow-x-hidden">
        {/* Navbar */}
        <header className={`sticky top-0 z-10 ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Bouton hamburger (mobile) */}
              <button
                className="lg:hidden p-2 rounded-md focus:outline-none"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>

              {/* Logo */}
              <div className="flex items-center lg:ml-0">
                <span className="ml-3 text-xl font-semibold" style={{ color: primaryColor }}>
                  DASHBOARD
                </span>
              </div>

              {/* Elements côté droit */}
              <div className="flex items-center space-x-4">
                {/* Barre de recherche (masquée sur mobile) */}
                <div className="relative hidden md:block">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className={`pl-10 pr-4 py-2 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} focus:ring-2 focus:outline-none w-64`}
                    style={{ focusRing: primaryColor }}
                  />
                </div>

                {/* Bouton mode sombre */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-full ${darkMode ? "text-yellow-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"}`}
                >
                  {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                </button>

                {/* Notification */}
                <button className={`p-2 rounded-full relative ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}`}>
                  <BellIcon className="h-6 w-6" />
                  <span
                    className="absolute top-0 right-0 h-3 w-3 rounded-full"
                    style={{ backgroundColor: accentColor }}
                  ></span>
                </button>

                {/* Avatar utilisateur */}
                <div className="flex items-center space-x-2">
                  <UserCircleIcon className="h-8 w-8" />
                  <span className="hidden md:inline">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Contenu principal - Tableau des RAs */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
              ENSEIGNANT
            </h1>

          </div>

          {/* Barre de recherche pour mobile et desktop */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Rechercher par nom, email ou numéro de badge..."
                className={`pl-10 pr-4 py-3 rounded-lg border w-full ${darkMode ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"} focus:outline-none`}
                style={{ borderColor: searchTerm ? primaryColor : "" }}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Réinitialiser à la première page lors d'une recherche
                }}
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div
                className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
                style={{ borderColor: primaryColor }}
              ></div>
            </div>
          ) : (
            <>
              {/* Tableau responsive avec des couleurs personnalisées */}
              <div className="overflow-x-auto rounded-lg shadow">
                <table
                  className={`min-w-full divide-y ${darkMode ? "divide-gray-700 bg-gray-800" : "divide-gray-200 bg-white"}`}
                >
                  <thead className={darkMode ? "bg-gray-700" : ""}>
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: primaryColor }}
                      >
                        Nom Complet
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: primaryColor }}
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: primaryColor }}
                      >
                     Matricule
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: primaryColor }}
                      >
                        Département
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                        style={{ color: primaryColor }}
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user, index) => (
                        <tr key={user.id} className={index % 2 === 0 ? (darkMode ? "bg-gray-800" : "bg-gray-50") : ""}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{user.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.matricule}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">{user.department?.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                            {/* Bouton d'édition avec la couleur bleue */}
                            <button
                              className="px-3 py-1 rounded text-white"
                              style={{ backgroundColor: primaryColor }}
                              onClick={() => handleEdit(user)}
                            >
                              Modifier
                            </button>
                            {/* Bouton de suppression avec la couleur orange */}
                            <button
                              className="px-3 py-1 rounded text-white"
                              style={{ backgroundColor: accentColor }}
                              onClick={() => handleDelete(user.id)}
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm">
                          {searchTerm ? "Aucun résultat trouvé pour cette recherche" : "Aucun utilisateur disponible"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination élégante */}
              {filteredUsers.length > 0 && (
                <div className="flex justify-between items-center mt-6 flex-wrap">
                  <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                    Affichage de {indexOfFirstUser + 1} à {Math.min(indexOfLastUser, filteredUsers.length)} sur{" "}
                    {filteredUsers.length} résultats
                  </div>

                  <div className="flex space-x-1">
                    {/* Bouton précédent */}
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"} ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100"}`}
                    >
                      Précédent
                    </button>

                    {/* Numéros de page */}
                    <div className="flex space-x-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Logique pour afficher les pages autour de la page actuelle
                        let pageNum
                        if (totalPages <= 5) {
                          pageNum = i + 1
                        } else if (currentPage <= 3) {
                          pageNum = i + 1
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i
                        } else {
                          pageNum = currentPage - 2 + i
                        }

                        return (
                          <button
                            key={pageNum}
                            onClick={() => paginate(pageNum)}
                            className={`w-8 h-8 flex items-center justify-center rounded ${
                              currentPage === pageNum
                                ? "text-white"
                                : `${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`
                            }`}
                            style={{ backgroundColor: currentPage === pageNum ? primaryColor : "" }}
                          >
                            {pageNum}
                          </button>
                        )
                      })}

                      {/* Afficher des points de suspension si nécessaire */}
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <span className="w-8 h-8 flex items-center justify-center">...</span>
                      )}

                      {/* Toujours afficher la dernière page si on a plus de 5 pages */}
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <button
                          onClick={() => paginate(totalPages)}
                          className={`w-8 h-8 flex items-center justify-center rounded ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
                        >
                          {totalPages}
                        </button>
                      )}
                    </div>

                    {/* Bouton suivant */}
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"} ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100"}`}
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Modal pour ajouter/modifier un utilisateur */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                {/* Overlay de fond */}
                <div className="fixed inset-0 transition-opacity" onClick={() => setIsModalOpen(false)}>
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>

                {/* Modal */}
                <div
                  className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${darkMode ? "bg-gray-800" : "bg-white"}`}
                >
                  <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg leading-6 font-medium" style={{ color: primaryColor }}>
                      {selectedUser ? "Modifier RA" : "Ajouter un RA"}
                    </h3>

                    {/* Ici vous pourriez mettre votre formulaire */}
                    <div className="mt-4">
                      {/* Formulaire à implémenter */}
                      <p className="text-sm text-gray-500">Formulaire d'ajout/modification à implémenter</p>
                    </div>
                  </div>

                  <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm"
                      style={{ backgroundColor: secondaryColor }}
                      onClick={() => {
                        // Logique de soumission ici
                        setIsModalOpen(false)
                      }}
                    >
                      {selectedUser ? "Mettre à jour" : "Ajouter"}
                    </button>
                    <button
                      type="button"
                      className={`mt-3 w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-700 border-gray-300"}`}
                      onClick={() => setIsModalOpen(false)}
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfesseurAdmin;
