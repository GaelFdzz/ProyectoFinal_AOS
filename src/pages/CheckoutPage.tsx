// src/pages/CheckoutPage.tsx
import { useCarrito } from '../context/carritoContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { productos } = useCarrito();
  const navigate = useNavigate();

  // Calcular el total del carrito
  const total = productos.reduce((acc, producto) => acc + (producto.Precio || 0), 0);

  // Simular la confirmación de pago
  const manejarPago = () => {
    alert('Pago realizado con éxito');
    navigate('/'); // Redirigir a la página de inicio
  };

  return (
    <div>
      <h1>Confirmación de Compra</h1>
      <p>Total a pagar: ${total.toFixed(2)}</p>
      <button onClick={manejarPago}>Confirmar Pago</button>
    </div>
  );
};

export default CheckoutPage;
