import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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
  title: "Elena Benítez - Belleza Integral | Salón de Belleza en Luque",
  description: "Salón de belleza profesional en Luque, Paraguay. Más de 10 años transformando tu belleza con pasión y dedicación. Servicios de maquillaje, cabello, cejas, pestañas, manicura y pedicura. Reserva tu cita: +595 991 743889",
  keywords: "salón de belleza, peluquería, maquillaje, cejas, pestañas, Luque, Paraguay, Elena Benítez, manicura, pedicura, tratamientos capilares, color de cabello, alisados, depilación, belleza integral",
  authors: [{ name: "Elena Benítez" }],
  creator: "Elena Benítez",
  publisher: "Elena Benítez Belleza Integral",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://elenabenitez.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Elena Benítez - Belleza Integral | Salón de Belleza en Luque",
    description: "Salón de belleza profesional en Luque, Paraguay. Más de 10 años transformando tu belleza con pasión y dedicación.",
    url: 'https://elenabenitez.com',
    siteName: 'Elena Benítez Belleza Integral',
    images: [
      {
        url: '/logoheader.png',
        width: 800,
        height: 600,
        alt: 'Elena Benítez - Salón de belleza en Luque',
      },
    ],
    locale: 'es_PY',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Elena Benítez - Belleza Integral | Salón de Belleza en Luque",
    description: "Salón de belleza profesional en Luque, Paraguay. Más de 10 años transformando tu belleza con pasión y dedicación.",
    images: ['/logoheader.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="geo.region" content="PY-Central" />
        <meta name="geo.placename" content="Luque" />
        <meta name="geo.position" content="-25.2677;-57.4847" />
        <meta name="ICBM" content="-25.2677, -57.4847" />
        <link rel="canonical" href="https://elenabenitez.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BeautySalon",
              "name": "Elena Benítez - Belleza Integral",
              "description": "Salón de belleza profesional en Luque, Paraguay. Más de 10 años transformando tu belleza con pasión y dedicación.",
              "url": "https://elenabenitez.com",
              "telephone": "+595991743889",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "c/ Sportivo Luqueño y Moisés Bertoni",
                "addressLocality": "Luque",
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
                  "dayOfWeek": [
                    "Monday",
                    "Tuesday", 
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                  ],
                  "opens": "08:00",
                  "closes": "18:00"
                }
              ],
              "priceRange": "₲₲",
              "image": "https://elenabenitez.com/logoheader.png",
              "sameAs": [
                "https://wa.me/595991743889",
                "https://maps.app.goo.gl/zj6ryu1VgCUjv5hY8"
              ]
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
