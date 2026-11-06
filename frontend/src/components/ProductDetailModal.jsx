import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// DICCIONARIO DE COLORES: Traduce el nombre en texto a un código de color real.
const getColorHex = (colorName) => {
  const normalized = colorName.toLowerCase().trim();
  const colorMap = {
    negro: "#000000",
    blanco: "#ffffff",
    gris: "#9CA3AF",
    rojo: "#DC2626", // Rojo vivo
    "rojo vino": "#722F37", // Tono vino / burgundy
    vino: "#722F37",
    azul: "#2563EB",
    "azul marino": "#1E3A8A", // Azul oscuro
    verde: "#16A34A",
    "verde militar": "#4B5320", // Verde opaco / army
    amarillo: "#EAB308",
    naranja: "#EA580C",
    rosa: "#DB2777",
    morado: "#9333EA",
    cafe: "#78350F",
  };
  return colorMap[normalized] || "#111827"; // Por defecto, casi negro
};

function ProductDetailModal({ product, onClose, addToCart }) {
  if (!product) return null;

  // Manejo de galería de imágenes
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image_url];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 1. LIMPIEZA EXTREMA DEL ARREGLO DE SUPABASE
  const rawColors = product.colors || product.colores || "Único";
  let parsedColors = ["Único"];

  if (Array.isArray(rawColors)) {
    parsedColors = rawColors;
  } else if (typeof rawColors === "string") {
    const cleanString = rawColors.replace(/[{}"']/g, ""); // Borra llaves y comillas
    parsedColors = cleanString.split(",").map((c) => c.trim()).filter(Boolean);
  }
  
  const availableColors = parsedColors.length > 0 ? parsedColors : ["Único"];
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [hoveredColor, setHoveredColor] = useState(null);

  // Lógica para cambiar la imagen al pasar el cursor sobre un color (si tienes color_images en BD)
  const colorImages = product.color_images || product.imagenes_color || {};
  const displayImage =
    (hoveredColor && colorImages[hoveredColor]) ||
    (selectedColor && colorImages[selectedColor]) ||
    images[currentImageIndex];

  // 2. DETECTAR SI ES PANTS YOGA O TIENE TALLAS ACTIVADAS
  const isYogaPants = 
    product.name && 
    (product.name.toLowerCase().includes("pants yoga") || product.name.toLowerCase().includes("yoga"));
    
  const requiresSize = product.has_sizes || isYogaPants;

  const availableSizes =
    Array.isArray(product.sizes) && product.sizes.length > 0
      ? product.sizes
      : ["S", "M", "L", "XL"];

  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);

  // Navegación de carrusel
  const handleNextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const handlePrevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  // Botón agregar
  const handleAdd = () => {
    const itemToAdd = {
      ...product,
      selectedColor: selectedColor,
      selectedSize: requiresSize ? selectedSize : "Unitalla",
    };
    addToCart(itemToAdd);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BOTÓN CERRAR */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/10 hover:bg-black/20 text-black p-2 rounded-full transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* FOTO IZQUIERDA */}
        <div className="w-full md:w-1/2 bg-gray-100 p-6 flex flex-col items-center justify-between relative min-h-[350px]">
          <div className="relative w-full h-80 md:h-96 flex items-center justify-center">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-cover rounded-2xl shadow-md transition-all duration-300 ease-out"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Miniaturas */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto max-w-full pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    currentImageIndex === idx
                      ? "border-black scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFORMACIÓN DERECHA */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="text-xs font-black tracking-widest text-gray-400 uppercase">
              {product.categoria || product.category || "STREETWEAR"}
            </span>

            <h2 className="text-4xl text-black mt-1 uppercase" style={{ fontFamily: "Bebas Neue" }}>
              {product.name}
            </h2>

            <p className="text-2xl font-bold text-green-600 mt-2">
              ${parseFloat(product.price).toFixed(2)} MXN
            </p>

            <p className="text-gray-600 text-sm mt-4 leading-relaxed">
              {product.description || "Prenda urbana de alta calidad diseñada para máxima comodidad y estilo en el uso diario."}
            </p>

            {/* SELECTOR DE COLORES */}
            <div className="mt-6">
              <h3 className="text-xs font-bold tracking-wider text-gray-700 uppercase mb-3 flex items-center justify-between">
                <span>COLOR:</span>
                <span className="text-gray-400 font-semibold">
                  {hoveredColor || selectedColor}
                </span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => {
                  const isSelected = selectedColor === color;
                  const isHovered = hoveredColor === color;
                  const isActive = isSelected || isHovered;
                  
                  const hexColor = getColorHex(color);
                  // Texto oscuro para colores claros, texto claro para oscuros
                  const isLightText = ["blanco", "amarillo"].includes(color.toLowerCase().trim());

                  return (
                    <button
                      key={color}
                      type="button"
                      onMouseEnter={() => setHoveredColor(color)}
                      onMouseLeave={() => setHoveredColor(null)}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        backgroundColor: isActive ? hexColor : "#F3F4F6", 
                        color: isActive ? (isLightText ? "#000000" : "#ffffff") : "#374151",
                        borderColor: isActive ? hexColor : "transparent"
                      }}
                      className={`
                        px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer uppercase border-2
                        ${isActive ? "shadow-md scale-105" : "hover:bg-gray-200"}
                        ${color.toLowerCase().trim() === "blanco" && isActive ? "border-gray-300" : ""}
                      `}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SELECTOR DE TALLA (SOLO PANTS YOGA) */}
            {requiresSize ? (
              <div className="mt-6">
                <h3 className="text-xs font-bold tracking-wider text-gray-700 uppercase mb-3">
                  SELECCIONAR TALLA:
                </h3>
                <div className="flex gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 rounded-xl text-xs font-bold transition-all cursor-pointer uppercase ${
                        selectedSize === size
                          ? "bg-black text-white shadow-md scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <span className="inline-block bg-gray-100 text-gray-600 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  TALLA: UNITALLA
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="mt-8 w-full bg-black text-white py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:-translate-y-1 active:-translate-y-0.5 cursor-pointer"
          >
            AGREGAR AL CARRITO
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;