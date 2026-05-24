import { motion } from "framer-motion";
import logo from "../assets/ONLYFIGURE.png";

const letters = ["P", "R", "I", "M", "E"];

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-10 py-8 bg-[#fefefc]">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Prime Logo"
          className="w-14"
        />

        <div className="flex">
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
      </div>
    </nav>
  );
}

export default Navbar;