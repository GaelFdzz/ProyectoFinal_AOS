import { Link } from "react-router-dom"
import "../styles/Header.css"

function Header() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">SellPhone</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Tienda</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                {/* Aquí está el enlace para acceder al perfil */}
                <Link className="nav-link" to="/perfil">Mi perfil</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
