-- Script para migrar datos de servicios a Supabase
-- Ejecutar después de crear las tablas

-- Insertar categorías
INSERT INTO categorias (nombre, descripcion, icon, color, obs) VALUES
('Lavados', 'Servicios de lavado y tratamientos capilares premium', 'hair-wash', '#e3f2fd', 'Todos los lavados incluyen brushing + planchita. El costo varía según el largo y volumen del cabello.'),
('Maquillajes & Compañía', 'Maquillajes, peinados y tratamientos faciales', 'makeup', '#fce4ec', 'Todos los peinados incluyen lavado y brushing. Todos los maquillajes incluyen limpieza facial express. El baño de luna incluye preparación de la piel en ambas zonas, humectación y protección solar.'),
('Cejas & Pestañas', 'Diseño y tratamientos para cejas y pestañas', 'eye', '#f3e5f5', 'Todos nuestros tratamientos de cejas incluyen asesoramiento personalizado para encontrar la forma perfecta para tu rostro.'),
('Depilaciones', 'Servicios de depilación profesional', 'wax', '#fff3e0', 'Utilizamos ceras de alta calidad para minimizar molestias y obtener mejores resultados.'),
('Manos & Pies', 'Cuidado integral de manos y pies', 'hands-feet', '#e8f5e8', 'La extracción de semipermanente incluye base protectora en las uñas.'),
('Manitas Delicadas', 'Extensiones y técnicas avanzadas para uñas', 'nail-art', '#fdf2f8', 'La extracción de kapping o acrílico incluye hidratación de cutículas + esmaltado tradicional. Service de kapping y esculpidas: consultar presupuesto.'),
('Color y Alisados', 'Servicios de coloración y alisado capilar', 'hair-color', '#f0f4ff', 'Todos los precios son desde el monto indicado y pueden variar según largo y tipo de cabello. Consultar presupuesto personalizado.');

-- Obtener IDs de categorías para usar en servicios
-- Lavados (primera categoría insertada)
-- Maquillajes & Compañía (segunda)
-- Cejas & Pestañas (tercera)
-- Depilaciones (cuarta)
-- Manos & Pies (quinta)
-- Manitas Delicadas (sexta)
-- Color y Alisados (séptima)

-- Insertar servicios para Lavados (categoria_id = primera insertada)
INSERT INTO servicios (categoria_id, nombre, precio, descripcion) VALUES
((SELECT id FROM categorias WHERE nombre = 'Lavados'), 'Lavado clásico', '60.000', 'Servicio básico de lavado profesional'),
((SELECT id FROM categorias WHERE nombre = 'Lavados'), 'Lavado nutritivo', '75.000', 'Tratamiento hidratante profundo'),
((SELECT id FROM categorias WHERE nombre = 'Lavados'), 'Lavado matizador + baño', '85.000', 'Para mantener el color perfecto'),
((SELECT id FROM categorias WHERE nombre = 'Lavados'), 'Lavado + tto. Post color', '85.000', 'Cuidado especializado post-coloración'),
((SELECT id FROM categorias WHERE nombre = 'Lavados'), 'Secado', '20.000', 'Secado profesional'),
((SELECT id FROM categorias WHERE nombre = 'Lavados'), 'Brushing', '30.000', 'Peinado con cepillo y calor'),
((SELECT id FROM categorias WHERE nombre = 'Lavados'), 'Planchita', '30.000', 'Alisado con plancha profesional'),
((SELECT id FROM categorias WHERE nombre = 'Lavados'), 'Gorro térmico (add)', '15.000', 'Intensificación de tratamientos'),
((SELECT id FROM categorias WHERE nombre = 'Lavados'), 'Corte recto', '30.000', 'Corte clásico profesional');

-- Insertar servicios para Maquillajes & Compañía
INSERT INTO servicios (categoria_id, nombre, precio, descripcion) VALUES
((SELECT id FROM categorias WHERE nombre = 'Maquillajes & Compañía'), 'Peinados', '70.000', 'Peinados para ocasiones especiales'),
((SELECT id FROM categorias WHERE nombre = 'Maquillajes & Compañía'), 'Medio maquillaje', '75.000', 'Maquillaje natural para el día'),
((SELECT id FROM categorias WHERE nombre = 'Maquillajes & Compañía'), 'Maquillaje express', '90.000', 'Maquillaje rápido y efectivo'),
((SELECT id FROM categorias WHERE nombre = 'Maquillajes & Compañía'), 'Maquillaje social', '110.000', 'Para eventos y celebraciones'),
((SELECT id FROM categorias WHERE nombre = 'Maquillajes & Compañía'), 'Maquillaje Glam', '150.000', 'Maquillaje de gala y alta costura'),
((SELECT id FROM categorias WHERE nombre = 'Maquillajes & Compañía'), 'Aplicación de pestaña', '20.000', 'Pestañas postizas naturales'),
((SELECT id FROM categorias WHERE nombre = 'Maquillajes & Compañía'), 'Aplicación + Pestaña 3D', '35.000', 'Pestañas con efecto voluminoso'),
((SELECT id FROM categorias WHERE nombre = 'Maquillajes & Compañía'), 'Limpieza facial express', '25.000', 'Limpieza rápida y profunda'),
((SELECT id FROM categorias WHERE nombre = 'Maquillajes & Compañía'), 'Baño de luna en brazos', '45.000', 'Tratamiento iluminador para brazos'),
((SELECT id FROM categorias WHERE nombre = 'Maquillajes & Compañía'), 'Baño de luna en rostro', '40.000', 'Tratamiento iluminador facial');

