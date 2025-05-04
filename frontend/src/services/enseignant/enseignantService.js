const API_URL = 'http://localhost:8000/api';

export default {
  async getAll() {
    const response = await fetch(`${API_URL}/supports`);
    return await response.json();
  },

  async getMatieres() {
    const response = await fetch(`${API_URL}/matieres`);
    return await response.json();
  },

  async create(formData) {
    const data = new FormData();
    data.append('titre', formData.titre);
    data.append('matiere_id', formData.matiere_id);
    data.append('file_path', formData.fichier);
   

    const response = await fetch(`${API_URL}/supports`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: data
    });
    return await response.json();
  },

  async update(id, formData) {
    const data = new FormData();
    data.append('titre', formData.titre);
    data.append('matiere_id', formData.matiere_id);
    if (formData.fichier) data.append('file_path', formData.fichier);
  
    data.append('_method', 'PUT');

    const response = await fetch(`${API_URL}/supports/${id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: data
    });
    return await response.json();
  },

  async delete(id) {
    await fetch(`${API_URL}/supports/${id}`, {
      method: 'DELETE'
    });
  },

};