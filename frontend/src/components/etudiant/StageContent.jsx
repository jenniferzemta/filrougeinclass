import { useState, useEffect } from "react"
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  BellIcon,
  InformationCircleIcon,
  EyeIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline"
import etudiantStageService from "../../services/etudiantStageService"
import { motion } from "framer-motion"
import toast from "react-hot-toast"

export default function StageContent() {
  const [offres, setOffres] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [lastChecked, setLastChecked] = useState(new Date().toISOString())
  const [showNotification, setShowNotification] = useState(false)
  const [selectedOffre, setSelectedOffre] = useState(null)

  useEffect(() => {
    loadOffres()

    const interval = setInterval(() => {
    //  checkNewOffers()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const loadOffres = async () => {
    try {
      setLoading(true)
      setRefreshing(true)
      const data = await etudiantStageService.getActiveOffers()
      setOffres(data)
      //setLastChecked(new Date().toISOString())
     // localStorage.setItem("lastOffersCheck", new Date().toISOString())
      setShowNotification(false)
    } catch (error) {
      console.error("Erreur chargement offres:", error)
      toast.error("Erreur lors du chargement des offres")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

//   const checkNewOffers = async () => {
//     try {
//       const lastCheck = localStorage.getItem("lastOffersCheck") || lastChecked
//       const newOffers = await etudiantStageService.getActiveOffers(lastCheck)

//       if (newOffers.length > 0) {
//         localStorage.setItem("hasNewOffers", "true")
//         setShowNotification(true)
//       }
//     } catch (error) {
//       console.error("Erreur vérification nouvelles offres:", error)
//     }
//   }

  const handleDownload = async (id, titre) => {
    try {
      const blob = await etudiantStageService.downloadImage(id)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `offre-stage-${titre}.jpg`.replace(/\s+/g, "_"))
      document.body.appendChild(link)
      link.click()
      link.remove()

      // Notification de téléchargement
      toast.success(`Offre "${titre}" téléchargée`)
    } catch (error) {
      console.error("Erreur téléchargement:", error)
      toast.error("Erreur lors du téléchargement")
    }
  }

  const openOffreDetails = (offre) => {
    setSelectedOffre(offre)
  }

  const closeOffreDetails = () => {
    setSelectedOffre(null)
  }

  if (loading && offres.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full border-4 border-[#0927EB] border-t-transparent animate-spin mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Chargement des offres...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header avec notification */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <BriefcaseIcon className="h-8 w-8 mr-2 text-[#0927EB]" />
            Offres de stage
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {offres.length} offre{offres.length !== 1 ? "s" : ""} disponible{offres.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center px-3 py-2 bg-[#FD6E47]/10 text-[#FD6E47] rounded-lg border border-[#FD6E47]/20"
            >
              <BellIcon className="h-5 w-5 mr-2 animate-pulse" />
              <span>Nouvelles offres disponibles !</span>
            </motion.div>
          )}

          <button
            onClick={loadOffres}
            disabled={refreshing}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              refreshing
                ? "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                : "bg-white dark:bg-gray-800 text-[#0927EB] dark:text-white border border-[#0927EB]/20 dark:border-gray-700 hover:bg-[#0927EB]/5 dark:hover:bg-gray-700"
            }`}
          >
            <ArrowPathIcon className={`h-5 w-5 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Actualiser
          </button>
        </div>
      </div>

      {/* Liste des offres */}
      {offres.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offres.map((offre, index) => (
            <motion.div
              key={offre.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Image de l'offre */}
              <div className="relative h-48 sm:h-56 w-full overflow-hidden">
                <img
                  src={`http://localhost:8000/storage/${offre.image_path}`}
                  alt={offre.titre}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <button
                    onClick={() => openOffreDetails(offre)}
                    className="flex items-center px-3 py-2 bg-white text-[#0927EB] rounded-lg hover:bg-[#0927EB]/10 transition-colors"
                  >
                    <EyeIcon className="h-5 w-5 mr-2" />
                    Voir
                  </button>
                  <button
                    onClick={() => handleDownload(offre.id, offre.titre)}
                    className="flex items-center px-3 py-2 bg-[#16A637] text-white rounded-lg hover:bg-[#16A637]/90 transition-colors"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Télécharger
                  </button>
                </div>
              </div>

              {/* Contenu de la carte */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#0927EB] dark:group-hover:text-[#0927EB]/80 transition-colors">
                    {offre.titre}
                  </h2>
                </div>

                {offre.domaine && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-[#0927EB]/10 text-[#0927EB] dark:bg-[#0927EB]/20 dark:text-[#0927EB]/80 rounded-full mb-4">
                    {offre.domaine.nom}
                  </span>
                )}

                <div className="flex justify-between items-center mt-4 space-x-2">
                  <button
                    onClick={() => openOffreDetails(offre)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-white text-[#0927EB] border border-[#0927EB] rounded-lg hover:bg-[#0927EB]/5 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <EyeIcon className="h-5 w-5 mr-2" />
                    Voir
                  </button>
                  <button
                    onClick={() => handleDownload(offre.id, offre.titre)}
                    className="flex-1 flex items-center justify-center px-4 py-2 bg-[#16A637] text-white rounded-lg hover:bg-[#16A637]/90 transition-colors"
                  >
                    <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                    Télécharger
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center">
          <InformationCircleIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucune offre disponible</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Aucune offre de stage active pour le moment. Revenez plus tard.
          </p>
          <button
            onClick={loadOffres}
            className="px-6 py-3 bg-[#0927EB] text-white rounded-lg hover:bg-[#0927EB]/90 transition-colors shadow-md hover:shadow-lg"
          >
            <ArrowPathIcon className="h-5 w-5 inline mr-2" />
            Actualiser
          </button>
        </div>
      )}

      {/* Modal de détail d'offre */}
      {selectedOffre && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="relative">
              <img
                src={`http://localhost:8000/storage/${selectedOffre.image_path}`}
                alt={selectedOffre.titre}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={closeOffreDetails}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{selectedOffre.titre}</h2>

              {selectedOffre.domaine && (
                <span className="inline-block px-3 py-1 text-sm font-semibold bg-[#0927EB]/10 text-[#0927EB] dark:bg-[#0927EB]/20 dark:text-[#0927EB]/80 rounded-full mb-4">
                  {selectedOffre.domaine.nom}
                </span>
              )}

              <div className="flex justify-end mt-6 space-x-3">
                <button
                  onClick={closeOffreDetails}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Fermer
                </button>
                <button
                  onClick={() => handleDownload(selectedOffre.id, selectedOffre.titre)}
                  className="px-4 py-2 bg-[#16A637] text-white rounded-lg hover:bg-[#16A637]/90 transition-colors flex items-center"
                >
                  <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                  Télécharger
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
