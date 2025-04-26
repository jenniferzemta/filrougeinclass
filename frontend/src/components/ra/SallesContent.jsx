
// components/RoomsContents.jsx
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { useState, useEffect } from 'react';
import { salleService } from "../../services/salleService";
import { toast } from 'react-toastify';

export default function SallesContent() {
  // États
  const [salles, setSalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalState, setModalState] = useState({
    show: false,
    mode: 'create', // 'create' or 'edit'
    salle: null
  });
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    salle: null
  });
  const [formData, setFormData] = useState({
    nom: '',
    batiment: '',
    type: 'Salle de cours',
  
  });
  const [formErrors, setFormErrors] = useState({});

  // Charger les salles
  useEffect(() => {
    loadSalles();
  }, []);

  const loadSalles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await salleService.getAll();
      setSalles(data);
    } catch (err) {
      console.error("Erreur de chargement:", err);
      setError("Impossible de charger les salles");
      toast.error("Erreur lors du chargement des salles");
    } finally {
      setLoading(false);
    }
  };

  // Ouvrir modal
  const openModal = (mode, salle = null) => {
    setModalState({
      show: true,
      mode,
      salle
    });

    if (mode === 'edit' && salle) {
      setFormData({
        nom: salle.nom,
        batiment: salle.batiment,
        type: salle.type,
     
      });
    } else {
      setFormData({
        nom: '',
        batiment: '',
        type: 'Salle de cours',
       
      });
    }
    setFormErrors({});
  };

  // Fermer modal
  const closeModal = () => {
    setModalState({ show: false, mode: 'create', salle: null });
    setFormErrors({});
  };

  // Gérer les changements de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacite' ? parseInt(value) || 0 : value
    }));
  };

  // Valider le formulaire
  const validateForm = () => {
    const errors = {};
    if (!formData.nom.trim()) errors.nom = 'Le nom est requis';
    if (!formData.batiment.trim()) errors.batiment = 'Le bâtiment est requis';
   
    return errors;
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      setLoading(true);
      if (modalState.mode === 'create') {
        await salleService.create(formData);
        toast.success('Salle créée avec succès');
      } else {
        await salleService.update(modalState.salle.id, formData);
        toast.success('Salle mise à jour avec succès');
      }
      await loadSalles();
      closeModal();
    } catch (err) {
      console.error("Erreur:", err);
      toast.error(`Erreur lors de ${modalState.mode === 'create' ? 'la création' : 'la mise à jour'}`);
      if (err.response?.data?.errors) {
        setFormErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  // Confirmer la suppression
  const confirmDelete = (salle) => {
    setDeleteModal({
      show: true,
      salle
    });
  };

  // Supprimer une salle
  const handleDelete = async () => {
    if (!deleteModal.salle) return;
    
    try {
      setLoading(true);
      await salleService.delete(deleteModal.salle.id);
      toast.success('Salle supprimée avec succès');
      await loadSalles();
    } catch (err) {
      console.error("Erreur de suppression:", err);
      toast.error("Erreur lors de la suppression");
    } finally {
      setLoading(false);
      setDeleteModal({ show: false, salle: null });
    }
  };

  // Filtrer les salles
  const filteredSalles = salles.filter(salle =>
    salle.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salle.batiment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Si chargement initial
  if (loading && salles.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <ArrowPathIcon className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  // Si erreur
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        {error}
        <button 
          onClick={loadSalles}
          className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header avec bouton d'ajout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des Salles</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {salles.length} salles disponibles
          </p>
        </div>
        <button
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2 transition-colors"
          onClick={() => openModal('create')}
        >
          <PlusIcon className="h-5 w-5" />
          Ajouter une salle
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Rechercher une salle..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tableau des salles */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Bâtiment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
              
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredSalles.map((salle) => (
                <tr key={salle.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 dark:text-white">{salle.nom}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                    {salle.batiment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      salle.type === 'Amphithéâtre' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                      salle.type === 'Laboratoire' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {salle.type}
                    </span>
                  </td>
                
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => openModal('edit', salle)}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 p-1 rounded-md hover:bg-indigo-50 dark:hover:bg-gray-700"
                        title="Modifier"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => confirmDelete(salle)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 p-1 rounded-md hover:bg-red-50 dark:hover:bg-gray-700"
                        title="Supprimer"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSalles.length === 0 && (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            {searchTerm ? 'Aucune salle ne correspond à votre recherche' : 'Aucune salle disponible'}
          </div>
        )}
      </div>

      {/* Modal d'ajout/modification */}
      {modalState.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {modalState.mode === 'create' ? 'Ajouter une salle' : 'Modifier la salle'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Nom de la salle 
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      formErrors.nom ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {formErrors.nom && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.nom}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="batiment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bâtiment 
                  </label>
                  <input
                    type="text"
                    id="batiment"
                    name="batiment"
                    required
                    value={formData.batiment}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      formErrors.batiment ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {formErrors.batiment && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.batiment}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type de salle 
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800"
                  >
                    <option value="Salle de cours">Salle de cours</option>
                    <option value="Amphithéâtre">Amphithéâtre</option>
                    <option value="Laboratoire">Laboratoire</option>
                  </select>
                </div>

              

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? (
                      <ArrowPathIcon className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <CheckIcon className="h-4 w-4 mr-2" />
                    )}
                    {modalState.mode === 'create' ? 'Créer' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de suppression */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2" />
                  Confirmer la suppression
                </h2>
                <button
                  onClick={() => setDeleteModal({ show: false, salle: null })}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Êtes-vous sûr de vouloir supprimer la salle <span className="font-semibold">{deleteModal.salle?.nom}</span> ? Cette action est irréversible.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteModal({ show: false, salle: null })}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <ArrowPathIcon className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <TrashIcon className="h-4 w-4 mr-2" />
                  )}
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}