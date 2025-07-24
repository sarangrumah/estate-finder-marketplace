import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Property, Developer } from '@/types';

interface DatabaseProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  location_address: string;
  location_city: string;
  location_state: string;
  location_lat: number | null;
  location_lng: number | null;
  property_type: 'apartment' | 'house' | 'condo' | 'townhouse';
  bedrooms: number | null;
  bathrooms: number | null;
  floors: number | null;
  area: number | null;
  images: string[];
  floor_plan_images: string[];
  facility_images: string[];
  brochure_url: string | null;
  developer_id: string;
  features: string[];
  status: 'available' | 'sold' | 'pending';
  total_units: number;
  available_units: number;
  sold_units: number;
  created_at: string;
  updated_at: string;
  developers: {
    name: string;
  };
}

interface DatabaseDeveloper {
  id: string;
  name: string;
  description: string | null;
  logo: string | null;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  website: string | null;
  established_year: number;
  total_projects: number;
  commission_rate: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

const transformProperty = (dbProperty: DatabaseProperty): Property => ({
  id: dbProperty.id,
  title: dbProperty.title,
  description: dbProperty.description,
  price: dbProperty.price,
  location: {
    address: dbProperty.location_address,
    city: dbProperty.location_city,
    state: dbProperty.location_state,
    coordinates: {
      lat: dbProperty.location_lat || 0,
      lng: dbProperty.location_lng || 0,
    },
  },
  type: dbProperty.property_type,
  bedrooms: dbProperty.bedrooms || undefined,
  bathrooms: dbProperty.bathrooms || undefined,
  floors: dbProperty.floors || undefined,
  area: dbProperty.area || undefined,
  images: dbProperty.images || [],
  floorPlanImages: dbProperty.floor_plan_images || [],
  facilityImages: dbProperty.facility_images || [],
  brochureUrl: dbProperty.brochure_url || undefined,
  developerId: dbProperty.developer_id,
  developer: dbProperty.developers?.name || '',
  features: dbProperty.features || [],
  status: dbProperty.status,
  totalUnits: dbProperty.total_units,
  availableUnits: dbProperty.available_units,
  soldUnits: dbProperty.sold_units,
  createdAt: dbProperty.created_at,
  updatedAt: dbProperty.updated_at,
});

const transformDeveloper = (dbDeveloper: DatabaseDeveloper): Developer => ({
  id: dbDeveloper.id,
  name: dbDeveloper.name,
  description: dbDeveloper.description || '',
  logo: dbDeveloper.logo || undefined,
  contactPerson: dbDeveloper.contact_person,
  email: dbDeveloper.email,
  phone: dbDeveloper.phone,
  address: dbDeveloper.address,
  website: dbDeveloper.website || undefined,
  establishedYear: dbDeveloper.established_year,
  totalProjects: dbDeveloper.total_projects,
  commissionRate: dbDeveloper.commission_rate,
  status: dbDeveloper.status,
  createdAt: dbDeveloper.created_at,
  updatedAt: dbDeveloper.updated_at,
});

export const useSupabaseProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select(`
          *,
          developers!inner(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedProperties = data?.map(transformProperty) || [];
      setProperties(transformedProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch properties',
        variant: 'destructive',
      });
    }
  };

  const fetchDevelopers = async () => {
    try {
      const { data, error } = await supabase
        .from('developers')
        .select('*')
        .order('name');

      if (error) throw error;

      const transformedDevelopers = data?.map(transformDeveloper) || [];
      setDevelopers(transformedDevelopers);
    } catch (error) {
      console.error('Error fetching developers:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch developers',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProperties(), fetchDevelopers()]);
      setLoading(false);
    };

    loadData();
  }, []);

  const addProperty = async (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert({
          title: propertyData.title,
          description: propertyData.description,
          price: propertyData.price,
          location_address: propertyData.location.address,
          location_city: propertyData.location.city,
          location_state: propertyData.location.state,
          location_lat: propertyData.location.coordinates.lat,
          location_lng: propertyData.location.coordinates.lng,
          property_type: propertyData.type,
          bedrooms: propertyData.bedrooms,
          bathrooms: propertyData.bathrooms,
          floors: propertyData.floors,
          area: propertyData.area,
          images: propertyData.images,
          floor_plan_images: propertyData.floorPlanImages || [],
          facility_images: propertyData.facilityImages || [],
          brochure_url: propertyData.brochureUrl,
          developer_id: propertyData.developerId,
          features: propertyData.features,
          status: propertyData.status,
          total_units: propertyData.totalUnits,
          available_units: propertyData.availableUnits,
          sold_units: propertyData.soldUnits,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Property added successfully',
      });

      await fetchProperties();
    } catch (error) {
      console.error('Error adding property:', error);
      toast({
        title: 'Error',
        description: 'Failed to add property',
        variant: 'destructive',
      });
    }
  };

  const updateProperty = async (id: string, propertyData: Partial<Property>) => {
    try {
      const updateData: any = {
        title: propertyData.title,
        description: propertyData.description,
        price: propertyData.price,
        property_type: propertyData.type,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        floors: propertyData.floors,
        area: propertyData.area,
        images: propertyData.images,
        floor_plan_images: propertyData.floorPlanImages || [],
        facility_images: propertyData.facilityImages || [],
        brochure_url: propertyData.brochureUrl,
        developer_id: propertyData.developerId,
        features: propertyData.features,
        status: propertyData.status,
        total_units: propertyData.totalUnits,
        available_units: propertyData.availableUnits,
        sold_units: propertyData.soldUnits,
      };

      if (propertyData.location) {
        updateData.location_address = propertyData.location.address;
        updateData.location_city = propertyData.location.city;
        updateData.location_state = propertyData.location.state;
        updateData.location_lat = propertyData.location.coordinates.lat;
        updateData.location_lng = propertyData.location.coordinates.lng;
      }

      const { error } = await supabase
        .from('properties')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Property updated successfully',
      });

      await fetchProperties();
    } catch (error) {
      console.error('Error updating property:', error);
      toast({
        title: 'Error',
        description: 'Failed to update property',
        variant: 'destructive',
      });
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Property deleted successfully',
      });

      await fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete property',
        variant: 'destructive',
      });
    }
  };

  const addDeveloper = async (developerData: Omit<Developer, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      console.log('Adding developer:', developerData);
      console.log('Current user:', supabase.auth.getUser());
      const { error } = await supabase
        .from('developers')
        .insert({
          name: developerData.name,
          description: developerData.description,
          logo: developerData.logo,
          contact_person: developerData.contactPerson,
          email: developerData.email,
          phone: developerData.phone,
          address: developerData.address,
          website: developerData.website,
          established_year: developerData.establishedYear,
          total_projects: developerData.totalProjects,
          commission_rate: developerData.commissionRate,
          status: developerData.status,
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Developer added successfully',
      });

      await fetchDevelopers();
    } catch (error) {
      console.error('Error adding developer:', error);
      toast({
        title: 'Error',
        description: 'Failed to add developer',
        variant: 'destructive',
      });
    }
  };

  const updateDeveloper = async (id: string, developerData: Partial<Developer>) => {
    try {
      const { error } = await supabase
        .from('developers')
        .update({
          name: developerData.name,
          description: developerData.description,
          logo: developerData.logo,
          contact_person: developerData.contactPerson,
          email: developerData.email,
          phone: developerData.phone,
          address: developerData.address,
          website: developerData.website,
          established_year: developerData.establishedYear,
          total_projects: developerData.totalProjects,
          commission_rate: developerData.commissionRate,
          status: developerData.status,
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Developer updated successfully',
      });

      await fetchDevelopers();
    } catch (error) {
      console.error('Error updating developer:', error);
      toast({
        title: 'Error',
        description: 'Failed to update developer',
        variant: 'destructive',
      });
    }
  };

  const deleteDeveloper = async (id: string) => {
    try {
      const { error } = await supabase
        .from('developers')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Developer deleted successfully',
      });

      await fetchDevelopers();
    } catch (error) {
      console.error('Error deleting developer:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete developer',
        variant: 'destructive',
      });
    }
  };

  const getPropertyById = (id: string) => {
    return properties.find(property => property.id === id);
  };

  const getDeveloperById = (id: string) => {
    return developers.find(developer => developer.id === id);
  };

  const refreshData = async () => {
    setLoading(true);
    await Promise.all([fetchProperties(), fetchDevelopers()]);
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