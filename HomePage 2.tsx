import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
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
  Settings,
  Bot,
  Clock,
  Star,
  MapPin,
  MessageCircle,
  QrCode,
  Send,
  User
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import consultantAvatar from 'figma:asset/13360f059c4886011e49eaee81fbcadbf3cd0a21.png';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  // Premium offers data für Top-Angebotsblock
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
      category: 'internet-tv'
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
      category: 'internet-tv'
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
      category: 'kredite'
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
      category: 'strom-gas'
    }
  ];

  // Weitere Angebote (kleiner)
  const moreOffers = [
    {
      provider: 'Telekom',
      title: 'Magenta Mobil M',
      price: '39,95€',
      originalPrice: '49,95€',
      features: ['25 GB LTE', 'EU-Roaming', 'Streaming Pass'],
      category: 'mobilfunk'
    },
    {
      provider: 'o2',
      title: 'o2 Free Unlimited Max',
      price: '59,99€',
      originalPrice: '79,99€',
      features: ['Unlimited LTE', '5G inklusive', 'EU-Roaming'],
      category: 'mobilfunk'
    },
    {
      provider: 'Check24',
      title: 'Kfz-Versicherung',
      price: 'ab 89€',
      originalPrice: 'ab 149€',
      features: ['Vollkasko', 'SF-Schutz', 'Werkstattbindung'],
      category: 'versicherung'
    },
    {
      provider: 'ING',
      title: 'Baufinanzierung',
      price: '3,2%',
      originalPrice: '4,1%',
      features: ['Bis 500.000€', 'Sondertilgung', 'Zinsbindung 15 Jahre'],
      category: 'kredite'
    }
  ];

  // Top consultants data für Berater-Profile
  const topConsultants = [
    {
      id: 'marina-weber',
      name: 'Marina Weber',
      location: 'München',
      rating: 5,
      slogan: 'Ehrliche Beratung ohne versteckte Kosten',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a86c65?w=128&h=128&fit=crop&crop=face',
      whatsappNumber: '+491234567890',
      monthlyDeals: 47
    },
    {
      id: 'thomas-mueller',
      name: 'Thomas Müller',
      location: 'Hamburg',
      rating: 5,
      slogan: 'Finde die besten Deals für dich',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop&crop=face',
      whatsappNumber: '+491234567891',
      monthlyDeals: 52
    },
    {
      id: 'sarah-schmidt',
      name: 'Sarah Schmidt',
      location: 'Berlin',
      rating: 4,
      slogan: 'Transparenz und faire Preise garantiert',
      avatar: consultantAvatar,
      whatsappNumber: '+491234567892',
      monthlyDeals: 38
    }
  ];

  // Benefits data für Warum-wir-Bereich
  const benefits = [
    {
      icon: Shield,
      title: 'Echte Beratung',
      description: 'Persönliche und digitale Beratung ohne versteckte Kosten oder Tricks'
    },
    {
      icon: CheckCircle,
      title: 'Vertragsklarheit',
      description: 'Transparente Konditionen und faire Preise - immer ohne Kleingedrucktes'
    },
    {
      icon: Users,
      title: 'Schutz vor Abzocke',
      description: 'Seriöse Beratung und Schutz vor unseriösen Außendienstlern'
    },
    {
      icon: Award,
      title: 'Bestpreisgarantie',
      description: 'Wir finden garantiert die besten Angebote für Ihre Bedürfnisse'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-600'
        }`}
      />
    ));
  };

  const handleQRCodeClick = (consultant: any) => {
    // QR Code Modal logic here
    console.log('QR Code for:', consultant.name);
  };

  return (
    <div className="min-h-screen">
      {/* 1. Hero-Bereich (unverändert) */}
      <section 
        className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #121212 0%, rgba(18, 18, 18, 0.95) 30%, rgba(0, 240, 255, 0.08) 70%, rgba(157, 0, 255, 0.12) 100%)'
        }}
      >
        {/* Glow-Effekt vom Header-Logo */}
        <div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-64 bg-gradient-to-b from-[#00F0FF]/15 via-[#FF00A6]/8 to-transparent rounded-full blur-3xl"
        />
        
        {/* Zusätzliche Neon-Akzente */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#00F0FF]/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-[#FF00A6]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-[#9D00FF]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-32 w-28 h-28 bg-[#00F0FF]/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Große Headline - 20% größer */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-8 leading-tight"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textShadow: '0 0 80px rgba(0, 240, 255, 0.8), 0 0 160px rgba(255, 0, 166, 0.6), 0 0 240px rgba(157, 0, 255, 0.4)'
            }}
          >
            <span className="bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] bg-clip-text text-transparent">
              Digital. Persönlich. Ohne Quatsch.
            </span>
          </h1>
          
          {/* Subtext in Weiß mit 80% Opazität */}
          <div 
            className="text-xl md:text-2xl lg:text-3xl mb-16 max-w-4xl mx-auto leading-relaxed font-medium"
            style={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textShadow: '0 0 40px rgba(255, 255, 255, 0.3)'
            }}
          >
            Ehrliche Beratung für Internet, Mobilfunk, Strom, Gas & Kredite – ohne versteckte Kosten.
          </div>
          
          {/* Zwei Buttons untereinander */}
          <div className="flex flex-col items-center space-y-6">
            
            {/* Angebote entdecken - Pink-Violett-Glow */}
            <Button 
              size="lg" 
              className="group relative h-16 px-12 text-xl font-bold border-0 rounded-2xl bg-gradient-to-r from-[#FF00A6] via-[#9D00FF] to-[#FF00A6] hover:from-[#FF00A6]/90 hover:via-[#9D00FF]/90 hover:to-[#FF00A6]/90 text-white transition-all duration-500 transform hover:scale-110"
              onClick={() => onNavigate('angebote')}
              style={{
                boxShadow: '0 0 50px rgba(255, 0, 166, 0.7), 0 0 100px rgba(157, 0, 255, 0.5), 0 0 150px rgba(255, 0, 166, 0.3)',
                minWidth: '320px'
              }}
            >
              Angebote entdecken
              <ArrowRight className="ml-4 h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
              
              {/* Multi-Layer Glow-Effekte */}
              <div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF00A6]/40 via-[#9D00FF]/40 to-[#FF00A6]/40 blur-2xl transition-all duration-500 group-hover:blur-3xl -z-10"
              />
              <div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF00A6]/20 via-[#9D00FF]/20 to-[#FF00A6]/20 blur-3xl transition-all duration-500 group-hover:blur-[4rem] -z-20"
              />
            </Button>
            
            {/* Berater finden - Türkis-Glow, Outline */}
            <Button 
              variant="outline"
              size="lg" 
              className="group relative h-16 px-12 text-xl font-bold rounded-2xl border-2 text-[#00F0FF] bg-transparent hover:bg-[#00F0FF]/10 transition-all duration-500 hover:scale-110"
              onClick={() => onNavigate('berater')}
              style={{
                borderColor: '#00F0FF',
                boxShadow: '0 0 40px rgba(0, 240, 255, 0.6), 0 0 80px rgba(0, 240, 255, 0.4), 0 0 120px rgba(0, 240, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                minWidth: '320px',
                textShadow: '0 0 30px rgba(0, 240, 255, 0.8)'
              }}
            >
              Berater finden
              
              {/* Türkis Glow-Effekte */}
              <div 
                className="absolute inset-0 rounded-2xl bg-[#00F0FF]/20 blur-xl transition-all duration-500 group-hover:bg-[#00F0FF]/30 group-hover:blur-2xl -z-10"
              />
              <div 
                className="absolute inset-0 rounded-2xl bg-[#00F0FF]/10 blur-2xl transition-all duration-500 group-hover:bg-[#00F0FF]/20 group-hover:blur-3xl -z-20"
              />
            </Button>
            
            {/* Admin Button - klein und diskret */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors duration-300 mt-8"
              onClick={() => onNavigate('admin')}
            >
              <Settings className="h-3 w-3 mr-1" />
              Admin
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Top-Angebotsblock */}
      <section 
        className="py-20 px-4"
        style={{ backgroundColor: '#0F0F11' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-black text-white mb-6"
              style={{
                textShadow: '0 0 40px rgba(255, 255, 255, 0.3)'
              }}
            >
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] bg-clip-text text-transparent">
                Premium-Angebote
              </span>
            </h2>
            <div 
              className="text-xl text-gray-300 max-w-3xl mx-auto font-medium"
              style={{
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              Exklusive Deals mit den besten Konditionen – nur bei uns verfügbar.
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumOffers.map((offer, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer transition-all duration-500 transform hover:scale-105 border-0 rounded-3xl overflow-hidden"
                onClick={() => onNavigate(offer.category)}
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(157, 0, 255, 0.08) 50%, rgba(255, 0, 166, 0.08) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 40px rgba(0, 240, 255, 0.2), 0 0 80px rgba(157, 0, 255, 0.1)'
                }}
              >
                <CardContent className="p-8">
                  {/* Badge */}
                  <div className="mb-6">
                    <Badge 
                      className="bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] text-white border-0 font-bold px-3 py-1"
                      style={{
                        boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)'
                      }}
                    >
                      {offer.badge}
                    </Badge>
                  </div>
                  
                  {/* Provider */}
                  <div className="mb-4">
                    <span className="text-gray-300 font-medium">{offer.provider}</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-white text-xl font-bold mb-6">{offer.title}</h3>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-3">
                      <span 
                        className="text-3xl font-black bg-gradient-to-r from-[#00F0FF] to-[#FF00A6] bg-clip-text text-transparent"
                      >
                        {offer.price}
                      </span>
                      <span className="text-gray-400 line-through">{offer.originalPrice}</span>
                    </div>
                    <span className="text-gray-300 font-medium">{offer.period}</span>
                  </div>
                  
                  {/* Features */}
                  <div className="mb-8 space-y-3">
                    {offer.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-[#00F0FF] shrink-0" />
                        <span className="text-gray-300 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Savings */}
                  <div className="mb-6">
                    <span 
                      className="text-[#FF00A6] font-bold"
                      style={{
                        textShadow: '0 0 20px rgba(255, 0, 166, 0.6)'
                      }}
                    >
                      {offer.savings}
                    </span>
                  </div>
                  
                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-[#00F0FF] via-[#9D00FF] to-[#FF00A6] hover:from-[#00F0FF]/90 hover:via-[#9D00FF]/90 hover:to-[#FF00A6]/90 text-white font-bold border-0 rounded-2xl h-12 transition-all duration-300 transform group-hover:scale-105"
                    style={{
                      boxShadow: '0 0 30px rgba(0, 240, 255, 0.4), 0 0 60px rgba(157, 0, 255, 0.3)'
                    }}
                  >
                    Zum Angebot
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 3. KI-Berater-Bereich - Avatar größer + Chat neben Avatar */}
      <section 
        className="py-16 px-4"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, rgba(157, 0, 255, 0.05) 50%, rgba(255, 0, 166, 0.05) 100%)'
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge 
              className="bg-gradient-to-r from-[#00F0FF]/20 to-[#9D00FF]/20 text-[#00F0FF] border-[#00F0FF]/30 backdrop-blur-sm font-bold text-base px-4 py-2 mb-4"
              style={{
                boxShadow: '0 0 25px rgba(0, 240, 255, 0.4)'
              }}
            >
              <Bot className="w-5 h-5 mr-2" />
              KI-Berater
            </Badge>
            <h2 
              className="text-3xl md:text-4xl font-black text-white mb-4"
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
              }}
            >
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] bg-clip-text text-transparent">
                Deine persönliche KI-Beraterin
              </span>
            </h2>
            <div 
              className="text-lg text-gray-300 max-w-2xl mx-auto"
              style={{
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              Maßgeschneiderte Angebote für deine Bedürfnisse – kostenlos und unverbindlich.
            </div>
          </div>

          {/* Avatar + Chat nebeneinander Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            
            {/* Avatar-Bereich links - GRÖßER */}
            <div className="relative flex flex-col items-center">
              {/* Speech Bubble über dem Avatar */}
              <div 
                className="relative mb-8 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 max-w-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(255, 0, 166, 0.15) 100%)',
                  borderLeft: '3px solid rgba(0, 240, 255, 0.5)',
                  boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="text-white font-medium text-center text-lg">
                  "Hallo! Ich bin deine KI-Beraterin. Lass uns den perfekten Tarif für dich finden!"
                </div>
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/10 backdrop-blur-sm rotate-45 translate-y-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(255, 0, 166, 0.15) 100%)'
                  }}
                ></div>
              </div>

              {/* Avatar frei stehend - VIEl GRÖßER */}
              <div className="relative">
                <ImageWithFallback
                  src={consultantAvatar}
                  alt="KI-Beraterin"
                  className="h-[500px] w-auto object-contain transition-all duration-300 hover:scale-105"
                  style={{
                    filter: 'drop-shadow(0 0 40px rgba(0, 240, 255, 0.4)) drop-shadow(0 0 80px rgba(255, 0, 166, 0.3))'
                  }}
                />
                
                {/* Mehr Neon-Partikel für größeren Avatar */}
                <div className="absolute top-12 right-8 w-3 h-3 bg-[#00F0FF] rounded-full animate-pulse opacity-80"
                  style={{ boxShadow: '0 0 15px rgba(0, 240, 255, 0.8)' }}></div>
                <div className="absolute top-24 right-16 w-2 h-2 bg-[#FF00A6] rounded-full animate-pulse opacity-70"
                  style={{ boxShadow: '0 0 10px rgba(255, 0, 166, 0.8)', animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-24 left-8 w-2.5 h-2.5 bg-[#9D00FF] rounded-full animate-pulse opacity-75"
                  style={{ boxShadow: '0 0 12px rgba(157, 0, 255, 0.8)', animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-12 w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-pulse opacity-90"
                  style={{ boxShadow: '0 0 8px rgba(0, 240, 255, 0.8)', animationDelay: '1.5s' }}></div>
                <div className="absolute bottom-1/3 right-24 w-2 h-2 bg-[#FF00A6] rounded-full animate-pulse opacity-85"
                  style={{ boxShadow: '0 0 10px rgba(255, 0, 166, 0.8)', animationDelay: '2s' }}></div>
              </div>
            </div>

            {/* Chat-Bereich rechts - FESTER Chat */}
            <div 
              className="rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(157, 0, 255, 0.08) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 40px rgba(0, 240, 255, 0.2), 0 0 80px rgba(157, 0, 255, 0.1)',
                minHeight: '500px'
              }}
            >
              {/* Chat Header */}
              <div 
                className="px-6 py-4 border-b border-white/10"
                style={{
                  background: 'linear-gradient(90deg, rgba(0, 240, 255, 0.15) 0%, rgba(157, 0, 255, 0.15) 100%)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] flex items-center justify-center"
                    style={{
                      boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)'
                    }}
                  >
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">KI-Beraterin</h3>
                    <div className="text-green-400 text-sm flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Online
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages - Mehr Platz */}
              <div className="p-6 space-y-4" style={{ height: '350px', overflowY: 'auto' }}>
                
                {/* KI Message */}
                <div className="flex items-start gap-3">
                  <div 
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] flex items-center justify-center shrink-0"
                    style={{
                      boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)'
                    }}
                  >
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div 
                    className="max-w-xs bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3"
                    style={{
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="text-white font-medium">
                      Hallo! Welchen Service suchst du? Internet, Mobilfunk oder Energie?
                    </div>
                  </div>
                </div>

                {/* User Message */}
                <div className="flex items-start gap-3 flex-row-reverse">
                  <div 
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FF00A6] to-[#9D00FF] flex items-center justify-center shrink-0"
                    style={{
                      boxShadow: '0 0 15px rgba(255, 0, 166, 0.5)'
                    }}
                  >
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div 
                    className="max-w-xs bg-gradient-to-r from-[#FF00A6]/20 to-[#9D00FF]/20 backdrop-blur-sm rounded-2xl rounded-tr-sm px-4 py-3"
                    style={{
                      boxShadow: '0 0 15px rgba(255, 0, 166, 0.2)'
                    }}
                  >
                    <div className="text-white font-medium">
                      Ich brauche einen günstigen Internet-Tarif.
                    </div>
                  </div>
                </div>

                {/* KI Response */}
                <div className="flex items-start gap-3">
                  <div 
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] flex items-center justify-center shrink-0"
                    style={{
                      boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)'
                    }}
                  >
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div 
                    className="max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3"
                    style={{
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="text-white font-medium">
                      Perfekt! Ich habe mehrere günstige Tarife für dich. Welche Geschwindigkeit brauchst du?
                    </div>
                  </div>
                </div>

                {/* KI Follow-up */}
                <div className="flex items-start gap-3">
                  <div 
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] flex items-center justify-center shrink-0"
                    style={{
                      boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)'
                    }}
                  >
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div 
                    className="max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3"
                    style={{
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="text-white font-medium">
                      Und wie viele Personen nutzen das Internet bei dir zuhause?
                    </div>
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex items-start gap-3">
                  <div 
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] flex items-center justify-center shrink-0"
                    style={{
                      boxShadow: '0 0 15px rgba(0, 240, 255, 0.5)'
                    }}
                  >
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div 
                    className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3"
                    style={{
                      boxShadow: '0 0 15px rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
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
                  />
                  <Button
                    className="bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] hover:from-[#00F0FF]/90 hover:to-[#9D00FF]/90 text-white border-0 rounded-2xl px-6 transition-all duration-300"
                    style={{
                      boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
                    }}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => setShowAIChat(true)}
              className="group relative h-16 px-12 text-xl font-bold border-0 rounded-2xl bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] hover:from-[#00F0FF]/90 hover:via-[#FF00A6]/90 hover:to-[#9D00FF]/90 text-white transition-all duration-500 transform hover:scale-110"
              style={{
                boxShadow: '0 0 50px rgba(0, 240, 255, 0.5), 0 0 100px rgba(157, 0, 255, 0.4)'
              }}
            >
              <Bot className="mr-4 h-6 w-6" />
              Live-Chat starten
              <div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00F0FF]/30 to-[#FF00A6]/30 blur-2xl transition-all duration-500 group-hover:blur-3xl -z-10"
              />
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Weitere Angebote (kleiner) */}
      <section 
        className="py-20 px-4"
        style={{ backgroundColor: '#0F0F11' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-black text-white mb-4"
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
              }}
            >
              Weitere Angebote
            </h2>
            <div 
              className="text-lg text-gray-300 max-w-2xl mx-auto font-medium"
              style={{
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              Entdecke noch mehr großartige Deals in verschiedenen Kategorien.
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {moreOffers.map((offer, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer transition-all duration-300 transform hover:scale-105 border-0 rounded-2xl overflow-hidden"
                onClick={() => onNavigate(offer.category)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 30px rgba(0, 240, 255, 0.1)'
                }}
              >
                <CardContent className="p-6">
                  <div className="mb-3">
                    <span className="text-gray-400 text-sm font-medium">{offer.provider}</span>
                  </div>
                  
                  <h3 className="text-white text-lg font-bold mb-4">{offer.title}</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span 
                        className="text-xl font-black bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] bg-clip-text text-transparent"
                      >
                        {offer.price}
                      </span>
                      <span className="text-gray-400 text-sm line-through">{offer.originalPrice}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6 space-y-2">
                    {offer.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#00F0FF] shrink-0" />
                        <span className="text-gray-300 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] hover:from-[#00F0FF]/90 hover:to-[#9D00FF]/90 text-white font-medium border-0 rounded-xl h-10 transition-all duration-300"
                    style={{
                      boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)'
                    }}
                  >
                    Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Berater-Profile */}
      <section 
        className="py-20 px-4"
        style={{
          background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.03) 0%, rgba(157, 0, 255, 0.03) 50%, rgba(255, 0, 166, 0.03) 100%)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-black text-white mb-4"
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
              }}
            >
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] bg-clip-text text-transparent">
                Top-Berater des Monats
              </span>
            </h2>
            <div 
              className="text-lg text-gray-300 max-w-2xl mx-auto font-medium"
              style={{
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              Unsere erfolgreichsten Experten mit den meisten zufriedenen Kunden.
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topConsultants.map((consultant, index) => (
              <Card 
                key={index} 
                className="group transition-all duration-500 transform hover:scale-105 border-0 rounded-3xl overflow-hidden relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(0, 240, 255, 0.08) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 0 40px rgba(0, 240, 255, 0.2), 0 0 80px rgba(157, 0, 255, 0.1)'
                }}
              >
                <CardContent className="text-center p-8">
                  {/* Monthly Badge */}
                  <div className="absolute top-6 right-6">
                    <Badge 
                      className="bg-gradient-to-r from-[#FF00A6] to-[#9D00FF] text-white border-0 font-bold px-3 py-1"
                      style={{
                        boxShadow: '0 0 20px rgba(255, 0, 166, 0.5)'
                      }}
                    >
                      #{index + 1} Berater
                    </Badge>
                  </div>
                  
                  {/* Profile Image */}
                  <div className="relative mb-6">
                    <Avatar 
                      className="w-24 h-24 mx-auto transition-all duration-300 group-hover:scale-110"
                      style={{
                        boxShadow: '0 0 40px rgba(0, 240, 255, 0.4), 0 0 80px rgba(157, 0, 255, 0.3)'
                      }}
                    >
                      <AvatarImage 
                        src={consultant.avatar} 
                        alt={consultant.name}
                        className="object-cover"
                      />
                      <AvatarFallback 
                        className="text-xl font-bold text-white"
                        style={{
                          background: 'linear-gradient(135deg, #00F0FF 0%, #9D00FF 100%)'
                        }}
                      >
                        {consultant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{consultant.name}</h3>
                  
                  <div className="flex items-center justify-center gap-1 text-gray-300 mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">{consultant.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {renderStars(consultant.rating)}
                    <span className="text-sm text-gray-300 ml-1">({consultant.rating}/5)</span>
                  </div>
                  
                  <div className="mb-4">
                    <span 
                      className="text-[#00F0FF] font-bold"
                      style={{
                        textShadow: '0 0 20px rgba(0, 240, 255, 0.6)'
                      }}
                    >
                      {consultant.monthlyDeals} Deals diesen Monat
                    </span>
                  </div>
                  
                  <div className="text-gray-300 text-sm mb-8 italic leading-relaxed min-h-[2.5rem] flex items-center justify-center font-medium">
                    "{consultant.slogan}"
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold border-0 rounded-2xl h-12 transition-all duration-300 transform hover:scale-105"
                      onClick={() => window.open(`https://wa.me/${consultant.whatsappNumber.replace(/\D/g, '')}?text=Hallo ${consultant.name}, ich interessiere mich für eine Beratung.`, '_blank')}
                      style={{
                        boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)'
                      }}
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp Beratung
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="w-full border-2 border-[#FF00A6] text-[#FF00A6] bg-transparent hover:bg-[#FF00A6]/10 hover:border-[#FF00A6] transition-all duration-300 font-bold rounded-2xl h-12"
                      onClick={() => handleQRCodeClick(consultant)}
                      style={{
                        boxShadow: '0 0 25px rgba(255, 0, 166, 0.3)',
                        textShadow: '0 0 15px rgba(255, 0, 166, 0.6)'
                      }}
                    >
                      <QrCode className="mr-2 h-5 w-5" />
                      QR-Code teilen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Warum wir - Icon Layout */}
      <section 
        className="py-20 px-4"
        style={{ backgroundColor: '#0F0F11' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl font-black text-white mb-4"
              style={{
                textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
              }}
            >
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] bg-clip-text text-transparent">
                Warum OhneQuatschDeals?
              </span>
            </h2>
            <div 
              className="text-lg text-gray-300 max-w-3xl mx-auto font-medium"
              style={{
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              Wir setzen auf Transparenz, ehrliche Beratung und faire Preise – ohne versteckte Kosten oder Tricks.
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              const gradients = [
                'from-[#00F0FF] to-[#9D00FF]',
                'from-[#FF00A6] to-[#9D00FF]',
                'from-[#00F0FF] to-[#FF00A6]',
                'from-[#9D00FF] to-[#00F0FF]'
              ];
              return (
                <Card 
                  key={index} 
                  className="border-0 rounded-3xl transition-all duration-500 transform hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(0, 240, 255, 0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 50px rgba(0, 240, 255, 0.15)'
                  }}
                >
                  <CardContent className="text-center p-8">
                    <div 
                      className={`w-20 h-20 mx-auto mb-8 bg-gradient-to-br ${gradients[index]} rounded-full flex items-center justify-center text-white transition-all duration-500 hover:scale-125`}
                      style={{
                        boxShadow: '0 0 50px rgba(0, 240, 255, 0.5), 0 0 100px rgba(157, 0, 255, 0.4)'
                      }}
                    >
                      <IconComponent className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-5">{benefit.title}</h3>
                    <div className="text-gray-300 leading-relaxed font-medium">{benefit.description}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Footer / Rechtliches wird von der Footer-Komponente gehandhabt */}
    </div>
  );
};