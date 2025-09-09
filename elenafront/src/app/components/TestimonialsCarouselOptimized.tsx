"use client";
import { useEffect, useRef, useState } from "react";
import { StarIcon } from "./SvgIcon";

type Review = {
  name: string;
  image: string;
  rating: number;
  text: string;
};

interface TestimonialsCarouselProps {
  reviews: Review[];
}

export default function TestimonialsCarousel({ reviews }: TestimonialsCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll cada 4 segundos
  useEffect(() => {
    if (isPaused || reviews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  // Scroll suave cuando cambia el índice
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const cardWidth = container.clientWidth * 0.86; // 86% para dejar peek
    const scrollPosition = currentIndex * cardWidth;

    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }, [currentIndex]);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const cardWidth = container.clientWidth * 0.86;
    const newIndex = Math.round(container.scrollLeft / cardWidth);
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <>
      {/* Separador curvo dorado/beige */}
      <div className="relative w-full overflow-hidden">
        <svg
          className="relative block w-full h-12 md:h-16 lg:h-20"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C300,100 600,20 900,60 C1050,80 1200,40 1200,60 L1200,120 L0,120 Z"
            fill="url(#testimonialsWaveGradient)"
          />
          <defs>
            <linearGradient id="testimonialsWaveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef7ed" />
              <stop offset="50%" stopColor="#faf9f7" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Título optimizado */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Reseñas de nuestras clientas
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              Opiniones reales • 4.9 ★ en 250+ reseñas
            </p>
          </div>

        {/* Carrusel optimizado */}
        <div className="relative max-w-md mx-auto">
          {/* Flechas superpuestas */}
          <button
            aria-label="Reseña anterior"
            onClick={prevSlide}
            className="arrow prev"
            disabled={reviews.length <= 1}
          >
            ‹
          </button>
          <button
            aria-label="Siguiente reseña"
            onClick={nextSlide}
            className="arrow next"
            disabled={reviews.length <= 1}
          >
            ›
          </button>

          {/* Contenedor del carrusel */}
          <div
            ref={containerRef}
            className="carousel"
            onScroll={handleScroll}
            onPointerDown={() => setIsPaused(true)}
            onPointerUp={() => setIsPaused(false)}
            onPointerLeave={() => setIsPaused(false)}
          >
            {reviews.map((review, index) => (
              <div key={`${review.name}-${index}`} className="card">
                <div className="card-header">
                  <div className="user-info">
                    <h4 className="user-name">{review.name}</h4>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`star ${i < review.rating ? "filled" : "empty"}`}
                          filled={i < review.rating}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="review-text">&quot;{review.text}&quot;</p>

                <div className="review-meta">
                  <span className="verified-badge">✓ Reseña verificada</span>
                  <a href="#" className="google-link">Ver en Google</a>
                </div>
              </div>
            ))}
          </div>

          {/* Dots indicadores */}
          {reviews.length > 1 && (
            <div className="dots">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Ir a reseña ${index + 1}`}
                  onClick={() => goToSlide(index)}
                  className={`dot ${index === currentIndex ? "active" : ""}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border: none;
          display: grid;
          place-items: center;
          z-index: 10;
          font-size: 18px;
          font-weight: bold;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .arrow:hover:not(:disabled) {
          background: #f9fafb;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
          transform: translateY(-50%) scale(1.05);
        }

        .arrow:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .arrow.prev {
          left: 8px;
        }

        .arrow.next {
          right: 8px;
        }

        .carousel {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding: 4px 8px;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .carousel::-webkit-scrollbar {
          display: none;
        }

        .card {
          flex: 0 0 86%;
          scroll-snap-align: center;
          border-radius: 14px;
          background: #fff;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
          padding: 12px;
          min-height: 140px;
          transition: transform 0.2s ease;
        }

        .card:hover {
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .card {
            flex-basis: 84%;
            min-height: 130px;
            padding: 10px;
          }
        }

        .card-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          margin-bottom: 8px;
        }

        .avatar {
          display: none;
        }

        .user-info {
          width: 100%;
        }

        .user-name {
          font-weight: 600;
          font-size: 14px;
          color: #111827;
          margin-bottom: 2px;
        }

        .stars {
          display: flex;
          gap: 1px;
          margin-bottom: 8px;
        }

        .star {
          width: 14px;
          height: 14px;
        }

        .star.filled {
          color: #C7A36E;
        }

        .star.empty {
          color: #E5E7EB;
        }

        .review-text {
          font-size: 14px;
          line-height: 1.5;
          color: #4B5563;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .review-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .verified-badge {
          font-size: 11px;
          color: #059669;
          background: #ECFDF5;
          padding: 2px 6px;
          border-radius: 999px;
          font-weight: 500;
        }

        .google-link {
          font-size: 11px;
          color: #3B82F6;
          text-decoration: underline;
          font-weight: 500;
        }

        .dots {
          display: flex;
          gap: 6px;
          justify-content: center;
          margin-top: 16px;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d1d5db;
          border: none;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .dot:hover {
          background: #9ca3af;
        }

        .dot.active {
          background: #111827;
        }

        /* Animación de entrada mejorada */
        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(15px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .card {
          animation: fadeInSlide 0.4s ease-out;
        }
      `}</style>
    </section>
    </>
  );
}
