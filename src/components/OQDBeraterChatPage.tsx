import React, { useState, useEffect, useRef } from 'react';
import { Button } from './design-system/Button';
import { Card, CardContent } from './design-system/Card';
import { 
  ArrowLeft, 
  Bot, 
  Send, 
  Mic, 
  User,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

interface OQDBeraterChatPageProps {
  onNavigate: (page: string) => void;
}

interface Message {
  id: number;
  type: 'user' | 'assistant';
  message: string;
  timestamp: string;
}

export const OQDBeraterChatPage: React.FC<OQDBeraterChatPageProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'assistant',
      message: 'Hallo! Ich bin Ihr persönlicher OQD-Berater. Wie kann ich Ihnen heute bei der Suche nach dem perfekten Deal helfen?',
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // Simulate AI response
  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      let response = '';
      const lowerMessage = userMessage.toLowerCase();
      
      if (lowerMessage.includes('internet') || lowerMessage.includes('wlan') || lowerMessage.includes('wifi')) {
        response = 'Perfekt! Für Internet-Tarife habe ich einige Top-Angebote für Sie. Wie viel Geschwindigkeit benötigen Sie denn? Und nutzen Sie das Internet hauptsächlich für Streaming, Gaming oder eher für alltägliche Aufgaben?';
      } else if (lowerMessage.includes('mobilfunk') || lowerMessage.includes('handy') || lowerMessage.includes('smartphone')) {
        response = 'Gerne helfe ich Ihnen bei Mobilfunk-Tarifen! Wie viel Datenvolumen verbrauchen Sie monatlich? Und ist Ihnen unlimitiertes Datenvolumen wichtig, oder reicht Ihnen ein festes Kontingent?';
      } else if (lowerMessage.includes('strom') || lowerMessage.includes('gas') || lowerMessage.includes('energie')) {
        response = 'Ausgezeichnet! Bei Strom- und Gas-Tarifen kann ich Ihnen sehr gute Angebote zeigen. Leben Sie in einem Einfamilienhaus oder einer Wohnung? Und ist Ihnen Ökostrom wichtig?';
      } else if (lowerMessage.includes('kredit') || lowerMessage.includes('darlehen') || lowerMessage.includes('finanzierung')) {
        response = 'Gerne berate ich Sie zu Krediten! Welche Kreditsumme schwebt Ihnen vor? Und wofür möchten Sie den Kredit verwenden - Auto, Renovierung oder andere Zwecke?';
      } else if (lowerMessage.includes('preis') || lowerMessage.includes('kosten') || lowerMessage.includes('günstig')) {
        response = 'Transparente Preise sind unser Markenzeichen! Ich zeige Ihnen immer die Gesamtkosten auf und vergleiche verschiedene Anbieter für Sie. In welchem Bereich suchen Sie nach Einsparmöglichkeiten?';
      } else {
        response = 'Das ist interessant! Um Ihnen das beste Angebot zu finden, können Sie mir gerne mehr Details mitteilen. Suchen Sie nach Internet, Mobilfunk, Strom/Gas oder einem Kredit? Je mehr ich über Ihre Bedürfnisse weiß, desto besser kann ich Sie beraten.';
      }
      
      const newMessage: Message = {
        id: messages.length + 1,
        type: 'assistant',
        message: response,
        timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };
  
  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newUserMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      message: inputMessage,
      timestamp: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    simulateAIResponse(inputMessage);
    setInputMessage('');
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const quickResponses = [
    'Ich suche einen Internet-Tarif',
    'Mobilfunk-Angebote interessieren mich',
    'Strom & Gas wechseln',
    'Kredit-Beratung benötigt'
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#0E0F1A' }}>
      {/* Header */}
      <div 
        className="sticky top-0 z-50 border-b glass-morphism"
        style={{ 
          backgroundColor: '#1A0E23',
          borderColor: 'rgba(216, 216, 216, 0.1)'
        }}
      >
        <div className="content-max-width py-4 px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 button-safe"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Zurück</span>
            </Button>
            
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
                  boxShadow: '0 0 15px rgba(0, 208, 192, 0.3)'
                }}
              >
                <Bot className="w-6 h-6 text-white" />
              </div>
              
              <div>
                <h1 className="text-xl font-bold text-white">OQD-Berater</h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#00D0C0] rounded-full animate-pulse" />
                  <span className="text-sm text-[#D8D8D8]/70">Online - Antwortet sofort</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Chat Container */}
      <div className="content-max-width py-6 px-4 sm:px-6 flex flex-col overflow-hidden" style={{ minHeight: 'calc(100vh - 200px)' }}>
        
        {/* Chat Messages */}
        <Card variant="glass" className="flex-1 mb-6 overflow-hidden" padding="none">
          <CardContent className="h-full flex flex-col overflow-hidden">
            
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 max-h-[60vh]">
              
              {/* Welcome Info */}
              <div className="text-center mb-8">
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm"
                  style={{
                    backgroundColor: 'rgba(0, 208, 192, 0.1)',
                    color: '#00D0C0',
                    border: '1px solid rgba(0, 208, 192, 0.2)'
                  }}
                >
                  <CheckCircle className="h-4 w-4" />
                  Kostenlose Beratung - Keine Verpflichtungen
                </div>
              </div>
              
              {/* Messages */}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className="flex items-start gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%]">
                    
                    {/* Avatar for assistant messages */}
                    {message.type === 'assistant' && (
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        style={{
                          background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
                          boxShadow: '0 0 10px rgba(0, 208, 192, 0.3)'
                        }}
                      >
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    {/* Message bubble */}
                    <div 
                      className={`p-3 sm:p-4 rounded-2xl overflow-safe ${
                        message.type === 'user' 
                          ? 'rounded-br-md' 
                          : 'rounded-bl-md'
                      }`}
                      style={{
                        background: message.type === 'user' 
                          ? 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)'
                          : 'rgba(0, 208, 192, 0.1)',
                        border: message.type === 'user' 
                          ? 'none'
                          : '1px solid rgba(0, 208, 192, 0.2)',
                        boxShadow: message.type === 'user'
                          ? '0 0 15px rgba(255, 63, 135, 0.3)'
                          : '0 0 10px rgba(0, 208, 192, 0.1)'
                      }}
                    >
                      <p className="text-white text-sm leading-relaxed mb-2">
                        {message.message}
                      </p>
                      <div className="flex justify-end">
                        <span 
                          className="text-xs opacity-70"
                          style={{ 
                            color: message.type === 'user' ? 'rgba(255,255,255,0.8)' : '#D8D8D8'
                          }}
                        >
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                    
                    {/* Avatar for user messages */}
                    {message.type === 'user' && (
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                        style={{
                          background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)',
                          boxShadow: '0 0 10px rgba(255, 63, 135, 0.3)'
                        }}
                      >
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{
                        background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
                        boxShadow: '0 0 10px rgba(0, 208, 192, 0.3)'
                      }}
                    >
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    
                    <div 
                      className="p-4 rounded-2xl rounded-bl-md"
                      style={{
                        background: 'rgba(0, 208, 192, 0.1)',
                        border: '1px solid rgba(0, 208, 192, 0.2)'
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#00D0C0]" />
                        <span className="text-[#00D0C0] text-sm">Tippt...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Response Buttons */}
        {messages.length === 1 && (
          <div className="mb-4 px-4 sm:px-0">
            <p className="text-[#D8D8D8]/70 text-sm mb-3 text-center overflow-safe">Oder wählen Sie einen Bereich:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 spacing-sm">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(response)}
                  className="p-3 rounded-lg text-left text-sm transition-all duration-200 hover:scale-[1.02] glass-morphism hover-glow-turquoise overflow-safe"
                  style={{
                    border: '1px solid rgba(0, 208, 192, 0.2)',
                    color: '#D8D8D8'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 208, 192, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(0, 208, 192, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 208, 192, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(0, 208, 192, 0.2)';
                  }}
                >
                  {response}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Message Input */}
        <Card variant="glass" padding="none" className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
              <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ihre Nachricht eingeben..."
                  disabled={isTyping}
                  className="flex-1 bg-transparent border-none outline-none text-[#D8D8D8] placeholder-[#D8D8D8]/50 text-sm min-w-0 overflow-safe"
                  style={{
                    background: 'rgba(216, 216, 216, 0.05)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid rgba(216, 216, 216, 0.1)'
                  }}
                />
                
                <Button
                  variant="secondary"
                  size="sm"
                  className="p-3"
                  style={{
                    background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
                    border: 'none'
                  }}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-4 sm:px-6 py-3 button-safe"
                style={{
                  background: inputMessage.trim() && !isTyping
                    ? 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)'
                    : 'rgba(216, 216, 216, 0.1)',
                  border: 'none'
                }}
              >
                <Send className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Senden</span>
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 text-xs text-[#D8D8D8]/50 gap-2 sm:gap-4">
              <span className="hidden sm:inline overflow-safe">Drücken Sie Enter zum Senden</span>
              <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-[#00D0C0]" />
                  <span className="overflow-safe">Verschlüsselt</span>
                </span>
                <span className="flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 text-[#FFD166]" />
                  <span className="overflow-safe">Keine Speicherung</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Footer Info */}
      <div className="border-t overflow-hidden" style={{ borderColor: 'rgba(216, 216, 216, 0.1)' }}>
        <div className="content-max-width py-4 px-4 sm:px-6">
          <div className="text-center text-xs text-[#D8D8D8]/60">
            <p className="overflow-safe">
              OQD-Berater • Kostenlose Beratung • Keine Verpflichtungen • 
              <button 
                onClick={() => onNavigate('datenschutz')} 
                className="underline hover:text-[#00D0C0] ml-1 transition-colors"
              >
                Datenschutz
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};