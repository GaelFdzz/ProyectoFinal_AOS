import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EditarPerfil.css"; // Importa el CSS específico para este componente

function EditarPerfil() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    foto: "",
    contrasenaActual: "", // Nuevo campo para la contraseña actual
    nuevaContrasena: "", // Nuevo campo para la nueva contraseña
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          foto: reader.result as string, // Guardamos la imagen cargada como base64
        }));
      };
      reader.readAsDataURL(file); // Leemos el archivo como una URL de datos
    }
  };

  const handleGuardarCambios = () => {
    if (!formData.nombre || !formData.apellido || !formData.correo) {
      setErrorMessage("Por favor, rellena todos los campos antes de guardar.");
      return;
    }

    if (formData.nuevaContrasena && formData.nuevaContrasena.length < 6) {
      setErrorMessage("La nueva contraseña debe tener al menos 6 caracteres.");
      return;
    }

    localStorage.setItem("userData", JSON.stringify(formData));
    navigate("/perfil");
  };

  const handleRegresarAlPerfil = () => {
    navigate("/perfil");
  };

  return (
    <div className="editar-perfil-container">
      <div className="editar-perfil-box">
        <h1 className="editar-perfil-title">Editar perfil</h1>
        <div className="editar-perfil-form">
          <form>
            <label className="editar-perfil-label" htmlFor="nombre">
              Nombre/s
            </label>
            <input
              className="editar-perfil-input"
              id="nombre"
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre(s)"
            />

            <label className="editar-perfil-label" htmlFor="apellido">
              Apellido/s
            </label>
            <input
              className="editar-perfil-input"
              id="apellido"
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ingresa tu apellido(s)"
            />

            <label className="editar-perfil-label" htmlFor="correo">
              Correo
            </label>
            <input
              className="editar-perfil-input"
              id="correo"
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Ingresa tu correo electrónico"
            />

            <label className="editar-perfil-label" htmlFor="foto">
              Foto de perfil
            </label>
            <input
              className="editar-perfil-input"
              id="foto"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {/* Mostrar imagen previa */}
            {formData.foto && (
              <div className="editar-perfil-preview">
                <img
                  src={formData.foto}
                  alt="Vista previa"
                  className="editar-perfil-foto"
                />
              </div>
            )}



            {errorMessage && (
              <p className="editar-perfil-error-message">{errorMessage}</p>
            )}

            <div className="editar-perfil-button-container">
              <button
                className="editar-perfil-button editar-perfil-button-save"
                type="button"
                onClick={handleGuardarCambios}
              >
                Guardar cambios
              </button>
              <button
                className="editar-perfil-button editar-perfil-button-back"
                type="button"
                onClick={handleRegresarAlPerfil}
              >
                Regresar al perfil
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditarPerfil;