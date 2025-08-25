"use client";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const faqData: FAQItem[] = [
  {
    question: "¿Dónde está ubicada la peluquería Elena Benítez en Luque?",
    answer: "Estamos ubicados en c/ Sportivo Luqueño y Moisés Bertoni, en el corazón de Luque, Paraguay. Es una zona de fácil acceso con transporte público y estacionamiento disponible.",
    category: "ubicacion"
  },
  {
    question: "¿Cuáles son los horarios de atención de la peluquería?",
    answer: "Atendemos de Lunes a Sábado de 8:00 a 18:00 horas. Los domingos permanecemos cerrados. Se recomienda reservar cita previa para garantizar disponibilidad.",
    category: "horarios"
  },
  {
    question: "¿Realizan servicios de maquillaje para bodas en Luque?",
    answer: "Sí, somos especialistas en maquillaje para novias y eventos especiales. Ofrecemos pruebas previas y servicios tanto en nuestro salón como a domicilio. Nuestros paquetes incluyen maquillaje y peinado.",
    category: "servicios"
  },
  {
    question: "¿Qué precios tienen los tratamientos capilares en Paraguay?",
    answer: "Nuestros precios van desde ₲60.000 para lavados básicos hasta ₲130.000 para tratamientos especializados como shock de keratina. Ofrecemos servicios para todos los presupuestos con la mejor calidad.",
    category: "precios"
  },
  {
    question: "¿Ofrecen servicios de belleza a domicilio en Luque?",
    answer: "Sí, ofrecemos servicios a domicilio en un radio de 15km desde nuestro salón. Incluye maquillaje, peinados y algunos tratamientos. Consultá disponibilidad y costos adicionales por WhatsApp.",
    category: "domicilio"
  },
  {
    question: "¿Cuánto cuesta el diseño de cejas en Elena Benítez?",
    answer: "El diseño de cejas básico cuesta ₲25.000 y con henna ₲50.000. Incluye asesoramiento personalizado para encontrar la forma perfecta según tu tipo de rostro.",
    category: "cejas"
  },
  {
    question: "¿Qué formas de pago aceptan en la peluquería?",
    answer: "Aceptamos efectivo y transferencias bancarias. Para servicios a domicilio, preferimos coordinarlo al momento de la reserva. No trabajamos con tarjetas de crédito por el momento.",
    category: "pagos"
  },
  {
    question: "¿Cómo puedo reservar una cita en Elena Benítez?",
    answer: "Puedes reservar tu cita por WhatsApp al +595 991 743889, llamando al mismo número o visitando directamente nuestro salón. Te recomendamos reservar con anticipación, especialmente para fines de semana.",
    category: "reservas"
  },
  {
    question: "¿Qué productos usan en los tratamientos de belleza?",
    answer: "Utilizamos únicamente productos profesionales de marcas reconocidas internacionalmente. Todos nuestros productos son de alta calidad y seguros para todo tipo de cabello y piel.",
    category: "productos"
  },
  {
    question: "¿Elena Benítez es la mejor peluquería de Luque?",
    answer: "Con más de 10 años de experiencia y más de 1000 clientas satisfechas, nos enorgullece ser una de las peluquerías más recomendadas de Luque. Nuestros clientes nos califican con 5 estrellas por la calidad de nuestro servicio.",
    category: "experiencia"
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            ❓ Preguntas Frecuentes - Peluquería Luque
          </h2>
          <h3 className="text-lg text-gray-600 max-w-2xl mx-auto">
            Resuelve todas tus dudas sobre nuestros servicios de belleza en Luque Paraguay
          </h3>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                aria-expanded={openItems.includes(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <h4 className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h4>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-gray-600 transform transition-transform duration-300 ${
                      openItems.includes(index) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-6 pb-4 text-gray-700 leading-relaxed border-t border-gray-200 bg-white"
                >
                  <p className="pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center bg-gradient-to-br from-amber-50 to-rose-50 rounded-3xl p-8 border border-amber-200">
          <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
            ¿No encontraste la respuesta que buscabas?
          </h3>
          <p className="text-gray-700 mb-6">
            Contactanos directamente y te ayudaremos con cualquier consulta sobre nuestros servicios de belleza
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/595991743889?text=Hola Elena, tengo una consulta sobre los servicios"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              💬 Consultar por WhatsApp
            </a>
            <a
              href="tel:+595991743889"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full transition-colors flex items-center justify-center gap-2"
            >
              📞 Llamar Ahora
            </a>
          </div>
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
