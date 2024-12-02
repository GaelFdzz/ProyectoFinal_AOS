import { useState } from "react";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleAddProduct = () => {
    setProducts([...products, { ...formData, id: Date.now() }]);
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      image: null,
    });
    setShowAddForm(false);
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setFormData(product);
    setShowEditForm(true);
  };

  const handleSaveEdit = () => {
    setProducts(
      products.map((p) =>
        p.id === editProduct.id ? { ...editProduct, ...formData } : p
      )
    );
    setEditProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      image: null,
    });
    setShowEditForm(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="container">
      <div className="dashboard">
        <h1>Gestión de productos</h1>
        <button className="btn add" onClick={() => setShowAddForm(true)}>
          Agregar producto
        </button>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Imagen</th>
              <th>Existencias</th>
              <th>Precio</th>
              <th>Ventas</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  {product.image ? (
                    <img
                      src={URL.createObjectURL(product.image)}
                      alt="Producto"
                      className="product-image"
                    />
                  ) : (
                    "Sin imagen"
                  )}
                </td>
                <td>{product.stock}</td>
                <td>${product.price} MXN</td>
                <td>0</td>
                <td>
                  <button
                    className="btn edit"
                    onClick={() => handleEditProduct(product)}
                  >
                    Modificar
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showAddForm && (
          <div className="form-container">
            <h2>Registrar nuevo producto</h2>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Nombre del producto"
                value={formData.name}
                onChange={handleInputChange}
              />
              <textarea
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Precio"
                value={formData.price}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Tablets">Tablets</option>
                <option value="Accesorios">Accesorios</option>
              </select>
              <input type="file" onChange={handleFileChange} />
              <button
                type="button"
                className="btn save"
                onClick={handleAddProduct}
              >
                Agregar producto
              </button>
            </form>
          </div>
        )}

        {showEditForm && (
          <div className="form-container">
            <h2>Modificar producto</h2>
            <form>
              <input
                type="text"
                name="name"
                placeholder="Nombre del producto"
                value={formData.name}
                onChange={handleInputChange}
              />
              <textarea
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="price"
                placeholder="Precio"
                value={formData.price}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleInputChange}
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="">Selecciona una categoría</option>
                <option value="Smartphones">Smartphones</option>
                <option value="Tablets">Tablets</option>
                <option value="Accesorios">Accesorios</option>
              </select>
              <input type="file" onChange={handleFileChange} />
              <button
                type="button"
                className="btn save"
                onClick={handleSaveEdit}
              >
                Guardar cambios
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;