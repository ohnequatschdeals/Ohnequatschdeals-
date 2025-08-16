import React, { useState } from 'react';
import { 
  Star,
  MapPin,
  MessageCircle,
  QrCode,
  Calendar,
  ArrowRight,
  X
} from 'lucide-react';

interface TopBeraterSectionProps {
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
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#00D0C0]/20"
          style={{ color: '#00D0C0' }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* QR Code */}
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

          {/* Close button */}
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

const BeraterCard: React.FC<{ 
  berater: BeraterData; 
  onQRClick: (berater: BeraterData) => void;
  onWhatsAppClick: (berater: BeraterData) => void;
  onTerminClick: (berater: BeraterData) => void;
  onCardClick: (berater: BeraterData) => void;
}> = ({ berater, onQRClick, onWhatsAppClick, onTerminClick, onCardClick }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < Math.floor(rating) ? 'text-[#FFD166] fill-[#FFD166]' : 'text-[#D8D8D8]/30'}`} 
      />
    ));
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onCardClick(berater);
  };

  return (
    <div 
      className="p-6 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
      style={{
        background: 'rgba(26, 14, 35, 0.3)',
        border: '1px solid rgba(216, 216, 216, 0.1)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 63, 135, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
      onClick={handleCardClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 208, 192, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 63, 135, 0.1)';
      }}
    >
      {/* Profile Image */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <img
            src={berater.avatar}
            alt={berater.name}
            className="w-24 h-24 rounded-full object-cover transition-all duration-300 group-hover:scale-110"
            style={{
              border: '3px solid #00D0C0',
              boxShadow: '0 0 20px rgba(0, 208, 192, 0.4)'
            }}
          />
          {berater.isOnline && (
            <div 
              className="absolute -top-1 -right-1 w-7 h-7 bg-[#00D0C0] rounded-full flex items-center justify-center"
              style={{ boxShadow: '0 0 15px rgba(0, 208, 192, 0.6)' }}
            >
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Name and Location */}
      <div className="text-center mb-6">
        <h3 
          className="font-semibold text-xl text-white mb-2 group-hover:text-[#00D0C0] transition-colors duration-300"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {berater.name}
        </h3>
        <div className="flex items-center justify-center gap-2 text-[#D8D8D8]/70 text-sm mb-3">
          <MapPin className="w-4 h-4" />
          {berater.location}
        </div>
        
        <span 
          className={`inline-block px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
            berater.isOnline ? 'animate-pulse' : 'opacity-70'
          }`}
          style={{
            background: berater.isOnline 
              ? 'linear-gradient(135deg, rgba(0, 208, 192, 0.2) 0%, rgba(0, 139, 139, 0.2) 100%)'
              : 'rgba(216, 216, 216, 0.1)',
            color: berater.isOnline ? '#00D0C0' : '#D8D8D8',
            border: berater.isOnline 
              ? '1px solid rgba(0, 208, 192, 0.4)' 
              : '1px solid rgba(216, 216, 216, 0.2)',
            boxShadow: berater.isOnline 
              ? '0 0 10px rgba(0, 208, 192, 0.2)' 
              : 'none'
          }}
        >
          {berater.isOnline ? 'ONLINE' : 'OFFLINE'}
        </span>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="flex items-center">
          {renderStars(berater.rating)}
        </div>
        <span className="text-sm text-[#D8D8D8]/70">
          ({berater.reviewCount})
        </span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        {/* QR-CODE Button */}
        <button
          onClick={() => onQRClick(berater)}
          className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          style={{
            background: 'transparent',
            border: '2px solid #00D0C0',
            color: '#00D0C0',
            boxShadow: '0 0 10px rgba(0, 208, 192, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#00D0C0';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 208, 192, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#00D0C0';
            e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 208, 192, 0.2)';
          }}
        >
          <QrCode className="w-5 h-5" />
          QR-Code
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={() => onWhatsAppClick(berater)}
          className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
            color: 'white',
            boxShadow: '0 0 15px rgba(0, 208, 192, 0.3)',
            border: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 208, 192, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 208, 192, 0.3)';
          }}
        >
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </button>

        {/* Termin Button */}
        <button
          onClick={() => onTerminClick(berater)}
          className="w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)',
            color: 'white',
            boxShadow: '0 0 15px rgba(255, 63, 135, 0.3)',
            border: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 63, 135, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 63, 135, 0.3)';
          }}
        >
          <Calendar className="w-5 h-5" />
          Termin
        </button>
      </div>
    </div>
  );
};

export const TopBeraterSection: React.FC<TopBeraterSectionProps> = ({ onNavigate }) => {
  const [selectedBerater, setSelectedBerater] = useState<BeraterData | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  const topBerater: BeraterData[] = [
    {
      id: 'michael-schmidt',
      name: 'Michael Schmidt',
      location: 'Hamburg',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 156,
      isOnline: true,
      whatsapp: '+49173718954201',
      qrCodeUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5RUi1Db2RlPC90ZXh0Pgo8L3N2Zz4='
    },
    {
      id: 'sarah-weber',
      name: 'Sarah Weber',
      location: 'München',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b9fc?w=200&h=200&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 203,
      isOnline: true,
      whatsapp: '+49173718954202',
      qrCodeUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5RUi1Db2RlPC90ZXh0Pgo8L3N2Zz4='
    },
    {
      id: 'alexander-koch',
      name: 'Alexander Koch',
      location: 'Berlin',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
      rating: 4.7,
      reviewCount: 128,
      isOnline: false,
      whatsapp: '+49173718954203',
      qrCodeUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5RUi1Db2RlPC90ZXh0Pgo8L3N2Zz4='
    },
    {
      id: 'julia-meyer',
      name: 'Julia Meyer',
      location: 'Frankfurt',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 189,
      isOnline: true,
      whatsapp: '+49173718954204',
      qrCodeUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5RUi1Db2RlPC90ZXh0Pgo8L3N2Zz4='
    }
  ];

  const handleQRClick = (berater: BeraterData) => {
    setSelectedBerater(berater);
    setIsQRModalOpen(true);
  };

  const handleWhatsAppClick = (berater: BeraterData) => {
    window.open(`https://wa.me/${berater.whatsapp.replace(/\s+/g, '')}?text=Hallo ${berater.name}, ich möchte einen Beratungstermin vereinbaren.`, '_blank');
  };

  const handleTerminClick = (berater: BeraterData) => {
    alert(`Terminbuchung für ${berater.name} wird geöffnet...`);
  };

  const handleCardClick = (berater: BeraterData) => {
    onNavigate('berater-profil');
  };

  const closeQRModal = () => {
    setIsQRModalOpen(false);
    setTimeout(() => setSelectedBerater(null), 300);
  };

  return (
    <>
      <section className="section-spacing" style={{ backgroundColor: '#1A0E23' }}>
        <div className="content-max-width">
          {/* Title */}
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Top-Berater</span>
            </h2>
            <p className="text-xl text-[#D8D8D8]/80 max-w-3xl mx-auto">
              Unsere erfahrenen Experten stehen Ihnen persönlich zur Seite – ehrlich, kompetent und immer für Sie da.
            </p>
          </div>

          {/* Berater Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {topBerater.map((berater, index) => (
              <div
                key={berater.id}
                className={`fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <BeraterCard
                  berater={berater}
                  onQRClick={handleQRClick}
                  onWhatsAppClick={handleWhatsAppClick}
                  onTerminClick={handleTerminClick}
                  onCardClick={handleCardClick}
                />
              </div>
            ))}
          </div>

          {/* Weitere Berater Button */}
          <div className="text-center fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={() => onNavigate('alle-berater')}
              className="px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 mx-auto"
              style={{
                background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
                color: 'white',
                boxShadow: '0 0 25px rgba(0, 208, 192, 0.4)',
                fontFamily: 'Inter, sans-serif',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 35px rgba(0, 208, 192, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 208, 192, 0.4)';
              }}
            >
              Weitere Berater ansehen
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* QR Modal */}
      <QRModal
        isOpen={isQRModalOpen}
        onClose={closeQRModal}
        berater={selectedBerater}
      />
    </>
  );
};