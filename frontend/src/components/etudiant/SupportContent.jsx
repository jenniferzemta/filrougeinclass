import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  DocumentIcon,
  ArrowDownTrayIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  FolderIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  DocumentChartBarIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline"

export default function SupportContent() {
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [supports, setSupports] = useState([])

  // Données fictives pour les supports de cours
  const mockSupports = [
    {
      id: 1,
      title: "Introduction à la programmation",
      description: "Bases de la programmation et algorithmes",
      category: "cours",
      type: "pdf",
      date: "2023-09-15",
      size: "2.4 MB",
      downloadCount: 145,
    },
    {
      id: 2,
      title: "Structures de données avancées",
      description: "Arbres, graphes et algorithmes associés",
      category: "cours",
      type: "pdf",
      date: "2023-09-22",
      size: "3.1 MB",
      downloadCount: 98,
    },
    {
      id: 3,
      title: "TP1 - Implémentation d'une liste chaînée",
      description: "Travaux pratiques sur les listes chaînées",
      category: "tp",
      type: "docx",
      date: "2023-09-29",
      size: "1.2 MB",
      downloadCount: 112,
    },
    {
      id: 4,
      title: "Examen blanc - Algorithmique",
      description: "Préparation à l'examen final",
      category: "examen",
      type: "pdf",
      date: "2023-10-05",
      size: "1.8 MB",
      downloadCount: 203,
    },
    {
      id: 5,
      title: "Bases de données relationnelles",
      description: "Concepts fondamentaux et SQL",
      category: "cours",
      type: "pdf",
      date: "2023-10-12",
      size: "4.5 MB",
      downloadCount: 87,
    },
    {
      id: 6,
      title: "TP2 - Requêtes SQL avancées",
      description: "Travaux pratiques sur les jointures et sous-requêtes",
      category: "tp",
      type: "pdf",
      date: "2023-10-19",
      size: "2.1 MB",
      downloadCount: 76,
    },
    {
      id: 7,
      title: "Développement web frontend",
      description: "HTML, CSS et JavaScript",
      category: "cours",
      type: "pdf",
      date: "2023-10-26",
      size: "5.2 MB",
      downloadCount: 134,
    },
    {
      id: 8,
      title: "Correction Examen - Bases de données",
      description: "Solutions et explications",
      category: "examen",
      type: "pdf",
      date: "2023-11-02",
      size: "1.5 MB",
      downloadCount: 189,
    },
  ]

  // Catégories disponibles
  const categories = [
    { id: "all", name: "Tous", icon: <FolderIcon className="h-5 w-5" /> },
    { id: "cours", name: "Cours", icon: <DocumentTextIcon className="h-5 w-5" /> },
    { id: "tp", name: "TP", icon: <DocumentChartBarIcon className="h-5 w-5" /> },
    { id: "examen", name: "Examens", icon: <DocumentCheckIcon className="h-5 w-5" /> },
  ]

  useEffect(() => {
    // Simuler un chargement de données
    const timer = setTimeout(() => {
      setSupports(mockSupports)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const refreshSupports = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }

  // Filtrer les supports en fonction de la recherche et de la catégorie
  const filteredSupports = supports.filter((support) => {
    const matchesSearch =
      support.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      support.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || support.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Fonction pour obtenir l'icône en fonction du type de fichier
  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <DocumentIcon className="h-10 w-10 text-red-500" />
      case "docx":
        return <DocumentIcon className="h-10 w-10 text-blue-500" />
      case "pptx":
        return <DocumentIcon className="h-10 w-10 text-orange-500" />
      default:
        return <DocumentIcon className="h-10 w-10 text-gray-500" />
    }
  }

  // Simuler un téléchargement
  const handleDownload = (id, title) => {
    console.log(`Téléchargement du support: ${title}`)
    // Ici, vous pourriez implémenter la logique réelle de téléchargement
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 rounded-full border-4 border-[#0927EB] border-t-transparent animate-spin mb-4"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Chargement des supports de cours...</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <BookOpenIcon className="h-8 w-8 mr-2 text-[#0927EB]" />
            Supports de cours
          </h1>
          <p className="text-gray-600 dark:text-gray-300">Accédez à tous vos supports de cours, TP et examens</p>
        </div>

        <button
          onClick={refreshSupports}
          className="flex items-center px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-[#0927EB] dark:text-white border border-[#0927EB]/20 dark:border-gray-700 hover:bg-[#0927EB]/5 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          <ArrowPathIcon className={`h-5 w-5 mr-2 ${loading ? "animate-spin" : ""}`} />
          Actualiser
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher un support..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? "bg-[#0927EB] text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Liste des supports */}
      {filteredSupports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSupports.map((support, index) => (
            <motion.div
              key={support.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{getFileIcon(support.type)}</div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#0927EB] dark:group-hover:text-[#0927EB]/80 transition-colors">
                      {support.title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{support.description}</p>
                    <div className="mt-3 flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span className="mr-3">{support.date}</span>
                      <span className="mr-3">{support.size}</span>
                      <span>{support.downloadCount} téléchargements</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => handleDownload(support.id, support.title)}
                    className="w-full flex items-center justify-center px-4 py-2 bg-[#16A637] text-white rounded-lg hover:bg-[#16A637]/90 transition-colors"
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 text-center"
        >
          <DocumentIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun support trouvé</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Aucun support ne correspond à votre recherche. Essayez avec d'autres termes ou catégories.
          </p>
          <button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
            }}
            className="px-6 py-3 bg-[#0927EB] text-white rounded-lg hover:bg-[#0927EB]/90 transition-colors shadow-md hover:shadow-lg"
          >
            Réinitialiser les filtres
          </button>
        </motion.div>
      )}
    </div>
  )
}
