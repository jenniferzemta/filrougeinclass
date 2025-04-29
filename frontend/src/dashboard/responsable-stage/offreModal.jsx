// import { XMarkIcon } from "@heroicons/react/24/outline";
// import { useState, useEffect } from "react";

// export default function OffreModal({ isOpen, onClose, onSave, offre, actionType }) {
//   const [formData, setFormData] = useState({
//     titre: "",
//     description: "",
//     entreprise: "",
//     logo_entreprise: null,
//     localisation: "",
//     domaine: "",
//     date_debut: "",
//     date_fin: "",
//     type: "stage",
//     competences_requises: [],
//     avantages: [],
//     contact_email: "",
//     contact_telephone: "",
//     statut: "actif"
//   });

//   const [newCompetence, setNewCompetence] = useState("");
//   const [newAvantage, setNewAvantage] = useState("");
//   const [logoPreview, setLogoPreview] = useState(null);
//   const [formErrors, setFormErrors] = useState({});

//   useEffect(() => {
//     if (offre) {
//       setFormData({
//         ...offre,
//         logo_entreprise: null, // Réinitialiser le fichier
//         competences_requises: offre.competences_requises || [],
//         avantages: offre.avantages || []
//       });
//       if (offre.logo_entreprise) {
//         setLogoPreview(`/storage/${offre.logo_entreprise}`);
//       }
//     }
//   }, [offre]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     // Effacer l'erreur quand l'utilisateur corrige
//     if (formErrors[name]) {
//       setFormErrors(prev => ({ ...prev, [name]: null }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.match('image.*')) {
//         setFormErrors(prev => ({ ...prev, logo_entreprise: "Le fichier doit être une image" }));
//         return;
//       }
//       if (file.size > 2 * 1024 * 1024) {
//         setFormErrors(prev => ({ ...prev, logo_entreprise: "L'image ne doit pas dépasser 2MB" }));
//         return;
//       }
      
//       setFormData(prev => ({ ...prev, logo_entreprise: file }));
//       setLogoPreview(URL.createObjectURL(file));
//       setFormErrors(prev => ({ ...prev, logo_entreprise: null }));
//     }
//   };

//   const addCompetence = () => {
//     if (newCompetence.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         competences_requises: [...prev.competences_requises, newCompetence.trim()]
//       }));
//       setNewCompetence("");
//     }
//   };

//   const removeCompetence = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       competences_requises: prev.competences_requises.filter((_, i) => i !== index)
//     }));
//   };

//   const addAvantage = () => {
//     if (newAvantage.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         avantages: [...prev.avantages, newAvantage.trim()]
//       }));
//       setNewAvantage("");
//     }
//   };

//   const removeAvantage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       avantages: prev.avantages.filter((_, i) => i !== index)
//     }));
//   };

//   const validateForm = () => {
//     const errors = {};
//     let isValid = true;

//     if (!formData.titre.trim()) {
//       errors.titre = "Le titre est obligatoire";
//       isValid = false;
//     }

//     if (!formData.description.trim()) {
//       errors.description = "La description est obligatoire";
//       isValid = false;
//     }

//     if (!formData.entreprise.trim()) {
//       errors.entreprise = "L'entreprise est obligatoire";
//       isValid = false;
//     }

//     if (!formData.localisation.trim()) {
//       errors.localisation = "La localisation est obligatoire";
//       isValid = false;
//     }

//     if (!formData.domaine.trim()) {
//       errors.domaine = "Le domaine est obligatoire";
//       isValid = false;
//     }

//     if (!formData.date_debut) {
//       errors.date_debut = "La date de début est obligatoire";
//       isValid = false;
//     }

//     if (!formData.date_fin) {
//       errors.date_fin = "La date de fin est obligatoire";
//       isValid = false;
//     } else if (new Date(formData.date_fin) <= new Date(formData.date_debut)) {
//       errors.date_fin = "La date de fin doit être après la date de début";
//       isValid = false;
//     }

//     if (!formData.contact_email) {
//       errors.contact_email = "L'email de contact est obligatoire";
//       isValid = false;
//     } else if (!/^\S+@\S+\.\S+$/.test(formData.contact_email)) {
//       errors.contact_email = "Email invalide";
//       isValid = false;
//     }

//     setFormErrors(errors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     const formDataToSend = new FormData();
    
