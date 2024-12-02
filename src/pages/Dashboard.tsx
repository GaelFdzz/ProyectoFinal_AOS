import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editProduct, setEditProduct] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    Nombre: "",
    Descripcion: "",
    Precio: "",
    Stock: "",
    Categoria: "",
    Imagen: null,
  });
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, Imagen: e.target.files ? e.target.files[0] : null });
  };

  // Añadir producto
  const handleAddProduct = async () => {
    const form = new FormData();
    form.append("Nombre", formData.Nombre);
    form.append("Descripcion", formData.Descripcion);
    form.append("Precio", formData.Precio);
    form.append("Stock", formData.Stock);
    form.append("Categoria", formData.Categoria);
    if (formData.Imagen) form.append("Imagen", formData.Imagen);

    try {
      await axios.post("http://localhost:3000/productos", form);
      fetchProducts();  // Recarga los productos
      setShowAddForm(false);  // Cierra el formulario
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  // Editar producto
  const handleEditProduct = (product: any) => {
    setEditProduct(product);
    setFormData({
      Nombre: product.Nombre,
      Descripcion: product.Descripcion,
      Precio: product.Precio,
      Stock: product.Stock,
      Categoria: product.Categoria,
      Imagen: null,
    });
    setShowEditForm(true);
  };

  const handleSaveEdit = async () => {
    const form = new FormData();
    form.append("Nombre", formData.Nombre);
    form.append("Descripcion", formData.Descripcion);
    form.append("Precio", formData.Precio);
    form.append("Stock", formData.Stock);
    form.append("Categoria", formData.Categoria);
    if (formData.Imagen) form.append("Imagen", formData.Imagen);

    try {
      await axios.put(`http://localhost:3000/productos/${editProduct.Id_Producto}`, form);
      fetchProducts();  // Recarga los productos
      setShowEditForm(false);  // Cierra el formulario de edición
      setEditProduct(null);  // Limpia la edición
    } catch (error) {
      console.error("Error al modificar producto:", error);
    }
  };

  // Eliminar producto con confirmación
  const handleDeleteProduct = async (productId: number) => {
    if (confirmDelete === productId) {
      try {
        await axios.delete(`http://localhost:3000/productos/${productId}`);
        fetchProducts();  // Recarga los productos
        setConfirmDelete(null);  // Resetea la confirmación de eliminación
      } catch (error) {
        console.error("Error al eliminar producto:", error);
      }
    } else {
      setConfirmDelete(productId);
    }
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
              <tr key={product.Id_Producto}>
                <td>{product.Nombre}</td>
                <td>
                  {product.Imagen ? (
                    <img
                      src={`http://localhost:3000${product.Imagen}`}
                      alt={product.Nombre}
                      className="product-image"
                    />
                  ) : (
                    "Sin imagen"
                  )}
                </td>
                <td>{product.Stock}</td>
                <td>${product.Precio} MXN</td>
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
                    onClick={() => handleDeleteProduct(product.Id_Producto)}
                  >
                    {confirmDelete === product.Id_Producto ? "Confirmar" : "Eliminar"}
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
                name="Nombre"
                placeholder="Nombre del producto"
                value={formData.Nombre}
                onChange={handleInputChange}
              />
              <textarea
                name="Descripcion"
                placeholder="Descripción"
                value={formData.Descripcion}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="Precio"
                placeholder="Precio"
                value={formData.Precio}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="Stock"
                placeholder="Stock"
                value={formData.Stock}
                onChange={handleInputChange}
              />
              <select
                name="Categoria"
                value={formData.Categoria}
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
                name="Nombre"
                placeholder="Nombre del producto"
                value={formData.Nombre}
                onChange={handleInputChange}
              />
              <textarea
                name="Descripcion"
                placeholder="Descripción"
                value={formData.Descripcion}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="Precio"
                placeholder="Precio"
                value={formData.Precio}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="Stock"
                placeholder="Stock"
                value={formData.Stock}
                onChange={handleInputChange}
              />
              <select
                name="Categoria"
                value={formData.Categoria}
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
