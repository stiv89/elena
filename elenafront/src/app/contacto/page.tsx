"use client";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import SvgIcon from "../components/SvgIcon";
import siteData from "../siteData.json";

export default function ContactoPage() {
  return (
    <>
      <Head>
        <title>📍 Contacto y Ubicación | Elena Benítez - Peluquería Luque Paraguay</title>
        <meta name="description" content="📍 Ubicación Elena Benítez Peluquería en Luque Paraguay ✨ c/ Sportivo Luqueño y Moisés Bertoni | Horarios Lun-Sáb 8:00-18:00 | ☎️ +595 991 743889 | La mejor peluquería cerca de ti" />
        <meta name="keywords" content="peluquería Luque ubicación, Elena Benítez dirección, salón belleza Sportivo Luqueño, peluquería cerca de mí Luque, horarios peluquería Paraguay, contacto Elena Benítez, teléfono peluquería Luque, whatsapp belleza Paraguay" />
        <meta name="geo.region" content="PY-Central" />
        <meta name="geo.placename" content="Luque, Paraguay" />
        <meta name="geo.position" content="-25.2677;-57.4847" />
        <meta name="ICBM" content="-25.2677, -57.4847" />
        <link rel="canonical" href="https://elenabenitez.com/contacto" />
        <meta property="og:title" content="📍 Contacto y Ubicación | Elena Benítez Peluquería Luque" />
        <meta property="og:description" content="📍 Visitanos en c/ Sportivo Luqueño y Moisés Bertoni, Luque Paraguay. Lun-Sáb 8:00-18:00. ☎️ +595 991 743889" />
        <meta property="og:url" content="https://elenabenitez.com/contacto" />
      </Head>

      <div className="min-h-screen bg-white flex flex-col">
        <Header />

        {/* WhatsApp Float */}
        {siteData.whatsapp.enabled && (
          <WhatsAppFloat 
            number={siteData.whatsapp.number}
            message={siteData.whatsapp.message}
          />
        )}

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
              📍 Contacto y Ubicación - Peluquería Luque
            </h1>
            <h2 className="text-lg text-gray-700 mb-6">
              Visitanos en nuestro salón ubicado en el corazón de Luque, Paraguay
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-gray-700 border">
                📍 <strong>c/ Sportivo Luqueño y Moisés Bertoni</strong>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-gray-700 border">
                🕒 <strong>Lun-Sáb 8:00-18:00</strong>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium text-gray-700 border">
                ☎️ <strong>+595 991 743889</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido Principal */}
        <main className="flex-1 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              
              {/* Información de Contacto */}
              <div className="animate-slidein">
                <div className="bg-gray-50 rounded-3xl p-8">
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
                    Información de Contacto - Peluquería Luque
                  </h3>
                  
                  <div className="space-y-6 mb-8">
                    <div className="flex items-start">
                      <SvgIcon type="location" className="w-6 h-6 mr-4 mt-1 flex-shrink-0 text-amber-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Dirección Exacta:</h4>
                        <p className="text-gray-700 mb-2">{siteData.contacto.direccion}</p>
                        <p className="text-sm text-gray-600">
                          <strong>Referencia:</strong> A pasos del centro de Luque, fácil acceso en transporte público
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <SvgIcon type="clock" className="w-6 h-6 mr-4 mt-1 flex-shrink-0 text-amber-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Horarios de Atención:</h4>
                        <p className="text-gray-700 mb-1">{siteData.contacto.horarios}</p>
                        <p className="text-sm text-gray-600">
                          <strong>Domingos:</strong> Cerrado | <strong>Feriados:</strong> Consultar disponibilidad
                        </p>
                        <p className="text-xs text-amber-600 font-medium mt-2">
                          ⚠️ Se recomienda reservar cita previa para garantizar disponibilidad
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <SvgIcon type="phone" className="w-6 h-6 mr-4 mt-1 flex-shrink-0 text-amber-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Teléfono y WhatsApp:</h4>
                        <p className="text-gray-700 mb-1">{siteData.contacto.telefono}</p>
                        <p className="text-sm text-gray-600">
                          Disponible para consultas y reservas las 24 horas
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <SvgIcon type="map" className="w-6 h-6 mr-4 mt-1 flex-shrink-0 text-amber-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Zona de Cobertura:</h4>
                        <p className="text-gray-700 mb-1">Luque, Asunción, San Lorenzo, Capiatá</p>
                        <p className="text-sm text-gray-600">
                          <strong>Servicios a domicilio disponibles</strong> en radio de 15km
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a 
                      href={siteData.contacto.whatsapp} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <SvgIcon type="whatsapp" className="w-5 h-5" />
                      WhatsApp
                    </a>
                    <a 
                      href={`tel:${siteData.contacto.telefono}`} 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <SvgIcon type="phone" className="w-5 h-5" />
                      Llamar
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Mapa y Cómo Llegar */}
              <div className="animate-fadein">
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                  📍 Cómo Llegar a Nuestra Peluquería
                </h3>
                
                <div className="rounded-3xl overflow-hidden shadow-elegant mb-6">
                  <iframe
                    src={siteData.contacto.mapa.embed}
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Mapa y ubicación Elena Benítez - Mejor peluquería en Luque Paraguay | c/ Sportivo Luqueño y Moisés Bertoni"
                  ></iframe>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    🚌 Cómo Llegar en Transporte Público
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>• <strong>Desde Asunción:</strong> Líneas 12, 30, 45 hasta Luque Centro</li>
                    <li>• <strong>Desde San Lorenzo:</strong> Línea 18 directo a Luque</li>
                    <li>• <strong>Referencia:</strong> Bajarse en Sportivo Luqueño y caminar 2 cuadras</li>
                    <li>• <strong>Estacionamiento:</strong> Disponible en la zona</li>
                  </ul>
                </div>

                <div className="text-center">
                  <a 
                    href={siteData.contacto.mapa.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline font-medium flex items-center justify-center gap-2 mb-4"
                  >
                    <SvgIcon type="map" className="w-5 h-5" />
                    Abrir en Google Maps
                  </a>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                    <p className="text-sm text-amber-800">
                      💡 <strong>Consejo:</strong> Guarda nuestra ubicación en tu móvil para llegar fácilmente la próxima vez
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
