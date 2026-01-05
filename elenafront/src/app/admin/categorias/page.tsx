"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase-admin';
import { Plus, Edit, Trash2, FolderTree, CheckCircle, XCircle, AlertCircle, Search, X } from 'lucide-react';

interface Categoria {
  id: string;
  nombre: string;
  descripcion?: string;
  icon?: string;
  color?: string;
  obs?: string;
  created_at: string;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: ''
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const fetchCategorias = useCallback(async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('categorias')
        .select('*')
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;
      setCategorias(data || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar categorías';
      console.error('Error fetching categorias:', err);
      setError(errorMessage);
      showToast('Error al cargar las categorías', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCategoria) {
        const { error: updateError } = await supabase
          .from('categorias')
          .update({
            nombre: formData.nombre,
            descripcion: formData.descripcion || null
          })
          .eq('id', editingCategoria.id);

        if (updateError) throw updateError;
        showToast('Categoría actualizada correctamente', 'success');
      } else {
        const { error: insertError } = await supabase
          .from('categorias')
          .insert([{
            nombre: formData.nombre,
            descripcion: formData.descripcion || null
          }]);

        if (insertError) throw insertError;
        showToast('Categoría creada correctamente', 'success');
      }

      resetForm();
      fetchCategorias();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar la categoría';
      console.error('Error saving categoria:', err);
      showToast(errorMessage, 'error');
    }
  };

  const handleEdit = (categoria: Categoria) => {
    setEditingCategoria(categoria);
    setFormData({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar la categoría "${nombre}"?`)) return;

    try {
      const { error: deleteError } = await supabase
        .from('categorias')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      showToast('Categoría eliminada correctamente', 'success');
      fetchCategorias();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar la categoría';
      console.error('Error deleting categoria:', err);
      showToast(errorMessage, 'error');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingCategoria(null);
    setFormData({ nombre: '', descripcion: '' });
  };

  // Filtrar y ordenar categorías alfabéticamente
  const filteredCategorias = useMemo(() => {
    const filtered = categorias.filter((categoria) => {
      return searchTerm === '' || 
        categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categoria.descripcion?.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    // Ordenar alfabéticamente por nombre
    return filtered.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));
  }, [categorias, searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#008060]"></div>
      </div>
    );
  }

  if (error && categorias.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar las categorías</h2>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchCategorias}
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
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Categorías</h1>
          <p className="text-sm text-gray-600 mt-1">Gestiona las categorías de tus servicios</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full md:w-auto px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <Plus size={18} />
          <span>Agregar categoría</span>
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

        {/* Contador de resultados */}
        {searchTerm && (
          <div className="mt-3 text-sm text-gray-600 flex items-center gap-2">
            <span>
              {filteredCategorias.length} {filteredCategorias.length === 1 ? 'categoría encontrada' : 'categorías encontradas'}
            </span>
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#008060] hover:text-[#006e52] font-medium underline transition-colors"
            >
              Limpiar búsqueda
            </button>
          </div>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingCategoria ? 'Editar categoría' : 'Nueva categoría'}
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
                Nombre
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                required
                placeholder="Ej: Maquillaje"
              />
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
                placeholder="Descripción de la categoría"
              />
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-colors"
              >
                {editingCategoria ? 'Guardar cambios' : 'Crear categoría'}
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
        {categorias.length === 0 ? (
          <div className="p-12 text-center">
            <FolderTree className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-bounce" />
            <p className="text-sm text-gray-600">No hay categorías todavía</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Agregar primera categoría
            </button>
          </div>
        ) : filteredCategorias.length === 0 ? (
          <div className="p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">No se encontraron categorías</p>
            <p className="text-xs text-gray-500">Intenta ajustar la búsqueda</p>
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
                      Nombre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCategorias.map((categoria, index) => (
                    <tr 
                      key={categoria.id} 
                      className="hover:bg-gray-50 transition-all duration-200 animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{categoria.nombre}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{categoria.descripcion || '-'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleEdit(categoria)}
                            className="text-gray-600 hover:text-[#008060] transition-colors p-1 rounded hover:bg-gray-100"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(categoria.id, categoria.nombre)}
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
              {filteredCategorias.map((categoria, index) => (
                <div
                  key={categoria.id}
                  className="p-4 hover:bg-gray-50 transition-all duration-200 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {categoria.nombre}
                      </h3>
                      {categoria.descripcion && (
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {categoria.descripcion}
                        </p>
                      )}
                      {!categoria.descripcion && (
                        <p className="text-xs text-gray-400">Sin descripción</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() => handleEdit(categoria)}
                        className="p-2 text-gray-600 hover:text-[#008060] hover:bg-gray-100 rounded transition-colors"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(categoria.id, categoria.nombre)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
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
