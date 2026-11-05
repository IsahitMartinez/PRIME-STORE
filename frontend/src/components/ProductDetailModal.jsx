import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function ProductDetailModal({ product, onClose, addToCart }) {
  if (!product) return null;

  // Convierte el texto con saltos de línea o arreglos de Supabase en un array de URLs limpio
  const gallery = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : typeof product.images === "string" && product.images.trim() !== ""
    ? product.images.split(/[\n,]+/).map((url) => url.trim()).filter(Boolean)
    : [product.image_url];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");

  const sizes = ["S", "M", "L", "XL"];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 p-6 gap-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* BOTÓN CERRAR */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 z-10 p-2 rounded-full bg-gray-100 hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <X size={20} />
          </button>

          {/* CARRUSEL IZQUIERDA */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full h-[380px] rounded-2xl overflow-hidden bg-gray-50">
              <img
                src={gallery[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md transition-transform hover:scale-110 cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-md transition-transform hover:scale-110 cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* MINIATURAS */}
            {gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {gallery.map((imgUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                      currentImageIndex === index ? "border-black scale-95" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* INFO DERECHA */}
          <div className="flex flex-col justify-between py-2">
            <div>
              <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                {product.categoria || product.category || "EXCLUSIVO PRIME"}
              </span>

              <h2 
                className="text-4xl text-black mt-1 mb-2"
                style={{ fontFamily: "Bebas Neue" }}
              >
                {product.name}
              </h2>

              <p className="text-2xl font-bold text-green-600 mb-4">
                {product.price} $
              </p>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {product.description || "Prenda deportiva de alto rendimiento diseñada con corte atlético y materiales transpirables de la más alta calidad."}
              </p>

              {/* SELECCIÓN DE TALLA */}
              <div className="mb-6">
                <span className="text-xs font-bold text-black tracking-wider uppercase block mb-3">
                  SELECCIONA TU TALLA:
                </span>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`w-11 h-11 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
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
            </div>

            {/* BOTÓN AGREGAR AL CARRITO */}
            <button
              type="button"
              onClick={() => {
                addToCart({ ...product, selectedSize });
                onClose();
              }}
              className="
                w-full bg-black text-white py-4 rounded-full font-bold cursor-pointer 
                transition-all duration-300 ease-out
                hover:shadow-[0_0_25px_rgba(0,0,0,0.35)]
                hover:scale-[1.02]
                border border-transparent
              "
            >
              AGREGAR AL CARRITO - TALLA {selectedSize}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default ProductDetailModal;