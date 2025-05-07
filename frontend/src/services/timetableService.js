import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const timetableService = {
  
    getTimetable: () => API.get('/edt'),
    createTimetableEntry: (coursId) => API.post('/edt', { cours_id: coursId }),
    updateTimetableEntry: (id, coursId) => API.put(`/edt/${id}`, { cours_id: coursId }),
    deleteTimetableEntry: (id) => API.delete(`/edt/${id}`),
    getCourses: () => API.get('/courses'),
  };