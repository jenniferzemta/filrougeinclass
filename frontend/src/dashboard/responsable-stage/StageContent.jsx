

import { useState, useEffect } from 'react';
import { PlusIcon, EyeIcon, EyeSlashIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import stageService from '../../services/stageService';
import OffreModal from './OffreModal';

export default function StageContent() {
  const [offres, setOffres] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOffre, setCurrentOffre] = useState(null);
  const [actionType, setActionType] = useState('add');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffres();
  }, []);

  const loadOffres = async () => {
    try {
      setLoading(true);
      const data = await stageService.getAll();
      setOffres(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setCurrentOffre(null);
    setActionType('add');
    setIsModalOpen(true);
  };

  const handleEdit = (offre) => {
    setCurrentOffre(offre);
    setActionType('edit');
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Supprimer cette offre ?')) {
      try {
        await stageService.delete(id);
        setOffres(offres.filter(o => o.id !== id));
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const handleStatusChange = async (id) => {
    try {
      const updatedOffre = await stageService.toggleStatus(id);
      setOffres(offres.map(o => o.id === id ? updatedOffre : o));
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleSave = async (offreData) => {
    try {
      if (actionType === 'add') {
        const newOffre = await stageService.create(offreData);
        setOffres([...offres, newOffre]);
      } else {
        const updatedOffre = await stageService.update(currentOffre.id, offreData);
        setOffres(offres.map(o => o.id === currentOffre.id ? updatedOffre : o));
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
        <h1 className="text-3xl font-bold">Offres de stage</h1>
        <button
          onClick={handleAdd}
          className="flex items-center text-lg px-4 py-2 bg-[#0927EB] text-white rounded"
        >
          <PlusIcon className="h-5  text-white w-5 mr-2" />
          Ajouter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offres.map(offre => (
          <div key={offre.id} className="bg-white rounded-lg shadow-md overflow-hidden ">
            {offre.image_path && (
              <img
                src={`http://localhost:8000/storage/${offre.image_path}`}
                alt={offre.titre}
                className=" w-full h-64 object-center object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">{offre.titre}</h2>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  offre.statut === 'actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {offre.statut}
                </span>
              </div>
              
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleStatusChange(offre.id)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  {offre.statut === 'actif' ? (
                    <EyeIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-red-500" />
                  )}
                </button>
                <button
                  onClick={() => handleEdit(offre)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <PencilIcon className="h-5 w-5 text-blue-500" />
                </button>
                <button
                  onClick={() => handleDelete(offre.id)}
                  className="p-1 rounded hover:bg-gray-100"
                >
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <OffreModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        offre={currentOffre}
        actionType={actionType}
      />
    </div>
  );
}