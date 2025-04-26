// services/room.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

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

export const salleService = {
  async getAll() {
    try {
      const response = await api.get('/salles');
      return response.data;
    } catch (error) {
      console.error('Error fetching salles:', error);
      return [];
    }
  },

  async create(room) {
    try {
      const payload = {
        nom: room.nom,
       
        type: room.type,
        batiment: room.batiment
      };
      const response = await api.post('/salles', payload);
      return response.data;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error.response?.data || error.message;
    }
  },

  async update(id, room) {
    try {
      const payload = {
        nom: room.nom,
        capacity: room.capacity,
        type: room.type,
        batiment: room.batiment
      };
      const response = await api.put(`/salles/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error('Error updating room:', error);
      throw error.response?.data || error.message;
    }
  },

  async delete(id) {
    try {
      await api.delete(`/salles/${id}`);
    } catch (error) {
      console.error('Error deleting room:', error);
      throw error.response?.data || error.message;
    }
  }
};