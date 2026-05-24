import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";


function App() {
  const [showSplash, setShowSplash] = useState(true); // Estado para controlar la visibilidad del splash screen

  useEffect(() => { // useEffect para ocultar el splash screen después de un tiempo
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4200); // Duración del splash screen en milisegundos

  return () => clearTimeout(timer); // Limpieza del timer si el componente se desmonta antes de que termine el tiempo
  }, []);
 
  return ( // Mostramos el SplashScreen o el Home dependiendo del estado showSplash
    <>

      {showSplash ? <SplashScreen /> : <Home />}
    </>
  );
}

export default App
