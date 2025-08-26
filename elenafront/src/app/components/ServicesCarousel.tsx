"use client";
import { useEffect, useRef, useState } from "react";
import ServiceIcon from "./ServiceIcon";

type Servicio = {
  categoria: string;
  descripcion?: string;
  icon?: string;
  color?: string;
  servicios: { nombre: string; precio: string | number; descripcion?: string }[];
};

export default function ServicesCarousel({ servicios }: { servicios: Servicio[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setSlidesPerView(3);
      else if (w >= 640) setSlidesPerView(2);
      else setSlidesPerView(1);
      updateButtons();
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateButtons = () => {
    const el = containerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 10);
    setCanNext(el.scrollLeft + el.clientWidth + 10 < el.scrollWidth);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => updateButtons();
    el.addEventListener("scroll", onScroll, { passive: true });
    updateButtons();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollNext = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
  };

  const scrollPrev = () => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
  };

  // touch swipe fallback (optional)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;
    let isDown = false;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDown = true;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isDown) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) scrollNext();
        else scrollPrev();
      }
      isDown = false;
    };
    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-6 justify-center">
        <button
          aria-label="Anterior"
          onClick={scrollPrev}
          disabled={!canPrev}
          className={`p-2 rounded-full bg-white shadow-sm text-gray-700 hover:bg-gray-100 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          ‹
        </button>
        <div className="w-full max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="w-full overflow-x-auto scroll-smooth no-scrollbar" 
            style={{ scrollSnapType: 'x mandatory' }}
          >
            <div className="flex gap-4 px-2" style={{ padding: '6px' }}>
            {servicios.map((categoria, idx) => (
              <div key={categoria.categoria} className="flex-shrink-0" style={{ scrollSnapAlign: 'center' }}>
                <div className="bg-white rounded-2xl shadow-elegant p-4 card-hover h-full" style={{ backgroundColor: categoria.color }}>
                  <div className="text-center mb-3">
                    <div className="flex justify-center mb-2">
                      <ServiceIcon type={categoria.icon ?? ""} className="w-8 h-8 text-gray-700" />
                    </div>
                    <h3 className="font-playfair text-lg font-semibold text-gray-900 mb-1">
                      {categoria.categoria === "Lavados" ? "Lavados y Tratamientos Capilares" :
                       categoria.categoria === "Maquillajes & Compañía" ? "Maquillaje Profesional Luque" :
                       categoria.categoria === "Cejas & Pestañas" ? "Cejas y Pestañas Perfectas" :
                       categoria.categoria === "Depilaciones" ? "Depilación Profesional" :
                       categoria.categoria === "Manos & Pies" ? "Manicura y Pedicura Luque" :
                       categoria.categoria === "Manitas Delicadas" ? "Uñas Acrílicas y Extensiones" :
                       categoria.categoria === "Color y Alisados" ? "Coloración y Alisados Paraguay" :
                       categoria.categoria}
                    </h3>
                    <p className="text-gray-600 text-sm">{categoria.descripcion}</p>
                  </div>

                  <div className="space-y-1 mb-3">
                    {categoria.servicios.slice(0, 3).map((servicio, i) => (
                      <div key={i} className="flex justify-between items-center py-1">
                        <span className="text-gray-700 text-sm truncate">{servicio.nombre}</span>
                        <span className="font-semibold text-gray-900 text-sm">₲{typeof servicio.precio === 'number' ? servicio.precio : servicio.precio}</span>
                      </div>
                    ))}
                    {categoria.servicios.length > 3 && (
                      <div className="text-center pt-1">
                        <span className="text-xs text-gray-500">+{categoria.servicios.length - 3} servicios más</span>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <a href="/servicios" className="inline-block bg-gradient-gold text-white px-4 py-2 rounded-full font-semibold hover:shadow-md transition-all duration-200 text-sm">
                      Ver todos
                    </a>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
        <button
          aria-label="Siguiente"
          onClick={scrollNext}
          disabled={!canNext}
          className={`p-2 rounded-full bg-white shadow-sm text-gray-700 hover:bg-gray-100 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          ›
        </button>
      </div>
    </div>
  );
}
