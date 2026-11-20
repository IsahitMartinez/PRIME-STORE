import { useState } from "react";
import { ChevronLeft, ChevronRight, X, ShoppingBag } from "lucide-react";

const getColorHex = (colorName) => {
  const normalized = colorName.toLowerCase().trim();
  const colorMap = {
    negro: "#000000",
    blanco: "#ffffff",
    gris: "#9CA3AF",
    rojo: "#DC2626",
    "rojo vino": "#722F37",
    vino: "#722F37",
    azul: "#2563EB",
    "azul marino": "#1E3A8A",
    verde: "#16A34A",
    "verde militar": "#4B5320",
    amarillo: "#EAB308",
    naranja: "#EA580C",
    rosa: "#DB2777",
    morado: "#9333EA",
    cafe: "#78350F",
  };
  return colorMap[normalized] || "#111827";
};

function ProductDetailModal({ product, onClose, addToCart }) {
  const parsedImages = product?.image_url
    ? product.image_url
        .split(",")
        .map((url) => url.replace(/['"\n\r]/g, "").trim())
        .filter(Boolean)
    : [];

  const images = parsedImages.length > 0 ? parsedImages : [];

  const rawColors = product?.colors || product?.colores || "Único";
  let parsedColors = ["Único"];

  if (Array.isArray(rawColors)) {
    parsedColors = rawColors;
  } else if (typeof rawColors === "string") {
    const cleanString = rawColors.replace(/[{}"']/g, "");
    parsedColors = cleanString.split(",").map((c) => c.trim()).filter(Boolean);
  }

  const availableColors = parsedColors.length > 0 ? parsedColors : ["Único"];

  const availableSizes =
    Array.isArray(product?.sizes) && product.sizes.length > 0
      ? product.sizes
      : ["S", "M", "L", "XL"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [hoveredColor, setHoveredColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  if (!product) return null;

  const colorImages = product.color_images || product.imagenes_color || {};
  const displayImage =
    (hoveredColor && colorImages[hoveredColor]) ||
    (selectedColor && colorImages[selectedColor]) ||
    images[currentImageIndex];

  const isYogaPants =
    product.name &&
    (product.name.toLowerCase().includes("pants yoga") ||
      product.name.toLowerCase().includes("yoga"));

  const requiresSize = product.has_sizes || isYogaPants;

  const descriptionText =
    product.description ||
    "Prenda urbana de alta calidad diseñada para máxima comodidad y estilo en el uso diario.";

  const handleNextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const handlePrevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleAdd = () => {
    const itemToAdd = {
      ...product,
      selectedColor: selectedColor,
      selectedSize: requiresSize ? selectedSize : "Unitalla",
      image_url: displayImage,
    };
    addToCart(itemToAdd);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row relative max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar detalle"
          className="absolute top-3 right-3 md:top-4 md:right-4 z-20 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-md transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="w-full md:w-1/2 bg-gray-100 p-3 md:p-6 flex flex-col items-center justify-center relative shrink-0 overflow-hidden">
          <div className="relative w-full h-60 sm:h-72 md:h-96 flex items-center justify-center">
            {displayImage ? (
              <img
                src={displayImage}
                alt={product.name}
                className="max-h-full max-w-full w-auto h-auto object-contain rounded-2xl shadow-sm transition-all duration-300 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-2xl text-gray-400 font-bold text-sm">
                Sin Imagen
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  aria-label="Imagen anterior"
                  className="absolute left-2 bg-white/85 hover:bg-white text-black p-1.5 md:p-2 rounded-full shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  aria-label="Imagen siguiente"
                  className="absolute right-2 bg-white/85 hover:bg-white text-black p-1.5 md:p-2 rounded-full shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-1.5 md:gap-2 mt-2.5 md:mt-4 overflow-x-auto max-w-full pb-0.5 scrollbar-hide">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-9 h-9 md:w-14 md:h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                    currentImageIndex === idx
                      ? "border-black scale-105"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Vista ${idx + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col flex-1 min-h-0 bg-white">
          <div className="flex-1 overflow-y-auto px-5 pt-3.5 pb-3 md:p-8 md:pb-4">
            <span className="text-[10px] md:text-xs font-black tracking-widest text-gray-400 uppercase block">
              {product.categoria || product.category || "STREETWEAR"}
            </span>

            <div className="flex items-baseline justify-between gap-3 mt-0.5 md:block">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl text-black leading-none uppercase"
                style={{ fontFamily: "Bebas Neue" }}
              >
                {product.name}
              </h2>

              <p className="text-lg sm:text-xl md:text-2xl font-bold text-green-600 md:mt-1.5 whitespace-nowrap">
                ${parseFloat(product.price).toFixed(2)} MXN
              </p>
            </div>

            <div className="mt-1.5 md:mt-3">
              <p
                className={`text-gray-500 text-xs sm:text-sm leading-snug ${
                  isDescExpanded ? "" : "line-clamp-2"
                }`}
              >
                {descriptionText}
              </p>
              {descriptionText.length > 95 && (
                <button
                  type="button"
                  onClick={() => setIsDescExpanded((prev) => !prev)}
                  className="text-[11px] font-bold text-black underline underline-offset-2 mt-1 cursor-pointer"
                >
                  {isDescExpanded ? "Ver menos" : "Ver más"}
                </button>
              )}
            </div>

            <div className="mt-3.5 md:mt-5">
              <h3 className="text-[11px] md:text-xs font-bold tracking-wider text-gray-700 uppercase mb-2 flex items-center justify-between">
                <span>COLOR:</span>
                <span className="text-gray-400 font-semibold">
                  {hoveredColor || selectedColor}
                </span>
              </h3>

              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {availableColors.map((color) => {
                  const isSelected = selectedColor === color;
                  const isHovered = hoveredColor === color;
                  const isActive = isSelected || isHovered;

                  const hexColor = getColorHex(color);
                  const isLightText = ["blanco", "amarillo"].includes(
                    color.toLowerCase().trim()
                  );

                  return (
                    <button
                      key={color}
                      type="button"
                      onMouseEnter={() => setHoveredColor(color)}
                      onMouseLeave={() => setHoveredColor(null)}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        backgroundColor: isActive ? hexColor : "#F3F4F6",
                        color: isActive
                          ? isLightText
                            ? "#000000"
                            : "#ffffff"
                          : "#374151",
                        borderColor: isActive ? hexColor : "transparent",
                      }}
                      className={`px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[11px] md:text-xs font-bold transition-all duration-200 cursor-pointer uppercase border-2 ${
                        isActive ? "shadow-sm scale-105" : "hover:bg-gray-200"
                      } ${
                        color.toLowerCase().trim() === "blanco" && isActive
                          ? "border-gray-300"
                          : ""
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>

            {requiresSize ? (
              <div className="mt-3.5 md:mt-5">
                <h3 className="text-[11px] md:text-xs font-bold tracking-wider text-gray-700 uppercase mb-2">
                  SELECCIONAR TALLA:
                </h3>
                <div className="flex gap-1.5 md:gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 md:w-11 md:h-11 rounded-xl text-xs font-bold transition-all cursor-pointer uppercase ${
                        selectedSize === size
                          ? "bg-black text-white shadow-sm scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-3 md:mt-4">
                <span className="inline-block bg-gray-100 text-gray-600 text-[10px] md:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  TALLA: UNITALLA
                </span>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-gray-100 bg-white px-5 py-3 md:px-8 md:py-5">
            <button
              type="button"
              onClick={handleAdd}
              className="w-full bg-black text-white py-3.5 md:py-4 rounded-full font-bold text-xs md:text-sm tracking-widest uppercase transition-all duration-300 hover:bg-gray-900 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2.5 shadow-lg"
            >
              <ShoppingBag size={18} />
              <span>AGREGAR AL CARRITO</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;