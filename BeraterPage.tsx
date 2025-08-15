import React, { useEffect, useState } from 'react';
import { 
  Star,
  MapPin,
  MessageCircle,
  QrCode,
  Phone,
  Mail,
  ArrowLeft,
  Award,
  Users,
  Clock,
  Loader,
  ChevronRight,
  Eye
} from 'lucide-react';
import { api, supabase } from '../utils/supabase/client';

interface BeraterPageProps {
  onNavigate: (page: string) => void;
}

export const BeraterPage: React.FC<BeraterPageProps> = ({ onNavigate }) => {
  const [berater, setBerater] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Initialize system and load berater
    const initializeAndLoad = async () => {
      try {
        // Initialize the system first
        await api.initializeSystem();
        
        // Load berater data
        const beraterData = await api.getBerater();
        setBerater(Array.isArray(beraterData) ? beraterData : []);
        
        // Check user auth
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error loading berater:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAndLoad();
  }, []);

  // Enhanced fallback data matching OhneQuatschDeals style
  const fallbackBerater = [
    {
      id: 'michael-schmidt',
      name: 'Michael Schmidt',
      location: 'Hamburg',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 156,
      specialties: ['Internet & TV', 'Mobilfunk'],
      aboutMe: 'Seit 5 Jahren helfe ich Kunden bei der Suche nach den besten Tarifen. Ehrlichkeit und Transparenz sind meine Priorität.',
      whatsapp: '+49173718954201',
      badge: 'TOP-BERATER',
      isOnline: true,
      stats: {
        customers: '500+',
        experience: '5 Jahre',
        responseTime: '< 2h'
      },
      reviews: [
        {
          customer: 'Anna M.',
          rating: 5,
          text: 'Super Beratung! Hat mir viel Geld gespart und war sehr geduldig.',
          date: '2024-01-15'
        },
        {
          customer: 'Thomas K.',
          rating: 5,
          text: 'Sehr professionell und ehrlich. Kann ich nur empfehlen!',
          date: '2024-01-10'
        }
      ]
    },
    {
      id: 'sarah-weber',
      name: 'Sarah Weber',
      location: 'München',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b9fc?w=200&h=200&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 203,
      specialties: ['Strom & Gas', 'Kredite'],
      aboutMe: 'Energieexpertin mit Leidenschaft für nachhaltige Lösungen. Ich finde den optimalen Tarif für Ihre Bedürfnisse.',
      whatsapp: '+49173718954202',
      badge: 'ECO-EXPERT',
      isOnline: true,
      stats: {
        customers: '750+',
        experience: '7 Jahre',
        responseTime: '< 1h'
      },
      reviews: [
        {
          customer: 'Familie Müller',
          rating: 5,
          text: 'Hat uns beim Wechsel perfekt unterstützt. Sehr kompetent!',
          date: '2024-01-18'
        },
        {
          customer: 'Peter R.',
          rating: 5,
          text: 'Schnelle Antworten und super Service. Danke!',
          date: '2024-01-12'
        }
      ]
    },
    {
      id: 'alexander-koch',
      name: 'Alexander Koch',
      location: 'Berlin',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
      rating: 4.7,
      reviewCount: 128,
      specialties: ['Internet & TV', 'Strom & Gas'],
      aboutMe: 'Technik-Enthusiast und Tarifprofi. Ich erkläre komplexe Angebote verständlich und finde die beste Lösung.',
      whatsapp: '+49173718954203',
      badge: 'TECH-EXPERT',
      isOnline: false,
      stats: {
        customers: '400+',
        experience: '4 Jahre',
        responseTime: '< 3h'
      },
      reviews: [
        {
          customer: 'Lisa S.',
          rating: 5,
          text: 'Sehr geduldige Beratung und toller Service!',
          date: '2024-01-16'
        },
        {
          customer: 'Marco B.',
          rating: 4,
          text: 'Gute Beratung, hat sich viel Zeit genommen.',
          date: '2024-01-08'
        }
      ]
    }
  ];

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
      case 'TOP-BERATER':
        return 'bg-gradient-to-r from-[#FF3F87] to-[#A020F0] text-white';
      case 'ECO-EXPERT':
        return 'bg-gradient-to-r from-[#00D0C0] to-[#008B8B] text-white';
      case 'TECH-EXPERT':
        return 'bg-gradient-to-r from-[#FFD166] to-[#FF3F87] text-white';
      default:
        return 'bg-[#1A0E23] text-[#D8D8D8] border border-[#FF3F87]/30';
    }
  };

  const handleWhatsApp = (phone: string, name: string) => {
    window.open(`https://wa.me/${phone.replace('+', '').replace(' ', '')}?text=Hallo ${name}, ich interessiere mich für eine Beratung.`, '_blank');
  };

  const handleBeraterProfil = () => {
    onNavigate('berater-profil');
  };

  const generateQRCode = async (beraterId: string) => {
    try {
      if (!user) {
        alert('Bitte melden Sie sich an, um QR-Codes zu generieren.');
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        alert('Authentifizierung erforderlich');
        return;
      }

      const qrCode = await api.createQRCode(beraterId, 'profile', session.access_token);
      if (qrCode.error) {
        alert('Fehler beim Erstellen des QR-Codes: ' + qrCode.error);
      } else {
        alert(`QR-Code erstellt! URL: ${qrCode.url}`);
      }
    } catch (error) {
      console.error('QR Code generation error:', error);
      alert('Fehler beim Erstellen des QR-Codes');
    }
  };

  return (
    <div 
      className="min-h-screen text-white relative"
      style={{ 
        background: 'linear-gradient(180deg, #0E0F1A 0%, #1A0E23 100%)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Ambient Neon Orbs - same as homepage */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-[#FF3F87]/15 rounded-full blur-3xl animate-pulse" />
      <div 
        className="absolute bottom-20 right-32 w-48 h-48 bg-[#00D0C0]/10 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '2s' }} 
      />
      <div 
        className="absolute top-1/3 right-20 w-32 h-32 bg-[#A020F0]/8 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '4s' }} 
      />
      <div 
        className="absolute top-2/3 left-1/4 w-24 h-24 bg-[#FFD166]/12 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '6s' }} 
      />

      <div className="content-max-width pt-32 pb-16 relative z-10">
        {/* Header */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-[#D8D8D8] hover:text-[#FF3F87] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </button>
        
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Users className="w-8 h-8 text-[#00D0C0]" />
            <h1 
              className="gradient-text"
              style={{ 
                background: 'linear-gradient(135deg, #FF3F87 0%, #00D0C0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Unsere Berater
            </h1>
          </div>
          <p className="text-[#D8D8D8]/80 text-lg max-w-3xl mx-auto">
            Erfahrene und geprüfte Berater, die Ihnen ehrlich und kompetent helfen. 
            Alle unsere Berater durchlaufen regelmäßige Qualitätskontrollen.
          </p>
        </div>

        {/* Berater Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="h-8 w-8 animate-spin text-[#FF3F87]" />
            <span className="ml-2 text-[#D8D8D8]">Berater werden geladen...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
            {(berater.length > 0 ? berater : fallbackBerater).map((b) => (
              <div
                key={b.id}
                className="glass-morphism rounded-2xl p-6 hover:scale-105 transition-all duration-300 card-shadow cursor-pointer group"
                style={{ border: '1px solid rgba(255, 63, 135, 0.2)' }}
              >
                {/* Online Status & Badge */}
                <div className="flex items-center justify-between mb-4">
                  {b.isOnline && (
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 bg-[#00D0C0] rounded-full animate-pulse"
                        style={{ boxShadow: '0 0 10px rgba(0, 208, 192, 0.8)' }}
                      />
                      <span className="text-xs text-[#00D0C0] font-medium">Online</span>
                    </div>
                  )}
                  <div className="flex-1"></div>
                  {b.badge && (
                    <span 
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeStyle(b.badge)}`}
                    >
                      {b.badge}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="text-center mb-4">
                  <img
                    src={b.avatar}
                    alt={b.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-3 float-animation"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(255, 63, 135, 0.4))',
                      border: '3px solid',
                      borderImage: 'linear-gradient(135deg, #FF3F87, #00D0C0) 1'
                    }}
                  />
                  
                  <h3 className="text-[#D8D8D8] font-semibold text-lg mb-2">{b.name}</h3>
                  <div className="flex items-center justify-center gap-1 text-[#D8D8D8]/70 text-sm mb-3">
                    <MapPin className="w-4 h-4" />
                    {b.location}
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="flex items-center">
                      {renderStars(b.rating)}
                    </div>
                    <span className="text-sm text-[#D8D8D8]/70">
                      {b.rating} ({b.reviewCount})
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-[#FF3F87] font-bold">{b.stats.customers}</div>
                    <div className="text-xs text-[#D8D8D8]/70">Kunden</div>
                  </div>
                  <div>
                    <div className="text-[#00D0C0] font-bold">{b.stats.experience}</div>
                    <div className="text-xs text-[#D8D8D8]/70">Erfahrung</div>
                  </div>
                  <div>
                    <div className="text-[#FFD166] font-bold">{b.stats.responseTime}</div>
                    <div className="text-xs text-[#D8D8D8]/70">Antwortzeit</div>
                  </div>
                </div>
                
                {/* Specialties */}
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {b.specialties.map((specialty, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs glass-morphism"
                      style={{ 
                        background: 'rgba(0, 208, 192, 0.1)',
                        border: '1px solid rgba(0, 208, 192, 0.3)',
                        color: '#00D0C0'
                      }}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                {/* About Me */}
                <div className="mb-6">
                  <h4 className="text-[#D8D8D8] font-medium text-sm mb-2">Über mich</h4>
                  <p className="text-[#D8D8D8]/80 text-sm leading-relaxed">
                    {b.aboutMe}
                  </p>
                </div>
                
                {/* Recent Reviews */}
                <div className="mb-6">
                  <h4 className="text-[#D8D8D8] font-medium text-sm mb-3">Aktuelle Bewertungen</h4>
                  <div className="space-y-2">
                    {(b.reviews || []).slice(0, 2).map((review, idx) => (
                      <div 
                        key={idx} 
                        className="glass-morphism rounded-lg p-3"
                        style={{ border: '1px solid rgba(216, 216, 216, 0.1)' }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-[#D8D8D8]">{review.customer}</span>
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-xs text-[#D8D8D8]/70">
                          "{review.text}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Contact Buttons */}
                <div className="space-y-3">
                  <button 
                    className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    style={{
                      background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                      boxShadow: '0 0 20px rgba(37, 211, 102, 0.3)'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWhatsApp(b.whatsapp, b.name);
                    }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp Chat
                  </button>
                  
                  <div className="flex space-x-2">
                    <button 
                      className="flex-1 py-2 px-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 glass-morphism"
                      style={{ border: '1px solid rgba(255, 63, 135, 0.3)', color: '#FF3F87' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        generateQRCode(b.id);
                      }}
                    >
                      <QrCode className="h-4 w-4" />
                      QR-Code
                    </button>
                    <button 
                      className="flex-1 py-2 px-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 glass-morphism"
                      style={{ border: '1px solid rgba(0, 208, 192, 0.3)', color: '#00D0C0' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBeraterProfil();
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      Profil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Why Our Advisors Section */}
        <div 
          className="glass-morphism rounded-2xl p-8 mb-12"
          style={{ border: '1px solid rgba(0, 208, 192, 0.2)' }}
        >
          <div className="text-center mb-12">
            <h2 className="gradient-text text-2xl md:text-3xl mb-6">
              Warum unsere Berater?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)',
                  boxShadow: '0 0 25px rgba(255, 63, 135, 0.4)'
                }}
              >
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-[#D8D8D8] font-semibold text-lg mb-2">Geprüfte Qualität</h3>
              <p className="text-[#D8D8D8]/70 text-sm">
                Alle Berater durchlaufen regelmäßige Qualitätskontrollen und Schulungen.
              </p>
            </div>
            
            <div className="text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
                  boxShadow: '0 0 25px rgba(0, 208, 192, 0.4)'
                }}
              >
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-[#D8D8D8] font-semibold text-lg mb-2">Persönlicher Service</h3>
              <p className="text-[#D8D8D8]/70 text-sm">
                Direkter Kontakt über WhatsApp und persönliche Beratung nach Ihren Bedürfnissen.
              </p>
            </div>
            
            <div className="text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #FFD166 0%, #FF3F87 100%)',
                  boxShadow: '0 0 25px rgba(255, 215, 102, 0.4)'
                }}
              >
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-[#D8D8D8] font-semibold text-lg mb-2">Schnelle Antworten</h3>
              <p className="text-[#D8D8D8]/70 text-sm">
                Unsere Berater antworten in der Regel innerhalb weniger Stunden.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div 
          className="glass-morphism rounded-2xl p-8 text-center"
          style={{ border: '1px solid rgba(255, 63, 135, 0.2)' }}
        >
          <h2 className="text-[#D8D8D8] text-2xl md:text-3xl font-semibold mb-4">
            Noch Fragen?
          </h2>
          <p className="text-[#D8D8D8]/80 text-lg mb-8">
            Unser AI-Berater steht Ihnen 24/7 zur Verfügung oder kontaktieren Sie direkt 
            einen unserer Experten über WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #A020F0 0%, #FF3F87 100%)',
                boxShadow: '0 0 25px rgba(160, 32, 240, 0.4)'
              }}
              onClick={() => onNavigate('oqd-berater-chat')}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              AI-Berater starten
            </button>
            <button 
              className="px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 glass-morphism"
              style={{ border: '1px solid rgba(0, 208, 192, 0.4)', color: '#00D0C0' }}
              onClick={() => onNavigate('home')}
            >
              Zur Startseite
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};