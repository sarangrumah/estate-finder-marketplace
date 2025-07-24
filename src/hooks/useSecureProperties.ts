
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Property, Developer } from '@/types';

export interface SecureProperty extends Property {}
export interface SecureDeveloper extends Developer {}

export const useSecureProperties = () => {
  const [properties, setProperties] = useState<SecureProperty[]>([]);
  const [developers, setDevelopers] = useState<SecureDeveloper[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Enhanced mock data with more variety for testing filters
  const mockProperties: SecureProperty[] = [
    {
      id: '1',
      title: 'Modern Apartment Complex',
      description: 'Luxury apartment in the heart of the city with modern amenities',
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
      developer: 'Metropolitan Developments',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      title: 'Cozy Family House',
      description: 'Perfect family home with garden and garage',
      price: 750000,
      location: {
        address: '456 Oak Avenue',
        city: 'Bandung',
        state: 'West Java',
        coordinates: { lat: -6.9147, lng: 107.6098 }
      },
      type: 'house',
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      images: ['/placeholder.svg'],
      features: ['Garden', 'Garage', 'Fireplace'],
      status: 'available',
      totalUnits: 1,
      availableUnits: 1,
      soldUnits: 0,
      developerId: '2',
      developer: 'Sunshine Homes',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      title: 'Luxury Condo Downtown',
      description: 'High-end condominium with city views',
      price: 1200000,
      location: {
        address: '789 Downtown Plaza',
        city: 'Surabaya',
        state: 'East Java',
        coordinates: { lat: -7.2504, lng: 112.7688 }
      },
      type: 'condo',
      bedrooms: 4,
      bathrooms: 3,
      area: 150,
      images: ['/placeholder.svg'],
      features: ['City View', 'Concierge', 'Rooftop Garden'],
      status: 'available',
      totalUnits: 25,
      availableUnits: 20,
      soldUnits: 5,
      developerId: '3',
      developer: 'Lakefront Properties',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      title: 'Affordable Townhouse',
      description: 'Great starter home for young families',
      price: 300000,
      location: {
        address: '321 Suburb Lane',
        city: 'Medan',
        state: 'North Sumatra',
        coordinates: { lat: 3.5952, lng: 98.6722 }
      },
      type: 'townhouse',
      bedrooms: 2,
      bathrooms: 1,
      area: 70,
      images: ['/placeholder.svg'],
      features: ['Parking', 'Small Garden'],
      status: 'available',
      totalUnits: 10,
      availableUnits: 8,
      soldUnits: 2,
      developerId: '4',
      developer: 'Elite Residences',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '5',
      title: 'Premium Villa',
      description: 'Exclusive villa with private pool',
      price: 1800000,
      location: {
        address: '555 Paradise Hill',
        city: 'Bali',
        state: 'Bali',
        coordinates: { lat: -8.3405, lng: 115.0920 }
      },
      type: 'house',
      bedrooms: 5,
      bathrooms: 4,
      area: 200,
      images: ['/placeholder.svg'],
      features: ['Private Pool', 'Ocean View', 'Chef Kitchen'],
      status: 'available',
      totalUnits: 1,
      availableUnits: 1,
      soldUnits: 0,
      developerId: '1',
      developer: 'Metropolitan Developments',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const mockDevelopers: SecureDeveloper[] = [
    {
      id: '1',
      name: 'Metropolitan Developments',
      description: 'Leading property developer in Indonesia',
      contactPerson: 'John Doe',
      email: 'contact@metrodev.com',
      phone: '+62123456789',
      address: '456 Business Street, Jakarta',
      establishedYear: 2000,
      totalProjects: 25,
      commissionRate: 2.5,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Sunshine Homes',
      description: 'Affordable housing specialist',
      contactPerson: 'Jane Smith',
      email: 'info@sunshinehomes.com',
      phone: '+62987654321',
      address: '789 Residential Ave, Bandung',
      establishedYear: 2010,
      totalProjects: 15,
      commissionRate: 3.0,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Lakefront Properties',
      description: 'Luxury waterfront developments',
      contactPerson: 'Mike Johnson',
      email: 'contact@lakefront.com',
      phone: '+62555666777',
      address: '123 Lake Drive, Surabaya',
      establishedYear: 2005,
      totalProjects: 12,
      commissionRate: 2.0,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: '4',
      name: 'Elite Residences',
      description: 'High-end residential projects',
      contactPerson: 'Sarah Wilson',
      email: 'info@eliteresidences.com',
      phone: '+62444555666',
      address: '321 Elite Street, Medan',
      establishedYear: 2015,
      totalProjects: 8,
      commissionRate: 3.5,
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
      
      // Use mock data for now
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