//     // Champs obligatoires
//     formDataToSend.append('titre', formData.titre);
//     formDataToSend.append('description', formData.description);
//     formDataToSend.append('entreprise', formData.entreprise);
//     formDataToSend.append('localisation', formData.localisation);
//     formDataToSend.append('domaine', formData.domaine);
//     formDataToSend.append('date_debut', formData.date_debut);
//     formDataToSend.append('date_fin', formData.date_fin);
//     formDataToSend.append('type', formData.type);
//     formDataToSend.append('contact_email', formData.contact_email);
//     formDataToSend.append('statut', formData.statut);

//     // Champs optionnels
//     if (formData.logo_entreprise) {
//       formDataToSend.append('logo_entreprise', formData.logo_entreprise);
//     }
    
//     if (formData.contact_telephone) {
//       formDataToSend.append('contact_telephone', formData.contact_telephone);
//     }

//     // Tableaux
//     if (formData.competences_requises.length > 0) {
//       formDataToSend.append('competences_requises', JSON.stringify(formData.competences_requises));
//     }

//     if (formData.avantages.length > 0) {
//       formDataToSend.append('avantages', JSON.stringify(formData.avantages));
//     }

//     onSave(formDataToSend);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center border-b p-4 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
//           <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//             {actionType === "add" ? "Ajouter une offre" : "Modifier une offre"}
//           </h2>
//           <button 
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//           >
//             <XMarkIcon className="h-6 w-6" />
//           </button>
//         </div>
        
//         <div className="p-6">
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="md:col-span-2">
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b pb-2">
//                   Informations de base
//                 </h3>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Titre
//                 </label>
//                 <input
//                   type="text"
//                   name="titre"
//                   className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 ${
//                     formErrors.titre ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   value={formData.titre}
//                   onChange={handleChange}
//                 />
//                 {formErrors.titre && <p className="mt-1 text-sm text-red-500">{formErrors.titre}</p>}
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Entreprise
//                 </label>
//                 <input
//                   type="text"
//                   name="entreprise"
//                   className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 ${
//                     formErrors.entreprise ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   value={formData.entreprise}
//                   onChange={handleChange}
//                 />
//                 {formErrors.entreprise && <p className="mt-1 text-sm text-red-500">{formErrors.entreprise}</p>}
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Domaine
//                 </label>
//                 <input
//                   type="text"
//                   name="domaine"
//                   className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 ${
//                     formErrors.domaine ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   value={formData.domaine}
//                   onChange={handleChange}
//                 />
//                 {formErrors.domaine && <p className="mt-1 text-sm text-red-500">{formErrors.domaine}</p>}
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Localisation
//                 </label>
//                 <input
//                   type="text"
//                   name="localisation"
//                   className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 ${
//                     formErrors.localisation ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   value={formData.localisation}
//                   onChange={handleChange}
//                 />
//                 {formErrors.localisation && <p className="mt-1 text-sm text-red-500">{formErrors.localisation}</p>}
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Type
//                 </label>
//                 <select
//                   name="type"
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
//                   value={formData.type}
//                   onChange={handleChange}
//                 >
//                   <option value="stage">stage</option>
//                   <option value="formation">formation</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Statut
//                 </label>
//                 <select
//                   name="statut"
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
//                   value={formData.statut}
//                   onChange={handleChange}
//                 >
//                   <option value="actif">Actif</option>
//                   <option value="inactif">Inactif</option>
//                 </select>
//               </div>
              
