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

interface ChatThread {
  sender_email: string;
  sender_name: string;
  messages: ChatMessage[];
  latest_message: ChatMessage;
  unread_count: number;
}

const ChatManagement: React.FC = () => {
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([]);
  const [selectedThread, setSelectedThread] = useState<ChatThread | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const groupMessagesByEmail = (messages: ChatMessage[]): ChatThread[] => {
    const grouped = messages.reduce((acc, message) => {
      const email = message.sender_email;
      if (!acc[email]) {
        acc[email] = {
          sender_email: email,
          sender_name: message.sender_name,
          messages: [],
          latest_message: message,
          unread_count: 0
        };
      }
      acc[email].messages.push(message);
      if (new Date(message.created_at) > new Date(acc[email].latest_message.created_at)) {
        acc[email].latest_message = message;
      }
      if (!message.admin_reply && !message.is_admin_reply) {
        acc[email].unread_count++;
      }
      return acc;
    }, {} as Record<string, ChatThread>);

    return Object.values(grouped).sort((a, b) => 
      new Date(b.latest_message.created_at).getTime() - new Date(a.latest_message.created_at).getTime()
    );
  };

  const fetchChats = async () => {
    try {
      console.log('Fetching chat messages...');
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Fetched chats:', data);
      const threads = groupMessagesByEmail(data || []);
      setChatThreads(threads);
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

    // Set up real-time subscription
    const channel = supabase
      .channel('chat-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat_messages'
        },
        (payload) => {
          console.log('Real-time chat update:', payload);
          fetchChats(); // Refresh the data
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleReply = async () => {
    if (!selectedThread || !replyMessage.trim()) return;

    try {
      // Create a new admin reply message that will be grouped with the thread
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          sender_name: selectedThread.sender_name,
          sender_email: selectedThread.sender_email,
          message: replyMessage,
          is_admin_reply: true,
          admin_reply: replyMessage
        });

      if (error) throw error;

      setReplyMessage('');

      toast({
        title: 'Success',
        description: 'Balasan berhasil dikirim',
      });

      // Data will be updated via real-time subscription

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

  const sortedMessages = selectedThread 
    ? [...selectedThread.messages].sort((a, b) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Chat Threads List */}
      <div className="lg:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Chat Threads ({chatThreads.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-2 max-h-[500px] overflow-y-auto p-4">
              {chatThreads.map((thread) => (
                <div
                  key={thread.sender_email}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedThread?.sender_email === thread.sender_email
                      ? 'bg-blue-50 border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedThread(thread)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium text-sm">{thread.sender_name}</span>
                    </div>
                    <div className="flex gap-1">
                      <Badge 
                        variant="outline" 
                        className="text-xs"
                      >
                        {thread.messages.length}
                      </Badge>
                      {thread.unread_count > 0 && (
                        <Badge 
                          variant="destructive"
                          className="text-xs"
                        >
                          {thread.unread_count} baru
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 truncate mb-1">
                    {thread.latest_message.message}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDate(thread.latest_message.created_at)}
                    </div>
                    <span className="text-xs text-gray-400">
                      {thread.sender_email}
                    </span>
                  </div>
                </div>
              ))}
              {chatThreads.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Belum ada chat masuk
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Conversation */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              {selectedThread ? `Chat dengan ${selectedThread.sender_name}` : 'Pilih chat untuk membalas'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col h-[500px]">
            {selectedThread ? (
              <>
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {sortedMessages.map((message) => (
                    <div key={message.id} className={`flex ${message.is_admin_reply ? 'justify-end' : ''}`}>
                      <div className={`rounded-lg p-3 max-w-[80%] ${
                        message.is_admin_reply 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100'
                      }`}>
                        <div className="flex items-center mb-1">
                          <span className="font-medium text-sm">
                            {message.is_admin_reply ? 'Admin' : message.sender_name}
                          </span>
                          <span className={`text-xs ml-2 ${
                            message.is_admin_reply ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatDate(message.created_at)}
                          </span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                        {!message.is_admin_reply && (
                          <p className={`text-xs mt-1 ${
                            message.is_admin_reply ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            Email: {message.sender_email}
                          </p>
                        )}
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
                  <p>Pilih thread chat untuk melihat percakapan</p>
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