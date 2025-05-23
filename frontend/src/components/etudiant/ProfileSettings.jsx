// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   UserIcon,
//   EnvelopeIcon,
//   PhoneIcon,
//   LockClosedIcon,
//   CameraIcon,
//   ArrowPathIcon,
//   CheckIcon
// } from "@heroicons/react/24/outline";
// import { etudiantService } from "../../services/etudiant/etudiantProfileService";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function ProfileSettings() {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [profileData, setProfileData] = useState({
//     name: "",
//     email: "",
//     matricule: "",
//     telephone: "",
//     filiere: "",
//     niveau_etude: "",
//     adresse: "",
//     photo: null,
//     photoPreview: "/placeholder-user.png",
//   });
//   const [passwordData, setPasswordData] = useState({
//     current_password: "",
//     new_password: "",
//     confirm_password: ""
//   });
//   const navigate = useNavigate();

//   // Charger les données du profil
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const result = await etudiantService.getProfile();
        
//         if (result.success) {
//           const { user, etudiant } = result;
//           setProfileData({
//             name: user.name || "",
//             email: user.email || "",
//             matricule: user.matricule || "",
//             telephone: etudiant?.telephone || "",
//             filiere: etudiant?.filiere || "",
//             niveau_etude: etudiant?.niveau_etude || "",
//             adresse: etudiant?.adresse || "",
//             photo: null,
//             photoPreview: etudiant?.photo || "/placeholder-user.png"
//           });
//         }
//       } catch (error) {
//         toast.error(error.message || "Erreur de chargement du profil");
//         if (error.status === 401) {
//           navigate("/login");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [navigate]);

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePasswordChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfileData(prev => ({
//           ...prev,
//           photo: file,
//           photoPreview: reader.result
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
    
//     try {
//       const formData = new FormData();
//       formData.append('name', profileData.name);
//       formData.append('email', profileData.email);
//       formData.append('telephone', profileData.telephone);
//       formData.append('filiere', profileData.filiere);
//       formData.append('niveau_etude', profileData.niveau_etude);
//       formData.append('adresse', profileData.adresse);

//       if (profileData.photo instanceof File) {
//         formData.append('photo', profileData.photo);
//       }

//       const result = await etudiantService.updateProfile(formData);
//       console.log(result);
      
//       if (result.success) {
//         toast.success(result.message || "Profil mis à jour avec succès");
//         // Mise à jour de la prévisualisation de la photo
//         if (result.data?.etudiant?.photo) {
//           setProfileData(prev => ({
//             ...prev,
//             photoPreview: result.data.etudiant.photo
//           }));
//         }
//       }
//     } catch (error) {
//       console.error("Erreur complète:", error);
//       toast.error(`Échec de la mise à jour: ${error.message}`);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handlePasswordSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
    
//     try {
//       const result = await etudiantService.changePassword(passwordData);
  
//       if (result.success) {
//         toast.success(result.message);
//         setPasswordData({
//           current_password: "",
//           new_password: "",
//           confirm_password: ""
//         });
//       }
//     } catch (error) {
//       console.error("Erreur détaillée:", error);
//       toast.error(error.message || "Erreur lors du changement de mot de passe");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[60vh]">
//         <div className="w-16 h-16 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mb-4"></div>
//         <p className="text-lg text-gray-600">Chargement du profil...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Navigation */}
//         <div className="md:w-64 flex-shrink-0">
//           <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
//             <nav className="p-2">
//               <button
//                 onClick={() => setActiveTab("profile")}
//                 className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 transition-all ${
//                   activeTab === "profile"
//                     ? "bg-blue-100 text-blue-600 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <UserIcon className="h-5 w-5 mr-3" />
//                 <span>Profil</span>
//               </button>
//               <button
//                 onClick={() => setActiveTab("security")}
//                 className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
//                   activeTab === "security"
//                     ? "bg-blue-100 text-blue-600 font-medium"
//                     : "text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 <LockClosedIcon className="h-5 w-5 mr-3" />
//                 <span>Sécurité</span>
//               </button>
//             </nav>
//           </div>
//         </div>

//         {/* Contenu */}
//         <div className="flex-1">
//           <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
//             {/* Onglet Profil */}
//             {activeTab === "profile" && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="p-6"
//               >
//                 <form onSubmit={handleProfileSubmit}>
//                   <h2 className="text-xl font-bold text-gray-900 mb-6">Informations personnelles</h2>

//                   {/* Photo de profil */}
//                   <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
//                     <div className="relative">
//                       <img
//                         src={profileData.photoPreview}
//                         alt="Photo de profil"
//                         className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
//                       />
//                       <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
//                         <CameraIcon className="h-5 w-5" />
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={handlePhotoChange}
//                           className="hidden"
//                         />
//                       </label>
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         {profileData.name}
//                       </h3>
//                       <p className="text-gray-600">{profileData.email}</p>
//                       <p className="text-sm text-gray-500 mt-2">
//                         Formats acceptés: JPEG, PNG (max 2MB)
//                       </p>
//                     </div>
//                   </div>

//                   {/* Formulaire */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={profileData.name}
//                         onChange={handleProfileChange}
//                         className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <EnvelopeIcon className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                           type="email"
//                           name="email"
//                           value={profileData.email}
//                           onChange={handleProfileChange}
//                           className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Matricule</label>
//                       <input
//                         type="text"
//                         name="matricule"
//                         value={profileData.matricule}
//                         onChange={handleProfileChange}
//                         className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600"
//                         disabled
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
//                       <div className="relative">
//                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                           <PhoneIcon className="h-5 w-5 text-gray-400" />
//                         </div>
//                         <input
//                           type="tel"
//                           name="telephone"
//                           value={profileData.telephone}
//                           onChange={handleProfileChange}
//                           className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                           required
//                         />
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Filière</label>
//                       <input
//                         type="text"
//                         name="filiere"
//                         value={profileData.filiere}
//                         onChange={handleProfileChange}
//                         className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
//                       <input
//                         type="text"
//                         name="niveau_etude"
//                         value={profileData.niveau_etude}
//                         onChange={handleProfileChange}
//                         className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                         required
//                       />
//                     </div>
//                     <div className="md:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
//                       <input
//                         type="text"
//                         name="adresse"
//                         value={profileData.adresse}
//                         onChange={handleProfileChange}
//                         className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                       />
//                     </div>
//                   </div>

//                   {/* Boutons d'action */}
//                   <div className="mt-8 flex justify-end space-x-4">
//                     <button
//                       type="submit"
//                       disabled={saving}
//                       className={`px-4 py-2 rounded-lg text-white transition-colors ${
//                         saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//                       }`}
//                     >
//                       {saving ? (
//                         <span className="flex items-center">
//                           <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
//                           Enregistrement...
//                         </span>
//                       ) : (
//                         "Enregistrer les modifications"
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </motion.div>
//             )}

//             {/* Onglet Sécurité */}
//             {activeTab === "security" && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.3 }}
//                 className="p-6"
//               >
//                 <form onSubmit={handlePasswordSubmit}>
//                   <h2 className="text-xl font-bold text-gray-900 mb-6">Sécurité du compte</h2>

//                   <div className="space-y-8">
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <h3 className="text-lg font-medium text-gray-900 mb-4">Changer le mot de passe</h3>
//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Mot de passe actuel
//                           </label>
//                           <input
//                             type="password"
//                             name="current_password"
//                             value={passwordData.current_password}
//                             onChange={handlePasswordChange}
//                             className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                             required
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Nouveau mot de passe
//                           </label>
//                           <input
//                             type="password"
//                             name="new_password"
//                             value={passwordData.new_password}
//                             onChange={handlePasswordChange}
//                             className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                             required
//                             minLength="8"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-1">
//                             Confirmer le nouveau mot de passe
//                           </label>
//                           <input
//                             type="password"
//                             name="confirm_password"
//                             value={passwordData.confirm_password}
//                             onChange={handlePasswordChange}
//                             className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//                             required
//                             minLength="8"
//                           />
//                         </div>
//                         <button
//                           type="submit"
//                           disabled={saving}
//                           className={`px-4 py-2 rounded-lg text-white transition-colors ${
//                             saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
//                           }`}
//                         >
//                           {saving ? (
//                             <span className="flex items-center">
//                               <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
//                               Enregistrement...
//                             </span>
//                           ) : (
//                             "Mettre à jour le mot de passe"
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </form>
//               </motion.div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
















// // import { useState, useEffect } from "react"
// // import { motion } from "framer-motion"
// // import {
// //   UserIcon,
// //   EnvelopeIcon,
// //   PhoneIcon,
// //   LockClosedIcon,
// //   BellIcon,
// //   PaintBrushIcon,
// //   ShieldCheckIcon,
// //   ArrowPathIcon,
// //   CheckIcon,
// //   XMarkIcon,
// //   CameraIcon,
// // } from "@heroicons/react/24/outline"
// // import { etudiantService } from "../../services/etudiant/etudiantProfileService"
// // import { useNavigate } from "react-router-dom"
// // import toast from "react-hot-toast"

// // export default function ProfileSettings() {
// //   const [activeTab, setActiveTab] = useState("profile")
// //   const [loading, setLoading] = useState(true)
// //   const [saving, setSaving] = useState(false)
// //   const [successMessage, setSuccessMessage] = useState("")
// //   const [profileData, setProfileData] = useState({
// //     name: "",
// //     email: "",
// //     matricule: "",
// //     telephone: "",
// //     filiere: "",
// //     niveau_etude: "",
// //     adresse: "",
// //     photo: null,
// //     photoPreview: "/placeholder.svg?height=200&width=200",
// //   })
// //   const [passwordData, setPasswordData] = useState({
// //     current_password: "",
// //     new_password: "",
// //     confirm_password: ""
// //   })
// //   const navigate = useNavigate()

// //   // Charger les données du profil
// //   useEffect(() => {
// //     const fetchProfile = async () => {
// //       try {
// //         const result = await etudiantService.getProfile()
        
// //         if (result.success) {
// //           const { user, etudiant } = result
// //           setProfileData({
// //             name: user.name || "",
// //             email: user.email || "",
// //             matricule: user.matricule || "",
// //             // date_naissance: etudiant?.date_naissance?.split('T')[0] || "",
// //             telephone: etudiant?.telephone || "",
// //             filiere: etudiant?.filiere || "",
// //             niveau_etude: etudiant?.niveau_etude || "",
// //             adresse: etudiant?.adresse || "",
// //             photo: null,
// //             photoPreview: etudiant?.photo || "/placeholder.svg?height=200&width=200"
// //           })
// //         }
// //       } catch (error) {
// //         toast.error(error.message || "Erreur de chargement du profil")
// //         if (error.status === 401) {
// //           navigate("/login")
// //         }
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchProfile()
// //   }, [navigate])

// //   const handleProfileChange = (e) => {
// //     const { name, value } = e.target
// //     setProfileData(prev => ({ ...prev, [name]: value }))
// //   }

// //   const handlePasswordChange = (e) => {
// //     const { name, value } = e.target
// //     setPasswordData(prev => ({ ...prev, [name]: value }))
// //   }

// //   const handlePhotoChange = (e) => {
// //     const file = e.target.files[0]
// //     if (file) {
// //       const reader = new FileReader()
// //       reader.onloadend = () => {
// //         setProfileData(prev => ({
// //           ...prev,
// //           photo: file,
// //           photoPreview: reader.result
// //         }))
// //       }
// //       reader.readAsDataURL(file)
// //     }
// //   }
// //   const handleProfileSubmit = async (e) => {
// //     e.preventDefault();
// //     setSaving(true);
    
// //     try {
// //       // 1. Construction du FormData
// //       const formData = new FormData();
// //       formData.append('name', profileData.name);
// //       formData.append('email', profileData.email);
// //       // formData.append('date_naissance', profileData.date_naissance);
// //       formData.append('telephone', profileData.telephone);
// //       formData.append('filiere', profileData.filiere);
// //       formData.append('niveau_etude', profileData.niveau_etude);
// //       formData.append('adresse', profileData.adresse);
  
// //       if (profileData.photo instanceof File) {
// //         formData.append('photo', profileData.photo);
// //       }
  
// //       // 2. Envoi des données
// //       const result = await etudiantService.updateProfile({
// //         name: profileData.name,
// //         email: profileData.email,
// //         // date_naissance: profileData.date_naissance,
// //         telephone: profileData.telephone,
// //         filiere: profileData.filiere,
// //         niveau_etude: profileData.niveau_etude,
// //         adresse: profileData.adresse,
// //         photo: profileData.photo
// //       });
  
// //       // 3. Vérification approfondie
// //       if (result.success) {
// //         toast.success("Profil mis à jour avec succès");
        
// //         // Rechargement forcé des données
// //         const freshData = await etudiantService.getProfile();
// //         if (freshData.success) {
// //           setProfileData({
// //             ...profileData,
// //             name: freshData.user.name,
// //             email: freshData.user.email,
// //             // date_naissance: freshData.etudiant?.date_naissance?.split('T')[0] || "",
// //             telephone: freshData.etudiant?.telephone || "",
// //             filiere: freshData.etudiant?.filiere || "",
// //             niveau_etude: freshData.etudiant?.niveau_etude || "",
// //             adresse: freshData.etudiant?.adresse || "",
// //             photoPreview: freshData.etudiant?.photo || "/placeholder.svg"
// //           });
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Erreur complète:", error);
// //       toast.error(`Échec de la mise à jour: ${error.message}`);
// //     } finally {
// //       setSaving(false);
// //     }
// //   };
// //   //mdp
// //   const handlePasswordSubmit = async (e) => {
// //     e.preventDefault();
// //     setSaving(true);
    
// //     try {
// //       const result = await etudiantService.changePassword({
// //         current_password: passwordData.current_password,
// //         new_password: passwordData.new_password,
// //         confirm_password: passwordData.confirm_password
// //       });
  
// //       if (result.success) {
// //         toast.success(result.message);
// //         setSuccessMessage(result.message);
// //         setPasswordData({
// //           current_password: "",
// //           new_password: "",
// //           confirm_password: ""
// //         });
// //       }
// //     } catch (error) {
// //       console.error("Erreur détaillée:", error);
// //       if (error.status === 422) {
// //         toast.error("Validation error: " + error.message);
// //       } else {
// //         toast.error(error.message || "Erreur lors du changement de mot de passe");
// //       }
// //     } finally {
// //       setSaving(false);
// //       setTimeout(() => setSuccessMessage(""), 5000);
// //     }
// //   };

// //   const tabs = [
// //     { id: "profile", name: "Profil", icon: <UserIcon className="h-5 w-5" /> },
// //     { id: "security", name: "Sécurité", icon: <LockClosedIcon className="h-5 w-5" /> },
// //     { id: "notifications", name: "Notifications", icon: <BellIcon className="h-5 w-5" /> },
// //     { id: "privacy", name: "Confidentialité", icon: <ShieldCheckIcon className="h-5 w-5" /> },
// //   ]

// //   if (loading) {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-[60vh]">
// //         <div className="w-16 h-16 rounded-full border-4 border-[#0927EB] border-t-transparent animate-spin mb-4"></div>
// //         <p className="text-lg text-gray-600 dark:text-gray-300">Chargement du profil...</p>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //       {/* Header */}
// //       <div className="mb-8">
// //         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
// //           <UserIcon className="h-8 w-8 mr-2 text-[#0927EB]" />
// //           Paramètres
// //         </h1>
// //         <p className="text-gray-600 dark:text-gray-300">Gérez votre profil et vos préférences</p>
// //       </div>

// //       {/* Tabs et contenu */}
// //       <div className="flex flex-col md:flex-row gap-8">
// //         {/* Navigation par onglets */}
// //         <div className="md:w-64 flex-shrink-0">
// //           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
// //             <nav className="p-2">
// //               {tabs.map((tab) => (
// //                 <button
// //                   key={tab.id}
// //                   onClick={() => setActiveTab(tab.id)}
// //                   className={`w-full flex items-center px-4 py-3 rounded-lg mb-1 transition-all duration-200 ${
// //                     activeTab === tab.id
// //                       ? "bg-[#0927EB]/10 text-[#0927EB] dark:bg-[#0927EB]/20 dark:text-white font-medium"
// //                       : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
// //                   }`}
// //                 >
// //                   <span className="mr-3">{tab.icon}</span>
// //                   <span>{tab.name}</span>
// //                   {activeTab === tab.id && (
// //                     <motion.div layoutId="tabIndicator" className="ml-auto h-2 w-2 rounded-full bg-[#0927EB]" />
// //                   )}
// //                 </button>
// //               ))}
// //             </nav>
// //           </div>
// //         </div>

// //         {/* Contenu des onglets */}
// //         <div className="flex-1">
// //           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700">
// //             {/* Onglet Profil */}
// //             {activeTab === "profile" && (
// //               <motion.div
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 transition={{ duration: 0.3 }}
// //                 className="p-6"
// //               >
// //                 <form onSubmit={handleProfileSubmit}>
// //                   <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Informations personnelles</h2>

// //                   {/* Photo de profil */}
// //                   <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
// //                     <div className="relative">
// //                       <img
// //                         src={profileData.photoPreview}
// //                         alt="Photo de profil"
// //                         className="w-32 h-32 rounded-full object-cover border-4 border-[#0927EB]/20"
// //                       />
// //                       <label className="absolute bottom-0 right-0 bg-[#0927EB] text-white p-2 rounded-full hover:bg-[#0927EB]/90 transition-colors cursor-pointer">
// //                         <CameraIcon className="h-5 w-5" />
// //                         <input
// //                           type="file"
// //                           accept="image/*"
// //                           onChange={handlePhotoChange}
// //                           className="hidden"
// //                         />
// //                       </label>
// //                     </div>
// //                     <div>
// //                       <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
// //                         {profileData.name}
// //                       </h3>
// //                       <p className="text-gray-600 dark:text-gray-300">{profileData.email}</p>
// //                       <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
// //                         Ajoutez une photo de profil pour personnaliser votre compte
// //                       </p>
// //                     </div>
// //                   </div>

// //                   {/* Formulaire */}
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nom complet</label>
// //                       <input
// //                         type="text"
// //                         name="name"
// //                         value={profileData.name}
// //                         onChange={handleProfileChange}
// //                         className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
// //                       <div className="relative">
// //                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                           <EnvelopeIcon className="h-5 w-5 text-gray-400" />
// //                         </div>
// //                         <input
// //                           type="email"
// //                           name="email"
// //                           value={profileData.email}
// //                           onChange={handleProfileChange}
// //                           className="w-full pl-10 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
// //                         />
// //                       </div>
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Matricule</label>
// //                       <input
// //                         type="text"
// //                         name="matricule"
// //                         value={profileData.matricule}
// //                         onChange={handleProfileChange}
// //                         className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
// //                         disabled
// //                       />
// //                     </div>
                   
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
// //                       <div className="relative">
// //                         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                           <PhoneIcon className="h-5 w-5 text-gray-400" />
// //                         </div>
// //                         <input
// //                           type="tel"
// //                           name="telephone"
// //                           value={profileData.telephone}
// //                           onChange={handleProfileChange}
// //                           className="w-full pl-10 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
// //                         />
// //                       </div>
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filière</label>
// //                       <input
// //                         type="text"
// //                         name="filiere"
// //                         value={profileData.filiere}
// //                         onChange={handleProfileChange}
// //                         className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Niveau d'étude</label>
// //                       <select
// //                         name="niveau_etude"
// //                         value={profileData.niveau_etude}
// //                         onChange={handleProfileChange}
// //                         className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
// //                       >
// //                         <option value="">Sélectionnez...</option>
// //                         <option value="Licence 1">Licence 1</option>
// //                         <option value="Licence 2">Licence 2</option>
// //                         <option value="Licence 3">Licence 3</option>
// //                         <option value="Master 1">Master 1</option>
// //                         <option value="Master 2">Master 2</option>
// //                       </select>
// //                     </div>
// //                     <div className="md:col-span-2">
// //                       <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresse</label>
// //                       <input
// //                         type="text"
// //                         name="adresse"
// //                         value={profileData.adresse}
// //                         onChange={handleProfileChange}
// //                         className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Message de succès */}
// //                   {successMessage && (
// //                     <motion.div
// //                       initial={{ opacity: 0, y: 10 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg text-green-800 dark:text-green-400 flex items-center"
// //                     >
// //                       <CheckIcon className="h-5 w-5 mr-2" />
// //                       {successMessage}
// //                     </motion.div>
// //                   )}

// //                   {/* Boutons d'action */}
// //                   <div className="mt-8 flex justify-end space-x-4">
// //                     <button
// //                       type="button"
// //                       className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
// //                     >
// //                       Annuler
// //                     </button>
// //                     <button
// //                       type="submit"
// //                       disabled={saving}
// //                       className={`px-4 py-2 rounded-lg text-white transition-colors ${
// //                         saving ? "bg-gray-400" : "bg-[#0927EB] hover:bg-[#0927EB]/90"
// //                       }`}
// //                     >
// //                       {saving ? (
// //                         <span className="flex items-center">
// //                           <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
// //                           Enregistrement...
// //                         </span>
// //                       ) : (
// //                         "Enregistrer"
// //                       )}
// //                     </button>
// //                   </div>
// //                 </form>
// //               </motion.div>
// //             )}

// //             {/* Onglet Sécurité */}
// //             {activeTab === "security" && (
// //               <motion.div
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 transition={{ duration: 0.3 }}
// //                 className="p-6"
// //               >
// //                 <form onSubmit={handlePasswordSubmit}>
// //                   <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Sécurité du compte</h2>

// //                   <div className="space-y-8">
// //                     {/* Changement de mot de passe */}
// //                     <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
// //                       <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Changer le mot de passe</h3>
// //                       <div className="space-y-4">
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
// //                             Mot de passe actuel
// //                           </label>
// //                           <input
// //                             type="password"
// //                             name="current_password"
// //                             value={passwordData.current_password}
// //                             onChange={handlePasswordChange}
// //                             className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
// //                             Nouveau mot de passe
// //                           </label>
// //                           <input
// //                             type="password"
// //                             name="new_password"
// //                             value={passwordData.new_password}
// //                             onChange={handlePasswordChange}
// //                             className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
// //                           />
// //                         </div>
// //                         <div>
// //                           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
// //                             Confirmer le nouveau mot de passe
// //                           </label>
// //                           <input
// //                             type="password"
// //                             name="confirm_password"
// //                             value={passwordData.confirm_password}
// //                             onChange={handlePasswordChange}
// //                             className="w-full px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0927EB] focus:border-transparent transition-all duration-200"
// //                           />
// //                         </div>
// //                         <button
// //                           type="submit"
// //                           disabled={saving}
// //                           className={`px-4 py-2 rounded-lg text-white transition-colors ${
// //                             saving ? "bg-gray-400" : "bg-[#0927EB] hover:bg-[#0927EB]/90"
// //                           }`}
// //                         >
// //                           {saving ? (
// //                             <span className="flex items-center">
// //                               <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
// //                               Enregistrement...
// //                             </span>
// //                           ) : (
// //                             "Mettre à jour le mot de passe"
// //                           )}
// //                         </button>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Message de succès */}
// //                   {successMessage && (
// //                     <motion.div
// //                       initial={{ opacity: 0, y: 10 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900/30 rounded-lg text-green-800 dark:text-green-400 flex items-center"
// //                     >
// //                       <CheckIcon className="h-5 w-5 mr-2" />
// //                       {successMessage}
// //                     </motion.div>
// //                   )}
// //                 </form>
// //               </motion.div>
// //             )}

// //             {/* Onglet Notifications */}
// //             {activeTab === "notifications" && (
// //               <motion.div
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 transition={{ duration: 0.3 }}
// //                 className="p-6"
// //               >
// //                 <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Préférences de notifications</h2>

// //                 <div className="space-y-6">
// //                   <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
// //                     <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Notifications par email</h3>
// //                     <div className="space-y-3">
// //                       <div className="flex items-center justify-between">
// //                         <div>
// //                           <p className="font-medium text-gray-900 dark:text-white">Nouvelles offres de stage</p>
// //                           <p className="text-sm text-gray-500 dark:text-gray-400">
// //                             Recevez un email lorsque de nouvelles offres sont disponibles
// //                           </p>
// //                         </div>
// //                         <label className="relative inline-flex items-center cursor-pointer">
// //                           <input type="checkbox" className="sr-only peer" defaultChecked />
// //                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0927EB]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0927EB]"></div>
// //                         </label>
// //                       </div>
// //                       <div className="flex items-center justify-between">
// //                         <div>
// //                           <p className="font-medium text-gray-900 dark:text-white">Mises à jour de l'emploi du temps</p>
// //                           <p className="text-sm text-gray-500 dark:text-gray-400">
// //                             Recevez un email lorsque votre emploi du temps est modifié
// //                           </p>
// //                         </div>
// //                         <label className="relative inline-flex items-center cursor-pointer">
// //                           <input type="checkbox" className="sr-only peer" defaultChecked />
// //                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0927EB]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0927EB]"></div>
// //                         </label>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="mt-8 flex justify-end">
// //                   <button
// //                     type="button"
// //                     className="px-4 py-2 bg-[#0927EB] text-white rounded-lg hover:bg-[#0927EB]/90 transition-colors"
// //                   >
// //                     Enregistrer les préférences
// //                   </button>
// //                 </div>
// //               </motion.div>
// //             )}

// //             {/* Onglet Confidentialité */}
// //             {activeTab === "privacy" && (
// //               <motion.div
// //                 initial={{ opacity: 0 }}
// //                 animate={{ opacity: 1 }}
// //                 transition={{ duration: 0.3 }}
// //                 className="p-6"
// //               >
// //                 <button
// //                   type="button"
// //                   className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
// //                 >
// //                   Supprimer mon compte
// //                 </button>
// //               </motion.div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
   
    name: '',
    email: '',
    telephone: '',
    filiere: '',
    adresse: '',

  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/api/etudiant/profile/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setStudent(response.data.data);
        setFormData({
          name: response.data.data.name,
        
          email: response.data.data.email,
          telephone: response.data.data.etudiant?.telephone || '',
          filiere: response.data.data.etudiant?.filiere || '',
          adresse: response.data.data.etudiant?.adresse || '',
         
        });
        setLoading(false);
      } catch (err) {
        if (err.response?.status === 404) {
          navigate('/not-found'); // Redirige vers une page 404
        } else {
          setError(err.response?.data?.message || 'Erreur lors du chargement des données');
        }
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id, navigate]);

  // ... (le reste du code reste le même)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/etudiant/profile/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      // Mettre à jour les données affichées
      const updatedStudent = {
        ...student,
        name: formData.name,
        
        email: formData.email,
        etudiant: {
          ...student.etudiant,
          telephone: formData.telephone,
          filiere: formData.filiere,
          adresse: formData.adresse,
          date_naissance: formData.date_naissance
        }
      };
      
      setStudent(updatedStudent);
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  };

  if (loading) return <div className="text-center mt-5">Chargement en cours...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4>Profil Étudiant</h4>
              <button 
                className={`btn ${editMode ? 'btn-secondary' : 'btn-primary'}`}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Annuler' : 'Modifier'}
              </button>
            </div>
            
            <div className="card-body">
              {editMode ? (
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Nom</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                   
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Téléphone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Filière</label>
                    <input
                      type="text"
                      className="form-control"
                      name="filiere"
                      value={formData.filiere}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">Adresse</label>
                    <textarea
                      className="form-control"
                      name="adresse"
                      value={formData.adresse}
                      onChange={handleInputChange}
                    />
                  </div>
                  
              
                  <button type="submit" className="btn btn-success">
                    Enregistrer les modifications
                  </button>
                </form>
              ) : (
                <div>
                  <div className="row mb-3">
                    
                    <div className="col-md-6">
                      {/* <p><strong>Nom:</strong> {student.name}</p> */}
                    </div>
                  </div>
                  
                  <p><strong>Email:</strong> {student.email}</p>
                  <p><strong>Téléphone:</strong> {student.etudiant.telephone}</p>
                  <p><strong>Filière:</strong> {student.etudiant.filiere}</p>
                  <p><strong>Adresse:</strong> {student.etudiant.adresse}</p>
                  {/* <p><strong>Date de naissance:</strong> {new Date(student.etudiant.date_naissance).toLocaleDateString()}</p> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;