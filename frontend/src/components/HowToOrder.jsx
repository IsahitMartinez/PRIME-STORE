import { Link } from "react-router-dom";
import Icon from "./Icon";

// ✏️ EDITA AQUÍ: los pasos de tu proceso (el número 01, 02... se genera solo)
const STEPS = [
  {
    icon: "shirt",
    title: "Elige tus prendas",
    text: "Revisa la tienda y anota lo que te gusta, con su talla y color.",
  },
  {
    icon: "chat",
    title: "Confírmame tu pedido",
    text: "Escríbeme por WhatsApp o Instagram con tu lista y te confirmo disponibilidad.",
  },
  {
    icon: "card",
    title: "Haz tu pago",
    text: "Te paso los datos de pago y apartamos tu pedido en cuanto lo recibo.",
  },
  {
    icon: "package",
    title: "Recibe tu pedido",
    text: "Coordinamos la entrega o el envío a tu dirección.",
  },
];

function HowToOrder() {
  return (
    // id="como-pedir" sirve para enlazar a esta sección con href="#como-pedir"
    <section id="como-pedir" className="px-6 md:px-24 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <h2
          className="text-6xl leading-none text-black md:text-8xl"
          style={{ fontFamily: "Bebas Neue" }}
        >
          Cómo hacer tu pedido
        </h2>
        <p className="max-w-xs text-lg leading-relaxed text-gray-600">
          Cuatro pasos, y yo te acompaño en todos.
        </p>
      </div>

      {/* <ol> = lista ordenada: tiene sentido porque los pasos van en secuencia */}
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* .map() recorre STEPS y crea una card por cada paso.
            "key" ayuda a React a identificar cada elemento de la lista. */}
        {STEPS.map((step, i) => {
          // El último paso va invertido (negro): es el resultado final del proceso
          const isLast = i === STEPS.length - 1;

          return (
            <li
              key={step.title}
              className={`flex min-h-[19rem] flex-col justify-between rounded-[2rem] border p-8 transition hover:-translate-y-1 hover:shadow-lg ${
                isLast
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-[#ece8e1] text-black"
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className="text-7xl leading-none"
                  style={{ fontFamily: "Bebas Neue" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon name={step.icon} className="h-7 w-7" />
              </div>

              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p
                  className={`mt-2 leading-relaxed ${
                    isLast ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {step.text}
                </p>
              </div>
            </li>
          );
        })}
      </ol>

      <Link
        to="/shop"
        className="mt-12 inline-block rounded-full bg-black px-10 py-4 text-white shadow-lg transition hover:-translate-y-1 hover:bg-gray-800"
      >
        Ver la tienda
      </Link>
    </section>
  );
}

export default HowToOrder;