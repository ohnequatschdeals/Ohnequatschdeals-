import React, { useEffect, useState } from 'react';
import { Button } from './design-system/Button';
import { Bot, ArrowRight } from 'lucide-react';
import aiConsultantImage from 'figma:asset/29296637440b6bfcb41c65d1c81821f49fe96365.png';

interface AIConsultantFloatingAvatarProps {
  onStartConsultation?: () => void;
}

export const AIConsultantFloatingAvatar: React.FC<AIConsultantFloatingAvatarProps> = ({ 
  onStartConsultation 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    const speechTimer = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(speechTimer);
    };
  }, []);

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
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          
          {/* Avatar Side */}
          <div className="relative flex justify-center">
            {/* Speech Bubble */}
            <div 
              className={`absolute -top-24 left-1/2 transform -translate-x-1/2 max-w-sm transition-all duration-700 ease-out z-20 ${
                showSpeechBubble 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-90 translate-y-4'
              }`}
            >
              <div
                className="relative rounded-3xl px-6 py-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.85) 0%, rgba(14, 15, 26, 0.9) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 63, 135, 0.15)',
                  boxShadow: `
                    0 0 25px rgba(255, 63, 135, 0.15),
                    0 0 50px rgba(0, 208, 192, 0.1),
                    0 8px 32px rgba(0, 0, 0, 0.3)
                  `
                }}
              >
                <p 
                  className="text-base font-medium leading-relaxed text-center"
                  style={{ color: '#D8D8D8' }}
                >
                  "Hallo! Ich bin deine KI-Beraterin – bereit, dir den besten Deal zu finden!"
                </p>
                
                {/* Speech bubble tail */}
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-6 h-6 rotate-45"
                  style={{
                    background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.85) 0%, rgba(14, 15, 26, 0.9) 100%)',
                    border: '1px solid rgba(255, 63, 135, 0.15)',
                    borderTop: 'transparent',
                    borderLeft: 'transparent'
                  }}
                />
              </div>
            </div>

            {/* Floating Avatar */}
            <div 
              className={`relative transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0 float-animation' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Outer glow rings */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 63, 135, 0.25) 0%, rgba(0, 208, 192, 0.15) 60%, transparent 80%)',
                  width: '280px',
                  height: '280px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'pulse 4s ease-in-out infinite'
                }}
              />
              
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(0, 208, 192, 0.2) 0%, rgba(255, 63, 135, 0.1) 60%, transparent 80%)',
                  width: '260px',
                  height: '260px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'pulse 5s ease-in-out infinite',
                  animationDelay: '1s'
                }}
              />

              {/* Avatar Image */}
              <div 
                className="relative overflow-hidden rounded-full"
                style={{
                  width: '240px',
                  height: '240px',
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
                  alt="KI-Beraterin - Professionelle Geschäftsfrau"
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  style={{
                    filter: 'brightness(1.1) contrast(1.05)'
                  }}
                />
                
                {/* Inner highlight */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/8 pointer-events-none" />
              </div>

              {/* Activity indicator */}
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
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 
                className="text-4xl lg:text-5xl font-bold leading-tight"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 50%, #00D0C0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent'
                }}
              >
                Deine persönliche
                <br />
                KI-Beraterin
              </h2>
              
              <p 
                className="text-lg lg:text-xl leading-relaxed max-w-lg"
                style={{ color: '#D8D8D8' }}
              >
                Maßgeschneiderte Angebote für deine Bedürfnisse – kostenlos und unverbindlich. 
                Lass dich rund um die Uhr beraten und finde den perfekten Deal.
              </p>
            </div>

            <Button
              size="lg"
              onClick={onStartConsultation}
              className="group min-w-[280px] hover:scale-105 transition-all duration-300"
            >
              <Bot className="mr-3 h-5 w-5 group-hover:animate-pulse" />
              Beratung starten
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-[#D8D8D8]/70">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 bg-[#00D0C0] rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 8px rgba(0, 208, 192, 0.8)' }}
                />
                <span>24/7 verfügbar</span>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 bg-[#FF3F87] rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 8px rgba(255, 63, 135, 0.8)', animationDelay: '0.5s' }}
                />
                <span>100% kostenlos</span>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 bg-[#FFD166] rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 8px rgba(255, 209, 102, 0.8)', animationDelay: '1s' }}
                />
                <span>Sofortige Antworten</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden text-center space-y-12">
          {/* Content Section */}
          <div className="space-y-6">
            <h2 
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 50%, #00D0C0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}
            >
              Deine persönliche
              <br />
              KI-Beraterin
            </h2>
            
            <p 
              className="text-lg leading-relaxed max-w-lg mx-auto"
              style={{ color: '#D8D8D8' }}
            >
              Maßgeschneiderte Angebote für deine Bedürfnisse – kostenlos und unverbindlich.
            </p>
          </div>

          {/* Avatar Section */}
          <div className="relative flex flex-col items-center">
            {/* Speech Bubble */}
            <div 
              className={`mb-8 max-w-sm transition-all duration-700 ease-out ${
                showSpeechBubble 
                  ? 'opacity-100 scale-100 translate-y-0' 
                  : 'opacity-0 scale-90 translate-y-4'
              }`}
            >
              <div
                className="relative rounded-3xl px-6 py-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.85) 0%, rgba(14, 15, 26, 0.9) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 63, 135, 0.15)',
                  boxShadow: `
                    0 0 25px rgba(255, 63, 135, 0.15),
                    0 0 50px rgba(0, 208, 192, 0.1),
                    0 8px 32px rgba(0, 0, 0, 0.3)
                  `
                }}
              >
                <p 
                  className="text-base font-medium leading-relaxed text-center"
                  style={{ color: '#D8D8D8' }}
                >
                  "Hallo! Ich bin deine KI-Beraterin – bereit, dir den besten Deal zu finden!"
                </p>
                
                {/* Speech bubble tail */}
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-6 h-6 rotate-45"
                  style={{
                    background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.85) 0%, rgba(14, 15, 26, 0.9) 100%)',
                    border: '1px solid rgba(255, 63, 135, 0.15)',
                    borderTop: 'transparent',
                    borderLeft: 'transparent'
                  }}
                />
              </div>
            </div>

            {/* Floating Avatar */}
            <div 
              className={`relative transition-all duration-1000 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0 float-animation' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Outer glow rings - smaller on mobile */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255, 63, 135, 0.25) 0%, rgba(0, 208, 192, 0.15) 60%, transparent 80%)',
                  width: '260px',
                  height: '260px',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'pulse 4s ease-in-out infinite'
                }}
              />

              {/* Avatar Image */}
              <div 
                className="relative overflow-hidden rounded-full mx-auto"
                style={{
                  width: '240px',
                  height: '240px',
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
                  alt="KI-Beraterin - Professionelle Geschäftsfrau"
                  className="w-full h-full object-cover object-center"
                  style={{
                    filter: 'brightness(1.1) contrast(1.05)'
                  }}
                />
                
                {/* Inner highlight */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/8 pointer-events-none" />
              </div>

              {/* Activity indicator */}
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
          </div>

          {/* Mobile CTA */}
          <div className="space-y-6">
            <Button
              size="lg"
              onClick={onStartConsultation}
              className="group min-w-[280px] hover:scale-105 transition-all duration-300"
            >
              <Bot className="mr-3 h-5 w-5 group-hover:animate-pulse" />
              Beratung starten
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-[#D8D8D8]/70">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 bg-[#00D0C0] rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 8px rgba(0, 208, 192, 0.8)' }}
                />
                <span>24/7 verfügbar</span>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 bg-[#FF3F87] rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 8px rgba(255, 63, 135, 0.8)', animationDelay: '0.5s' }}
                />
                <span>100% kostenlos</span>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 bg-[#FFD166] rounded-full animate-pulse"
                  style={{ boxShadow: '0 0 8px rgba(255, 209, 102, 0.8)', animationDelay: '1s' }}
                />
                <span>Sofortige Antworten</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};