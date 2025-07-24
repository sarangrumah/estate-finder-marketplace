import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { mockLeads, mockCustomers } from '../data/mockData';
import { useSecureProperties } from '../hooks/useSecureProperties';
import { Property, Lead, Customer, Developer } from '../types';
import PropertyForm from '../components/admin/PropertyForm';
import DeveloperForm from '../components/admin/DeveloperForm';
import ImportTemplate from '../components/admin/ImportTemplate';
import ChatManagement from '../components/admin/ChatManagement';
import AdminAuth from '../components/admin/AdminAuth';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
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
  Globe,
  Calendar,
  Briefcase,
  FileDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAdmin, user } = useAuth();
  const { 
    properties, 
    developers, 
    addProperty, 
    updateProperty, 
    deleteProperty, 
    addDeveloper, 
    updateDeveloper, 
    deleteDeveloper 
  } = useSecureProperties();
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form states
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [showDeveloperForm, setShowDeveloperForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | undefined>();
  const [editingDeveloper, setEditingDeveloper] = useState<Developer | undefined>();
  
  const { toast } = useToast();

  useEffect(() => {
    // Check localStorage for admin auth or if user is admin
    const adminAuth = localStorage.getItem('adminAuth');
    console.log('AdminDashboard - checking auth:', { adminAuth, isAdmin, user });
    
    if (adminAuth === 'true' || isAdmin) {
      setIsAuthenticated(true);
    }
  }, [isAdmin, user]);

  const handleAuthenticate = () => {
    console.log('Admin authenticated');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    setIsAuthenticated(false);
    toast({
      title: 'Logout Berhasil',
      description: 'Anda telah keluar dari panel admin',
    });
  };

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

  const handleSaveProperty = (propertyData: any) => {
    if (editingProperty) {
      updateProperty(editingProperty.id, propertyData);
    } else {
      addProperty(propertyData);
    }
    setEditingProperty(undefined);
    setShowPropertyForm(false);
  };

  const handleDeleteProperty = (id: string) => {
    deleteProperty(id);
    toast({
      title: 'Properti Dihapus',
      description: 'Properti berhasil dihapus dari sistem',
    });
  };

  const handleSaveDeveloper = (developerData: any) => {
    if (editingDeveloper) {
      updateDeveloper(editingDeveloper.id, developerData);
    } else {
      addDeveloper(developerData);
    }
    setEditingDeveloper(undefined);
    setShowDeveloperForm(false);
  };

  const handleDeleteDeveloper = (id: string) => {
    deleteDeveloper(id);
    toast({
      title: 'Developer Dihapus',
      description: 'Developer berhasil dihapus dari sistem',
    });
  };

  const totalProperties = properties.length;
  const availableProperties = properties.filter(p => p.status === 'available').length;
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'new').length;
  const flaggedLeads = leads.filter(l => l.flagged).length;

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticate={handleAuthenticate} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Keluar
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">A</span>
                  </div>
                  <span className="text-sm text-gray-700">Admin User</span>
                </div>
              </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="properties">Properti</TabsTrigger>
            <TabsTrigger value="developers">Developer</TabsTrigger>
            <TabsTrigger value="import">Import Data</TabsTrigger>
            <TabsTrigger value="leads">Lead</TabsTrigger>
            <TabsTrigger value="customers">Pelanggan</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>

          <TabsContent value="properties">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manajemen Properti</CardTitle>
                  <div className="flex gap-2">
                    <ImportTemplate type="property" />
                    <Button onClick={() => setShowPropertyForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Properti
                    </Button>
                  </div>
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
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/property/${property.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              Lihat
                            </Link>
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => {
                              setEditingProperty(property);
                              setShowPropertyForm(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="hover:bg-destructive/10 hover:text-destructive">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Hapus
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Properti</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Apakah Anda yakin ingin menghapus properti "{property.title}"? Tindakan ini tidak dapat dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteProperty(property.id)}>
                                  Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="developers">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Manajemen Developer</CardTitle>
                  <div className="flex gap-2">
                    <ImportTemplate type="developer" />
                    <Button onClick={() => setShowDeveloperForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Developer
                    </Button>
                  </div>
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
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setEditingDeveloper(developer);
                              setShowDeveloperForm(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="hover:bg-destructive/10 hover:text-destructive">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Hapus
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Hapus Developer</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Apakah Anda yakin ingin menghapus developer "{developer.name}"? Tindakan ini tidak dapat dibatalkan.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteDeveloper(developer.id)}>
                                  Hapus
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-1" />
                            Kontak
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Update Status
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
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
                          <Button size="sm" variant="outline">
                            <Phone className="h-4 w-4 mr-1" />
                            Kontak
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
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

          <TabsContent value="import" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Import Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ImportTemplate type="property" />
                  <ImportTemplate type="developer" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <ChatManagement />
          </TabsContent>
        </Tabs>
      </div>

      <PropertyForm
        isOpen={showPropertyForm}
        onClose={() => {
          setShowPropertyForm(false);
          setEditingProperty(undefined);
        }}
        property={editingProperty}
        onSave={handleSaveProperty}
        developers={developers.map(d => ({ id: d.id, name: d.name }))}
      />
      
      <DeveloperForm
        isOpen={showDeveloperForm}
        onClose={() => {
          setShowDeveloperForm(false);
          setEditingDeveloper(undefined);
        }}
        developer={editingDeveloper}
        onSave={handleSaveDeveloper}
      />
    </div>
  );
};

export default AdminDashboard;
