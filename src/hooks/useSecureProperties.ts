
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SecureProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  type: string;
  status: 'available' | 'sold' | 'pending';
  images: string[];
  features: string[];
  specifications: any;
  total_units: number;
  available_units: number;
  sold_units: number;
  developer_id: string;
  brochure_url?: string;
  created_at: string;
  updated_at: string;
}

export interface SecureDeveloper {
  id: string;
  name: string;
  description: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  logo?: string;
  established_year: number;
  total_projects: number;
  commission_rate: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useSecureProperties = () => {
  const [properties, setProperties] = useState<SecureProperty[]>([]);
  const [developers, setDevelopers] = useState<SecureDeveloper[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load properties from Supabase
  const loadProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setProperties(data || []);
    } catch (error) {
      console.error('Error loading properties:', error);
      toast({
        title: 'Error',
        description: 'Failed to load properties',
        variant: 'destructive',
      });
    }
  };

  // Load developers from Supabase
  const loadDevelopers = async () => {
    try {
      const { data, error } = await supabase
        .from('developers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setDevelopers(data || []);
    } catch (error) {
      console.error('Error loading developers:', error);
      toast({
        title: 'Error',
        description: 'Failed to load developers',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([loadProperties(), loadDevelopers()]);
      setLoading(false);
    };

    loadData();
  }, []);

  // Add property
  const addProperty = async (propertyData: Omit<SecureProperty, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([propertyData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setProperties(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Property added successfully',
      });
      
      return data;
    } catch (error) {
      console.error('Error adding property:', error);
      toast({
        title: 'Error',
        description: 'Failed to add property',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Update property
  const updateProperty = async (id: string, propertyData: Partial<SecureProperty>) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', id);

      if (error) {
        throw error;
      }

      setProperties(prev => prev.map(p => 
        p.id === id ? { ...p, ...propertyData } : p
      ));
      
      toast({
        title: 'Success',
        description: 'Property updated successfully',
      });
    } catch (error) {
      console.error('Error updating property:', error);
      toast({
        title: 'Error',
        description: 'Failed to update property',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Delete property
  const deleteProperty = async (id: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setProperties(prev => prev.filter(p => p.id !== id));
      
      toast({
        title: 'Success',
        description: 'Property deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete property',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Add developer
  const addDeveloper = async (developerData: Omit<SecureDeveloper, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('developers')
        .insert([developerData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      setDevelopers(prev => [data, ...prev]);
      toast({
        title: 'Success',
        description: 'Developer added successfully',
      });
      
      return data;
    } catch (error) {
      console.error('Error adding developer:', error);
      toast({
        title: 'Error',
        description: 'Failed to add developer',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Update developer
  const updateDeveloper = async (id: string, developerData: Partial<SecureDeveloper>) => {
    try {
      const { error } = await supabase
        .from('developers')
        .update(developerData)
        .eq('id', id);

      if (error) {
        throw error;
      }

      setDevelopers(prev => prev.map(d => 
        d.id === id ? { ...d, ...developerData } : d
      ));
      
      toast({
        title: 'Success',
        description: 'Developer updated successfully',
      });
    } catch (error) {
      console.error('Error updating developer:', error);
      toast({
        title: 'Error',
        description: 'Failed to update developer',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Delete developer
  const deleteDeveloper = async (id: string) => {
    try {
      const { error } = await supabase
        .from('developers')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      setDevelopers(prev => prev.filter(d => d.id !== id));
      
      toast({
        title: 'Success',
        description: 'Developer deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting developer:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete developer',
        variant: 'destructive',
      });
      throw error;
    }
  };

  // Get property by ID
  const getPropertyById = (id: string) => {
    return properties.find(p => p.id === id);
  };

  // Get developer by ID
  const getDeveloperById = (id: string) => {
    return developers.find(d => d.id === id);
  };

  return {
    properties,
    developers,
    loading,
    addProperty,
    updateProperty,
    deleteProperty,
    addDeveloper,
    updateDeveloper,
    deleteDeveloper,
    getPropertyById,
    getDeveloperById,
    refreshData: () => Promise.all([loadProperties(), loadDevelopers()]),
  };
};
