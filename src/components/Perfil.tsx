import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Perfil.css"; // Importa el CSS específico para este componente

function Perfil() {
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    foto: "",
    contrasena: "", // Añadimos el campo de contraseña en el estado
  });

  const navigate = useNavigate();

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  return (
    <div className="perfil-container">
      <div className="perfil-box">
        <h1 className="perfil-title">Perfil</h1>
        {/* Imagen de perfil */}
        {userData.foto && (
          <div className="perfil-foto">
            <img src={userData.foto} alt="Foto de perfil" className="perfil-foto-img" />
          </div>
        )}
        <div className="perfil-info">
          <p>Nombre: {userData.nombre}</p>
          <p>Apellido: {userData.apellido}</p>
          <p>Correo: {userData.correo}</p>
        </div>
        <div className="perfil-button-container">
          <button className="perfil-button" onClick={() => navigate("/editar-perfil")}>
            Editar perfil
          </button>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
