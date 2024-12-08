import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // Cambia si tienes otro dominio o puerto
});

export default api;
