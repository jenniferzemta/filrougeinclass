import axios from 'axios';

const API_URL = 'http://localhost:8000/api/offres';

export default {
  getActiveOffers: async (lastChecked = null) => {
    const params = lastChecked ? { last_checked: lastChecked } : {};
    const response = await axios.get(API_URL, { params });
    return response.data;
  },

  downloadImage: async (id) => {
    const response = await axios.get(`${API_URL}/${id}/download`, {
      responseType: 'blob'
    });
    return response.data;
  }
};