import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Mic,
  MicOff
} from 'lucide-react';
import aiConsultantImage from 'figma:asset/29296637440b6bfcb41c65d1c81821f49fe96365.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isAnimating?: boolean;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' }
];

export const AvatarLeftChatRightConsultant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hallo! Ich bin deine persönliche KI-Beraterin und helfe dir dabei, die besten Angebote für Internet, Mobilfunk, Strom, Gas oder Kredite zu finden. Womit kann ich dir heute helfen?',
      sender: 'ai',
      timestamp: new Date(),
      isAnimating: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('internet') || lowerText.includes('wifi') || lowerText.includes('dsl')) {
      return 'Perfekt! Für Internet-Tarife kann ich dir die besten aktuellen Angebote zeigen. Welche Geschwindigkeit benötigst du ungefähr und in welcher Region wohnst du?';
    } else if (lowerText.includes('mobilfunk') || lowerText.includes('handy') || lowerText.includes('smartphone')) {
      return 'Gerne helfe ich dir bei Mobilfunk-Tarifen! Wie viel Datenvolumen brauchst du monatlich und telefonierst du viel?';
    } else if (lowerText.includes('strom') || lowerText.includes('gas') || lowerText.includes('energie')) {
      return 'Bei Strom und Gas kann ich dir dabei helfen, bis zu 800€ im Jahr zu sparen! Kennst du deinen ungefähren Jahresverbrauch?';
    } else if (lowerText.includes('kredit') || lowerText.includes('darlehen') || lowerText.includes('finanzierung')) {
      return 'Für Kredite kann ich dir die besten Konditionen finden. Welchen Betrag benötigst du und wofür soll der Kredit verwendet werden?';
    } else if (lowerText.includes('hallo') || lowerText.includes('hi') || lowerText.includes('hey')) {
      return 'Hallo! Schön, dass du da bist. Ich kann dir bei Internet, TV, Mobilfunk, Strom, Gas und Krediten helfen. Womit soll ich anfangen?';
    } else if (lowerText.includes('tv') || lowerText.includes('fernsehen')) {
      return 'Für TV-Pakete und Streaming-Dienste kann ich dir die besten Kombinationen mit Internet zeigen. Welche Sender sind dir wichtig?';
    } else {
      return 'Das ist eine interessante Frage! Lass mich dir dabei helfen. Kannst du mir etwas mehr Details geben, damit ich dir die bestmögliche Beratung bieten kann?';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
      isAnimating: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Remove animation flag after animation completes
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, isAnimating: false } : msg
      ));
    }, 400);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(userMessage.text),
        sender: 'ai',
        timestamp: new Date(),
        isAnimating: true
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      // Remove animation flag for AI message
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === aiResponse.id ? { ...msg, isAnimating: false } : msg
        ));
      }, 400);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
  };

  return (
    <section 
      className="relative min-h-screen w-full"
      style={{
        background: 'linear-gradient(180deg, #0E0F1A 0%, #1A0E23 100%)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Ambient background elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-[#FF3F87]/6 rounded-full blur-3xl animate-pulse" />
      <div 
        className="absolute bottom-20 right-32 w-48 h-48 bg-[#00D0C0]/5 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '2s' }} 
      />
      <div 
        className="absolute top-1/3 right-20 w-32 h-32 bg-[#A020F0]/6 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '4s' }} 
      />

      <div className="content-max-width section-spacing">
        {/* Desktop Layout */}
        <div 
          className="ki-berater-section hidden lg:flex"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4rem'
          }}
        >
          {/* Avatar Container (Left) */}
          <div 
            className="avatar-container"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div className="relative">
              {/* Avatar Image with Float Animation */}
              <img
                src={aiConsultantImage}
                alt="KI Beraterin"
                className="avatar float-animation"
                style={{
                  maxHeight: '80vh',
                  width: 'auto',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  transform: 'rotate(2deg)',
                  filter: 'drop-shadow(0 0 20px rgba(255, 63, 135, 0.6)) drop-shadow(0 0 40px rgba(0, 208, 192, 0.4))',
                  maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)'
                }}
              />

              {/* Status Indicator */}
              <div 
                className="absolute bottom-16 right-16 rounded-full p-4 z-20"
                style={{
                  background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
                  boxShadow: '0 0 35px rgba(0, 208, 192, 0.8), 0 0 70px rgba(0, 208, 192, 0.4)'
                }}
              >
                <Bot className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Online Status */}
            <div 
              className="mt-8 px-6 py-3 rounded-xl text-center glass-morphism"
              style={{
                border: '1px solid rgba(0, 208, 192, 0.4)',
                boxShadow: '0 0 25px rgba(0, 208, 192, 0.15)'
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div 
                  className="w-3 h-3 bg-[#00D0C0] rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 10px rgba(0, 208, 192, 0.8)' }}
                />
                <span 
                  className="text-[#D8D8D8] font-medium"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Online verfügbar
                </span>
              </div>
              <p 
                className="text-[#D8D8D8]/80 text-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Bereit für deine persönliche Beratung
              </p>
            </div>
          </div>

          {/* Chat Container (Right) */}
          <div 
            className="chat-container"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              maxHeight: '80vh'
            }}
          >
            {/* Language Selector */}
            <div className="language-selector">
              <select
                value={selectedLanguage.code}
                onChange={(e) => {
                  const selected = languages.find(lang => lang.code === e.target.value);
                  if (selected) setSelectedLanguage(selected);
                }}
                className="w-full cursor-pointer"
                style={{
                  padding: '10px 15px',
                  background: 'rgba(26, 14, 35, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '2px solid #FF3F87',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '16px',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                <option value="de" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇩🇪 Deutsch</option>
                <option value="en" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇬🇧 English</option>
                <option value="fr" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇫🇷 Français</option>
                <option value="es" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇪🇸 Español</option>
                <option value="it" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇮🇹 Italiano</option>
                <option value="pt" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇵🇹 Português</option>
                <option value="nl" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇳🇱 Nederlands</option>
                <option value="pl" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇵🇱 Polski</option>
                <option value="tr" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇹🇷 Türkçe</option>
                <option value="ru" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇷🇺 Русский</option>
                <option value="zh" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇨🇳 中文</option>
                <option value="ar" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇸🇦 العربية</option>
              </select>
            </div>

            {/* Chat Bubbles */}
            <div 
              className="chat-bubbles flex-1"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                maxHeight: '60vh',
                overflowY: 'auto',
                paddingRight: '8px'
              }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`bubble ${message.sender} ${
                    message.isAnimating ? 'fade-in-up' : ''
                  }`}
                  style={{
                    padding: '15px 20px',
                    borderRadius: '20px',
                    maxWidth: '80%',
                    fontSize: '16px',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '1.5',
                    background: message.sender === 'ai' 
                      ? 'rgba(0, 208, 192, 0.2)' 
                      : 'rgba(255, 63, 135, 0.2)',
                    border: message.sender === 'ai'
                      ? '1px solid #00D0C0'
                      : '1px solid #FF3F87',
                    color: 'white',
                    boxShadow: message.sender === 'ai'
                      ? '0 0 10px rgba(0, 208, 192, 0.6)'
                      : '0 0 10px rgba(255, 63, 135, 0.6)',
                    backdropFilter: 'blur(10px)',
                    alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  {message.text}
                  <div 
                    className="text-xs text-white/60 mt-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {message.timestamp.toLocaleTimeString('de-DE', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div 
                  className="bubble ai"
                  style={{
                    padding: '15px 20px',
                    borderRadius: '20px',
                    maxWidth: '80%',
                    background: 'rgba(0, 208, 192, 0.2)',
                    border: '1px solid #00D0C0',
                    boxShadow: '0 0 10px rgba(0, 208, 192, 0.6)',
                    backdropFilter: 'blur(10px)',
                    alignSelf: 'flex-start'
                  }}
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div 
              className="chat-input"
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Deine Nachricht..."
                style={{
                  flex: 1,
                  padding: '12px 15px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
              
              <button
                onClick={toggleVoiceInput}
                className="p-3 rounded-lg hover:scale-105 transition-transform duration-300"
                style={{
                  background: isListening 
                    ? 'linear-gradient(135deg, rgba(255, 63, 135, 0.3) 0%, rgba(160, 32, 240, 0.3) 100%)'
                    : 'linear-gradient(135deg, rgba(0, 208, 192, 0.2) 0%, rgba(0, 139, 139, 0.2) 100%)',
                  border: `1px solid ${isListening ? '#FF3F87' : '#00D0C0'}`
                }}
              >
                {isListening ? (
                  <MicOff className="w-5 h-5 text-[#FF3F87]" />
                ) : (
                  <Mic className="w-5 h-5 text-[#00D0C0]" />
                )}
              </button>

              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  padding: '12px 20px',
                  background: inputValue.trim() 
                    ? 'linear-gradient(90deg, #FF3F87, #00D0C0)'
                    : 'rgba(255, 63, 135, 0.3)',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Senden
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {/* Mobile Avatar */}
          <div className="flex flex-col items-center">
            {/* Language Selector Mobile */}
            <div className="language-selector w-full flex justify-end mb-6">
              <select
                value={selectedLanguage.code}
                onChange={(e) => {
                  const selected = languages.find(lang => lang.code === e.target.value);
                  if (selected) setSelectedLanguage(selected);
                }}
                className="px-4 py-3 rounded-xl cursor-pointer"
                style={{
                  background: 'rgba(26, 14, 35, 0.8)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 63, 135, 0.4)',
                  fontFamily: 'Inter, sans-serif',
                  color: '#D8D8D8',
                  fontSize: '0.875rem'
                }}
              >
                <option value="de" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇩🇪 Deutsch</option>
                <option value="en" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇬🇧 English</option>
                <option value="fr" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇫🇷 Français</option>
                <option value="es" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇪🇸 Español</option>
                <option value="it" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇮🇹 Italiano</option>
                <option value="pt" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇵🇹 Português</option>
                <option value="nl" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇳🇱 Nederlands</option>
                <option value="pl" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇵🇱 Polski</option>
                <option value="tr" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇹🇷 Türkçe</option>
                <option value="ru" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇷🇺 Русский</option>
                <option value="zh" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇨🇳 中文</option>
                <option value="ar" style={{ background: '#1A0E23', color: '#D8D8D8' }}>🇸🇦 العربية</option>
              </select>
            </div>

            {/* Mobile Avatar */}
            <div className="relative">
              <img
                src={aiConsultantImage}
                alt="KI-Beraterin"
                className="float-animation"
                style={{
                  maxHeight: '50vh',
                  width: 'auto',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  filter: 'drop-shadow(0 0 15px rgba(255, 63, 135, 0.5)) drop-shadow(0 0 30px rgba(0, 208, 192, 0.3))',
                  maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)'
                }}
              />

              {/* Mobile activity indicator */}
              <div 
                className="absolute bottom-8 right-8 rounded-full p-3"
                style={{
                  background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
                  boxShadow: '0 0 25px rgba(0, 208, 192, 0.7)'
                }}
              >
                <Bot className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Mobile Status */}
            <div 
              className="mt-6 px-5 py-3 rounded-xl text-center glass-morphism"
              style={{
                border: '1px solid rgba(0, 208, 192, 0.4)'
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <div 
                  className="w-3 h-3 bg-[#00D0C0] rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 10px rgba(0, 208, 192, 0.8)' }}
                />
                <span className="text-[#D8D8D8] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Online verfügbar
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Chat */}
          <div className="chat-container space-y-6 w-full">
            <div 
              className="chat-bubbles max-h-[400px] overflow-y-auto w-full px-2"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`bubble ${message.sender} ${
                    message.isAnimating ? 'fade-in-up' : ''
                  }`}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '16px',
                    maxWidth: '90%',
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '1.5',
                    background: message.sender === 'ai' 
                      ? 'rgba(0, 208, 192, 0.2)' 
                      : 'rgba(255, 63, 135, 0.2)',
                    border: message.sender === 'ai'
                      ? '1px solid #00D0C0'
                      : '1px solid #FF3F87',
                    color: 'white',
                    boxShadow: message.sender === 'ai'
                      ? '0 0 8px rgba(0, 208, 192, 0.5)'
                      : '0 0 8px rgba(255, 63, 135, 0.5)',
                    backdropFilter: 'blur(10px)',
                    alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  {message.text}
                </div>
              ))}

              {isTyping && (
                <div 
                  className="bubble ai"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '16px',
                    maxWidth: '90%',
                    background: 'rgba(0, 208, 192, 0.2)',
                    border: '1px solid #00D0C0',
                    boxShadow: '0 0 8px rgba(0, 208, 192, 0.5)',
                    backdropFilter: 'blur(10px)',
                    alignSelf: 'flex-start'
                  }}
                >
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Mobile Input */}
            <div 
              className="chat-input flex items-center gap-3 p-4 rounded-xl w-full glass-morphism"
              style={{
                border: '1px solid rgba(255, 63, 135, 0.4)'
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Deine Nachricht..."
                className="flex-1 bg-transparent text-[#D8D8D8] placeholder-[#D8D8D8]/60 outline-none"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              
              <button onClick={toggleVoiceInput} className="p-2 rounded-full hover:scale-105 transition-transform">
                {isListening ? (
                  <MicOff className="w-5 h-5 text-[#FF3F87]" />
                ) : (
                  <Mic className="w-5 h-5 text-[#00D0C0]" />
                )}
              </button>

              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-2 rounded-full transition-all duration-300 disabled:opacity-50"
                style={{
                  background: inputValue.trim() 
                    ? 'linear-gradient(90deg, #FF3F87, #00D0C0)'
                    : 'rgba(255, 63, 135, 0.3)',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};