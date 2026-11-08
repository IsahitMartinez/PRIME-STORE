import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { Plus, Pencil, Trash2, X, Lock } from "lucide-react";

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem("prime_admin_auth") === "true";
  });
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    categoria: "",
    image_url: "",
    stock: "",
    colors: "",
  });

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) console.error("Error cargando productos:", error);
    else setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "PRIME2026") {
      setIsAuthenticated(true);
      sessionStorage.setItem("prime_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Contraseña incorrecta. Intenta de nuevo.");
      setPassword("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("prime_admin_auth");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name || "",
        price: product.price || "",
        categoria: product.category || product.categoria || "",
        image_url: product.image_url || "",
        stock: product.stock || "",
        colors: product.colors || "",
      });
    } else {
      setEditingId(null);
      setFormData({ name: "", price: "", categoria: "", image_url: "", stock: "", colors: "" });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.categoria, 
      image_url: formData.image_url,
      stock: parseInt(formData.stock),
      colors: formData.colors,
    };

    if (editingId) {
      const { error } = await supabase.from("products").update(payload).eq("id", editingId);
      if (error) alert("Error actualizando: " + error.message);
    } else {
      const { error } = await supabase.from("products").insert([payload]);
      if (error) alert("Error creando: " + error.message);
    }
    closeModal();
    fetchProducts();
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${name}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) alert("Error eliminando: " + error.message);
    else fetchProducts();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#fefefc] flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-black" size={28} />
          </div>
          <h1 className="text-5xl text-black mb-2" style={{ fontFamily: "Bebas Neue" }}>
            ACCESO RESTRINGIDO
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Ingresa tu contraseña maestra para administrar el catálogo de PRIME.
          </p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 text-center text-black px-6 py-4 rounded-full outline-none focus:border-black transition-all tracking-widest"
              autoFocus
            />
            {loginError && <p className="text-red-500 text-xs font-bold">{loginError}</p>}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-black text-white rounded-full font-bold text-sm tracking-widest transition-all hover:bg-gray-800 hover:-translate-y-1 shadow-lg cursor-pointer"
            >
              ENTRAR
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-5xl text-black" style={{ fontFamily: "Bebas Neue" }}>
              PANEL DE CONTROL
            </h1>
            <p className="text-gray-500 font-medium mt-1">Gestiona el inventario de PRIME</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors cursor-pointer"
            >
              CERRAR SESIÓN
            </button>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full font-bold text-sm tracking-widest hover:bg-gray-800 transition-all active:scale-95 cursor-pointer"
            >
              <Plus size={18} />
              NUEVO PRODUCTO
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100/50 border-b border-gray-200 text-xs uppercase tracking-widest text-gray-500">
                  <th className="p-5 font-semibold">Producto</th>
                  <th className="p-5 font-semibold">Categoría</th>
                  <th className="p-5 font-semibold">Precio</th>
                  <th className="p-5 font-semibold">Stock</th>
                  <th className="p-5 font-semibold">Colores</th>
                  <th className="p-5 font-semibold text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-gray-400 font-medium">
                      Cargando inventario...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-gray-400 font-medium">
                      No hay productos registrados.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => {
                    // Extraemos solo la primera imagen para mostrarla en la tabla
                    const firstImage = p.image_url ? p.image_url.split(",")[0].trim() : "";
                    
                    return (
                      <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-5 flex items-center gap-4">
                          {firstImage ? (
                            <img 
                              src={firstImage} 
                              alt={p.name} 
                              className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-200 border border-gray-300" />
                          )}
                          <span className="font-bold text-sm">{p.name}</span>
                        </td>
                        <td className="p-5 text-sm text-gray-500">{p.categoria || p.category || "N/A"}</td>
                        <td className="p-5 text-sm font-semibold text-green-600">${p.price}</td>
                        <td className="p-5 text-sm font-semibold">
                          <span className={p.stock <= 0 ? "text-red-500" : "text-black"}>
                            {p.stock} pz
                          </span>
                        </td>
                        <td className="p-5 text-sm text-gray-500 truncate max-w-[150px]">
                          {p.colors || "Único"}
                        </td>
                        <td className="p-5 text-right space-x-2">
                          <button 
                            onClick={() => openModal(p)}
                            className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                          >
                            <Pencil size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(p.id, p.name)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-[2rem] p-8 relative shadow-2xl overflow-y-auto max-h-[90vh]">
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>

            <h2 className="text-4xl text-black mb-6" style={{ fontFamily: "Bebas Neue" }}>
              {editingId ? "EDITAR PRENDA" : "NUEVA PRENDA"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Nombre</label>
                <input 
                  type="text" name="name" required
                  value={formData.name} onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Precio ($)</label>
                  <input 
                    type="number" step="0.01" name="price" required
                    value={formData.price} onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Stock</label>
                  <input 
                    type="number" name="stock" required
                    value={formData.stock} onChange={handleInputChange}
                    className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Categoría</label>
                <input 
                  type="text" name="categoria" required placeholder="Ej: HOODIES, TEES..."
                  value={formData.categoria} onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-colors uppercase"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">
                  Colores (Separados por coma)
                </label>
                <input 
                  type="text" name="colors" placeholder="Ej: Negro, Blanco, Azul..."
                  value={formData.colors} onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-colors capitalize"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">
                  URLs de las Imágenes (Separadas por coma)
                </label>
                {/* Cambiamos a textarea para que sea más fácil pegar URLs largas */}
                <textarea 
                  name="image_url" required rows="3"
                  placeholder="Ej: https://imagen1.jpg, https://imagen2.jpg"
                  value={formData.image_url} onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl outline-none focus:border-black transition-colors text-sm resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white py-4 rounded-full font-bold tracking-widest uppercase mt-4 hover:bg-gray-800 transition-all hover:-translate-y-1 cursor-pointer"
              >
                {editingId ? "GUARDAR CAMBIOS" : "CREAR PRODUCTO"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;