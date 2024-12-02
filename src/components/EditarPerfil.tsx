import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Perfil.css";

const EditarPerfil: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGuardarCambios = () => {
    // Guarda los datos en localStorage
    localStorage.setItem("userData", JSON.stringify(formData));
    navigate("/perfil"); // Redirige al perfil
  };

  const handleRegresarAlPerfil = () => {
    navigate("/perfil"); // Redirige al perfil
  };

  return (
    <div className="container">
      <div className="container-perfil">

        <h1 className="titlePerfil">Editar perfil</h1>
        <form>
          <label htmlFor="nombre">Nombre/s</label>
          <input
            id="nombre"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre(s)"
          />

          <label htmlFor="apellido">Apellido/s</label>
          <input
            id="apellido"
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Ingresa tu apellido(s)"
          />

          <label htmlFor="correo">Correo</label>
          <input
            id="correo"
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Ingresa tu correo electrónico"
          />

          <div className="button-container">
            <button
              type="button"
              className="button save"
              onClick={handleGuardarCambios}
            >
              Guardar cambios
            </button>
            <button
              type="button"
              className="button cancel"
              onClick={handleRegresarAlPerfil}
            >
              Regresar al perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarPerfil;
