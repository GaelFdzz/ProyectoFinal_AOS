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
  Imagen: string;
}

const Catalogo = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const { agregarAlCarrito, productosEnCarrito } = useCarrito();
  const [mostrarDescripcionCompleta, setMostrarDescripcionCompleta] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      try {
        const response = await fetch('http://localhost:3000/productos');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('La respuesta de la API no contiene productos válidos');
        }

        const productosValidados = data.map((producto: Producto) => ({
          ...producto,
          Nombre: producto.Nombre || 'Nombre no disponible',
          Descripcion: producto.Descripcion || 'Sin descripción',
          Precio: producto.Precio || 0,
          Stock: producto.Stock || 0,
          Imagen: producto.Imagen || '/imagenes/iphone.png',
        }));

        setProductos(productosValidados);
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

  const manejarAgregarAlCarrito = (producto: Producto) => {
    if (!producto.Id_Producto || isNaN(producto.Precio) || producto.Precio <= 0 || producto.Stock <= 0) {
      console.error('Producto inválido o sin stock:', producto);
      return;
    }

    const productoCarrito = {
      Id_Producto: producto.Id_Producto,
      Descripcion: producto.Descripcion,
      Nombre: producto.Nombre,
      Precio: producto.Precio,
      Stock: producto.Stock,
      Imagen: producto.Imagen,
      Cantidad: 1,
    };

    agregarAlCarrito(productoCarrito);
  };

  const toggleDescripcionCompleta = (id: number) => {
    setMostrarDescripcionCompleta((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
                  src={producto.Imagen ? `http://localhost:3000${producto.Imagen}` : '/imagenes/iphone.png'}
                  alt={producto.Nombre}
                  className="productImage"
                />
                <h2>{producto.Nombre}</h2>
                <p className='button-mostrar-detalles'>
                  {mostrarDescripcionCompleta[producto.Id_Producto]
                    ? producto.Descripcion
                    : producto.Descripcion.substring(0, 50) + (producto.Descripcion.length > 50 ? '...' : '')}
                  {producto.Descripcion.length > 50 && (
                    <button
                      className="buttonToggleDescripcion"
                      onClick={() => toggleDescripcionCompleta(producto.Id_Producto)}
                    >
                      {mostrarDescripcionCompleta[producto.Id_Producto] ? 'Mostrar menos' : 'Leer más'}
                    </button>
                  )}
                </p>
                <p>Precio: ${producto.Precio}</p>
                <p>Stock: {producto.Stock > 0 ? producto.Stock : 'Agotado'}</p>
                <button
                  className="buttonAgregarCarrito"
                  onClick={() => manejarAgregarAlCarrito(producto)}
                  disabled={estaEnCarrito(producto.Id_Producto) || producto.Stock === 0}
                >
                  {estaEnCarrito(producto.Id_Producto)
                    ? 'Agregado al carrito'
                    : producto.Stock === 0
                      ? 'Sin Stock'
                      : 'Agregar al carrito'}
                </button>
                <Link to={`/productos/${producto.Id_Producto}`}>
                  <button className="buttonVerDetalles">Ver Detalles</button>
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
