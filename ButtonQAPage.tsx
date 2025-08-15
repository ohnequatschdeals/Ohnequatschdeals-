import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TestTube, 
  MousePointer, 
  ExternalLink,
  Smartphone,
  MessageCircle,
  Share2,
  Settings,
  User,
  Home,
  Package,
  Users,
  HelpCircle,
  LogIn,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';

interface ButtonTest {
  id: string;
  name: string;
  section: string;
  link: string;
  action: string;
  status: 'ok' | 'check' | 'error';
  description: string;
  component: string;
  testNotes?: string;
}

interface ButtonQAPageProps {
  onNavigate: (page: string) => void;
}

export const ButtonQAPage: React.FC<ButtonQAPageProps> = ({ onNavigate }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSection, setFilterSection] = useState<string>('all');

  // Vollständige Button-Liste mit Testergebnissen
  const buttonTests: ButtonTest[] = [
    // Header/Navigation Buttons
    {
      id: 'nav-home',
      name: 'Home',
      section: 'Navigation',
      link: 'home',
      action: 'Navigation zu Startseite',
      status: 'ok',
      description: 'Führt zur Hauptseite mit Hero-Sektion und KI-Berater',
      component: 'Header.tsx',
      testNotes: 'Funktioniert korrekt, Seite lädt vollständig'
    },
    {
      id: 'nav-angebote',
      name: 'Angebote',
      section: 'Navigation',
      link: 'angebote',
      action: 'Navigation zu Angebote-Übersicht',
      status: 'ok',
      description: 'Zeigt alle verfügbaren Angebotskategorien',
      component: 'Header.tsx',
      testNotes: 'AngebotePage lädt mit category="all"'
    },
    {
      id: 'nav-berater',
      name: 'Berater',
      section: 'Navigation',
      link: 'berater',
      action: 'Navigation zu Berater-Übersicht',
      status: 'ok',
      description: 'Übersicht aller verfügbaren Berater mit QR-Codes',
      component: 'Header.tsx',
      testNotes: 'BeraterPage lädt korrekt'
    },
    {
      id: 'nav-warum-wir',
      name: 'Warum wir?',
      section: 'Navigation',
      link: 'warum-wir',
      action: 'Navigation zu Über uns Seite',
      status: 'ok',
      description: 'Informationen über OhneQuatschDeals Vorteile',
      component: 'Header.tsx',
      testNotes: 'WarumWirPage lädt korrekt'
    },
    {
      id: 'nav-login',
      name: 'Login',
      section: 'Navigation',
      link: 'kundenbereich',
      action: 'Navigation zum Kundenbereich',
      status: 'check',
      description: 'Kundenbereich-Login (in Entwicklung)',
      component: 'Header.tsx',
      testNotes: 'Zeigt Placeholder-Seite, Funktion noch nicht implementiert'
    },
    {
      id: 'nav-cta',
      name: 'Jetzt beraten lassen',
      section: 'Navigation',
      link: 'ai-consultant-chat',
      action: 'Navigation zum KI-Berater Chat',
      status: 'ok',
      description: 'Direkter Zugang zum KI-Berater Chat',
      component: 'Header.tsx',
      testNotes: 'AIConsultantChatPage lädt korrekt'
    },

    // Hero Section Buttons (HomePage)
    {
      id: 'hero-angebote',
      name: 'Angebote entdecken',
      section: 'Hero Section',
      link: 'angebote',
      action: 'Scroll/Navigation zu Angeboten',
      status: 'ok',
      description: 'Hauptaktion der Homepage - führt zu Angebots-Übersicht',
      component: 'HomePage.tsx',
      testNotes: 'Button funktioniert, AngebotePage lädt'
    },
    {
      id: 'hero-berater',
      name: 'Berater finden',
      section: 'Hero Section',
      link: 'berater',
      action: 'Navigation zu Berater-Seite',
      status: 'ok',
      description: 'Sekundäre Aktion - führt zu Berater-Übersicht',
      component: 'HomePage.tsx',
      testNotes: 'BeraterPage lädt mit Berater-Liste'
    },

    // KI-Berater Buttons
    {
      id: 'ai-language',
      name: 'Sprachauswahl',
      section: 'KI-Berater',
      link: '#',
      action: 'Dropdown für Sprachwechsel',
      status: 'ok',
      description: '12 Sprachen verfügbar (DE, EN, FR, ES, IT, PT, NL, PL, TR, RU, ZH, AR)',
      component: 'AvatarLeftChatRightConsultant.tsx',
      testNotes: 'Select-Dropdown funktioniert, Sprache wird gewechselt'
    },
    {
      id: 'ai-voice',
      name: 'Voice Input',
      section: 'KI-Berater',
      link: '#',
      action: 'Toggle Voice Recording',
      status: 'check',
      description: 'Mikrofon-Button für Spracheingabe',
      component: 'AvatarLeftChatRightConsultant.tsx',
      testNotes: 'UI funktioniert, aber Speech-to-Text noch nicht implementiert'
    },
    {
      id: 'ai-send',
      name: 'Senden',
      section: 'KI-Berater',
      link: '#',
      action: 'Nachricht an KI senden',
      status: 'ok',
      description: 'Sendet Chat-Nachricht an KI-Berater',
      component: 'AvatarLeftChatRightConsultant.tsx',
      testNotes: 'Chat funktioniert, KI antwortet mit vorgefertigten Antworten'
    },
    {
      id: 'ai-chat-start',
      name: 'Chat starten',
      section: 'KI-Berater',
      link: 'ai-consultant-chat',
      action: 'Navigation zu Full-Screen Chat',
      status: 'ok',
      description: 'Öffnet dedizierten Chat-Bereich',
      component: 'HomePage.tsx',
      testNotes: 'AIConsultantChatPage lädt korrekt'
    },

    // Premium-Angebote Buttons
    {
      id: 'offer-internet',
      name: 'Internet & TV Details',
      section: 'Premium-Angebote',
      link: 'internet-tv',
      action: 'Navigation zu Internet/TV Angeboten',
      status: 'ok',
      description: 'Zeigt Internet und TV-Pakete',
      component: 'HomePage.tsx',
      testNotes: 'AngebotePage lädt mit category="internet-tv"'
    },
    {
      id: 'offer-mobilfunk',
      name: 'Mobilfunk Details',
      section: 'Premium-Angebote',
      link: 'mobilfunk',
      action: 'Navigation zu Mobilfunk-Angeboten',
      status: 'ok',
      description: 'Zeigt Mobilfunk-Tarife und Handyverträge',
      component: 'HomePage.tsx',
      testNotes: 'AngebotePage lädt mit category="mobilfunk"'
    },
    {
      id: 'offer-strom-gas',
      name: 'Strom & Gas Details',
      section: 'Premium-Angebote',
      link: 'strom-gas',
      action: 'Navigation zu Energie-Angeboten',
      status: 'ok',
      description: 'Zeigt Strom- und Gas-Tarife',
      component: 'HomePage.tsx',
      testNotes: 'AngebotePage lädt mit category="strom-gas"'
    },
    {
      id: 'offer-kredite',
      name: 'Kredit Details',
      section: 'Premium-Angebote',
      link: 'kredite',
      action: 'Navigation zu Kredit-Angeboten',
      status: 'ok',
      description: 'Zeigt Kreditangebote und Finanzierungsoptionen',
      component: 'HomePage.tsx',
      testNotes: 'AngebotePage lädt mit category="kredite"'
    },

    // Top-Berater Buttons
    {
      id: 'berater-whatsapp',
      name: 'WhatsApp kontaktieren',
      section: 'Top-Berater',
      link: 'https://wa.me/491737189542',
      action: 'Externe WhatsApp-Öffnung',
      status: 'ok',
      description: 'Öffnet WhatsApp mit Berater-Nummer',
      component: 'BeraterPage.tsx',
      testNotes: 'Link funktioniert, öffnet WhatsApp'
    },
    {
      id: 'berater-qr',
      name: 'QR-Code teilen',
      section: 'Top-Berater',
      link: '#',
      action: 'Modal mit QR-Code öffnen',
      status: 'check',
      description: 'Zeigt QR-Code für Berater-Profil',
      component: 'QRCodeModal.tsx',
      testNotes: 'Modal öffnet sich, QR-Code muss noch implementiert werden'
    },

    // Footer Buttons
    {
      id: 'footer-impressum',
      name: 'Impressum',
      section: 'Footer',
      link: 'impressum',
      action: 'Navigation zu Impressum',
      status: 'check',
      description: 'Rechtliche Informationen',
      component: 'Footer.tsx',
      testNotes: 'Placeholder-Seite, Inhalte noch nicht vollständig'
    },
    {
      id: 'footer-datenschutz',
      name: 'Datenschutz',
      section: 'Footer',
      link: 'datenschutz',
      action: 'Navigation zu Datenschutzerklärung',
      status: 'check',
      description: 'Datenschutzbestimmungen',
      component: 'Footer.tsx',
      testNotes: 'Placeholder-Seite, Inhalte noch nicht vollständig'
    },
    {
      id: 'footer-agb',
      name: 'AGB',
      section: 'Footer',
      link: 'agb',
      action: 'Navigation zu Allgemeinen Geschäftsbedingungen',
      status: 'check',
      description: 'Nutzungsbedingungen',
      component: 'Footer.tsx',
      testNotes: 'Placeholder-Seite, Inhalte noch nicht vollständig'
    },
    {
      id: 'footer-kontakt',
      name: 'Kontakt',
      section: 'Footer',
      link: '#',
      action: 'Scroll zu Kontakt-Sektion',
      status: 'check',
      description: 'Kontaktinformationen anzeigen',
      component: 'Footer.tsx',
      testNotes: 'Scroll-Funktion noch nicht implementiert'
    },
    {
      id: 'footer-email',
      name: 'E-Mail Link',
      section: 'Footer',
      link: 'mailto:vertrieb@ohnequatschdeals.de',
      action: 'E-Mail-Client öffnen',
      status: 'ok',
      description: 'Öffnet Standard E-Mail-Client mit Adresse',
      component: 'Footer.tsx',
      testNotes: 'Mailto-Link funktioniert korrekt'
    },
    {
      id: 'footer-phone',
      name: 'Telefon Link',
      section: 'Footer',
      link: 'tel:+491737189542',
      action: 'Telefon-App öffnen',
      status: 'ok',
      description: 'Öffnet Telefon-App mit Nummer',
      component: 'Footer.tsx',
      testNotes: 'Tel-Link funktioniert auf Mobile'
    },
    {
      id: 'footer-whatsapp',
      name: 'WhatsApp Footer',
      section: 'Footer',
      link: 'https://wa.me/491737189542',
      action: 'WhatsApp öffnen',
      status: 'ok',
      description: 'Öffnet WhatsApp mit Firmennummer',
      component: 'Footer.tsx',
      testNotes: 'WhatsApp-Link funktioniert'
    },

    // Social Media Links
    {
      id: 'social-instagram',
      name: 'Instagram',
      section: 'Social Media',
      link: 'https://instagram.com/ohnequatschdeals',
      action: 'Instagram-Profil öffnen',
      status: 'error',
      description: 'Instagram-Seite der Firma',
      component: 'Footer.tsx',
      testNotes: 'Profil noch nicht erstellt'
    },
    {
      id: 'social-facebook',
      name: 'Facebook',
      section: 'Social Media',
      link: 'https://facebook.com/ohnequatschdeals',
      action: 'Facebook-Seite öffnen',
      status: 'error',
      description: 'Facebook-Seite der Firma',
      component: 'Footer.tsx',
      testNotes: 'Seite noch nicht erstellt'
    },
    {
      id: 'social-linkedin',
      name: 'LinkedIn',
      section: 'Social Media',
      link: 'https://linkedin.com/company/ohnequatschdeals',
      action: 'LinkedIn-Profil öffnen',
      status: 'error',
      description: 'LinkedIn-Unternehmensprofil',
      component: 'Footer.tsx',
      testNotes: 'Profil noch nicht erstellt'
    },

    // ChatBot Buttons
    {
      id: 'chatbot-toggle',
      name: 'ChatBot öffnen/schließen',
      section: 'ChatBot',
      link: '#',
      action: 'ChatBot-Modal toggle',
      status: 'ok',
      description: 'Floating ChatBot in rechter unterer Ecke',
      component: 'ChatBot.tsx',
      testNotes: 'ChatBot öffnet und schließt korrekt'
    },
    {
      id: 'chatbot-send',
      name: 'ChatBot Nachricht senden',
      section: 'ChatBot',
      link: '#',
      action: 'Nachricht an ChatBot senden',
      status: 'ok',
      description: 'Interaktion mit ChatBot-System',
      component: 'ChatBot.tsx',
      testNotes: 'ChatBot antwortet mit vorgefertigten Antworten'
    },

    // Admin Dashboard (falls verfügbar)
    {
      id: 'admin-dashboard',
      name: 'Admin Dashboard',
      section: 'Admin',
      link: 'admin',
      action: 'Navigation zu Admin-Bereich',
      status: 'check',
      description: 'Verwaltungsbereich für Berater und Partner',
      component: 'AdminDashboard.tsx',
      testNotes: 'Dashboard lädt, aber Authentifizierung fehlt'
    },

    // Weitere Service-Buttons
    {
      id: 'service-bedarfsanalyse',
      name: 'Bedarfsanalyse',
      section: 'Services',
      link: 'bedarfsanalyse',
      action: 'Navigation zu Bedarfsanalyse-Tool',
      status: 'check',
      description: 'Tool zur Bedarfsermittlung',
      component: 'App.tsx',
      testNotes: 'Placeholder-Seite, Feature in Entwicklung'
    },
    {
      id: 'service-vergleich',
      name: 'Angebotsvergleich',
      section: 'Services',
      link: 'vergleich',
      action: 'Navigation zu Vergleichstool',
      status: 'check',
      description: 'Vergleich verschiedener Angebote',
      component: 'App.tsx',
      testNotes: 'Placeholder-Seite, Feature in Entwicklung'
    },
    {
      id: 'service-upload',
      name: 'Vertrag hochladen',
      section: 'Services',
      link: 'upload',
      action: 'Navigation zu Upload-Bereich',
      status: 'check',
      description: 'Upload bestehender Verträge zur Analyse',
      component: 'App.tsx',
      testNotes: 'Placeholder-Seite, Feature in Entwicklung'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'check':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <TestTube className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ok':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            OK
          </span>
        );
      case 'check':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
            PRÜFEN
          </span>
        );
      case 'error':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
            FEHLER
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/30">
            UNBEKANNT
          </span>
        );
    }
  };

  const filteredTests = buttonTests.filter(test => {
    const statusMatch = filterStatus === 'all' || test.status === filterStatus;
    const sectionMatch = filterSection === 'all' || test.section === filterSection;
    return statusMatch && sectionMatch;
  });

  const sections = [...new Set(buttonTests.map(test => test.section))];
  const statusCounts = {
    ok: buttonTests.filter(t => t.status === 'ok').length,
    check: buttonTests.filter(t => t.status === 'check').length,
    error: buttonTests.filter(t => t.status === 'error').length,
    total: buttonTests.length
  };

  const handleTestButton = (test: ButtonTest) => {
    if (test.link.startsWith('http')) {
      window.open(test.link, '_blank');
    } else if (test.link.startsWith('mailto:') || test.link.startsWith('tel:')) {
      window.location.href = test.link;
    } else if (test.link !== '#' && onNavigate) {
      onNavigate(test.link);
    }
  };

  return (
    <div 
      className="min-h-screen text-white"
      style={{ 
        background: 'linear-gradient(180deg, #0E0F1A 0%, #1A0E23 100%)',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div className="content-max-width pt-32 pb-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div 
              className="p-4 rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 63, 135, 0.2) 0%, rgba(0, 208, 192, 0.2) 100%)',
                border: '1px solid rgba(255, 63, 135, 0.3)'
              }}
            >
              <TestTube className="w-8 h-8 text-[#FF3F87]" />
            </div>
            <div>
              <h1 className="gradient-text mb-2">🔍 Button-Testplan</h1>
              <p className="text-[#D8D8D8]/80 text-lg">
                Systematische Qualitätssicherung aller interaktiven Elemente
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div 
              className="p-6 rounded-xl text-center glass-morphism"
              style={{ border: '1px solid rgba(0, 208, 192, 0.3)' }}
            >
              <div className="text-2xl font-bold text-[#00D0C0] mb-2">{statusCounts.total}</div>
              <div className="text-sm text-[#D8D8D8]/80">Gesamt</div>
            </div>
            <div 
              className="p-6 rounded-xl text-center glass-morphism"
              style={{ border: '1px solid rgba(34, 197, 94, 0.3)' }}
            >
              <div className="text-2xl font-bold text-green-400 mb-2">{statusCounts.ok}</div>
              <div className="text-sm text-[#D8D8D8]/80">Funktioniert</div>
            </div>
            <div 
              className="p-6 rounded-xl text-center glass-morphism"
              style={{ border: '1px solid rgba(234, 179, 8, 0.3)' }}
            >
              <div className="text-2xl font-bold text-yellow-400 mb-2">{statusCounts.check}</div>
              <div className="text-sm text-[#D8D8D8]/80">Zu prüfen</div>
            </div>
            <div 
              className="p-6 rounded-xl text-center glass-morphism"
              style={{ border: '1px solid rgba(239, 68, 68, 0.3)' }}
            >
              <div className="text-2xl font-bold text-red-400 mb-2">{statusCounts.error}</div>
              <div className="text-sm text-[#D8D8D8]/80">Fehler</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2">
              <label className="text-[#D8D8D8] font-medium">Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 rounded-lg bg-[#1A0E23] border border-[#FF3F87]/30 text-[#D8D8D8] focus:border-[#FF3F87] outline-none"
              >
                <option value="all">Alle</option>
                <option value="ok">OK</option>
                <option value="check">Prüfen</option>
                <option value="error">Fehler</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-[#D8D8D8] font-medium">Bereich:</label>
              <select
                value={filterSection}
                onChange={(e) => setFilterSection(e.target.value)}
                className="px-4 py-2 rounded-lg bg-[#1A0E23] border border-[#00D0C0]/30 text-[#D8D8D8] focus:border-[#00D0C0] outline-none"
              >
                <option value="all">Alle Bereiche</option>
                {sections.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Legend */}
          <div 
            className="p-6 rounded-xl glass-morphism mb-8"
            style={{ border: '1px solid rgba(216, 216, 216, 0.1)' }}
          >
            <h3 className="text-[#D8D8D8] font-semibold mb-4">Farbkodierung:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-400/40 rounded border border-green-400/60"></div>
                <span className="text-[#D8D8D8]/80">Grün = Funktion getestet, OK</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-yellow-400/40 rounded border border-yellow-400/60"></div>
                <span className="text-[#D8D8D8]/80">Gelb = Funktion prüfen</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-400/40 rounded border border-red-400/60"></div>
                <span className="text-[#D8D8D8]/80">Rot = Fehler oder kein Link</span>
              </div>
            </div>
          </div>
        </div>

        {/* Button Tests Grid */}
        <div className="space-y-6">
          {filteredTests.map((test) => (
            <div
              key={test.id}
              className="relative p-6 rounded-xl glass-morphism hover:scale-[1.02] transition-all duration-300"
              style={{
                border: `1px solid ${
                  test.status === 'ok' ? 'rgba(34, 197, 94, 0.3)' :
                  test.status === 'check' ? 'rgba(234, 179, 8, 0.3)' :
                  test.status === 'error' ? 'rgba(239, 68, 68, 0.3)' :
                  'rgba(156, 163, 175, 0.3)'
                }`
              }}
            >
              {/* Status Overlay */}
              <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-xl"
                style={{
                  background: test.status === 'ok' ? 'rgba(34, 197, 94, 0.05)' :
                             test.status === 'check' ? 'rgba(234, 179, 8, 0.05)' :
                             test.status === 'error' ? 'rgba(239, 68, 68, 0.05)' :
                             'rgba(156, 163, 175, 0.05)'
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(test.status)}
                    <div>
                      <h3 className="text-[#D8D8D8] font-semibold text-lg">{test.name}</h3>
                      <p className="text-[#D8D8D8]/60 text-sm">{test.section}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(test.status)}
                    <button
                      onClick={() => handleTestButton(test)}
                      className="p-2 rounded-lg bg-[#FF3F87]/20 hover:bg-[#FF3F87]/30 transition-colors border border-[#FF3F87]/30"
                      title="Button testen"
                    >
                      <MousePointer className="w-4 h-4 text-[#FF3F87]" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-3">
                      <span className="text-[#00D0C0] font-medium text-sm">Link/Interaktion:</span>
                      <p className="text-[#D8D8D8]/80 font-mono text-sm mt-1">
                        {test.link}
                        {test.link.startsWith('http') && (
                          <ExternalLink className="w-3 h-3 inline ml-1" />
                        )}
                      </p>
                    </div>
                    <div className="mb-3">
                      <span className="text-[#00D0C0] font-medium text-sm">Aktion:</span>
                      <p className="text-[#D8D8D8]/80 text-sm mt-1">{test.action}</p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-3">
                      <span className="text-[#FFD166] font-medium text-sm">Beschreibung:</span>
                      <p className="text-[#D8D8D8]/80 text-sm mt-1">{test.description}</p>
                    </div>
                    <div className="mb-3">
                      <span className="text-[#FFD166] font-medium text-sm">Komponente:</span>
                      <p className="text-[#D8D8D8]/80 font-mono text-sm mt-1">{test.component}</p>
                    </div>
                  </div>
                </div>

                {test.testNotes && (
                  <div className="mt-4 p-4 rounded-lg bg-[#1A0E23]/50 border border-[#FF3F87]/20">
                    <span className="text-[#FF3F87] font-medium text-sm">Testergebnis:</span>
                    <p className="text-[#D8D8D8]/80 text-sm mt-1">{test.testNotes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #FF3F87 0%, #A020F0 100%)',
              boxShadow: '0 0 25px rgba(255, 63, 135, 0.4)'
            }}
          >
            <Home className="w-5 h-5 inline mr-2" />
            Zurück zur Startseite
          </button>
        </div>
      </div>
    </div>
  );
};