import { useState, useEffect } from "react";
import Icon from "./Icon"; 

const SLIDES = [
  {
    icon: "shield",
    title: "Calidad en cada producto",
    text: "Pensadas para aguantar el entrenamiento diario y brindar la comodidad que necesitas.",
  },
  {
    icon: "tag",
    title: "Lo que nos caracteriza, es la confianza",
    text: "Compras directo conmigo, nada de tramites o pasos innecesarios",
  },
  {
    icon: "ruler",
    title: "Encontraras algo para ti",
    text: "Explora el catalogo y confirmamos la disponibilidad exacta antes de que realices tu pago.",
  },
  {
    icon: "truck",
    title: "Entrega coordinada",
    text: "Acordamos un punto de entrega rápido en Manzanillo o coordinamos el envío directo a tu dirección.",
  },
];

// Función para poner ceros a la izquierda (1 -> "01")
const pad = (n) => String(n).padStart(2, "0");

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function InfoCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const goNext = () => setCurrent((c) => (c + 1) % SLIDES.length);
  const goPrev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);

  // Autoplay de 5 segundos
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
      className="px-8 lg:px-24 py-24 bg-white flex flex-col items-center"
      aria-roledescription="carousel"
      aria-label="Información de la tienda"
    >
      <div
        className="w-full max-w-7xl overflow-hidden rounded-[2.5rem] bg-black text-white shadow-2xl transition-all duration-300"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Pista del carrusel */}
        <div
          className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {SLIDES.map((slide, i) => (
            <div
              key={slide.title}
              aria-hidden={i !== current}
              className="flex min-h-[28rem] w-full shrink-0 flex-col justify-between px-10 pb-8 pt-12 md:px-24 md:pt-16"
            >
              {/* Parte superior: Ícono y Contador */}
              <div className="flex items-start justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm shadow-sm">
                  <Icon name={slide.icon} className="h-7 w-7 text-white" />
                </span>
                <span
                  className="text-4xl leading-none text-gray-500 tracking-wider"
                  style={{ fontFamily: "Bebas Neue" }}
                >
                  {pad(i + 1)} <span className="text-gray-700">/</span> {pad(SLIDES.length)}
                </span>
              </div>

              {/* Parte inferior: Textos */}
              <div className="mb-4">
                <h2
                  className="text-6xl leading-none md:text-[7rem] tracking-wide mb-4"
                  style={{ fontFamily: "Bebas Neue" }}
                >
                  {slide.title}
                </h2>
                <p className="max-w-xl text-lg leading-relaxed text-gray-400 font-medium">
                  {slide.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Controles: Barras de progreso y Flechas */}
        <div className="flex items-center justify-between px-10 pb-10 md:px-24">
          
          {/* Barras segmentadas */}
          <div className="flex items-center gap-3">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.title}
                onClick={() => setCurrent(i)}
                aria-label={`Ir a la diapositiva ${i + 1}`}
                aria-current={i === current}
                className={`group cursor-pointer py-3 ${focusRing}`}
              >
                <span
                  className={`block h-[4px] rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-16 bg-white"
                      : "w-8 bg-white/20 group-hover:bg-white/50"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Flechas */}
          <div className="flex gap-4">
            <button
              onClick={goPrev}
              aria-label="Diapositiva anterior"
              className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-transparent transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95 ${focusRing}`}
            >
              <Icon name="arrow-left" className="h-6 w-6" />
            </button>
            <button
              onClick={goNext}
              aria-label="Diapositiva siguiente"
              className={`flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 hover:bg-gray-200 hover:scale-105 active:scale-95 ${focusRing}`}
            >
              <Icon name="arrow-right" className="h-6 w-6" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default InfoCarousel;