"use client";
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase-admin';
import { Save, CheckCircle, XCircle, AlertCircle, Settings, MapPin, Clock, Phone, MessageSquare, Instagram, Facebook, Globe } from 'lucide-react';

interface Configuracion {
  id: string;
  clave: string;
  valor: string;
  tipo: string;
  categoria: string;
  descripcion: string;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const categoriaIcons: Record<string, React.ReactNode> = {
  topbar: <Settings size={20} />,
  contacto: <Phone size={20} />,
  redes: <Instagram size={20} />,
  seo: <Globe size={20} />,
};

const categoriaLabels: Record<string, string> = {
  topbar: 'Barra Superior',
  contacto: 'Información de Contacto',
  redes: 'Redes Sociales',
  seo: 'SEO y Meta',
};

const claveIcons: Record<string, React.ReactNode> = {
  topbar_ubicacion: <MapPin size={16} />,
  topbar_horario: <Clock size={16} />,
  topbar_telefono: <Phone size={16} />,
  topbar_eslogan: <MessageSquare size={16} />,
  instagram_url: <Instagram size={16} />,
  facebook_url: <Facebook size={16} />,
};

export default function ConfiguracionPage() {
  const [configuraciones, setConfiguraciones] = useState<Configuracion[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [hasChanges, setHasChanges] = useState(false);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const fetchConfiguraciones = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('configuracion_sitio')
        .select('*')
        .order('categoria', { ascending: true })
        .order('clave', { ascending: true });

      if (error) throw error;
      setConfiguraciones(data || []);
      
      // Inicializar valores editados
      const values: Record<string, string> = {};
      data?.forEach(config => {
        values[config.clave] = config.valor || '';
      });
      setEditedValues(values);
    } catch (err) {
      console.error('Error fetching configuraciones:', err);
      showToast('Error al cargar la configuración', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchConfiguraciones();
  }, [fetchConfiguraciones]);

  const handleValueChange = (clave: string, valor: string) => {
    setEditedValues(prev => ({ ...prev, [clave]: valor }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Actualizar cada configuración que cambió
      const updates = configuraciones.map(async (config) => {
        if (editedValues[config.clave] !== config.valor) {
          const { error } = await supabase
            .from('configuracion_sitio')
            .update({ valor: editedValues[config.clave] })
            .eq('clave', config.clave);
          
          if (error) throw error;
        }
      });

      await Promise.all(updates);
      showToast('Configuración guardada correctamente', 'success');
      setHasChanges(false);
      fetchConfiguraciones();
    } catch (err) {
      console.error('Error saving configuraciones:', err);
      showToast('Error al guardar la configuración', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Agrupar configuraciones por categoría
  const configByCategoria = configuraciones.reduce((acc, config) => {
    if (!acc[config.categoria]) {
      acc[config.categoria] = [];
    }
    acc[config.categoria].push(config);
    return acc;
  }, {} as Record<string, Configuracion[]>);

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
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Configuración del Sitio</h1>
          <p className="text-sm text-gray-600 mt-1">Personaliza la información que se muestra en tu sitio web</p>
        </div>
        {hasChanges && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full md:w-auto px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-50"
          >
            <Save size={18} />
            <span>{saving ? 'Guardando...' : 'Guardar cambios'}</span>
          </button>
        )}
      </div>

      {/* Configuraciones por categoría */}
      {Object.entries(configByCategoria).map(([categoria, configs]) => (
        <div key={categoria} className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-fade-in">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center gap-3">
            <div className="text-[#008060]">
              {categoriaIcons[categoria] || <Settings size={20} />}
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              {categoriaLabels[categoria] || categoria}
            </h2>
          </div>
          
          <div className="p-6 space-y-4">
            {configs.map((config) => (
              <div key={config.id} className="space-y-2">
                <div className="flex items-center gap-2">
                  {claveIcons[config.clave] && (
                    <span className="text-gray-400">{claveIcons[config.clave]}</span>
                  )}
                  <label className="text-sm font-medium text-gray-900">
                    {config.descripcion || config.clave}
                  </label>
                </div>
                
                {config.tipo === 'boolean' ? (
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editedValues[config.clave] === 'true'}
                        onChange={(e) => handleValueChange(config.clave, e.target.checked ? 'true' : 'false')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#008060]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#008060]"></div>
                    </label>
                    <span className="text-sm text-gray-600">
                      {editedValues[config.clave] === 'true' ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                ) : config.clave.includes('descripcion') || config.clave.includes('mensaje') ? (
                  <textarea
                    value={editedValues[config.clave] || ''}
                    onChange={(e) => handleValueChange(config.clave, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                    rows={3}
                  />
                ) : (
                  <input
                    type={config.clave.includes('url') || config.clave.includes('email') ? 'url' : 'text'}
                    value={editedValues[config.clave] || ''}
                    onChange={(e) => handleValueChange(config.clave, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                    placeholder={config.descripcion}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Botón guardar fijo en móvil */}
      {hasChanges && (
        <div className="fixed bottom-4 left-4 right-4 md:hidden">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full px-4 py-3 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
          >
            <Save size={18} />
            <span>{saving ? 'Guardando...' : 'Guardar cambios'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
