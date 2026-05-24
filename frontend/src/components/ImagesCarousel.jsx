import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import pants from "../assets/pants.jpeg";
import modelo1 from "../assets/modelo1.jpeg";
import batman1 from "../assets/batman1.jpeg";
import modelo2 from "../assets/modelo2.jpeg";

// Arreglo con las imágenes del carrusel
const images = [pants, modelo1, batman1, modelo2];

function ImagesCarousel() {
  // Estado para controlar la imagen actual
  const [currentImage, setCurrentImage] = useState(0);

  // Cambia la imagen cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, []);

  // Esto es lo que se muestra en pantalla
  return (
    <div className="w-full h-full overflow-hidden rounded-4xl relative">
      <motion.img
        key={currentImage}
        src={images[currentImage]}
        alt="Carousel Image"
        className="w-full h-full object-cover absolute"
        initial={{
          opacity: 0,
          scale: 1.05,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          ease: "easeOut",
        }}
      />
    </div>
  );
}

export default ImagesCarousel;