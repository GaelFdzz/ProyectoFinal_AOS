import { useState, useRef, useEffect } from "react";
import axios from "axios"; // Importamos Axios
import "../styles/Dashboard.css";
import { Producto } from '../interfaces/producto';

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Producto | null>(null);
  const [formData, setFormData] = useState<Producto>({
    Id_Producto: 0,
    Nombre: "",
    Descripcion: "",
    Precio: 0, // Cambiado a número
    Stock: 0,  // Cambiado a número
    category: "",
    Imagen: null,
  });

  // Referencia para el input de archivo
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Obtener productos desde el backend
  useEffect(() => {
    axios.get("http://localhost:3000/productos")
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error al obtener los productos", error);
      });
  }, []);

  // Manejar cambios en los campos del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar cambio de archivo (imagen)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedFormats = ["image/jpeg", "image/png"];
      if (allowedFormats.includes(file.type)) {
        setFormData({ ...formData, Imagen: file });
      } else {
        alert("Por favor, sube un archivo en formato .jpg o .png.");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  // Agregar nuevo producto (POST)
  const handleAddProduct = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.Nombre);
    formDataToSend.append("description", formData.Descripcion);
    formDataToSend.append("price", formData.Precio.toString());
    formDataToSend.append("stock", formData.Stock.toString());
    formDataToSend.append("category", formData.category);
    if (formData.Imagen) {
      formDataToSend.append("imagen", formData.Imagen);
    }

    axios.post("http://localhost:3000/productos", formDataToSend)
      .then(response => {
        setProducts(prevState => [...prevState, response.data]);
        setFormData({
          Id_Producto: 0,
          Nombre: "",
          Descripcion: "",
          Precio: 0,
          Stock: 0,
          category: "",
          Imagen: null,
        });
        setShowAddForm(false);
      })
      .catch(error => {
        console.error("Error al agregar el producto", error);
      });
  };

  // Editar producto (PUT)
  const handleEditProduct = (product: Producto) => {
    setEditProduct(product);  // Actualiza el producto a editar
    setFormData(product);      // Prellena el formulario con los datos actuales del producto
    setShowEditForm(true);     // Muestra el formulario de edición
  };

  const handleSaveEdit = () => {
    if (!editProduct) {
      console.error("No hay producto seleccionado para editar");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.Nombre);
    formDataToSend.append("description", formData.Descripcion);
    formDataToSend.append("price", formData.Precio.toString());
    formDataToSend.append("stock", formData.Stock.toString());
    formDataToSend.append("category", formData.category);
    if (formData.Imagen) {
      formDataToSend.append("imagen", formData.Imagen);
    }

    axios.put(`http://localhost:3000/productos/${editProduct.Id_Producto}`, formDataToSend)
      .then(response => {
        setProducts(prevState =>
          prevState.map(p => (p.Id_Producto === editProduct.Id_Producto ? response.data : p))
        );
        setEditProduct(null);
        setFormData({
          Id_Producto: 0,
          Nombre: "",
          Descripcion: "",
          Precio: 0,
          Stock: 0,
          category: "",
          Imagen: null,
        });
        setShowEditForm(false);
      })
      .catch(error => {
        console.error("Error al actualizar el producto", error);
      });
  };

  // Eliminar producto (DELETE)
  const handleDeleteProduct = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/productos/${id}`);
      console.log('Producto eliminado');
      // Actualizar la UI después de la eliminación (por ejemplo, removiendo el producto de la lista)
    } catch (error) {
      console.error('Error al eliminar el producto', error);
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
              <th>Descripción</th>
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
                <td>{product.Descripcion}</td>
                <td>
                  {product.Imagen ? (
                    <img
                      src={`http://localhost:3000${product.Imagen}`}
                      alt="Producto"
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
      </div>
    </div>
  );
};

export default Dashboard;