import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ProductoCarrito {
  Id_Producto: number;
  Nombre: string;
  Descripcion: string;
  Precio: number;
  Cantidad: number;
  Imagen: string;
}

interface CarritoContextType {
  productosEnCarrito: ProductoCarrito[];
  agregarAlCarrito: (producto: ProductoCarrito) => Promise<void>;
  eliminarDelCarrito: (productoId: number) => Promise<void>;
  obtenerCarrito: () => Promise<void>;
  vaciarCarrito: () => Promise<void>;
}

interface CarritoProviderProps {
  userId: number;
  children: ReactNode;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

const CarritoProvider: React.FC<CarritoProviderProps> = ({ children, userId }) => {
  console.log('userId:', userId);
  const [productosEnCarrito, setProductosEnCarrito] = useState<ProductoCarrito[]>([]);

  const fetchData = async (url: string, options?: RequestInit) => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const errorDetails = await response.text();
        console.error(`Error en la solicitud: ${response.statusText}, ${errorDetails}`);
        throw new Error(`Error en la solicitud: ${response.statusText}, ${errorDetails}`);
      }

      if (response.status === 204) {
        return;
      }

      return response.json();
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  };

  const obtenerCarrito = async () => {
    try {
      const data = await fetchData(`http://localhost:3000/cart/${userId}`);
      const detalles = data.detalles_carrito.map((detalle: any) => ({
        Id_Producto: detalle.productos.Id_Producto,
        Nombre: detalle.productos.Nombre,
        Descripcion: detalle.productos.Descripcion,
        Precio: detalle.Precio,
        Cantidad: detalle.Cantidad,
        Imagen: detalle.productos.Imagen,
      }));
      setProductosEnCarrito(detalles);
    } catch (error) {
      console.error('Error al obtener el carrito:', error);
    }
  };

  const agregarAlCarrito = async (producto: ProductoCarrito) => {
    try {
      await fetchData(`http://localhost:3000/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          productId: producto.Id_Producto,
          quantity: 1,
        }),
      });

      setProductosEnCarrito((prev) => {
        const productoExistente = prev.find((p) => p.Id_Producto === producto.Id_Producto);
        if (productoExistente) {
          return prev.map((p) =>
            p.Id_Producto === producto.Id_Producto ? { ...p, Cantidad: p.Cantidad + 1 } : p
          );
        }
        return [...prev, { ...producto, Cantidad: 1 }];
      });
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  const eliminarDelCarrito = async (productoId: number) => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${userId}/${productoId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar producto');
      }

      setProductosEnCarrito((prev) => prev.filter((p) => p.Id_Producto !== productoId));
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    }
  };

  const vaciarCarrito = async () => {
    try {
      const response = await fetch(`http://localhost:3000/cart/${userId}/vaciar`, { method: 'DELETE' });
      if (response) {
        setProductosEnCarrito([]);
      }
    } catch (error) {
      console.error('Error al vaciar el carrito:', error);
    }
  };

  useEffect(() => {
    obtenerCarrito();
  }, [userId]);

  return (
    <CarritoContext.Provider
      value={{
        productosEnCarrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        obtenerCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

const useCarrito = (): CarritoContextType => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  }
  return context;
};

export { CarritoProvider, useCarrito };
