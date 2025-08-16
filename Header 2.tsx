import React from 'react';
import { Button } from './ui/button';
import { User, LogOut, Lock, X, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [user, setUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Start', page: 'home' },
    { name: 'Angebote', page: 'angebote' },
    { name: 'Berater', page: 'berater' },
    { name: 'Warum wir', page: 'warum-wir' },
    { name: 'Strom & Gas', page: 'strom-gas' }
  ];

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Session check failed:', error);
        setUser(null);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data: { session }, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert('Login fehlgeschlagen: ' + error.message);
        return;
      }

      setShowLoginModal(false);
      alert('Erfolgreich angemeldet!');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login fehlgeschlagen');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      {/* Sticky Header mit Glas-Effekt */}
      <header 
        className="sticky top-0 left-0 right-0 z-50 w-full"
        style={{
          background: 'linear-gradient(180deg, rgba(18, 18, 18, 0.95) 0%, rgba(18, 18, 18, 0.8) 50%, rgba(18, 18, 18, 0.4) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 240, 255, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Desktop Header */}
          <div className="hidden lg:flex flex-col items-center py-6">
            
            {/* Logo - 30% größer mit Neon-Glow */}
            <div 
              className="cursor-pointer group transition-all duration-500 hover:scale-110 mb-6"
              onClick={() => onNavigate('home')}
              style={{
                filter: 'drop-shadow(0 0 40px rgba(0, 240, 255, 0.6)) drop-shadow(0 0 80px rgba(255, 0, 166, 0.4)) drop-shadow(0 0 120px rgba(157, 0, 255, 0.3))'
              }}
            >
              <div className="text-center relative">
                <h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '-0.02em',
                    lineHeight: '1',
                    textShadow: '0 0 60px rgba(0, 240, 255, 0.8)'
                  }}
                >
                  ohnequatsch
                </h1>
                <h2
                  className="text-5xl md:text-6xl lg:text-7xl italic font-black bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] bg-clip-text text-transparent -mt-2"
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    letterSpacing: '-0.01em',
                    lineHeight: '1',
                    textShadow: '0 0 60px rgba(255, 0, 166, 0.8)'
                  }}
                >
                  DEALS
                </h2>
                
                {/* Subtiler Glow-Effekt nach unten */}
                <div 
                  className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-16 bg-gradient-to-b from-[#00F0FF]/20 via-[#FF00A6]/10 to-transparent rounded-full blur-2xl opacity-80"
                />
              </div>
            </div>

            {/* Horizontale Navigation */}
            <div className="flex items-center justify-between w-full max-w-6xl">
              
              {/* Navigation zentriert */}
              <div className="flex-1 flex justify-center">
                <nav className="flex items-center space-x-12">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => onNavigate(item.page)}
                      className={`
                        relative px-6 py-3 font-bold text-lg transition-all duration-300 transform
                        ${currentPage === item.page 
                          ? 'text-white scale-110' 
                          : 'text-white/80 hover:text-white hover:scale-105'
                        }
                      `}
                      style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      <span 
                        className={`
                          transition-all duration-300
                          ${currentPage === item.page
                            ? 'bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] bg-clip-text text-transparent'
                            : 'hover:bg-gradient-to-r hover:from-[#00F0FF] hover:via-[#FF00A6] hover:to-[#9D00FF] hover:bg-clip-text hover:text-transparent'
                          }
                        `}
                      >
                        {item.name}
                      </span>
                      
                      {/* Aktive Unterstreichung mit Neon-Glow */}
                      <div 
                        className={`
                          absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] 
                          transition-all duration-300 rounded-full
                          ${currentPage === item.page 
                            ? 'w-full opacity-100' 
                            : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                          }
                        `}
                        style={{
                          boxShadow: currentPage === item.page ? '0 0 30px rgba(0, 240, 255, 0.8), 0 0 60px rgba(255, 0, 166, 0.6)' : 'none'
                        }}
                      />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Login Button rechts außen */}
              <div className="flex justify-end">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                      style={{
                        boxShadow: '0 0 30px rgba(0, 240, 255, 0.6), 0 0 60px rgba(157, 0, 255, 0.4)'
                      }}
                    >
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <span 
                      className="text-white/90 font-medium"
                      style={{
                        textShadow: '0 0 20px rgba(255, 255, 255, 0.5)'
                      }}
                    >
                      {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                    </span>
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-white/80 hover:text-white hover:bg-white/10 p-3 transition-all duration-300 hover:scale-110 rounded-full"
                    >
                      <LogOut className="h-5 w-5" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowLoginModal(true)}
                    className="group relative h-14 px-8 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] hover:from-[#00F0FF]/90 hover:via-[#FF00A6]/90 hover:to-[#9D00FF]/90 text-white font-bold text-lg border-0 transition-all duration-500 transform hover:scale-110"
                    style={{
                      boxShadow: '0 0 40px rgba(0, 240, 255, 0.6), 0 0 80px rgba(255, 0, 166, 0.4), 0 0 120px rgba(157, 0, 255, 0.3)',
                      background: 'linear-gradient(45deg, rgba(0, 240, 255, 0.8), rgba(255, 0, 166, 0.8), rgba(157, 0, 255, 0.8))',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <Lock className="mr-3 h-6 w-6" />
                    Login
                    
                    {/* Zusätzlicher Glow-Layer */}
                    <div 
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00F0FF]/30 via-[#FF00A6]/30 to-[#9D00FF]/30 blur-xl transition-all duration-500 group-hover:blur-2xl -z-10"
                    />
                    <div 
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00F0FF]/20 via-[#FF00A6]/20 to-[#9D00FF]/20 blur-2xl transition-all duration-500 group-hover:blur-3xl -z-20"
                    />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between py-4">
            {/* Mobile Burger Menu */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white/90 hover:text-white hover:bg-white/10 p-2 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </Button>

            {/* Mobile Logo */}
            <div 
              className="cursor-pointer group transition-all duration-300 hover:scale-110"
              onClick={() => onNavigate('home')}
              style={{
                filter: 'drop-shadow(0 0 25px rgba(0, 240, 255, 0.6)) drop-shadow(0 0 50px rgba(255, 0, 166, 0.4))'
              }}
            >
              <div className="text-center">
                <h1 className="text-xl font-bold bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] bg-clip-text text-transparent">
                  ohnequatsch
                </h1>
                <h2 className="text-2xl italic font-black bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] bg-clip-text text-transparent -mt-1">
                  DEALS
                </h2>
              </div>
            </div>

            {/* Mobile Login */}
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-9 h-9 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] flex items-center justify-center"
                    style={{
                      boxShadow: '0 0 20px rgba(0, 240, 255, 0.6)'
                    }}
                  >
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <Button 
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-white/80 hover:text-white hover:bg-white/10 p-2"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={() => setShowLoginModal(true)}
                  className="h-11 px-5 rounded-full bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] hover:from-[#00F0FF]/90 hover:via-[#FF00A6]/90 hover:to-[#9D00FF]/90 text-white font-bold border-0 transition-all duration-300"
                  style={{
                    boxShadow: '0 0 25px rgba(0, 240, 255, 0.5), 0 0 50px rgba(255, 0, 166, 0.3)'
                  }}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden absolute top-full left-0 right-0 z-40"
            style={{
              background: 'linear-gradient(180deg, rgba(18, 18, 18, 0.98) 0%, rgba(18, 18, 18, 0.95) 100%)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              borderBottom: '1px solid rgba(0, 240, 255, 0.2)'
            }}
          >
            <div className="py-8 px-8 space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-5 px-6 rounded-2xl font-bold text-xl transition-all duration-300 ${
                    currentPage === item.page
                      ? 'text-white bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif'
                  }}
                >
                  <span 
                    className={`
                      transition-all duration-300
                      ${currentPage === item.page
                        ? 'bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] bg-clip-text text-transparent'
                        : 'hover:bg-gradient-to-r hover:from-[#00F0FF] hover:via-[#FF00A6] hover:to-[#9D00FF] hover:bg-clip-text hover:text-transparent'
                      }
                    `}
                  >
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal 
          onLogin={handleLogin} 
          onClose={() => setShowLoginModal(false)} 
        />
      )}
    </>
  );
};

