"use client";
import siteDataRaw from "../siteData.json";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Servicios() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-10">Nuestros Servicios</h1>
        <div className="max-w-5xl mx-auto">
          {siteDataRaw.servicios.map((cat, idx) => (
            <section key={cat.categoria} className="mb-12 animate-fadeinup">
              <h2 className="text-2xl font-bold mb-2 text-pink-700">{cat.categoria}</h2>
              <p className="mb-4 text-neutral-600">{cat.descripcion}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cat.servicios.map((serv, i) => (
                  <div key={serv.nombre} className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-neutral-200 transition-transform duration-300 hover:scale-105">
                    <h4 className="font-semibold mb-1 text-lg">{serv.nombre}</h4>
                    <p className="mb-2 text-sm">Gs. {serv.precio}</p>
                    <a href={`https://wa.me/595981234567?text=Hola%20Elena,%20quiero%20consultar%20sobre%20${encodeURIComponent(serv.nombre)}`} target="_blank" className="text-black hover:underline">Consultar</a>
                  </div>
                ))}
              </div>
              {cat.obs && <p className="mt-4 text-xs text-neutral-500 italic">{cat.obs}</p>}
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
