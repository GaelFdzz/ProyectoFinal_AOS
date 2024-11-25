import axios from 'axios';

const API_URL = 'http://localhost:3000/carrito';

export const agregarProductoAlCarrito = async (idUsuario: number, idProducto: number, cantidad: number) => {
  try {
    const response = await axios.post(`${API_URL}/${idUsuario}/agregar/${idProducto}`, { cantidad });
    return response.data;
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    throw error;
  }
};
