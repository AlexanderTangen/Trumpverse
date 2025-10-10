import axios from 'axios';

const API_URL = 'http://localhost:5259/api'; 

export const getTrumpMerch = async () => {
    try {
        const response = await axios.get(`${API_URL}/TrumpMerch`);
        return response.data;
    } catch (error) {
        console.error('Error fetching TrumpMerch', error);
        throw error;
    }
};

export const getTrumpMerchById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/TrumpMerch/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching TrumpMerch by ID', error);
        throw error;
    }
};

export const createTrumpMerch = async (newMerch) => {
    try {
        const response = await axios.post(`${API_URL}/TrumpMerch`, newMerch);
        return response.data;
    } catch (error) {
        console.error('Error creating TrumpMerch', error);
        throw error;
    }
};