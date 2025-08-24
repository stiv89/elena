"use client";
import Image from "next/image";
import siteDataRaw from "../siteData.json";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = siteDataRaw.header;
  return (
    <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-neutral-200">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          {header.logo ? (
            <Image src={header.logo} alt="Logo" width={40} height={40} />
          ) : (
            <span className="font-serif text-2xl font-bold tracking-tight">{header.name}</span>
          )}
          <span className="font-serif text-xs text-neutral-500 ml-2">{header.subtitle}</span>
        </div>
        <ul className="hidden md:flex items-center gap-6 font-sans text-base">
          {header.menu.map((item: any) => (
            <li key={item.text}><a href={item.anchor} className="hover:text-pink-600">{item.text}</a></li>
          ))}
        </ul>
        <a href={header.cta.url} target="_blank" rel="noopener" className="hidden md:inline-block bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold px-6 py-2 rounded-full shadow hover:scale-105 transition">{header.cta.text}</a>
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          <span className="block w-6 h-0.5 bg-black mb-1"></span>
          <span className="block w-6 h-0.5 bg-black mb-1"></span>
          <span className="block w-6 h-0.5 bg-black"></span>
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 shadow-lg">
          <ul className="flex flex-col items-center gap-4 py-4 font-sans text-lg">
            {header.menu.map((item: any) => (
              <li key={item.text}><a href={item.anchor} className="hover:text-pink-600" onClick={()=>setMenuOpen(false)}>{item.text}</a></li>
            ))}
            <li><a href={header.cta.url} target="_blank" rel="noopener" className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold px-6 py-2 rounded-full shadow mt-2">{header.cta.text}</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
