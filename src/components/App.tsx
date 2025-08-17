
cat > src/components/App.tsx <<'TSX'
import React, { useMemo, useState } from "react";

import Header from "@/components/Header";
import HomePage from "@/pages/HomePage";
import WarumWirPage from "@/components/WarumWirPage";
import AngebotePage from "@/components/AngebotePage";
import BeraterPage from "@/components/BeraterPage";
import AlleBeraterPage from "@/components/AlleBeraterPage";
import BeraterProfilPage from "@/components/BeraterProfilPage";
import AdminDashboard from "@/components/AdminDashboard";
import BeraterLoginPage from "@/components/BeraterLoginPage";
import AdminLoginPage from "@/components/AdminLoginPage";
import AIConsultantFloatingAvatar from "@/components/AIConsultantFloatingAvatar";

type PageKey =
  | "home"
  | "angebote"
  | "berater"
  | "alle-berater"
  | "berater-profil"
  | "admin"
  | "berater-login"
  | "admin-login"
  | "warum-wir";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>("home");

  const renderPage = useMemo(() => {
    switch (currentPage) {
      case "home": return <HomePage />;
      case "angebote": return <AngebotePage category="vodafone" onNavigate={setCurrentPage} />;
      case "berater": return <BeraterPage onNavigate={setCurrentPage} />;
      case "alle-berater": return <AlleBeraterPage onNavigate={setCurrentPage} />;
      case "berater-profil": return <BeraterProfilPage onNavigate={setCurrentPage} />;
      case "admin": return <AdminDashboard onNavigate={setCurrentPage} />;
      case "berater-login": return <BeraterLoginPage onNavigate={setCurrentPage} />;
      case "admin-login": return <AdminLoginPage onNavigate={setCurrentPage} />;
      case "warum-wir": return <WarumWirPage onNavigate={setCurrentPage} />;
      default: return <HomePage />;
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen">
      <Header onNavigate={setCurrentPage} />
      {renderPage}
      <AIConsultantFloatingAvatar message="Hi 👋 Ich bin dein KI-Berater" />
    </div>
  );
}
TSX