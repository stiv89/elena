"use client";
import { useState, useRef } from "react";
import { Metadata } from "next";
import siteData from "../siteData.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceIcon from "../components/ServiceIcon";
import WhatsAppFloat from "../components/WhatsAppFloat";
import SvgIcon from "../components/SvgIcon";
import SmartSearchBar from "../components/SmartSearchBar";
import Breadcrumbs from "../components/Breadcrumbs";
import Link from "next/link";
import Head from "next/head";

export default function Servicios() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [highlightedService, setHighlightedService] = useState<string | null>(null);
  const categoriaRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const addToCart = (categoria: string, servicio: string, precio: string) => {
    // Usar la función global del header
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).addToCart) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).addToCart(categoria, servicio, precio);
    }
  };

  const scrollToCategory = (categoryName: string) => {
    const element = categoriaRefs.current[categoryName];
    if (element) {
      const headerHeight = 120; // Un poco más de espacio para el header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      
      setSelectedCategory(categoryName);
      
      // Remover la selección después de 3 segundos
      setTimeout(() => {
        setSelectedCategory(null);
      }, 3000);
    }
  };

  // Función para manejar resultados del buscador
  const handleSearchResult = (categoria: string, servicio?: string) => {
    scrollToCategory(categoria);
    
    if (servicio) {
      setHighlightedService(servicio);
      setTimeout(() => {
        setHighlightedService(null);
      }, 5000);
    }
  };

  return (
    <>
      <Head>
        <title>🎯 Servicios Completos | Elena Benítez - Peluquería Luque Paraguay</title>
        <meta name="description" content="✨ Descubre todos nuestros servicios de belleza en Luque: maquillaje profesional, tratamientos capilares, cejas perfectas, manicura, pedicura y más. Precios desde ₲15.000. ¡Reservá ahora!" />
        <meta name="keywords" content="servicios peluquería Luque, precios belleza Paraguay, maquillaje profesional Luque, tratamientos capilares Paraguay, cejas Luque, manicura pedicura Paraguay, alisados Luque, coloración cabello Paraguay, depilación Luque, extensiones uñas Paraguay" />
        <link rel="canonical" href="https://elenabenitez.com/servicios" />
        <meta property="og:title" content="🎯 Servicios Completos | Elena Benítez - Peluquería Luque" />
        <meta property="og:description" content="✨ Servicios de belleza profesionales en Luque Paraguay: maquillaje, tratamientos capilares, cejas, manicura y más. Precios desde ₲15.000" />
        <meta property="og:url" content="https://elenabenitez.com/servicios" />
        <meta property="og:type" content="website" />
      </Head>
      
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <Breadcrumbs />      {/* WhatsApp Float */}
      {siteData.whatsapp.enabled && (
        <WhatsAppFloat 
          number={siteData.whatsapp.number}
          message={siteData.whatsapp.message}
        />
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-12 container-with-margins">
        <div className="max-w-4xl mx-auto text-center px-4">
          {/* Botón volver */}
          <div className="mb-4">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Volver al inicio</span>
            </Link>
          </div>
          
          <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
            🎯 Servicios Completos de Belleza en Luque
          </h1>
          <h2 className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Descubre más de <strong>50 servicios profesionales</strong> con precios desde ₲15.000 - La mejor peluquería de Paraguay
          </h2>

          {/* Buscador Inteligente */}
          <div className="mb-6">
            <SmartSearchBar onSearchResult={handleSearchResult} />
            <p className="text-xs text-gray-500 mt-2">
              💡 Prueba: &ldquo;boda&rdquo;, &ldquo;cabello&rdquo;, &ldquo;maquillaje&rdquo; o &ldquo;verme joven&rdquo;
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-gray-700">
              +{siteData.servicios.length} Categorías
            </div>
            <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-gray-700">
              Técnicas Profesionales
            </div>
          </div>
        </div>
      </section>

      {/* Navegación rápida por categorías */}
      <section className="sticky top-20 bg-white/95 backdrop-blur-md z-40 border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {siteData.servicios.map((categoria) => (
              <button
                key={categoria.categoria}
                onClick={() => scrollToCategory(categoria.categoria)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-medium transition-all duration-300 text-sm ${
                  selectedCategory === categoria.categoria
                    ? "bg-gradient-gold text-white shadow-lg scale-105"
                    : "bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900"
                }`}
              >
                <ServiceIcon type={categoria.icon} className="w-3 h-3" />
                <span className="text-xs">{categoria.categoria.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <main className="flex-1 py-8 container-with-margins">
        <div className="max-w-7xl mx-auto px-4">
          {/* Botón scroll to top */}
          <div className="fixed bottom-32 right-6 z-30">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 w-10 h-10 rounded-full shadow-elegant flex items-center justify-center transition-all duration-300 hover:scale-110"
              title="Volver arriba"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </button>
          </div>

          {siteData.servicios.map((categoria, idx) => (
            <section 
              key={categoria.categoria} 
              ref={(el) => {
                categoriaRefs.current[categoria.categoria] = el;
              }}
              className={`mb-12 animate-fadein transition-all duration-500 ${
                selectedCategory === categoria.categoria 
                  ? "ring-4 ring-yellow-400 ring-opacity-50 rounded-2xl p-4 bg-yellow-50" 
                  : ""
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
              id={`categoria-${categoria.categoria.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {/* Header de la categoría - MÁS COMPACTO */}
              <div className="text-center mb-6">
                <div className="flex justify-center items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-md" 
                       style={{ backgroundColor: categoria.color }}>
                    <ServiceIcon type={categoria.icon} className="w-6 h-6 text-gray-600" />
                  </div>
                  <div className="text-left">
                    <h2 className="font-playfair text-2xl font-bold text-gray-900">
                      {categoria.categoria}
                    </h2>
                    <span className="text-sm text-gray-500">
                      {categoria.servicios.length} servicios
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 max-w-xl mx-auto">
                  {categoria.descripcion}
                </p>
              </div>

              {/* Grid de servicios - MÁS COMPACTO */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                {categoria.servicios.map((servicio, i) => (
                  <div 
                    key={servicio.nombre}
                    className={`bg-white rounded-xl shadow-md p-4 card-hover border-2 transition-all duration-500 ${
                      highlightedService === servicio.nombre 
                        ? "border-amber-400 bg-amber-50 ring-2 ring-amber-200 ring-opacity-50 scale-105" 
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="text-center">
                      <h4 className="font-semibold text-sm text-gray-900 mb-2 leading-tight line-clamp-2">
                        {servicio.nombre}
                      </h4>
                      
                      <div className="mb-3">
                        <span className="text-lg font-bold text-gray-900">₲{servicio.precio}</span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => addToCart(categoria.categoria, servicio.nombre, servicio.precio)}
                          className="bg-gradient-gold text-white font-medium py-1.5 px-3 rounded-full hover:shadow-md transition-all duration-300 text-xs flex items-center justify-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 7H18V6C18 3.79 16.21 2 14 2H10C7.79 2 6 3.79 6 6V7H5C3.9 7 3 7.9 3 9V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9C21 7.9 20.1 7 19 7ZM10 4H14C15.1 4 16 4.9 16 6V7H8V6C8 4.9 8.9 4 10 4ZM19 19H5V9H19V19ZM12 12C10.9 12 10 12.9 10 14C10 15.1 10.9 16 12 16C13.1 16 14 15.1 14 14C14 12.9 13.1 12 12 12Z"/>
                          </svg>
                          Agregar
                        </button>
                        
                        <a 
                          href={`https://wa.me/595991743889?text=Hola Elena, quiero consultar sobre ${encodeURIComponent(servicio.nombre)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 hover:bg-green-600 text-white font-medium py-1.5 px-3 rounded-full transition-all duration-300 text-xs flex items-center justify-center gap-1"
                          title="Consultar por WhatsApp"
                        >
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
                          </svg>
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Observaciones - MÁS COMPACTAS */}
              {categoria.obs && (
                <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-yellow-400">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-2">
                      <svg className="w-4 h-4 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1 text-sm">Información Importante</h4>
                      <p className="text-xs text-gray-700">
                        {categoria.obs}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-rose py-12 container-with-margins">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-3">
            ¿Lista para tu transformación?
          </h2>
          <p className="text-base text-gray-700 mb-6 max-w-2xl mx-auto">
            Reserva tu cita y déjanos cuidar tu belleza con profesionalidad y calidez.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href={`https://wa.me/${siteData.whatsapp.number}?text=${encodeURIComponent(siteData.whatsapp.message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-elegant transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <SvgIcon type="whatsapp" className="w-4 h-4" />
              Reservar por WhatsApp
            </a>
            <a 
              href="tel:+595991743889"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-elegant transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <SvgIcon type="phone" className="w-4 h-4" />
              Llamar Ahora
            </a>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
}
