import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../ui/utils';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Home', page: 'home' },
    { 
      label: 'Angebote', 
      page: 'angebote',
      submenu: [
        { label: 'Alle Angebote', page: 'angebote' },
        { label: 'Internet & TV', page: 'internet-tv' },
        { label: 'Mobilfunk', page: 'mobilfunk' },
        { label: 'Strom & Gas', page: 'strom-gas' },
        { label: 'Kredite', page: 'kredite' }
      ]
    },
    { label: 'Berater', page: 'berater' },
    { label: 'Warum wir?', page: 'warum-wir' }
  ];

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled 
            ? 'bg-[#1A0E23]/80 backdrop-blur-xl border-b border-[#D8D8D8]/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
            : 'bg-transparent'
        )}
      >
        <nav className="content-max-width px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group"
              onClick={() => handleNavigation('home')}
            >
              <div className="relative">
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300 overflow-safe">
                  <span className="hidden sm:inline">OhneQuatschDeals.de</span>
                  <span className="sm:hidden">OQD.de</span>
                </h1>
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF3F87] to-[#00D0C0] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div 
                  key={item.page}
                  className="relative group"
                  onMouseEnter={() => item.submenu && setActiveDropdown(item.page)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => !item.submenu && handleNavigation(item.page)}
                    className={cn(
                      'flex items-center gap-1 px-4 py-2 rounded-xl font-medium transition-all duration-300',
                      'hover:text-[#FF3F87] hover:bg-[#FF3F87]/10',
                      currentPage === item.page 
                        ? 'text-[#FF3F87] bg-[#FF3F87]/10' 
                        : 'text-[#D8D8D8]'
                    )}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronDown 
                        className={cn(
                          'w-4 h-4 transition-transform duration-300',
                          activeDropdown === item.page && 'rotate-180'
                        )} 
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.submenu && activeDropdown === item.page && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-[#1A0E23]/90 backdrop-blur-xl border border-[#D8D8D8]/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.page}
                          onClick={() => handleNavigation(subItem.page)}
                          className="w-full text-left px-4 py-3 text-[#D8D8D8] hover:text-[#FF3F87] hover:bg-[#FF3F87]/10 transition-colors duration-300"
                        >
                          {subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="relative group">
                <Button
                  variant="tertiary"
                  size="sm"
                  glow={false}
                  onClick={() => setActiveDropdown(activeDropdown === 'login' ? null : 'login')}
                >
                  Login
                  <ChevronDown 
                    className={cn(
                      'w-4 h-4 ml-1 transition-transform duration-300',
                      activeDropdown === 'login' && 'rotate-180'
                    )} 
                  />
                </Button>
                
                {/* Login Dropdown */}
                {activeDropdown === 'login' && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-[#1A0E23]/90 backdrop-blur-xl border border-[#D8D8D8]/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
                    <button
                      onClick={() => handleNavigation('berater-login')}
                      className="w-full text-left px-4 py-3 text-[#D8D8D8] hover:text-[#FF3F87] hover:bg-[#FF3F87]/10 transition-colors duration-300"
                    >
                      Berater Login
                    </button>
                    <button
                      onClick={() => handleNavigation('admin-login')}
                      className="w-full text-left px-4 py-3 text-[#D8D8D8] hover:text-[#00D0C0] hover:bg-[#00D0C0]/10 transition-colors duration-300"
                    >
                      Admin Login
                    </button>
                    <button
                      onClick={() => handleNavigation('kundenbereich')}
                      className="w-full text-left px-4 py-3 text-[#D8D8D8] hover:text-[#FFD166] hover:bg-[#FFD166]/10 transition-colors duration-300"
                    >
                      Kundenbereich
                    </button>
                  </div>
                )}
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleNavigation('berater')}
              >
                Jetzt beraten lassen
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#D8D8D8] hover:text-[#FF3F87] transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          
          <div className="absolute top-16 sm:top-20 left-0 right-0 bg-[#1A0E23]/95 backdrop-blur-xl border-b border-[#D8D8D8]/10 glass-morphism">
            <div className="content-max-width py-6 px-4 sm:px-6">
              
              {/* Navigation Items */}
              <div className="space-y-4 mb-6">
                {navigationItems.map((item) => (
                  <div key={item.page}>
                    <button
                      onClick={() => item.submenu ? setActiveDropdown(activeDropdown === item.page ? null : item.page) : handleNavigation(item.page)}
                      className={cn(
                        'flex items-center justify-between w-full px-4 py-3 rounded-xl font-medium transition-all duration-300',
                        'hover:text-[#FF3F87] hover:bg-[#FF3F87]/10',
                        currentPage === item.page ? 'text-[#FF3F87] bg-[#FF3F87]/10' : 'text-[#D8D8D8]'
                      )}
                    >
                      {item.label}
                      {item.submenu && (
                        <ChevronDown 
                          className={cn(
                            'w-4 h-4 transition-transform duration-300',
                            activeDropdown === item.page && 'rotate-180'
                          )} 
                        />
                      )}
                    </button>
                    
                    {/* Mobile Submenu */}
                    {item.submenu && activeDropdown === item.page && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.page}
                            onClick={() => handleNavigation(subItem.page)}
                            className="block w-full text-left px-4 py-2 text-[#D8D8D8] hover:text-[#00D0C0] transition-colors duration-300"
                          >
                            {subItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile CTA Buttons */}
              <div className="space-y-3 pt-6 border-t border-[#D8D8D8]/10">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleNavigation('berater-login')}
                    className="text-xs"
                  >
                    Berater
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleNavigation('admin-login')}
                    className="text-xs"
                  >
                    Admin
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleNavigation('kundenbereich')}
                    className="text-xs"
                  >
                    Kunde
                  </Button>
                </div>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => handleNavigation('berater')}
                  className="w-full"
                >
                  Jetzt beraten lassen
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};