// src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const userService = {

async getUsers () {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
},


}