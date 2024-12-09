import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Services/axiosConfig';
import "../styles/EditarPerfil.css";

interface EditarUsuario {
  Nombre?: string;
  Apellido?: string;
  Correo?: string;
}

function EditarPerfil() {
  const [formData, setFormData] = useState<EditarUsuario>({});
  const [originalData, setOriginalData] = useState<EditarUsuario>({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      api.get(`/usuarios/${userId}`)
        .then((response) => {
          setFormData(response.data);
          setOriginalData(response.data);
        })
        .catch(() => setErrorMessage('No se pudo cargar la información del perfil.'));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardarCambios = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    if (
      formData.Nombre === originalData.Nombre &&
      formData.Apellido === originalData.Apellido &&
      formData.Correo === originalData.Correo
    ) {
      setSuccessMessage('No se realizaron cambios.');
      return;
    }

    api.put(`/usuarios/${userId}`, formData)
      .then(() => {
        setSuccessMessage('Perfil actualizado con éxito.');
        setOriginalData(formData);
        setTimeout(() => navigate('/perfil'), 2000);
      })
      .catch(() => setErrorMessage('Ocurrió un error al guardar los cambios.'));
  };

  const handlePasswordChange = () => {
    if (!currentPassword) {
      setErrorMessage('Debes ingresar tu contraseña actual.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage('La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (newPassword === currentPassword) {
      setErrorMessage('La nueva contraseña no puede ser igual a la contraseña actual.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas nuevas no coinciden.');
      return;
    }

    const userId = Number(localStorage.getItem('userId'));
    api.put(`/usuarios/${userId}/cambiar-contrasena`, {
      actualContrasena: currentPassword,
      nuevaContrasena: newPassword,
    })
      .then(() => {
        setSuccessMessage('Contraseña actualizada con éxito. Redirigiendo al inicio de sesión...');
        localStorage.removeItem('access_token'); // Asegúrate de eliminar el token JWT
        localStorage.removeItem('userId'); // Elimina también otros datos de la sesión
        setTimeout(() => navigate('/login'), 2000);
      })
      .catch((error) => {
        const backendMessage = error.response?.data?.message || 'Error al cambiar la contraseña.';
        setErrorMessage(backendMessage);
      });

  };

  return (
    <div className="container">
      <div className="container-editar-perfil">
        <h1 className="editar-perfil-title">Editar perfil</h1>
        <div className="editar-perfil-box">
          <form className='editar-perfil-form'>
            <label htmlFor="Nombre">Nombre</label>
            <input name="Nombre" type="text" value={formData.Nombre || ''} onChange={handleChange} />
            <label htmlFor="Apellido">Apellido</label>
            <input name="Apellido" type="text" value={formData.Apellido || ''} onChange={handleChange} />
            <label htmlFor="Correo">Correo</label>
            <input name="Correo" type="email" value={formData.Correo || ''} onChange={handleChange} />
            <button type="button" onClick={handleGuardarCambios}>Guardar cambios</button>
          </form>

          <div className="container-cambiarContrasena">
            <h2>Cambiar Contraseña</h2>
            <label htmlFor="">Contraseña actual</label>
            <input
              type="password"
              placeholder="Contraseña actual"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <label htmlFor="">Nueva contraseña</label>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label htmlFor="">Confirmar contraseña</label>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className='button-actualizar-contrasena' onClick={handlePasswordChange}>Actualizar Contraseña</button>
          </div>

          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default EditarPerfil;
