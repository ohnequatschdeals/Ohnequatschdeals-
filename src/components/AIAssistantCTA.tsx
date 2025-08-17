import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';
import { Badge } from './ui/badge';
import { 
  Bot, 
  CheckCircle, 
  Clock, 
  Shield,
  ArrowRight,
  Send,
  X
} from 'lucide-react';
import { Input } from './ui/input';
import aiAssistantImage from 'figma:asset/13360f059c4886011e49eaee81fbcadbf3cd0a21.png';

interface AIAssistantCTAProps {
  onChatStart?: () => void;
}

export const AIAssistantCTA: React.FC<AIAssistantCTAProps> = ({ onChatStart }) => {
  const [showChat, setShowChat] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      message: 'Hallo! Ich bin dein persönlicher KI-Berater. Ich finde den besten Tarif für dich – wollen wir starten?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  // Check if mobile on mount
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const benefits = [
    {
      icon: Clock,
      title: '24/7 verfügbar',
      description: 'Sofortige Antworten, rund um die Uhr'
    },
    {
      icon: CheckCircle,
      title: 'Personalisierte Empfehlungen',
      description: 'Maßgeschneiderte Angebote für deine Bedürfnisse'
    },
    {
      icon: Shield,
      title: 'Transparent & ehrlich',
      description: 'Keine versteckten Kosten oder Tricks'
    }
  ];

  const handleStartChat = () => {
    setShowChat(true);
    onChatStart?.();
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: chatMessages.length + 1,
      sender: 'user' as const,
      message: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: chatMessages.length + 2,
        sender: 'ai' as const,
        message: 'Danke für deine Nachricht! Ich helfe dir gerne dabei, den perfekten Tarif zu finden. Um dir die besten Angebote vorschlagen zu können, benötige ich ein paar Informationen von dir. Lass uns mit deinem Interesse anfangen - suchst du nach Internet, Mobilfunk, Strom/Gas oder einem Kredit?',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const ChatContent = () => (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-700">
        <div className="w-10 h-10 bg-gradient-to-r from-[#00F0FF] to-[#8B00FF] rounded-full flex items-center justify-center">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">KI-Berater</h3>
          <p className="text-sm text-green-400">● Online</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto min-h-0 max-h-80">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-2xl ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-[#00F0FF] to-[#8B00FF] text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.message}</p>
              <p className="text-xs mt-1 opacity-70">
                {msg.timestamp.toLocaleTimeString('de-DE', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Schreibe eine Nachricht..."
            className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
          />
          <Button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-[#00F0FF] to-[#8B00FF] hover:from-[#00F0FF]/80 hover:to-[#8B00FF]/80 text-white border-0 shadow-lg shadow-[#00F0FF]/20"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="py-20 px-4" style={{ backgroundColor: '#1B1B1B' }}>
        <div className="max-w-6xl mx-auto">
          <Card className="border-0 bg-gradient-to-br from-[#00F0FF]/10 via-[#8B00FF]/10 to-[#FF00C8]/10 backdrop-blur-sm shadow-2xl shadow-[#00F0FF]/20 hover:shadow-[#00F0FF]/30 transition-all duration-500 rounded-3xl overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Badge className="bg-gradient-to-r from-[#00F0FF]/20 to-[#8B00FF]/20 text-[#00F0FF] border-[#00F0FF]/30 hover:bg-gradient-to-r hover:from-[#00F0FF]/30 hover:to-[#8B00FF]/30">
                      <Bot className="w-4 h-4 mr-1" />
                      Künstliche Intelligenz
                    </Badge>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                      <span className="bg-gradient-to-r from-[#00F0FF] via-[#8B00FF] to-[#FF00C8] bg-clip-text text-transparent">
                        Dein persönlicher KI-Berater
                      </span>
                    </h2>
                    
                    <p className="text-lg text-gray-300 leading-relaxed">
                      Lass dir von unserer KI in wenigen Minuten die besten Angebote für deine Bedürfnisse vorschlagen – kostenlos und unverbindlich.
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-4">
                    {benefits.map((benefit, index) => {
                      const IconComponent = benefit.icon;
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#00F0FF] to-[#8B00FF] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">{benefit.title}</p>
                            <p className="text-sm text-gray-400">{benefit.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      size="lg"
                      onClick={handleStartChat}
                      className="bg-gradient-to-r from-[#00F0FF] via-[#8B00FF] to-[#FF00C8] hover:from-[#00F0FF]/80 hover:via-[#8B00FF]/80 hover:to-[#FF00C8]/80 text-white px-8 py-3 text-lg font-medium border-0 shadow-lg shadow-[#00F0FF]/30 hover:shadow-xl hover:shadow-[#00F0FF]/40 transition-all duration-300 transform hover:scale-105"
                    >
                      <Bot className="mr-2 h-5 w-5" />
                      Jetzt starten
                    </Button>
                    
                    <Button
                      variant="link"
                      className="text-[#00F0FF] hover:text-[#00F0FF]/80 font-medium p-0"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      Mehr erfahren
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Right Content - AI Assistant Illustration */}
                <div className="relative">
                  <div className="relative">
                    {/* Main AI Assistant Image */}
                    <div className="relative z-10">
                      <img 
                        src={aiAssistantImage}
                        alt="KI-Beraterin"
                        className="w-full max-w-sm mx-auto filter drop-shadow-2xl"
                      />
                    </div>

                    {/* Speech Bubble */}
                    <div className="absolute top-4 -left-4 lg:-left-8 z-20">
                      <div className="relative bg-white rounded-2xl p-4 shadow-2xl shadow-[#00F0FF]/20 max-w-xs">
                        <p className="text-gray-900 text-sm font-medium leading-relaxed">
                          "Hallo! Ich finde den besten Tarif für dich – wollen wir starten?"
                        </p>
                        
                        {/* Speech bubble arrow */}
                        <div className="absolute bottom-0 right-6 transform translate-y-full">
                          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[12px] border-l-transparent border-r-transparent border-t-white"></div>
                        </div>

                        {/* Typing indicator */}
                        <div className="flex gap-1 mt-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-[#00F0FF] to-[#8B00FF] rounded-full animate-pulse"></div>
                          <div className="w-2 h-2 bg-gradient-to-r from-[#00F0FF] to-[#8B00FF] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-gradient-to-r from-[#00F0FF] to-[#8B00FF] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Background Glow Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF]/20 to-[#FF00C8]/20 blur-3xl -z-10 scale-110"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Chat Modal/Drawer */}
      {isMobile ? (
        <Drawer open={showChat} onOpenChange={setShowChat}>
          <DrawerContent className="bg-gray-900 border-gray-700 text-white h-[90vh]">
            <DrawerHeader className="text-left pb-0">
              <DrawerTitle className="text-xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF00C8] bg-clip-text text-transparent">
                KI-Berater Chat
              </DrawerTitle>
            </DrawerHeader>
            <div className="flex-1 flex flex-col min-h-0">
              <ChatContent />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={showChat} onOpenChange={setShowChat}>
          <DialogContent className="sm:max-w-lg bg-gray-900 border-gray-700 text-white p-0 gap-0 max-h-[80vh] flex flex-col">
            <DialogHeader className="p-4 pb-0">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF00C8] bg-clip-text text-transparent">
                  KI-Berater Chat
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChat(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="flex-1 flex flex-col min-h-0">
              <ChatContent />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};