import React, { useState } from "react";
import ToastNotification from "./ToastNotification";

function SideBarCart({ 
  isOpen, 
  onClose, 
  cartItems, 
  updateQuantity, 
  setQuantityDirect, 
  removeFromCart 
}) {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2800);
  };

  // CÁLCULOS DE CANTIDAD, SUBTOTAL Y DESCUENTO
  const totalItems = cartItems.reduce((acc, item) => acc + (parseInt(item.cantidad) || 1), 0);
  
  const subtotalAmount = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.cantidad) || 1;
    return acc + (price * qty);
  }, 0);

  // Aplica 10% de descuento si hay 4 o más artículos en total
  const hasDiscount = totalItems >= 4;
  const discountAmount = hasDiscount ? subtotalAmount * 0.10 : 0;
  const totalAmount = subtotalAmount - discountAmount;

  // Checkout por WhatsApp
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    const phoneNumber = "523141425761"; 

    let message = `*¡HOLA! QUIERO REALIZAR UN PEDIDO EN PRIME ⚡*\n\n`;
    message += `*Detalle de la orden:*\n`;

    cartItems.forEach((item, index) => {
      const qty = parseInt(item.cantidad) || 1;
      const size = item.selectedSize || "Unitalla";
      const color = item.selectedColor || "Único";
      const price = parseFloat(item.price) || 0;
      const sub = price * qty;

      message += `${index + 1}. *${item.name}*\n`;
      message += `   • Color: ${color}\n`;
      if (size !== "Unitalla") message += `   • Talla: ${size}\n`;
      message += `   • Cantidad: ${qty}\n`;
      message += `   • Importe: $${sub.toFixed(2)} MXN\n\n`;
    });

    // Agregar desglose de descuento si aplica
    if (hasDiscount) {
      message += `   *Subtotal:* $${subtotalAmount.toFixed(2)} MXN\n`;
      message += `   *Descuento (10% por 4+ prendas):* -$${discountAmount.toFixed(2)} MXN\n\n`;
    }

    message += `*TOTAL A PAGAR: $${totalAmount.toFixed(2)} MXN*\n\n`;
    message += `Quedo a la espera de los datos para realizar el pago y acordar la entrega. ¡Muchas gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <ToastNotification message={toastMessage} isVisible={showToast} />

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
                const showSize = item.selectedSize && item.selectedSize !== "Unitalla";

                return (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex items-center justify-between border-b border-gray-100 pb-4">
                    
                    <div className="flex items-center gap-4">
                      <img 
                        src={item.image_url} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-xl shrink-0 shadow-sm"
                      />
                      <div>
                        <h3 className="font-bold text-sm text-gray-800 leading-tight">{item.name}</h3>
                        <p className="text-xs text-gray-500 font-semibold mt-1">
                          Color: <span className="text-black">{item.selectedColor || "Único"}</span> 
                          {showSize && (
                            <> | Talla: <span className="text-black">{item.selectedSize}</span></>
                          )}
                        </p>
                        <p className="text-green-600 font-semibold text-sm mt-1">${item.price} MXN</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
                        <button 
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center rounded bg-white shadow-sm text-gray-700 hover:bg-gray-100 cursor-pointer font-bold select-none active:scale-95 transition-transform"
                        >
                          -
                        </button>
                        
                        <input 
                          type="number" 
                          value={currentQty}
                          onChange={(e) => setQuantityDirect(item.id, e.target.value)}
                          className="w-10 text-center text-sm font-bold bg-transparent outline-none text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          min="1"
                        />

                        <button 
                          type="button"
                          onClick={() => {
                            if (item.stock !== undefined && currentQty >= item.stock) {
                              triggerToast(`Límite alcanzado: solo hay ${item.stock} unidades de ${item.name}`);
                              return;
                            }
                            updateQuantity(item.id, 1);
                          }}
                          className="w-7 h-7 flex items-center justify-center rounded bg-white shadow-sm text-gray-700 hover:bg-gray-100 cursor-pointer font-bold select-none active:scale-95 transition-transform"
                        >
                          +
                        </button>
                      </div>

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

          {/* Resumen y Finalizar Pedido */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-200 pt-4 mt-auto">
              
              {/* Desglose de Descuento UI */}
              {hasDiscount && (
                <>
                  <div className="flex justify-between items-center text-sm font-semibold text-gray-400 mb-1 line-through">
                    <span>Subtotal:</span>
                    <span>${subtotalAmount.toFixed(2)} MXN</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold text-green-500 mb-3">
                    <span>Descuento (10% por 4+ piezas):</span>
                    <span>-${discountAmount.toFixed(2)} MXN</span>
                  </div>
                </>
              )}

              <div className="flex justify-between items-center text-2xl font-bold mb-5">
                <span>Total:</span>
                <span className="text-green-500">${totalAmount.toFixed(2)} MXN</span>
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
    </>
  );
}

export default SideBarCart;