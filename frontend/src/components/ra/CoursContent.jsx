


import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  AcademicCapIcon,
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  BuildingLibraryIcon,
  CheckIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { getCourses, createCourse, updateCourse, deleteCourse, getSalles, getMatieres, getUsers } from '../../services/coursService';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

export default function CoursContent() {
  const [courses, setCourses] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [salles, setSalles] = useState([]);
  const [enseignants, setEnseignants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState('add');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    matieres_id: '',
    salles_id: '',
    enseignant_id: '',
    periodicite: 'hebdomadaire',
    heure_deb: '',
    heure_fin: '',
    date: '',
    status: ''
  });

  // Charger les données initiales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [coursesData, matieresData, sallesData, usersData] = await Promise.all([
          getCourses(),
          getMatieres(),
          getSalles(),
          getUsers()
          
        ]);
        
        // Filtrer les enseignants parmi les users
        const enseignantsData = usersData.filter(user => user.role === 'Enseignant');
        
        setCourses(coursesData);
        setMatieres(matieresData);
        setSalles(sallesData);
        setEnseignants(enseignantsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrer les cours selon le terme de recherche
  const filteredCourses = courses.filter((course) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (course.matiere?.intitule?.toLowerCase().includes(searchLower)) ||
      (course.salle?.nom?.toLowerCase().includes(searchLower)) ||
      (course.enseignant?.name?.toLowerCase().includes(searchLower))
    );
  });

  // Gérer les changements du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Ouvrir/fermer la modale
  const openModal = (action, course = null) => {
    setModalAction(action);
    if (action === 'edit' && course) {
      setSelectedCourse(course);
      setFormData({
        matieres_id: course.matieres_id,
        salles_id: course.salles_id,
        enseignant_id: course.enseignant_id,
        periodicite: course.periodicite,
        heure_deb: course.heure_deb,
        heure_fin: course.heure_fin,
        date: course.date,
        status: course.status || 'planifié'
      });
    } else {
      setFormData({
        matieres_id: '',
        salles_id: '',
        enseignant_id: '',
        periodicite: 'hebdomadaire',
        heure_deb: '',
        heure_fin: '',
        date: '',
        status: 'planifié'
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCourse(null);
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalAction === 'add') {
        const newCourse = await createCourse(formData);
        setCourses(prev => [...prev, newCourse]);
      } else {
         // Vérifiez que selectedCourse existe et a un ID
        if (!selectedCourse?.id) {
            throw new Error('Aucun cours sélectionné pour modification');
        }
        console.log('ID du cours à modifier:', selectedCourse.id);
        const updatedCourse = await updateCourse(selectedCourse.id, formData);
        setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
        }
        closeModal();
    } catch (err) {
        console.error('Erreur détaillée:', err.response?.data || err.message);
        setError(err.response?.data?.message || err.message || 'Erreur lors de la soumission');
    }
  
  };

  // Supprimer un cours
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      try {
        await deleteCourse(id);
        setCourses(prev => prev.filter(c => c.id !== id));
      } catch (err) {
        console.error('Error deleting course:', err);
        setError(err.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 bg-red-100 text-red-700 rounded-lg">
      Erreur: {error}
      <button onClick={() => setError(null)} className="ml-4 text-red-900 font-bold">×</button>
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Gestion des Cours</h1>
        
        <div className="flex gap-3 w-full md:w-auto">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            onClick={() => openModal('add')}
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">Ajouter un cours</span>
          </button>
          
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md bg-white text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matière</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enseignant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Périodicité</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <BuildingLibraryIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="font-medium text-gray-900">
                        {course.matiere?.intitule || 'Non défini'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <AcademicCapIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-gray-500">
                        {course.salle?.nom || 'Non défini'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-gray-500">
                        {course.enseignant?.name || 'Non défini'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {course.periodicite}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-gray-500">
                        {course.heure_deb} 
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-gray-500">
                        {course.heure_fin}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-gray-500">
                        {new Date(course.date).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${
                      course.status === 'planifié' ? 'bg-blue-100 text-blue-800' :
                      course.status === 'Terminé' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.status === 'planifié' ? (
                        <CalendarIcon className="h-4 w-4 mr-1" />
                      ) : course.status === 'Terminé' ? (
                        <CheckIcon className="h-4 w-4 mr-1" />
                      ) : (
                        <XCircleIcon className="h-4 w-4 mr-1" />
                      )}
                      {course.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-800 mr-3"
                      onClick={() => openModal('edit', course)}
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(course.id)}
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredCourses.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            Aucun cours trouvé
          </div>
        )}
      </div>

      {/* Modale */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={closeModal}></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {modalAction === 'add' ? 'Ajouter un cours' : 'Modifier le cours'}
                  </h3>
                  <button className="text-gray-400 hover:text-gray-500" onClick={closeModal}>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Matière */}
                    <div>
                      <label htmlFor="matieres_id" className="block text-sm font-medium text-gray-700 mb-1">
                        Matière
                      </label>
                      <select
                        id="matieres_id"
                        name="matieres_id"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                        value={formData.matieres_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Sélectionnez une matière</option>
                        {matieres.map((matiere) => (
                          <option key={matiere.id} value={matiere.id}>
                            {matiere.intitule}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Salle */}
                    <div>
                      <label htmlFor="salles_id" className="block text-sm font-medium text-gray-700 mb-1">
                        Salle
                      </label>
                      <select
                        id="salles_id"
                        name="salles_id"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                        value={formData.salles_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Sélectionnez une salle</option>
                        {salles.map((salle) => (
                          <option key={salle.id} value={salle.id}>
                            {salle.nom}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Enseignant */}
                    <div>
                      <label htmlFor="enseignant_id" className="block text-sm font-medium text-gray-700 mb-1">
                        Enseignant
                      </label>
                      <select
                        id="enseignant_id"
                        name="enseignant_id"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                        value={formData.enseignant_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Sélectionnez un enseignant</option>
                        {enseignants.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name} ({user.email})
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Périodicité */}
                    <div>
                      <label htmlFor="periodicite" className="block text-sm font-medium text-gray-700 mb-1">
                        Périodicité
                      </label>
                      <select
                        id="periodicite"
                        name="periodicite"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                        value={formData.periodicite}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="hebdomadaire">Hebdomadaire</option>
                        <option value="bihebdomadaire">Bihebdomadaire</option>
                        <option value="mensuelle">Mensuelle</option>
                        <option value="ponctuelle">Ponctuelle</option>
                      </select>
                    </div>
                    
                    {/* Heure de début */}
                    <div>
                      <label htmlFor="heure_deb" className="block text-sm font-medium text-gray-700 mb-1">
                        Heure de début
                      </label>
                      <input
                        type="time"
                        id="heure_deb"
                        name="heure_deb"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                        value={formData.heure_deb}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    {/* Heure de fin */}
                    <div>
                      <label htmlFor="heure_fin" className="block text-sm font-medium text-gray-700 mb-1">
                        Heure de fin
                      </label>
                      <input
                        type="time"
                        id="heure_fin"
                        name="heure_fin"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                        value={formData.heure_fin}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    {/* Date */}
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  
                    {/* Statut */}
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                        Statut
                      </label>
                      <select
                        id="status"
                        name="status"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="planifié">Planifié</option>
                        <option value="Terminé">Terminé</option>
                        <option value="annulé">Annulé</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      className="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300"
                      onClick={closeModal}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
    </div>
  );
}