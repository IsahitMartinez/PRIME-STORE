import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, User } from "lucide-react";

import logo from "../assets/ONLYFIGURE.png";

const letters = ["P", "R", "I", "M", "E"];

function NavBar({ cartCount, openCart, openNewsletter }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-[#fefefc] border-b border-gray-100">
      <div className="w-full px-4 md:px-10 py-3 md:py-2 flex items-center justify-between">
        
        {/* LOGO + LETRAS */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1 shrink-0"
        >
          <img
            src={logo}
            alt="Prime Logo"
            className="w-10 md:w-14"
          />
          <div className="flex mr-1 md:mr-32">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-3xl md:text-4xl tracking-wide text-black"
                style={{ fontFamily: "Bebas Neue" }}
                initial={{ opacity: 0, y: 10, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.7,
                  ease: "easeOut",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </Link>

        {/* NAVBAR DERECHA */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-10">
          
          {/* ABOUT (Ahora visible en móviles con tamaño adaptado) */}
          <div className="relative group">
            <button
              className="text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-black hover:text-gray-600 transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer"
            >
              ABOUT
            </button>

            {/* DROPDOWN (Centrado hacia la izquierda en móviles para no desbordar) */}
            <div className="absolute right-[-60px] md:right-0 top-8 w-64 md:w-72 bg-[#fefefc] border border-gray-200 rounded-2xl md:rounded-3xl p-4 md:p-5 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <h3 className="text-2xl md:text-3xl text-black mb-1 md:mb-2" style={{ fontFamily: "Bebas Neue" }}>
                PRIME
              </h3>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                Tienda de ropa deportiva premium diseñada para entrenar con comodidad, estilo y presencia.
              </p>
              <p className="text-xs md:text-sm text-black mt-3 md:mt-4 font-medium">
                Contacto: 314 142 5761
              </p>
            </div>
          </div>

          {/* ICONO USUARIO / NEWSLETTER */}
          <button
            onClick={openNewsletter}
            className="hover:text-gray-600 transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer p-1"
            aria-label="Notificaciones"
          >
            <User size={22} strokeWidth={1.8} className="w-5 h-5 md:w-[22px] md:h-[22px]" />
          </button>

          {/* CARRITO */}
          <button
            onClick={openCart}
            className="relative hover:text-gray-600 transition-all duration-300 ease-out hover:-translate-y-1.5 active:-translate-y-0.5 cursor-pointer p-1 mr-1 md:mr-0"
            aria-label="Carrito"
          >
            <ShoppingBag size={22} strokeWidth={1.8} className="w-5 h-5 md:w-[22px] md:h-[22px]" />
            <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-black text-white text-[10px] md:text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
              {cartCount}
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
}

export default NavBar;