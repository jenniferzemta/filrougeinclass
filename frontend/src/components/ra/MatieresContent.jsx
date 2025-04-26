// src/components/ra/MatiereContent.js
import { useState, useEffect } from 'react';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { matiereService } from "../../services/matiereService";
import { departmentService } from '../../services/department';

export default function MatieresContent() {
  const [matieres, setMatieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [selectedMatiere, setSelectedMatiere] = useState(null);
  const [formData, setFormData] = useState({
    intitule: '',
    code: '',
    credits: '',
    department_id: '',
  });
  const [departments, setDepartments]=useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);

  //charger les departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await departmentService.getAll();
        setDepartments(data);
      } catch (error) {
        toast.error('Erreur lors du chargement des départements');
      } finally {
        setLoadingDepartments(false);
      }
    };
    
    fetchDepartments();
  }, []);

  // Charger les matières au montage du composant
  useEffect(() => {
    const fetchMatieres = async () => {
      try {
        const data = await matiereService.getMatieres();
        setMatieres(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchMatieres();
  }, []);

  // Filtrer les matières selon le terme de recherche
  const filteredMatieres = matieres.filter((matiere) =>
    matiere.intitule.toLowerCase().includes(searchTerm.toLowerCase()) ||
    matiere.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Gérer les changements du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Ouvrir la modale pour ajouter ou modifier
  const openModal = (action, matiere = null) => {
    setModalAction(action);
    if (action === 'edit' && matiere) {
      setSelectedMatiere(matiere);
      setFormData({
        intitule: matiere.intitule,
        code: matiere.code,
        credits: matiere.credits,
        department_id: matiere.department_id,
      });
    } else {
      setFormData({
        intitule: '',
        code: '',
        credits: '',
        department_id: '',
      });
    }
    setShowModal(true);
  };

  // Fermer la modale
  const closeModal = () => {
    setShowModal(false);
    setSelectedMatiere(null);
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalAction === 'add') {
        const newMatiere = await matiereService.createMatiere(formData);
        setMatieres([...matieres, newMatiere.data]);
      } else {
        const updatedMatiere = await matiereService.updateMatiere(selectedMatiere.id, formData);
        setMatieres(matieres.map(m => m.id === updatedMatiere.id ? updatedMatiere : m));
      }
      closeModal();
    } catch (err) {
      console.error('Error submitting matiere:', err);
    }
  };

  // Supprimer une matière
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette matière ?')) {
      try {
        await matiereService.deleteMatiere(id);
        setMatieres(matieres.filter(m => m.id !== id));
      } catch (err) {
        console.error('Error deleting matiere:', err);
      }
    }
  };

  if (loading) return <div>Chargement...</div>;

  // Si erreur
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-md">
        {error}
        <button 
          onClick={setMatieres}
          className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Matières</h1>
        <button
          className="px-4 py-2 bg-[#0927EB] text-white rounded-md hover:bg-[#0927EB]/90 flex items-center"
          onClick={() => openModal('add')}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter une matière
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une matière..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Intitulé
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Crédits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredMatieres.map((matiere) => (
                <tr key={matiere.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 dark:text-white">{matiere.intitule}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                    {matiere.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-300">
                    {matiere.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#0927EB]/10 text-[#0927EB]">
                      {matiere.department?.name || 'Non attribué'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-[#0927EB] dark:text-blue-400 hover:text-[#0927EB]/80 dark:hover:text-blue-300 mr-3"
                      onClick={() => openModal('edit', matiere)}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="text-[#FD6E47] dark:text-red-400 hover:text-[#FD6E47]/80 dark:hover:text-red-300"
                      onClick={() => handleDelete(matiere.id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMatieres.length === 0 && (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">Aucune matière trouvée</div>
        )}
      </div>

      {/* Modale pour ajouter/modifier une matière */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={closeModal}>
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div
              className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {modalAction === 'add' ? 'Ajouter une matière' : 'Modifier la matière'}
                  </h3>
                  <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" onClick={closeModal}>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="intitule" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Intitulé
                    </label>
                    <input
                      type="text"
                      id="intitule"
                      name="intitule"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={formData.intitule}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Code
                    </label>
                    <input
                      type="text"
                      id="code"
                      name="code"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={formData.code}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="credits" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Crédits
                    </label>
                    <input
                      type="number"
                      id="credits"
                      name="credits"
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={formData.credits}
                      onChange={handleInputChange}
                      required
                      />
                  </div>
                  
                 {/* department */}
                            {/* Sélecteur des départements */}
              <div>
                <label htmlFor="department_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Département
                </label>
                <select
                  id="department_id"
                  name="department_id"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={formData.department_id}
                  onChange={handleInputChange}
                  required
                  disabled={loadingDepartments}
                >
                  <option value="">Sélectionnez un département</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {loadingDepartments && (
                  <p className="mt-1 text-sm text-gray-500">Chargement des départements...</p>
                )}
              </div>
                              
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
                      onClick={closeModal}
                    >
                      Annuler
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-[#0927EB] text-white rounded-md hover:bg-[#0927EB]/90"
                    >
                      {modalAction === 'add' ? 'Ajouter' : 'Enregistrer'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}