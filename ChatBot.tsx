import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  MessageCircle, 
  X, 
  Send, 
  Upload, 
  Bot,
  User,
  ExternalLink
} from 'lucide-react';
import { api } from '../utils/supabase/client';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate session ID on mount
  useEffect(() => {
    const newSessionId = `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: 'Hallo! Ich bin Ihr AI-Berater. Wie kann ich Ihnen heute helfen? Ich kann Sie zu unseren Angeboten beraten oder Sie direkt mit einem unserer Experten über WhatsApp verbinden.',
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    
    // Save welcome message
    api.saveChatMessage(newSessionId, welcomeMessage.text, 'bot').catch(console.error);
  }, []);

  // Load chat history when session ID changes
  useEffect(() => {
    if (sessionId && isOpen) {
      loadChatHistory();
    }
  }, [sessionId, isOpen]);

  const loadChatHistory = async () => {
    try {
      const history = await api.getChatHistory(sessionId);
      if (Array.isArray(history) && history.length > 1) {
        const formattedMessages = history.map(h => ({
          id: h.id,
          text: h.message,
          sender: h.sender,
          timestamp: new Date(h.timestamp)
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const quickOptions = [
    'Internet & TV Angebote',
    'Mobilfunk Tarife',
    'Strom & Gas wechseln',
    'Kredit Beratung',
    'WhatsApp Kontakt'
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    setIsLoading(true);
    const userMessageText = inputText;
    setInputText('');

    const userMessage: Message = {
      id: Date.now().toString(),
      text: userMessageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Save user message
      await api.saveChatMessage(sessionId, userMessageText, 'user');

      // Generate bot response
      setTimeout(async () => {
        const botResponse = generateBotResponse(userMessageText);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        
        // Save bot message
        try {
          await api.saveChatMessage(sessionId, botResponse, 'bot');
        } catch (error) {
          console.error('Error saving bot message:', error);
        }
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving user message:', error);
      setIsLoading(false);
    }
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('internet') || input.includes('tv')) {
      return 'Gerne helfe ich Ihnen bei Internet & TV Angeboten! Wir haben Deals von Vodafone und 1&1. Soll ich Sie mit einem Berater über WhatsApp verbinden oder möchten Sie unsere aktuellen Angebote ansehen?';
    } else if (input.includes('mobilfunk') || input.includes('handy')) {
      return 'Für Mobilfunk haben wir großartige Angebote! Welche Art von Tarif suchen Sie? Prepaid oder Vertrag? Ich kann Sie gerne über WhatsApp mit einem Experten verbinden.';
    } else if (input.includes('strom') || input.includes('gas')) {
      return 'Bei Strom & Gas helfen wir beim Anbieterwechsel. Ich kann Ihnen Vergleichstools zur Verfügung stellen oder Sie über WhatsApp mit einem Berater verbinden. Was bevorzugen Sie?';
    } else if (input.includes('kredit')) {
      return 'Für Kredite arbeiten wir mit Smava zusammen. Ich kann Sie direkt über WhatsApp mit einem Kreditberater verbinden oder Ihnen Informationen zur Verfügung stellen.';
    } else if (input.includes('whatsapp') || input.includes('berater') || input.includes('kontakt')) {
      return 'Sehr gerne! Ich verbinde Sie jetzt mit einem unserer Berater über WhatsApp. Sie können auch benötigte Dokumente direkt über WhatsApp senden. Klicken Sie hier: [WhatsApp öffnen]';
    } else {
      return 'Das ist eine interessante Frage! Lassen Sie mich Sie mit einem unserer Experten über WhatsApp verbinden, der Ihnen detailliert helfen kann. Alternativ können Sie unsere Angebote durchstöbern oder mir spezifische Fragen stellen.';
    }
  };

  const handleQuickOption = async (option: string) => {
    setInputText(option);
    // Wait a bit for the input to be set, then send
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const openWhatsApp = () => {
    // Simulate WhatsApp opening
    window.open('https://wa.me/491234567890', '_blank');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 shadow-lg"
          size="sm"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-80 sm:w-96">
          <Card className="shadow-2xl border-0 overflow-hidden">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <CardTitle className="text-sm">AI-Berater</CardTitle>
                    <Badge variant="secondary" className="bg-green-500 text-white text-xs">
                      Online
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="p-0 h-96 overflow-y-auto bg-gray-50">
              <div className="p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex max-w-xs lg:max-w-md ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end space-x-2`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-purple-600 ml-2' : 'bg-cyan-600 mr-2'}`}>
                        {message.sender === 'user' ? (
                          <User className="h-3 w-3 text-white" />
                        ) : (
                          <Bot className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div className={`px-4 py-2 rounded-2xl ${message.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-white border'}`}>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Quick Options */}
                {messages.length === 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 text-center">Schnelle Optionen:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickOptions.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => handleQuickOption(option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={openWhatsApp}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  <Upload className="h-3 w-3 mr-1" />
                  Datei
                </Button>
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Ihre Nachricht..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
                  disabled={isLoading || !inputText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};