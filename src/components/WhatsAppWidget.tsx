import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const WhatsAppWidget = () => {
  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp admin number
    const phoneNumber = '628158882505'; // Format: country code + number without +
    const message = encodeURIComponent('Halo, saya ingin bertanya tentang properti yang tersedia.');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-24 z-50">
      <Button
        onClick={handleWhatsAppClick}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg transition-all duration-300 hover:scale-110"
        title="Chat WhatsApp"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    </div>
  );
};

export default WhatsAppWidget;