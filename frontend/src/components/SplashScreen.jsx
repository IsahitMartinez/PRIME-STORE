// Importamos motion desde Framer Motion
// motion nos permite animar elementos HTML
import { motion } from "framer-motion";

// Importamos nuestro logo desde assets
import logo from "../assets/ONLYFIGURE.png";

// Creamos un arreglo con cada letra
// Esto nos permite animarlas individualmente
const letters = ["P", "R", "I", "M", "E"];

// Componente principal del Splash Screen
function SplashScreen() {

  // Todo lo que esté dentro del return
  // es lo que React mostrará en pantalla
  return (

    // CONTENEDOR PRINCIPAL DEL SPLASH
    // fixed = se queda fijo encima de toda la página
    // inset-0 = top/right/bottom/left = 0
    // bg-[#fefefc] = fondo color blanco perla
    // z-50 = prioridad alta encima de otros elementos
    <motion.div
      className="fixed inset-0 bg-[#fefefc] z-50"
    >

      {/* ========================================= */}
      {/* LOGO GRANDE CENTRADO */}
      {/* ========================================= */}

      <motion.div

        // absolute = posición libre dentro de la pantalla
        // top-1/2 y left-1/2 = lo mandan al centro
        // flex = activa Flexbox
        // items-center = centra verticalmente
        // gap-4 = separación entre logo y texto
        className="absolute top-1/2 left-1/2 flex items-center gap-4"

        // Estado inicial de la animación
        initial={{

          // x e y negativos sirven para centrar PERFECTAMENTE
          x: "-50%",
          y: "-50%",

          // Empieza invisible
          opacity: 0,

          // Empieza más pequeño
          scale: 0.8,
        }}

        // Estado final animado
        animate={{

          // opacity usa varios valores:
          // 0 = invisible
          // 1 = visible
          // luego vuelve a 0 para desaparecer
          opacity: [0, 1, 1, 0],

          // scale hace que crezca y luego disminuya
          scale: [0.8, 1, 1, 0.8],
        }}

        // Configuración de la transición
        transition={{

          // duración total
          duration: 2.5,

          // controla en qué momento ocurre cada cambio
          times: [0, 0.2, 0.7, 1],
        }}
      >

        {/* ========================================= */}
        {/* LOGO GRANDE */}
        {/* ========================================= */}

        <img

          // Imagen importada
          src={logo}

          // Texto alternativo
          alt="Prime Logo"

          // w-44 = tamaño del logo
          className="w-44"
        />

        {/* ========================================= */}
        {/* TEXTO GRANDE PRIME */}
        {/* ========================================= */}

        <h1

          // text-8xl = texto gigante
          // tracking-wider = separación entre letras
          // text-black = color negro
          className="text-8xl tracking-wider text-black"

          // Aplicamos Bebas Neue SOLO aquí
          style={{ fontFamily: "Bebas Neue" }}
        >
          PRIME
        </h1>

      </motion.div>


    </motion.div>
  );
}

// Exportamos el componente
// para poder usarlo en App.jsx
export default SplashScreen;