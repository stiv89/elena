import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface ConfiguracionSitio {
  topbar_ubicacion: string;
  topbar_horario: string;
  topbar_telefono: string;
  topbar_eslogan: string;
  topbar_badge: string;
  topbar_visible: boolean;
  whatsapp_numero: string;
  whatsapp_mensaje: string;
  email_contacto: string;
  direccion_completa: string;
  instagram_url: string;
  facebook_url: string;
  tiktok_url: string;
  sitio_nombre: string;
  sitio_descripcion: string;
  sitio_keywords: string;
}

const defaultConfig: ConfiguracionSitio = {
  topbar_ubicacion: 'Luque, Paraguay',
  topbar_horario: 'Lun–Sáb: 9:00–19:00',
  topbar_telefono: '+595 991 743889',
  topbar_eslogan: '1000+ clientes felices',
  topbar_badge: '#1 en Luque',
  topbar_visible: true,
  whatsapp_numero: '595991743889',
  whatsapp_mensaje: 'Hola Elena, quiero hacer una consulta',
  email_contacto: 'contacto@elenaprofesional.com',
  direccion_completa: 'Luque, Paraguay',
  instagram_url: 'https://instagram.com/elenaprofesional',
  facebook_url: 'https://facebook.com/elenaprofesional',
  tiktok_url: '',
  sitio_nombre: 'Elena Profesional',
  sitio_descripcion: 'Centro de belleza profesional en Luque, Paraguay',
  sitio_keywords: 'belleza, maquillaje, cejas, uñas, Luque, Paraguay',
};

export function useConfiguracion() {
  const [config, setConfig] = useState<ConfiguracionSitio>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const { data, error: fetchError } = await supabase
          .from('configuracion_sitio')
          .select('clave, valor');

        if (fetchError) throw fetchError;

        if (data && data.length > 0) {
          const configObj = { ...defaultConfig };
          data.forEach((item: { clave: string; valor: string }) => {
            const key = item.clave as keyof ConfiguracionSitio;
            if (key in configObj) {
              if (key === 'topbar_visible') {
                (configObj as Record<string, string | boolean>)[key] = item.valor === 'true';
              } else {
                (configObj as Record<string, string | boolean>)[key] = item.valor || defaultConfig[key];
              }
            }
          });
          setConfig(configObj);
        }
      } catch (err) {
        console.error('Error fetching config:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        // Usar valores por defecto en caso de error
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return { config, loading, error };
}
