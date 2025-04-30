import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { etudiantService } from '../../services/etudiant/etudiantProfileService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Charger le profil au montage
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await etudiantService.getProfile();
        setProfile(result);
        
        // Pré-remplir les champs du formulaire
        if (result.user) {
          setValue('name', result.user.name);
          setValue('email', result.user.email);
          setValue('matricule', result.user.matricule);
        }
        
        if (result.etudiant) {
          setValue('date_naissance', result.etudiant.date_naissance?.split('T')[0]);
          setValue('telephone', result.etudiant.telephone);
          setValue('filiere', result.etudiant.filiere);
          setValue('niveau_etude', result.etudiant.niveau_etude);
          setValue('adresse', result.etudiant.adresse);
          if (result.etudiant.photo) {
            setPhotoPreview(result.etudiant.photo);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Erreur chargement profil:', error);
        toast.error(error.message || 'Erreur de chargement du profil');
        if (error.message.includes('Unauthorized')) {
          navigate('/login');
        }
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [setValue, navigate]);

  // Gestion de la sélection de photo
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue('photo', file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Soumission du formulaire
  const onSubmit = async (data) => {
    console.log('Données à envoyer:', data);
    setIsSubmitting(true);
    
    try {
      // Création du FormData pour gérer les fichiers
      const formData = new FormData();
      
      // Ajout de tous les champs sauf ceux vides
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          formData.append(key, value);
        }
      });

      console.log('Envoi des données...');
      const result = await etudiantService.updateProfile(formData);
      console.log('Réponse du serveur:', result);
      
      toast.success(result.message || 'Profil mis à jour avec succès');
      
      // Mettre à jour l'affichage
      setProfile({
        user: result.user,
        etudiant: result.etudiant
      });
      
      if (result.etudiant?.photo) {
        setPhotoPreview(result.etudiant.photo);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', {
        message: error.message,
        response: error.response?.data,
        stack: error.stack
      });
      toast.error(error.response?.data?.message || 'Erreur lors de la mise à jour');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Chargement du profil...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Paramètres du profil</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section photo */}
        <div className="flex items-center space-x-6">
          <div className="shrink-0">
            <img 
              className="h-24 w-24 object-cover rounded-full border-2 border-gray-300" 
              src={photoPreview || '/default-profile.jpg'} 
              alt="Photo de profil" 
            />
          </div>
          <label className="block">
            <span className="sr-only">Choisir une photo</span>
            <input 
              type="file" 
              accept="image/*"
              onChange={handlePhotoChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </label>
        </div>

        {/* Informations de base */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <input
              type="text"
              {...register('name', { required: 'Ce champ est requis' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              {...register('email', { 
                required: 'Ce champ est requis',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Email invalide'
                }
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Matricule</label>
            <input
              type="text"
              {...register('matricule')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
            <input
              type="date"
              {...register('date_naissance')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              {...register('telephone')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Filière</label>
            <input
              type="text"
              {...register('filiere')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Niveau d'étude</label>
            <select
              {...register('niveau_etude')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Sélectionnez...</option>
              <option value="Licence 1">Licence 1</option>
              <option value="Licence 2">Licence 2</option>
              <option value="Licence 3">Licence 3</option>
              <option value="Master 1">Master 1</option>
              <option value="Master 2">Master 2</option>
            </select>
          </div>
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
          <textarea
            {...register('adresse')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Changement de mot de passe */}
        <div className="space-y-4 border-t pt-4">
          <h3 className="text-lg font-medium">Changer le mot de passe</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe actuel</label>
            <input
              type="password"
              {...register('current_password')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
              <input
                type="password"
                {...register('new_password')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
              <input
                type="password"
                {...register('confirm_password', {
                  validate: (value) => 
                    value === getValues('new_password') || 'Les mots de passe ne correspondent pas'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
              {errors.confirm_password && (
                <p className="mt-1 text-sm text-red-600">{errors.confirm_password.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bouton de soumission */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enregistrement...
              </>
            ) : 'Enregistrer les modifications'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;