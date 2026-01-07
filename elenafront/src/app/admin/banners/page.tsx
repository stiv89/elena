"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase-admin';
import { Plus, Edit, Trash2, Bell, CheckCircle, XCircle, AlertCircle, Search, X } from 'lucide-react';

interface Banner {
  id: string;
  titulo?: string;
  mensaje?: string;
  enlace_url?: string;
  texto_boton?: string;
  activo: boolean;
  orden: number;
  fecha_inicio?: string;
  fecha_fin?: string;
  created_at: string;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    titulo: '',
    mensaje: '',
    enlace_url: '',
    texto_boton: '',
    activo: true,
    orden: 0,
    fecha_inicio: '',
    fecha_fin: ''
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const fetchBanners = useCallback(async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('banners')
        .select('*')
        .order('orden', { ascending: true });

      if (fetchError) throw fetchError;
      setBanners(data || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar banners';
      console.error('Error fetching banners:', err);
      setError(errorMessage);
      showToast('Error al cargar los banners', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const bannerData = {
        titulo: formData.titulo || null,
        mensaje: formData.mensaje || null,
        enlace_url: formData.enlace_url || null,
        texto_boton: formData.texto_boton || null,
        activo: formData.activo,
        orden: formData.orden || 0,
        fecha_inicio: formData.fecha_inicio || null,
        fecha_fin: formData.fecha_fin || null
      };

      if (editingBanner) {
        const { error: updateError } = await supabase
          .from('banners')
          .update(bannerData)
          .eq('id', editingBanner.id);

        if (updateError) throw updateError;
        showToast('Banner actualizado correctamente', 'success');
      } else {
        const { error: insertError } = await supabase
          .from('banners')
          .insert([bannerData]);

        if (insertError) throw insertError;
        showToast('Banner creado correctamente', 'success');
      }

      resetForm();
      fetchBanners();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar el banner';
      console.error('Error saving banner:', err);
      showToast(errorMessage, 'error');
    }
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      titulo: banner.titulo || '',
      mensaje: banner.mensaje || '',
      enlace_url: banner.enlace_url || '',
      texto_boton: banner.texto_boton || '',
      activo: banner.activo,
      orden: banner.orden || 0,
      fecha_inicio: banner.fecha_inicio ? banner.fecha_inicio.split('T')[0] : '',
      fecha_fin: banner.fecha_fin ? banner.fecha_fin.split('T')[0] : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string, titulo: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar el banner "${titulo || 'sin título'}"?`)) return;

    try {
      const { error: deleteError } = await supabase
        .from('banners')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      showToast('Banner eliminado correctamente', 'success');
      fetchBanners();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el banner';
      console.error('Error deleting banner:', err);
      showToast(errorMessage, 'error');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingBanner(null);
    setFormData({
      titulo: '',
      mensaje: '',
      enlace_url: '',
      texto_boton: '',
      activo: true,
      orden: 0,
      fecha_inicio: '',
      fecha_fin: ''
    });
  };

  // Filtrar banners
  const filteredBanners = useMemo(() => {
    const filtered = banners.filter((banner) => {
      return searchTerm === '' || 
        banner.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        banner.mensaje?.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    return filtered.sort((a, b) => a.orden - b.orden);
  }, [banners, searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#008060]"></div>
      </div>
    );
  }

  if (error && banners.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar los banners</h2>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchBanners}
            className="px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-colors"
          >
            Reintentar
          </button>
        </div>
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
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Banners</h1>
          <p className="text-sm text-gray-600 mt-1">Gestiona las barras de anuncio del sitio</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full md:w-auto px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <Plus size={18} />
          <span>Agregar banner</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por título o mensaje..."
            className="block w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingBanner ? 'Editar banner' : 'Nuevo banner'}
            </h2>
            <button
              onClick={resetForm}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cancelar
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Título
                </label>
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  placeholder="Ej: Promoción especial"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Orden
                </label>
                <input
                  type="number"
                  value={formData.orden}
                  onChange={(e) => setFormData({ ...formData, orden: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  min="0"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Mensaje
              </label>
              <textarea
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                rows={3}
                placeholder="Mensaje del banner"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  URL de enlace
                </label>
                <input
                  type="url"
                  value={formData.enlace_url}
                  onChange={(e) => setFormData({ ...formData, enlace_url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Texto del botón
                </label>
                <input
                  type="text"
                  value={formData.texto_boton}
                  onChange={(e) => setFormData({ ...formData, texto_boton: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  placeholder="Ej: Ver más"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Fecha inicio
                </label>
                <input
                  type="date"
                  value={formData.fecha_inicio}
                  onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Fecha fin
                </label>
                <input
                  type="date"
                  value={formData.fecha_fin}
                  onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                />
              </div>
            </div>
            <div className="flex items-center">
              <input
                id="activo"
                type="checkbox"
                checked={formData.activo}
                onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                className="h-4 w-4 text-[#008060] focus:ring-[#008060] border-gray-300 rounded"
              />
              <label htmlFor="activo" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                Banner activo
              </label>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-colors"
              >
                {editingBanner ? 'Guardar cambios' : 'Crear banner'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-fade-in">
        {banners.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-bounce" />
            <p className="text-sm text-gray-600">No hay banners todavía</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Agregar primer banner
            </button>
          </div>
        ) : filteredBanners.length === 0 ? (
          <div className="p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">No se encontraron banners</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200"
            >
              Limpiar búsqueda
            </button>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Título
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Mensaje
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBanners.map((banner, index) => (
                    <tr 
                      key={banner.id} 
                      className="hover:bg-gray-50 transition-all duration-200 animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">{banner.titulo || '-'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 line-clamp-2">{banner.mensaje || '-'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          banner.activo
                            ? 'bg-[#f0fdf4] text-[#008060]'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {banner.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleEdit(banner)}
                            className="text-gray-600 hover:text-[#008060] transition-colors p-1 rounded hover:bg-gray-100"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(banner.id, banner.titulo || '')}
                            className="text-gray-600 hover:text-red-600 transition-colors p-1 rounded hover:bg-gray-100"
                            title="Eliminar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredBanners.map((banner, index) => (
                <div
                  key={banner.id}
                  className="p-4 hover:bg-gray-50 transition-all duration-200 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {banner.titulo || 'Sin título'}
                      </h3>
                      {banner.mensaje && (
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                          {banner.mensaje}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() => handleEdit(banner)}
                        className="p-2 text-gray-600 hover:text-[#008060] hover:bg-gray-100 rounded transition-colors"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id, banner.titulo || '')}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      banner.activo
                        ? 'bg-[#f0fdf4] text-[#008060]'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {banner.activo ? 'Activo' : 'Inactivo'}
                    </span>
                    <span className="text-xs text-gray-500">Orden: {banner.orden}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}



