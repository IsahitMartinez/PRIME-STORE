import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShoppingBag, User } from "lucide-react";

import logo from "../assets/ONLYFIGURE.png";

const letters = ["P", "R", "I", "M", "E"];

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-[#fefefc]">
      <div className="w-10 px-10 py-2 flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Prime Logo" className="w-14" />

          <div className="flex mr-32">
            {letters.map((letter, index) => (
              <motion.span
                key={index}
                className="text-4xl tracking-wide text-black"
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

        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center gap-10">
          <Link
            to="/shop"
            className="text-sm tracking-[0.3em] text-black hover:text-gray-600 transition"
          >
            SHOP
          </Link>

          <Link
            to="/about"
            className="text-sm tracking-[0.3em] text-black hover:text-gray-600 transition"
          >
            ABOUT
          </Link>

          <button className="hover:text-gray-600 transition" aria-label="Iniciar Sesión">
            <User size={22} strokeWidth={1.8} />
          </button>

          <button className="hover:text-gray-600 transition" aria-label="Carrito">
            <ShoppingBag size={22} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;