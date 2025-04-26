import axios from 'axios';

const API_URL = 'http://localhost:8000/api';


// Création d'une instance axios configurée
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token Sanctum si nécessaire
api.interceptors.request.use(config => {
  const token = localStorage.getItem('sanctum_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const departmentService = {
  // recuperer tous les departements et afficher dans 
  async getAll() {
    try {
      const response = await axios.get(`${API_URL}/departments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching departments:', error);
      return [];
    }
  },


 // Créer un département (adapté pour /ra/departments)
 async create(department) {
  try {
    // Transformation des données pour correspondre à votre API
    const payload = {
      name: department.name  // Assurez-vous que c'est 'name' et non 'name'
    };
    const response = await api.post('/departments', payload);
    return response.data;
  } catch (error) {
    console.error('Error creating department:', error);
    throw error.response?.data || error.message;
  }
},

// Modifier un département (adapté pour /ra/departments)
async update(id, department) {
  try {
    const payload = {
      name: department.name  // Assurez-vous que c'est 'name' et non 'name'
    };
    const response = await api.put(`/departments/${id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Error updating department:', error);
    throw error.response?.data || error.message;
  }
},

// Supprimer un département (adapté pour /ra/departments)
async delete(id) {
  try {
    await api.delete(`/departments/${id}`);
  } catch (error) {
    console.error('Error deleting department:', error);
    throw error.response?.data || error.message;
  }
}
};