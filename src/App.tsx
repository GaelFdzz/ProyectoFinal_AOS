import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./pages/Home"
import Footer from "./components/Footer"
import "./styles/App.css"
import Contacto from "./pages/Contacto"
import Perfil from "./components/Perfil"
import EditarPerfil from "./components/EditarPerfil"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/perfil" element={<Perfil />} /> {/* Ruta correcta para Perfil */}
        <Route path="/editar-perfil" element={<EditarPerfil />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
