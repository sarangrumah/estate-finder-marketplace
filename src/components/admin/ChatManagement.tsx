import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Clock, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  sender_name: string;
  sender_email: string;
  message: string;
  is_admin_reply: boolean;
  admin_reply?: string;
  created_at: string;
  updated_at: string;
}

const ChatManagement: React.FC = () => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatMessage | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchChats = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setChats(data || []);
    } catch (error) {
      console.error('Error fetching chats:', error);
      toast({
        title: 'Error',
        description: 'Gagal memuat chat',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleReply = async () => {
    if (!selectedChat || !replyMessage.trim()) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .update({
          admin_reply: replyMessage,
          is_admin_reply: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedChat.id);

      if (error) throw error;

      // Update local state
      const updatedChats = chats.map(chat => 
        chat.id === selectedChat.id 
          ? { 
              ...chat, 
              admin_reply: replyMessage,
              is_admin_reply: true,
              updated_at: new Date().toISOString()
            }
          : chat
      );

      setChats(updatedChats);
      setSelectedChat({
        ...selectedChat,
        admin_reply: replyMessage,
        is_admin_reply: true,
        updated_at: new Date().toISOString()
      });
      setReplyMessage('');

      toast({
        title: 'Success',
        description: 'Balasan berhasil dikirim',
      });

    } catch (error) {
      console.error('Error sending reply:', error);
      toast({
        title: 'Error',
        description: 'Gagal mengirim balasan',
        variant: 'destructive',
      });
    }
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
                      <span className="font-medium text-sm">{chat.sender_name}</span>
                    </div>
                    <Badge 
                      variant={chat.admin_reply ? 'default' : 'destructive'}
                      className="text-xs"
                    >
                      {chat.admin_reply ? 'Dibalas' : 'Baru'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 truncate mb-1">{chat.message}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(chat.created_at)}
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
              {selectedChat ? `Chat dengan ${selectedChat.sender_name}` : 'Pilih chat untuk membalas'}
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
                        <span className="font-medium text-sm">{selectedChat.sender_name}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          {formatDate(selectedChat.created_at)}
                        </span>
                      </div>
                      <p className="text-sm">{selectedChat.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Email: {selectedChat.sender_email}
                      </p>
                    </div>
                  </div>

                  {/* Admin Reply */}
                  {selectedChat.admin_reply && (
                    <div className="flex justify-end">
                      <div className="bg-blue-500 text-white rounded-lg p-3 max-w-[80%]">
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-sm">Admin</span>
                          <span className="text-xs text-blue-100 ml-2">
                            {formatDate(selectedChat.updated_at)}
                          </span>
                        </div>
                        <p className="text-sm">{selectedChat.admin_reply}</p>
                      </div>
                    </div>
                  )}
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