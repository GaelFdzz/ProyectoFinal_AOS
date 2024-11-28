import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./pages/Home"
import Footer from "./components/Footer"
import "./styles/App.css"
import Contacto from "./pages/Contacto"
import { CarritoProvider } from "./context/carritoContext"
import Carrito from "./pages/Carrito"
import CheckoutPage from "./pages/CheckoutPage"
import DetallesProducto from "./components/DetallesProducto"
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <CarritoProvider>
      <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/productos/:id" element={<DetallesProducto />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </>
    </CarritoProvider>
  )
}

export default App;
