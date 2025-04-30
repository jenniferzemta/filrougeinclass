// Dans ton fichier auth.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adapte selon ton URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Intercepteur pour ajouter le token automatiquement
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const etudiantService = {
  /**
   * Récupère le profil étudiant
   */
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

  /**
   * Met à jour le profil étudiant
   */
  async updateProfile(profileData) {
    try {
      // Pour les fichiers (comme la photo), utilise FormData
      const formData = new FormData();
      for (const key in profileData) {
        if (profileData[key] !== undefined && profileData[key] !== null) {
          formData.append(key, profileData[key]);
        }
      }

      const response = await api.put('/etudiant/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Met à jour le localStorage si nécessaire
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return {
        success: true,
        user: response.data.user,
        etudiant: response.data.etudiant,
        message: response.data.message
      };
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Gère les erreurs API de manière cohérente
   */
  handleError(error) {
    if (error.response?.data?.errors) {
      const errors = Object.values(error.response.data.errors).flat();
      return { message: errors.join('\n'), errors: error.response.data.errors };
    }
    return { message: error.response?.data?.message || 'Une erreur est survenue' };
  }
};