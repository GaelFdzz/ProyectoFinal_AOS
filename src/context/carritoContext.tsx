import React, { createContext, useContext, useState } from 'react';

interface Producto {
  Id_Producto: number;
  Nombre: string;
  Descripcion: string;
  Precio: number;
  Stock: number;
  Imagen?: string;
  Cantidad?: number; // Agregar propiedad Cantidad
}

interface CarritoContextType {
  productos: Producto[];
  agregarAlCarrito: (producto: Producto) => void;
  vaciarCarrito: () => void;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [productos, setProductos] = useState<Producto[]>([]);

  const agregarAlCarrito = (producto: Producto) => {
    setProductos((prev) => {
      // Verificar si el producto ya existe en el carrito
      const productoExistente = prev.find((p) => p.Id_Producto === producto.Id_Producto);

      if (productoExistente) {
        // Si existe, aumentamos la cantidad
        return prev.map((p) =>
          p.Id_Producto === producto.Id_Producto
            ? { ...p, Cantidad: (p.Cantidad || 0) + 1 }
            : p
        );
      } else {
        // Si no existe, lo agregamos con cantidad 1
        return [...prev, { ...producto, Cantidad: 1 }];
      }
    });
  };

  const vaciarCarrito = () => {
    setProductos([]);
  };

  return (
    <CarritoContext.Provider value={{ productos, agregarAlCarrito, vaciarCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};
