

"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import siteData from "./siteData.json";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
// Galería dinámica: busca imágenes en /public/galeria
function GaleriaTrabajos() {
  const [fotos, setFotos] = useState<string[]>([]);

  useEffect(() => {
    setFotos([
      "galeria/1.jpg",
      "galeria/2.jpg",
      "galeria/3.jpg",
      "galeria/4.jpg",
      "galeria/5.jpg",
      "galeria/6.jpg",
    ]);
  }, []);

  return (
  <section className="py-12 px-4 max-w-5xl mx-auto animate-fadein">
      <h2 className="text-2xl font-bold text-center mb-8">Galería de trabajos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {fotos.map((src, i) => (
          <div key={src} className="rounded-xl overflow-hidden shadow bg-white transition-transform duration-300 hover:scale-105">
            <Image src={`/${src}`} alt={`Trabajo ${i + 1}`} width={320} height={180} className="object-cover w-full h-[180px]" />
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-sm text-neutral-500">Agregá tus fotos en <code className="bg-neutral-100 px-2 py-1 rounded">/public/galeria</code></p>
    </section>
  );
}

export default function Home() {
  return (
    <div className="font-sans bg-white text-black min-h-screen flex flex-col min-h-screen">
      <Header />
  {/* INICIO */}
  <section id="inicio" className="flex flex-col items-center justify-center py-12 px-4 gap-6 border-b border-neutral-200">
        <Image src="/local.jpg" alt="Foto destacada" width={320} height={180} className="rounded-xl shadow-lg object-cover mb-4" />
        <h1 className="text-3xl font-bold mb-2">Tu belleza en manos expertas en Luque</h1>
        <a
          href="https://wa.me/595981234567?text=Hola%20Elena,%20quiero%20reservar%20una%20cita"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black hover:bg-neutral-800 text-white font-semibold py-3 px-8 rounded-full shadow transition-all text-lg transform hover:scale-105 hover:shadow-xl duration-300"
        >
          Reservá tu cita
        </a>
      </section>

  {/* SOBRE NOSOTROS */}
  <section id="nosotros" className="max-w-3xl mx-auto py-12 px-4 flex flex-col md:flex-row items-center gap-8 border-b border-neutral-200">
        <Image src="/elena.jpg" alt="Elena Benítez" width={180} height={180} className="rounded-full shadow-lg object-cover" />
        <div>
          <h2 className="text-2xl font-bold mb-2">Sobre Elena Benítez</h2>
          <p className="mb-2">Con más de 10 años de experiencia, Elena y su equipo transforman tu belleza con pasión y dedicación. Su estilo combina técnica profesional y calidez humana, creando un ambiente de confianza y resultados excepcionales.</p>
          <p className="font-semibold">¡Te esperamos para que vivas la mejor experiencia de belleza en Luque!</p>
        </div>
      </section>

  {/* SERVICIOS */}
  <section id="servicios" className="bg-neutral-50 py-12 px-4 border-b border-neutral-200">
    <h2 className="text-2xl font-bold text-center mb-8">Servicios</h2>
    <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {siteDataRaw.servicios.map((cat: any, idx: number) => (
        <div key={cat.categoria} className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-neutral-200 animate-fadeinup">
          <h3 className="font-bold text-lg mb-2 text-pink-700">{cat.categoria}</h3>
          <p className="text-neutral-600 text-center mb-4">{cat.descripcion}</p>
          <a href="/servicios" className="mt-2 bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-neutral-800 transition">Ver más</a>
        </div>
      ))}
    </div>
  </section>

      {/* GALERÍA / TRABAJOS DINÁMICA */}
      <div id="galeria">
        <GaleriaTrabajos />
      </div>

  {/* UBICACIÓN Y CONTACTO */}
  <section id="contacto" className="bg-neutral-50 py-12 px-4 border-b border-neutral-200">
        <h2 className="text-2xl font-bold text-center mb-4">Ubicación y contacto</h2>
        <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
          <div className="flex-1">
            <p className="mb-2 font-semibold">Dirección:</p>
            <p className="mb-4">Luque, c/ Sportivo Luqueño y Moisés Bertoni, Código Postal 110930</p>
            <div className="flex gap-4 mb-4">
              <a href="https://wa.me/595981234567" target="_blank" className="bg-black hover:bg-neutral-800 text-white px-4 py-2 rounded-full font-semibold">WhatsApp</a>
              <a href="tel:+595981234567" className="bg-black hover:bg-neutral-800 text-white px-4 py-2 rounded-full font-semibold">Llamar</a>
              <a href="https://instagram.com/elenabenitez" target="_blank" className="bg-black hover:bg-neutral-800 text-white px-4 py-2 rounded-full font-semibold">Instagram</a>
            </div>
            <a href="https://maps.google.com/?q=Luque,+Sportivo+Luqueño+y+Moisés+Bertoni" target="_blank" className="underline text-black">Ver en Google Maps</a>
          </div>
          <div className="flex-1">
            <iframe
              src="https://www.google.com/maps?q=-25.2677,-57.4847&z=16&output=embed"
              width="100%"
              height="220"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen
              loading="lazy"
              title="Mapa Elena Benítez"
            ></iframe>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="py-12 px-4 max-w-4xl mx-auto border-b border-neutral-200">
        <h2 className="text-2xl font-bold text-center mb-8">Testimonios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex gap-4 items-center border border-neutral-200 animate-fadein">
            <Image src="/clienta1.jpg" alt="Clienta 1" width={64} height={64} className="rounded-full object-cover" />
            <div>
              <p className="font-semibold mb-1">María G.</p>
              <p className="text-sm">“Me encantó el trato y el resultado. Elena es súper profesional y amable. ¡Recomiendo totalmente!”</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex gap-4 items-center border border-neutral-200">
            <Image src="/clienta2.jpg" alt="Clienta 2" width={64} height={64} className="rounded-full object-cover" />
            <div>
              <p className="font-semibold mb-1">Lucía P.</p>
              <p className="text-sm">“Excelente atención y resultados. Volveré sin dudas. ¡Gracias Elena!”</p>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVAS */}
      <section className="bg-neutral-100 py-12 px-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-center mb-4">Reservá tu cita</h2>
        <p className="mb-6 text-center max-w-xl">Completá el formulario o escribinos por WhatsApp para agendar tu cita. ¡Te esperamos!</p>
        <form className="w-full max-w-md bg-white rounded-xl shadow p-6 flex flex-col gap-4 border border-neutral-200">
          <input type="text" placeholder="Nombre" className="border rounded px-3 py-2" required />
          <input type="tel" placeholder="Teléfono" className="border rounded px-3 py-2" required />
          <input type="text" placeholder="Servicio" className="border rounded px-3 py-2" required />
          <textarea placeholder="Mensaje" className="border rounded px-3 py-2" rows={3}></textarea>
          <button type="submit" className="bg-black hover:bg-neutral-800 text-white font-semibold py-2 px-6 rounded-full">Enviar</button>
        </form>
        <a href="https://calendly.com/elenabenitez/cita" target="_blank" className="mt-4 underline text-black">O agendá directamente en Calendly</a>
      </section>

  <Footer />
    </div>
  );
}
