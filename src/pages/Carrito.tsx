import { useCarrito } from '../context/carritoContext';
import '../styles/carritoPage.css';

const Carrito = () => {
  const { productos, vaciarCarrito, eliminarDelCarrito, guardarCarritoEnBaseDeDatos } = useCarrito();

  // Función para calcular el total del carrito
  const calcularTotal = () =>
    productos.reduce((total, producto) => total + producto.Precio * (producto.Cantidad || 1), 0);

  return (
    <div className="container">
      <div className="carrito-container">
        <h1 className="carrito-header">Tu carrito</h1>

        {productos.length > 0 ? (
          <>
            <div className="carrito-productos">
              {productos.map((producto) => (
                <div className="carrito-producto" key={producto.Id_Producto}>
                  <img
                    src={`http://localhost:3000${producto.Imagen || '/placeholder.png'}`}
                    alt={producto.Nombre}
                    className="producto-imagen"
                  />
                  <div className="producto-info">
                    <h3 className="producto-nombre">{producto.Nombre}</h3>
                    <p className="producto-descripcion">{producto.Descripcion}</p>
                    <p className="producto-precio">Precio: ${producto.Precio}</p>
                    <p className="producto-cantidad">Cantidad: {producto.Cantidad}</p>
                    <button
                      onClick={() => eliminarDelCarrito(producto.Id_Producto)}
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
                <button onClick={vaciarCarrito} className="vaciar-btn">Vaciar Carrito</button>
                <button onClick={guardarCarritoEnBaseDeDatos} className="guardar-btn">Guardar Carrito</button>
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
