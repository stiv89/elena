-- ============================================
-- SQL para parametrizar todo el sitio
-- Ejecutar este script completo en Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. BANNERS / BARRA DE ANUNCIO
-- ============================================
CREATE TABLE IF NOT EXISTS banners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT,
  mensaje TEXT,
  enlace_url TEXT,
  texto_boton TEXT,
  activo BOOLEAN DEFAULT true,
  orden INTEGER DEFAULT 0,
  fecha_inicio TIMESTAMP WITH TIME ZONE,
  fecha_fin TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. EQUIPO
-- ============================================
CREATE TABLE IF NOT EXISTS equipo (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  rol TEXT NOT NULL,
  biografia TEXT,
  imagen_url TEXT,
  especialidades TEXT[], -- Array de especialidades
  experiencia TEXT,
  orden INTEGER DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. GALERÍA
-- ============================================
CREATE TABLE IF NOT EXISTS galeria (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  imagen_url TEXT NOT NULL, -- URL del bucket de Supabase Storage
  categoria TEXT,
  orden INTEGER DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. CONTACTO / UBICACIÓN
-- ============================================
CREATE TABLE IF NOT EXISTS contacto (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  direccion_completa TEXT,
  direccion_corta TEXT,
  telefono TEXT,
  whatsapp TEXT,
  email TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  tiktok_url TEXT,
  mapa_url TEXT, -- Link de Google Maps
  mapa_embed TEXT, -- iframe embed de Google Maps
  horario_lunes TEXT,
  horario_martes TEXT,
  horario_miercoles TEXT,
  horario_jueves TEXT,
  horario_viernes TEXT,
  horario_sabado TEXT,
  horario_domingo TEXT,
  latitud NUMERIC,
  longitud NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar registro único por defecto (solo si no existe)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM contacto LIMIT 1) THEN
    INSERT INTO contacto (direccion_completa, direccion_corta, telefono, whatsapp, email)
    VALUES (
      'Luque, c/ Sportivo Luqueño y Moisés Bertoni, Código Postal 110930',
      'Luque',
      '+595 991 743889',
      '+595 991 743889',
      'contacto@elenabenitez.com'
    );
  END IF;
END $$;

-- ============================================
-- 5. FOOTER
-- ============================================
CREATE TABLE IF NOT EXISTS footer (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT,
  subtitulo TEXT,
  frase TEXT,
  texto_copyright TEXT,
  texto_creditos TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Links del footer
CREATE TABLE IF NOT EXISTS footer_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  texto TEXT NOT NULL,
  url TEXT NOT NULL,
  tipo TEXT NOT NULL, -- 'quick', 'social', 'legal'
  orden INTEGER DEFAULT 0,
  activo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 6. AGREGAR CAMPO IMAGEN A SERVICIOS
-- ============================================
ALTER TABLE servicios 
ADD COLUMN IF NOT EXISTS imagen_url TEXT;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Banners
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on banners" ON banners FOR SELECT USING (activo = true);
CREATE POLICY "Allow authenticated all on banners" ON banners TO authenticated USING (true) WITH CHECK (true);

-- Equipo
ALTER TABLE equipo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on equipo" ON equipo FOR SELECT USING (activo = true);
CREATE POLICY "Allow authenticated all on equipo" ON equipo TO authenticated USING (true) WITH CHECK (true);

-- Galería
ALTER TABLE galeria ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on galeria" ON galeria FOR SELECT USING (activo = true);
CREATE POLICY "Allow authenticated all on galeria" ON galeria TO authenticated USING (true) WITH CHECK (true);

-- Contacto (solo un registro)
ALTER TABLE contacto ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on contacto" ON contacto FOR SELECT USING (true);
CREATE POLICY "Allow authenticated all on contacto" ON contacto TO authenticated USING (true) WITH CHECK (true);

-- Footer
ALTER TABLE footer ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on footer" ON footer FOR SELECT USING (true);
CREATE POLICY "Allow authenticated all on footer" ON footer TO authenticated USING (true) WITH CHECK (true);

-- Footer Links
ALTER TABLE footer_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on footer_links" ON footer_links FOR SELECT USING (activo = true);
CREATE POLICY "Allow authenticated all on footer_links" ON footer_links TO authenticated USING (true) WITH CHECK (true);

-- ============================================
-- ÍNDICES PARA MEJOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_banners_activo ON banners(activo);
CREATE INDEX IF NOT EXISTS idx_banners_orden ON banners(orden);
CREATE INDEX IF NOT EXISTS idx_equipo_activo ON equipo(activo);
CREATE INDEX IF NOT EXISTS idx_equipo_orden ON equipo(orden);
CREATE INDEX IF NOT EXISTS idx_galeria_activo ON galeria(activo);
CREATE INDEX IF NOT EXISTS idx_galeria_categoria ON galeria(categoria);
CREATE INDEX IF NOT EXISTS idx_galeria_orden ON galeria(orden);
CREATE INDEX IF NOT EXISTS idx_footer_links_tipo ON footer_links(tipo);
CREATE INDEX IF NOT EXISTS idx_footer_links_orden ON footer_links(orden);

-- ============================================
-- FUNCIONES PARA ACTUALIZAR updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at automáticamente
CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON banners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipo_updated_at BEFORE UPDATE ON equipo
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_galeria_updated_at BEFORE UPDATE ON galeria
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacto_updated_at BEFORE UPDATE ON contacto
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_footer_updated_at BEFORE UPDATE ON footer
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DATOS INICIALES
-- ============================================

-- Footer inicial (solo si no existe)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM footer LIMIT 1) THEN
    INSERT INTO footer (nombre, subtitulo, frase, texto_copyright, texto_creditos)
    VALUES (
      'Elena Benítez',
      'Belleza Integral',
      'Cuidamos tu belleza cada día.',
      '© 2025 Elena Benítez – Belleza Integral. Todos los derechos reservados.',
      'Diseño web por Digita Paraguay.'
    );
  END IF;
END $$;

-- Footer links iniciales (solo si no existen)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM footer_links LIMIT 1) THEN
    INSERT INTO footer_links (texto, url, tipo, orden, activo) VALUES
      ('Inicio', '#inicio', 'quick', 1, true),
      ('Servicios', '#servicios', 'quick', 2, true),
      ('Galería', '#galeria', 'quick', 3, true),
      ('Equipo', '#equipo', 'quick', 4, true),
      ('Contacto', '#contacto', 'quick', 5, true);
  END IF;
END $$;

-- ============================================
-- NOTA: Para el bucket de Supabase Storage
-- ============================================
-- Necesitas crear un bucket llamado 'galeria' en Supabase Storage
-- y configurar las políticas de acceso públicas para lectura