// Login Modal Component
const LoginModal: React.FC<{ 
  onLogin: (email: string, password: string) => void; 
  onClose: () => void 
}> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKundenLogin, setIsKundenLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <div 
        className="relative bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-3xl p-10 w-full max-w-lg mx-4"
        style={{
          boxShadow: '0 0 80px rgba(0, 240, 255, 0.4), 0 0 160px rgba(157, 0, 255, 0.3)',
          background: 'linear-gradient(135deg, rgba(18, 18, 18, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%)'
        }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 
            className="text-4xl font-bold bg-gradient-to-r from-[#00F0FF] via-[#FF00A6] to-[#9D00FF] bg-clip-text text-transparent"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              textShadow: '0 0 40px rgba(0, 240, 255, 0.6)'
            }}
          >
            Anmelden
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose} 
            className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 hover:scale-110 p-3 rounded-full"
          >
            <X className="h-7 w-7" />
          </Button>
        </div>

        {/* Login Type Toggle */}
        <div className="flex mb-8 p-2 bg-gray-800/60 rounded-2xl backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setIsKundenLogin(true)}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-300 ${
              isKundenLogin
                ? 'bg-gradient-to-r from-[#9D00FF] to-[#FF00A6] text-white shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Kunden Login
          </button>
          <button
            type="button"
            onClick={() => setIsKundenLogin(false)}
            className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all duration-300 ${
              !isKundenLogin
                ? 'bg-gradient-to-r from-[#00F0FF] to-[#9D00FF] text-white shadow-lg'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Berater Login
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-white/90 font-bold mb-4">
              {isKundenLogin ? 'E-Mail' : 'Berater-ID / E-Mail'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-gray-800/60 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/30 transition-all duration-300 backdrop-blur-sm font-medium"
              placeholder={isKundenLogin ? 'ihre@email.de' : 'berater@ohnequatschdeals.de'}
              required
            />
          </div>
          
          <div>
            <label className="block text-white/90 font-bold mb-4">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-800/60 border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/30 transition-all duration-300 backdrop-blur-sm font-medium"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex space-x-4 pt-6">
            <Button 
              type="submit" 
              className={`flex-1 text-white font-bold py-4 rounded-2xl border-0 transition-all duration-300 transform hover:scale-105 shadow-lg text-lg ${
                isKundenLogin 
                  ? 'bg-gradient-to-r from-[#9D00FF] to-[#FF00A6]' 
                  : 'bg-gradient-to-r from-[#00F0FF] to-[#9D00FF]'
              }`}
              style={{
                boxShadow: isKundenLogin 
                  ? '0 0 30px rgba(157, 0, 255, 0.5), 0 0 60px rgba(255, 0, 166, 0.3)'
                  : '0 0 30px rgba(0, 240, 255, 0.5), 0 0 60px rgba(157, 0, 255, 0.3)'
              }}
            >
              {isKundenLogin ? 'Als Kunde anmelden' : 'Als Berater anmelden'}
            </Button>
          </div>
          
          <div className="flex justify-center">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={onClose} 
              className="text-white/70 hover:text-white hover:bg-white/10 py-3 px-6 rounded-2xl transition-all duration-300 font-medium"
            >
              Abbrechen
            </Button>
          </div>
        </form>
        
        <p className="text-white/60 text-sm mt-8 text-center">
          {isKundenLogin 
            ? 'Noch kein Konto? Kontaktieren Sie unseren Support.' 
            : 'Berater-Account beantragen? Kontakt: vertrieb@ohnequatschdeals.de'
          }
        </p>
      </div>
    </div>
  );
};