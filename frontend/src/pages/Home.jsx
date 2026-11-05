import { useState } from "react";
import Navbar from "../components/Navbar";
import ImagesCarousel from "../components/ImagesCarousel";
import { Link } from "react-router-dom";

function Home() {
  // Estado para detectar si el mouse está encima del carrusel
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-[#fefefc]">
      <Navbar />

      <section
        className="h-screen flex items-center justify-between px-24 gap-20"
      >
        {/* COLUMNA IZQUIERDA */}
        <div className="flex-1 max-w-xl">
          <p className="text-sm tracking-[0.3em] text-gray-500 mb-4">
            VISTE Y ENTRENA PREMIUM
          </p>

          <h1
            className="text-[10rem] leading-none text-black"
            style={{ fontFamily: "Bebas Neue" }}
          >
            PRIME
          </h1>

          <p className="text-lg text-gray-600 mt-8 leading-relaxed">
            Colecciones deportivas con la mejor calidad,
            al mejor precio, no lo pienses 2 veces.
          </p>

          <Link to="/shop">
            <button
              className="mt-10 px-10 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition cursor-pointer hover:-translate-y-1 shadow-lg"
            >
              COMPRAR AHORA
            </button>
          </Link>
        </div>

        {/* COLUMNA DERECHA (EL CARRUSEL) */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            // Aquí inyectamos el CSS puro dependiendo del estado de React
            transform: isHovered ? "translateY(-16px)" : "translateY(0px)",
            boxShadow: isHovered ? "0 25px 50px -12px rgba(0,0,0,0.3)" : "none",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" // Efecto resorte en CSS
          }}
          className="
            w-[550px]
            h-[500px]
            rounded-[2.5rem]
            border border-gray-300
            mt-20
            bg-[#ece8e1]
            flex
            items-center
            justify-center
            shrink-0
            overflow-hidden
            cursor-pointer
          "
        >
          <ImagesCarousel />
        </div>
      </section>
    </div>
  );
}

export default Home;