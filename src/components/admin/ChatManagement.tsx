import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Clock, User } from 'lucide-react';

interface ChatMessage {
  id: string;
  customerName: string;
  message: string;
  timestamp: string;
  status: 'new' | 'replied' | 'closed';
  customerEmail?: string;
  replies?: {
    id: string;
    message: string;
    timestamp: string;
    sender: 'customer' | 'admin';
  }[];
}

const ChatManagement: React.FC = () => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatMessage | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    // Load mock chat data
    const mockChats: ChatMessage[] = [
      {
        id: '1',
        customerName: 'John Doe',
        customerEmail: 'john@example.com',
        message: 'Saya tertarik dengan properti Vila Harmoni. Bisakah saya mendapat informasi lebih detail?',
        timestamp: new Date().toISOString(),
        status: 'new',
        replies: []
      },
      {
        id: '2',
        customerName: 'Jane Smith',
        customerEmail: 'jane@example.com',
        message: 'Apakah ada unit yang tersedia di Apartemen Metro?',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'replied',
        replies: [
          {
            id: '1',
            message: 'Ya, masih ada beberapa unit tersedia. Saya akan kirimkan detail lengkapnya.',
            timestamp: new Date(Date.now() - 1800000).toISOString(),
            sender: 'admin'
          }
        ]
      }
    ];
    setChats(mockChats);
  }, []);

  const handleReply = () => {
    if (!selectedChat || !replyMessage.trim()) return;

    const newReply = {
      id: Date.now().toString(),
      message: replyMessage,
      timestamp: new Date().toISOString(),
      sender: 'admin' as const
    };

    const updatedChats = chats.map(chat => 
      chat.id === selectedChat.id 
        ? { 
            ...chat, 
            status: 'replied' as const,
            replies: [...(chat.replies || []), newReply]
          }
        : chat
    );

    setChats(updatedChats);
    setSelectedChat({
      ...selectedChat,
      status: 'replied',
      replies: [...(selectedChat.replies || []), newReply]
    });
    setReplyMessage('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Chat List */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat Pelanggan ({chats.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 max-h-[500px] overflow-y-auto p-4">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedChat?.id === chat.id
                      ? 'bg-blue-50 border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium text-sm">{chat.customerName}</span>
                    </div>
                    <Badge 
                      variant={chat.status === 'new' ? 'destructive' : chat.status === 'replied' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {chat.status === 'new' ? 'Baru' : chat.status === 'replied' ? 'Dibalas' : 'Ditutup'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 truncate mb-1">{chat.message}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(chat.timestamp)}
                  </div>
                </div>
              ))}
              {chats.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Belum ada chat masuk
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Detail */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              {selectedChat ? `Chat dengan ${selectedChat.customerName}` : 'Pilih chat untuk membalas'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-[500px]">
            {selectedChat ? (
              <>
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {/* Original Message */}
                  <div className="flex">
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center mb-1">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium text-sm">{selectedChat.customerName}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          {formatDate(selectedChat.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">{selectedChat.message}</p>
                      {selectedChat.customerEmail && (
                        <p className="text-xs text-gray-500 mt-1">
                          Email: {selectedChat.customerEmail}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Replies */}
                  {selectedChat.replies?.map((reply) => (
                    <div key={reply.id} className={`flex ${reply.sender === 'admin' ? 'justify-end' : ''}`}>
                      <div className={`rounded-lg p-3 max-w-[80%] ${
                        reply.sender === 'admin' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100'
                      }`}>
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-sm">
                            {reply.sender === 'admin' ? 'Admin' : selectedChat.customerName}
                          </span>
                          <span className={`text-xs ml-2 ${
                            reply.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatDate(reply.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm">{reply.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Input */}
                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Ketik balasan Anda..."
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      rows={3}
                      className="flex-1"
                    />
                    <Button onClick={handleReply} disabled={!replyMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Pilih chat dari daftar untuk membalas pesan pelanggan</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatManagement;