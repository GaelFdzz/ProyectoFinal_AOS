import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface Producto {
  Id_Producto: number;
  Nombre: string;
  Descripcion: string;
  Precio: number;
  Stock: number;
  Imagen?: string;
  Cantidad?: number;
}

interface CarritoContextType {
  productos: Producto[];
  agregarAlCarrito: (producto: Producto) => void;
  vaciarCarrito: () => void;
  eliminarDelCarrito: (Id_Producto: number) => void;
  guardarCarritoEnBaseDeDatos: () => Promise<void>;
  cargarCarritoDesdeBaseDeDatos: () => Promise<void>;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

export const CarritoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const token = localStorage.getItem('access_token');
  const userId = token ? jwtDecode<any>(token).sub : null;

  const cargarCarritoDesdeBaseDeDatos = async () => {
    if (!userId) {
      console.error('No hay usuario autenticado');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/carrito/${userId}`);
      if (response.ok) {
        const carrito = await response.json();
        const productosCarrito = carrito.detalles_carrito.map((detalle: any) => ({
          ...detalle.productos,
          Cantidad: detalle.Cantidad,
          Precio: detalle.Precio,
        }));
        setProductos(productosCarrito);
      } else {
        console.error('Error al cargar el carrito:', await response.text());
      }
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
    }
  };

  const guardarCarritoEnBaseDeDatos = async () => {
    if (!userId) {
      console.error('No hay usuario autenticado');
      return;
    }

    // Validar que todos los productos tengan los campos necesarios
    const productosAEnviar = productos.map((producto) => ({
      Id_Producto: producto.Id_Producto,
      Cantidad: producto.Cantidad || 1, // Default a 1 si no está definido
      Precio: producto.Precio || 0,    // Default a 0 si no está definido
    }));

    // Validar que los productos tengan un formato válido
    const productosInvalidos = productosAEnviar.filter(
      (producto) => !producto.Id_Producto || producto.Precio === null
    );

    if (productosInvalidos.length > 0) {
      console.error('Hay productos inválidos en el carrito:', productosInvalidos);
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/carrito/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productos: productosAEnviar }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar el carrito en la base de datos');
      }

      const data = await response.json();
      console.log('Carrito guardado correctamente', data);
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
    }
  };


  const agregarAlCarrito = (producto: Producto) => {
    setProductos((prevProductos) => {
      const productoExistente = prevProductos.find((p) => p.Id_Producto === producto.Id_Producto);
      if (productoExistente) {
        return prevProductos.map((p) =>
          p.Id_Producto === producto.Id_Producto
            ? { ...p, Cantidad: (p.Cantidad || 0) + 1 }
            : p
        );
      } else {
        return [...prevProductos, { ...producto, Cantidad: 1 }];
      }
    });
    guardarCarritoEnBaseDeDatos(); // Guardar en base de datos inmediatamente
  };

  const vaciarCarrito = () => {
    setProductos([]);
    guardarCarritoEnBaseDeDatos();
  };

  const eliminarDelCarrito = async (Id_Producto: number) => {
    if (!userId) {
      console.error('No hay usuario autenticado');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/carrito/${userId}/productos/${Id_Producto}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        setProductos((prevProductos) =>
          prevProductos.filter((producto) => producto.Id_Producto !== Id_Producto)
        );
      } else {
        console.error('Error al eliminar producto:', await response.text());
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      cargarCarritoDesdeBaseDeDatos(); // Cargar el carrito cuando el usuario se haya autenticado
    }
  }, [userId]);

  return (
    <CarritoContext.Provider
      value={{
        productos,
        agregarAlCarrito,
        vaciarCarrito,
        guardarCarritoEnBaseDeDatos,
        cargarCarritoDesdeBaseDeDatos,
        eliminarDelCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};