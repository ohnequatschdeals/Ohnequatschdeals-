import React, { useEffect, useState } from 'react';
import { Button } from './design-system/Button';
import { Card, CardContent } from './design-system/Card';
import { Badge } from './ui/badge';
import { 
  Shield, 
  CheckCircle, 
  Users, 
  Award, 
  Download, 
  FileText, 
  AlertCircle,
  Phone,
  MessageCircle,
  ArrowLeft
} from 'lucide-react';

interface WarumWirPageProps {
  onNavigate: (page: string) => void;
}

export const WarumWirPage: React.FC<WarumWirPageProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const advantages = [
    {
      icon: Shield,
      title: 'Digitale + Persönliche Beratung',
      description: 'Wir kombinieren moderne digitale Tools mit echter menschlicher Beratung. Sie bekommen das Beste aus beiden Welten – schnell, effizient und trotzdem persönlich.',
      details: [
        'AI-gestützter Chatbot für schnelle Antworten',
        'Persönliche Berater über WhatsApp erreichbar',
        'Video-Beratung nach Terminvereinbarung',
        '24/7 Online-Support verfügbar'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Keine versteckten Kosten',
      description: 'Transparenz ist unser Prinzip. Alle Kosten werden im Voraus kommuniziert. Keine bösen Überraschungen, keine versteckten Gebühren.',
      details: [
        'Alle Preise transparent dargestellt',
        'Keine versteckten Zusatzkosten',
        'Vertragsdetails vor Abschluss erläutert',
        'Widerrufsrecht vollständig erklärt'
      ]
    },
    {
      icon: Users,
      title: 'Schutz vor unseriösen Außendienstlern',
      description: 'Wir schützen Sie vor unseriösen Praktiken mancher Außendienstmitarbeiter. Unsere Berater sind geprüft und arbeiten nach strengen Qualitätsstandards.',
      details: [
        'Alle Berater durchlaufen Qualitätsprüfung',
        'Regelmäßige Schulungen und Kontrollen',
        'Dokumentationspflicht für alle Beratungen',
        'Sofortiger Ausschluss bei Missbrauch'
      ]
    },
    {
      icon: Award,
      title: 'Faire und transparente Angebote',
      description: 'Wir suchen für Sie die besten Deals aus und präsentieren sie ehrlich. Ohne Tricks, ohne Lockangebote – nur faire Preise für echte Leistungen.',
      details: [
        'Echte Marktvergleiche statt Scheinangebote',
        'Alle Konditionen klar kommuniziert',
        'Realistische Verfügbarkeitsangaben',
        'Faire Kündigungskonditionen'
      ]
    }
  ];

  const downloadItems = [
    {
      icon: FileText,
      title: 'Kündigungsvorlagen',
      description: 'Professionelle Vorlagen für die Kündigung Ihrer bestehenden Verträge',
      formats: ['PDF', 'Word'],
      category: 'Vorlagen'
    },
    {
      icon: CheckCircle,
      title: 'Anbieterwechsel-Checkliste',
      description: 'Schritt-für-Schritt Anleitung für einen problemlosen Anbieterwechsel',
      formats: ['PDF'],
      category: 'Checklisten'
    },
    {
      icon: FileText,
      title: 'Auftragserteilungsformulare',
      description: 'Alle notwendigen Formulare für Ihre Vertragsabschlüsse',
      formats: ['PDF', 'Word'],
      category: 'Formulare'
    },
    {
      icon: AlertCircle,
      title: 'Widerrufsbelehrung',
      description: 'Ihre Rechte und Fristen beim Widerruf von Verträgen',
      formats: ['PDF'],
      category: 'Rechtliches'
    }
  ];

  const handleDownload = (item: any) => {
    // Simulate download
    alert(`${item.title} wird heruntergeladen...`);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0E0F1A' }}>
      {/* Header */}
      <section 
        className="py-16 px-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(26, 14, 35, 0.8) 0%, rgba(14, 15, 26, 0.9) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(216, 216, 216, 0.1)'
        }}
      >
        {/* Background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF3F87]/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-20 right-16 w-24 h-24 bg-[#00D0C0]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <Button 
            variant="secondary"
            onClick={() => onNavigate('home')}
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Startseite
          </Button>
          
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 
              className="mb-6 font-semibold text-center"
              style={{
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #FF3F87 0%, #00D0C0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                textShadow: '0 0 20px rgba(255, 63, 135, 0.2)'
              }}
            >
              Warum OhneQuatschDeals?
            </h1>
            <p 
              className="text-[#D8D8D8] max-w-3xl mx-auto"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
            >
              Wir haben OhneQuatschDeals ins Leben gerufen, weil der Markt voller unseriöser 
              Anbieter und versteckter Kosten ist. Bei uns bekommen Sie ehrliche Beratung 
              und faire Deals – ohne Quatsch.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Advantages */}
      <section className="py-20 px-4" style={{ backgroundColor: '#1A0E23' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div 
                  key={index} 
                  className={`flex flex-col lg:flex-row items-center gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} fade-in-up`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex-1">
                    <div className="flex items-center mb-6">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center text-white mr-4"
                        style={{
                          background: 'linear-gradient(135deg, #00D0C0 0%, #FF3F87 100%)',
                          boxShadow: '0 0 20px rgba(0, 208, 192, 0.4)'
                        }}
                      >
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <h2 
                        className="font-semibold text-[#D8D8D8]"
                        style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
                      >
                        {advantage.title}
                      </h2>
                    </div>
                    <p 
                      className="text-[#D8D8D8]/80 mb-6 leading-relaxed"
                      style={{ fontSize: '1.125rem' }}
                    >
                      {advantage.description}
                    </p>
                    <ul className="space-y-3">
                      {advantage.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-[#00D0C0] mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-[#D8D8D8]/70">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 max-w-md">
                    <div 
                      className="rounded-lg aspect-square flex items-center justify-center"
                      style={{
                        background: 'rgba(26, 14, 35, 0.6)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        border: '1px solid rgba(216, 216, 216, 0.1)'
                      }}
                    >
                      <IconComponent 
                        className="h-24 w-24"
                        style={{
                          color: 'transparent',
                          background: 'linear-gradient(135deg, #FF3F87 0%, #00D0C0 100%)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section 
        className="py-20 px-4"
        style={{
          background: 'rgba(26, 14, 35, 0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderTop: '1px solid rgba(216, 216, 216, 0.1)',
          borderBottom: '1px solid rgba(216, 216, 216, 0.1)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 
              className="mb-4 font-semibold text-center"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #FF3F87 0%, #00D0C0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: 'transparent'
              }}
            >
              Download-Bereich
            </h2>
            <p 
              className="text-[#D8D8D8]/80 max-w-2xl mx-auto"
              style={{ fontSize: '1.125rem' }}
            >
              Laden Sie sich kostenlos alle wichtigen Dokumente herunter, die Sie für 
              Ihren Anbieterwechsel oder Vertragsabschluss benötigen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {downloadItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card 
                  key={index} 
                  variant="glass" 
                  className="hover-scale transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                        style={{
                          background: 'linear-gradient(135deg, #00D0C0 0%, #FF3F87 100%)',
                          boxShadow: '0 0 15px rgba(0, 208, 192, 0.3)'
                        }}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge 
                        className="bg-[#FF3F87]/20 text-[#FF3F87] border-[#FF3F87]/30"
                      >
                        {item.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-[#D8D8D8] mb-2">{item.title}</h3>
                    <p className="text-[#D8D8D8]/70 mb-4 text-sm leading-relaxed">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {item.formats.map((format) => (
                          <Badge 
                            key={format} 
                            className="text-xs bg-[#00D0C0]/20 text-[#00D0C0] border-[#00D0C0]/30"
                          >
                            {format}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handleDownload(item)}
                        className="hover-scale"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Important Notice */}
          <Card 
            variant="glass" 
            className="mt-12"
            style={{
              background: 'rgba(255, 63, 135, 0.1)',
              border: '1px solid rgba(255, 63, 135, 0.2)'
            }}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <AlertCircle className="h-6 w-6 text-[#FF3F87] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="mb-2 text-[#D8D8D8] font-semibold">Wichtiger Hinweis</h3>
                  <p className="text-[#D8D8D8]/80 text-sm leading-relaxed">
                    Manche Anbieter erfordern Ihre aktive Mitarbeit beim Wechselprozess. 
                    In diesen Fällen müssen Sie beispielsweise die Kündigung bei Ihrem 
                    aktuellen Anbieter selbst einreichen. Unser AI-Berater kann Ihnen 
                    alle benötigten Dokumente direkt per WhatsApp zusenden und Sie 
                    Schritt für Schritt durch den Prozess führen.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#1A0E23' }}>
        <div className="max-w-4xl mx-auto">
          <Card variant="elevated" glow="auto" padding="xl" className="text-center">
            <div>
              <h2 
                className="mb-6 font-semibold text-center"
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                  fontWeight: '600',
                  background: 'linear-gradient(135deg, #FF3F87 0%, #00D0C0 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: 'transparent'
                }}
              >
                Bereit für ehrliche Beratung?
              </h2>
              <p 
                className="text-[#D8D8D8]/80 mb-8 leading-relaxed"
                style={{ fontSize: '1.25rem' }}
              >
                Lassen Sie sich von unseren Experten beraten oder nutzen Sie unseren AI-Berater 
                für schnelle Antworten. Ohne Quatsch, ohne versteckte Kosten.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => onNavigate('berater')}
                  className="hover-scale"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Berater kontaktieren
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="hover-scale"
                  onClick={() => onNavigate('ai-consultant-chat')}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  AI-Berater starten
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};