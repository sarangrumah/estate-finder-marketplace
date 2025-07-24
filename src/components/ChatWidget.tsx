import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Halo! Selamat datang di Sarang Rumah. Silakan isi nama dan email Anda untuk memulai chat.',
      sender: 'agent',
      timestamp: new Date()
    }
  ]);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormComplete) {
      if (!senderName.trim() || !senderEmail.trim()) {
        toast({
          title: 'Error',
          description: 'Mohon isi nama dan email terlebih dahulu',
          variant: 'destructive',
        });
        return;
      }
      setIsFormComplete(true);
      
      const welcomeMessage = {
        id: messages.length + 1,
        text: `Terima kasih ${senderName}! Sekarang Anda dapat mengirim pesan dan kami akan segera merespon.`,
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, welcomeMessage]);
      return;
    }

    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);

    // Save message to database
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          sender_name: senderName,
          sender_email: senderEmail,
          message: message,
          is_admin_reply: false
        });

      if (error) throw error;

      setMessage('');

      // Simulate agent response
      setTimeout(() => {
        const agentResponse = {
          id: messages.length + 2,
          text: 'Terima kasih atas pesan Anda. Tim kami akan segera merespon. Sementara itu, Anda dapat menjelajahi properti kami atau menghubungi kami melalui halaman kontak.',
          sender: 'agent',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, agentResponse]);
      }, 1000);

    } catch (error) {
      console.error('Error saving chat message:', error);
      toast({
        title: 'Error',
        description: 'Gagal mengirim pesan. Silakan coba lagi.',
        variant: 'destructive',
      });
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 z-50">
          <Card className="shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="text-lg">Chat dengan Kami</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs p-3 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs opacity-75 mt-1">
                        {msg.timestamp.toLocaleTimeString('id-ID', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                {!isFormComplete ? (
                  <div className="space-y-3">
                    <Input
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Nama lengkap"
                      className="w-full"
                    />
                    <Input
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="Email"
                      type="email"
                      className="w-full"
                    />
                    <Button onClick={handleSendMessage} className="w-full">
                      Mulai Chat
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Ketik pesan Anda..."
                      className="flex-1"
                    />
                    <Button type="submit" size="sm">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ChatWidget;