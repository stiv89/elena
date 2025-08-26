"use client";
import Image from "next/image";
import siteData from "../siteData.json";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

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
  const servicios = (siteData as any).servicios || [];

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).addToCart = addToCart;
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
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-elegant border-b" style={{borderColor: 'rgba(0,0,0,0.05)'}}>
      {/* Top utility bar (SVG icons, subtle badge) */}
      <div className="hidden md:flex items-center justify-between px-6 py-2 bg-white/70 backdrop-blur-sm text-sm text-gray-600">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>Luque</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2"/></svg>
            <span>Lun–Sáb 9–19</span>
          </div>
          <a className="flex items-center gap-2 hover:text-gray-900" href={siteData.reservas?.whatsapp?.url || header.quickInfo[1]?.url} target="_blank" rel="noreferrer">
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 16.92V21a1 1 0 01-1.11 1A19 19 0 013 5.11 1 1 0 014 4h4.09a1 1 0 01.95.68c.12.38.37 1.17.52 1.64a1 1 0 01-.24 1l-1.2 1.2a12 12 0 005.2 5.2l1.2-1.2a1 1 0 011-.24c.47.15 1.26.4 1.64.52a1 1 0 01.68.95V21z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span>+595 991 743889</span>
          </a>
          <a className="flex items-center gap-2 hover:text-gray-900" href={siteData.reservas?.whatsapp?.url || header.quickInfo[1]?.url} target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
        <div className="text-sm text-gray-700 font-medium flex items-center gap-3">
          <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z" stroke="currentColor" strokeWidth="0"/></svg>
          <span className="opacity-90">+1000 clientes felices</span>
          <span className="ml-3 text-xs text-gray-400">#1 en Luque</span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo y nombre */}
        <button 
          onClick={() => scrollToSection('#inicio')}
          className="flex items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-102"
        >
          <div className="flex items-center gap-3">
            {header.logo ? (
              <Image src={header.logo} alt="Elena Benítez Logo" width={56} height={56} className="rounded-full group-hover:shadow-lg transition-shadow duration-300" />
            ) : (
              <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
                <span className="text-white font-bold text-xl">E</span>
              </div>
            )}
          </div>
          <div className="flex flex-col text-left">
            <span className="font-playfair text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300">{header.name}</span>
            <span className="text-sm text-gray-600 font-medium">Belleza Integral</span>
          </div>
        </button>

        {/* Menu desktop (ordered) */}
        <ul className="hidden lg:flex items-center gap-6 font-medium text-sm">
          {(() => {
            const navOrder = ['Inicio','Servicios','Galería','Equipo','Sobre nosotros','Contacto'];
            return navOrder.map((label) => {
              if (label === 'Servicios') {
                return (
                  <li key={label} className="relative" onMouseEnter={() => setServiciosOpen(true)} onMouseLeave={() => setServiciosOpen(false)}>
                    <button className="text-gray-700 hover:text-gray-900 transition-colors relative group cursor-pointer">
                      Servicios
                      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-gold transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    {serviciosOpen && (
                      <div className="absolute left-0 mt-3 w-96 bg-white rounded-xl shadow-lg border p-4 grid grid-cols-2 gap-3 z-50">
                        {servicios.slice(0,6).map((cat: any) => (
                          <div key={cat.categoria} className="flex items-start gap-3 p-3 bg-white rounded-lg hover:shadow-sm">
                            <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.2"/></svg>
                            <div className="flex-1">
                              <div className="font-semibold text-gray-800">{cat.categoria}</div>
                              <div className="text-sm text-gray-500 truncate">{cat.descripcion}</div>
                              <div className="mt-2">
                                <a href={`${siteData.reservas?.whatsapp?.url || header.quickInfo[1]?.url}&text=Hola%20Elena,%20quiero%20reservar%20un%20servicio%20de%20${encodeURIComponent(cat.categoria)}`} className="inline-block mt-1 text-sm bg-amber-500 text-white px-3 py-1 rounded-full shadow-sm">Reservar</a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              // map label to action
              const toAction = () => {
                switch(label) {
                  case 'Inicio': return () => scrollToSection('#inicio');
                  case 'Galería': return () => router.push('#galeria');
                  case 'Equipo': return () => router.push('/equipo');
                  case 'Sobre nosotros': return () => scrollToSection('#nosotros');
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

        {/* CTA and mobile button */}
        <div className="flex items-center gap-4">
          {/* Primary CTA */}
          <a
            href={siteData.reservas?.whatsapp?.url || header.cta.url}
            target="_blank"
            rel="noopener"
            className="hidden lg:inline-flex items-center justify-center text-white font-semibold px-5 py-2 rounded-full shadow-sm hover:scale-102 transition-transform duration-200 text-sm"
            style={{borderRadius: 9999, backgroundColor: '#111111'}}
            aria-label="Reservar cita"
          >
            Reservar cita
          </a>

          {/* WhatsApp quick action (replaces carrito) */}
          <a href={siteData.reservas?.whatsapp?.url || header.quickInfo[1]?.url} target="_blank" rel="noreferrer" className="hidden lg:inline-flex items-center gap-2 text-sm font-medium shadow-sm rounded-full px-2 py-1" aria-label="WhatsApp" style={{backgroundColor: '#ffffff', border: '2px solid #25D366', color: '#000'}}>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.48A11.86 11.86 0 0012 0C5.37 0 .05 5.37.05 12.02c0 2.11.55 4.08 1.52 5.84L0 24l6.44-1.7A11.92 11.92 0 0012 24c6.63 0 11.95-5.37 11.95-11.98 0-3.2-1.25-6.18-3.9-8.09z"/></svg>
            <span>WhatsApp</span>
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
      <div className={`lg:hidden bg-white border-t shadow-elegant transition-all duration-300 ${
        menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 py-4">
          {/* Collapsed top info as icons */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <a href={siteData.contacto?.mapa?.link} className="p-2 rounded-full hover:bg-gray-100" aria-label="Ubicación">📍</a>
              <a href="#" className="p-2 rounded-full hover:bg-gray-100" aria-label="Horario">⏰</a>
              <a href={siteData.reservas?.whatsapp?.url} className="p-2 rounded-full hover:bg-gray-100" aria-label="Llamar/WhatsApp">📞</a>
            </div>
            <a href={siteData.reservas?.whatsapp?.url} className="text-sm bg-green-500 text-white px-3 py-2 rounded-full">WhatsApp</a>
          </div>

          <div className="space-y-2">
            {header.menu.map((item: { text: string; anchor: string }) => (
              <button 
                key={item.text}
                onClick={() => { scrollToSection(item.anchor); setMenuOpen(false); }}
                className="block text-left w-full text-gray-700 hover:text-gray-900 font-medium py-3 border-b border-gray-100 transition-colors"
              >
                {item.text}
              </button>
            ))}

          </div>
        </div>
        {/* Floating reserve button for mobile */}
        <div className="fixed left-4 bottom-6 z-50">
          <a href={siteData.reservas?.whatsapp?.url} className="text-white px-4 py-3 rounded-full shadow-lg font-semibold" style={{backgroundColor: '#111111'}}>Reservar cita</a>
        </div>
        {/* WhatsApp quick floating icon */}
        <div className="fixed right-4 bottom-6 z-50">
          <a href={siteData.reservas?.whatsapp?.url} className="p-3 rounded-full shadow-lg" aria-label="WhatsApp" style={{backgroundColor: '#ffffff', border: '2px solid #25D366', color: '#000'}}>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg"><path d="M20.52 3.48A11.86 11.86 0 0012 0C5.37 0 .05 5.37.05 12.02c0 2.11.55 4.08 1.52 5.84L0 24l6.44-1.7A11.92 11.92 0 0012 24c6.63 0 11.95-5.37 11.95-11.98 0-3.2-1.25-6.18-3.9-8.09z"/></svg>
          </a>
        </div>
      </div>
    </header>
  );
}
