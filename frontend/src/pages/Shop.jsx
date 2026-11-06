import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductDetailModal from "../components/ProductDetailModal";
import ToastNotification from "../components/ToastNotification";
import { supabase } from "../lib/supabase";

function Shop({ addToCart, cartCount, openCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filtros por categoría
  const [selectedCategory, setSelectedCategory] = useState("TODOS");

  // Estado del Toast Notification
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase.from("products").select("*");
        if (error) {
          console.error("Error al cargar productos:", error.message);
        } else {
          setProducts(data || []);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const triggerToast = (productName) => {
    setToastMessage(`¡${productName} añadido al carrito!`);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  const handleAddToCart = (product, e) => {
    if (e) e.stopPropagation();
    addToCart(product);
    triggerToast(product.name);
  };

  // Categorías dinámicas
  const categories = [
    "TODOS",
    ...new Set(
      products
        .map((p) => (p.categoria || p.category || "").toUpperCase())
        .filter(Boolean)
    ),
  ];

  const filteredProducts =
    selectedCategory === "TODOS"
      ? products
      : products.filter(
          (p) =>
            (p.categoria || p.category || "").toUpperCase() === selectedCategory
        );

  return (
    <div className="min-h-screen bg-[#fefefc] p-8">
      <Navbar cartCount={cartCount} openCart={openCart} />

      {/* NOTIFICACIÓN TOAST */}
      <ToastNotification message={toastMessage} isVisible={showToast} />

      <h1
        className="text-7xl text-black mt-10"
        style={{ fontFamily: "Bebas Neue" }}
      >
        SHOP
      </h1>

      <p className="text-xl text-gray-500 mt-4">
        Explora y adquiere comodidad con estilo
      </p>

      {/* FILTROS POR CATEGORÍA */}
      {!loading && products.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-6">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-6 py-2.5 rounded-full font-bold text-xs tracking-widest cursor-pointer
                transition-all duration-300 ease-out uppercase
                hover:-translate-y-1 active:-translate-y-0.5
                ${
                  selectedCategory === cat
                    ? "bg-black text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* RENDERIZADO: SKELETON LOADERS O PRODUCTOS */}
      {loading ? (
        <div className="grid grid-cols-3 gap-10 mt-10">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white p-4 rounded-3xl animate-pulse shadow-sm"
            >
              <div className="w-full h-80 rounded-3xl bg-gray-200 mb-5"></div>
              <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-3"></div>
              <div className="h-5 bg-gray-200 rounded-md w-1/4 mb-3"></div>
              <div className="h-4 bg-gray-100 rounded-md w-1/3 mb-5"></div>
              <div className="h-12 bg-gray-200 rounded-full w-full"></div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center mt-20 text-xl text-gray-500">
          No hay prendas disponibles en esta categoría.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10 mt-10">
          {filteredProducts.map((product) => {
            const isHovered = hoveredId === product.id;
            const isOutStock = product.stock !== undefined && product.stock <= 0;
            const isNewDrop = product.is_new || product.is_new_drop;

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedProduct(product)}
                style={{
                  transform: isHovered ? "translateY(-10px)" : "translateY(0px)",
                  boxShadow: isHovered
                    ? "0 20px 40px -15px rgba(0,0,0,0.12)"
                    : "0 4px 6px -1px rgba(0,0,0,0.05)",
                  transition:
                    "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
                className="bg-white p-4 rounded-3xl cursor-pointer relative"
              >
                {/* ETIQUETA AGOTADO */}
                {isOutStock && (
                  <span className="absolute top-7 left-7 z-10 bg-red-500 text-white text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase shadow-md">
                    AGOTADO
                  </span>
                )}

                {/* BADGE NUEVO DROP */}
                {!isOutStock && isNewDrop && (
                  <span className="absolute top-7 left-7 z-10 bg-black text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full uppercase shadow-md border border-gray-700 flex items-center gap-1">
                    NUEVO DROP ⚡
                  </span>
                )}

                <div className="w-full h-80 rounded-3xl overflow-hidden mb-5 relative">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105 ${
                      isOutStock ? "grayscale opacity-75" : ""
                    }`}
                  />
                </div>

                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-lg text-green-500 font-semibold">{product.price} $</p>
                <p className="text-sm text-gray-500">
                  {product.categoria || product.category}
                </p>

                <button
                  type="button"
                  disabled={isOutStock}
                  // En lugar de handleAddToCart, abrimos el modal asignando el producto seleccionado
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                  className={`
                    mt-5 w-full py-3 rounded-full font-bold transition-all duration-300 ease-out border border-transparent
                    ${
                      isOutStock
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-black text-white cursor-pointer hover:shadow-[0_0_25px_rgba(0,0,0,0.35)] hover:scale-[1.02]"
                    }
                  `}
                >
                  {isOutStock ? "AGOTADO" : "ELEGIR COLOR"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL DE VISTA DE DETALLE */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          addToCart={(prod) => {
            addToCart(prod);
            triggerToast(prod.name);
          }}
        />
      )}
    </div>
  );
}

export default Shop;