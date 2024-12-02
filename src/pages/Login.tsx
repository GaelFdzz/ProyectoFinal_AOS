import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const toggleView = () => {
    setIsLogin(!isLogin);
    setError(""); 
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError("Por favor, rellena todos los campos.");
    } else if (!email.includes('@')) {
      setError("El correo electrónico debe contener '@'.");
    } else {
      setError("");
      console.log("Iniciar sesión con:", email, password);
      navigate("/"); 
    }
  };

  const handleRegister = () => {
    if (!name || !email || !password) {
      setError("Por favor, rellena todos los campos.");
    } else if (!email.includes('@')) {
      setError("El correo electrónico debe contener '@'.");
    } else {
      setError("");
      console.log("Registrar con:", name, email, password);
      navigate("/");
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