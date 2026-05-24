import { motion } from 'framer-motion'; //Importa animaciones desde HTML
import logo from '../assets/PRIME.png'; //Importa mi logo PRIME desde la carpeta de assets

function SplashScreen() { //Funcion de SplashScreen
  return ( //Lo que retornara mi funcion de SplashScreen 
    <motion.div //Animacion de mi SplashScreen
        className="Fixed inset-0 bg[#F5F0E8] flex items-center justify-center z-50" //Estilos de mi SplashScreen
        initial={{ opacity: 1 }} //Valores iniciales
        animate={{ opacity: 0 }} //Estilo final de mi animacion
        transition={{ duration: 1, delay: 2 }} //Duracion de mi animacion y delay para que se vea el logo antes de desaparecer
    >   
        <motion.img
        src={logo} //Imagen de mi logo PRIME
        alt="Prime Logo"
        className="w-52"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 0.7, opacity: 1 }}
        transition={{ 
            duration: 0.5,
            ease: "easeOut", //Tipo de animacion para que se vea mas fluida
        }}
        />
        </motion.div> //Cerramos el div de mi SplashScreen

        );  
    }

    export default SplashScreen; //Se exporta para poder utilizarlo en otros componentes que me seran de utilidad
    
