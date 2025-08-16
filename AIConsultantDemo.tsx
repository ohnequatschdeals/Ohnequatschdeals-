import React from 'react';
import { AIConsultantHeroSection } from './AIConsultantHeroSection';
import { AIConsultantBlock } from './AIConsultantBlock';

interface AIConsultantDemoProps {
  onNavigate: (page: string) => void;
}

export const AIConsultantDemo: React.FC<AIConsultantDemoProps> = ({ onNavigate }) => {
  const handleStartConsultation = () => {
    // Navigate to AI consultant chat page when button is clicked
    onNavigate('ai-consultant-chat');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0E0F1A' }}>
      {/* Neue Hero-Sektion */}
      <AIConsultantHeroSection onStartConsultation={handleStartConsultation} />
      
      {/* Bestehender Chat-Bereich (optional als zweite Sektion) */}
      <div className="pt-0">
        <AIConsultantBlock />
      </div>
    </div>
  );
};