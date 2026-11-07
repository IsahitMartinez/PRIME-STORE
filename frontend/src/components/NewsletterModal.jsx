import { useState } from "react";
import { X } from "lucide-react";
import { supabase } from "../lib/supabase"; // Importamos tu conexión a Supabase

function NewsletterModal({ isOpen, onClose, onContinue }) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Si le da al botón pero el campo está vacío, simplemente continúa al shop
    if (!email) {
      onContinue();
      return;
    }

    setIsSubmitting(true);

    // Guardar en Supabase
    const { error } = await supabase
      .from("newsletter")
      .insert([{ email }]);

    if (error) {
      // Si el código es 23505 significa que el correo ya existía en la base de datos
      if (error.code === '23505') {
        setIsSuccess(true);
      } else {
        console.error("Error al guardar correo:", error);
      }
    } else {
      setIsSuccess(true);
    }

    setIsSubmitting(false);

    // Esperar un momento para que el usuario vea el mensaje de éxito y luego cerrar
    setTimeout(() => {
      onContinue();
      // Reseteamos estados por si lo vuelve a abrir
      setEmail("");
      setIsSuccess(false);
    }, 1500);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-all"
      onClick={onClose}
    >
      <div 
        className="bg-[#fefefc] rounded-[2.5rem] w-full max-w-md p-8 md:p-10 relative shadow-2xl transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors cursor-pointer"
        >
          <X size={24} />
        </button>

        <div className="text-center mt-2">
          <span className="text-xs font-bold tracking-[0.3em] text-gray-400 uppercase mb-3 block">
            Beneficios Exclusivos
          </span>
          <h2 
            className="text-6xl text-black mb-4" 
            style={{ fontFamily: "Bebas Neue" }}
          >
            ÚNETE A PRIME
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-8 px-2">
            Déjanos tu correo (opcional) para recibir notificaciones cada que actualicemos el catálogo o lancemos descuentos exclusivos.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting || isSuccess}
              className="w-full bg-gray-100/50 border border-gray-200 text-black px-6 py-4 rounded-full outline-none focus:border-black focus:bg-white transition-all text-sm disabled:opacity-50"
            />
            
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`
                w-full px-8 py-4 rounded-full font-bold text-sm tracking-widest transition-all cursor-pointer shadow-lg
                ${isSuccess 
                  ? "bg-green-500 text-white hover:bg-green-600" 
                  : "bg-black text-white hover:bg-gray-800 hover:-translate-y-1 active:scale-95"
                }
                ${(isSubmitting) && "opacity-75 cursor-wait"}
              `}
            >
              {isSubmitting ? "GUARDANDO..." : isSuccess ? "¡SUSCRITO!" : email ? "SUSCRIBIRME" : "CONTINUAR"}
            </button>
          </form>

          {!isSuccess && (
            <button
              onClick={onContinue}
              className="mt-6 text-xs font-semibold text-gray-400 hover:text-black tracking-widest uppercase transition-colors cursor-pointer"
            >
              No gracias, en otro momento
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsletterModal;