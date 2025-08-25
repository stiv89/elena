"use client";
import { useState, useRef, useEffect } from 'react';
import siteData from '../siteData.json';
import { ChatIcon, BotIcon, SparklesIcon } from './ChatIcons';
import SvgIcon from './SvgIcon';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface IsaAssistantProps {
  enabled?: boolean;
}

export default function IsaAssistant({ enabled = true }: IsaAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      // Mensaje de bienvenida inicial
      const welcomeMessage: Message = {
        id: '1',
        text: '¡Hola! Soy Isa, tu asistente virtual de Elena Benítez Belleza Integral. ¿En qué puedo ayudarte hoy? Puedo informarte sobre nuestros servicios, precios, horarios o ayudarte a reservar una cita.',
        isBot: true,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Saludos
    if (message.includes('hola') || message.includes('buenos') || message.includes('buenas')) {
      return '¡Hola! Me alegra saludarte. Soy Isa, tu asistente virtual. ¿Te gustaría saber sobre nuestros servicios, precios o quizás reservar una cita?';
    }
    
    // Servicios generales
    if (message.includes('servicio') || message.includes('que hacen') || message.includes('que ofrecen')) {
      const serviciosResumen = siteData.servicios.map(cat => cat.categoria).join(', ');
      return `Ofrecemos una amplia gama de servicios de belleza: ${serviciosResumen}. ¿Te interesa alguna categoría en particular?`;
    }
    
    // Precios
    if (message.includes('precio') || message.includes('costo') || message.includes('cuanto')) {
      if (message.includes('maquillaje')) {
        const maquillaje = siteData.servicios.find(s => s.categoria.includes('Maquillaje'));
        if (maquillaje) {
          const ejemplos = maquillaje.servicios.slice(0, 3).map(s => `• ${s.nombre}: ₲${s.precio}`).join('\n');
          return `Estos son algunos precios de maquillaje:\n${ejemplos}\n\n¿Te interesa algún servicio específico?`;
        }
      }
      
      if (message.includes('cabello') || message.includes('pelo') || message.includes('lavado')) {
        const cabello = siteData.servicios.find(s => s.categoria.includes('Lavados'));
        if (cabello) {
          const ejemplos = cabello.servicios.slice(0, 3).map(s => `• ${s.nombre}: ₲${s.precio}`).join('\n');
          return `Estos son algunos precios de servicios capilares:\n${ejemplos}\n\n¿Te interesa algún tratamiento específico?`;
        }
      }
      
      if (message.includes('uña') || message.includes('manicura') || message.includes('pedicura')) {
        const unas = siteData.servicios.find(s => s.categoria.includes('Manos'));
        if (unas) {
          const ejemplos = unas.servicios.slice(0, 3).map(s => `• ${s.nombre}: ₲${s.precio}`).join('\n');
          return `Estos son algunos precios de manicura y pedicura:\n${ejemplos}\n\n¿Necesitas más información sobre algún servicio?`;
        }
      }
      
      return 'Nuestros precios varían según el servicio. Por ejemplo:\n• Lavado clásico: ₲60.000\n• Maquillaje social: ₲110.000\n• Manicura tradicional: ₲30.000\n\n¿Te interesa algún servicio en particular?';
    }
    
    // Horarios
    if (message.includes('horario') || message.includes('cuando') || message.includes('abierto') || message.includes('hora')) {
      return `Nuestros horarios son:\n📅 ${siteData.contacto.horarios}\n\n¿Te gustaría reservar una cita?`;
    }
    
    // Ubicación
    if (message.includes('donde') || message.includes('ubicacion') || message.includes('direccion') || message.includes('luque')) {
      return `Estamos ubicados en:\n📍 ${siteData.contacto.direccion}\n\nPuedes encontrarnos fácilmente en Google Maps. ¿Necesitas ayuda para llegar?`;
    }
    
    // Reservas
    if (message.includes('reserva') || message.includes('cita') || message.includes('turno') || message.includes('agendar')) {
      return `¡Perfecto! Puedes reservar tu cita de varias formas:\n\n📱 WhatsApp: ${siteData.contacto.telefono}\n📞 Llamada directa\n💬 Te conectaré con WhatsApp para que puedas reservar directamente.\n\n¿Prefieres que te ayude a contactar por WhatsApp?`;
    }
    
    // WhatsApp
    if (message.includes('whatsapp') || message.includes('mensaje') || message.includes('si') && messages.some(m => m.text.includes('WhatsApp'))) {
      return '¡Excelente! Te voy a redirigir a WhatsApp para que puedas hablar directamente con Elena y reservar tu cita. 📱✨';
    }
    
    // Específico sobre Elena
    if (message.includes('elena') || message.includes('experiencia') || message.includes('profesional')) {
      return `Elena Benítez tiene más de 10 años de experiencia en el mundo de la belleza. Su especialidad es brindar un servicio personalizado y de calidad premium. ¡Estarás en las mejores manos! ¿Te gustaría conocer más sobre algún servicio en particular?`;
    }
    
    // Maquillaje específico
    if (message.includes('maquillaje')) {
      const maquillaje = siteData.servicios.find(s => s.categoria.includes('Maquillaje'));
      if (maquillaje) {
        return `¡El maquillaje es una de nuestras especialidades! Ofrecemos:\n\n• Medio maquillaje: ₲75.000\n• Maquillaje social: ₲110.000\n• Maquillaje Glam: ₲150.000\n\nTodos incluyen limpieza facial express. ¿Para qué ocasión necesitas el maquillaje?`;
      }
    }
    
    // Cejas
    if (message.includes('ceja') || message.includes('perfilado') || message.includes('henna')) {
      const cejas = siteData.servicios.find(s => s.categoria.includes('Cejas'));
      if (cejas) {
        return `¡Somos expertas en cejas perfectas! Te ofrecemos:\n\n• Diseño de cejas + perfilado: ₲25.000\n• Diseño de cejas + henna: ₲50.000\n• Lifting de pestañas: ₲90.000\n\n¿Te interesa algún tratamiento específico?`;
      }
    }
    
    // Despedidas
    if (message.includes('gracias') || message.includes('bye') || message.includes('chau') || message.includes('adiós')) {
      return '¡De nada! Ha sido un placer ayudarte. Recuerda que estamos aquí para hacer realidad tu transformación de belleza. ¡Te esperamos en el salón! ✨💕';
    }
    
    // Respuesta por defecto
    return `Entiendo que tienes una consulta. Te puedo ayudar con información sobre:\n\n• 💄 Servicios y precios\n• 📅 Horarios y reservas\n• 📍 Ubicación\n• 💫 Recomendaciones personalizadas\n\n¿Sobre qué te gustaría saber más?`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simular delay de respuesta
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // Si la respuesta incluye WhatsApp, abrir enlace después de un momento
      if (botResponse.text.includes('redirigir a WhatsApp')) {
        setTimeout(() => {
          window.open(`https://wa.me/${siteData.whatsapp.number}?text=Hola Elena, vengo desde la web y me gustaría reservar una cita`, '_blank');
        }, 2000);
      }
    }, 1000 + Math.random() * 2000); // Delay realista
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "¿Cuáles son sus servicios?",
    "¿Cuánto cuesta un maquillaje?",
    "¿Cuáles son los horarios?",
    "¿Dónde están ubicados?",
    "Quiero reservar una cita"
  ];

  if (!enabled) return null;

  return (
    <>
      {/* Botón flotante */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50">
        <div className={`transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
          <button
            onClick={() => setIsOpen(true)}
            className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-12 sm:w-14 h-12 sm:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse"
            title="Chat con Isa - Asistente Virtual"
          >
            <SparklesIcon className="w-5 sm:w-6 h-5 sm:h-6" />
          </button>
        </div>

        {/* Tooltip */}
        <div className={`absolute bottom-14 sm:bottom-16 left-0 bg-black text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          ¡Hola! Soy Isa 👋
          <div className="absolute top-full left-3 sm:left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
        </div>
      </div>

      {/* Chat Window */}
      <div className={`fixed bottom-20 sm:bottom-24 left-4 sm:left-6 right-4 sm:right-auto sm:w-96 h-[450px] sm:h-[500px] z-40 transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'}`}>
        {/* Chat Container */}
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden h-full backdrop-blur-sm border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <BotIcon className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Isa</h3>
                <p className="text-xs opacity-90">Asistente Virtual</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg whitespace-pre-line ${
                  message.isBot 
                    ? 'bg-gray-100 text-gray-800 rounded-tl-sm' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-sm'
                }`}>
                  <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-white text-opacity-70'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-2 sm:p-3 rounded-lg rounded-tl-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="p-3 sm:p-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Preguntas frecuentes:</p>
              <div className="space-y-1">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(question)}
                    className="block w-full text-left text-xs bg-gray-50 hover:bg-gray-100 p-2 rounded transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-3 sm:p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu consulta..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
