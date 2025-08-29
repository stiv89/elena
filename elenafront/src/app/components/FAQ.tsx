"use client";
import { useState, useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Turnos - Mostrar inicialmente
  {
    question: "¿Cómo reservo un turno?",
    answer: "Podés reservar por WhatsApp o usando el formulario en 'Reservá tu cita'. Te recomendamos reservar con anticipación.",
    category: "turnos"
  },
  {
    question: "¿Cuáles son los horarios?",
    answer: "Lunes a sábado de 08:00 a 18:00. Los domingos permanecemos cerrados.",
    category: "turnos"
  },
  {
    question: "¿Qué formas de pago aceptan?",
    answer: "Efectivo y transferencias. Consultá por otros medios por WhatsApp.",
    category: "turnos"
  },

  // Servicios - Mostrar inicialmente
  {
    question: "¿Hacen maquillaje para bodas?",
    answer: "Sí. Social, glam y novia. Recomendamos reservar con anticipación.",
    category: "servicios"
  },
  {
    question: "¿Desde cuánto sale el tratamiento capilar?",
    answer: "Desde 60.000 PYG. El precio final depende del diagnóstico.",
    category: "servicios"
  },

  // Más preguntas - Ocultas inicialmente
  {
    question: "¿Dónde está ubicada la peluquería?",
    answer: "En c/ Sportivo Luqueño y Moisés Bertoni, corazón de Luque. Fácil acceso con transporte público.",
    category: "ubicacion"
  },
  {
    question: "¿Ofrecen servicios a domicilio?",
    answer: "Sí, en radio de 15km. Incluye maquillaje y peinados. Consultá costos adicionales.",
    category: "servicios"
  },
  {
    question: "¿Cuánto cuesta el diseño de cejas?",
    answer: "25.000 PYG básico, 50.000 PYG con henna. Incluye asesoramiento personalizado.",
    category: "servicios"
  },
  {
    question: "¿Qué productos usan?",
    answer: "Productos profesionales de marcas reconocidas internacionalmente. Alta calidad y seguros.",
    category: "productos"
  },
  {
    question: "¿Cómo llegar al salón?",
    answer: "Transporte público o auto. Consulta ruta específica por WhatsApp.",
    category: "ubicacion"
  }
];

const categories = [
  { key: "turnos", label: "Turnos", icon: "📅" },
  { key: "servicios", label: "Servicios", icon: "💄" },
  { key: "ubicacion", label: "Ubicación", icon: "📍" },
  { key: "productos", label: "Productos", icon: "✨" }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [filteredData, setFilteredData] = useState(faqData);

  // Filtrar preguntas basado en búsqueda
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(faqData);
      return;
    }

    const filtered = faqData.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Mostrar solo primeras 5 preguntas inicialmente
  const visibleQuestions = showAll ? filteredData : filteredData.slice(0, 5);

  return (
    <section className="py-12 md:py-16 bg-white container-with-margins">
      <div className="max-w-4xl mx-auto px-4">
        {/* Título compacto */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 mb-2">
            Preguntas frecuentes
          </h2>
          <p className="text-sm md:text-lg text-gray-600">
            Respuestas rápidas sobre turnos y servicios
          </p>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <input
            type="search"
            placeholder="Buscar en preguntas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Preguntas agrupadas */}
        <div className="space-y-6">
          {categories.map(category => {
            const categoryQuestions = visibleQuestions.filter(q => q.category === category.key);
            if (categoryQuestions.length === 0) return null;

            return (
              <div key={category.key} className="faq-group">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </h3>

                <div className="space-y-2">
                  {categoryQuestions.map((faq, index) => {
                    const globalIndex = faqData.findIndex(item => item.question === faq.question);
                    return (
                      <details
                        key={globalIndex}
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden group"
                        open={openItems.includes(globalIndex)}
                        onToggle={(e) => {
                          if (e.target instanceof HTMLDetailsElement) {
                            toggleItem(globalIndex);
                          }
                        }}
                      >
                        <summary className="cursor-pointer px-4 py-3 font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between list-none">
                          <span className="pr-4">{faq.question}</span>
                          <svg
                            className="w-5 h-5 text-gray-500 transition-transform duration-200 group-open:rotate-180 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>

                        <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed bg-gray-50">
                          <p className="pt-2">{faq.answer}</p>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Botón "Ver más/menos" */}
        {filteredData.length > 5 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
            >
              {showAll ? 'Ver menos preguntas' : `Ver más preguntas (${filteredData.length - 5})`}
            </button>
          </div>
        )}

        {/* CTA final simple */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/595991743889?text=Hola Elena, tengo una consulta"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl transition-colors text-center"
          >
            WhatsApp
          </a>
          <a
            href="tel:+595991743889"
            className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-xl transition-colors text-center"
          >
            Llamar
          </a>
        </div>
      </div>

      {/* Schema.org FAQ markup para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}
