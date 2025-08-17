import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Languages, 
  ChevronDown,
  Mic,
  MicOff
} from 'lucide-react';
import aiConsultantImage from 'figma:asset/13360f059c4886011e49eaee81fbcadbf3cd0a21.png';

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
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' }
];

export const TwoColumnAIConsultant: React.FC = () => {
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
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [avatarAnimation, setAvatarAnimation] = useState('float');
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

    // Avatar head nod animation
    setAvatarAnimation('nod');
    setTimeout(() => setAvatarAnimation('float'), 800);

    // Remove animation flag after animation completes
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, isAnimating: false } : msg
      ));
    }, 600);

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
      }, 600);
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
      className="relative section-spacing overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0E0F1A 0%, #1A0E23 100%)'
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

      <div className="content-max-width">
        {/* Desktop Layout - 50:50 Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-stretch lg:min-h-[800px]">
          
          {/* Chat Column (Left) */}
          <div className="flex flex-col justify-between">
            {/* Language Selector */}
            <div className="relative mb-8">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.6) 0%, rgba(14, 15, 26, 0.8) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 63, 135, 0.3)',
                  boxShadow: '0 0 25px rgba(255, 63, 135, 0.15)'
                }}
              >
                <Languages className="w-6 h-6 text-[#FF3F87]" />
                <span className="text-[#D8D8D8] text-lg font-medium flex items-center gap-3">
                  <span className="text-2xl">{selectedLanguage.flag}</span>
                  {selectedLanguage.name}
                </span>
                <ChevronDown className={`w-5 h-5 text-[#00D0C0] transition-transform duration-300 ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Dropdown */}
              {showLanguageDropdown && (
                <div 
                  className="absolute top-full left-0 mt-3 w-72 max-h-80 overflow-y-auto rounded-2xl z-50 transform origin-top animate-in slide-in-from-top-2 duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.95) 0%, rgba(14, 15, 26, 0.98) 100%)',
                    backdropFilter: 'blur(30px)',
                    border: '1px solid rgba(255, 63, 135, 0.3)',
                    boxShadow: '0 0 40px rgba(255, 63, 135, 0.25)'
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLanguageDropdown(false);
                      }}
                      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#FF3F87]/15 transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl border-b border-[#FF3F87]/10 last:border-b-0"
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="text-[#D8D8D8] font-medium text-lg">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Chat Messages Area - Completely Transparent */}
            <div className="flex-1 mb-8 overflow-hidden">
              <div 
                className="h-full overflow-y-auto max-h-[500px] px-2"
                style={{
                  background: 'transparent',
                  border: 'none'
                }}
              >
                <div className="space-y-6">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${
                        message.isAnimating ? 'animate-in slide-in-from-bottom-3 duration-600' : ''
                      }`}
                    >
                      <div
                        className={`max-w-[85%] p-5 rounded-2xl backdrop-blur-lg ${
                          message.sender === 'user' 
                            ? 'rounded-br-md' 
                            : 'rounded-bl-md'
                        } transition-all duration-300 hover:scale-[1.02]`}
                        style={{
                          background: message.sender === 'user'
                            ? 'linear-gradient(135deg, rgba(255, 63, 135, 0.9) 0%, rgba(160, 32, 240, 0.9) 100%)'
                            : 'linear-gradient(135deg, rgba(0, 208, 192, 0.9) 0%, rgba(0, 139, 139, 0.9) 100%)',
                          boxShadow: message.sender === 'user'
                            ? '0 0 30px rgba(255, 63, 135, 0.4), 0 0 60px rgba(255, 63, 135, 0.15)'
                            : '0 0 30px rgba(0, 208, 192, 0.4), 0 0 60px rgba(0, 208, 192, 0.15)',
                          border: `2px solid ${message.sender === 'user' ? 'rgba(255, 63, 135, 0.4)' : 'rgba(0, 208, 192, 0.4)'}`
                        }}
                      >
                        <p className="text-white font-medium leading-relaxed text-lg">
                          {message.text}
                        </p>
                        <div className="text-sm text-white/80 mt-3">
                          {message.timestamp.toLocaleTimeString('de-DE', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start animate-in slide-in-from-bottom-3 duration-300">
                      <div
                        className="p-5 rounded-2xl rounded-bl-md backdrop-blur-lg"
                        style={{
                          background: 'linear-gradient(135deg, rgba(0, 208, 192, 0.9) 0%, rgba(0, 139, 139, 0.9) 100%)',
                          boxShadow: '0 0 30px rgba(0, 208, 192, 0.4)',
                          border: '2px solid rgba(0, 208, 192, 0.4)'
                        }}
                      >
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>

            {/* Input Area - Glassmorphismus */}
            <div 
              className="flex items-center gap-4 p-5 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.6) 0%, rgba(14, 15, 26, 0.8) 100%)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255, 63, 135, 0.3)',
                boxShadow: '0 0 25px rgba(255, 63, 135, 0.15)'
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Schreibe deine Nachricht..."
                className="flex-1 bg-transparent text-[#D8D8D8] placeholder-[#D8D8D8]/60 outline-none text-lg"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              
              <button
                onClick={toggleVoiceInput}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isListening ? 'bg-[#FF3F87]/25 shadow-lg shadow-[#FF3F87]/25' : 'hover:bg-[#00D0C0]/20'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-6 h-6 text-[#FF3F87]" />
                ) : (
                  <Mic className="w-6 h-6 text-[#00D0C0]" />
                )}
              </button>

              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="p-3 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{
                  background: inputValue.trim() 
                    ? 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)'
                    : 'rgba(255, 63, 135, 0.3)',
                  boxShadow: inputValue.trim() 
                    ? '0 0 20px rgba(255, 63, 135, 0.5), 0 0 40px rgba(255, 63, 135, 0.2)'
                    : 'none'
                }}
              >
                <Send className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Avatar Column (Right) - Completely Free Standing */}
          <div className="flex flex-col items-center justify-center relative">
            <div 
              className={`relative transition-all duration-1000 ${
                avatarAnimation === 'float' ? 'float-animation' : ''
              } ${
                avatarAnimation === 'nod' ? 'avatar-nod' : ''
              }`}
            >
              {/* Radial Glow Halos - Multiple Layers */}
              <div 
                className="absolute inset-0 animate-pulse"
                style={{
                  background: 'radial-gradient(ellipse 450px 650px at center, rgba(255, 63, 135, 0.25) 0%, rgba(255, 63, 135, 0.1) 40%, transparent 70%)',
                  width: '500px',
                  height: '700px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animationDuration: '4s'
                }}
              />
              
              <div 
                className="absolute inset-0 animate-pulse"
                style={{
                  background: 'radial-gradient(ellipse 400px 600px at center bottom, rgba(0, 208, 192, 0.2) 0%, rgba(0, 208, 192, 0.08) 50%, transparent 80%)',
                  width: '450px',
                  height: '650px',
                  left: '50%',
                  top: '55%',
                  transform: 'translate(-50%, -50%)',
                  animationDuration: '6s',
                  animationDelay: '2s'
                }}
              />

              <div 
                className="absolute inset-0 animate-pulse"
                style={{
                  background: 'radial-gradient(ellipse 350px 550px at center, rgba(160, 32, 240, 0.15) 0%, rgba(160, 32, 240, 0.05) 60%, transparent 90%)',
                  width: '400px',
                  height: '600px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animationDuration: '5s',
                  animationDelay: '1s'
                }}
              />

              {/* Avatar Image - No Container, No Border */}
              <div 
                className="relative z-10"
                style={{
                  width: '420px',
                  height: '630px',
                  filter: 'brightness(1.1) contrast(1.08) saturate(1.15)'
                }}
              >
                <img
                  src={aiConsultantImage}
                  alt="KI-Beraterin - Professionelle Beraterin im eleganten Blazer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                  style={{
                    borderRadius: '0',
                    border: 'none',
                    maskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)'
                  }}
                />
                
                {/* Subtle highlight overlay */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none" 
                />
              </div>

              {/* Soft Shadow Under Feet for 3D Depth */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2"
                style={{
                  width: '200px',
                  height: '40px',
                  background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%)',
                  filter: 'blur(15px)'
                }}
              />

              {/* Activity Indicator */}
              <div 
                className="absolute bottom-12 right-12 rounded-full p-4 z-20"
                style={{
                  background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
                  boxShadow: '0 0 30px rgba(0, 208, 192, 0.7), 0 0 60px rgba(0, 208, 192, 0.3)'
                }}
              >
                <Bot className="w-7 h-7 text-white" />
              </div>
            </div>

            {/* Status Indicator */}
            <div 
              className="mt-10 px-6 py-4 rounded-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.6) 0%, rgba(14, 15, 26, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 208, 192, 0.3)',
                boxShadow: '0 0 25px rgba(0, 208, 192, 0.15)'
              }}
            >
              <div className="flex items-center justify-center gap-3 mb-2">
                <div 
                  className="w-4 h-4 bg-[#00D0C0] rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 15px rgba(0, 208, 192, 0.8)' }}
                />
                <span className="text-[#D8D8D8] font-semibold text-lg">Online verfügbar</span>
              </div>
              <p className="text-[#D8D8D8]/80 text-base">
                Bereit für deine persönliche Beratung
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {/* Mobile Avatar First */}
          <div className="flex flex-col items-center">
            {/* Language Selector Mobile - Above Avatar */}
            <div className="w-full flex justify-end mb-6">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.6) 0%, rgba(14, 15, 26, 0.8) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 63, 135, 0.3)'
                }}
              >
                <Languages className="w-5 h-5 text-[#FF3F87]" />
                <span className="text-xl">{selectedLanguage.flag}</span>
              </button>

              {/* Mobile Language Dropdown */}
              {showLanguageDropdown && (
                <div 
                  className="absolute top-full right-0 mt-2 w-60 max-h-64 overflow-y-auto rounded-xl z-50"
                  style={{
                    background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.95) 0%, rgba(14, 15, 26, 0.98) 100%)',
                    backdropFilter: 'blur(30px)',
                    border: '1px solid rgba(255, 63, 135, 0.3)',
                    boxShadow: '0 0 40px rgba(255, 63, 135, 0.25)'
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLanguageDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FF3F87]/15 transition-colors"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-[#D8D8D8] font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Avatar */}
            <div 
              className={`relative transition-all duration-1000 ${
                avatarAnimation === 'float' ? 'float-animation' : ''
              } ${
                avatarAnimation === 'nod' ? 'avatar-nod' : ''
              }`}
            >
              {/* Mobile glow halos */}
              <div 
                className="absolute inset-0 animate-pulse"
                style={{
                  background: 'radial-gradient(ellipse, rgba(255, 63, 135, 0.25) 0%, rgba(0, 208, 192, 0.15) 60%, transparent 80%)',
                  width: '320px',
                  height: '480px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animationDuration: '4s'
                }}
              />

              {/* Mobile Avatar Image */}
              <div 
                className="relative z-10"
                style={{
                  width: '280px',
                  height: '420px',
                  filter: 'brightness(1.1) contrast(1.05)'
                }}
              >
                <img
                  src={aiConsultantImage}
                  alt="KI-Beraterin"
                  className="w-full h-full object-cover object-center"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent 100%)'
                  }}
                />
              </div>

              {/* Mobile shadow */}
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                style={{
                  width: '150px',
                  height: '30px',
                  background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.5) 0%, transparent 100%)',
                  filter: 'blur(10px)'
                }}
              />

              {/* Mobile activity indicator */}
              <div 
                className="absolute bottom-6 right-6 rounded-full p-3"
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
              className="mt-6 px-5 py-3 rounded-xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.6) 0%, rgba(14, 15, 26, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 208, 192, 0.3)'
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <div 
                  className="w-3 h-3 bg-[#00D0C0] rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 10px rgba(0, 208, 192, 0.8)' }}
                />
                <span className="text-[#D8D8D8] font-medium">Online verfügbar</span>
              </div>
            </div>
          </div>

          {/* Mobile Chat Below Avatar */}
          <div className="space-y-6">
            {/* Mobile Chat Messages */}
            <div 
              className="px-2 rounded-2xl max-h-[400px] overflow-y-auto"
              style={{
                background: 'transparent'
              }}
            >
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${
                      message.isAnimating ? 'animate-in slide-in-from-bottom-3 duration-600' : ''
                    }`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-xl backdrop-blur-lg ${
                        message.sender === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
                      }`}
                      style={{
                        background: message.sender === 'user'
                          ? 'linear-gradient(135deg, rgba(255, 63, 135, 0.9) 0%, rgba(160, 32, 240, 0.9) 100%)'
                          : 'linear-gradient(135deg, rgba(0, 208, 192, 0.9) 0%, rgba(0, 139, 139, 0.9) 100%)',
                        boxShadow: message.sender === 'user'
                          ? '0 0 20px rgba(255, 63, 135, 0.4)'
                          : '0 0 20px rgba(0, 208, 192, 0.4)',
                        border: `1px solid ${message.sender === 'user' ? 'rgba(255, 63, 135, 0.4)' : 'rgba(0, 208, 192, 0.4)'}`
                      }}
                    >
                      <p className="text-white font-medium leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start animate-in slide-in-from-bottom-3 duration-300">
                    <div
                      className="p-4 rounded-xl rounded-bl-sm backdrop-blur-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 208, 192, 0.9) 0%, rgba(0, 139, 139, 0.9) 100%)',
                        boxShadow: '0 0 20px rgba(0, 208, 192, 0.4)'
                      }}
                    >
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Mobile Input */}
            <div 
              className="flex items-center gap-3 p-4 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.6) 0%, rgba(14, 15, 26, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 63, 135, 0.3)'
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nachricht schreiben..."
                className="flex-1 bg-transparent text-[#D8D8D8] placeholder-[#D8D8D8]/60 outline-none"
              />
              
              <button onClick={toggleVoiceInput} className="p-2 rounded-full hover:bg-[#00D0C0]/20 transition-colors">
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
                    ? 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)'
                    : 'rgba(255, 63, 135, 0.3)',
                  boxShadow: inputValue.trim() ? '0 0 15px rgba(255, 63, 135, 0.4)' : 'none'
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