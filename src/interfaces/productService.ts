import axios from "axios"
import { Productos } from "@prisma/client"

const API_URL = "http://localhost:3000/productos"

export const obtenerProductos = async (): Promise<Productos[]> =>{
    const response = await axios.get(API_URL)
    return response.data
}

export const crearProducto = async (nuevoProducto: Productos): Promise<Productos> => {
    const response = await axios.post(API_URL, nuevoProducto)
    return response.data
}