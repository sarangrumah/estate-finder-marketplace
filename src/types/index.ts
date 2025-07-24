
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
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  area?: number; // in square meters
  images: string[];
  floorPlanImages?: string[];
  facilityImages?: string[];
  brochureUrl?: string;
  developerId: string; // Reference to Developer ID
  developer?: string; // Developer name for display
  features: string[];
  status: 'available' | 'sold' | 'pending';
  totalUnits: number;
  availableUnits: number;
  soldUnits: number;
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
  role: 'admin' | 'agent' | 'user';
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

export interface Developer {
  id: string;
  name: string;
  description: string;
  logo?: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  website?: string;
  establishedYear: number;
  totalProjects: number;
  commissionRate: number; // percentage (e.g., 2.5 for 2.5%)
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface PropertySale {
  id: string;
  propertyId: string;
  propertyTitle: string;
  developerId: string;
  developerName: string;
  salePrice: number;
  commissionRate: number;
  commissionAmount: number;
  customerName: string;
  customerEmail: string;
  saleDate: string;
  paymentStatus: 'pending' | 'paid' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface MonthlyReport {
  id: string;
  month: number;
  year: number;
  totalSales: number;
  totalCommission: number;
  totalProperties: number;
  salesByDeveloper: {
    developerId: string;
    developerName: string;
    salesCount: number;
    totalSalesAmount: number;
    commissionAmount: number;
  }[];
  createdAt: string;
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'agent' | 'user';
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  property_id: string;
  name: string;
  email: string;
  phone: string;
  message?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  sender_name: string;
  sender_email: string;
  message: string;
  is_admin_reply: boolean;
  admin_reply?: string;
  created_at: string;
  updated_at: string;
}
