import React, { createContext, useState, useContext, ReactNode } from "react";

// Definir el tipo de datos que manejará el contexto de autenticación
interface AuthContextType {
    usuarioId: string | null;
    login: (id: string) => void;
    logout: () => void;
}

// Crear el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para utilizar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};

// Proveedor de autenticación para envolver la aplicación
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [usuarioId, setUsuarioId] = useState<string | null>(localStorage.getItem("usuario_id"));

    // Función para iniciar sesión y guardar el ID en el contexto y en localStorage
    const login = (id: string) => {
        setUsuarioId(id);
        localStorage.setItem("usuario_id", id);
    };

    // Función para cerrar sesión y limpiar el contexto y localStorage
    const logout = () => {
        setUsuarioId(null);
        localStorage.removeItem("usuario_id");
    };

    return (
        <AuthContext.Provider value={{ usuarioId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
