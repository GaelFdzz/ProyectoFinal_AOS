import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./pages/Home"
import Footer from "./components/Footer"
import "./styles/App.css"
import Contacto from "./pages/Contacto"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />A
      </Routes>

      <Footer />
    </>
  )
}

export default App