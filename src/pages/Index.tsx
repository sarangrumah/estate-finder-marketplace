
import React, { useState, useMemo } from 'react';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import { useProperties } from '../hooks/useProperties';
import { FilterOptions, Property } from '../types';
import { Search, TrendingUp, Users, Award, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Index = () => {
  const { properties } = useProperties();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    location: '',
    priceRange: { min: 0, max: 20000000000 },
    propertyType: [],
    bedrooms: [],
    bathrooms: [],
    developer: [],
    useGPS: false,
  });

  const filteredProperties = useMemo(() => {
    let filtered = properties;

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Location filter
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.location.state.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.location.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(property =>
      property.price >= filters.priceRange.min && property.price <= filters.priceRange.max
    );

    // Property type filter
    if (filters.propertyType.length > 0) {
      filtered = filtered.filter(property =>
        filters.propertyType.includes(property.type)
      );
    }

    // Bedrooms filter
    if (filters.bedrooms.length > 0) {
      filtered = filtered.filter(property =>
        filters.bedrooms.includes(property.bedrooms)
      );
    }

    // Developer filter
    if (filters.developer.length > 0) {
      filtered = filtered.filter(property =>
        filters.developer.includes(property.developer)
      );
    }

    // GPS-based sorting (if enabled)
    if (filters.useGPS && filters.userLocation) {
      filtered = filtered.sort((a, b) => {
        const distanceA = Math.sqrt(
          Math.pow(a.location.coordinates.lat - filters.userLocation!.lat, 2) +
          Math.pow(a.location.coordinates.lng - filters.userLocation!.lng, 2)
        );
        const distanceB = Math.sqrt(
          Math.pow(b.location.coordinates.lat - filters.userLocation!.lat, 2) +
          Math.pow(b.location.coordinates.lng - filters.userLocation!.lng, 2)
        );
        return distanceA - distanceB;
      });
    }

    return filtered;
  }, [searchQuery, filters]);

  const clearFilters = () => {
    setFilters({
      location: '',
      priceRange: { min: 0, max: 2000000 },
      propertyType: [],
      bedrooms: [],
      bathrooms: [],
      developer: [],
      useGPS: false,
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Temukan Properti
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Impian Anda
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Jelajahi ribuan properti dari developer terpercaya di seluruh Indonesia
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Cari properti, lokasi, atau developer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-gray-900 border-0 focus:ring-2 focus:ring-blue-500 rounded-xl"
                />
              </div>
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 px-8 rounded-xl font-semibold">
                Cari Properti
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-blue-100">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-400" />
              <span>50+ Kota</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-400" />
              <span>10,000+ Keluarga Bahagia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Dipercaya Ribuan Keluarga Indonesia
            </h2>
            <p className="text-xl text-gray-600">
              Platform properti terdepan dengan layanan terbaik
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-full mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">50,000+</h3>
              <p className="text-gray-600 font-medium">Properti Terdaftar</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-full mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">25,000+</h3>
              <p className="text-gray-600 font-medium">Pelanggan Puas</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-full mb-6 w-16 h-16 mx-auto flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600 font-medium">Developer Terpercaya</p>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Properti Pilihan Terbaik
            </h2>
            <p className="text-xl text-gray-600">
              Temukan rumah impian Anda dari koleksi properti premium kami
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="sticky top-24">
                <PropertyFilters
                  filters={filters}
                  onFiltersChange={setFilters}
                  onClearFilters={clearFilters}
                />
              </div>
            </div>

            {/* Properties Grid */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  Properti Tersedia ({filteredProperties.length})
                </h3>
              </div>

              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                  <div className="text-gray-400 mb-6">
                    <Search className="h-20 w-20 mx-auto mb-4" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    Tidak ada properti ditemukan
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Coba sesuaikan kriteria pencarian Anda atau hapus filter untuk melihat lebih banyak properti.
                  </p>
                  <Button onClick={clearFilters} variant="outline" className="hover:bg-blue-50">
                    Hapus Semua Filter
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
