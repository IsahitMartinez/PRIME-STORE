import { motion } from "framer-motion";
import logo from "../assets/ONLYFIGURE.png";

const letters = ["P", "R", "I", "M", "E"];

function SplashScreen() {
  return (
    <motion.div className="fixed inset-0 bg-[#fefefc] z-50">
      <motion.div
        className="absolute top-1/2 left-1/2 flex items-center gap-2 md:gap-4"
        initial={{
          x: "-50%",
          y: "-50%",
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.8, 1, 1, 0.8],
        }}
        transition={{
          duration: 2.5,
          times: [0, 0.2, 0.7, 1],
        }}
      >
        <img
          src={logo}
          alt="Prime Logo"
          className="w-20 sm:w-28 md:w-44"
        />
        <h1
          className="text-5xl sm:text-6xl md:text-8xl tracking-wider text-black"
          style={{ fontFamily: "Bebas Neue" }}
        >
          PRIME
        </h1>
      </motion.div>
    </motion.div>
  );
}

export default SplashScreen;