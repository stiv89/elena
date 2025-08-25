"use client";
import siteData from "../siteData.json";
import ServiceIcon from "./ServiceIcon";
import SvgIcon from "./SvgIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-100 pt-16 pb-8 px-6 mt-auto">
      <div className="max-w-6xl mx-auto">
        {/* Sección principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo y descripción */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">E</span>
              </div>
              <div className="flex flex-col">
                <span className="font-playfair text-2xl font-bold text-white">
                  {siteData.header.name}
                </span>
                <span className="text-sm text-gray-400 font-medium">
                  {siteData.header.subtitle}
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {siteData.site.description}
            </p>
            
            {/* Redes sociales */}
            <div className="flex gap-4">
              <a 
                href={`https://wa.me/${siteData.whatsapp.number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <SvgIcon type="whatsapp" className="w-5 h-5" />
              </a>
              <a 
                href={siteData.contacto.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <SvgIcon type="instagram" className="w-5 h-5" />
              </a>
              <a 
                href={siteData.contacto.mapa.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <SvgIcon type="location" className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Enlaces rápidos */}
          <div>
            <h3 className="font-playfair text-lg font-bold text-white mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              {siteData.header.menu.map((item: { text: string; anchor: string }) => (
                <li key={item.text}>
                  <a 
                    href={item.anchor} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Información de contacto */}
          <div>
            <h3 className="font-playfair text-lg font-bold text-white mb-4">
              Contacto
            </h3>
            <div className="space-y-3">
              {siteData.header.quickInfo.map((info: { icon: string; text: string; url?: string }, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <SvgIcon type={info.icon} className="w-5 h-5 mt-1 text-gray-400" />
                  <div>
                    {info.url ? (
                      <a 
                        href={info.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors text-sm"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-gray-300 text-sm">{info.text}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Servicios destacados */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h3 className="font-playfair text-lg font-bold text-white mb-4 text-center">
            Nuestros Servicios
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {siteData.servicios.slice(0, 3).map((categoria: { categoria: string; descripcion: string; icon: string }) => (
              <div key={categoria.categoria} className="text-center">
                <div className="flex justify-center mb-2">
                  <ServiceIcon type={categoria.icon} className="w-6 h-6 text-gray-400" />
                </div>
                <h4 className="font-semibold text-white mb-1">{categoria.categoria}</h4>
                <p className="text-gray-400 text-sm">{categoria.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Sección inferior */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-center md:text-left">
            <p>
              © {currentYear} {siteData.header.name}. Todos los derechos reservados.
            </p>
            <p>
              Desarrollado por{' '}
              <a 
                href="https://digita.com.py" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition-colors font-medium"
              >
                Digita Paraguay
              </a>
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <a 
              href={siteData.whatsapp.enabled ? `https://wa.me/${siteData.whatsapp.number}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2"
            >
              <SvgIcon type="whatsapp" className="w-4 h-4" />
              Reservar Cita
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
