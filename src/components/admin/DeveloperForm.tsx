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
import { Developer } from '@/types';
import { useToast } from '@/hooks/use-toast';

const developerSchema = z.object({
  name: z.string().min(1, 'Nama developer harus diisi'),
  description: z.string().min(1, 'Deskripsi harus diisi'),
  contactPerson: z.string().min(1, 'Nama kontak person harus diisi'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(1, 'Nomor telepon harus diisi'),
  address: z.string().min(1, 'Alamat harus diisi'),
  website: z.string().optional(),
  establishedYear: z.number().min(1900, 'Tahun berdiri tidak valid'),
  totalProjects: z.number().min(0, 'Total proyek tidak boleh negatif'),
  commissionRate: z.number().min(0).max(100, 'Rate komisi harus antara 0-100%'),
  status: z.enum(['active', 'inactive']),
});

type DeveloperFormData = z.infer<typeof developerSchema>;

interface DeveloperFormProps {
  isOpen: boolean;
  onClose: () => void;
  developer?: Developer;
  onSave: (developer: DeveloperFormData) => void;
}

const DeveloperForm: React.FC<DeveloperFormProps> = ({ isOpen, onClose, developer, onSave }) => {
  const { toast } = useToast();
  
  const form = useForm<DeveloperFormData>({
    resolver: zodResolver(developerSchema),
    defaultValues: developer ? {
      name: developer.name,
      description: developer.description,
      contactPerson: developer.contactPerson,
      email: developer.email,
      phone: developer.phone,
      address: developer.address,
      website: developer.website || '',
      establishedYear: developer.establishedYear,
      totalProjects: developer.totalProjects,
      commissionRate: developer.commissionRate,
      status: developer.status,
    } : {
      name: '',
      description: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      website: '',
      establishedYear: new Date().getFullYear(),
      totalProjects: 0,
      commissionRate: 2.5,
      status: 'active',
    }
  });

  const onSubmit = (data: DeveloperFormData) => {
    onSave(data);
    toast({
      title: developer ? 'Developer Diperbarui' : 'Developer Ditambahkan',
      description: developer ? 'Data developer berhasil diperbarui' : 'Developer baru berhasil ditambahkan',
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{developer ? 'Edit Developer' : 'Tambah Developer Baru'}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Developer</FormLabel>
                    <FormControl>
                      <Input placeholder="PT. Developer Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Aktif</SelectItem>
                        <SelectItem value="inactive">Tidak Aktif</SelectItem>
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
                    <Textarea placeholder="Deskripsi tentang developer" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kontak Person</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama kontak person" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="developer@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input placeholder="+62812345678" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website (Opsional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://developer.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Alamat lengkap kantor developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="establishedYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Berdiri</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="2020" 
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || new Date().getFullYear())}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="totalProjects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Proyek</FormLabel>
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
                name="commissionRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rate Komisi (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1"
                        placeholder="2.5" 
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Batal
              </Button>
              <Button type="submit">
                {developer ? 'Perbarui' : 'Tambah'} Developer
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DeveloperForm;