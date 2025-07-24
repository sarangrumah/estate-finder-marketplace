import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferred_contact_method: 'email' | 'phone' | 'chat';
  interests: string[];
  budget_min: number;
  budget_max: number;
  location: string;
  last_activity: string;
  created_at: string;
}

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCustomers = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setCustomers((data || []) as Customer[]);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch customers',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async (customerData: Omit<Customer, 'id' | 'created_at'>) => {
    try {
      const { error } = await supabase
        .from('customers')
        .insert({
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          preferred_contact_method: customerData.preferred_contact_method,
          interests: customerData.interests,
          budget_min: customerData.budget_min,
          budget_max: customerData.budget_max,
          location: customerData.location,
          last_activity: customerData.last_activity,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Customer added successfully',
      });

      await fetchCustomers();
    } catch (error) {
      console.error('Error adding customer:', error);
      toast({
        title: 'Error',
        description: 'Failed to add customer',
        variant: 'destructive',
      });
    }
  };

  const updateCustomer = async (id: string, customerData: Partial<Customer>) => {
    try {
      const { error } = await supabase
        .from('customers')
        .update({
          name: customerData.name,
          email: customerData.email,
          phone: customerData.phone,
          preferred_contact_method: customerData.preferred_contact_method,
          interests: customerData.interests,
          budget_min: customerData.budget_min,
          budget_max: customerData.budget_max,
          location: customerData.location,
          last_activity: customerData.last_activity,
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Customer updated successfully',
      });

      await fetchCustomers();
    } catch (error) {
      console.error('Error updating customer:', error);
      toast({
        title: 'Error',
        description: 'Failed to update customer',
        variant: 'destructive',
      });
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Customer deleted successfully',
      });

      await fetchCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete customer',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return {
    customers,
    loading,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    refreshCustomers: fetchCustomers,
  };
};