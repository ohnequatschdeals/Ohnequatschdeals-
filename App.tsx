import React, { useState, useMemo, Suspense } from "react";
import { Header } from "./components/design-system/Header";
import { HomePage } from "./components/design-system/HomePage";
import { WarumWirPage } from "./components/WarumWirPage";
import { AngebotePage } from "./components/AngebotePage";
import { BeraterPage } from "./components/BeraterPage";
import { BeraterProfilPage } from "./components/BeraterProfilPage";
import { AlleBeraterPage } from "./components/AlleBeraterPage";
import { ChatBot } from "./components/ChatBot";
import { AdminDashboard } from "./components/AdminDashboard";
import { BeraterLoginPage } from "./components/BeraterLoginPage";
import { AdminLoginPage } from "./components/AdminLoginPage";
import { AIConsultantDemo } from "./components/AIConsultantDemo";
import { AIConsultantChatPage } from "./components/AIConsultantChatPage";
import { AIConsultantFloatingAvatar } from "./components/AIConsultantFloatingAvatar";
import { OQDBeraterChatPage } from "./components/OQDBeraterChatPage";
import { KundenbereichLoginPage } from "./components/KundenbereichLoginPage";
import { ButtonQAPage } from "./components/ButtonQAPage";
import { Footer } from "./components/Footer";

// Loading component for better UX during page transitions
const LoadingSpinner: React.FC = () => (
  <div 
    className="min-h-screen flex items-center justify-center"
    style={{ backgroundColor: "#0E0F1A" }}
  >
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-[#FF3F87]/30 border-t-[#FF3F87] rounded-full animate-spin" />
      <p className="text-[#D8D8D8]/70 text-sm">Lade...</p>
    </div>
  </div>
);

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div 
          className="min-h-screen flex items-center justify-center text-white p-8"
          style={{ backgroundColor: "#0E0F1A" }}
        >
          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-[#FF3F87]">
              Oops! Etwas ist schiefgelaufen
            </h2>
            <p className="text-[#D8D8D8]/70 mb-6">
              Die Anwendung ist auf einen unerwarteten Fehler gestoßen. 
              Bitte laden Sie die Seite neu.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-[#FF3F87] to-[#A020F0] rounded-xl text-white font-medium hover:shadow-lg transition-all"
            >
              Seite neu laden
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Static page component for better performance
const StaticPage: React.FC<{ title: string; content: string }> = React.memo(({ title, content }) => (
  <div className="min-h-screen text-white overflow-x-hidden" style={{ backgroundColor: '#0E0F1A' }}>
    <div className="content-max-width pt-32 px-4 sm:px-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 gradient-text">
        {title}
      </h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-[#D8D8D8]/80 overflow-safe">
          {content}
        </p>
        {title === "Impressum" && (
          <p className="text-[#D8D8D8]/80 overflow-safe mt-4">
            <strong>Kontakt:</strong><br />
            OhneQuatschDeals.de<br />
            63450 Hanau, Deutschland<br />
            E-Mail: vertrieb@ohnequatschdeals.de<br />
            WhatsApp: +49 173 7189542
          </p>
        )}
      </div>
    </div>
  </div>
));

StaticPage.displayName = 'StaticPage';

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Memoize the page rendering to prevent unnecessary re-renders
  const renderPage = useMemo(() => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "angebote":
        return <AngebotePage category="all" onNavigate={setCurrentPage} />;
      case "warum-wir":
        return <WarumWirPage onNavigate={setCurrentPage} />;
      case "internet-tv":
        return <AngebotePage category="internet-tv" onNavigate={setCurrentPage} />;
      case "mobilfunk":
        return <AngebotePage category="mobilfunk" onNavigate={setCurrentPage} />;
      case "strom-gas":
        return <AngebotePage category="strom-gas" onNavigate={setCurrentPage} />;
      case "kredite":
        return <AngebotePage category="kredite" onNavigate={setCurrentPage} />;
      case "berater":
        return <BeraterPage onNavigate={setCurrentPage} />;
      case "alle-berater":
        return <AlleBeraterPage onNavigate={setCurrentPage} />;
      case "berater-profil":
        return <BeraterProfilPage onNavigate={setCurrentPage} />;
      case "admin":
        return <AdminDashboard onNavigate={setCurrentPage} />;
      case "berater-login":
        return <BeraterLoginPage onNavigate={setCurrentPage} />;
      case "admin-login":
        return <AdminLoginPage onNavigate={setCurrentPage} />;
      case "ai-consultant-demo":
        return <AIConsultantDemo onNavigate={setCurrentPage} />;
      case "ai-consultant-chat":
        return <AIConsultantChatPage onNavigate={setCurrentPage} />;
      case "oqd-berater-chat":
        return <OQDBeraterChatPage onNavigate={setCurrentPage} />;
      case "ai-consultant":
        return (
          <div className="min-h-screen" style={{ backgroundColor: "#0E0F1A" }}>
            <AIConsultantFloatingAvatar 
              onStartConsultation={() => setCurrentPage("ai-consultant-chat")} 
            />
          </div>
        );
      case "button-qa":
        return <ButtonQAPage onNavigate={setCurrentPage} />;
      case "impressum":
        return (
          <StaticPage
            title="Impressum"
            content="Diese Seite befindet sich noch im Aufbau. Das vollständige Impressum wird in Kürze verfügbar sein."
          />
        );
      case "datenschutz":
        return (
          <StaticPage
            title="Datenschutzerklärung"
            content="Diese Seite befindet sich noch im Aufbau. Die vollständige Datenschutzerklärung wird in Kürze verfügbar sein."
          />
        );
      case "agb":
        return (
          <StaticPage
            title="Allgemeine Geschäftsbedingungen"
            content="Diese Seite befindet sich noch im Aufbau. Die vollständigen AGB werden in Kürze verfügbar sein."
          />
        );
      case "bedarfsanalyse":
        return (
          <StaticPage
            title="Bedarfsanalyse"
            content="Diese Funktion befindet sich noch in der Entwicklung. Die Bedarfsanalyse wird in Kürze verfügbar sein."
          />
        );
      case "vergleich":
        return (
          <StaticPage
            title="Angebotsvergleich"
            content="Diese Funktion befindet sich noch in der Entwicklung. Der Angebotsvergleich wird in Kürze verfügbar sein."
          />
        );
      case "upload":
        return (
          <StaticPage
            title="Vertrag hochladen"
            content="Diese Funktion befindet sich noch in der Entwicklung. Der Vertragsupload wird in Kürze verfügbar sein."
          />
        );
      case "kundenbereich":
        return <KundenbereichLoginPage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  }, [currentPage]);

  // Prevent layout shifts with consistent container styling
  const containerStyle = useMemo(() => ({
    minHeight: '100vh',
    backgroundColor: '#0E0F1A',
    position: 'relative' as const,
    overflowX: 'hidden' as const
  }), []);

  return (
    <ErrorBoundary>
      <div className="overflow-x-hidden" style={containerStyle}>
        <Header 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
        />
        <main className="relative z-10">
          <Suspense fallback={<LoadingSpinner />}>
            {renderPage}
          </Suspense>
        </main>
        <Footer onNavigate={setCurrentPage} />
        <ChatBot />
      </div>
    </ErrorBoundary>
  );
}