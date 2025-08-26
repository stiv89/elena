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
}

export default function IsaAssistant({ enabled = true }: IsaAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({
    stage: 'greeting',
    interests: [],
    mentionedServices: [],
    customerType: 'new'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Analizador de intención inteligente
  const analyzeIntent = (message: string) => {
    const msgLower = message.toLowerCase();
    const intent = {
      type: 'general',
      confidence: 0,
      entities: [] as string[],
      sentiment: 'neutral' as 'positive' | 'negative' | 'neutral',
      urgency: 'medium' as 'low' | 'medium' | 'high'
    };

    // Detección de urgencia
    if (msgLower.includes('urgente') || msgLower.includes('hoy') || msgLower.includes('ahora')) {
      intent.urgency = 'high';
    } else if (msgLower.includes('cuando pueda') || msgLower.includes('no hay apuro')) {
      intent.urgency = 'low';
    }

    // Detección de sentimiento
    const positiveWords = ['me gusta', 'excelente', 'perfecto', 'genial', 'maravilloso'];
    const negativeWords = ['no me gusta', 'malo', 'terrible', 'caro', 'no puedo'];
    
    if (positiveWords.some(word => msgLower.includes(word))) intent.sentiment = 'positive';
    if (negativeWords.some(word => msgLower.includes(word))) intent.sentiment = 'negative';

    // Clasificación de intenciones
    if (msgLower.includes('precio') || msgLower.includes('costo') || msgLower.includes('cuanto')) {
      intent.type = 'pricing';
      intent.confidence = 0.9;
    } else if (msgLower.includes('reserva') || msgLower.includes('cita') || msgLower.includes('turno')) {
      intent.type = 'booking';
      intent.confidence = 0.95;
    } else if (msgLower.includes('donde') || msgLower.includes('ubicacion') || msgLower.includes('direccion')) {
      intent.type = 'location';
      intent.confidence = 0.9;
    } else if (msgLower.includes('horario') || msgLower.includes('cuando') || msgLower.includes('abierto')) {
      intent.type = 'scheduling';
      intent.confidence = 0.85;
    } else if (msgLower.includes('servicio') || msgLower.includes('que hacen') || msgLower.includes('maquillaje') || msgLower.includes('cabello')) {
      intent.type = 'services';
      intent.confidence = 0.8;
    }

    return intent;
  };

  // Generador de respuestas contextuales inteligentes
  const generateIntelligentResponse = (userMessage: string, context: ConversationContext): { response: string, newContext: ConversationContext, suggestions: string[] } => {
    const intent = analyzeIntent(userMessage);
    const msgLower = userMessage.toLowerCase();
    
    let response = '';
    let suggestions: string[] = [];
    // eslint-disable-next-line prefer-const
    let newContext = { ...context };

    // Actualizar contexto basado en el mensaje
    if (msgLower.includes('boda')) {
      newContext.interests.push('boda');
      newContext.stage = 'interested';
    } else if (msgLower.includes('trabajo')) {
      newContext.interests.push('trabajo');
      newContext.stage = 'exploring';
    }

    newContext.urgency = intent.urgency;
    newContext.previousTopic = intent.type;

    // Lógica de respuesta inteligente por intención
    switch (intent.type) {
      case 'greeting':
        if (context.stage === 'greeting') {
          response = `¡Hola! Soy Isa, tu consultora de belleza personal de Elena Benítez. 

Me especializo en encontrar exactamente lo que necesitas para verte y sentirte radiante. Con más de 10 años de experiencia, Elena ha transformado la belleza de miles de mujeres en Luque.

¿Para qué ocasión especial te quieres ver perfecta? 💕`;

          suggestions = [
            "Una boda muy importante",
            "Reunión de trabajo",
            "Cita romántica",
            "Solo quiero consentirme",
            "Cambiar mi look completo"
          ];
          newContext.stage = 'exploring';
        }
        break;

      case 'pricing':
        if (msgLower.includes('boda')) {
          response = `Para bodas, Elena ofrece paquetes especiales completos:

💄 **Paquete Novia Clásico**
• Maquillaje social: ₲110.000
• Diseño de cejas + henna: ₲50.000
• **Total: ₲160.000**

✨ **Paquete Novia Premium**
• Maquillaje Glam: ₲150.000
• Lifting de pestañas: ₲90.000
• Tratamiento facial express: ₲80.000
• **Total: ₲320.000** (Ahorro ₲40.000)

¿Te interesa algún paquete específico? Puedo personalizar según tu presupuesto 💎`;

          suggestions = [
            "Me interesa el paquete clásico",
            "Quiero el premium completo",
            "¿Hay opciones más económicas?",
            "¿Incluye prueba previa?",
            "¿Hacen servicios a domicilio?"
          ];
        } else {
          response = generatePricingResponse();
          suggestions = [
            "¿Hay promociones disponibles?",
            "¿Aceptan tarjetas?",
            "¿Hay descuentos para varios servicios?",
            "Quiero agendar una cita",
            "¿Cuál es el más popular?"
          ];
        }
        newContext.stage = 'pricing';
        break;

      case 'booking':
        if (intent.urgency === 'high') {
          response = `¡Entiendo que es urgente! 🚨

Elena tiene disponibilidad de emergencia para casos especiales:

📱 **Para hoy mismo**: Llama directo al ${siteData.contacto.telefono}
⚡ **WhatsApp inmediato**: Te conecto ahora mismo
🏠 **Servicio express a domicilio**: Disponible con recargo mínimo

¿Es para una ocasión muy especial que no puede esperar?`;

          suggestions = [
            "¡Sí, es una emergencia!",
            "Llámame por favor",
            "¿Pueden venir a mi casa?",
            "¿Qué horarios tienen hoy?",
            "¿Cuál es el recargo por urgencia?"
          ];
        } else {
          response = `¡Perfecto! Te ayudo a encontrar el mejor momento para tu cita 📅

**Disponibilidad esta semana:**
• Lunes a Viernes: ${siteData.contacto.horarios}
• Sábados: Horarios especiales disponibles
• Domingos: Solo servicios a domicilio

**Opciones de reserva:**
🏢 En el salón (${siteData.contacto.direccion})
🏠 A domicilio (+30% del valor del servicio)

¿Qué día y horario prefieres?`;

          suggestions = [
            "Prefiero en el salón",
            "Me conviene a domicilio",
            "¿Qué horarios tienen mañana?",
            "Solo fines de semana",
            "¿Cuánto demora cada servicio?"
          ];
        }
        newContext.stage = 'booking';
        break;

      case 'services':
        if (msgLower.includes('maquillaje')) {
          response = generateMakeupResponse(context);
        } else if (msgLower.includes('cabello')) {
          response = generateHairResponse();
        } else {
          response = generateGeneralServicesResponse();
        }
        suggestions = getServiceSuggestions();
        newContext.stage = 'interested';
        break;

      case 'location':
        response = `📍 **Encontrarnos es súper fácil:**

**Dirección:** ${siteData.contacto.direccion}
🗺️ En el corazón de Luque, zona céntrica
� Estacionamiento disponible
🚌 Cerca de transporte público

**También vamos a tu hogar:**
🏠 Servicio a domicilio en Luque y zonas aledañas
⏰ Mismo día con reserva previa
💼 Llevamos todo el equipo profesional

¿Prefieres venir al salón o que vayamos a tu casa?`;

        suggestions = [
          "Prefiero ir al salón",
          "Me conviene a domicilio",
          "¿Cómo llego en colectivo?",
          "¿Hay estacionamiento?",
          "¿A qué zonas van a domicilio?"
        ];
        break;

      default:
        response = generateContextualResponse(userMessage, context);
        suggestions = getContextualSuggestions(context);
    }

    return { response, newContext, suggestions };
  };

  // Funciones auxiliares para respuestas especializadas
  const generateMakeupResponse = (context: ConversationContext) => {
    if (context.interests.includes('boda')) {
      return `💄 **Maquillaje Nupcial - Especialidad de Elena:**

Elena es reconocida en Luque por sus maquillajes de novia impecables:

✨ **¿Por qué las novias eligen a Elena?**
• +200 novias han confiado en ella
• Técnica que dura hasta 12 horas
• Productos resistentes al agua y emociones
• Incluye retoque gratuito el día de la boda

🎨 **Opciones disponibles:**
• **Maquillaje Natural**: ₲110.000 (perfecto para ceremonias íntimas)
• **Maquillaje Glam**: ₲150.000 (ideal para fiestas grandes)
• **Paquete Completo**: Incluye prueba previa + día de la boda

¿Qué estilo de novia te imaginas siendo?`;
    }
    
    return `💄 **Elena es experta en maquillaje para cada ocasión:**

• **Social**: ₲110.000 - Elegante y duradero
• **Glam**: ₲150.000 - Impacto y sofisticación  
• **Medio**: ₲75.000 - Natural pero impecable

Todos incluyen limpieza facial express. ¿Para qué ocasión lo necesitas?`;
  };

  const generateHairResponse = () => {
    return `💇‍♀️ **Cuidado Capilar Profesional:**

Elena entiende que tu cabello es tu corona:

🌟 **Tratamientos disponibles:**
• **Lavado Clásico**: ₲60.000 - Limpieza profunda + peinado
• **Tratamiento Hidratante**: ₲85.000 - Nutrición intensa
• **Lavado + Peinado Especial**: ₲90.000 - Para eventos

💡 **¿Sabías que Elena personaliza cada tratamiento según tu tipo de cabello?**

¿Qué necesita tu cabello específicamente?`;
  };

  const generateGeneralServicesResponse = () => {
    return `🌟 **Elena ofrece servicios integrales de belleza:**

**Nuestras especialidades más populares:**

💄 **Maquillaje** (desde ₲75.000)
👁️ **Cejas y Pestañas** (desde ₲25.000)
💇‍♀️ **Cuidado Capilar** (desde ₲60.000)
✨ **Tratamientos Faciales** (desde ₲80.000)
💅 **Manos y Pies** (desde ₲30.000)

¿Hay algún área específica en la que quieres enfocarte?`;
  };

  const getServiceSuggestions = () => {
    return [
      "¿Cuál es el más popular?",
      "¿Hacen paquetes combinados?",
      "¿Cuánto tiempo demora?",
      "¿Hay descuentos para varios servicios?",
      "Quiero ver ejemplos de trabajos"
    ];
  };

  const generatePricingResponse = () => {
    return `💰 **Precios transparentes y justos:**

Elena cree en la honestidad total con sus precios:

**Rangos de inversión:**
• **Básico**: ₲30.000 - ₲70.000 (servicios esenciales)
• **Intermedio**: ₲80.000 - ₲120.000 (tratamientos completos)
• **Premium**: ₲130.000+ (experiencias exclusivas)

**¿Por qué invertir en Elena?**
✅ 10+ años de experiencia comprobada
✅ Productos profesionales de primera calidad
✅ Garantía de satisfacción total
✅ Atención personalizada y dedicada

¿Qué presupuesto tenías en mente?`;
  };

  const generateContextualResponse = (message: string, context: ConversationContext) => {
    // Respuestas inteligentes basadas en el contexto de la conversación
    if (context.stage === 'booking' && message.toLowerCase().includes('cuando')) {
      return `Basándome en lo que hemos conversado, te recomiendo:

📅 **Para tu ocasión especial:**
• Reserva con 3-5 días de anticipación
• Los viernes y sábados se llenan rápido
• Elena prefiere dedicar tiempo completo a cada cliente

¿Te conviene entre semana o necesariamente fin de semana?`;
    }

    return `Entiendo perfectamente lo que necesitas. Déjame conectarte con Elena directamente para que recibas la atención personalizada que mereces.

En estos 10 años, Elena ha aprendido que cada mujer es única y merece una experiencia de belleza completamente personalizada.

¿Te parece si coordinamos una breve llamada para conocerte mejor?`;
  };

  const getContextualSuggestions = (context: ConversationContext) => {
    switch (context.stage) {
      case 'exploring':
        return [
          "¿Cuáles son sus especialidades?",
          "Quiero ver fotos de trabajos",
          "¿Qué hace únicos sus servicios?",
          "¿Cómo puedo reservar?",
          "¿Tienen promociones?"
        ];
      case 'interested':
        return [
          "¿Cuánto cuesta este servicio?",
          "¿Cuánto tiempo demora?",
          "¿Qué incluye exactamente?",
          "Quiero agendar una cita",
          "¿Hay paquetes disponibles?"
        ];
      case 'pricing':
        return [
          "¿Hay formas de pago?",
          "¿Ofrecen descuentos?",
          "¿Vale la pena el precio?",
          "Quiero reservar ahora",
          "¿Hay garantía?"
        ];
      case 'booking':
        return [
          "¿Qué necesito llevar?",
          "¿Cuánto tiempo antes llego?",
          "¿Puedo reagendar si es necesario?",
          "¿Confirman la cita por WhatsApp?",
          "¿Hay alguna preparación previa?"
        ];
      default:
        return [
          "Cuéntame más sobre Elena",
          "¿Qué servicios ofrecen?",
          "¿Dónde están ubicados?",
          "¿Cómo puedo contactarlos?",
          "¿Tienen redes sociales?"
        ];
    }
  };

  useEffect(() => {
    if (messages.length === 0) {
      // Mensaje de bienvenida inicial inteligente
      const welcomeMessage: Message = {
        id: '1',
        text: `¡Hola! Soy Isa, tu consultora personal de belleza de Elena Benítez. 

Me especializo en encontrar exactamente lo que necesitas para verte y sentirte radiante. Con más de 10 años de experiencia, Elena ha transformado la belleza de miles de mujeres en Luque.

¿Para qué ocasión especial te quieres ver perfecta? 💕`,
        isBot: true,
        timestamp: new Date(),
        suggestions: [
          "Una boda muy importante",
          "Reunión de trabajo", 
          "Cita romántica",
          "Solo quiero consentirme",
          "Cambiar mi look completo"
        ],
        context: 'greeting'
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

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputText;
    if (!textToSend.trim()) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simular delay de respuesta más realista
    setTimeout(() => {
      const { response, newContext, suggestions } = generateIntelligentResponse(textToSend, conversationContext);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date(),
        suggestions,
        context: newContext.stage
      };
      
      setMessages(prev => [...prev, botResponse]);
      setConversationContext(newContext);
      setIsTyping(false);

      // Si la respuesta incluye WhatsApp, abrir enlace después de un momento
      if (response.includes('WhatsApp') && response.includes('redirigir')) {
        setTimeout(() => {
          window.open(`https://wa.me/${siteData.whatsapp.number}?text=Hola Elena, vengo desde la web y me gustaría reservar una cita`, '_blank');
        }, 2000);
      }
    }, 1500 + Math.random() * 2000); // Delay más realista
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
                onClick={() => handleSendMessage()}
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
