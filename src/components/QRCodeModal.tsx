import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { QrCode, Download, Info } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  consultant: {
    name: string;
    location: string;
    id?: string;
  };
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose, consultant }) => {
  const qrCodeRef = React.useRef<HTMLCanvasElement>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = React.useState<string>('');

  // Generate QR Code
  React.useEffect(() => {
    if (isOpen && qrCodeRef.current) {
      import('qrcode').then((QRCode) => {
        const consultantUrl = `https://ohnequatschdeals.de/berater/${consultant.name.replace(/\s+/g, '-').toLowerCase()}?ref=qr`;
        
        QRCode.toCanvas(qrCodeRef.current, consultantUrl, {
          width: 300,
          margin: 2,
          color: {
            dark: '#00F0FF',
            light: '#FFFFFF'
          },
          errorCorrectionLevel: 'M'
        }).then(() => {
          if (qrCodeRef.current) {
            setQrCodeDataUrl(qrCodeRef.current.toDataURL());
          }
        }).catch(console.error);
      });
    }
  }, [isOpen, consultant]);

  const handleSaveQR = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement('a');
      link.download = `berater-${consultant.name.replace(/\s+/g, '-').toLowerCase()}-qr.png`;
      link.href = qrCodeDataUrl;
      link.click();
    }
  };

  const handleSaveToCustomerArea = () => {
    // Simulate saving to customer area
    alert('QR-Code wurde als "eVisit" in Ihrem Kundenbereich gespeichert!');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-[#00F0FF] to-[#FF00C8] bg-clip-text text-transparent">
            QR-Code für {consultant.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          {/* QR Code Container */}
          <div className="relative">
            <div className="p-4 bg-white rounded-2xl shadow-lg shadow-[#00F0FF]/20 border-2 border-[#00F0FF]/30">
              <canvas
                ref={qrCodeRef}
                className="rounded-lg"
                style={{ width: '250px', height: '250px' }}
              />
              
              {/* Logo Overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-[#00F0FF] to-[#FF00C8] rounded-full flex items-center justify-center">
                  <QrCode className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Info Text */}
          <div className="text-center">
            <p className="text-lg font-medium text-gray-200 mb-2">
              Scannen & direkt online abschließen
            </p>
            <p className="text-sm text-gray-400">
              {consultant.location}
            </p>
          </div>
          
          {/* Info Alert */}
          <Alert className="bg-blue-900/30 border-blue-500/50 text-blue-200">
            <Info className="h-4 w-4" />
            <AlertDescription>
              Nur für Online-Bestellungen nutzbar. Stationäre Kunden wenden sich bitte direkt an den Berater.
            </AlertDescription>
          </Alert>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button
              onClick={handleSaveToCustomerArea}
              className="flex-1 bg-gradient-to-r from-[#00F0FF] to-[#8B00FF] hover:from-[#00F0FF]/80 hover:to-[#8B00FF]/80 text-white font-medium border-0 shadow-lg shadow-[#00F0FF]/20 hover:shadow-[#00F0FF]/40 transition-all duration-300"
            >
              Als eVisit speichern
            </Button>
            
            <Button
              onClick={handleSaveQR}
              variant="outline"
              className="flex-1 border-[#00F0FF] text-[#00F0FF] bg-transparent hover:bg-[#00F0FF] hover:text-black transition-all duration-300"
            >
              <Download className="mr-2 h-4 w-4" />
              QR-Code herunterladen
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};