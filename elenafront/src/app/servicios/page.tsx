"use client";
import { useState, useRef } from "react";
import { useServicios } from "../../hooks/useServicios";
import { whatsappConfig } from "../../lib/whatsapp-config";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceIcon from "../components/ServiceIcon";
import WhatsAppFloat from "../components/WhatsAppFloat";
import SvgIcon from "../components/SvgIcon";
import SmartSearchBar from "../components/SmartSearchBar";
import Breadcrumbs from "../components/Breadcrumbs";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function Servicios() {
  const { servicios, loading, error } = useServicios();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [highlightedService, setHighlightedService] = useState<string | null>(null);
  const categoriaRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const router = useRouter();

  const addToCart = (categoria: string, servicio: string, precio: string) => {
    // Usar la función global del header
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).addToCart) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).addToCart(categoria, servicio, precio);
    }
    
    // Mostrar notificación de éxito
    showToast('✓ Servicio agregado al carrito');
  };

  const showToast = (message: string) => {
    const toast = document.createElement('div');
    toast.className = 'fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 3000);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando servicios...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">Error al cargar servicios: {error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
            >
              Reintentar
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
      {whatsappConfig.whatsapp.enabled && (
        <WhatsAppFloat 
          number={whatsappConfig.whatsapp.number}
          message={whatsappConfig.whatsapp.message}
        />
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadein {
          animation: fadein 0.6s ease-out forwards;
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>

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
            Nuestros servicios
          </h1>
          <h2 className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Más de 50 opciones desde ₲15.000. Elegí la tuya y reservá al instante.
          </h2>

          {/* Buscador Inteligente */}
          <div className="mb-6">
            <SmartSearchBar onSearchResult={handleSearchResult} servicios={servicios} />
            <p className="text-xs text-gray-500 mt-2">
              💡 Ej: maquillaje social, corte, cejas...
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-gray-700">
              +{servicios.length} Categorías
            </div>
            <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-gray-700">
              Técnicas Profesionales
            </div>
          </div>
        </div>
      </section>

      {/* Navegación rápida por categorías */}
      <section className="sticky top-20 bg-white/95 backdrop-blur-md z-40 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {servicios.map((categoria) => (
              <button
                key={categoria.categoria}
                onClick={() => scrollToCategory(categoria.categoria)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === categoria.categoria
                    ? "bg-gradient-gold text-white shadow-lg scale-105"
                    : "bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900"
                }`}
              >
                <ServiceIcon type={categoria.icon} className="w-4 h-4" />
                <span>{categoria.categoria.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <main className="flex-1 py-8 container-with-margins pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Botón scroll to top y carrito */}
          <div className="fixed bottom-32 right-6 z-30 flex flex-col gap-3">
            {/* Indicador del carrito */}
            <button
              onClick={() => router.push('/carrito')}
              className="bg-amber-500 hover:bg-amber-600 text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 relative"
              title="Ver carrito"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              {/* Contador de items (esto se actualizaría dinámicamente) */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px] opacity-0">
                0
              </span>
            </button>

            {/* Botón scroll to top */}
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

          {servicios.map((categoria, idx) => (
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                {categoria.servicios.map((servicio, i) => (
                  <div 
                    key={servicio.nombre}
                    className={`bg-white rounded-xl shadow-sm overflow-hidden border transition-all duration-300 hover:shadow-md flex flex-col ${
                      highlightedService === servicio.nombre 
                        ? "border-amber-400 bg-amber-50 ring-2 ring-amber-200 ring-opacity-50 scale-105" 
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    {/* Imagen del servicio */}
                    {servicio.imagen_url && (
                      <div className="relative h-32 w-full overflow-hidden flex-shrink-0">
                        <img 
                          src={servicio.imagen_url} 
                          alt={servicio.nombre}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4 flex flex-col flex-grow">
                      {/* Badge para servicios populares */}
                      {i < 2 && (
                        <div className="flex justify-between items-start mb-2">
                          <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-1 rounded-full">
                            ⭐ Más pedido
                          </span>
                        </div>
                      )}

                      <h4 className="font-semibold text-gray-900 mb-2 leading-tight line-clamp-2 text-sm">
                        {servicio.nombre}
                      </h4>
                      
                      {/* Descripción corta */}
                      <p className="text-xs text-gray-600 mb-3 flex-grow">
                        {servicio.descripcion || "Servicio profesional de alta calidad"}
                      </p>
                      
                      <div className="mt-auto space-y-2">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-gray-900">₲{servicio.precio}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => addToCart(categoria.categoria, servicio.nombre, servicio.precio)}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-3 rounded-lg transition-all duration-300 text-xs flex items-center justify-center gap-1"
                            title="Agregar al carrito"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 7H18V6C18 3.79 16.21 2 14 2H10C7.79 2 6 3.79 6 6V7H5C3.9 7 3 7.9 3 9V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9C21 7.9 20.1 7 19 7ZM10 4H14C15.1 4 16 4.9 16 6V7H8V6C8 4.9 8.9 4 10 4ZM19 19H5V9H19V19ZM12 12C10.9 12 10 12.9 10 14C10 15.1 10.9 16 12 16C13.1 16 14 15.1 14 14C14 12.9 13.1 12 12 12Z"/>
                            </svg>
                            Agregar
                          </button>

                          <a 
                            href={`https://wa.me/595991743889?text=Hola Elena, quiero reservar ${encodeURIComponent(servicio.nombre)} por ₲${servicio.precio}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg transition-all duration-300 text-xs flex items-center justify-center gap-1"
                            title="Reservar por WhatsApp"
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
                            </svg>
                            WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Observaciones - MÁS COMPACTAS */}
              {categoria.obs && (
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => {
                      const content = document.getElementById(`obs-${categoria.categoria.replace(/\s+/g, '-')}`);
                      if (content) {
                        content.classList.toggle('hidden');
                      }
                    }}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                      <span className="font-medium text-gray-900 text-sm">Información importante</span>
                    </div>
                    <svg className="w-4 h-4 text-gray-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div id={`obs-${categoria.categoria.replace(/\s+/g, '-')}`} className="hidden px-3 pb-3">
                    <p className="text-xs text-gray-700">
                      {categoria.obs}
                    </p>
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
              href={`https://wa.me/${whatsappConfig.whatsapp.number}?text=${encodeURIComponent(whatsappConfig.whatsapp.message)}`}
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

      {/* CTA Sticky Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
        <a 
          href={`https://wa.me/${whatsappConfig.whatsapp.number}?text=${encodeURIComponent(whatsappConfig.whatsapp.message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <SvgIcon type="whatsapp" className="w-5 h-5" />
          Reservar por WhatsApp
        </a>
      </div>

      {/* Espacio para el CTA sticky */}
      <div className="h-20 md:hidden"></div>

      <Footer />
      </div>
    </>
  );
}
