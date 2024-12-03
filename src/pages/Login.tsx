import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");  // Asegúrate de tener un estado para el apellido
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const toggleView = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: email,
        password: password,
      });
      console.log('Login successful', response.data);
      localStorage.setItem("access_token", response.data.access_token); // Guardar el token
      navigate('/dashboard'); // Redirigir al dashboard o donde sea necesario
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError("Correo o contraseña incorrectos");
    }
  };

  const handleRegister = async () => {
    const userData = {
      name: name,           // El nombre del usuario
      apellido: apellido,   // El apellido del usuario
      email: email,         // El correo electrónico
      password: password,   // La contraseña
    };

    try {
      const response = await axios.post('http://localhost:3000/auth', userData);
      console.log('Registro exitoso:', response.data);
    } catch (error) {
      console.error('Error al registrar:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-container">
      <div className={`panel ${isLogin ? "login" : "register"}`}>
        {isLogin ? (
          <div className="login-section">
            <div className="form">
              <h2>Iniciar Sesión</h2>
              <input
                type="text"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn-login" onClick={handleLogin}>INICIAR SESIÓN</button>
              {error && <p className="error">{error}</p>}
            </div>
            <div className="welcome">
              <h2>¡Bienvenido de nuevo!</h2>
              <p>Ingresa tus credenciales para acceder a tu cuenta.</p>
              <button onClick={toggleView} className="btn-secondary">
                REGÍSTRATE
              </button>
            </div>
          </div>
        ) : (
          <div className="register-section">
            <div className="welcome">
              <h2>¡Regístrate en SellPhone!</h2>
              <p>Crea una cuenta y comienza a explorar nuestros teléfonos.</p>
              <button onClick={toggleView} className="btn-secondary">
                INICIA SESIÓN
              </button>
            </div>
            <div className="form">
              <h2>Crear cuenta</h2>
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Apellido"  // Agregar el campo de apellido
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}  // Debes crear un estado para 'apellido'
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn-register" onClick={handleRegister}>REGISTRARME</button>
              {error && <p className="error">{error}</p>}
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Login;