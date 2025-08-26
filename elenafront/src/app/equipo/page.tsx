import Header from "../components/Header";
import Footer from "../components/Footer";
import TeamMemberCard from "../components/TeamMemberCard";
import siteData from "../siteData.json";

export const metadata = {
  title: 'Nuestro Equipo - Elena Benítez',
  description: 'Conocé al equipo profesional de Elena Benítez en Luque. Expertos en peluquería, maquillaje y estética.'
}

export default function TeamPage() {
  const team = (siteData as any).equipo ?? [
    { name: 'Elena Benítez', role: 'Estilista Principal', bio: 'Fundadora y estilista con más de 10 años de experiencia.', image: '' },
    { name: 'Asistente 1', role: 'Estilista', bio: 'Especialista en colorimetría y tratamientos capilares.', image: '' },
    { name: 'Asistente 2', role: 'Maquilladora', bio: 'Profesional en maquillaje social y novias.', image: '' },
  ];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />

      <main className="py-16 flex-1">
        <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-4xl font-bold text-gray-900">Nuestro Equipo</h1>
          <p className="text-gray-600 mt-2">Conocé a las profesionales que transforman la belleza en nuestro salón.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member: any, i: number) => (
            <TeamMemberCard
              key={member.name + i}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
            />
          ))}
        </div>

        {/* CTA para unirse al equipo */}
        <div className="mt-12 bg-amber-50 border border-amber-100 rounded-2xl p-6 text-center">
          <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2">¿Querés unirte a nuestro equipo?</h3>
          <p className="text-gray-700 mb-4">Si sos profesional en belleza y querés trabajar con nosotras, enviános un mensaje y te contactamos.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a href="/#contacto" className="inline-block bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors">Enviar mensaje</a>
            <a href={`https://wa.me/${(siteData as any).whatsapp.number}?text=${encodeURIComponent('Hola, quiero unirme al equipo de Elena Benítez')}`} target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors">Contactar por WhatsApp</a>
          </div>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
