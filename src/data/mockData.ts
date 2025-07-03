
import { Property, Lead, Customer, Developer } from '../types';

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
    floorPlanImages: ['/placeholder.svg', '/placeholder.svg'],
    facilityImages: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    developer: 'Metropolitan Developments',
    features: ['Gym', 'Pool', 'Parking', 'Balcony', 'City View'],
    status: 'available',
    totalUnits: 100,
    availableUnits: 75,
    soldUnits: 25,
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
    floorPlanImages: ['/placeholder.svg'],
    facilityImages: ['/placeholder.svg', '/placeholder.svg'],
    developer: 'Sunshine Homes',
    features: ['Garden', 'Garage', 'Fireplace', 'Walk-in Closet'],
    status: 'available',
    totalUnits: 50,
    availableUnits: 30,
    soldUnits: 20,
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
    floorPlanImages: ['/placeholder.svg'],
    facilityImages: ['/placeholder.svg', '/placeholder.svg'],
    developer: 'Lakefront Properties',
    features: ['Lake View', 'Concierge', 'Fitness Center'],
    status: 'available',
    totalUnits: 80,
    availableUnits: 60,
    soldUnits: 20,
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
    floorPlanImages: ['/placeholder.svg', '/placeholder.svg'],
    facilityImages: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    developer: 'Elite Residences',
    features: ['Rooftop Terrace', 'Private Entrance', 'Hardwood Floors'],
    status: 'available',
    totalUnits: 30,
    availableUnits: 18,
    soldUnits: 12,
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

export const mockDevelopers: Developer[] = [
  {
    id: '1',
    name: 'Metropolitan Developments',
    description: 'Developer properti premium dengan fokus pada desain modern dan lokasi strategis di pusat kota.',
    logo: '/placeholder.svg',
    contactPerson: 'John Anderson',
    email: 'contact@metropolitan-dev.com',
    phone: '+62 21 1234 5678',
    address: 'Jl. Sudirman No. 123, Jakarta Selatan',
    website: 'https://metropolitan-dev.com',
    establishedYear: 2010,
    totalProjects: 15,
    commissionRate: 3.0,
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Sunshine Homes',
    description: 'Spesialis dalam pengembangan rumah keluarga dengan lingkungan yang nyaman dan fasilitas lengkap.',
    logo: '/placeholder.svg',
    contactPerson: 'Sarah Mitchell',
    email: 'info@sunshine-homes.com',
    phone: '+62 21 2345 6789',
    address: 'Jl. Kemang Raya No. 456, Jakarta Selatan',
    website: 'https://sunshine-homes.com',
    establishedYear: 2008,
    totalProjects: 25,
    commissionRate: 2.5,
    status: 'active',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02'
  },
  {
    id: '3',
    name: 'Lakefront Properties',
    description: 'Developer properti mewah dengan pemandangan danau dan konsep resort living.',
    logo: '/placeholder.svg',
    contactPerson: 'Michael Chen',
    email: 'hello@lakefront-prop.com',
    phone: '+62 21 3456 7890',
    address: 'Jl. BSD Boulevard No. 789, Tangerang Selatan',
    website: 'https://lakefront-prop.com',
    establishedYear: 2015,
    totalProjects: 8,
    commissionRate: 3.5,
    status: 'active',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03'
  },
  {
    id: '4',
    name: 'Elite Residences',
    description: 'Premium developer yang menghadirkan hunian eksklusif dengan standar internasional.',
    logo: '/placeholder.svg',
    contactPerson: 'Diana Rodriguez',
    email: 'contact@elite-residences.com',
    phone: '+62 21 4567 8901',
    address: 'Jl. Senayan No. 101, Jakarta Pusat',
    website: 'https://elite-residences.com',
    establishedYear: 2012,
    totalProjects: 12,
    commissionRate: 4.0,
    status: 'active',
    createdAt: '2024-01-04',
    updatedAt: '2024-01-04'
  }
];
