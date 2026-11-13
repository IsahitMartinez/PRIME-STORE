import { useState } from "react";
import NavBar from "../components/NavBar";
import ImagesCarousel from "../components/ImagesCarousel";
import { useNavigate } from "react-router-dom";

// NUEVO: componentes que se agregan debajo del hero
import Marquee from "../components/Marquee";
import InfoCarousel from "../components/InfoCarousel";
import HowToOrder from "../components/HowToOrder";
import WhyOrderWithMe from "../components/WhyOrderWithMe";
import Footer from "../components/Footer";

function Home({ openNewsletter }) {
  // Estado para detectar si el mouse está encima del carrusel
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleComprarAhora = () => {
    navigate("/shop"); // Te lleva a la tienda
    openNewsletter();  // Abre el modal por encima
  };

  return (
    <div className="min-h-screen bg-[#fefefc] overflow-x-hidden">
      
      <NavBar openNewsletter={openNewsletter} />

      <section
        className="min-h-screen pt-24 pb-12 md:pt-0 md:pb-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-6 sm:px-12 md:px-24 gap-10 md:gap-20"
      >
        {/* COLUMNA IZQUIERDA (Textos) */}
        <div className="flex-1 max-w-xl text-center md:text-left mt-4 md:mt-0 z-10">
          <p className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-gray-500 mb-2 md:mb-4">
            VISTE Y ENTRENA PREMIUM
          </p>

          <h1
            className="text-7xl sm:text-8xl md:text-[10rem] leading-none text-black"
            style={{ fontFamily: "Bebas Neue" }}
          >
            PRIME
          </h1>

          <p className="text-base sm:text-lg text-gray-600 mt-4 md:mt-8 leading-relaxed max-w-md mx-auto md:mx-0">
            Colecciones deportivas con la mejor calidad,
            al mejor precio, no lo pienses 2 veces.
          </p>

          <button
            onClick={handleComprarAhora}
            className="mt-8 md:mt-10 px-8 py-3 md:px-10 md:py-4 bg-black text-white rounded-full text-sm md:text-base font-bold tracking-wider hover:bg-gray-800 transition cursor-pointer hover:-translate-y-1 shadow-lg w-full sm:w-auto"
          >
            COMPRAR AHORA
          </button>
        </div>

        {/* COLUMNA DERECHA (EL CARRUSEL) */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: isHovered ? "translateY(-10px)" : "translateY(0px)",
            boxShadow: isHovered ? "0 20px 40px -10px rgba(0,0,0,0.2)" : "none",
            transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}
          className="
            w-full max-w-[320px] sm:max-w-[400px] md:max-w-none md:w-[550px]
            h-[350px] sm:h-[400px] md:h-[500px]
            rounded-[2rem] md:rounded-[2.5rem]
            border border-gray-300
            mt-0 md:mt-20
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

      {/* ===== NUEVO: secciones debajo del hero ===== */}
      <Marquee />
      <InfoCarousel />
      <HowToOrder />
      <WhyOrderWithMe />
      <Footer />
    </div>
  );
}

export default Home;