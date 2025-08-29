import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import siteData from '../../siteData.json';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import ArticuloClient from './ArticuloClient';

const consejos = [
  {
    id: 'cuidado-cabello-verano',
    title: 'Cuidado del Cabello en Verano: Protege tu Melena del Sol y el Cloro',
    excerpt: 'Descubre cómo mantener tu cabello saludable durante los meses de verano con rutinas específicas y productos recomendados.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Cuidado del Cabello',
    date: '2025-08-15',
    readTime: '5 min',
    content: `
      <h2>La Importancia del Cuidado Capilar en Verano</h2>
      <p>El verano es una época maravillosa, pero también puede ser dura para nuestro cabello. El sol, el cloro de las piscinas, el agua salada del mar y la humedad pueden dañar seriamente nuestra melena. En Elena Benítez, con más de 10 años de experiencia, hemos visto cómo muchos factores ambientales afectan la salud del cabello de nuestras clientas.</p>

      <h3>Protección Solar para el Cabello</h3>
      <p>Así como protegemos nuestra piel del sol con protector solar, debemos proteger nuestro cabello. Los rayos UV pueden descolorar el cabello, resecarlo y hacer que se vuelva quebradizo. Recomendamos usar productos con SPF específicos para cabello o aceites protectores antes de exponerte al sol.</p>

      <p>En nuestro salón utilizamos tratamientos especializados que incluyen protección UV para mantener tu color vibrante durante toda la temporada de verano.</p>

      <h3>Rutina Post-Piscina</h3>
      <p>Después de nadar en piscina, es crucial enjuagar tu cabello inmediatamente con agua dulce para eliminar los residuos de cloro. El cloro es altamente abrasivo y puede abrir las cutículas del cabello, causando frizz y pérdida de color.</p>

      <p>Te recomendamos aplicar un tratamiento hidratante profundo al menos una vez por semana durante el verano. Nuestros tratamientos de hidratación profesional pueden restaurar la humedad perdida y fortalecer tu cabello.</p>

      <h3>Consejos Prácticos para el Verano</h3>
      <ul>
        <li><strong>Usa sombreros o pañuelos:</strong> Protege tu cabello del sol directo, especialmente durante las horas pico (10 AM - 4 PM)</li>
        <li><strong>Hidrata profundamente:</strong> Aplica tratamientos intensivos 1-2 veces por semana</li>
        <li><strong>Evita el calor excesivo:</strong> Reduce el uso de secador, plancha y rizadores durante el verano</li>
        <li><strong>Corta las puntas regularmente:</strong> Elimina las puntas abiertas cada 6-8 semanas</li>
        <li><strong>Usa productos leave-in:</strong> Aplica protectores térmicos y solares diariamente</li>
        <li><strong>Bebe más agua:</strong> La hidratación interna también afecta la salud de tu cabello</li>
      </ul>

      <h3>Tratamientos Recomendados en Nuestro Salón</h3>
      <p>Para mantener tu cabello en óptimas condiciones durante el verano, te recomendamos nuestros tratamientos especializados:</p>
      <ul>
        <li><strong>Hidratación Profunda:</strong> Tratamiento intensivo con keratina y aceites naturales</li>
        <li><strong>Protección UV:</strong> Tratamientos que incluyen filtros solares capilares</li>
        <li><strong>Baño de Brillante:</strong> Para restaurar el brillo natural perdido por el sol</li>
        <li><strong>Cortes Preventivos:</strong> Mantenimiento regular para eliminar puntas dañadas</li>
      </ul>

      <p>Recuerda que en Elena Benítez estamos aquí para asesorarte personalmente sobre el mejor cuidado para tu tipo de cabello. ¡Visítanos en Luque y descubre cómo mantener tu melena perfecta durante todo el verano!</p>
    `
  },
  {
    id: 'maquillaje-natural-verano',
    title: 'Maquillaje Natural para el Verano: Fresco y Luminoso',
    excerpt: 'Aprende a crear un maquillaje natural perfecto para los días calurosos, manteniendo la frescura y comodidad durante todo el día.',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Maquillaje',
    date: '2025-08-10',
    readTime: '4 min',
    content: `
      <h2>El Arte del Maquillaje Natural</h2>
      <p>En verano, menos es más. El maquillaje natural resalta tu belleza innata mientras te mantiene fresca en los días calurosos. Como maquilladora profesional con más de 10 años de experiencia, he perfeccionado técnicas que realzan la belleza natural sin sobrecargar la piel.</p>

      <h3>Preparación de la Piel</h3>
      <p>La base de un buen maquillaje natural es una piel bien preparada. Comienza con una limpieza profunda y aplica una crema hidratante ligera. En verano, es especialmente importante usar productos oil-free para evitar el brillo excesivo.</p>

      <h3>Base y Corrector</h3>
      <p>Opta por bases ligeras con cobertura media. En nuestro salón recomendamos bases con SPF incorporado para protección adicional. Aplica corrector solo donde sea necesario, especialmente bajo los ojos y en imperfecciones puntuales.</p>

      <p>La técnica del "baking" con polvo translúcido puede ayudar a fijar el maquillaje y controlar el brillo durante todo el día.</p>

      <h3>Labios y Mejillas</h3>
      <p>Para los labios, usa bálsamos tintados o labiales nude que hidraten mientras dan color. Evita los labiales mate muy pigmentados que pueden resecar los labios en el calor.</p>

      <p>Para las mejillas, un blush en crema o polvo translúcido en tonos melocotón o rosa suave crea un efecto natural y saludable.</p>

      <h3>Ojos y Cejas</h3>
      <p>Las cejas son el marco del rostro. Define las cejas con un lápiz o polvo mate que combine con tu tono natural. Un relleno ligero mantendrá la forma sin verse artificial.</p>

      <p>Para los ojos, una máscara de pestañas waterproof es esencial en verano. Si usas sombras, opta por tonos neutros y difumina bien para evitar que se corran con el sudor.</p>

      <h3>Productos Recomendados</h3>
      <ul>
        <li><strong>Bases ligeras:</strong> Con cobertura media y SPF 30+</li>
        <li><strong>Polvos fijadores:</strong> Translucidos para controlar el brillo</li>
        <li><strong>Máscaras waterproof:</strong> Para pestañas que duren todo el día</li>
        <li><strong>Labiales hidratantes:</strong> Con color natural y efecto gloss</li>
      </ul>

      <p>En Elena Benítez ofrecemos servicios de maquillaje profesional para ocasiones especiales, pero también enseñamos técnicas para que puedas lograr estos looks en casa. ¡Ven a visitarnos y descubre tu maquillaje natural perfecto!</p>
    `
  },
  {
    id: 'tendencias-cejas-2025',
    title: 'Tendencias de Cejas 2025: Lo último en Diseño de Cejas',
    excerpt: 'Descubre las tendencias más actuales en diseño de cejas para este año, desde formas naturales hasta técnicas innovadoras.',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Tendencias',
    date: '2025-08-05',
    readTime: '6 min',
    content: `
      <h2>Las Cejas: El Marco Perfecto del Rostro</h2>
      <p>Las cejas son el elemento más importante para enmarcar el rostro y expresar emociones. Este año, las tendencias se inclinan hacia lo natural con toques modernos, buscando un equilibrio perfecto entre forma y expresión personal.</p>

      <h3>Cejas Naturales con Definición</h3>
      <p>La tendencia principal es mantener la forma natural de las cejas pero con una definición perfecta. Se busca un aspecto cuidado pero no artificial. Esto significa:</p>
      <ul>
        <li>Respetar el arco natural de cada persona</li>
        <li>Definir sin exagerar el grosor</li>
        <li>Mantener la asimetría natural del rostro</li>
        <li>Usar productos que imiten el vello natural</li>
      </ul>

      <h3>Técnicas Innovadoras</h3>
      <p>El microblading ha evolucionado hacia técnicas menos invasivas como el powder brows, que crea un efecto más natural y duradero. Esta técnica usa puntos pequeños para simular el vello real, creando un efecto de cejas llenas pero naturales.</p>

      <p>Otra tendencia emergente es el "ombré brows", que crea un degradado natural desde el inicio hasta la cola de la ceja.</p>

      <h3>Colores Adaptados</h3>
      <p>Los colores para cejas se adaptan mejor al tono de piel y cabello. Ya no se busca el negro intenso, sino tonos que complementen la paleta personal de cada clienta.</p>

      <h3>Mantenimiento en Casa</h3>
      <p>Entre visitas al salón, mantener tus cejas perfectas es fácil con los productos adecuados:</p>
      <ul>
        <li><strong>Cera o pinza:</strong> Para eliminar vellos rebeldes</li>
        <li><strong>Lápiz de cejas:</strong> Para definición diaria</li>
        <li><strong>Polvo fijador:</strong> Para mantener la forma</li>
        <li><strong>Tinte:</strong> Para mantener el color uniforme</li>
      </ul>

      <h3>Servicios Profesionales en Elena Benítez</h3>
      <p>En nuestro salón ofrecemos:</p>
      <ul>
        <li><strong>Diseño personalizado:</strong> Adaptado a tu forma facial</li>
        <li><strong>Técnicas avanzadas:</strong> Microblading, powder brows, henna</li>
        <li><strong>Mantenimiento:</strong> Retoques cada 3-4 semanas</li>
        <li><strong>Asesoría:</strong> Te ayudamos a elegir el mejor look para ti</li>
      </ul>

      <p>Recuerda que las cejas perfectas realzan tu belleza natural. ¡Ven a Elena Benítez y descubre cómo podemos enmarcar perfectamente tu rostro!</p>
    `
  },
  {
    id: 'rutina-cuidado-facial',
    title: 'Rutina de Cuidado Facial Diaria: Paso a Paso',
    excerpt: 'Aprende a crear una rutina de cuidado facial efectiva y personalizada para mantener tu piel radiante y saludable.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Cuidado Facial',
    date: '2025-07-28',
    readTime: '7 min',
    content: `
      <h2>La Importancia de una Rutina Facial Consistente</h2>
      <p>Una rutina de cuidado facial adecuada no solo mejora la apariencia de tu piel, sino que también previene problemas futuros y mantiene la salud cutánea. Con más de 10 años atendiendo clientas en Luque, he visto cómo una rutina consistente transforma la piel.</p>

      <h3>Conoce tu Tipo de Piel</h3>
      <p>Antes de comenzar cualquier rutina, es fundamental identificar tu tipo de piel: normal, seca, grasa, mixta o sensible. Cada tipo requiere productos y frecuencias diferentes.</p>

      <h3>Paso 1: Limpieza Mañana y Noche</h3>
      <p>Comienza siempre con una limpieza profunda. Usa un limpiador suave que respete el pH de tu piel (entre 5.5 y 6.5). Por la mañana, elimina residuos de productos nocturnos. Por la noche, remueve maquillaje, contaminación y sebo acumulado.</p>

      <h3>Paso 2: Tónico Equilibrante</h3>
      <p>El tónico ayuda a equilibrar el pH de la piel después de la limpieza y prepara la piel para absorber mejor los siguientes productos. Elige tónicos sin alcohol para evitar resecamiento.</p>

      <h3>Paso 3: Hidratación Diaria</h3>
      <p>La hidratación es clave para mantener la barrera protectora de la piel. Aplica un suero (con activos específicos según tus necesidades) y luego una crema hidratante. Elige productos según tu tipo de piel.</p>

      <h3>Paso 4: Protección Solar</h3>
      <p>Termina siempre tu rutina matutina con protector solar, incluso en días nublados. El SPF 30+ es mínimo recomendado. La protección solar previene arrugas, manchas y cáncer de piel.</p>

      <h3>Rutinas Específicas por Tipo de Piel</h3>

      <h4>Piel Seca</h4>
      <ul>
        <li>Limpiador cremoso sin sulfatos</li>
        <li>Tónico hidratante</li>
        <li>Suero con ácido hialurónico</li>
        <li>Crema rica en humectantes</li>
        <li>Protector solar oil-free</li>
      </ul>

      <h4>Piel Grasa</h4>
      <ul>
        <li>Limpiador gel oil-free</li>
        <li>Tónico matificante</li>
        <li>Suero con niacinamida</li>
        <li>Crema ligera oil-free</li>
        <li>Protector solar mate</li>
      </ul>

      <h3>Tratamientos Semanales</h3>
      <p>Además de la rutina diaria, incluye tratamientos semanales:</p>
      <ul>
        <li><strong>Máscara hidratante:</strong> 1-2 veces por semana</li>
        <li><strong>Exfoliación:</strong> 1-2 veces por semana (química o física)</li>
        <li><strong>Tratamiento específico:</strong> Según necesidades (acné, manchas, envejecimiento)</li>
      </ul>

      <h3>Servicios Profesionales</h3>
      <p>En Elena Benítez ofrecemos tratamientos faciales profesionales que complementan tu rutina en casa:</p>
      <ul>
        <li><strong>Limpieza profunda:</strong> Remoción de impurezas y puntos negros</li>
        <li><strong>Hidratación intensiva:</strong> Tratamientos con activos concentrados</li>
        <li><strong>Tratamientos anti-edad:</strong> Para prevenir y reducir arrugas</li>
        <li><strong>Tratamientos despigmentantes:</strong> Para manchas y uniformizar el tono</li>
      </ul>

      <p>Recuerda que la consistencia es clave. Una rutina simple pero constante dará mejores resultados que tratamientos esporádicos costosos. ¡Tu piel te lo agradecerá!</p>
    `
  },
  {
    id: 'colores-cabello-temporada',
    title: 'Colores de Cabello para esta Temporada: Tendencias 2025',
    excerpt: 'Explora las paletas de colores más populares para cabello este año, desde tonos naturales hasta colores audaces y modernos.',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Tendencias',
    date: '2025-07-20',
    readTime: '5 min',
    content: `
      <h2>La Paleta de Colores del Año</h2>
      <p>Los colores de cabello para 2025 combinan lo natural con toques de modernidad, ofreciendo opciones para todos los gustos y ocasiones. Como colorista profesional, ayudo a mis clientas a elegir el tono perfecto que realce su belleza natural.</p>

      <h3>Tonos Naturales que Nunca Fallan</h3>
      <p>Los marrones chocolate, castaños dorados y rubios miel siguen siendo los favoritos para un look elegante y versátil. Estos tonos:</p>
      <ul>
        <li>Complementan todo tipo de piel</li>
        <li>Son fáciles de mantener</li>
        <li>Envejecen bien con el tiempo</li>
        <li>Se pueden adaptar a diferentes estaciones</li>
      </ul>

      <h3>Rubios Modernos</h3>
      <p>Los rubios siguen evolucionando con tonos más naturales y menos agresivos:</p>
      <ul>
        <li><strong>Rubio miel:</strong> Dorado y cálido</li>
        <li><strong>Rubio ceniza:</strong> Fresco y moderno</li>
        <li><strong>Rubio beige:</strong> Neutro y elegante</li>
        <li><strong>Rubio caramelo:</strong> Con toques marrones</li>
      </ul>

      <h3>Castaños con Personalidad</h3>
      <p>Los castaños ofrecen profundidad y sofisticación:</p>
      <ul>
        <li><strong>Castaño chocolate:</strong> Rico y profundo</li>
        <li><strong>Castaño borgoña:</strong> Con toques rojizos</li>
        <li><strong>Castaño dorado:</strong> Brillante y luminoso</li>
      </ul>

      <h3>Colores Fantasía para las Atrevidas</h3>
      <p>Para las más audaces, los colores pastel y metálicos ofrecen un toque de diversión:</p>
      <ul>
        <li><strong>Rosados suaves:</strong> Pastel o dusty</li>
        <li><strong>Azules metálicos:</strong> Con destellos plateados</li>
        <li><strong>Violetas profundos:</strong> Elegantes y modernos</li>
      </ul>

      <h3>Mantenimiento del Color</h3>
      <p>Cualquiera que sea tu elección, el mantenimiento adecuado es clave:</p>
      <ul>
        <li><strong>Champús sin sulfatos:</strong> Para preservar el color</li>
        <li><strong>Tratamientos semanales:</strong> Para mantener la hidratación</li>
        <li><strong>Retoques regulares:</strong> Cada 4-6 semanas según el tono</li>
        <li><strong>Protección solar:</strong> Para evitar decoloración</li>
      </ul>

      <h3>Nuestros Servicios de Coloración</h3>
      <p>En Elena Benítez ofrecemos técnicas profesionales:</p>
      <ul>
        <li><strong>Coloración completa:</strong> Cambio total de tono</li>
        <li><strong>Retoques de raíz:</strong> Mantenimiento del color</li>
        <li><strong>Balayage y ombre:</strong> Técnicas naturales y luminosas</li>
        <li><strong>Iluminaciones:</strong> Para añadir dimensión</li>
        <li><strong>Tratamientos post-color:</strong> Para mantener el color vibrante</li>
      </ul>

      <p>El color perfecto es aquel que te hace sentir segura y hermosa. ¡Ven a consultarnos y encontremos juntos tu tono ideal!</p>
    `
  },
  {
    id: 'peinados-rapidos',
    title: 'Peinados Rápidos y Elegantes para el Día a Día',
    excerpt: 'Descubre peinados prácticos que puedes hacer en minutos, perfectos para el trabajo, la universidad o una salida casual.',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Peinados',
    date: '2025-07-15',
    readTime: '4 min',
    content: `
      <h2>Peinados Prácticos para tu Rutina Diaria</h2>
      <p>No necesitas horas para lucir un peinado perfecto. Con las técnicas y herramientas adecuadas, puedes crear looks elegantes en minutos. Como peluquera profesional, te enseño los secretos para peinados rápidos pero impactantes.</p>

      <h3>El Moño Bajo Perfecto</h3>
      <p>Un clásico atemporal que nunca pasa de moda. El secreto está en la técnica:</p>
      <ol>
        <li>Cepilla el cabello hacia atrás</li>
        <li>Gira el cabello en un rodete</li>
        <li>Fija con horquillas estratégicamente</li>
        <li>Tira de algunos mechones para suavizar</li>
      </ol>
      <p>Perfecto para el trabajo o ocasiones formales, y se puede adaptar con accesorios.</p>

      <h3>La Cola de Caballo Alta</h3>
      <p>Versátil y moderna, perfecta para cualquier ocasión. Consejos para que luzca voluminosa:</p>
      <ul>
        <li>Recoge el cabello en la coronilla</li>
        <li>Tira de algunos cabellos para crear volumen</li>
        <li>Envuelve un mechón alrededor de la liga</li>
        <li>Añade textura con un poco de spray</li>
      </ul>

      <h3>El Semirrecogido</h3>
      <p>La opción intermedia perfecta para un look casual pero arreglado:</p>
      <ul>
        <li>Recoge la parte superior del cabello</li>
        <li>Deja suelto el resto para movimiento</li>
        <li>Añade ondas o rizos para más volumen</li>
        <li>Decora con accesorios discretos</li>
      </ul>

      <h3>Herramientas Esenciales</h3>
      <p>Para lograr estos peinados necesitas:</p>
      <ul>
        <li><strong>Cepillo redondo:</strong> Para volumen</li>
        <li><strong>Horquillas:</strong> En tonos que combinen con tu cabello</li>
        <li><strong>Ligas elásticas:</strong> De tela para menos daño</li>
        <li><strong>Spray fijador:</strong> Ligero para mantener la forma</li>
      </ul>

      <h3>Peinados por Tipo de Cabello</h3>

      <h4>Cabello Liso</h4>
      <p>Aprovecha la suavidad para moños elegantes y colas pulidas.</p>

      <h4>Cabello Rizado</h4>
      <p>Los rizos naturales añaden volumen y movimiento a cualquier peinado.</p>

      <h4>Cabello Corto</h4>
      <p>Enfócate en texturas y accesorios para crear impacto.</p>

      <h3>Servicios Profesionales</h3>
      <p>En Elena Benítez podemos enseñarte estas técnicas y crear peinados personalizados para ocasiones especiales:</p>
      <ul>
        <li><strong>Clases de peinado:</strong> Aprende técnicas profesionales</li>
        <li><strong>Peinados para eventos:</strong> Desde bodas hasta fiestas</li>
        <li><strong>Cortes funcionales:</strong> Que faciliten peinados diarios</li>
        <li><strong>Tratamientos para el cabello:</strong> Para mejor manejo</li>
      </ul>

      <p>Recuerda: la práctica hace al maestro. ¡Empieza con estos peinados básicos y pronto crearás looks espectaculares en minutos!</p>
    `
  }
];

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const articulo = consejos.find(c => c.id === id);

  if (!articulo) {
    return {
      title: 'Artículo no encontrado | Elena Benítez',
    };
  }

  return {
    title: `${articulo.title} | Consejos de Belleza`,
    description: articulo.excerpt,
    keywords: `${articulo.category}, consejos belleza, ${siteData.site.keywords}`,
    openGraph: {
      title: articulo.title,
      description: articulo.excerpt,
      type: 'article',
      images: [articulo.image],
    },
  };
}

// The client rendering has been moved to ArticuloClient.tsx (starts with 'use client')

export default async function ArticuloPage({ params }: PageProps) {
  const { id } = await params;
  const articulo = consejos.find(c => c.id === id);

  if (!articulo) {
    notFound();
  }

  const related = consejos.filter(c => c.id !== articulo.id && c.category === articulo.category).slice(0, 3);

  return <ArticuloClient articulo={articulo} related={related} />;
}
