-- Enable real-time for chat_messages table
ALTER TABLE public.chat_messages REPLICA IDENTITY FULL;

-- Add the table to the supabase_realtime publication
BEGIN;
  -- Remove the table if it exists
  DROP PUBLICATION IF EXISTS supabase_realtime;
  -- Create the publication including chat_messages
  CREATE PUBLICATION supabase_realtime FOR TABLE chat_messages;
COMMIT;