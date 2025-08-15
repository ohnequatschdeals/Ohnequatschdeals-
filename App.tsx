import React, { useState } from "react";
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

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} />;
      case "angebote":
        return (
          <AngebotePage
            category="all"
            onNavigate={setCurrentPage}
          />
        );
      case "warum-wir":
        return <WarumWirPage onNavigate={setCurrentPage} />;
      case "internet-tv":
        return (
          <AngebotePage
            category="internet-tv"
            onNavigate={setCurrentPage}
          />
        );
      case "mobilfunk":
        return (
          <AngebotePage
            category="mobilfunk"
            onNavigate={setCurrentPage}
          />
        );
      case "strom-gas":
        return (
          <AngebotePage
            category="strom-gas"
            onNavigate={setCurrentPage}
          />
        );
      case "kredite":
        return (
          <AngebotePage
            category="kredite"
            onNavigate={setCurrentPage}
          />
        );
      case "berater":
        return <BeraterPage onNavigate={setCurrentPage} />;
      case "alle-berater":
        return <AlleBeraterPage onNavigate={setCurrentPage} />;
      case "berater-profil":
        return (
          <BeraterProfilPage onNavigate={setCurrentPage} />
        );
      case "admin":
        return <AdminDashboard onNavigate={setCurrentPage} />;
      case "berater-login":
        return <BeraterLoginPage onNavigate={setCurrentPage} />;
      case "admin-login":
        return <AdminLoginPage onNavigate={setCurrentPage} />;
      case "ai-consultant-demo":
        return <AIConsultantDemo onNavigate={setCurrentPage} />;
      case "ai-consultant-chat":
        return (
          <AIConsultantChatPage onNavigate={setCurrentPage} />
        );
      case "oqd-berater-chat":
        return (
          <OQDBeraterChatPage onNavigate={setCurrentPage} />
        );
      case "ai-consultant":
        return (
          <div
            className="min-h-screen"
            style={{ backgroundColor: "#0E0F1A" }}
          >
            <AIConsultantFloatingAvatar
              onStartConsultation={() =>
                setCurrentPage("ai-consultant-chat")
              }
            />
          </div>
        );
      case "button-qa":
        return <ButtonQAPage onNavigate={setCurrentPage} />;
      case "impressum":
        return (
          <div
            className="min-h-screen text-white overflow-x-hidden"
            style={{ backgroundColor: "#0E0F1A" }}
          >
            <div className="content-max-width pt-32 px-4 sm:px-6">
              <h1 className="text-3xl sm:text-4xl font-bold mb-8 gradient-text">
                Impressum
              </h1>
              <div className="prose prose-invert max-w-none">
                <p className="text-[#D8D8D8]/80 mb-4 overflow-safe">
                  Diese Seite befindet sich noch im Aufbau. Das
                  vollständige Impressum wird in Kürze verfügbar
                  sein.
                </p>
                <p className="text-[#D8D8D8]/80 overflow-safe">
                  <strong>Kontakt:</strong>
                  <br />
                  OhneQuatschDeals.de
                  <br />
                  63450 Hanau, Deutschland
                  <br />
                  E-Mail: vertrieb@ohnequatschdeals.de
                  <br />
                  WhatsApp: +49 173 7189542
                </p>
              </div>
            </div>
          </div>
        );
      case "datenschutz":
        return (
          <div
            className="min-h-screen text-white overflow-x-hidden"
            style={{ backgroundColor: "#0E0F1A" }}
          >
            <div className="content-max-width pt-32 px-4 sm:px-6">
              <h1 className="text-3xl sm:text-4xl font-bold mb-8 gradient-text">
                Datenschutzerklärung
              </h1>
              <div className="prose prose-invert max-w-none">
                <p className="text-[#D8D8D8]/80 overflow-safe">
                  Diese Seite befindet sich noch im Aufbau. Die
                  vollständige Datenschutzerklärung wird in
                  Kürze verfügbar sein.
                </p>
              </div>
            </div>
          </div>
        );
      case "agb":
        return (
          <div
            className="min-h-screen text-white overflow-x-hidden"
            style={{ backgroundColor: "#0E0F1A" }}
          >
            <div className="content-max-width pt-32 px-4 sm:px-6">
              <h1 className="text-3xl sm:text-4xl font-bold mb-8 gradient-text">
                Allgemeine Geschäftsbedingungen
              </h1>
              <div className="prose prose-invert max-w-none">
                <p className="text-[#D8D8D8]/80 overflow-safe">
                  Diese Seite befindet sich noch im Aufbau. Die
                  vollständigen AGB werden in Kürze verfügbar
                  sein.
                </p>
              </div>
            </div>
          </div>
        );
      case "bedarfsanalyse":
        return (
          <div
            className="min-h-screen text-white overflow-x-hidden"
            style={{ backgroundColor: "#0E0F1A" }}
          >
            <div className="content-max-width pt-32 px-4 sm:px-6">
              <h1 className="text-3xl sm:text-4xl font-bold mb-8 gradient-text">
                Bedarfsanalyse
              </h1>
              <div className="prose prose-invert max-w-none">
                <p className="text-[#D8D8D8]/80 overflow-safe">
                  Diese Funktion befindet sich noch in der
                  Entwicklung. Die Bedarfsanalyse wird in Kürze
                  verfügbar sein.
                </p>
              </div>
            </div>
          </div>
        );
      case "vergleich":
        return (
          <div
            className="min-h-screen text-white overflow-x-hidden"
            style={{ backgroundColor: "#0E0F1A" }}
          >
            <div className="content-max-width pt-32 px-4 sm:px-6">
              <h1 className="text-3xl sm:text-4xl font-bold mb-8 gradient-text">
                Angebotsvergleich
              </h1>
              <div className="prose prose-invert max-w-none">
                <p className="text-[#D8D8D8]/80 overflow-safe">
                  Diese Funktion befindet sich noch in der
                  Entwicklung. Der Angebotsvergleich wird in
                  Kürze verfügbar sein.
                </p>
              </div>
            </div>
          </div>
        );
      case "upload":
        return (
          <div
            className="min-h-screen text-white overflow-x-hidden"
            style={{ backgroundColor: "#0E0F1A" }}
          >
            <div className="content-max-width pt-32 px-4 sm:px-6">
              <h1 className="text-3xl sm:text-4xl font-bold mb-8 gradient-text">
                Vertrag hochladen
              </h1>
              <div className="prose prose-invert max-w-none">
                <p className="text-[#D8D8D8]/80 overflow-safe">
                  Diese Funktion befindet sich noch in der
                  Entwicklung. Der Vertragsupload wird in Kürze
                  verfügbar sein.
                </p>
              </div>
            </div>
          </div>
        );
      case "kundenbereich":
        return (
          <KundenbereichLoginPage onNavigate={setCurrentPage} />
        );
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#0E0F1A" }}
    >
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />
      <main>{renderPage()}</main>
      <Footer onNavigate={setCurrentPage} />
      <ChatBot />
    </div>
  );
}