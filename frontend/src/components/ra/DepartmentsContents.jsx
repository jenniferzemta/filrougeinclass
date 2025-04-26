import { useState, useEffect } from "react";
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { departmentService } from "../../services/department";
import { toast } from 'react-toastify';

export default function DepartmentContents() {
  // États
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalAction, setModalAction] = useState("add");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Charger les départements
  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await departmentService.getAll();
      setDepartments(data);
    } catch (err) {
      console.error("Erreur de chargement:", err);
      setError("Impossible de charger les départements");
    } finally {
      setLoading(false);
    }
  };

  // Ouvrir modal pour ajout/modification
  const openModal = (action, department = null) => {
    setModalAction(action);
    setSelectedDepartment(department);
    setShowModal(true);
  };

  // Fermer modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedDepartment(null);
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const departmentData = {
      name: formData.get('name')
    };

    try {
      setLoading(true);
      if (modalAction === 'add') {
        await departmentService.create(departmentData);
      } else {
        await departmentService.update(selectedDepartment.id, departmentData);
      }
      await loadDepartments();
      closeModal();
    } catch (err) {
      console.error("Erreur:", err);
      setError(`Échec de ${modalAction === 'add' ? 'l\'ajout' : 'la mise à jour'}`);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un département
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await departmentService.delete(id);
      await loadDepartments();
    } catch (err) {
      console.error("Erreur de suppression:", err);
      setError("Échec de la suppression");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setDepartmentToDelete(null);
    }
  };

//   // Ajoutez cette fonction
// const checkDepartmentExists = async (name) => {
//   if (!name) return false;
//   const exists = await departmentService.checkExists(name);
//   return exists;
// };

// // Utilisez un useEffect pour vérifier lors de la saisie
// useEffect(() => {
//   const timer = setTimeout(async () => {
//     if (selectedDepartment?.name !== name) {
//       const exists = await checkDepartmentExists(nameValue);
//       if (exists) {
//         setFormErrors({ name: ['Ce département existe déjà'] });
//       }
//     }
//   }, 500);
  
//   return () => clearTimeout(timer);
// }, [name]);

  // Filtrer les départements
  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Si chargement
  if (loading && departments.length === 0) {
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
          onClick={loadDepartments}
          className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec bouton d'ajout et recherche */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des Départements</h1>
        <button
          onClick={() => openModal('add')}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher un département..."
          className="w-full pl-10 pr-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute left-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Tableau des départements */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDepartments.map((department) => (
              <tr key={department.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {department.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openModal('edit', department)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      setDepartmentToDelete(department);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredDepartments.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            Aucun département trouvé
          </div>
        )}
      </div>

      {/* Modal pour ajout/modification */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {modalAction === 'add' ? 'Ajouter un département' : 'Modifier le département'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du département
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    defaultValue={selectedDepartment?.name || ""}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? 'Envoi...' : modalAction === 'add' ? 'Ajouter' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation pour suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  Confirmer la suppression
                </h3>
                <button 
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDepartmentToDelete(null);
                  }} 
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700">
                  Êtes-vous sûr de vouloir supprimer le département <strong>{departmentToDelete?.name}</strong> ? 
                  Cette action est irréversible.
                </p>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDepartmentToDelete(null);
                  }}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(departmentToDelete.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  disabled={loading}
                >
                  {loading ? 'Suppression...' : 'Confirmer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}