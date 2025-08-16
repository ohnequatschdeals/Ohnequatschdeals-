import React from 'react';
import { Home, Bookmark, Users, Info, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const handleSocialClick = (platform: string) => {
    const urls = {
      tiktok: 'https://www.tiktok.com/@ohnequatschdeals',
      instagram: 'https://www.instagram.com/ohnequatschdeals',
      facebook: 'https://www.facebook.com/ohnequatschdeals'
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:vertrieb@ohnequatschdeals.de';
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/491737189542', '_blank');
  };

  const navigationLinks = [
    { label: 'Startseite', page: 'home' },
    { label: 'Angebote', page: 'angebote' },
    { label: 'Top-Berater', page: 'berater' },
    { label: 'Über uns', page: 'warum-wir' },
    { label: 'Kontakt', page: 'impressum' }
  ];

  return (
    <footer 
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(26,14,35,0.8) 0%, rgba(14,15,26,0.9) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      {/* Thin Turquoise Glow Line at Top */}
      <div 
        className="absolute top-0 left-0 w-full h-0.5"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #00D0C0 50%, transparent 100%)',
          boxShadow: '0 0 10px rgba(0, 208, 192, 0.6)'
        }}
      />

      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-[#FF3F87]/5 rounded-full blur-2xl" />
      <div className="absolute bottom-10 right-16 w-32 h-32 bg-[#00D0C0]/5 rounded-full blur-2xl" />

      <div className="content-max-width py-16">
        {/* Main Footer Content - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-12">
          
          {/* Column 1: Logo + Description */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="gradient-text">OhneQuatschDeals.de</span>
              </h3>
              <p className="text-[#D8D8D8]/80 leading-relaxed">
                Ehrliche Beratung für Internet, Mobilfunk, Strom, Gas & Kredite. 
                Transparent, fair und ohne versteckte Kosten – Ihre Vorteile stehen bei uns im Mittelpunkt.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center gap-3 text-[#D8D8D8]/70 hover:text-[#00D0C0] transition-all duration-300 group"
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(0, 208, 192, 0.1)',
                    border: '1px solid rgba(0, 208, 192, 0.2)'
                  }}
                >
                  <span className="text-xs">💬</span>
                </div>
                <span className="group-hover:underline text-sm">WhatsApp: +49 173 7189542</span>
              </button>
              
              <button
                onClick={handleEmailClick}
                className="flex items-center gap-3 text-[#D8D8D8]/70 hover:text-[#00D0C0] transition-all duration-300 group"
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    background: 'rgba(0, 208, 192, 0.1)',
                    border: '1px solid rgba(0, 208, 192, 0.2)'
                  }}
                >
                  <span className="text-xs">✉️</span>
                </div>
                <span className="group-hover:underline text-sm">vertrieb@ohnequatschdeals.de</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white mb-6">Navigation</h4>
            <div className="space-y-4">
              {navigationLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleLinkClick(link.page)}
                  className="block text-[#D8D8D8]/70 hover:text-[#00D0C0] transition-all duration-300 hover:translate-x-1 text-left group"
                >
                  <span className="relative">
                    {link.label}
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[#00D0C0] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Social Media */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white mb-6">Folgen Sie uns</h4>
            <div className="space-y-4">
              <p className="text-[#D8D8D8]/70 text-sm mb-6">
                Bleiben Sie auf dem Laufenden und verpassen Sie keine Top-Angebote und News.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-4">
                {/* TikTok */}
                <button
                  onClick={() => handleSocialClick('tiktok')}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  style={{
                    background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)',
                    boxShadow: '0 0 15px rgba(255, 63, 135, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 63, 135, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 63, 135, 0.3)';
                  }}
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </button>

                {/* Instagram */}
                <button
                  onClick={() => handleSocialClick('instagram')}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  style={{
                    background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 50%, #00D0C0 100%)',
                    boxShadow: '0 0 15px rgba(255, 63, 135, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 63, 135, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 63, 135, 0.3)';
                  }}
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </button>

                {/* Facebook */}
                <button
                  onClick={() => handleSocialClick('facebook')}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                  style={{
                    background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
                    boxShadow: '0 0 15px rgba(0, 208, 192, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 208, 192, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 208, 192, 0.3)';
                  }}
                >
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Separator Line */}
        <div 
          className="w-full h-0.5 mb-8 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(0, 208, 192, 0.3) 50%, transparent 100%)'
          }}
        />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-[#D8D8D8]/60 text-sm">
            © 2025 OhneQuatschDeals.de – Alle Rechte vorbehalten.
          </p>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        footer {
          position: relative;
        }
        
        footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 80%, rgba(255, 63, 135, 0.03) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(0, 208, 192, 0.03) 0%, transparent 50%);
          pointer-events: none;
        }
      `}</style>
    </footer>
  );
};