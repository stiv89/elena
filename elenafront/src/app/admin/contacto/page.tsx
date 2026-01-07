"use client";
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase-admin';
import { Save, CheckCircle, XCircle, AlertCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface Contacto {
  id: string;
  direccion_completa?: string;
  direccion_corta?: string;
  telefono?: string;
  whatsapp?: string;
  email?: string;
  instagram_url?: string;
  facebook_url?: string;
  tiktok_url?: string;
  mapa_url?: string;
  mapa_embed?: string;
  horario_lunes?: string;
  horario_martes?: string;
  horario_miercoles?: string;
  horario_jueves?: string;
  horario_viernes?: string;
  horario_sabado?: string;
  horario_domingo?: string;
  latitud?: number;
  longitud?: number;
  created_at: string;
  updated_at: string;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function ContactoPage() {
  const [contacto, setContacto] = useState<Contacto | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [formData, setFormData] = useState({
    direccion_completa: '',
    direccion_corta: '',
    telefono: '',
    whatsapp: '',
    email: '',
    instagram_url: '',
    facebook_url: '',
    tiktok_url: '',
    mapa_url: '',
    mapa_embed: '',
    horario_lunes: '',
    horario_martes: '',
    horario_miercoles: '',
    horario_jueves: '',
    horario_viernes: '',
    horario_sabado: '',
    horario_domingo: '',
    latitud: '',
    longitud: ''
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const fetchContacto = useCallback(async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('contacto')
        .select('*')
        .limit(1)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;
      
      if (data) {
        setContacto(data);
        setFormData({
          direccion_completa: data.direccion_completa || '',
          direccion_corta: data.direccion_corta || '',
          telefono: data.telefono || '',
          whatsapp: data.whatsapp || '',
          email: data.email || '',
          instagram_url: data.instagram_url || '',
          facebook_url: data.facebook_url || '',
          tiktok_url: data.tiktok_url || '',
          mapa_url: data.mapa_url || '',
          mapa_embed: data.mapa_embed || '',
          horario_lunes: data.horario_lunes || '',
          horario_martes: data.horario_martes || '',
          horario_miercoles: data.horario_miercoles || '',
          horario_jueves: data.horario_jueves || '',
          horario_viernes: data.horario_viernes || '',
          horario_sabado: data.horario_sabado || '',
          horario_domingo: data.horario_domingo || '',
          latitud: data.latitud?.toString() || '',
          longitud: data.longitud?.toString() || ''
        });
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar contacto';
      console.error('Error fetching contacto:', err);
      showToast('Error al cargar la información de contacto', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchContacto();
  }, [fetchContacto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const contactoData = {
        direccion_completa: formData.direccion_completa || null,
        direccion_corta: formData.direccion_corta || null,
        telefono: formData.telefono || null,
        whatsapp: formData.whatsapp || null,
        email: formData.email || null,
        instagram_url: formData.instagram_url || null,
        facebook_url: formData.facebook_url || null,
        tiktok_url: formData.tiktok_url || null,
        mapa_url: formData.mapa_url || null,
        mapa_embed: formData.mapa_embed || null,
        horario_lunes: formData.horario_lunes || null,
        horario_martes: formData.horario_martes || null,
        horario_miercoles: formData.horario_miercoles || null,
        horario_jueves: formData.horario_jueves || null,
        horario_viernes: formData.horario_viernes || null,
        horario_sabado: formData.horario_sabado || null,
        horario_domingo: formData.horario_domingo || null,
        latitud: formData.latitud ? parseFloat(formData.latitud) : null,
        longitud: formData.longitud ? parseFloat(formData.longitud) : null
      };

      if (contacto) {
        const { error: updateError } = await supabase
          .from('contacto')
          .update(contactoData)
          .eq('id', contacto.id);

        if (updateError) throw updateError;
        showToast('Información de contacto actualizada correctamente', 'success');
      } else {
        const { error: insertError } = await supabase
          .from('contacto')
          .insert([contactoData]);

        if (insertError) throw insertError;
        showToast('Información de contacto creada correctamente', 'success');
      }

      fetchContacto();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar la información';
      console.error('Error saving contacto:', err);
      showToast(errorMessage, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#008060]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium min-w-[300px] animate-slide-in-right ${
              toast.type === 'success'
                ? 'bg-[#f0fdf4] border border-[#008060] text-[#008060]'
                : toast.type === 'error'
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-blue-50 border border-blue-200 text-blue-700'
            }`}
          >
            {toast.type === 'success' && <CheckCircle size={20} />}
            {toast.type === 'error' && <XCircle size={20} />}
            {toast.type === 'info' && <AlertCircle size={20} />}
            <span>{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Contacto y Ubicación</h1>
        <p className="text-sm text-gray-600 mt-1">Gestiona la información de contacto y ubicación del salón</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 space-y-6 animate-fade-in">
        {/* Información básica */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-[#008060]" />
            Ubicación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Dirección completa
              </label>
              <input
                type="text"
                value={formData.direccion_completa}
                onChange={(e) => setFormData({ ...formData, direccion_completa: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                placeholder="Ej: Luque, c/ Sportivo Luqueño y Moisés Bertoni, CP 110930"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Dirección corta
              </label>
              <input
                type="text"
                value={formData.direccion_corta}
                onChange={(e) => setFormData({ ...formData, direccion_corta: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                placeholder="Ej: Luque"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Latitud
              </label>
              <input
                type="number"
                step="any"
                value={formData.latitud}
                onChange={(e) => setFormData({ ...formData, latitud: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                placeholder="-25.2677"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Longitud
              </label>
              <input
                type="number"
                step="any"
                value={formData.longitud}
                onChange={(e) => setFormData({ ...formData, longitud: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                placeholder="-57.4847"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              URL de Google Maps
            </label>
            <input
              type="url"
              value={formData.mapa_url}
              onChange={(e) => setFormData({ ...formData, mapa_url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
              placeholder="https://maps.app.goo.gl/..."
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Código embed de Google Maps (iframe)
            </label>
            <textarea
              value={formData.mapa_embed}
              onChange={(e) => setFormData({ ...formData, mapa_embed: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
              rows={3}
              placeholder='<iframe src="..."></iframe>'
            />
          </div>
        </div>

        {/* Contacto */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Phone size={20} className="text-[#008060]" />
            Información de Contacto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                placeholder="+595 991 743889"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                WhatsApp
              </label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                placeholder="+595 991 743889"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                placeholder="contacto@elenabenitez.com"
              />
            </div>
          </div>
        </div>

        {/* Redes sociales */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Mail size={20} className="text-[#008060]" />
            Redes Sociales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.instagram_url}
                onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Facebook URL
              </label>
              <input
                type="url"
                value={formData.facebook_url}
                onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                TikTok URL
              </label>
              <input
                type="url"
                value={formData.tiktok_url}
                onChange={(e) => setFormData({ ...formData, tiktok_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                placeholder="https://tiktok.com/@..."
              />
            </div>
          </div>
        </div>

        {/* Horarios */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={20} className="text-[#008060]" />
            Horarios de Atención
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].map((dia) => (
              <div key={dia}>
                <label className="block text-sm font-medium text-gray-900 mb-2 capitalize">
                  {dia === 'miercoles' ? 'Miércoles' : dia === 'sabado' ? 'Sábado' : dia.charAt(0).toUpperCase() + dia.slice(1)}
                </label>
                <input
                  type="text"
                  value={formData[`horario_${dia}` as keyof typeof formData] as string}
                  onChange={(e) => {
                    const newData = { ...formData };
                    (newData as Record<string, string>)[`horario_${dia}`] = e.target.value;
                    setFormData(newData);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  placeholder="Ej: 8:00 - 18:00 o Cerrado"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save size={18} />
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}



