
import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../types';
import { MapPin, Home, Bath, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <Badge 
            variant={property.status === 'available' ? 'default' : 'secondary'}
            className="capitalize"
          >
            {property.status}
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-2">
          <Badge variant="outline" className="capitalize mb-2">
            {property.type}
          </Badge>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {property.title}
          </h3>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">
            {property.location.address}, {property.location.city}, {property.location.state}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {property.description}
        </p>

        {/* Property Details */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Home className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} kamar</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} mandi</span>
          </div>
          <div className="flex items-center">
            <Maximize className="h-4 w-4 mr-1" />
            <span>{property.area.toLocaleString()} m²</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Developer:</p>
          <p className="text-sm font-medium text-gray-900">{property.developer}</p>
        </div>

        {/* Features */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {property.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {property.features.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{property.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/property/${property.id}`} className="flex-1">
            <Button className="w-full">Lihat Detail</Button>
          </Link>
          <Link to={`/contact?property=${encodeURIComponent(property.title)}&id=${property.id}`}>
            <Button variant="outline" size="sm">
              Kontak
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
