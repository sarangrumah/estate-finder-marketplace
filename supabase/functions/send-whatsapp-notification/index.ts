import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WhatsAppMessage {
  sender_name: string;
  sender_email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sender_name, sender_email, message }: WhatsAppMessage = await req.json();
    
    // Check if admin is online (you can implement your own logic here)
    // For now, we'll assume admin is offline if no admin replied in last 30 minutes
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Check for recent admin activity
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
    const { data: recentReplies } = await supabaseClient
      .from('chat_messages')
      .select('*')
      .eq('is_admin_reply', true)
      .gte('created_at', thirtyMinutesAgo)
      .limit(1);

    const isAdminOnline = recentReplies && recentReplies.length > 0;

    if (!isAdminOnline) {
      // Send WhatsApp notification
      const whatsappApiKey = Deno.env.get('WHATSAPP_API_KEY');
      const adminWhatsAppNumber = Deno.env.get('ADMIN_WHATSAPP_NUMBER');
      
      if (whatsappApiKey && adminWhatsAppNumber) {
        const whatsappMessage = `🔔 *Pesan Chat Baru*\n\n*Dari:* ${sender_name}\n*Email:* ${sender_email}\n*Pesan:* ${message}\n\nSilakan cek dashboard admin untuk membalas.`;
        
        // You can use any WhatsApp Business API provider here
        // This is a generic example - replace with your actual WhatsApp API
        const whatsappResponse = await fetch('https://api.whatsapp.com/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${whatsappApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: adminWhatsAppNumber,
            type: "text",
            text: {
              body: whatsappMessage
            }
          })
        });

        if (whatsappResponse.ok) {
          console.log('WhatsApp notification sent successfully');
        } else {
          console.error('Failed to send WhatsApp notification');
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        admin_online: isAdminOnline,
        whatsapp_sent: !isAdminOnline 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in WhatsApp notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);