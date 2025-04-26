// src/services/matiereService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Remplacez par votre URL Laravel


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('sanctum_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const matiereService = {

 async getMatieres () {
  try {
    const response = await axios.get(`${API_URL}/matieres`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matieres:', error);
    throw error;
  }
},

 async createMatiere (matiereData) {
  try {
    const response = await axios.post(`${API_URL}/matieres`, matiereData);
    return response.data;
  } catch (error) {
    console.error('Error creating matiere:', error);
    throw error;
  }
},


 async updateMatiere (id, matiereData) {
  try {
    const response = await axios.put(`${API_URL}/matieres/${id}`, matiereData);
    return response.data;
  } catch (error) {
    console.error('Error updating matiere:', error);
    throw error;
  }
},

 async deleteMatiere (id)  {
  try {
    await axios.delete(`${API_URL}/matieres/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting matiere:', error);
    throw error;
  }
}

};