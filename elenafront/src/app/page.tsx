"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import siteData from "./siteData.json";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ServicesCarousel from "./components/ServicesCarousel";
import ContactForm from "./components/ContactForm";
import SvgIcon, { StarIcon, CheckIcon } from "./components/SvgIcon";
import { ScissorsIcon, BrushIcon, SparkleIcon, LocationPinIcon } from "./components/HeroIcons";
import IsaAssistant from "./components/IsaAssistant";
import FAQ from "./components/FAQ";
import Breadcrumbs from "./components/Breadcrumbs";
import GalleryCarousel from "./components/GalleryCarousel";
import GalleryGrid from "./components/GalleryGrid";
import WaveSeparator from "./components/WaveSeparator";
import { useFadeInOnScroll } from "./hooks/useFadeInOnScroll";
import ScrollableChips from "./components/ScrollableChips";
import TestimonialsCarousel from "./components/TestimonialsCarouselOptimized";
import TeamPreview from "./components/TeamPreview";
import CombinedLauncher from "./components/CombinedLauncher";

// Componente de estrellas para rating usando íconos SVG
// function StarRating({ rating }: { rating: number }) {
//   return (
//     <div className="flex">
//       {[...Array(5)].map((_, i) => (
//         <StarIcon
//           key={i}
//           className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
//           filled={i < rating}
//         />
//       ))}
//     </div>
//   );
// }

// Galería optimizada para mobile
function GaleriaTrabajos() {
  const [fotos, setFotos] = useState<typeof siteData.galeria.images>([]);

  useEffect(() => {
    setFotos(siteData.galeria.images);
  }, []);

  return <GalleryGrid images={fotos} />;
}

