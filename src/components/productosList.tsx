import { useEffect, useState } from 'react';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();
        setProductos(data);
        console.log('Productos obtenidos:', productos);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div>
      <h1>Catálogo de Productos</h1>
      <div>
        {productos.length > 0 ? (
          productos.map((producto) => (
            <div key={producto.Id_Producto}>
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