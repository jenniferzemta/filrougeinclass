import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adaptez selon votre configuration

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
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
  /**
   * Récupère les informations d'un étudiant
   * @param {number} id - L'ID de l'étudiant
   */
  async getEtudiant(id) {
    try {
      const response = await api.get(`/etudiant/profile/${id}`);
      return {
        success: true,
        user: response.data.data,
        etudiant: response.data.data.etudiant
      };
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Met à jour les informations d'un étudiant
   * @param {number} id - L'ID de l'étudiant
   * @param {object} formData - Les données à mettre à jour
   */
  async updateEtudiant(id, formData) {
    try {
      const response = await api.put(`/etudiant/profile/${id}`, formData);
      return {
        success: true,
        user: response.data.data.user,
        etudiant: response.data.data.etudiant,
        message: response.data.message
      };
    } catch (error) {
      throw this.handleError(error);
    }
  },

  /**
   * Gère les erreurs de l'API
   * @param {object} error - L'erreur retournée par axios
   */
  handleError(error) {
    if (error.response?.data?.errors) {
      const errors = Object.values(error.response.data.errors).flat();
      return { 
        success: false,
        message: errors.join('\n'), 
        errors: error.response.data.errors,
        status: error.response.status 
      };
    }
    
    return { 
      success: false,
      message: error.response?.data?.message || 'Une erreur est survenue',
      status: error.response?.status || 500
    };
  }
};