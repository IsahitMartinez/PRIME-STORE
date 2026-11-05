import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SideBarCart from "./components/SideBarCart";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  // Agregar producto agrupando por ID
  function addToCart(product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => String(item.id) === String(product.id));
      if (existingItem) {
        return prevItems.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, cantidad: (parseInt(item.cantidad) || 1) + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, cantidad: 1 }];
    });

    setIsCartOpen(true);
  }

  // Sumar (+1) o Restar (-1) con conversión segura de ID
  function updateQuantity(productId, delta) {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (String(item.id) === String(productId)) {
          const currentQty = parseInt(item.cantidad) || 1;
          const newQty = currentQty + delta;
          // Evitamos que baje de 1 al presionar "-" (para borrar se usa el botón Eliminar)
          return { ...item, cantidad: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  }

  // Escribir un número directo en el input
  function setQuantityDirect(productId, newQty) {
    const parsedQty = parseInt(newQty);
    if (isNaN(parsedQty) || parsedQty < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        String(item.id) === String(productId)
          ? { ...item, cantidad: parsedQty }
          : item
      )
    );
  }

  // Eliminar producto por completo
  function removeFromCart(productId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => String(item.id) !== String(productId))
    );
  }

  // Total de piezas para el badge
  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + (parseInt(item.cantidad) || 1),
    0
  );

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <SideBarCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        setQuantityDirect={setQuantityDirect}
        removeFromCart={removeFromCart}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={
            <Shop
              addToCart={addToCart}
              cartCount={totalCartCount}
              openCart={() => setIsCartOpen(true)}
              removeFromCart={removeFromCart}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;