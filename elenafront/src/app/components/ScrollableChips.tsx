"use client";
import { useRef, useEffect, useState } from "react";

interface ScrollableChipsProps {
  categories: { key: string; label: string; icon: string }[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function ScrollableChips({ categories, activeFilter, onFilterChange }: ScrollableChipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 120;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full">
      {/* Indicadores de scroll para mobile */}
      {canScrollLeft && (
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden" />
      )}
      {canScrollRight && (
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden" />
      )}

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        onScroll={checkScroll}
      >
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => onFilterChange(category.key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
              activeFilter === category.key
                ? "bg-amber-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            <span className="mr-1">{category.icon}</span>
            <span className="text-sm">{category.label}</span>
          </button>
        ))}
      </div>

      {/* Botones de navegación para desktop */}
      <div className="hidden md:flex justify-center gap-2 mt-3">
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="p-1 rounded-full bg-white shadow-sm text-gray-700 hover:bg-gray-100 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Scroll left"
        >
          ‹
        </button>
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="p-1 rounded-full bg-white shadow-sm text-gray-700 hover:bg-gray-100 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </div>
  );
}
