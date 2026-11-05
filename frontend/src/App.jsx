import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SideBarCart from "./components/SideBarCart";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  // 1. Cargar desde localStorage al iniciar
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("prime_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  // 2. Guardar en localStorage cada vez que cambie 'cartItems'
  useEffect(() => {
    try {
      localStorage.setItem("prime_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error al guardar en localStorage:", error);
    }
  }, [cartItems]);

  // Agregar producto agrupando por ID y Talla
  function addToCart(product) {
    setCartItems((prevItems) => {
      const sizeKey = product.selectedSize || "M";
      const existingItem = prevItems.find(
        (item) => String(item.id) === String(product.id) && (item.selectedSize || "M") === sizeKey
      );

      if (existingItem) {
        return prevItems.map((item) =>
          String(item.id) === String(product.id) && (item.selectedSize || "M") === sizeKey
            ? { ...item, cantidad: (parseInt(item.cantidad) || 1) + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, cantidad: 1, selectedSize: sizeKey }];
    });

    setIsCartOpen(true);
  }

  // Modificar cantidad (+1 / -1)
  function updateQuantity(productId, delta) {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (String(item.id) === String(productId)) {
          const currentQty = parseInt(item.cantidad) || 1;
          const newQty = currentQty + delta;
          return { ...item, cantidad: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  }

  // Asignar cantidad directa desde el input
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

  // Total de unidades para la insignia
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