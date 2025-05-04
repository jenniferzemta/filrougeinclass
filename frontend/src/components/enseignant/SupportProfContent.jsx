import { useState, useEffect } from 'react';
import { PlusIcon, EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon, DocumentArrowUpIcon } from '@heroicons/react/24/outline';
import enseignantService from '../../services/enseignant/enseignantService';
import SupportModal from './SupportForm';

export default function SupportProfContent({ searchTerm }) {
  const [supports, setSupports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSupport, setCurrentSupport] = useState(null);
  const [actionType, setActionType] = useState('add');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSupports();
  }, []);

  const loadSupports = async () => {
    try {
      setLoading(true);
      const data = await enseignantService.getAll();
      setSupports(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSupports = supports.filter(support =>
    support.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    support.matiere.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setCurrentSupport(null);
    setActionType('add');
    setIsModalOpen(true);
  };

  const handleEdit = (support) => {
    setCurrentSupport(support);
    setActionType('edit');
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer ce support ?')) {
      try {
        await enseignantService.delete(id);
        setSupports(supports.filter(s => s.id !== id));
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const handleSave = async (supportData) => {
    try {
      if (actionType === 'add') {
        const newSupport = await enseignantService.create(supportData);
        setSupports([...supports, newSupport]);
      } else {
        const updatedSupport = await enseignantService.update(currentSupport.id, supportData);
        setSupports(supports.map(s => s.id === currentSupport.id ? updatedSupport : s));
      }
      return true;
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  };

  if (loading) return <div className="text-center py-8">Chargement...</div>;

  return (
    <div className="max-w-7xl font-open mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des supports</h1>
        <button
          onClick={handleAdd}
          className="flex items-center text-lg px-4 py-2 bg-[#0927EB] text-white rounded"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSupports.map(support => (
          <div key={support.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-semibold dark:text-white">{support.titre}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {support.matiere.nom}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <a
                  href={`http://localhost:8000/storage/${support.file_path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0927EB] dark:text-blue-400 hover:underline flex items-center"
                >
                  <DocumentArrowUpIcon className="h-5 w-5 mr-1" />
                  Voir le fichier
                </a>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(support)}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <PencilIcon className="h-5 w-5 text-blue-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(support.id)}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SupportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        support={currentSupport}
        actionType={actionType}
      />
    </div>
  );
}