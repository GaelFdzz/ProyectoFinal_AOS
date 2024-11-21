import { useEffect, useState } from 'react';
import "../styles/productsList.css";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div>
      <div className='productsList'>
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div className='productSale' key={producto.Id_Producto}>
              <img
                src={`http://localhost:3000${producto.Imagen || '/iphone.png'}`}
                alt={producto.Nombre}
                className="productImage"
              />
              <h2>{producto.Nombre}</h2>
              <p>{producto.Descripcion}</p>
              <p>Precio: {producto.Precio}</p>
              <p>Stock: {producto.Stock}</p>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Catalogo;
