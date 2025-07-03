
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { mockProperties, mockLeads, mockCustomers, mockDevelopers } from '../data/mockData';
import { Property, Lead, Customer, Developer } from '../types';
import { 
  Building, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  Phone, 
  Mail, 
  MessageSquare,
  Flag,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  ExternalLink,
  Globe,
  Calendar,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [properties] = useState<Property[]>(mockProperties);
  const [leads] = useState<Lead[]>(mockLeads);
  const [customers] = useState<Customer[]>(mockCustomers);
  const [developers] = useState<Developer[]>(mockDevelopers);
  const [searchTerm, setSearchTerm] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Statistics
  const totalProperties = properties.length;
  const availableProperties = properties.filter(p => p.status === 'available').length;
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const flaggedLeads = leads.filter(l => l.flagged).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Admin Sarang Rumah</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Lihat Website Publik
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">A</span>
                </div>
                <span className="text-sm text-gray-700">Pengguna Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Properti</p>
                  <p className="text-2xl font-bold text-gray-900">{totalProperties}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tersedia</p>
                  <p className="text-2xl font-bold text-gray-900">{availableProperties}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Lead</p>
                  <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Lead Baru</p>
                  <p className="text-2xl font-bold text-gray-900">{newLeads}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="properties">Properti</TabsTrigger>
            <TabsTrigger value="developers">Developer</TabsTrigger>
            <TabsTrigger value="leads">Lead</TabsTrigger>
            <TabsTrigger value="customers">Pelanggan</TabsTrigger>
            <TabsTrigger value="analytics">Analitik</TabsTrigger>
          </TabsList>

          {/* Properties Tab */}
          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manajemen Properti</CardTitle>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Properti
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-start space-x-4">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{property.title}</h3>
                          <p className="text-sm text-gray-600">
                            {property.location.city}, {property.location.state}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="capitalize">
                              {property.type}
                            </Badge>
                            <Badge className={property.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {property.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{formatPrice(property.price)}</p>
                        <p className="text-sm text-gray-500">
                          {property.availableUnits}/{property.totalUnits} unit tersedia
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline" className="hover:bg-primary/10">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-accent">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-destructive/10 hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Developers Tab */}
          <TabsContent value="developers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manajemen Developer</CardTitle>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Developer
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {developers.map((developer) => (
                    <div key={developer.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-start space-x-4">
                        <img
                          src={developer.logo || '/placeholder.svg'}
                          alt={developer.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{developer.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">{developer.contactPerson}</p>
                          <p className="text-sm text-gray-600">{developer.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">
                              <Calendar className="h-3 w-3 mr-1" />
                              {developer.establishedYear}
                            </Badge>
                            <Badge variant="outline">
                              <Briefcase className="h-3 w-3 mr-1" />
                              {developer.totalProjects} proyek
                            </Badge>
                            <Badge className={developer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {developer.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">{developer.commissionRate}% komisi</p>
                        <p className="text-sm text-gray-500">{developer.phone}</p>
                        {developer.website && (
                          <a 
                            href={developer.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                          >
                            <Globe className="h-3 w-3 mr-1" />
                            Website
                          </a>
                        )}
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline" className="hover:bg-primary/10">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-accent">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-destructive/10 hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manajemen Lead</CardTitle>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Cari lead..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64"
                    />
                    <Button variant="outline">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{lead.customerName}</h3>
                            {lead.flagged && <Flag className="h-4 w-4 text-red-500" />}
                          </div>
                          <p className="text-sm text-gray-600">{lead.propertyTitle}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                          <Badge className={getPriorityColor(lead.priority)}>
                            {lead.priority}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          {lead.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          {lead.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {lead.communicationHistory.length} interaksi
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3">{lead.notes}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Dibuat {new Date(lead.createdAt).toLocaleDateString('id-ID')}
                        </span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="hover:bg-primary/10">
                            Kontak
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-accent">
                            Update Status
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-secondary">
                            Lihat Riwayat
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Manajemen Pelanggan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customers.map((customer) => (
                    <div key={customer.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                          <p className="text-sm text-gray-600">{customer.location}</p>
                        </div>
                        <Badge variant="outline">
                          {customer.preferredContactMethod}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          {customer.phone}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Anggaran: {formatPrice(customer.budget.min)} - {formatPrice(customer.budget.max)}</p>
                        <div className="flex flex-wrap gap-1">
                          {customer.interests.map((interest, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Aktivitas terakhir: {new Date(customer.lastActivity).toLocaleDateString('id-ID')}
                        </span>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="hover:bg-primary/10">
                            Kontak
                          </Button>
                          <Button size="sm" variant="outline" className="hover:bg-accent">
                            Lihat Profil
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sumber Lead</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Website</span>
                      <span className="font-semibold">65%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Referensi</span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Media Sosial</span>
                      <span className="font-semibold">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performa Properti</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Rata-rata Hari di Pasar</span>
                      <span className="font-semibold">45 hari</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tingkat Konversi</span>
                      <span className="font-semibold">12%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Nilai Properti Rata-rata</span>
                      <span className="font-semibold">{formatPrice(5800000000)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
