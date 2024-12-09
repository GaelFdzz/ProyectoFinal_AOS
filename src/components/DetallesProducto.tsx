import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Producto } from "../interfaces/producto";
import "../styles/DetallesProductos.css";
import { useCarrito } from "../context/carritoContext";

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
  const [haComprado, setHaComprado] = useState(false)
  const [mensajeErrorResena, setMensajeErrorResena] = useState("");
  const [usuarioNombre, setUsuarioNombre] = useState("");

  const { productosEnCarrito, agregarAlCarrito } = useCarrito();

  const estaEnElCarrito = productosEnCarrito.some(
    (item) => item.Id_Producto === producto?.Id_Producto
  );

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

        // Simulamos la compra para depuración
        const haCompradoProducto = false;
        setHaComprado(haCompradoProducto);

        // Obtener el nombre del usuario desde el localStorage
        const userId = localStorage.getItem("userId");
        if (userId) {
          const usuarioResponse = await fetch(`http://localhost:3000/usuarios/${userId}`);
          if (usuarioResponse.ok) {
            const usuarioData = await usuarioResponse.json();
            setUsuarioNombre(usuarioData.Nombre);
          }
        }
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

  const handleActivarCompraSimulada = () => {
    setHaComprado(true);
    alert("Compra simulada. Ahora puedes dejar una reseña.");
  };

  const handleAgregarAlCarrito = async () => {
    if (!producto) return;

    const imagenUrl =
      typeof producto.Imagen === "string" ? producto.Imagen : "/default.png";

    try {
      await agregarAlCarrito({
        Id_Producto: producto.Id_Producto,
        Nombre: producto.Nombre,
        Descripcion: producto.Descripcion,
        Precio: producto.Precio,
        Cantidad: 1,
        Imagen: imagenUrl,
      });
      alert("Producto agregado al carrito correctamente.");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Hubo un problema al agregar el producto al carrito.");
    }
  };

  const handleAbrirFormularioResena = () => {
    setMostrarFormularioResena(true);
  };

  const handleCerrarFormularioResena = () => {
    setMostrarFormularioResena(false);
    setNuevaResena({ calificacion: 0, comentario: "" });
    setMensajeErrorResena("");
  };

  const handleSubmitResena = async () => {
    console.log(
      `Agregando reseña al producto ${id} por ${usuarioNombre}` +
      ` (${nuevaResena.calificacion} estrellas)` +
      ` - ${nuevaResena.comentario}`
    );

    if (!nuevaResena.comentario || nuevaResena.calificacion < 1 || nuevaResena.calificacion > 5) {
      setMensajeErrorResena("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/productos/${id}/resenas`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Comentario: nuevaResena.comentario,
            Calificacion: nuevaResena.calificacion,
            Usuario: usuarioNombre,
            EsSimulacion: haComprado, // Aquí enviamos si es simulación o no
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Error al agregar la reseña");
      }

      const nuevaListaResenas = await response.json();
      setResenas(nuevaListaResenas);
      alert("Reseña añadida con éxito");
      handleCerrarFormularioResena();
    } catch (error) {
      console.error(error);
      setMensajeErrorResena("Hubo un problema al agregar la reseña.");
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
            {estaEnElCarrito ? (
              <button className="buttonCarritoYaAgregado">
                Ya en el carrito
              </button>
            ) : (
              <button
                className="buttonAgregarAlCarrito"
                onClick={handleAgregarAlCarrito}
              >
                Agregar al carrito
              </button>
            )}
            <button
              className="buttonAgregarReseña"
              onClick={handleAbrirFormularioResena}
            >
              Agregar reseña
            </button>
            <button
              className="buttonSimularCompra"
              onClick={handleActivarCompraSimulada}
            >
              Simular compra
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
                <p>Calificación: {resena.Calificacion} / 5 ★</p>
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
                  setNuevaResena({
                    ...nuevaResena,
                    calificacion: parseInt(e.target.value),
                  })
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
            {mensajeErrorResena && <p className="error-message">{mensajeErrorResena}</p>}
            <button onClick={handleSubmitResena}>Enviar</button>
            <button onClick={handleCerrarFormularioResena}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetallesProducto;
