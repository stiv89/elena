"use client";
import Image from "next/image";
import { useRef } from "react";
import { StarIcon } from "./SvgIcon";

type Review = {
  name: string;
  image: string;
  rating: number;
  text: string;
};

export default function TestimonialsCarousel({ reviews }: { reviews: Review[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const slideWidth = 320; // approx card width

  const scroll = (dir: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: dir * slideWidth, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <div />
        <div className="flex gap-2">
          <button
            aria-label="Anterior"
            onClick={() => scroll(-1)}
            className="bg-white p-2 rounded-full shadow-sm hover:shadow-md"
          >
            ‹
          </button>
          <button
            aria-label="Siguiente"
            onClick={() => scroll(1)}
            className="bg-white p-2 rounded-full shadow-sm hover:shadow-md"
          >
            ›
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {reviews.map((r, i) => (
          <div
            key={r.name + i}
            className="snap-center flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] bg-white rounded-2xl p-6 shadow-elegant"
          >
            <div className="flex items-start gap-3 mb-3">
              <Image
                src={r.image}
                alt={`Foto de ${r.name}`}
                width={56}
                height={56}
                className="rounded-full object-cover"
                loading="lazy"
              />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">{r.name}</h4>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, idx) => (
                    <StarIcon
                      key={idx}
                      className={`w-4 h-4 ${idx < r.rating ? "text-amber-400" : "text-gray-200"}`}
                      filled={idx < r.rating}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-700 italic leading-relaxed">“{r.text}”</p>
          </div>
        ))}
      </div>
    </div>
  );
}
