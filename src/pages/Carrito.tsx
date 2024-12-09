import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { useCarrito } from '../context/carritoContext';
import '../styles/carritoPage.css';
import { useState } from 'react';

const Carrito = () => {
  const { productosEnCarrito, vaciarCarrito, eliminarDelCarrito } = useCarrito();
  const navigate = useNavigate(); // Inicializa useNavigate
  const [descripcionesExpandidas, setDescripcionesExpandidas] = useState<{ [key: number]: boolean }>({});

  const calcularTotal = () =>
    productosEnCarrito.reduce(
      (total, producto) => total + (typeof producto.Precio === 'number' ? producto.Precio : 0) * Math.max(producto.Cantidad || 1, 1),
      0
    );

  const obtenerImagenProducto = (imagen: string) => {
    return imagen && imagen !== 'null' && imagen !== 'undefined' && imagen !== ''
      ? `http://localhost:3000${imagen}`
      : 'http://localhost:3000/imagenes/iphone.png';
  };

  const manejarAccion = async (accion: Function, ...args: any[]) => {
    try {
      await accion(...args);
    } catch (error) {
      console.error("Ocurrió un error al realizar la acción:", error);
    }
  };

  const manejarPago = () => {
    // Si el carrito tiene productos, redirige a la página de pago
    if (productosEnCarrito.length > 0) {
      navigate('/pago'); // Redirige a /pago
    } else {
      alert('Tu carrito está vacío. Agrega productos antes de proceder al pago.');
    }
  };

  const toggleDescripcion = (productoId: number) => {
    setDescripcionesExpandidas((prev) => ({
      ...prev,
      [productoId]: !prev[productoId],
    }));
  };

  return (
    <div className="container">
      <h1 className="carrito-header">Tu carrito</h1>
      <div className="carrito-container">
        {productosEnCarrito.length > 0 ? (
          <>
            <div className="carrito-productos">
              {productosEnCarrito.map((producto) => {
                const descripcionLimitada = producto.Descripcion.slice(0, 150); // Limitar a 150 caracteres
                const mostrarDescripcionCompleta = descripcionesExpandidas[producto.Id_Producto];

                return (
                  <div className="carrito-producto" key={producto.Id_Producto}>
                    <img
                      src={obtenerImagenProducto(producto.Imagen)}
                      alt={producto.Nombre}
                      className="producto-imagen"
                    />
                    <div className="producto-info">
                      <h3 className="producto-nombre">{producto.Nombre}</h3>
                      <p className="producto-descripcion">
                        {mostrarDescripcionCompleta
                          ? producto.Descripcion
                          : descripcionLimitada + (producto.Descripcion.length > 150 ? '...' : '')}
                        {producto.Descripcion.length > 150 && (
                          <button
                            onClick={() => toggleDescripcion(producto.Id_Producto)}
                            className="toggle-descripcion-btn"
                          >
                            {mostrarDescripcionCompleta ? 'Mostrar menos' : 'Leer más'}
                          </button>
                        )}
                      </p>
                      <p className="producto-precio">
                        Precio: ${typeof producto.Precio === 'number' ? producto.Precio.toFixed(2) : '0.00'}
                      </p>
                      <p className="producto-cantidad">
                        Cantidad: {Math.max(producto.Cantidad || 1, 1)}
                      </p>
                      <button
                        onClick={() => manejarAccion(eliminarDelCarrito, producto.Id_Producto)}
                        className="eliminar-btn"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="carrito-footer">
              <p className="carrito-total">Total: ${calcularTotal().toFixed(2)}</p>
              <div className="botones-carrito">
                <button className="pagar-btn" onClick={manejarPago}>Pagar</button>
                <button onClick={() => manejarAccion(vaciarCarrito)} className="vaciar-btn">Vaciar Carrito</button>
              </div>
            </div>
          </>
        ) : (
          <p className="carrito-vacio">Tu carrito está vacío</p>
        )}
      </div>
    </div>
  );
};

export default Carrito;
