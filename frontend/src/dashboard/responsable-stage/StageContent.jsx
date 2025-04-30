// import { useState, useEffect, useRef } from 'react';
// import { 
//   PlusIcon,
//   ArrowDownTrayIcon,
//   ChevronUpDownIcon,
//   EyeIcon,
//   EyeSlashIcon,
//   PencilIcon,
//   TrashIcon,
//   XMarkIcon
// } from '@heroicons/react/24/outline';
// import stageService from '../../services/stageService';
// import OffreModal from './OffreModal';

// export default function StageContent({ searchTerm }) {
//   const [offres, setOffres] = useState([]);
//   const [filteredOffres, setFilteredOffres] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);
//   const [currentOffre, setCurrentOffre] = useState(null);
//   const [actionType, setActionType] = useState('add');
//   const [filters, setFilters] = useState({
//     type: 'tous',
//     domaine: 'tous'
//   });
//   const [sortConfig, setSortConfig] = useState({ key: 'date_debut', direction: 'desc' });
//   const [cvPreviewUrl, setCvPreviewUrl] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const previewRef = useRef(null);

//   useEffect(() => {
//     loadOffres();
//   }, []);

//   const loadOffres = async () => {
//     try {
//       setLoading(true);
//       const data = await stageService.getAll();
//       setOffres(data);
//       setFilteredOffres(data);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       console.error('Erreur chargement offres:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let results = [...offres];

//     if (searchTerm) {
//       results = results.filter(offre =>
//         offre.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         offre.entreprise.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         offre.domaine.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     if (filters.type !== 'tous') {
//       results = results.filter(offre => offre.type === filters.type);
//     }

//     if (filters.domaine !== 'tous') {
//       results = results.filter(offre => offre.domaine === filters.domaine);
//     }

//     if (sortConfig.key) {
//       results.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? 1 : -1;
//         }
//         return 0;
//       });
//     }

//     setFilteredOffres(results);
//   }, [offres, searchTerm, filters, sortConfig]);

//   const handleAdd = () => {
//     setCurrentOffre({
//       titre: '',
//       description: '',
//       entreprise: '',
//       logo_entreprise: null,
//       localisation: '',
//       domaine: '',
//       date_debut: '',
//       date_fin: '',
//       type: 'stage',
//       competences_requises: [],
//       avantages: [],
//       contact_email: '',
//       contact_telephone: '',
//       statut: 'actif'
//     });
//     setActionType('add');
//     setIsModalOpen(true);
//   };

