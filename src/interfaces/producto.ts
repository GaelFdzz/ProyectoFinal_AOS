export interface Producto {
    Id_Producto: number;
    Nombre: string;
    Descripcion: string;
    Precio: number;
    Stock: number;
    Imagen?: string | File | null;
    Categoria?: string; // Agregado
}