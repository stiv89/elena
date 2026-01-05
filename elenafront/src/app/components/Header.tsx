"use client";
import Image from "next/image";
import siteData from "../siteData.json";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useConfiguracion } from "../../hooks/useConfiguracion";

interface CartItem {
  categoria: string;
  servicio: string;
  precio: string;
  cantidad: number;
  id: string;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const header = siteData.header;
  const servicios = (siteData as { servicios?: Array<{ categoria: string; descripcion: string }> }).servicios || [];
  const { config } = useConfiguracion();

  // Cargar carrito del localStorage al iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('elenaCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('elenaCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Funciones del carrito
  const addToCart = useCallback((categoria: string, servicio: string, precio: string) => {
    const itemId = `${categoria}-${servicio}`;
    const existingItem = cartItems.find(item => item.id === itemId);
    
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === itemId 
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ));
    } else {
      const newItem: CartItem = {
        categoria,
        servicio,
        precio: precio.replace(/[^\d]/g, ''),
        cantidad: 1,
        id: itemId
      };
      setCartItems([...cartItems, newItem]);
    }
    
    // Mostrar mensaje de confirmación
    showToast('✓ Servicio agregado al carrito');
  }, [cartItems]);

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

  // Exponer las funciones del carrito globalmente
  useEffect(() => {
    (window as { addToCart?: typeof addToCart }).addToCart = addToCart;
  }, [addToCart]);
  
  // Función para hacer scroll suave
  const scrollToSection = (anchor: string) => {
    // Caso especial para servicios - ir a la página dedicada
    if (anchor === '#servicios') {
      router.push('/servicios');
      setMenuOpen(false);
      return;
    }
    
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      {/* Barra superior informativa */}
      {config.topbar_visible && (
      <div className="hidden md:flex items-center justify-between px-6 py-2 bg-gradient-to-r from-amber-50 to-rose-50 border-b border-amber-100 relative">
        {/* Indicador decorativo */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent"></div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium text-gray-700">{config.topbar_ubicacion}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none">
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span className="text-sm font-medium text-gray-700">{config.topbar_horario}</span>
          </div>
          <a className="flex items-center gap-2 hover:text-amber-700 transition-colors" href={`tel:${config.whatsapp_numero}`}>
            <svg className="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none">
              <path d="M22 16.92V21a1 1 0 01-1.11 1A19 19 0 013 5.11 1 1 0 014 4h4.09a1 1 0 01.95.68c.12.38.37 1.17.52 1.64a1 1 0 01-.24 1l-1.2 1.2a12 12 0 005.2 5.2l1.2-1.2a1 1 0 011-.24c.47.15 1.26.4 1.64.52a1 1 0 01.68.95V21z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium text-gray-700">{config.topbar_telefono}</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none">
              <path d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span className="text-sm font-semibold text-gray-800">{config.topbar_eslogan}</span>
          </div>
          <div className="w-px h-4 bg-amber-200"></div>
          <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-1 rounded-full">{config.topbar_badge}</span>
        </div>
      </div>
      )}

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Indicador decorativo sutil */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-4 bg-gradient-to-b from-amber-200 to-transparent"></div>
        {/* Logo y nombre */}
        <button 
          onClick={() => scrollToSection('#inicio')}
          className="flex items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-102"
        >
          <div className="flex items-center gap-3">
            {header.logo ? (
              <Image src={header.logo} alt="Elena Benítez Logo" width={48} height={48} className="rounded-full group-hover:shadow-lg transition-shadow duration-300" />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
                <span className="text-white font-bold text-lg">E</span>
              </div>
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="font-playfair text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300">{header.name}</span>
            <span className="text-xs text-gray-600 font-medium">Belleza Integral</span>
          </div>
        </button>

        {/* Menu desktop simplificado */}
        <ul className="hidden lg:flex items-center gap-8 font-medium text-sm">
          {(() => {
            const navOrder = ['Inicio', 'Servicios', 'Galería', 'Contacto'];
            return navOrder.map((label) => {
              if (label === 'Servicios') {
                return (
                  <li key={label} className="relative" onMouseEnter={() => setServiciosOpen(true)} onMouseLeave={() => setServiciosOpen(false)}>
                    <button className="text-gray-700 hover:text-gray-900 transition-colors relative group cursor-pointer flex items-center gap-1">
                      Servicios
                      <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    {serviciosOpen && (
                      <div className="absolute left-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
                        <div className="grid grid-cols-1 gap-3">
                          {servicios.slice(0, 4).map((cat: { categoria: string; descripcion: string }) => (
                            <div key={cat.categoria} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-white hover:shadow-sm transition-all duration-200">
                              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-amber-600 text-sm">✨</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-800 text-sm">{cat.categoria}</div>
                                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.descripcion}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <a
                            href={siteData.reservas?.whatsapp?.url || header.quickInfo[1]?.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-center block"
                          >
                            Ver todos los servicios
                          </a>
                        </div>
                      </div>
                    )}
                  </li>
                );
              }

              // map label to action
              const toAction = () => {
                switch(label) {
                  case 'Inicio': return () => scrollToSection('#inicio');
                  case 'Servicios': return () => scrollToSection('#servicios');
                  case 'Galería': return () => scrollToSection('#galeria');
                  case 'Contacto': return () => scrollToSection('#contacto');
                  default: return () => {};
                }
              };

              return (
                <li key={label}>
                  <button onClick={() => { toAction()(); setMenuOpen(false); }} className="text-gray-700 hover:text-gray-900 transition-colors relative group cursor-pointer">
                    {label}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-gold transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </li>
              );
            });
          })()}
        </ul>

        {/* CTA simplificado */}
        <div className="flex items-center gap-3">
          {/* Icono del carrito */}
          <button
            onClick={() => router.push('/carrito')}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group"
            aria-label="Ver carrito"
          >
            <svg className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors" viewBox="0 0 24 24" fill="none">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
                {cartItems.reduce((total, item) => total + item.cantidad, 0)}
              </span>
            )}
          </button>

          {/* WhatsApp principal */}
          <a
            href={siteData.reservas?.whatsapp?.url || header.quickInfo[1]?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-200 text-sm relative overflow-hidden group"
            aria-label="WhatsApp"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.52 3.48A11.86 11.86 0 0012 0C5.37 0 .05 5.37.05 12.02c0 2.11.55 4.08 1.52 5.84L0 24l6.44-1.7A11.92 11.92 0 0012 24c6.63 0 11.95-5.37 11.95-11.98 0-3.2-1.25-6.18-3.9-8.09z"/>
            </svg>
            <span className="relative z-10">Reservar</span>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
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

      {/* Menú móvil simplificado */}
      <div className={`lg:hidden bg-white border-t border-gray-100 shadow-lg transition-all duration-300 ${
        menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 py-4">
          {/* Info rápida móvil */}
          <div className="mb-4 p-3 bg-gradient-to-r from-amber-50 to-rose-50 rounded-lg border border-amber-100">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-amber-600" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span>{config.topbar_ubicacion}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3 text-amber-600" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span>{config.topbar_horario}</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {[
              { text: 'Inicio', anchor: '#inicio' },
              { text: 'Servicios', anchor: '#servicios' },
              { text: 'Galería', anchor: '#galeria' },
              { text: 'Contacto', anchor: '#contacto' }
            ].map((item) => (
              <button 
                key={item.text}
                onClick={() => { scrollToSection(item.anchor); setMenuOpen(false); }}
                className="block text-left w-full text-gray-700 hover:text-gray-900 hover:bg-gray-50 font-medium py-3 px-3 rounded-lg transition-colors"
              >
                {item.text}
              </button>
            ))}
          </div>

          {/* CTA móvil */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            {/* Icono del carrito móvil */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={() => { router.push('/carrito'); setMenuOpen(false); }}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="21" r="1" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="20" cy="21" r="1" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span className="font-medium">Carrito</span>
                {cartItems.length > 0 && (
                  <span className="bg-amber-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center min-w-[20px]">
                    {cartItems.reduce((total, item) => total + item.cantidad, 0)}
                  </span>
                )}
              </button>
            </div>

            <a
              href={siteData.reservas?.whatsapp?.url || header.quickInfo[1]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center block relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <span className="relative z-10">📱 Reservar por WhatsApp</span>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
