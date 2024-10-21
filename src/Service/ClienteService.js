import axios from 'axios'

const API_URL = 'https://obscure-space-umbrella-97jw76jxjpvvhpp4x-5171.app.github.dev/api/Cliente'

export const GetAllCliente = async() => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};