
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties';
import { MapPin, Home, Bath, Maximize, Calendar, User, Phone, Mail, ArrowLeft, MessageCircle, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import ChatWidget from '../components/ChatWidget';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getPropertyById } = useProperties();
  const property = getPropertyById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Properti Tidak Ditemukan</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Kembali ke Properti
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pertanyaan Terkirim!",
      description: "Kami akan menghubungi Anda dalam 24 jam.",
    });
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Properti
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="aspect-[4/3] bg-gray-200 relative cursor-pointer" onClick={() => setImageModalOpen(true)}>
                <img
                  src={property.images[selectedImage]}
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
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="bg-white/80 rounded-full p-2 opacity-0 hover:opacity-100 transition-opacity">
                    <Maximize className="h-6 w-6 text-gray-700" />
                  </div>
                </div>
              </div>
              
              {/* Image Thumbnails */}
              <div className="p-4 flex gap-2 overflow-x-auto">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Image Sections */}
            {property.floorPlanImages && property.floorPlanImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">Denah Lantai</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.floorPlanImages.map((image, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`Denah lantai ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {property.facilityImages && property.facilityImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold">Fasilitas</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property.facilityImages.map((image, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`Fasilitas ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Property Info */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="capitalize mb-2">
                      {property.type}
                    </Badge>
                    <CardTitle className="text-2xl mb-2">{property.title}</CardTitle>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location.address}, {property.location.city}, {property.location.state}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {property.floors} Lantai
                </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">
                      {formatPrice(property.price)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Home className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">Kamar Tidur</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">Kamar Mandi</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Maximize className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <div className="font-semibold">{property.area.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">M²</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Deskripsi</h3>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Developer</h3>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <User className="h-8 w-8 text-gray-400 mr-3" />
                    <div>
                      <div className="font-semibold">{property.developer}</div>
                      <div className="text-sm text-gray-600">Developer Terpercaya</div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Informasi Unit</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="font-semibold text-2xl text-blue-600">{property.totalUnits}</div>
                      <div className="text-sm text-gray-600">Total Unit</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="font-semibold text-2xl text-green-600">{property.availableUnits}</div>
                      <div className="text-sm text-gray-600">Unit Tersedia</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="font-semibold text-2xl text-red-600">{property.soldUnits}</div>
                      <div className="text-sm text-gray-600">Unit Terjual</div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Fitur & Fasilitas</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.features.map((feature, index) => (
                      <Badge key={index} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Terdaftar pada {new Date(property.createdAt).toLocaleDateString('id-ID')}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Form */}
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Tertarik dengan properti ini?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Lengkap</Label>
                    <Input
                      id="name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Telepon</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">Pesan</Label>
                    <Textarea
                      id="message"
                      placeholder="Saya tertarik dengan properti ini. Mohon hubungi saya untuk informasi lebih detail."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Kirim Pertanyaan
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold mb-3">Aksi Cepat</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Jadwalkan Viewing
                    </Button>
                    <Button variant="outline" className="w-full">
                      Minta Tur Virtual
                    </Button>
                    {property.brochureUrl && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => window.open(property.brochureUrl, '_blank')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Unduh Brosur
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        const message = `Halo, saya tertarik dengan properti ${property.title}. Bisakah saya mendapat informasi lebih detail?`;
                        const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp Admin
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Image Modal */}
      <Dialog open={imageModalOpen} onOpenChange={setImageModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="relative">
            <button
              onClick={() => setImageModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="aspect-[4/3] bg-gray-200">
              <img
                src={property.images[selectedImage]}
                alt={property.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 flex gap-2 overflow-x-auto bg-white">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${property.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <ChatWidget />
    </div>
  );
};

export default PropertyDetails;
