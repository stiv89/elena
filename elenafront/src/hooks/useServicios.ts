import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Servicio {
  id: string;
  nombre: string;
  precio: string;
  descripcion: string;
  imagen_url?: string;
}

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string;
  icon: string;
  color: string;
  obs: string;
  servicios: Servicio[];
}

export function useServicios() {
  const [servicios, setServicios] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchServicios() {
      try {
        // Obtener categorías con sus servicios
        const { data: categorias, error: catError } = await supabase
          .from('categorias')
          .select('*')
          .order('created_at');

        if (catError) throw catError;

        const categoriasConServicios = await Promise.all(
          categorias.map(async (cat) => {
            const { data: servicios, error: servError } = await supabase
              .from('servicios')
              .select('*')
              .eq('categoria_id', cat.id)
              .order('created_at');

            if (servError) throw servError;

            return {
              ...cat,
              categoria: cat.nombre, // Para compatibilidad con el código existente
              servicios: servicios || []
            };
          })
        );

        setServicios(categoriasConServicios);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchServicios();
  }, []);

  return { servicios, loading, error };
}