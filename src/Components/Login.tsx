import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";  
import "../styles/Login.css";

const Login: React.FC = () => {
    const [correo, setCorreo] = useState<string>("");
    const [contrasena, setContrasena] = useState<string>("");
    const [error, setError] = useState<string>("");
    

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (correo === "test@example.com" && contrasena === "123456") {
            login("1");
            window.location.href = "/home";
        } else {
            setError("Correo o contraseña incorrectos");
        }
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="correo">Correo:</label>
                    <input
                        type="email"
                        id="correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contrasena">Contraseña:</label>
                    <input
                        type="password"
                        id="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
