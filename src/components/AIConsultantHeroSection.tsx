import React, { useEffect, useState } from 'react';
import { Button } from './design-system/Button';
import { Bot, ArrowRight } from 'lucide-react';
import aiConsultantImage from 'figma:asset/29296637440b6bfcb41c65d1c81821f49fe96365.png';

interface AIConsultantHeroSectionProps {
  onStartConsultation?: () => void;
}

export const AIConsultantHeroSection: React.FC<AIConsultantHeroSectionProps> = ({ 
  onStartConsultation 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);

  useEffect(() => {
    // Avatar fade-in from bottom
    const avatarTimer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    // Speech bubble pop-in after avatar
    const speechTimer = setTimeout(() => {
      setShowSpeechBubble(true);
    }, 800);

    return () => {
      clearTimeout(avatarTimer);
      clearTimeout(speechTimer);
    };
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0E0F1A 0%, #1A0E23 100%)'
      }}
    >
      {/* Ambient background elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-[#FF3F87]/8 rounded-full blur-3xl animate-pulse" />
      <div 
        className="absolute top-32 right-16 w-32 h-32 bg-[#00D0C0]/10 rounded-full blur-2xl animate-pulse" 
        style={{ animationDelay: '1s' }} 
      />
      <div 
        className="absolute bottom-32 left-20 w-48 h-48 bg-[#A020F0]/6 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '2s' }} 
      />
      <div 
        className="absolute bottom-20 right-32 w-36 h-36 bg-[#00D0C0]/8 rounded-full blur-2xl animate-pulse" 
        style={{ animationDelay: '0.5s' }} 
      />

      <div className="content-max-width text-center relative z-10">
        
        {/* Header Section */}
        <div className="mb-16">
          {/* Main Headline */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 50%, #00D0C0 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent'
            }}
          >
            Deine persönliche KI-Beraterin
          </h1>
          
          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed"
            style={{ color: '#D8D8D8' }}
          >
            Maßgeschneiderte Angebote für deine Bedürfnisse – kostenlos und unverbindlich.
          </p>
        </div>

        {/* Avatar Section with Speech Bubble */}
        <div className="relative flex flex-col items-center mb-12">
          
          {/* Speech Bubble */}
          <div 
            className={`relative mb-8 max-w-lg transition-all duration-600 ease-out ${
              showSpeechBubble 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-90 translate-y-4'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.8) 0%, rgba(14, 15, 26, 0.9) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 63, 135, 0.2)',
              borderRadius: '24px',
              padding: '20px 32px',
              boxShadow: `
                0 0 30px rgba(255, 63, 135, 0.2),
                0 0 60px rgba(0, 208, 192, 0.1),
                0 8px 32px rgba(0, 0, 0, 0.4)
              `
            }}
          >
            <p 
              className="text-base md:text-lg font-medium leading-relaxed"
              style={{ color: '#D8D8D8' }}
            >
              "Hallo! Ich bin deine KI-Beraterin. Lass uns den perfekten Tarif für dich finden!"
            </p>
            
            {/* Speech bubble tail */}
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3 w-6 h-6 rotate-45"
              style={{
                background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.8) 0%, rgba(14, 15, 26, 0.9) 100%)',
                border: '1px solid rgba(255, 63, 135, 0.2)',
                borderTop: 'transparent',
                borderLeft: 'transparent'
              }}
            />
          </div>

          {/* Avatar Container */}
          <div 
            className={`relative transition-all duration-800 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Outer glow rings */}
            <div 
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(255, 63, 135, 0.3) 0%, rgba(0, 208, 192, 0.2) 50%, transparent 70%)',
                width: '280px',
                height: '280px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animationDuration: '3s'
              }}
            />
            
            <div 
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(0, 208, 192, 0.2) 0%, rgba(255, 63, 135, 0.1) 50%, transparent 70%)',
                width: '260px',
                height: '260px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animationDuration: '4s',
                animationDelay: '1s'
              }}
            />

            {/* Avatar Image */}
            <div 
              className="relative overflow-hidden rounded-full"
              style={{
                width: '240px',
                height: '240px',
                border: '3px solid rgba(255, 63, 135, 0.4)',
                boxShadow: `
                  0 0 40px rgba(255, 63, 135, 0.4),
                  0 0 80px rgba(0, 208, 192, 0.3),
                  inset 0 0 20px rgba(255, 255, 255, 0.1)
                `
              }}
            >
              <img
                src={aiConsultantImage}
                alt="KI-Beraterin - Professionelle Geschäftsfrau im pinken Blazer"
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                style={{
                  filter: 'brightness(1.1) contrast(1.05) saturate(1.1)'
                }}
              />
              
              {/* Inner highlight overlay */}
              <div 
                className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none"
              />
            </div>

            {/* Activity indicator */}
            <div 
              className="absolute bottom-4 right-4 bg-[#00D0C0] rounded-full p-2"
              style={{
                boxShadow: '0 0 20px rgba(0, 208, 192, 0.6), 0 0 40px rgba(0, 208, 192, 0.3)'
              }}
            >
              <Bot className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="relative">
          <Button
            size="xl"
            onClick={onStartConsultation}
            className="group relative min-w-[300px] text-xl font-bold transition-all duration-500 hover:scale-110 hover:shadow-[0_0_40px_rgba(255,63,135,0.5)]"
            style={{
              background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)',
              boxShadow: '0 0 30px rgba(255, 63, 135, 0.4), 0 0 60px rgba(255, 63, 135, 0.2)'
            }}
          >
            <Bot className="mr-3 h-6 w-6 group-hover:animate-pulse" />
            Beratung starten
            <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            
            {/* Enhanced glow on hover */}
            <div 
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF3F87]/20 to-[#A020F0]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
            />
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-[#D8D8D8]/70">
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 bg-[#00D0C0] rounded-full animate-pulse"
              style={{ boxShadow: '0 0 10px rgba(0, 208, 192, 0.8)' }}
            />
            <span className="text-sm">24/7 verfügbar</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 bg-[#FF3F87] rounded-full animate-pulse"
              style={{ boxShadow: '0 0 10px rgba(255, 63, 135, 0.8)', animationDelay: '0.5s' }}
            />
            <span className="text-sm">100% kostenlos</span>
          </div>
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 bg-[#FFD166] rounded-full animate-pulse"
              style={{ boxShadow: '0 0 10px rgba(255, 209, 102, 0.8)', animationDelay: '1s' }}
            />
            <span className="text-sm">Sofortige Antworten</span>
          </div>
        </div>
      </div>
    </section>
  );
};