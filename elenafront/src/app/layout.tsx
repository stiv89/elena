import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "🥇 Peluquería Luque | Elena Benítez - Mejor Salón de Belleza Paraguay",
  description: "⭐ Mejor peluquería en Luque Paraguay ✨ Más de 10 años transformando tu belleza. Maquillaje profesional, tratamientos capilares, cejas perfectas, manicura y pedicura. ¡Reservá ahora! ☎️ +595 991 743889",
  keywords: "peluquería Luque, salón de belleza Luque, peluquería Paraguay, mejor peluquería Luque, Elena Benítez peluquería, maquillaje Luque, tratamientos capilares Paraguay, cejas Luque, manicura Luque, pedicura Luque, alisado Paraguay, color de cabello Luque, depilación Luque, belleza integral Paraguay, estilista profesional Luque, salón de belleza profesional Paraguay, peluquería cerca de mí, maquillaje para novias Luque, tratamientos faciales Paraguay, extensiones de cabello Luque, diseño de cejas Luque, lifting de pestañas Paraguay, uñas acrílicas Luque, servicio a domicilio Paraguay, centro de belleza Luque",
  authors: [{ name: "Elena Benítez - Estilista Profesional" }],
  creator: "Elena Benítez - Peluquería Profesional Luque",
  publisher: "Elena Benítez Belleza Integral",
  category: "Beauty Salon",
  classification: "Local Business",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://elenabenitez.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es': '/',
      'es-PY': '/',
    },
  },
  openGraph: {
    title: "🥇 Peluquería Luque | Elena Benítez - Mejor Salón de Belleza Paraguay",
    description: "⭐ Mejor peluquería en Luque Paraguay ✨ Más de 10 años transformando tu belleza. Servicios profesionales: maquillaje, tratamientos capilares, cejas perfectas. ¡Reservá ahora!",
    url: 'https://elenabenitez.com',
    siteName: 'Elena Benítez - Peluquería Profesional Luque',
    images: [
      {
        url: '/logoheader.png',
        width: 1200,
        height: 630,
        alt: 'Elena Benítez - Mejor Peluquería en Luque Paraguay',
        type: 'image/png',
      },
      {
        url: '/clienta3.jpg',
        width: 800,
        height: 600,
        alt: 'Servicios profesionales de belleza en Luque - Elena Benítez',
        type: 'image/jpeg',
      },
    ],
    locale: 'es_PY',
    type: 'website',
    countryName: 'Paraguay',
  },
  twitter: {
    card: 'summary_large_image',
    title: "🥇 Peluquería Luque | Elena Benítez - Mejor Salón Paraguay",
    description: "⭐ Mejor peluquería en Luque Paraguay ✨ +10 años transformando tu belleza. Maquillaje, tratamientos capilares, cejas perfectas. ¡Reservá ahora! ☎️ +595 991 743889",
    images: [
      {
        url: '/logoheader.png',
        alt: 'Elena Benítez - Mejor Peluquería en Luque Paraguay',
        width: 1200,
        height: 630,
      }
    ],
    creator: '@ElenaBenitezPY',
    site: '@ElenaBenitezPY',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'pending-verification',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" type="image/png" href="/logoheader.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logoheader.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logoheader.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logoheader.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#d4af37" />
        <meta name="msapplication-TileColor" content="#d4af37" />
        <meta name="geo.region" content="PY-Central" />
        <meta name="geo.placename" content="Luque, Paraguay" />
        <meta name="geo.position" content="-25.2677;-57.4847" />
        <meta name="ICBM" content="-25.2677, -57.4847" />
        <meta name="rating" content="5" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="target" content="all" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Elena Benítez Peluquería" />
        <meta name="application-name" content="Elena Benítez Peluquería Luque" />
        <meta name="msapplication-tooltip" content="Mejor Peluquería en Luque Paraguay" />
        <meta name="DC.title" content="Elena Benítez - Peluquería Profesional en Luque Paraguay" />
        <meta name="DC.creator" content="Elena Benítez" />
        <meta name="DC.subject" content="Peluquería, Salón de Belleza, Luque, Paraguay" />
        <meta name="DC.description" content="Mejor peluquería en Luque Paraguay con más de 10 años de experiencia" />
        <link rel="canonical" href="https://elenabenitez.com" />
        <meta name="next-size-adjust" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/logoheader.png" as="image" type="image/png" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//wa.me" />
        
        {/* SEO JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              "name": "Elena Benítez - Peluquería Profesional",
              "alternateName": "Elena Benítez Belleza Integral",
              "description": "Mejor peluquería en Luque Paraguay con más de 10 años de experiencia. Servicios profesionales de maquillaje, tratamientos capilares, cejas, manicura y pedicura.",
              "url": "https://elenabenitez.com",
              "telephone": "+595991743889",
              "email": "contacto@elenabenitez.com",
              "founder": {
                "@type": "Person",
                "name": "Elena Benítez",
                "jobTitle": "Estilista Profesional",
                "worksFor": "Elena Benítez Peluquería"
              },
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "c/ Sportivo Luqueño y Moisés Bertoni",
                "addressLocality": "Luque",
                "addressRegion": "Central",
                "postalCode": "110930",
                "addressCountry": "PY"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-25.2677",
                "longitude": "-57.4847"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "08:00",
                  "closes": "18:00"
                }
              ],
              "priceRange": "₲₲",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "100",
                "bestRating": "5"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "María G."
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5"
                  },
                  "reviewBody": "Me encantó el trato y el resultado. Elena es súper profesional y amable. ¡Recomiendo totalmente!"
                }
              ]
            })
          }}
        />
        
        {/* Local Business Schema for better local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Elena Benítez Peluquería",
              "description": "Mejor peluquería en Luque Paraguay",
              "url": "https://elenabenitez.com",
              "telephone": "+595991743889",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "c/ Sportivo Luqueño y Moisés Bertoni",
                "addressLocality": "Luque",
                "addressRegion": "Central",
                "postalCode": "110930",
                "addressCountry": "PY"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-25.2677",
                "longitude": "-57.4847"
              },
              "openingHours": "Mo-Sa 08:00-18:00",
              "priceRange": "₲₲"
            })
          }}
        />
        
        {/* WebSite Schema para Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Elena Benítez - Peluquería Profesional Luque",
              "url": "https://elenabenitez.com",
              "description": "Mejor peluquería en Luque Paraguay. Servicios profesionales de maquillaje, tratamientos capilares, cejas, manicura y pedicura.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://elenabenitez.com/servicios?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "mainEntity": {
                "@type": "Organization",
                "name": "Elena Benítez Peluquería",
                "url": "https://elenabenitez.com"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4B82YMTN2P"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4B82YMTN2P', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              send_page_view: true,
              custom_map: {
                'custom_parameter_1': 'business_category'
              }
            });
            
            // Track business events
            gtag('event', 'page_view', {
              'custom_parameter_1': 'beauty_salon',
              'business_location': 'Luque_Paraguay'
            });
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
