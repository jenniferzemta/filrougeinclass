import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { raProfileService } from '../../services/ra/raService';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Nom requis'),
  email: yup.string().email('Email invalide').required('Email requis'),
  telephone: yup.string(),
  specialite: yup.string(),
  grade: yup.string(),
  adresse: yup.string(),
  date_naissance: yup.date().nullable(),
  bureau: yup.string(),
  photo: yup.mixed()
});

const ProfileRA = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    resolver: yupResolver(schema)
  });

  // Watch photo changes
  const photoFile = watch('photo');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await raProfileService.getProfile();
        setProfile(response.data);
        
        // Préparer les données pour le formulaire
        const formData = {
          ...response.data.user,
          ...response.data.profile
        };
        reset(formData);
        
        // Préparer l'URL de l'image existante
        if (response.data.profile?.photo) {
          const photoUrl = response.data.profile.photo.startsWith('http') 
            ? response.data.profile.photo 
            : `${'http://localhost:8000'}/storage/${response.data.profile.photo}`;
          setPreviewImage(photoUrl);
        }
      } catch (err) {
        setError(err.message || 'Erreur lors du chargement du profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  useEffect(() => {
    if (photoFile && photoFile instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(photoFile);
    }
  }, [photoFile]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');
      
      // Créer FormData pour gérer le fichier image
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'photo' && data[key] instanceof File) {
          formData.append('photo', data[key]);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      const response = await raProfileService.updateProfile(formData);
      setProfile(prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          ...response.data.profile
        },
        user: {
          ...prev.user,
          ...response.data.user
        }
      }));
      
      setSuccess('Profil mis à jour avec succès');
      
      // Réinitialiser le formulaire avec les nouvelles données
      reset({
        ...response.data.user,
        ...response.data.profile
      });
      
    } catch (err) {
      setError(err.message || 'Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !profile) return <div>Chargement...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mon Profil RA</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 mb-4 rounded">{success}</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" encType="multipart/form-data">
        {/* Photo de profil */}
        <div className="flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            {previewImage ? (
              <img 
                src={previewImage}
                alt="Photo de profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Pas de photo
              </div>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Changer la photo
              <input
                type="file"
                accept="image/*"
                {...register('photo')}
                className="mt-1 block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
            </label>
          </div>
        </div>

        {/* Reste du formulaire inchangé */}
        {/* ... */}
         {/* Informations de base */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Nom complet</label>
            <input
              {...register('name')}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full p-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
        </div>

        {/* Informations spécifiques RA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Téléphone</label>
            <input
              {...register('telephone')}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Spécialité</label>
            <input
              {...register('specialite')}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Grade</label>
            <input
              {...register('grade')}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Bureau</label>
            <input
              {...register('bureau')}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Adresse</label>
          <textarea
            {...register('adresse')}
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Date de naissance</label>
          <input
            {...register('date_naissance')}
            type="date"
            className="w-full p-2 border rounded"
          />
        </div>

        
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Enregistrement...' : 'Mettre à jour le profil'}
        </button>
      </form>
    </div>
  );
};

export default ProfileRA;


