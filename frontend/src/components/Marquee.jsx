// ✏️ EDITA AQUÍ: las frases que se repiten en la cinta
const ITEMS = [
  "VISTE Y ENTRENA PREMIUM",
  "STREETWEAR DEPORTIVO",
  "EXCLUSIVIDAD EN CADA DROP",
  "RENDIMIENTO Y PRESENCIA",
  "CALIDAD SUPERIOR",
  "ESTILO SIN LÍMITES",
];

function Marquee() {
  // Cuadruplicamos la lista para que el loop nunca se rompa, 
  // ni siquiera en monitores ultra anchos o pantallas 4K.
  const loop = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div
      className="prime-marquee overflow-hidden border-y border-black bg-white py-6 shadow-md"
      aria-hidden="true"
    >
      <style>{`
        @keyframes prime-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .prime-marquee-track { animation: prime-marquee 40s linear infinite; }
        .prime-marquee:hover .prime-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .prime-marquee-track { animation: none; }
        }
      `}</style>

      <div className="prime-marquee-track flex w-max items-center whitespace-nowrap">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center gap-12 pr-12">
            <span
              className="text-4xl md:text-5xl leading-none text-gray-900 tracking-widest uppercase transition-colors hover:text-gray-300"
              style={{ fontFamily: "Bebas Neue" }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;