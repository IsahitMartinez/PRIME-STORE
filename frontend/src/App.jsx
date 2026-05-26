import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import Shop from "./pages/Shop";


function App() {
  const [showSplash, setShowSplash] = useState(true); // Estado para controlar la visibilidad del splash screen

  useEffect(() => { // useEffect para ocultar el splash screen después de un tiempo
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3200); // Duración del splash screen en milisegundos

  return () => clearTimeout(timer); // Limpieza del timer si el componente se desmonta antes de que termine el tiempo
  }, []);
 

    if (showSplash) {
    return <SplashScreen />;
  } 
  


return (
  <Router>

    <Routes>
   
        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* SHOP */}
        <Route
          path="/shop"
          element={<Shop />}
        />

      </Routes>

    </Router>
  );
}




export default App
