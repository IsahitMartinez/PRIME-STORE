import { Link } from "react-router-dom";
import Icon from "./Icon"; // Asumo que ya tienes este componente creado

const STEPS = [
  {
    icon: "shirt",
    title: "Elige tus prendas",
    text: "Revisa la tienda y anota lo que te gusta, con su talla y color.",
  },
  {
    icon: "chat",
    title: "Contáctame",
    text: "Escríbeme por WhatsApp o Instagram con tu lista y te confirmo disponibilidad.",
  },
  {
    icon: "card",
    title: "Haz tu pago",
    text: "Nos ponemos de acuerdo para tu tipo de pago.",
  },
  {
    icon: "package",
    title: "Recibe tu pedido",
    text: "Coordinamos la entrega a medida.",
  },
];

function HowToOrder() {
  return (
    <section id="como-pedir" className="px-8 lg:px-24 py-24 bg-gray-50 flex flex-col items-center">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between w-full max-w-7xl mb-12 text-center md:text-left">
        <h2
          className="text-6xl md:text-8xl leading-none text-black uppercase"
          style={{ fontFamily: "Bebas Neue" }}
        >
          ¿Cómo comprar en PRIME?
        </h2>
        <p className="max-w-xs text-sm leading-relaxed text-gray-500 font-medium pb-2 mx-auto md:mx-0">
          Simplemente cuatro pasos sencillos.
        </p>
      </div>

      <ol className="w-full max-w-7xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => {
          // Detectamos si es el último paso para invertir los colores
          const isLast = i === STEPS.length - 1;

          return (
            <li
              key={step.title}
              className={`flex min-h-[19rem] flex-col justify-between rounded-[2rem] border p-8 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl cursor-default ${
                isLast
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-white text-black"
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`text-7xl leading-none ${isLast ? "text-gray-300" : "text-gray-200"}`}
                  style={{ fontFamily: "Bebas Neue" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {/* Asegúrate de que tu componente Icon soporte la prop className */}
                <Icon name={step.icon} className="h-7 w-7" />
              </div>

              <div>
                <h3 className="text-xl font-bold tracking-wide mb-2">{step.title}</h3>
                <p
                  className={`text-sm leading-relaxed ${
                    isLast ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {step.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <Link to="/shop" className="mt-16">
        <button
          type="button"
          className="px-10 py-4 bg-black text-white rounded-full font-bold text-sm tracking-widest transition-all hover:bg-gray-800 hover:-translate-y-1 shadow-lg cursor-pointer uppercase"
        >
          Ver Catálogo Completo
        </button>
      </Link>
    </section>
  );
}

export default HowToOrder;