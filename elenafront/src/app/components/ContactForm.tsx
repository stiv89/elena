"use client";
import { useState } from "react";

interface ContactFormProps {
  whatsappNumber: string;
  servicios?: Array<{
    categoria: string;
    servicios: Array<{ nombre: string; precio: string }>;
  }>;
}

export default function ContactForm({ whatsappNumber, servicios = [] }: ContactFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    servicio: '',
    fecha: '',
    mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construir mensaje para WhatsApp
    let message = `Hola Elena! Quiero reservar una cita:\n\n`;
    message += `👤 Nombre: ${formData.nombre}\n`;
    message += `📞 Teléfono: ${formData.telefono}\n`;
    message += `💄 Servicio: ${formData.servicio}\n`;
    
    if (formData.fecha) {
      message += `📅 Fecha preferida: ${formData.fecha}\n`;
    }
    
    if (formData.mensaje) {
      message += `💬 Mensaje: ${formData.mensaje}\n`;
    }

    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Limpiar formulario
    setFormData({
      nombre: '',
      telefono: '',
      servicio: '',
      fecha: '',
      mensaje: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          name="nombre"
          placeholder="Tu nombre completo *"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
          required
        />
      </div>
      
      <div>
        <input
          type="tel"
          name="telefono"
          placeholder="Tu número de teléfono *"
          value={formData.telefono}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
          required
        />
      </div>
      
      <div>
        {servicios.length > 0 ? (
          <select
            name="servicio"
            value={formData.servicio}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
            required
          >
            <option value="">Selecciona un servicio *</option>
            {servicios.map((categoria) => (
              <optgroup key={categoria.categoria} label={categoria.categoria}>
                {categoria.servicios.map((servicio) => (
                  <option key={servicio.nombre} value={`${servicio.nombre} (₲${servicio.precio})`}>
                    {servicio.nombre} - ₲{servicio.precio}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        ) : (
          <input
            type="text"
            name="servicio"
            placeholder="¿Qué servicio te interesa? *"
            value={formData.servicio}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
            required
          />
        )}
      </div>
      
      <div>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
        />
      </div>
      
      <div>
        <textarea
          name="mensaje"
          placeholder="Mensaje adicional (opcional)"
          value={formData.mensaje}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
          rows={3}
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-gradient-gold text-white font-semibold py-4 px-8 rounded-full shadow-elegant hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
      >
        Enviar por WhatsApp
      </button>
      
      <p className="text-xs text-gray-500 text-center">
        * Campos obligatorios. Al enviar, serás redirigido a WhatsApp.
      </p>
    </form>
  );
}
