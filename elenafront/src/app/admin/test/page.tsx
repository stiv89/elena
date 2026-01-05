"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-admin';

interface CategoriaData {
  id: string;
  nombre: string;
  descripcion: string;
  icon: string;
  color: string;
  obs: string;
  created_at: string;
  updated_at: string;
}

export default function TestPage() {
  const [data, setData] = useState<CategoriaData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      const { data, error } = await supabase.from('categorias').select('*').limit(1);
      if (error) throw error;
      setData(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-8">Cargando...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test de Conexión</h1>
      <p>Conexión exitosa a Supabase</p>
      <pre className="bg-gray-100 p-4 rounded mt-4">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}