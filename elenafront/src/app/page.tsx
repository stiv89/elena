"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import siteData from "./siteData.json";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ServicesCarousel from "./components/ServicesCarousel";
import SvgIcon, { StarIcon } from "./components/SvgIcon";
import FAQ from "./components/FAQ";
import Breadcrumbs from "./components/Breadcrumbs";
import GalleryGrid from "./components/GalleryGrid";
import WaveSeparator from "./components/WaveSeparator";
import { useFadeInOnScroll } from "./hooks/useFadeInOnScroll";
import ScrollableChips from "./components/ScrollableChips";
import TestimonialsCarousel from "./components/TestimonialsCarouselOptimized";
import TeamPreview from "./components/TeamPreview";
import CombinedLauncher from "./components/CombinedLauncher";
import { useServicios } from "../hooks/useServicios";

interface Servicio {
  nombre: string;
}

interface Categoria {
  categoria: string;
  servicios: Servicio[];
}

function GaleriaTrabajos() {
  const [fotos, setFotos] = useState<typeof siteData.galeria.images>([]);
  useEffect(() => { setFotos(siteData.galeria.images); }, []);
  return <GalleryGrid images={fotos} />;
}

function BookingTabs({ whatsappNumber, whatsappUrl, servicios }: {
  whatsappNumber: string;
  whatsappUrl: string;
  servicios: Categoria[];
}) {
  const [activeTab, setActiveTab] = useState<'form' | 'whatsapp'>('form');
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    servicio: '',
    fecha: '',
    mensaje: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola Elena, quiero reservar una cita.%0A%0A*Nombre:* ${formData.nombre}%0A*Teléfono:* ${formData.telefono}%0A*Servicio:* ${formData.servicio}%0A*Fecha:* ${formData.fecha}${formData.mensaje ? `%0A*Notas:* ${formData.mensaje}` : ''}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const serviceOptions = servicios.flatMap(cat =>
    cat.servicios.map((serv: Servicio) => ({
      value: `${cat.categoria} - ${serv.nombre}`,
      label: `${cat.categoria} - ${serv.nombre}`
    }))
  );

  return (
    <div className="max-w-md mx-auto">
      <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
        <button
          onClick={() => setActiveTab('form')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all ${
            activeTab === 'form' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Formulario
        </button>
        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all ${
            activeTab === 'whatsapp' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          WhatsApp
        </button>
      </div>

      {activeTab === 'form' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <input type="text" name="nombre" placeholder="Nombre *" value={formData.nombre} onChange={handleInputChange} required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm" />
              <input type="tel" name="telefono" placeholder="Teléfono *" value={formData.telefono} onChange={handleInputChange} required inputMode="tel" className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <select name="servicio" value={formData.servicio} onChange={handleInputChange} required className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm">
                <option value="">Servicio *</option>
                {serviceOptions.map((option, index) => (
                  <option key={index} value={option.value}>{option.label}</option>
                ))}
              </select>
              <input type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm" />
            </div>
            <details className="group">
              <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-900 flex items-center justify-between py-2">
                <span>Agregar nota (opcional)</span>
                <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <textarea name="mensaje" value={formData.mensaje} onChange={handleInputChange} rows={3} placeholder="Contanos qué necesitás..." className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm mt-2" />
            </details>
            <button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm">
              Enviar por WhatsApp
            </button>
          </form>
        </div>
      )}

      {activeTab === 'whatsapp' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
          <p className="text-gray-600 mb-4 text-sm">Te respondemos al instante por WhatsApp</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm">
            Reservar por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

function PorQueElegirnos() {
  const razones = [
    {
      icon: "🏆",
      title: "Más de 10 años en Luque",
      desc: "No somos nuevas en esto. Llevamos más de una década perfeccionando cada técnica y ganándonos la confianza de nuestra clientas."
    },
    {
      icon: "👑",
      title: "Equipo de 3 profesionales",
      desc: "Elena, Luján y Adriana. Cada una especialista en su área. Juntas, ofrecen la experiencia integral de belleza más completa de Luque."
    },
    {
      icon: "✨",
      title: "Productos premium certificados",
      desc: "Solo trabajamos con marcas profesionales reconocidas a nivel internacional. Tu cabello, piel y uñas merecen lo mejor."
    },
    {
      icon: "⭐",
      title: "4.9 estrellas en Google",
      desc: "Más de 100 reseñas reales verificadas. Nuestras clientas hablan mejor que cualquier publicidad. ¡Leelas y convencete!"
    },
    {
      icon: "🏠",
      title: "Servicio a domicilio disponible",
      desc: "¿No podés venir al salón? Vamos nosotras. Maquillaje y peinados donde estés, dentro de Luque y alrededores."
    },
    {
      icon: "❤️",
      title: "Tu turno es tuyo, sin apuros",
      desc: "Cada cita es tuya al 100%. Sin interrupciones, sin carreras. Solo vos, tu comodidad y tu transformación."
    }
  ];

  return (
    <section id="por-que-elegirnos" className="py-14 md:py-20 bg-white container-with-margins">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            ¿Por qué elegirnos en Luque?
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Más de 1.000 clientas ya nos eligieron. Esto es lo que nos hace el salón de referencia en Luque, Paraguay.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {razones.map((razon, i) => (
            <div
              key={i}
              className="bg-gray-50 hover:bg-amber-50/40 rounded-2xl p-6 transition-colors duration-200 hover:shadow-md"
            >
              <div className="text-3xl mb-3">{razon.icon}</div>
              <h3 className="font-semibold text-gray-900 text-base md:text-lg mb-2">{razon.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{razon.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Transformaciones() {
  const resultados = [
    {
      categoria: "Maquillaje profesional en Luque",
      descripcion: "De una mirada apagada a un look que deja sin palabras. Para el día, eventos sociales, bodas o sesiones de fotos — con técnica y productos profesionales.",
      imagen: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Resultado de maquillaje profesional en Elena Benítez - Salón de belleza Luque Paraguay",
      tags: ["Social", "Glam", "Novia"],
      cita: "\"Nunca me sentí tan segura con mi maquillaje. Exactamente lo que quería, sin sentirme disfrazada.\" — Valentina T."
    },
    {
      categoria: "Color y tratamientos capilares",
      descripcion: "El color que soñás, con técnicas que cuidan la salud de tu cabello al mismo tiempo. Retoque de raíz, alisado, keratina y mucho más.",
      imagen: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Coloración y tratamiento capilar profesional en peluquería Luque - Elena Benítez",
      tags: ["Coloración", "Alisado", "Keratina"],
      cita: "\"El color quedó perfecto y el cabello súper suave. Jamás pensé que podía quedar tan bien.\" — Camila R."
    },
    {
      categoria: "Diseño de cejas y pestañas",
      descripcion: "El marco de tu rostro importa más de lo que creés. Diseño personalizado según tu morfología, henna natural y lifting de pestañas.",
      imagen: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Diseño de cejas profesional Luque Paraguay - Salón Elena Benítez",
      tags: ["Diseño", "Henna", "Lifting"],
      cita: "\"Me dijeron que me veía diferente, pero mejor. Fue el diseño de cejas. Algo tan simple que cambia todo.\" — Laura M."
    }
  ];

  return (
    <section id="resultados" className="py-14 md:py-20 bg-gray-50 container-with-margins">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 mb-3">
            Resultados que hablan por sí solos
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Cada clienta que entra, sale transformada. Estos son los servicios que más enamoran en nuestro salón de Luque.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {resultados.map((r, i) => (
            <article
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={r.imagen}
                  alt={r.alt}
                  width={400}
                  height={280}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {r.tags.map((tag, j) => (
                    <span key={j} className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{r.categoria}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{r.descripcion}</p>
                <blockquote className="border-l-2 border-amber-400 pl-3 text-gray-500 text-sm italic leading-relaxed">
                  {r.cita}
                </blockquote>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href={`https://wa.me/${siteData.whatsapp.number}?text=Hola%20Elena%2C%20quiero%20consultar%20sobre%20un%20servicio`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-200 hover:shadow-md"
          >
            Consultar sobre un servicio
          </a>
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="py-16 md:py-24 bg-gray-900 container-with-margins">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-5">
          Tu momento es ahora
        </p>
        <h2 className="font-playfair text-3xl md:text-5xl font-bold text-white mb-5 leading-tight">
          ¿Lista para tu transformación?
        </h2>
        <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Más de 1.000 clientas ya eligieron Elena Benítez en Luque. Escribinos hoy y en minutos tenés tu turno reservado.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <a
            href={`https://wa.me/${siteData.whatsapp.number}?text=${encodeURIComponent(siteData.whatsapp.message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-400 text-white font-bold py-4 px-8 rounded-full transition-all duration-200 hover:shadow-xl text-base"
          >
            Reservar por WhatsApp
          </a>
          <a
            href="tel:+595991743889"
            className="border-2 border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white font-bold py-4 px-8 rounded-full transition-all duration-200 text-base"
          >
            Llamar al salón
          </a>
        </div>
        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm flex-wrap">
          <span className="flex items-center gap-1.5">
            <StarIcon className="w-4 h-4 text-amber-400" filled={true} />
            4.9 en Google
          </span>
          <span className="text-gray-700">·</span>
          <span>Luque, Paraguay</span>
          <span className="text-gray-700">·</span>
          <span>Lun–Sáb 8:00–18:00</span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [activeServiceFilter, setActiveServiceFilter] = useState<string>("todos");
  const { ref: servicesRef, isVisible: servicesVisible } = useFadeInOnScroll(0.2);
  const { servicios: serviciosDB } = useServicios();

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

      {siteData.whatsapp.enabled && (
        <CombinedLauncher
          whatsappNumber={siteData.whatsapp.number}
          whatsappMessage={siteData.whatsapp.message}
          enabled={true}
        />
      )}

      {/* ═══ HERO ══════════════════════════════════════════════════════ */}
      <section
        id="inicio"
        className="relative min-h-[65vh] sm:min-h-[70vh] lg:min-h-[75vh] flex items-center justify-center bg-gradient-to-b from-white to-amber-50/20 container-with-margins py-16 lg:py-24"
      >
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4">
          {/* Texto */}
          <div className="text-center lg:text-left animate-slidein order-2 lg:order-1">

            {/* Badge SEO local */}
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-6">
              <StarIcon className="w-3.5 h-3.5 text-amber-500" filled={true} />
              <span className="text-amber-700 text-xs font-semibold uppercase tracking-wide">Mejor peluquería en Luque</span>
            </div>

            {/* H1 — potente, local, emocional */}
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5 lg:mb-6 leading-tight max-w-xl mx-auto lg:mx-0">
              La peluquería en Luque que sí da resultados
            </h1>

            {/* Subtítulo — emocional y vendedor */}
            <p className="text-lg sm:text-xl text-gray-600 mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Más de 1.000 clientas transformadas en Luque. Cortes, color, maquillaje y tratamientos — con resultados que se notan desde el primer día.
            </p>

            {/* Micro-confianza */}
            <div className="flex items-center justify-center lg:justify-start mb-10 lg:mb-12">
              <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap justify-center lg:justify-start">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-amber-400" filled={true} />
                  ))}
                </div>
                <span className="font-semibold text-gray-800 ml-1">4.9</span>
                <span className="text-gray-400">·</span>
                <span>+100 reseñas en Google</span>
                <span className="text-gray-400">·</span>
                <span>10+ años</span>
              </div>
            </div>

            {/* CTAs: principal + secundario */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href={`https://wa.me/${siteData.whatsapp.number}?text=${encodeURIComponent(siteData.whatsapp.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-200 hover:shadow-lg text-base shadow-sm text-center"
              >
                Reservar por WhatsApp
              </a>
              <a
                href="#servicios"
                className="border border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50 font-semibold py-3.5 px-8 rounded-full transition-all duration-200 text-base text-center"
              >
                Ver servicios
              </a>
            </div>
          </div>

          {/* Imagen protagonista */}
          <div className="animate-fadein order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <Image
                src={siteData.inicio.image}
                alt="Elena Benítez - Peluquería profesional en Luque Paraguay. Servicios de maquillaje, tratamientos capilares, cejas, manicura y pedicura en Luque"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg object-cover w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[450px]"
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═════════════════════════════════════════════════ */}
      <div className="bg-gray-900 py-8 container-with-margins">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-700">
            {[
              { numero: "10+", label: "Años de experiencia" },
              { numero: "+1.000", label: "Clientas satisfechas" },
              { numero: "4.9 ★", label: "Calificación en Google" },
              { numero: "3", label: "Profesionales especializadas" },
            ].map((stat, i) => (
              <div key={i} className="px-4 first:pl-0 last:pr-0">
                <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-1">{stat.numero}</div>
                <div className="text-gray-400 text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Separador curvo */}
      <WaveSeparator />

      {/* Elemento flotante de transición */}
      <div className="relative -mt-8 mb-8 flex justify-center">
        <div
          className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100 animate-fadein"
          style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span className="font-medium">Descubre por qué nos eligen</span>
            <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* ═══ POR QUÉ ELEGIRNOS ════════════════════════════════════════ */}
      <PorQueElegirnos />

      {/* ═══ SERVICIOS ════════════════════════════════════════════════ */}
      <section
        id="servicios"
        ref={servicesRef}
        className={`py-12 md:py-20 bg-gray-50 container-with-margins transition-all duration-1000 ${
          servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 mb-2 md:mb-4">
              Nuestros servicios en Luque
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-4 md:mb-6">
              Más de 50 opciones para tu belleza y cuidado — desde cortes y coloración hasta maquillaje, cejas y uñas profesionales.
            </p>
            <div className="mb-6 md:mb-8">
              <a
                href="/servicios"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-6 md:py-3 md:px-8 rounded-full transition-all duration-200 hover:shadow-lg text-sm md:text-base"
              >
                Ver lista completa con precios
              </a>
            </div>
            <div className="max-w-4xl mx-auto">
              <ScrollableChips
                categories={serviceCategories}
                activeFilter={activeServiceFilter}
                onFilterChange={setActiveServiceFilter}
              />
            </div>
          </div>
          <div>
            <ServicesCarousel
              servicios={serviciosDB.length > 0 ? serviciosDB.map(cat => ({
                categoria: cat.nombre,
                descripcion: cat.descripcion,
                icon: cat.icon,
                color: cat.color,
                imagen_url: (cat as { imagen_url?: string }).imagen_url,
                servicios: cat.servicios.map(s => ({
                  nombre: s.nombre,
                  precio: s.precio,
                  descripcion: s.descripcion,
                  imagen_url: s.imagen_url
                }))
              })) : siteData.servicios}
              activeFilter={activeServiceFilter}
            />
          </div>
        </div>
      </section>

      {/* ═══ TRANSFORMACIONES / RESULTADOS ═══════════════════════════ */}
      <Transformaciones />

      {/* ═══ EQUIPO ═══════════════════════════════════════════════════ */}
      {siteData.equipo && (
        <TeamPreview team={siteData.equipo} />
      )}

      {/* ═══ GALERÍA ══════════════════════════════════════════════════ */}
      <GaleriaTrabajos />

      {/* ═══ TESTIMONIOS ══════════════════════════════════════════════ */}
      <TestimonialsCarousel reviews={siteData.testimonios.reviews} />

      {/* ═══ UBICACIÓN Y CONTACTO ═════════════════════════════════════ */}
      <section id="contacto" className="py-12 md:py-16 bg-white container-with-margins">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              Peluquería en Luque — Cómo llegar
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              c/ Sportivo Luqueño y Moisés Bertoni · Lun–Sáb 8:00–18:00
            </p>
          </div>

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

          <div className="map-embed">
            <iframe
              src="https://www.google.com/maps?q=-25.27296217089778,-57.48840106035379&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              title="Ubicación Elena Benítez - Peluquería profesional en Luque Paraguay - c/ Sportivo Luqueño y Moisés Bertoni"
              className="w-full aspect-video border-0 rounded-2xl shadow-lg"
            />
          </div>

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
          details[open] .details-marker { transform: rotate(180deg); }
          details summary::-webkit-details-marker { display: none; }
          .map-embed {
            position: relative; border-radius: 14px; overflow: hidden;
            box-shadow: 0 8px 24px rgba(0,0,0,0.06); margin-bottom: 1.5rem;
          }
          .map-embed iframe { width: 100%; aspect-ratio: 16/9; border: 0; display: block; }
          @media (max-width: 768px) {
            .container-with-margins { padding-left: 16px; padding-right: 16px; }
            .map-embed { margin-bottom: 1rem; }
          }
        `}</style>
      </section>

      {/* ═══ RESERVAS ══════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-gray-100 container-with-margins">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              Reservá tu cita en Luque
            </h2>
            <p className="text-sm md:text-lg text-gray-600">
              Elegí cómo querés agendar — respondemos al instante
            </p>
          </div>
          <BookingTabs
            whatsappNumber={siteData.whatsapp.number}
            whatsappUrl={siteData.reservas.whatsapp.url}
            servicios={siteData.servicios}
          />
        </div>
      </section>

      {/* ═══ FAQ ══════════════════════════════════════════════════════ */}
      <FAQ />

      {/* ═══ CTA FINAL ════════════════════════════════════════════════ */}
      <CTAFinal />

      <Footer />
    </div>
  );
}
