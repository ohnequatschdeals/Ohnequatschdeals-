import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Wifi, 
  Smartphone, 
  Zap, 
  CreditCard, 
  Star,
  Clock,
  Euro,
  CheckCircle,
  ArrowLeft,
  ExternalLink,
  MessageCircle,
  Phone,
  Grid3X3,
  Target,
  Shield
} from 'lucide-react';

interface AngebotePageProps {
  category: 'all' | 'internet-tv' | 'mobilfunk' | 'strom-gas' | 'kredite';
  onNavigate: (page: string) => void;
}

export const AngebotePage: React.FC<AngebotePageProps> = ({ category, onNavigate }) => {
  const categoryConfig = {
    'all': {
      title: 'Alle Angebote',
      icon: Grid3X3,
      description: 'Übersicht aller verfügbaren Kategorien und Top-Angebote',
      color: 'from-[#FF3F87] to-[#00D0C0]'
    },
    'internet-tv': {
      title: 'Internet & TV Angebote',
      icon: Wifi,
      description: 'Schnelles Internet und digitales TV von führenden Anbietern',
      color: 'from-[#00D0C0] to-[#008B8B]'
    },
    'mobilfunk': {
      title: 'Mobilfunk Tarife',
      icon: Smartphone,
      description: 'Günstige Handytarife und flexible Verträge',
      color: 'from-[#FF3F87] to-[#A020F0]'
    },
    'strom-gas': {
      title: 'Strom & Gas',
      icon: Zap,
      description: 'Faire Energietarife und einfacher Anbieterwechsel',
      color: 'from-[#FFD166] to-[#FF3F87]'
    },
    'kredite': {
      title: 'Kredite',
      icon: CreditCard,
      description: 'Günstige Kredite über unseren Partner Smava',
      color: 'from-[#00D0C0] to-[#FF3F87]'
    }
  };

  const getAllCategories = () => {
    return [
      {
        category: 'internet-tv',
        title: 'Internet & TV',
        icon: Wifi,
        description: 'Highspeed Internet und digitales Fernsehen',
        offers: '15+ Angebote',
        gradient: 'from-[#00D0C0] to-[#008B8B]',
        price: 'ab 19,99€'
      },
      {
        category: 'mobilfunk',
        title: 'Mobilfunk',
        icon: Smartphone,
        description: 'Handytarife und Smartphone-Verträge',
        offers: '20+ Angebote',
        gradient: 'from-[#FF3F87] to-[#A020F0]',
        price: 'ab 9,99€'
      },
      {
        category: 'strom-gas',
        title: 'Strom & Gas',
        icon: Zap,
        description: 'Energietarife vergleichen und wechseln',
        offers: '1000+ Anbieter',
        gradient: 'from-[#FFD166] to-[#FF3F87]',
        price: 'bis 800€ sparen'
      },
      {
        category: 'kredite',
        title: 'Kredite',
        icon: CreditCard,
        description: 'Ratenkredite und Finanzierungen',
        offers: '50+ Angebote',
        gradient: 'from-[#00D0C0] to-[#FF3F87]',
        price: 'ab 2,29% eff.'
      }
    ];
  };

  const getDeals = () => {
    switch (category) {
      case 'internet-tv':
        return [
          {
            provider: 'Vodafone',
            title: 'GigaZuhause Cable 1000',
            speed: '1000 Mbit/s',
            tv: '180+ HD Sender',
            price: '39,99',
            originalPrice: '59,99',
            benefits: ['6 Monate zum halben Preis', 'Router inklusive', 'Kostenlose Installation', '24 Monate Mindestlaufzeit'],
            badge: 'TOP-ANGEBOT',
            rating: 4.5
          },
          {
            provider: '1&1',
            title: 'DSL 100 + TV',
            speed: '100 Mbit/s',
            tv: 'HD TV Paket',
            price: '34,99',
            originalPrice: '44,99',
            benefits: ['3 Monate gratis', 'WLAN Router inklusive', 'HD-Recorder', '24 Monate Laufzeit'],
            badge: 'PREIS-TIPP',
            rating: 4.3
          },
          {
            provider: 'Telekom',
            title: 'MagentaZuhause L',
            speed: '250 Mbit/s',
            tv: 'MagentaTV Plus',
            price: '49,99',
            originalPrice: '69,99',
            benefits: ['12 Monate halber Preis', 'Premium Router', 'Netflix inklusive', 'Flexible Laufzeit'],
            badge: 'PREMIUM',
            rating: 4.6
          }
        ];
      
      case 'mobilfunk':
        return [
          {
            provider: 'Vodafone',
            title: 'Red Unlimited Smart',
            data: 'Unlimited',
            extras: 'EU-Roaming inklusive',
            price: '34,99',
            originalPrice: '49,99',
            benefits: ['Unlimited Datenvolumen', 'EU-Roaming inklusive', '5G verfügbar', 'Hotspot-Flat'],
            badge: 'TOP-ANGEBOT',
            rating: 4.6
          },
          {
            provider: 'o2',
            title: 'o2 Free Unlimited Max',
            data: 'Unlimited',
            extras: '5G & EU-Roaming',
            price: '39,99',
            originalPrice: '59,99',
            benefits: ['Echte Datenflatrate', '5G Max Speed', 'EU-Roaming', 'Connect Option'],
            badge: 'BELIEBT',
            rating: 4.4
          },
          {
            provider: 'Telekom',
            title: 'MagentaMobil L',
            data: '25 GB',
            extras: 'StreamOn inklusive',
            price: '44,99',
            originalPrice: '59,99',
            benefits: ['25 GB Highspeed', 'StreamOn Music & Video', '5G inklusive', 'EU-Roaming'],
            badge: 'PREMIUM',
            rating: 4.5
          }
        ];
      
      case 'strom-gas':
        return [
          {
            provider: 'CHECK24',
            title: 'Strom Tarifvergleich',
            type: 'Stromtarife',
            savings: 'Bis zu 800€',
            price: 'Kostenlos',
            originalPrice: null,
            benefits: ['Über 1000 Anbieter', 'Bis zu 800€ sparen', 'Wechselservice inklusive', 'TÜV geprüft'],
            badge: 'EMPFOHLEN',
            rating: 4.7,
            external: true
          },
          {
            provider: 'Verivox',
            title: 'Gas Tarifvergleich',
            type: 'Gastarife',
            savings: 'Bis zu 1200€',
            price: 'Kostenlos',
            originalPrice: null,
            benefits: ['Alle Gasanbieter', 'Bis zu 1200€ sparen', 'Kostenloser Wechsel', 'Preisgarantie'],
            badge: 'EMPFOHLEN',
            rating: 4.6,
            external: true
          },
          {
            provider: 'Ökostrom',
            title: 'Grüne Energie Pakete',
            type: '100% Ökostrom',
            savings: 'Bis zu 500€',
            price: 'ab 28,99',
            originalPrice: '35,99',
            benefits: ['100% erneuerbare Energie', 'CO2-neutral', 'Faire Preise', '12 Monate Preisgarantie'],
            badge: 'ÖKO',
            rating: 4.5
          }
        ];
      
      case 'kredite':
        return [
          {
            provider: 'Smava',
            title: 'Ratenkredit',
            amount: '1.000 - 120.000€',
            rate: 'ab 2,29% eff. Jahreszins',
            price: '0',
            originalPrice: null,
            benefits: ['Sofortzusage in 3 Min', 'Kostenlose Sondertilgung', 'Flexible Laufzeiten', 'TÜV zertifiziert'],
            badge: 'PARTNER',
            rating: 4.5,
            external: true
          },
          {
            provider: 'Check24',
            title: 'Autokredit',
            amount: '3.000 - 100.000€',
            rate: 'ab 1,99% eff. Jahreszins',
            price: '0',
            originalPrice: null,
            benefits: ['Günstige Autofinanzierung', 'Schnelle Auszahlung', 'Flexible Raten', 'Ohne Schufa möglich'],
            badge: 'GÜNSTIG',
            rating: 4.4,
            external: true
          },
          {
            provider: 'ING',
            title: 'Rahmenkredit',
            amount: '2.500 - 25.000€',
            rate: 'ab 5,99% eff. Jahreszins',
            price: '0',
            originalPrice: null,
            benefits: ['Flexibel verfügbar', 'Nur Zinsen auf genutzte Summe', 'Kostenlose Kontoführung', 'Sofort verfügbar'],
            badge: 'FLEXIBEL',
            rating: 4.3
          }
        ];
      
      default:
        return [];
    }
  };

  const config = categoryConfig[category];
  const IconComponent = config.icon;
  const deals = category === 'all' ? [] : getDeals();
  const categories = category === 'all' ? getAllCategories() : [];

  const handleContactAdvisor = () => {
    // Open WhatsApp
    window.open('https://wa.me/491737189542?text=Hallo, ich interessiere mich für Angebote im Bereich ' + config.title, '_blank');
  };

  const handleExternalLink = (provider: string) => {
    // Open external comparison tool based on provider
    if (provider === 'CHECK24') {
      window.open('https://www.check24.de', '_blank');
    } else if (provider === 'Verivox') {
      window.open('https://www.verivox.de', '_blank');
    } else if (provider === 'Smava') {
      window.open('https://www.smava.de', '_blank');
    } else {
      alert('Weiterleitung zum Vergleichsportal...');
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < Math.floor(rating) ? 'text-[#FFD166] fill-[#FFD166]' : 'text-[#D8D8D8]/30'}`} 
      />
    ));
  };

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'TOP-ANGEBOT':
        return 'bg-gradient-to-r from-[#FF3F87] to-[#A020F0] text-white';
      case 'PREIS-TIPP':
        return 'bg-gradient-to-r from-[#00D0C0] to-[#008B8B] text-white';
      case 'EMPFOHLEN':
        return 'bg-gradient-to-r from-[#FFD166] to-[#FF3F87] text-white';
      case 'PREMIUM':
        return 'bg-gradient-to-r from-[#A020F0] to-[#FF3F87] text-white';
      case 'PARTNER':
        return 'bg-gradient-to-r from-[#00D0C0] to-[#FF3F87] text-white';
      default:
        return 'bg-[#1A0E23] text-[#D8D8D8] border border-[#FF3F87]/30';
    }
  };

  return (
    <div 
      className="min-h-screen text-white"
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

      <div className="content-max-width pt-32 pb-16">
        {/* Header */}
        <div className="mb-16">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate('home')}
            className="mb-8 text-[#D8D8D8] hover:text-[#FF3F87] hover:bg-[#FF3F87]/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Startseite
          </Button>
          
          <div className="flex items-center mb-8">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white mr-6 glow-pink"
              style={{
                background: `linear-gradient(135deg, ${config.color.replace('from-', '').replace('to-', ', ')})`,
                boxShadow: '0 0 30px rgba(255, 63, 135, 0.4)'
              }}
            >
              <IconComponent className="h-10 w-10" />
            </div>
            <div>
              <h1 className="gradient-text mb-4">{config.title}</h1>
              <p className="text-[#D8D8D8]/80 text-xl">{config.description}</p>
            </div>
          </div>

          {category === 'strom-gas' && (
            <div 
              className="glass-morphism p-6 rounded-xl mb-8"
              style={{ border: '1px solid rgba(0, 208, 192, 0.3)' }}
            >
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-[#00D0C0] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-[#00D0C0] font-medium mb-2">
                    Seriöse Vergleichsportale
                  </p>
                  <p className="text-[#D8D8D8]/80 text-sm">
                    Für Strom & Gas Tarife arbeiten wir mit etablierten Vergleichsportalen zusammen. 
                    Dort können Sie direkt vergleichen und sicher wechseln. Bei Fragen steht Ihnen unser Berater zur Verfügung.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Overview for "all" */}
        {category === 'all' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {categories.map((cat, index) => {
              const CatIcon = cat.icon;
              return (
                <div
                  key={index}
                  className="group cursor-pointer"
                  onClick={() => onNavigate(cat.category)}
                >
                  <div 
                    className="glass-morphism p-6 rounded-xl text-center hover:scale-105 transition-all duration-300 border"
                    style={{ 
                      borderColor: 'rgba(255, 63, 135, 0.2)',
                      backgroundImage: `linear-gradient(135deg, ${cat.gradient.replace('from-', '').replace('to-', ', ')} / 0.1)`
                    }}
                  >
                    <div 
                      className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${cat.gradient.replace('from-', '').replace('to-', ', ')})`,
                        boxShadow: '0 0 20px rgba(255, 63, 135, 0.3)'
                      }}
                    >
                      <CatIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-[#D8D8D8] font-semibold text-lg mb-2">{cat.title}</h3>
                    <p className="text-[#D8D8D8]/60 text-sm mb-3">{cat.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#00D0C0]">{cat.offers}</span>
                      <span className="text-[#FFD166]">{cat.price}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Deals Grid */}
        {category !== 'all' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {deals.map((deal, index) => (
              <div
                key={index}
                className="glass-morphism rounded-xl overflow-hidden hover:scale-[1.02] transition-all duration-300 card-shadow"
                style={{ border: '1px solid rgba(255, 63, 135, 0.2)' }}
              >
                {/* Header */}
                <div 
                  className="p-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.8) 0%, rgba(14, 15, 26, 0.9) 100%)',
                    borderBottom: '1px solid rgba(255, 63, 135, 0.2)'
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-lg font-semibold text-[#D8D8D8]">{deal.provider}</div>
                    {deal.badge && (
                      <span 
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeStyle(deal.badge)}`}
                      >
                        {deal.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-[#D8D8D8] font-semibold text-xl mb-3">{deal.title}</h3>
                  <div className="flex items-center space-x-1">
                    {renderStars(deal.rating)}
                    <span className="text-sm text-[#D8D8D8]/60 ml-2">({deal.rating})</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  {/* Deal Details */}
                  <div className="space-y-3 mb-6">
                    {category === 'internet-tv' && (
                      <>
                        <div className="flex items-center text-sm">
                          <Wifi className="h-4 w-4 mr-3 text-[#00D0C0]" />
                          <span className="text-[#D8D8D8]/80">{deal.speed}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 mr-3 text-[#00D0C0]" />
                          <span className="text-[#D8D8D8]/80">{deal.tv}</span>
                        </div>
                      </>
                    )}
                    
                    {category === 'mobilfunk' && (
                      <>
                        <div className="flex items-center text-sm">
                          <Smartphone className="h-4 w-4 mr-3 text-[#FF3F87]" />
                          <span className="text-[#D8D8D8]/80">{deal.data}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 mr-3 text-[#00D0C0]" />
                          <span className="text-[#D8D8D8]/80">{deal.extras}</span>
                        </div>
                      </>
                    )}
                    
                    {category === 'strom-gas' && (
                      <>
                        <div className="flex items-center text-sm">
                          <Zap className="h-4 w-4 mr-3 text-[#FFD166]" />
                          <span className="text-[#D8D8D8]/80">{deal.type}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Euro className="h-4 w-4 mr-3 text-[#00D0C0]" />
                          <span className="text-[#D8D8D8]/80">Ersparnis: {deal.savings}</span>
                        </div>
                      </>
                    )}
                    
                    {category === 'kredite' && (
                      <>
                        <div className="flex items-center text-sm">
                          <CreditCard className="h-4 w-4 mr-3 text-[#00D0C0]" />
                          <span className="text-[#D8D8D8]/80">{deal.amount}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 mr-3 text-[#FFD166]" />
                          <span className="text-[#D8D8D8]/80">{deal.rate}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-[#D8D8D8]">{deal.price}</span>
                      <span className="text-sm text-[#D8D8D8]/60">
                        {category === 'strom-gas' || category === 'kredite' ? '€ Gebühren' : '€/Monat'}
                      </span>
                      {deal.originalPrice && (
                        <span className="text-sm text-[#D8D8D8]/40 line-through">
                          {deal.originalPrice}€
                        </span>
                      )}
                    </div>
                    {deal.originalPrice && (
                      <p className="text-sm text-[#00D0C0] mt-1">
                        Sparen Sie {(parseFloat(deal.originalPrice) - parseFloat(deal.price)).toFixed(2)}€/Monat
                      </p>
                    )}
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2 mb-6">
                    {deal.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-[#00D0C0] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-[#D8D8D8]/80">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    {deal.external ? (
                      <button 
                        className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #FF3F87 0%, #00D0C0 100%)',
                          boxShadow: '0 0 20px rgba(255, 63, 135, 0.4)'
                        }}
                        onClick={() => handleExternalLink(deal.provider)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Jetzt vergleichen
                      </button>
                    ) : (
                      <button 
                        className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, #FF3F87 0%, #00D0C0 100%)',
                          boxShadow: '0 0 20px rgba(255, 63, 135, 0.4)'
                        }}
                        onClick={handleContactAdvisor}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Jetzt anfragen
                      </button>
                    )}
                    <button 
                      className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center glass-morphism"
                      style={{ border: '1px solid rgba(0, 208, 192, 0.4)', color: '#00D0C0' }}
                      onClick={handleContactAdvisor}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Beratung anfordern
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Additional Info */}
        <div 
          className="glass-morphism p-8 rounded-xl text-center"
          style={{ border: '1px solid rgba(255, 63, 135, 0.2)' }}
        >
          <Target className="w-12 h-12 text-[#FF3F87] mx-auto mb-6" />
          <h2 className="text-[#D8D8D8] text-2xl md:text-3xl font-semibold mb-6">
            Persönliche Beratung gewünscht?
          </h2>
          <p className="text-[#D8D8D8]/80 text-lg mb-8 max-w-2xl mx-auto">
            Unsere Experten helfen Ihnen gerne bei der Auswahl des passenden Angebots. 
            Kontaktieren Sie uns über WhatsApp oder unseren AI-Berater.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)',
                boxShadow: '0 0 25px rgba(255, 63, 135, 0.4)'
              }}
              onClick={() => onNavigate('berater')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Beratung
            </button>
            <button 
              className="px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center glass-morphism"
              style={{ border: '1px solid rgba(0, 208, 192, 0.4)', color: '#00D0C0' }}
              onClick={() => onNavigate('ai-consultant-chat')}
            >
              <Phone className="mr-2 h-5 w-5" />
              KI-Berater starten
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};