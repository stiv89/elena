"use client";
import Image from "next/image";
import siteData from "../siteData.json";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = siteData.header;
  
  // Función para hacer scroll suave
  const scrollToSection = (anchor: string) => {
    // Si estamos en la página de servicios, ir a la página principal
    if (window.location.pathname !== '/') {
      window.location.href = `/${anchor}`;
      return;
    }
    
    const element = document.querySelector(anchor) as HTMLElement;
    if (element) {
      const headerHeight = 80; // Altura aproximada del header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false); // Cerrar menú móvil después del click
  };
  
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-elegant border-b border-gray-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo y nombre */}
        <div className="flex items-center gap-3">
          {header.logo ? (
            <Image src={header.logo} alt="Logo" width={50} height={50} className="rounded-full" />
          ) : (
            <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-playfair text-2xl font-bold text-gray-900">{header.name}</span>
            <span className="text-sm text-gray-600 font-medium">{header.subtitle}</span>
          </div>
        </div>

        {/* Menu desktop */}
        <ul className="hidden lg:flex items-center gap-8 font-medium">
          {header.menu.map((item: any) => (
            <li key={item.text}>
              <button 
                onClick={() => scrollToSection(item.anchor)}
                className="text-gray-700 hover:text-gray-900 transition-colors relative group cursor-pointer"
              >
                {item.text}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-gold transition-all duration-300 group-hover:w-full"></span>
              </button>
            </li>
          ))}
        </ul>

        {/* CTA y botón móvil */}
        <div className="flex items-center gap-4">
          <a 
            href={header.cta.url} 
            target="_blank" 
            rel="noopener" 
            className="hidden lg:inline-block bg-gradient-gold text-white font-semibold px-6 py-3 rounded-full shadow-elegant hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            {header.cta.text}
          </a>
          
          {/* Botón menú móvil */}
          <button 
            className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition-colors" 
            onClick={() => setMenuOpen(!menuOpen)} 
            aria-label="Abrir menú"
          >
            <div className="flex flex-col gap-1">
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div className={`lg:hidden bg-white border-t border-gray-200 shadow-elegant transition-all duration-300 ${
        menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-6 py-6 space-y-4">
          {header.menu.map((item: any) => (
            <button 
              key={item.text}
              onClick={() => scrollToSection(item.anchor)}
              className="block text-left w-full text-gray-700 hover:text-gray-900 font-medium py-2 border-b border-gray-100 transition-colors"
            >
              {item.text}
            </button>
          ))}
          
          {/* Información rápida móvil */}
          <div className="pt-4 space-y-3">
            {header.quickInfo.map((info: any, i: number) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-lg">{info.icon}</span>
                {info.url ? (
                  <a href={info.url} className="hover:text-gray-900 transition-colors">
                    {info.text}
                  </a>
                ) : (
                  <span>{info.text}</span>
                )}
              </div>
            ))}
          </div>
          
          {/* CTA móvil */}
          <div className="pt-4">
            <a 
              href={header.cta.url} 
              target="_blank" 
              rel="noopener" 
              className="block w-full text-center bg-gradient-gold text-white font-semibold px-6 py-3 rounded-full shadow-elegant"
            >
              {header.cta.text}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
