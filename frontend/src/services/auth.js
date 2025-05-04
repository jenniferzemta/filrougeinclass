import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Configuration Axios globale
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

export const authService = {
  /**
   * Enregistre un nouvel utilisateur
   * @param {Object} userData - Données utilisateur
   * @returns {Promise} Réponse de l'API
   */
  async register(userData) {
    try {
      // Formatage des données pour l'API
      const payload = {
        nom: userData.nom,
        prenom: userData.prenom,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.confirmPassword,
        role: userData.role,
        department_id: 1, // À adapter selon votre logique
        ...(userData.role === 'Etudiant' && { matricule: userData.matriculeEtudiant }),
        ...(userData.role === 'Enseignant' && { matricule: userData.matriculeEnseignant }),
        ...(['ra', 'rs'].includes(userData.role) && { numero_badge: userData.numeroBadge })
      };

      const response = await axios.post(`${API_URL}/register`, payload);
      console.log('Réponse API:', response.data);

      // if (response.data.token) {
      //   localStorage.setItem('token', response.data.token);
        return {
          success: true,
          user: response.data.user,
          message: 'Inscription réussie'
        };
      }
  //  } 
    catch (error) {
      throw this.handleError(error);
    }
  },


// login
async login(credentials) {
  try {
    const response = await api.post('/login', credentials); // Utilise l'instance api configurée
    
    // Stockage des informations
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return {
      success: true,
      message: response.data.message,
      user: response.data.user,
      token: response.data.token,
      department: response.data.department
    };
  } catch (error) {
    throw this.handleError(error);
  }
},

  
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Gère les erreurs API de manière cohérente
   * @param {Error} error - Erreur à traiter
   * @returns {Object} Erreur formatée
   */
  handleError(error) {
    if (error.response?.data?.errors) {
      const errors = Object.values(error.response.data.errors).flat();
      return { message: errors.join('\n'), errors: error.response.data.errors };
    }
    return { message: error.response?.data?.message || 'Une erreur est survenue' };
  }
};


// Déconnexion
export const logout = async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      await axios.post(`${API_URL}/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Exemple de fonction pour récupérer les départements
export const getDepartments = async () => {
  const response = await fetch('/api/departments'); // Remplace par ton API
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des départements');
  }
  return response.json();

};
// stats dashborad
export default {
  getStats: () => api.get('/stats'),
  getUsers: (role, page = 1) => api.get(`/users?role=${role}&page=${page}`),
  deleteUser: (id) => api.delete(`/users/${id}`),
  login: (credentials) => api.post('/login', credentials)

};