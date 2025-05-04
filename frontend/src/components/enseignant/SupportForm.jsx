import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import enseignantService from '../../services/enseignant/enseignantService';
export default function SupportModal({ isOpen, onClose, onSave, support, actionType }) {
  const [formData, setFormData] = useState({ 
    titre: '',
    matiere_id: '',
    file_path: null,
   
  });
  const [matieres, setMatieres] = useState([]);
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    const loadMatieres = async () => {
      try {
        const data = await enseignantService.getMatieres();
        setMatieres(data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    if (isOpen) loadMatieres();
  }, [isOpen]);

  useEffect(() => {
    if (support) {
      setFormData({
        titre: support.titre,
        matiere_id: support.matiere_id,
        file_path: null,
       
      });
      setFilePreview(support.file_path ? `http://localhost:8000/storage/${support.file_path}` : null);
    } else {
      setFormData({ titre: '', matiere_id: '', file_path: null });
      setFilePreview(null);
    }
  }, [support]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, file_path: file });
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold dark:text-white">
            {actionType === 'add' ? 'Ajouter un support' : 'Modifier un support'}
          </h2>
          <button onClick={onClose} className="dark:text-white">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block mb-2 font-medium dark:text-white">Titre *</label>
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium dark:text-white">Matière *</label>
            <select
              name="matiere_id"
              value={formData.matiere_id}
              onChange={handleChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">Sélectionner une matière</option>
              {matieres.map(matiere => (
                <option key={matiere.id} value={matiere.id}>
                  {matiere.nom}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium dark:text-white">
              {actionType === 'add' ? 'Fichier ' : 'Nouveau fichier'}
            </label>
            <input
              type="file"
              name="file_path"
              onChange={handleFileChange}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              required={actionType === 'add'}
            />
            {filePreview && (
              <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                Fichier actuel : {support?.file_path}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded dark:border-gray-600 dark:text-white"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {actionType === 'add' ? 'Ajouter' : 'Modifier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
