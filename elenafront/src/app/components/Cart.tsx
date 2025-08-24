"use client";
import { useState } from 'react';

interface CartItem {
  categoria: string;
  servicio: string;
  precio: string;
  cantidad: number;
  id: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, cantidad: number) => void;
  onRemoveItem: (id: string) => void;
  onConfirmOrder: () => void;
}

export default function Cart({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onConfirmOrder 
}: CartProps) {
  const [customerData, setCustomerData] = useState({
    nombre: '',
    telefono: '',
    fecha: '',
    hora: ''
  });

  const calcularTotal = () => {
    return items.reduce((total, item) => {
      const precio = parseInt(item.precio.replace(/[^0-9]/g, '')) || 0;
      return total + (precio * item.cantidad);
    }, 0);
  };

  const handleConfirm = () => {
    if (!customerData.nombre || !customerData.telefono) {
      alert('Por favor, completa tu nombre y teléfono');
      return;
    }

    // Formatear el mensaje para WhatsApp
    let mensaje = `🌟 *NUEVA RESERVA - Elena Benítez Salón* 🌟\n\n`;
    mensaje += `👤 *Cliente:* ${customerData.nombre}\n`;
    mensaje += `📱 *Teléfono:* ${customerData.telefono}\n`;
    
    if (customerData.fecha) {
      mensaje += `📅 *Fecha preferida:* ${customerData.fecha}\n`;
    }
    if (customerData.hora) {
      mensaje += `⏰ *Hora preferida:* ${customerData.hora}\n`;
    }
    
    mensaje += `\n💅 *SERVICIOS SOLICITADOS:*\n`;
    mensaje += `${'─'.repeat(30)}\n`;
    
    items.forEach((item, index) => {
      mensaje += `${index + 1}. *${item.servicio}*\n`;
      mensaje += `   Categoría: ${item.categoria}\n`;
      mensaje += `   Cantidad: ${item.cantidad}\n`;
      mensaje += `   Precio: ₲${item.precio} c/u\n`;
      mensaje += `   Subtotal: ₲${(parseInt(item.precio.replace(/[^0-9]/g, '')) * item.cantidad).toLocaleString()}\n\n`;
    });
    
    mensaje += `${'─'.repeat(30)}\n`;
    mensaje += `💰 *TOTAL ESTIMADO: ₲${calcularTotal().toLocaleString()}*\n\n`;
    mensaje += `📝 *Nota:* Los precios son estimados. La cotización final se confirmará en la consulta.\n\n`;
    mensaje += `✨ ¡Gracias por elegir Elena Benítez Salón! ✨`;

    // Enviar a WhatsApp
    const whatsappURL = `https://wa.me/595991743889?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappURL, '_blank');

    // Limpiar carrito después de confirmar
    onConfirmOrder();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-gold p-6 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
              <h2 className="font-playfair text-2xl font-bold">
                Mi Carrito ({items.length})
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-500">
                Agrega servicios desde la página de servicios
              </p>
            </div>
          ) : (
            <>
              {/* Lista de servicios */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.servicio}</h4>
                      <p className="text-sm text-gray-600">{item.categoria}</p>
                      <p className="text-lg font-bold text-gray-900">₲{item.precio}</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.cantidad - 1))}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 13H5V11H19V13Z"/>
                          </svg>
                        </button>
                        <span className="w-8 text-center font-semibold">{item.cantidad}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.cantidad + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z"/>
                          </svg>
                        </button>
                      </div>
                      
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors ml-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total Estimado:</span>
                  <span className="text-2xl font-bold text-gray-900">₲{calcularTotal().toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  * Precio final sujeto a confirmación en consulta
                </p>
              </div>

              {/* Formulario de contacto */}
              <div className="space-y-4">
                <h3 className="font-playfair text-xl font-bold text-gray-900">
                  Datos para la reserva
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      value={customerData.nombre}
                      onChange={(e) => setCustomerData({...customerData, nombre: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      value={customerData.telefono}
                      onChange={(e) => setCustomerData({...customerData, telefono: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      placeholder="0981 234 567"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha preferida
                    </label>
                    <input
                      type="date"
                      value={customerData.fecha}
                      onChange={(e) => setCustomerData({...customerData, fecha: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora preferida
                    </label>
                    <select
                      value={customerData.hora}
                      onChange={(e) => setCustomerData({...customerData, hora: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option value="">Seleccionar hora</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer con botones */}
        {items.length > 0 && (
          <div className="bg-gray-50 p-6 border-t">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Seguir Agregando
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 bg-gradient-gold text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3zM12.1 18.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05z"/>
                </svg>
                Confirmar Reserva
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
