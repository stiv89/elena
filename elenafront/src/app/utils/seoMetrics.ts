export const seoMetrics = {
  // Palabras clave principales y su densidad recomendada
  primaryKeywords: {
    'peluquería Luque': { density: '2-3%', monthly_searches: 1200 },
    'salón de belleza Luque': { density: '1-2%', monthly_searches: 800 },
    'peluquería Paraguay': { density: '1-2%', monthly_searches: 2500 },
    'Elena Benítez peluquería': { density: '1%', monthly_searches: 300 }
  },

  // Palabras clave secundarias
  secondaryKeywords: {
    'maquillaje profesional Luque': { density: '1%', monthly_searches: 400 },
    'tratamientos capilares Paraguay': { density: '1%', monthly_searches: 600 },
    'cejas Luque': { density: '1%', monthly_searches: 200 },
    'manicura Luque': { density: '0.5%', monthly_searches: 150 },
    'pedicura Luque': { density: '0.5%', monthly_searches: 120 },
    'mejor peluquería Luque': { density: '0.5%', monthly_searches: 300 }
  },

  // Long tail keywords
  longTailKeywords: [
    'mejor peluquería en Luque Paraguay',
    'salón de belleza profesional Luque',
    'maquillaje para novias Luque',
    'tratamientos capilares profesionales Paraguay',
    'peluquería cerca de mí Luque',
    'servicios a domicilio belleza Paraguay',
    'diseño de cejas profesional Luque',
    'extensiones de pestañas Luque Paraguay'
  ],

  // Local SEO términos
  localKeywords: [
    'Luque Paraguay',
    'Sportivo Luqueño Moisés Bertoni',
    'centro de Luque',
    'peluquería zona central Paraguay',
    'belleza integral Luque'
  ],

  // Competidores principales
  competitors: [
    { name: 'Salón María Luque', strengths: ['ubicación', 'antigüedad'] },
    { name: 'Bella Vista Estética', strengths: ['redes sociales', 'promociones'] },
    { name: 'Studio Glamour Paraguay', strengths: ['servicios premium', 'instalaciones'] }
  ],

  // Métricas de rendimiento objetivo
  performanceTargets: {
    pageLoadSpeed: '< 3 segundos',
    mobileScore: '> 95',
    coreWebVitals: {
      LCP: '< 2.5s',
      FID: '< 100ms',
      CLS: '< 0.1'
    },
    lighthouse: {
      performance: '> 90',
      accessibility: '> 95',
      bestPractices: '> 90',
      seo: '> 95'
    }
  },

  // Estrategias de contenido
  contentStrategy: {
    blogTopics: [
      'Tendencias de cabello Paraguay 2025',
      'Cuidados post-maquillaje para clima paraguayo',
      'Guía completa: Cómo elegir el corte perfecto para tu rostro',
      'Tendencias en cejas 2025: Lo que está de moda',
      'Preparación para novias: Timeline de belleza',
      'Cuidados capilares en verano paraguayo'
    ],
    servicePages: [
      'Maquillaje para novias Luque',
      'Tratamientos capilares profesionales',
      'Diseño de cejas en Luque',
      'Servicios a domicilio Paraguay',
      'Manicura y pedicura profesional'
    ]
  },

  // Link building strategy
  linkBuildingTargets: [
    'Directorios locales Paraguay',
    'Blogs de bodas Paraguay',
    'Influencers de belleza locales',
    'Páginas amarillas Paraguay',
    'Cámaras de comercio Luque'
  ],

  // Social signals targets
  socialTargets: {
    instagram: { followers: 5000, engagement: '> 5%' },
    facebook: { followers: 2000, reviews: '> 4.8 stars' },
    whatsapp: { response_time: '< 15 minutes' }
  }
};

// Función para calcular densidad de palabras clave
export function calculateKeywordDensity(content: string, keyword: string): number {
  const words = content.toLowerCase().split(/\s+/).length;
  const keywordOccurrences = (content.toLowerCase().match(new RegExp(keyword.toLowerCase(), 'g')) || []).length;
  return (keywordOccurrences / words) * 100;
}

// Función para validar métricas SEO
export function validateSEOMetrics(pageContent: string) {
  const results = {
    keywordDensity: {} as Record<string, {
      current: string;
      target: string;
      status: 'optimal' | 'low' | 'high';
    }>,
    recommendations: [] as string[],
    score: 0
  };

  // Verificar densidad de palabras clave principales
  Object.entries(seoMetrics.primaryKeywords).forEach(([keyword, data]) => {
    const density = calculateKeywordDensity(pageContent, keyword);
    const targetMin = parseFloat(data.density.split('-')[0]);
    const targetMax = parseFloat(data.density.split('-')[1]) || targetMin + 1;
    
    results.keywordDensity[keyword] = {
      current: density.toFixed(2) + '%',
      target: data.density,
      status: density >= targetMin && density <= targetMax ? 'optimal' : 
              density < targetMin ? 'low' : 'high'
    };
  });

  return results;
}

export default seoMetrics;
