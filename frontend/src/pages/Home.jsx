function Home() {
  return (

    // CONTENEDOR PRINCIPAL DEL HOME
    <div className="min-h-screen bg-[#fefefc]">

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col justify-center px-20">

        {/* TEXTO PEQUEÑO */}
        <p className="text-sm tracking-[0.3em] text-gray-500 mb-4">
          VISTE Y ENTRENA PREMIUM
        </p>

        {/* TITULO PRINCIPAL */}
        <h1
          className="text-[10rem] leading-none text-black"
          style={{ fontFamily: "Bebas Neue" }}
        >
          PRIME
        </h1>

        {/* SUBTITULO */}
        <p className="text-lg text-gray-600 max-w-xl mt-6">
          Colecciones deportivas con la mejor calidad, al mejor precio, no lo pienses 2 veces.
        </p>

        {/* BOTON */}
        <button
          className="
            mt-10
            w-fit
            px-8
            py-4
            bg-black
            text-white
            rounded-full
            hover:bg-gray-800
            transition
          "
        >
          COMPRAR AHORA
        </button>

      </section>
    </div>
  );
}

export default Home;