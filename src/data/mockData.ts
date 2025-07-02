
import { Property, Lead, Customer } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Luxurious apartment in the heart of downtown with stunning city views and premium amenities.',
    price: 450000,
    location: {
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    developer: 'Metropolitan Developments',
    features: ['Gym', 'Pool', 'Parking', 'Balcony', 'City View'],
    status: 'available',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Suburban Family House',
    description: 'Spacious family home with large backyard, perfect for growing families.',
    price: 750000,
    location: {
      address: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      coordinates: { lat: 34.0522, lng: -118.2437 }
    },
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    developer: 'Sunshine Homes',
    features: ['Garden', 'Garage', 'Fireplace', 'Walk-in Closet'],
    status: 'available',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16'
  },
  {
    id: '3',
    title: 'Lake View Condo',
    description: 'Beautiful condo with breathtaking lake views and modern finishes.',
    price: 320000,
    location: {
      address: '789 Lake Shore Drive',
      city: 'Chicago',
      state: 'IL',
      coordinates: { lat: 41.8781, lng: -87.6298 }
    },
    type: 'condo',
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    developer: 'Lakefront Properties',
    features: ['Lake View', 'Concierge', 'Fitness Center'],
    status: 'available',
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17'
  },
  {
    id: '4',
    title: 'Luxury Townhouse',
    description: 'Premium townhouse with private entrance and rooftop terrace.',
    price: 850000,
    location: {
      address: '321 Park Place',
      city: 'Boston',
      state: 'MA',
      coordinates: { lat: 42.3601, lng: -71.0589 }
    },
    type: 'townhouse',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    images: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    developer: 'Elite Residences',
    features: ['Rooftop Terrace', 'Private Entrance', 'Hardwood Floors'],
    status: 'available',
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  }
];

export const mockLeads: Lead[] = [
  {
    id: '1',
    customerName: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    propertyId: '1',
    propertyTitle: 'Modern Downtown Apartment',
    status: 'new',
    priority: 'high',
    source: 'website',
    notes: 'Interested in viewing the property this weekend',
    communicationHistory: [
      {
        id: '1',
        type: 'email',
        message: 'Inquiry about the downtown apartment',
        timestamp: '2024-07-02T10:30:00Z',
        direction: 'inbound'
      }
    ],
    createdAt: '2024-07-02T10:30:00Z',
    updatedAt: '2024-07-02T10:30:00Z',
    flagged: false
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 987-6543',
    propertyId: '2',
    propertyTitle: 'Suburban Family House',
    status: 'contacted',
    priority: 'medium',
    source: 'referral',
    notes: 'Looking for family home, has 2 children',
    communicationHistory: [
      {
        id: '1',
        type: 'phone',
        message: 'Initial call about family home requirements',
        timestamp: '2024-07-01T14:15:00Z',
        direction: 'outbound'
      }
    ],
    createdAt: '2024-07-01T14:15:00Z',
    updatedAt: '2024-07-01T16:30:00Z',
    flagged: true
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    preferredContactMethod: 'email',
    interests: ['Downtown', 'Apartment', 'City View'],
    budget: { min: 400000, max: 500000 },
    location: 'New York, NY',
    createdAt: '2024-07-02T10:30:00Z',
    lastActivity: '2024-07-02T10:30:00Z'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 987-6543',
    preferredContactMethod: 'phone',
    interests: ['Suburban', 'Family Home', 'Large Yard'],
    budget: { min: 600000, max: 800000 },
    location: 'Los Angeles, CA',
    createdAt: '2024-07-01T14:15:00Z',
    lastActivity: '2024-07-01T16:30:00Z'
  }
];
