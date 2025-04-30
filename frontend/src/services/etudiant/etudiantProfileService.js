import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json'
  }
});

// Intercepteur pour le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const etudiantService = {
  async getProfile() {
    try {
      const response = await api.get('/etudiant/profile');
      return {
        success: true,
        user: response.data.user,
        etudiant: response.data.etudiant
      };
    } catch (error) {
      throw this.handleError(error);
    }
  },
//update
async updateProfile(profileData) {
    try {
      const formData = new FormData();
      
      // Construction MANUELLE du FormData
      formData.append('name', profileData.name || '');
      formData.append('email', profileData.email || '');
      formData.append('date_naissance', profileData.date_naissance || '');
      formData.append('telephone', profileData.telephone || '');
      formData.append('filiere', profileData.filiere || '');
      formData.append('niveau_etude', profileData.niveau_etude || '');
      formData.append('adresse', profileData.adresse || '');
  
      // Gestion spécifique de la photo
      if (profileData.photo instanceof File) {
        formData.append('photo', profileData.photo);
      } else if (typeof profileData.photo === 'string') {
        // Si c'est une URL (photo existante), ne rien envoyer
      }
  
      // DEBUG: Afficher le contenu de FormData
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      const response = await api.put('/etudiant/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      return {
        success: true,
        data: response.data,
        message: response.data.message || 'Profil mis à jour'
      };
    } catch (error) {
      console.error("Erreur détaillée:", error.response?.data || error);
      throw this.handleError(error);
    }
  },

  async changePassword(passwordData) {
    try {
      // Correction des noms de champs pour correspondre au backend
      const response = await api.post('/etudiant/profile', {
        current_password: passwordData.current_password, // Avant: currentPassword
        new_password: passwordData.new_password,       // Avant: newPassword
        confirm_password: passwordData.confirm_password // Avant: confirmPassword
      });

      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      throw this.handleError(error);
    }
  },

  handleError(error) {
    if (error.response?.data?.errors) {
      const errors = Object.values(error.response.data.errors).flat();
      return { 
        message: errors.join('\n'), 
        errors: error.response.data.errors,
        status: error.response.status 
      };
    }
    return { 
      message: error.response?.data?.message || 'Une erreur est survenue',
      status: error.response?.status 
    };
  }
};