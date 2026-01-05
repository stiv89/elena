"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase-admin';
import { Plus, Edit, Trash2, Image as ImageIcon, CheckCircle, XCircle, AlertCircle, Search, X, Upload } from 'lucide-react';

interface GaleriaItem {
  id: string;
  nombre: string;
  descripcion?: string;
  imagen_url: string;
  categoria?: string;
  orden: number;
  activo: boolean;
  created_at: string;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function GaleriaPage() {
  const [galeria, setGaleria] = useState<GaleriaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GaleriaItem | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('all');
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen_url: '',
    categoria: '',
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

  const fetchGaleria = useCallback(async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('galeria')
        .select('*')
        .order('orden', { ascending: true });

      if (fetchError) throw fetchError;
      setGaleria(data || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar galería';
      console.error('Error fetching galeria:', err);
      setError(errorMessage);
      showToast('Error al cargar la galería', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchGaleria();
  }, [fetchGaleria]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      showToast('Subiendo imagen...', 'info');

      // Crear nombre único para el archivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `galeria/${fileName}`;

      // Subir archivo a Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from('galeria')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      // Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('galeria')
        .getPublicUrl(filePath);

      setFormData({ ...formData, imagen_url: publicUrl });
      setUploading(false);
      showToast('Imagen subida correctamente', 'success');
    } catch (err: unknown) {
      setUploading(false);
      const errorMessage = err instanceof Error ? err.message : 'Error al subir la imagen';
      console.error('Error uploading file:', err);
      showToast(errorMessage, 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imagen_url) {
      showToast('Debes subir una imagen', 'error');
      return;
    }

    try {
      const itemData = {
        nombre: formData.nombre,
        descripcion: formData.descripcion || null,
        imagen_url: formData.imagen_url,
        categoria: formData.categoria || null,
        activo: formData.activo,
        orden: formData.orden || 0
      };

      if (editingItem) {
        const { error: updateError } = await supabase
          .from('galeria')
          .update(itemData)
          .eq('id', editingItem.id);

        if (updateError) throw updateError;
        showToast('Imagen actualizada correctamente', 'success');
      } else {
        const { error: insertError } = await supabase
          .from('galeria')
          .insert([itemData]);

        if (insertError) throw insertError;
        showToast('Imagen agregada correctamente', 'success');
      }

      resetForm();
      fetchGaleria();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar la imagen';
      console.error('Error saving galeria item:', err);
      showToast(errorMessage, 'error');
    }
  };

  const handleEdit = (item: GaleriaItem) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre,
      descripcion: item.descripcion || '',
      imagen_url: item.imagen_url,
      categoria: item.categoria || '',
      activo: item.activo,
      orden: item.orden || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar "${nombre}"?`)) return;

    try {
      const { error: deleteError } = await supabase
        .from('galeria')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      showToast('Imagen eliminada correctamente', 'success');
      fetchGaleria();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar la imagen';
      console.error('Error deleting galeria item:', err);
      showToast(errorMessage, 'error');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      nombre: '',
      descripcion: '',
      imagen_url: '',
      categoria: '',
      activo: true,
      orden: 0
    });
  };

  // Obtener categorías únicas
  const categorias = useMemo(() => {
    const cats = galeria
      .map(item => item.categoria)
      .filter((cat): cat is string => !!cat);
    return Array.from(new Set(cats)).sort();
  }, [galeria]);

  // Filtrar galería
  const filteredGaleria = useMemo(() => {
    const filtered = galeria.filter((item) => {
      const matchesSearch = searchTerm === '' || 
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategoria = selectedCategoria === 'all' || item.categoria === selectedCategoria;
      
      return matchesSearch && matchesCategoria;
    });
    
    return filtered.sort((a, b) => a.orden - b.orden);
  }, [galeria, searchTerm, selectedCategoria]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#008060]"></div>
      </div>
    );
  }

  if (error && galeria.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar la galería</h2>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchGaleria}
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
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Galería</h1>
          <p className="text-sm text-gray-600 mt-1">Gestiona las imágenes de la galería</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full md:w-auto px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <Plus size={18} />
          <span>Agregar imagen</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre o descripción..."
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
          <div>
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] transition-all"
            >
              <option value="all">Todas las categorías</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingItem ? 'Editar imagen' : 'Nueva imagen'}
            </h2>
            <button
              onClick={resetForm}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Cancelar
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Subir imagen *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {formData.imagen_url ? (
                    <div className="mb-4">
                      <img
                        src={formData.imagen_url}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                    </div>
                  ) : (
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  )}
                  <span className="text-sm text-gray-600">
                    {uploading ? 'Subiendo...' : formData.imagen_url ? 'Cambiar imagen' : 'Haz clic para subir'}
                  </span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG hasta 10MB</span>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Categoría
                </label>
                <input
                  type="text"
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  placeholder="Ej: maquillaje, cabello, peinados"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                rows={3}
                placeholder="Descripción de la imagen"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    id="activo"
                    type="checkbox"
                    checked={formData.activo}
                    onChange={(e) => setFormData({ ...formData, activo: e.target.checked })}
                    className="h-4 w-4 text-[#008060] focus:ring-[#008060] border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">Imagen activa</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={uploading || !formData.imagen_url}
                className="px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingItem ? 'Guardar cambios' : 'Agregar imagen'}
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

      {/* Grid de imágenes */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-fade-in">
        {galeria.length === 0 ? (
          <div className="p-12 text-center">
            <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-bounce" />
            <p className="text-sm text-gray-600">No hay imágenes en la galería</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Agregar primera imagen
            </button>
          </div>
        ) : filteredGaleria.length === 0 ? (
          <div className="p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">No se encontraron imágenes</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategoria('all');
              }}
              className="mt-4 px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
            {filteredGaleria.map((item, index) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative aspect-square bg-gray-100">
                  <img
                    src={item.imagen_url}
                    alt={item.nombre}
                    className="w-full h-full object-cover"
                  />
                  {!item.activo && (
                    <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      Inactivo
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">{item.nombre}</h3>
                  {item.descripcion && (
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{item.descripcion}</p>
                  )}
                  {item.categoria && (
                    <span className="inline-block text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded mb-3">
                      {item.categoria}
                    </span>
                  )}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                    <span className="text-xs text-gray-500">Orden: {item.orden}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-gray-600 hover:text-[#008060] transition-colors p-1"
                        title="Editar"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.nombre)}
                        className="text-gray-600 hover:text-red-600 transition-colors p-1"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


