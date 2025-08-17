import React from 'react';
import { AIConsultantHeroSection } from './AIConsultantHeroSection';

interface AIConsultantChatPageProps {
  onNavigate: (page: string) => void;
}

export const AIConsultantChatPage: React.FC<AIConsultantChatPageProps> = ({ onNavigate }) => {
  const handleStartConsultation = () => {
    // Hier könnte der Chat-Bereich eingeblendet oder zu einem Chat-Interface gewechselt werden
    console.log('Beratung wird gestartet...');
    // Alternativ: Scroll zu einem Chat-Bereich oder öffne einen Chat-Dialog
    
    // Beispiel: Zu einer separaten Chat-Seite navigieren
    // onNavigate('chat-interface');
  };

  return (
    <div className="min-h-screen">
      <AIConsultantHeroSection onStartConsultation={handleStartConsultation} />
    </div>
  );
};