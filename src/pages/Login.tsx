import { useState, useEffect } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Este useEffect verifica si ya hay un token en el localStorage
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Si ya hay un token, redirige al perfil o dashboard
      navigate("/perfil"); // O puedes redirigir a "/dashboard" según tu flujo de trabajo
    }
  }, [navigate]); // Ejecutar el useEffect solo cuando el componente se monta

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

      // Guardar el token en localStorage
      localStorage.setItem("access_token", response.data.access_token);

      // Decodificar el token para verificar el rol
      const decodedToken: any = jwtDecode(response.data.access_token);
      const isAdmin = decodedToken.role === 1;

      // Redirigir al dashboard si es admin, o a perfil si no lo es
      if (isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/perfil");
      }

      // Forzar la actualización del estado en el Header
      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError("Correo o contraseña incorrectos");
    }
  };



  const handleRegister = async () => {
    const userData = {
      name: name,
      apellido: apellido,
      email: email,
      password: password,
    };

    try {
      await axios.post('http://localhost:3000/auth', userData);
      navigate('/login'); // O donde desees redirigir
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
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
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
