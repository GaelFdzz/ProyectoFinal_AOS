import { useCarrito } from '../context/carritoContext';
import '../styles/carritoPage.css';

const Carrito = () => {
  const { productosEnCarrito, vaciarCarrito, eliminarDelCarrito } = useCarrito();

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

  return (
    <div className="container">
      <h1 className="carrito-header">Tu carrito</h1>
      <div className="carrito-container">


        {productosEnCarrito.length > 0 ? (
          <>
            <div className="carrito-productos">
              {productosEnCarrito.map((producto) => (
                <div className="carrito-producto" key={producto.Id_Producto}>
                  <img
                    src={obtenerImagenProducto(producto.Imagen)}
                    alt={producto.Nombre}
                    className="producto-imagen"
                  />
                  <div className="producto-info">
                    <h3 className="producto-nombre">{producto.Nombre}</h3>
                    <p className="producto-descripcion">{producto.Descripcion}</p>
                    <p className="producto-precio">
                      Precio: ${typeof producto.Precio === 'number' ? producto.Precio.toFixed(2) : '0.00'}
                    </p>

                    <p className="producto-cantidad">Cantidad: {Math.max(producto.Cantidad || 1, 1)}</p>
                    <button
                      onClick={() => manejarAccion(eliminarDelCarrito, producto.Id_Producto)}
                      className="eliminar-btn"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="carrito-footer">
              <p className="carrito-total">Total: ${calcularTotal().toFixed(2)}</p>
              <div className="botones-carrito">
                <button onClick={() => manejarAccion(vaciarCarrito)} className="vaciar-btn">
                  Vaciar Carrito
                </button>
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
