import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, User } from "lucide-react";

import logo from "../assets/ONLYFIGURE.png";

const letters = ["P", "R", "I", "M", "E"];

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-[#fefefc]">

      <div className="w-full px-10 py-3 flex items-center">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">

          <img
            src={logo}
            alt="Prime Logo"
            className="w-14"
          />

          <div className="flex mr-32">

            {letters.map((letter, index) => (

              <motion.span
                key={index}
                className="text-4xl tracking-wide text-black"
                style={{ fontFamily: "Bebas Neue" }}

                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.5,
                }}

                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}

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
        <div className="ml-auto flex items-center gap-10">

          {/* SHOP */}
          <Link
            to="/shop"
            className="
              text-sm
              tracking-[0.3em]
              text-black
              hover:text-gray-600
              transition
            "
          >
            SHOP
          </Link>

          {/* ABOUT */}
          <div className="relative group">

            <button
              className="
                text-sm
                tracking-[0.3em]
                text-black
                hover:text-gray-600
                transition
              "
            >
              ABOUT
            </button>

            {/* DROPDOWN */}
            <div
              className="
                absolute
                right-0
                top-8
                w-72
                bg-[#fefefc]
                border
                border-gray-200
                rounded-3xl
                p-5
                shadow-lg
                opacity-0
                invisible
                group-hover:opacity-100
                group-hover:visible
                transition-all
                duration-300
              "
            >

              <h3
                className="text-3xl text-black mb-2"
                style={{ fontFamily: "Bebas Neue" }}
              >
                PRIME
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                Tienda de ropa deportiva premium diseñada para entrenar
                con comodidad, estilo y presencia.
              </p>

              <p className="text-sm text-black mt-4 font-medium">
                Contacto: 314 142 5761
              </p>

            </div>

          </div>

          {/* LOGIN */}
          <button
            className="hover:text-gray-600 transition"
            aria-label="Iniciar Sesión"
          >
            <User size={22} strokeWidth={1.8} />
          </button>

          {/* CARRITO */}
          <button
            className="hover:text-gray-600 transition"
            aria-label="Carrito"
          >
            <ShoppingBag size={22} strokeWidth={1.8} />
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;