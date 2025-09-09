import Header from "../components/Header";
import Footer from "../components/Footer";
import TeamConnectedLayout from "../components/TeamConnectedLayout";
import JobApplicationForm from "../components/JobApplicationForm";
import Link from "next/link";
import siteData from "../siteData.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Nuestro Equipo - Elena Benítez',
  description: 'Conocé al equipo profesional de Elena Benítez en Luque. Expertos en peluquería, maquillaje y estética.',
  keywords: 'equipo Elena Benítez, peluqueras Luque, estilistas Paraguay, maquilladoras profesionales Luque',
  openGraph: {
    title: 'Nuestro Equipo - Elena Benítez Peluquería',
    description: 'Conocé a Elena, Luján y Adriana - profesionales expertas en belleza en Luque Paraguay',
    images: [
      {
        url: '/nosotros.jpg',
        width: 800,
        height: 600,
        alt: 'Equipo Elena Benítez - Profesionales de la belleza en Luque'
      }
    ]
  }
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  experience: string;
}

export default function TeamPage() {
  const team: TeamMember[] = (siteData as { equipo?: TeamMember[] }).equipo ?? [
    {
      name: 'Elena Benítez',
      role: 'Fundadora & Estilista Principal',
      bio: 'Con más de 10 años de experiencia transformando la belleza de las mujeres de Luque.',
      image: '/nosotros.jpg',
      specialties: ['Coloración Profesional', 'Tratamientos Capilares'],
      experience: '10+ años'
    },
    {
      name: 'Luján García',
      role: 'Estilista Senior',
      bio: 'Especialista en cortes modernos y tendencias.',
      image: '',
      specialties: ['Cortes Creativos', 'Coloración Fantasía'],
      experience: '6 años'
    },
    {
      name: 'Adriana López',
      role: 'Maquilladora Profesional',
      bio: 'Experta en maquillaje para novias y eventos especiales.',
      image: '',
      specialties: ['Maquillaje de Novias', 'Tratamientos Faciales'],
      experience: '8 años'
    },
  ];

  // Structured Data para SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Elena Benítez Peluquería",
    "description": "Peluquería profesional en Luque Paraguay especializada en belleza integral",
    "url": "https://elenabenitez.com",
    "logo": "https://elenabenitez.com/logoheader.png",
    "image": "https://elenabenitez.com/nosotros.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "c/ Sportivo Luqueño y Moisés Bertoni",
      "addressLocality": "Luque",
      "addressRegion": "Central",
      "addressCountry": "PY"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+595-991-743889",
      "contactType": "customer service",
      "availableLanguage": "Spanish"
    },
    "employee": team.map(member => ({
      "@type": "Person",
      "name": member.name,
      "jobTitle": member.role,
      "description": member.bio,
      "image": member.image ? `https://elenabenitez.com${member.image}` : undefined,
      "worksFor": {
        "@type": "Organization",
        "name": "Elena Benítez Peluquería"
      },
      "knowsAbout": member.specialties,
      "hasOccupation": {
        "@type": "Occupation",
        "name": member.role,
        "experienceRequirements": member.experience
      }
    }))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 text-black flex flex-col">
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      <Header />

      <main className="flex-1">
        {/* Hero section del equipo */}
        <div className="bg-gradient-to-r from-amber-100 to-amber-200 py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Nuestro Equipo Profesional
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
              Tres profesionales apasionadas unidas por la pasión de realzar tu belleza natural
            </p>
          </div>
        </div>

        {/* Layout conectado del equipo */}
        <TeamConnectedLayout team={team} />

        {/* CTA para unirse al equipo */}
        <div className="bg-white border-t border-amber-100">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  ¿Querés unirte a nuestro equipo?
                </h3>
                <p className="text-gray-700 text-lg mb-6 max-w-2xl mx-auto">
                  Si sos profesional en belleza y querés trabajar con nosotras, completá el formulario o enviános un mensaje.
                </p>
              </div>

              {/* Formulario de aplicación */}
              <div className="mb-8">
                <JobApplicationForm whatsappNumber={(siteData as { whatsapp: { number: string } }).whatsapp.number} />
              </div>

              {/* Enlaces alternativos */}
              <div className="border-t border-amber-200 pt-6">
                <p className="text-sm text-gray-600 text-center mb-4">¿Preferís contactarnos de otra forma?</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/#contacto"
                    className="inline-block bg-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Enviar mensaje
                  </Link>
                  <a
                    href={`https://wa.me/${(siteData as { whatsapp: { number: string } }).whatsapp.number}?text=${encodeURIComponent('Hola, quiero unirme al equipo de Elena Benítez')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Contactar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
