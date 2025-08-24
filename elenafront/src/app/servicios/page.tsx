"use client";
import { useState, useRef } from "react";
import siteData from "../siteData.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServiceIcon from "../components/ServiceIcon";
import WhatsAppFloat from "../components/WhatsAppFloat";
import Cart from "../components/Cart";

interface CartItem {
  categoria: string;
  servicio: string;
  precio: string;
  cantidad: number;
  id: string;
}

export default function Servicios() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const categoriaRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  const addToCart = (categoria: string, servicio: string, precio: string) => {
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
    const toast = document.createElement('div');
    toast.className = 'fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fadein';
    toast.textContent = '✓ Servicio agregado al carrito';
    document.body.appendChild(toast);
    
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* WhatsApp Float */}
      {siteData.whatsapp.enabled && (
        <WhatsAppFloat 
          number={siteData.whatsapp.number}
          message={siteData.whatsapp.message}
        />
      )}

      {/* Carrito flotante */}
      <div className="fixed bottom-32 left-6 z-30">
        <button
          onClick={() => setIsCartOpen(true)}
          className="bg-gradient-gold text-white w-16 h-16 rounded-full shadow-elegant flex items-center justify-center transition-all duration-300 hover:scale-110 relative"
          title={`Ver carrito (${cartItems.length})`}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
          </svg>
          {cartItems.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              {cartItems.length}
            </div>
          )}
        </button>
      </div>

      {/* Modal del carrito */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onConfirmOrder={clearCart}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 to-amber-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Botón volver */}
          <div className="mb-6">
            <a 
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Volver al inicio</span>
            </a>
          </div>
          
          <h1 className="font-playfair text-5xl font-bold text-gray-900 mb-6">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Descubre nuestra amplia gama de servicios de belleza, diseñados para realzar tu belleza natural con técnicas profesionales y productos de calidad premium.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-white px-4 py-2 rounded-full shadow-elegant">
              <span className="text-sm font-medium text-gray-700">+{siteData.servicios.length} Categorías</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-elegant">
              <span className="text-sm font-medium text-gray-700">Técnicas Profesionales</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-elegant">
              <span className="text-sm font-medium text-gray-700">Productos Premium</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navegación rápida por categorías */}
      <section className="sticky top-20 bg-white/95 backdrop-blur-md z-40 border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {siteData.servicios.map((categoria) => (
              <button
                key={categoria.categoria}
                onClick={() => scrollToCategory(categoria.categoria)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === categoria.categoria
                    ? "bg-gradient-gold text-white shadow-lg scale-105"
                    : "bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-gray-900"
                }`}
              >
                <ServiceIcon type={categoria.icon} className="w-4 h-4" />
                <span className="text-sm">{categoria.categoria}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <main className="flex-1 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Botón scroll to top */}
          <div className="fixed bottom-32 right-6 z-30">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 w-12 h-12 rounded-full shadow-elegant flex items-center justify-center transition-all duration-300 hover:scale-110"
              title="Volver arriba"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className={`mb-20 animate-fadein transition-all duration-500 ${
                selectedCategory === categoria.categoria 
                  ? "ring-4 ring-yellow-400 ring-opacity-50 rounded-3xl p-6 bg-yellow-50" 
                  : ""
              }`}
              style={{ animationDelay: `${idx * 0.1}s` }}
              id={`categoria-${categoria.categoria.replace(/\s+/g, '-').toLowerCase()}`}
            >
              {/* Header de la categoría */}
              <div className="text-center mb-12">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-elegant" 
                       style={{ backgroundColor: categoria.color }}>
                    <ServiceIcon type={categoria.icon} className="w-10 h-10 text-gray-600" />
                  </div>
                </div>
                <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
                  {categoria.categoria}
                  <span className="ml-3 text-lg font-normal text-gray-500">
                    ({categoria.servicios.length} servicios)
                  </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  {categoria.descripcion}
                </p>
              </div>

              {/* Grid de servicios */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {categoria.servicios.map((servicio, i) => (
                  <div 
                    key={servicio.nombre}
                    className="bg-white rounded-2xl shadow-elegant p-6 card-hover border-2 border-gray-100 hover:border-gray-200 transition-all duration-300"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="text-center">
                      <h4 className="font-semibold text-lg text-gray-900 mb-2 leading-tight">
                        {servicio.nombre}
                      </h4>
                      
                      <div className="mb-3">
                        <span className="text-2xl font-bold text-gray-900">₲{servicio.precio}</span>
                        {servicio.nombre.includes("desde") || categoria.servicios.some(s => s.precio.includes("desde")) ? (
                          <span className="text-sm text-gray-500 ml-1">desde</span>
                        ) : null}
                      </div>

                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {servicio.descripcion}
                      </p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(categoria.categoria, servicio.nombre, servicio.precio)}
                          className="flex-1 bg-gradient-gold text-white font-semibold py-2 px-4 rounded-full hover:shadow-lg transition-all duration-300 text-sm flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 7H18V6C18 3.79 16.21 2 14 2H10C7.79 2 6 3.79 6 6V7H5C3.9 7 3 7.9 3 9V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9C21 7.9 20.1 7 19 7ZM10 4H14C15.1 4 16 4.9 16 6V7H8V6C8 4.9 8.9 4 10 4ZM19 19H5V9H19V19ZM12 12C10.9 12 10 12.9 10 14C10 15.1 10.9 16 12 16C13.1 16 14 15.1 14 14C14 12.9 13.1 12 12 12Z"/>
                          </svg>
                          Agregar
                        </button>
                        
                        <a 
                          href={`https://wa.me/595991743889?text=Hola Elena, quiero consultar sobre ${encodeURIComponent(servicio.nombre)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-3 rounded-full transition-all duration-300 text-sm flex items-center justify-center"
                          title="Consultar por WhatsApp"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.386"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Observaciones */}
              {categoria.obs && (
                <div className="bg-gray-50 rounded-2xl p-6 border-l-4 border-yellow-400">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Información Importante</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
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
      <section className="bg-gradient-rose py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
            ¿Lista para tu transformación?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Reserva tu cita y déjanos cuidar tu belleza con la profesionalidad y calidez que nos caracteriza.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`https://wa.me/${siteData.whatsapp.number}?text=${encodeURIComponent(siteData.whatsapp.message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-full shadow-elegant transition-all duration-300 transform hover:scale-105"
            >
              💬 Reservar por WhatsApp
            </a>
            <a 
              href="tel:+595981234567"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-full shadow-elegant transition-all duration-300 transform hover:scale-105"
            >
              📞 Llamar Ahora
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
