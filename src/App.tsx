import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";
import CheckoutPage from "./pages/CheckoutPage";
import DetallesProducto from "./components/DetallesProducto";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Perfil from "./components/Perfil";
import EditarPerfil from "./components/EditarPerfil";
import TawkToChat from "./components/TawkToChat";
import PrivateRoute from "./components/PrivateRoute";
import { CarritoProvider } from "./context/carritoContext";
import { jwtDecode } from "jwt-decode";
import Pago from "./pages/Pago"; // Importa la nueva página de pagos

function App() {

  // Función para obtener el userId desde el token
  const getUserIdFromToken = (): number | null => {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.sub; // Asegúrate de que este campo sea el `Id_Usuario`
    } catch (error) {
      console.error("Error decodificando el token:", error);
      return null;
    }
  };

  const userId = getUserIdFromToken();
  console.log('userId desde el token:', userId);

  return (
    <CarritoProvider userId={userId}>
      <>
        <TawkToChat />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/productos/:id" element={<DetallesProducto />} />
          <Route path="/pago" element={<Pago />} /> {/* Nueva ruta para la página de pagos */}

          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} roleRequired="1" />}
          />
          <Route
            path="/login"
            element={<PrivateRoute element={<Login />} />}
          />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />
        </Routes>
        <Footer />
      </>
    </CarritoProvider>
  );
}

export default App;
