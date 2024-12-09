import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/axiosConfig';
import "../styles/Perfil.css"

interface Usuario {
  Nombre: string;
  Apellido: string;
  Correo: string;
}

interface Pedido {
  Id_Pedido: number;
  Fecha_Pedido: string;
  Estado: string;
  Total_Precio: number;
}

function Perfil() {
  const [userData, setUserData] = useState<Usuario | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Number(localStorage.getItem('userId'));

    if (userId) {
      api.get(`/usuarios/${userId}`)
        .then((response) => {
          setUserData({
            Nombre: response.data.Nombre,
            Apellido: response.data.Apellido,
            Correo: response.data.Correo,
          });
        })
        .catch((error) => console.error('Error al obtener datos del usuario:', error));

      api.get(`/pedidos/usuario/${userId}`)
        .then((response) => setPedidos(response.data))
        .catch((error) => console.error('Error al obtener pedidos:', error));
    }
  }, []);

  if (!userData) return <p>Cargando datos...</p>;

  return (
    <div className="perfil-container">
      <div className="perfil-box">
        <h1 className="perfil-title">Perfil</h1>
        <div className="perfil-info">
          <p>Nombre: {userData.Nombre}</p>
          <p>Apellido: {userData.Apellido}</p>
          <p>Correo: {userData.Correo}</p>
        </div>
        <div className="perfil-button-container">
          <button className="perfil-button" onClick={() => navigate('/editar-perfil')}>
            Editar perfil
          </button>
        </div>
        <div className="historial-pedidos">
          <h2>Historial de Compras</h2>
          {pedidos.length > 0 ? (
            <ul>
              {pedidos.map((pedido) => (
                <li key={pedido.Id_Pedido}>
                  <p>Pedido ID: {pedido.Id_Pedido}</p>
                  <p>Fecha: {new Date(pedido.Fecha_Pedido).toLocaleDateString()}</p>
                  <p>Estado: {pedido.Estado}</p>
                  <p>Total: ${pedido.Total_Precio}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No se encontraron pedidos.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;