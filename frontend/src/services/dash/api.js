import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getEtudiant = (id) => api.get(`/etudiant/${id}`);
export const updateEtudiant = (id, data) => api.put(`/etudiant/${id}`, data);

export default api;
