
export interface Property {
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
  type: 'apartment' | 'house' | 'condo' | 'townhouse';
  bedrooms: number;
  bathrooms: number;
  area: number; // in square feet
  images: string[];
  developer: string;
  features: string[];
  status: 'available' | 'sold' | 'pending';
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyTitle: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed' | 'lost';
  priority: 'low' | 'medium' | 'high';
  source: string;
  notes: string;
  communicationHistory: Communication[];
  createdAt: string;
  updatedAt: string;
  flagged: boolean;
}

export interface Communication {
  id: string;
  type: 'email' | 'phone' | 'chat' | 'meeting';
  message: string;
  timestamp: string;
  direction: 'inbound' | 'outbound';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredContactMethod: 'email' | 'phone' | 'chat';
  interests: string[];
  budget: {
    min: number;
    max: number;
  };
  location: string;
  createdAt: string;
  lastActivity: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent';
  avatar?: string;
}

export interface FilterOptions {
  location: string;
  priceRange: {
    min: number;
    max: number;
  };
  propertyType: string[];
  bedrooms: number[];
  bathrooms: number[];
  developer: string[];
  useGPS: boolean;
  userLocation?: {
    lat: number;
    lng: number;
  };
}
