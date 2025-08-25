"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SvgIcon from "../components/SvgIcon";

interface CartItem {
  categoria: string;
  servicio: string;
  precio: string;
  cantidad: number;
  id: string;
}

export default function CarritoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Cargar carrito del localStorage
    const savedCart = localStorage.getItem('elenaCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('elenaCart', JSON.stringify(cartItems));
    }
  }, [cartItems, loading]);

  const updateQuantity = (id: string, cantidad: number) => {
    if (cantidad === 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, cantidad } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('elenaCart');
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseInt(item.precio) * item.cantidad);
    }, 0);
  };

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return;

    const orderDetails = cartItems.map(item => 
      `• ${item.servicio} (${item.categoria}) - Cantidad: ${item.cantidad} - ₲${parseInt(item.precio).toLocaleString()}`
    ).join('\n');

    const total = getTotal();
    const message = `Hola Elena, quiero reservar los siguientes servicios:\n\n${orderDetails}\n\nTotal: ₲${total.toLocaleString()}\n\n¡Gracias!`;
    
    const whatsappUrl = `https://wa.me/595991743889?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Limpiar carrito después de confirmar
    clearCart();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 py-20 px-4 container-with-margins">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-playfair text-4xl font-bold text-gray-900 mb-2">
                Mi Carrito
              </h1>
              <p className="text-gray-600">
                {cartItems.length} {cartItems.length === 1 ? 'servicio' : 'servicios'} en tu carrito
              </p>
            </div>
            
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-6">
                <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"/>
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h2>
              <p className="text-gray-600 mb-8">Explora nuestros servicios y agrega los que más te gusten</p>
              <button
                onClick={() => router.push('/servicios')}
                className="bg-gradient-gold text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Ver Servicios
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Lista de servicios */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-3xl shadow-elegant p-6">
                  <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
                    Servicios Seleccionados
                  </h2>
                  
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:shadow-md transition-shadow">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.servicio}</h3>
                          <p className="text-sm text-gray-600">{item.categoria}</p>
                          <p className="text-lg font-bold text-gray-900 mt-1">₲{parseInt(item.precio).toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          {/* Controles de cantidad */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            
                            <span className="w-8 text-center font-semibold">{item.cantidad}</span>
                            
                            <button
                              onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Botón eliminar */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 p-2 transition-colors"
                            title="Eliminar servicio"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between items-center">
                    <button
                      onClick={clearCart}
                      className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                    >
                      Vaciar Carrito
                    </button>
                    
                    <button
                      onClick={() => router.push('/servicios')}
                      className="text-gray-600 hover:text-gray-900 font-semibold transition-colors"
                    >
                      Agregar más servicios
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Resumen y checkout */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-3xl shadow-elegant p-6 sticky top-24">
                  <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-6">
                    Resumen
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.servicio} x{item.cantidad}
                        </span>
                        <span className="font-semibold">
                          ₲{(parseInt(item.precio) * item.cantidad).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span>₲{getTotal().toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleConfirmOrder}
                    className="w-full bg-gradient-gold text-white py-4 rounded-full font-semibold shadow-elegant hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <SvgIcon type="whatsapp" className="w-5 h-5" />
                    Confirmar por WhatsApp
                  </button>
                  
                  <div className="mt-4 text-xs text-gray-500 text-center">
                    Al confirmar serás redirigido a WhatsApp para coordinar tu cita
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
