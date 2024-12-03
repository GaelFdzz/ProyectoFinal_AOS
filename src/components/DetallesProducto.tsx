import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Producto } from "../interfaces/producto";
import "../styles/DetallesProductos.css";

const DetallesProducto = () => {
  const { id } = useParams<{ id: string }>();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [resenas, setResenas] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormularioResena, setMostrarFormularioResena] = useState(false);
  const [nuevaResena, setNuevaResena] = useState({
    calificacion: 0,
    comentario: "",
  });
  const [haComprado, setHaComprado] = useState(false); // Esto se debe determinar desde el backend.

  useEffect(() => {
    const obtenerProducto = async () => {
      setCargando(true);
      try {
        const response = await fetch(`http://localhost:3000/productos/${id}`);
        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }
        const data = await response.json();
        setProducto(data);

        const resenasResponse = await fetch(
          `http://localhost:3000/productos/${id}/resenas`
        );
        if (resenasResponse.ok) {
          const resenasData = await resenasResponse.json();
          setResenas(resenasData);
        }

        // Simula la verificación de si el usuario compró el producto.
        // En producción, esto debería hacerse en el backend.
        const haCompradoProducto = true; // Cambia esto según tu lógica.
        setHaComprado(haCompradoProducto);
      } catch (error) {
        console.error("Error al obtener el producto o las reseñas:", error);
      } finally {
        setCargando(false);
      }
    };

    if (id) {
      obtenerProducto();
    }
  }, [id]);

  const handleAgregarAlCarrito = async () => {
    try {
      const response = await fetch("http://localhost:3000/carrito", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productoId: id }),
      });
      if (response.ok) {
        alert("Producto agregado al carrito");
      } else {
        alert("Error al agregar el producto al carrito");
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  const handleAbrirFormularioResena = () => {
    setMostrarFormularioResena(true);
  };

  const handleCerrarFormularioResena = () => {
    setMostrarFormularioResena(false);
    setNuevaResena({ calificacion: 0, comentario: "" });
  };

  const handleSubmitResena = async () => {
    if (!haComprado) {
      alert("Solo puedes agregar una reseña si has comprado este producto.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/productos/${id}/resenas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calificacion: nuevaResena.calificacion,
          comentario: nuevaResena.comentario,
        }),
      });

      if (response.ok) {
        alert("Reseña agregada exitosamente");
        handleCerrarFormularioResena();
        // Actualizar las reseñas
        const resenasActualizadas = await response.json();
        setResenas(resenasActualizadas);
      } else {
        alert("Error al agregar la reseña");
      }
    } catch (error) {
      console.error("Error al agregar la reseña:", error);
    }
  };

  if (cargando) {
    return <div className="spinner">Cargando...</div>;
  }

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <div className="container">
      <h1>Detalles del producto</h1>
      <div className="contenidoProducto">
        <div className="detallesProducto">
          <div className="detallesImagen">
            <img
              src={`http://localhost:3000${producto.Imagen || "/iphone.png"}`}
              alt={producto.Nombre}
            />
          </div>
          <div className="detallesInfo">
            <h2>{producto.Nombre}</h2>
            <p>{producto.Descripcion}</p>
            <p>Precio: {producto.Precio} MXN</p>
            <p>Stock: {producto.Stock}</p>
            <button
              className="buttonAgregarAlCarrito"
              onClick={handleAgregarAlCarrito}
            >
              Agregar al carrito
            </button>
            <button
              className="buttonAgregarReseña"
              onClick={handleAbrirFormularioResena}
            >
              Agregar reseña
            </button>
          </div>
        </div>

        <div className="reseñasUsuarios">
          <h2>Reseñas de usuarios</h2>
          {resenas.length > 0 ? (
            resenas.map((resena, index) => (
              <div key={index} className="reseña">
                <p>
                  <strong>{resena.Usuario}</strong>
                </p>
                <p>Calificación: {resena.Calificacion}</p>
                <p>{resena.Comentario}</p>
                <p>
                  <small>
                    {new Date(resena.Fecha).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </small>
                </p>
              </div>
            ))
          ) : (
            <p>No hay reseñas para este producto.</p>
          )}
        </div>
      </div>

      {mostrarFormularioResena && (
        <div className="modal">
          <div className="modalContent">
            <h2>Agregar Reseña</h2>
            <label>
              Calificación:
              <input
                type="number"
                min="1"
                max="5"
                value={nuevaResena.calificacion}
                onChange={(e) =>
                  setNuevaResena({ ...nuevaResena, calificacion: parseInt(e.target.value) })
                }
              />
            </label>
            <label>
              Comentario:
              <textarea
                value={nuevaResena.comentario}
                onChange={(e) =>
                  setNuevaResena({ ...nuevaResena, comentario: e.target.value })
                }
              />
            </label>
            <button onClick={handleSubmitResena}>Enviar</button>
            <button onClick={handleCerrarFormularioResena}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetallesProducto;