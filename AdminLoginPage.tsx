import React, { useState, useEffect } from 'react';
import { Button } from './design-system/Button';
import { Card, CardContent } from './design-system/Card';
import { 
  User, 
  Lock, 
  Shield, 
  Eye, 
  EyeOff,
  ArrowLeft,
  AlertTriangle
} from 'lucide-react';

interface AdminLoginPageProps {
  onNavigate: (page: string) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFACode, setTwoFACode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [show2FA, setShow2FA] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      if (!show2FA) {
        setShow2FA(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        // Navigate to admin dashboard
        onNavigate('admin');
      }
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#0E0F1A' }}
    >
      {/* Minimal Background Elements - Less glow, more solid */}
      <div className="absolute top-32 left-16 w-24 h-24 bg-[#00D0C0]/6 rounded-full blur-2xl" />
      <div className="absolute bottom-32 right-20 w-20 h-20 bg-[#FF3F87]/5 rounded-full blur-xl" />

      {/* Back Button */}
      <button
        onClick={() => onNavigate('home')}
        className="fixed top-24 left-6 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110 md:top-28 md:left-8"
        style={{
          background: 'rgba(26, 14, 35, 0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(216, 216, 216, 0.2)',
          color: '#00D0C0'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 208, 192, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md mx-4 md:mx-0">
        <Card
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{
            background: 'rgba(26, 14, 35, 0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(216, 216, 216, 0.2)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 15px rgba(0, 208, 192, 0.1)'
          }}
        >
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #FF3F87 0%, #00D0C0 100%)',
                    boxShadow: '0 0 20px rgba(0, 208, 192, 0.3)'
                  }}
                >
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span 
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #FF3F87 0%, #00D0C0 100%)'
                  }}
                >
                  Admin Panel Login
                </span>
              </h1>
              <p className="text-[#D8D8D8]/70">
                Sicherer Zugang zum Administrationsbereich
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-[#D8D8D8]">
                  Benutzername
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D8D8D8]/50" />
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-[#D8D8D8] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00D0C0]/50"
                    style={{
                      background: 'rgba(14, 15, 26, 0.6)',
                      border: '1px solid rgba(216, 216, 216, 0.2)',
                      backdropFilter: 'blur(8px)'
                    }}
                    placeholder="admin"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#D8D8D8]">
                  Passwort
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D8D8D8]/50" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 rounded-lg text-[#D8D8D8] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00D0C0]/50"
                    style={{
                      background: 'rgba(14, 15, 26, 0.6)',
                      border: '1px solid rgba(216, 216, 216, 0.2)',
                      backdropFilter: 'blur(8px)'
                    }}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#D8D8D8]/50 hover:text-[#00D0C0] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* 2FA Field (shown after initial login attempt) */}
              {show2FA && (
                <div className="space-y-2">
                  <label htmlFor="twofa" className="block text-sm font-medium text-[#D8D8D8]">
                    2FA Code
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D8D8D8]/50" />
                    <input
                      id="twofa"
                      type="text"
                      value={twoFACode}
                      onChange={(e) => setTwoFACode(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg text-[#D8D8D8] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00D0C0]/50"
                      style={{
                        background: 'rgba(14, 15, 26, 0.6)',
                        border: '1px solid rgba(216, 216, 216, 0.2)',
                        backdropFilter: 'blur(8px)'
                      }}
                      placeholder="000000"
                      maxLength={6}
                      required
                    />
                  </div>
                  <p className="text-xs text-[#D8D8D8]/60">
                    Geben Sie den 6-stelligen Code aus Ihrer Authenticator-App ein.
                  </p>
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
                style={{
                  background: 'linear-gradient(135deg, #00D0C0 0%, #008B8B 100%)',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(0, 208, 192, 0.5)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 208, 192, 0.3)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {show2FA ? 'Verifizierung läuft...' : 'Anmeldung läuft...'}
                  </div>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    {show2FA ? 'Zugang gewähren' : 'Login'}
                  </>
                )}
              </Button>
            </form>

            {/* Security Warning */}
            <div 
              className="mt-8 p-4 rounded-lg flex items-start gap-3"
              style={{
                background: 'rgba(255, 215, 0, 0.1)',
                border: '1px solid rgba(255, 215, 0, 0.2)'
              }}
            >
              <AlertTriangle className="w-5 h-5 text-[#FFD166] mt-0.5 shrink-0" />
              <div>
                <p className="text-[#FFD166] text-sm font-medium mb-1">
                  Sicherheitshinweis
                </p>
                <p className="text-[#D8D8D8]/70 text-xs leading-relaxed">
                  Zugriff nur für autorisierte Administratoren. Alle Aktivitäten werden protokolliert und überwacht.
                </p>
              </div>
            </div>

            {/* Additional Security Info */}
            <div className="mt-6 text-center">
              <p className="text-[#D8D8D8]/50 text-xs">
                Bei Problemen wenden Sie sich an den Systemadministrator
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};