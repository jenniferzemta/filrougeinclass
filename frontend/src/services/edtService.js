import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adaptez selon votre configuration

export const getSchedules = async () => {
    try {
        const response = await axios.get(`${API_URL}/edt`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des emplois du temps", error);
        throw error;
    }
};

export const createSchedule = async (scheduleData) => {
    try {
        const response = await axios.post(`${API_URL}/edt`, scheduleData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la création d'un emploi du temps", error);
        throw error;
    }
};

export const updateSchedule = async (id, scheduleData) => {
    try {
        const response = await axios.put(`${API_URL}/edt/${id}`, scheduleData);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la mise à jour d'un emploi du temps", error);
        throw error;
    }
};

export const deleteSchedule = async (id) => {
    try {
        await axios.delete(`${API_URL}/edt/${id}`);
        return id;
    } catch (error) {
        console.error("Erreur lors de la suppression d'un emploi du temps", error);
        throw error;
    }
};

export const getCourses = async () => {
    try {
        const response = await axios.get(`${API_URL}/courses`);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération des cours", error);
        throw error;
    }
};