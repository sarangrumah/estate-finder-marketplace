import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { FileDown, FileUp } from 'lucide-react';

interface ImportTemplateProps {
  type: 'property' | 'developer';
}

const ImportTemplate: React.FC<ImportTemplateProps> = ({ type }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateTemplate = () => {
    const headers = type === 'property' 
      ? ['title', 'description', 'price', 'address', 'city', 'state', 'type', 'bedrooms', 'bathrooms', 'area', 'developer', 'totalUnits', 'availableUnits', 'features', 'images']
      : ['name', 'description', 'contactPerson', 'email', 'phone', 'address', 'website', 'establishedYear', 'totalProjects', 'commissionRate', 'status'];
    
    const csvContent = headers.join(',') + '\n';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_template.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: 'Template Diunduh',
      description: `Template ${type === 'property' ? 'properti' : 'developer'} berhasil diunduh`,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would parse the CSV and process the data
      toast({
        title: 'File Diunggah',
        description: `File ${file.name} berhasil diunggah dan sedang diproses`,
      });
    }
  };

  const sampleData = type === 'property' ? {
    fields: [
      { name: 'title', description: 'Judul properti', example: 'Apartemen Mewah Jakarta' },
      { name: 'description', description: 'Deskripsi properti', example: 'Apartemen mewah dengan fasilitas lengkap' },
      { name: 'price', description: 'Harga dalam IDR', example: '5000000000' },
      { name: 'address', description: 'Alamat lengkap', example: 'Jl. Sudirman No. 123' },
      { name: 'city', description: 'Nama kota', example: 'Jakarta' },
      { name: 'state', description: 'Nama provinsi', example: 'DKI Jakarta' },
      { name: 'type', description: 'Tipe properti', example: 'apartment' },
      { name: 'bedrooms', description: 'Jumlah kamar tidur', example: '3' },
      { name: 'bathrooms', description: 'Jumlah kamar mandi', example: '2' },
      { name: 'area', description: 'Luas dalam m²', example: '120' },
      { name: 'developer', description: 'Nama developer', example: 'PT. Developer ABC' },
      { name: 'totalUnits', description: 'Total unit', example: '100' },
      { name: 'availableUnits', description: 'Unit tersedia', example: '50' },
      { name: 'features', description: 'Fitur (pisah dengan ;)', example: 'Swimming Pool;Gym;Security 24/7' },
      { name: 'images', description: 'URL gambar (pisah dengan ;)', example: 'https://example.com/img1.jpg;https://example.com/img2.jpg' },
    ]
  } : {
    fields: [
      { name: 'name', description: 'Nama developer', example: 'PT. Developer ABC' },
      { name: 'description', description: 'Deskripsi developer', example: 'Developer terpercaya sejak 1995' },
      { name: 'contactPerson', description: 'Nama kontak person', example: 'John Doe' },
      { name: 'email', description: 'Email kontak', example: 'contact@developer.com' },
      { name: 'phone', description: 'Nomor telepon', example: '+628123456789' },
      { name: 'address', description: 'Alamat kantor', example: 'Jl. Thamrin No. 456' },
      { name: 'website', description: 'Website (opsional)', example: 'https://developer.com' },
      { name: 'establishedYear', description: 'Tahun berdiri', example: '1995' },
      { name: 'totalProjects', description: 'Total proyek', example: '25' },
      { name: 'commissionRate', description: 'Rate komisi (%)', example: '2.5' },
      { name: 'status', description: 'Status (active/inactive)', example: 'active' },
    ]
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileUp className="h-4 w-4 mr-2" />
          Import {type === 'property' ? 'Properti' : 'Developer'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import {type === 'property' ? 'Properti' : 'Developer'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Download Template */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">1. Unduh Template</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Unduh template CSV untuk memudahkan proses import data {type === 'property' ? 'properti' : 'developer'}.
              </p>
              <Button onClick={generateTemplate} variant="outline">
                <FileDown className="h-4 w-4 mr-2" />
                Unduh Template CSV
              </Button>
            </CardContent>
          </Card>

          {/* Field Reference */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">2. Panduan Field</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sampleData.fields.map((field, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        {field.name}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{field.description}</p>
                    <p className="text-xs text-gray-500 font-mono bg-gray-50 p-1 rounded">
                      {field.example}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upload File */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3. Upload File</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Upload file CSV yang telah diisi dengan data {type === 'property' ? 'properti' : 'developer'}.
              </p>
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  <FileUp className="h-4 w-4 mr-2" />
                  Pilih File CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Catatan Penting</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• File harus dalam format CSV (Comma-separated values)</li>
                <li>• Pastikan header kolom sesuai dengan template</li>
                <li>• Untuk field yang berisi multiple values (seperti features, images), pisahkan dengan tanda semicolon (;)</li>
                <li>• Pastikan format data sesuai dengan contoh yang diberikan</li>
                <li>• Data yang sudah ada akan diperbarui jika ID sama</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportTemplate;