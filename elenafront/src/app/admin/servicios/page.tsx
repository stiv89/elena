"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase-admin';
import { Plus, Edit, Trash2, ShoppingBag, CheckCircle, XCircle, AlertCircle, Search, X, Upload } from 'lucide-react';

interface Categoria {
  id: string;
  nombre: string;
}

interface ServicioDB {
  id: string;
  categoria_id: string | null;
  nombre: string;
  descripcion: string | null;
  precio: string;
  imagen_url: string | null;
  created_at: string;
  updated_at: string;
}

interface CategoriaDB {
  id: string;
  nombre: string;
  descripcion: string;
  icon: string;
  color: string;
  obs: string;
  created_at: string;
  updated_at: string;
}

export default function ServiciosPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingServicio, setEditingServicio] = useState<Servicio | null>(null);
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('all');
  const [uploading, setUploading] = useState(false);
  const itemsPerPage = 10;
  const [formData, setFormData] = useState({
    categoria_id: '',
    nombre: '',
    descripcion: '',
    precio: '',
    imagen_url: ''
  });

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { id, message, type };
    setToasts((prev) => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      
      // Fetch servicios
      const { data: serviciosData, error: serviciosError } = await supabase
        .from('servicios')
        .select('*')
        .order('created_at', { ascending: true });

      if (serviciosError) {
        console.error('Error fetching servicios:', serviciosError);
        throw new Error(`Error al cargar servicios: ${serviciosError.message || serviciosError.code || 'Error desconocido'}`);
      }

      // Fetch categorias
      const { data: categoriasData, error: categoriasError } = await supabase
        .from('categorias')
        .select('id, nombre')
        .order('created_at', { ascending: true });

      if (categoriasError) {
        console.error('Error fetching categorias:', categoriasError);
        throw new Error(`Error al cargar categorías: ${categoriasError.message || categoriasError.code || 'Error desconocido'}`);
      }

      // Combinar servicios con sus categorías
      const serviciosConCategoria = (serviciosData || []).map((servicio: ServicioDB) => {
        const categoria = categoriasData?.find((cat: CategoriaDB) => cat.id === servicio.categoria_id);
        return {
          ...servicio,
          // El precio ya viene como string desde la BD
          precio: servicio.precio || '0',
          categoria: categoria ? { id: categoria.id, nombre: categoria.nombre } : undefined
        };
      });

      setServicios(serviciosConCategoria);
      setCategorias(categoriasData || []);
    } catch (err: unknown) {
      let errorMessage = 'Error desconocido al cargar datos';
      
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        // Si es un objeto de error de Supabase
        const errorObj = err as { message?: string; code?: string; details?: string; hint?: string };
        errorMessage = errorObj.message || errorObj.code || errorMessage;
        if (errorObj.details) {
          errorMessage += ` (${errorObj.details})`;
        }
      }
      
      console.error('Error fetching data:', err);
      setError(errorMessage);
      showToast('Error al cargar los servicios', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      showToast('Subiendo imagen...', 'info');

      // Crear nombre único para el archivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `servicios/${fileName}`;

      // Subir archivo a Supabase Storage
      const { error: uploadError } = await supabase.storage
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

    try {
      if (editingServicio) {
        const { error } = await supabase
          .from('servicios')
          .update({
            categoria_id: formData.categoria_id || null,
            nombre: formData.nombre,
            descripcion: formData.descripcion || null,
            precio: formData.precio,
            imagen_url: formData.imagen_url || null
          })
          .eq('id', editingServicio.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('servicios')
          .insert([{
            categoria_id: formData.categoria_id || null,
            nombre: formData.nombre,
            descripcion: formData.descripcion || null,
            precio: formData.precio,
            imagen_url: formData.imagen_url || null
          }]);

        if (error) throw error;
      }

      setShowForm(false);
      setEditingServicio(null);
      setFormData({
        categoria_id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        imagen_url: ''
      });
      showToast(editingServicio ? 'Servicio actualizado correctamente' : 'Servicio creado correctamente', 'success');
      fetchData();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar el servicio';
      console.error('Error saving servicio:', err);
      showToast(errorMessage, 'error');
    }
  };

  const handleEdit = (servicio: Servicio) => {
    setEditingServicio(servicio);
    setFormData({
      categoria_id: servicio.categoria_id || '',
      nombre: servicio.nombre,
      descripcion: servicio.descripcion || '',
      precio: servicio.precio || '0',
      imagen_url: servicio.imagen_url || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar el servicio "${nombre}"?`)) return;

    try {
      const { error } = await supabase
        .from('servicios')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showToast('Servicio eliminado correctamente', 'success');
      fetchData();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el servicio';
      console.error('Error deleting servicio:', err);
      showToast(errorMessage, 'error');
    }
  };

  const resetForm = () => {
      setShowForm(false);
      setEditingServicio(null);
      setFormData({
        categoria_id: '',
        nombre: '',
        descripcion: '',
        precio: '',
        imagen_url: ''
      });
  };

  // Filtrar y ordenar servicios alfabéticamente
  const filteredServicios = useMemo(() => {
    const filtered = servicios.filter((servicio) => {
      const matchesSearch = searchTerm === '' || 
        servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servicio.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servicio.precio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        servicio.categoria?.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategoria = selectedCategoria === 'all' || servicio.categoria_id === selectedCategoria;
      
      return matchesSearch && matchesCategoria;
    });
    
    // Ordenar alfabéticamente por nombre
    return filtered.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));
  }, [servicios, searchTerm, selectedCategoria]);

  // Paginación
  const totalPages = Math.ceil(filteredServicios.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedServicios = filteredServicios.slice(startIndex, endIndex);

  // Resetear página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategoria]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#008060]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar los datos</h2>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
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
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Servicios</h1>
          <p className="text-sm text-gray-600 mt-1">Gestiona tus servicios y precios</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full md:w-auto px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <Plus size={18} />
          <span>Agregar servicio</span>
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 space-y-4 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Barra de búsqueda */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, descripción, precio o categoría..."
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

          {/* Filtro por categoría */}
          <div>
            <select
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] transition-all"
            >
              <option value="all">Todas las categorías</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Contador de resultados */}
        {searchTerm || selectedCategoria !== 'all' ? (
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span>
              {filteredServicios.length} {filteredServicios.length === 1 ? 'servicio encontrado' : 'servicios encontrados'}
            </span>
            {(searchTerm || selectedCategoria !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategoria('all');
                }}
                className="text-[#008060] hover:text-[#006e52] font-medium underline transition-colors"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : null}
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {editingServicio ? 'Editar servicio' : 'Nuevo servicio'}
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
                Categoría
              </label>
              <select
                value={formData.categoria_id}
                onChange={(e) => setFormData({ ...formData, categoria_id: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Precio (₲)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">₲</span>
                <input
                  type="text"
                  value={formData.precio}
                  onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  placeholder="100000"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Ingresa el precio en guaraníes (ej: 100000)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Imagen (opcional)
              </label>
              <div className="space-y-3">
                {/* Vista previa de imagen */}
                {formData.imagen_url && (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={formData.imagen_url}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, imagen_url: '' })}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
                {/* Botón de subida */}
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Upload size={18} />
                    {uploading ? 'Subiendo...' : 'Subir imagen'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  {uploading && (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-[#008060]"></div>
                  )}
                </div>
                <p className="text-xs text-gray-500">Formatos: JPG, PNG, WebP. Máx 5MB</p>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-colors"
              >
                {editingServicio ? 'Guardar cambios' : 'Crear servicio'}
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

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-fade-in">
        {servicios.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-bounce" />
            <p className="text-sm text-gray-600">No hay servicios todavía</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Agregar primer servicio
            </button>
          </div>
        ) : filteredServicios.length === 0 ? (
          <div className="p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">No se encontraron servicios</p>
            <p className="text-xs text-gray-500">Intenta ajustar los filtros de búsqueda</p>
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
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Servicio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedServicios.map((servicio, index) => (
                    <tr 
                      key={servicio.id} 
                      className="hover:bg-gray-50 transition-all duration-200 animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {servicio.nombre}
                          </div>
                          {servicio.descripcion && (
                            <div className="text-sm text-gray-500 mt-1">
                              {servicio.descripcion}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{servicio.categoria?.nombre || '-'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          ₲ {servicio.precio || '0'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleEdit(servicio)}
                            className="text-gray-600 hover:text-[#008060] transition-colors p-1 rounded hover:bg-gray-100"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(servicio.id, servicio.nombre)}
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
              {paginatedServicios.map((servicio, index) => (
                <div
                  key={servicio.id}
                  className="p-4 hover:bg-gray-50 transition-all duration-200 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">
                        {servicio.nombre}
                      </h3>
                      {servicio.descripcion && (
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {servicio.descripcion}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() => handleEdit(servicio)}
                        className="p-2 text-gray-600 hover:text-[#008060] hover:bg-gray-100 rounded transition-colors"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(servicio.id, servicio.nombre)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">Categoría:</span>
                      <span className="text-gray-700 font-medium">{servicio.categoria?.nombre || '-'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500">Precio:</span>
                      <span className="text-gray-900 font-semibold">₲ {servicio.precio || '0'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Mostrando {startIndex + 1} a {Math.min(endIndex, filteredServicios.length)} de {filteredServicios.length} servicios
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              {/* Números de página */}
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 text-sm border rounded-md ${
                        currentPage === pageNum
                          ? 'bg-[#008060] text-white border-[#008060]'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}