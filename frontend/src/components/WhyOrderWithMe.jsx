import Icon from "./Icon";

// ✏️ EDITA AQUÍ: tus razones. Escríbelas con lo que realmente ofreces.
const REASONS = [
  {
    icon: "user",
    title: "Trato directo",
    text: "Hablas conmigo, no con un formulario. Resuelvo tus dudas de tallas y disponibilidad.",
  },
  {
    icon: "eye",
    title: "Calidad que reviso",
    text: "Cada prenda pasa por mis manos antes de llegar a las tuyas.",
  },
  {
    icon: "wallet",
    title: "Precio justo",
    text: "Sin cargos sorpresa: pagas lo que ves, y te explico cómo pagar antes de que decidas.",
  },
  {
    icon: "clock",
    title: "Respuesta rápida",
    text: "Te contesto directo, sin esperar a que te atienda un agente.",
  },
];

function WhyOrderWithMe() {
  return (
    <section className="px-6 md:px-24 py-16">
      {/* 2 columnas en pantallas medianas o más grandes; 1 columna en móvil */}
      <div className="grid gap-12 md:grid-cols-2 md:gap-24">
        {/* COLUMNA IZQUIERDA: título (se queda fijo mientras bajas por la lista) */}
        <div className="self-start md:sticky md:top-24">
          <h2
            className="text-6xl leading-none text-black md:text-8xl"
            style={{ fontFamily: "Bebas Neue" }}
          >
            ¿Por qué pedir conmigo?
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-600">
            Una tienda pequeña tiene una ventaja: cada pedido importa y lo cuido yo mismo.
          </p>
        </div>

        {/* COLUMNA DERECHA: razones separadas por líneas */}
        <ul className="border-t border-gray-300">
          {REASONS.map((reason) => (
            // "group" permite que el ícono reaccione cuando pasas el mouse por toda la fila
            <li
              key={reason.title}
              className="group flex gap-5 border-b border-gray-300 py-7"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-300 text-black transition group-hover:border-black group-hover:bg-black group-hover:text-white">
                <Icon name={reason.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-xl font-semibold text-black">{reason.title}</h3>
                <p className="mt-1 leading-relaxed text-gray-600">{reason.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default WhyOrderWithMe;