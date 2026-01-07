"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ServiceIcon from "./ServiceIcon";

type Servicio = {
  categoria: string;
  descripcion?: string;
  icon?: string;
  color?: string;
  imagen_url?: string;
  servicios: { nombre: string; precio: string | number; descripcion?: string; imagen_url?: string }[];
};

export default function ServicesCarousel({ servicios, activeFilter = "todos" }: { servicios: Servicio[], activeFilter?: string }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Filtrar servicios según la categoría activa
  const filteredServicios = activeFilter === "todos" 
    ? servicios 
    : servicios.filter(servicio => {
        const categoryMap: { [key: string]: string } = {
          "maquillaje": "Maquillajes & Compañía",
          "capilares": "Lavados",
          "cejas": "Cejas & Pestañas"
        };
        return servicio.categoria === categoryMap[activeFilter];
      });

  useEffect(() => {
    const update = () => {
      // La lógica de slidesPerView está implícita en las clases CSS responsive
      updateButtons();
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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
            <div className="flex gap-3 md:gap-4 px-2" style={{ padding: '6px' }}>
            {filteredServicios.map((categoria) => {
              // Buscar la primera imagen disponible: primero en la categoría, luego en los servicios
              const categoriaImagen = categoria.imagen_url;
              const servicioConImagen = categoria.servicios.find(s => s.imagen_url);
              const imagenMostrar = categoriaImagen || servicioConImagen?.imagen_url;
              
              return (
              <div key={categoria.categoria} className="flex-shrink-0" style={{ scrollSnapAlign: 'center' }}>
                <div className="bg-white rounded-2xl shadow-elegant overflow-hidden card-hover h-full border border-gray-100">
                  {/* Imagen del servicio si existe */}
                  {imagenMostrar && (
                    <div className="relative w-full h-40 md:h-48 overflow-hidden">
                      <Image
                        src={imagenMostrar}
                        alt={categoria.categoria}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 300px, 400px"
                      />
                    </div>
                  )}
                  
                  <div className="p-3 md:p-4">
                    <div className="text-center mb-2 md:mb-3">
                      {!imagenMostrar && (
                        <div className="flex justify-center mb-1 md:mb-2">
                          <ServiceIcon type={categoria.icon ?? ""} className="w-6 h-6 md:w-8 md:h-8 text-amber-600" />
                        </div>
                      )}
                      <h3 className="font-playfair text-base md:text-lg font-semibold text-gray-900 mb-1">
                        {categoria.categoria === "Lavados" ? "Lavados y Tratamientos Capilares" :
                         categoria.categoria === "Maquillajes & Compañía" ? "Maquillaje Profesional" :
                         categoria.categoria === "Cejas & Pestañas" ? "Cejas y Pestañas" :
                         categoria.categoria === "Depilaciones" ? "Depilación Profesional" :
                         categoria.categoria === "Manos & Pies" ? "Manicura y Pedicura" :
                         categoria.categoria === "Manitas Delicadas" ? "Uñas Acrílicas y Extensiones" :
                         categoria.categoria === "Color y Alisados" ? "Coloración y Alisados" :
                         categoria.categoria}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm">{categoria.descripcion}</p>
                    </div>

                  <div className="space-y-2 mb-3 md:mb-4">
                    {categoria.servicios.length > 0 && (
                      <div className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 text-sm">Desde</span>
                        <span className="font-semibold text-amber-600 text-base md:text-lg">
                          ₲{typeof categoria.servicios[0].precio === 'number'
                            ? categoria.servicios[0].precio.toLocaleString()
                            : categoria.servicios[0].precio}
                        </span>
                      </div>
                    )}
                    {categoria.servicios.length > 1 && (
                      <div className="text-center">
                        <span className="text-xs text-gray-500">
                          +{categoria.servicios.length - 1} servicios más
                        </span>
                      </div>
                    )}
                  </div>

                    <div className="text-center">
                      <a
                        href="/servicios"
                        className="inline-block bg-amber-600 hover:bg-amber-700 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-full font-semibold hover:shadow-lg transition-all duration-200 text-xs md:text-sm"
                      >
                        Explorar servicios
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
            })}
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
