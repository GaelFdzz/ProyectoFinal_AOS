import { useState, useRef, useEffect } from "react";
import "../styles/Dashboard.css";
import api from "../Services/axiosConfig";
import { Producto } from "../interfaces/producto";

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Producto[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Producto | null>(null);
  const [formData, setFormData] = useState<Producto>({
    Id_Producto: 0,
    Nombre: "",
    Descripcion: "",
    Precio: 0,
    Stock: 0,
    Imagen: null,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const resetForm = () => {
    setFormData({
      Id_Producto: 0,
      Nombre: "",
      Descripcion: "",
      Precio: 0,
      Stock: 0,
      Imagen: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/productos");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "Precio" || name === "Stock" ? Math.max(0, Number(value)) : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedFormats = ["image/jpeg", "image/png"];
      if (allowedFormats.includes(file.type)) {
        setFormData({ ...formData, Imagen: file });
      } else {
        alert("Por favor, sube un archivo en formato .jpg o .png.");
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    }
  };

  const handleAddProduct = async () => {
    if (!validateForm()) {
      return; // Detén la ejecución si el formulario no es válido
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Nombre", formData.Nombre);
      formDataToSend.append("Descripcion", formData.Descripcion);
      formDataToSend.append("Precio", formData.Precio.toString());
      formDataToSend.append("Stock", formData.Stock.toString());
      if (formData.Imagen instanceof File) {
        formDataToSend.append("Imagen", formData.Imagen);
      }

      const response = await api.post("/productos", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts([...products, response.data]);
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };


  const handleEditProduct = (product: Producto) => {
    setEditProduct(product);
    setFormData({
      ...product,
      Imagen: null,
    });
    setShowEditForm(true);
  };

  const handleSaveEdit = async () => {
    if (!validateForm()) {
      return; // Detén la ejecución si el formulario no es válido
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("Nombre", formData.Nombre);
      formDataToSend.append("Descripcion", formData.Descripcion);
      formDataToSend.append("Precio", formData.Precio.toString());
      formDataToSend.append("Stock", formData.Stock.toString());

      if (formData.Imagen instanceof File) {
        formDataToSend.append("Imagen", formData.Imagen);
      }

      const response = await api.put(
        `/productos/${editProduct?.Id_Producto}`,
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setProducts(products.map((p) =>
        p.Id_Producto === editProduct?.Id_Producto ? response.data : p
      ));
      setShowEditForm(false);
      resetForm();
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };



  const handleDeleteProduct = async (id: number) => {
    try {
      // Intenta eliminar el producto
      await api.delete(`/productos/${id}`);
      setProducts(products.filter((p) => p.Id_Producto !== id));
    } catch (error: any) {
      // Si hay un error con dependencias activas, pide confirmación
      if (error.response && error.response.status === 400) {
        const confirmar = window.confirm(
          `${error.response.data.message}\n¿Deseas eliminar todas las dependencias y el producto?`,
        );
        if (confirmar) {
          try {
            await api.delete(`/productos/${id}?confirm=true`);
            setProducts(products.filter((p) => p.Id_Producto !== id));
          } catch (error) {
            console.error("Error al eliminar producto con confirmación:", error);
          }
        }
      } else {
        console.error("Error al eliminar producto:", error);
      }
    }
  };

  const validateForm = (): boolean => {
    if (!formData.Nombre.trim()) {
      alert("El nombre del producto es obligatorio.");
      return false;
    }
    if (!formData.Descripcion.trim()) {
      alert("La descripción del producto es obligatoria.");
      return false;
    }
    if (formData.Precio <= 0) {
      alert("El precio debe ser mayor a 0.");
      return false;
    }
    if (formData.Stock < 0) {
      alert("El stock no puede ser negativo.");
      return false;
    }
    if (!showEditForm && !(formData.Imagen instanceof File)) {
      alert("Por favor, sube una imagen válida.");
      return false;
    }
    return true;
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.Id_Producto}>
                <td>{product.Nombre}</td>
                <td>{product.Descripcion}</td>
                <td>
                  {typeof product.Imagen === "string" ? (
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
              <label htmlFor="Nombre">Nombre</label>
              <input type="text" name="Nombre" placeholder="Nombre del producto" value={formData.Nombre} onChange={handleInputChange} />
              
              <label htmlFor="Descripcion">Descripcion</label>
              <textarea name="Descripcion" placeholder="Descripción" value={formData.Descripcion} onChange={handleInputChange} />
              
              <label htmlFor="Precio">Precio</label>
              <input type="number" name="Precio" placeholder="Precio" value={formData.Precio} onChange={handleInputChange} />
              
              <label htmlFor="Stock">Stock</label>
              <input type="number" name="Stock" placeholder="Existencias" value={formData.Stock} onChange={handleInputChange} />
              
              <label htmlFor="Imagen">Imagen</label>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} />
              <button type="button" className="btn save" onClick={handleAddProduct}>
                Guardar
              </button>
              <button type="button" className="btn cancel" onClick={() => setShowAddForm(false)}>
                Cancelar
              </button>
            </form>
          </div>
        )}
        {showEditForm && (
          <div className="form-container">
            <h2>Modificar producto</h2>
            <form>

              <label htmlFor="Nombre">Nombre del producto</label>
              <input
                type="text"
                name="Nombre"
                placeholder="Nombre del producto"
                value={formData.Nombre}
                onChange={handleInputChange}
              />

              <label htmlFor="Descripcion">Descripcion</label>
              <textarea
                name="Descripcion"
                placeholder="Descripción"
                value={formData.Descripcion}
                onChange={handleInputChange}
              />

              <label htmlFor="Precio">Precio</label>
              <input
                type="number"
                name="Precio"
                placeholder="Precio"
                value={formData.Precio}
                onChange={handleInputChange}
              />

              <label htmlFor="Stock">Stock</label>
              <input
                type="number"
                name="Stock"
                placeholder="Existencias"
                value={formData.Stock}
                onChange={handleInputChange}
              />

              {/* Mostrar imagen actual del producto */}
              {editProduct?.Imagen && (
                <div className="image-preview">
                  <p>Imagen actual</p>
                  <img
                    src={`http://localhost:3000${editProduct.Imagen}`}
                    alt="Imagen actual del producto"
                    className="product-image"
                  />
                </div>
              )}

              {/* Campo para cargar una nueva imagen */}
              <label htmlFor="Imagen">Actualizar Imagen</label>
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
              <button
                type="button"
                className="btn cancel"
                onClick={() => setShowEditForm(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
