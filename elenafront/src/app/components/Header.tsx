"use client";
import Image from "next/image";
import siteData from "../siteData.json";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import SvgIcon from "./SvgIcon";

interface CartItem {
  categoria: string;
  servicio: string;
  precio: string;
  cantidad: number;
  id: string;
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();
  const header = siteData.header;

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

  const updateCartQuantity = (id: string, cantidad: number) => {
    if (cantidad === 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, cantidad } : item
    ));
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
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

  // Exponer las funciones del carrito globalmente
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).addToCart = addToCart;
  }, [addToCart]);
  
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
        <button 
          onClick={() => scrollToSection('#inicio')}
          className="flex items-center gap-3 cursor-pointer group transition-all duration-300 hover:scale-105"
        >
          {header.logo ? (
            <Image src={header.logo} alt="Elena Benítez Logo" width={50} height={50} className="rounded-full group-hover:shadow-lg transition-shadow duration-300" />
          ) : (
            <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
              <span className="text-white font-bold text-xl">E</span>
            </div>
          )}
          <div className="flex flex-col text-left">
            <span className="font-playfair text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300">{header.name}</span>
            <span className="text-sm text-gray-600 font-medium">{header.subtitle}</span>
          </div>
        </button>

        {/* Menu desktop */}
        <ul className="hidden lg:flex items-center gap-8 font-medium">
          {header.menu.map((item: { text: string; anchor: string }) => (
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
          {/* Botón del carrito */}
          <button
            onClick={() => router.push('/carrito')}
            className="relative bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-full transition-all duration-300 hover:scale-105"
            title={`Ver carrito (${cartItems.length})`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            {cartItems.length > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-bounce">
                {cartItems.length}
              </div>
            )}
          </button>

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
          {header.menu.map((item: { text: string; anchor: string }) => (
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
            {header.quickInfo.map((info: { icon: string; text: string; url?: string }, i: number) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                <SvgIcon type={info.icon} className="w-5 h-5" />
                {info.url ? (
                  <a href={info.url} className="hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer">
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
