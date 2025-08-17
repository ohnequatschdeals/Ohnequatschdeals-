import React, { useState } from 'react';
import { 
  Star,
  MapPin,
  MessageCircle,
  QrCode,
  Calendar,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface AlleBeraterPageProps {
  onNavigate: (page: string) => void;
}

interface BeraterData {
  id: string;
  name: string;
  location: string;
  city: string;
  category: string;
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

const BeraterCard: React.FC<{ 
  berater: BeraterData; 
  onQRClick: (berater: BeraterData) => void;
  onWhatsAppClick: (berater: BeraterData) => void;
  onTerminClick: (berater: BeraterData) => void;
}> = ({ berater, onQRClick, onWhatsAppClick, onTerminClick }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-4 w-4 ${index < Math.floor(rating) ? 'text-[#FFD166] fill-[#FFD166]' : 'text-[#D8D8D8]/30'}`} 
      />
    ));
  };

  return (
    <div 
      className="p-5 rounded-xl transition-all duration-300 hover:scale-105"
      style={{
        background: 'rgba(26, 14, 35, 0.6)',
        border: '1px solid rgba(0, 208, 192, 0.3)',
        boxShadow: '0 0 20px rgba(0, 208, 192, 0.2)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      <div className="text-center mb-4">
        <div className="relative inline-block">
          <img
            src={berater.avatar}
            alt={berater.name}
            className="w-20 h-20 rounded-full object-cover"
            style={{
              border: '3px solid #00D0C0',
              boxShadow: '0 0 15px rgba(0, 208, 192, 0.4)'
            }}
          />
          {berater.isOnline && (
            <div 
              className="absolute -top-1 -right-1 w-6 h-6 bg-[#00D0C0] rounded-full flex items-center justify-center"
              style={{ boxShadow: '0 0 10px rgba(0, 208, 192, 0.6)' }}
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          )}
        </div>
      </div>

      <div className="text-center mb-4">
        <h3 
          className="font-bold text-lg text-white mb-1"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          {berater.name}
        </h3>
        <div className="flex items-center justify-center gap-1 text-[#D8D8D8]/70 text-sm mb-2">
          <MapPin className="w-3 h-3" />
          {berater.location}
        </div>
        
        {berater.isOnline && (
          <span 
            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
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

      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="flex items-center">
          {renderStars(berater.rating)}
        </div>
        <span className="text-sm text-[#D8D8D8]/70">
          ({berater.reviewCount})
        </span>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => onQRClick(berater)}
          className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
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
          QR-CODE
        </button>

        <button
          onClick={() => onWhatsAppClick(berater)}
          className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          style={{
            background: '#00D0C0',
            color: 'white',
            boxShadow: '0 0 15px rgba(0, 208, 192, 0.3)'
          }}
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </button>

        <button
          onClick={() => onTerminClick(berater)}
          className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          style={{
            background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)',
            color: 'white',
            boxShadow: '0 0 15px rgba(255, 63, 135, 0.3)'
          }}
        >
          <Calendar className="w-4 h-4" />
          Termin
        </button>
      </div>
    </div>
  );
};

export const AlleBeraterPage: React.FC<AlleBeraterPageProps> = ({ onNavigate }) => {
  const [selectedBerater, setSelectedBerater] = useState<BeraterData | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const allBerater: BeraterData[] = [
    {
      id: 'michael-schmidt',
      name: 'Michael Schmidt',
      location: 'Hamburg, Deutschland',
      city: 'Hamburg',
      category: 'Internet & TV',
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
      location: 'München, Deutschland',
      city: 'München',
      category: 'Strom & Gas',
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
      location: 'Berlin, Deutschland',
      city: 'Berlin',
      category: 'Mobilfunk',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face',
      rating: 4.7,
      reviewCount: 128,
      isOnline: false,
      whatsapp: '+49173718954203',
      qrCodeUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5RUi1Db2RlPC90ZXh0Pgo8L3N2Zz4='
    },
    {
      id: 'lisa-mueller',
      name: 'Lisa Müller',
      location: 'Köln, Deutschland',
      city: 'Köln',
      category: 'Kredite',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      rating: 4.6,
      reviewCount: 89,
      isOnline: true,
      whatsapp: '+49173718954204',
      qrCodeUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5RUi1Db2RlPC90ZXh0Pgo8L3N2Zz4='
    },
    {
      id: 'thomas-becker',
      name: 'Thomas Becker',
      location: 'Frankfurt, Deutschland',
      city: 'Frankfurt',
      category: 'Internet & TV',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      rating: 4.5,
      reviewCount: 112,
      isOnline: true,
      whatsapp: '+49173718954205',
      qrCodeUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5RUi1Db2RlPC90ZXh0Pgo8L3N2Zz4='
    },
    {
      id: 'anna-schneider',
      name: 'Anna Schneider',
      location: 'Stuttgart, Deutschland',
      city: 'Stuttgart',
      category: 'Strom & Gas',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face',
      rating: 4.8,
      reviewCount: 167,
      isOnline: false,
      whatsapp: '+49173718954206',
      qrCodeUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5RUi1Db2RlPC90ZXh0Pgo8L3N2Zz4='
    },
    {
      id: 'markus-wagner',
      name: 'Markus Wagner',
      location: 'Düsseldorf, Deutschland',
      city: 'Düsseldorf',
      category: 'Mobilfunk',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
      rating: 4.4,
      reviewCount: 95,
      isOnline: true,
      whatsapp: '+49173718954207',
      qrCodeUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5RUi1Db2RlPC90ZXh0Pgo8L3N2Zz4='
    },
    {
      id: 'julia-fischer',
      name: 'Julia Fischer',
      location: 'Leipzig, Deutschland',
      city: 'Leipzig',
      category: 'Kredite',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face',
      rating: 4.9,
      reviewCount: 134,
      isOnline: true,
      whatsapp: '+49173718954208',
      qrCodeUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5RUi1Db2RlPC90ZXh0Pgo8L3N2Zz4='
    },
    {
      id: 'stefan-hoffmann',
      name: 'Stefan Hoffmann',
      location: 'Dresden, Deutschland',
      city: 'Dresden',
      category: 'Internet & TV',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=200&h=200&fit=crop&crop=face',
      rating: 4.6,
      reviewCount: 76,
      isOnline: false,
      whatsapp: '+49173718954209',
      qrCodeUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzAwMCIvPgogIDxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjE2MCIgaGVpZ2h0PSIxNjAiIGZpbGw9IiNmZmYiLz4KICA8dGV4dCB4PSIxMDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyIiBmb250LXNpemU9IjE0IiBmaWxsPSIjMDAwIj5RUi1Db2RlPC90ZXh0Pgo8L3N2Zz4='
    }
  ];

  const cities = ['Alle Städte', 'Hamburg', 'München', 'Berlin', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dresden'];
  const categories = ['Alle Kategorien', 'Internet & TV', 'Mobilfunk', 'Strom & Gas', 'Kredite'];

  // Filter berater based on search and filters
  const filteredBerater = allBerater.filter(berater => {
    const matchesSearch = berater.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         berater.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !selectedCity || selectedCity === 'Alle Städte' || berater.city === selectedCity;
    const matchesCategory = !selectedCategory || selectedCategory === 'Alle Kategorien' || berater.category === selectedCategory;
    return matchesSearch && matchesCity && matchesCategory;
  });

  // Pagination
  const beratersPerPage = 9;
  const totalPages = Math.ceil(filteredBerater.length / beratersPerPage);
  const startIndex = (currentPage - 1) * beratersPerPage;
  const currentBeraters = filteredBerater.slice(startIndex, startIndex + beratersPerPage);

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

  const closeQRModal = () => {
    setIsQRModalOpen(false);
    setTimeout(() => setSelectedBerater(null), 300);
  };

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
      <div 
        className="absolute top-2/3 left-1/4 w-24 h-24 bg-[#FFD166]/12 rounded-full blur-3xl animate-pulse" 
        style={{ animationDelay: '6s' }} 
      />

      <div className="content-max-width pt-32 pb-16 relative z-10">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 
            className="font-bold text-[#D8D8D8] mb-8"
            style={{ 
              fontSize: '36px',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Alle Berater
          </h1>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D8D8D8]/50" />
            <input
              type="text"
              placeholder="Berater suchen…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-4 pl-12 pr-4 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2"
              style={{
                background: 'rgba(26, 14, 35, 0.6)',
                border: '1px solid rgba(0, 208, 192, 0.3)',
                color: '#D8D8D8',
                fontFamily: 'Inter, sans-serif',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
              }}
            />
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* City Filter */}
            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-between"
                style={{
                  background: 'rgba(26, 14, 35, 0.6)',
                  border: '1px solid rgba(255, 63, 135, 0.3)',
                  color: '#D8D8D8',
                  fontFamily: 'Inter, sans-serif',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
              >
                <span>{selectedCity || 'Stadt wählen'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCityDropdownOpen && (
                <div 
                  className="absolute top-full mt-2 w-full rounded-xl z-20 max-h-48 overflow-y-auto"
                  style={{
                    background: 'rgba(26, 14, 35, 0.95)',
                    border: '1px solid rgba(255, 63, 135, 0.3)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)'
                  }}
                >
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city === 'Alle Städte' ? '' : city);
                        setIsCityDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className="w-full py-3 px-4 text-left hover:bg-[#FF3F87]/20 transition-colors text-[#D8D8D8]"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-between"
                style={{
                  background: 'rgba(26, 14, 35, 0.6)',
                  border: '1px solid rgba(255, 63, 135, 0.3)',
                  color: '#D8D8D8',
                  fontFamily: 'Inter, sans-serif',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
              >
                <span>{selectedCategory || 'Kategorie wählen'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCategoryDropdownOpen && (
                <div 
                  className="absolute top-full mt-2 w-full rounded-xl z-20 max-h-48 overflow-y-auto"
                  style={{
                    background: 'rgba(26, 14, 35, 0.95)',
                    border: '1px solid rgba(255, 63, 135, 0.3)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)'
                  }}
                >
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category === 'Alle Kategorien' ? '' : category);
                        setIsCategoryDropdownOpen(false);
                        setCurrentPage(1);
                      }}
                      className="w-full py-3 px-4 text-left hover:bg-[#FF3F87]/20 transition-colors text-[#D8D8D8]"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 text-center">
          <p className="text-[#D8D8D8]/70">
            {filteredBerater.length} Berater gefunden
          </p>
        </div>

        {/* Berater Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentBeraters.map((berater) => (
            <BeraterCard
              key={berater.id}
              berater={berater}
              onQRClick={handleQRClick}
              onWhatsAppClick={handleWhatsAppClick}
              onTerminClick={handleTerminClick}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredBerater.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#D8D8D8]/70 text-lg">
              Keine Berater gefunden. Versuchen Sie andere Suchkriterien.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'transparent',
                border: '2px solid #00D0C0',
                color: '#00D0C0'
              }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
                  currentPage === page ? 'opacity-100' : 'opacity-70'
                }`}
                style={{
                  background: currentPage === page ? '#00D0C0' : 'transparent',
                  border: '2px solid #00D0C0',
                  color: currentPage === page ? 'white' : '#00D0C0'
                }}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'transparent',
                border: '2px solid #00D0C0',
                color: '#00D0C0'
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
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