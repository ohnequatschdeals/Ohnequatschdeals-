import React, { useState, useRef, useEffect } from 'react';
import { Button } from './design-system/Button';
import { 
  Bot, 
  Send, 
  Languages, 
  ChevronDown,
  Mic,
  MicOff
} from 'lucide-react';
import aiConsultantImage from 'figma:asset/29296637440b6bfcb41c65d1c81821f49fe96365.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
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

export const InteractiveAIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hallo! Ich bin deine KI-Beraterin und helfe dir dabei, die besten Angebote für Internet, Mobilfunk, Strom, Gas oder Kredite zu finden. Womit kann ich dir heute helfen?',
      sender: 'ai',
      timestamp: new Date()
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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Avatar head nod animation
    setAvatarAnimation('nod');
    setTimeout(() => setAvatarAnimation('float'), 1000);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(userMessage.text),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('internet') || lowerText.includes('wifi')) {
      return 'Perfekt! Für Internet-Tarife kann ich dir die besten aktuellen Angebote zeigen. Welche Geschwindigkeit benötigst du ungefähr und in welcher Region wohnst du?';
    } else if (lowerText.includes('mobilfunk') || lowerText.includes('handy')) {
      return 'Gerne helfe ich dir bei Mobilfunk-Tarifen! Wie viel Datenvolumen brauchst du monatlich und telefonierst du viel?';
    } else if (lowerText.includes('strom') || lowerText.includes('gas')) {
      return 'Bei Strom und Gas kann ich dir dabei helfen, bis zu 800€ im Jahr zu sparen! Kennst du deinen ungefähren Jahresverbrauch?';
    } else if (lowerText.includes('kredit')) {
      return 'Für Kredite kann ich dir die besten Konditionen finden. Welchen Betrag benötigst du und wofür soll der Kredit verwendet werden?';
    } else if (lowerText.includes('hallo') || lowerText.includes('hi')) {
      return 'Hallo! Schön, dass du da bist. Ich kann dir bei Internet, TV, Mobilfunk, Strom, Gas und Krediten helfen. Womit soll ich anfangen?';
    } else {
      return 'Das ist eine interessante Frage! Lass mich dir dabei helfen. Kannst du mir etwas mehr Details geben, damit ich dir die bestmögliche Beratung bieten kann?';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input functionality would be implemented here
  };

  return (
    <section 
      className="relative section-spacing overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0E0F1A 0%, #1A0E23 100%)'
      }}
    >
      {/* Ambient background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF3F87]/8 rounded-full blur-2xl animate-pulse" />
      <div 
        className="absolute bottom-16 right-16 w-40 h-40 bg-[#00D0C0]/6 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '1.5s' }} 
      />
      <div 
        className="absolute top-32 right-20 w-24 h-24 bg-[#A020F0]/8 rounded-full blur-2xl animate-pulse" 
        style={{ animationDelay: '2.5s' }} 
      />

      <div className="content-max-width">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start lg:min-h-[700px]">
          
          {/* Chat Window (Left) */}
          <div className="flex flex-col h-full">
            {/* Language Selector */}
            <div className="relative mb-6">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.4) 0%, rgba(14, 15, 26, 0.6) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 63, 135, 0.2)',
                  boxShadow: '0 0 20px rgba(255, 63, 135, 0.1)'
                }}
              >
                <Languages className="w-5 h-5 text-[#FF3F87]" />
                <span className="text-[#D8D8D8] text-lg font-medium flex items-center gap-2">
                  <span>{selectedLanguage.flag}</span>
                  {selectedLanguage.name}
                </span>
                <ChevronDown className="w-4 h-4 text-[#00D0C0]" />
              </button>

              {/* Language Dropdown */}
              {showLanguageDropdown && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl z-50"
                  style={{
                    background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.9) 0%, rgba(14, 15, 26, 0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 63, 135, 0.2)',
                    boxShadow: '0 0 30px rgba(255, 63, 135, 0.2)'
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLanguageDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FF3F87]/10 transition-colors duration-200 first:rounded-t-2xl last:rounded-b-2xl"
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="text-[#D8D8D8] font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Chat Messages Area */}
            <div 
              className="flex-1 p-6 mb-6 rounded-3xl overflow-y-auto max-h-[450px]"
              style={{
                background: 'transparent',
                border: '1px solid transparent'
              }}
            >
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-lg ${
                        message.sender === 'user' 
                          ? 'rounded-br-sm' 
                          : 'rounded-bl-sm'
                      }`}
                      style={{
                        background: message.sender === 'user'
                          ? 'linear-gradient(135deg, rgba(255, 63, 135, 0.8) 0%, rgba(160, 32, 240, 0.8) 100%)'
                          : 'linear-gradient(135deg, rgba(0, 208, 192, 0.8) 0%, rgba(0, 139, 139, 0.8) 100%)',
                        boxShadow: message.sender === 'user'
                          ? '0 0 20px rgba(255, 63, 135, 0.3), 0 0 40px rgba(255, 63, 135, 0.1)'
                          : '0 0 20px rgba(0, 208, 192, 0.3), 0 0 40px rgba(0, 208, 192, 0.1)',
                        border: `1px solid ${message.sender === 'user' ? 'rgba(255, 63, 135, 0.3)' : 'rgba(0, 208, 192, 0.3)'}`
                      }}
                    >
                      <p className="text-white font-medium leading-relaxed">
                        {message.text}
                      </p>
                      <div className="text-xs text-white/70 mt-2">
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
                  <div className="flex justify-start">
                    <div
                      className="p-4 rounded-2xl rounded-bl-sm backdrop-blur-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 208, 192, 0.8) 0%, rgba(0, 139, 139, 0.8) 100%)',
                        boxShadow: '0 0 20px rgba(0, 208, 192, 0.3)',
                        border: '1px solid rgba(0, 208, 192, 0.3)'
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

            {/* Input Area */}
            <div 
              className="flex items-center gap-3 p-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.4) 0%, rgba(14, 15, 26, 0.6) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 63, 135, 0.2)',
                boxShadow: '0 0 20px rgba(255, 63, 135, 0.1)'
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Schreibe deine Nachricht..."
                className="flex-1 bg-transparent text-[#D8D8D8] placeholder-[#D8D8D8]/50 outline-none text-lg"
              />
              
              <button
                onClick={toggleVoiceInput}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isListening ? 'bg-[#FF3F87]/20' : 'hover:bg-[#00D0C0]/20'
                }`}
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
                className="p-2 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: inputValue.trim() 
                    ? 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)'
                    : 'rgba(255, 63, 135, 0.3)',
                  boxShadow: inputValue.trim() 
                    ? '0 0 15px rgba(255, 63, 135, 0.4)'
                    : 'none'
                }}
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Avatar Area (Right) */}
          <div className="flex flex-col items-center justify-center h-full">
            <div 
              className={`relative transition-all duration-1000 ${
                avatarAnimation === 'float' ? 'float-animation' : ''
              } ${
                avatarAnimation === 'nod' ? 'avatar-nod' : ''
              }`}
            >
              {/* Outer glow rings */}
              <div 
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background: 'radial-gradient(ellipse, rgba(255, 63, 135, 0.2) 0%, rgba(0, 208, 192, 0.1) 60%, transparent 80%)',
                  width: '420px',
                  height: '600px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animationDuration: '4s'
                }}
              />
              
              <div 
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background: 'radial-gradient(ellipse, rgba(0, 208, 192, 0.15) 0%, rgba(255, 63, 135, 0.08) 60%, transparent 80%)',
                  width: '400px',
                  height: '580px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animationDuration: '5s',
                  animationDelay: '1s'
                }}
              />

              {/* Avatar Image */}
              <div 
                className="relative overflow-hidden"
                style={{
                  width: '380px',
                  height: '560px',
                  borderRadius: '60px',
                  border: '2px solid rgba(255, 63, 135, 0.3)',
                  boxShadow: `
                    0 0 40px rgba(255, 63, 135, 0.3),
                    0 0 80px rgba(0, 208, 192, 0.2),
                    0 40px 80px rgba(0, 0, 0, 0.4)
                  `
                }}
              >
                <img
                  src={aiConsultantImage}
                  alt="KI-Beraterin - Professionelle Geschäftsfrau im pinken Blazer"
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  style={{
                    filter: 'brightness(1.1) contrast(1.05) saturate(1.1)'
                  }}
                />
                
                {/* Inner highlight overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/8 pointer-events-none" 
                     style={{ borderRadius: '60px' }} />
              </div>

              {/* Activity indicator */}
              <div 
                className="absolute bottom-8 right-8 rounded-full p-3"
                style={{
                  background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
                  boxShadow: '0 0 25px rgba(0, 208, 192, 0.6)'
                }}
              >
                <Bot className="w-6 h-6 text-white" />
              </div>
            </div>

            {/* Avatar Status */}
            <div 
              className="mt-8 px-6 py-3 rounded-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.4) 0%, rgba(14, 15, 26, 0.6) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 208, 192, 0.2)',
                boxShadow: '0 0 20px rgba(0, 208, 192, 0.1)'
              }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <div 
                  className="w-3 h-3 bg-[#00D0C0] rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 10px rgba(0, 208, 192, 0.8)' }}
                />
                <span className="text-[#D8D8D8] font-medium">Online verfügbar</span>
              </div>
              <p className="text-sm text-[#D8D8D8]/70">
                Bereit für deine Beratung
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* Mobile Avatar - Now at the top */}
          <div className="flex flex-col items-center">
            {/* Language Selector Mobile - Now above avatar */}
            <div className="w-full flex justify-end mb-4">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.4) 0%, rgba(14, 15, 26, 0.6) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 63, 135, 0.2)'
                }}
              >
                <Languages className="w-4 h-4 text-[#FF3F87]" />
                <span className="text-xl">{selectedLanguage.flag}</span>
              </button>

              {/* Mobile Language Dropdown */}
              {showLanguageDropdown && (
                <div 
                  className="absolute top-full right-0 mt-2 w-56 max-h-60 overflow-y-auto rounded-xl z-50"
                  style={{
                    background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.9) 0%, rgba(14, 15, 26, 0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 63, 135, 0.2)',
                    boxShadow: '0 0 30px rgba(255, 63, 135, 0.2)'
                  }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLanguageDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FF3F87]/10 transition-colors"
                    >
                      <span>{lang.flag}</span>
                      <span className="text-[#D8D8D8] text-sm font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div 
              className={`relative transition-all duration-1000 ${
                avatarAnimation === 'float' ? 'float-animation' : ''
              } ${
                avatarAnimation === 'nod' ? 'avatar-nod' : ''
              }`}
            >
              {/* Mobile glow rings */}
              <div 
                className="absolute inset-0 rounded-full animate-pulse"
                style={{
                  background: 'radial-gradient(ellipse, rgba(255, 63, 135, 0.2) 0%, rgba(0, 208, 192, 0.1) 60%, transparent 80%)',
                  width: '280px',
                  height: '420px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animationDuration: '4s'
                }}
              />

              {/* Mobile Avatar Image */}
              <div 
                className="relative overflow-hidden mx-auto"
                style={{
                  width: '260px',
                  height: '400px',
                  borderRadius: '40px',
                  border: '2px solid rgba(255, 63, 135, 0.3)',
                  boxShadow: `
                    0 0 30px rgba(255, 63, 135, 0.3),
                    0 0 60px rgba(0, 208, 192, 0.2),
                    0 20px 40px rgba(0, 0, 0, 0.4)
                  `
                }}
              >
                <img
                  src={aiConsultantImage}
                  alt="KI-Beraterin"
                  className="w-full h-full object-cover object-center"
                  style={{
                    filter: 'brightness(1.1) contrast(1.05)'
                  }}
                />
                
                {/* Mobile inner highlight */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/8 pointer-events-none" 
                     style={{ borderRadius: '40px' }} />
              </div>

              {/* Mobile activity indicator */}
              <div 
                className="absolute bottom-4 right-4 rounded-full p-2"
                style={{
                  background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
                  boxShadow: '0 0 20px rgba(0, 208, 192, 0.6)'
                }}
              >
                <Bot className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Mobile Status */}
            <div 
              className="mt-4 px-4 py-2 rounded-xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.4) 0%, rgba(14, 15, 26, 0.6) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0, 208, 192, 0.2)'
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <div 
                  className="w-2 h-2 bg-[#00D0C0] rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 8px rgba(0, 208, 192, 0.8)' }}
                />
                <span className="text-[#D8D8D8] text-sm font-medium">Online verfügbar</span>
              </div>
            </div>
          </div>

          {/* Mobile Chat - Now below avatar */}
          <div className="space-y-4">
            {/* Chat Messages */}
            <div 
              className="p-4 rounded-2xl max-h-[350px] overflow-y-auto"
              style={{
                background: 'transparent',
                border: '1px solid transparent'
              }}
            >
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-xl backdrop-blur-lg ${
                        message.sender === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
                      }`}
                      style={{
                        background: message.sender === 'user'
                          ? 'linear-gradient(135deg, rgba(255, 63, 135, 0.8) 0%, rgba(160, 32, 240, 0.8) 100%)'
                          : 'linear-gradient(135deg, rgba(0, 208, 192, 0.8) 0%, rgba(0, 139, 139, 0.8) 100%)',
                        boxShadow: message.sender === 'user'
                          ? '0 0 15px rgba(255, 63, 135, 0.3)'
                          : '0 0 15px rgba(0, 208, 192, 0.3)',
                        border: `1px solid ${message.sender === 'user' ? 'rgba(255, 63, 135, 0.3)' : 'rgba(0, 208, 192, 0.3)'}`
                      }}
                    >
                      <p className="text-white text-sm leading-relaxed">
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div
                      className="p-3 rounded-xl rounded-bl-sm backdrop-blur-lg"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 208, 192, 0.8) 0%, rgba(0, 139, 139, 0.8) 100%)',
                        boxShadow: '0 0 15px rgba(0, 208, 192, 0.3)'
                      }}
                    >
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Mobile Input */}
            <div 
              className="flex items-center gap-2 p-3 rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.4) 0%, rgba(14, 15, 26, 0.6) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 63, 135, 0.2)'
              }}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nachricht schreiben..."
                className="flex-1 bg-transparent text-[#D8D8D8] placeholder-[#D8D8D8]/50 outline-none"
              />
              
              <button onClick={toggleVoiceInput} className="p-2 rounded-full hover:bg-[#00D0C0]/20 transition-colors">
                {isListening ? (
                  <MicOff className="w-4 h-4 text-[#FF3F87]" />
                ) : (
                  <Mic className="w-4 h-4 text-[#00D0C0]" />
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
                  boxShadow: inputValue.trim() ? '0 0 10px rgba(255, 63, 135, 0.4)' : 'none'
                }}
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};