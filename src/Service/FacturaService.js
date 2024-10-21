import axios from 'axios'

const API_URL = 'https://obscure-space-umbrella-97jw76jxjpvvhpp4x-5171.app.github.dev/api/Factura'

export const GetAllFactura = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const GetByFecha = async (FechaInicio, FechaFin) => {
    try {
        const response = await axios.get(`${API_URL}/fecha?FechaInicio=${FechaInicio}&FechaFin=${FechaFin}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const AddFactura = async (factura) => {
    try {
        const response = await axios.post(`${API_URL}`, factura);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};