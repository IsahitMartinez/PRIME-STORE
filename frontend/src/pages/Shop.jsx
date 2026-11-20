import { useEffect, useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import NavBar from "../components/NavBar";
import ProductDetailModal from "../components/ProductDetailModal";
import ToastNotification from "../components/ToastNotification";
import { supabase } from "../lib/supabase";

function Shop({ addToCart, cartCount, openCart, openNewsletter }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  const dynamicCategories = [
    ...new Set(
      products
        .map((p) => (p.categoria || p.category || "").toUpperCase())
        .filter(Boolean)
    ),
  ];

  const categoryOptions = ["TODOS", ...dynamicCategories];
  const availabilityOptions = ["EN STOCK", "SOBRE PEDIDO"];

  const filteredProducts = products.filter((p) => {
    if (selectedCategory === "TODOS") return true;
    if (selectedCategory === "EN STOCK") return p.status === "in_stock";
    if (selectedCategory === "SOBRE PEDIDO") return p.status === "pre_order";

    return (p.categoria || p.category || "").toUpperCase() === selectedCategory;
  });

  const getMainFilterButtonStyle = () => {
    if (selectedCategory === "EN STOCK") {
      return "bg-emerald-600 text-white border border-emerald-700 border-b-2 border-b-emerald-800 shadow-[0_4px_12px_rgba(5,150,105,0.3)]";
    }
    if (selectedCategory === "SOBRE PEDIDO") {
      return "bg-orange-500 text-white border border-orange-600 border-b-2 border-b-orange-700 shadow-[0_4px_12px_rgba(249,115,22,0.3)]";
    }
    if (isFilterOpen || selectedCategory !== "TODOS") {
      return "bg-black text-white border border-black border-b-2 border-b-neutral-800 shadow-md";
    }
    return "bg-gray-100 text-gray-700 border border-gray-200 border-b-2 border-b-gray-300 hover:bg-gray-200/80";
  };

  return (
    <div className="min-h-screen bg-[#fefefc] px-2 pb-4 sm:p-4 md:p-8 pt-20 md:pt-24">
      <NavBar cartCount={cartCount} openCart={openCart} openNewsletter={openNewsletter} />
      <ToastNotification message={toastMessage} isVisible={showToast} />

      <h1
        className="text-4xl md:text-7xl text-black mt-2 md:mt-2 px-2"
        style={{ fontFamily: "Bebas Neue" }}
      >
        TIENDA
      </h1>

      <p className="text-sm md:text-xl text-gray-500 mt-1 md:mt-4 px-2">
        Explora y adquiere comodidad con estilo
      </p>

      {!loading && products.length > 0 && (
        <div className="mt-4 md:mt-6 px-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFilterOpen((prev) => !prev)}
              aria-expanded={isFilterOpen}
              className={`inline-flex items-center gap-2.5 px-4 md:px-5 py-2 md:py-2.5 rounded-full font-bold text-[10px] md:text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer active:translate-y-0.5 ${getMainFilterButtonStyle()}`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>
                {selectedCategory === "TODOS"
                  ? "FILTRAR"
                  : `FILTRO: ${selectedCategory}`}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300 ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {selectedCategory !== "TODOS" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("TODOS")}
                className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-black px-2 py-1.5 transition-colors cursor-pointer"
              >
                Limpiar
              </button>
            )}
          </div>

          <div
            className={`grid transition-all duration-300 ease-out ${
              isFilterOpen
                ? "grid-rows-[1fr] opacity-100 mt-3 md:mt-4"
                : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden">
              <div className="flex flex-wrap items-center gap-2 md:gap-3 pt-1 pb-2">
                {categoryOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedCategory(option)}
                    className={`px-3.5 md:px-5 py-1.5 md:py-2 rounded-full font-bold text-[9px] md:text-xs tracking-widest cursor-pointer transition-all duration-200 ease-out uppercase border active:translate-y-0.5 ${
                      selectedCategory === option
                        ? "bg-black text-white border-black border-b-2 border-b-neutral-700 shadow-md -translate-y-0.5"
                        : "bg-white text-gray-600 border-gray-200 border-b-2 border-b-gray-300/80 shadow-xs hover:bg-gray-50 hover:text-black"
                    }`}
                  >
                    {option}
                  </button>
                ))}

                <span
                  aria-hidden="true"
                  className="hidden sm:inline-block h-5 w-px bg-gray-200 mx-1"
                />

                {availabilityOptions.map((option) => {
                  const isInStock = option === "EN STOCK";
                  const isActive = selectedCategory === option;

                  const pillStyle = isInStock
                    ? isActive
                      ? "bg-emerald-600 text-white border-emerald-700 border-b-2 border-b-emerald-900 shadow-[0_4px_12px_rgba(5,150,105,0.35)] -translate-y-0.5"
                      : "bg-emerald-50/90 text-emerald-800 border-emerald-200 border-b-2 border-b-emerald-300 shadow-[0_2px_6px_rgba(16,185,129,0.14)] hover:bg-emerald-100/80 hover:-translate-y-0.5"
                    : isActive
                    ? "bg-orange-500 text-white border-orange-600 border-b-2 border-b-orange-800 shadow-[0_4px_12px_rgba(249,115,22,0.35)] -translate-y-0.5"
                    : "bg-orange-50/90 text-orange-800 border-orange-200 border-b-2 border-b-orange-300 shadow-[0_2px_6px_rgba(249,115,22,0.14)] hover:bg-orange-100/80 hover:-translate-y-0.5";

                  const dotStyle = isActive
                    ? "bg-white"
                    : isInStock
                    ? "bg-emerald-500"
                    : "bg-orange-500";

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedCategory(option)}
                      className={`inline-flex items-center gap-1.5 md:gap-2 px-3.5 md:px-5 py-1.5 md:py-2 rounded-full font-black text-[9px] md:text-xs tracking-widest cursor-pointer transition-all duration-200 ease-out uppercase border active:translate-y-0.5 ${pillStyle}`}
                    >
                      <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${dotStyle}`} />
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 mt-6 md:mt-10 px-2">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="bg-white p-2 md:p-4 rounded-2xl md:rounded-3xl animate-pulse shadow-sm"
            >
              <div className="w-full h-48 md:h-80 rounded-2xl md:rounded-3xl bg-gray-200 mb-3 md:mb-5"></div>
              <div className="h-4 md:h-6 bg-gray-200 rounded-md w-3/4 mb-2 md:mb-3"></div>
              <div className="h-3 md:h-5 bg-gray-200 rounded-md w-1/4 mb-2 md:mb-3"></div>
              <div className="h-8 md:h-12 bg-gray-200 rounded-full w-full"></div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center mt-20 text-sm md:text-xl text-gray-500">
          No hay prendas disponibles en esta categoría.
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10 mt-6 md:mt-10 px-2">
          {filteredProducts.map((product) => {
            const isHovered = hoveredId === product.id;
            const firstImage = product.image_url ? product.image_url.split(",")[0].trim() : "";

            const isOutStock =
              product.status !== "pre_order" &&
              product.stock !== undefined &&
              product.stock <= 0;

            let badgeLabel = "EN STOCK";
            let badgeColor = "bg-green-500";

            if (isOutStock) {
              badgeLabel = "AGOTADO";
              badgeColor = "bg-red-500";
            } else if (product.status === "pre_order") {
              badgeLabel = "SOBRE PEDIDO";
              badgeColor = "bg-orange-500";
            }

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedProduct(product)}
                style={{
                  transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
                  boxShadow: isHovered
                    ? "0 10px 20px -10px rgba(0,0,0,0.12)"
                    : "0 2px 4px -1px rgba(0,0,0,0.05)",
                  transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
                className="bg-white p-2 md:p-4 rounded-2xl md:rounded-3xl cursor-pointer relative flex flex-col justify-between"
              >
                <span
                  className={`absolute top-4 left-4 md:top-7 md:left-7 z-10 ${badgeColor} text-white text-[8px] md:text-[10px] font-black tracking-widest px-2 py-0.5 md:px-3 md:py-1 rounded-full uppercase shadow-md`}
                >
                  {badgeLabel}
                </span>

                <div className="w-full h-48 md:h-80 rounded-2xl md:rounded-3xl overflow-hidden mb-3 md:mb-5 relative">
                  {firstImage && (
                    <img
                      src={firstImage}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105 ${
                        isOutStock ? "grayscale opacity-75" : ""
                      }`}
                    />
                  )}
                </div>

                <div>
                  <h2 className="text-sm md:text-xl font-bold leading-tight">{product.name}</h2>
                  <p className="text-sm md:text-lg text-green-500 font-semibold mt-1">{product.price} $</p>
                  <p className="text-[10px] md:text-sm text-gray-500 truncate">
                    {product.categoria || product.category}
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isOutStock}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                  className={`mt-3 md:mt-5 w-full py-2 md:py-3 rounded-full text-[10px] md:text-base font-bold transition-all duration-300 ease-out border border-transparent ${
                    isOutStock
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-black text-white cursor-pointer hover:shadow-[0_0_15px_rgba(0,0,0,0.25)] hover:scale-[1.02]"
                  }`}
                >
                  {isOutStock ? "AGOTADO" : "ELEGIR"}
                </button>
              </div>
            );
          })}
        </div>
      )}

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