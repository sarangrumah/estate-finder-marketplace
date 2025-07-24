
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Using the existing types from the project
import { Property, Developer } from '@/types';

export interface SecureProperty extends Property {}

export interface SecureDeveloper extends Developer {}

export const useSecureProperties = () => {
  const [properties, setProperties] = useState<SecureProperty[]>([]);
  const [developers, setDevelopers] = useState<SecureDeveloper[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Mock data for now - this will be replaced with actual Supabase calls once the schema is ready
  const mockProperties: SecureProperty[] = [
    {
      id: '1',
      title: 'Modern Apartment Complex',
      description: 'Luxury apartment in the heart of the city',
      price: 500000,
      location: {
        address: '123 Main Street',
        city: 'Jakarta',
        state: 'DKI Jakarta',
        coordinates: { lat: -6.2088, lng: 106.8456 }
      },
      type: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      area: 80,
      images: ['/placeholder.svg'],
      features: ['Swimming Pool', 'Gym', 'Parking'],
      status: 'available',
      totalUnits: 50,
      availableUnits: 45,
      soldUnits: 5,
      developerId: '1',
      developer: 'ABC Development',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const mockDevelopers: SecureDeveloper[] = [
    {
      id: '1',
      name: 'ABC Development',
      description: 'Leading property developer in Indonesia',
      contactPerson: 'John Doe',
      email: 'contact@abcdev.com',
      phone: '+62123456789',
      address: '456 Business Street, Jakarta',
      establishedYear: 2000,
      totalProjects: 25,
      commissionRate: 2.5,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, use mock data
      setProperties(mockProperties);
      setDevelopers(mockDevelopers);
      
      setLoading(false);
    };

    loadData();
  }, []);

  // Add property
  const addProperty = async (propertyData: Omit<SecureProperty, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newProperty: SecureProperty = {
        ...propertyData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setProperties(prev => [newProperty, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Property added successfully',
      });
      
      return newProperty;
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
      setProperties(prev => prev.map(p => 
        p.id === id ? { ...p, ...propertyData, updatedAt: new Date().toISOString() } : p
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
  const addDeveloper = async (developerData: Omit<SecureDeveloper, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newDeveloper: SecureDeveloper = {
        ...developerData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setDevelopers(prev => [newDeveloper, ...prev]);
      
      toast({
        title: 'Success',
        description: 'Developer added successfully',
      });
      
      return newDeveloper;
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
      setDevelopers(prev => prev.map(d => 
        d.id === id ? { ...d, ...developerData, updatedAt: new Date().toISOString() } : d
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

  const refreshData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setProperties(mockProperties);
    setDevelopers(mockDevelopers);
    setLoading(false);
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
    refreshData,
  };
};
