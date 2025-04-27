import { useState, useEffect } from "react";
import { 
  PlusIcon, 
  ArrowDownTrayIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  Bars3Icon,
  FunnelIcon,
  CheckIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import stageService from "../../services/stageService";
// import StageModal from "./StageModal";

export default function StageContent({ searchTerm }) {
  const [offres, setOffres] = useState([]);
  const [filteredOffres, setFilteredOffres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOffre, setCurrentOffre] = useState(null);
  const [actionType, setActionType] = useState("add");
  const [filters, setFilters] = useState({
    statut: "tous",
    type: "tous",
  });

  // Chargement initial des données
  useEffect(() => {
    loadOffres();
  }, []);

  const loadOffres = async () => {
    try {
      const data = await stageService.getAllOffres();
      setOffres(data);
      setFilteredOffres(data);
    } catch (error) {
      console.error("Erreur lors du chargement des offres:", error);
    }
  };

  // Filtrage des offres
  useEffect(() => {
    let result = offres;
    
    if (searchTerm) {
      result = result.filter(offre =>
        offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offre.entreprise.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.statut !== "tous") {
      result = result.filter(offre => offre.statut === filters.statut);
    }

    if (filters.type !== "tous") {
      result = result.filter(offre => offre.type === filters.type);
    }

    setFilteredOffres(result);
  }, [offres, searchTerm, filters]);

  // Actions CRUD
  const handleAdd = () => {
    setCurrentOffre({
      titre: "",
      entreprise: "",
      description: "",
      type: "stage",
      dateDebut: "",
      dateFin: "",
      competences: [],
      avantages: [],
      statut: "actif",
      contact: ""
    });
    setActionType("add");
    setIsModalOpen(true);
  };

  const handleEdit = (offre) => {
    setCurrentOffre({ ...offre });
    setActionType("edit");
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await stageService.deleteOffre(id);
      setOffres(offres.filter(offre => offre.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const toggleStatut = async (id) => {
    try {
      const updatedOffre = await StageService.toggleStatut(id);
      setOffres(offres.map(offre =>
        offre.id === id ? updatedOffre : offre
      ));
    } catch (error) {
      console.error("Erreur lors du changement de statut:", error);
    }
  };

  const handleSave = async (offreData) => {
    try {
      if (actionType === "add") {
        const newOffre = await StageService.createOffre(offreData);
        setOffres([...offres, newOffre]);
      } else {
        const updatedOffre = await StageService.updateOffre(currentOffre.id, offreData);
        setOffres(offres.map(offre => 
          offre.id === currentOffre.id ? updatedOffre : offre
        ));
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
    }
  };

  // Export PDF
  const exportToPDF = async () => {
    try {
      await StageService.exportToPDF(filteredOffres);
    } catch (error) {
      console.error("Erreur lors de l'export PDF:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* En-tête et boutons */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des offres de stage</h1>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-[#0927EB] text-white rounded-lg hover:bg-[#0927EB]/90"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nouvelle offre
          </button>
          
          <button
            onClick={exportToPDF}
            className="flex items-center px-4 py-2 bg-[#16A637] text-white rounded-lg hover:bg-[#16A637]/90"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Exporter PDF
          </button>
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Statut</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={filters.statut}
              onChange={(e) => setFilters({...filters, statut: e.target.value})}
            >
              <option value="tous">Tous</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Type</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="tous">Tous</option>
              <option value="stage">Stage</option>
              <option value="formation">Formation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tableau des offres */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Entreprise</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOffres.length > 0 ? (
                filteredOffres.map((offre) => (
                  <tr key={offre.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 dark:text-white">{offre.titre}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-900 dark:text-white">{offre.entreprise}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        offre.type === "stage" 
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" 
                          : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                      }`}>
                        {offre.type === "stage" ? "Stage" : "Formation"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(offre.dateDebut).toLocaleDateString('fr-FR')} - {new Date(offre.dateFin).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleStatut(offre.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          offre.statut === "actif"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                        }`}
                      >
                        {offre.statut === "actif" ? "Actif" : "Inactif"}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(offre)}
                        className="text-[#0927EB] dark:text-blue-400 hover:text-[#0927EB]/80 dark:hover:text-blue-300 mr-3"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(offre.id)}
                        className="text-[#FD6E47] dark:text-red-400 hover:text-[#FD6E47]/80 dark:hover:text-red-300"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    Aucune offre trouvée
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <StageModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        offre={currentOffre}
        actionType={actionType}
      />
    </div>
  );
}