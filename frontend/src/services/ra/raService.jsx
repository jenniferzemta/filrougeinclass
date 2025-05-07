import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api'; // Remplacez par votre URL d'API
const token = localStorage.getItem('token');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

export const raProfileService = {
  getProfile: async () => {
    try {
      const response = await api.get('/ra/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur de chargement du profil' };
    }
  },

  updateProfile: async (data) => {
    try {
      const formData = new FormData();
      
      // Ajout des champs
      Object.keys(data).forEach(key => {
        if (key !== 'photo' && data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      // Gestion de la photo
      if (data.photo instanceof File) {
        formData.append('photo', data.photo);
      }

      const response = await api.put('/ra/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur de mise à jour' };
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.post('/ra/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Erreur de changement de mot de passe' };
    }
  }
};