//   const handleEdit = (offre) => {
//     setCurrentOffre({
//       ...offre,
//       logo_entreprise: null // Réinitialiser pour éviter les conflits
//     });
//     setActionType('edit');
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (confirm('Voulez-vous vraiment supprimer cette offre ?')) {
//       try {
//         await stageService.delete(id);
//         setOffres(offres.filter(o => o.id !== id));
//       } catch (error) {
//         console.error('Erreur suppression:', error);
//         alert('Erreur lors de la suppression');
//       }
//     }
//   };

//   const handleStatusChange = async (id) => {
//     try {
//       const updatedOffre = await stageService.toggleStatus(id);
//       setOffres(offres.map(o => o.id === id ? updatedOffre : o));
//     } catch (error) {
//       console.error('Erreur changement statut:', error);
//     }
//   };

//   const handleSave = async (offreData) => {
//     try {
//       if (actionType === 'add') {
//         const newOffre = await stageService.create(offreData);
//         setOffres([...offres, newOffre]);
//       } else {
//         const updatedOffre = await stageService.update(currentOffre.id, offreData);
//         setOffres(offres.map(o => o.id === currentOffre.id ? updatedOffre : o));
//       }
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error('Erreur sauvegarde:', error);
//       alert(`Erreur: ${error.message}`);
//     }
//   };

//   const handlePreview = (offre) => {
//     const previewUrl = stageService.generateCVPreview(offre);
//     setCvPreviewUrl(previewUrl);
//     setIsPreviewOpen(true);
//   };

//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const getDomaines = () => {
//     const domaines = new Set(offres.map(o => o.domaine));
//     return ['tous', ...domaines].filter(d => d);
//   };

//   if (loading) return <div className="text-center py-8">Chargement en cours...</div>;
//   if (error) return <div className="text-center py-8 text-red-500">Erreur: {error}</div>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gestion des offres</h1>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             {filteredOffres.length} offre(s) trouvée(s)
//           </p>
//         </div>
        
//         <div className="flex flex-wrap gap-3">
//           <button
//             onClick={handleAdd}
//             className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             <PlusIcon className="h-5 w-5 mr-2" />
//             Nouvelle offre
//           </button>
//         </div>
//       </div>

//       <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Type
//             </label>
//             <select
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
//               value={filters.type}
//               onChange={(e) => setFilters({...filters, type: e.target.value})}
//             >
//               <option value="tous">Tous</option>
//               <option value="stage">Stage</option>
//               <option value="formation">Formation</option>
//             </select>
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//               Domaine
//             </label>
//             <select
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
//               value={filters.domaine}
//               onChange={(e) => setFilters({...filters, domaine: e.target.value})}
//             >
//               {getDomaines().map(domaine => (
//                 <option key={domaine} value={domaine}>
//                   {domaine === 'tous' ? 'Tous domaines' : domaine}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//             <thead className="bg-gray-50 dark:bg-gray-700">
//               <tr>
//                 <th 
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort('titre')}
//                 >
//                   <div className="flex items-center">
//                     Titre
//                     <ChevronUpDownIcon className="ml-1 h-4 w-4" />
//                   </div>
//                 </th>
//                 <th 
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort('entreprise')}
//                 >
//                   <div className="flex items-center">
//                     Entreprise
//                     <ChevronUpDownIcon className="ml-1 h-4 w-4" />
//                   </div>
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Domaine
//                 </th>
//                 <th 
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
//                   onClick={() => handleSort('date_debut')}
//                 >
//                   <div className="flex items-center">
//                     Période
//                     <ChevronUpDownIcon className="ml-1 h-4 w-4" />
//                   </div>
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//               {filteredOffres.length > 0 ? (
//                 filteredOffres.map((offre) => (
//                   <tr key={offre.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="font-medium text-gray-900 dark:text-white">{offre.titre}</div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         {offre.type === 'stage' ? 'Stage' : 'Formation'}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center">
//                         {offre.logo_entreprise && (
//                           <div className="flex-shrink-0 h-10 w-10 mr-3">
//                             <img
//                               className="h-10 w-10 rounded-full object-cover"
//                               src={`/storage/${offre.logo_entreprise}`}
//                               alt="Logo entreprise"
//                             />
//                           </div>
//                         )}
//                         <div className="text-gray-900 dark:text-white">{offre.entreprise}</div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
//                         {offre.domaine}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 dark:text-white">
//                         {new Date(offre.date_debut).toLocaleDateString('fr-FR')}
//                       </div>
//                       <div className="text-sm text-gray-500 dark:text-gray-400">
//                         au {new Date(offre.date_fin).toLocaleDateString('fr-FR')}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleStatusChange(offre.id)}
//                           className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
//                           title={offre.statut === 'actif' ? 'Désactiver' : 'Activer'}
//                         >
//                           {offre.statut === 'actif' ? (
//                             <EyeIcon className="h-5 w-5 text-green-600" />
//                           ) : (
//                             <EyeSlashIcon className="h-5 w-5 text-red-500" />
//                           )}
//                         </button>
//                         <button
//                           onClick={() => handleEdit(offre)}
//                           className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 dark:hover:bg-gray-700"
//                           title="Modifier"
//                         >
//                           <PencilIcon className="h-5 w-5" />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(offre.id)}
//                           className="text-red-600 hover:text-red-800 p-1 rounded-md hover:bg-red-50 dark:hover:bg-gray-700"
//                           title="Supprimer"
//                         >
//                           <TrashIcon className="h-5 w-5" />
//                         </button>
//                         <button
//                           onClick={() => handlePreview(offre)}
//                           className="text-gray-600 hover:text-gray-800 p-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
//                           title="Prévisualiser"
//                         >
//                           <EyeIcon className="h-5 w-5" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
//                     Aucune offre trouvée
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <OffreModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSave={handleSave}
//         offre={currentOffre}
//         actionType={actionType}
//       />

//       {isPreviewOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
//             <div className="flex justify-between items-center border-b p-4 dark:border-gray-700">
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//                 Prévisualisation de l'offre
//               </h2>
//               <button
//                 onClick={() => setIsPreviewOpen(false)}
//                 className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//               >
//                 <XMarkIcon className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="flex-1 overflow-hidden">
//               <iframe 
//                 ref={previewRef}
//                 src={cvPreviewUrl}
//                 className="w-full h-full border-0"
//                 title="CV Preview"
//               />
//             </div>
//             <div className="border-t p-4 dark:border-gray-700 flex justify-end">
//               <button
//                 onClick={() => {
//                   const link = document.createElement('a');
//                   link.href = cvPreviewUrl.replace('data:application/pdf;base64,', 'data:application/octet-stream;base64,');
//                   link.download = `offre-${currentOffre?.titre || ''}.pdf`;
//                   link.click();
//                 }}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
//               >
//                 <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
//                 Télécharger
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


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