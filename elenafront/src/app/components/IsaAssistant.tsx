"use client";
import { useState, useRef, useEffect } from 'react';
import siteData from '../siteData.json';
import { BotIcon, SparklesIcon } from './ChatIcons';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
  context?: string;
}

interface ConversationContext {
  stage: 'greeting' | 'exploring' | 'interested' | 'booking' | 'pricing' | 'location' | 'scheduling';
  interests: string[];
  mentionedServices: string[];
  budget?: string;
  urgency?: 'low' | 'medium' | 'high';
  customerType?: 'new' | 'returning' | 'referred';
  previousTopic?: string;
}

interface IsaAssistantProps {
  enabled?: boolean;
  embedded?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  position?: 'left' | 'right';
}

type BotReply = {
  response: string;
  suggestions: string[];
  newContext?: Partial<ConversationContext>;
};

const normalize = (text: string) =>
  text.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');

export default function IsaAssistant({
  enabled = true,
  embedded = false,
  isOpen: controlledOpen,
  onClose,
  position = 'left',
}: IsaAssistantProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = embedded ? (controlledOpen ?? false) : internalOpen;
  const setIsOpen = embedded ? (onClose ? () => onClose() : () => {}) : setInternalOpen;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    stage: 'greeting',
    interests: [],
    mentionedServices: [],
    customerType: 'new',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const welcomeReply = (): BotReply => ({
    response: `¡Hola! Soy Isa, tu consultora personal de belleza de Elena Benítez.

Me especializo en encontrar exactamente lo que necesitas para verte y sentirte radiante. Con más de 10 años de experiencia, Elena ha transformado la belleza de miles de mujeres en Luque.

¿Para qué ocasión especial te quieres ver perfecta? 💕`,
    suggestions: [
      'Una boda muy importante',
      'Reunión de trabajo',
      'Cita romántica',
      'Solo quiero consentirme',
      'Cambiar mi look completo',
    ],
    newContext: { stage: 'exploring' },
  });

  const getPredefinedReply = (message: string, context: ConversationContext): BotReply | null => {
    const msg = normalize(message);

    const exactReplies: Record<string, BotReply> = {
      'una boda muy importante': {
        response: `¡Qué emoción! 💒 Una boda es un momento único y Elena es especialista en novias.

Con más de 200 novias atendidas en Luque, Elena conoce exactamente lo que necesitás:

✨ **Servicios recomendados para tu boda:**
• Maquillaje de novia (desde ₲110.000)
• Diseño de cejas + henna (₲50.000)
• Lifting de pestañas (₲90.000)
• Prueba previa incluida en paquetes premium

¿Qué aspecto te gustaría planificar primero?`,
        suggestions: [
          '¿Cuánto cuesta el paquete de novia?',
          '¿Incluye prueba previa?',
          '¿Hacen servicios a domicilio?',
          'Quiero reservar mi cita',
          '¿Cuánto dura el maquillaje?',
        ],
        newContext: { stage: 'interested', interests: [...context.interests, 'boda'] },
      },
      'reunion de trabajo': {
        response: `Perfecto, un look profesional transmite confianza y elegancia 💼

Elena recomienda para reuniones de trabajo:

• **Maquillaje Medio** (₲75.000) — natural e impecable
• **Diseño de cejas** (desde ₲25.000) — enmarca tu mirada
• **Lavado + peinado** (₲90.000) — cabello impecable

El look ideal dura toda la jornada sin retoques. ¿Qué te interesa más?`,
        suggestions: [
          'Maquillaje para trabajo',
          'Peinado profesional',
          '¿Cuánto demora en total?',
          'Quiero agendar para esta semana',
          '¿Hay paquete combinado?',
        ],
        newContext: { stage: 'interested', interests: [...context.interests, 'trabajo'] },
      },
      'cita romantica': {
        response: `¡Qué lindo! Una cita especial merece verte radiante 💕

Elena sugiere para una cita romántica:

• **Maquillaje Social** (₲110.000) — elegante y duradero
• **Manicura semipermanente** (desde ₲50.000)
• **Lifting de pestañas** (₲90.000) — mirada impactante

¿Preferís algo natural y sutil o un look más glam?`,
        suggestions: [
          'Look natural y sutil',
          'Look glam para la noche',
          '¿Cuánto cuesta todo junto?',
          'Reservar para el fin de semana',
          '¿Qué servicios son más rápidos?',
        ],
        newContext: { stage: 'interested', interests: [...context.interests, 'cita'] },
      },
      'solo quiero consentirme': {
        response: `¡Te lo merecés! 💆‍♀️ Un día de autocuidado en Elena Benítez es pura relajación.

Nuestras clientas más eligen:

• **Tratamiento facial express** (₲80.000)
• **Lavado + masaje capilar** (₲85.000)
• **Manicura + pedicura spa** (desde ₲60.000)
• **Diseño de cejas** (desde ₲25.000)

¿Qué zona querés consentir hoy?`,
        suggestions: [
          'Tratamiento facial',
          'Cuidado capilar',
          'Manos y pies',
          '¿Hay promociones hoy?',
          'Reservar un turno relajante',
        ],
        newContext: { stage: 'exploring', interests: [...context.interests, 'autocuidado'] },
      },
      'cambiar mi look completo': {
        response: `¡Me encanta! Un cambio de look completo es la especialidad de Elena ✨

Podemos transformarte con:

💇‍♀️ **Cabello:** color, corte, alisado o keratina
💄 **Maquillaje:** asesoría de tonos para tu nuevo estilo
👁️ **Cejas y pestañas:** diseño que realza tu rostro
💅 **Uñas:** para completar el look

¿Por dónde querés empezar la transformación?`,
        suggestions: [
          'Cambio de color de cabello',
          'Maquillaje y cejas',
          'Look completo (cabello + maquillaje)',
          '¿Cuánto cuesta un cambio total?',
          'Quiero una consulta con Elena',
        ],
        newContext: { stage: 'interested', interests: [...context.interests, 'transformacion'] },
      },
      'cuales son sus servicios?': {
        response: generateGeneralServicesResponse(),
        suggestions: getServiceSuggestions(),
        newContext: { stage: 'exploring' },
      },
      'cuanto cuesta un maquillaje?': {
        response: generateMakeupResponse(context),
        suggestions: [
          'Maquillaje para boda',
          'Maquillaje para evento',
          '¿Hay paquetes con descuento?',
          'Quiero reservar',
          '¿Cuánto dura el maquillaje?',
        ],
        newContext: { stage: 'pricing', mentionedServices: [...context.mentionedServices, 'maquillaje'] },
      },
      'cuales son los horarios?': {
        response: `🕐 **Horarios de atención:**

• **Lunes a Sábado:** ${siteData.contacto.horarios}
• **Domingos:** solo servicios a domicilio con reserva previa

Los turnos de fin de semana se agotan rápido. ¿Qué día te conviene?`,
        suggestions: [
          'Reservar para esta semana',
          '¿Atienden los sábados?',
          'Servicio a domicilio',
          '¿Puedo ir sin cita?',
          'Llamar para consultar',
        ],
        newContext: { stage: 'scheduling' },
      },
      'donde estan ubicados?': {
        response: `📍 **Encontrarnos es súper fácil:**

**Dirección:** ${siteData.contacto.direccion}
🗺️ En el corazón de Luque, zona céntrica
🅿️ Estacionamiento disponible
🚌 Cerca de transporte público

**También vamos a tu hogar:**
🏠 Servicio a domicilio en Luque y zonas aledañas

¿Preferís venir al salón o que vayamos a tu casa?`,
        suggestions: [
          'Prefiero ir al salón',
          'Me conviene a domicilio',
          '¿Cómo llego en colectivo?',
          '¿Hay estacionamiento?',
          'Reservar mi cita',
        ],
        newContext: { stage: 'location' },
      },
      'quiero reservar una cita': {
        response: `¡Perfecto! Te ayudo a reservar 📅

**Disponibilidad:**
• Lunes a Sábado: ${siteData.contacto.horarios}
• Reserva con 2-3 días de anticipación (más para fines de semana)

**Formas de reservar:**
📱 WhatsApp: ${siteData.contacto.telefono}
📞 Llamada directa

¿Cómo preferís confirmar tu turno?`,
        suggestions: [
          'Reservar por WhatsApp',
          'Llamar ahora',
          '¿Qué horarios hay mañana?',
          'Servicio a domicilio',
          '¿Qué debo llevar a la cita?',
        ],
        newContext: { stage: 'booking' },
      },
      'me interesa el paquete clasico': {
        response: `¡Excelente elección! 💎 El **Paquete Novia Clásico** incluye:

• Maquillaje social profesional: ₲110.000
• Diseño de cejas + henna: ₲50.000
• **Total: ₲160.000**

Ideal para novias que buscan elegancia natural. ¿Querés reservar tu cita?`,
        suggestions: [
          'Reservar por WhatsApp',
          '¿Incluye prueba previa?',
          'Ver el paquete premium',
          '¿Cuánto dura el servicio?',
          '¿Hacen a domicilio?',
        ],
        newContext: { stage: 'booking', interests: [...context.interests, 'boda'] },
      },
      'quiero el premium completo': {
        response: `¡La novia premium merece lo mejor! ✨ El **Paquete Novia Premium**:

• Maquillaje Glam: ₲150.000
• Lifting de pestañas: ₲90.000
• Tratamiento facial express: ₲80.000
• **Total: ₲320.000** (Ahorro ₲40.000)
• Incluye prueba previa

¿Reservamos tu fecha?`,
        suggestions: [
          'Reservar por WhatsApp',
          '¿Cuándo hacer la prueba previa?',
          'Ver opciones más económicas',
          '¿Cuánto dura todo el día?',
          'Llamar para consultar',
        ],
        newContext: { stage: 'booking', interests: [...context.interests, 'boda'] },
      },
      'reservar por whatsapp': {
        response: `¡Genial! Te redirijo a WhatsApp para que Elena te atienda personalmente 📱

Escribile con tu fecha preferida y el servicio que te interesa. ¡Ella responde rapidísimo!`,
        suggestions: [
          '¿Cuáles son los horarios?',
          'Ver servicios disponibles',
          '¿Cuánto cuesta un maquillaje?',
          '¿Dónde están ubicados?',
          'Otra consulta',
        ],
        newContext: { stage: 'booking' },
      },
      'llamar ahora': {
        response: `📞 Podés llamar directamente al **${siteData.contacto.telefono}**

Horario de atención: ${siteData.contacto.horarios}

Elena o su equipo te van a orientar con gusto. ¿Hay algo más en lo que pueda ayudarte?`,
        suggestions: [
          'Reservar por WhatsApp',
          '¿Cuáles son los servicios?',
          '¿Cuánto cuesta un maquillaje?',
          'Ver horarios',
          '¿Dónde están ubicados?',
        ],
        newContext: { stage: 'booking' },
      },
      'look natural y sutil': {
        response: `Perfecto, el look natural es elegancia pura 🌸

Te recomiendo:
• **Maquillaje Medio** (₲75.000) — piel luminosa, labios suaves
• **Diseño de cejas natural** (₲25.000)
• **Peinado suelto o semi-recogido** (₲90.000)

Total aproximado: ₲190.000. ¿Te gustaría reservar?`,
        suggestions: [
          'Reservar por WhatsApp',
          '¿Cuánto demora?',
          'Ver look glam',
          '¿Hay descuento por paquete?',
          '¿Qué productos usan?',
        ],
        newContext: { stage: 'interested' },
      },
      'look glam para la noche': {
        response: `¡Impacto garantizado! ✨ Para una noche especial:

• **Maquillaje Glam** (₲150.000) — smokey eyes, piel impecable
• **Lifting de pestañas** (₲90.000) — mirada deslumbrante
• **Uñas semipermanentes** (desde ₲50.000)

¿Reservamos tu turno?`,
        suggestions: [
          'Reservar por WhatsApp',
          '¿Cuánto dura el maquillaje?',
          'Ver look natural',
          '¿Cuánto cuesta todo junto?',
          '¿Atienden los sábados?',
        ],
        newContext: { stage: 'interested' },
      },
    };

    if (exactReplies[msg]) return exactReplies[msg];

    // Coincidencias parciales
    if (msg.includes('whatsapp')) {
      return exactReplies['reservar por whatsapp'];
    }
    if (msg.includes('llamar') || msg.includes('telefono')) {
      return exactReplies['llamar ahora'];
    }
    if (msg.includes('servicio') && (msg.includes('cuales') || msg.includes('que hacen'))) {
      return exactReplies['cuales son sus servicios?'];
    }
    if (msg.includes('horario') || msg.includes('cuando abren')) {
      return exactReplies['cuales son los horarios?'];
    }
    if (msg.includes('ubicacion') || msg.includes('donde estan') || msg.includes('direccion')) {
      return exactReplies['donde estan ubicados?'];
    }
    if (msg.includes('reserv') || msg.includes('cita') || msg.includes('turno') || msg.includes('agendar')) {
      return exactReplies['quiero reservar una cita'];
    }
    if (msg.includes('precio') || msg.includes('costo') || msg.includes('cuanto cuesta')) {
      if (msg.includes('maquillaje')) {
        return exactReplies['cuanto cuesta un maquillaje?'];
      }
      if (msg.includes('boda') || msg.includes('novia')) {
        return {
          response: `Para bodas, Elena ofrece paquetes especiales:

💄 **Paquete Novia Clásico** — ₲160.000
✨ **Paquete Novia Premium** — ₲320.000 (con prueba previa)

¿Te interesa algún paquete?`,
          suggestions: [
            'Me interesa el paquete clásico',
            'Quiero el premium completo',
            '¿Hay opciones más económicas?',
            '¿Incluye prueba previa?',
            'Reservar por WhatsApp',
          ],
          newContext: { stage: 'pricing', interests: [...context.interests, 'boda'] },
        };
      }
      return {
        response: generatePricingResponse(),
        suggestions: [
          '¿Cuánto cuesta un maquillaje?',
          '¿Hay promociones disponibles?',
          '¿Hay descuentos para varios servicios?',
          'Quiero agendar una cita',
          '¿Cuál es el más popular?',
        ],
        newContext: { stage: 'pricing' },
      };
    }
    if (msg.includes('maquillaje')) {
      return {
        response: generateMakeupResponse(context),
        suggestions: [
          'Maquillaje para boda',
          '¿Cuánto cuesta?',
          '¿Cuánto dura?',
          'Reservar por WhatsApp',
          'Ver otros servicios',
        ],
        newContext: { stage: 'interested', mentionedServices: [...context.mentionedServices, 'maquillaje'] },
      };
    }
    if (msg.includes('cabello') || msg.includes('peinado') || msg.includes('keratina')) {
      return {
        response: generateHairResponse(),
        suggestions: [
          '¿Cuánto cuesta?',
          'Shock de keratina',
          'Lavado + peinado',
          'Reservar por WhatsApp',
          'Ver maquillaje',
        ],
        newContext: { stage: 'interested', mentionedServices: [...context.mentionedServices, 'cabello'] },
      };
    }
    if (msg.match(/^(hola|buenas|buenos|hey|hi|saludos)/)) {
      return welcomeReply();
    }

    return null;
  };

  const generateIntelligentResponse = (
    userMessage: string,
    context: ConversationContext
  ): { response: string; newContext: ConversationContext; suggestions: string[] } => {
    const predefined = getPredefinedReply(userMessage, context);
    if (predefined) {
      return {
        response: predefined.response,
        suggestions: predefined.suggestions,
        newContext: { ...context, ...predefined.newContext },
      };
    }

    const suggestions = getContextualSuggestions(context);
    const response = `Entiendo perfectamente. Elena tiene más de 10 años de experiencia en Luque y puede ayudarte con una atención personalizada.

¿En qué más te puedo orientar?`;

    return {
      response,
      suggestions,
      newContext: { ...context, stage: context.stage === 'greeting' ? 'exploring' : context.stage },
    };
  };

  const generateMakeupResponse = (context: ConversationContext) => {
    if (context.interests.includes('boda')) {
      return `💄 **Maquillaje Nupcial — Especialidad de Elena:**

• **Maquillaje Natural**: ₲110.000
• **Maquillaje Glam**: ₲150.000
• **Medio**: ₲75.000

Todos resistentes al agua, duran hasta 12 horas. ¿Qué estilo te imaginas?`;
    }
    return `💄 **Maquillaje profesional de Elena:**

• **Social**: ₲110.000 — elegante y duradero
• **Glam**: ₲150.000 — impacto y sofisticación
• **Medio**: ₲75.000 — natural e impecable

Todos incluyen limpieza facial express. ¿Para qué ocasión lo necesitás?`;
  };

  const generateHairResponse = () =>
    `💇‍♀️ **Cuidado Capilar Profesional:**

• **Lavado Clásico**: ₲60.000
• **Tratamiento Hidratante**: ₲85.000
• **Lavado + Peinado Especial**: ₲90.000
• **Shock de keratina**: ₲130.000

¿Qué necesita tu cabello?`;

  const generateGeneralServicesResponse = () =>
    `🌟 **Servicios de Elena Benítez:**

💄 **Maquillaje** (desde ₲75.000)
👁️ **Cejas y Pestañas** (desde ₲25.000)
💇‍♀️ **Cuidado Capilar** (desde ₲60.000)
✨ **Tratamientos Faciales** (desde ₲80.000)
💅 **Manos y Pies** (desde ₲30.000)

¿Hay algún área que te interese?`;

  const getServiceSuggestions = () => [
    '¿Cuánto cuesta un maquillaje?',
    'Tratamiento capilar',
    'Cejas y pestañas',
    '¿Hay paquetes combinados?',
    'Quiero reservar una cita',
  ];

  const generatePricingResponse = () =>
    `💰 **Precios transparentes:**

• **Básico**: ₲30.000 – ₲70.000
• **Intermedio**: ₲80.000 – ₲120.000
• **Premium**: ₲130.000+

✅ 10+ años de experiencia
✅ Productos profesionales
✅ Atención personalizada

¿Qué servicio te interesa?`;

  const getContextualSuggestions = (context: ConversationContext) => {
    switch (context.stage) {
      case 'exploring':
        return [
          '¿Cuáles son sus servicios?',
          'Quiero reservar una cita',
          '¿Dónde están ubicados?',
          '¿Cuáles son los horarios?',
          'Una boda muy importante',
        ];
      case 'interested':
        return [
          '¿Cuánto cuesta este servicio?',
          '¿Cuánto tiempo demora?',
          'Reservar por WhatsApp',
          '¿Hay paquetes disponibles?',
          'Ver otros servicios',
        ];
      case 'pricing':
        return [
          '¿Hay promociones?',
          'Reservar por WhatsApp',
          '¿Cuánto cuesta un maquillaje?',
          '¿Hay descuentos por paquete?',
          'Llamar ahora',
        ];
      case 'booking':
        return [
          'Reservar por WhatsApp',
          '¿Qué necesito llevar?',
          '¿Cuánto tiempo antes llego?',
          '¿Puedo reagendar?',
          'Ver horarios',
        ];
      case 'location':
        return [
          'Reservar por WhatsApp',
          'Prefiero ir al salón',
          'Servicio a domicilio',
          '¿Cuáles son los horarios?',
          'Llamar ahora',
        ];
      default:
        return [
          '¿Cuáles son sus servicios?',
          '¿Cuánto cuesta un maquillaje?',
          'Quiero reservar una cita',
          '¿Dónde están ubicados?',
          'Una boda muy importante',
        ];
    }
  };

  useEffect(() => {
    if (messages.length === 0 && (isOpen || !embedded)) {
      const welcome = welcomeReply();
      setMessages([
        {
          id: '1',
          text: welcome.response,
          isBot: true,
          timestamp: new Date(),
          suggestions: welcome.suggestions,
          context: 'greeting',
        },
      ]);
    }
  }, [messages.length, isOpen, embedded]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || inputText;
    if (!textToSend.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const { response, newContext, suggestions } = generateIntelligentResponse(
        textToSend,
        conversationContext
      );

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
        suggestions,
        context: newContext.stage,
      };

      setMessages((prev) => [...prev, botResponse]);
      setConversationContext(newContext);
      setIsTyping(false);

      const msgNorm = normalize(textToSend);
      if (msgNorm.includes('whatsapp') || msgNorm.includes('reservar por whatsapp')) {
        setTimeout(() => {
          window.open(
            `https://wa.me/${siteData.whatsapp.number}?text=${encodeURIComponent(siteData.whatsapp.message)}`,
            '_blank'
          );
        }, 800);
      }
      if (msgNorm.includes('llamar ahora') || msgNorm === 'llamar ahora') {
        setTimeout(() => {
          window.open(`tel:${siteData.contacto.telefono}`, '_self');
        }, 800);
      }
    }, 900);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const lastBotMessage = [...messages].reverse().find((m) => m.isBot);
  const activeSuggestions = !isTyping ? lastBotMessage?.suggestions : undefined;

  const positionClasses =
    position === 'right'
      ? 'right-4 sm:right-6 left-4 sm:left-auto'
      : 'left-4 sm:left-6 right-4 sm:right-auto';

  if (!enabled) return null;

  return (
    <>
      {!embedded && (
        <div className={`fixed bottom-4 sm:bottom-6 ${position === 'right' ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} z-50`}>
          <div className={`transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}>
            <button
              onClick={() => setInternalOpen(true)}
              className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white w-12 sm:w-14 h-12 sm:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse"
              title="Chat con Isa - Asistente Virtual"
            >
              <SparklesIcon className="w-5 sm:w-6 h-5 sm:h-6" />
            </button>
          </div>
          <div
            className={`absolute bottom-14 sm:bottom-16 ${position === 'right' ? 'right-0' : 'left-0'} bg-black text-white text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow-lg whitespace-nowrap transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            ¡Hola! Soy Isa 👋
            <div
              className={`absolute top-full ${position === 'right' ? 'right-3 sm:right-4' : 'left-3 sm:left-4'} w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black`}
            />
          </div>
        </div>
      )}

      <div
        className={`fixed bottom-20 sm:bottom-24 ${positionClasses} sm:w-96 h-[450px] sm:h-[500px] z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-95'
        } ${embedded && !isOpen ? 'hidden' : ''}`}
      >
        <div className="bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden h-full backdrop-blur-sm border border-gray-200">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 sm:p-4 flex items-center justify-between shrink-0">
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
              className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-black bg-opacity-25 hover:bg-opacity-40 text-white flex items-center justify-center transition-all duration-200"
              title="Cerrar chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-[85%] sm:max-w-[80%] p-2 sm:p-3 rounded-lg whitespace-pre-line ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800 rounded-tl-sm'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-sm'
                  }`}
                >
                  <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-white text-opacity-70'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-2 sm:p-3 rounded-lg rounded-tl-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {activeSuggestions && activeSuggestions.length > 0 && (
            <div className="px-3 sm:px-4 pb-2 border-t border-gray-100 pt-2 shrink-0">
              <p className="text-[10px] sm:text-xs text-gray-400 mb-1.5">Sugerencias:</p>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {activeSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion)}
                    className="text-[10px] sm:text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 px-2 py-1 rounded-full transition-colors text-left"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 sm:p-4 border-t border-gray-200 shrink-0">
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
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-colors shrink-0"
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
