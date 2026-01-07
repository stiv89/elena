"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '@/lib/supabase-admin';
import { Plus, Edit, Trash2, Users, CheckCircle, XCircle, AlertCircle, Search, X, Upload } from 'lucide-react';

interface Equipo {
  id: string;
  nombre: string;
  rol: string;
  biografia?: string;
  imagen_url?: string;
  especialidades?: string[];
  experiencia?: string;
  orden: number;
  activo: boolean;
  created_at: string;
}

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export default function EquipoPage() {
  const [equipo, setEquipo] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMiembro, setEditingMiembro] = useState<Equipo | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    rol: '',
    biografia: '',
    imagen_url: '',
    especialidades: '',
    experiencia: '',
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

  const fetchEquipo = useCallback(async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('equipo')
        .select('*')
        .order('orden', { ascending: true });

      if (fetchError) throw fetchError;
      setEquipo(data || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar equipo';
      console.error('Error fetching equipo:', err);
      setError(errorMessage);
      showToast('Error al cargar el equipo', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchEquipo();
  }, [fetchEquipo]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setUploading(true);
      showToast('Subiendo imagen...', 'info');

      // Crear nombre único para el archivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `equipo/${fileName}`;

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
      // Convertir especialidades de string a array
      const especialidadesArray = formData.especialidades
        ? formData.especialidades.split(',').map(s => s.trim()).filter(s => s.length > 0)
        : [];

      const miembroData = {
        nombre: formData.nombre,
        rol: formData.rol,
        biografia: formData.biografia || null,
        imagen_url: formData.imagen_url || null,
        especialidades: especialidadesArray.length > 0 ? especialidadesArray : null,
        experiencia: formData.experiencia || null,
        activo: formData.activo,
        orden: formData.orden || 0
      };

      if (editingMiembro) {
        const { error: updateError } = await supabase
          .from('equipo')
          .update(miembroData)
          .eq('id', editingMiembro.id);

        if (updateError) throw updateError;
        showToast('Miembro actualizado correctamente', 'success');
      } else {
        const { error: insertError } = await supabase
          .from('equipo')
          .insert([miembroData]);

        if (insertError) throw insertError;
        showToast('Miembro creado correctamente', 'success');
      }

      resetForm();
      fetchEquipo();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al guardar el miembro';
      console.error('Error saving miembro:', err);
      showToast(errorMessage, 'error');
    }
  };

  const handleEdit = (miembro: Equipo) => {
    setEditingMiembro(miembro);
    setFormData({
      nombre: miembro.nombre,
      rol: miembro.rol,
      biografia: miembro.biografia || '',
      imagen_url: miembro.imagen_url || '',
      especialidades: miembro.especialidades?.join(', ') || '',
      experiencia: miembro.experiencia || '',
      activo: miembro.activo,
      orden: miembro.orden || 0
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar a "${nombre}"?`)) return;

    try {
      const { error: deleteError } = await supabase
        .from('equipo')
        .delete()
        .eq('id', id);

      if (deleteError) throw deleteError;
      showToast('Miembro eliminado correctamente', 'success');
      fetchEquipo();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar el miembro';
      console.error('Error deleting miembro:', err);
      showToast(errorMessage, 'error');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingMiembro(null);
    setFormData({
      nombre: '',
      rol: '',
      biografia: '',
      imagen_url: '',
      especialidades: '',
      experiencia: '',
      activo: true,
      orden: 0
    });
  };

  // Filtrar equipo
  const filteredEquipo = useMemo(() => {
    const filtered = equipo.filter((miembro) => {
      return searchTerm === '' || 
        miembro.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        miembro.rol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        miembro.biografia?.toLowerCase().includes(searchTerm.toLowerCase());
    });
    
    return filtered.sort((a, b) => a.orden - b.orden);
  }, [equipo, searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#008060]"></div>
      </div>
    );
  }

  if (error && equipo.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Error al cargar el equipo</h2>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchEquipo}
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
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Equipo</h1>
          <p className="text-sm text-gray-600 mt-1">Gestiona los miembros del equipo</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="w-full md:w-auto px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <Plus size={18} />
          <span>Agregar miembro</span>
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
            placeholder="Buscar por nombre, rol o biografía..."
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
              {editingMiembro ? 'Editar miembro' : 'Nuevo miembro'}
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
                  Rol *
                </label>
                <input
                  type="text"
                  value={formData.rol}
                  onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  required
                  placeholder="Ej: Estilista Principal"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Biografía
              </label>
              <textarea
                value={formData.biografia}
                onChange={(e) => setFormData({ ...formData, biografia: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                rows={4}
                placeholder="Descripción del miembro del equipo"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Imagen
                </label>
                <div className="space-y-3">
                  {/* Vista previa de imagen */}
                  {formData.imagen_url && (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200">
                      <img
                        src={formData.imagen_url}
                        alt="Vista previa"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, imagen_url: '' })}
                        className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )}
                  {/* Botón de subida */}
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer px-4 py-2 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700">
                      <Upload size={18} />
                      {uploading ? 'Subiendo...' : 'Subir foto'}
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
                  <p className="text-xs text-gray-500">Formatos: JPG, PNG. Máx 5MB</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Experiencia
                </label>
                <input
                  type="text"
                  value={formData.experiencia}
                  onChange={(e) => setFormData({ ...formData, experiencia: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                  placeholder="Ej: 10+ años"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Especialidades (separadas por comas)
              </label>
              <input
                type="text"
                value={formData.especialidades}
                onChange={(e) => setFormData({ ...formData, especialidades: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008060] focus:border-[#008060] text-sm"
                placeholder="Ej: Maquillaje, Diseño de Cejas, Henna"
              />
              <p className="text-xs text-gray-500 mt-1">Separa cada especialidad con una coma</p>
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
                  <span className="text-sm text-gray-700">Miembro activo</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-colors"
              >
                {editingMiembro ? 'Guardar cambios' : 'Crear miembro'}
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
        {equipo.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-bounce" />
            <p className="text-sm text-gray-600">No hay miembros del equipo todavía</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 px-4 py-2 bg-[#008060] text-white text-sm font-medium rounded-md hover:bg-[#006e52] transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Agregar primer miembro
            </button>
          </div>
        ) : filteredEquipo.length === 0 ? (
          <div className="p-12 text-center">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">No se encontraron miembros</p>
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
                      Rol
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
                  {filteredEquipo.map((miembro, index) => (
                    <tr 
                      key={miembro.id} 
                      className="hover:bg-gray-50 transition-all duration-200 animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {miembro.imagen_url && (
                            <img 
                              src={miembro.imagen_url} 
                              alt={miembro.nombre}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          )}
                          <span className="text-sm font-medium text-gray-900">{miembro.nombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{miembro.rol}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          miembro.activo
                            ? 'bg-[#f0fdf4] text-[#008060]'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {miembro.activo ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleEdit(miembro)}
                            className="text-gray-600 hover:text-[#008060] transition-colors p-1 rounded hover:bg-gray-100"
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(miembro.id, miembro.nombre)}
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
              {filteredEquipo.map((miembro, index) => (
                <div
                  key={miembro.id}
                  className="p-4 hover:bg-gray-50 transition-all duration-200 animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        {miembro.imagen_url && (
                          <img 
                            src={miembro.imagen_url} 
                            alt={miembro.nombre}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <h3 className="text-sm font-semibold text-gray-900">
                            {miembro.nombre}
                          </h3>
                          <p className="text-xs text-gray-600">{miembro.rol}</p>
                        </div>
                      </div>
                      {miembro.biografia && (
                        <p className="text-xs text-gray-600 line-clamp-2 mt-2">
                          {miembro.biografia}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() => handleEdit(miembro)}
                        className="p-2 text-gray-600 hover:text-[#008060] hover:bg-gray-100 rounded transition-colors"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(miembro.id, miembro.nombre)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      miembro.activo
                        ? 'bg-[#f0fdf4] text-[#008060]'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {miembro.activo ? 'Activo' : 'Inactivo'}
                    </span>
                    {miembro.especialidades && miembro.especialidades.length > 0 && (
                      <span className="text-xs text-gray-500">
                        {miembro.especialidades.length} especialidad{miembro.especialidades.length !== 1 ? 'es' : ''}
                      </span>
                    )}
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



