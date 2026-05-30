import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SideBarCart from "./components/SideBarCart";


function App() {
  const [showSplash, setShowSplash] = useState(true); // Estado para controlar la visibilidad del splash screen
  // Productos dentro del carrito
  const [cartItems, setCartItems] = useState([]);

 // Sidebar abierto/cerrado
  const [isCartOpen, setIsCartOpen] = useState(false);
    useEffect(() => { // useEffect para ocultar el splash screen después de un tiempo
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3200); // Duración del splash screen en milisegundos

      return () => clearTimeout(timer); // Limpieza del timer si el componente se desmonta antes de que termine el tiempo
      }, []);

  // Agregar producto al carrito
  function addToCart(product) {
    setCartItems((prevItems) => [...prevItems, product]);

    // Abrir sidebar automáticamente
    setIsCartOpen(true);
  }

    if (showSplash) {
    return <SplashScreen />;
   } 
  


 return (
  <Router>
    <SideBarCart // Componente del carrito lateral
          isOpen={isCartOpen} // Función para cerrar el carrito
          onClose={() => setIsCartOpen(false)} // Productos en el carrito
          cartItems={cartItems} //Estado para controlar la visibilidad del carrito
    />

    <Routes>
   
        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* SHOP */}
        <Route
          path="/shop"
          element={<Shop addToCart={addToCart} />}
        />
        
      </Routes>
      

    </Router>
  );

}



export default App
