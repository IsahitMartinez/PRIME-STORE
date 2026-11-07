import { useState, useEffect } from "react";
import Icon from "./Icon";

// ✏️ EDITA AQUÍ: cada objeto es una diapositiva (icon = nombre en Icon.jsx)
const SLIDES = [
  {
    icon: "shield",
    title: "Calidad que se nota",
    text: "Telas deportivas pensadas para aguantar el entrenamiento y los lavados.",
  },
  {
    icon: "tag",
    title: "Precio sin intermediarios",
    text: "Compras directo conmigo, así que el precio es el que ves.",
  },
  {
    icon: "ruler",
    title: "Tu talla, tu color",
    text: "Dime qué buscas y te confirmo disponibilidad antes de que pagues.",
  },
  {
    icon: "truck",
    title: "Entrega coordinada",
    text: "Acordamos el punto de entrega o te lo mando a tu dirección.",
  },
];

// 1 -> "01", 2 -> "02"...
const pad = (n) => String(n).padStart(2, "0");

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function InfoCarousel() {
  // current = índice de la diapositiva visible (0, 1, 2...)
  const [current, setCurrent] = useState(0);
  // paused = true cuando el mouse o el teclado están dentro del carrusel
  const [paused, setPaused] = useState(false);

  // El módulo (%) hace que al llegar al final vuelva al inicio
  const goNext = () => setCurrent((c) => (c + 1) % SLIDES.length);
  const goPrev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);

  // Autoplay: se reprograma cada vez que cambia "current" o "paused".
  // El return limpia el temporizador anterior para que no se acumulen.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (paused || reduceMotion) return;

    const id = setTimeout(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);

    return () => clearTimeout(id);
  }, [current, paused]);

  return (
    <section
      className="px-6 md:px-24 py-16"
      aria-roledescription="carousel"
      aria-label="Información de la tienda"
    >
      <div
        className="overflow-hidden rounded-[2.5rem] bg-black text-white"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Pista: todas las diapositivas en fila; se mueve con translateX */}
        <div
          className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {SLIDES.map((slide, i) => (
            <div
              key={slide.title}
              aria-hidden={i !== current}
              className="flex min-h-[26rem] w-full shrink-0 flex-col justify-between px-8 pb-6 pt-10 md:px-20 md:pt-14"
            >
              {/* Arriba: ícono a la izquierda, contador a la derecha */}
              <div className="flex items-start justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25">
                  <Icon name={slide.icon} className="h-6 w-6" />
                </span>
                <span
                  className="text-3xl leading-none text-gray-500"
                  style={{ fontFamily: "Bebas Neue" }}
                >
                  {pad(i + 1)} / {pad(SLIDES.length)}
                </span>
              </div>

              {/* Abajo: mensaje */}
              <div>
                <h2
                  className="text-6xl leading-none md:text-8xl"
                  style={{ fontFamily: "Bebas Neue" }}
                >
                  {slide.title}
                </h2>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-400">
                  {slide.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Controles: barra segmentada a la izquierda, flechas a la derecha */}
        <div className="flex items-center justify-between px-8 pb-8 md:px-20">
          <div className="flex items-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.title}
                onClick={() => setCurrent(i)}
                aria-label={`Ir a la diapositiva ${i + 1}`}
                aria-current={i === current}
                className={`group cursor-pointer py-3 ${focusRing}`}
              >
                <span
                  className={`block h-[3px] rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-14 bg-white"
                      : "w-6 bg-white/30 group-hover:bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={goPrev}
              aria-label="Diapositiva anterior"
              className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/25 transition hover:bg-white/10 ${focusRing}`}
            >
              <Icon name="arrow-left" className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              aria-label="Diapositiva siguiente"
              className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white text-black transition hover:bg-gray-200 ${focusRing}`}
            >
              <Icon name="arrow-right" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoCarousel;