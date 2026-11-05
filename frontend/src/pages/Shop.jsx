import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductDetailModal from "../components/ProductDetailModal";
import { supabase } from "../lib/supabase";

function Shop({ addToCart, cartCount, openCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Estado para la categoría activa
  const [selectedCategory, setSelectedCategory] = useState("TODOS");

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

  // Lista dinámica de categorías únicas desde Supabase
  const categories = [
    "TODOS",
    ...new Set(
      products
        .map((p) => (p.categoria || p.category || "").toUpperCase())
        .filter(Boolean)
    ),
  ];

  // Filtrado de productos en tiempo real
  const filteredProducts =
    selectedCategory === "TODOS"
      ? products
      : products.filter(
          (p) =>
            (p.categoria || p.category || "").toUpperCase() === selectedCategory
        );

  return (
    <div className="min-h-screen bg-[#fefefc] p-20">
      <Navbar cartCount={cartCount} openCart={openCart} />

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
        <div className="flex flex-wrap gap-4 mt-8">
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

      {loading ? (
        <div className="text-center mt-20 text-2xl text-gray-400">
          Cargando catálogo deportivo...
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center mt-20 text-xl text-gray-500">
          No hay prendas disponibles en esta categoría.
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-10 mt-10">
          {filteredProducts.map((product) => {
            const isHovered = hoveredId === product.id;

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
                className="bg-white p-4 rounded-3xl cursor-pointer"
              >
                <div className="w-full h-80 rounded-3xl overflow-hidden mb-5">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105"
                  />
                </div>
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-lg text-green-500">{product.price} $</p>
                <p className="text-sm text-gray-500">
                  {product.categoria || product.category}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                  className="
                    mt-5 w-full bg-black text-white py-3 rounded-full cursor-pointer 
                    transition-all duration-300 ease-out
                    hover:shadow-[0_0_25px_rgba(0,0,0,0.35)]
                    hover:scale-[1.02]
                    border border-transparent
                  "
                >
                  AGREGAR AL CARRITO
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
          addToCart={addToCart}
        />
      )}
    </div>
  );
}

export default Shop;