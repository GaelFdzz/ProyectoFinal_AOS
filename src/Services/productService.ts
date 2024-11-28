import axios from "axios"
import { Producto } from "../interfaces/producto"

const API_URL = "http://localhost:3000/productos"

export const obtenerProductos = async (): Promise<Producto[]> =>{
    const response = await axios.get(API_URL)
    return response.data
}

export const crearProducto = async (nuevoProducto: Producto): Promise<Producto> => {
    const response = await axios.post(API_URL, nuevoProducto)
    return response.data
}