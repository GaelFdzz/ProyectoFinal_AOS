import ProductosList from "../components/productosList"

function Home() {
    return (
        <>
            <div className="container">
                <div className="tittlePageProducts">
                    <h1>Catalogo de productos</h1>
                </div>
                <div>
                    <ProductosList />
                </div>
            </div>
        </>
    )
}

export default Home