//               <div className="md:col-span-2 mt-4">
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b pb-2">
//                   Période
//                 </h3>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Date de début
//                 </label>
//                 <input
//                   type="date"
//                   name="date_debut"
//                   className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 ${
//                     formErrors.date_debut ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   value={formData.date_debut}
//                   onChange={handleChange}
//                 />
//                 {formErrors.date_debut && <p className="mt-1 text-sm text-red-500">{formErrors.date_debut}</p>}
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Date de fin
//                 </label>
//                 <input
//                   type="date"
//                   name="date_fin"
//                   className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 ${
//                     formErrors.date_fin ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   value={formData.date_fin}
//                   onChange={handleChange}
//                   min={formData.date_debut}
//                 />
//                 {formErrors.date_fin && <p className="mt-1 text-sm text-red-500">{formErrors.date_fin}</p>}
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Logo de l'entreprise
//                 </label>
//                 <div className="flex items-center space-x-4">
//                   {logoPreview && (
//                     <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
//                       <img 
//                         src={logoPreview} 
//                         alt="Logo entreprise" 
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   )}
//                   <label className="flex-1">
//                     <div className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer text-center">
//                       {formData.logo_entreprise ? "Changer le logo" : "Choisir un logo"}
//                     </div>
//                     <input
//                       type="file"
//                       className="hidden"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                     />
//                   </label>
//                 </div>
//                 {formErrors.logo_entreprise && <p className="mt-1 text-sm text-red-500">{formErrors.logo_entreprise}</p>}
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   rows={4}
//                   name="description"
//                   className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 ${
//                     formErrors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   value={formData.description}
//                   onChange={handleChange}
//                 />
//                 {formErrors.description && <p className="mt-1 text-sm text-red-500">{formErrors.description}</p>}
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Compétences requises
//                 </label>
//                 <div className="flex mb-2">
//                   <input
//                     type="text"
//                     value={newCompetence}
//                     onChange={(e) => setNewCompetence(e.target.value)}
//                     className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-700"
//                     placeholder="Ajouter une compétence"
//                   />
//                   <button
//                     type="button"
//                     onClick={addCompetence}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
//                   >
//                     Ajouter
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.competences_requises.map((competence, index) => (
//                     <div key={index} className="flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full text-sm">
//                       {competence}
//                       <button
//                         type="button"
//                         onClick={() => removeCompetence(index)}
//                         className="ml-2 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100"
//                       >
//                         <XMarkIcon className="h-4 w-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Avantages
//                 </label>
//                 <div className="flex mb-2">
//                   <input
//                     type="text"
//                     value={newAvantage}
//                     onChange={(e) => setNewAvantage(e.target.value)}
//                     className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-700"
//                     placeholder="Ajouter un avantage"
//                   />
//                   <button
//                     type="button"
//                     onClick={addAvantage}
//                     className="px-4 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-700"
//                   >
//                     Ajouter
//                   </button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {formData.avantages.map((avantage, index) => (
//                     <div key={index} className="flex items-center bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-3 py-1 rounded-full text-sm">
//                       {avantage}
//                       <button
//                         type="button"
//                         onClick={() => removeAvantage(index)}
//                         className="ml-2 text-green-500 dark:text-green-300 hover:text-green-700 dark:hover:text-green-100"
//                       >
//                         <XMarkIcon className="h-4 w-4" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="md:col-span-2 mt-4">
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 border-b pb-2">
//                   Contact
//                 </h3>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Email de contact
//                 </label>
//                 <input
//                   type="email"
//                   name="contact_email"
//                   className={`w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 ${
//                     formErrors.contact_email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
//                   }`}
//                   value={formData.contact_email}
//                   onChange={handleChange}
//                 />
//                 {formErrors.contact_email && <p className="mt-1 text-sm text-red-500">{formErrors.contact_email}</p>}
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                   Téléphone de contact
//                 </label>
//                 <input
//                   type="tel"
//                   name="contact_telephone"
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
//                   value={formData.contact_telephone}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
            
//             <div className="mt-8 flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
//               >
//                 Annuler
//               </button>
//               <button 
//                 type="submit" 
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//               >
//                 {actionType === "add" ? "Créer l'offre" : "Enregistrer les modifications"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function OffreModal({ isOpen, onClose, onSave, offre, actionType }) {
  const [formData, setFormData] = useState({ 
    titre: '', 
    image: null,
    statut: 'actif'
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (offre) {
      setFormData({
        titre: offre.titre,
        image: null,
        statut: offre.statut
      });
      setImagePreview(offre.image_path ? `http://localhost:8000/storage/${offre.image_path}` : null);
    } else {
      setFormData({ titre: '', image: null, statut: 'actif' });
      setImagePreview(null);
    }
  }, [offre]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-xl font-semibold">
            {actionType === 'add' ? 'Ajouter une offre' : 'Modifier une offre'}
          </h2>
          <button onClick={onClose}>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block mb-2 font-medium">Titre *</label>
            <input
              type="text"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-medium">
              {actionType === 'add' ? 'Image *' : 'Nouvelle image'}
            </label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
              accept="image/*"
              required={actionType === 'add'}
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 h-32 object-cover rounded" />
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded"
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