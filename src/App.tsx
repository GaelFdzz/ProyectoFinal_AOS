import React from "react";
import { AuthProvider } from "./Context/AuthContext";  // Importa el AuthProvider
import Login from "./Components/Login";  // Asegúrate de que la ruta sea correcta

const App: React.FC = () => {
    return (
        <AuthProvider>  {/* Envolver la aplicación en AuthProvider */}
            <Login />
        </AuthProvider>
    );
};

export default App;
