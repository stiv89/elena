"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import siteData from "./siteData.json";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ServiceIcon from "./components/ServiceIcon";
import ContactForm from "./components/ContactForm";
import SvgIcon, { StarIcon, CheckIcon } from "./components/SvgIcon";
import { ScissorsIcon, BrushIcon, SparkleIcon, LocationPinIcon } from "./components/HeroIcons";
import IsaAssistant from "./components/IsaAssistant";
import FAQ from "./components/FAQ";
import Breadcrumbs from "./components/Breadcrumbs";

// Componente de estrellas para rating usando íconos SVG
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          filled={i < rating}
        />
      ))}
    </div>
  );
}

// Galería dinámica mejorada
function GaleriaTrabajos() {
  const [fotos, setFotos] = useState<typeof siteData.galeria.images>([]);
  const [activeCategory, setActiveCategory] = useState<string>("todos");

  useEffect(() => {
    setFotos(siteData.galeria.images);
  }, []);

  const filteredFotos = activeCategory === "todos" 
    ? fotos 
    : fotos.filter(foto => foto.category === activeCategory);

  return (
    <section id="galeria" className="py-16 animate-fadein">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            Galería de Trabajos - Peluquería Luque
          </h2>
          <h3 className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre algunos de nuestros mejores trabajos realizados en nuestro salón de belleza en Luque Paraguay
          </h3>
        </div>

      {/* Filtros de categoría */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {siteData.galeria.categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-gradient-gold text-white shadow-elegant"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFotos.map((foto, i) => (
          <div 
            key={foto.image} 
            className="group rounded-2xl overflow-hidden shadow-elegant bg-white card-hover image-overlay"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <Image 
              src={foto.image} 
              alt={`${foto.desc} - Elena Benítez Peluquería Luque | ${foto.category === 'maquillaje' ? 'Maquillaje profesional' : foto.category === 'cabello' ? 'Tratamientos capilares' : foto.category === 'cejas' ? 'Diseño de cejas' : foto.category} en Paraguay`}
              width={400} 
              height={250} 
              className="object-cover w-full h-[250px] transition-transform duration-500 group-hover:scale-105" 
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="p-4">
              <p className="text-sm font-medium text-gray-800">{foto.desc}</p>
              <span className="inline-block mt-2 text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {foto.category}
              </span>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="font-sans bg-white text-black min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      
      {/* WhatsApp Float */}
      {siteData.whatsapp.enabled && (
        <WhatsAppFloat 
          number={siteData.whatsapp.number}
          message={siteData.whatsapp.message}
        />
      )}

      {/* Asistente Virtual Isa */}
      <IsaAssistant enabled={true} />

      {/* HERO SECTION */}
      <section 
        id="inicio" 
        className="relative min-h-screen flex items-center justify-center hero-gradient container-with-margins"
      >
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 py-16">
          {/* Contenido principal */}
          <div className="text-center lg:text-left animate-slidein order-2 lg:order-1">
            {/* Título optimizado para SEO con palabras clave principales */}
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
              🥇 Peluquería en Luque | Elena Benítez<span className="block text-2xl sm:text-3xl lg:text-4xl mt-2 text-amber-600">Mejor Salón de Belleza Paraguay</span>
            </h1>
            
            {/* Subtítulo más persuasivo con palabras clave secundarias */}
            <h2 className="text-lg sm:text-xl text-gray-700 mb-6 lg:mb-8 leading-relaxed font-medium">
              ⭐ +10 años transformando tu belleza en Luque • Maquillaje profesional • Tratamientos capilares • Cejas perfectas • Servicios a domicilio disponibles
            </h2>
            
            {/* Lista de beneficios con iconos SVG mejorados */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 mb-8">
              {siteData.inicio.features.map((feature, i) => {
                const getIcon = (iconType: string) => {
                  switch (iconType) {
                    case 'scissors':
                      return <ScissorsIcon className="w-5 h-5 text-amber-600" />;
                    case 'brush':
                      return <BrushIcon className="w-5 h-5 text-amber-600" />;
                    case 'sparkle':
                      return <SparkleIcon className="w-5 h-5 text-amber-600" />;
                    case 'location':
                      return <LocationPinIcon className="w-5 h-5 text-amber-600" />;
                    default:
                      return <CheckIcon className="w-5 h-5 text-amber-600" />;
                  }
                };

                return (
                  <div 
                    key={i} 
                    className="flex items-center text-gray-800 animate-fadein benefit-icon p-3 rounded-lg"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="mr-3 flex-shrink-0">
                      {getIcon(feature.icon)}
                    </div>
                    <span className="text-sm sm:text-base font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA mejorado y más prominente - DOBLE OPCIÓN */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start mb-6">
              {/* CTA Principal - Agendar cita */}
              <a
                href="https://wa.me/595991743889?text=Hola%20Elena,%20quiero%20agendar%20una%20cita"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button text-white font-semibold py-3 px-6 lg:px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-sm lg:text-base shadow-lg w-full sm:w-auto text-center"
              >
                Agendá tu cita ahora
              </a>
              
              {/* CTA Secundario - Servicio a domicilio */}
              <a
                href={siteData.inicio.cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-semibold py-3 px-6 lg:px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-sm lg:text-base shadow-md w-full sm:w-auto text-center"
              >
                {siteData.inicio.cta.text}
              </a>
            </div>
            
            {/* Información rápida de contacto */}
            <div className="flex items-center justify-center lg:justify-start text-gray-600 text-sm">
              <SvgIcon type="phone" className="w-4 h-4 mr-2 text-amber-600" />
              <span className="font-medium">+595 991 743889</span>
            </div>
          </div>
          
          {/* Imagen optimizada */}
          <div className="animate-fadein order-1 lg:order-2">
            <div className="relative">
              {/* Decoración de fondo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-100 to-rose-100 rounded-3xl opacity-30 blur-lg"></div>
              <Image 
                src={siteData.inicio.image} 
                alt="Elena Benítez - Mejor peluquería en Luque Paraguay | Salón de belleza profesional con más de 10 años de experiencia | Servicios de maquillaje, tratamientos capilares, cejas, manicura y pedicura" 
                width={600} 
                height={400} 
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[300px] sm:h-[350px] lg:h-[450px] image-overlay" 
                priority
                loading="eager"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              
              {/* Badge flotante */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center">
                  <div className="flex -space-x-1 mr-3">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="w-4 h-4 text-amber-400"
                        filled={true}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">+1000</p>
                    <p className="text-xs text-gray-600">Clientes felices</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE NOSOTROS - Sección optimizada para SEO local */}
      <section id="nosotros" className="py-20 bg-white container-with-margins">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center px-4">
          <div className="order-2 lg:order-1 animate-slidein">
            <Image 
              src={siteData.nosotros.image} 
              alt="Elena Benítez - Estilista profesional en Luque Paraguay con más de 10 años de experiencia en belleza integral, maquillaje y tratamientos capilares" 
              width={500} 
              height={500} 
              className="rounded-3xl shadow-elegant object-cover w-full h-[500px] image-overlay" 
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div className="order-1 lg:order-2 animate-fadein">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
              Elena Benítez - Estilista Profesional en Luque
            </h2>
            <h3 className="text-lg text-gray-600 mb-2 font-medium">
              +10 años creando belleza en el corazón de Paraguay
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              Como <strong>peluquería líder en Luque</strong>, Elena Benítez y su equipo han transformado la belleza de más de 1000 clientas. Nuestra <em>experiencia de más de 10 años</em> nos convierte en el <strong>mejor salón de belleza en Paraguay</strong>, especializado en maquillaje profesional, tratamientos capilares avanzados y diseño de cejas.
            </p>
            
            {/* Logros con íconos SVG optimizados para SEO */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {siteData.nosotros.achievements.map((achievement, i) => (
                <div 
                  key={i} 
                  className="flex items-center text-gray-700 animate-fadein"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <CheckIcon className="w-5 h-5 text-black mr-2 flex-shrink-0" />
                  <span className="text-sm"><strong>{achievement.replace(/^[^\w]+/, '')}</strong></span>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-rose p-6 rounded-2xl mb-4">
              <h4 className="font-semibold text-lg text-gray-900 mb-2">
                ¿Por qué elegir nuestra peluquería en Luque?
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Somos el <strong>salón de belleza más recomendado de Luque</strong> por nuestra atención personalizada, técnicas profesionales y resultados excepcionales. Ubicados estratégicamente en el centro de Luque, ofrecemos servicios tanto en nuestro salón como a domicilio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS - Sección optimizada para palabras clave */}
      <section id="servicios" className="py-20 bg-gray-50 container-with-margins">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
              Servicios de Peluquería y Belleza en Luque
            </h2>
            <h3 className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Descubre nuestra amplia gama de servicios profesionales con más de 50 tratamientos especializados
            </h3>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <span className="bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-gray-700 border">
                🎨 <strong>Maquillaje Profesional Luque</strong>
              </span>
              <span className="bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-gray-700 border">
                💇‍♀️ <strong>Tratamientos Capilares Paraguay</strong>
              </span>
              <span className="bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-gray-700 border">
                ✨ <strong>Cejas Perfectas</strong>
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {siteData.servicios.map((categoria, idx) => (
              <div 
                key={categoria.categoria} 
                className="bg-white rounded-3xl shadow-elegant p-8 card-hover animate-fadein"
                style={{ 
                  animationDelay: `${idx * 0.2}s`,
                  backgroundColor: categoria.color 
                }}
              >
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <ServiceIcon type={categoria.icon} className="w-12 h-12 text-gray-600" />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
                    {categoria.categoria === "Lavados" ? "Lavados y Tratamientos Capilares" :
                     categoria.categoria === "Maquillajes & Compañía" ? "Maquillaje Profesional Luque" :
                     categoria.categoria === "Cejas & Pestañas" ? "Cejas y Pestañas Perfectas" :
                     categoria.categoria === "Depilaciones" ? "Depilación Profesional" :
                     categoria.categoria === "Manos & Pies" ? "Manicura y Pedicura Luque" :
                     categoria.categoria === "Manitas Delicadas" ? "Uñas Acrílicas y Extensiones" :
                     categoria.categoria === "Color y Alisados" ? "Coloración y Alisados Paraguay" :
                     categoria.categoria}
                  </h3>
                  <p className="text-gray-600">{categoria.descripcion}</p>
                </div>
                
                <div className="space-y-3 mb-6">
                  {categoria.servicios.slice(0, 4).map((servicio, i) => (
                    <div key={i} className="flex justify-between items-center py-2">
                      <span className="text-gray-700 text-sm">{servicio.nombre}</span>
                      <span className="font-semibold text-gray-900">₲{servicio.precio}</span>
                    </div>
                  ))}
                  {categoria.servicios.length > 4 && (
                    <div className="text-center pt-2">
                      <span className="text-sm text-gray-500">+{categoria.servicios.length - 4} servicios más</span>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <a 
                    href="/servicios" 
                    className="inline-block bg-gradient-gold text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Ver todos los servicios
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="bg-white container-with-margins">
        <GaleriaTrabajos />
      </section>

      {/* TESTIMONIOS */}
      <section className="py-20 bg-gradient-rose container-with-margins">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
              Reseñas y Testimonios - Mejor Peluquería Luque
            </h2>
            <h3 className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lo que dicen nuestras clientas sobre el mejor salón de belleza de Paraguay
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {siteData.testimonios.reviews.map((testimonio, i) => (
              <div 
                key={testimonio.name} 
                className="bg-white rounded-3xl shadow-elegant p-8 card-hover animate-fadein"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  <Image 
                    src={testimonio.image} 
                    alt={`Testimonio de ${testimonio.name} - Cliente satisfecha de Elena Benítez, mejor peluquería en Luque Paraguay con 5 estrellas`} 
                    width={60} 
                    height={60} 
                    className="rounded-full object-cover mr-4" 
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonio.name}</h4>
                    <StarRating rating={testimonio.rating} />
                  </div>
                </div>
                <p className="text-gray-700 italic">&ldquo;{testimonio.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UBICACIÓN Y CONTACTO */}
      <section id="contacto" className="py-20 bg-white container-with-margins">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
              Ubicación y Contacto - Peluquería en Luque
            </h2>
            <h3 className="text-lg text-gray-600">
              Visítanos en nuestro salón ubicado en el corazón de Luque, Paraguay - ¡Te esperamos!
            </h3>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="animate-slidein">
              <div className="bg-gray-50 rounded-3xl p-8">
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
                  Información de Contacto
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <SvgIcon type="location" className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Dirección:</h4>
                      <p className="text-gray-700">{siteData.contacto.direccion}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <SvgIcon type="clock" className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Horarios:</h4>
                      <p className="text-gray-700">{siteData.contacto.horarios}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <SvgIcon type="phone" className="w-6 h-6 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Teléfono:</h4>
                      <p className="text-gray-700">{siteData.contacto.telefono}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href={siteData.contacto.whatsapp} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center"
                  >
                    <SvgIcon type="whatsapp" className="w-5 h-5 mr-2" />
                    WhatsApp
                  </a>
                  <a 
                    href={`tel:${siteData.contacto.telefono}`} 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center"
                  >
                    <SvgIcon type="phone" className="w-5 h-5 mr-2" />
                    Llamar
                  </a>
                  <a 
                    href={siteData.contacto.instagram} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center"
                  >
                    <SvgIcon type="instagram" className="w-5 h-5 mr-2" />
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            
            <div className="animate-fadein">
              <div className="rounded-3xl overflow-hidden shadow-elegant">
                <iframe
                  src={siteData.contacto.mapa.embed}
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Ubicación Elena Benítez - Mejor peluquería en Luque Paraguay | c/ Sportivo Luqueño y Moisés Bertoni | Salón de belleza profesional"
                ></iframe>
              </div>
              <div className="text-center mt-4">
                <a 
                  href={siteData.contacto.mapa.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline font-medium flex items-center justify-center gap-2"
                >
                  <SvgIcon type="map" className="w-5 h-5" />
                  Abrir en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVAS */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 container-with-margins">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            {siteData.reservas.title}
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            {siteData.reservas.description}
          </p>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Formulario */}
            {siteData.reservas.form.enabled && (
              <div className="bg-white rounded-3xl shadow-elegant p-8">
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
                  Formulario de Contacto
                </h3>
                <ContactForm 
                  whatsappNumber={siteData.whatsapp.number}
                  servicios={siteData.servicios}
                />
              </div>
            )}
            
            {/* Enlaces rápidos */}
            <div className="space-y-6">
              {siteData.reservas.whatsapp.enabled && (
                <div className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center">
                  <div className="mb-4">
                    <SvgIcon type="whatsapp" className="w-12 h-12 mx-auto text-green-600" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                    WhatsApp
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {siteData.reservas.whatsapp.text}
                  </p>
                  <a 
                    href={siteData.reservas.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition-colors"
                  >
                    Reservar por WhatsApp
                  </a>
                </div>
              )}
              
              {siteData.reservas.calendly.enabled && (
                <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8 text-center">
                  <div className="mb-4">
                    <SvgIcon type="calendar" className="w-12 h-12 mx-auto text-blue-600" />
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                    Calendly
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {siteData.reservas.calendly.text}
                  </p>
                  <a 
                    href={siteData.reservas.calendly.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full transition-colors"
                  >
                    Agendar en Calendly
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION - Optimizada para SEO */}
      <FAQ />

      <Footer />
    </div>
  );
}
