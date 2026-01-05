"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-admin';
import { FolderTree, ShoppingBag, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  totalCategorias: number;
  totalServicios: number;
  serviciosActivos: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalCategorias: 0,
    totalServicios: 0,
    serviciosActivos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Obtener estadísticas
      const [categoriasResult, serviciosResult] = await Promise.all([
        supabase.from('categorias').select('id', { count: 'exact' }),
        supabase.from('servicios').select('id', { count: 'exact' }),
      ]);

      setStats({
        totalCategorias: categoriasResult.count || 0,
        totalServicios: serviciosResult.count || 0,
        serviciosActivos: serviciosResult.count || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-[#008060]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Resumen general de tu tienda</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categorías</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">{stats.totalCategorias}</p>
            </div>
            <div className="p-3 bg-[#f0fdf4] rounded-lg">
              <FolderTree className="w-6 h-6 text-[#008060]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Servicios totales</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">{stats.totalServicios}</p>
            </div>
            <div className="p-3 bg-[#f0fdf4] rounded-lg">
              <ShoppingBag className="w-6 h-6 text-[#008060]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Servicios activos</p>
              <p className="text-3xl font-semibold text-gray-900 mt-2">{stats.serviciosActivos}</p>
            </div>
            <div className="p-3 bg-[#f0fdf4] rounded-lg">
              <TrendingUp className="w-6 h-6 text-[#008060]" />
            </div>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Acciones rápidas</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/admin/categorias"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#008060] hover:bg-[#f0fdf4] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-[#f0fdf4]">
                  <FolderTree className="w-5 h-5 text-gray-600 group-hover:text-[#008060]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Categorías</p>
                  <p className="text-sm text-gray-600">Gestionar categorías</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#008060]" />
            </Link>

            <Link
              href="/admin/servicios"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#008060] hover:bg-[#f0fdf4] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-[#f0fdf4]">
                  <ShoppingBag className="w-5 h-5 text-gray-600 group-hover:text-[#008060]" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Servicios</p>
                  <p className="text-sm text-gray-600">Gestionar servicios</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#008060]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
