
import React, { useState } from 'react';
import { FilterOptions } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { MapPin, Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PropertyFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const propertyTypes = ['apartment', 'house', 'condo', 'townhouse'];
  const developers = ['Metropolitan Developments', 'Sunshine Homes', 'Lakefront Properties', 'Elite Residences'];

  const handleLocationChange = (location: string) => {
    onFiltersChange({ ...filters, location });
  };

  const handlePriceRangeChange = (range: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: { min: range[0], max: range[1] }
    });
  };

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    const updatedTypes = checked
      ? [...filters.propertyType, type]
      : filters.propertyType.filter(t => t !== type);
    onFiltersChange({ ...filters, propertyType: updatedTypes });
  };

  const handleBedroomChange = (bedroom: number, checked: boolean) => {
    const updatedBedrooms = checked
      ? [...filters.bedrooms, bedroom]
      : filters.bedrooms.filter(b => b !== bedroom);
    onFiltersChange({ ...filters, bedrooms: updatedBedrooms });
  };

  const handleDeveloperChange = (developer: string, checked: boolean) => {
    const updatedDevelopers = checked
      ? [...filters.developer, developer]
      : filters.developer.filter(d => d !== developer);
    onFiltersChange({ ...filters, developer: updatedDevelopers });
  };

  const handleUseGPS = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        onFiltersChange({
          ...filters,
          useGPS: true,
          userLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const activeFiltersCount = 
    filters.location.length + 
    filters.propertyType.length + 
    filters.bedrooms.length + 
    filters.developer.length +
    (filters.priceRange.min > 0 || filters.priceRange.max < 2000000 ? 1 : 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount}</Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Location Search */}
      <div className="mb-6">
        <Label htmlFor="location" className="text-sm font-medium mb-2 block">
          Location
        </Label>
        <div className="flex gap-2">
          <Input
            id="location"
            placeholder="Enter city, state, or address"
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleUseGPS}
            className="whitespace-nowrap"
          >
            <MapPin className="h-4 w-4 mr-1" />
            Use GPS
          </Button>
        </div>
        {filters.useGPS && filters.userLocation && (
          <p className="text-xs text-green-600 mt-1">
            Using your current location
          </p>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">
          Price Range: {formatPrice(filters.priceRange.min)} - {formatPrice(filters.priceRange.max)}
        </Label>
        <Slider
          value={[filters.priceRange.min, filters.priceRange.max]}
          onValueChange={handlePriceRangeChange}
          max={2000000}
          min={0}
          step={50000}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>$0</span>
          <span>$2M+</span>
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <Label className="text-sm font-medium mb-3 block">Property Type</Label>
        <div className="grid grid-cols-2 gap-2">
          {propertyTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={filters.propertyType.includes(type)}
                onCheckedChange={(checked) => 
                  handlePropertyTypeChange(type, checked as boolean)
                }
              />
              <Label htmlFor={type} className="text-sm capitalize">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="mb-4 p-0 h-auto text-blue-600 hover:text-blue-700"
      >
        {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
      </Button>

      {showAdvanced && (
        <div className="space-y-6">
          {/* Bedrooms */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Bedrooms</Label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((bedroom) => (
                <div key={bedroom} className="flex items-center space-x-2">
                  <Checkbox
                    id={`bedroom-${bedroom}`}
                    checked={filters.bedrooms.includes(bedroom)}
                    onCheckedChange={(checked) => 
                      handleBedroomChange(bedroom, checked as boolean)
                    }
                  />
                  <Label htmlFor={`bedroom-${bedroom}`} className="text-sm">
                    {bedroom}+ BR
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Developer */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Developer</Label>
            <div className="space-y-2">
              {developers.map((developer) => (
                <div key={developer} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dev-${developer}`}
                    checked={filters.developer.includes(developer)}
                    onCheckedChange={(checked) => 
                      handleDeveloperChange(developer, checked as boolean)
                    }
                  />
                  <Label htmlFor={`dev-${developer}`} className="text-sm">
                    {developer}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
