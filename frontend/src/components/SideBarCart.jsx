import React from "react";

function SideBarCart({ 
  isOpen, 
  onClose, 
  cartItems, 
  updateQuantity, 
  setQuantityDirect, 
  removeFromCart 
}) {
  if (!isOpen) return null;

  // Cálculo del total
  const totalAmount = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.cantidad) || 1;
    return acc + (price * qty);
  }, 0);

  // Función para construir el mensaje de WhatsApp y redirigir
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    const phoneNumber = "523141425761"; // Tu número de contacto de PRIME (formato internacional)

    let message = `*¡HOLA! QUIERO REALIZAR UN PEDIDO EN PRIME ⚡*\n\n`;
    message += `*Detalle de la orden:*\n`;

    cartItems.forEach((item, index) => {
      const qty = parseInt(item.cantidad) || 1;
      const size = item.selectedSize || "M";
      const price = parseFloat(item.price) || 0;
      const subtotal = price * qty;

      message += `${index + 1}. *${item.name}*\n`;
      message += `   • Talla: ${size}\n`;
      message += `   • Cantidad: ${qty}\n`;
      message += `   • Subtotal: $${subtotal.toFixed(2)} MXN\n\n`;
    });

    message += `*TOTAL A PAGAR: $${totalAmount.toFixed(2)} MXN*\n\n`;
    message += `Quedo a la espera de los datos para realizar el pago y acordar la entrega. ¡Muchas gracias!`;

    // Codificamos el mensaje para que sea válido en URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Abre WhatsApp en una ventana nueva
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-all"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold" style={{ fontFamily: "Bebas Neue" }}>TU CARRITO PRIME</h2>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl font-bold cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            ✕
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 py-6 space-y-6 overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-400 mt-20">Tu carrito está vacío.</p>
          ) : (
            cartItems.map((item) => {
              const currentQty = parseInt(item.cantidad) || 1;

              return (
                <div key={`${item.id}-${item.selectedSize || 'M'}`} className="flex items-center justify-between border-b border-gray-100 pb-4">
                  
                  {/* Foto e Info */}
                  <div className="flex items-center gap-4">
                    <img 
                      src={item.image_url} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-xl shrink-0 shadow-sm"
                    />
                    <div>
                      <h3 className="font-bold text-sm text-gray-800">{item.name}</h3>
                      <p className="text-xs text-gray-500 font-semibold">Talla: <span className="text-black">{item.selectedSize || "M"}</span></p>
                      <p className="text-green-600 font-semibold text-sm">{item.price} $</p>
                    </div>
                  </div>

                  {/* Controles (+ / Input / -) y Eliminar */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
                      
                      {/* Restar */}
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded bg-white shadow-sm text-gray-700 hover:bg-gray-100 cursor-pointer font-bold select-none active:scale-95 transition-transform"
                      >
                        -
                      </button>
                      
                      {/* Input Directo */}
                      <input 
                        type="number" 
                        value={currentQty}
                        onChange={(e) => setQuantityDirect(item.id, e.target.value)}
                        className="w-10 text-center text-sm font-bold bg-transparent outline-none text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        min="1"
                      />

                      {/* Sumar */}
                      <button 
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded bg-white shadow-sm text-gray-700 hover:bg-gray-100 cursor-pointer font-bold select-none active:scale-95 transition-transform"
                      >
                        +
                      </button>
                    </div>

                    {/* Eliminar */}
                    <button 
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Total y Finalizar Pedido */}
        {cartItems.length > 0 && (
          <div className="border-t pt-4 mt-auto">
            <div className="flex justify-between items-center text-xl font-bold mb-4">
              <span>Total:</span>
              <span className="text-green-600">${totalAmount.toFixed(2)}</span>
            </div>

            <button 
              type="button"
              onClick={handleWhatsAppCheckout}
              className="
                w-full bg-black text-white py-4 rounded-full font-bold cursor-pointer text-center 
                transition-all duration-300 ease-out
                hover:bg-green-600 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]
                hover:-translate-y-1 active:-translate-y-0.5
              "
            >
              FINALIZAR COMPRA POR WHATSAPP
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default SideBarCart;