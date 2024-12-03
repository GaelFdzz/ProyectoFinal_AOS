import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    element: JSX.Element;
    roleRequired?: string; // Aquí añadimos la posibilidad de pasar el rol requerido
}

const PrivateRoute = ({ element, roleRequired }: PrivateRouteProps) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        try {
            const decodedToken: any = jwtDecode(token);

            // Verifica si el token ha expirado
            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem("access_token");
                return <Navigate to="/login" replace />;
            }

            // Si se requiere un rol y el token no tiene el rol adecuado, redirige
            if (roleRequired && decodedToken.role !== parseInt(roleRequired)) {
                return <Navigate to="/perfil" replace />;
            }

            // Si todo es correcto, mostramos el componente protegido
            return element;

        } catch (error) {
            console.error("Error al decodificar el token:", error);
            return <Navigate to="/login" replace />;
        }
    }

    // Si no hay token, mostramos el componente solicitado
    return element;
};

export default PrivateRoute;
