import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { supabase } from "../lib/supabase"; // Importamos la conexión que creamos

function Shop({ addToCart, cartCount, openCart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para obtener los productos de Supabase
    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data, error } = await supabase.from('products').select('*');
                if (error) {
                    console.error('Error al cargar productos:', error.message);
                } else {
                    setProducts(data || []);
                }
            } catch (error) {
                console.error('Error de conexión:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-[#fefefc] p-20">
            <Navbar
                cartCount={cartCount}
                openCart={openCart}
            />
            
            <h1
                className="text-7xl text-black mt-10"
                style={{ fontFamily: "Bebas Neue" }}
            >
                SHOP
            </h1>

            <p className="text-xl text-gray-500 mt-4">
                Explora y adquiere comodidad con estilo
            </p> 

            {/* Mensaje mientras carga de la base de datos */}
            {loading ? (
                <div className="text-center mt-20 text-2xl text-gray-400">Cargando catálogo deportivo...</div>
            ) : products.length === 0 ? (
                <div className="text-center mt-20 text-xl text-gray-500">No hay productos disponibles por el momento. ¡Actualiza tu inventario en Supabase!</div>
            ) : (
                <div className="grid grid-cols-3 gap-10 mt-10">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 shadow-md rounded-3xl">
                            <img 
                                src={product.image_url} 
                                alt={product.name} 
                                className="w-full h-80 object-cover rounded-3xl mb-5" 
                            />
                            <h2 className="text-xl font-bold">{product.name}</h2>
                            <p className="text-lg text-green-500">{product.price} $</p>
                            <p className="text-sm text-gray-500">{product.categoria || product.category}</p>

                            <button 
                                onClick={() => addToCart(product)}
                                className="mt-5 w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition"
                            >
                                AGREGAR AL CARRITO
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Shop;