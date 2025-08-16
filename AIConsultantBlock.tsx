import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Bot, 
  Send, 
  User, 
  Wifi, 
  Smartphone, 
  FileText, 
  Star,
  MessageCircle,
  Zap,
  Clock
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FloatingElement {
  id: number;
  type: 'circle' | 'icon';
  icon?: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  size: number;
  color: string;
  animationDelay: number;
  animationDuration: number;
}

export const AIConsultantBlock: React.FC = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);

  // Icons für schwebende Elemente
  const iconTypes = [Wifi, Smartphone, FileText, Star, Zap, MessageCircle];
  const colors = ['#00F0FF', '#FF00A6', '#9D00FF'];

  // Generiere schwebende Elemente
  useEffect(() => {
    const elements: FloatingElement[] = [];
    
    // 12 schwebende Elemente um den Avatar
    for (let i = 0; i < 12; i++) {
      const isIcon = i % 3 === 0; // Jedes 3. Element ist ein Icon
      const angle = (i / 12) * 360;
      const radius = 200 + Math.random() * 100; // Verschiedene Abstände
      
      elements.push({
        id: i,
        type: isIcon ? 'icon' : 'circle',
        icon: isIcon ? iconTypes[Math.floor(Math.random() * iconTypes.length)] : undefined,
        x: Math.cos((angle * Math.PI) / 180) * radius,
        y: Math.sin((angle * Math.PI) / 180) * radius,
        size: isIcon ? 24 : 8 + Math.random() * 16,
        color: colors[Math.floor(Math.random() * colors.length)],
        animationDelay: Math.random() * 3,
        animationDuration: 3 + Math.random() * 2
      });
    }
    
    setFloatingElements(elements);
  }, []);

  // Chat Messages für Demo
  const chatMessages = [
    {
      type: 'ai',
      message: 'Hallo! Ich bin deine persönliche KI-Beraterin. Wie kann ich dir helfen?'
    },
    {
      type: 'user',
      message: 'Ich suche einen günstigen Internet-Tarif.'
    },
    {
      type: 'ai',
      message: 'Gerne! Welche Geschwindigkeit brauchst du und wie viele Personen nutzen das Internet?'
    }
  ];

  return (
    <section 
      className="relative py-24 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0A0A0B 0%, #0F0F11 30%, #121214 70%, #0F0F11 100%)'
      }}
    >
      {/* Ambiente Glow-Effekte */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#00F0FF]/10 to-[#9D00FF]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div 
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-[#FF00A6]/8 to-[#9D00FF]/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge 
            className="bg-gradient-to-r from-[#00F0FF]/20 to-[#9D00FF]/20 text-[#00F0FF] border-[#00F0FF]/30 backdrop-blur-sm font-bold text-base px-6 py-3 mb-6"
            style={{
              boxShadow: '0 0 30px rgba(0, 240, 255, 0.4)'
            }}
          >
            <Bot className="w-5 h-5 mr-2" />
            KI-Beraterin
          </Badge>
          
          <h2 
            className="text-4xl md:text-6xl font-black text-white mb-6"
            style={{
              textShadow: '0 0 40px rgba(255, 255, 255, 0.3)'
            }}
          >
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] bg-clip-text text-transparent">
              Deine persönliche KI-Beraterin
            </span>
          </h2>
          
          <div 
            className="text-xl text-gray-300 max-w-3xl mx-auto font-medium"
            style={{
              color: 'rgba(255, 255, 255, 0.8)'
            }}
          >
            Maßgeschneiderte Angebote für deine Bedürfnisse – kostenlos und unverbindlich.
          </div>
        </div>

        {/* Hauptbereich: Avatar + Chat */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-16 items-center">
          
          {/* Avatar-Bereich mit schwebenden Elementen */}
          <div className="relative flex flex-col items-center justify-center min-h-[600px]">
            
            {/* Schwebende Elemente um den Avatar */}
            <div className="absolute inset-0 flex items-center justify-center">
              {floatingElements.map((element) => {
                const FloatingIcon = element.icon;
                
                return (
                  <div
                    key={element.id}
                    className="absolute animate-bounce"
                    style={{
                      left: `calc(50% + ${element.x}px)`,
                      top: `calc(50% + ${element.y}px)`,
                      animationDelay: `${element.animationDelay}s`,
                      animationDuration: `${element.animationDuration}s`,
                      animationDirection: 'alternate',
                      animationIterationCount: 'infinite',
                      opacity: 0.7
                    }}
                  >
                    {element.type === 'circle' ? (
                      <div
                        className="rounded-full animate-pulse"
                        style={{
                          width: element.size,
                          height: element.size,
                          backgroundColor: element.color,
                          boxShadow: `0 0 ${element.size}px ${element.color}40, 0 0 ${element.size * 2}px ${element.color}20`
                        }}
                      />
                    ) : (
                      <div
                        className="p-2 rounded-full backdrop-blur-sm animate-pulse"
                        style={{
                          backgroundColor: `${element.color}20`,
                          border: `2px solid ${element.color}40`,
                          boxShadow: `0 0 20px ${element.color}60`
                        }}
                      >
                        {FloatingIcon && (
                          <FloatingIcon 
                            className="w-6 h-6"
                            style={{ color: element.color }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Glow-Effekt hinter Avatar */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
            >
              <div 
                className="w-80 h-80 bg-gradient-to-r from-[#00F0FF]/20 via-[#FF00A6]/20 to-[#9D00FF]/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '3s' }}
              />
            </div>

            {/* Speech Bubble */}
            <div 
              className="relative mb-8 bg-white/10 backdrop-blur-sm rounded-3xl px-8 py-6 max-w-lg z-20"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(255, 0, 166, 0.15) 100%)',
                borderLeft: '4px solid rgba(0, 240, 255, 0.6)',
                boxShadow: '0 0 40px rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="text-white font-medium text-center text-lg leading-relaxed">
                "Hallo! Ich bin deine KI-Beraterin. Lass uns gemeinsam den perfekten Tarif für dich finden!"
              </div>
              <div 
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white/10 backdrop-blur-sm rotate-45 translate-y-3"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(255, 0, 166, 0.15) 100%)'
                }}
              />
            </div>

            {/* Avatar - Professionelle Beraterin */}
            <div className="relative z-20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1494790108755-2616b9a86c65?w=400&h=600&fit=crop&crop=face"
                alt="KI-Beraterin - Professionelle Geschäftsfrau"
                className="h-[450px] w-auto object-cover object-top transition-all duration-500 hover:scale-105 rounded-2xl"
                style={{
                  filter: 'drop-shadow(0 0 50px rgba(0, 240, 255, 0.4)) drop-shadow(0 0 100px rgba(255, 0, 166, 0.3))',
                  maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent 100%)'
                }}
              />
            </div>

            {/* Pulsierender Aktivitäts-Indikator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                style={{
                  boxShadow: '0 0 25px rgba(0, 240, 255, 0.3)',
                  border: '1px solid rgba(0, 240, 255, 0.3)'
                }}
              >
                <div className="flex gap-1">
                  <div 
                    className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse"
                    style={{ animationDelay: '0s' }}
                  />
                  <div 
                    className="w-2 h-2 bg-[#FF00A6] rounded-full animate-pulse"
                    style={{ animationDelay: '0.2s' }}
                  />
                  <div 
                    className="w-2 h-2 bg-[#9D00FF] rounded-full animate-pulse"
                    style={{ animationDelay: '0.4s' }}
                  />
                </div>
                <span className="text-white text-sm font-medium">Online</span>
              </div>
            </div>
          </div>

          {/* Chat-Bereich */}
          <div 
            className="w-full max-w-[350px] lg:max-w-none"
            style={{ minHeight: '600px' }}
          >
            <div 
              className="h-full rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 240, 255, 0.08) 50%, rgba(157, 0, 255, 0.08) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 50px rgba(0, 240, 255, 0.2), 0 0 100px rgba(157, 0, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Chat Header */}
              <div 
                className="px-6 py-4 border-b border-white/10"
                style={{
                  background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.15) 0%, rgba(157, 0, 255, 0.15) 100%)'
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] flex items-center justify-center"
                    style={{
                      boxShadow: '0 0 25px rgba(0, 240, 255, 0.5)'
                    }}
                  >
                    <Bot className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">KI-Beraterin Sarah</h3>
                    <div className="text-green-400 text-sm flex items-center gap-2">
                      <div 
                        className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                        style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.8)' }}
                      />
                      Jetzt online & verfügbar
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div 
                className="p-6 space-y-6 overflow-y-auto"
                style={{ height: '400px' }}
              >
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex items-start gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                        msg.type === 'ai' 
                          ? 'bg-gradient-to-r from-[#00F0FF] to-[#9D00FF]' 
                          : 'bg-gradient-to-r from-[#FF00A6] to-[#9D00FF]'
                      }`}
                      style={{
                        boxShadow: msg.type === 'ai' 
                          ? '0 0 20px rgba(0, 240, 255, 0.5)' 
                          : '0 0 20px rgba(255, 0, 166, 0.5)'
                      }}
                    >
                      {msg.type === 'ai' ? (
                        <Bot className="h-5 w-5 text-white" />
                      ) : (
                        <User className="h-5 w-5 text-white" />
                      )}
                    </div>
                    
                    <div 
                      className={`max-w-xs backdrop-blur-sm rounded-2xl px-4 py-3 ${
                        msg.type === 'ai' 
                          ? 'bg-white/10 rounded-tl-sm' 
                          : 'bg-gradient-to-r from-[#FF00A6]/20 to-[#9D00FF]/20 rounded-tr-sm'
                      }`}
                      style={{
                        boxShadow: msg.type === 'ai' 
                          ? '0 0 20px rgba(255, 255, 255, 0.1)' 
                          : '0 0 20px rgba(255, 0, 166, 0.2)'
                      }}
                    >
                      <div className="text-white font-medium leading-relaxed">
                        {msg.message}
                      </div>
                      <div className="text-gray-400 text-xs mt-2 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {msg.type === 'ai' ? 'Jetzt' : '2 Min'}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                <div className="flex items-start gap-4">
                  <div 
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] flex items-center justify-center shrink-0"
                    style={{
                      boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)'
                    }}
                  >
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div 
                    className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3"
                    style={{
                      boxShadow: '0 0 20px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse"/>
                      <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}/>
                      <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}/>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div 
                className="p-6 border-t border-white/10"
                style={{
                  background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.05) 0%, rgba(157, 0, 255, 0.05) 100%)'
                }}
              >
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Deine Nachricht..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-[#00F0FF] transition-all duration-300"
                    style={{
                      boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.3)'
                    }}
                  />
                  <Button
                    className="bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] hover:from-[#00F0FF]/90 hover:to-[#9D00FF]/90 text-white border-0 rounded-2xl px-6 py-3 transition-all duration-300 hover:scale-105"
                    style={{
                      boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)'
                    }}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="group relative h-16 px-12 text-xl font-bold border-0 rounded-3xl bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] hover:from-[#00F0FF]/90 hover:via-[#FF00A6]/90 hover:to-[#9D00FF]/90 text-white transition-all duration-500 transform hover:scale-110"
            style={{
              boxShadow: '0 0 60px rgba(0, 240, 255, 0.5), 0 0 120px rgba(157, 0, 255, 0.4)'
            }}
          >
            <Bot className="mr-4 h-6 w-6" />
            Jetzt kostenlos beraten lassen
            <div 
              className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00F0FF]/30 to-[#FF00A6]/30 blur-2xl transition-all duration-500 group-hover:blur-3xl -z-10"
            />
          </Button>
        </div>
      </div>
    </section>
  );
};