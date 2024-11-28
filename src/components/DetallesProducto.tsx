import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Producto } from '../interfaces/producto';
import "../styles/DetallesProductos.css"

const DetallesProducto = () => {
    const { id } = useParams<{ id: string }>(); // Captura el parámetro ID desde la URL
    const [producto, setProducto] = useState<Producto | null>(null);
    const [resenas, setResenas] = useState<any[]>([]); // Añadir estado para las reseñas
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerProducto = async () => {
            setCargando(true);
            try {
                // Obtener detalles del producto
                const response = await fetch(`http://localhost:3000/productos/${id}`);
                if (!response.ok) {
                    throw new Error('Producto no encontrado');
                }
                const data = await response.json();
                setProducto(data);

                // Obtener reseñas del producto
                const resenasResponse = await fetch(`http://localhost:3000/productos/${id}/resenas`);
                if (resenasResponse.ok) {
                    const resenasData = await resenasResponse.json();
                    setResenas(resenasData);
                }

            } catch (error) {
                console.error('Error al obtener el producto o las reseñas:', error);
            } finally {
                setCargando(false);
            }
        };

        if (id) {
            obtenerProducto();
        }
    }, [id]);

    if (cargando) {
        return <div className="spinner">Cargando...</div>
    }

    if (!producto) {
        return <p>Producto no encontrado</p>;
    }

    return (
        <div className='container'>
            <h1>Detalles del producto</h1>
            <div className='contenidoProducto'>
                <div className='detallesProducto'>
                    <div className='detallesImagen'>
                        <img
                            src={`http://localhost:3000${producto.Imagen || '/iphone.png'}`}
                            alt={producto.Nombre}
                        />
                    </div>
                    <div className='detallesInfo'>
                        <h2>{producto.Nombre}</h2>
                        <p>{producto.Descripcion}</p>
                        <p>Precio: {producto.Precio} MXN</p>
                        <p>Stock: {producto.Stock}</p>
                        <button className='buttonAgregarAlCarrito'>Agregar al carrito</button>
                        <button className='buttonAgregarReseña'>Agregar reseña</button>
                    </div>
                </div>

                <div className='reseñasUsuarios'>
                    <h2>Reseñas de usuarios</h2>
                    {resenas.length > 0 ? (
                        resenas.map((resena, index) => (
                            <div key={index} className="reseña">
                                <p><strong>{resena.Usuario}</strong></p>
                                <p>Calificación: {resena.Calificacion}</p>
                                <p>{resena.Comentario}</p>
                                <p><small>{new Date(resena.Fecha).toLocaleDateString('es-MX', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</small></p> {/* Formateo de fecha */}
                            </div>
                        ))
                    ) : (
                        <p>No hay reseñas para este producto.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default DetallesProducto