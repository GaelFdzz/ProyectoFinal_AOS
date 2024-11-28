import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Perfil.css";

const Perfil: React.FC = () => {
  const [userData, setUserData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Recupera los datos desde localStorage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleEditarPerfil = () => {
    // Redirige a la página de edición
    navigate("/editar-perfil");
  };

  return (
    <div className="container">
      <div className="container-perfil">
        <h1 className="titlePerfil">Mi Perfil</h1>
        <div className="profile-info">
          <p><strong>Nombre:</strong> {userData.nombre || "No especificado"}</p>
          <p><strong>Apellido:</strong> {userData.apellido || "No especificado"}</p>
          <p><strong>Correo:</strong> {userData.correo || "No especificado"}</p>
        </div>
        <div className="button-container">
          <button className="button save" onClick={handleEditarPerfil}>
            Editar Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
