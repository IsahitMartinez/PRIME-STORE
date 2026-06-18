import { X } from "lucide-react";

function SideBarCart({ isOpen, onClose, cartItems, removeFromCart }) {
  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-80
        bg-[#fefefc] z-50 shadow-2xl p-8
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {/* Encabezado */}
      <div className="border-b border-gray-200 pb-4">
        <div className="flex justify-between items-center">
          <h2
            className="text-4xl text-black"
            style={{ fontFamily: "Bebas Neue" }}
          >
            TU CARRITO
          </h2>

          <button onClick={onClose} aria-label="Cerrar carrito">
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Productos */}
      <div className="mt-8">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío.</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center py-5 border-b border-gray-200"
            >
              <img
                src={item.image}
                alt={item.nombre}
                className="w-16 h-16 object-cover rounded-xl"
              />

              <div className="ml-4">
                <h3 className="text-lg font-medium">{item.nombre}</h3>

                <p className="text-gray-500">{item.precio}</p>

                <button onClick={() => removeFromCart(item.id)}
                className="mt-2 text-sm text-gray-500 hover:underline"
                >
                                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SideBarCart;