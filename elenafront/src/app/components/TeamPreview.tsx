"use client";
import Image from "next/image";
import Link from "next/link";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  experience: string;
}

interface TeamPreviewProps {
  team: TeamMember[];
}

export default function TeamPreview({ team }: TeamPreviewProps) {
  // Encontrar a Elena como fundadora
  const elena = team.find(member => member.name.toLowerCase().includes('elena'));

  if (!elena) return null;

  // Asegurar que el rol sea "Fundadora & Estilista Principal"
  const elenaWithRole = {
    ...elena,
    role: 'Fundadora & Estilista Principal'
  };

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 via-white to-amber-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Conoce a nuestra fundadora
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Profesional apasionada que transforma tu belleza con dedicación y expertise
          </p>
        </div>

        {/* Elena - Fundadora */}
        <div className="flex flex-col items-center group">
          <div className="relative mb-6">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-amber-400 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-amber-500 ring-4 ring-amber-100">
              {elenaWithRole.image ? (
                <Image
                  src={elenaWithRole.image}
                  alt={`${elenaWithRole.name} - ${elenaWithRole.role}`}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center">
                  <span className="text-3xl md:text-4xl font-bold text-amber-900">
                    {elenaWithRole.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}

              {/* Corona de líder */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-amber-900 text-sm">👑</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center max-w-2xl">
            <h4 className="font-playfair text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
              {elenaWithRole.name}
            </h4>
            <p className="text-base md:text-lg text-amber-600 font-medium mb-4">
              {elenaWithRole.role}
            </p>
            {elenaWithRole.bio && (
              <p className="text-sm md:text-base text-gray-600 mb-4 leading-relaxed">
                {elenaWithRole.bio}
              </p>
            )}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {elenaWithRole.specialties.slice(0, 4).map((specialty, index) => (
                <span
                  key={index}
                  className="text-xs md:text-sm bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full font-medium"
                >
                  {specialty}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-500 font-medium">
              {elenaWithRole.experience} de experiencia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
