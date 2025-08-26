"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Foto = { image: string; desc: string; category: string };

export default function GalleryCarousel({ images }: { images: Foto[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 10);
      setCanNext(el.scrollLeft + el.clientWidth + 10 < el.scrollWidth);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const next = () => {
    const el = ref.current; if (!el) return; el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
  };
  const prev = () => {
    const el = ref.current; if (!el) return; el.scrollBy({ left: -el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-4 mb-6 justify-center">
        <button aria-label="Anterior" onClick={prev} disabled={!canPrev} className="p-2 rounded-full bg-white shadow-md disabled:opacity-40">‹</button>
        <div className="w-full max-w-4xl mx-auto">
          <div ref={ref} className="w-full overflow-x-auto no-scrollbar" style={{ scrollSnapType: 'x mandatory' }}>
            <div className="flex gap-4 px-2 items-stretch" style={{ alignItems: 'stretch' }}>
              {images.map((foto, i) => (
                <div key={i} className="flex-shrink-0 rounded-2xl overflow-hidden bg-white shadow-elegant" style={{ scrollSnapAlign: 'center' }}>
                  <div className="w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px]">
                    <Image src={foto.image} alt={`${foto.desc} - ${foto.category}`} width={800} height={520} className="object-cover w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px]" />
                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-800 line-clamp-2">{foto.desc}</p>
                      <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">{foto.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button aria-label="Siguiente" onClick={next} disabled={!canNext} className="p-2 rounded-full bg-white shadow-md disabled:opacity-40">›</button>
      </div>
    </div>
  );
}
