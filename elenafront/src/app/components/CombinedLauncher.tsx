"use client";
import { useState, useRef, useEffect } from 'react';
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';
import { SparklesIcon } from './ChatIcons';
import IsaAssistant from './IsaAssistant';

interface CombinedLauncherProps {
  whatsappNumber: string;
  whatsappMessage: string;
  enabled?: boolean;
}

export default function CombinedLauncher({
  whatsappNumber,
  whatsappMessage = "Hola, quiero más información",
  enabled = true
}: CombinedLauncherProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIsaOpen, setIsIsaOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { trackWhatsAppClick, trackAppointmentIntent } = useGoogleAnalytics();

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleWhatsAppClick = () => {
    trackWhatsAppClick('combined_launcher');
    trackAppointmentIntent('whatsapp');
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
    setIsMenuOpen(false);
  };

  const handleIsaClick = () => {
    setIsIsaOpen(true);
    setIsMenuOpen(false);
  };

  const closeIsa = () => {
    setIsIsaOpen(false);
  };

  if (!enabled) return null;

  return (
    <>
      {/* Launcher principal */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50" ref={menuRef}>
        {/* Menú expandido */}
        {isMenuOpen && (
          <div className="absolute bottom-16 right-0 mb-2 space-y-2 animate-fadein">
            {/* Opción WhatsApp */}
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 group"
            >
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.106"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">WhatsApp</div>
                <div className="text-xs opacity-90">Respuesta inmediata</div>
              </div>
            </button>

            {/* Opción Isa */}
            <button
              onClick={handleIsaClick}
              className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 group"
            >
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">Hablar con Isa</div>
                <div className="text-xs opacity-90">Asistente virtual</div>
              </div>
            </button>
          </div>
        )}

        {/* Botón principal */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-12 sm:w-14 h-12 sm:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isMenuOpen ? 'rotate-45' : ''
          }`}
          title="Opciones de contacto"
        >
          {isMenuOpen ? (
            <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>

        {/* Tooltip */}
        <div className={`absolute bottom-14 sm:bottom-16 right-0 bg-black text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 ${
          isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          ¡Hola! ¿En qué te ayudo?
          <div className="absolute top-full right-3 sm:right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
        </div>
      </div>

      <IsaAssistant
        embedded
        isOpen={isIsaOpen}
        onClose={closeIsa}
        position="right"
      />
    </>
  );
}
