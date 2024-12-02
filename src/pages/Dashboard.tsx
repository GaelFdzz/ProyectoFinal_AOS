<<<<<<< HEAD
import { useState, useRef } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> 2f62dbe9157dc1cf72f4226eab97e6f94d60f7c3
import "../styles/Dashboard.css";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  image: File | null;
}

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
<<<<<<< HEAD
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });

  // Referencia para el input de archivo
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedFormats = ["image/jpeg", "image/png"];
      if (allowedFormats.includes(file.type)) {
        setFormData({ ...formData, image: file });
      } else {
        alert("Por favor, sube un archivo en formato .jpg o .png.");
      
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  const handleAddProduct = () => {
    setProducts([...products, { ...formData, id: Date.now() }]);
    setFormData({
      id: 0,
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      image: null,
    });
    setShowAddForm(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setFormData(product);
    setShowEditForm(true);
  };

  const handleSaveEdit = () => {
    setProducts(
      products.map((p) =>
        p.id === editProduct?.id ? { ...editProduct, ...formData } : p
      )
    );
    setEditProduct(null);
    setFormData({
      id: 0,
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "",
      image: null,
    });
    setShowEditForm(false);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
=======
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
>>>>>>> 2f62dbe9157dc1cf72f4226eab97e6f94d60f7c3
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
<<<<<<< HEAD
              <th>Producto</th>
              <th>Descripción</th>
=======
>>>>>>> 2f62dbe9157dc1cf72f4226eab97e6f94d60f7c3
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
<<<<<<< HEAD
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td> {/* Se muestra la descripción */}
=======
              <tr key={product.Id_Producto}>
>>>>>>> 2f62dbe9157dc1cf72f4226eab97e6f94d60f7c3
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
<<<<<<< HEAD

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
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
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
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
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
=======
>>>>>>> 2f62dbe9157dc1cf72f4226eab97e6f94d60f7c3
      </div>
    </div>
  );
};

export default Dashboard;
