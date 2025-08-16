import React, { useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  ArrowRight,
  Wifi,
  Smartphone,
  Zap,
  CreditCard,
  Car,
  Home,
  Shield,
  Banknote,
  TrendingUp,
  Percent
} from 'lucide-react';
import { Card, CardContent } from './design-system/Card';
import { Button } from './design-system/Button';
import { IconContainer } from './design-system/IconContainer';

interface WeitereAngeboteSectionProps {
  onNavigate: (page: string) => void;
}

export const WeitereAngeboteSection: React.FC<WeitereAngeboteSectionProps> = ({ onNavigate }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Additional offers data (10 cards)
  const weitereAngebote = [
    {
      id: 1,
      provider: 'Telekom',
      title: 'MagentaZuhause L',
      price: '34,95€',
      originalPrice: '49,95€',
      period: '/Monat',
      features: ['500 Mbit/s Download', '40 Mbit/s Upload', 'MagentaTV inklusive', '24 Monate Vertragslaufzeit'],
      badge: 'TELEKOM SPECIAL',
      savings: '15€ sparen',
      category: 'internet-tv',
      icon: Wifi
    },
    {
      id: 2,
      provider: 'O2',
      title: 'Free Unlimited Max',
      price: '39,99€',
      originalPrice: '59,99€',
      period: '/Monat',
      features: ['Unlimited Datenvolumen', '5G-Netz', 'EU-Roaming', 'Keine Drosselung'],
      badge: 'UNLIMITED',
      savings: '20€ sparen',
      category: 'mobilfunk',
      icon: Smartphone
    },
    {
      id: 3,
      provider: 'EnBW',
      title: 'Strom Komfort',
      price: '0,28€',
      originalPrice: '0,35€',
      period: '/kWh',
      features: ['100% Ökostrom', '12 Monate Preisgarantie', 'Keine Grundgebühr', 'Online-Kundenservice'],
      badge: 'ÖKO',
      savings: '7ct sparen',
      category: 'strom-gas',
      icon: Zap
    },
    {
      id: 4,
      provider: 'ING',
      title: 'Autokredit',
      price: '3,79%',
      originalPrice: '5,99%',
      period: 'eff. Jahreszins',
      features: ['Bis 75.000€', 'Flexible Laufzeit bis 8 Jahre', 'Kostenlose Sondertilgung', 'Schnelle Zusage'],
      badge: 'AUTO-KREDIT',
      savings: 'Top-Zinsen',
      category: 'kredite',
      icon: Car
    },
    {
      id: 5,
      provider: 'Pyur',
      title: 'Pure Speed 400',
      price: '24,99€',
      originalPrice: '39,99€',
      period: '/Monat',
      features: ['400 Mbit/s Download', '25 Mbit/s Upload', 'Kabel-Internet', '6 Monate Gratiszeit'],
      badge: 'CABLE POWER',
      savings: '90€ sparen',
      category: 'internet-tv',
      icon: Wifi
    },
    {
      id: 6,
      provider: 'Vattenfall',
      title: 'Gas Natur24',
      price: '0,09€',
      originalPrice: '0,12€',
      period: '/kWh',
      features: ['Klimaneutrales Gas', '24 Monate Preisgarantie', '100€ Neukundenbonus', 'Flexible Kündigungsfristen'],
      badge: 'KLIMANEUTRAL',
      savings: '100€ Bonus',
      category: 'strom-gas',
      icon: Home
    },
    {
      id: 7,
      provider: 'Check24',
      title: 'Hausratversicherung',
      price: '4,90€',
      originalPrice: '7,90€',
      period: '/Monat',
      features: ['Bis 50.000€ Versicherungssumme', 'Elementarschäden inklusive', 'Weltweiter Schutz', '24h Schadenservice'],
      badge: 'KOMPLETT-SCHUTZ',
      savings: '36€/Jahr sparen',
      category: 'versicherung',
      icon: Shield
    },
    {
      id: 8,
      provider: 'Auxmoney',
      title: 'Privatkredit Plus',
      price: '2,95%',
      originalPrice: '4,95%',
      period: 'eff. Jahreszins',
      features: ['Bis 50.000€', 'Sofortige Auszahlung', 'Ohne Schufa-Eintrag', 'Flexible Rückzahlung'],
      badge: 'PRIVATKREDIT',
      savings: 'Niedrigzins',
      category: 'kredite',
      icon: Banknote
    },
    {
      id: 9,
      provider: 'Trade Republic',
      title: 'ETF-Sparplan',
      price: '0€',
      originalPrice: '1,50€',
      period: 'Ordergebühr',
      features: ['Über 1.500 ETFs', 'Ab 25€ monatlich', 'Kostenlose Depotführung', 'Echtzeit-Kurse'],
      badge: 'INVESTIEREN',
      savings: 'Gebührenfrei',
      category: 'geldanlage',
      icon: TrendingUp
    },
    {
      id: 10,
      provider: 'Creditplus',
      title: 'Ratenkredit Flex',
      price: '1,99%',
      originalPrice: '3,99%',
      period: 'eff. Jahreszins',
      features: ['Bis 100.000€', 'Laufzeit bis 10 Jahre', '2 Raten aussetzen', 'Digitaler Antrag'],
      badge: 'FLEX-KREDIT',
      savings: 'Super-Zinsen',
      category: 'kredite',
      icon: Percent
    }
  ];

  // Carousel functionality
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Touch/swipe handling for mobile
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;

    const handleTouchStart = (e: TouchEvent) => {
      isDown = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      isDown = false;
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <section className="section-spacing" style={{ backgroundColor: '#0E0F1A' }}>
      <div className="content-max-width">
        
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Weitere Angebote</span>
          </h2>
          <p className="text-xl text-[#D8D8D8]/80 max-w-3xl mx-auto">
            Noch mehr exklusive Deals aus allen Bereichen – entdecken Sie weitere Top-Angebote.
          </p>
        </div>

        {/* Desktop Grid (xl screens and up) */}
        <div className="hidden xl:grid xl:grid-cols-4 gap-8">
          {weitereAngebote.slice(0, 8).map((offer, index) => {
            const IconComponent = offer.icon;
            
            return (
              <Card 
                key={offer.id} 
                variant="glass"
                glow="auto"
                className={`group cursor-pointer hover-scale fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onNavigate(offer.category)}
              >
                <CardContent className="p-0">
                  {/* Header with badge and icon */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-gradient-to-r from-[#FF3F87] to-[#A020F0] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {offer.badge}
                      </div>
                      <IconContainer variant="turquoise" size="sm">
                        <IconComponent className="w-5 h-5" />
                      </IconContainer>
                    </div>
                    
                    <div className="text-[#D8D8D8]/70 text-sm mb-2">{offer.provider}</div>
                    <h3 className="text-white text-xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                      {offer.title}
                    </h3>
                  </div>

                  {/* Price section */}
                  <div className="px-6 pb-4">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-3xl font-bold gradient-text">
                        {offer.price}
                      </span>
                      <span className="text-[#D8D8D8]/50 line-through text-lg">
                        {offer.originalPrice}
                      </span>
                    </div>
                    <div className="text-[#D8D8D8]/70">{offer.period}</div>
                  </div>

                  {/* Features */}
                  <div className="px-6 pb-4">
                    <div className="space-y-2">
                      {offer.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-[#00D0C0] shrink-0" />
                          <span className="text-[#D8D8D8]/80 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 pb-6">
                    <div className="text-[#FF3F87] font-bold text-sm mb-4">{offer.savings}</div>
                    <Button size="sm" className="w-full group-hover:scale-105">
                      Zum Angebot
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Carousel for Desktop/Tablet/Mobile (xl screens and below) */}
        <div className="xl:hidden relative">
          {/* Navigation buttons */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => scrollCarousel('left')}
              className="p-3 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(26, 14, 35, 0.6)',
                border: '2px solid rgba(0, 208, 192, 0.3)',
                color: '#00D0C0',
                boxShadow: '0 0 15px rgba(0, 208, 192, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 208, 192, 0.4)';
                e.currentTarget.style.borderColor = 'rgba(0, 208, 192, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 208, 192, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(0, 208, 192, 0.3)';
              }}
              aria-label="Previous offers"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="p-3 rounded-full transition-all duration-300 hover:scale-110"
              style={{
                background: 'rgba(26, 14, 35, 0.6)',
                border: '2px solid rgba(0, 208, 192, 0.3)',
                color: '#00D0C0',
                boxShadow: '0 0 15px rgba(0, 208, 192, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 208, 192, 0.4)';
                e.currentTarget.style.borderColor = 'rgba(0, 208, 192, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 208, 192, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(0, 208, 192, 0.3)';
              }}
              aria-label="Next offers"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ 
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {weitereAngebote.map((offer, index) => {
              const IconComponent = offer.icon;
              
              return (
                <Card 
                  key={offer.id} 
                  variant="glass"
                  glow="auto"
                  className="group cursor-pointer hover-scale fade-in-up flex-shrink-0 w-80 md:w-72"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    scrollSnapAlign: 'start'
                  }}
                  onClick={() => onNavigate(offer.category)}
                >
                  <CardContent className="p-0">
                    {/* Header with badge and icon */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-gradient-to-r from-[#FF3F87] to-[#A020F0] text-white text-xs font-bold px-3 py-1 rounded-full">
                          {offer.badge}
                        </div>
                        <IconContainer variant="turquoise" size="sm">
                          <IconComponent className="w-5 h-5" />
                        </IconContainer>
                      </div>
                      
                      <div className="text-[#D8D8D8]/70 text-sm mb-2">{offer.provider}</div>
                      <h3 className="text-white text-xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                        {offer.title}
                      </h3>
                    </div>

                    {/* Price section */}
                    <div className="px-6 pb-4">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-3xl font-bold gradient-text">
                          {offer.price}
                        </span>
                        <span className="text-[#D8D8D8]/50 line-through text-lg">
                          {offer.originalPrice}
                        </span>
                      </div>
                      <div className="text-[#D8D8D8]/70">{offer.period}</div>
                    </div>

                    {/* Features */}
                    <div className="px-6 pb-4">
                      <div className="space-y-2">
                        {offer.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-[#00D0C0] shrink-0" />
                            <span className="text-[#D8D8D8]/80 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-6">
                      <div className="text-[#FF3F87] font-bold text-sm mb-4">{offer.savings}</div>
                      <Button size="sm" className="w-full group-hover:scale-105">
                        Zum Angebot
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* "Alle Angebote" Button */}
        <div className="text-center mt-12 fade-in-up" style={{ animationDelay: '0.8s' }}>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => onNavigate('angebote')}
            className="min-w-[200px]"
          >
            Alle Angebote ansehen
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @media (max-width: 1279px) {
          .scrollbar-hide {
            scroll-snap-type: x mandatory;
          }
          .scrollbar-hide > * {
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
};