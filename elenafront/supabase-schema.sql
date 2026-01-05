-- Crear tabla de categorías
CREATE TABLE categorias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  icon TEXT,
  color TEXT,
  obs TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de servicios
CREATE TABLE servicios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  categoria_id UUID REFERENCES categorias(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  precio TEXT NOT NULL,
  descripcion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security) si es necesario
ALTER TABLE categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicios ENABLE ROW LEVEL SECURITY;

-- Políticas de acceso público para lectura (ajusta según necesites)
CREATE POLICY "Allow public read access on categorias" ON categorias FOR SELECT USING (true);
CREATE POLICY "Allow public read access on servicios" ON servicios FOR SELECT USING (true);