import React, { useState, useEffect } from 'react';
import { Button } from './design-system/Button';
import { Card, CardContent, CardHeader } from './design-system/Card';
import { IconContainer } from './design-system/IconContainer';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Shield, CheckCircle } from 'lucide-react';

interface KundenbereichLoginPageProps {
  onNavigate: (page: string) => void;
}

export const KundenbereichLoginPage: React.FC<KundenbereichLoginPageProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Here you would implement actual login logic
      console.log('Login attempt:', { email, password, rememberMe });
    }, 2000);
  };

  const features = [
    {
      icon: User,
      title: 'Persönlicher Kundenbereich',
      description: 'Verwalten Sie Ihre Verträge und Angebote an einem Ort'
    },
    {
      icon: Shield,
      title: 'Sichere Datenübertragung',
      description: 'SSL-verschlüsselte Verbindung für Ihre Sicherheit'
    },
    {
      icon: CheckCircle,
      title: 'Exklusive Angebote',
      description: 'Zugang zu besonderen Deals nur für registrierte Kunden'
    }
  ];

  return (
    <div className="min-h-screen overflow-x-hidden relative" style={{ backgroundColor: '#0E0F1A' }}>
      
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #0E0F1A 0%, #1A0E23 30%, rgba(255, 63, 135, 0.08) 70%, rgba(0, 208, 192, 0.12) 100%)'
        }}
      />
      
      {/* Floating background elements */}
      <div className="absolute top-20 left-4 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-[#FF3F87]/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-40 right-4 sm:right-16 w-20 sm:w-24 h-20 sm:h-24 bg-[#00D0C0]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-4 sm:left-20 w-32 sm:w-40 h-32 sm:h-40 bg-[#A020F0]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Header */}
      <div className="relative z-10 pt-24 sm:pt-32 pb-8">
        <div className="content-max-width px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 button-safe"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Zurück</span>
            </Button>
          </div>
          
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text overflow-safe">
              Kundenbereich Login
            </h1>
            <p className="text-lg sm:text-xl text-[#D8D8D8]/80 max-w-2xl mx-auto overflow-safe">
              Melden Sie sich an, um Ihre Verträge zu verwalten und exklusive Angebote zu erhalten.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pb-16">
        <div className="content-max-width px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* Left Column - Login Form */}
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.2s' }}>
              <Card variant="glass" className="overflow-hidden">
                <CardHeader className="text-center border-b border-[#D8D8D8]/10 pb-6">
                  <div className="flex items-center justify-center mb-4">
                    <IconContainer variant="gradient" size="lg">
                      <User className="w-8 h-8" />
                    </IconContainer>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Willkommen zurück
                  </h2>
                  <p className="text-[#D8D8D8]/70 overflow-safe">
                    Loggen Sie sich in Ihren Kundenbereich ein
                  </p>
                </CardHeader>
                
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium text-[#D8D8D8]">
                        E-Mail-Adresse
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-[#D8D8D8]/50" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-xl glass-morphism border border-[#D8D8D8]/10 text-[#D8D8D8] placeholder-[#D8D8D8]/50 focus:outline-none focus:ring-2 focus:ring-[#FF3F87]/50 focus:border-[#FF3F87]/50 transition-all overflow-safe"
                          placeholder="ihre.email@beispiel.de"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-medium text-[#D8D8D8]">
                        Passwort
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="h-5 w-5 text-[#D8D8D8]/50" />
                        </div>
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full pl-10 pr-12 py-3 rounded-xl glass-morphism border border-[#D8D8D8]/10 text-[#D8D8D8] placeholder-[#D8D8D8]/50 focus:outline-none focus:ring-2 focus:ring-[#FF3F87]/50 focus:border-[#FF3F87]/50 transition-all overflow-safe"
                          placeholder="Ihr Passwort"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#D8D8D8]/50 hover:text-[#D8D8D8] transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${rememberMe ? 'bg-[#FF3F87] border-[#FF3F87]' : 'border-[#D8D8D8]/30'}`}>
                          {rememberMe && (
                            <CheckCircle className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className="ml-2 text-sm text-[#D8D8D8]/70 overflow-safe">
                          Angemeldet bleiben
                        </span>
                      </label>
                      
                      <button
                        type="button"
                        className="text-sm text-[#00D0C0] hover:text-[#00D0C0]/80 transition-colors overflow-safe"
                      >
                        Passwort vergessen?
                      </button>
                    </div>

                    {/* Login Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isLoading}
                      className="w-full button-safe"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Anmelden...</span>
                        </div>
                      ) : (
                        'Anmelden'
                      )}
                    </Button>

                    {/* Register Link */}
                    <div className="text-center pt-4 border-t border-[#D8D8D8]/10">
                      <p className="text-[#D8D8D8]/70 text-sm overflow-safe">
                        Noch kein Kunde? {' '}
                        <button
                          type="button"
                          className="text-[#00D0C0] hover:text-[#00D0C0]/80 transition-colors font-medium"
                        >
                          Jetzt registrieren
                        </button>
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Features */}
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '0.4s' }}>
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text overflow-safe">
                    Ihre Vorteile
                  </h3>
                  <p className="text-[#D8D8D8]/80 overflow-safe">
                    Profitieren Sie von unserem Kundenbereich
                  </p>
                </div>

                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  
                  return (
                    <Card
                      key={index}
                      variant="glass"
                      className={`transition-all duration-500 hover:scale-105 hover-glow-turquoise ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                      style={{ transitionDelay: `${0.6 + index * 0.1}s` }}
                    >
                      <CardContent className="p-6 flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <IconContainer variant="turquoise" size="md">
                            <IconComponent className="w-6 h-6" />
                          </IconContainer>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2 overflow-safe">
                            {feature.title}
                          </h4>
                          <p className="text-[#D8D8D8]/70 text-sm leading-relaxed overflow-safe">
                            {feature.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {/* Contact Support */}
                <Card variant="glass" className="glow-pink">
                  <CardContent className="p-6 text-center">
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Brauchen Sie Hilfe?
                    </h4>
                    <p className="text-[#D8D8D8]/70 text-sm mb-4 overflow-safe">
                      Unser Support-Team steht Ihnen gerne zur Verfügung
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="secondary" size="sm" className="flex-1 button-safe">
                        <Mail className="w-4 h-4 mr-2" />
                        E-Mail Support
                      </Button>
                      <Button variant="secondary" size="sm" className="flex-1 button-safe">
                        💬 WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};