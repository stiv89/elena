"use client";
import siteData from "../siteData.json";
import SvgIcon from "./SvgIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100">
      {/* CTA superior - Más compacta */}
      <div className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center gap-3">
            <a
              href={`https://wa.me/${siteData.whatsapp.number}?text=Hola Elena, quiero reservar una cita&utm_source=footer`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm flex items-center gap-2"
            >
              <SvgIcon type="whatsapp" className="w-4 h-4" />
              WhatsApp
            </a>
            <a
              href={`tel:${siteData.contacto.telefono}`}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm flex items-center gap-2"
            >
              <SvgIcon type="phone" className="w-4 h-4" />
              Llamar
            </a>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div>
                <h4 className="font-playfair text-xl font-bold text-white mb-1">
                  {siteData.header.name}
                </h4>
                <p className="text-sm text-gray-400">
                  {siteData.header.subtitle}
                </p>
              </div>
            </div>

            <p className="text-gray-300 mb-4 text-sm leading-relaxed max-w-md">
              Belleza integral en Luque. Maquillaje, tratamientos capilares, cejas, manos y pies.
            </p>

            {/* Redes sociales */}
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${siteData.whatsapp.number}?utm_source=footer`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
                className="w-9 h-9 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <SvgIcon type="whatsapp" className="w-4 h-4" />
              </a>
              <a
                href={siteData.contacto.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="w-9 h-9 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <SvgIcon type="instagram" className="w-4 h-4" />
              </a>
              <a
                href={siteData.contacto.mapa.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cómo llegar al salón"
                className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <SvgIcon type="location" className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h5 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Enlaces
            </h5>
            <nav className="space-y-2">
              <a href="/servicios" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Servicios
              </a>
              <a href="/equipo" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Equipo
              </a>
              <a href="/contacto" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Contacto
              </a>
              <a href="/carrito" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Carrito
              </a>
              <a href="/terminos" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Términos y Condiciones
              </a>
            </nav>
          </div>
        </div>

        {/* Información de contacto - Nueva sección */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <h5 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
            Contacto
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href={siteData.contacto.mapa.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <SvgIcon type="location" className="w-4 h-4 flex-shrink-0" />
              <span>{siteData.contacto.direccion.split(',')[0]}</span>
            </a>
            <a
              href={`tel:${siteData.contacto.telefono}`}
              className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm"
            >
              <SvgIcon type="phone" className="w-4 h-4 flex-shrink-0" />
              <span>{siteData.contacto.telefono}</span>
            </a>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <SvgIcon type="clock" className="w-4 h-4 flex-shrink-0" />
              <span>Lun–Sáb 8:00–18:00 · Dom cerrado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-400 text-center md:text-left">
              <span>© {currentYear} {siteData.header.name}. Todos los derechos reservados.</span>
              <span>
                Desarrollado por{' '}
                <a
                  href="https://digita.com.py"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-400 transition-colors font-medium"
                >
                  Digita Paraguay
                </a>
              </span>
            </div>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Volver arriba"
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Schema.org LocalBusiness para SEO local */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": siteData.header.name,
            "description": siteData.site.description,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": siteData.contacto.direccion.split(',')[0],
              "addressLocality": "Luque",
              "addressRegion": "Central",
              "addressCountry": "PY"
            },
            "telephone": siteData.contacto.telefono,
            "url": "https://elenabenitez.com.py",
            "openingHours": "Mo-Sa 08:00-18:00",
            "priceRange": "$$",
            "image": siteData.inicio.image
          })
        }}
      />
    </footer>
  );
}
