"use client";
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase-admin';
import { Save, Plus, Edit, Trash2, FileText, CheckCircle, XCircle, AlertCircle, Link as LinkIcon } from 'lucide-react';

interface Footer {
  id: string;
  nombre?: string;
  subtitulo?: string;
  frase?: string;
  texto_copyright?: string;
  texto_creditos?: string;
  created_at: string;
  updated_at: string;
}

interface FooterLink {
  id: string;
  texto: string;
  url: string;
  tipo: string;
  orden: number;
  activo: boolean;
  created_at: string;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function FooterPage() {
  const [footer, setFooter] = useState<Footer | null>(null);
  const [links, setLinks] = useState<FooterLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [editingLink, setEditingLink] = useState<FooterLink | null>(null);
  const [footerFormData, setFooterFormData] = useState({
    nombre: '',
    subtitulo: '',
    frase: '',
    texto_copyright: '',
    texto_creditos: ''
  });
  const [linkFormData, setLinkFormData] = useState({
    texto: '',
    url: '',
    tipo: 'quick',
    activo: true,
    orden: 0
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      // Fetch footer
      const { data: footerData, error: footerError } = await supabase
        .from('footer')
        .select('*')
        .limit(1)
        .single();

      if (footerError && footerError.code !== 'PGRST116') throw footerError;
      
      if (footerData) {
        setFooter(footerData);
        setFooterFormData({
          nombre: footerData.nombre || '',
          subtitulo: footerData.subtitulo || '',
          frase: footerData.frase || '',
          texto_copyright: footerData.texto_copyright || '',
          texto_creditos: footerData.texto_creditos || ''
        });
      }

      // Fetch links
      const { data: linksData, error: linksError } = await supabase
        .from('footer_links')
        .select('*')
        .order('orden', { ascending: true });

      if (linksError) throw linksError;
      setLinks(linksData || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error fetching footer data:', err);
      showToast('Error al cargar los datos del footer', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const footerData = {
        nombre: footerFormData.nombre || null,
        subtitulo: footerFormData.subtitulo || null,
        frase: footerFormData.frase || null,
        texto_copyright: footerFormData.texto_copyright || null,
        texto_creditos: footerFormData.texto_creditos || null
      };

      if (footer) {
        const { error: updateError } = await supabase
          .from('footer')
          .update(footerData)
          .eq('id', footer.id);

        if (updateError) throw updateError;
        showToast('Footer actualizado correctamente', 'success');
      } else {
        const { error: insertError } = await supabase
          .from('footer')
          .insert([footerData]);

        if (insertError) throw insertError;
        showToast('Footer creado correctamente', 'success');
      }

      fetchData();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar';
      console.error('Error saving footer:', err);
      showToast(errorMessage, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingLink) {
        const { error: updateError } = await supabase
          .from('footer_links')
          .update({
            texto: linkFormData.texto,
            url: linkFormData.url,
            tipo: linkFormData.tipo,
            activo: linkFormData.activo,
            orden: linkFormData.orden
          })
          .eq('id', editingLink.id);

        if (updateError) throw updateError;
        showToast('Link actualizado correctamente', 'success');
      } else {
        const { error: insertError } = await supabase
          .from('footer_links')
          .insert([{
            texto: linkFormData.texto,
            url: linkFormData.url,
            tipo: linkFormData.tipo,
            activo: linkFormData.activo,
            orden: linkFormData.orden
          }]);

        if (insertError) throw insertError;
        showToast('Link creado correctamente', 'success');
      }

      resetLinkForm();
      fetchData();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar el link';
      console.error('Error saving link:', err);
      showToast(errorMessage, 'error');
    }
  };

  const handleEditLink = (link: FooterLink) => {
    setEditingLink(link);
    setLinkFormData({
      texto: link.texto,
      url: link.url,
      tipo: link.tipo,
      activo: link.activo,
      orden: link.orden
    });
    setShowLinkForm(true);
  };

  const handleDeleteLink = async (id: string, texto: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar el link "${texto}"?`)) return;

    try {
      const { error: deleteError } = await supabase
        .from('footer_links')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      showToast('Link eliminado correctamente', 'success');
      fetchData();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar';
      console.error('Error deleting link:', err);
      showToast(errorMessage, 'error');
    }
  };

  const resetLinkForm = () => {
    setShowLinkForm(false);
    setEditingLink(null);
    setLinkFormData({
      texto: '',
      url: '',
      tipo: 'quick',
      activo: true,
      orden: links.length
    });
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
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Footer</h1>
        <p className="text-sm text-gray-600 mt-1">Gestiona los textos y links del footer</p>
      </div>

      {/* Footer Text Form */}
      <form onSubmit={handleFooterSubmit} className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 space-y-5 animate-fade-in">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Textos del Footer</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={footerFormData.nombre}
              onChange={(e) => setFooterFormData({ ...footerFormData, nombre: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
              placeholder="Ej: Elena Benítez"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Subtítulo
            </label>
            <input
              type="text"
              value={footerFormData.subtitulo}
              onChange={(e) => setFooterFormData({ ...footerFormData, subtitulo: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
              placeholder="Ej: Belleza Integral"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Frase
          </label>
          <input
            type="text"
            value={footerFormData.frase}
            onChange={(e) => setFooterFormData({ ...footerFormData, frase: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
            placeholder="Ej: Cuidamos tu belleza cada día."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Texto de Copyright
          </label>
          <input
            type="text"
            value={footerFormData.texto_copyright}
            onChange={(e) => setFooterFormData({ ...footerFormData, texto_copyright: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
            placeholder="© 2025 Elena Benítez. Todos los derechos reservados."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Texto de Créditos
          </label>
          <input
            type="text"
            value={footerFormData.texto_creditos}
            onChange={(e) => setFooterFormData({ ...footerFormData, texto_creditos: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
            placeholder="Diseño web por Digita Paraguay."
          />
        </div>
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save size={18} />
            {saving ? 'Guardando...' : 'Guardar textos'}
          </button>
        </div>
      </form>

      {/* Links Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Links del Footer</h2>
          <button
            onClick={() => setShowLinkForm(true)}
            className="px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Agregar link
          </button>
        </div>

        {/* Link Form */}
        {showLinkForm && (
          <form onSubmit={handleLinkSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Texto *
                </label>
                <input
                  type="text"
                  value={linkFormData.texto}
                  onChange={(e) => setLinkFormData({ ...linkFormData, texto: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  URL *
                </label>
                <input
                  type="text"
                  value={linkFormData.url}
                  onChange={(e) => setLinkFormData({ ...linkFormData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  required
                  placeholder="#inicio o https://..."
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Tipo
                </label>
                <select
                  value={linkFormData.tipo}
                  onChange={(e) => setLinkFormData({ ...linkFormData, tipo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                >
                  <option value="quick">Enlaces rápidos</option>
                  <option value="social">Redes sociales</option>
                  <option value="legal">Legal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Orden
                </label>
                <input
                  type="number"
                  value={linkFormData.orden}
                  onChange={(e) => setLinkFormData({ ...linkFormData, orden: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  min="0"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={linkFormData.activo}
                    onChange={(e) => setLinkFormData({ ...linkFormData, activo: e.target.checked })}
                    className="h-4 w-4 text-[#008060] focus:ring-[#008060] border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Activo</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-colors"
              >
                {editingLink ? 'Guardar cambios' : 'Crear link'}
              </button>
              <button
                type="button"
                onClick={resetLinkForm}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Links List */}
        {links.length === 0 ? (
          <div className="p-8 text-center">
            <LinkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600">No hay links todavía</p>
          </div>
        ) : (
          <div className="space-y-2">
            {links.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900">{link.texto}</span>
                    <span className="text-xs text-gray-500">{link.url}</span>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {link.tipo}
                    </span>
                    {!link.activo && (
                      <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded">
                        Inactivo
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditLink(link)}
                    className="text-gray-600 hover:text-[#008060] transition-colors p-1"
                    title="Editar"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteLink(link.id, link.texto)}
                    className="text-gray-600 hover:text-red-600 transition-colors p-1"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


