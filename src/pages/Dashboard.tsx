import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    Nombre: "",
    Descripcion: "",
    Precio: "",
    Stock: "",
    Categoria: "",
    Imagen: null,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/productos");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      Imagen: event.target.files ? event.target.files[0] : null,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = new FormData();
    form.append("Nombre", formData.Nombre);
    form.append("Descripcion", formData.Descripcion);
    form.append("Precio", formData.Precio);
    form.append("Stock", formData.Stock);
    form.append("Categoria", formData.Categoria);
    if (formData.Imagen) form.append("Imagen", formData.Imagen);

    try {
      await axios.post("http://localhost:3000/productos", form);
      fetchProducts();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard de Productos</h1>
      <button className="btn add" onClick={() => setShowAddForm(true)}>Añadir Producto</button>
      {showAddForm && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>Nombre:</label>
            <input type="text" name="Nombre" onChange={handleInputChange} required />
            <label>Descripción:</label>
            <input type="text" name="Descripcion" onChange={handleInputChange} required />
            <label>Precio:</label>
            <input type="number" name="Precio" onChange={handleInputChange} required />
            <label>Stock:</label>
            <input type="number" name="Stock" onChange={handleInputChange} required />
            <label>Categoría:</label>
            <input type="text" name="Categoria" onChange={handleInputChange} required />
            <label>Imagen:</label>
            <input type="file" name="Imagen" onChange={handleFileChange} />
            <button className="btn save" type="submit">Guardar</button>
          </form>
        </div>
      )}
      <div className="productList">
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.Id_Producto}>
                <td>
                  <img src={`http://localhost:3000${product.Imagen || "/iphone.png"}`} alt={product.Nombre} className="product-image" />
                </td>
                <td>{product.Nombre}</td>
                <td>{product.Descripcion}</td>
                <td>{product.Precio}</td>
                <td>{product.Stock}</td>
                <td>
                  <button className="btn edit" onClick={() => setShowEditForm(true)}>Editar</button>
                  <button className="btn delete">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
