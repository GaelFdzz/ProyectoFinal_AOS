// src/components/productList.tsx
import { useEffect, useState } from 'react';
import { useCarrito } from '../context/carritoContext';
import "../styles/productsList.css";
import { Link } from 'react-router-dom';

interface Producto {
  Id_Producto: number;
  Nombre: string;
  Descripcion: string;
  Precio: number;
  Stock: number;
  Imagen?: string;
}

const Catalogo = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const { agregarAlCarrito, productos: productosEnCarrito } = useCarrito();

  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      try {
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  const estaEnCarrito = (productoId: number) => {
    return productosEnCarrito.some((producto) => producto.Id_Producto === productoId);
  };

  // productList.tsx
  const manejarAgregarAlCarrito = async (producto: Producto) => {
    const productoCarrito = {
      Id_Producto: producto.Id_Producto,
      Descripcion: producto.Descripcion,
      Nombre: producto.Nombre,
      Precio: producto.Precio,
      Stock: producto.Stock,
    };
    agregarAlCarrito(productoCarrito); // Asegúrate de que esto esté funcionando correctamente
  };



  return (
    <div>
      {cargando ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="productsList">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <div className="productSale" key={producto.Id_Producto}>
                <img
                  src={`http://localhost:3000${producto.Imagen || '/iphone.png'}`}
                  alt={producto.Nombre}
                  className="productImage"
                />
                <h2>{producto.Nombre}</h2>
                <p>{producto.Descripcion}</p>
                <p>Precio: ${producto.Precio}</p>
                <p>Stock: {producto.Stock}</p>
                <button className='buttonAgregarCarrito' onClick={() => manejarAgregarAlCarrito(producto)}>
                  {estaEnCarrito(producto.Id_Producto) ? 'Agregado al carrito' : 'Agregar al carrito'}
                </button>
                <Link to={`/productos/${producto.Id_Producto}`}>
                  <button className='buttonVerDetalles'>Ver Detalles</button>
                </Link>
              </div>
            ))
          ) : (
            <p>No hay productos disponibles</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Catalogo;
