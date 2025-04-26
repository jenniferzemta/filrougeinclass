// services/coursService.js
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

export const getCourses = async () => {
  try {
    const response = await api.get('/cours');
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const response = await api.post('/cours', courseData);
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

export const updateCourse = async (id, courseData) => {
  try {
    const response = await api.put(`/cours/${id}`, courseData);
    return response.data;
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    await api.delete(`/cours/${id}`);
    return true;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

//sallles
export const getSalles = async () => {
    try {
        const response = await api.get('/salles');
        return response.data;
      } catch (error) {
        console.error('Error fetching salles:', error);
        return [];
      }
  };

  //matieres
export const getMatieres = async () => {
  try {
      const response = await axios.get(`${API_URL}/matieres`);
      return response.data;
    } catch (error) {
      console.error('Error fetching matieres:', error);
      throw error;
    }
};

// user

export const getUsers = async () => {

    try {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
};