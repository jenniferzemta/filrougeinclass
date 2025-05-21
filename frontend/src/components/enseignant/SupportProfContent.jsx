import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {DocumentTextIcon,
  DocumentIcon,
  PlusIcon,
  TrashIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

const SupportProfContent = () => {
  const [supports, setSupports] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    file: null,
    matiere_id: '',
  });

  // Récupérer les supports et matières
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [supportsRes, matieresRes] = await Promise.all([
          axios.get('http://localhost:8000/api/supports'),
          axios.get('http://localhost:8000/api/matieres'), // Assurez-vous d'avoir cette route
        ]);
        setSupports(supportsRes.data);
        setMatieres(matieresRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Gestion du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  // Téléchargement direct du fichier
  const handleDownload = (filePath, fileName) => {
    const link = document.createElement('a');
    link.href = `http://localhost:8000/storage/${filePath}`;
    link.download = fileName || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

   // Pré-remplir le formulaire pour modification
  const handleEdit = (support) => {
    setEditingId(support.id);
    setFormData({
      title: support.title,
      file: null, // On ne pré-remplit pas le fichier
      matiere_id: support.matiere_id,
    });
    setShowModal(true);
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setFormData({ title: '', file: null, matiere_id: '' });
    setEditingId(null);
    setShowModal(false);
  };

 // Soumettre le formulaire (création ou modification)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('matiere_id', formData.matiere_id);
    if (formData.file) {
      data.append('file', formData.file);
    }

    try {
      if (editingId) {
        // Modification
        const response = await axios.put(`http://localhost:8000/api/supports/${editingId}`, data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSupports(supports.map(s => s.id === editingId ? response.data : s));
      } else {
        // Création
        const response = await axios.post('http://localhost:8000/api/supports', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setSupports([...supports, response.data]);
      }
      resetForm();
    } catch (error) {
      console.error('Erreur:', error.response?.data);
    }
  };

// Supprimer un support
const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Êtes-vous certain de vouloir supprimer ce support ?");
  if (!confirmDelete) {
    return; // L'utilisateur a cliqué sur "Annuler", on quitte la fonction
  }

  try {
    await axios.delete(`http://localhost:8000/api/supports/${id}`);
    setSupports(supports.filter(support => support.id !== id));
  } catch (error) {
    console.error('Erreur de suppression :', error);
  }
};
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0927EB]"></div>
      </div>
    );
  }

  return (
    <div className="p-4  md:py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Mes Supports de Cours</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#0927EB] hover:bg-[#0927EB]/90 text-white px-4 py-2 rounded-lg transition"
        >
          <PlusIcon className="h-5 w-5" />
          Ajouter un support
        </button>
      </div>

      {/* Liste des supports */}
       {/* Liste des supports améliorée */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {supports.map((support) => {
          const matiere = matieres.find(m => m.id === support.matiere_id);
          return (
            <div
              key={support.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4">
                {/* En-tête avec icône et titre */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <DocumentTextIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg dark:text-white">{support.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {matiere?.intitule || 'Matière inconnue'}
                    </p>
                  </div>
                </div>

                {/* Aperçu du contenu */}
                <div className="mt-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <iframe 
                    src={`http://localhost:8000/storage/${support.file_path}#view=fitH`}
                    className="w-full h-40 border-0"
                    title={`Aperçu ${support.title}`}
                  >
                    <p>Votre navigateur ne supporte pas les PDF. <a 
                      href={`http://localhost:8000/storage/${support.file_path}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleDownload(support.file_path, support.title);
                      }}
                    >Télécharger le fichier</a></p>
                  </iframe>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => handleDownload(support.file_path, support.title)}
                    className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    Télécharger
                  </button>
                  <button
                    onClick={() => handleEdit(support)}
                    className="p-1 text-gray-500 hover:text-yellow-500 transition"
                    title="Modifier"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(support.id)}
                    className="p-1 text-gray-500 hover:text-red-500 transition"
                    title="Supprimer"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>


      {/* Modal d'ajout */}
    {/* Modal pour ajouter/modifier */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  {editingId ? 'Modifier le support' : 'Ajouter un support'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Titre</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0927EB] focus:border-transparent"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Matière</label>
                  <select
                    name="matiere_id"
                    value={formData.matiere_id}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0927EB] focus:border-transparent"
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

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">
                    Fichier PDF {editingId && '(Laissez vide pour conserver le fichier actuel)'}
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <DocumentIcon className="h-10 w-10 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          {formData.file 
                            ? formData.file.name 
                            : editingId
                              ? 'Cliquez pour changer le fichier'
                              : 'Cliquez pour sélectionner un fichier'}
                        </p>
                      </div>
                      <input
                        type="file"
                        name="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        required={!editingId} // Requis seulement pour la création
                      />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#0927EB] text-white rounded-lg hover:bg-[#0927EB]/90 transition"
                  >
                    {editingId ? 'Mettre à jour' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SupportProfContent;