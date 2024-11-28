import { useCarrito } from '../context/carritoContext';
import '../styles/carritoPage.css';

const Carrito = () => {
  const { productos, vaciarCarrito } = useCarrito();

  console.log('Productos en el carrito:', productos); // Depuración de datos

  // Calcular el total de los productos en el carrito
  const calcularTotal = () => {
    return productos.reduce((total, producto) => {
      const precio = Number(producto.Precio); // Convertimos a número
      const subtotal = isNaN(precio) ? 0 : precio * (producto.Cantidad || 1); // Si no es número, ponemos 0
      return total + subtotal;
    }, 0);
  };

  const total = calcularTotal();

  const manejarPago = () => {
    if (productos.length === 0) {
      alert('No hay productos en el carrito');
      return;
    }
    alert(`Total a pagar: $${total.toFixed(2)}`);
  };

  return (
    <div className="container">
      <div className="carrito-container">
        <h1 className="carrito-header">Tu carrito</h1>
        {productos.length > 0 ? (
          <>
            {productos.map((producto, index) => {
              const precio = Number(producto.Precio); // Asegúrate de que el precio sea un número
              const subtotal = isNaN(precio) ? 0 : precio * (producto.Cantidad || 1); // Manejamos el caso de NaN

              return (
                <div className="carrito-producto" key={index}>
                  <img
                    src={`http://localhost:3000${producto.Imagen || '/iphone.png'}`}
                    alt={producto.Nombre}
                  />
                  <div>
                    <h2>{producto.Nombre}</h2>
                    <p>{producto.Descripcion}</p>
                    <p>Precio: ${precio.toFixed(2)}</p> {/* Aseguramos que el precio sea un número antes de usar toFixed */}
                    <p>Cantidad: {producto.Cantidad}</p>
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                  </div>
                </div>
              );
            })}
            <div className="carrito-total">
              <h2>Total: ${total.toFixed(2)}</h2>
            </div>
            <button className="vaciar-carrito-btn" onClick={vaciarCarrito}>Vaciar carrito</button>
            <button className="pagar-btn" onClick={manejarPago}>Pagar</button>
          </>
        ) : (
          <p className='carritoVacio'>Tu carrito está vacío</p>
        )}
      </div>
    </div>
  );
};

export default Carrito;