-- Insertar servicios para Cejas & Pestañas
INSERT INTO servicios (categoria_id, nombre, precio, descripcion) VALUES
((SELECT id FROM categorias WHERE nombre = 'Cejas & Pestañas'), 'Diseño de cejas + perfilado', '25.000', 'Diseño personalizado según tu rostro'),
((SELECT id FROM categorias WHERE nombre = 'Cejas & Pestañas'), 'Diseño de cejas + henna', '50.000', 'Cejas perfectas con tinte natural'),
((SELECT id FROM categorias WHERE nombre = 'Cejas & Pestañas'), 'Aplicación de henna', '30.000', 'Tinte natural duradero'),
((SELECT id FROM categorias WHERE nombre = 'Cejas & Pestañas'), 'Lifting de pestañas', '90.000', 'Curvado y alargado natural');

-- Insertar servicios para Depilaciones
INSERT INTO servicios (categoria_id, nombre, precio, descripcion) VALUES
((SELECT id FROM categorias WHERE nombre = 'Depilaciones'), 'Perfilado de cejas', '15.000', 'Perfilado preciso de cejas'),
((SELECT id FROM categorias WHERE nombre = 'Depilaciones'), 'Depilación de cejas con cera', '20.000', 'Depilación completa con cera'),
((SELECT id FROM categorias WHERE nombre = 'Depilaciones'), 'Depilación de bozo', '20.000', 'Eliminación de vello facial'),
((SELECT id FROM categorias WHERE nombre = 'Depilaciones'), 'Depilación de rostro completo', '45.000', 'Tratamiento facial completo');

-- Insertar servicios para Manos & Pies
INSERT INTO servicios (categoria_id, nombre, precio, descripcion) VALUES
((SELECT id FROM categorias WHERE nombre = 'Manos & Pies'), 'Manicura tradicional', '30.000', 'Cuidado básico de manos'),
((SELECT id FROM categorias WHERE nombre = 'Manos & Pies'), 'Pedicura tradicional', '50.000', 'Cuidado básico de pies'),
((SELECT id FROM categorias WHERE nombre = 'Manos & Pies'), 'Manicura + Esmalte semipermanente 1 tono', '60.000', 'Manicura con durabilidad extendida'),
((SELECT id FROM categorias WHERE nombre = 'Manos & Pies'), 'Pedicura + Esmalte semipermanente 1 tono', '75.000', 'Pedicura con durabilidad extendida'),
((SELECT id FROM categorias WHERE nombre = 'Manos & Pies'), 'Diseño a mano alzada (el par)', '15.000', 'Arte personalizado en uñas'),
((SELECT id FROM categorias WHERE nombre = 'Manos & Pies'), 'Piedritas (el par)', '15.000', 'Decoración con piedras'),
((SELECT id FROM categorias WHERE nombre = 'Manos & Pies'), 'Extracción de esmalte semipermanente', '20.000', 'Remoción cuidadosa del esmalte');

-- Insertar servicios para Manitas Delicadas
INSERT INTO servicios (categoria_id, nombre, precio, descripcion) VALUES
((SELECT id FROM categorias WHERE nombre = 'Manitas Delicadas'), 'Acrílicas en nude hasta largo #2', '130.000', 'Extensiones naturales elegantes'),
((SELECT id FROM categorias WHERE nombre = 'Manitas Delicadas'), 'Acrílicas baby boomer hasta #2', '150.000', 'Técnica degradé francesa'),
((SELECT id FROM categorias WHERE nombre = 'Manitas Delicadas'), 'Acrílicas + esmaltado semipermanente 1 tono', '160.000', 'Extensiones con color duradero'),
((SELECT id FROM categorias WHERE nombre = 'Manitas Delicadas'), 'Kapping en acrílico', '100.000', 'Refuerzo de uñas naturales'),
((SELECT id FROM categorias WHERE nombre = 'Manitas Delicadas'), 'Kapping baby boomer', '130.000', 'Refuerzo con degradé'),
((SELECT id FROM categorias WHERE nombre = 'Manitas Delicadas'), 'Kapping + semipermanente 1 tono', '140.000', 'Refuerzo con color'),
((SELECT id FROM categorias WHERE nombre = 'Manitas Delicadas'), 'Encapsulados (el par)', '20.000', 'Decoración encapsulada'),
((SELECT id FROM categorias WHERE nombre = 'Manitas Delicadas'), 'Extracción de kapping', '30.000', 'Remoción profesional'),
((SELECT id FROM categorias WHERE nombre = 'Manitas Delicadas'), 'Extracción de acrílicas', '40.000', 'Remoción cuidadosa');

-- Insertar servicios para Color y Alisados
INSERT INTO servicios (categoria_id, nombre, precio, descripcion) VALUES
((SELECT id FROM categorias WHERE nombre = 'Color y Alisados'), 'Retoque de raíz', '70.000', 'Mantenimiento del color en raíces'),
((SELECT id FROM categorias WHERE nombre = 'Color y Alisados'), 'Color sobre color', '90.000', 'Cambio de tonalidad completo'),
((SELECT id FROM categorias WHERE nombre = 'Color y Alisados'), 'Aplicación de color', '45.000', 'Aplicación de tinte profesional'),
((SELECT id FROM categorias WHERE nombre = 'Color y Alisados'), 'Shock de keratina', '130.000', 'Tratamiento alisador y nutritivo');