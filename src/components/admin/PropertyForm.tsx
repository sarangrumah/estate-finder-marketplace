import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Property } from '@/types';
import { useToast } from '@/hooks/use-toast';

const propertySchema = z.object({
  title: z.string().min(1, 'Judul properti harus diisi'),
  description: z.string().min(1, 'Deskripsi harus diisi'),
  price: z.number().min(1, 'Harga harus lebih dari 0'),
  location: z.object({
    address: z.string().min(1, 'Alamat harus diisi'),
    city: z.string().min(1, 'Kota harus diisi'),
    state: z.string().min(1, 'Provinsi harus diisi'),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  type: z.enum(['apartment', 'house', 'condo', 'townhouse']),
  bedrooms: z.number().min(0),
  bathrooms: z.number().min(0),
  floors: z.number().min(1, 'Jumlah lantai minimal 1'),
  area: z.number().min(1, 'Luas area harus diisi'),
  developerId: z.string().min(1, 'Developer harus dipilih'),
  developer: z.string().min(1, 'Developer harus diisi'),
  features: z.string().min(1, 'Fitur harus diisi'),
  totalUnits: z.number().min(1, 'Total unit harus lebih dari 0'),
  availableUnits: z.number().min(0),
  images: z.string().min(1, 'URL gambar utama harus diisi'),
  floorPlanImages: z.string().optional(),
  facilityImages: z.string().optional(),
  brochureUrl: z.string().optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property;
  onSave: (property: PropertyFormData) => void;
  developers: { id: string; name: string }[];
}

const PropertyForm: React.FC<PropertyFormProps> = ({ isOpen, onClose, property, onSave, developers }) => {
  const { toast } = useToast();
  
  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: property ? {
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      type: property.type,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      floors: property.floors || 1,
      area: property.area,
      developerId: property.developerId || '',
      developer: property.developer,
      features: property.features.join(', '),
      totalUnits: property.totalUnits,
      availableUnits: property.availableUnits,
      images: property.images.join(', '),
      floorPlanImages: property.floorPlanImages?.join(', ') || '',
      facilityImages: property.facilityImages?.join(', ') || '',
      brochureUrl: property.brochureUrl || '',
    } : {
      title: '',
      description: '',
      price: 0,
      location: {
        address: '',
        city: '',
        state: '',
        coordinates: { lat: 0, lng: 0 }
      },
      type: 'apartment',
      bedrooms: 0,
      bathrooms: 0,
      floors: 1,
      area: 0,
      developerId: '',
      developer: '',
      features: '',
      totalUnits: 1,
      availableUnits: 1,
      images: '',
      floorPlanImages: '',
      facilityImages: '',
      brochureUrl: '',
    }
  });

  const onSubmit = (data: PropertyFormData) => {
    // Transform data before saving
    const transformedData = {
      ...data,
      features: data.features.split(',').map(f => f.trim()).filter(f => f),
      images: data.images.split(',').map(i => i.trim()).filter(i => i),
      floorPlanImages: data.floorPlanImages ? data.floorPlanImages.split(',').map(i => i.trim()).filter(i => i) : [],
      facilityImages: data.facilityImages ? data.facilityImages.split(',').map(i => i.trim()).filter(i => i) : [],
    };
    
    onSave(transformedData as any);
    toast({
      title: property ? 'Properti Diperbarui' : 'Properti Ditambahkan',
      description: property ? 'Properti berhasil diperbarui' : 'Properti baru berhasil ditambahkan',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{property ? 'Edit Properti' : 'Tambah Properti Baru'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Properti</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan judul properti" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="developerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Developer</FormLabel>
                    <Select onValueChange={(value) => {
                      field.onChange(value);
                      const selectedDev = developers.find(d => d.id === value);
                      if (selectedDev) {
                        form.setValue('developer', selectedDev.name);
                      }
                    }} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih developer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {developers.map((dev) => (
                          <SelectItem key={dev.id} value={dev.id}>
                            {dev.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Deskripsi properti" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga (IDR)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Luas (m²)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipe Properti</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tipe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apartment">Apartemen</SelectItem>
                        <SelectItem value="house">Rumah</SelectItem>
                        <SelectItem value="condo">Kondominium</SelectItem>
                        <SelectItem value="townhouse">Rumah Kota</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kamar Tidur</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kamar Mandi</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="0" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="floors"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jumlah Lantai</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="totalUnits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Unit</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="availableUnits"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Tersedia</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Features */}
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fitur Properti</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Pisahkan dengan koma: Swimming Pool, Gym, Security 24/7, Playground" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Images Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Gambar Properti</h3>
              
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gambar Utama</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="URL gambar, pisahkan dengan koma jika lebih dari satu" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="floorPlanImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gambar Denah (Opsional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="URL gambar denah, pisahkan dengan koma jika lebih dari satu" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="facilityImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gambar Fasilitas (Opsional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="URL gambar fasilitas, pisahkan dengan koma jika lebih dari satu" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="brochureUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brochure PDF (Opsional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="URL brochure PDF" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            {/* Location Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Lokasi</h3>
              <FormField
                control={form.control}
                name="location.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Lengkap</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Alamat lengkap properti" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="location.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kota</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama kota" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location.state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provinsi</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama provinsi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit">
                {property ? 'Perbarui' : 'Tambah'} Properti
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyForm;