import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import pants from "../assets/pants.jpeg";
import modelo1 from "../assets/modelo1.jpeg";
import batman1 from "../assets/batman1.jpeg";
import modelo2 from "../assets/modelo2.jpeg";

const images = [pants, modelo1, batman1, modelo2];

function ImagesCarousel() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full relative">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt="Carrusel de ropa PRIME"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Capa oscura que desaparece al hacer hover */}
      <div className="absolute inset-0 bg-black/15 hover:bg-transparent transition-colors duration-300" />
    </div>
  );
}

export default ImagesCarousel;