import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Lead {
  id: string;
  customer_name: string;
  email: string;
  phone: string;
  property_id: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed' | 'lost';
  priority: 'low' | 'medium' | 'high';
  source: string;
  notes: string;
  communication_history: any[];
  flagged: boolean;
  created_at: string;
  updated_at: string;
  // Property relation
  properties?: {
    title: string;
  };
}

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select(`
          *,
          properties!inner(title)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setLeads((data || []) as Lead[]);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch leads',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addLead = async (leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { error } = await supabase
        .from('leads')
        .insert({
          customer_name: leadData.customer_name,
          email: leadData.email,
          phone: leadData.phone,
          property_id: leadData.property_id,
          status: leadData.status,
          priority: leadData.priority,
          source: leadData.source,
          notes: leadData.notes,
          communication_history: leadData.communication_history,
          flagged: leadData.flagged,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Lead added successfully',
      });

      await fetchLeads();
    } catch (error) {
      console.error('Error adding lead:', error);
      toast({
        title: 'Error',
        description: 'Failed to add lead',
        variant: 'destructive',
      });
    }
  };

  const updateLead = async (id: string, leadData: Partial<Lead>) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({
          customer_name: leadData.customer_name,
          email: leadData.email,
          phone: leadData.phone,
          property_id: leadData.property_id,
          status: leadData.status,
          priority: leadData.priority,
          source: leadData.source,
          notes: leadData.notes,
          communication_history: leadData.communication_history,
          flagged: leadData.flagged,
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Lead updated successfully',
      });

      await fetchLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
      toast({
        title: 'Error',
        description: 'Failed to update lead',
        variant: 'destructive',
      });
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Lead deleted successfully',
      });

      await fetchLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete lead',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return {
    leads,
    loading,
    addLead,
    updateLead,
    deleteLead,
    refreshLeads: fetchLeads,
  };
};