import { Link } from "react-router-dom"
import "../styles/Header.css"
function Header() {

    return (
        <>
            <header>
                <div className="containerHeader">
                    <div className="tittleSellPhone">
                        <h1>SellPhone</h1>
                    </div>

                    <div className="searchbarHeader">
                        <input type="text" placeholder="Buscar" />
                        <button>Buscar</button>
                    </div>

                    <div className="navbarHeader">
                        <nav>
                            <ul>
                                <li><Link to="/">Tienda</Link></li>
                                <li><Link to="/carrito">Carrito</Link></li>
                                <li><Link to="/contacto">Contactanos</Link></li>
                                <li><Link to="/contacto">Dashboard</Link></li>
                                <li><Link to="/contacto">Mi perfil</Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header