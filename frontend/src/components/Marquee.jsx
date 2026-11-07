// ✏️ EDITA AQUÍ: las frases que se repiten en la cinta
const ITEMS = [
  "Viste y entrena",
  "Calidad premium",
  "Pedidos directos",
  "Streetwear deportivo",
];

function Marquee() {
  // Duplicamos la lista: cuando la primera mitad sale de pantalla,
  // la segunda ocupa su lugar y el loop no se nota.
  const loop = [...ITEMS, ...ITEMS];

  return (
    <div
      className="prime-marquee overflow-hidden border-y border-black bg-[#fefefc] py-4"
      aria-hidden="true"
    >
      {/* Estilos propios de este componente (nombres con "prime-" para no chocar con nada) */}
      <style>{`
        @keyframes prime-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .prime-marquee-track { animation: prime-marquee 30s linear infinite; }
        .prime-marquee:hover .prime-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .prime-marquee-track { animation: none; }
        }
      `}</style>

      <div className="prime-marquee-track flex w-max items-center whitespace-nowrap">
        {loop.map((item, i) => (
          // pr-10 (y no "gap") para que cada bloque mida lo mismo y el -50% sea exacto
          <div key={i} className="flex items-center gap-10 pr-10">
            <span
              className="text-3xl md:text-4xl leading-none text-black"
              style={{ fontFamily: "Bebas Neue" }}
            >
              {item}
            </span>
            <span className="h-2 w-2 rounded-full bg-black" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;