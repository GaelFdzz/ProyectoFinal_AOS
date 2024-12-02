import { useEffect, useState } from "react";
import { useCarrito } from "../context/carritoContext";
import "../styles/productsList.css";
import { Link } from "react-router-dom";

interface Producto {
  Id_Producto: number;
  Nombre: string;
  Descripcion: string;
  Precio: number | string;
  Stock: number;
  Imagen?: string;
}

const Catalogo = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);
  const { agregarAlCarrito, productos: productosEnCarrito } = useCarrito();

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch("http://localhost:3000/productos");
        if (!response.ok) {
          throw new Error(`Error al obtener los productos: ${response.statusText}`);
        }
        const data: Producto[] = await response.json();
        const productosTransformados = data.map((producto) => ({
          ...producto,
          Precio: parseFloat(producto.Precio as string),
        }));
        setProductos(productosTransformados);
      } catch (error) {
        console.error(error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  const estaEnCarrito = (productoId: number) =>
    productosEnCarrito.some((producto) => producto.Id_Producto === productoId);

  const manejarAgregarAlCarrito = (producto: Producto) => {
    if (!estaEnCarrito(producto.Id_Producto)) {
      agregarAlCarrito(producto);
      alert("Producto agregado al carrito");
    } else {
      alert("Este producto ya está en el carrito");
    }
  };

  if (cargando) {
    return <p>Cargando productos...</p>;
  }

  if (!productos.length) {
    return <p>No hay productos disponibles</p>;
  }

  return (
    <div className="productsList">
      {productos.map((producto) => (
        <div className="productSale" key={producto.Id_Producto}>
          <img
            src={`http://localhost:3000${producto.Imagen || "/iphone.png"}`}
            alt={producto.Nombre}
            className="productImage"
          />
          <h2>{producto.Nombre}</h2>
          <p>{producto.Descripcion}</p>
          <p>Precio: ${Number(producto.Precio).toFixed(2)}</p>
          <p>Stock: {producto.Stock}</p>
          <button
            className="buttonAgregarCarrito"
            onClick={() => manejarAgregarAlCarrito(producto)}
            disabled={estaEnCarrito(producto.Id_Producto)}
          >
            {estaEnCarrito(producto.Id_Producto) ? "Agregado al carrito" : "Agregar al carrito"}
          </button>
          <Link to={`/productos/${producto.Id_Producto}`}>
            <button className="buttonVerDetalles">Ver Detalles</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Catalogo;