"use client";
import Image from "next/image";

export default function TeamMemberCard({
  name,
  role,
  bio,
  image,
}: {
  name: string;
  role: string;
  bio: string;
  image?: string;
}) {
  const initials = name.split(' ').map(n => n[0]).slice(0,2).join('');

  return (
    <div className="bg-white rounded-2xl shadow-elegant p-6 text-center">
      <div className="mx-auto mb-4 w-28 h-28 rounded-full overflow-hidden flex items-center justify-center bg-gray-100">
        {image ? (
          <Image src={image} alt={name} width={112} height={112} className="object-cover w-full h-full" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-700">{initials}</div>
        )}
      </div>
      <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-1">{name}</h3>
      <p className="text-sm text-amber-600 font-medium mb-3">{role}</p>
      <p className="text-sm text-gray-700 leading-relaxed">{bio}</p>
    </div>
  );
}
