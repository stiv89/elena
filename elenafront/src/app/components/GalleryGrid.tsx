"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type Foto = { image: string; desc: string; category: string };

interface GalleryGridProps {
  images: Foto[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("todos");
  const [visibleImages, setVisibleImages] = useState<number>(6);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const categories = ["todos", "maquillaje", "cabello", "peinados", "cejas"];

  const filteredImages = activeCategory === "todos"
    ? images
    : images.filter(img => img.category === activeCategory);

  const displayedImages = filteredImages.slice(0, visibleImages);

  const loadMore = () => {
    setVisibleImages(prev => Math.min(prev + 6, filteredImages.length));
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  useEffect(() => {
    // Reset visible images when category changes
    setVisibleImages(6);
  }, [activeCategory]);

  return (
    <section id="galeria" className="py-8 md:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Título compacto */}
        <div className="text-center mb-6 md:mb-12">
          <h2 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
            Galería
          </h2>
          <p className="text-sm md:text-lg text-gray-600">
            Nuestros mejores trabajos
          </p>
        </div>

        {/* Filtros scrollables y sticky */}
        <div className="gallery-filters mb-6 md:mb-8">
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 md:justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`chip px-3 md:px-6 py-2 md:py-2 rounded-full font-medium text-sm md:text-base transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeCategory === category
                    ? "bg-gradient-gold text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Grid responsive */}
        <div className="gallery-grid">
          {displayedImages.map((foto, i) => (
            <div
              key={`${activeCategory}-${i}`}
              className={`gallery-card relative rounded-xl md:rounded-2xl overflow-hidden bg-white shadow-md md:shadow-elegant transition-all duration-300 hover:shadow-lg ${
                loadedImages.has(i) ? 'in' : ''
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="relative">
                <Image
                  src={foto.image}
                  alt={`${foto.desc} - ${foto.category}`}
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover"
                  onLoad={() => handleImageLoad(i)}
                  loading={i < 6 ? "eager" : "lazy"}
                />

                {/* Badge overlay */}
                <div className="badge-overlay absolute left-2 md:left-3 bottom-2 md:bottom-3">
                  <span className="text-xs md:text-sm px-2 md:px-3 py-1 md:py-1.5 bg-black/60 text-white rounded-full backdrop-blur-sm">
                    {foto.category}
                  </span>
                </div>
              </div>

              {/* Título compacto solo en desktop */}
              <div className="hidden md:block p-4">
                <p className="text-sm font-medium text-gray-800 line-clamp-2">{foto.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Botón cargar más */}
        {visibleImages < filteredImages.length && (
          <div className="text-center mt-8 md:mt-12">
            <button
              onClick={loadMore}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Cargar más ({filteredImages.length - visibleImages} restantes)
            </button>
          </div>
        )}

        {/* Estadísticas */}
        <div className="text-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            {filteredImages.length} {filteredImages.length === 1 ? 'trabajo' : 'trabajos'} en {activeCategory === 'todos' ? 'total' : activeCategory}
          </p>
        </div>
      </div>

      <style jsx>{`
        .gallery-filters {
          position: sticky;
          top: 56px;
          z-index: 10;
          background: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.9));
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        @media (min-width: 768px) {
          .gallery-filters {
            position: static;
            background: transparent;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        @media (min-width: 480px) {
          .gallery-grid {
            gap: 12px;
          }
        }

        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }

        @media (min-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .gallery-card {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .gallery-card.in {
          opacity: 1;
          transform: translateY(0);
        }

        .chip {
          transition: all 0.2s ease;
        }

        .chip:hover {
          transform: translateY(-1px);
        }

        /* Scroll suave para mobile */
        .gallery-filters {
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .gallery-filters::-webkit-scrollbar {
          display: none;
        }

        /* Line clamp utility */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
