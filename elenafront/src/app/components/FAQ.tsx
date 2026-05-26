"use client";
import { useState, useEffect } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  // Turnos
  {
    question: "¿Cómo reservo un turno en la peluquería de Luque?",
    answer: "Podés reservar por WhatsApp al +595 991 743889 o usando el formulario de nuestra página web. Te recomendamos reservar con al menos 24 hs de anticipación, especialmente los fines de semana.",
    category: "turnos"
  },
  {
    question: "¿Cuáles son los horarios del salón?",
    answer: "Atendemos de lunes a sábado de 08:00 a 18:00 hs. Los domingos permanecemos cerrados. Para turnos fuera de horario en ocasiones especiales (bodas, quinces), consultanos por WhatsApp.",
    category: "turnos"
  },
  {
    question: "¿Qué formas de pago aceptan?",
    answer: "Aceptamos efectivo y transferencias bancarias. Para más opciones de pago, consultanos directamente por WhatsApp antes de tu visita.",
    category: "turnos"
  },
  {
    question: "¿Con cuánta anticipación debo reservar?",
    answer: "Para servicios del día (lavado, brushing, cejas) suele haber lugar con poca anticipación. Para maquillaje de novia, quinceañera o eventos especiales, recomendamos reservar con al menos 1 semana de anticipación.",
    category: "turnos"
  },

  // Servicios
  {
    question: "¿Hacen maquillaje para bodas y eventos en Luque?",
    answer: "Sí, ofrecemos maquillaje social, glam y de novia para todo tipo de eventos en Luque y alrededores. Incluye limpieza facial previa. Recomendamos reservar con anticipación para eventos importantes.",
    category: "servicios"
  },
  {
    question: "¿Desde cuánto sale el tratamiento capilar?",
    answer: "Los lavados y tratamientos capilares arrancan desde 60.000 PYG. El precio final depende del largo, volumen del cabello y el tipo de tratamiento. Podés consultar la lista completa de precios en la sección de servicios.",
    category: "servicios"
  },
  {
    question: "¿Hacen alisado y keratina en Luque?",
    answer: "Sí. Ofrecemos shock de keratina desde 130.000 PYG, ideal para alisar y nutrir el cabello al mismo tiempo. El resultado varía según el tipo de cabello. Consultanos para una evaluación personalizada.",
    category: "servicios"
  },
  {
    question: "¿Cuánto cuesta el diseño de cejas?",
    answer: "El diseño de cejas con perfilado sale desde 25.000 PYG. Con henna natural desde 50.000 PYG. Todos incluyen asesoramiento personalizado para encontrar la forma ideal para tu rostro.",
    category: "servicios"
  },
  {
    question: "¿Ofrecen servicios a domicilio en Luque?",
    answer: "Sí, ofrecemos servicio a domicilio en Luque y zona aledaña (radio aproximado de 15 km). Incluye maquillaje y peinados para eventos. Consultanos disponibilidad y costos adicionales por WhatsApp.",
    category: "servicios"
  },
  {
    question: "¿Hacen uñas acrílicas y esmalte semipermanente?",
    answer: "Sí. Contamos con manicura y pedicura tradicional, esmalte semipermanente, uñas acrílicas, kapping y diseños personalizados. Podés ver todos los precios en nuestra sección de servicios.",
    category: "servicios"
  },

  // Ubicación
  {
    question: "¿Dónde está ubicada la peluquería en Luque?",
    answer: "Estamos en c/ Sportivo Luqueño y Moisés Bertoni, en el corazón de Luque, Paraguay. Tenemos fácil acceso en transporte público. Podés ver la ubicación exacta en el mapa de nuestra página o en Google Maps.",
    category: "ubicacion"
  },
  {
    question: "¿Cómo llegar al salón en transporte público?",
    answer: "Tenemos acceso en varias líneas de colectivo que pasan por Luque centro. Para indicaciones precisas desde tu barrio, escribinos por WhatsApp y te orientamos sin problema.",
    category: "ubicacion"
  },

  // Productos
  {
    question: "¿Qué productos usan en el salón?",
    answer: "Trabajamos exclusivamente con productos profesionales de marcas reconocidas internacionalmente. Son seguros, certificados y formulados para cuidar la salud de tu cabello, piel y uñas con los mejores resultados.",
    category: "productos"
  },
  {
    question: "¿Atienden personas con cabello teñido o tratado químicamente?",
    answer: "Sí. Antes de cualquier tratamiento realizamos un diagnóstico del estado capilar para recomendarte el servicio más adecuado. La salud de tu cabello es nuestra prioridad.",
    category: "productos"
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
            Preguntas frecuentes sobre nuestra peluquería en Luque
          </h2>
          <p className="text-sm md:text-lg text-gray-600">
            Todo lo que necesitás saber antes de tu visita
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
