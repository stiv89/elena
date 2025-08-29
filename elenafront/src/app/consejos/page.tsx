import { Metadata } from 'next';
import siteData from '../siteData.json';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Consejos de Belleza | Elena Benítez - Peluquería Profesional',
  description: 'Descubre consejos expertos sobre cuidado del cabello, maquillaje profesional y tendencias de belleza. Artículos escritos por Elena Benítez, peluquera profesional con más de 10 años de experiencia.',
  keywords: 'consejos belleza, cuidado cabello, maquillaje, tendencias belleza, peluquería consejos, Elena Benítez',
  openGraph: {
    title: 'Consejos de Belleza | Elena Benítez',
    description: 'Consejos expertos sobre cuidado del cabello, maquillaje y tendencias de belleza',
    type: 'website',
  },
};

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
      <p>El verano es una época maravillosa, pero también puede ser dura para nuestro cabello. El sol, el cloro de las piscinas, el agua salada del mar y la humedad pueden dañar seriamente nuestra melena.</p>
      
      <h3>Protección Solar para el Cabello</h3>
      <p>Así como protegemos nuestra piel del sol, debemos proteger nuestro cabello. Utiliza productos con SPF específicos para cabello o aceites protectores antes de exponerte al sol.</p>
      
      <h3>Rutina Post-Piscina</h3>
      <p>Después de nadar, enjuaga tu cabello inmediatamente con agua dulce para eliminar el cloro. Aplica un tratamiento hidratante profundo semanalmente.</p>
      
      <h3>Consejos Prácticos</h3>
      <ul>
        <li>Usa sombreros o pañuelos para proteger del sol</li>
        <li>Hidrata profundamente 1-2 veces por semana</li>
        <li>Evita el calor excesivo (secador, plancha)</li>
        <li>Corta las puntas regularmente</li>
      </ul>
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
      <p>En verano, menos es más. El maquillaje natural resalta tu belleza innata mientras te mantiene fresca en los días calurosos.</p>
      
      <h3>Base y Corrector</h3>
      <p>Opta por bases ligeras con cobertura media. Aplica corrector solo donde sea necesario, especialmente bajo los ojos.</p>
      
      <h3>Labios y Mejillas</h3>
      <p>Usa bálsamos tintados o labiales nude. Para las mejillas, un blush en crema o polvo translúcido en tonos melocotón.</p>
      
      <h3>Ojos y Cejas</h3>
      <p>Define las cejas con un lápiz o polvo mate. Para los ojos, una máscara de pestañas waterproof es esencial.</p>
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
      <p>Las cejas son el elemento más importante para enmarcar el rostro. Este año, las tendencias se inclinan hacia lo natural con toques modernos.</p>
      
      <h3>Cejas Naturales con Definición</h3>
      <p>La tendencia principal es mantener la forma natural de las cejas pero con una definición perfecta. Se busca un aspecto cuidado pero no artificial.</p>
      
      <h3>Técnicas Innovadoras</h3>
      <p>El microblading ha evolucionado hacia técnicas menos invasivas como el powder brows, que crea un efecto más natural y duradero.</p>
      
      <h3>Mantenimiento en Casa</h3>
      <p>Entre visitas al salón, mantén tus cejas perfectas con productos específicos y herramientas de precisión.</p>
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
      <p>Una rutina de cuidado facial adecuada no solo mejora la apariencia de tu piel, sino que también previene problemas futuros y mantiene la salud cutánea.</p>
      
      <h3>Paso 1: Limpieza</h3>
      <p>Comienza siempre con una limpieza profunda. Usa un limpiador suave que respete el pH de tu piel.</p>
      
      <h3>Paso 2: Tónico</h3>
      <p>El tónico ayuda a equilibrar el pH y prepara la piel para los siguientes productos.</p>
      
      <h3>Paso 3: Hidratación</h3>
      <p>Aplica un suero y luego una crema hidratante. Elige productos según tu tipo de piel.</p>
      
      <h3>Paso 4: Protección Solar</h3>
      <p>Termina siempre con protector solar, incluso en días nublados.</p>
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
      <p>Los colores de cabello para 2025 combinan lo natural con toques de modernidad, ofreciendo opciones para todos los gustos y ocasiones.</p>
      
      <h3>Tonos Naturales</h3>
      <p>Los marrones chocolate, castaños dorados y rubios miel siguen siendo los favoritos para un look elegante y versátil.</p>
      
      <h3>Colores Fantasía</h3>
      <p>Para las más atrevidas, los colores pastel y metálicos ofrecen un toque de diversión y personalidad.</p>
      
      <h3>Mantenimiento</h3>
      <p>Cualquiera que sea tu elección, el mantenimiento adecuado es clave para mantener el color vibrante por más tiempo.</p>
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
      <p>No necesitas horas para lucir un peinado perfecto. Con las técnicas y herramientas adecuadas, puedes crear looks elegantes en minutos.</p>
      
      <h3>El Moño Bajo Perfecto</h3>
      <p>Un clásico atemporal que nunca pasa de moda. Aprende la técnica para que quede pulido y profesional.</p>
      
      <h3>La Cola de Caballo Alta</h3>
      <p>Versátil y moderna, perfecta para cualquier ocasión. Consejos para que luzca voluminosa y elegante.</p>
      
      <h3>El Semirrecogido</h3>
      <p>La opción intermedia perfecta para un look casual pero arreglado.</p>
    `
  }
];

export default function ConsejosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-pink-100 to-purple-100 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <Breadcrumbs />
            <div className="text-center mt-8">
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Consejos de Belleza
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Descubre consejos expertos sobre cuidado del cabello, maquillaje profesional y las últimas tendencias de belleza. 
                Artículos escritos por Elena Benítez, tu peluquera de confianza en Luque.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-wrap gap-4 justify-center">
              {['Todos', 'Cuidado del Cabello', 'Maquillaje', 'Tendencias', 'Cuidado Facial', 'Peinados'].map((category) => (
                <button
                  key={category}
                  className="px-6 py-2 rounded-full border-2 border-pink-200 text-pink-700 hover:bg-pink-50 hover:border-pink-300 transition-all duration-300"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {consejos.map((articulo) => (
                <article key={articulo.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={articulo.image}
                      alt={articulo.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {articulo.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>{articulo.date}</span>
                      <span>•</span>
                      <span>{articulo.readTime} de lectura</span>
                    </div>
                    
                    <h3 className="font-playfair text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {articulo.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {articulo.excerpt}
                    </p>
                    
                    <a
                      href={`/consejos/${articulo.id}`}
                      className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-700 font-medium transition-colors"
                    >
                      Leer más
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-r from-purple-100 to-pink-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
              ¿Quieres más consejos?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Suscríbete a nuestro newsletter y recibe consejos exclusivos directamente en tu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
                Suscribirme
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
