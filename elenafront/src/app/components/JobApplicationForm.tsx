"use client";
import { useState } from "react";

interface JobApplicationFormProps {
  whatsappNumber: string;
}

export default function JobApplicationForm({ whatsappNumber }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    puesto: '',
    cv: '',
    linkedin: '',
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
    let message = `Hola Elena! Quiero unirme al equipo:\n\n`;
    message += `👤 Nombre: ${formData.nombre}\n`;
    message += `📞 Teléfono: ${formData.telefono}\n`;
    
    if (formData.email) {
      message += `📧 Email: ${formData.email}\n`;
    }
    
    if (formData.puesto) {
      message += `💼 Puesto: ${formData.puesto}\n`;
    }
    
    if (formData.cv) {
      message += `📄 CV: ${formData.cv}\n`;
    }
    
    if (formData.linkedin) {
      message += `🔗 LinkedIn: ${formData.linkedin}\n`;
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
      email: '',
      puesto: '',
      cv: '',
      linkedin: '',
      mensaje: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="nombre"
            placeholder="Tu nombre completo *"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
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
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
      </div>
      
      <div>
        <input
          type="email"
          name="email"
          placeholder="Tu email (opcional)"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
        />
      </div>
      
      <div>
        <input
          type="text"
          name="puesto"
          placeholder="Puesto al que aplicás (opcional)"
          value={formData.puesto}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
        />
      </div>
      
      <div>
        <input
          type="url"
          name="cv"
          placeholder="Enlace a tu CV (opcional)"
          value={formData.cv}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
        />
      </div>
      
      <div>
        <input
          type="url"
          name="linkedin"
          placeholder="Enlace a tu perfil de LinkedIn (opcional)"
          value={formData.linkedin}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
        />
      </div>
      
      <div>
        <textarea
          name="mensaje"
          placeholder="Cuéntanos sobre tu experiencia y por qué querés unirte al equipo (opcional)"
          value={formData.mensaje}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all"
          rows={4}
        />
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-amber-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-amber-700 transition-all duration-300 transform hover:scale-[1.02]"
      >
        Enviar aplicación por WhatsApp
      </button>
      
      <p className="text-xs text-gray-500 text-center">
        * Campos obligatorios. Al enviar, serás redirigido a WhatsApp con tu información.
      </p>
    </form>
  );
}
