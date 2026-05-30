import Navbar from "../components/Navbar";
import ImagesCarousel from "../components/ImagesCarousel";
import { Link } from "react-router-dom";

function Home() {
  return (

    // CONTENEDOR PRINCIPAL
    <div className="min-h-screen bg-[#fefefc]">

      {/* NAVBAR */}
      <Navbar
       cartCount={cartCount} // Aquí puedes pasar el número de productos en el carrito si lo deseas
       openCart={openCart} // Aquí puedes pasar una función para abrir el carrito si lo deseas
      />

      {/* HOME SECTION */}
      <section
        className="
          h-screen
          flex
          items-center
          justify-between
          px-24
          gap-20
        "
      >

        {/* ========================================= */}
        {/* COLUMNA IZQUIERDA */}
        {/* ========================================= */}

        <div className="flex-1 max-w-xl">
          

          {/* TEXTO PEQUEÑO */}
          <p className="text-sm tracking-[0.3em] text-gray-500 mb-4">
            VISTE Y ENTRENA PREMIUM
          </p>

          {/* TITULO PRINCIPAL */}
          <h1
            className="text-[10rem] leading-none text-black"
            style={{ fontFamily: "Bebas Neue" }}
          >
            PRIME
          </h1>

          {/* DESCRIPCIÓN */}
          <p className="text-lg text-gray-600 mt-8 leading-relaxed">
            Colecciones deportivas con la mejor calidad,
            al mejor precio, no lo pienses 2 veces.
          </p>

          {/* BOTON */}
          <Link to="/shop">
          <button
            className="
              mt-10
              px-10
              py-4
              bg-black
              text-white
              rounded-full
              hover:bg-gray-800
              transition
              cursor-pointer
            "
          >
            COMPRAR AHORA
          </button>
        </Link>


        </div>

        {/* ========================================= */}
        {/* COLUMNA DERECHA */}
        {/* ========================================= */}

      <div
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
            overflow-hidden
            shrink-0
                    "
        >
                

          {/* PLACEHOLDER DEL CARRUSEL */}
        
           <ImagesCarousel /> {/* Insertamos imagenes del carrusel aquí */}
          
         
        </div>

      </section>
    </div>
  );
}

export default Home;