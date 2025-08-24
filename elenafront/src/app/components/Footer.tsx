"use client";
import Image from "next/image";
import footerDataRaw from "../footerData.json";

export default function Footer() {
  const footerData = footerDataRaw.footer;
  return (
    <footer className="bg-neutral-900 text-neutral-100 pt-12 pb-6 px-4 mt-auto animate-fadeinup">
      <style jsx global>{`
        .animate-fadeinup {
          animation: fadeinup 1.2s ease;
        }
        @keyframes fadeinup {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-neutral-700 pb-8">
        <div className="flex flex-col items-start gap-2">
          {footerData.logo ? (
            <Image src={footerData.logo} alt="Logo" width={48} height={48} className="mb-2" />
          ) : (
            <span className="font-serif text-xl font-bold tracking-tight">{footerData.name}</span>
          )}
          <span className="font-serif text-sm text-neutral-400">{footerData.subtitle}</span>
          <span className="mt-2 text-neutral-200 italic">{footerData.phrase}</span>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Enlaces rápidos</h3>
          <ul className="flex flex-col gap-2">
            {footerData.quickLinks.map((link: any) => (
              <li key={link.text}>
                <a href={link.anchor} className="hover:text-pink-400 transition">{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold mb-2">Contacto</h3>
          <p className="text-sm">{footerData.contact.direccion}</p>
          <p className="text-sm">📞 <a href={footerData.contact.whatsapp} className="underline">{footerData.contact.telefono}</a></p>
          {footerData.contact.correo && (
            <p className="text-sm">✉️ <a href={`mailto:${footerData.contact.correo}`} className="underline">{footerData.contact.correo}</a></p>
          )}
          <div className="flex gap-3 mt-2">
            {footerData.social.map((s: any) => (
              <a key={s.type} href={s.url} target="_blank" rel="noopener" aria-label={s.type} className={
                s.type === "instagram" ? "hover:text-pink-400" :
                s.type === "facebook" ? "hover:text-blue-400" :
                s.type === "tiktok" ? "hover:text-neutral-400" : ""
              }>
                {s.type === "instagram" && <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.396 3.678 1.378c-.982.982-1.247 2.093-1.306 3.374C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.281.324 2.392 1.306 3.374.981.982 2.093 1.247 3.374 1.306C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.281-.059 2.392-.324 3.374-1.306.982-.982 1.247-2.093 1.306-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.324-2.392-1.306-3.374-.981-.982-2.093-1.247-3.374-1.306C15.668.013 15.259 0 12 0z"/><circle cx="12" cy="12" r="3.5"/><circle cx="18.406" cy="5.594" r="1.44"/></svg>}
                {s.type === "facebook" && <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0"/></svg>}
                {s.type === "tiktok" && <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12.004 2c2.21 0 4.004 1.794 4.004 4.004v11.992c0 2.21-1.794 4.004-4.004 4.004s-4.004-1.794-4.004-4.004V6.004C8 3.794 9.794 2 12.004 2zm0 1.5c-1.381 0-2.504 1.123-2.504 2.504v11.992c0 1.381 1.123 2.504 2.504 2.504s2.504-1.123 2.504-2.504V6.004c0-1.381-1.123-2.504-2.504-2.504z"/></svg>}
              </a>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Horario de atención</h3>
            {footerData.horario.map((h: string, i: number) => (
              <p key={i} className="text-sm">{h}</p>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-400">
        <span>{footerData.legal}</span>
        <span>{footerData.creditos}</span>
      </div>
    </footer>
  );
}
