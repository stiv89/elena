import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "🎯 Servicios Completos | Elena Benítez - Peluquería Luque Paraguay",
  description: "✨ Descubre todos nuestros servicios de belleza en Luque Paraguay: maquillaje profesional desde ₲75.000, tratamientos capilares desde ₲60.000, cejas perfectas desde ₲25.000, manicura y pedicura desde ₲30.000. +50 servicios profesionales. ¡Reservá ahora! ☎️ +595 991 743889",
  keywords: "servicios peluquería Luque, precios belleza Paraguay, maquillaje profesional Luque, tratamientos capilares Paraguay, cejas Luque precios, manicura pedicura Paraguay, alisados Luque, coloración cabello Paraguay, depilación Luque, extensiones uñas Paraguay, lavados cabello Luque, lifting pestañas Paraguay, diseño cejas profesional, uñas acrílicas Luque, shock keratina Paraguay, peinados eventos Luque",
  openGraph: {
    title: "🎯 Servicios Completos | Elena Benítez - Peluquería Luque",
    description: "✨ +50 servicios de belleza profesionales en Luque Paraguay: maquillaje, tratamientos capilares, cejas, manicura y más. Precios desde ₲15.000. ¡La mejor peluquería de Paraguay!",
    url: 'https://elenabenitez.com/servicios',
    siteName: 'Elena Benítez - Peluquería Profesional Luque',
    images: [
      {
        url: '/logoheader.png',
        width: 1200,
        height: 630,
        alt: 'Servicios completos de belleza en Luque Paraguay - Elena Benítez',
        type: 'image/png',
      },
    ],
    locale: 'es_PY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "🎯 Servicios Completos | Elena Benítez Peluquería Luque",
    description: "✨ +50 servicios de belleza profesionales en Luque Paraguay: maquillaje, cabello, cejas, uñas. Precios desde ₲15.000. ☎️ +595 991 743889",
    images: ['/logoheader.png'],
  },
  alternates: {
    canonical: 'https://elenabenitez.com/servicios',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Servicios de Belleza Elena Benítez",
            "description": "Servicios completos de peluquería y belleza en Luque Paraguay",
            "itemListElement": [
              {
                "@type": "Service",
                "position": 1,
                "name": "Maquillaje Profesional",
                "description": "Maquillaje para eventos, bodas y ocasiones especiales",
                "provider": {
                  "@type": "BeautySalon",
                  "name": "Elena Benítez Peluquería"
                },
                "areaServed": "Luque, Paraguay",
                "offers": {
                  "@type": "Offer",
                  "priceRange": "₲75.000 - ₲150.000",
                  "priceCurrency": "PYG"
                }
              },
              {
                "@type": "Service", 
                "position": 2,
                "name": "Tratamientos Capilares",
                "description": "Lavados, cortes, coloración y tratamientos nutritivos",
                "provider": {
                  "@type": "BeautySalon",
                  "name": "Elena Benítez Peluquería"
                },
                "areaServed": "Luque, Paraguay",
                "offers": {
                  "@type": "Offer",
                  "priceRange": "₲30.000 - ₲130.000",
                  "priceCurrency": "PYG"
                }
              },
              {
                "@type": "Service",
                "position": 3, 
                "name": "Diseño de Cejas",
                "description": "Perfilado profesional y diseño de cejas con henna",
                "provider": {
                  "@type": "BeautySalon",
                  "name": "Elena Benítez Peluquería"
                },
                "areaServed": "Luque, Paraguay",
                "offers": {
                  "@type": "Offer",
                  "priceRange": "₲15.000 - ₲50.000",
                  "priceCurrency": "PYG"
                }
              },
              {
                "@type": "Service",
                "position": 4,
                "name": "Manicura y Pedicura",
                "description": "Cuidado completo de manos y pies con esmalte tradicional y semipermanente",
                "provider": {
                  "@type": "BeautySalon", 
                  "name": "Elena Benítez Peluquería"
                },
                "areaServed": "Luque, Paraguay",
                "offers": {
                  "@type": "Offer",
                  "priceRange": "₲30.000 - ₲75.000",
                  "priceCurrency": "PYG"
                }
              }
            ]
          })
        }}
      />
    </>
  );
}
