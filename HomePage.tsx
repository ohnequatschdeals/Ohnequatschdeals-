import React, { useEffect, useState, useRef } from 'react';
import { Button } from './Button';
import { Card, CardContent } from './Card';
import { IconContainer } from './IconContainer';
import { OQDBeraterSection } from '../OQDBeraterSection';
import { WeitereAngeboteSection } from '../WeitereAngeboteSection';
import { TopBeraterSection } from '../TopBeraterSection';
import { 
  Wifi, 
  Smartphone, 
  Zap, 
  CreditCard, 
  Shield, 
  CheckCircle, 
  Users, 
  Award,
  ArrowRight,
  Bot,
  Star,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [benefitsVisible, setBenefitsVisible] = useState(false);
  const premiumOffersRef = useRef<HTMLDivElement>(null);
  const topBeraterRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === benefitsRef.current && entry.isIntersecting) {
            setBenefitsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (benefitsRef.current) {
      observer.observe(benefitsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to sections
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      const headerHeight = 80; // Account for fixed header
      const targetPosition = sectionRef.current.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Carousel functionality
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate card width + gap
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

  // Premium offers data
  const premiumOffers = [
    {
      provider: 'Vodafone',
      title: 'Red Internet 1000 Cable',
      price: '29,99€',
      originalPrice: '59,99€',
      period: '/Monat',
      features: ['1000 Mbit/s Download', '50 Mbit/s Upload', 'Telefon-Flat', '6 Monate kostenlos'],
      badge: 'TOP-ANGEBOT',
      savings: '50% sparen',
      category: 'internet-tv',
      icon: Wifi
    },
    {
      provider: '1&1',
      title: 'DSL 250 Komplett-Paket',
      price: '19,99€',
      originalPrice: '39,99€',
      period: '/Monat',
      features: ['250 Mbit/s Download', 'Telefon-Flat', 'WLAN-Router inklusive', 'Keine Grundgebühr'],
      badge: 'EMPFEHLUNG',
      savings: '20€ sparen',
      category: 'internet-tv',
      icon: Wifi
    },
    {
      provider: 'Smava',
      title: 'Sofortkredit Premium',
      price: '2,9%',
      originalPrice: '4,9%',
      period: 'eff. Jahreszins',
      features: ['Bis 120.000€', 'Sofortige Zusage', 'Flexible Laufzeit', 'Kostenlose Sondertilgung'],
      badge: 'TOP-ZINSEN',
      savings: 'Niedrigzins',
      category: 'kredite',
      icon: CreditCard
    },
    {
      provider: 'E.ON',
      title: 'Strom & Gas Kombi',
      price: '24,99€',
      originalPrice: '34,99€',
      period: '/Monat Grundpreis',
      features: ['100% Ökostrom', 'Klimaneutrales Gas', '12 Monate Preisgarantie', '150€ Bonus'],
      badge: 'ÖKO-TARIF',
      savings: '150€ Bonus',
      category: 'strom-gas',
      icon: Zap
    }
  ];

  // Benefits data
  const benefits = [
    {
      icon: Shield,
      title: 'Schneller Service',
      description: 'Blitzschnelle Bearbeitung Ihrer Anfragen - meist innerhalb weniger Stunden mit einer Antwort'
    },
    {
      icon: CheckCircle,
      title: 'Beste Preise',
      description: 'Exklusive Deals und Sonderkonditionen, die Sie nirgendwo anders finden werden'
    },
    {
      icon: Shield,
      title: 'Vertrauenswürdige Experten',
      description: 'Zertifizierte Berater mit langjähriger Erfahrung und transparenter Arbeitsweise'
    },
    {
      icon: CheckCircle,
      title: '24/7 Support',
      description: 'Rund um die Uhr erreichbare Kundenbetreuung für all Ihre Fragen und Anliegen'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#0E0F1A' }}>
      
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #0E0F1A 0%, #1A0E23 30%, rgba(255, 63, 135, 0.08) 70%, rgba(0, 208, 192, 0.12) 100%)'
          }}
        />
        
        {/* Floating background elements - Mobile optimized */}
        <div className="absolute top-20 left-4 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-[#FF3F87]/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-40 right-4 sm:right-16 w-20 sm:w-24 h-20 sm:h-24 bg-[#00D0C0]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-4 sm:left-20 w-32 sm:w-40 h-32 sm:h-40 bg-[#A020F0]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-8 sm:right-32 w-24 sm:w-28 h-24 sm:h-28 bg-[#00D0C0]/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        <div className={`content-max-width text-center relative z-10 transition-all duration-1000 px-4 sm:px-6 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-tight overflow-safe">
            <span className="gradient-text block">
              Digital. Persönlich.
            </span>
            <span className="gradient-text block">
              Ohne Quatsch.
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-12 sm:mb-16 max-w-4xl mx-auto leading-relaxed text-[#D8D8D8]/90 overflow-safe">
            Ehrliche Beratung für Internet, Mobilfunk, Strom, Gas & Kredite – ohne versteckte Kosten.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
            <Button 
              size="xl" 
              onClick={() => scrollToSection(premiumOffersRef)}
              className="w-full sm:w-auto min-w-[280px] button-safe"
            >
              Angebote entdecken
              <ArrowRight className="ml-3 h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            
            <Button 
              variant="secondary"
              size="xl" 
              onClick={() => onNavigate('oqd-berater-chat')}
              className="w-full sm:w-auto min-w-[280px] button-safe"
            >
              <Bot className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
              AI-Beratung starten
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-[#D8D8D8]/70">
            <div className="flex items-center gap-2 icon-text-align">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#00D0C0] flex-shrink-0" />
              <span className="text-sm md:text-base overflow-safe">100% transparent</span>
            </div>
            <div className="flex items-center gap-2 icon-text-align">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF3F87] flex-shrink-0" />
              <span className="text-sm md:text-base overflow-safe">5000+ zufriedene Kunden</span>
            </div>
            <div className="flex items-center gap-2 icon-text-align">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD166] flex-shrink-0" />
              <span className="text-sm md:text-base overflow-safe">Bestpreis-Garantie</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Premium Offers Section */}
      <section ref={premiumOffersRef} className="section-spacing overflow-hidden" style={{ backgroundColor: '#1A0E23' }}>
        <div className="content-max-width">
          
          <div className="text-center mb-12 md:mb-16 fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Premium-Angebote</span>
            </h2>
            <p className="text-lg md:text-xl text-[#D8D8D8]/80 max-w-3xl mx-auto overflow-safe">
              Exklusive Deals mit den besten Konditionen – nur bei uns verfügbar.
            </p>
          </div>

          {/* Desktop Grid (lg screens and up) */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6 lg:gap-8">
            {premiumOffers.map((offer, index) => {
              const IconComponent = offer.icon;
              
              return (
                <Card 
                  key={index} 
                  variant="glass"
                  glow="auto"
                  padding="none"
                  className="group cursor-pointer hover-scale fade-in-up h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => onNavigate(offer.category)}
                >
                  <CardContent className="p-responsive h-full flex flex-col">
                    {/* Header with badge and icon */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="bg-gradient-to-r from-[#FF3F87] to-[#A020F0] text-white text-xs font-bold px-3 py-1 rounded-full">
                          {offer.badge}
                        </div>
                        <IconContainer variant="pink" size="sm">
                          <IconComponent className="w-5 h-5" />
                        </IconContainer>
                      </div>
                      
                      <div className="text-[#D8D8D8]/70 text-sm mb-2">{offer.provider}</div>
                      <h3 className="text-white text-xl font-bold mb-4 group-hover:gradient-text transition-all duration-300 overflow-safe">
                        {offer.title}
                      </h3>
                    </div>

                    {/* Price section */}
                    <div className="mb-4">
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
                    <div className="mb-4 flex-1">
                      <div className="space-y-2">
                        {offer.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-[#00D0C0] shrink-0" />
                            <span className="text-[#D8D8D8]/80 text-sm overflow-safe">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto">
                      <div className="text-[#FF3F87] font-bold text-sm mb-4">{offer.savings}</div>
                      <Button size="sm" className="w-full group-hover:scale-105 button-safe">
                        Zum Angebot
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Mobile/Tablet Carousel (lg screens and below) */}
          <div className="lg:hidden relative overflow-hidden">
            {/* Navigation buttons */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => scrollCarousel('left')}
                className="p-3 rounded-full transition-all duration-300 hover:scale-110 glass-morphism glow-pink"
                style={{
                  border: '2px solid rgba(255, 63, 135, 0.3)',
                  color: '#FF3F87'
                }}
                aria-label="Previous offers"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="p-3 rounded-full transition-all duration-300 hover:scale-110 glass-morphism glow-pink"
                style={{
                  border: '2px solid rgba(255, 63, 135, 0.3)',
                  color: '#FF3F87'
                }}
                aria-label="Next offers"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable container */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4"
              style={{ 
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {premiumOffers.map((offer, index) => {
                const IconComponent = offer.icon;
                
                return (
                  <Card 
                    key={index} 
                    variant="glass"
                    glow="auto"
                    padding="none"
                    className="group cursor-pointer hover-scale fade-in-up flex-shrink-0 w-80 sm:w-72"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      scrollSnapAlign: 'start'
                    }}
                    onClick={() => onNavigate(offer.category)}
                  >
                    <CardContent className="p-responsive h-full flex flex-col">
                      {/* Same content as desktop but mobile optimized */}
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="bg-gradient-to-r from-[#FF3F87] to-[#A020F0] text-white text-xs font-bold px-3 py-1 rounded-full">
                            {offer.badge}
                          </div>
                          <IconContainer variant="pink" size="sm">
                            <IconComponent className="w-5 h-5" />
                          </IconContainer>
                        </div>
                        
                        <div className="text-[#D8D8D8]/70 text-sm mb-2">{offer.provider}</div>
                        <h3 className="text-white text-xl font-bold mb-4 group-hover:gradient-text transition-all duration-300 overflow-safe">
                          {offer.title}
                        </h3>
                      </div>

                      <div className="mb-4">
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

                      <div className="mb-4 flex-1">
                        <div className="space-y-2">
                          {offer.features.slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-[#00D0C0] shrink-0" />
                              <span className="text-[#D8D8D8]/80 text-sm overflow-safe">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto">
                        <div className="text-[#FF3F87] font-bold text-sm mb-4">{offer.savings}</div>
                        <Button size="sm" className="w-full group-hover:scale-105 button-safe">
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
        </div>
      </section>

      {/* 3. OQD-Berater Section */}
      <OQDBeraterSection onNavigate={onNavigate} />

      {/* 4. Weitere Angebote Section */}
      <WeitereAngeboteSection onNavigate={onNavigate} />

      {/* 5. Top-Berater Section */}
      <div ref={topBeraterRef}>
        <TopBeraterSection onNavigate={onNavigate} />
      </div>

      {/* 6. Warum Wir Section */}
      <section 
        ref={benefitsRef} 
        className="section-spacing relative overflow-hidden glass-morphism"
        style={{ 
          borderWidth: '1px 0'
        }}
      >
        <div className="content-max-width">
          
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text overflow-safe">
              Warum OhneQuatschDeals?
            </h2>
            
            <p className="text-lg md:text-xl text-[#D8D8D8] mx-auto max-w-3xl overflow-safe">
              Wir setzen auf Transparenz, ehrliche Beratung und faire Preise – ohne versteckte Kosten oder Tricks.
            </p>
          </div>
          
          {/* Info Cards Grid */}
          <div className="grid-responsive spacing-md">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              
              return (
                <div
                  key={index} 
                  className={`
                    glass-morphism p-responsive rounded-2xl
                    transition-all duration-300 cursor-pointer hover:scale-[1.02] hover-glow-turquoise
                    ${benefitsVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                    }
                  `}
                  style={{ 
                    transitionDelay: benefitsVisible ? `${index * 0.1}s` : '0s'
                  }}
                >
                  {/* Header with Icon and Title */}
                  <div className="flex items-start gap-3 md:gap-4 mb-3">
                    {/* Gradient Circle Icon */}
                    <div 
                      className="flex items-center justify-center rounded-full flex-shrink-0"
                      style={{ 
                        width: 'clamp(36px, 8vw, 56px)',
                        height: 'clamp(36px, 8vw, 56px)',
                        background: 'radial-gradient(circle, #00D0C0 0%, #FF3F87 100%)',
                        boxShadow: '0 0 15px rgba(0, 208, 192, 0.5), 0 0 25px rgba(255, 63, 135, 0.3)'
                      }}
                    >
                      <IconComponent 
                        className="text-white"
                        style={{ 
                          width: 'clamp(18px, 4vw, 28px)',
                          height: 'clamp(18px, 4vw, 28px)',
                          opacity: '0.9'
                        }}
                      />
                    </div>
                    
                    {/* Card Title */}
                    <h3 className="font-bold text-[#D8D8D8] flex-1 leading-tight text-base md:text-lg lg:text-xl mt-1 md:mt-2 overflow-safe">
                      {benefit.title}
                    </h3>
                  </div>
                  
                  {/* Card Description */}
                  <p className="text-[#D8D8D8]/70 leading-relaxed text-sm md:text-base ml-12 md:ml-16 lg:ml-20 overflow-safe">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="section-spacing overflow-hidden">
        <div className="content-max-width">
          <Card variant="elevated" glow="auto" padding="xl" className="text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
                <span className="gradient-text overflow-safe">Bereit für ehrliche Beratung?</span>
              </h2>
              
              <p className="text-lg md:text-xl text-[#D8D8D8]/80 mb-8 md:mb-10 leading-relaxed overflow-safe">
                Entdecke unsere Top-Angebote oder lass dich persönlich von unseren Experten beraten. 
                Kostenlos, unverbindlich und ohne versteckte Kosten.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                <Button size="lg" onClick={() => onNavigate('angebote')} className="w-full sm:w-auto button-safe">
                  <Star className="mr-2 h-5 w-5" />
                  Angebote entdecken
                </Button>
                
                <Button variant="secondary" size="lg" onClick={() => onNavigate('berater')} className="w-full sm:w-auto button-safe">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Persönlich beraten lassen
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};