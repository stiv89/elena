-- ============================================
-- Script para arreglar las políticas RLS en Supabase
-- Ejecutar este script completo en el SQL Editor de Supabase
-- ============================================

-- Paso 1: Eliminar políticas existentes si ya existen (para evitar errores de duplicación)
DROP POLICY IF EXISTS "Allow public read access on categorias" ON categorias;
DROP POLICY IF EXISTS "Allow public read access on servicios" ON servicios;
DROP POLICY IF EXISTS "Allow authenticated insert on categorias" ON categorias;
DROP POLICY IF EXISTS "Allow authenticated insert on servicios" ON servicios;
DROP POLICY IF EXISTS "Allow authenticated update on categorias" ON categorias;
DROP POLICY IF EXISTS "Allow authenticated update on servicios" ON servicios;
DROP POLICY IF EXISTS "Allow authenticated delete on categorias" ON categorias;
DROP POLICY IF EXISTS "Allow authenticated delete on servicios" ON servicios;

-- Paso 2: Políticas de lectura pública (para que todos puedan leer)
CREATE POLICY "Allow public read access on categorias" 
ON categorias FOR SELECT 
USING (true);

CREATE POLICY "Allow public read access on servicios" 
ON servicios FOR SELECT 
USING (true);

-- Paso 3: Políticas para usuarios autenticados: INSERT (crear)
CREATE POLICY "Allow authenticated insert on categorias" 
ON categorias FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated insert on servicios" 
ON servicios FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Paso 4: Políticas para usuarios autenticados: UPDATE (actualizar)
CREATE POLICY "Allow authenticated update on categorias" 
ON categorias FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on servicios" 
ON servicios FOR UPDATE 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Paso 5: Políticas para usuarios autenticados: DELETE (eliminar)
CREATE POLICY "Allow authenticated delete on categorias" 
ON categorias FOR DELETE 
TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated delete on servicios" 
ON servicios FOR DELETE 
TO authenticated 
USING (true);

-- ============================================
-- Verificación: Para ver las políticas creadas, ejecuta:
-- SELECT * FROM pg_policies WHERE tablename IN ('categorias', 'servicios');
-- ============================================
