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
  // Encontrar a Elena como líder central
  const elena = team.find(member => member.name.toLowerCase().includes('elena'));
  const otherMembers = team.filter(member => !member.name.toLowerCase().includes('elena'));

  if (!elena) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 via-white to-amber-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Conoce a nuestro equipo
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tres profesionales apasionadas trabajando juntas para realzar tu belleza natural
          </p>
        </div>

        {/* Layout horizontal simplificado */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Miembro izquierdo */}
          {otherMembers[0] && (
            <div className="flex flex-col items-center group">
              <div className="relative mb-4">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-3 border-amber-200 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-amber-400">
                  {otherMembers[0].image ? (
                    <Image
                      src={otherMembers[0].image}
                      alt={otherMembers[0].name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <span className="text-xl md:text-2xl font-bold text-amber-800">
                        {otherMembers[0].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-playfair text-lg font-semibold text-gray-900 mb-1">
                  {otherMembers[0].name}
                </h4>
                <p className="text-sm text-amber-600 font-medium mb-2">
                  {otherMembers[0].role}
                </p>
                <div className="flex flex-wrap justify-center gap-1 mb-2">
                  {otherMembers[0].specialties.slice(0, 2).map((specialty, index) => (
                    <span
                      key={index}
                      className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Elena - Líder central */}
          <div className="flex flex-col items-center group z-10">
            <div className="relative mb-4">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-amber-400 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-amber-500 ring-4 ring-amber-100">
                {elena.image ? (
                  <Image
                    src={elena.image}
                    alt={elena.name}
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center">
                    <span className="text-2xl md:text-3xl font-bold text-amber-900">
                      {elena.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}

                {/* Corona de líder */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-amber-900 text-xs">👑</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h4 className="font-playfair text-xl font-semibold text-gray-900 mb-1">
                {elena.name}
              </h4>
              <p className="text-sm text-amber-600 font-medium mb-2">
                {elena.role}
              </p>
              <div className="flex flex-wrap justify-center gap-1 mb-2">
                {elena.specialties.slice(0, 2).map((specialty, index) => (
                  <span
                    key={index}
                    className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                {elena.experience}
              </p>
            </div>
          </div>

          {/* Miembro derecho */}
          {otherMembers[1] && (
            <div className="flex flex-col items-center group">
              <div className="relative mb-4">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-3 border-amber-200 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-amber-400">
                  {otherMembers[1].image ? (
                    <Image
                      src={otherMembers[1].image}
                      alt={otherMembers[1].name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <span className="text-xl md:text-2xl font-bold text-amber-800">
                        {otherMembers[1].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center">
                <h4 className="font-playfair text-lg font-semibold text-gray-900 mb-1">
                  {otherMembers[1].name}
                </h4>
                <p className="text-sm text-amber-600 font-medium mb-2">
                  {otherMembers[1].role}
                </p>
                <div className="flex flex-wrap justify-center gap-1 mb-2">
                  {otherMembers[1].specialties.slice(0, 2).map((specialty, index) => (
                    <span
                      key={index}
                      className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Conectores SVG simplificados */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 300"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Conector izquierdo a Elena */}
          {otherMembers[0] && (
            <path
              d="M 200 150 Q 300 120 400 150"
              stroke="#f59e0b"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,3"
              className="animate-pulse"
              opacity="0.5"
            />
          )}

          {/* Conector derecho a Elena */}
          {otherMembers[1] && (
            <path
              d="M 600 150 Q 500 120 400 150"
              stroke="#f59e0b"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6,3"
              className="animate-pulse"
              opacity="0.5"
            />
          )}
        </svg>

        {/* CTA para ver más */}
        <div className="text-center mt-12">
          <Link
            href="/equipo"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Conocer más sobre nuestro equipo
          </Link>
        </div>
      </div>
    </section>
  );
}