// Componente de reservas con pestañas optimizado para mobile
function BookingTabs({ whatsappNumber, whatsappUrl, calendlyUrl, servicios }: {
  whatsappNumber: string;
  whatsappUrl: string;
  calendlyUrl: string;
  servicios: any[];
}) {
  const [activeTab, setActiveTab] = useState<'form' | 'whatsapp' | 'calendly'>('form');
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    servicio: '',
    fecha: '',
    mensaje: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola Elena, quiero reservar una cita.%0A%0A*Nombre:* ${formData.nombre}%0A*Teléfono:* ${formData.telefono}%0A*Servicio:* ${formData.servicio}%0A*Fecha:* ${formData.fecha}${formData.mensaje ? `%0A*Notas:* ${formData.mensaje}` : ''}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const serviceOptions = servicios.flatMap(cat =>
    cat.servicios.map((serv: any) => ({
      value: `${cat.categoria} - ${serv.nombre}`,
      label: `${cat.categoria} - ${serv.nombre}`
    }))
  );

  return (
    <div className="max-w-md mx-auto">
      {/* Pestañas */}
      <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all ${
            activeTab === 'form'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Formulario
        </button>
        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all ${
            activeTab === 'whatsapp'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          WhatsApp
        </button>
        <button
          onClick={() => setActiveTab('calendly')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all ${
            activeTab === 'calendly'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Calendly
        </button>
      </div>

      {/* Panel del formulario */}
      {activeTab === 'form' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Fila 1: Nombre y Teléfono */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre *"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono *"
                value={formData.telefono}
                onChange={handleInputChange}
                required
                inputMode="tel"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Fila 2: Servicio y Fecha */}
            <div className="grid grid-cols-2 gap-3">
              <select
                name="servicio"
                value={formData.servicio}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              >
                <option value="">Servicio *</option>
                {serviceOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Notas opcionales */}
            <details className="group">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 flex items-center justify-between py-2">
                <span>Agregar nota (opcional)</span>
                <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <textarea
                name="mensaje"
                value={formData.mensaje}
                onChange={handleInputChange}
                rows={3}
                placeholder="Contanos qué necesitás..."
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm mt-2"
              />
            </details>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm"
            >
              Enviar por WhatsApp
            </button>
          </form>
        </div>
      )}

      {/* Panel de WhatsApp */}
      {activeTab === 'whatsapp' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <p className="text-gray-600 mb-4 text-sm">
            Te respondemos al instante por WhatsApp
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm"
          >
            Reservar por WhatsApp
          </a>
        </div>
      )}

      {/* Panel de Calendly */}
      {activeTab === 'calendly' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <p className="text-gray-600 mb-4 text-sm">
            Agenda directa en nuestro calendario
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm"
          >
            Agendar en Calendly
          </a>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [activeServiceFilter, setActiveServiceFilter] = useState<string>("todos");
  const { ref: servicesRef, isVisible: servicesVisible } = useFadeInOnScroll(0.2);

  // Definir categorías para los chips scrollables
  const serviceCategories = [
    { key: "todos", label: "Todos", icon: "✨" },
    { key: "maquillaje", label: "Maquillaje", icon: "💄" },
    { key: "capilares", label: "Capilares", icon: "💇‍♀️" },
    { key: "cejas", label: "Cejas", icon: "✨" },
    { key: "depilacion", label: "Depilación", icon: "✂️" },
    { key: "manos", label: "Manos", icon: "💅" },
    { key: "uñas", label: "Uñas", icon: "💎" }
  ];
  
  return (
    <div className="font-sans bg-white text-black min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      
      {/* Launcher Combinado */}
      {siteData.whatsapp.enabled && (
        <CombinedLauncher
          whatsappNumber={siteData.whatsapp.number}
          whatsappMessage={siteData.whatsapp.message}
          enabled={true}
        />
      )}

      {/* Asistente Virtual Isa */}
      <IsaAssistant enabled={false} />

  {/* selector removed - hero is minimal by default */}

      {/* HERO SECTION */}
      <section
        id="inicio"
        className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-white to-amber-50/30 container-with-margins py-12 lg:py-16"
      >
        {/* Overlay sutil con degradado */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-amber-50/20"></div>

        <div className="relative z-10 max-w-5xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-8 items-center px-4">
          {/* Contenido principal */}
          <div className="text-center lg:text-left animate-slidein order-2 lg:order-1">
            {/* Título simplificado y directo */}
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight max-w-xl mx-auto lg:mx-0">
              Transformá tu look en Luque
            </h1>
            
            {/* Subtítulo conciso */}
            <h2 className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
              10+ años de experiencia en belleza y cuidado profesional
            </h2>
            
            {/* CTA Principal - Más prominente */}
            <div className="mb-6">
              <a
                href="https://wa.me/595991743889?text=Hola%20Elena,%20quiero%20agendar%20una%20cita"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button text-white font-semibold py-4 px-8 lg:px-10 rounded-full transition-transform duration-200 hover:scale-105 text-base shadow-xl w-full sm:w-auto text-center inline-block"
              >
                Agendá tu cita ahora
              </a>
            </div>
            
            {/* Señales de confianza - Ligeras y concisas */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <StarIcon className="w-4 h-4 text-amber-400 mr-1" filled={true} />
                <span className="font-medium">1000+ clientes felices</span>
              </div>
              <span className="hidden sm:inline text-gray-400">|</span>
              <span className="font-medium">Técnicas certificadas</span>
              <span className="hidden sm:inline text-gray-400">|</span>
              <span className="font-medium">Productos premium</span>
            </div>
          </div>
          
          {/* Imagen optimizada */}
      <div className="animate-fadein order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decoración de fondo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-100 to-rose-100 rounded-3xl opacity-30 blur-lg"></div>
              <Image 
                src={siteData.inicio.image} 
                alt="Elena Benítez - Mejor peluquería en Luque Paraguay | Salón de belleza profesional con más de 10 años de experiencia | Servicios de maquillaje, tratamientos capilares, cejas, manicura y pedicura" 
                width={600} 
                height={400} 
        className="relative rounded-3xl shadow-2xl object-cover w-full h-[220px] sm:h-[260px] lg:h-[320px] image-overlay" 
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Badge flotante */}
        <div className="absolute -bottom-3 -left-3 bg-white rounded-xl shadow-lg p-3 animate-float">
                <div className="flex items-center">
                  <div className="flex -space-x-1 mr-3">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
            className="w-3.5 h-3.5 text-amber-400"
                        filled={true}
                      />
                    ))}
                  </div>
                  <div>
          <p className="font-bold text-gray-900 text-xs">+1000</p>
          <p className="text-[10px] text-gray-600">Clientes felices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Separador curvo elegante */}
      <WaveSeparator />
      
      {/* Elemento flotante de transición */}
      <div className="relative -mt-8 mb-8 flex justify-center">
        <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100 animate-fadein" 
             style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium">Descubre nuestros servicios</span>
            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
      {/* SERVICIOS - Optimizada para mobile */}
      <section
        id="servicios"
        ref={servicesRef}
        className={`py-12 md:py-20 bg-gray-50 container-with-margins transition-all duration-1000 ${
          servicesVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            {/* Título compacto */}
            <h2 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Nuestros servicios
            </h2>

            {/* Descripción compacta */}
            <h3 className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-4 md:mb-6">
              Más de 50 opciones para tu belleza y cuidado
            </h3>

            {/* CTA Principal - Solo uno */}
            <div className="mb-6 md:mb-8">
              <a
                href="#servicios"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-6 md:py-3 md:px-8 rounded-full transition-all duration-200 hover:shadow-lg text-sm md:text-base"
              >
                Explorar servicios
              </a>
            </div>

            {/* Chips scrollables */}
            <div className="max-w-4xl mx-auto">
              <ScrollableChips
                categories={serviceCategories}
                activeFilter={activeServiceFilter}
                onFilterChange={setActiveServiceFilter}
              />
            </div>
          </div>

          <div className="">
            <ServicesCarousel servicios={siteData.servicios} activeFilter={activeServiceFilter} />
          </div>
        </div>
      </section>


      {/* SOBRE NOSOTROS - Sección optimizada para SEO local */}
      {siteData.equipo && (
        <TeamPreview team={siteData.equipo} />
      )}

      {/* GALERÍA */}
      <GaleriaTrabajos />

      {/* TESTIMONIOS */}
      <TestimonialsCarousel reviews={siteData.testimonios.reviews} />

      {/* UBICACIÓN Y CONTACTO - Optimizada para mobile */}
      <section id="contacto" className="py-12 md:py-16 bg-white container-with-margins">
        <div className="max-w-4xl mx-auto px-4">
          {/* Título compacto */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              Ubicación y contacto
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              Luque · Lun–Sáb 8:00–18:00
            </p>
          </div>

          {/* Botones principales - Primera fila */}
          <div className="grid grid-cols-3 gap-3 mb-6 md:mb-8">
            <a
              href={siteData.contacto.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-2 md:py-4 md:px-4 rounded-xl font-semibold transition-colors flex flex-col items-center justify-center text-center text-xs md:text-sm"
            >
              <SvgIcon type="whatsapp" className="w-4 h-4 md:w-5 md:h-5 mb-1" />
              WhatsApp
            </a>
            <a
              href={`tel:${siteData.contacto.telefono}`}
              className="bg-gray-900 hover:bg-gray-800 text-white py-3 px-2 md:py-4 md:px-4 rounded-xl font-semibold transition-colors flex flex-col items-center justify-center text-center text-xs md:text-sm"
            >
              <SvgIcon type="phone" className="w-4 h-4 md:w-5 md:h-5 mb-1" />
              Llamar
            </a>
            <a
              href={siteData.contacto.mapa.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-2 md:py-4 md:px-4 rounded-xl font-semibold transition-colors flex flex-col items-center justify-center text-center text-xs md:text-sm"
            >
              <SvgIcon type="map" className="w-4 h-4 md:w-5 md:h-5 mb-1" />
              Cómo llegar
            </a>
          </div>

          {/* Mapa embebido sin API */}
          <div className="map-embed">
            <iframe
              src="https://www.google.com/maps?q=-25.2678,-57.4847&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="Ubicación Elena Benítez - Mejor peluquería en Luque Paraguay"
              className="w-full aspect-video border-0 rounded-2xl shadow-lg"
            />
          </div>

          {/* Detalles colapsables */}
          <details className="bg-gray-50 rounded-2xl p-4 md:p-6">
            <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between hover:text-gray-700 transition-colors">
              <span>Ver detalles completos</span>
              <svg className="w-5 h-5 text-gray-500 transition-transform duration-200 details-marker" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>

            <div className="mt-4 space-y-3">
              <div className="flex items-start">
                <SvgIcon type="location" className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Dirección</p>
                  <p className="text-gray-700 text-sm">{siteData.contacto.direccion}</p>
                </div>
              </div>

              <div className="flex items-start">
                <SvgIcon type="clock" className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Horarios</p>
                  <p className="text-gray-700 text-sm">{siteData.contacto.horarios}</p>
                </div>
              </div>

              <div className="flex items-start">
                <SvgIcon type="phone" className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Teléfono</p>
                  <p className="text-gray-700 text-sm">{siteData.contacto.telefono}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-200">
                <a
                  href={siteData.contacto.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium text-sm transition-colors"
                >
                  <SvgIcon type="instagram" className="w-4 h-4 mr-2" />
                  Síguenos en Instagram
                </a>
              </div>
            </div>
          </details>
        </div>

        <style jsx>{`
          details[open] .details-marker {
            transform: rotate(180deg);
          }

          details summary::-webkit-details-marker {
            display: none;
          }

          .map-embed {
            position: relative;
            border-radius: 14px;
            overflow: hidden;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
            margin-bottom: 1.5rem;
          }

          .map-embed iframe {
            width: 100%;
            aspect-ratio: 16/9;
            border: 0;
            display: block;
          }

          @media (max-width: 768px) {
            .container-with-margins {
              padding-left: 16px;
              padding-right: 16px;
            }

            .map-embed {
              margin-bottom: 1rem;
            }
          }
        `}</style>
      </section>

      {/* RESERVAS - Optimizada para mobile con tabs */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100 container-with-margins">
        <div className="max-w-4xl mx-auto px-4">
          {/* Título compacto */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              Reservá tu cita
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              Elegí cómo querés agendar
            </p>
          </div>

          {/* Sistema de pestañas */}
          <BookingTabs
            whatsappNumber={siteData.whatsapp.number}
            whatsappUrl={siteData.reservas.whatsapp.url}
            calendlyUrl={siteData.reservas.calendly.url}
            servicios={siteData.servicios}
          />
        </div>
      </section>

      {/* FAQ SECTION - Optimizada para SEO */}
      <FAQ />

      <Footer />
    </div>
  );
}
