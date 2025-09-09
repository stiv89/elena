"use client";
import Image from "next/image";
import { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
  experience: string;
}

interface TeamConnectedLayoutProps {
  team: TeamMember[];
}

export default function TeamConnectedLayout({ team }: TeamConnectedLayoutProps) {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  // Encontrar a Elena como líder central
  const elena = team.find(member => member.name.toLowerCase().includes('elena'));
  const otherMembers = team.filter(member => !member.name.toLowerCase().includes('elena'));

  if (!elena) return null;

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-16">
      {/* Título */}
      <div className="text-center mb-16">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Nuestro Equipo
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Profesionales apasionadas que transforman tu belleza con dedicación y expertise
        </p>
      </div>

      {/* Layout conectado */}
      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        {/* Miembros del equipo */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Miembro izquierdo */}
          {otherMembers[0] && (
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredMember(otherMembers[0].name)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative">
                {/* Foto circular */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-amber-200 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-amber-400">
                  {otherMembers[0].image ? (
                    <Image
                      src={otherMembers[0].image}
                      alt={`${otherMembers[0].name} - ${otherMembers[0].role} en Elena Benítez Peluquería Luque`}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full"
                      priority={true}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <span className="text-2xl md:text-3xl font-bold text-amber-800">
                        {otherMembers[0].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Información hover */}
                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 min-w-64 transition-all duration-300 ${
                  hoveredMember === otherMembers[0].name
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                }`}>
                  <h4 className="font-playfair text-lg font-semibold text-gray-900 mb-1">
                    {otherMembers[0].name}
                  </h4>
                  <p className="text-sm text-amber-600 font-medium mb-2">
                    {otherMembers[0].role}
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    {otherMembers[0].bio}
                  </p>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">Especialidades:</span>
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {otherMembers[0].specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      <span className="font-medium">Experiencia:</span> {otherMembers[0].experience}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Elena - Líder central */}
          <div
            className="relative group cursor-pointer z-10"
            onMouseEnter={() => setHoveredMember(elena.name)}
            onMouseLeave={() => setHoveredMember(null)}
          >
            <div className="relative">
              {/* Foto circular más grande para Elena */}
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-amber-500 ring-4 ring-amber-100">
                {elena.image ? (
                  <Image
                    src={elena.image}
                    alt={`${elena.name} - Fundadora y Estilista Principal de Elena Benítez Peluquería en Luque Paraguay`}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                    priority={true}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-amber-200 to-amber-300 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl font-bold text-amber-900">
                      {elena.name.split(' ').map(n => n[0]).join('')}
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

              {/* Información hover para Elena */}
              <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 min-w-72 transition-all duration-300 ${
                hoveredMember === elena.name
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
              }`}>
                <h4 className="font-playfair text-xl font-semibold text-gray-900 mb-1">
                  {elena.name}
                </h4>
                <p className="text-sm text-amber-600 font-medium mb-2">
                  {elena.role}
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  {elena.bio}
                </p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Especialidades:</span>
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {elena.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    <span className="font-medium">Experiencia:</span> {elena.experience}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Miembro derecho */}
          {otherMembers[1] && (
            <div
              className="relative group cursor-pointer"
              onMouseEnter={() => setHoveredMember(otherMembers[1].name)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative">
                {/* Foto circular */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-amber-200 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:border-amber-400">
                  {otherMembers[1].image ? (
                    <Image
                      src={otherMembers[1].image}
                      alt={`${otherMembers[1].name} - ${otherMembers[1].role} en Elena Benítez Peluquería Luque`}
                      width={160}
                      height={160}
                      className="object-cover w-full h-full"
                      priority={true}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                      <span className="text-2xl md:text-3xl font-bold text-amber-800">
                        {otherMembers[1].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Información hover */}
                <div className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 min-w-64 transition-all duration-300 ${
                  hoveredMember === otherMembers[1].name
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                }`}>
                  <h4 className="font-playfair text-lg font-semibold text-gray-900 mb-1">
                    {otherMembers[1].name}
                  </h4>
                  <p className="text-sm text-amber-600 font-medium mb-2">
                    {otherMembers[1].role}
                  </p>
                  <p className="text-sm text-gray-700 mb-3">
                    {otherMembers[1].bio}
                  </p>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">
                      <span className="font-medium">Especialidades:</span>
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {otherMembers[1].specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      <span className="font-medium">Experiencia:</span> {otherMembers[1].experience}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Conectores SVG curvos */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 800 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Conector izquierdo a Elena */}
          {otherMembers[0] && (
            <path
              d="M 150 200 Q 250 150 350 200"
              stroke="#f59e0b"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8,4"
              className="animate-pulse"
              opacity="0.6"
            />
          )}

          {/* Conector derecho a Elena */}
          {otherMembers[1] && (
            <path
              d="M 650 200 Q 550 150 450 200"
              stroke="#f59e0b"
              strokeWidth="3"
              fill="none"
              strokeDasharray="8,4"
              className="animate-pulse"
              opacity="0.6"
            />
          )}

          {/* Círculos decorativos en las conexiones */}
          {otherMembers[0] && (
            <circle
              cx="250"
              cy="175"
              r="4"
              fill="#f59e0b"
              className="animate-ping"
              opacity="0.8"
            />
          )}
          {otherMembers[1] && (
            <circle
              cx="550"
              cy="175"
              r="4"
              fill="#f59e0b"
              className="animate-ping"
              opacity="0.8"
            />
          )}
        </svg>
      </div>

      {/* Estadísticas del equipo */}
      <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-600 mb-2">10+</div>
          <div className="text-sm text-gray-600">Años de Experiencia</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-600 mb-2">1000+</div>
          <div className="text-sm text-gray-600">Clientas Satisfechas</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-600 mb-2">50+</div>
          <div className="text-sm text-gray-600">Certificaciones</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-600 mb-2">5★</div>
          <div className="text-sm text-gray-600">Calificación Promedio</div>
        </div>
      </div>
    </div>
  );
}
