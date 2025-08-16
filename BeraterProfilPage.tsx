import React, { useState } from 'react';
import { 
  Star,
  MapPin,
  MessageCircle,
  QrCode,
  Calendar,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface BeraterProfilPageProps {
  onNavigate: (page: string) => void;
}

interface BeraterData {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  isOnline: boolean;
  whatsapp: string;
  qrCodeUrl: string;
  description: string;
}

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  category: string;
}

interface PartnerOffer {
  id: string;
  provider: string;
  title: string;
  description: string;
  logo: string;
}

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  berater: BeraterData | null;
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, berater }) => {
  if (!isOpen || !berater) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)'
      }}
      onClick={onClose}
    >
      <div 
        className={`relative p-8 rounded-xl max-w-md w-full mx-4 transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{
          background: 'rgba(26, 14, 35, 0.95)',
          border: '1px solid rgba(0, 208, 192, 0.3)',
          boxShadow: '0 0 30px rgba(0, 208, 192, 0.4), 0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#00D0C0]/20"
          style={{ color: '#00D0C0' }}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center">
          <div 
            className="inline-block p-4 rounded-xl mb-6"
            style={{ 
              background: 'white',
              border: '2px solid #00D0C0',
              boxShadow: '0 0 20px rgba(0, 208, 192, 0.3)'
            }}
          >
            <img
              src={berater.qrCodeUrl}
              alt={`QR-Code für ${berater.name}`}
              className="w-48 h-48"
              style={{ display: 'block' }}
            />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">
            {berater.name}
          </h3>
          <p className="text-[#D8D8D8]/70 text-sm mb-6">
            Scannen Sie diesen Code, um direkt zu meinem Profil zu gelangen
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
              boxShadow: '0 0 20px rgba(0, 208, 192, 0.3)',
              color: 'white'
            }}
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

export const BeraterProfilPage: React.FC<BeraterProfilPageProps> = ({ onNavigate }) => {
  const [selectedBerater, setSelectedBerater] = useState<BeraterData | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  // Mock Berater Data
  const beraterData: BeraterData = {
    id: 'michael-schmidt',
    name: 'Michael Schmidt',
    location: 'Hamburg, Deutschland',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 156,
    isOnline: true,
    whatsapp: '+49173718954201',
    qrCodeUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5RUi1Db2RlPC90ZXh0Pgo8L3N2Zz4=',
    description: 'Mit über 8 Jahren Erfahrung in der Telekommunikationsbranche helfe ich Ihnen dabei, die besten Tarife zu finden. Ehrlichkeit und Transparenz stehen bei mir an erster Stelle.'
  };

  const reviews: Review[] = [
    {
      id: '1',
      customerName: 'Anna M.',
      rating: 5,
      comment: 'Sehr kompetente Beratung! Michael hat mir geholfen, über 400€ pro Jahr zu sparen. Immer erreichbar und sehr geduldig bei allen Fragen.',
      date: '15. Jan 2024',
      category: 'Internet & TV'
    },
    {
      id: '2',
      customerName: 'Peter K.',
      rating: 5,
      comment: 'Schnelle und ehrliche Beratung. Hat mir den perfekten Mobilfunktarif gefunden und dabei auch noch Geld gespart. Top Service!',
      date: '10. Jan 2024',
      category: 'Mobilfunk'
    },
    {
      id: '3',
      customerName: 'Familie Weber',
      rating: 4,
      comment: 'Gute Beratung beim Stromanbieterwechsel. Alles wurde professionell abgewickelt und wir sind sehr zufrieden.',
      date: '8. Jan 2024',
      category: 'Strom & Gas'
    }
  ];

  const partnerOffers: PartnerOffer[] = [
    {
      id: '1',
      provider: 'Vodafone',
      title: 'GigaZuhause Cable 1000',
      description: '1000 Mbit/s Internet + 180 HD Sender für nur 29,99€/Monat',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=80&h=80&fit=crop&crop=center'
    },
    {
      id: '2',
      provider: 'Check24',
      title: 'Strom & Gas Vergleich',
      description: 'Über 1000 Anbieter im direkten Vergleich - bis zu 500€ sparen',
      logo: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=80&h=80&fit=crop&crop=center'
    },
    {
      id: '3',
      provider: 'Smava',
      title: 'Ratenkredit ab 2,29%',
      description: 'Kredite von 1.000€ bis 120.000€ mit flexibler Laufzeit',
      logo: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=80&h=80&fit=crop&crop=center'
    },
    {
      id: '4',
      provider: '1&1',
      title: 'DSL & Mobilfunk Bundle',
      description: 'DSL + Mobilfunk im günstigen Paket ab 19,99€/Monat',
      logo: 'https://images.unsplash.com/photo-1616472624552-48d71cd5b9b6?w=80&h=80&fit=crop&crop=center'
    },
    {
      id: '5',
      provider: 'Moon',
      title: 'Nachhaltige Energielösungen',
      description: '100% grüner Strom zu fairen Preisen + 150€ Bonus',
      logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&crop=center'
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

  const handleQRClick = () => {
    setSelectedBerater(beraterData);
    setIsQRModalOpen(true);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${beraterData.whatsapp.replace(/\s+/g, '')}?text=Hallo ${beraterData.name}, ich möchte einen Beratungstermin vereinbaren.`, '_blank');
  };

  const handleTerminClick = () => {
    alert(`Terminbuchung für ${beraterData.name} wird geöffnet...`);
  };

  const closeQRModal = () => {
    setIsQRModalOpen(false);
    setTimeout(() => setSelectedBerater(null), 300);
  };

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const scrollOffers = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      setCurrentOfferIndex((prev) => (prev + 1) % partnerOffers.length);
    } else {
      setCurrentOfferIndex((prev) => (prev - 1 + partnerOffers.length) % partnerOffers.length);
    }
  };

  const visibleOffers = partnerOffers.slice(currentOfferIndex, currentOfferIndex + 3).concat(
    partnerOffers.slice(0, Math.max(0, (currentOfferIndex + 3) - partnerOffers.length))
  );

  return (
    <div 
      className="min-h-screen text-white relative"
      style={{ 
        background: 'linear-gradient(180deg, #0E0F1A 0%, #1A0E23 100%)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Ambient Neon Orbs */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-[#FF3F87]/15 rounded-full blur-3xl animate-pulse" />
      <div 
        className="absolute bottom-20 right-32 w-48 h-48 bg-[#00D0C0]/10 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '2s' }} 
      />
      <div 
        className="absolute top-1/3 right-20 w-32 h-32 bg-[#A020F0]/8 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '4s' }} 
      />

      <div className="content-max-width pt-32 pb-16 relative z-10">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('alle-berater')}
          className="flex items-center gap-2 text-[#D8D8D8] hover:text-[#FF3F87] transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zu allen Beratern
        </button>

        {/* Header Area */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={beraterData.avatar}
                  alt={beraterData.name}
                  className="w-30 h-30 rounded-full object-cover"
                  style={{
                    width: '120px',
                    height: '120px',
                    border: '3px solid #00D0C0',
                    boxShadow: '0 0 25px rgba(0, 208, 192, 0.4)'
                  }}
                />
                {beraterData.isOnline && (
                  <div 
                    className="absolute -top-1 -right-1 w-8 h-8 bg-[#00D0C0] rounded-full flex items-center justify-center"
                    style={{ boxShadow: '0 0 15px rgba(0, 208, 192, 0.6)' }}
                  >
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            </div>

            {/* Name and Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <h1 
                  className="font-bold text-white"
                  style={{ 
                    fontSize: '28px',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  {beraterData.name}
                </h1>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#D8D8D8]/70" style={{ fontSize: '16px' }}>
                    <MapPin className="w-4 h-4" />
                    {beraterData.location}
                  </div>
                  
                  {beraterData.isOnline && (
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: 'rgba(0, 208, 192, 0.2)',
                        color: '#00D0C0',
                        border: '1px solid rgba(0, 208, 192, 0.3)'
                      }}
                    >
                      ONLINE
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    background: '#00D0C0',
                    color: 'white',
                    boxShadow: '0 0 20px rgba(0, 208, 192, 0.3)',
                    minWidth: '140px'
                  }}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>

                <button
                  onClick={handleTerminClick}
                  className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)',
                    color: 'white',
                    boxShadow: '0 0 20px rgba(255, 63, 135, 0.3)',
                    minWidth: '140px'
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  Termin vereinbaren
                </button>

                <button
                  onClick={handleQRClick}
                  className="p-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center"
                  style={{
                    background: 'transparent',
                    border: '2px solid #00D0C0',
                    color: '#00D0C0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#00D0C0';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#00D0C0';
                  }}
                >
                  <QrCode className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Intro Section */}
        <div className="mb-16">
          <div className="text-center">
            <p 
              className="text-white leading-relaxed mx-auto"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                maxWidth: '600px',
                fontSize: '16px',
                lineHeight: '1.7'
              }}
            >
              {beraterData.description}
            </p>
          </div>
        </div>

        {/* Partnerangebote Section */}
        <div className="mb-16">
          <h2 
            className="text-white font-bold text-2xl mb-8"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Partnerangebote
          </h2>
          
          <div className="relative">
            {/* Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-4" style={{ scrollBehavior: 'smooth' }}>
              {partnerOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="flex-shrink-0 p-6 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(26, 14, 35, 0.6)',
                    border: '1px solid rgba(0, 208, 192, 0.3)',
                    boxShadow: '0 0 20px rgba(0, 208, 192, 0.2)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    minWidth: '300px',
                    maxWidth: '300px'
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={offer.logo}
                      alt={offer.provider}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">
                        {offer.title}
                      </h3>
                      <p className="text-[#D8D8D8]/70 text-sm">
                        {offer.provider}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-[#D8D8D8]/80 text-sm mb-6">
                    {offer.description}
                  </p>
                  
                  <button 
                    className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)',
                      boxShadow: '0 0 15px rgba(255, 63, 135, 0.3)',
                      color: 'white'
                    }}
                    onClick={() => alert(`${offer.provider} Angebot wird geöffnet...`)}
                  >
                    Zum Angebot
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bewertungen Section */}
        <div className="mb-16">
          <h2 
            className="text-white font-bold text-2xl mb-8"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Bewertungen
          </h2>
          
          {/* Overall Rating */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2">
              {renderStars(beraterData.rating)}
            </div>
            <span className="text-2xl font-bold text-[#FFD166]">
              {beraterData.rating}
            </span>
            <span className="text-[#D8D8D8]/70">
              ({beraterData.reviewCount} Bewertungen)
            </span>
          </div>

          {/* Reviews Carousel */}
          <div className="relative mb-8">
            <div 
              className="p-6 rounded-xl"
              style={{
                background: 'rgba(26, 14, 35, 0.6)',
                border: '1px solid rgba(255, 215, 102, 0.3)',
                boxShadow: '0 0 20px rgba(255, 215, 102, 0.2)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-white font-medium mb-2">
                    {reviews[activeReviewIndex].customerName}
                  </h4>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      {renderStars(reviews[activeReviewIndex].rating)}
                    </div>
                    <span 
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: 'rgba(0, 208, 192, 0.2)',
                        color: '#00D0C0'
                      }}
                    >
                      {reviews[activeReviewIndex].category}
                    </span>
                  </div>
                </div>
                <span className="text-[#D8D8D8]/50 text-sm">
                  {reviews[activeReviewIndex].date}
                </span>
              </div>
              <p className="text-[#D8D8D8]/80 leading-relaxed">
                {reviews[activeReviewIndex].comment}
              </p>
            </div>
            
            {/* Navigation */}
            {reviews.length > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={prevReview}
                  className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(26, 14, 35, 0.6)',
                    border: '1px solid rgba(255, 215, 102, 0.3)',
                    color: '#FFD166'
                  }}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center gap-2">
                  {reviews.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === activeReviewIndex ? 'bg-[#FFD166] w-6' : 'bg-[#D8D8D8]/30'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextReview}
                  className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(26, 14, 35, 0.6)',
                    border: '1px solid rgba(255, 215, 102, 0.3)',
                    color: '#FFD166'
                  }}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
          
          {/* Bewertung abgeben Button */}
          <div className="text-center">
            <button 
              className="px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
              style={{
                background: 'transparent',
                border: '2px solid #00D0C0',
                color: '#00D0C0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#00D0C0';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#00D0C0';
              }}
              onClick={() => alert('Bewertungsformular wird geöffnet...')}
            >
              Bewertung abgeben
            </button>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      <QRModal
        isOpen={isQRModalOpen}
        onClose={closeQRModal}
        berater={selectedBerater}
      />
    </div>
  );
};