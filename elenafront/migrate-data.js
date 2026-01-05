import { supabase } from './supabase-client.js';

const serviciosData = [
  {
    "categoria": "Lavados",
    "descripcion": "Servicios de lavado y tratamientos capilares premium",
    "icon": "hair-wash",
    "color": "#e3f2fd",
    "servicios": [
      { "nombre": "Lavado clásico", "precio": "60.000", "descripcion": "Servicio básico de lavado profesional" },
      { "nombre": "Lavado nutritivo", "precio": "75.000", "descripcion": "Tratamiento hidratante profundo" },
      { "nombre": "Lavado matizador + baño", "precio": "85.000", "descripcion": "Para mantener el color perfecto" },
      { "nombre": "Lavado + tto. Post color", "precio": "85.000", "descripcion": "Cuidado especializado post-coloración" },
      { "nombre": "Secado", "precio": "20.000", "descripcion": "Secado profesional" },
      { "nombre": "Brushing", "precio": "30.000", "descripcion": "Peinado con cepillo y calor" },
      { "nombre": "Planchita", "precio": "30.000", "descripcion": "Alisado con plancha profesional" },
      { "nombre": "Gorro térmico (add)", "precio": "15.000", "descripcion": "Intensificación de tratamientos" },
      { "nombre": "Corte recto", "precio": "30.000", "descripcion": "Corte clásico profesional" }
    ],
    "obs": "Todos los lavados incluyen brushing + planchita. El costo varía según el largo y volumen del cabello."
  },
  {
    "categoria": "Maquillajes & Compañía",
    "descripcion": "Maquillajes, peinados y tratamientos faciales",
    "icon": "makeup",
    "color": "#fce4ec",
    "servicios": [
      { "nombre": "Peinados", "precio": "70.000", "descripcion": "Peinados para ocasiones especiales" },
      { "nombre": "Medio maquillaje", "precio": "75.000", "descripcion": "Maquillaje natural para el día" },
      { "nombre": "Maquillaje express", "precio": "90.000", "descripcion": "Maquillaje rápido y efectivo" },
      { "nombre": "Maquillaje social", "precio": "110.000", "descripcion": "Para eventos y celebraciones" },
      { "nombre": "Maquillaje Glam", "precio": "150.000", "descripcion": "Maquillaje de gala y alta costura" },
      { "nombre": "Aplicación de pestaña", "precio": "20.000", "descripcion": "Pestañas postizas naturales" },
      { "nombre": "Aplicación + Pestaña 3D", "precio": "35.000", "descripcion": "Pestañas con efecto voluminoso" },
      { "nombre": "Limpieza facial express", "precio": "25.000", "descripcion": "Limpieza rápida y profunda" },
      { "nombre": "Baño de luna en brazos", "precio": "45.000", "descripcion": "Tratamiento iluminador para brazos" },
      { "nombre": "Baño de luna en rostro", "precio": "40.000", "descripcion": "Tratamiento iluminador facial" }
    ],
    "obs": "Todos los peinados incluyen lavado y brushing. Todos los maquillajes incluyen limpieza facial express. El baño de luna incluye preparación de la piel en ambas zonas, humectación y protección solar."
  },
  {
    "categoria": "Cejas & Pestañas",
    "descripcion": "Diseño y tratamientos para cejas y pestañas",
    "icon": "eye",
    "color": "#f3e5f5",
    "servicios": [
      { "nombre": "Diseño de cejas + perfilado", "precio": "25.000", "descripcion": "Diseño personalizado según tu rostro" },
      { "nombre": "Diseño de cejas + henna", "precio": "50.000", "descripcion": "Cejas perfectas con tinte natural" },
      { "nombre": "Aplicación de henna", "precio": "30.000", "descripcion": "Tinte natural duradero" },
      { "nombre": "Lifting de pestañas", "precio": "90.000", "descripcion": "Curvado y alargado natural" }
    ],
    "obs": "Todos nuestros tratamientos de cejas incluyen asesoramiento personalizado para encontrar la forma perfecta para tu rostro."
  },
  {
    "categoria": "Depilaciones",
    "descripcion": "Servicios de depilación profesional",
    "icon": "wax",
    "color": "#fff3e0",
    "servicios": [
      { "nombre": "Perfilado de cejas", "precio": "15.000", "descripcion": "Perfilado preciso de cejas" },
      { "nombre": "Depilación de cejas con cera", "precio": "20.000", "descripcion": "Depilación completa con cera" },
      { "nombre": "Depilación de bozo", "precio": "20.000", "descripcion": "Eliminación de vello facial" },
      { "nombre": "Depilación de rostro completo", "precio": "45.000", "descripcion": "Tratamiento facial completo" }
    ],
    "obs": "Utilizamos ceras de alta calidad para minimizar molestias y obtener mejores resultados."
  },
  {
    "categoria": "Manos & Pies",
    "descripcion": "Cuidado integral de manos y pies",
    "icon": "hands-feet",
    "color": "#e8f5e8",
    "servicios": [
      { "nombre": "Manicura tradicional", "precio": "30.000", "descripcion": "Cuidado básico de manos" },
      { "nombre": "Pedicura tradicional", "precio": "50.000", "descripcion": "Cuidado básico de pies" },
      { "nombre": "Manicura + Esmalte semipermanente 1 tono", "precio": "60.000", "descripcion": "Manicura con durabilidad extendida" },
      { "nombre": "Pedicura + Esmalte semipermanente 1 tono", "precio": "75.000", "descripcion": "Pedicura con durabilidad extendida" },
      { "nombre": "Diseño a mano alzada (el par)", "precio": "15.000", "descripcion": "Arte personalizado en uñas" },
      { "nombre": "Piedritas (el par)", "precio": "15.000", "descripcion": "Decoración con piedras" },
      { "nombre": "Extracción de esmalte semipermanente", "precio": "20.000", "descripcion": "Remoción cuidadosa del esmalte" }
    ],
    "obs": "La extracción de semipermanente incluye base protectora en las uñas."
  },
  {
    "categoria": "Manitas Delicadas",
    "descripcion": "Extensiones y técnicas avanzadas para uñas",
    "icon": "nail-art",
    "color": "#fdf2f8",
    "servicios": [
      { "nombre": "Acrílicas en nude hasta largo #2", "precio": "130.000", "descripcion": "Extensiones naturales elegantes" },
      { "nombre": "Acrílicas baby boomer hasta #2", "precio": "150.000", "descripcion": "Técnica degradé francesa" },
      { "nombre": "Acrílicas + esmaltado semipermanente 1 tono", "precio": "160.000", "descripcion": "Extensiones con color duradero" },
      { "nombre": "Kapping en acrílico", "precio": "100.000", "descripcion": "Refuerzo de uñas naturales" },
      { "nombre": "Kapping baby boomer", "precio": "130.000", "descripcion": "Refuerzo con degradé" },
      { "nombre": "Kapping + semipermanente 1 tono", "precio": "140.000", "descripcion": "Refuerzo con color" },
      { "nombre": "Encapsulados (el par)", "precio": "20.000", "descripcion": "Decoración encapsulada" },
      { "nombre": "Extracción de kapping", "precio": "30.000", "descripcion": "Remoción profesional" },
      { "nombre": "Extracción de acrílicas", "precio": "40.000", "descripcion": "Remoción cuidadosa" }
    ],
    "obs": "La extracción de kapping o acrílico incluye hidratación de cutículas + esmaltado tradicional. Service de kapping y esculpidas: consultar presupuesto."
  },
  {
    "categoria": "Color y Alisados",
    "descripcion": "Servicios de coloración y alisado capilar",
    "icon": "hair-color",
    "color": "#f0f4ff",
    "servicios": [
      { "nombre": "Retoque de raíz", "precio": "70.000", "descripcion": "Mantenimiento del color en raíces" },
      { "nombre": "Color sobre color", "precio": "90.000", "descripcion": "Cambio de tonalidad completo" },
      { "nombre": "Aplicación de color", "precio": "45.000", "descripcion": "Aplicación de tinte profesional" },
      { "nombre": "Shock de keratina", "precio": "130.000", "descripcion": "Tratamiento alisador y nutritivo" }
    ],
    "obs": "Todos los precios son desde el monto indicado y pueden variar según largo y tipo de cabello. Consultar presupuesto personalizado."
  }
];

async function migrateData() {
  for (const cat of serviciosData) {
    // Insertar categoría
    const { data: categoria, error: catError } = await supabase
      .from('categorias')
      .insert({
        nombre: cat.categoria,
        descripcion: cat.descripcion,
        icon: cat.icon,
        color: cat.color,
        obs: cat.obs
      })
      .select()
      .single();

    if (catError) {
      console.error('Error inserting categoria:', catError);
      continue;
    }

    // Insertar servicios
    const serviciosToInsert = cat.servicios.map(serv => ({
      categoria_id: categoria.id,
      nombre: serv.nombre,
      precio: serv.precio,
      descripcion: serv.descripcion
    }));

    const { error: servError } = await supabase
      .from('servicios')
      .insert(serviciosToInsert);

    if (servError) {
      console.error('Error inserting servicios:', servError);
    }
  }

  console.log('Migración completada');
}

migrateData().catch(console.error);