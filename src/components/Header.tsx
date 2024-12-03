import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

function Header() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate(); // Hook para redirigir a otras páginas

    // Este useEffect revisa si hay un token en el localStorage y actualiza los estados
    const updateAuthState = () => {
        const token = localStorage.getItem("access_token");
        if (token) {
            try {
                const decodedToken: any = jwtDecode(token);
                setIsAdmin(decodedToken.role === 1); // Verifica si el rol es de administrador
                setIsAuthenticated(true); // Establece la sesión como autenticada
            } catch (error) {
                console.error("Error al decodificar el token:", error);
                setIsAuthenticated(false);
                setIsAdmin(false);
            }
        } else {
            setIsAuthenticated(false);
            setIsAdmin(false);
        }
    };

    // Este useEffect se ejecuta cada vez que el componente se monta o el token cambia
    useEffect(() => {
        updateAuthState(); // Al montar el componente o cambiar el token

        // Definimos una función para forzar el componente a actualizarse
        const handleStorageChange = () => {
            updateAuthState(); // Actualiza el estado cuando el token cambia
        };

        // Registramos el evento que escucha cambios en el localStorage
        window.addEventListener("storage", handleStorageChange);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []); // Solo se ejecuta cuando el componente se monta

    // Función para cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem("access_token"); // Elimina el token
        updateAuthState(); // Actualiza el estado después de cerrar sesión
        navigate("/login"); // Redirige al login
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    SellPhone
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Tienda
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/carrito">
                                Carrito
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contacto">
                                Contacto
                            </Link>
                        </li>
                        {isAdmin && isAuthenticated && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/perfil">
                                    Mi perfil
                                </Link>
                            </li>
                        )}
                        {isAuthenticated ? (
                            <li className="nav-item">
                                <button className="nav-link btn" onClick={handleLogout}>
                                    Cerrar sesión
                                </button>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Iniciar sesión
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
