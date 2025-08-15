import React, { useState, useEffect } from 'react';
import { Button } from './design-system/Button';
import { Card, CardContent } from './design-system/Card';
import { 
  Mail, 
  Lock, 
  QrCode, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface BeraterLoginPageProps {
  onNavigate: (page: string) => void;
}

export const BeraterLoginPage: React.FC<BeraterLoginPageProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to berater dashboard or home
      onNavigate('berater');
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Implement social login logic
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: '#0E0F1A' }}
    >
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-[#FF3F87]/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-16 w-32 h-32 bg-[#00D0C0]/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#A020F0]/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Back Button */}
      <button
        onClick={() => onNavigate('home')}
        className="fixed top-24 left-6 z-50 p-3 rounded-full transition-all duration-300 hover:scale-110 md:top-28 md:left-8"
        style={{
          background: 'rgba(26, 14, 35, 0.6)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(216, 216, 216, 0.1)',
          color: '#00D0C0'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 208, 192, 0.3)';
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
            background: 'rgba(26, 14, 35, 0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(216, 216, 216, 0.1)',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 63, 135, 0.1)'
          }}
        >
          <CardContent className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span 
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #FF3F87 0%, #00D0C0 100%)'
                  }}
                >
                  Berater Login
                </span>
              </h1>
              <p className="text-[#D8D8D8]/70">
                Willkommen zurück! Melden Sie sich in Ihrem Berater-Account an.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#D8D8D8]">
                  E-Mail
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#D8D8D8]/50" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-[#D8D8D8] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF3F87]/50"
                    style={{
                      background: 'rgba(26, 14, 35, 0.5)',
                      border: '1px solid rgba(216, 216, 216, 0.1)',
                      backdropFilter: 'blur(8px)'
                    }}
                    placeholder="berater@ohnequatschdeals.de"
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
                    className="w-full pl-10 pr-12 py-3 rounded-lg text-[#D8D8D8] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF3F87]/50"
                    style={{
                      background: 'rgba(26, 14, 35, 0.5)',
                      border: '1px solid rgba(216, 216, 216, 0.1)',
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
                
                {/* Forgot Password Link */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => console.log('Forgot password')}
                    className="text-sm text-[#00D0C0] hover:text-[#FF3F87] transition-colors duration-300"
                  >
                    Passwort vergessen?
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
                style={{
                  background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)',
                  border: 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.boxShadow = '0 0 25px rgba(255, 63, 135, 0.5)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 63, 135, 0.3)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Anmeldung läuft...
                  </div>
                ) : (
                  'Einloggen'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D8D8D8]/20 to-transparent" />
              <span className="px-4 text-sm text-[#D8D8D8]/60">Oder anmelden mit</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#D8D8D8]/20 to-transparent" />
            </div>

            {/* Social Login */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Google Login */}
                <button
                  onClick={() => handleSocialLogin('google')}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(26, 14, 35, 0.4)',
                    border: '1px solid rgba(216, 216, 216, 0.1)',
                    backdropFilter: 'blur(8px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 208, 192, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-[#D8D8D8] text-sm">Google</span>
                </button>

                {/* Facebook Login */}
                <button
                  onClick={() => handleSocialLogin('facebook')}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: 'rgba(26, 14, 35, 0.4)',
                    border: '1px solid rgba(216, 216, 216, 0.1)',
                    backdropFilter: 'blur(8px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 208, 192, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-[#D8D8D8] text-sm">Facebook</span>
                </button>
              </div>

              {/* QR Code Login Preview */}
              <div className="relative">
                <button
                  disabled
                  className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg transition-all duration-300 cursor-not-allowed opacity-60"
                  style={{
                    background: 'rgba(26, 14, 35, 0.4)',
                    border: '1px solid rgba(216, 216, 216, 0.1)',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <QrCode className="w-5 h-5 text-[#00D0C0]" />
                  <span className="text-[#D8D8D8] text-sm">QR-Code Login</span>
                </button>
                
                {/* "Coming Soon" Badge */}
                <div 
                  className="absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                  style={{
                    background: 'rgba(255, 209, 102, 0.2)',
                    border: '1px solid rgba(255, 209, 102, 0.3)',
                    color: '#FFD166',
                    backdropFilter: 'blur(8px)'
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  Demnächst verfügbar
                </div>
              </div>
            </div>

            {/* Register Link */}
            <div className="mt-8 text-center">
              <p className="text-[#D8D8D8]/70">
                Neu als Berater?{' '}
                <button
                  onClick={() => console.log('Navigate to registration')}
                  className="text-[#00D0C0] hover:text-[#FF3F87] transition-colors duration-300 font-medium"
                >
                  Jetzt registrieren
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};