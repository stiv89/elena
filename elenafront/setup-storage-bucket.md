# Configuración del Bucket de Supabase Storage para Galería

## Pasos para configurar el bucket de galería:

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **Storage** en el menú lateral
3. Haz clic en **"New bucket"** (Nuevo bucket)
4. Configura el bucket:
   - **Name**: `galeria`
   - **Public bucket**: ✅ **MARCAR COMO PÚBLICO** (para que las imágenes sean accesibles públicamente)
   - Haz clic en **"Create bucket"**

5. Configurar políticas RLS (Row Level Security):
   - Una vez creado el bucket, haz clic en **"Policies"**
   - Crea las siguientes políticas:

### Política 1: Permitir lectura pública
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'galeria');
```

### Política 2: Permitir subida para usuarios autenticados
```sql
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'galeria');
```

### Política 3: Permitir actualización para usuarios autenticados
```sql
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'galeria');
```

### Política 4: Permitir eliminación para usuarios autenticados
```sql
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'galeria');
```

## Nota importante:

El bucket debe estar configurado como **público** para que las imágenes sean accesibles desde la web. Si no lo marcas como público, necesitarás usar URLs firmadas que expiran.



